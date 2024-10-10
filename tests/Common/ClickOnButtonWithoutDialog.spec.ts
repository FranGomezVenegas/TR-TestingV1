import { test, expect } from '@playwright/test';

import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config.js';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform.js';

import { Button as dataForTestFromFile } from '../../trazit-models/test-config-instruments-activate';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls.js';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow.js';

import { Logger, NetworkInterceptor, ResponseValidator, phraseReport } from '../1TRAZiT-Commons/consoleAndNetworkMonitor.js';
import { NotificationWitness, ReportNotificationPhase } from '../1TRAZiT-Commons/notification.js';
import { clickButtonById, clickElement, clickElementByText, justificationPhrase, fillUserField, fillPasswordField, clickAcceptButton, attachScreenshot } from '../1TRAZiT-Commons/actionsHelper.js';

import {handleTabInteraction} from '../1TRAZiT-Commons/tabsInteractions';
import { handleRowActionsInteraction } from '../1TRAZiT-Commons/rowActionsInteractions';

//Function with all tests.
const commonTests = async (ConfigSettings, page, testInfo) => {
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
    
    // Llamada a handleDragDropBoxesInteraction y captura si se ejecutó correctamente
    const rowActions = await handleRowActionsInteraction(page, Button, testInfo); 
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
    await test.step(Button.phraseSelect, async () => {
        await clickElementByText(page, Button.selectName);
    });

    await test.step(Button.phrasePauses, async () => {
        await page.pause();
    });

    await test.step(Button.phraseScreenShots, async () => {
        await attachScreenshot(testInfo, Button.screenShotsSelect, page, ConfigSettingsAlternative.screenShotsContentType);
        await test.step(Button.phrasePauses, async () => {
            await page.pause();
        });
    });

    await test.step(Button.phraseButtonName, async () => {
        await clickButtonById(page, Button.buttonName);
    });

    await test.step(Button.phraseScreenShots, async () => {
        await attachScreenshot(testInfo, Button.screenShotsButtonName, page, ConfigSettingsAlternative.screenShotsContentType);
        await test.step(Button.phrasePauses, async () => {
            await page.pause();
        });
    });

    // Justification Phrase
    await fillUserField(page, testInfo); // Rellena el campo de "User"
    await fillPasswordField(page, testInfo); // Rellena el campo de "Password"

    // Continuar con la justificación y otras acciones
    await justificationPhrase(page, 30000, testInfo);    
    await clickAcceptButton(page);

    // Verificar que no haya errores en la consola
    // await test.step(phraseReport.phraseError, async () => {
    //   logger.printLogs();
    //   expect(logger.errors.length).toBe(0);
    // });

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
let ConfigSettings;
    
test.describe('Desktop Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await test.step('Set viewport size for desktop', async () => {
        await page.setViewportSize({ width: 1365, height: 821 });
      });
  
      const logPlat = new LogIntoPlatform({ page });
      trazitTestName = process.env.TRAZIT_TEST_NAME || 'RevisionLocationReviewSample' ;
  
      await test.step('Perform common setup', async () => {
        ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName);
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
      test('ClickOnAButtonWithoutDialog', async ({ page }, testInfo) => {
        await test.step('Run tests', async () => {
            await commonTests(ConfigSettings, page, testInfo);
        });
    });
  });

  

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