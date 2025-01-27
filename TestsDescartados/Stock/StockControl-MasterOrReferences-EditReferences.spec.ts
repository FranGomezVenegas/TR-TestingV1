// import { test, expect } from '@playwright/test';
// import {  platformMenuNames } from '../../trazit-config';
// import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
// import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

// import { MenuStock } from '../../trazit-models/test-config-stock-global';
// import {EditReferences} from '../../trazit-models/test-config-StockControl-MasterOrReferences-EditReferences';

// import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
// import {ConfirmDialogController} from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
// import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

// import { Logger, NetworkInterceptor } from '../1TRAZiT-Commons/consoleInterceptionAndRequestResponse';

// //Function with all tests.
// const commonTests = () => {
// test('Trazit-StockControl-MasterOrReferences-EditReferences-Accept', async ({ page }, testInfo) => {
//     let afterEachData = {
//       textInNotif1:"",
//       textInNotif2:"",
//       textInNotif3:"",
//     }   
//     // Create instances of Logger and NetworkInterceptor
//   const logger = new Logger();
//   const networkInterceptor = new NetworkInterceptor();

//   // Attach Logger and NetworkInterceptor to the page
//   test.step('Attach Logger and NetworkInterceptor to the page', async () => {
//       logger.attachToPage(page);
//       networkInterceptor.attachToPage(page);
//   });

//     await page.pause();
//     await page.pause();
//     await page.getByLabel(EditReferences.buttonReferences, { exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(EditReferences.screenShotsReferences, {
//       body: await page.screenshot({fullPage: true }),
//        contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//      await page.pause();
//     await page.getByRole('row', { name: EditReferences.select}).getByRole('cell').nth(1).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(EditReferences.screenShotsSelect, {
//       body: await page.screenshot({fullPage: true }),
//        contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('row', { name: EditReferences.select}).getByLabel(EditReferences.buttonName).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(EditReferences.screenShotsFormEmpty, {
//       body: await page.screenshot({fullPage: true }),
//        contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByLabel(EditReferences.fldMinStock.label, { exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(EditReferences.fldMinStock.label, { exact: true }).fill(EditReferences.fldMinStock.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(EditReferences.fldUOM.label, { exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('option', { name: EditReferences.fldUOM.option, exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByText(EditReferences.fldOtherAllowedUOMs.label).click();
//     await page.pause();
//     await page.pause();
//     await page.locator(EditReferences.fldOtherAllowedUOMs.locator).getByText(EditReferences.fldOtherAllowedUOMs.option, {exact: true}).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(EditReferences.fldMinStockType.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('option', { name: EditReferences.fldMinStockType.option }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(EditReferences.fldMinAvaiableForUse.label, {exact: true}).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(EditReferences.fldMinAvaiableForUse.label, {exact: true}).fill(EditReferences.fldMinAvaiableForUse.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(EditReferences.fldMinAvailableForUseStockType.label, {exact: true}).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('option', { name: EditReferences.fldMinAvailableForUseStockType.option }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(EditReferences.fldQuantityVariablesSet.label, {exact: true}).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('option', { name: EditReferences.fldQuantityVariablesSet.option}).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(EditReferences.screenShotsFormFilled, {
//       body: await page.screenshot({fullPage: true }),
//        contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('button', { name: EditReferences.buttonAccept, exact: true}).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(EditReferences.screenResult, {
//       body: await page.screenshot({fullPage: true }),
//        contentType: ConfigSettingsAlternative.screenShotsContentType
//     });

//     await test.step('Log all captured logs and network data', async () => {
//       logger.printLogs();
//       networkInterceptor.printNetworkData();
//   });

//   await test.step('Verify no console errors', async () => {
//       expect(logger.errors.length).toBe(0);
//   });

//   await test.step('Verify network responses captured', async () => {
//       const responses: any[] = networkInterceptor.responses;

//       console.log('Captured network responses:', responses);

//       const nonImageNullResponses = responses.filter(response => {
//           const contentType = response.headers?.['content-type'] || '';
//           const isImage = contentType.includes('image') || 
//                           response.url.endsWith('.svg') || 
//                           response.url.endsWith('.png') || 
//                           response.url.endsWith('.jpg') || 
//                           response.url.endsWith('.jpeg');
//           return response.body === null && !isImage;
//       });

//       if (nonImageNullResponses.length > 0) {
//           console.error('Responses with null body found (excluding images):');
//           nonImageNullResponses.forEach((response, index) => {
//               console.error(`Response ${index + 1}:`, response);
//           });
//       }

//       expect(nonImageNullResponses.length).toBe(0);
//   });

//     afterEachData.textInNotif1=EditReferences.textInNotif1
//     afterEachData.textInNotif2=EditReferences.textInNotif2
//     afterEachData.textInNotif3=EditReferences.textInNotif3

