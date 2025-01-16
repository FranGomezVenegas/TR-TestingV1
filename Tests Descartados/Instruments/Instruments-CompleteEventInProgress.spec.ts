// import { test, expect } from '@playwright/test';
// import { platformMenuNames } from '../../trazit-config';
// import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
// import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

// import { MenuInstrumentsControl } from '../../trazit-models/test-config-instruments-global';
// import { CompleteCalibration, CompleteService, CompleteVerification, CompletePrevMaint} from '../../trazit-models/test-config-instruments-completeEventInProgress';
// import { ReOpen} from '../../trazit-models/test-config-instruments-StarteventInProgress';

// import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
// import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
// import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

// import { Logger, NetworkInterceptor } from '../1TRAZiT-Commons/consoleInterceptionAndRequestResponse';


// //Function with all tests.
// const commonTests = () => {
//   test('Trazit-Instruments-EventInProgress', async ({ page }, testInfo) => {
//     await page.pause();
    
//     // Create instances of Logger and NetworkInterceptor
//     const logger = new Logger();
//     const networkInterceptor = new NetworkInterceptor();

//     // Attach Logger and NetworkInterceptor to the page
//     test.step('Attach Logger and NetworkInterceptor to the page', async () => {
//         logger.attachToPage(page);
//         networkInterceptor.attachToPage(page);
//     });

//     await page.pause();

//     test.step('Log all captured logs and network data', async () => {
//       logger.printLogs();
//       networkInterceptor.printNetworkData();
//     });

//     // Fail the test if any console errors were captured
//     test.step('Verify no console errors', async () => {
//         expect(logger.errors.length).toBe(0);
//     });
//   });
  

//   test('Trazit-Instruments-EventInProgress-ReOpen-Accept', async ({ page }, testInfo) => {
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

//     test.step('Scroll to the instrument element', async () => {
//       const selectInstruments = await page.getByText(ReOpen.selectInstrument, { exact: true });
//       await selectInstruments.scrollIntoViewIfNeeded();
//     });

//     test.step('Click on the instrument element', async () => {
//         const selectInstruments = await page.getByText(ReOpen.selectInstrument, { exact: true });
//         await selectInstruments.click();
//     });

