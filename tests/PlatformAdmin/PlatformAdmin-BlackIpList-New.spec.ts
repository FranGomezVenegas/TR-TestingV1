// import { test, expect } from '@playwright/test';
// import { platformMenuNames } from '../../trazit-config';
// import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
// import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';
// import { MenuInstrumentsControl } from '../../trazit-models/test-config-instruments-global';

// import { New, AlreadyExist } from '../../trazit-models/test-config-PlatformAdmin-BlackIpList-New';
// import { MenuPlatformAdmin } from '../../trazit-models/test-config-platform-admin';

// import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
// import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
// import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';
// import { Logger, NetworkInterceptor } from '../1TRAZiT-Commons/consoleInterceptionAndRequestResponse';

// //Function with all tests.
// const commonTests = () => {
//   test('Trazit-PlatformAdmin-BlackIpList-Open', async ({ page }, testInfo) => {
//     await page.pause();
    
//     // Crear instancias de Logger y NetworkInterceptor
//     const logger = new Logger();
//     const networkInterceptor = new NetworkInterceptor();

//     // Adjuntar el Logger y NetworkInterceptor a la página
//     logger.attachToPage(page);
//     networkInterceptor.attachToPage(page);
  
//     // Imprime todos los tipos de logs y datos de red capturados
//     logger.printLogs();
//     networkInterceptor.printNetworkData();

//     // Si hay algun error de consola da fallo en el test.
//     expect(logger.errors.length).toBe(0);
//     //await page.close();
//   });
  
  


//     test('Trazit-PlatformAdmin-BlackIpList-New-Cancel', async ({ page }, testInfo) => {
//       await page.pause();
      
//       // Crear instancias de Logger y NetworkInterceptor
//       const logger = new Logger();
//       const networkInterceptor = new NetworkInterceptor();

//       // Adjuntar el Logger y NetworkInterceptor a la página
//       logger.attachToPage(page);
//       networkInterceptor.attachToPage(page);

//       await page.getByLabel(New.buttonNameNew).click();
//       await page.pause();
//       await page.pause();
//       await testInfo.attach(New.screenShotsEmptyForm, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//       await page.getByLabel(New.fldSection1.label).click();
//       await page.pause();
//       await page.pause();
//       await page.getByLabel(New.fldSection1.label).fill(New.fldSection1.value);
//       await page.pause();
//       await page.pause();
//       await page.getByLabel(New.fldSection2.label).click();
//       await page.pause();
//       await page.pause();
//       await page.getByLabel(New.fldSection2.label).fill(New.fldSection2.value);
//       await page.pause();
//       await page.pause();
//       await page.getByLabel(New.fldSection3.label).click();
//       await page.pause();
//       await page.pause();
//       await page.getByLabel(New.fldSection3.label).fill(New.fldSection3.value);
//       await page.pause();
//       await page.pause();
//       await page.getByLabel(New.fldSection4.label).click();
//       await page.pause();
//       await page.pause();
//       await page.getByLabel(New.fldSection4.label).fill(New.fldSection4.value);
//       await page.pause();
//       await page.pause();
//       await page.getByLabel(New.fldDescription.label).click();
//       await page.pause();
//       await page.pause();
//       await page.getByLabel(New.fldDescription.label).fill(New.fldDescription.value);
//       await page.pause();
//       await page.pause();
//       await testInfo.attach(New.screenShotsFilledForm, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//       await page.getByRole('button', { name: New.buttonCancel }).click();
//       await page.pause();
//       await page.pause();
//       await testInfo.attach(New.screenShotsCancel, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });

//       // Imprime todos los tipos de logs y datos de red capturados
//       logger.printLogs();
//       networkInterceptor.printNetworkData();

//       // Si hay algun error de consola da fallo en el test.
//       expect(logger.errors.length).toBe(0);

//     }),

    

//     test('Trazit-PlatformAdmin-BlackIpList-New-Accept', async ({ page }, testInfo) => {
//       let afterEachData = {
//         textInNotif1: "",
//         textInNotif2: "",
//         textInNotif3: "",
//       };

//       await page.pause();

//       // Crear instancias de Logger y NetworkInterceptor
//       const logger = new Logger();
//       const networkInterceptor = new NetworkInterceptor();

//       // Adjuntar el Logger y NetworkInterceptor a la página
//       logger.attachToPage(page);
//       networkInterceptor.attachToPage(page);

//       // Acciones del test
//       await page.getByLabel(New.buttonNameNew).click();
//       await page.pause();
//       await testInfo.attach(New.screenShotsEmptyForm, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType,
//       });

//       await page.getByLabel(New.fldSection1.label).click();
//       await page.getByLabel(New.fldSection1.label).fill(New.fldSection1.value);

//       await page.getByLabel(New.fldSection2.label).click();
//       await page.getByLabel(New.fldSection2.label).fill(New.fldSection2.value);

//       await page.getByLabel(New.fldSection3.label).click();
//       await page.getByLabel(New.fldSection3.label).fill(New.fldSection3.value);

