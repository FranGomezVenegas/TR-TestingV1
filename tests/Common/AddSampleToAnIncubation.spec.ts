import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config.js';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform.js';

import { Button as dataForTestFromFile } from '../../trazit-models/test-config-instruments-activate';
import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls.js';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow.js';

import { Logger, NetworkInterceptor, ResponseValidator, phraseReport } from '../1TRAZiT-Commons/consoleAndNetworkMonitor.js';
import { NotificationWitness, ReportNotificationPhase } from '../1TRAZiT-Commons/notification.js';

import { clickDoButton, esignRequired, clickButtonById, clickElement, clickElementByText, justificationPhrase, clickAcceptButton, attachScreenshot } from '../1TRAZiT-Commons/actionsHelper.js';
import { fillUserField, fillPasswordField } from '../1TRAZiT-Commons/actionsHelper.js';

import { handleTabInteraction } from '../1TRAZiT-Commons/tabsInteractions.js';
import { handleRowActionsInteraction } from '../1TRAZiT-Commons/rowActionsInteractions.js';
import { handleObjectByTabsWithSearchInteraction } from '../1TRAZiT-Commons/objectByTabsWithSearch.js';
import {handleActionNameInteraction} from '../1TRAZiT-Commons/actionsNameInteractions';
import { handleMenus } from '../1TRAZiT-Commons/handleMenus';


// const commonTests = async (ConfigSettings: any, page: any, testInfo: any) => {
//     await handleMenus(page);

//     // Create instances of Logger and NetworkInterceptor
//     const logger = new Logger();
//     const networkInterceptor = new NetworkInterceptor();

//     let Button;

//     // If configuration data is available, process the JSON
//     if (ConfigSettings && ConfigSettings.dataForTest) {
//         let unescapedString = ConfigSettings.dataForTest.replace(/\\+/g, '\\');
//         try {
//             Button = JSON.parse(unescapedString);
//         } catch (error) {
//             console.error("Error parsing JSON:", error);
//         }
//         Button = JSON.parse(Button.testDataGame);
//     } else {
//         Button = dataForTestFromFile;
//     }

//     // Attach Logger and NetworkInterceptor to the page
//     await test.step(phraseReport.phraseNetworkInterceptionAndLogger, async () => {
//         logger.attachToPage(page);
//         networkInterceptor.attachToPage(page);
//     });

//     // NOTIFICATIONS
//     let afterEachData = {
//         textInNotif1: Button.textInNotif1,
//         textInNotif2: Button.textInNotif2,
//         textInNotif3: Button.textInNotif3,
//     };

//     const notificationWitness = new NotificationWitness(page);

//     // selecciono el elemento 
//     await test.step(Button.phraseSelect, async () => {
//         await page.getByRole('cell', { name: Button.selectName, exact: true }).click({timeout: 5000});

//         await test.step(Button.phraseScreenShots, async () => {
//             await attachScreenshot(testInfo, Button.screenShotsSelect, page, ConfigSettingsAlternative.screenShotsContentType);
//             if (Button.phrasePauses) {
//                 await page.pause();
//             }
//         });
//     });
    

//     let selectElement: any;

//     // Paso 1: Encontrar el elemento y hacer scroll hacia él
//     await test.step(Button.phraseElementToMove, async () => {
//         selectElement = await page.getByRole('cell', { name: Button.selectElementToMove, exact: true });
//         await selectElement.scrollIntoViewIfNeeded();
//         await page.waitForTimeout(500);

//         await test.step(Button.phraseScreenShots, async () => {
//             await attachScreenshot(testInfo, Button.screenShotsElementToMove, page, ConfigSettingsAlternative.screenShotsContentType);
//             if (Button.phrasePauses) {
//                 await page.pause();
//             }
//         });
//     });

//     // Paso 2: Variable para la posicion del elemento
//     let positionElement: { x: number; y: number; width: number; height: number } | null = null;

//     // Paso 3: Obtengo la posición inicial del elemento seleccionado.
//     await test.step(Button.phraseInitialPosition, async () => {
//         const boundingBox = await selectElement.boundingBox();
//         console.log('Elemento a mover:', await selectElement.textContent());
//         console.log('Posición del elemento antes de mover:', boundingBox);
//         positionElement = boundingBox;
//     });

