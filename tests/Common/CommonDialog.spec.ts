import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config.js';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform.js';
import { LogIntoPlatformProcDefinition } from '../1TRAZiT-Commons/logIntoProcDefinition.js';

import { buttonWithDialog as dataForTestFromFile } from '../../trazit-models/test-config-instruments-newInstrument.js';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls.js';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow.js';
import { Logger, NetworkInterceptor, ResponseValidator, phraseReport } from '../1TRAZiT-Commons/consoleAndNetworkMonitor.js';
import {validateNotificationTexts} from '../1TRAZiT-Commons/notificationProcsDefinition.js';

import { NotificationWitness, ReportNotificationPhase } from '../1TRAZiT-Commons/notification.js';
import { clickButton, clickDo_Button_Justification, clickConfirmDialogButton, clickJustificationButton, clickDoButtonUserDialog, clickDoButtonJustification, clickDoButton, clickButtonById, clickElement, clickElementByText, justificationPhrase, clickAcceptButton, attachScreenshot, esignRequired } from '../1TRAZiT-Commons/actionsHelper.js';
import { fillUserField, fillPasswordField } from '../1TRAZiT-Commons/actionsHelper.js';

import { handleTabInteraction } from '../1TRAZiT-Commons/tabsInteractions.js';
import { handleActionNameInteraction } from '../1TRAZiT-Commons/actionsNameInteractionsWithoutDialog.js';
import {handleObjectByTabsWithSearchInteraction} from '../1TRAZiT-Commons/objectByTabsWithSearch.js';

import { processTestData } from '../1TRAZiT-Commons/dialogInteraction.js';
import { handleCardsInteraction } from '../../tests/1TRAZiT-Commons/utils/ProcDefinition/interactionCards/cardsInteraction.js';
import { handleSelectCard } from '../1TRAZiT-Commons/utils/ProcDefinition/selectCard/selectCard.js';

const commonTests = async (ConfigSettings: any, page: any, testInfo: any) => {
    await test.step("Pauses", async () => {
        await page.pause();
        await page.pause();
    });

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
    
    const afterEachData = {
        textInNotif1: buttonWithDialog.textInNotif1,
        textInNotif2: buttonWithDialog.textInNotif2,
        textInNotif3: buttonWithDialog.textInNotif3,
    };
      
    const notificationWitness = new NotificationWitness(page);


    // Proc Management
    await handleCardsInteraction(page, testInfo, buttonWithDialog);
    await handleSelectCard(page, testInfo, buttonWithDialog);

    await handleTabInteraction(page, testInfo, ConfigSettingsAlternative, buttonWithDialog);
    await handleObjectByTabsWithSearchInteraction(page, testInfo, ConfigSettingsAlternative, buttonWithDialog);
    await handleTabInteraction(page, testInfo, ConfigSettingsAlternative, buttonWithDialog);
    
    // Click button by name
    await handleActionNameInteraction(page, testInfo, buttonWithDialog);

    // Aplicar el transform scale al contenedor del diálogo
    await page.evaluate(() => {
        const dialogSurface = document.querySelector('.mdc-dialog__surface') as HTMLElement; // Aserción de tipo
        if (dialogSurface) {
            dialogSurface.style.transform = 'scale(0.9)';
        }
    });

    // Definir el manejador de diálogos aquí, fuera del bloque try
    const handleDialog = async (dialog) => {
        console.error(`Se detectó un alert con el mensaje: "${dialog.message()}"`);
        await dialog.dismiss(); // Cierro el alert. 
        throw new Error(`El test falló debido a un alert con el mensaje: "${dialog.message()}"`);
    };

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
        await processTestData(page, parsedMessages, JSON.stringify(buttonWithDialog));

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
    if (procInstanceName === 'proc_management') {
        await test.step("Final checks", async () => {
            await clickDoButton(page);
            await clickConfirmDialogButton(page);
        });
    } else {
        await test.step("Final checks", async () => {
            await clickButton(page, buttonWithDialog.buttonLabel);         
            // Justification Phrase
            await fillUserField(page, testInfo);
            await fillPasswordField(page, testInfo);
            await justificationPhrase(page, 30000, testInfo);
            await clickAcceptButton(page);
            await esignRequired(page, 30000, testInfo);
            await clickDoButton(page);
            await clickJustificationButton(page);
            await clickConfirmDialogButton(page);
            await clickDo_Button_Justification(page);
            await fillUserField(page, testInfo);
            await fillPasswordField(page, testInfo);
            await justificationPhrase(page, 30000, testInfo);
            await clickDoButtonJustification(page);
            await clickDoButtonUserDialog(page);

            
            // Array de índices para los botones
            const buttonIndices = [0, 1, 2]; // Índices a verificar
            let clicked = false;

            // Intentar hacer clic en el primer botón visible
            const firstButton = page.getByRole('button', { name: 'Accept' }).first();

            if (await firstButton.isVisible()) {
                await test.step("Click 'Accept' button using .first()", async () => {
                    try {
                        await firstButton.click({ timeout: 1000 }); // Timeout reducido a 1 segundo
                        clicked = true; // Marcar como true si se hizo clic
                    } catch (error) {
                        console.log("Error clicking 'Accept' button with .first():", error);
                    }
                });
            }

            // Si no se pudo hacer clic con .first(), intentar con los índices
            if (!clicked) {
                for (const index of buttonIndices) {
                    const button = page.getByRole('button', { name: 'Accept' }).nth(index);

                    if (await button.isVisible()) {
                        await test.step(`Click 'Accept' button at index ${index}`, async () => {
                            try {
                                await button.click({ timeout: 1000 }); // Timeout reducido a 1 segundo
                                clicked = true; // Si se hizo clic, marcar como true
                            } catch (error) {
                                console.log(`Error clicking 'Accept' button at index ${index}:`, error);
                            }
                        });
                        break; // Salir del bucle después de hacer clic
                    }
                }
            }

            // Verificar si se hizo clic en algún botón
            if (!clicked) {
                console.log("No 'Accept' button was clicked. Ensure the buttons are visible.");
            }
            page.off('dialog', handleDialog);

        });
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



// Test suite setup for Desktop Mode
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

  test('CommonDialog', async ({ page }, testInfo) => {
    await test.step('Run tests', async () => {
      await commonTests(ConfigSettings, page, testInfo);
    });
  });
});


