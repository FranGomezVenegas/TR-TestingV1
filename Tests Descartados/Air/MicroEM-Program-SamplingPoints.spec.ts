// import { test, expect } from '@playwright/test';
// import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
// import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';
// import { MenuInstrumentsControl } from '../../trazit-models/test-config-instruments-global';

// import { MenuMicroEM } from '../../trazit-models/test-config-MicroEM-global';
// import { SamplingPoints } from '../../trazit-models/test-config-MicroEM-Program-SamplingPoints';

// import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
// import {ConfirmDialogController} from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
// import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';
// import { SetSamplingDate } from '../../trazit-models/test-config-MicroEM-PendingSampling-SetSamplingDate';


// // Función con todas las pruebas comunes
// const commonTests = () => {
//     test('Trazit-WaterMonitoring-ProgramList-SamplingPoints-Accept', async ({ page }, testInfo) => {
//         let afterEachData = {
//             textInNotif1:"",
//             textInNotif2:"",
//             textInNotif3:"",
//         };

//         await page.pause();
//         await page.pause();
//         await page.getByLabel(SamplingPoints.buttonName, {exact:true}).click();
//         await page.pause();
//         await page.pause();
//         await testInfo.attach(SamplingPoints.screenShotsSamplingPoints, {
//             body: await page.screenshot({ fullPage: true }),
//             contentType: ConfigSettingsAlternative.screenShotsContentType
//         });
//         await page.pause();
//         await page.getByText(SamplingPoints.selectArea).click();
//         await page.pause();
//         await page.pause();
//         await testInfo.attach(SamplingPoints.screenShotsSelectArea, {
//             body: await page.screenshot({ fullPage: true }),
//             contentType: ConfigSettingsAlternative.screenShotsContentType
//         });
//         await page.pause();
//         await page.getByRole('combobox', { name: SamplingPoints.fldShift.label }).click();
//         await page.pause();
//         await page.pause();
//         await testInfo.attach('', {
//             body: await page.screenshot({ fullPage: true }),
//             contentType: ConfigSettingsAlternative.screenShotsContentType
//         });
//         await page.pause();
//         await page.getByRole('option', { name: SamplingPoints.fldShift.option }).click();
//         await page.pause();
//         await page.pause();
//         await testInfo.attach('', {
//             body: await page.screenshot({ fullPage: true }),
//             contentType: ConfigSettingsAlternative.screenShotsContentType
//         });
//         await page.getByRole('button', { name: SamplingPoints.buttonSamplingPoints }).click();
//         await page.pause();
//         await page.pause();
//         await testInfo.attach(SamplingPoints.screenShotsAccept, {
//             body: await page.screenshot({ fullPage: true }),
//             contentType: ConfigSettingsAlternative.screenShotsContentType
//         });
//         await page.pause();

//         afterEachData.textInNotif1=SamplingPoints.textInNotif1
//         afterEachData.textInNotif2=SamplingPoints.textInNotif2
//         afterEachData.textInNotif3=SamplingPoints.textInNotif3

//         // Obtener el modo de dispositivo usando page.evaluate
//         const viewportWidth = await page.evaluate(() => {
//             return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
//         });
        
//         if (viewportWidth >= 1024) {
//             // Modo escritorio o tablet en modo paisaje
//             const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
//             if (notificationElement !== null) {
//             await notificationElement.hover();
//             }
//             await testInfo.attach(SamplingPoints.screenformNotifications, {
//             body: await page.screenshot({ fullPage: true }),
//             contentType: ConfigSettingsAlternative.screenShotsContentType
//             });
//             const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
//             if (notificationDiv !== null) {
//             await testInfo.attach(SamplingPoints.screenformLastNotifications, {
//                 body: await notificationDiv.screenshot(),
//                 contentType: ConfigSettingsAlternative.screenShotsContentType
//             });
//             }
//         } else if (viewportWidth >= 768 && viewportWidth < 1024) {
//             // Tablet en modo retrato
//             await page.click('mwc-icon-button.menu');
//             await page.click('mwc-list-item#dashboardnotifications');
//             await testInfo.attach('TabletNotifications', {
//             body: await page.screenshot({ fullPage: true }),
//             contentType: ConfigSettingsAlternative.screenShotsContentType
//             });
//         } else {
//             // Modo móvil
//             await page.click('mwc-icon-button.menu');
//             await page.click('mwc-list-item#dashboardnotifications');
//             await testInfo.attach('NotificationsMobile', {
//             body: await page.screenshot({ fullPage: true }),
//             contentType: ConfigSettingsAlternative.screenShotsContentType
//             });
//         }
//     });