//     // Paso 4: Realizar el drag and drop
//   await test.step(Button.phraseDrapAndDrop, async () => {
//     const mainBox = await page.locator(Button.container);
//     const posicionMainBox = await mainBox.boundingBox();

//     if (positionElement && posicionMainBox) {
//       // Mueve el ratón a la posición central de elemento seleccionado
//       await page.mouse.move(
//         positionElement.x + positionElement.width / 2,
//         positionElement.y + positionElement.height / 2
//       );
//       await page.mouse.down();
//       console.log('Iniciando arrastre del elemento 132');

//       await test.step(Button.phraseScreenShots, async () => {
//         await attachScreenshot(testInfo, Button.screenShotsDrapStarted, page, ConfigSettingsAlternative.screenShotsContentType);
//         if (Button.phrasePauses) {
//             await page.pause();
//         }
//     });

//       const steps = 50; // Aumentar el número de pasos para una animación más suave
//       for (let i = 0; i <= steps; i++) {
//         const x = posicionMainBox.x + posicionMainBox.width / 2;
//         const y = posicionMainBox.y + posicionMainBox.height / 2;
//         await page.mouse.move(x, y, { steps: 20 }); // Mover el ratón a la posición central del mainBox
//         await page.waitForTimeout(30); // Reducir el tiempo de espera entre pasos
//       }

//       await page.mouse.up();
//       console.log('Arrastre completado para el elemento');
//       await page.waitForTimeout(2000);
//       await test.step(Button.phraseScreenShots, async () => {
//         await attachScreenshot(testInfo, Button.screenShotsDraggingOfTheElement, page, ConfigSettingsAlternative.screenShotsContentType);
//             if (Button.phrasePauses) {
//                 await page.pause();
//             }
//         });
//     }
//   });

//   // Justification Phrase
//   await fillUserField(page, testInfo); // Rellena el campo de "User"
//   await fillPasswordField(page, testInfo); // Rellena el campo de "Password"

//   // Continuar con la justificación y otras acciones
//   await justificationPhrase(page, 30000, testInfo);  
//   await esignRequired(page, 30000, testInfo);

//   await clickAcceptButton(page);
//   await clickDoButton(page);
  
//   // Verificar que no haya errores en la consola
//   await test.step(phraseReport.phraseError, async () => {
//     logger.printLogs();
//     expect(logger.errors.length).toBe(0);
//   });

//   // Verificar respuestas de red capturadas
//   await test.step(phraseReport.phraseVerifyNetwork, async () => {
//       networkInterceptor.printNetworkData();
//       const nullResponsesCount = networkInterceptor.verifyNonImageNullResponses();
//       expect(nullResponsesCount).toBe(0);  // Asegúrate de que no haya respuestas nulas
//   });

//   // Validar respuestas utilizando ResponseValidator
//   await test.step(phraseReport.phraseVerifyNetwork, async () => {
//       const responseValidator = new ResponseValidator(networkInterceptor.responses);
//       try {
//           await responseValidator.validateResponses(); // Lanza un error si no hay respuestas válidas
//       } catch (error) {
//           // test.fail(error.message); // Marca la prueba como fallida con el mensaje
//       }
//   });

//   const mode = await notificationWitness.getDeviceMode(testInfo);

//   // Llamar a addNotificationWitness después de realizar acciones
//   await test.step(ReportNotificationPhase.phraseCaptureNotification, async () => {
//       const capturedObjectName = await notificationWitness.addNotificationWitness(testInfo, afterEachData, mode);
//       console.log('Captured Object Name:', capturedObjectName);
//   });
// }


// Test suite setup for Desktop Mode

