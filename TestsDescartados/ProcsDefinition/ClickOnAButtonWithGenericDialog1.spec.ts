import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../../trazit-config.js';
import { LogIntoPlatformProcDefinition } from '../../1TRAZiT-Commons/logIntoProcDefinition';
import { buttonWithDialog as dataForTestFromFile } from '../../../trazit-models/test-config-instruments-newInstrument.js';
import { callApiRunCompletion } from '../../1TRAZiT-Commons/ApiCalls.js';

import { Logger, NetworkInterceptor, ResponseValidator, phraseReport } from '../../1TRAZiT-Commons/consoleAndNetworkMonitor.js';
import { NotificationWitness, ReportNotificationPhase } from '../../1TRAZiT-Commons/notification.js';
import { fillUserField, fillPasswordField, clickDoButton, clickButtonById, clickElement, clickElementByText, justificationPhrase, clickAcceptButton, attachScreenshot, esignRequired } from '../../1TRAZiT-Commons/actionsHelper.js';
import {validateNotificationTexts} from '../../1TRAZiT-Commons/notificationProcsDefinition.js';

// import { handleActionNameInteraction } from '../../1TRAZiT-Commons/actionsNameInteractionsWithoutDialog.js';
import { handleActionNameInteraction } from '../../1TRAZiT-Commons/actionsNameInteractions.js';
import { handleCardsInteraction } from '../../1TRAZiT-Commons/cardsInteraction.js';
import { handleTabInteraction} from '../../1TRAZiT-Commons/tabsInteractions.js';
// import { handleSelectCard } from '../../1TRAZiT-Commons/utils/selectCard.js';
import { handleSelectCard } from '../../1TRAZiT-Commons/utils/selectCard/selectCard.js';
import { handleRowActionsInteraction } from '../../1TRAZiT-Commons/rowActionsInteractions.js';

import { processTestData } from '../../1TRAZiT-Commons/dialogInteraction.js';

