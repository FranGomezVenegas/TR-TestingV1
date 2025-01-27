// import { test, expect } from '@playwright/test';
// import {  platformMenuNames } from '../../trazit-config';
// import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
// import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

// import { MenuStock } from '../../trazit-models/test-config-stock-global';
// import { new_inventory_lot as dataForTestFromFile} from '../../trazit-models/test-config-StockControl-ActiveInventroryLots-New';

// import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
// import {ConfirmDialogController} from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
// import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

// import { Logger, NetworkInterceptor } from '../1TRAZiT-Commons/consoleAndNetworkMonitor';


// //Function with all tests.
// const  commonTests = async (ConfigSettings, page, testInfo) => {
//     let afterEachData = {
//       textInNotif1:"",
//       textInNotif2:"",
//       textInNotif3:"",
//     }
    
// // Create instances of Logger and NetworkInterceptor
// const logger = new Logger();
// const networkInterceptor = new NetworkInterceptor();

// // Attach Logger and NetworkInterceptor to the page
// test.step('Attach Logger and NetworkInterceptor to the page', async () => {
//     logger.attachToPage(page);
//     networkInterceptor.attachToPage(page);
// });

// let new_inventory_lot; 

//     if (ConfigSettings!==undefined && ConfigSettings.dataForTest!== undefined ) {
//       let validJsonString = ConfigSettings.dataForTest.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
   
//       // Intenta convertir el string en un objeto JSON
//       new_inventory_lot = dataForTestFromFile;//JSON.parse(validJsonString);
//     } else {
//       new_inventory_lot = dataForTestFromFile;
//     }

