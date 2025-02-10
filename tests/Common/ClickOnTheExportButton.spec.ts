import { test, expect, type TestInfo } from '@playwright/test';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import csv from 'csv-parser';
import { exec } from 'child_process';
import screenshot from 'screenshot-desktop';

import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config.js';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform.js';

import { Export as dataForTestFromFile } from '../../trazit-models/test-config-instruments-activate';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls.js';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow.js';

import { Logger, NetworkInterceptor, ResponseValidator, phraseReport } from '../1TRAZiT-Commons/consoleAndNetworkMonitor.js';
import { attachScreenshot, clickDoButton, esignRequired, justificationPhrase, fillUserField, fillPasswordField, clickAcceptButton } from '../1TRAZiT-Commons/actionsHelper.js';

import {handleTabInteraction} from '../1TRAZiT-Commons/tabsInteractions';
import {handleObjectByTabsWithSearchInteraction} from '../1TRAZiT-Commons/objectByTabsWithSearch';
import { handleMenus } from '../1TRAZiT-Commons/handleMenus';
import { time } from 'console';

//Function with all tests.
const commonTests = async (ConfigSettings, page, testInfo) => {
    // await handleMenus(page);

    // Create instances of Logger and NetworkInterceptor
    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();

    let Export;

    // If configuration data is available, process the JSON
    if (ConfigSettings && ConfigSettings.dataForTest) {
        let unescapedString = ConfigSettings.dataForTest.replace(/\\+/g, '\\');
        try {
            Export = JSON.parse(unescapedString);
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
        Export = JSON.parse(Export.testDataGame);
    } else {
        Export = dataForTestFromFile;
    }

    // Attach Logger and NetworkInterceptor to the page
    await test.step(phraseReport.phraseNetworkInterceptionAndLogger, async () => {
        logger.attachToPage(page);
        networkInterceptor.attachToPage(page);
    });

    // Llamadas a interacciones previas
    // await handleTabInteraction(page, testInfo, ConfigSettingsAlternative, Export);

    // Llamo a la funcion para comprobar si un objectByTabs tiene un search.
    await handleObjectByTabsWithSearchInteraction(page, testInfo, ConfigSettingsAlternative, Export);
    await handleTabInteraction(page, testInfo, ConfigSettingsAlternative, Export);


    console.log("El resultado fue falso, continuando con el flujo normal...");

    await test.step('Pauses', async () => {
        await page.waitForTimeout(2000);
    });

    await test.step('Preparar para esperar la descarga', async () => {
        const downloadPromise = page.waitForEvent('download');

        // Intentar hacer clic en Export primero
        let clickedExport = false;

        try {
            // Verifica si el elemento está disponible por título. (Nueva Plataforma: buttonName: Export)
            const position = Export.positionSelectElement !== undefined ? Export.positionSelectElement : 0;

            if (await page.getByTitle(Export.buttonName).locator('#button').nth(position).isVisible({ timeout: 1000 })) {
                await page.getByTitle(Export.buttonName).locator('#button').nth(position).click({ timeout: 3000, force: true });
                console.log(`Clicked with getByTitle on the button "${Export.buttonName}" at position ${position}.`);
                clickedExport = true;
            } else if (await page.getByLabel(Export.buttonName).nth(position).isVisible({ timeout: 1000 })) {
                // Si no está disponible por título, verifica por etiqueta. (Antigua Plataforma: buttonName: download)
                await page.getByLabel(Export.buttonName).nth(position).click({ timeout: 3000, force: true });
                console.log(`Clicked with getByLabel on the button "${Export.buttonName}" at position ${position}.`);
                clickedExport = true;
            
            } else {
                console.log(`The button "${Export.buttonName}" not found initially.`);
            }
        } catch (error) {
            console.log(`Error trying to click Export button initially: ${error.message}`);
        }

        // Si no se hizo clic en Export, intenta hacer clic en more_horiz y luego en Export
        if (!clickedExport) {
            await test.step('Click on more_horiz', async () => {
                try {
                    const moreHorizButton = page.locator('md-icon:has-text("more_horiz")').first();

                    // Verifica si el botón more_horiz está visible antes de hacer clic
                    // const moreHorizButton = await page.locator('text=more_horiz', {exact: true}); 
                    if (await moreHorizButton.isVisible()) {
                        await moreHorizButton.click({ timeout: 1000, force: true });
                        console.log('Clicked on the "more_horiz" button.');
                    } else {
                        console.log('The "more_horiz" button is not visible, skipping this step.');
                    }
                } catch (error) {
                    console.log('No need to click on "more_horiz":', error.message);
                }
            });

            // Vuelve a intentar hacer clic en Export después de interactuar con more_horiz
            await test.step('Retry clicking Export after more_horiz', async () => {
                const position = Export.positionSelectElement !== undefined ? Export.positionSelectElement : 0;

                try {
                    if (await page.getByTitle(Export.buttonName).locator('#button').nth(position).isVisible({ timeout: 1000 })) {
                        await page.getByTitle(Export.buttonName).locator('#button').nth(position).click({ timeout: 3000, force: true });
                        console.log(`Clicked with getByTitle on the button "${Export.buttonName}" after more_horiz.`);
                    } else if (await page.getByLabel(Export.buttonName).nth(position).isVisible({ timeout: 1000 })) {
                        await page.getByLabel(Export.buttonName).nth(position).click({ timeout: 3000, force: true });
                        console.log(`Clicked with getByLabel on the button "${Export.buttonName}" after more_horiz.`);
                    } else {
                        throw new Error(`The button "${Export.buttonName}" was not found even after clicking more_horiz.`);
                    }
                } catch (error) {
                    console.error(`Error trying to click Export button after more_horiz: ${error.message}`);
                    throw error;
                }
            });
        }
        await test.step('Pauses', async () => {
            await page.waitForTimeout(2000);
        });

        // Obtengo las columnas del JSON si existen, o asigno un array vacío si no están definidas  
        const columnsToSelect = Export.columnsToPrint ?? [];

        // Si no hay columnas definidas, salto este paso
        if (columnsToSelect.length > 0) {
            // Capturo la pantalla después de seleccionar las columnas
            await test.step(Export.phraseScreenShots, async () => {
                await attachScreenshot(testInfo, Export.screenBeforeSelection, page, ConfigSettingsAlternative.screenShotsContentType); 
            });

            console.log("Selecting columns...");
            
            // Iniciar el paso de test para seleccionar las columnas
            await test.step('Selecting columns', async () => {
                // Itero sobre las columnas y hago clic en cada una si es visible
                for (const column of columnsToSelect) {
                    const element = page.getByText(column);

                    if (await element.isVisible()) {
                        await element.click({timeout: 3000});
                        console.log(`Clicked on column: ${column}`);
                    } else {
                        console.log(`Column not found: ${column}`);
                    }
                }
            });

            // Capturo la pantalla después de seleccionar las columnas
            await test.step(Export.phraseScreenShots, async () => {
                await attachScreenshot(testInfo, Export.screenShotsSelectedColumnsExport, page, ConfigSettingsAlternative.screenShotsContentType); 

                // Pausar si es necesario según la configuración
                if (Export.phrasePauses) {
                    await test.step(Export.phrasePauses, async () => {
                        await page.pause();
                        await page.pause();
                        await page.pause();
                    });
                }
            });
            // await clickDoButton(page);
            // await page.getByTitle('option', { name: "OK" }).click({force: true, timeout: 3000}); 
            await page.locator('button', { hasText: Export.buttonOk }).click({force: true, timeout: 3000});  
        } else {
            console.log("No columns to select. Skipping this step.");
        }

        // Espera a que la descarga termine
        const download = await downloadPromise;

        await test.step(Export.phraseScreenShots, async () => {
            await attachScreenshot(testInfo, Export.screenShotsDownload, page, ConfigSettingsAlternative.screenShotsContentType); 
            if (Export.phrasePauses) {
                await test.step(Export.phrasePauses, async () => {
                    await page.pause();
                    await page.pause();
                    await page.pause();
                }
             )}
        });

        // Formatear la fecha y hora
        await test.step('Formatear la fecha y hora', async () => {
            const now = new Date();
            const formattedDate = now.getFullYear() + '-' +
                String(now.getMonth() + 1).padStart(2, '0') + '-' +
                String(now.getDate()).padStart(2, '0') + 'T' +
                String(now.getHours()).padStart(2, '0') + '-' +
                String(now.getMinutes()).padStart(2, '0') + '-' +
                String(now.getSeconds()).padStart(2, '0');

            // Crear el nombre del archivo para el CSV utilizando screenShotName y la fecha/hora
            const csvFileName = `${Export.desktopMode.screenShotName
            }_${formattedDate}.csv`;
            const filePath = path.join(Export.downloadPath, csvFileName); // Usar el nuevo nombre de archivo CSV

            // Guardar el archivo descargado con el mismo nombre para adjuntar
            await download.saveAs(filePath);

            // Almacenar el nombre del archivo y la ruta en el contexto para uso posterior
            Export.csvFileName = csvFileName;
            Export.filePath = filePath;
        });

        await test.step('Verificar que el archivo .csv se haya descargado', async () => {
            try {
                await fsPromises.access(Export.filePath);
            } catch {
                console.error(Export.consoleError);
                await testInfo.attach('error-log.txt', {
                    body: Buffer.from(Export.consoleError),
                    contentType: 'text/plain'
                });
                return;
            }
        });

        await test.step('Leer y analizar el contenido del archivo .csv', async () => {
            const parseCsv = (filePath: string) => {
                return new Promise((resolve, reject) => {
                    const parsedResults: any[] = [];
                    const stream = fs.createReadStream(filePath)
                        .pipe(csv())
                        .on('data', (data) => parsedResults.push(data))
                        .on('end', () => resolve(parsedResults))
                        .on('error', reject);
                });
            };

            const records = await parseCsv(Export.filePath);
            console.log('\nContenido del CSV:', records, "\n");

            // Adjuntar el archivo CSV usando el mismo nombre que en `csvFileName`
            await testInfo.attach(Export.csvFileName, {
                path: Export.filePath,
                contentType: 'text/csv'
            });
        });

        await test.step('Abrir el archivo en Excel y capturar la pantalla', async () => {
            await new Promise<void>((resolve, reject) => {
                // Abrir el archivo de Excel
                exec(`cmd /c start "" "${Export.filePath}"`, async (err) => {
                    if (err) {
                        console.error('Error al abrir el archivo en Excel:', err);
                        reject(err);
                        return;
                    }

                    // Esperar a que Excel se abra y maximizar la ventana
                    await new Promise(resolve => setTimeout(resolve, 3000)); // Pausa de 3 segundos

                    // Ejecutar el script VBS para maximizar Excel
                    exec(`cscript //nologo MaximizeExcel.vbs`, (err) => {
                        if (err) {
                            console.error('Error al maximizar Excel:', err);
                            reject(err);
                            return;
                        }
                    });

                    // Capturar la pantalla después de abrir y maximizar
                    await test.step('Esperar a que Excel se abra y maximizar', async () => {
                        await new Promise(resolve => setTimeout(resolve, 2000)); // Pausa adicional si es necesario
                    });

                    try {
                        const img = await screenshot();

                        // Crear el nombre del archivo para la captura de pantalla de Excel
                        const imgPath = path.join(Export.downloadPath, `${Export.desktopMode.screenShotName}_${Export.csvFileName.replace('.csv', '')}.png`); // Usar el mismo nombre con la fecha

                        // Guardar la captura
                        fs.writeFileSync(imgPath, img);

                        // Adjuntar la captura al reporte de Playwright
                        await testInfo.attach('Captura de Excel', {
                            path: imgPath,
                            contentType: 'image/png'
                        });

                        resolve();
                    } catch (error) {
                        console.error('Error al tomar la captura de pantalla de Excel:', error);
                        reject(error);
                    }
                });
            });
        });

        await test.step('Cerrar la aplicación de Excel', async () => {
            exec('taskkill /im EXCEL.EXE /f', (err) => {
                if (err) {
                    console.error('Error al cerrar Excel:', err);
                }
            });
        });
    });
};






let trazitTestName;
let procInstanceName;
let ConfigSettings;
    
test.describe('Desktop Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await test.step('Set viewport size for desktop', async () => {
        await page.setViewportSize({ width: 1365, height: 821 });
      });
  
      const logPlat = new LogIntoPlatform({ page });
        trazitTestName = process.env.TRAZIT_TEST_NAME || 'SamplesReviewExport';
  
        // Define procInstanceName antes de pasarlo
        procInstanceName = process.env.PROC_INSTANCE_NAME || 'mon_water'; // Valor predeterminado o el valor de tu entorno
  
        await test.step('Perform common setup', async () => {
            // Ahora pasas procInstanceName al llamar a commonBeforeEach
            ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
        });
  
        await test.step('Wait for 1 seconds', async () => {
            await page.waitForTimeout(1000);
        });
  
      const openWindow = new OpenProcedureWindow({ page });
  
      await test.step('Open procedure window for desktop', async () => {
        await test.step('Wait for 3 seconds', async () => {
          await page.waitForTimeout(3000);
        });
        await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings);
    });
});
      //And I call the tests.
      test('ClickOnTheExportButton', async ({ page }, testInfo) => {
        await test.step('Run tests', async () => {
            await commonTests(ConfigSettings, page, testInfo);
        });
    });
  });


