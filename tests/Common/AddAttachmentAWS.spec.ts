import { test, expect } from '@playwright/test';

import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';
import { LogIntoPlatformProcDefinition } from '../1TRAZiT-Commons/logIntoProcDefinition.js';
import {validateNotificationTexts} from '../1TRAZiT-Commons/notificationProcsDefinition.js';

import { addAttachmentAWS as dataForTestFromFile } from '../../trazit-models/test-config-instruments-newInstrument.js';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

import { Logger, NetworkInterceptor, ResponseValidator, phraseReport } from '../1TRAZiT-Commons/consoleAndNetworkMonitor';
import { NotificationWitness, ReportNotificationPhase } from '../1TRAZiT-Commons/notification';
import { clickDo_Button_Justification, clickConfirmDialogButton, clickDoButton, esignRequired, clickElement, justificationPhrase, fillUserField, fillPasswordField, clickAcceptButton } from '../1TRAZiT-Commons/actionsHelper';

import { clickDoButtonJustification, clickDoButtonUserDialog, clickJustificationButton, clickButtonById, clickElementByText, attachScreenshot } from '../1TRAZiT-Commons/actionsHelper';
import { handleTabInteraction } from '../1TRAZiT-Commons/tabsInteractions';
import { handleActionNameInteraction } from '../1TRAZiT-Commons/actionsNameInteractionsWithoutDialog.js';
import { handleObjectByTabsWithSearchInteraction } from '../1TRAZiT-Commons/objectByTabsWithSearch';

const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
import screenshot from 'screenshot-desktop';

import { handleCardsInteraction } from '../../tests/1TRAZiT-Commons/utils/ProcDefinition/interactionCards/cardsInteraction.js';
import { handleSelectCard } from '../1TRAZiT-Commons/utils/ProcDefinition/selectCard/selectCard.js';