const commonTests = async (ConfigSettings: any, page: any, testInfo: any) => {
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

    // selecciono el elemento 
    await test.step(Button.phraseSelect, async () => {
        await page.getByRole('cell', { name: Button.selectName, exact: true }).click({timeout: 5000});

        await test.step(Button.phraseScreenShots, async () => {
            await attachScreenshot(testInfo, Button.screenShotsSelect, page, ConfigSettingsAlternative.screenShotsContentType);
            if (Button.phrasePauses) {
                await page.pause();
            }
        });
    });
    

    let selectElement: any;

    // Paso 1: Encontrar el elemento y hacer scroll hacia él
    await test.step(Button.phraseElementToMove, async () => {
        selectElement = await page.getByRole('cell', { name: Button.selectElementToMove, exact: true });
        await selectElement.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        await test.step(Button.phraseScreenShots, async () => {
            await attachScreenshot(testInfo, Button.screenShotsElementToMove, page, ConfigSettingsAlternative.screenShotsContentType);
            if (Button.phrasePauses) {
                await page.pause();
            }
        });
    });

    // Paso 2: Variable para la posicion del elemento
    let positionElement: { x: number; y: number; width: number; height: number } | null = null;

    // Paso 3: Obtengo la posición inicial del elemento seleccionado.
    await test.step(Button.phraseInitialPosition, async () => {
        const boundingBox = await selectElement.boundingBox();
        console.log('Elemento a mover:', await selectElement.textContent());
        console.log('Posición del elemento antes de mover:', boundingBox);
        positionElement = boundingBox;
    });

    // Paso 4: Realizar el drag and drop usando dragTo con movimiento lento
    await test.step(Button.phraseDrapAndDrop, async () => {
        const mainBox = await page.locator(Button.container);
        const posicionMainBox = await mainBox.boundingBox();

        if (positionElement && posicionMainBox) {
            // Usar la función dragTo con un número alto de pasos para un movimiento más lento
            await selectElement.dragTo(mainBox, {
                sourcePosition: {
                    x: positionElement.width / 2,
                    y: positionElement.height / 2
                },
                targetPosition: {
                    x: posicionMainBox.width / 2,
                    y: posicionMainBox.height / 2
                },
                steps: 250 // Aumentar el número de pasos para un movimiento más lento y que sea visible el movimiento.
            });

            console.log('Arrastre completado para el elemento');
            await page.waitForTimeout(2000);

            await test.step(Button.phraseScreenShots, async () => {
                await attachScreenshot(testInfo, Button.screenShotsDraggingOfTheElement, page, ConfigSettingsAlternative.screenShotsContentType);
                if (Button.phrasePauses) {
                    await page.pause();
                }
            });
        }
    });

    await test.step("Final checks", async () => {
        // Justification Phrase
        await fillUserField(page, testInfo); // Rellena el campo de "User"
        await fillPasswordField(page, testInfo); // Rellena el campo de "Password"

        // Continuar con la justificación y otras acciones
        await justificationPhrase(page, 30000, testInfo);  
        await esignRequired(page, 30000, testInfo);

        await clickAcceptButton(page);
        await clickDoButton(page);
    });
    
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
            await test.step('Wait for 1 seconds', async () => {
                await page.waitForTimeout(1000);
            });
            await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings);
        });
    });

    // Execute tests
    test('AddSampleToAnIncubation', async ({ page }, testInfo) => {
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
//     test('AddSampleToAnIncubation', async ({ page }, testInfo) => {
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

//       // Define procInstanceName antes de pasarlo
//       procInstanceName = process.env.PROC_INSTANCE_NAME || 'default'; // Valor predeterminado o el valor de tu entorno

//       await test.step('Perform common setup', async () => {
//           // Ahora pasas procInstanceName al llamar a commonBeforeEach
//           ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
//       });

//       await test.step('Wait for 1 seconds', async () => {
//           await page.waitForTimeout(1000);
//       });
  
//       const openWindow = new OpenProcedureWindow({ page });
  
//       await test.step('Open procedure window for mobile', async () => {
//         await test.step('Wait for 3 seconds', async () => {
//           await page.waitForTimeout(3000);
//         });
//         await openWindow.openWindowForMobile(page, testInfo, ConfigSettings);
//       });
//     });
  
//     test('AddSampleToAnIncubation', async ({ page }, testInfo) => {
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
  
//     test('AddSampleToAnIncubation', async ({ page }, testInfo) => {
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
//     test('AddSampleToAnIncubation', async ({ page }, testInfo) => {
//       await test.step('Run tests', async () => {
//         await commonTests(ConfigSettings, page, testInfo);
//       });
//     });
//   });
  
  

const { test:pwTest, afterEach } = require('@playwright/test');
 
//let procInstanceName
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

