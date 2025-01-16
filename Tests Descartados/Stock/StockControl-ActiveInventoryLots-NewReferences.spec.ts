// import { test, expect } from '@playwright/test';
// import {  platformMenuNames } from '../../trazit-config';
// import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
// import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

// import { MenuStock } from '../../trazit-models/test-config-stock-global';
// import {NewReferences} from '../../trazit-models/test-config-StockControl-ActiveInventoryLots-NewReferences';

// import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
// import {ConfirmDialogController} from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
// import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

// import { Logger, NetworkInterceptor } from '../1TRAZiT-Commons/consoleInterceptionAndRequestResponse';

// //Function with all tests.
// const commonTests = () => {
// test('Trazit-StockControl-ActiveInventoryLots-NewReferences-Accept', async ({ page }, testInfo) => {
//     let afterEachData = {
//         textInNotif1:"",
//         textInNotif2:"",
//         textInNotif3:"",
//     }
//     // Create instances of Logger and NetworkInterceptor
//     const logger = new Logger();
//     const networkInterceptor = new NetworkInterceptor();

//     // Attach Logger and NetworkInterceptor to the page
//     test.step('Attach Logger and NetworkInterceptor to the page', async () => {
//         logger.attachToPage(page);
//         networkInterceptor.attachToPage(page);
//     });