const commonTests = async (ConfigSettings: any, page: any, testInfo: any) => {
    await page.waitForTimeout(8000);

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
        if (msg.type() === 'log' && 
            (msg.text().includes('actionBeingPerformedModel') ||   
            msg.text().includes('actionMethod'))) {
            
            const args = await Promise.all(msg.args().map(arg => arg.jsonValue()));
            const jsonOutput = JSON.stringify(args, null, 2);

            if (!capturedMessages.has(jsonOutput)) {
                capturedMessages.add(jsonOutput);
                console.log(`\nCaptured actionBeingPerformedModel or actionMethod: ${jsonOutput}`);
            }
        }
    });

    // Notification Handling
    const expectedTexts = [
        buttonWithDialog.textInNotif1?.toLowerCase(),
        buttonWithDialog.textInNotif2?.toLowerCase(),
        buttonWithDialog.textInNotif3?.toLowerCase(),
    ];

    // Click cards
    await handleCardsInteraction(page, testInfo, buttonWithDialog);
    await handleSelectCard(page, testInfo, buttonWithDialog);
    // Click button 
    // await handleActionNameInteraction(page, testInfo, buttonWithDialog);
    await handleTabInteraction(page, testInfo, ConfigSettingsAlternative, buttonWithDialog);
    
    const rowActions = await handleRowActionsInteraction(page, buttonWithDialog, testInfo); 
    console.log("Resultado de handleRowActionsInteraction:", rowActions);
    if (rowActions) {
        // Aplicar el transform scale al contenedor del diálogo
        await page.evaluate(() => {
            const dialogSurface = document.querySelector('.mdc-dialog__surface') as HTMLElement; // Aserción de tipo
            if (dialogSurface) {
                dialogSurface.style.transform = 'scale(0.9)';
            }
        });

        // Check for fields in the dialog
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

                if (buttonWithDialog.phrasePauses) {
                    await page.pause();
                    await page.pause();
                    await page.pause();
                    await page.waitForTimeout(4000);
                }
            
              
            
                // Valido los textos de la notificación
                await validateNotificationTexts(page, expectedTexts, testInfo);
                
            
                if (buttonWithDialog.phrasePauses) {
                    await page.pause();
                    await page.pause();
                }

            } // else {
                
            //      await selectElementWithScroll(page, true, null, buttonWithDialog.selectElement);
            
            // }
            
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

        await test.step(buttonWithDialog.phrasePauses, async () => {
            await page.waitForTimeout(1000);
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
        await esignRequired(page, 30000, testInfo);
        await clickAcceptButton(page);
        

        // Justification Phrase
        await fillUserField(page, testInfo);
        await fillPasswordField(page, testInfo);
        await justificationPhrase(page, 30000, testInfo);
        await esignRequired(page, 30000, testInfo);
        await clickAcceptButton(page);
        // Intentar hacer clic en el botón "Accept" en nth(1)
        const acceptButton1 = page.getByRole('button', { name: 'Accept' }).nth(0);
        if (await acceptButton1.isVisible()) {
        await test.step("Aceptar", async () => {
            try {
            await acceptButton1.click({ timeout: 1000 });
            } catch (error) {
            console.log("Error clicking acceptButton1:", error);
            }
        });
        } else {
        console.log("Botón de Aceptar no encontrado en la posición 0, intentando con nth(1).");

        // Intentar hacer clic con nth(1) si el primer botón no está visible
        const acceptButton2 = page.getByRole('button', { name: 'Accept' }).nth(1);
        if (await acceptButton2.isVisible()) {
            await test.step("Aceptar con nth(0)", async () => {
            try {
                await acceptButton2.click({ timeout: 1000 });
            } catch (error) {
                console.log("Error clicking acceptButton2:", error);
            }
            });
        } else {
            console.log("Botón de Aceptar no encontrado en nth(1), intentando con nth(2).");

            // Intentar hacer clic con nth(2) si el segundo botón no está visible
            const acceptButton3 = page.getByRole('button', { name: 'Accept' }).nth(2);
            if (await acceptButton3.isVisible()) {
            await test.step("Aceptar con nth(2)", async () => {
                try {
                await acceptButton3.click({ timeout: 1000 });
                } catch (error) {
                console.log("Error clicking acceptButton3:", error);
                }
            });
            } else {
            console.log("Botón de Aceptar no encontrado en nth(2), omitiendo paso.");
            }
        }
        }
        // Network response validation
        await test.step(phraseReport.phraseVerifyNetwork, async () => {
            const responseValidator = new ResponseValidator(networkInterceptor.responses);
            try {
                await responseValidator.validateResponses();
            } catch (error) {
                console.log("Error validating responses:", error);
            }
        });

        // Notification handling post-action
        
        return 
    }

    await handleActionNameInteraction(page, testInfo, buttonWithDialog);

    // Llamadas a interacciones previas

    // Apply transform scale to the dialog container
    await page.evaluate(() => {
        const dialogSurface = document.querySelector('.mdc-dialog__surface') as HTMLElement;
        if (dialogSurface) {
            dialogSurface.style.transform = 'scale(0.9)';
        }
    });

    // Check for fields in the dialog
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
    await esignRequired(page, 30000, testInfo);
    await clickDoButton(page);

    // Intentar hacer clic en el botón "Accept" en nth(1)
    const acceptButton1 = page.getByRole('button', { name: 'Accept' }).nth(0);
    if (await acceptButton1.isVisible()) {
    await test.step("Aceptar", async () => {
        try {
        await acceptButton1.click({ timeout: 1000 });
        } catch (error) {
        console.log("Error clicking acceptButton1:", error);
        }
    });
    } else {
    console.log("Botón de Aceptar no encontrado en la posición 0, intentando con nth(1).");

    // Intentar hacer clic con nth(1) si el primer botón no está visible
    const acceptButton2 = page.getByRole('button', { name: 'Accept' }).nth(1);
    if (await acceptButton2.isVisible()) {
        await test.step("Aceptar con nth(0)", async () => {
        try {
            await acceptButton2.click({ timeout: 1000 });
        } catch (error) {
            console.log("Error clicking acceptButton2:", error);
        }
        });
    } else {
        console.log("Botón de Aceptar no encontrado en nth(1), intentando con nth(2).");

        // Intentar hacer clic con nth(2) si el segundo botón no está visible
        const acceptButton3 = page.getByRole('button', { name: 'Accept' }).nth(2);
        if (await acceptButton3.isVisible()) {
        await test.step("Aceptar con nth(2)", async () => {
            try {
            await acceptButton3.click({ timeout: 1000 });
            } catch (error) {
            console.log("Error clicking acceptButton3:", error);
            }
        });
        } else {
        console.log("Botón de Aceptar no encontrado en nth(2), omitiendo paso.");
        }
    }
    }
    if (buttonWithDialog.phrasePauses) {
        await page.pause();
        await page.pause();
        await page.pause();
        await page.waitForTimeout(4000);
    }

  

    // Valido los textos de la notificación
    await validateNotificationTexts(page, expectedTexts, testInfo);
    

    if (buttonWithDialog.phrasePauses) {
        await page.pause();
        await page.pause();
    }
};





// Test suite setup for Desktop Mode

let trazitTestName;
let procInstanceName;
let ConfigSettings;
    
test.describe('Desktop Mode', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        await test.step('Set viewport size for desktop', async () => {
            await page.setViewportSize({ width: 1365, height: 821 });
        });
  
        const logPlat = new LogIntoPlatformProcDefinition({ page });
        trazitTestName = process.env.TRAZIT_TEST_NAME || 'DefinitionSOPsRenameSop';
  
        // Define procInstanceName antes de pasarlo
        procInstanceName = process.env.PROC_INSTANCE_NAME || 'proc_management'; // Valor predeterminado o el valor de tu entorno
  
        await test.step('Perform common setup', async () => {
            // Ahora pasas procInstanceName al llamar a commonBeforeEach
            ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
        });
  
        await test.step('Wait for 1 seconds', async () => {
            await page.waitForTimeout(1000);
        });
    });

    // Execute tests
    test('ClickOnAButtonWithGenericDialog', async ({ page }, testInfo) => {
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
//     test('ClickOnAButtonWithGenericDialog', async ({ page }, testInfo) => {
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
      trazitTestName: process.env.TRAZIT_TEST_NAME || 'DefinitionSOPsRenameSop' ,
      duration: `${durationInSeconds} seconds`,
    };
  
    const testStatus = testInfo.status;
    const procInstanceName = process.env.PROC_INSTANCE_NAME || 'proc_management'; 
    await callApiRunCompletion(data, testStatus, trazitTestName, testInfo, procInstanceName)
  });

   
//   pwTest('Example test', async ({ page }) => {
//     // Your test logic here
//   });