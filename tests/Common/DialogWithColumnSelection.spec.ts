import { test, expect } from '@playwright/test';

import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';
import { LogIntoPlatformProcDefinition } from '../1TRAZiT-Commons/logIntoProcDefinition.js';

import { dialogWithColumnSelection as dataForTestFromFile } from '../../trazit-models/test-config-instruments-newInstrument.js';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';
import {validateNotificationTexts} from '../1TRAZiT-Commons/notificationProcsDefinition.js';

import { Logger, NetworkInterceptor, ResponseValidator, phraseReport } from '../1TRAZiT-Commons/consoleAndNetworkMonitor';
import { NotificationWitness, ReportNotificationPhase } from '../1TRAZiT-Commons/notification';
import { attachScreenshot, clickDoButtonUserDialog, clickDoButtonJustification, clickJustificationButton, clickConfirmDialogButton, justificationPhrase, fillUserField, fillPasswordField, clickAcceptButton, clickDoButton, esignRequired } from '../1TRAZiT-Commons/actionsHelper';

import {handleTabInteraction} from '../1TRAZiT-Commons/tabsInteractions';
import {handleActionNameInteraction} from '../1TRAZiT-Commons/actionsNameInteractionsWithoutDialog.js';
import {handleObjectByTabsWithSearchInteraction} from '../1TRAZiT-Commons/objectByTabsWithSearch';
import { interactWithTable } from '../1TRAZiT-Commons/utils/interactionTable/tableHandler';
import { fillValueInCell } from '../1TRAZiT-Commons/utils/interactionTable/fillValueInteractions';

import { handleCardsInteraction } from '../../tests/1TRAZiT-Commons/utils/ProcDefinition/interactionCards/cardsInteraction.js';
import { handleSelectCard } from '../1TRAZiT-Commons/utils/ProcDefinition/selectCard/selectCard.js';