// // Mobile Mode 
// test.describe('Mobile mode', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//       // Size of the viewport of a mobile device
//       await test.step('Set mobile viewport size', async () => {
//         await page.setViewportSize({ width: 385, height: 812 });
//       });
      
//       // Common configuration for both modes.
//       const logPlat = new LogIntoPlatform({ page });
//         trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution';
  
//         // Define procInstanceName antes de pasarlo
//         procInstanceName = process.env.PROC_INSTANCE_NAME || 'default'; // Valor predeterminado o el valor de tu entorno
  
//         await test.step('Perform common setup', async () => {
//             // Ahora pasas procInstanceName al llamar a commonBeforeEach
//             ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
//         });
  
//         await test.step('Wait for 1 seconds', async () => {
//             await page.waitForTimeout(1000);
//         });
  
//       const openWindow = new OpenProcedureWindow({ page });
  
//       await test.step('Open procedure window for TV', async () => {
//         await test.step('Wait for 3 seconds', async () => {
//           await page.waitForTimeout(3000);
//         });
//         await openWindow.openWindowForMobile(page, testInfo, ConfigSettings);
//       });
//     });
  
//     // And I call the tests.
//     test('ClickOnTheExportButton', async ({ page }, testInfo) => {
//       await test.step('Run tests', async () => {
//         await commonTests(ConfigSettings, page, testInfo);
//       });
//     });
//   });
  

