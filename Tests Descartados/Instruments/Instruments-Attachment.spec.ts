// import { test, expect } from '@playwright/test';
// import { platformMenuNames } from '../../trazit-config';
// import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
// import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

// import { MenuInstrumentsControl } from '../../trazit-models/test-config-instruments-global';
// import { addAttachment, openAttachment, removeAttachment } from '../../trazit-models/test-config-instruments-attachment';

// import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
// import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
// import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

// import { Logger, NetworkInterceptor } from '../1TRAZiT-Commons/consoleInterceptionAndRequestResponse';


// // Function with all tests.
// const commonTests = () => {
//   test('Trazit-Instruments-Add_Attachment-Cancel', async ({ page }, testInfo) => {
//     // Create instances of Logger and NetworkInterceptor
//     const logger = new Logger();
//     const networkInterceptor = new NetworkInterceptor();

//     // Attach Logger and NetworkInterceptor to the page
//     test.step('Attach Logger and NetworkInterceptor to the page', async () => {
//         logger.attachToPage(page);
//         networkInterceptor.attachToPage(page);
//     });

//     test.step('Scroll to the instrument element', async () => {
//       const instrumentElement = await page.getByText(addAttachment.selectInstrument, { exact: true });
//       await instrumentElement.scrollIntoViewIfNeeded();
//     });

//     test.step('Click on the instrument element', async () => {
//         const instrumentElement = await page.getByText(addAttachment.selectInstrument, { exact: true });
//         await instrumentElement.click();
//     });
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(addAttachment.buttonName).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(addAttachment.screenShotsFormFilled, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });

//     await page.getByLabel(addAttachment.fldUrl.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(addAttachment.fldUrl.label).fill(addAttachment.fldUrl.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(addAttachment.fldTittle.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(addAttachment.fldTittle.label).press(addAttachment.fldTittle.actionName);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(addAttachment.fldTittle.label).fill(addAttachment.fldTittle.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(addAttachment.fldTittle.label).press(addAttachment.fldTittle.actionName);
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(addAttachment.screenShotsAfterTheForm, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('button', { name: addAttachment.buttonCancel.label }).click();
//     await testInfo.attach(addAttachment.sscreenShostsAfterCancel, {
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

//     // await page.close();
//   });


//   test('Trazit-Instruments-Add_Attachment-Accept', async ({ page }, testInfo) => {
//     let afterEachData = {
//       textInNotif1: "",
//       textInNotif2: "",
//       textInNotif3: "",
//     };
//     // Create instances of Logger and NetworkInterceptor
//     const logger = new Logger();
//     const networkInterceptor = new NetworkInterceptor();

//     // Attach Logger and NetworkInterceptor to the page
//     test.step('Attach Logger and NetworkInterceptor to the page', async () => {
//         logger.attachToPage(page);
//         networkInterceptor.attachToPage(page);
//     });

//     await page.getByText(addAttachment.selectInstrument, { exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(addAttachment.buttonName).click();
//     await page.pause();
//     await page.pause();
//     // await testInfo.attach(addAttachment.screenShotsAfterTheFormt, {
//     //   body: await page.screenshot({ fullPage: true }),
//     //   contentType: ConfigSettingsAlternative.screenShotsContentType
//     // });

//     await page.getByLabel(addAttachment.fldUrl.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(addAttachment.fldUrl.label).fill(addAttachment.fldUrl.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(addAttachment.fldTittle.label).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(addAttachment.fldTittle.label).press(addAttachment.fldTittle.actionName);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(addAttachment.fldTittle.label).fill(addAttachment.fldTittle.value);
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(addAttachment.fldTittle.label).press(addAttachment.fldTittle.actionName);
//     await page.pause();
//     await page.pause();
//     // await testInfo.attach(addAttachment.screenShotsFormFilled, {
//     //   body: await page.screenshot({ fullPage: true }),
//     //   contentType: ConfigSettingsAlternative.screenShotsContentType
//     // });

//     await page.getByRole('button', { name: addAttachment.buttonAccept.label }).click();
//     await page.pause();
//     await page.pause();
//     // await testInfo.attach(addAttachment.screenShostsAfterAcceptTheForm, {
//     //   body: await page.screenshot({ fullPage: true }),
//     //   contentType: ConfigSettingsAlternative.screenShotsContentType
//     // });

//     test.step('Log all captured logs and network data', async () => {
//       logger.printLogs();
//       networkInterceptor.printNetworkData();
//     });

//     // Fail the test if any console errors were captured
//     test.step('Verify no console errors', async () => {
//         expect(logger.errors.length).toBe(0);
//     });
//     await page.pause();
//     await page.pause();
//     await page.pause();
	

//     afterEachData.textInNotif1 = addAttachment.textInNotif1;
//     afterEachData.textInNotif2 = addAttachment.textInNotif2;
//     afterEachData.textInNotif3 = addAttachment.textInNotif3;


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
//     await page.pause();
//     await page.pause();
//     await page.pause();
//     await page.pause();
//     await page.pause();
//     await page.pause();
	  
//       // await testInfo.attach(addAttachment.screenformNotifications, {
//       // body: await page.screenshot({ fullPage: true }),
//       // contentType: ConfigSettingsAlternative.screenShotsContentType
//       // });
//       // const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
//       // if (notificationDiv !== null) {
//       // await testInfo.attach(addAttachment.screenformLastNotifications, {
//       //     body: await notificationDiv.screenshot(),
//       //     contentType: ConfigSettingsAlternative.screenShotsContentType
//       // });
//       // }
//   } else if (viewportWidth >= 768 && viewportWidth < 1024) {
//       // Tablet en modo retrato
      
//       await page.click('md-filled-icon-button.menu');
//       await page.click('md-list-item#dashboardnotifications');
//       // await testInfo.attach('Tablet Notifications', {
//       // body: await page.screenshot({ fullPage: true }),
//       // contentType: ConfigSettingsAlternative.screenShotsContentType
//       // });
//     await page.pause();
//     await page.pause();
//     await page.pause();
//     await page.pause();
//     await page.pause();
//     await page.pause();
	  
//   } else {
//       // Modo móvil
//       await page.click('md-filled-icon-button.menu');
//       await page.click('md-list-item#dashboardnotifications');
//       // await testInfo.attach('Notifications Mobile', {
//       // body: await page.screenshot({ fullPage: true }),
//       // contentType: ConfigSettingsAlternative.screenShotsContentType
//       // });
//     await page.pause();
//     await page.pause();
//     await page.pause();
//     await page.pause();
//     await page.pause();
//     await page.pause();
	  
//   }
// })

// test('Trazit-Instruments-OpenAttachment', async ({ page }, testInfo) => {
//   // Create instances of Logger and NetworkInterceptor
//   const logger = new Logger();
//   const networkInterceptor = new NetworkInterceptor();

//   // Attach Logger and NetworkInterceptor to the page
//   test.step('Attach Logger and NetworkInterceptor to the page', async () => {
//       logger.attachToPage(page);
//       networkInterceptor.attachToPage(page);
//   });

//   // Paso 1: Hacer clic en la celda específica con nombre exacto "w"
//   await test.step('Click on the specific cell with exact name', async () => {
//     await page.getByText(openAttachment.selectInstrument, { exact: true }).click();
//   });
//   // Paso 2: Hacer clic en el label de "attach file"
//   await test.step('Click on the attach file label and capture screenshot', async () => {
//     // Hacer clic en el label de "attach file"
//     await page.getByLabel(openAttachment.buttonName).click();

//     // Esperar un breve momento para asegurar que la acción se haya completado
//     await page.waitForTimeout(2000); // Espera 2 segundos (ajusta según sea necesario)

//     // Capturar la pantalla después de hacer clic
//     await testInfo.attach(openAttachment.screenShotsButton, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType,
//     });

//     // Añadir otra pausa si es necesario
//     await page.waitForTimeout(2000); // Espera 2 segundos (ajusta según sea necesario)
//   });

//   // Crear un nuevo contexto de navegador para `page1`
//   const browser = page.context().browser();
//   if (browser) {
//     const context = await browser.newContext();
//     const page1 = await context.newPage();

//     // Paso 3: Navegar a Google en `page1`
//     await test.step('Navigate to Google on page1', async () => {
//       await page1.goto(openAttachment.url);
//     });

//     // Paso 4: Aceptar todas las cookies en la página de Google
//     await test.step('Scroll to and accept all cookies on Google page', async () => {
//       const acceptButton = page1.getByRole('button', { name: openAttachment.acceptGoogle });
      
//       // Desplazar la página para asegurar que el botón sea visible
//       await acceptButton.scrollIntoViewIfNeeded();
      
//       // Esperar a que el botón esté disponible y hacer clic
//       await acceptButton.click();
//     });

//     // Paso 5: Capturar captura de pantalla de `page1`
//     await test.step('Capture screenshot of page1', async () => {
//       await testInfo.attach(openAttachment.screenShotsUrl, {
//         body: await page1.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType,
//       });
//     });

//     test.step('Log all captured logs and network data', async () => {
//       logger.printLogs();
//       networkInterceptor.printNetworkData();
//     });

//     // Fail the test if any console errors were captured
//     test.step('Verify no console errors', async () => {
//         expect(logger.errors.length).toBe(0);
//     });

//   } else {
//     throw new Error(openAttachment.error);
//   }
// });


// test('Trazit-Instruments-Remove_Attachment-Cancel', async ({ page }, testInfo) => {
//   // Create instances of Logger and NetworkInterceptor
//   const logger = new Logger();
//   const networkInterceptor = new NetworkInterceptor();

//   // Attach Logger and NetworkInterceptor to the page
//   test.step('Attach Logger and NetworkInterceptor to the page', async () => {
//       logger.attachToPage(page);
//       networkInterceptor.attachToPage(page);
//   });

//   await page.getByText(removeAttachment.selectInstrument, { exact: true }).click();
//   await page.pause();
//   await page.pause();
//   await page.getByLabel(removeAttachment.buttonName).click();
//   await page.pause();
//   await page.pause();
//   await testInfo.attach(removeAttachment.screenShotsFormEmpty, {
//     body: await page.screenshot({ fullPage: true }),
//     contentType: ConfigSettingsAlternative.screenShotsContentType
//   });
//   await page.getByText('Google', {exact: true}).first().click();
//   await page.pause();
//   await page.pause();
//   await testInfo.attach(removeAttachment.screenShotsFormFilled, {
//     body: await page.screenshot({ fullPage: true }),
//     contentType: ConfigSettingsAlternative.screenShotsContentType
//   });
//   await page.getByRole('button', { name: removeAttachment.buttonCancel.label, exact: true }).click();
//   await page.pause();
//   await page.pause();
//   await testInfo.attach(removeAttachment.screenShostsAfterCancel, {
//     body: await page.screenshot({ fullPage: true }),
//     contentType: ConfigSettingsAlternative.screenShotsContentType
//   });
//   test.step('Log all captured logs and network data', async () => {
//     logger.printLogs();
//     networkInterceptor.printNetworkData();
//   });

//   // Fail the test if any console errors were captured
//   test.step('Verify no console errors', async () => {
//       expect(logger.errors.length).toBe(0);
//   });

// });



//   test('Trazit-Instruments-Remove_Attachment-Accept', async ({ page }, testInfo) => {
//     let afterEachData = {
//       textInNotif1: "",
//       textInNotif2: "",
//     };

//     // Create instances of Logger and NetworkInterceptor
//     const logger = new Logger();
//     const networkInterceptor = new NetworkInterceptor();

//     // Attach Logger and NetworkInterceptor to the page
//     test.step('Attach Logger and NetworkInterceptor to the page', async () => {
//         logger.attachToPage(page);
//         networkInterceptor.attachToPage(page);
//     });

//     await page.getByText(removeAttachment.selectInstrument, { exact: true }).click();
//     await page.pause();
//     await page.pause();
//     await page.getByLabel(removeAttachment.buttonName).click();
//     await page.pause();
//     await page.pause();

//     await testInfo.attach(removeAttachment.screenShotsFormEmpty, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });

//     await page.getByText('Google', {exact: true}).first().click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(removeAttachment.screenShotsFormFilled, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('button', { name: removeAttachment.buttonAccept.label }).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(removeAttachment.screenShostsAfterAccept, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//     });
//     await page.getByRole('button', { name: removeAttachment.buttonAccept.label }).nth(1).click();
//     await page.pause();
//     await page.pause();
//     await testInfo.attach(removeAttachment.screenShostsAfterAccept, {
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

//     afterEachData.textInNotif1 = removeAttachment.textInNotif1;
//     afterEachData.textInNotif2 = removeAttachment.textInNotif2;


//     // Obtener el modo de dispositivo usando page.evaluate
//     const viewportWidth = await page.evaluate(() => {
//       return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
//     });

//     if (viewportWidth >= 1024) {
//       // Modo escritorio o tablet en modo paisaje
//       const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
//       if (notificationElement !== null) {
//       await notificationElement.hover();
//       }
//       await testInfo.attach(removeAttachment.screenformNotifications, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//       const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
//       if (notificationDiv !== null) {
//       await testInfo.attach(removeAttachment.screenformLastNotifications, {
//           body: await notificationDiv.screenshot(),
//           contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//       }
//     } else if (viewportWidth >= 768 && viewportWidth < 1024) {
//       // Tablet en modo retrad
//       await page.click('mwc-icon-button.menu');
//       await page.click('mwc-list-item#dashboardnotifications');
//       await testInfo.attach('TabletNotifications', {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
//     } else {
//       // Modo móvil
//       await page.click('mwc-icon-button.menu');
//       await page.click('mwc-list-item#dashboardnotifications');
//       await testInfo.attach('NotificationsMobile', {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType
//       });
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
//     await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.main, MenuInstrumentsControl.Instruments.activeInstrument);
//   });
//   commonTests();
// });

// test.describe('Mobile Mode', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//     await page.setViewportSize({ width: 385, height: 812 });
//     const logPlat = new LogIntoPlatform({ page });
//     const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
//     const openWindow = new OpenProcedureWindow({ page });
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.activeInstrument);
//   });
//   commonTests();
// });

