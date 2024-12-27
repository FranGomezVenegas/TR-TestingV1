import { test, expect, Browser  } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config.js';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform.js';
import { Button as dataForTestFromFile } from '../../trazit-models/test-config-instruments-activate';
import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls.js';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow.js';
import { Logger, NetworkInterceptor, ResponseValidator, phraseReport } from '../1TRAZiT-Commons/consoleAndNetworkMonitor.js';
import { NotificationWitness, ReportNotificationPhase } from '../1TRAZiT-Commons/notification.js';
import { clickDoButton, clickButtonById, clickElement, clickElementByText, justificationPhrase, clickAcceptButton, attachScreenshot, esignRequired } from '../1TRAZiT-Commons/actionsHelper.js';
import { fillUserField, fillPasswordField } from '../1TRAZiT-Commons/actionsHelper.js';
import { handleTabInteraction } from '../1TRAZiT-Commons/tabsInteractions.js';
import { handleActionNameInteraction } from '../1TRAZiT-Commons/actionsNameInteractionsWithoutDialog.js';
// import { handleActionNameInteraction } from '../1TRAZiT-Commons/actionsNameInteractions.js';
import {handleObjectByTabsWithSearchInteraction} from '../1TRAZiT-Commons/objectByTabsWithSearch';

import { processTestData } from '../1TRAZiT-Commons/dialogInteraction.js';
import { selectElementWithScroll } from '../1TRAZiT-Commons/selectElementWithScroll';
import { handleMenus } from '../1TRAZiT-Commons/handleMenus';

const commonTests = async (ConfigSettings: any, page: any, testInfo: any) => {
    await handleMenus(page);
    await page.waitForTimeout(2000);
    await page.pause();
    await page.pause();

    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();
    let Button: any;

    // Parse ConfigSettings data if available, or use the default data
    if (ConfigSettings && ConfigSettings.dataForTest) {
        const unescapedString = ConfigSettings.dataForTest.replace(/\\+/g, '\\');
        try {
            Button = JSON.parse(unescapedString);
            Button = JSON.parse(Button.testDataGame);
        } catch (error) {
            console.error("Error parsing JSON:", error);
            Button = dataForTestFromFile;
        }
    } else {
        Button = dataForTestFromFile;
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
    const afterEachData = {
        textInNotif1: Button.textInNotif1,
        textInNotif2: Button.textInNotif2,
        textInNotif3: Button.textInNotif3,
    };
    const notificationWitness = new NotificationWitness(page);

    await handleTabInteraction(page, testInfo, ConfigSettingsAlternative, Button);
    await handleObjectByTabsWithSearchInteraction(page, testInfo, ConfigSettingsAlternative, Button);

    
    
    // Click button by name
    await handleActionNameInteraction(page, testInfo, Button);

    // Creo un nuevo contexto con permisos para la cámara
    const context = await page.context().newContext({
        permissions: ['camera'], // Permito acceso a la cámara
    });

    // Creo una nueva página dentro del contexto
    const newPage = await context.newPage(); // Uso `newPage` en lugar de redeclarar `page`
    

    // Inicio la cámara
    await test.step(Button.phraseStartCamera, async () => {
        await newPage.getByRole('button', { name: Button.buttonStartCamera }).click({timeout: 2000});
        await newPage.waitForTimeout(1500); // Espero que la cámara se inicie
        await test.step(Button.phraseScreenShots, async () => {
            await attachScreenshot(testInfo, Button.screenShotStartCamera, newPage, ConfigSettingsAlternative.screenShotsContentType);
            if (Button.phrasePauses) {
                await newPage.pause();
            }
        });
    })

    // Capturo la foto
    await test.step(Button.phraseCapture, async () => {
        await newPage.getByRole('button', { name: Button.buttonCapture }).click({timeout: 2000});
        await test.step(Button.phraseScreenShots, async () => {
            await attachScreenshot(testInfo, Button.screenShotCapture, newPage, ConfigSettingsAlternative.screenShotsContentType);
            if (Button.phrasePauses) {
                await newPage.pause();
            }
        });
    });

    // Subo la foto
    // await test.step(Button.phraseUpload, async () => {
    //     await newPage.getByRole('button', { name: Button.buttonUpload }).click({timeout: 2000});
    //     await test.step(Button.phraseScreenShots, async () => {
    //         await attachScreenshot(testInfo, Button.screenShotUpload, newPage, ConfigSettingsAlternative.screenShotsContentType);
    //         if (Button.phrasePauses) {
    //             await newPage.pause();
    //         }
    //     });
    // });
    
    await test.step(Button.phraseCloseDialog, async () => {
        // Cierro el diálogo
        await newPage.locator(Button.closeDialog.locator)
            .filter({ hasText: Button.closeDialog.filter })
            .locator(Button.closeDialog.locator2)
            .click({ timeout: 500, force: true });
    });

    // Justification Phrase
    await fillUserField(page, testInfo);
    await fillPasswordField(page, testInfo);
    await justificationPhrase(page, 30000, testInfo);
    await clickAcceptButton(page);
    await esignRequired(page, 30000, testInfo);
    await clickDoButton(page);

    // Justification Phrase
    await fillUserField(page, testInfo);
    await fillPasswordField(page, testInfo);
    await justificationPhrase(page, 30000, testInfo);
    await clickAcceptButton(page);
    await esignRequired(page, 30000, testInfo);
    await clickDoButton(page);

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
    const mode = await notificationWitness.getDeviceMode(testInfo);
    await test.step(ReportNotificationPhase.phraseCaptureNotification, async () => {
        const capturedObjectName = await notificationWitness.addNotificationWitness(testInfo, afterEachData, mode);
        console.log('Captured Object Name:', capturedObjectName);
    });
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
  
        const logPlat = new LogIntoPlatform({ page });
        trazitTestName = process.env.TRAZIT_TEST_NAME || 'ProductDailyEntriesLinkFormulaAndSequence';
  
        // Define procInstanceName antes de pasarlo
        procInstanceName = process.env.PROC_INSTANCE_NAME || 'RandD'; // Valor predeterminado o el valor de tu entorno
  
        await test.step('Perform common setup', async () => {
            // Ahora pasas procInstanceName al llamar a commonBeforeEach
            ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
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
    test('TakePhotoAndUpload', async ({ page }, testInfo) => {
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
      trazitTestName: process.env.TRAZIT_TEST_NAME || 'ActiveInstrumentsNewInstrument' ,
      duration: `${durationInSeconds} seconds`,
      
    };
  
    const testStatus = testInfo.status;
    const procInstanceName = process.env.PROC_INSTANCE_NAME || 'instruments'; 
    await callApiRunCompletion(data, testStatus, trazitTestName, testInfo, procInstanceName)
  });

   
//   pwTest('Example test', async ({ page }) => {
//     // Your test logic here
//   });