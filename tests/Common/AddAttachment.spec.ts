import { test, expect } from '@playwright/test';

import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform.js';

import { addAttachment as dataForTestFromFile } from '../../trazit-models/test-config-instruments-attachment';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

import { Logger, NetworkInterceptor, ResponseValidator, phraseReport } from '../1TRAZiT-Commons/consoleAndNetworkMonitor';
import { NotificationWitness, ReportNotificationPhase } from '../1TRAZiT-Commons/notification';
import { clickElementByText, clickElement, justificationPhrase, fillUserField, fillPasswordField, clickAcceptButton, attachScreenshot } from '../1TRAZiT-Commons/actionsHelper';

import {handleTabInteraction} from '../1TRAZiT-Commons/tabsInteractions';

//Function with all tests.
const commonTests = async (ConfigSettings, page, testInfo) => { 
        // Create instances of Logger and NetworkInterceptor
        const logger = new Logger();
        const networkInterceptor = new NetworkInterceptor();

        let addAttachment;

        // If configuration data is available, process the JSON
        if (ConfigSettings && ConfigSettings.dataForTest) {
            // let validJsonString = ConfigSettings.dataForTest.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
            // addAttachment = ConfigSettings.dataForTest //dataForTestFromFile; // Make sure to parse the valid JSON string
            // addAttachment = JSON.parse(validJsonString);  // Convierte el string a JSON
            let unescapedString = ConfigSettings.dataForTest.replace(/\\+/g, '\\');
            try {
              addAttachment = JSON.parse(unescapedString);
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
              addAttachment = JSON.parse(addAttachment.testDataGame)
        } else {
            addAttachment = dataForTestFromFile;
        }

        // console.log('Attachment data:', addAttachment);

        // Attach Logger and NetworkInterceptor to the page
        await test.step(phraseReport.phraseNetworkInterceptionAndLogger, async () => {
            logger.attachToPage(page);
            networkInterceptor.attachToPage(page);
        });

        // NOTIFICATIONS
        let afterEachData = {
            textInNotif1: addAttachment.textInNotif1,
            textInNotif2: addAttachment.textInNotif2,
            textInNotif3: addAttachment.textInNotif3,
        };

        const notificationWitness = new NotificationWitness(page);

        
        await handleTabInteraction(page, testInfo, ConfigSettingsAlternative, addAttachment);

        await test.step(addAttachment.phraseSelect, async () => {
            await clickElementByText(page, addAttachment.selectName);
          });

        
        // Realizar las acciones del test
        //await page.getByText(addAttachment.selectName, { exact: true }).click();
        test.step(addAttachment.phrasePauses, async () => {
            await page.pause();
        })
        
        await test.step(addAttachment.phraseScreenShots, async () => {
            await attachScreenshot(testInfo, addAttachment.screenShotsSelect, page, ConfigSettingsAlternative.screenShotsContentType);
            await test.step(addAttachment.phasePauses, async () => {
                await page.pause();
            });
        });
        
        await page.getByTitle(addAttachment.buttonName.title, { exact: true }).getByLabel(addAttachment.buttonName.label).first().click({timeout: 30000});
        test.step(addAttachment.phrasePauses, async () => {
            await page.pause();
        });
        
        await test.step(addAttachment.phraseScreenShots, async () => {
            await attachScreenshot(testInfo, addAttachment.screenShotsEmptyForm, page, ConfigSettingsAlternative.screenShotsContentType);
            await test.step(addAttachment.phasePauses, async () => {
                await page.pause();
            });
        });
        
        await page.getByLabel(addAttachment.fldDocUrl.label).click({timeout: 30000});
        test.step(addAttachment.phrasePauses, async () => {
            await page.pause();
        })
        await page.getByLabel(addAttachment.fldDocUrl.label).fill(addAttachment.fldDocUrl.value);
        test.step(addAttachment.phrasePauses, async () => {
            await page.pause();
        })
        
        
        await page.getByLabel(addAttachment.fldTitle.label).click({timeout: 30000});
        test.step(addAttachment.phrasePauses, async () => {
            await page.pause();
        })
        
        await page.getByLabel(addAttachment.fldTitle.label).fill(addAttachment.fldTitle.value);
        test.step(addAttachment.phrasePauses, async () => {
            await page.pause();
        })

        await test.step(addAttachment.phraseScreenShots, async () => {
            await attachScreenshot(testInfo, addAttachment.screenShotsFilledForm, page, ConfigSettingsAlternative.screenShotsContentType);
            await test.step(addAttachment.phasePauses, async () => {
                await page.pause();
            });
        });
        
        
        await page.getByRole('button', { name: addAttachment.buttonAccept }).click({timeout: 30000});
        test.step(addAttachment.phrasePauses, async () => {
            await page.pause();
        })
        
        await test.step(addAttachment.phraseScreenShots, async () => {
            await attachScreenshot(testInfo, "Accept", page, ConfigSettingsAlternative.screenShotsContentType);
            await test.step(addAttachment.phasePauses, async () => {
                await page.pause();
            });
        });

        // Justification Phrase
        await justificationPhrase(page, 30000, testInfo); // Puedes ajustar el timeout según sea necesario
        await fillUserField(page, testInfo);
        await fillPasswordField(page, testInfo);
        await clickAcceptButton(page);

         // Justification Phrase
        //await fillUserField(page, testInfo); // Rellena el campo de "User"
        //await fillPasswordField(page, testInfo); // Rellena el campo de "Password"

        // Continuar con la justificación y otras acciones
        //await justificationPhrase(page, 30000, testInfo);    
        //await clickAcceptButton(page);
            
        // Verify that there are no console errors
        // await test.step(phraseReport.phraseError, async () => {
        //     logger.printLogs();
        //     expect(logger.errors.length).toBe(0);
        // });

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
      trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution' ;
      procInstanceName = process.env.PROC_INSTANCE_NAME || 'default'; // Valor predeterminado o el valor de tu entorno

  
      await test.step('Perform common setup', async () => {
        ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
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
      test('AddAttachmentAccept', async ({ page }, testInfo) => {
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
//       trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution' ;
//       procInstanceName = process.env.PROC_INSTANCE_NAME || 'default'; // Valor predeterminado o el valor de tu entorno

  
//       await test.step('Perform common setup', async () => {
//         ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
//     });
  
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
//     test('AddAttachmentAccept', async ({ page }, testInfo) => {
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
//       trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution' ;
//       procInstanceName = process.env.PROC_INSTANCE_NAME || 'default'; // Valor predeterminado o el valor de tu entorno

  
//       await test.step('Perform common setup', async () => {
//         ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
//     });
  
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
  
//     test('AddAttachmentAccept', async ({ page }, testInfo) => {
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
//       trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution' ;
//       procInstanceName = process.env.PROC_INSTANCE_NAME || 'default'; // Valor predeterminado o el valor de tu entorno

  
//       await test.step('Perform common setup', async () => {
//         ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
//     });
  
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
  
//     test('AddAttachmentAccept', async ({ page }, testInfo) => {
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
//       trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution' ;
//       procInstanceName = process.env.PROC_INSTANCE_NAME || 'default'; // Valor predeterminado o el valor de tu entorno

  
//       await test.step('Perform common setup', async () => {
//         ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
//     });
  
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
//     test('AddAttachmentAccept', async ({ page }, testInfo) => {
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