// Function with all tests.
const commonTests = async (ConfigSettings, page, testInfo) => {
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

    // Notification Handling
    const expectedTexts = [
        addAttachmentAWS.textInNotif1?.toLowerCase(),
        addAttachmentAWS.textInNotif2?.toLowerCase(),
        addAttachmentAWS.textInNotif3?.toLowerCase(),
    ];

    // NOTIFICATIONS
    let afterEachData = {
        textInNotif1: addAttachmentAWS.textInNotif1,
        textInNotif2: addAttachmentAWS.textInNotif2,
        textInNotif3: addAttachmentAWS.textInNotif3,
    };

    const notificationWitness = new NotificationWitness(page);

    // Proc Management
    await handleCardsInteraction(page, testInfo, addAttachmentAWS);
    await handleSelectCard(page, testInfo, addAttachmentAWS);

    // Handle previous interactions
    await handleTabInteraction(page, testInfo, ConfigSettingsAlternative, addAttachmentAWS);
    await handleObjectByTabsWithSearchInteraction(page, testInfo, ConfigSettingsAlternative, addAttachmentAWS);

    await test.step(addAttachmentAWS.phrasePauses, async () => {
      await page.waitForTimeout(1000);
    });
    
    await handleActionNameInteraction(page, testInfo, addAttachmentAWS);

    // Handle file-related steps
    await test.step(addAttachmentAWS.phraseFileContent, async () => {
        const filePath = addAttachmentAWS.filePath;
        // const filePath = 'C:\\Users\\paula\\Documents\\TRAZiT\\Playwright\\TR-TestingV1\\testingAWS.txt';
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

    // Handle file upload
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

    // Capture screenshot after file upload
    await test.step(addAttachmentAWS.phraseScreenShots, async () => {
        await attachScreenshot(testInfo, addAttachmentAWS.screenShotsFilled, page, ConfigSettingsAlternative.screenShotsContentType);
        await test.step(addAttachmentAWS.phasePauses, async () => {
            await page.pause();
        });
    });
   

    // Step 11: Wait for 5 seconds
    await test.step(addAttachmentAWS.phrasePauses, async () => {
        await page.waitForTimeout(2000);
    });
    
    if (procInstanceName === 'proc_management') {
        await test.step("Final checks", async () => {
            await clickDoButton(page);
            await clickConfirmDialogButton(page);
        }); 
    } else {
        await test.step('Verifications after the action', async () => {
            await fillUserField(page, testInfo);
            await fillPasswordField(page, testInfo);
            await justificationPhrase(page, 30000, testInfo);
            await clickAcceptButton(page);
            await esignRequired(page, 30000, testInfo);
            await clickDoButton(page);
            await clickDoButtonJustification(page);
            await clickDoButtonUserDialog(page);
            await clickJustificationButton(page);
            await clickConfirmDialogButton(page);
            await clickDo_Button_Justification(page);
        });
    }

    // Verify there are no errors in the console
    await test.step(phraseReport.phraseError, async () => {
        logger.printLogs();
        expect(logger.errors.length).toBe(0);
    });

    // Verify network responses
    await test.step(phraseReport.phraseVerifyNetwork, async () => {
        networkInterceptor.printNetworkData();
        const nullResponsesCount = networkInterceptor.verifyNonImageNullResponses();
        expect(nullResponsesCount).toBe(0);  // Ensure no null responses
    });

    // Validate network responses
    await test.step(phraseReport.phraseVerifyNetwork, async () => {
        const responseValidator = new ResponseValidator(networkInterceptor.responses);
        try {
            await responseValidator.validateResponses();
        } catch (error) {
            // test.fail(error.message); // Uncomment to fail the test on invalid responses
        }
    });

    if (procInstanceName === 'proc_management') {
        await test.step(addAttachmentAWS.phrasePauses, async () => {
            await page.waitForTimeout(1000);
        });
        // Notification proc_management
        await validateNotificationTexts(page, expectedTexts, testInfo);
    } else {
        await test.step(addAttachmentAWS.phrasePauses, async () => {
            await page.waitForTimeout(1500);
        });
        // Notification handling post-action
        const mode = await notificationWitness.getDeviceMode(testInfo);
        await test.step(ReportNotificationPhase.phraseCaptureNotification, async () => {
            const capturedObjectName = await notificationWitness.addNotificationWitness(testInfo, afterEachData, mode);
            console.log('Captured Object Name:', capturedObjectName);
        });
    } 
    // File-specific actions (e.g., opening Excel files)
    const fileExtension = path.extname(addAttachmentAWS.filePath).toLowerCase();

    if (procInstanceName === 'proc_management') {
        await test.step("Final checks", async () => {
            await clickDoButton(page);
            await clickConfirmDialogButton(page);
        }); 
    } else {
        await test.step('Verifications after the action', async () => {
            await fillUserField(page, testInfo);
            await fillPasswordField(page, testInfo);
            await justificationPhrase(page, 30000, testInfo);
            await clickAcceptButton(page);
            await esignRequired(page, 30000, testInfo);
            await clickDoButton(page);
            await clickDoButtonJustification(page);
            await clickDoButtonUserDialog(page);
            await clickJustificationButton(page);
            await clickConfirmDialogButton(page);
            await clickDo_Button_Justification(page);
        });
    }
    // Open and capture screenshots for different file types
    // excel
    if (fileExtension === '.xlsx' || fileExtension === '.xls' || fileExtension === '.csv') {
        await test.step('Open the Excel file and capture the screen', async () => {
            await new Promise<void>((resolve, reject) => {
                // Open the Excel file
                exec(`cmd /c start "" "${addAttachmentAWS.filePath}"`, async (err) => {
                    if (err) {
                        console.error('Error al abrir el archivo en Excel:', err);
                        reject(err);
                        return;
                    }

                    // Wait for Excel to open
                    await new Promise(resolve => setTimeout(resolve, 3500)); 

                    // Execute VBS script to maximize Excel
                    exec(`cscript //nologo MaximizeExcel.vbs`, (err) => {
                        if (err) {
                            console.error('Error maximizando Excel:', err);
                            reject(err);
                            return;
                        }
                    });

                    try {
                        // Take screenshot after a delay to ensure window is visible
                        const img = await screenshot();

                        // Create screenshot filename
                        const imgPath = path.join(
                            path.dirname(addAttachmentAWS.filePath),
                            'excel.png'
                        );

                        // Save the screenshot using fs.writeFile from promises
                        await fs.writeFile(imgPath, img);

                        // Attach both the screenshot and the Excel file content to the report
                        await testInfo.attach('Excel Screenshot', {
                            path: imgPath,
                            contentType: 'image/png'
                        });

                        // Also attach the original Excel file
                        const excelContent = await fs.readFile(addAttachmentAWS.filePath);
                        console.log('\nExcel file content:', excelContent);
                        await testInfo.attach('Excel File', {
                            path: addAttachmentAWS.filePath,
                            contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        });

                        resolve();
                    } catch (error) {
                        console.error('Error capturing Excel screenshot:', error);
                        reject(error);
                    } finally {
                        // Close Excel
                        exec('taskkill /im excel.exe /f', (err) => {
                            if (err) {
                                console.error('Error closing Excel:', err);
                            }
                        });
                    }
                });
            });
        });
    }
    // bloc de notas
    if (fileExtension === '.txt') {
        await test.step('Open the file in Notepad and capture the screen', async () => {
            await new Promise<void>((resolve, reject) => {
                // Open the text file
                exec(`cmd /c start "" "${addAttachmentAWS.filePath}"`, async (err) => {
                    if (err) {
                        console.error('Error al abrir el archivo en Notepad:', err);
                        reject(err);
                        return;
                    }
    
                    // Wait for Notepad to open
                    await new Promise(resolve => setTimeout(resolve, 3500)); 

                    // Execute VBS script to maximize Word
                    exec(`cscript //nologo MaximizeNotepad.vbs`, (err) => {
                        if (err) {
                            console.error('Error maximizing Notepad:', err);
                            reject(err);
                            return;
                        }
                    });
    
                    try {
                        // Take screenshot after a delay to ensure window is visible
                        const img = await screenshot();
    
                        // Create screenshot filename
                        const imgPath = path.join(
                            path.dirname(addAttachmentAWS.filePath),
                            'notepad.png'
                        );
    
                        
                        // Save the screenshot using fs.writeFile from promises
                        await fs.writeFile(imgPath, img);
    
                        // Attach both the screenshot and the text file content to the report
                        await testInfo.attach('Notepad Screenshot', {
                            path: imgPath,
                            contentType: 'image/png'
                        });
    
                        // Also attach the original text file
                        const textContent = await fs.readFile(addAttachmentAWS.filePath, 'utf-8');
                        console.log('\nText content:', textContent);
                        await testInfo.attach('Text File', {
                            path: addAttachmentAWS.filePath,
                            contentType: 'text/plain'
                        });
                        
                        resolve();
                    } catch (error) {
                        console.error('Error capturing Notepad screenshot:', error);
                        reject(error);
                    } finally {
                        // Close Notepad
                        exec('taskkill /im notepad.exe /f', (err) => {
                            if (err) {
                                console.error('Error closing Notepad:', err);
                            }
                        });
                    }
                });
            });
        });
    }
    // word
    if (fileExtension === '.docx' || fileExtension === '.doc') {
        await test.step('Open the Word file and capture the screen', async () => {
            await new Promise<void>((resolve, reject) => {
                // Open the Word file
                exec(`cmd /c start "" "${addAttachmentAWS.filePath}"`, async (err) => {
                    if (err) {
                        console.error('Error al abrir el archivo en Word:', err);
                        reject(err);
                        return;
                    }
    
                    // Wait for Word to open
                    await new Promise(resolve => setTimeout(resolve, 3500)); 
    
                    // Execute VBS script to maximize Word
                    exec(`cscript //nologo MaximizeWord.vbs`, (err) => {
                        if (err) {
                            console.error('Error maximizando Word:', err);
                            reject(err);
                            return;
                        }
                    });
    
                    try {
                        // Take screenshot after a delay to ensure window is visible
                        const img = await screenshot();
    
                        // Create screenshot filename
                        const imgPath = path.join(
                            path.dirname(addAttachmentAWS.filePath),
                            'word.png'
                        );
    
                        // Save the screenshot using fs.writeFile from promises
                        await fs.writeFile(imgPath, img);
    
                        // Attach both the screenshot and the Word file content to the report
                        await testInfo.attach('Word Screenshot', {
                            path: imgPath,
                            contentType: 'image/png'
                        });
    
                        // Also attach the original Word file
                        const wordContent = await fs.readFile(addAttachmentAWS.filePath);
                        console.log('\nWord file content:', wordContent);
                        await testInfo.attach('Word File', {
                            path: addAttachmentAWS.filePath,
                            contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                        });
    
                        resolve();
                    } catch (error) {
                        console.error('Error capturing Word screenshot:', error);
                        reject(error);
                    } finally {
                        // Close Word
                        exec('taskkill /im winword.exe /f', (err) => {
                            if (err) {
                                console.error('Error closing Word:', err);
                            }
                        });
                    }
                });
            });
        });
    }
    // powerPoint
    if (fileExtension === '.pptx' || fileExtension === '.ppt') {
        await test.step('Open the PowerPoint file and capture the screen', async () => {
            await new Promise<void>((resolve, reject) => {
                // Abrir el archivo de PowerPoint
                exec(`cmd /c start "" "${addAttachmentAWS.filePath}"`, async (err) => {
                    if (err) {
                        console.error('Error al abrir el archivo PowerPoint:', err);
                        reject(err);
                        return;
                    }
    
                    // Esperar a que PowerPoint abra el archivo
                    await new Promise(resolve => setTimeout(resolve, 3500));
    
                    // Ejecutar un script para maximizar la ventana de PowerPoint
                    exec(`cscript //nologo MaximizePowerPoint.vbs`, (err) => {
                        if (err) {
                            console.error('Error maximizando PowerPoint:', err);
                            reject(err);
                            return;
                        }
                    });
    
                    try {
                        // Capturar captura de pantalla
                        const img = await screenshot();
    
                        // Ruta donde se guardará la captura
                        const imgPath = path.join(
                            path.dirname(addAttachmentAWS.filePath),
                            'powerpoint.png'
                        );
    
                        // Guardar la captura de pantalla
                        await fs.writeFile(imgPath, img);
    
                        // Adjuntar la captura de pantalla al reporte
                        await testInfo.attach('PowerPoint Screenshot', {
                            path: imgPath,
                            contentType: 'image/png'
                        });
    
                        // Adjuntar el archivo PowerPoint
                        const pptContent = await fs.readFile(addAttachmentAWS.filePath);
                        console.log('\nPowerPoint file content:', pptContent);
                        await testInfo.attach('PowerPoint File', {
                            path: addAttachmentAWS.filePath,
                            contentType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
                        });
    
                        resolve();
                    } catch (error) {
                        console.error('Error capturando la pantalla de PowerPoint:', error);
                        reject(error);
                    } finally {
                        // Cerrar PowerPoint
                        exec('taskkill /im POWERPNT.EXE /f', (err) => {
                            if (err) {
                                console.error('Error cerrando PowerPoint:', err);
                            }
                        });
                    }
                });
            });
        });
    }
    // pdf
    if (fileExtension === '.pdf') {
        await test.step('Open the PDF file and capture the screen', async () => {
            await new Promise<void>((resolve, reject) => {
                // Abrir el archivo PDF con el visor predeterminado
                exec(`cmd /c start "" "${addAttachmentAWS.filePath}"`, async (err) => {
                    if (err) {
                        console.error('Error al abrir el archivo PDF:', err);
                        reject(err);
                        return;
                    }
    
                    // Esperar más tiempo para que el PDF se abra completamente
                    await new Promise(resolve => setTimeout(resolve, 4000)); // Ajusta si es necesario
    
                    // Ejecutar un script para maximizar la ventana del visor PDF
                    exec(`cscript //nologo MaximizePDF.vbs`, (err) => {
                        if (err) {
                            console.error('Error maximizando el visor de PDF:', err);
                            reject(err);
                            return;
                        }
                    });
    
                    try {
                        // Capturar captura de pantalla
                        const img = await screenshot();
    
                        // Ruta donde se guardará la captura
                        const imgPath = path.join(
                            path.dirname(addAttachmentAWS.filePath),
                            'pdf.png'
                        );
    
                        // Guardar la captura de pantalla
                        await fs.writeFile(imgPath, img);
    
                        // Adjuntar la captura de pantalla al reporte
                        await testInfo.attach('PDF Screenshot', {
                            path: imgPath,
                            contentType: 'image/png'
                        });
    
                        // Adjuntar el archivo PDF
                        const pdfContent = await fs.readFile(addAttachmentAWS.filePath);
                        console.log('\nPDF file content:', pdfContent);
                        await testInfo.attach('PDF File', {
                            path: addAttachmentAWS.filePath,
                            contentType: 'application/pdf'
                        });
    
                        resolve();
                    } catch (error) {
                        console.error('Error capturando la pantalla del PDF:', error);
                        reject(error);
                    } finally {
                        // Cerrar el visor de PDF (para Adobe Reader o Edge)
                        exec('taskkill /im AcroRd32.exe /f', (err) => {
                            if (err) {
                                console.log('Error cerrando Adobe Reader:', err);
                            }
                        });
    
                        exec('taskkill /im msedge.exe /f', (err) => {
                            if (err) {
                                console.log('Error cerrando Edge:', err);
                            }
                        });
                    }
                });
            });
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

  test('AddAttachmentAWS', async ({ page }, testInfo) => {
    await test.step('Run tests', async () => {
      await commonTests(ConfigSettings, page, testInfo);
    });
  });
});


// Mobile Mode 
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
  
//     test('AddAttachmentAWS', async ({ page }, testInfo) => {
//       await test.step('Run tests', async () => {
//         await commonTests(ConfigSettings, page, testInfo);
//       });
//     });
//   });
  
// Mobile Mode - Retrato
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
  
//     test('AddAttachmentAWS', async ({ page }, testInfo) => {
//       await test.step('Run tests', async () => {
//         await commonTests(ConfigSettings, page, testInfo);
//       });
//     });
//   });

// Tablets Mode
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

//     test('AddAttachmentAWS', async ({ page }, testInfo) => {
//         await test.step('Run tests', async () => {
//             await commonTests(ConfigSettings, page, testInfo);
//         });
//     });
// });

// Tablets Mode - Retrato
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

//     test('AddAttachmentAWS', async ({ page }, testInfo) => {
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