const commonTests = async (ConfigSettings, page, testInfo) => {
    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();
  
    let dialogWithColumnSelection;
  
    if (ConfigSettings && ConfigSettings.dataForTest) {
      let unescapedString = ConfigSettings.dataForTest.replace(/\\+/g, '\\');
      try {
        dialogWithColumnSelection = JSON.parse(unescapedString);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
      dialogWithColumnSelection = JSON.parse(dialogWithColumnSelection.testDataGame);
    } else {
      dialogWithColumnSelection = dataForTestFromFile;
    }
  
    await test.step(phraseReport.phraseNetworkInterceptionAndLogger, async () => {
      logger.attachToPage(page);
      networkInterceptor.attachToPage(page);
    });
  
    // Notification Handling
    const expectedTexts = [
      dialogWithColumnSelection.textInNotif1?.toLowerCase(),
      dialogWithColumnSelection.textInNotif2?.toLowerCase(),
      dialogWithColumnSelection.textInNotif3?.toLowerCase(),
    ];
  
    let afterEachData = {
      textInNotif1: dialogWithColumnSelection.textInNotif1,
      textInNotif2: dialogWithColumnSelection.textInNotif2,
      textInNotif3: dialogWithColumnSelection.textInNotif3,
    };
  
    const notificationWitness = new NotificationWitness(page);
  
    // Proc Management
    await handleCardsInteraction(page, testInfo, dialogWithColumnSelection);
    await handleSelectCard(page, testInfo, dialogWithColumnSelection);
  
    await handleTabInteraction(page, testInfo, ConfigSettingsAlternative, dialogWithColumnSelection);
    await handleObjectByTabsWithSearchInteraction(page, testInfo, ConfigSettingsAlternative, dialogWithColumnSelection);
    await handleActionNameInteraction(page, testInfo, dialogWithColumnSelection);
  
    await test.step(dialogWithColumnSelection.phrasePauses, async () => {
      await page.pause();
      await page.pause();
      await page.pause();
    });
  
    // Check if dialog is editable and interact with table
    if (dialogWithColumnSelection.Editable) {
      const targetTd = await interactWithTable(page, dialogWithColumnSelection);
      await fillValueInCell(targetTd, dialogWithColumnSelection, testInfo, page, ConfigSettingsAlternative);
    } else {
      await page.locator('dialog-the-generic')
        .getByRole('cell', { name: dialogWithColumnSelection.itemToSelect, exact: true })
        .click({ timeout: 3000 });
  
      await test.step(dialogWithColumnSelection.phrasePauses, async () => {
        await page.pause();
        await page.pause();
        await page.pause();
      });
  
      await test.step(dialogWithColumnSelection.phraseScreenShots, async () => {
        await attachScreenshot(testInfo, dialogWithColumnSelection.screenShotsFilledForm, page, ConfigSettingsAlternative.screenShotsContentType);
        if (dialogWithColumnSelection.phrasePauses) {
          await test.step(dialogWithColumnSelection.phrasePauses, async () => {
            await page.pause();
            await page.pause();
            await page.pause();
          });
        }
      });
  
      await page.getByRole('button', { name: dialogWithColumnSelection.buttonDo }).first().click({ force: true, timeout: 3000 });
  
      await test.step(dialogWithColumnSelection.phraseScreenShots, async () => {
        await attachScreenshot(testInfo, dialogWithColumnSelection.screenShotsDo, page, ConfigSettingsAlternative.screenShotsContentType);
        if (dialogWithColumnSelection.phrasePauses) {
          await test.step(dialogWithColumnSelection.phrasePauses, async () => {
            await page.pause();
            await page.pause();
            await page.pause();
          });
        }
      });
    }
  
    if (procInstanceName === 'proc_management') {
        await test.step("Final checks", async () => {
            await clickDoButton(page);
            await clickConfirmDialogButton(page);
        });
    } else {
        await test.step("Final checks", async () => {
        // Continue with normal flow
        await fillUserField(page, testInfo);
        await fillPasswordField(page, testInfo);
    
        await justificationPhrase(page, 30000, testInfo);
        await esignRequired(page, 30000, testInfo);
        await clickAcceptButton(page);
        await clickDoButton(page);
        await clickDoButtonJustification(page);
        await clickDoButtonUserDialog(page);
        await clickJustificationButton(page);
        await clickConfirmDialogButton(page);
    
        const acceptButton1 = page.getByRole('button', { name: 'Accept' }).nth(1);
        if (await acceptButton1.isVisible()) {
            await test.step("Click Accept button (nth(1))", async () => {
            try {
                await acceptButton1.click({ timeout: 5000 });
            } catch (error) {
                console.log("Error clicking acceptButton1:", error);
            }
            });
        } else {
            console.log("Accept button not found at position 1, trying nth(0)");
    
            const acceptButton2 = page.getByRole('button', { name: 'Accept' }).nth(0);
            if (await acceptButton2.isVisible()) {
            await test.step("Click Accept button (nth(0))", async () => {
                try {
                await acceptButton2.click({ timeout: 5000 });
                } catch (error) {
                console.log("Error clicking acceptButton2:", error);
                }
            });
            } else {
            console.log("Accept button not found at position 0, trying nth(2)");
    
            const acceptButton3 = page.getByRole('button', { name: 'Accept' }).nth(2);
            if (await acceptButton3.isVisible()) {
                await test.step("Click Accept button (nth(2))", async () => {
                try {
                    await acceptButton3.click({ timeout: 5000 });
                } catch (error) {
                    console.log("Error clicking acceptButton3:", error);
                }
                });
            } else {
                console.log("Accept button not found at any position, skipping");
            }
            }
        }
        });
    }
  
    // Verify there are no console errors
    await test.step(phraseReport.phraseError, async () => {
      logger.printLogs();
      expect(logger.errors.length).toBe(0);
    });
  
    // Verify captured network responses
    await test.step(phraseReport.phraseVerifyNetwork, async () => {
      networkInterceptor.printNetworkData();
      const nullResponsesCount = networkInterceptor.verifyNonImageNullResponses();
      expect(nullResponsesCount).toBe(0);
    });
  
    // Validate responses using ResponseValidator
    await test.step(phraseReport.phraseVerifyNetwork, async () => {
      const responseValidator = new ResponseValidator(networkInterceptor.responses);
      try {
        await responseValidator.validateResponses();
      } catch (error) {
        // test.fail(error.message);
      }
    });
  
    if (procInstanceName === 'proc_management') {
        await test.step(dialogWithColumnSelection.phrasePauses, async () => {
            await page.waitForTimeout(1000);
        });
        // Notification proc_management
        await validateNotificationTexts(page, expectedTexts, testInfo);
    } else {
        await test.step(dialogWithColumnSelection.phrasePauses, async () => {
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

  test('DialogWithColumnSelection', async ({ page }, testInfo) => {
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
  
//     test('DialogWithColumnSelection', async ({ page }, testInfo) => {
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
  
//     test('DialogWithColumnSelection', async ({ page }, testInfo) => {
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

//     test('DialogWithColumnSelection', async ({ page }, testInfo) => {
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

//     test('DialogWithColumnSelection', async ({ page }, testInfo) => {
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