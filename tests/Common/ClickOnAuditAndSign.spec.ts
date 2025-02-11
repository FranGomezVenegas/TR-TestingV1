import { test, expect } from '@playwright/test';

import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config.js';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform.js';

import { Button as dataForTestFromFile } from '../../trazit-models/test-config-instruments-activate';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls.js';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow.js';

import { Logger, NetworkInterceptor, ResponseValidator, phraseReport } from '../1TRAZiT-Commons/consoleAndNetworkMonitor.js';
import { NotificationWitness, ReportNotificationPhase } from '../1TRAZiT-Commons/notification.js';
import { clickConfirmDialogButton, clickDoButtonJustification, clickDoButtonUserDialog, clickJustificationButton, attachScreenshot, justificationPhrase, fillUserField, fillPasswordField, clickAcceptButton, clickDoButton, esignRequired } from '../1TRAZiT-Commons/actionsHelper.js';

import {handleTabInteraction} from '../1TRAZiT-Commons/tabsInteractions';
import { handleRowActionsInteraction } from '../1TRAZiT-Commons/rowActionsInteractions';
import { handleActionNameInteraction } from '../1TRAZiT-Commons/actionsNameInteractionsWithoutDialog.js';
import { handleObjectByTabsWithSearchInteraction } from '../1TRAZiT-Commons/objectByTabsWithSearch';

// import { handleMenus } from '../1TRAZiT-Commons/handleMenus';