// // // // Mobile Mode - Retrato
// test.describe('Mobile mode Retrato', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//       // Tamaño del viewport para móviles en modo retrato
//       await test.step('Set mobile portrait viewport size', async () => {
//         await page.setViewportSize({ width: 812, height: 385 });
//       });
  
//       // Configuración común para ambos modos.
//       const logPlat = new LogIntoPlatform({ page });
//         trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution';
  
//         // Define procInstanceName antes de pasarlo
//         procInstanceName = process.env.PROC_INSTANCE_NAME || 'default'; // Valor predeterminado o el valor de tu entorno
  
//         await test.step('Perform common setup', async () => {
//             // Ahora pasas procInstanceName al llamar a commonBeforeEach
//             ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
//         });
  
//         await test.step('Wait for 1 seconds', async () => {
//             await page.waitForTimeout(1000);
//         });
  
//       const openWindow = new OpenProcedureWindow({ page });
  
//       await test.step('Open procedure window for mobile', async () => {
//         await test.step('Wait for 3 seconds', async () => {
//           await page.waitForTimeout(3000);
//         });
//         await openWindow.openWindowForMobile(page, testInfo, ConfigSettings);
//       });
//     });
  
//     test('ClickOnTheExportButton', async ({ page }, testInfo) => {
//       await test.step('Run tests', async () => {
//         await commonTests(ConfigSettings, page, testInfo);
//       });
//     });
//   });
  


