// import { test, expect } from '@playwright/test';
// import { platformMenuNames } from '../../trazit-config';
// import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
// import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

// import { MenuInstrumentsControl } from '../../trazit-models/test-config-instruments-global';
//import { newInstrumentSuccess, newInstrumentAlreadyExists } from '../../trazit-models/test-config-instruments-newInstrument';

// import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
// import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
// import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';
// import { Logger, NetworkInterceptor } from '../1TRAZiT-Commons/consoleInterceptionAndRequestResponse';

// const fs = require('fs');
// const path = require('path');
 
// // Obtener la ruta del archivo desde la variable de entorno
// // const configPath = process.env.CONFIG_PATH;
// // const dbName = process.env.DB_NAME;
// // const procInstanceName = process.env.PROC_INSTANCE_NAME;
// // const testName = process.env.TEST_NAME;
 
// // if (!dbName || !procInstanceName || !testName) {
// //   throw new Error('One or more required environment variables are not set');
// // }
 
// // // Asegurarse de que la ruta sea válida
// // if (!configPath) {
// //   throw new Error('CONFIG_PATH environment variable is not set');
// // }
 
// // // Importar el archivo de configuración dinámicamente
// // const config = require(path.resolve(configPath));
// // const newInstrumentSuccess=config.newInstrumentSuccess
// // const newInstrumentAlreadyExists=config.newInstrumentAlreadyExists
// // const newCancel=config.newCancel 


// //Function with all tests.
// const commonTests = () => {
//   test('Trazit-Instruments-ActiveInstruments-OpenWindow', async ({ page }, testInfo) => {
//     // Create instances of Logger and NetworkInterceptor
//     const logger = new Logger();
//     const networkInterceptor = new NetworkInterceptor();

//     // Attach Logger and NetworkInterceptor to the page
//     test.step('Attach Logger and NetworkInterceptor to the page', async () => {
//         logger.attachToPage(page);
//         networkInterceptor.attachToPage(page);
//     });

//     test.step('Log all captured logs and network data', async () => {
//       logger.printLogs();
//       networkInterceptor.printNetworkData();
//     });

//     // Fail the test if any console errors were captured
//     test.step('Verify no console errors', async () => {
//         expect(logger.errors.length).toBe(0);
//     });

//     //await page.close();
//   });
  
  
//   test('NewInstrumentSuccess', async ({ page }, testInfo) => {  
//     let afterEachData = {
//       textInNotif1:"",
//       textInNotif2:"",
//       textInNotif3:"",
//     }

//     // Create instances of Logger and NetworkInterceptor
//     const logger = new Logger();
//     const networkInterceptor = new NetworkInterceptor();

//     // Attach Logger and NetworkInterceptor to the page
//     test.step('Attach Logger and NetworkInterceptor to the page', async () => {
//         logger.attachToPage(page);
//         networkInterceptor.attachToPage(page);
//     });

//     await page.getByLabel(newInstrumentSuccess.buttonName).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(newInstrumentSuccess.screenShotsEmptyForm, {
//       body: await page.screenshot({fullPage: true }), 
//       contentType: ConfigSettingsAlternative.screenShotsContentType});
//     await page.pause();

//     await page.getByLabel(newInstrumentSuccess.fldName.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(newInstrumentSuccess.fldName.label).fill(newInstrumentSuccess.fldName.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(newInstrumentSuccess.fldFamily.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('option', { name: newInstrumentSuccess.fldFamily.option }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(newInstrumentSuccess.fldModel.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(newInstrumentSuccess.fldModel.label).fill(newInstrumentSuccess.fldModel.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(newInstrumentSuccess.fldSupplier.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('option', { name: newInstrumentSuccess.fldSupplier.option }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(newInstrumentSuccess.fldSerial.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(newInstrumentSuccess.fldSerial.label).fill(newInstrumentSuccess.fldSerial.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(newInstrumentSuccess.fldManufacturer.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('option', { name: newInstrumentSuccess.fldManufacturer.option, exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(newInstrumentSuccess.fldResponsible.label, { exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('option', { name: newInstrumentSuccess.fldResponsible.option, exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(newInstrumentSuccess.fldResponsibleBackup.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('option', { name: newInstrumentSuccess.fldResponsibleBackup.option, exact: true }).click();
//     await page.pause();
//     await page.pause();
//      // Function to reduce the size of the dialog
//      const reduceDialogSize = async () => {
//       const zoomOutButton = page.locator('.popup-header mwc-icon.corner').nth(1); // Selects the "zoom_out_map" icon
//       await zoomOutButton.click();
//   };

