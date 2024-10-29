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
import { justificationPhrase, fillUserField, fillPasswordField, clickAcceptButton } from '../1TRAZiT-Commons/actionsHelper.js';

import {handleTabInteraction} from '../1TRAZiT-Commons/tabsInteractions';
import {handleObjectByTabsWithSearchInteraction} from '../1TRAZiT-Commons/objectByTabsWithSearch';

//Function with all tests.
const commonTests = async (ConfigSettings, page, testInfo) => {
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
  await handleTabInteraction(page, testInfo, ConfigSettingsAlternative, Export);

  // Llamo a la funcion para comprobar si un objectByTabs tiene un search.
  await handleObjectByTabsWithSearchInteraction(page, testInfo, ConfigSettingsAlternative, Export);
  
  console.log("El resultado fue falso, continuando con el flujo normal...");

  

  await test.step('Preparar para esperar la descarga', async () => {
      const downloadPromise = page.waitForEvent('download');
        // Selecciona el elemento en la posición especificada por positionSelectElement o el primer elemento (0) si no está definido
        const position = Export.positionSelectElement !== undefined ? Export.positionSelectElement : 0;
        //await page.getByText(Button.selectName).nth(position).click();
        
        await page.getByLabel(Export.buttonName).nth(position).click();

      // Espera a que el cuadro de diálogo esté visible
        const dialogVisible = await page.isVisible('#dialog-box');

        // Aplica la transformación al cuadro de diálogo y hace clic en el botón "OK" si el cuadro de diálogo está visible
        if (dialogVisible) {
            await page.evaluate(() => {
                const dialogBox = document.getElementById('dialog-box');
                if (dialogBox) {
                    dialogBox.style.transform = 'translate(-50%, -50%) scale(0.9)';
                }
            });
            await test.step('Captura de pantalla antes de la descarga', async () => {
                await testInfo.attach('Ok Button', {
                    body: await page.screenshot(),
                    contentType: 'image/png'
                });
            });
            // Espera a que el botón "OK" esté visible y haz clic
            await page.getByRole('button', { name: 'OK' }).click();
        } 
        
      // Esperar a que la descarga termine
      const download = await downloadPromise;

      // Captura de pantalla de la página web y adjuntarla al reporte
      await test.step('Captura de pantalla antes de la descarga', async () => {
          await testInfo.attach(Export.screenShotsDownload, {
              body: await page.screenshot(),
              contentType: 'image/png'
          });
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
    
                    console.log('Captura de Excel adjuntada al reporte');
                    resolve();
                } catch (error) {
                    console.error('Error al capturar Excel:', error);
                    reject(error);
                }
            });
        });
    });
    
  });

  // Justification Phrase
  await fillUserField(page, testInfo); // Rellena el campo de "User"
  await fillPasswordField(page, testInfo); // Rellena el campo de "Password"

  // Continuar con la justificación y otras acciones
  await justificationPhrase(page, 30000, testInfo);    
  await clickAcceptButton(page);

  // Verificar que no haya errores en la consola
  await test.step('Verificar errores en la consola', async () => {
      logger.printLogs();
      expect(logger.errors.length).toBe(0);
  });

  // Verificar respuestas de red capturadas
//   await test.step('Verificar respuestas de red', async () => {
//       networkInterceptor.printNetworkData();
//       const nullResponsesCount = networkInterceptor.verifyNonImageNullResponses();
//       expect(nullResponsesCount).toBe(0);  // Asegúrate de que no haya respuestas nulas
//   });

};





let trazitTestName;
let ConfigSettings;
    
test.describe('Desktop Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await test.step('Set viewport size for desktop', async () => {
        await page.setViewportSize({ width: 1365, height: 821 });
      });
  
      const logPlat = new LogIntoPlatform({ page });
      trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution' ;
  
      await test.step('Perform common setup', async () => {
        ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName);
      });
  
      await test.step('Wait for 3 seconds', async () => {
        await page.waitForTimeout(3000);
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


  

//   test.describe('Television Mode Full HD', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//       await test.step('Set viewport size for Full HD (1920x1080)', async () => {
//         // Establece el tamaño de la pantalla en Full HD
//         await page.setViewportSize({ width: 1920, height: 1080 });
//       });
  
//       const logPlat = new LogIntoPlatform({ page });
//       trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution' ;
  
//       await test.step('Perform common setup', async () => {
//         ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName);
//       });
  
//       await test.step('Wait for 3 seconds', async () => {
//         await page.waitForTimeout(3000);
//       });
  
//       const openWindow = new OpenProcedureWindow({ page });
  
//       await test.step('Open procedure window for TV', async () => {
//         await test.step('Wait for 3 seconds', async () => {
//           await page.waitForTimeout(3000);
//         });
//         await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings);
//     });
// });
//       //And I call the tests.
//       test('ClickOnTheExportButton', async ({ page }, testInfo) => {
//         await test.step('Run tests', async () => {
//             await commonTests(ConfigSettings, page, testInfo);
//         });
//     });
//   });


// // Mobile Mode 
// test.describe('Mobile mode', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//       // Size of the viewport of a mobile device
//       await test.step('Set mobile viewport size', async () => {
//         await page.setViewportSize({ width: 385, height: 812 });
//       });
      
//       // Common configuration for both modes.
//       const logPlat = new LogIntoPlatform({ page });
//       trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution';
  
//       await test.step('Perform common setup', async () => {
//         ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName);
//       });
  
//       await test.step('Wait for 3 seconds', async () => {
//         await page.waitForTimeout(3000);
//       });
  
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
//       trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution';
  
//       await test.step('Perform common setup', async () => {
//         ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName);
//       });
  
//       await test.step('Wait for 3 seconds', async () => {
//         await page.waitForTimeout(3000);
//       });
  
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
//       trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution';
  
//       await test.step('Perform common setup', async () => {
//         ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName);
//       });
  
//       await test.step('Wait for 3 seconds', async () => {
//         await page.waitForTimeout(3000);
//       });
  
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
//       trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution';
  
//       await test.step('Perform common setup', async () => {
//         ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName);
//       });
  
//       await test.step('Wait for 3 seconds', async () => {
//         await page.waitForTimeout(3000);
//       });
  
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
    await callApiRunCompletion(data, testStatus, trazitTestName, testInfo)
  });

   
//   pwTest('Example test', async ({ page }) => {
//     // Your test logic here
//   });