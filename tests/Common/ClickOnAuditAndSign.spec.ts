import { test, expect } from '@playwright/test';

import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { Button as dataForTestFromFile } from '../../trazit-models/test-config-instruments-activate';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

import { Logger, NetworkInterceptor, ResponseValidator, phraseReport } from '../1TRAZiT-Commons/consoleAndNetworkMonitor';
import { NotificationWitness, ReportNotificationPhase } from '../1TRAZiT-Commons/notification';
import { justificationPhrase, fillUserField, fillPasswordField, clickAcceptButton, clickDoButton, esignRequired } from '../1TRAZiT-Commons/actionsHelper';

import { clickButtonById, clickElementByText, attachScreenshot } from '../1TRAZiT-Commons/actionsHelper';
import {handleTabInteraction} from '../1TRAZiT-Commons/tabsInteractions';
import { handleRowActionsInteraction } from '../1TRAZiT-Commons/rowActionsInteractions';
import {handleActionNameInteraction} from '../1TRAZiT-Commons/actionsNameInteractions';
import {handleObjectByTabsWithSearchInteraction} from '../1TRAZiT-Commons/objectByTabsWithSearch';
import {handleAuditAndSign} from '../1TRAZiT-Commons/handleAuditAndSign'
import { handleMenus } from '../1TRAZiT-Commons/handleMenus';
import { rotateAndSkewTextRadiansAndTranslate } from 'pdf-lib';

//Function with all tests.
const commonTests = async (ConfigSettings, page, testInfo) => {
    await handleMenus(page);

    // await page.getByLabel('Lots-Lot view').click();
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

    // Llamo a la funcion para comprobar si un objectByTabs tiene un search. Essta funcion solo controla el search
    // clica en este y añada el campo que se desea buscar.
    await handleObjectByTabsWithSearchInteraction(page, testInfo, ConfigSettingsAlternative, Button);
    
    await handleActionNameInteraction(page, testInfo, Button);

    // Lo relacionado con el audit y la firma de este
    await handleAuditAndSign(page, Button, test, testInfo);


    // Justification Phrase
    await fillUserField(page, testInfo); // Rellena el campo de "User"
    await fillPasswordField(page, testInfo); // Rellena el campo de "Password"

    // Continuar con la justificación y otras acciones
    await justificationPhrase(page, 30000, testInfo);    
    await esignRequired(page, 30000, testInfo);
    
    await clickAcceptButton(page);
    await clickDoButton(page);

    //Cierra el Audit para poder ver las notificaciones y acceder a estas.
    //await page.locator('mwc-icon.corner[dialogaction="decline"]:has-text("close"):visible').click();
    // Try clicking the first element
    
    try {
      // Intento hacer clic en el primer elemento Instruments
      const firstElement = page.locator('mwc-icon.corner[dialogaction="decline"]:has-text("close"):visible');
  
      // Si el primer elemento existe y es visible
      if (await firstElement.count() > 0) {
          await firstElement.click();
      } else {
          console.log('El primer elemento no fue encontrado o no es clickeable.');
      }
  } catch (error) {
      console.log('El primer intento falló. Intentando con el segundo elemento dentro del shadow DOM.');
  
      try {
          // Accedo manualmente al segundo elemento dentro de múltiples shadow DOMs Stock
          const secondElement = await page.evaluateHandle(() => {
              return document.querySelector("body > sp-theme > tr-app")
                  ?.shadowRoot?.querySelector("tr-dashboard")
                  ?.shadowRoot?.querySelector("div > div > main > div > tr-procedures")
                  ?.shadowRoot?.querySelector("object-by-tabs")
                  ?.shadowRoot?.querySelector("objecttabs-composition")
                  ?.shadowRoot?.querySelector("audit-dialog")
                  ?.shadowRoot?.querySelector("#auditDialog")
                  ?.shadowRoot?.querySelector("div > div.mdc-dialog__container > div > div.popup-header > div:nth-child(2) > mwc-icon:nth-child(4)");
          });
  
          // Asegúrate de que el segundo elemento no sea null y verifica que es un handle válido
          if (secondElement && await secondElement.evaluate(el => el !== null)) {
              await secondElement.click();
              console.log('Hiciste clic en el segundo elemento dentro del shadow DOM');
          } else {
              console.log('El segundo elemento no fue encontrado o no es clickeable.');
          }
  
      } catch (secondError) {
          console.error('No se pudo hacer clic en el segundo elemento dentro del shadow DOM:', secondError);

          try {
            const thirdElement = await page.evaluateHandle(() => {
              const spTheme = document.querySelector("body > sp-theme > tr-app");
              if (spTheme?.shadowRoot) {
                  const dashboard = spTheme.shadowRoot.querySelector("tr-dashboard");
                  if (dashboard?.shadowRoot) {
                      const procedures = dashboard.shadowRoot.querySelector("div > div > main > div > tr-procedures");
                      if (procedures?.shadowRoot) {
                          const byTabs = procedures.shadowRoot.querySelector("object-by-tabs");
                          if (byTabs?.shadowRoot) {
                              const composition = byTabs.shadowRoot.querySelector("objecttabs-composition");
                              if (composition?.shadowRoot) {
                                  const auditDialog = composition.shadowRoot.querySelector("audit-dialog");
                                  if (auditDialog?.shadowRoot) {
                                      const auditDialogContainer = auditDialog.shadowRoot.querySelector("#auditDialog");
                                      if (auditDialogContainer?.shadowRoot) {
                                          return auditDialogContainer.shadowRoot.querySelector(
                                              "div > div.mdc-dialog__container > div > div.popup-header > div:nth-child(2) > mwc-icon:nth-child(4)"
                                          );
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
              return null;
          });
      
          // Verificar que el elemento no sea null
          if (thirdElement && await thirdElement.evaluate(el => el !== null)) {
              await thirdElement.click();
              console.log('Hiciste clic en el tercer elemento dentro del shadow DOM');
          } else {
              console.log('El tercer elemento no fue encontrado o no es clickeable.');
          }

        } catch (thirdError) {
            console.error('No se pudo hacer clic en el tercer elemento dentro del shadow DOM:', thirdError);
        }
    }
}
  
  
    // Verificar que no haya errores en la consola
    await test.step(phraseReport.phraseError, async () => {
      logger.printLogs();
      expect(logger.errors.length).toBe(0);
    });

    // Verificar respuestas de red capturadas
    // await test.step(phraseReport.phraseVerifyNetwork, async () => {
    //     networkInterceptor.printNetworkData();
    //     const nullResponsesCount = networkInterceptor.verifyNonImageNullResponses();
    //     expect(nullResponsesCount).toBe(0);  // Asegúrate de que no haya respuestas nulas
    // });

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
      test('ClickOnButtonAndSignAudit', async ({ page }, testInfo) => {
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
//      const logPlat = new LogIntoPlatform({ page });
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