// test.describe('Mobile Mode Retrato', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//     await page.setViewportSize({ width: 812, height: 385 });
//     const logPlat = new LogIntoPlatform({ page });
//     const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
//     const openWindow = new OpenProcedureWindow({ page });
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.activeInstrument);
//   });
//   commonTests();
// });

// test.describe('Tablets Mode', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//     await page.setViewportSize({ width: 768, height: 1024 });
//     const logPlat = new LogIntoPlatform({ page });
//     const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
//     const openWindow = new OpenProcedureWindow({ page });
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.activeInstrument);
//   });
//   commonTests();
// });

// test.describe('Tablets Mode Retrato', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//     await page.setViewportSize({ width: 1024, height: 768 });
//     const logPlat = new LogIntoPlatform({ page });
//     const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
//     const openWindow = new OpenProcedureWindow({ page });
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.main, MenuInstrumentsControl.Instruments.activeInstrument);
//   });
//   commonTests();
// });

// const { test: pwTest, afterEach } = require('@playwright/test');

// afterEach(async ({}, testInfo) => {
  
//   const durationInSeconds = (testInfo.duration / 1000).toFixed(2);

//   const data = {
//     test_name: testInfo.title,
//     duration: `${durationInSeconds} seconds`,
//   };

//   const testStatus = testInfo.status;
//   //await callApiRunCompletion(data, testStatus);
// });

// pwTest('Example test', async ({ page }) => {
//   // Tu lógica de prueba aquí
// });