//     // Obtener el modo de dispositivo usando page.evaluate
//     const viewportWidth = await page.evaluate(() => {
//       return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
//   });

//   if (viewportWidth >= 1024) {
//       // Modo escritorio o tablet en modo paisaje
//       const notificationElement = await page.locator(MenuStock.Notification.main.pageElement);
//       if (notificationElement !== null) {
//           await notificationElement.hover();
//       }
//       await testInfo.attach(EditReferences.screenformNotifications, {
//           body: await page.screenshot({ fullPage: true }),
//           contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//       const notificationDiv = await page.locator(MenuStock.Notification.main.pageElementdiv).first();
//       if (notificationDiv !== null) {
//           await testInfo.attach(EditReferences.screenformLastNotifications, {
//               body: await notificationDiv.screenshot(),
//               contentType: ConfigSettingsAlternative.screenShotsContentType
//           });
//       }
//   } else if (viewportWidth >= 768 && viewportWidth < 769) {
//       // Tablet 
//       await page.click('mwc-icon-button.menu');
//       await page.click('mwc-list-item#dashboardnotifications');
//       await testInfo.attach('Tablet Notifications', {
//           body: await page.screenshot({ fullPage: true }),
//           contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
  
//   } else if (viewportWidth >= 812 && viewportWidth < 813) {
//       // Mobile Mode Retrato
//       await page.click('mwc-icon-button.menu');
//       await page.click('mwc-list-item#dashboardnotifications');
//       await testInfo.attach('Notifications Mobile Retrato', {
//           body: await page.screenshot({ fullPage: true }),
//           contentType: ConfigSettingsAlternative.screenShotsContentType
//       });

//   } else {
//       // Modo móvil
//       await page.click('mwc-icon-button.menu');
//       await page.click('mwc-list-item#dashboardnotifications');
//       await testInfo.attach('NotificationsMobile', {
//           body: await page.screenshot({ fullPage: true }),
//           contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//   }
// });



// test('Trazit-StockControl-MasterOrReferences-EditReferences-Cancel', async ({ page }, testInfo) => { // Create instances of Logger and NetworkInterceptor
//   const logger = new Logger();
//   const networkInterceptor = new NetworkInterceptor();

//   // Attach Logger and NetworkInterceptor to the page
//   test.step('Attach Logger and NetworkInterceptor to the page', async () => {
//       logger.attachToPage(page);
//       networkInterceptor.attachToPage(page);
//   });

//     await page.pause();
//     await page.pause();
//     await page.getByLabel(EditReferences.buttonReferences, { exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(EditReferences.screenShotsReferences, {
//       body: await page.screenshot({fullPage: true }),
//        contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//      await page.pause();
//     await page.getByRole('row', { name: EditReferences.select}).getByRole('cell').nth(1).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(EditReferences.screenShotsSelect, {
//       body: await page.screenshot({fullPage: true }),
//        contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('row', { name: EditReferences.select}).getByLabel(EditReferences.buttonName).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(EditReferences.screenShotsFormEmpty, {
//       body: await page.screenshot({fullPage: true }),
//        contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByLabel(EditReferences.fldMinStock.label, { exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(EditReferences.fldMinStock.label, { exact: true }).fill(EditReferences.fldMinStock.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(EditReferences.fldUOM.label, { exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('option', { name: EditReferences.fldUOM.option, exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByText(EditReferences.fldOtherAllowedUOMs.label).click();
//     await page.pause();
//     await page.pause();
//     await page.locator(EditReferences.fldOtherAllowedUOMs.locator).getByText(EditReferences.fldOtherAllowedUOMs.option, {exact: true}).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(EditReferences.fldMinStockType.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('option', { name: EditReferences.fldMinStockType.option }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(EditReferences.fldMinAvaiableForUse.label, {exact: true}).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(EditReferences.fldMinAvaiableForUse.label, {exact: true}).fill(EditReferences.fldMinAvaiableForUse.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(EditReferences.fldMinAvailableForUseStockType.label, {exact: true}).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('option', { name: EditReferences.fldMinAvailableForUseStockType.option }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(EditReferences.fldQuantityVariablesSet.label, {exact: true}).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('option', { name: EditReferences.fldQuantityVariablesSet.option}).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(EditReferences.screenShotsFormFilled, {
//       body: await page.screenshot({fullPage: true }),
//        contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('button', { name: EditReferences.buttonCancel, exact: true}).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(EditReferences.screenResult, {
//       body: await page.screenshot({fullPage: true }),
//        contentType: ConfigSettingsAlternative.screenShotsContentType
//     });

//     await test.step('Log all captured logs and network data', async () => {
//       logger.printLogs();
//       networkInterceptor.printNetworkData();
//   });

