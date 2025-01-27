// import { test, expect } from '@playwright/test';
// import {  platformMenuNames } from '../../trazit-config';
// import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
// import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

// import { MenuInstrumentsControl } from '../../trazit-models/test-config-instruments-global';
// import { MenuStock } from '../../trazit-models/test-config-stock-global';
// import { EnterEventResult, RenterEventResult } from '../../trazit-models/test-config-stockControl-QualificationInProgress-EnterEventResult';

// import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
// import {ConfirmDialogController} from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
// import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';


// async function zzzaddNotificationWitness({ page }, testInfo, testData) {
//   await page.locator(MenuInstrumentsControl.Notification.main.pageElement).hover();

//   await testInfo.attach(MenuInstrumentsControl.Notification.main.screenShotsName, {
//     body: await page.screenshot({ fullPage: true }),
//     contentType: ConfigSettingsAlternative.screenShotsContentType
//   });
//   const notif = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
//   await testInfo.attach(MenuInstrumentsControl.Notification.main.screenShotsdivNotification, {
//     body: await notif.screenshot(),
//     contentType: ConfigSettingsAlternative.screenShotsContentType
//   });
//   await expect(notif).toContainText(testData.textInNotif1);
//   await expect(notif).toContainText(testData.textInNotif2);
//   await expect(notif).toContainText(testData.textInNotif3);

//   const notifText = await notif.textContent(); // Get the text content of the notification element
  
//   //const inputText = "Instrument X h is found";
//   //const regex = /testData.textInNotif1 \s+(.*?)\s+ testData.textInNotif2/;
//   const regexPattern = new RegExp(`${testData.textInNotif1}\\s+(.*?)\\s+${testData.textInNotif2}`);
//   const match = notifText.match(regexPattern);
  
//   if (match && match[1]) {
//     console.log(notifText, 'ObjectName:', match[1])
//     return match[1];
//   } else {
//       console.log(notifText)
//       return notifText;
//   }
// }


// //Function with all tests.
// const commonTests = () => {
// test('Trazit-StockControl-QualificationInProgress-EnterEventResult-Accept', async ({ page }, testInfo) => {
//   await page.pause();
//   await page.getByText(EnterEventResult.selectLot, { exact: true }).click();
//   await page.pause();
//   await page.pause();
//   await testInfo.attach(EnterEventResult.screenShotsSelectLot, {
//     body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
//   await page.getByLabel(EnterEventResult.buttonName).click();
//   await page.pause();
//   await page.pause();
//   await testInfo.attach(EnterEventResult.screenShotsBeforeButton, {
//     body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
//   await page.getByRole('combobox').selectOption(EnterEventResult.fldName.option);
//   await page.pause();
//   await page.pause();
//   await testInfo.attach(EnterEventResult.screenShotsOption, {
//     body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
//   await page.getByRole('combobox').press(EnterEventResult.fldName.press);
//   await page.pause();
//   await page.pause();
//   await testInfo.attach(EnterEventResult.screenShotsBeforeEnter, {
//     body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
//   // await page.close();
// })

// test('Trazit-StockControl-QualificationInProgress-ReenterEventResult-Accept', async ({ page }, testInfo) => {
//   await page.pause();
//   await page.getByText(EnterEventResult.selectLot, { exact: true }).click();
//   await page.pause();
//   await page.pause();
//   await testInfo.attach(EnterEventResult.screenShotsSelectLot, {
//     body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
//   await page.getByLabel(EnterEventResult.buttonName).click();
//   await page.pause();
//   await page.pause();
//   await testInfo.attach(EnterEventResult.screenShotsBeforeButton, {
//     body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
//   await page.getByRole('combobox').selectOption(EnterEventResult.fldName.option);
//   await page.pause();
//   await page.pause();
//   await testInfo.attach(EnterEventResult.screenShotsOption, {
//     body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
//   await page.getByRole('combobox').press(EnterEventResult.fldName.press);
//   await page.pause();
//   await page.pause();
//   await testInfo.attach(RenterEventResult.screenShotsBeforeEnter, {
//     body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
//   // await page.close();
// })
// }


// test.describe('Desktop Mode', () => {
//   //Added the before common.  
//   //And I add another beforeEach for the navigation between the different tabs, this part is specific in each mode.

//   test.beforeEach(async ({ page }, testInfo) => {
//     await page.setViewportSize({ width: 1920, height: 1080 }); 
//     const logPlat = new LogIntoPlatform({page});
//     const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
//     const openWindow=new OpenProcedureWindow({page});
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuStock.Stock.main, MenuStock.Stock.QualificationInProgress);
  
//   });
//       //And I call the tests.
//       commonTests();
//   });


   
// // Mobile Mode 
// test.describe('Mobile mode', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//     // Size of the viewport of a mobile device
//     await page.setViewportSize({ width: 385, height: 812 }); 
//     // Common configuration for both modes.
//     const logPlat = new LogIntoPlatform({page});
//     const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
//     const openWindow=new OpenProcedureWindow({page}); 
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.QualificationInProgress);    
  
//   });
//   //And I call the tests.
//   commonTests();
// });

// // Mobile Mode - Retrato
// test.describe('Mobile mode Retrato', () => {
// test.beforeEach(async ({ page }, testInfo) => {
//   // Tamaño del viewport para móviles en modo retrato
//   await page.setViewportSize({ width: 812, height: 385 }); 
//   // Configuración común para ambos modos.
//   const logPlat = new LogIntoPlatform({page});
//   const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
//   await page.waitForTimeout(3000);
//   const openWindow=new OpenProcedureWindow({page}); 
//   await page.waitForTimeout(3000);
//   await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.QualificationInProgress);    
// });
//   commonTests();
// });


// // Tablets Mode
// test.describe('Tablets mode', () => {
// test.beforeEach(async ({ page }, testInfo) => {
//   // Tamaño del viewport para móviles en modo retrato
//   await page.setViewportSize({ width: 768, height: 1024 }); 
//   // Configuración común para ambos modos.
//   const logPlat = new LogIntoPlatform({page});
//   const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
//   await page.waitForTimeout(3000);
//   const openWindow=new OpenProcedureWindow({page}); 
//   await page.waitForTimeout(3000);
//   await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.QualificationInProgress);    
// });
//   commonTests();
// });

// // Tablets Mode - Retrato
// test.describe('Tablets mode Retrato', () => {
// test.beforeEach(async ({ page }, testInfo) => {
//   // Tamaño del viewport para móviles en modo retrato
//   await page.setViewportSize({ width: 1024, height: 768}); 
//   // Configuración común para ambos modos.
//   const logPlat = new LogIntoPlatform({page});
//     const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
//     const openWindow=new OpenProcedureWindow({page});
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, MenuStock.Stock.mobile, MenuStock.Stock.Deviations);
//   });
//       //And I call the tests.
//       commonTests();
//   });


// const { test:pwTest, afterEach } = require('@playwright/test');
 
//   afterEach(async ({}, testInfo) => {
//     // Example JSON data, could be anything relevant to your tests
//     const data = {
//       test_name: testInfo.title,


//       duration: testInfo.duration,
//       // other test-related data you might want to send
//     };
   
//     // Determine the test outcome
//     const testStatus = testInfo.status; // 'passed', 'failed', 'timedOut', 'skipped'
   
//     await callApiRunCompletion(data, testStatus);
//   });
   
//   pwTest('Example test', async ({ page }) => {
//     // Your test logic here
//   });