//     // Pasos del test
//     await page.getByLabel(new_inventory_lot.buttonName).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(new_inventory_lot.screenShotsFormEmpty, {
//       body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
//     await page.pause(); 
//     await page.pause();
//     await page.getByRole('combobox', { name: new_inventory_lot.fldCategory.label }).click();
//     await page.getByRole('option', { name: new_inventory_lot.fldCategory.value }).locator(new_inventory_lot.fldCategory.locator).click();
//     await page.pause();
//     await page.pause();
//     //await page.getByLabel(new_inventory_lot.fldReference.label).press(new_inventory_lot.fldReference.action);
//     await page.pause();
//     await page.getByRole('main').locator('div').filter({ hasText: '* Reference' }).nth(1).click();
//     await page.pause();
//     //await page.getByLabel(new_inventory_lot.fldReference.label).fill(new_inventory_lot.fldReference.value);
//     await page.getByRole('option', { name: 'REF1' }).click();
//     await page.pause();
//     await page.getByLabel(new_inventory_lot.fldIdLot.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(new_inventory_lot.fldIdLot.label).fill(new_inventory_lot.fldIdLot.value);
//     await page.pause();
//     await page.pause();
//     await page.getByRole('spinbutton', { name: new_inventory_lot.fldQuantity.label }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('spinbutton', { name: new_inventory_lot.fldQuantity.label }).fill(new_inventory_lot.fldQuantity.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(new_inventory_lot.fldExpiryDate.label, { exact: true }).press(new_inventory_lot.fldExpiryDate.action);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(new_inventory_lot.fldExpiryDate.label, { exact: true }).fill(new_inventory_lot.fldExpiryDate.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(new_inventory_lot.fldExpiryDateInUse.label, { exact: true }).press(new_inventory_lot.fldExpiryDateInUse.action);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(new_inventory_lot.fldExpiryDateInUse.label, { exact: true }).fill(new_inventory_lot.fldExpiryDateInUse.value);
//     await page.pause();
//     await page.getByLabel(new_inventory_lot.fldRetestDate.label).fill(new_inventory_lot.fldRetestDate.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(new_inventory_lot.fldVendor.label, { exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(new_inventory_lot.fldVendor.label, { exact: true }).fill(new_inventory_lot.fldVendor.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(new_inventory_lot.fldVendor.label, { exact: true }).press(new_inventory_lot.fldVendor.action);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(new_inventory_lot.fldVendorLot.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(new_inventory_lot.fldVendorLot.label).fill(new_inventory_lot.fldVendorLot.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(new_inventory_lot.fldVendorLot.label).press(new_inventory_lot.fldVendorLot.action);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(new_inventory_lot.fldVendorReference.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(new_inventory_lot.fldVendorReference.label).fill(new_inventory_lot.fldVendorReference.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(new_inventory_lot.fldVendorReference.label).press(new_inventory_lot.fldVendorReference.action);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(new_inventory_lot.fldPurity.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(new_inventory_lot.fldPurity.label).press(new_inventory_lot.fldPurity.action);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(new_inventory_lot.fldPurity.label).fill(new_inventory_lot.fldPurity.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(new_inventory_lot.fldConservationCondition.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('option', { name: new_inventory_lot.fldConservationCondition.value }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(new_inventory_lot.fldNumberOfEntries.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(new_inventory_lot.fldNumberOfEntries.label).fill(new_inventory_lot.fldNumberOfEntries.value);
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(new_inventory_lot.screenShotsFormFilled, {
//       body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
//     await page.pause();
//     await page.getByRole('button', { name: new_inventory_lot.buttonAccept.label}).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(new_inventory_lot.screenResult, {
//       body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
//     await page.pause(); 

//     // Verificar que no haya errores de consola
//     await test.step('Log all captured logs and network data', async () => {
//       logger.printLogs();
//       networkInterceptor.printNetworkData();
//   });

//   await test.step('Verify no console errors', async () => {
//       expect(logger.errors.length).toBe(0);
//   });

//   // Verificar respuestas de red capturadas
//   await test.step('Verify network responses captured', async () => {
//       const nullResponsesCount = networkInterceptor.verifyNonImageNullResponses();
//       expect(nullResponsesCount).toBe(0);
//   });

//   await page.pause();
//   await page.pause();
//   await page.pause();
//   await page.pause();
//   await page.pause();
//   await page.pause();
//   await page.pause();
//   await page.pause();
//   await page.pause();
//   await page.pause();
    

//     afterEachData.textInNotif1 = new_inventory_lot.textInNotif1;
//     afterEachData.textInNotif2 = new_inventory_lot.textInNotif2;
//     afterEachData.textInNotif3 = new_inventory_lot.textInNotif3;

//     // Obtener el modo de dispositivo usando page.evaluate
//     const viewportWidth = await page.evaluate(() => {
//       return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
//     });

//     if (viewportWidth >= 1024) {
//       // Modo escritorio o tablet en modo paisaje
//       const notificationElement = await page.locator(MenuStock.Notification.main.pageElement);
//       if (notificationElement !== null) {
//         await notificationElement.hover();
//       }
//       // await testInfo.attach(new_inventory_lot.screenformNotifications, {
//       //   body: await page.screenshot({ fullPage: true }),
//       //   contentType: ConfigSettingsAlternative.screenShotsContentType
//       // });
//       const notificationDiv = await page.locator(MenuStock.Notification.main.pageElementdiv).first();
//       if (notificationDiv !== null) {
//         // await testInfo.attach(new_inventory_lot.screenformLastNotifications, {
//         //     body: await notificationDiv.screenshot(),
//         //     contentType: ConfigSettingsAlternative.screenShotsContentType
//         // });
//       }
//     } else if (viewportWidth >= 768 && viewportWidth < 1024) {
//       // Tablet en modo retrato
//       await page.click('md-filled-icon-button.menu');
//       await page.click('md-list-item#dashboardnotifications');
//       // await testInfo.attach('TabletNotifications', {
//       //   body: await page.screenshot({ fullPage: true }),
//       //   contentType: ConfigSettingsAlternative.screenShotsContentType
//       // });
//     } else {
//       // Modo móvil
//       await page.click('md-filled-icon-button.menu');
//       await page.click('md-list-item#dashboardnotifications');

//       // await testInfo.attach('NotificationsMobile', {
//       //   body: await page.screenshot({ fullPage: true }),
//       //   contentType: ConfigSettingsAlternative.screenShotsContentType
//       // });
//     }
// }


// let trazitTestName;
// let ConfigSettings;
// test.describe('Desktop Mode', () => {
//   //Added the before common.  
//   //And I add another beforeEach for the navigation between the different tabs, this part is specific in each mode.

//   test.beforeEach(async ({ page }, testInfo) => {
//     await page.setViewportSize({ width: 1365, height: 821 });
//     const logPlat = new LogIntoPlatform({ page });

//     trazitTestName = testInfo.title
//     ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName);

//     await page.waitForTimeout(3000);
//     const openWindow = new OpenProcedureWindow({ page });
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuStock.Stock.main, MenuStock.Stock.ActiveInventoryLots);
  
//   });
//   test('ActiveInventoryLotsNewAccept', async ({page}, testInfo) => {
//     await commonTests(ConfigSettings, page, testInfo);

//   });
//   });


   
// // Mobile Mode 
// test.describe('Mobile mode', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//     // Size of the viewport of a mobile device
//     await page.setViewportSize({ width: 385, height: 812 }); 
//     // Common configuration for both modes.
//     const logPlat = new LogIntoPlatform({page});
//     trazitTestName = testInfo.title
//     ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName);

//     await page.waitForTimeout(3000);
//     const openWindow=new OpenProcedureWindow({page}); 
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.ActiveInventoryLots);    
  