//     // Apply reduceDialogSize before interacting with elements
//     await reduceDialogSize();
//     await page.getByLabel(newInstrumentSuccess.fldPurchase.label).fill(newInstrumentSuccess.fldPurchase.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(newInstrumentSuccess.fldInstallation.label).fill(newInstrumentSuccess.fldInstallation.value);

//     await testInfo.attach(newInstrumentSuccess.screenShotsFilledForm, {
//       body: await page.screenshot({fullPage: true }), 
//       contentType: ConfigSettingsAlternative.screenShotsContentType});
//     await page.pause();

//     await reduceDialogSize();
//     await page.getByRole('button', { name: newInstrumentSuccess.buttonAccept }).click();    
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(newInstrumentSuccess.screenShotsAccept, {
//       body: await page.screenshot({fullPage: true }), 
//       contentType: ConfigSettingsAlternative.screenShotsContentType});
//     await page.pause(); 
    
//     test.step('Log all captured logs and network data', async () => {
//       logger.printLogs();
//       networkInterceptor.printNetworkData();
//     });

//     // Fail the test if any console errors were captured
//     test.step('Verify no console errors', async () => {
//         expect(logger.errors.length).toBe(0);
//     });
  
//     afterEachData.textInNotif1=newInstrumentSuccess.textInNotif1
//     afterEachData.textInNotif2=newInstrumentSuccess.textInNotif2
//     afterEachData.textInNotif3=newInstrumentSuccess.textInNotif3
  
//     // Obtener el modo de dispositivo usando page.evaluate
//     const viewportWidth = await page.evaluate(() => {
//       return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
//   });
  
//   if (viewportWidth >= 1024) {
//       // Modo escritorio o tablet en modo paisaje
//       const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
//       if (notificationElement !== null) {
//       await notificationElement.hover();
//       }
//       await testInfo.attach(newInstrumentSuccess.screenformNotifications, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//       const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
//       if (notificationDiv !== null) {
//       await testInfo.attach(newInstrumentSuccess.screenformLastNotifications, {
//           body: await notificationDiv.screenshot(),
//           contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//       }
//   } else if (viewportWidth >= 768 && viewportWidth < 1024) {
//       // Tablet en modo retrato
//       await page.click('mwc-icon-button.menu');
//       await page.click('mwc-list-item#dashboardnotifications');
//       await testInfo.attach('TabletNotifications', {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//   } else {
//       // Modo móvil
//       await page.click('mwc-icon-button.menu');
//       await page.click('mwc-list-item#dashboardnotifications');
//       await testInfo.attach('NotificationsMobile', {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//     }
//   })

  

//   test('NewInstrumentAlreadyExists', async ({ page }, testInfo) => {  
//     let afterEachData = {
//       textInNotif1:"",
//       textInNotif2:"",
//       textInNotif3:"",
//     }

//     // Create instances of Logger and NetworkInterceptor
//     const logger = new Logger();
//     const networkInterceptor = new NetworkInterceptor();

//     // Attach Logger and NetworkInterceptor to the page
//     test.step('Attach Logger and NetworkInterceptor to the page', async () => {
//         logger.attachToPage(page);
//         networkInterceptor.attachToPage(page);
//     });

//     await page.getByLabel(newInstrumentSuccess.buttonName).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(newInstrumentSuccess.screenShotsEmptyForm, {
//       body: await page.screenshot({fullPage: true }), 
//       contentType: ConfigSettingsAlternative.screenShotsContentType});
//     await page.pause();

//     await page.getByLabel(newInstrumentAlreadyExists.fldName.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(newInstrumentAlreadyExists.fldName.label).fill(newInstrumentAlreadyExists.fldName.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(newInstrumentSuccess.fldFamily.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('option', { name: newInstrumentSuccess.fldFamily.option }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(newInstrumentSuccess.fldModel.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(newInstrumentSuccess.fldModel.label).fill(newInstrumentSuccess.fldModel.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(newInstrumentSuccess.fldSupplier.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('option', { name: newInstrumentSuccess.fldSupplier.option }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(newInstrumentSuccess.fldSerial.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(newInstrumentSuccess.fldSerial.label).fill(newInstrumentSuccess.fldSerial.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(newInstrumentSuccess.fldManufacturer.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('option', { name: newInstrumentSuccess.fldManufacturer.option, exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(newInstrumentSuccess.fldResponsible.label, { exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('option', { name: newInstrumentSuccess.fldResponsible.option, exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(newInstrumentSuccess.fldResponsibleBackup.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('option', { name: newInstrumentSuccess.fldResponsibleBackup.option, exact: true }).click();
//     await page.pause();
//     await page.pause();
//      // Function to reduce the size of the dialog
//      const reduceDialogSize = async () => {
//       const zoomOutButton = page.locator('.popup-header mwc-icon.corner').nth(1); // Selects the "zoom_out_map" icon
//       await zoomOutButton.click();
//   };

//     // Apply reduceDialogSize before interacting with elements
//     await reduceDialogSize();
//     await page.getByLabel(newInstrumentSuccess.fldPurchase.label).fill(newInstrumentSuccess.fldPurchase.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(newInstrumentSuccess.fldInstallation.label).fill(newInstrumentSuccess.fldInstallation.value);

//     await testInfo.attach(newInstrumentSuccess.screenShotsFilledForm, {
//       body: await page.screenshot({fullPage: true }), 
//       contentType: ConfigSettingsAlternative.screenShotsContentType});
//     await page.pause();

//     await reduceDialogSize();
//     await page.getByRole('button', { name: newInstrumentSuccess.buttonAccept }).click();    
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(newInstrumentSuccess.screenShotsAccept, {
//       body: await page.screenshot({fullPage: true }), 
//       contentType: ConfigSettingsAlternative.screenShotsContentType});
//     await page.pause(); 
    
//     test.step('Log all captured logs and network data', async () => {
//       logger.printLogs();
//       networkInterceptor.printNetworkData();
//     });

//     // Fail the test if any console errors were captured
//     test.step('Verify no console errors', async () => {
//         expect(logger.errors.length).toBe(0);
//     });
//     await page.pause();
  
//     afterEachData.textInNotif1=newInstrumentAlreadyExists.textInNotif1
//     afterEachData.textInNotif2=newInstrumentAlreadyExists.textInNotif2
//     afterEachData.textInNotif3=newInstrumentAlreadyExists.textInNotif3
  
//     // Obtener el modo de dispositivo usando page.evaluate
//     const viewportWidth = await page.evaluate(() => {
//       return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
//   });
  
//   if (viewportWidth >= 1024) {
//       // Modo escritorio o tablet en modo paisaje
//       const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
//       if (notificationElement !== null) {
//       await notificationElement.hover();
//       }
//       await testInfo.attach(newInstrumentSuccess.screenformNotifications, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//       const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
//       if (notificationDiv !== null) {
//       await testInfo.attach(newInstrumentSuccess.screenformLastNotifications, {
//           body: await notificationDiv.screenshot(),
//           contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//       }
//   } else if (viewportWidth >= 768 && viewportWidth < 1024) {
//       // Tablet en modo retrato
//       await page.click('mwc-icon-button.menu');
//       await page.click('mwc-list-item#dashboardnotifications');
//       await testInfo.attach('TabletNotifications', {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//   } else {
//       // Modo móvil
//       await page.click('mwc-icon-button.menu');
//       await page.click('mwc-list-item#dashboardnotifications');
//       await testInfo.attach('NotificationsMobile', {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//     }
//   })
  
  
// test('Trazit-Instruments-ActiveInstruments-New-Cancel', async ({ page }, testInfo) => {  
//   // Create instances of Logger and NetworkInterceptor
//   const logger = new Logger();
//   const networkInterceptor = new NetworkInterceptor();

//   // Attach Logger and NetworkInterceptor to the page
//   test.step('Attach Logger and NetworkInterceptor to the page', async () => {
//       logger.attachToPage(page);
//       networkInterceptor.attachToPage(page);
//   });

//   await page.getByLabel(newInstrumentSuccess.buttonName).click();
//   await page.pause();
//   await page.pause();
//   await testInfo.attach(newInstrumentSuccess.screenShotsEmptyForm, {
//     body: await page.screenshot({fullPage: true }), 
//     contentType: ConfigSettingsAlternative.screenShotsContentType});
//   await page.pause();

//   await page.getByLabel(newInstrumentSuccess.fldName.label).click();
//   await page.pause();
//   await page.pause();
//   await page.getByLabel(newInstrumentSuccess.fldName.label).fill(newInstrumentSuccess.fldName.value);
//   await page.pause();
//   await page.pause();
//   await page.getByLabel(newInstrumentSuccess.fldFamily.label).click();
//   await page.pause();
//   await page.pause();
//   await page.getByRole('option', { name: newInstrumentSuccess.fldFamily.option }).click();
//   await page.pause();
//   await page.pause();
//   await page.getByLabel(newInstrumentSuccess.fldModel.label).click();
//   await page.pause();
//   await page.pause();
//   await page.getByLabel(newInstrumentSuccess.fldModel.label).fill(newInstrumentSuccess.fldModel.value);
//   await page.pause();
//   await page.pause();
//   await page.getByLabel(newInstrumentSuccess.fldSupplier.label).click();
//   await page.pause();
//   await page.pause();
//   await page.getByRole('option', { name: newInstrumentSuccess.fldSupplier.option }).click();
//   await page.pause();
//   await page.pause();
//   await page.getByLabel(newInstrumentSuccess.fldSerial.label).click();
//   await page.pause();
//   await page.pause();
//   await page.getByLabel(newInstrumentSuccess.fldSerial.label).fill(newInstrumentSuccess.fldSerial.value);
//   await page.pause();
//   await page.pause();
//   await page.getByLabel(newInstrumentSuccess.fldManufacturer.label).click();
//   await page.pause();
//   await page.pause();
//   await page.getByRole('option', { name: newInstrumentSuccess.fldManufacturer.option, exact: true }).click();
//   await page.pause();
//   await page.pause();
//   await page.getByLabel(newInstrumentSuccess.fldResponsible.label, { exact: true }).click();
//   await page.pause();
//   await page.pause();
//   await page.getByRole('option', { name: newInstrumentSuccess.fldResponsible.option, exact: true }).click();
//   await page.pause();
//   await page.pause();
//   await page.getByLabel(newInstrumentSuccess.fldResponsibleBackup.label).click();
//   await page.pause();
//   await page.pause();
//   await page.getByRole('option', { name: newInstrumentSuccess.fldResponsibleBackup.option, exact: true }).click();
//   await page.pause();
//   await page.pause();
//    // Function to reduce the size of the dialog
//    const reduceDialogSize = async () => {
//     const zoomOutButton = page.locator('.popup-header mwc-icon.corner').nth(1); // Selects the "zoom_out_map" icon
//     await zoomOutButton.click();
// };

//   // Apply reduceDialogSize before interacting with elements
//   await reduceDialogSize();
//   await page.getByLabel(newInstrumentSuccess.fldPurchase.label).fill(newInstrumentSuccess.fldPurchase.value);
//   await page.pause();
//   await page.pause();
//   await page.getByLabel(newInstrumentSuccess.fldInstallation.label).fill(newInstrumentSuccess.fldInstallation.value);

//   await testInfo.attach(newInstrumentSuccess.screenShotsFilledForm, {
//     body: await page.screenshot({fullPage: true }), 
//     contentType: ConfigSettingsAlternative.screenShotsContentType});
//   await page.pause();

//   await reduceDialogSize();
//   await page.getByRole('button', { name: newInstrumentSuccess.buttonCancel }).click();    
//   await page.pause();
//   await page.pause();
//   await testInfo.attach(newInstrumentSuccess.screenShotsCancel, {
//     body: await page.screenshot({fullPage: true }), 
//     contentType: ConfigSettingsAlternative.screenShotsContentType});
//   await page.pause(); 
  
//   test.step('Log all captured logs and network data', async () => {
//     logger.printLogs();
//     networkInterceptor.printNetworkData();
//   });

//   // Fail the test if any console errors were captured
//   test.step('Verify no console errors', async () => {
//       expect(logger.errors.length).toBe(0);
//   })
// });
// }



// test.describe('Desktop Mode', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//       await page.setViewportSize({ width: 1365, height: 821 });
//       const logPlat = new LogIntoPlatform({ page });
//       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow = new OpenProcedureWindow({ page });
//       await page.waitForTimeout(3000);
//       await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.main, MenuInstrumentsControl.Instruments.activeInstrument);
//   });
//   commonTests();
// });

// // test.describe('Mobile mode', () => {
// //   test.beforeEach(async ({ page }, testInfo) => {
// //       await page.setViewportSize({ width: 385, height: 812 });
// //       const logPlat = new LogIntoPlatform({ page });
// //       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
// //       await page.waitForTimeout(3000);
// //       const openWindow = new OpenProcedureWindow({ page });
// //       await page.waitForTimeout(3000);
// //       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.activeInstrument);
// //   });
// //   commonTests();
// // });

// // test.describe('Mobile mode Retrato', () => {
// //   test.beforeEach(async ({ page }, testInfo) => {
// //       await page.setViewportSize({ width: 812, height: 385 });
// //       const logPlat = new LogIntoPlatform({ page });
// //       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
// //       await page.waitForTimeout(3000);
// //       const openWindow = new OpenProcedureWindow({ page });
// //       await page.waitForTimeout(3000);
// //       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.activeInstrument);
// //   });
// //   commonTests();
// // });

// // test.describe('Tablets mode', () => {
// //   test.beforeEach(async ({ page }, testInfo) => {
// //       await page.setViewportSize({ width: 768, height: 1024 });
// //       const logPlat = new LogIntoPlatform({ page });
// //       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
// //       await page.waitForTimeout(3000);
// //       const openWindow = new OpenProcedureWindow({ page });
// //       await page.waitForTimeout(3000);
// //       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.activeInstrument);
// //   });
// //   commonTests();
// // });

// // test.describe('Tablets mode Retrato', () => {
// //   test.beforeEach(async ({ page }, testInfo) => {
// //       await page.setViewportSize({ width: 1024, height: 768 });
// //       const logPlat = new LogIntoPlatform({ page });
// //       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
// //       await page.waitForTimeout(3000);
// //       const openWindow = new OpenProcedureWindow({ page });
// //       await page.waitForTimeout(3000);
// //       await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.activeInstrument);
// //   });
// //   commonTests();
// // });


// const { test: pwTest, afterEach } = require('@playwright/test');

// afterEach(async ({}, testInfo) => {
  
//   const durationInSeconds = (testInfo.duration / 1000).toFixed(2);

//   const data = {
//     test_name: testInfo.title,
//     duration: `${durationInSeconds} seconds`,
//   };

//   const testStatus = testInfo.status;
//   await callApiRunCompletion(data, testStatus);
// });


// pwTest('Example test', async ({ page }) => {
//     // Tu lógica de prueba aquí
// });
