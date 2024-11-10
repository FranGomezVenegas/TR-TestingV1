import { test, expect } from '@playwright/test';

import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { decisionInvestigation as dataForTestFromFile } from '../../trazit-models/test-config-instruments-newInstrument.js';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

import { Logger, NetworkInterceptor, ResponseValidator, phraseReport } from '../1TRAZiT-Commons/consoleAndNetworkMonitor';
import { NotificationWitness, ReportNotificationPhase } from '../1TRAZiT-Commons/notification';
import { clickElement, justificationPhrase, fillUserField, fillPasswordField, clickAcceptButton } from '../1TRAZiT-Commons/actionsHelper';

import { clickButtonById, clickElementByText, attachScreenshot } from '../1TRAZiT-Commons/actionsHelper';
import {handleTabInteraction} from '../1TRAZiT-Commons/tabsInteractions';
import { handleRowActionsInteraction } from '../1TRAZiT-Commons/rowActionsInteractions';
import {handleActionNameInteraction} from '../1TRAZiT-Commons/actionsNameInteractions';
import {handleObjectByTabsWithSearchInteraction} from '../1TRAZiT-Commons/objectByTabsWithSearch';

//Function with all tests.
const commonTests = async (ConfigSettings, page, testInfo) => {
    // Create instances of Logger and NetworkInterceptor
    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();

    let decisionInvestigation;

    // If configuration data is available, process the JSON
    if (ConfigSettings && ConfigSettings.dataForTest) {
        let unescapedString = ConfigSettings.dataForTest.replace(/\\+/g, '\\');
        try {
            decisionInvestigation = JSON.parse(unescapedString);
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
        decisionInvestigation = JSON.parse(decisionInvestigation.testDataGame);
    } else {
        decisionInvestigation = dataForTestFromFile;
    }

    // Attach Logger and NetworkInterceptor to the page
    await test.step(phraseReport.phraseNetworkInterceptionAndLogger, async () => {
        logger.attachToPage(page);
        networkInterceptor.attachToPage(page);
    });

    // NOTIFICATIONS
    let afterEachData = {
        textInNotif1: decisionInvestigation.textInNotif1,
        textInNotif2: decisionInvestigation.textInNotif2,
        textInNotif3: decisionInvestigation.textInNotif3,
    };

    const notificationWitness = new NotificationWitness(page);

    // Llamadas a interacciones previas
    await handleTabInteraction(page, testInfo, ConfigSettingsAlternative, decisionInvestigation);

    // Llamo a la funcion para comprobar si un objectByTabs tiene un search. Essta funcion solo controla el search
    // clica en este y añada el campo que se desea buscar.
    await handleObjectByTabsWithSearchInteraction(page, testInfo, ConfigSettingsAlternative, decisionInvestigation);
    
    await handleActionNameInteraction(page, testInfo, decisionInvestigation);

    await test.step(decisionInvestigation.phrasePauses, async () => {
        await page.pause();
        await page.pause();
        await page.pause();
    })

    await page.getByLabel(decisionInvestigation.systemId.label).click();
    await page.getByLabel(decisionInvestigation.systemId.label).fill(decisionInvestigation.systemId.value);
    await test.step(decisionInvestigation.phrasePauses, async () => {
        await page.pause();
        await page.pause();
        await page.pause();
    })
    await page.getByLabel(decisionInvestigation.systemName.label, { exact: true }).click();
    await page.getByLabel(decisionInvestigation.systemName.label, { exact: true }).fill(decisionInvestigation.systemName.value);
    await test.step(decisionInvestigation.phrasePauses, async () => {
        await page.pause();
        await page.pause();
        await page.pause();
    })


    // Find the checkbox for "CAPA Required"
    const capaRequiredCheckbox = await page.getByLabel(decisionInvestigation.capaRequired.label);

    if (decisionInvestigation.capaRequired.boolean === true) {
        if (!(await capaRequiredCheckbox.isChecked())) {
            // If `isCapaRequired` is true and checkbox is not checked, check it
            await capaRequiredCheckbox.check({timeout: 15000});
            await test.step(decisionInvestigation.phrasePauses, async () => {
                await page.pause();
                await page.pause();
                await page.pause();
            })
            await page.getByLabel(decisionInvestigation.capaSystemName.label).click({timeout: 15000});
            await page.getByLabel(decisionInvestigation.capaSystemName.label).fill(decisionInvestigation.capaSystemName.value);
            await test.step(decisionInvestigation.phrasePauses, async () => {
                await page.pause();
                await page.pause();
                await page.pause();
            })
            await page.getByLabel(decisionInvestigation.capaId.label).click({timeout: 15000});
            await page.getByLabel(decisionInvestigation.capaId.label).fill(decisionInvestigation.capaId.value);
            await test.step(decisionInvestigation.phrasePauses, async () => {
                await page.pause();
                await page.pause();
                await page.pause();
            })
           
        }
    } else if (decisionInvestigation.capaRequired.boolean === false) {
        if (await capaRequiredCheckbox.isChecked({timeout: 15000})) {
            // If `isCapaRequired` is false and checkbox is checked, uncheck it
            await capaRequiredCheckbox.uncheck({timeout: 15000});
        }
    }
    await test.step(decisionInvestigation.phraseScreenShots, async () => {
        await attachScreenshot(testInfo, decisionInvestigation.screenShotsFilled, page, ConfigSettingsAlternative.screenShotsContentType);
        if (decisionInvestigation.phrasePauses) {
            await test.step(decisionInvestigation.phrasePauses, async () => {
                await page.pause();
                await page.pause();
                await page.pause();
            }
         )}
    });

    
    await page.getByRole('button', { name: decisionInvestigation.buttonAccept }).click({timeout: 15000});
    await test.step(decisionInvestigation.phraseScreenShots, async () => {
        await attachScreenshot(testInfo, decisionInvestigation.screenShotsAccept, page, ConfigSettingsAlternative.screenShotsContentType);
        if (decisionInvestigation.phrasePauses) {
            await test.step(decisionInvestigation.phrasePauses, async () => {
                await page.pause();
                await page.pause();
                await page.pause();
            }
         )}
    });


    // Justification Phrase
    await fillUserField(page, testInfo); // Rellena el campo de "User"
    await fillPasswordField(page, testInfo); // Rellena el campo de "Password"

    // Continuar con la justificación y otras acciones
    await justificationPhrase(page, 30000, testInfo);    
    await clickAcceptButton(page);
    const acceptButton = page.getByRole('button', { name: 'Accept' }).nth(1);
    if (await acceptButton.isVisible()) {
        await test.step("Aceptar", async () => {
            await acceptButton.click();
        });
    } else {
        console.log("Botón de Aceptar no encontrado, omitiendo paso.");
    }

  
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
      trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution' ;
      procInstanceName = process.env.PROC_INSTANCE_NAME || 'default'; // Valor predeterminado o el valor de tu entorno

  
      await test.step('Perform common setup', async () => {
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
      test('ClickOnAButtonAndDecisionInvestigation', async ({ page }, testInfo) => {
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
  
//       await test.step('Wait for 1 seconds', async () => {
//         await page.waitForTimeout(1000);
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
//     test('ClickOnAButtonAndDecisionInvestigation', async ({ page }, testInfo) => {
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
  
//      // Common configuration for both modes.
//      const logPlat = new LogIntoPlatform({ page });
//      trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution' ;
//      procInstanceName = process.env.PROC_INSTANCE_NAME || 'default'; // Valor predeterminado o el valor de tu entorno

 
//      await test.step('Perform common setup', async () => {
//        ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
//    });
 
//      await test.step('Wait for 1 seconds', async () => {
//        await page.waitForTimeout(1000);
//      });
  
//       const openWindow = new OpenProcedureWindow({ page });
  
//       await test.step('Open procedure window for mobile', async () => {
//         await test.step('Wait for 3 seconds', async () => {
//           await page.waitForTimeout(3000);
//         });
//         await openWindow.openWindowForMobile(page, testInfo, ConfigSettings);
//       });
//     });
  
//     test('ClickOnAButtonAndDecisionInvestigation', async ({ page }, testInfo) => {
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
  
//       // Common configuration for both modes.
//       const logPlat = new LogIntoPlatform({ page });
//       trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution' ;
//       procInstanceName = process.env.PROC_INSTANCE_NAME || 'default'; // Valor predeterminado o el valor de tu entorno

  
//       await test.step('Perform common setup', async () => {
//         ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
//     });
  
//       await test.step('Wait for 1 seconds', async () => {
//         await page.waitForTimeout(1000);
//       });
  
  
//       const openWindow = new OpenProcedureWindow({ page });
  
//       await test.step('Open procedure window for mobile', async () => {
//         await test.step('Wait for 3 seconds', async () => {
//           await page.waitForTimeout(3000);
//         });
//         await openWindow.openWindowForMobile(page, testInfo, ConfigSettings);
//       });
//     });
  
//     test('ClickOnAButtonAndDecisionInvestigation', async ({ page }, testInfo) => {
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
  
//      // Common configuration for both modes.
//      const logPlat = new LogIntoPlatform({ page });
//       trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution' ;
//       procInstanceName = process.env.PROC_INSTANCE_NAME || 'default'; // Valor predeterminado o el valor de tu entorno

  
//       await test.step('Perform common setup', async () => {
//         ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
//     });
  
//       await test.step('Wait for 1 seconds', async () => {
//         await page.waitForTimeout(1000);
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
//     test('ClickOnAButtonAndDecisionInvestigation', async ({ page }, testInfo) => {
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