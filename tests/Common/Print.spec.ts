import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config.js';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform.js';

import { print as dataForTestFromFile } from '../../trazit-models/test-config-instruments-newInstrument.js';
import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls.js';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow.js';

import { Logger, NetworkInterceptor, ResponseValidator, phraseReport } from '../1TRAZiT-Commons/consoleAndNetworkMonitor.js';
import { NotificationWitness, ReportNotificationPhase } from '../1TRAZiT-Commons/notification.js';

import { clickButtonById, clickElement, clickElementByText, justificationPhrase, clickAcceptButton, attachScreenshot } from '../1TRAZiT-Commons/actionsHelper.js';
import { esignRequired, clickDoButton, fillUserField, fillPasswordField } from '../1TRAZiT-Commons/actionsHelper.js';

import { handleTabInteraction } from '../1TRAZiT-Commons/tabsInteractions.js';
import { handleRowActionsInteraction } from '../1TRAZiT-Commons/rowActionsInteractions.js';
import { handleObjectByTabsWithSearchInteraction } from '../1TRAZiT-Commons/objectByTabsWithSearch.js';

import fs from 'fs';
import path from 'path';
import { handleMenus } from '../1TRAZiT-Commons/handleMenus';

const commonTests = async (ConfigSettings: any, page: any, testInfo: any) => {
    // await handleMenus(page);

    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();
    let print: any;

    // Parse ConfigSettings data or fallback to default
    if (ConfigSettings && ConfigSettings.dataForTest) {
        const unescapedString = ConfigSettings.dataForTest.replace(/\\+/g, '\\');
        try {
            print = JSON.parse(unescapedString);
            print = JSON.parse(print.testDataGame);
        } catch (error) {
            console.error("Error parsing JSON:", error);
            print = dataForTestFromFile;
        }
    } else {
        print = dataForTestFromFile;
    }

    // Attach Logger and NetworkInterceptor to the page
    await test.step(print.phraseNetworkInterceptionAndLogger, async () => {
        logger.attachToPage(page);
        networkInterceptor.attachToPage(page);
    });

    await handleTabInteraction(page, testInfo, ConfigSettingsAlternative, print);
    await handleObjectByTabsWithSearchInteraction(page, testInfo, ConfigSettingsAlternative, print);

    const rowActions = await handleRowActionsInteraction(page, print, testInfo);
    console.log("Resultado de handleRowActionsInteraction:", rowActions);

    if (rowActions) {
        console.log("El resultado fue verdadero, realizando acciones adicionales...");
    }

    // Pause before continuing
    await test.step(print.phrasePauses, async () => {
        await page.waitForTimeout(1000);
    });

    // Generate the current timestamp
    function getFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
    }

    // Generate PDF
    async function generatePDF(page, testInfo, print, orientation) {
        await test.step(print.phraseScreenShots, async () => {
            await testInfo.attach(print.desktopMode.screenShotName, {
                body: await page.screenshot(),
                contentType: ConfigSettingsAlternative.screenShotsContentType,
            });
        });

        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
            (async () => {
                try {
                    const buttonLocator = page.getByLabel(print.buttonName).nth(print.positionButton ?? 0);
                    await buttonLocator.click({ timeout: 1500 });
                } catch (error1) {
                    try {
                        await page
                            .locator('md-icon')
                            .filter({ hasText: print.buttonName })
                            .locator('slot')
                            .nth(print.positionButton ?? 0)
                            .click({ force: true, timeout: 1500 });
                    } catch (error2) {
                        console.error("Error clicking print button:", error2);
                        throw new Error("Unable to open print dialog.");
                    }
                }
            })(),
        ]);

        await test.step(print.phraseWaitForPrintDialog, async () => {
            await newPage.waitForLoadState('load');
        });

        if (newPage && !newPage.isClosed()) {
            try {
                const basePath = print.basePath;
                const fileName = orientation;
                const testFolder = path.join(basePath, fileName);

                if (!fs.existsSync(testFolder)) {
                    fs.mkdirSync(testFolder, { recursive: true });
                }

                const formattedDate = getFormattedDate();
                const pdfPath = path.join(
                    testFolder,
                    `${print.desktopMode.screenShotName}_${fileName}_${formattedDate}.pdf`
                );

                await test.step(print.phraseGeneratePdfWithOrientation, async () => {
                    await newPage.pdf({
                        path: pdfPath,
                        format: 'A4',
                        landscape: orientation === 'horizontal',
                        printBackground: true,
                    });
                    console.log(`PDF saved with orientation ${orientation}: ${pdfPath}`);
                });

                await test.step(print.phrasePdfAttachment, async () => {
                    testInfo.attach(`${print.desktopMode.screenShotName}_${fileName}_${formattedDate}.pdf`, {
                        body: fs.readFileSync(pdfPath),
                        contentType: 'application/pdf',
                    });
                });
            } catch (error) {
                console.error("Error during PDF generation:", error);
            } finally {
                await test.step(print.phraseClosePrintDialog, async () => {
                    if (!newPage.isClosed()) {
                        await newPage.close();
                    }
                });
            }
        } else {
            console.log("New page for print dialog was closed unexpectedly.");
        }
    }

    const orientation = print.orientation;
    await generatePDF(page, testInfo, print, orientation);

    // Handle form fields and interactions
    await fillUserField(page, testInfo);
    await fillPasswordField(page, testInfo);
    await justificationPhrase(page, 30000, testInfo);
    await esignRequired(page, 30000, testInfo);

    await clickAcceptButton(page);
    await clickDoButton(page);

    await test.step('Si es necesario hago clic en Accept', async () => {
        const acceptButton = page.getByRole('button', { name: 'Accept' }).nth(1);
        if (await acceptButton.isVisible()) {
            await acceptButton.click();
        } else {
            console.log("Botón de Aceptar no encontrado, omitiendo paso.");
        }
    });

    // Validate network responses
    await test.step(print.phraseVerifyNetwork, async () => {
        networkInterceptor.printNetworkData();
        const nullResponsesCount = networkInterceptor.verifyNonImageNullResponses();
        expect(nullResponsesCount).toBe(0);
    });

    // Validate response data
    await test.step(print.phraseVerifyNetwork, async () => {
        const responseValidator = new ResponseValidator(networkInterceptor.responses);
        try {
            await responseValidator.validateResponses();
        } catch (error) {
            console.log("Error validating responses:", error);
        }
    });

    await page.waitForTimeout(1000);
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
        trazitTestName = process.env.TRAZIT_TEST_NAME || 'ActiveInventoryLotsPrintHorizontal';
  
        // Define procInstanceName antes de pasarlo
        procInstanceName = process.env.PROC_INSTANCE_NAME || 'stock'; // Valor predeterminado o el valor de tu entorno
  
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
    test('Print', async ({ page }, testInfo) => {
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
//     test('Print', async ({ page }, testInfo) => {
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
  
//     test('Print', async ({ page }, testInfo) => {
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
  
//     test('Print', async ({ page }, testInfo) => {
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
//     test('Print', async ({ page }, testInfo) => {
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