//   });
//   //And I call the tests.
//   test('StockControlActiveInventoryLotsNewAccept', async ({page}, testInfo) => {
//     await commonTests(ConfigSettings, page, testInfo);

//   });
// });

// // Mobile Mode - Retrato
// test.describe('Mobile mode Retrato', () => {
// test.beforeEach(async ({ page }, testInfo) => {
//   // Tamaño del viewport para móviles en modo retrato
//   await page.setViewportSize({ width: 812, height: 385 }); 
//   // Configuración común para ambos modos.
//   const logPlat = new LogIntoPlatform({page});
//   trazitTestName = testInfo.title
//   ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName);

//   await page.waitForTimeout(3000);
//   const openWindow=new OpenProcedureWindow({page}); 
//   await page.waitForTimeout(3000);
//   await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.ActiveInventoryLots);    
// });
// test('StockControlActiveInventoryLotsNewAccept', async ({page}, testInfo) => {
//   await commonTests(ConfigSettings, page, testInfo);

// });
// });


// // Tablets Mode
// test.describe('Tablets mode', () => {
// test.beforeEach(async ({ page }, testInfo) => {
//   // Tamaño del viewport para móviles en modo retrato
//   await page.setViewportSize({ width: 768, height: 1024 }); 
//   // Configuración común para ambos modos.
//   const logPlat = new LogIntoPlatform({page});
  
//   trazitTestName = testInfo.title
//   ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName);

//   await page.waitForTimeout(3000);
//   const openWindow=new OpenProcedureWindow({page}); 
//   await page.waitForTimeout(3000);
//   await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.ActiveInventoryLots);    
// });
// test('StockControlActiveInventoryLotsNewAccept', async ({page}, testInfo) => {
//   await commonTests(ConfigSettings, page, testInfo);

// });
// });

// // Tablets Mode - Retrato
// test.describe('Tablets mode Retrato', () => {
// test.beforeEach(async ({ page }, testInfo) => {
//   // Tamaño del viewport para móviles en modo retrato
//   await page.setViewportSize({ width: 1024, height: 768}); 
//   // Configuración común para ambos modos.
//   const logPlat = new LogIntoPlatform({page});
//   trazitTestName = testInfo.title
//   ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName);

//     await page.waitForTimeout(3000);
//     const openWindow=new OpenProcedureWindow({page});
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.ActiveInventoryLots);
//     });
//       //And I call the tests.
//     test('ActiveInventoryLotsNewAccept', async ({page}, testInfo) => {
//       await commonTests(ConfigSettings, page, testInfo);
    
//     });
//   });




// const { test: pwTest, afterEach } = require('@playwright/test');

// afterEach(async ({}, testInfo) => {
  
//   const durationInSeconds = (testInfo.duration / 1000).toFixed(2);

//   const data = {
//     test_name: testInfo.title,
//     duration: `${durationInSeconds} seconds`,
//   };

//   const testStatus = testInfo.status;
//   await callApiRunCompletion(data, testStatus, trazitTestName, testInfo)


// });

// pwTest('Example test', async ({ page }) => {
//     // Tu lógica de prueba aquí
//   });
  
