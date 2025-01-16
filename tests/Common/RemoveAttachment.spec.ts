import { test, expect } from '@playwright/test';

import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { removeAttachment as dataForTestFromFile } from '../../trazit-models/test-config-instruments-attachment';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

import { Logger, NetworkInterceptor, ResponseValidator, phraseReport } from '../1TRAZiT-Commons/consoleAndNetworkMonitor';
import { NotificationWitness, ReportNotificationPhase } from '../1TRAZiT-Commons/notification';
import { clickDoButton, esignRequired, clickElementByText, clickElement, fillUserField,fillPasswordField, justificationPhrase, clickAcceptButton, attachScreenshot } from '../1TRAZiT-Commons/actionsHelper';

import {handleTabInteraction} from '../1TRAZiT-Commons/tabsInteractions';
import {handleActionNameInteraction} from '../1TRAZiT-Commons/actionsNameInteractionsWithoutDialog';
import {handleObjectByTabsWithSearchInteraction} from '../1TRAZiT-Commons/objectByTabsWithSearch';
import {handleRowActionsInteraction} from '../1TRAZiT-Commons/rowActionsInteractions';
import { handleMenus } from '../1TRAZiT-Commons/handleMenus';

//Function with all tests.
const commonTests = async (ConfigSettings, page, testInfo) => { 
        await handleMenus(page);

        // Create instances of Logger and NetworkInterceptor
        const logger = new Logger();
        const networkInterceptor = new NetworkInterceptor();

        let removeAttachment;

        // If configuration data is available, process the JSON
        if (ConfigSettings && ConfigSettings.dataForTest) {
            let unescapedString = ConfigSettings.dataForTest.replace(/\\+/g, '\\');
            try {
              removeAttachment = JSON.parse(unescapedString);
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
              removeAttachment = JSON.parse(removeAttachment.testDataGame)
        } else {
            removeAttachment = dataForTestFromFile;
        }

        // Attach Logger and NetworkInterceptor to the page
        await test.step(phraseReport.phraseNetworkInterceptionAndLogger, async () => {
            logger.attachToPage(page);
            networkInterceptor.attachToPage(page);
        });

        // NOTIFICATIONS
        let afterEachData = {
            textInNotif1: removeAttachment.textInNotif1,
            textInNotif2: removeAttachment.textInNotif2,
            textInNotif3: removeAttachment.textInNotif3,
        };

        const notificationWitness = new NotificationWitness(page);

        // Llamadas a interacciones previas
        await handleTabInteraction(page, testInfo, ConfigSettingsAlternative, removeAttachment);

        // Llamo a la funcion para comprobar si un objectByTabs tiene un search. Essta funcion solo controla el search
        // clica en este y añada el campo que se desea buscar.
        await handleObjectByTabsWithSearchInteraction(page, testInfo, ConfigSettingsAlternative, removeAttachment);
        
        // Llamada a handleDragDropBoxesInteraction y captura si se ejecutó correctamente
        const rowActions = await handleRowActionsInteraction(page, removeAttachment, testInfo); 
        console.log("Resultado de handleRowActionsInteraction:", rowActions);

        // Si `handleRowActionsInteraction` se ejecutó correctamente, omite las secciones específicas
        if (rowActions) {
            console.log("El resultado fue verdadero, realizando acciones adicionales...");
            // Si rowActions es true, realiza las acciones deseadas
            await fillUserField(page, testInfo); // Rellena el campo de "User"
            await fillPasswordField(page, testInfo); // Rellena el campo de "Password"

            // Continuar con la justificación y otras acciones
            await justificationPhrase(page, 30000, testInfo);    
            await clickAcceptButton(page);

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
            
            await test.step(ReportNotificationPhase.phraseCaptureNotification, async () => {
                const capturedObjectName = await notificationWitness.addNotificationWitness(testInfo, afterEachData, mode);
                console.log('Captured Object Name:', capturedObjectName);
            });
            
            return
        }
    
        console.log("El resultado fue falso, continuando con el flujo normal...");

        // Si `handleDragDropBoxesInteraction` no fue exitoso, continuar con el flujo normal
         await handleActionNameInteraction(page, testInfo, removeAttachment);

        
        // Realizar las acciones del test
        test.step(removeAttachment.phrasePauses, async () => {
            await page.pause();
        })
        
        // await test.step(removeAttachment.phraseScreenShots, async () => {
        //     await attachScreenshot(testInfo, removeAttachment.screenShotsSelect, page, ConfigSettingsAlternative.screenShotsContentType);
        //     await test.step(removeAttachment.phasePauses, async () => {
        //         await page.pause();
        //     });
        // });

        await test.step(removeAttachment.phraseSelectRemove, async () => {
            await clickElementByText(page, removeAttachment.attachmentToDelete); 
            //await page.getByText('https://www.trazit.net/').first().click();
        });

        await test.step(removeAttachment.phraseScreenShots, async () => {
            await attachScreenshot(testInfo, removeAttachment.screenShotsSelect, page, ConfigSettingsAlternative.screenShotsContentType);
            if (removeAttachment.phrasePauses) {
                await page.pause();
            }
        });

        await clickAcceptButton(page);

        // await test.step("Accept", async () => {
        //     await page.getByRole('button', { name: removeAttachment.buttonAccept }).nth(1).click();
        // });

        await test.step(removeAttachment.phraseScreenShots, async () => {
            await attachScreenshot(testInfo, removeAttachment.screenShotsAccept, page, ConfigSettingsAlternative.screenShotsContentType);
        });

        // Justification Phrase
        await fillUserField(page, testInfo);
        await fillPasswordField(page, testInfo);
        await justificationPhrase(page, 30000, testInfo); 
        await esignRequired(page, 30000, testInfo);

        await clickAcceptButton(page);
        await clickDoButton(page);
        
        // await test.step("Accept", async () => {
        //     await page.getByRole('button', { name: removeAttachment.buttonAccept }).nth(1).click();
        // });
        const acceptButton = page.getByRole('button', { name: removeAttachment.buttonAccept }).nth(1);

        if (await acceptButton.isVisible()) {
            await test.step("Accept", async () => {
                await acceptButton.click();
            });
        } else {
            console.log("Accept button not found, skipping step.");
        }
        
        
        // Verify that there are no console errors
        await test.step(phraseReport.phraseError, async () => {
            logger.printLogs();
            expect(logger.errors.length).toBe(0);
        });

        // Verify captured network responses
        await test.step(phraseReport.phraseVerifyNetwork, async () => {
            networkInterceptor.printNetworkData();
            const nullResponsesCount = networkInterceptor.verifyNonImageNullResponses();
            expect(nullResponsesCount).toBe(0);  // Ensure there are no null responses
        });

        // Validate responses using ResponseValidator
        await test.step(phraseReport.phraseVerifyNetwork, async () => {
            const responseValidator = new ResponseValidator(networkInterceptor.responses);
            try {
                await responseValidator.validateResponses(); // Throws an error if there are no valid responses
            } catch (error) {
                // test.fail(error.message); // Mark the test as failed with the message
            }
        });

        test.step(removeAttachment.phrasePauses, async () => {
            await page.pause();
            await page.pause();
            await page.pause();
        })
        const mode = await notificationWitness.getDeviceMode(testInfo);

        // Call addNotificationWitness after performing actions
        await test.step(ReportNotificationPhase.phraseCaptureNotification, async () => {
            const capturedObjectName = await notificationWitness.addNotificationWitness(testInfo, afterEachData, mode);
            console.log('Captured Object Name:', capturedObjectName);
        });
}
    
        

let trazitTestName;
let procInstanceName;
let ConfigSettings;
    
test.describe('Desktop Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await test.step('Set viewport size for desktop', async () => {
        await page.setViewportSize({ width: 1365, height: 821 });
      });
  
      const logPlat = new LogIntoPlatform({ page });
        trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution';
  
        // Define procInstanceName antes de pasarlo
        procInstanceName = process.env.PROC_INSTANCE_NAME || 'default'; // Valor predeterminado o el valor de tu entorno
  
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
      test('RemoveAttachmentAccept', async ({ page }, testInfo) => {
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
//     test('RemoveAttachmentAccept', async ({ page }, testInfo) => {
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
  
//     test('RemoveAttachmentAccept', async ({ page }, testInfo) => {
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
  
//     test('RemoveAttachmentAccept', async ({ page }, testInfo) => {
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
//     test('RemoveAttachmentAccept', async ({ page }, testInfo) => {
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