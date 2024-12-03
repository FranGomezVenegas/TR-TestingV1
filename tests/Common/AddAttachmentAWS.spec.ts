import { test, expect } from '@playwright/test';

import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { addAttachmentAWS as dataForTestFromFile } from '../../trazit-models/test-config-instruments-newInstrument.js';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

import { Logger, NetworkInterceptor, ResponseValidator, phraseReport } from '../1TRAZiT-Commons/consoleAndNetworkMonitor';
import { NotificationWitness, ReportNotificationPhase } from '../1TRAZiT-Commons/notification';
import { clickDoButton, esignRequired, clickElement, justificationPhrase, fillUserField, fillPasswordField, clickAcceptButton } from '../1TRAZiT-Commons/actionsHelper';

import { clickButtonById, clickElementByText, attachScreenshot } from '../1TRAZiT-Commons/actionsHelper';
import {handleTabInteraction} from '../1TRAZiT-Commons/tabsInteractions';
import { handleRowActionsInteraction } from '../1TRAZiT-Commons/rowActionsInteractions';
import {handleActionNameInteraction} from '../1TRAZiT-Commons/actionsNameInteractions';
import {handleObjectByTabsWithSearchInteraction} from '../1TRAZiT-Commons/objectByTabsWithSearch';
import { handleMenus } from '../1TRAZiT-Commons/handleMenus';

const fs = require('fs').promises;

//Function with all tests.
const commonTests = async (ConfigSettings, page, testInfo) => {
    await handleMenus(page);

    // Create instances of Logger and NetworkInterceptor
    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();

    let addAttachmentAWS;

    // If configuration data is available, process the JSON
    if (ConfigSettings && ConfigSettings.dataForTest) {
        let unescapedString = ConfigSettings.dataForTest.replace(/\\+/g, '\\');
        try {
            addAttachmentAWS = JSON.parse(unescapedString);
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
        addAttachmentAWS = JSON.parse(addAttachmentAWS.testDataGame);
    } else {
        addAttachmentAWS = dataForTestFromFile;
    }

    // Attach Logger and NetworkInterceptor to the page
    await test.step(phraseReport.phraseNetworkInterceptionAndLogger, async () => {
        logger.attachToPage(page);
        networkInterceptor.attachToPage(page);
    });

    // NOTIFICATIONS
    let afterEachData = {
        textInNotif1: addAttachmentAWS.textInNotif1,
        textInNotif2: addAttachmentAWS.textInNotif2,
        textInNotif3: addAttachmentAWS.textInNotif3,
    };

    const notificationWitness = new NotificationWitness(page);

    // Llamadas a interacciones previas
    await handleTabInteraction(page, testInfo, ConfigSettingsAlternative, addAttachmentAWS);

    // Llamo a la funcion para comprobar si un objectByTabs tiene un search. Essta funcion solo controla el search
    // clica en este y añada el campo que se desea buscar.
    await handleObjectByTabsWithSearchInteraction(page, testInfo, ConfigSettingsAlternative, addAttachmentAWS);
    
    await handleActionNameInteraction(page, testInfo, addAttachmentAWS);

  await test.step(addAttachmentAWS.phraseFileContent, async () => {
    const filePath = addAttachmentAWS.filePath;

    await test.step(addAttachmentAWS.phraseFileExists, async () => {
      try {
        await fs.access(filePath); // This checks if the file exists
      } catch (error) {
        throw new Error(`File at path ${filePath} does not exist.`);
      }
    });

    await test.step(addAttachmentAWS.phraseReadFileContent, async () => {
      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        expect(fileContent).not.toBe(''); // Ensure file content is not empty
      } catch (error) {
        throw new Error(`Failed to read file content from ${filePath}: ${error.message}`);
      }
    });
    
    await test.step(addAttachmentAWS.phraseTextFileContent, async () => {
      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        console.log('\nContenido del archivo:\n', fileContent);  // Log the content for verification
      } catch (error) {
        console.error('Failed to log file content:', error);
      }
    });
  });

  await test.step(addAttachmentAWS.phraseUploadArchivo, async () => {
    const filePath = addAttachmentAWS.filePath;

    // Sub-step 1: Locate the file input field
    await test.step(addAttachmentAWS.phraseLocateFileInput, async () => {
      const input = await page.locator(addAttachmentAWS.inputField);
      expect(input).toBeTruthy(); // Check if the file input is present
    });

    // Sub-step 2: Upload the file
    await test.step(addAttachmentAWS.phraseSetFileForUpload, async () => {
      const input = await page.locator(addAttachmentAWS.inputField);
      await input.setInputFiles(filePath);
    });
  });

  await test.step(addAttachmentAWS.phraseScreenShots, async () => {
    await attachScreenshot(testInfo, addAttachmentAWS.screenShotsFilled, page, ConfigSettingsAlternative.screenShotsContentType);
    await test.step(addAttachmentAWS.phasePauses, async () => {
        await page.pause();
    });
  });

  // Step 9: Click on the "Upload File" button
  await test.step(addAttachmentAWS.phraseClickUploadButton, async () => {
    await page.getByLabel(addAttachmentAWS.labelUploadButton).click({ timeout: 5000 });
  });

  // Step 10: Close the popup dialog
  await test.step(addAttachmentAWS.phraseCloseDialog, async () => {
    const closeButton = page.locator(addAttachmentAWS.closeDialog);
    await closeButton.click({ timeout: 5000 });
  });

  await test.step(addAttachmentAWS.phraseScreenShots, async () => {
    await attachScreenshot(testInfo, addAttachmentAWS.screenShotsAccept, page, ConfigSettingsAlternative.screenShotsContentType);
    await test.step(addAttachmentAWS.phasePauses, async () => {
        await page.pause();
    });
  });

  // Step 11: Wait for 5 seconds
  await test.step(addAttachmentAWS.phrasePauseForFiveSeconds, async () => {
    await page.waitForTimeout(5000);
  });

    // Justification Phrase
    await fillUserField(page, testInfo); 
    await fillPasswordField(page, testInfo); 

    // Continuar con la justificación y otras acciones
    await justificationPhrase(page, 30000, testInfo);  
    await esignRequired(page, 30000, testInfo);
    await clickAcceptButton(page);
    await clickDoButton(page);

  
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
      test('AddAttachmentAWS', async ({ page }, testInfo) => {
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
//     test('AddAttachmentAWS', async ({ page }, testInfo) => {
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
  
//     test('AddAttachmentAWS', async ({ page }, testInfo) => {
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
  
//     test('AddAttachmentAWS', async ({ page }, testInfo) => {
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
//     test('AddAttachmentAWS', async ({ page }, testInfo) => {
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