//     await page.getByLabel(NewReferences.buttonName).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(NewReferences.screenShotsEmptyForm, {
//       body: await page.screenshot({fullPage: true }), 
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByLabel(NewReferences.fldReferenceName.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(NewReferences.fldReferenceName.label).fill(NewReferences.fldReferenceName.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(NewReferences.fldCategory.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('option', { name: NewReferences.fldCategory.option }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(NewReferences.fldMinStock.label, { exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(NewReferences.fldMinStock.label, { exact: true }).fill(NewReferences.fldMinStock.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(NewReferences.fldUOM.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('option', { name: NewReferences.fldUOM.value }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByText(NewReferences.fldOtherAllowedUOMs.label).click();
//     await page.pause();
//     await page.pause();
//     await page.locator(NewReferences.fldOtherAllowedUOMs.locator).getByText(NewReferences.fldOtherAllowedUOMs.value, { exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(NewReferences.fldMinStockType.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('option', { name: NewReferences.fldMinStockType.option  }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(NewReferences.fldMinUse.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(NewReferences.fldMinUse.label).fill(NewReferences.fldMinUse.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(NewReferences.fldType.label, { exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('option', { name: NewReferences.fldType.option }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(NewReferences.fldQualificationVariablesSet.label, { exact: true }).click();
//     await page.pause();
//     await page.pause();
//     //await page.getByRole('option', { name: NewReferences.fldQualificationVariablesSet.option }).click();
//     await page.getByRole('option', { name: 'Is certified?' }).click();
    
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(NewReferences.screenShotsFilledForm, {
//         body: await page.screenshot({fullPage: true }), 
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//     await page.getByRole('button', { name: NewReferences.buttonAccept, exact: true}).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(NewReferences.screenShotsAccept, {
//         body: await page.screenshot({fullPage: true }), 
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.pause();

    
//     test.step('Log all captured logs and network data', async () => {
//       logger.printLogs();
//       networkInterceptor.printNetworkData();
//   });
//     // Fail the test if any console errors were captured
//      test.step('Verify no console errors', async () => {
//       expect(logger.errors.length).toBe(0);
//       });

//       test.step('Verify network responses captured', async () => {
//         // Asegúrate de que `networkInterceptor.responses` tenga un tipo adecuado
//         const responses: any[] = networkInterceptor.responses;

//         console.log('Captured network responses:', responses);

//         // Verifica que al menos una respuesta ha sido capturada
//         // expect(responses.length).toBeGreaterThan(0);

//         // Verifica si alguna respuesta tiene el cuerpo nulo y registra información
//         const nullResponses = responses.filter(response => response.body === null);

//         if (nullResponses.length > 0) {
//             console.error('Responses with null body found:');
//             nullResponses.forEach((response, index) => {
//                 console.error(`Response ${index + 1}:`, response);
//             });
//         }

//         // Opcional: Fallar el test si hay respuestas con cuerpo nulo
//         expect(nullResponses.length).toBe(0);
//       });

//     afterEachData.textInNotif1=NewReferences.textInNotif1
//     afterEachData.textInNotif2=NewReferences.textInNotif2
//     afterEachData.textInNotif3=NewReferences.textInNotif3

    
//     // Obtener el modo de dispositivo usando page.evaluate
//     const viewportWidth = await page.evaluate(() => {
//         return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
//     });
    
//     if (viewportWidth >= 1024) {
//         // Modo escritorio o tablet en modo paisaje
//         const notificationElement = await page.locator(MenuStock.Notification.main.pageElement);
//         if (notificationElement !== null) {
//         await notificationElement.hover();
//         }
//         await testInfo.attach(NewReferences.screenformNotifications, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//         });
//         const notificationDiv = await page.locator(MenuStock.Notification.main.pageElementdiv).first();
//         if (notificationDiv !== null) {
//         await testInfo.attach(NewReferences.screenformLastNotifications, {
//             body: await notificationDiv.screenshot(),
//             contentType: ConfigSettingsAlternative.screenShotsContentType
//         });
//         }
//     } else if (viewportWidth >= 768 && viewportWidth < 1024) {
//         // Tablet en modo retrato
//         await page.click('mwc-icon-button.menu');
//         await page.click('mwc-list-item#dashboardnotifications');
//         await testInfo.attach('TabletNotifications', {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//         });
//     } else {
//         // Modo móvil
//         await page.click('mwc-icon-button.menu');
//         await page.click('mwc-list-item#dashboardnotifications');
//         await testInfo.attach('NotificationsMobile', {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//         });
//       }; 
//     })

//     test('Trazit-StockControl-ActiveInventoryLots-NewReferences-Cancel', async ({ page }, testInfo) => {
//       // Create instances of Logger and NetworkInterceptor
//       const logger = new Logger();
//       const networkInterceptor = new NetworkInterceptor();

//       // Attach Logger and NetworkInterceptor to the page
//       test.step('Attach Logger and NetworkInterceptor to the page', async () => {
//           logger.attachToPage(page);
//           networkInterceptor.attachToPage(page);
//       });  
      
//       await page.getByLabel(NewReferences.buttonName).click();
//         await page.pause();
//         await page.pause();
//         await testInfo.attach(NewReferences.screenShotsEmptyForm, {
//           body: await page.screenshot({fullPage: true }), 
//           contentType: ConfigSettingsAlternative.screenShotsContentType
//         });
//         await page.getByLabel(NewReferences.fldReferenceName.label).click();
//         await page.pause();
//         await page.pause();
//         await page.getByLabel(NewReferences.fldReferenceName.label).fill(NewReferences.fldReferenceName.value);
//         await page.pause();
//         await page.pause();
//         await page.getByLabel(NewReferences.fldCategory.label).click();
//         await page.pause();
//         await page.pause();
//         await page.getByRole('option', { name: NewReferences.fldCategory.option }).click();
//         await page.pause();
//         await page.pause();
//         await page.getByLabel(NewReferences.fldMinStock.label, { exact: true }).click();
//         await page.pause();
//         await page.pause();
//         await page.getByLabel(NewReferences.fldMinStock.label, { exact: true }).fill(NewReferences.fldMinStock.value);
//         await page.pause();
//         await page.pause();
//         await page.getByLabel(NewReferences.fldUOM.label).click();
//         await page.pause();
//         await page.pause();
//         await page.getByRole('option', { name: NewReferences.fldUOM.value }).click();
//         await page.pause();
//         await page.pause();
//         await page.getByText(NewReferences.fldOtherAllowedUOMs.label).click();
//         await page.pause();
//         await page.pause();
//         await page.locator(NewReferences.fldOtherAllowedUOMs.locator).getByText(NewReferences.fldOtherAllowedUOMs.value, { exact: true }).click();
//         await page.pause();
//         await page.pause();
//         await page.getByLabel(NewReferences.fldMinStockType.label).click();
//         await page.pause();
//         await page.pause();
//         await page.getByRole('option', { name: NewReferences.fldMinStockType.option  }).click();
//         await page.pause();
//         await page.pause();
//         await page.getByLabel(NewReferences.fldMinUse.label).click();
//         await page.pause();
//         await page.pause();
//         await page.getByLabel(NewReferences.fldMinUse.label).fill(NewReferences.fldMinUse.value);
//         await page.pause();
//         await page.pause();
//         await page.getByLabel(NewReferences.fldType.label, { exact: true }).click();
//         await page.pause();
//         await page.pause();
//         await page.getByRole('option', { name: NewReferences.fldType.option }).click();
//         await page.pause();
//         await page.pause();
//         await page.getByLabel(NewReferences.fldQualificationVariablesSet.label, { exact: true }).click();
//         await page.pause();
//         await page.pause();
//         //await page.getByRole('option', { name: NewReferences.fldQualificationVariablesSet.option }).click();
//         await page.getByRole('option', { name: 'Is certified?' }).click();
        
//         await page.pause();
//         await page.pause();
//         await testInfo.attach(NewReferences.screenShotsFilledForm, {
//             body: await page.screenshot({fullPage: true }), 
//             contentType: ConfigSettingsAlternative.screenShotsContentType
//           });
//         await page.getByRole('button', { name: NewReferences.buttonCancel, exact: true}).click();
//         await page.pause();
//         await page.pause();
//         await testInfo.attach(NewReferences.screenShotsCancel, {
//             body: await page.screenshot({fullPage: true }), 
//             contentType: ConfigSettingsAlternative.screenShotsContentType
//         });
//         await page.pause();
//         test.step('Log all captured logs and network data', async () => {
//           logger.printLogs();
//           networkInterceptor.printNetworkData();
//         });
  
//       // Fail the test if any console errors were captured
//       test.step('Verify no console errors', async () => {
//         expect(logger.errors.length).toBe(0);
//         });
  
//         test.step('Verify network responses captured', async () => {
//           // Asegúrate de que `networkInterceptor.responses` tenga un tipo adecuado
//           const responses: any[] = networkInterceptor.responses;
  
//           console.log('Captured network responses:', responses);
  
//           // Verifica que al menos una respuesta ha sido capturada
//           // expect(responses.length).toBeGreaterThan(0);
  
//           // Verifica si alguna respuesta tiene el cuerpo nulo y registra información
//           const nullResponses = responses.filter(response => response.body === null);
  
//           if (nullResponses.length > 0) {
//               console.error('Responses with null body found:');
//               nullResponses.forEach((response, index) => {
//                   console.error(`Response ${index + 1}:`, response);
//               });
//           }
  
//           // Opcional: Fallar el test si hay respuestas con cuerpo nulo
//           expect(nullResponses.length).toBe(0);
//         });
  
//     })
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
//     await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuStock.Stock.main, MenuStock.Stock.ActiveInventoryLots);
  
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
// //     await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.ActiveInventoryLots);    
  
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
// //   await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.ActiveInventoryLots);    
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
// //   await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.ActiveInventoryLots);    
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
// //     await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.ActiveInventoryLots);
// //     });
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