// Mobile Mode 
test.describe('Mobile mode', () => {
    test.beforeEach(async ({ page }, testInfo) => {
      // Size of the viewport of a mobile device
      await test.step('Set mobile viewport size', async () => {
        await page.setViewportSize({ width: 385, height: 812 });
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
  
      await test.step('Wait for 1 seconds', async () => {
          await page.waitForTimeout(1000);
      });

      if (procInstanceName === 'proc_management') {
        await test.step('Wait for 5 seconds', async () => {
          await page.waitForTimeout(6500);
        });
      } else {
        const openWindow = new OpenProcedureWindow({ page });
  
        await test.step('Open procedure window for mobile TV', async () => {
          await test.step('Wait for 3 seconds', async () => {
            await page.waitForTimeout(3000);
          });
          await openWindow.openWindowForMobile(page, testInfo, ConfigSettings);
        });
      }
    });
  
    test('CommonDialog', async ({ page }, testInfo) => {
      await test.step('Run tests', async () => {
        await commonTests(ConfigSettings, page, testInfo);
      });
    });
  });
  

// Mobile Mode - Retrato
test.describe('Mobile mode Retrato', () => {
    test.beforeEach(async ({ page }, testInfo) => {
      // Tamaño del viewport para móviles en modo retrato
      await test.step('Set mobile portrait viewport size', async () => {
        await page.setViewportSize({ width: 812, height: 385 });
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
  
      await test.step('Wait for 1 seconds', async () => {
          await page.waitForTimeout(1000);
      });

      if (procInstanceName === 'proc_management') {
        await test.step('Wait for 5 seconds', async () => {
          await page.waitForTimeout(6500);
        });
      } else {
        const openWindow = new OpenProcedureWindow({ page });
  
        await test.step('Open procedure window for mobile', async () => {
          await test.step('Wait for 3 seconds', async () => {
            await page.waitForTimeout(3000);
          });
          await openWindow.openWindowForMobile(page, testInfo, ConfigSettings);
        });
      }
    });
  
    test('CommonDialog', async ({ page }, testInfo) => {
      await test.step('Run tests', async () => {
        await commonTests(ConfigSettings, page, testInfo);
      });
    });
  });
  


// Tablets Mode
test.describe('Tablets mode', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        // Tablet viewport size
        await test.step('Set tablet viewport size', async () => {
            await page.setViewportSize({ width: 768, height: 1024 });
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

            await test.step('Open procedure window for tablet', async () => {
                await test.step('Wait for 3 seconds', async () => {
                    await page.waitForTimeout(3000);
                });
                await openWindow.openWindowForMobile(page, testInfo, ConfigSettings);
            });
        }
    });

    test('CommonDialog', async ({ page }, testInfo) => {
        await test.step('Run tests', async () => {
            await commonTests(ConfigSettings, page, testInfo);
        });
    });
});

// Tablets Mode - Retrato
test.describe('Tablets mode Retrato', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        // Tablet portrait viewport size
        await test.step('Set tablet portrait viewport size', async () => {
            await page.setViewportSize({ width: 1024, height: 768 });
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

            await test.step('Open procedure window for tablet', async () => {
                await test.step('Wait for 3 seconds', async () => {
                    await page.waitForTimeout(3000);
                });
                await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings);
            });
        }
    });

    test('CommonDialog', async ({ page }, testInfo) => {
        await test.step('Run tests', async () => {
            await commonTests(ConfigSettings, page, testInfo);
        });
    });
});
  

  
  

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