//     test('Trazit-WaterMonitoring-ProgramList-SamplingPoints-Cancel', async ({ page }, testInfo) => {
//         await page.pause();
//         await page.pause();
//         await page.getByLabel(SamplingPoints.buttonName, {exact:true}).click();
//         await page.pause();
//         await page.pause();
//         await testInfo.attach(SamplingPoints.screenShotsSamplingPoints, {
//             body: await page.screenshot({ fullPage: true }),
//             contentType: ConfigSettingsAlternative.screenShotsContentType
//         });
//         await page.pause();
//         await page.getByText(SamplingPoints.selectArea).click();
//         await page.pause();
//         await page.pause();
//         await testInfo.attach(SamplingPoints.screenShotsSelectArea, {
//             body: await page.screenshot({ fullPage: true }),
//             contentType: ConfigSettingsAlternative.screenShotsContentType
//         });
//         await page.pause();
//         await page.getByRole('combobox', { name: SamplingPoints.fldShift.label }).click();
//         await page.pause();
//         await page.pause();
//         await testInfo.attach('', {
//             body: await page.screenshot({ fullPage: true }),
//             contentType: ConfigSettingsAlternative.screenShotsContentType
//         });
//         await page.pause();
//         await page.getByRole('option', { name: SamplingPoints.fldShift.option }).click();
//         await page.pause();
//         await page.pause();
//         await testInfo.attach('', {
//             body: await page.screenshot({ fullPage: true }),
//             contentType: ConfigSettingsAlternative.screenShotsContentType
//         });
//         await page.getByRole('button', { name: SamplingPoints.buttonCancel }).click();
//         await page.pause();
//         await page.pause();
//         await testInfo.attach(SamplingPoints.screenShotsCancel, {
//             body: await page.screenshot({ fullPage: true }),
//             contentType: ConfigSettingsAlternative.screenShotsContentType
//         });
//         await page.pause();

//     });  

//     test('Trazit-WaterMonitoring-ProgramList-SamplingPoints-Open', async ({ page }, testInfo) => {
//         await page.pause();
//         await page.pause();
//         await page.getByLabel(SamplingPoints.buttonName, {exact:true}).click();
//         await page.pause();
//         await page.pause();
//         await testInfo.attach(SamplingPoints.screenShotsSamplingPoints, {
//             body: await page.screenshot({ fullPage: true }),
//             contentType: ConfigSettingsAlternative.screenShotsContentType
//         });
//     })
// }


// test.describe('Desktop Mode', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//       await page.setViewportSize({ width: 1365, height: 821 }); 
//       const logPlat = new LogIntoPlatform({page});
//       const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow=new OpenProcedureWindow({page});
//       await page.waitForTimeout(3000);
//       await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuMicroEM.MicroEM.main, MenuMicroEM.MicroEM.Program);
    
//     });
//         //And I call the tests.
//         commonTests();
//     });
  
  
     
//   // Mobile Mode 
//   test.describe('Mobile mode', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//       await page.setViewportSize({ width: 385, height: 812 }); 
//       const logPlat = new LogIntoPlatform({page});
//       const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow=new OpenProcedureWindow({page}); 
//       await page.waitForTimeout(3000);
//       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuMicroEM.MicroEM.mobile, MenuMicroEM.MicroEM.Program);    
    
//     });
//     //And I call the tests.
//     commonTests();
//   });
  
//   // Mobile Mode - Retrato
//   test.describe('Mobile mode Retrato', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//     // Tamaño del viewport para móviles en modo retrato
//     await page.setViewportSize({ width: 812, height: 385 }); 
//     // Configuración común para ambos modos.
//     const logPlat = new LogIntoPlatform({page});
//     const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
//     const openWindow=new OpenProcedureWindow({page}); 
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuMicroEM.MicroEM.mobile, MenuMicroEM.MicroEM.Program);    
//   });
//     commonTests();
//   });
  
  
//   // Tablets Mode
//   test.describe('Tablets mode', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//       await page.setViewportSize({ width: 768, height: 1024 }); 
//       const logPlat = new LogIntoPlatform({page});
//       const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow=new OpenProcedureWindow({page}); 
//       await page.waitForTimeout(3000);
//       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuMicroEM.MicroEM.mobile, MenuMicroEM.MicroEM.Program);    
//     });
//     commonTests();
//   });
  
//   // Tablets Mode - Retrato
//   test.describe('Tablets mode Retrato', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//       await page.setViewportSize({ width: 1024, height: 768}); 
//       const logPlat = new LogIntoPlatform({page});
//       const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow=new OpenProcedureWindow({page});
//       await page.waitForTimeout(3000);
//       await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuMicroEM.MicroEM.main, MenuMicroEM.MicroEM.Program);
//       });
//         //And I call the tests.
//         commonTests();
//     });
  
  
//   const { test:pwTest, afterEach } = require('@playwright/test');
   
//     afterEach(async ({}, testInfo) => {
//       // Example JSON data, could be anything relevant to your tests
//       const data = {
//         test_name: testInfo.title,
  
  
//         duration: testInfo.duration,
//         // other test-related data you might want to send
//       };
     
//       // Determine the test outcome
//       const testStatus = testInfo.status; // 'passed', 'failed', 'timedOut', 'skipped'
     
//       await callApiRunCompletion(data, testStatus);
//     });
     
//     pwTest('Example test', async ({ page }) => {
//       // Your test logic here
//     });
