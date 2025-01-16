// import { test, expect } from '@playwright/test';
// import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';
// import { MenuMicroEM } from '../../trazit-models/test-config-MicroEM-global';
// import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';
// import { NewProductionLots, formValues, ConfigSettingsAlternative, MenuInstrumentsControl } from '../../trazit-models/prueba';

// const { readFormFields } = require('../1TRAZiT-Commons/formHelpers');
// const { fillFormFields } = require('../1TRAZiT-Commons/formFiller');
// //const { submitForm } = require('../1TRAZiT-Commons/formSubmitForm'); 
// // import { submitForm } from '../1TRAZiT-Commons/formSubmitForm';


// const commonTests = () => {
//   test('Trazit-MicroEM-ActiveProductionLots-New-Accept', async ({ page }, testInfo) => {
//     let afterEachData = {
//       textInNotif1: "",
//       textInNotif2: "",
//       textInNotif3: "",
//     };

//     try {
//       await page.pause();
  
//       // Click on the "New" button
//       await page.getByLabel(NewProductionLots.buttonNew).click();
//       await page.pause();
  
//       // Take screenshot of empty form
//       await testInfo.attach(NewProductionLots.screenShotsformEmpty, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
  
//       // Read form fields
//       const formFields = await readFormFields(page);
  
//       // Fill form fields
//       await fillFormFields(page, formFields.map(field => ({
//         ...field,
//         value: formValues[field.name] || ''
//       })));
  
//       // Take screenshot of filled form
//       await testInfo.attach(NewProductionLots.screenShotsformFilled, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
  
//       // Submit form
//       // await submitForm(page, 'accept');
  
//       // Take screenshot after clicking Accept
//       await testInfo.attach(NewProductionLots.screenShotsClickAccept, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
  
//       // Set notification texts
//       afterEachData.textInNotif1 = NewProductionLots.textInNotif1;
//       afterEachData.textInNotif2 = NewProductionLots.textInNotif2;
//       afterEachData.textInNotif3 = NewProductionLots.textInNotif3;
  
//       // Check viewport width and handle notifications accordingly
//       const viewportWidth = await page.evaluate(() => {
//         return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
//       });
  
//       if (viewportWidth >= 1024) {
//         // Desktop or landscape tablet mode
//         const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
//         if (notificationElement) {
//           await notificationElement.hover();
//         } else {
//           console.warn('Notification element not found');
//         }
        
//         await testInfo.attach(NewProductionLots.screenShotsButtonNew, {
//           body: await page.screenshot({ fullPage: true }),
//           contentType: ConfigSettingsAlternative.screenShotsContentType
//         });
        
//         const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
//         if (await notificationDiv.count() > 0) {
//           await testInfo.attach('LastProductionLotNotification', {
//             body: await notificationDiv.screenshot(),
//             contentType: ConfigSettingsAlternative.screenShotsContentType
//           });
//         } else {
//           console.warn('Notification div not found');
//         }
//       } else if (viewportWidth >= 768 && viewportWidth < 1024) {
//         // Portrait tablet mode
//         await page.click('mwc-icon-button.menu');
//         await page.click('mwc-list-item#dashboardnotifications');
//         await testInfo.attach('TabletNotifications', {
//           body: await page.screenshot({ fullPage: true }),
//           contentType: ConfigSettingsAlternative.screenShotsContentType
//         });
//       } else {
//         // Mobile mode
//         await page.click('mwc-icon-button.menu');
//         await page.click('mwc-list-item#dashboardnotifications');
//         await testInfo.attach('NotificationsMobile', {
//           body: await page.screenshot({ fullPage: true }),
//           contentType: ConfigSettingsAlternative.screenShotsContentType
//         });
//       }
//     } catch (error) {
//       console.error('Test failed:', error);
//       throw error;
//     }
//   });
// };

// test.describe('Desktop Mode', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//     await page.setViewportSize({ width: 1365, height: 821 });
//     const logPlat = new LogIntoPlatform({ page });
//     const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
//     const openWindow = new OpenProcedureWindow({ page });
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuMicroEM.MicroEM.main, MenuMicroEM.MicroEM.ActiveProductionLots);
//   });
  
//   // Call common tests.
//   commonTests();
// });