//     await page.getByLabel(ReOpen.buttonName).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(ReOpen.screenShotsAfterButtonReopen, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByLabel(ReOpen.buttonDays.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(ReOpen.buttonDays.label).fill(ReOpen.buttonDays.value);  
//     await page.pause();
//     await page.pause();
//     await page.locator(ReOpen.buttonRefresh.locator).getByLabel(ReOpen.buttonRefresh.name).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(ReOpen.screenShotsAfterTheForm, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('button', { name: ReOpen.buttonAccept.label }).click();
//     await page.pause();
//     await page.pause();  
//     await testInfo.attach(ReOpen.screenShotsEmptyForm, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('textbox', { name: ReOpen.fldUser.label }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('textbox', { name: ReOpen.fldUser.label }).fill(ReOpen.fldUser.value);
//     await page.pause();
//     await page.pause();
//     await page.getByRole('textbox', { name: ReOpen.fldPassword.label }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('textbox', { name: ReOpen.fldPassword.label }).fill(ReOpen.fldPassword.value);
//     await page.pause();
//     await page.pause();
//     await page.getByRole('textbox', { name: ReOpen.fldJustificationPhrase.label }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByRole('textbox', { name: ReOpen.fldJustificationPhrase.label }).fill(ReOpen.fldJustificationPhrase.value);
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(ReOpen.screenShotsEmptyForm, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('button', { name: ReOpen.buttonAccept.label }).click();
//     await testInfo.attach(ReOpen.screenShotsAccept, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });

//     test.step('Log all captured logs and network data', async () => {
//       logger.printLogs();
//       networkInterceptor.printNetworkData();
//     });

//     // Fail the test if any console errors were captured
//     test.step('Verify no console errors', async () => {
//         expect(logger.errors.length).toBe(0);
//     });


//     afterEachData.textInNotif1=ReOpen.textInNotif1
//     afterEachData.textInNotif2=ReOpen.textInNotif2
//     afterEachData.textInNotif3=ReOpen.textInNotif3
  
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
//       await testInfo.attach(ReOpen.screenformNotifications, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//       const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
//       if (notificationDiv !== null) {
//       await testInfo.attach(ReOpen.screenformLastNotifications, {
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
//   }
// })

  
//   test('Trazit-Instruments-EventInProgress-ReOpen-Cancel', async ({ page }, testInfo) => {
//      // Create instances of Logger and NetworkInterceptor
//      const logger = new Logger();
//      const networkInterceptor = new NetworkInterceptor();
 
//      // Attach Logger and NetworkInterceptor to the page
//      test.step('Attach Logger and NetworkInterceptor to the page', async () => {
//          logger.attachToPage(page);
//          networkInterceptor.attachToPage(page);
//      });
 
//      test.step('Scroll to the instrument element', async () => {
//        const selectInstruments = await page.getByText(ReOpen.selectInstrument, { exact: true });
//        await selectInstruments.scrollIntoViewIfNeeded();
//      });
 
//      test.step('Click on the instrument element', async () => {
//          const selectInstruments = await page.getByText(ReOpen.selectInstrument, { exact: true });
//          await selectInstruments.click();
//      });
 
//      await page.getByLabel(ReOpen.buttonName).click();
//      await page.pause();
//      await page.pause();
//      await testInfo.attach(ReOpen.screenShotsAfterButtonReopen, {
//        body: await page.screenshot({ fullPage: true }),
//        contentType: ConfigSettingsAlternative.screenShotsContentType
//      });
//      await page.getByLabel(ReOpen.buttonDays.label).click();
//      await page.pause();
//      await page.pause();
//      await page.getByLabel(ReOpen.buttonDays.label).fill(ReOpen.buttonDays.value);  
//      await page.pause();
//      await page.pause();
//      await page.locator(ReOpen.buttonRefresh.locator).getByLabel(ReOpen.buttonRefresh.name).click();
//      await page.pause();
//      await page.pause();
//      await testInfo.attach(ReOpen.screenShotsAfterTheForm, {
//        body: await page.screenshot({ fullPage: true }),
//        contentType: ConfigSettingsAlternative.screenShotsContentType
//      });
//      await page.getByRole('button', { name: ReOpen.buttonAccept.label }).click();
//      await page.pause();
//      await page.pause();  
//      await testInfo.attach(ReOpen.screenShotsEmptyForm, {
//        body: await page.screenshot({ fullPage: true }),
//        contentType: ConfigSettingsAlternative.screenShotsContentType
//      });
//      await page.getByRole('textbox', { name: ReOpen.fldUser.label }).click();
//      await page.pause();
//      await page.pause();
//      await page.getByRole('textbox', { name: ReOpen.fldUser.label }).fill(ReOpen.fldUser.value);
//      await page.pause();
//      await page.pause();
//      await page.getByRole('textbox', { name: ReOpen.fldPassword.label }).click();
//      await page.pause();
//      await page.pause();
//      await page.getByRole('textbox', { name: ReOpen.fldPassword.label }).fill(ReOpen.fldPassword.value);
//      await page.pause();
//      await page.pause();
//      await page.getByRole('textbox', { name: ReOpen.fldJustificationPhrase.label }).click();
//      await page.pause();
//      await page.pause();
//      await page.getByRole('textbox', { name: ReOpen.fldJustificationPhrase.label }).fill(ReOpen.fldJustificationPhrase.value);
//      await page.pause();
//      await page.pause();
//      await testInfo.attach(ReOpen.screenShotsEmptyForm, {
//        body: await page.screenshot({ fullPage: true }),
//        contentType: ConfigSettingsAlternative.screenShotsContentType
//      });
//      await page.getByRole('button', { name: ReOpen.buttonCancel.label }).click();
//     await page.pause();  
//     await testInfo.attach(ReOpen.screenShostsAfterCancelTheForm, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.pause();
 
//      test.step('Log all captured logs and network data', async () => {
//        logger.printLogs();
//        networkInterceptor.printNetworkData();
//      });
 
//      // Fail the test if any console errors were captured
//      test.step('Verify no console errors', async () => {
//          expect(logger.errors.length).toBe(0);
//      });
 
    
//   });
  
  
//   test('Trazit-Instruments-EventInProgress-CompleteService-Accept', async ({ page }, testInfo) => {
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

//     test.step('Scroll to the instrument element', async () => {
//       const selectService = await page.getByRole('cell', { name: CompleteService.selectService }).first();
//       await selectService.scrollIntoViewIfNeeded();
//     });

//     test.step('Click on the instrument element', async () => {
//       const selectService = await page.getByRole('cell', { name: CompleteService.selectService }).first();

//       await selectService.click();
//     });

//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteService.screenShotsAfterClickInstruments, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByLabel(CompleteService.buttonNameCompleteService).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteService.screenShotsAfterClickCompleteService, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByLabel(CompleteService.buttonDecision).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteService.screenShotsForm, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('option', { name: CompleteService.buttonOptions.label, exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteService.screenShotsAfterClickDecision, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('button', { name: CompleteService.buttonAccept.label }).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteService.screenShotsJustificationPhraseEmpty, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//       await page.getByRole('textbox', { name: CompleteService.fldJustificationPhrase.label }).fill(CompleteService.fldJustificationPhrase.value);
//       await page.pause();
//       await page.pause();
//       await page.getByRole('button', { name: CompleteService.buttonAccept.label }).first().click();
//       await page.pause();
//       await page.pause();
//       await testInfo.attach(CompleteService.screenShotsAccept, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//     await page.pause();
//     await page.pause();

//     test.step('Log all captured logs and network data', async () => {
//       logger.printLogs();
//       networkInterceptor.printNetworkData();
//     });

//     // Fail the test if any console errors were captured
//     test.step('Verify no console errors', async () => {
//         expect(logger.errors.length).toBe(0);
//     });

//     afterEachData.textInNotif1=CompleteService.textInNotif1
//     afterEachData.textInNotif2=CompleteService.textInNotif2
//     afterEachData.textInNotif3=CompleteService.textInNotif3
    
//         // Obtener el modo de dispositivo usando page.evaluate
//         const viewportWidth = await page.evaluate(() => {
//           return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
//       });
      
//       if (viewportWidth >= 1024) {
//           // Modo escritorio o tablet en modo paisaje
//           const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
//           if (notificationElement !== null) {
//           await notificationElement.hover();
//           }
//           await testInfo.attach(CompleteService.screenformNotifications, {
//           body: await page.screenshot({ fullPage: true }),
//           contentType: ConfigSettingsAlternative.screenShotsContentType
//           });
//           const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
//           if (notificationDiv !== null) {
//           await testInfo.attach(CompleteService.screenformLastNotifications, {
//               body: await notificationDiv.screenshot(),
//               contentType: ConfigSettingsAlternative.screenShotsContentType
//           });
//           }
//       } else if (viewportWidth >= 768 && viewportWidth < 1024) {
//           // Tablet en modo retrato
//           await page.click('mwc-icon-button.menu');
//           await page.click('mwc-list-item#dashboardnotifications');
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
//       }
//   })



//   test('Trazit-Instruments-EventInProgress-CompleteService-Cancel', async ({ page }, testInfo) => {
//     // Create instances of Logger and NetworkInterceptor
//     const logger = new Logger();
//     const networkInterceptor = new NetworkInterceptor();

//     // Attach Logger and NetworkInterceptor to the page
//     test.step('Attach Logger and NetworkInterceptor to the page', async () => {
//         logger.attachToPage(page);
//         networkInterceptor.attachToPage(page);
//     });

//     test.step('Scroll to the instrument element', async () => {
//       const selectService = await page.getByRole('cell', { name: CompleteService.selectService }).first();
//       await selectService.scrollIntoViewIfNeeded();
//     });

//     test.step('Click on the instrument element', async () => {
//       const selectService = await page.getByRole('cell', { name: CompleteService.selectService }).first();

//       await selectService.click();
//     });

//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteService.screenShotsAfterClickInstruments, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByLabel(CompleteService.buttonNameCompleteService).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteService.screenShotsAfterClickCompleteService, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByLabel(CompleteService.buttonDecision).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteService.screenShotsForm, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('option', { name: CompleteService.buttonOptions.label, exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteService.screenShotsAfterClickDecision, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('button', { name: CompleteService.buttonAccept.label }).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteService.screenShotsJustificationPhraseEmpty, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//       await page.getByRole('textbox', { name: CompleteService.fldJustificationPhrase.label }).fill(CompleteService.fldJustificationPhrase.value);
//       await page.pause();
//       await page.pause();
//       await page.getByRole('button', { name: CompleteService.buttonCancel.label }).click();
//       await page.pause();
//       await page.pause();
//       await testInfo.attach(CompleteService.screenShotsCancel, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//     await page.pause();
//     await page.pause();

//     test.step('Log all captured logs and network data', async () => {
//       logger.printLogs();
//       networkInterceptor.printNetworkData();
//     });

//     // Fail the test if any console errors were captured
//     test.step('Verify no console errors', async () => {
//         expect(logger.errors.length).toBe(0);
//     });

   
//   });


//   test('Trazit-Instruments-EventInProgress-CompleteVerification-Accept', async ({ page }, testInfo) => {
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

//     test.step('Scroll to the instrument element', async () => {
//       const selectVerifications = await page.getByRole('cell', { name: CompleteVerification.selectVerification }).first();
//       await selectVerifications.scrollIntoViewIfNeeded();
//     });

//     test.step('Click on the instrument element', async () => {
//       const selectVerifications = await page.getByRole('cell', { name: CompleteVerification.selectVerification }).first();
//       await selectVerifications.click();
//     });

//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteVerification.screenShotsAfterClickInstruments, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByLabel(CompleteVerification.buttonName).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteVerification.screenShotsAfterClickCompleteVerification, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByLabel(CompleteVerification.buttonDecision).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteVerification.screenShotsForm, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('option', { name: CompleteVerification.buttonOptions.label, exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteVerification.screenShotsAfterClickDecision, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('button', { name: CompleteVerification.buttonAccept.label }).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteVerification.screenShotsJustificationPhraseEmpty, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//       await page.getByRole('textbox', { name: CompleteVerification.fldJustificationPhrase.label }).fill(CompleteVerification.fldJustificationPhrase.value);
//       await page.pause();
//       await page.pause();
//       await page.getByRole('button', { name: CompleteVerification.buttonAccept.label }).first().click();
//       await page.pause();
//       await page.pause();
//       await testInfo.attach(CompleteVerification.screenShotsAccept, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//     await page.pause();
//     await page.pause();

//     test.step('Log all captured logs and network data', async () => {
//       logger.printLogs();
//       networkInterceptor.printNetworkData();
//     });

//     // Fail the test if any console errors were captured
//     test.step('Verify no console errors', async () => {
//         expect(logger.errors.length).toBe(0);
//     });

//     afterEachData.textInNotif1=CompleteVerification.textInNotif1
//     afterEachData.textInNotif2=CompleteVerification.textInNotif2
//     afterEachData.textInNotif3=CompleteVerification.textInNotif3
    
//         // Obtener el modo de dispositivo usando page.evaluate
//         const viewportWidth = await page.evaluate(() => {
//           return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
//       });
      
//       if (viewportWidth >= 1024) {
//           // Modo escritorio o tablet en modo paisaje
//           const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
//           if (notificationElement !== null) {
//           await notificationElement.hover();
//           }
//           await testInfo.attach(CompleteVerification.screenformNotifications, {
//           body: await page.screenshot({ fullPage: true }),
//           contentType: ConfigSettingsAlternative.screenShotsContentType
//           });
//           const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
//           if (notificationDiv !== null) {
//           await testInfo.attach(CompleteVerification.screenformLastNotifications, {
//               body: await notificationDiv.screenshot(),
//               contentType: ConfigSettingsAlternative.screenShotsContentType
//           });
//           }
//       } else if (viewportWidth >= 768 && viewportWidth < 1024) {
//           // Tablet en modo retrato
//           await page.click('mwc-icon-button.menu');
//           await page.click('mwc-list-item#dashboardnotifications');
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
//       }
//   });

//   test('Trazit-Instruments-EventInProgress-CompleteVerification-Cancel', async ({ page }, testInfo) => {
//     // Create instances of Logger and NetworkInterceptor
//     const logger = new Logger();
//     const networkInterceptor = new NetworkInterceptor();

//     // Attach Logger and NetworkInterceptor to the page
//     test.step('Attach Logger and NetworkInterceptor to the page', async () => {
//         logger.attachToPage(page);
//         networkInterceptor.attachToPage(page);
//     });

//     test.step('Scroll to the instrument element', async () => {
//       const selectVerifications = await page.getByRole('cell', { name: CompleteVerification.selectVerification }).first();
//       await selectVerifications.scrollIntoViewIfNeeded();
//     });

//     test.step('Click on the instrument element', async () => {
//       const selectVerifications = await page.getByRole('cell', { name: CompleteVerification.selectVerification }).first();
//       await selectVerifications.click();
//     });

//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteVerification.screenShotsAfterClickInstruments, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByLabel(CompleteVerification.buttonName).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteVerification.screenShotsAfterClickCompleteVerification, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByLabel(CompleteVerification.buttonDecision).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteVerification.screenShotsForm, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('option', { name: CompleteVerification.buttonOptions.label, exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteVerification.screenShotsAfterClickDecision, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('button', { name: CompleteVerification.buttonAccept.label }).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteVerification.screenShotsJustificationPhraseEmpty, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//       await page.getByRole('textbox', { name: CompleteVerification.fldJustificationPhrase.label }).fill(CompleteVerification.fldJustificationPhrase.value);
//       await page.pause();
//       await page.pause();
//       await page.getByRole('button', { name: CompleteVerification.buttonCancel.label }).click();
//       await page.pause();
//       await page.pause();
//       await testInfo.attach(CompleteVerification.screenShotsCancel, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//     await page.pause();
//     await page.pause();

//     test.step('Log all captured logs and network data', async () => {
//       logger.printLogs();
//       networkInterceptor.printNetworkData();
//     });

//     // Fail the test if any console errors were captured
//     test.step('Verify no console errors', async () => {
//         expect(logger.errors.length).toBe(0);
//     });

//     // await page.close();
//   });


//   test('Trazit-Instruments-EventInProgress-CompleteCalibration-Accept', async ({ page }, testInfo) => {
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

//     test.step('Scroll to the instrument element', async () => {
//       const selectCalibrations = await page.getByRole('cell', { name: CompleteCalibration.selectCalibration }).first();
//       await selectCalibrations.scrollIntoViewIfNeeded();
//     });

//     test.step('Click on the instrument element', async () => {
//       const selectCalibrations = await page.getByRole('cell', { name: CompleteCalibration.selectCalibration }).first();
//       await selectCalibrations.click();
//     });

//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteCalibration.screenShotsAfterClickInstruments, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByLabel(CompleteCalibration.buttonName).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteCalibration.screenShotsAfterClickCompleteCalibration, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByLabel(CompleteCalibration.buttonDecision).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteCalibration.screenShotsForm, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('option', { name: CompleteCalibration.buttonOptions.label, exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteCalibration.screenShotsAfterClickDecision, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('button', { name: CompleteCalibration.buttonAccept.label }).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteCalibration.screenShotsJustificationPhraseEmpty, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//       await page.getByRole('textbox', { name: CompleteCalibration.fldJustificationPhrase.label }).fill(CompleteCalibration.fldJustificationPhrase.value);
//       await page.pause();
//       await page.pause();
//       await page.getByRole('button', { name: CompleteCalibration.buttonAccept.label }).first().click();
//       await page.pause();
//       await page.pause();
//       await testInfo.attach(CompleteCalibration.screenShotsAccept, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//     await page.pause();
//     await page.pause();

//     test.step('Log all captured logs and network data', async () => {
//       logger.printLogs();
//       networkInterceptor.printNetworkData();
//     });

//     // Fail the test if any console errors were captured
//     test.step('Verify no console errors', async () => {
//         expect(logger.errors.length).toBe(0);
//     });

//     afterEachData.textInNotif1=CompleteCalibration.textInNotif1
//     afterEachData.textInNotif2=CompleteCalibration.textInNotif2
//     afterEachData.textInNotif3=CompleteCalibration.textInNotif3
    
//         // Obtener el modo de dispositivo usando page.evaluate
//         const viewportWidth = await page.evaluate(() => {
//           return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
//       });
      
//       if (viewportWidth >= 1024) {
//           // Modo escritorio o tablet en modo paisaje
//           const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
//           if (notificationElement !== null) {
//           await notificationElement.hover();
//           }
//           await testInfo.attach(CompleteCalibration.screenformNotifications, {
//           body: await page.screenshot({ fullPage: true }),
//           contentType: ConfigSettingsAlternative.screenShotsContentType
//           });
//           const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
//           if (notificationDiv !== null) {
//           await testInfo.attach(CompleteCalibration.screenformLastNotifications, {
//               body: await notificationDiv.screenshot(),
//               contentType: ConfigSettingsAlternative.screenShotsContentType
//           });
//           }
//       } else if (viewportWidth >= 768 && viewportWidth < 1024) {
//           // Tablet en modo retrato
//           await page.click('mwc-icon-button.menu');
//           await page.click('mwc-list-item#dashboardnotifications');
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
//       }
//   });


//   test('Trazit-Instruments-EventInProgress-CompleteCalibration-Cancel', async ({ page }, testInfo) => {
//     // Create instances of Logger and NetworkInterceptor
//     const logger = new Logger();
//     const networkInterceptor = new NetworkInterceptor();

//     // Attach Logger and NetworkInterceptor to the page
//     test.step('Attach Logger and NetworkInterceptor to the page', async () => {
//         logger.attachToPage(page);
//         networkInterceptor.attachToPage(page);
//     });

//     test.step('Scroll to the instrument element', async () => {
//       const selectCalibrations = await page.getByRole('cell', { name: CompleteCalibration.selectCalibration }).first();
//       await selectCalibrations.scrollIntoViewIfNeeded();
//     });

//     test.step('Click on the instrument element', async () => {
//       const selectCalibrations = await page.getByRole('cell', { name: CompleteCalibration.selectCalibration }).first();
//       await selectCalibrations.click();
//     });

//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteCalibration.screenShotsAfterClickInstruments, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByLabel(CompleteCalibration.buttonName).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteCalibration.screenShotsAfterClickCompleteCalibration, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByLabel(CompleteCalibration.buttonDecision).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteCalibration.screenShotsForm, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('option', { name: CompleteCalibration.buttonOptions.label, exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteCalibration.screenShotsAfterClickDecision, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('button', { name: CompleteCalibration.buttonAccept.label }).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompleteCalibration.screenShotsJustificationPhraseEmpty, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//       await page.getByRole('textbox', { name: CompleteCalibration.fldJustificationPhrase.label }).fill(CompleteCalibration.fldJustificationPhrase.value);
//       await page.pause();
//       await page.pause();
//       await page.getByRole('button', { name: CompleteCalibration.buttonCancel.label }).first().click();
//       await page.pause();
//       await page.pause();
//       await testInfo.attach(CompleteCalibration.screenShotsCancel, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//     await page.pause();
//     await page.pause();

//     test.step('Log all captured logs and network data', async () => {
//       logger.printLogs();
//       networkInterceptor.printNetworkData();
//     });

//     // Fail the test if any console errors were captured
//     test.step('Verify no console errors', async () => {
//         expect(logger.errors.length).toBe(0);
//     });
// });


//   test('Trazit-Instruments-EventInProgress-CompletePreventiveMaintenance-Accept', async ({ page }, testInfo) => {
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

//     test.step('Scroll to the instrument element', async () => {
//       const selectPrevMaints = await page.getByRole('cell', { name: CompletePrevMaint.selectPrevMaint }).first();
//       await selectPrevMaints.scrollIntoViewIfNeeded();
//     });

//     test.step('Click on the instrument element', async () => {
//       const selectPrevMaints = await page.getByRole('cell', { name: CompletePrevMaint.selectPrevMaint }).first();
//       await selectPrevMaints.click();
//     });

//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompletePrevMaint.screenShotsAfterClickInstruments, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByLabel(CompletePrevMaint.buttonName).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompletePrevMaint.screenShotsAfterClickCompletePrevMaint, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByLabel(CompletePrevMaint.buttonDecision).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompletePrevMaint.screenShotsForm, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('option', { name: CompletePrevMaint.buttonOptions.label, exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompletePrevMaint.screenShotsAfterClickDecision, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('button', { name: CompletePrevMaint.buttonAccept.label }).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompletePrevMaint.screenShotsJustificationPhraseEmpty, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//       await page.getByRole('textbox', { name: CompletePrevMaint.fldJustificationPhrase.label }).fill(CompletePrevMaint.fldJustificationPhrase.value);
//       await page.pause();
//       await page.pause();
//       await page.getByRole('button', { name: CompletePrevMaint.buttonAccept.label }).first().click();
//       await page.pause();
//       await page.pause();
//       await testInfo.attach(CompletePrevMaint.screenShotsAccept, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//     await page.pause();
//     await page.pause();

//     test.step('Log all captured logs and network data', async () => {
//       logger.printLogs();
//       networkInterceptor.printNetworkData();
//     });

//     // Fail the test if any console errors were captured
//     test.step('Verify no console errors', async () => {
//         expect(logger.errors.length).toBe(0);
//     });

//     afterEachData.textInNotif1=CompletePrevMaint.textInNotif1
//     afterEachData.textInNotif2=CompletePrevMaint.textInNotif2
//     afterEachData.textInNotif3=CompletePrevMaint.textInNotif3
    
//         // Obtener el modo de dispositivo usando page.evaluate
//         const viewportWidth = await page.evaluate(() => {
//           return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
//       });
      
//       if (viewportWidth >= 1024) {
//           // Modo escritorio o tablet en modo paisaje
//           const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
//           if (notificationElement !== null) {
//           await notificationElement.hover();
//           }
//           await testInfo.attach(CompletePrevMaint.screenformNotifications, {
//           body: await page.screenshot({ fullPage: true }),
//           contentType: ConfigSettingsAlternative.screenShotsContentType
//           });
//           const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
//           if (notificationDiv !== null) {
//           await testInfo.attach(CompletePrevMaint.screenformLastNotifications, {
//               body: await notificationDiv.screenshot(),
//               contentType: ConfigSettingsAlternative.screenShotsContentType
//           });
//           }
//       } else if (viewportWidth >= 768 && viewportWidth < 1024) {
//           // Tablet en modo retrato
//           await page.click('mwc-icon-button.menu');
//           await page.click('mwc-list-item#dashboardnotifications');
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
//       }
//   });


//   test('Trazit-Instruments-EventInProgress-CompletePreventiveMaintenance-Cancel', async ({ page }, testInfo) => {
    
//     // Create instances of Logger and NetworkInterceptor
//     const logger = new Logger();
//     const networkInterceptor = new NetworkInterceptor();

//     // Attach Logger and NetworkInterceptor to the page
//     test.step('Attach Logger and NetworkInterceptor to the page', async () => {
//         logger.attachToPage(page);
//         networkInterceptor.attachToPage(page);
//     });

//     test.step('Scroll to the instrument element', async () => {
//       const selectPrevMaints = await page.getByRole('cell', { name: CompletePrevMaint.selectPrevMaint }).first();
//       await selectPrevMaints.scrollIntoViewIfNeeded();
//     });

//     test.step('Click on the instrument element', async () => {
//       const selectPrevMaints = await page.getByRole('cell', { name: CompletePrevMaint.selectPrevMaint }).first();
//       await selectPrevMaints.click();
//     });

//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompletePrevMaint.screenShotsAfterClickInstruments, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByLabel(CompletePrevMaint.buttonName).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompletePrevMaint.screenShotsAfterClickCompletePrevMaint, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByLabel(CompletePrevMaint.buttonDecision).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompletePrevMaint.screenShotsForm, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('option', { name: CompletePrevMaint.buttonOptions.label, exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompletePrevMaint.screenShotsAfterClickDecision, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('button', { name: CompletePrevMaint.buttonAccept.label }).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(CompletePrevMaint.screenShotsJustificationPhraseEmpty, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//       await page.getByRole('textbox', { name: CompletePrevMaint.fldJustificationPhrase.label }).fill(CompletePrevMaint.fldJustificationPhrase.value);
//       await page.pause();
//       await page.pause();
//       await page.getByRole('button', { name: CompletePrevMaint.buttonCancel.label }).click();

//       await page.pause();
//       await page.pause();
//       await testInfo.attach(CompletePrevMaint.screenShotsCancel, {
//         body: await page.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//     await page.pause();
//     await page.pause();

//     test.step('Log all captured logs and network data', async () => {
//       logger.printLogs();
//       networkInterceptor.printNetworkData();
//     });

//     // Fail the test if any console errors were captured
//     test.step('Verify no console errors', async () => {
//         expect(logger.errors.length).toBe(0);
//     });

//   });
// }




// test.describe('Desktop Mode', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//       await page.setViewportSize({ width: 1365, height: 821 });
//       const logPlat = new LogIntoPlatform({ page });
//       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow = new OpenProcedureWindow({ page });
//       await page.waitForTimeout(3000);
//       await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.main, MenuInstrumentsControl.Instruments.EventInProgress);
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
// //       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.EventInProgress);
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
// //       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.EventInProgress);
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
// //       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.EventInProgress);
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
// //       await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.main, MenuInstrumentsControl.Instruments.EventInProgress);
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