// // Tablets Mode
// test.describe('Tablets mode', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//       // Tamaño del viewport para tablets
//       await test.step('Set tablet viewport size', async () => {
//         await page.setViewportSize({ width: 768, height: 1024 });
//       });
  
//       // Configuración común para ambos modos.
//       const logPlat = new LogIntoPlatform({ page });
//         trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution';
  
//         // Define procInstanceName antes de pasarlo
//         procInstanceName = process.env.PROC_INSTANCE_NAME || 'default'; // Valor predeterminado o el valor de tu entorno
  
//         await test.step('Perform common setup', async () => {
//             // Ahora pasas procInstanceName al llamar a commonBeforeEach
//             ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
//         });
  
//         await test.step('Wait for 1 seconds', async () => {
//             await page.waitForTimeout(1000);
//         });
  
//       const openWindow = new OpenProcedureWindow({ page });
  
//       await test.step('Open procedure window for mobile', async () => {
//         await test.step('Wait for 3 seconds', async () => {
//           await page.waitForTimeout(3000);
//         });
//         await openWindow.openWindowForMobile(page, testInfo, ConfigSettings);
//       });
//     });
  
//     test('ClickOnTheExportButton', async ({ page }, testInfo) => {
//       await test.step('Run tests', async () => {
//         await commonTests(ConfigSettings, page, testInfo);
//       });
//     });
//   });
  