//       await page.getByLabel(New.fldSection4.label).click();
//       await page.getByLabel(New.fldSection4.label).fill(New.fldSection4.value);

//       await page.getByLabel(New.fldDescription.label).click();
//       await page.getByLabel(New.fldDescription.label).fill(New.fldDescription.value);

//       await testInfo.attach(New.screenShotsFilledForm, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType,
//       });

//       await page.getByRole('button', { name: New.buttonAccept }).click();
//       await testInfo.attach(New.screenShotsAccept, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType,
//       });

//       // Imprime todos los tipos de logs y datos de red capturados
//       logger.printLogs();
//       networkInterceptor.printNetworkData();

//       // Si hay algun error de consola da fallo en el test.
//       expect(logger.errors.length).toBe(0);

//       afterEachData.textInNotif1 = New.textInNotif1;
//       afterEachData.textInNotif2 = New.textInNotif2;
//       afterEachData.textInNotif3 = New.textInNotif3;

//       // Obtener el modo de dispositivo usando page.evaluate
//       const viewportWidth = await page.evaluate(() => {
//         return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
//       });

//       if (viewportWidth >= 1024) {
//         // Modo escritorio o tablet en modo paisaje
//         const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
//         if (notificationElement !== null) {
//           await notificationElement.hover();
//         }
//         await testInfo.attach(New.screenformNotifications, {
//           body: await page.screenshot({ fullPage: true }),
//           contentType: ConfigSettingsAlternative.screenShotsContentType,
//         });
//         const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
//         if (notificationDiv !== null) {
//           await testInfo.attach(New.screenformLastNotifications, {
//             body: await notificationDiv.screenshot(),
//             contentType: ConfigSettingsAlternative.screenShotsContentType,
//           });
//         }
//       } else if (viewportWidth >= 768 && viewportWidth < 1024) {
//         // Tablet en modo retrato
//         const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
//         if (notificationElement !== null) {
//           await notificationElement.click();
//         }
//         await testInfo.attach('TabletNotifications', {
//           body: await page.screenshot({ fullPage: true }),
//           contentType: ConfigSettingsAlternative.screenShotsContentType,
//         });
//       } else {
//         // Modo móvil
//         await page.click('mwc-icon-button.menu');
//         await page.click('mwc-list-item#dashboardnotifications');
//         await testInfo.attach('NotificationsMobile', {
//           body: await page.screenshot({ fullPage: true }),
//           contentType: ConfigSettingsAlternative.screenShotsContentType,
//         });
//       }
//     });

    
    
//     test('Trazit-PlatformAdmin-BlackIpList-IpAlreadyAdded', async ({ page }, testInfo) => {
//       let afterEachData = {
//         textInNotif1:"",
//         textInNotif2:"",
//         textInNotif3:"",
//       }

//       // Crear instancias de Logger y NetworkInterceptor
//       const logger = new Logger();
//       const networkInterceptor = new NetworkInterceptor();

//       // Adjuntar el Logger y NetworkInterceptor a la página
//       logger.attachToPage(page);
//       networkInterceptor.attachToPage(page);
  
//       await page.pause();
//       await page.getByLabel(New.buttonNameNew).click();
//       await page.pause();
//       await page.pause();
//       await testInfo.attach(New.screenShotsEmptyForm, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//       await page.getByLabel(New.fldSection1.label).click();
//       await page.pause();
//       await page.pause();
//       await page.getByLabel(New.fldSection1.label).fill(New.fldSection1.value);
//       await page.pause();
//       await page.pause();
//       await page.getByLabel(New.fldSection2.label).click();
//       await page.pause();
//       await page.pause();
//       await page.getByLabel(New.fldSection2.label).fill(New.fldSection2.value);
//       await page.pause();
//       await page.pause();
//       await page.getByLabel(New.fldSection3.label).click();
//       await page.pause();
//       await page.pause();
//       await page.getByLabel(New.fldSection3.label).fill(New.fldSection3.value);
//       await page.pause();
//       await page.pause();
//       await page.getByLabel(New.fldSection4.label).click();
//       await page.pause();
//       await page.pause();
//       await page.getByLabel(New.fldSection4.label).fill(New.fldSection4.value);
//       await page.pause();
//       await page.pause();
//       await page.getByLabel(New.fldDescription.label).click();
//       await page.pause();
//       await page.pause();
//       await page.getByLabel(New.fldDescription.label).fill(New.fldDescription.value);
//       await page.pause();
//       await page.pause();
//       await testInfo.attach(New.screenShotsFilledForm, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//       await page.getByRole('button', { name: New.buttonAccept }).click();
//       await page.pause();
//       await page.pause();
//       await testInfo.attach(New.screenShotsAccept, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });

//       // Imprime todos los tipos de logs y datos de red capturados
//       logger.printLogs();
//       networkInterceptor.printNetworkData();

//       // Si hay algun error de consola da fallo en el test.
//       expect(logger.errors.length).toBe(0);

//       afterEachData.textInNotif1=New.textInNotif1
//       afterEachData.textInNotif2=New.textInNotif2
//       afterEachData.textInNotif3=New.textInNotif3
    