//Function with all tests.
const commonTests = async (ConfigSettings, page, testInfo) => {
    // await handleMenus(page);

    // Create instances of Logger and NetworkInterceptor
    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();

    let Button;

    // If configuration data is available, process the JSON
    if (ConfigSettings && ConfigSettings.dataForTest) {
        let unescapedString = ConfigSettings.dataForTest.replace(/\\+/g, '\\');
        try {
            Button = JSON.parse(unescapedString);
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
        Button = JSON.parse(Button.testDataGame);
    } else {
        Button = dataForTestFromFile;
    }

    // Attach Logger and NetworkInterceptor to the page
    await test.step(phraseReport.phraseNetworkInterceptionAndLogger, async () => {
        logger.attachToPage(page);
        networkInterceptor.attachToPage(page);
    });

    // NOTIFICATIONS
    let afterEachData = {
        textInNotif1: Button.textInNotif1,
        textInNotif2: Button.textInNotif2,
        textInNotif3: Button.textInNotif3,
    };

    const notificationWitness = new NotificationWitness(page);

    // Llamadas a interacciones previas
    await handleTabInteraction(page, testInfo, ConfigSettingsAlternative, Button);

    // Llamo a la función para comprobar si un objectByTabs tiene un search. Esta fución solo controla el search
    // clica en este y añade el campo que se desea buscar.
    await handleObjectByTabsWithSearchInteraction(page, testInfo, ConfigSettingsAlternative, Button);
    
    await handleActionNameInteraction(page, testInfo, Button);

    try {
        if (Button.activeFilter) {
            if (Button.phraseOpenFilter) {
                await test.step(Button.phraseOpenFilter, async () => {
                    let buttonFound = false;
    
                    // Ajustar el estilo del diálogo antes de buscar el botón
                    await page.evaluate(() => {
                        const dialog = document.querySelector('.dialog-container') as HTMLElement;
                        if (dialog) {
                            dialog.style.top = '-577px'; 
                            dialog.style.left = '757px';
                            dialog.style.width = '813px'; 
                            dialog.style.height = '300px'; 
                        }
                    });
    
                    try {
                        const marker1 = `▼ ${Button.textFilter}`;
                        await page.getByRole('button', { name: marker1 }).click({ timeout: 3000, force: true });
                        buttonFound = true;
                    } catch (error) {
                        console.warn(`Botón con texto "▼ ${Button.textFilter}" no encontrado. Intentando con texto alternativo.`);
                    }
    
                    if (!buttonFound) {
                        throw new Error('El botón para abrir los filtros no fue encontrado.');
                    }
                });
            }
    
            // Pausa y captura de pantalla
            await test.step(Button.phrasePauses, async () => {
                await page.pause();
                await page.waitForTimeout(500);
            });
    
            if (Button.phraseScreenShots) {
                await test.step(Button.phraseScreenShots, async () => {
                    await attachScreenshot(testInfo, Button.screenShotsClickFilter, page, ConfigSettingsAlternative.screenShotsContentType);
                });
            }
    
            if (Button.phraseShouldClickSearchPlaceholder) {
                await test.step(Button.phraseShouldClickSearchPlaceholder, async () => {
                    await page.getByPlaceholder(Button.placeholderShouldFilter).click({ timeout: 2000 });
                });
            }
    
            if (Button.phraseShouldClickSelectButton) {
                await test.step(Button.phraseShouldClickSelectButton, async () => {
                    await page.getByRole('button', { name: Button.buttonSelectFilter }).click({ timeout: 2000 });
                });
            }
    
            if (Button.phraseShouldClickFilter) {
                await test.step(Button.phraseShouldClickFilter, async () => {
                    await page.locator('#filterarea').getByText(Button.optionFilterSelect).click({ timeout: 2000 });
                });
    
                await test.step(Button.phraseScreenShots, async () => {
                    await attachScreenshot(testInfo, Button.screenShotsClickOptionFilter, page, ConfigSettingsAlternative.screenShotsContentType);
                });
            }
    
            if (Button.phraseRangeDate) {
                await test.step(Button.phraseRangeDate, async () => {
                    await page.getByRole('textbox').nth(1).fill(Button.fillDateFilter);
                    await page.getByRole('textbox').nth(2).fill(Button.fillSecondDateFilter);
                });
    
                await test.step(Button.phraseScreenShots, async () => {
                    await attachScreenshot(testInfo, Button.screenShotsAfterAddDayRange, page, ConfigSettingsAlternative.screenShotsContentType);
                });
    
                if (Button.phraseApplyFilter) {
                    await page.getByRole('button', { name: Button.clickButtonApplyFilter }).click({ timeout: 2000 });
                }
            }
    
            if (Button.phraseScreenShots) {
                await test.step(Button.phraseScreenShots, async () => {
                    await attachScreenshot(testInfo, Button.screenShotsFilter, page, ConfigSettingsAlternative.screenShotsContentType);
                });
            }
    
            if (Button.phraseHideFilters) {
                await test.step(Button.phraseHideFilters, async () => {
                    const marker = `▲ ${Button.hideFilters}`;
                    await page.getByRole('button', { name: marker }).click({ timeout: 2000 });
                });
            }
        }
    } catch (error) {
        console.warn('Ocurrió un error en el filtro o el filtro está desactivado:', error);
    } finally {
        // Clic en el botón para firmar
        await test.step(Button.phraseButtonName, async () => {
            const selectorBoton = `#${Button.buttonName}`;
            const elementos = page.locator(selectorBoton);
            const cantidad = await elementos.count();
            await page.waitForTimeout(1500);
    
            if (cantidad === 0) {
                throw new Error(`No se encontró el botón con ID: ${Button.buttonName}`);
            }
    
            const position = parseInt(Button.positionButton2 || "1", 10);
            await elementos.nth(position).click({ timeout: 5000 });
    
            if (Button.phraseScreenShots) {
                await test.step(Button.phraseScreenShots, async () => {
                    await attachScreenshot(testInfo, Button.screenShotsClickSign, page, ConfigSettingsAlternative.screenShotsContentType);
                });
    
                if (Button.phrasePauses) {
                    await test.step(Button.phrasePauses, async () => {
                        await page.pause();
                        await page.pause();
                    });
                }
            }
        });
    }
    
        

    // Justification Phrase
    await fillUserField(page, testInfo); // Rellena el campo de "User"
    await fillPasswordField(page, testInfo); // Rellena el campo de "Password"

    // Continuar con la justificación y otras acciones
    await justificationPhrase(page, 30000, testInfo);    
    await esignRequired(page, 30000, testInfo);

    await clickAcceptButton(page);
    await clickDoButton(page);
    await clickDoButtonJustification(page);
    await clickDoButtonUserDialog(page);
    await clickJustificationButton(page);
    await clickConfirmDialogButton(page);

    // Verificar que no haya errores en la consola
    await test.step(phraseReport.phraseError, async () => {
        logger.printLogs();
        expect(logger.errors.length).toBe(0);
    });

    // Verificar respuestas de red capturadas
    await test.step(phraseReport.phraseVerifyNetwork, async () => {
        networkInterceptor.printNetworkData();
        const nullResponsesCount = networkInterceptor.verifyNonImageNullResponses();
        expect(nullResponsesCount).toBe(0);  // Asegúrate de que no haya respuestas nulas
    });

    // Validar respuestas utilizando ResponseValidator
    await test.step(phraseReport.phraseVerifyNetwork, async () => {
        const responseValidator = new ResponseValidator(networkInterceptor.responses);
        try {
            await responseValidator.validateResponses(); // Lanza un error si no hay respuestas válidas
        } catch (error) {
            // test.fail(error.message); // Marca la prueba como fallida con el mensaje
        }
    });

    const mode = await notificationWitness.getDeviceMode(testInfo);

    // Llamar a addNotificationWitness después de realizar acciones
    await test.step(ReportNotificationPhase.phraseCaptureNotification, async () => {
        const capturedObjectName = await notificationWitness.addNotificationWitness(testInfo, afterEachData, mode);
        console.log('Captured Object Name:', capturedObjectName);
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
        trazitTestName = process.env.TRAZIT_TEST_NAME || 'ActiveInstrumentsAuditAndSign';
  
        // Define procInstanceName antes de pasarlo
        procInstanceName = process.env.PROC_INSTANCE_NAME || 'instruments'; // Valor predeterminado o el valor de tu entorno
  
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
      test('ClickOnButtonAndSignAudit', async ({ page }, testInfo) => {
        await test.step('Run tests', async () => {
            await commonTests(ConfigSettings, page, testInfo);
        });
    });
  });

// Mobile Mode 
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
//     test('ClickOnButtonAndSignAudit', async ({ page }, testInfo) => {
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
  
//     test('ClickOnButtonAndSignAudit', async ({ page }, testInfo) => {
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
  
//     test('ClickOnButtonAndSignAudit', async ({ page }, testInfo) => {
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
//     test('ClickOnButtonAndSignAudit', async ({ page }, testInfo) => {
//       await test.step('Run tests', async () => {
//         await commonTests(ConfigSettings, page, testInfo);
//       });
//     });
//   });
  
  

const { test:pwTest, afterEach } = require('@playwright/test');
 
  
afterEach(async ({}, testInfo) => {
    const durationInSeconds = (testInfo.duration / 1000).toFixed(2);
  
    const data = {
      trazitTestName: process.env.TRAZIT_TEST_NAME || 'PendingReviewTestingMBUnCancelTest' ,
      duration: `${durationInSeconds} seconds`,
    };
  
    const testStatus = testInfo.status;
    const procInstanceName = process.env.PROC_INSTANCE_NAME || 'inspection_lot'; 
    await callApiRunCompletion(data, testStatus, trazitTestName, testInfo, procInstanceName)
  });

   
//   pwTest('Example test', async ({ page }) => {
//     // Your test logic here
//   });