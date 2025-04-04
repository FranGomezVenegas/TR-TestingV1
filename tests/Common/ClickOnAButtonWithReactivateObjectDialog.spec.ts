import { test, expect } from '@playwright/test';

import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';
import { LogIntoPlatformProcDefinition } from '../1TRAZiT-Commons/logIntoProcDefinition.js';

import { buttonWithDialog as dataForTestFromFile } from '../../trazit-models/test-config-instruments-newInstrument.js';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';
import {validateNotificationTexts} from '../1TRAZiT-Commons/notificationProcsDefinition.js';

import { Logger, NetworkInterceptor, ResponseValidator, phraseReport } from '../1TRAZiT-Commons/consoleAndNetworkMonitor';
import { NotificationWitness, ReportNotificationPhase } from '../1TRAZiT-Commons/notification';
import { attachScreenshot, clickDoButtonJustification, clickDoButtonUserDialog, clickJustificationButton, clickConfirmDialogButton, clickElement, justificationPhrase, fillUserField, fillPasswordField, clickAcceptButton, clickDoButton, esignRequired } from '../1TRAZiT-Commons/actionsHelper';

import {handleTabInteraction} from '../1TRAZiT-Commons/tabsInteractions';
import {handleActionNameInteraction} from '../1TRAZiT-Commons/actionsNameInteractionsWithoutDialog.js';
import {handleObjectByTabsWithSearchInteraction} from '../1TRAZiT-Commons/objectByTabsWithSearch';

import { handleCardsInteraction } from '../../tests/1TRAZiT-Commons/utils/ProcDefinition/interactionCards/cardsInteraction.js';
import { handleSelectCard } from '../1TRAZiT-Commons/utils/ProcDefinition/selectCard/selectCard.js';

// Definir los tipos para los mensajes de consola y errores
interface ConsoleMessage {
    type: string;
    text: string;
    location: string | undefined;
    timestamp: string;
    args: string[];
}

interface PageError {
    message: string;
    stack: string;
    timestamp: string;
}

interface NetworkError {
    url: string;
    method: string;
    failure: string;
    timestamp: string;
}

interface ResponseError {
    url: string;
    status: number;
    statusText: string;
    timestamp: string;
    body?: string; // body puede ser opcional en los errores de respuesta
}

interface WorkerError {
    url: string;
    timestamp: string;
}