// // Tablets Mode - Retrato
// test.describe('Tablets mode Retrato', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//       // Tamaño del viewport para tablets en modo retrato
//       await test.step('Set tablet portrait viewport size', async () => {
//         await page.setViewportSize({ width: 1024, height: 768 });
//       });
  
//       // Configuración común para ambos modos.
//       const logPlat = new LogIntoPlatform({ page });
//         trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution';
  
//         // Define procInstanceName antes de pasarlo
//         procInstanceName = process.env.PROC_INSTANCE_NAME || 'default'; // Valor predeterminado o el valor de tu entorno
  
//         await test.step('Perform common setup', async () => {
//             // Ahora pasas procInstanceName al llamar a commonBeforeEach
//             ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
//         });
  
//         await test.step('Wait for 1 seconds', async () => {
//             await page.waitForTimeout(1000);
//         });
  
//       const openWindow = new OpenProcedureWindow({ page });
  
//       await test.step('Open procedure window for desktop', async () => {
//         await test.step('Wait for 3 seconds', async () => {
//           await page.waitForTimeout(3000);
//         });
//         await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings);
//       });
//     });
  
//     // And I call the tests.
//     test('ClickOnTheExportButton', async ({ page }, testInfo) => {
//       await test.step('Run tests', async () => {
//         await commonTests(ConfigSettings, page, testInfo);
//       });
//     });
//   });
  
  

const { test:pwTest, afterEach } = require('@playwright/test');
 
  
afterEach(async ({}, testInfo) => {
  
    const durationInSeconds = (testInfo.duration / 1000).toFixed(2);
  
    const data = {
      trazitTestName: process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution' ,
      duration: `${durationInSeconds} seconds`,
    };
  
    const testStatus = testInfo.status;
    const procInstanceName = process.env.PROC_INSTANCE_NAME || 'default'; 
    await callApiRunCompletion(data, testStatus, trazitTestName, testInfo, procInstanceName)
  });

   
//   pwTest('Example test', async ({ page }) => {
//     // Your test logic here
//   });