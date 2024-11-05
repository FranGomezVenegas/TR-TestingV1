import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config.js';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform.js';
import { buttonWithDialog as dataForTestFromFile } from '../../trazit-models/test-config-instruments-newInstrument.js';
import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls.js';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow.js';
import { Logger, NetworkInterceptor, ResponseValidator, phraseReport } from '../1TRAZiT-Commons/consoleAndNetworkMonitor.js';
import { NotificationWitness, ReportNotificationPhase } from '../1TRAZiT-Commons/notification.js';
import { clickButtonById, clickElement, clickElementByText, justificationPhrase, clickAcceptButton, attachScreenshot } from '../1TRAZiT-Commons/actionsHelper.js';
import { fillUserField, fillPasswordField } from '../1TRAZiT-Commons/actionsHelper.js';
import { handleTabInteraction } from '../1TRAZiT-Commons/tabsInteractions.js';
import { handleRowActionsInteraction } from '../1TRAZiT-Commons/rowActionsInteractions.js';
import { handleActionNameInteraction } from '../1TRAZiT-Commons/actionsNameInteractions.js';
import { processTestData } from '../1TRAZiT-Commons/dialogInteraction.js';

const commonTests = async (ConfigSettings: any, page: any, testInfo: any) => {
    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();
    let buttonWithDialog: any;

    // Parse ConfigSettings data if available, or use the default data
    if (ConfigSettings && ConfigSettings.dataForTest) {
        const unescapedString = ConfigSettings.dataForTest.replace(/\\+/g, '\\');
        try {
            buttonWithDialog = JSON.parse(unescapedString);
            buttonWithDialog = JSON.parse(buttonWithDialog.testDataGame);
        } catch (error) {
            console.error("Error parsing JSON:", error);
            buttonWithDialog = dataForTestFromFile;
        }
    } else {
        buttonWithDialog = dataForTestFromFile;
    }

    // Attach Logger and NetworkInterceptor to the page
    await test.step(phraseReport.phraseNetworkInterceptionAndLogger, async () => {
        logger.attachToPage(page);
        networkInterceptor.attachToPage(page);
    });

    // Create a Set to store unique captured messages
    const capturedMessages = new Set<string>();

    page.on('console', async (msg) => {
        // Verificar si el tipo de mensaje es 'log' y si contiene las palabras clave
        if (msg.type() === 'log' && 
            (msg.text().includes('actionBeingPerformedModel') || 
            msg.text().includes('actionMethod'))) {
            
            // Obtener los argumentos del mensaje
            const args = await Promise.all(msg.args().map(arg => arg.jsonValue()));
            const jsonOutput = JSON.stringify(args, null, 2);

            // Verificar si el mensaje ya fue capturado
            if (!capturedMessages.has(jsonOutput)) {
                capturedMessages.add(jsonOutput);
                console.log(`\nCaptured actionBeingPerformedModel or actionMethod: ${jsonOutput}`);
            }
        }
    });


    // Notification Handling
    const afterEachData = {
        textInNotif1: buttonWithDialog.textInNotif1,
        textInNotif2: buttonWithDialog.textInNotif2,
        textInNotif3: buttonWithDialog.textInNotif3,
    };

    const notificationWitness = new NotificationWitness(page);

    // Click button by name
    await handleActionNameInteraction(page, testInfo, buttonWithDialog);

    // Handle dialog interaction
    const dialogInfo = buttonWithDialog.dialogInfo;
    await test.step('Handle dialog fields', async () => {
        if (dialogInfo && dialogInfo.fields) {
            for (const field of dialogInfo.fields) {
                const fieldKey = Object.keys(field)[0];
                const fieldData = field[fieldKey];

                if (fieldData.label_en) {
                    const selector = `input[name="${fieldData.selObjectPropertyName || fieldKey}"]`;

                    try {
                        await page.waitForSelector(selector, { state: 'visible', timeout: 3000 });
                        await page.fill(selector, fieldData.defaultValue || '');
                        console.log(`Filled field "${fieldData.label_en}" with value: ${fieldData.defaultValue}`);
                    } catch (error) {
                        console.error(`Failed to fill field "${fieldData.label_en}":`, error);
                    }
                }
            }
        }
    });

    // Validate and process captured messages
    await test.step('Validate captured messages', async () => {
        const validCapturedMessages = Array.from(capturedMessages).filter(msg => {
            try {
                JSON.parse(msg);
                return true;
            } catch {
                console.warn(`Invalid JSON message: ${msg}`);
                return false;
            }
        });

        const parsedMessages = validCapturedMessages.map(msg => {
            try {
                return JSON.parse(msg);
            } catch (error) {
                console.error(`Error parsing JSON: ${msg}`, error);
                return null;
            }
        }).filter(Boolean);

        if (parsedMessages.length > 0) {
            await processTestData(page, parsedMessages, JSON.stringify(buttonWithDialog));
        }
    });

    // Screenshot handling
    await test.step(buttonWithDialog.phraseScreenShots, async () => {
        await attachScreenshot(testInfo, buttonWithDialog.screenShotsFilledForm, page, ConfigSettingsAlternative.screenShotsContentType);
        if (buttonWithDialog.phrasePauses) {
            await page.pause();
        }
    });

    // Justification Phrase
    await fillUserField(page, testInfo);
    await fillPasswordField(page, testInfo);
    await justificationPhrase(page, 30000, testInfo);
    await clickAcceptButton(page);

    // Network response validation
    await test.step(phraseReport.phraseVerifyNetwork, async () => {
        networkInterceptor.printNetworkData();
        const nullResponsesCount = networkInterceptor.verifyNonImageNullResponses();
        expect(nullResponsesCount).toBe(0);
    });

    // Response validation
    await test.step(phraseReport.phraseVerifyNetwork, async () => {
        const responseValidator = new ResponseValidator(networkInterceptor.responses);
        try {
            await responseValidator.validateResponses();
        } catch (error) {
            console.log("Error validating responses:", error);
        }
    });

    // Notification handling post-action
    const mode = await notificationWitness.getDeviceMode(testInfo);
    await test.step(ReportNotificationPhase.phraseCaptureNotification, async () => {
        const capturedObjectName = await notificationWitness.addNotificationWitness(testInfo, afterEachData, mode);
        console.log('Captured Object Name:', capturedObjectName);
    });
};




// Test suite setup for Desktop Mode
let trazitTestName;
let ConfigSettings;
    
test.describe('Desktop Mode', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        await test.step('Set viewport size for desktop', async () => {
            await page.setViewportSize({ width: 1365, height: 821 });
        });
  
        const logPlat = new LogIntoPlatform({ page });
        trazitTestName = process.env.TRAZIT_TEST_NAME || 'Testing';
  
        await test.step('Perform common setup', async () => {
            ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName);
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
    test('ClickOnAButtonWithGenericDialog', async ({ page }, testInfo) => {
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
//       test('ClickOnAButtonWithGenericDialog', async ({ page }, testInfo) => {
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
//     test('ClickOnAButtonWithGenericDialog', async ({ page }, testInfo) => {
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
  
//     test('ClickOnAButtonWithGenericDialog', async ({ page }, testInfo) => {
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
  
//     test('ClickOnAButtonWithGenericDialog', async ({ page }, testInfo) => {
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
//     test('ClickOnAButtonWithGenericDialog', async ({ page }, testInfo) => {
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