// Función con todos los tests.
const commonTests = async (ConfigSettings, page, testInfo) => {
    // await handleMenus(page);

    // Crear instancias de Logger y NetworkInterceptor
    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();

    let buttonWithDialog;

    // Si los datos de configuración están disponibles, procesar el JSON
    if (ConfigSettings && ConfigSettings.dataForTest) {
        let unescapedString = ConfigSettings.dataForTest.replace(/\\+/g, '\\');
        try {
            buttonWithDialog = JSON.parse(unescapedString);
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
        buttonWithDialog = JSON.parse(buttonWithDialog.testDataGame);
    } else {
        buttonWithDialog = dataForTestFromFile;
    }

    // Adjuntar Logger y NetworkInterceptor a la página
    await test.step(phraseReport.phraseNetworkInterceptionAndLogger, async () => {
        logger.attachToPage(page);
        networkInterceptor.attachToPage(page);
    });

    // Notification Handling
    const expectedTexts = [
        buttonWithDialog.textInNotif1?.toLowerCase(),
        buttonWithDialog.textInNotif2?.toLowerCase(),
        buttonWithDialog.textInNotif3?.toLowerCase(),
    ];

    // NOTIFICACIONES
    let afterEachData = {
        textInNotif1: buttonWithDialog.textInNotif1,
        textInNotif2: buttonWithDialog.textInNotif2,
        textInNotif3: buttonWithDialog.textInNotif3,
    };

    const notificationWitness = new NotificationWitness(page);

    // Proc Management
    await handleCardsInteraction(page, testInfo, buttonWithDialog);
    await handleSelectCard(page, testInfo, buttonWithDialog);
    
    // Llamadas a interacciones previas
    await handleTabInteraction(page, testInfo, ConfigSettingsAlternative, buttonWithDialog);
    // Interacción con el objeto con búsqueda
    await handleObjectByTabsWithSearchInteraction(page, testInfo, ConfigSettingsAlternative, buttonWithDialog);
    
    await page.waitForTimeout(2000);
    await handleActionNameInteraction(page, testInfo, buttonWithDialog);

    // Estructura para almacenar todos los mensajes de consola y errores del sistema
    const consoleMessages: ConsoleMessage[] = [];
    const systemErrors = {
        pageErrors: [] as PageError[],
        networkErrors: [] as NetworkError[],
        responseErrors: [] as ResponseError[],
        dialogErrors: [] as string[],  // Asumiendo que los errores de diálogo son simplemente mensajes de texto
        workerErrors: [] as WorkerError[],
    };

    // Manejadores para capturar mensajes y errores
    const handleConsoleMessage = (msg) => {
        const logEntry: ConsoleMessage = {
            type: msg.type(),
            text: msg.text(),
            location: msg.location(),
            timestamp: new Date().toISOString(),
            args: msg.args().map(arg => arg.toString()),
        };

        console.log(`[${logEntry.timestamp}] Console ${logEntry.type}:`, logEntry.text);
        consoleMessages.push(logEntry); // Almacenar todos los mensajes de consola
    };

    const handlePageError = (error) => {
        systemErrors.pageErrors.push({
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
        });
        console.error(`[Page Error] ${error.message}`);
    };

    const handleRequestFailed = (request) => {
        systemErrors.networkErrors.push({
            url: request.url(),
            method: request.method(),
            failure: request.failure()?.errorText || 'Unknown error',
            timestamp: new Date().toISOString(),
        });
        console.error(`[Network Error] ${request.failure()?.errorText || 'Unknown error'} - ${request.url()}`);
    };

    const handleResponse = async (response) => {
        if (!response.ok()) {
            const errorEntry: ResponseError = {
                url: response.url(),
                status: response.status(),
                statusText: response.statusText(),
                timestamp: new Date().toISOString(),
            };
            try {
                errorEntry.body = await response.text();
            } catch {
                errorEntry.body = 'Unable to fetch response body';
            }
            systemErrors.responseErrors.push(errorEntry);
            console.error(`[Response Error] ${response.status()} - ${response.url()}`);
        }
    };

    const handleWorkerError = (worker) => {
        systemErrors.workerErrors.push({
            url: worker.url(),
            timestamp: new Date().toISOString(),
        });
        console.error(`[Worker Error] Worker at ${worker.url()} encountered an error.`);
    };
    // Definir el manejador de diálogos aquí, fuera del bloque try
    const handleDialog = async (dialog) => {
        console.error(`Se detectó un alert con el mensaje: "${dialog.message()}"`);
        await dialog.dismiss(); // Cierro el alert. 
        throw new Error(`El test falló debido a un alert con el mensaje: "${dialog.message()}"`);
    };

    // Configurar listeners
    page.on('console', handleConsoleMessage);
    page.on('pageerror', handlePageError);
    page.on('requestfailed', handleRequestFailed);
    page.on('response', handleResponse);
    page.on('worker', handleWorkerError);

    // Configurar el listener 'dialog' justo antes del clic
    page.on('dialog', handleDialog);

    await clickElement(page, buttonWithDialog.numbersOfDays.label);

    await test.step(buttonWithDialog.phrasePauses, async () => {
        await page.pause();
        await page.pause();
        await page.pause();
    });
    await page.getByLabel(buttonWithDialog.numbersOfDays.label).fill(buttonWithDialog.numbersOfDays.value);

    await test.step(buttonWithDialog.phrasePauses, async () => {
        await page.pause();
        await page.pause();
        await page.pause();
    });

    await page.locator(buttonWithDialog.refreshLocator).click({ timeout: 2000 });

    // Remover listeners y adjuntar errores al test
    page.removeAllListeners();
    page.off('dialog', handleDialog);

    // Adjuntar los errores y mensajes al reporte del test
    testInfo.attachments.push({
        name: 'messages.json',
        contentType: 'application/json',
        body: Buffer.from(JSON.stringify({ consoleMessages, systemErrors }, null, 2)),
    });

    // Lanzar un error si se detectaron problemas críticos
    if (
        systemErrors.pageErrors.length > 0 ||
        systemErrors.networkErrors.length > 0 ||
        systemErrors.responseErrors.length > 0
    ) {
        throw new Error('Errores detectados durante la ejecución del test.');
    }
    await test.step(buttonWithDialog.phrasePauses, async () => {
        await page.pause();
        await page.pause();
        await page.pause();
    });
    // await clickElement(page, buttonWithDialog.optionToReactivate.toReactivate);
    await page.locator(`#${buttonWithDialog.optionToReactivate.toReactivate}`).click({timeout: 5000}); 

    await test.step(buttonWithDialog.phrasePauses, async () => {
        await page.pause();
        await page.pause();
        await page.pause();
    });
    await page.getByRole('option', { name: buttonWithDialog.optionToReactivate.option }).click({timeout: 5000});

    await test.step(buttonWithDialog.phrasePauses, async () => {
        await page.pause();
        await page.pause();
        await page.pause();
    });
    await test.step(buttonWithDialog.phraseScreenShots, async () => {
        await attachScreenshot(testInfo, buttonWithDialog.screenShotsFilledForm, page, ConfigSettingsAlternative.screenShotsContentType);
        if (buttonWithDialog.phrasePauses) {
            await page.pause();
        }
    });

    if (procInstanceName === 'proc_management') {
        await test.step("Final checks", async () => {
            await clickDoButton(page);
            await clickConfirmDialogButton(page);
        });
    } else {
        await test.step("Final checks", async () => {
            await clickDoButton(page);

            // Justificación
            await fillUserField(page, testInfo);
            await fillPasswordField(page, testInfo);

            // Continuar con la justificación y otras acciones
            await justificationPhrase(page, 30000, testInfo);   
            await esignRequired(page, 30000, testInfo);

            await clickAcceptButton(page);
            await clickDoButton(page);
            await clickDoButtonJustification(page);
            await clickDoButtonUserDialog(page);
            await clickJustificationButton(page);
            await clickConfirmDialogButton(page);
        });
    }

    // Validate responses using ResponseValidator
    await test.step(phraseReport.phraseVerifyNetwork, async () => {
        const responseValidator = new ResponseValidator(networkInterceptor.responses);
        try {
            await responseValidator.validateResponses(); // Throws an error if there are no valid responses
        } catch (error) {
            // test.fail(error.message); // Mark the test as failed with the message
        }
    });

    if (procInstanceName === 'proc_management') {
        await test.step(buttonWithDialog.phrasePauses, async () => {
            await page.waitForTimeout(1000);
        });
        // Notification proc_management
        await validateNotificationTexts(page, expectedTexts, testInfo);
    } else {
        await test.step(buttonWithDialog.phrasePauses, async () => {
            await page.waitForTimeout(1500);
        });
        // Notification handling post-action
        const mode = await notificationWitness.getDeviceMode(testInfo);
        await test.step(ReportNotificationPhase.phraseCaptureNotification, async () => {
            const capturedObjectName = await notificationWitness.addNotificationWitness(testInfo, afterEachData, mode);
            console.log('Captured Object Name:', capturedObjectName);
        });
    } 
};




let trazitTestName;
let procInstanceName;
let ConfigSettings;
    
test.describe('Desktop Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await test.step('Set viewport size for desktop', async () => {
      await page.setViewportSize({ width: 1365, height: 821 });
    });

    trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution';
    procInstanceName = process.env.PROC_INSTANCE_NAME || 'default';

    let logPlat;

    await test.step('Perform common setup', async () => {
      if (procInstanceName === 'proc_management') {
        logPlat = new LogIntoPlatformProcDefinition({ page });
      } else {
        logPlat = new LogIntoPlatform({ page });
      }

      ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
    });

    await test.step('Wait for 1 second', async () => {
      await page.waitForTimeout(1000);
    });

    if (procInstanceName === 'proc_management') {
      await test.step('Wait for 5 seconds', async () => {
        await page.waitForTimeout(6500);
      });
    } else {
      const openWindow = new OpenProcedureWindow({ page });

      await test.step('Open procedure window for desktop', async () => {
        await test.step('Wait for 3 seconds', async () => {
          await page.waitForTimeout(3000);
        });
        await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings);
      });
    }
  });

  test('ClickOnAButtonWithReactivateObjectDialog', async ({ page }, testInfo) => {
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
      
//       trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution';
//       procInstanceName = process.env.PROC_INSTANCE_NAME || 'default';

//       let logPlat;

//       await test.step('Perform common setup', async () => {
//         if (procInstanceName === 'proc_management') {
//           logPlat = new LogIntoPlatformProcDefinition({ page });
//         } else {
//           logPlat = new LogIntoPlatform({ page });
//         }

//         ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
//       });
  
//       await test.step('Wait for 1 seconds', async () => {
//           await page.waitForTimeout(1000);
//       });

//       if (procInstanceName === 'proc_management') {
//         await test.step('Wait for 5 seconds', async () => {
//           await page.waitForTimeout(6500);
//         });
//       } else {
//         const openWindow = new OpenProcedureWindow({ page });
  
//         await test.step('Open procedure window for mobile TV', async () => {
//           await test.step('Wait for 3 seconds', async () => {
//             await page.waitForTimeout(3000);
//           });
//           await openWindow.openWindowForMobile(page, testInfo, ConfigSettings);
//         });
//       }
//     });
  
//     test('ClickOnAButtonWithReactivateObjectDialog', async ({ page }, testInfo) => {
//       await test.step('Run tests', async () => {
//         await commonTests(ConfigSettings, page, testInfo);
//       });
//     });
//   });


// // Mobile Mode - Retrato
// test.describe('Mobile mode Retrato', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//       // Tamaño del viewport para móviles en modo retrato
//       await test.step('Set mobile portrait viewport size', async () => {
//         await page.setViewportSize({ width: 812, height: 385 });
//       });
  
//       trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution';
//       procInstanceName = process.env.PROC_INSTANCE_NAME || 'default';

//       let logPlat;

//       await test.step('Perform common setup', async () => {
//         if (procInstanceName === 'proc_management') {
//           logPlat = new LogIntoPlatformProcDefinition({ page });
//         } else {
//           logPlat = new LogIntoPlatform({ page });
//         }

//         ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
//       });
  
//       await test.step('Wait for 1 seconds', async () => {
//           await page.waitForTimeout(1000);
//       });

//       if (procInstanceName === 'proc_management') {
//         await test.step('Wait for 5 seconds', async () => {
//           await page.waitForTimeout(6500);
//         });
//       } else {
//         const openWindow = new OpenProcedureWindow({ page });
  
//         await test.step('Open procedure window for mobile', async () => {
//           await test.step('Wait for 3 seconds', async () => {
//             await page.waitForTimeout(3000);
//           });
//           await openWindow.openWindowForMobile(page, testInfo, ConfigSettings);
//         });
//       }
//     });
  
//     test('ClickOnAButtonWithReactivateObjectDialog', async ({ page }, testInfo) => {
//       await test.step('Run tests', async () => {
//         await commonTests(ConfigSettings, page, testInfo);
//       });
//     });
//   });
  
// // Tablets Mode
// test.describe('Tablets mode', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//         // Tablet viewport size
//         await test.step('Set tablet viewport size', async () => {
//             await page.setViewportSize({ width: 768, height: 1024 });
//         });

//         trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution';
//         procInstanceName = process.env.PROC_INSTANCE_NAME || 'default';

//         let logPlat;

//         await test.step('Perform common setup', async () => {
//             if (procInstanceName === 'proc_management') {
//                 logPlat = new LogIntoPlatformProcDefinition({ page });
//             } else {
//                 logPlat = new LogIntoPlatform({ page });
//             }

//             ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
//         });

//         await test.step('Wait for 1 second', async () => {
//             await page.waitForTimeout(1000);
//         });

//         if (procInstanceName === 'proc_management') {
//             await test.step('Wait for 5 seconds', async () => {
//                 await page.waitForTimeout(6500);
//             });
//         } else {
//             const openWindow = new OpenProcedureWindow({ page });

//             await test.step('Open procedure window for tablet', async () => {
//                 await test.step('Wait for 3 seconds', async () => {
//                     await page.waitForTimeout(3000);
//                 });
//                 await openWindow.openWindowForMobile(page, testInfo, ConfigSettings);
//             });
//         }
//     });

//     test('ClickOnAButtonWithReactivateObjectDialog', async ({ page }, testInfo) => {
//         await test.step('Run tests', async () => {
//             await commonTests(ConfigSettings, page, testInfo);
//         });
//     });
// });

// // Tablets Mode - Retrato
// test.describe('Tablets mode Retrato', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//         // Tablet portrait viewport size
//         await test.step('Set tablet portrait viewport size', async () => {
//             await page.setViewportSize({ width: 1024, height: 768 });
//         });

//         trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution';
//         procInstanceName = process.env.PROC_INSTANCE_NAME || 'default';

//         let logPlat;

//         await test.step('Perform common setup', async () => {
//             if (procInstanceName === 'proc_management') {
//                 logPlat = new LogIntoPlatformProcDefinition({ page });
//             } else {
//                 logPlat = new LogIntoPlatform({ page });
//             }

//             ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
//         });

//         await test.step('Wait for 1 second', async () => {
//             await page.waitForTimeout(1000);
//         });

//         if (procInstanceName === 'proc_management') {
//             await test.step('Wait for 5 seconds', async () => {
//                 await page.waitForTimeout(6500);
//             });
//         } else {
//             const openWindow = new OpenProcedureWindow({ page });

//             await test.step('Open procedure window for tablet', async () => {
//                 await test.step('Wait for 3 seconds', async () => {
//                     await page.waitForTimeout(3000);
//                 });
//                 await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings);
//             });
//         }
//     });

//     test('ClickOnAButtonWithReactivateObjectDialog', async ({ page }, testInfo) => {
//         await test.step('Run tests', async () => {
//             await commonTests(ConfigSettings, page, testInfo);
//         });
//     });
// });
  

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