//       // Obtener el modo de dispositivo usando page.evaluate
//       const viewportWidth = await page.evaluate(() => {
//         return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
//       });
      
//       if (viewportWidth >= 1024) {
//           // Modo escritorio o tablet en modo paisaje
//           const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
//           if (notificationElement !== null) {
//           await notificationElement.hover();
//           }
//           await testInfo.attach(New.screenformNotifications, {
//           body: await page.screenshot({ fullPage: true }),
//           contentType: ConfigSettingsAlternative.screenShotsContentType
//           });
//           const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
//           if (notificationDiv !== null) {
//           await testInfo.attach(New.screenformLastNotifications, {
//               body: await notificationDiv.screenshot(),
//               contentType: ConfigSettingsAlternative.screenShotsContentType
//           });
//           }
//       } else if (viewportWidth >= 768 && viewportWidth < 1024) {
//           // Tablet en modo retrato
//           const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
//           if (notificationElement !== null) {
//           await notificationElement.click();
//           }
//           await testInfo.attach('TabletNotifications', {
//           body: await page.screenshot({ fullPage: true }),
//           contentType: ConfigSettingsAlternative.screenShotsContentType
//           });
//       } else {
//           // Modo móvil
//           await page.click('mwc-icon-button.menu');
//           await page.click('mwc-list-item#dashboardnotifications');
//           await testInfo.attach('NotificationsMobile', {
//           body: await page.screenshot({ fullPage: true }),
//           contentType: ConfigSettingsAlternative.screenShotsContentType
//           });
//       };
//     });

// }



// test.describe('Desktop Mode', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//         await page.setViewportSize({ width: 1365, height: 821 });
//         const logPlat = new LogIntoPlatform({ page });
//         const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//         await page.waitForTimeout(3000);
//         const openWindow = new OpenProcedureWindow({ page });
//         await page.waitForTimeout(3000);
//         await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuPlatformAdmin.PlatformAdmin.main, MenuPlatformAdmin.PlatformAdmin.BlackIpList);
//     });
//     commonTests();
//   });
  
// // test.describe('Mobile mode', () => {
// //     test.beforeEach(async ({ page }, testInfo) => {
// //         await page.setViewportSize({ width: 385, height: 812 });
// //         const logPlat = new LogIntoPlatform({ page });
// //         const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
// //         await page.waitForTimeout(3000);
// //         const openWindow = new OpenProcedureWindow({ page });
// //         await page.waitForTimeout(3000);
// //         await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuPlatformAdmin.PlatformAdmin.mobile, MenuPlatformAdmin.PlatformAdmin.BlackIpList);
// //     });
// //     commonTests();
// //   });
  
// // test.describe('Mobile mode Retrato', () => {
// //     test.beforeEach(async ({ page }, testInfo) => {
// //         await page.setViewportSize({ width: 812, height: 385 });
// //         const logPlat = new LogIntoPlatform({ page });
// //         const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
// //         await page.waitForTimeout(3000);
// //         const openWindow = new OpenProcedureWindow({ page });
// //         await page.waitForTimeout(3000);
// //         await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuPlatformAdmin.PlatformAdmin.mobile, MenuPlatformAdmin.PlatformAdmin.BlackIpList);
// //     });
// //     commonTests();
// //   });
  
// // test.describe('Tablets mode', () => {
// //     test.beforeEach(async ({ page }, testInfo) => {
// //         await page.setViewportSize({ width: 768, height: 1024 });
// //         const logPlat = new LogIntoPlatform({ page });
// //         const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
// //         await page.waitForTimeout(3000);
// //         const openWindow = new OpenProcedureWindow({ page });
// //         await page.waitForTimeout(3000);
// //         await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuPlatformAdmin.PlatformAdmin.mobile, MenuPlatformAdmin.PlatformAdmin.BlackIpList);
// //     });
// //     commonTests();
// //   });
  
// // test.describe('Tablets mode Retrato', () => {
// //     test.beforeEach(async ({ page }, testInfo) => {
// //         await page.setViewportSize({ width: 1024, height: 768 });
// //         const logPlat = new LogIntoPlatform({ page });
// //         const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
// //         await page.waitForTimeout(3000);
// //         const openWindow = new OpenProcedureWindow({ page });
// //         await page.waitForTimeout(3000);
// //         await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, MenuPlatformAdmin.PlatformAdmin.main, MenuPlatformAdmin.PlatformAdmin.BlackIpList);
// //     });
// //     commonTests();
// //   });
  
  
// const { test: pwTest, afterEach } = require('@playwright/test');
  
// // After Each Hook to log results
// test.afterEach(async ({ page }, testInfo) => {
//   const durationInSeconds = (testInfo.duration / 1000).toFixed(2);
//   await test.step('Log test results', async () => {
//   const data = {
//     test_name: testInfo.title,
//     duration: `${durationInSeconds} seconds`,
//   };

//   const testStatus = testInfo.status;
//   await callApiRunCompletion(data, testStatus);
//   })
// });
  
// pwTest('Example test', async ({ page }) => {
//       // Tu lógica de prueba aquí
// });