//   await test.step('Verify no console errors', async () => {
//       expect(logger.errors.length).toBe(0);
//   });

//   await test.step('Verify network responses captured', async () => {
//       const responses: any[] = networkInterceptor.responses;

//       console.log('Captured network responses:', responses);

//       const nonImageNullResponses = responses.filter(response => {
//           const contentType = response.headers?.['content-type'] || '';
//           const isImage = contentType.includes('image') || 
//                           response.url.endsWith('.svg') || 
//                           response.url.endsWith('.png') || 
//                           response.url.endsWith('.jpg') || 
//                           response.url.endsWith('.jpeg');
//           return response.body === null && !isImage;
//       });

//       if (nonImageNullResponses.length > 0) {
//           console.error('Responses with null body found (excluding images):');
//           nonImageNullResponses.forEach((response, index) => {
//               console.error(`Response ${index + 1}:`, response);
//           });
//       }

//       expect(nonImageNullResponses.length).toBe(0);
//   });
// })
// }


// test.describe('Desktop Mode', () => {
//   //Added the before common.  
//   //And I add another beforeEach for the navigation between the different tabs, this part is specific in each mode.
//   test.beforeEach(async ({ page }, testInfo) => {
//     await page.setViewportSize({ width: 1365, height: 821 });   
//     const logPlat = new LogIntoPlatform({page});
//     const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
//     const openWindow=new OpenProcedureWindow({page});
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuStock.Stock.main, MenuStock.Stock.MasterOrReferences);
  
//   });
//       //And I call the tests.
//       commonTests();
//   });


   
// // // Mobile Mode 
// // test.describe('Mobile mode', () => {
// //   test.beforeEach(async ({ page }, testInfo) => {
// //     // Size of the viewport of a mobile device
// //     await page.setViewportSize({ width: 385, height: 812 }); 
// //     // Common configuration for both modes.
// //     const logPlat = new LogIntoPlatform({page});
// //     const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
// //     await page.waitForTimeout(3000);
// //     const openWindow=new OpenProcedureWindow({page}); 
// //     await page.waitForTimeout(3000);
// //     await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.MasterOrReferences);    
  
// //   });
// //   //And I call the tests.
// //   commonTests();
// // });

// // // Mobile Mode - Retrato
// // test.describe('Mobile mode Retrato', () => {
// // test.beforeEach(async ({ page }, testInfo) => {
// //   // Tamaño del viewport para móviles en modo retrato
// //   await page.setViewportSize({ width: 812, height: 385 }); 
// //   // Configuración común para ambos modos.
// //   const logPlat = new LogIntoPlatform({page});
// //   const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
// //   await page.waitForTimeout(3000);
// //   const openWindow=new OpenProcedureWindow({page}); 
// //   await page.waitForTimeout(3000);
// //   await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.MasterOrReferences);    
// // });
// //   commonTests();
// // });


// // // Tablets Mode
// // test.describe('Tablets mode', () => {
// // test.beforeEach(async ({ page }, testInfo) => {
// //   // Tamaño del viewport para móviles en modo retrato
// //   await page.setViewportSize({ width: 768, height: 1024 }); 
// //   // Configuración común para ambos modos.
// //   const logPlat = new LogIntoPlatform({page});
// //   const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
// //   await page.waitForTimeout(3000);
// //   const openWindow=new OpenProcedureWindow({page}); 
// //   await page.waitForTimeout(3000);
// //   await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.MasterOrReferences);    
// // });
// //   commonTests();
// // });

// // // Tablets Mode - Retrato
// // test.describe('Tablets mode Retrato', () => {
// // test.beforeEach(async ({ page }, testInfo) => {
// //   // Tamaño del viewport para móviles en modo retrato
// //   await page.setViewportSize({ width: 1024, height: 768}); 
// //   // Configuración común para ambos modos.
// //   const logPlat = new LogIntoPlatform({page});
// //     const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
// //     await page.waitForTimeout(3000);
// //     const openWindow=new OpenProcedureWindow({page});
// //     await page.waitForTimeout(3000);
// //     await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, MenuStock.Stock.mobile, MenuStock.Stock.Deviations);
// //   });
// //       //And I call the tests.
// //       commonTests();
// //   });


// const { test:pwTest, afterEach } = require('@playwright/test');
 

// afterEach(async ({}, testInfo) => {
  
//   const durationInSeconds = (testInfo.duration / 1000).toFixed(2);

//   const data = {
//     test_name: testInfo.title,
//     duration: `${durationInSeconds} seconds`,
//   };

//   const testStatus = testInfo.status;
//   await callApiRunCompletion(data, testStatus);
// });
   
//   pwTest('Example test', async ({ page }) => {
//     // Your test logic here
//   });