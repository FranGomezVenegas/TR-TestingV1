import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { MenuInstrumentsControl } from '../../trazit-models/test-config-instruments-global';
import { ReOpen, verification, service, calibration, prevMaint, Audit } from '../../trazit-models/test-config-instruments-StarteventInProgress';
import { Activate } from '../../trazit-models/test-config-instruments-activate';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

import { Logger, NetworkInterceptor } from '../1TRAZiT-Commons/consoleInterceptionAndRequestResponse';


// Function with all tests.
const commonTests = () => {
  test('Trazit-Instruments-ActiveInstruments-Calibration', async ({ page }, testInfo) => {
    let afterEachData = {
      textInNotif1: "",
      textInNotif2: "",
      textInNotif3: "",
    };

    // Create instances of Logger and NetworkInterceptor
    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();

    // Attach Logger and NetworkInterceptor to the page
    test.step('Attach Logger and NetworkInterceptor to the page', async () => {
        logger.attachToPage(page);
        networkInterceptor.attachToPage(page);
    });

    await page.getByText(Activate.selectInstrument, { exact: true }).click();

    //await page.getByText(calibration.selectInstrument, { exact: true }).click();
    await page.getByTitle(calibration.buttonName).getByRole('img').click();
    await page.pause();
    await page.pause();
    await testInfo.attach(calibration.screenShotsAfterClickButton, {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType,
    });
    await page.getByRole('button', { name: Activate.buttonAccept.label }).click();
    await testInfo.attach(Activate.screenShotsAccept, {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType,
    });

    test.step('Log all captured logs and network data', async () => {
        logger.printLogs();
        networkInterceptor.printNetworkData();
    });

    // Fail the test if any console errors were captured, excluding 404 errors
    test.step('Verify no console errors except 404', async () => {
        const non404Errors = logger.errors.filter(error => !error.message.includes('404'));
        expect(non404Errors.length).toBe(0);
    });

    afterEachData.textInNotif1 = calibration.textInNotif1;
    afterEachData.textInNotif2 = calibration.textInNotif2;
    afterEachData.textInNotif3 = calibration.textInNotif3;

    // Obtener el modo de dispositivo usando page.evaluate
    const viewportWidth = await page.evaluate(() => {
        return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    });

    if (viewportWidth >= 1024) {
        // Modo escritorio o tablet en modo paisaje
        const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
        if (notificationElement !== null) {
            await notificationElement.hover();
        }
        await testInfo.attach(calibration.screenformNotifications, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType,
        });
        const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
        if (notificationDiv !== null) {
            await testInfo.attach(calibration.screenformLastNotifications, {
                body: await notificationDiv.screenshot(),
                contentType: ConfigSettingsAlternative.screenShotsContentType,
            });
        }
    } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        // Tablet en modo retrato
        await page.click('mwc-icon-button.menu');
        await page.click('mwc-list-item#dashboardnotifications');
        await testInfo.attach('TabletNotifications', {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType,
        });
    } else {
        // Modo móvil
        await page.click('mwc-icon-button.menu');
        await page.click('mwc-list-item#dashboardnotifications');
        await testInfo.attach('NotificationsMobile', {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType,
        });
    }
});


  test('Trazit-Instruments-ActiveInstruments-Service', async ({ page }, testInfo) => {
    let afterEachData = {
      textInNotif1:"",
      textInNotif2:"",
      textInNotif3:"",
    }

    // Create instances of Logger and NetworkInterceptor
    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();

    // Attach Logger and NetworkInterceptor to the page
    test.step('Attach Logger and NetworkInterceptor to the page', async () => {
        logger.attachToPage(page);
        networkInterceptor.attachToPage(page);
    });

    await page.getByText(Activate.selectInstrument, { exact: true }).click();
    await page.pause();
    await page.pause();
    
    await page.getByTitle(service.buttonName).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(service.screenShotsAfterClickButton, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByRole('button', { name: Activate.buttonAccept.label }).click();
    await testInfo.attach(Activate.screenShotsAccept, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });

    test.step('Log all captured logs and network data', async () => {
        logger.printLogs();
        networkInterceptor.printNetworkData();
    });

    // Fail the test if any console errors were captured, excluding 404 errors
    test.step('Verify no console errors except 404', async () => {
        const non404Errors = logger.errors.filter(error => !error.message.includes('404'));
        expect(non404Errors.length).toBe(0);
    });


    afterEachData.textInNotif1=service.textInNotif1
    afterEachData.textInNotif2=service.textInNotif2
    afterEachData.textInNotif3=service.textInNotif3
    // Obtener el modo de dispositivo usando page.evaluate
    const viewportWidth = await page.evaluate(() => {
      return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    });

  if (viewportWidth >= 1024) {
      // Modo escritorio o tablet en modo paisaje
      const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
      if (notificationElement !== null) {
      await notificationElement.hover();
      }
      await testInfo.attach(service.screenformNotifications, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
      });
      const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
      if (notificationDiv !== null) {
      await testInfo.attach(service.screenformLastNotifications, {
          body: await notificationDiv.screenshot(),
          contentType: ConfigSettingsAlternative.screenShotsContentType
      });
      }
  } else if (viewportWidth >= 768 && viewportWidth < 1024) {
      // Tablet en modo retrato
      
      await page.click('mwc-icon-button.menu');
      await page.click('mwc-list-item#dashboardnotifications');
      await testInfo.attach('TabletNotifications', {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
      });
  } else {
      // Modo móvil
      await page.click('mwc-icon-button.menu');
      await page.click('mwc-list-item#dashboardnotifications');
      await testInfo.attach('NotificationsMobile', {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
      });
  }
  });


  test('Trazit-Instruments-ActiveInstruments-Verification', async ({ page }, testInfo) => {
    await page.pause();
    let afterEachData = {
      textInNotif1:"",
      textInNotif2:"",
      textInNotif3:"",
    }

    // Create instances of Logger and NetworkInterceptor
    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();

    // Attach Logger and NetworkInterceptor to the page
    test.step('Attach Logger and NetworkInterceptor to the page', async () => {
        logger.attachToPage(page);
        networkInterceptor.attachToPage(page);
    });

    await page.getByText(Activate.selectInstrument, { exact: true }).click();  
    await page.pause();
    await page.pause(); 
    await testInfo.attach(Activate.screenShotsSelectInstruments, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });  
    await page.getByTitle(verification.buttonName).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(verification.screenShotsAfterClickButton, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    
    await page.getByRole('button', { name: Activate.buttonAccept.label }).click();
    await testInfo.attach(Activate.screenShotsAccept, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });

    test.step('Log all captured logs and network data', async () => {
        logger.printLogs();
        networkInterceptor.printNetworkData();
    });

    // Fail the test if any console errors were captured, excluding 404 errors
    test.step('Verify no console errors except 404', async () => {
        const non404Errors = logger.errors.filter(error => !error.message.includes('404'));
        expect(non404Errors.length).toBe(0);
    });


    afterEachData.textInNotif1=verification.textInNotif1
    afterEachData.textInNotif2=verification.textInNotif2
    afterEachData.textInNotif3=verification.textInNotif3
    
    // Obtener el modo de dispositivo usando page.evaluate
    const viewportWidth = await page.evaluate(() => {
      return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  });

  if (viewportWidth >= 1024) {
      // Modo escritorio o tablet en modo paisaje
      const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
      if (notificationElement !== null) {
      await notificationElement.hover();
      }
      await testInfo.attach(verification.screenformNotifications, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
      });
      const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
      if (notificationDiv !== null) {
      await testInfo.attach(verification.screenformLastNotifications, {
          body: await notificationDiv.screenshot(),
          contentType: ConfigSettingsAlternative.screenShotsContentType
      });
      }
  } else if (viewportWidth >= 768 && viewportWidth < 1024) {
      // Tablet en modo retrato
      
      await page.click('mwc-icon-button.menu');
      await page.click('mwc-list-item#dashboardnotifications');
      await testInfo.attach('TabletNotifications', {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
      });
  } else {
      // Modo móvil
      await page.click('mwc-icon-button.menu');
      await page.click('mwc-list-item#dashboardnotifications');
      await testInfo.attach('NotificationsMobile', {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
      });
    }
  });


  test('Trazit-Instruments-ActiveInstruments-PrevMaint', async ({ page }, testInfo) => {
    let afterEachData = {
      textInNotif1:"",
      textInNotif2:"",
      textInNotif3:"",
    }
    
    // Create instances of Logger and NetworkInterceptor
    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();

    // Attach Logger and NetworkInterceptor to the page
    test.step('Attach Logger and NetworkInterceptor to the page', async () => {
        logger.attachToPage(page);
        networkInterceptor.attachToPage(page);
    });

    await page.getByText(Activate.selectInstrument, { exact: true }).click();    
    await page.pause();
    await page.pause();
    await testInfo.attach(Activate.screenShotsSelectInstruments, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByTitle(prevMaint.buttonName).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(prevMaint.screenShotsAfterClickButton, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });

    await page.getByRole('button', { name: Activate.buttonAccept.label }).click();
    await testInfo.attach(Activate.screenShotsAccept, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });

    test.step('Log all captured logs and network data', async () => {
      logger.printLogs();
      networkInterceptor.printNetworkData();
    });

    // Fail the test if any console errors were captured, excluding 404 errors
    test.step('Verify no console errors except 404', async () => {
        const non404Errors = logger.errors.filter(error => !error.message.includes('404'));
        expect(non404Errors.length).toBe(0);
    });

    afterEachData.textInNotif1=prevMaint.textInNotif1
    afterEachData.textInNotif2=prevMaint.textInNotif2
    afterEachData.textInNotif3=prevMaint.textInNotif3
    
    // Obtener el modo de dispositivo usando page.evaluate
    const viewportWidth = await page.evaluate(() => {
      return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  });

  if (viewportWidth >= 1024) {
      // Modo escritorio o tablet en modo paisaje
      const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
      if (notificationElement !== null) {
      await notificationElement.hover();
      }
      await testInfo.attach(prevMaint.screenformNotifications, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
      });
      const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
      if (notificationDiv !== null) {
      await testInfo.attach(prevMaint.screenformLastNotifications, {
          body: await notificationDiv.screenshot(),
          contentType: ConfigSettingsAlternative.screenShotsContentType
      });
      }
  } else if (viewportWidth >= 768 && viewportWidth < 1024) {
      // Tablet en modo retrato
      
      await page.click('mwc-icon-button.menu');
      await page.click('mwc-list-item#dashboardnotifications');
      await testInfo.attach('TabletNotifications', {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
      });
  } else {
      // Modo móvil
      await page.click('mwc-icon-button.menu');
      await page.click('mwc-list-item#dashboardnotifications');
      await testInfo.attach('NotificationsMobile', {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
      });
    }
  });


  test('Trazit-Instruments-ActiveInstruments-Audit', async ({ page }, testInfo) => {
    await page.pause();
    await page.pause();

    let afterEachData = {
      textInNotif1:"",
      textInNotif2:"",
      textInNotif3:"",
    }
    // Create instances of Logger and NetworkInterceptor
    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();

    // Attach Logger and NetworkInterceptor to the page
    test.step('Attach Logger and NetworkInterceptor to the page', async () => {
        logger.attachToPage(page);
        networkInterceptor.attachToPage(page);
    });
    
    await page.getByText(Activate.selectInstrument, { exact: true }).click();    
    await page.waitForTimeout(2000);
    await page.pause();
    await page.pause();
    await testInfo.attach(Audit.screenShotsSelectName, {
      body: await page.screenshot({fullPage: true }), 
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.waitForTimeout(2000);
    await page.pause()
    await page.pause();
    await page.getByLabel(Audit.buttonAudit).click();
    await page.pause();
    await page.pause();
    await page.waitForTimeout(2000);

    await testInfo.attach(Audit.screenShotsAudit, {
      body: await page.screenshot({fullPage: true }), 
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.pause();
    await page.waitForTimeout(2000);
  
    // Intentar hacer clic en el icono del tooltip usando EOS, para firmar el sample que queremos.
    const tooltipIcon = await page.locator(Audit.sign);
    await page.waitForTimeout(2000);

    await page.pause();
    if (await tooltipIcon.isVisible()) {
        await page.pause();
    await page.waitForTimeout(3000);
        await tooltipIcon.click();
        await page.pause();
        await page.pause();
        await page.waitForTimeout(3000);
        await testInfo.attach(Audit.screenShotsSign, {
          body: await page.screenshot({fullPage: true }), 
          contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    } else {
        console.log(Audit.messageError);
    }
    await page.waitForTimeout(3000);
    await page.pause();
    await page.pause();
    await page.pause();
    await page.waitForTimeout(3000);
    await page.getByRole('textbox', { name: Audit.justificationPrase.label}).fill(Audit.justificationPrase.value);
    await page.pause();
    await page.pause();
    await page.getByRole('button', { name: Audit.buttonAccept, exact: true}).click();
    await page.pause();
    await page.pause();
    await page.waitForTimeout(3000);

    await testInfo.attach(Audit.screenShotsAccept, {
      body: await page.screenshot({fullPage: true }), 
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });

    test.step('Log all captured logs and network data', async () => {
      logger.printLogs();
      networkInterceptor.printNetworkData();
    });

    // Fail the test if any console errors were captured
    test.step('Verify no console errors', async () => {
        expect(logger.errors.length).toBe(0);
    });


    afterEachData.textInNotif1=Audit.textInNotif1
    afterEachData.textInNotif2=Audit.textInNotif2
    afterEachData.textInNotif3=Audit.textInNotif3
    
    // Obtener el modo de dispositivo usando page.evaluate
    const viewportWidth = await page.evaluate(() => {
        return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    });
    
    if (viewportWidth >= 1024) {
        // Modo escritorio o tablet en modo paisaje
        const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
        if (notificationElement !== null) {
        await notificationElement.hover();
        }
        await testInfo.attach(Audit.screenformNotifications, {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
        if (notificationDiv !== null) {
        await testInfo.attach(Audit.screenformLastNotifications, {
            body: await notificationDiv.screenshot(),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        }
    } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        // Tablet en modo retrato
        await page.click('mwc-icon-button.menu');
        await page.click('mwc-list-item#dashboardnotifications');
        await testInfo.attach('TabletNotifications', {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    } else {
        // Modo móvil
        await page.click('mwc-icon-button.menu');
        await page.click('mwc-list-item#dashboardnotifications');
        await testInfo.attach('NotificationsMobile', {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    }

  });
}



test.describe('Desktop Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
      await page.pause();
      await page.pause();
      await page.pause();
      await page.setViewportSize({ width: 1365, height: 821 });
      const logPlat = new LogIntoPlatform({ page });
      const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
      await page.waitForTimeout(3000);
      const openWindow = new OpenProcedureWindow({ page });
      await page.waitForTimeout(3000);
      await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.main, MenuInstrumentsControl.Instruments.activeInstrument);
  });
  commonTests();
});

// test.describe('Mobile mode', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//       await page.setViewportSize({ width: 385, height: 812 });
//       const logPlat = new LogIntoPlatform({ page });
//       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow = new OpenProcedureWindow({ page });
//       await page.waitForTimeout(3000);
//       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.activeInstrument);
//   });
//   commonTests();
// });

// test.describe('Mobile mode Retrato', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//       await page.setViewportSize({ width: 812, height: 385 });
//       const logPlat = new LogIntoPlatform({ page });
//       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow = new OpenProcedureWindow({ page });
//       await page.waitForTimeout(3000);
//       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.activeInstrument);
//   });
//   commonTests();
// });

// test.describe('Tablets mode', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//       await page.setViewportSize({ width: 768, height: 1024 });
//       const logPlat = new LogIntoPlatform({ page });
//       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow = new OpenProcedureWindow({ page });
//       await page.waitForTimeout(3000);
//       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.activeInstrument);
//   });
//   commonTests();
// });

// test.describe('Tablets mode Retrato', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//       await page.setViewportSize({ width: 1024, height: 768 });
//       const logPlat = new LogIntoPlatform({ page });
//       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow = new OpenProcedureWindow({ page });
//       await page.waitForTimeout(3000);
//       await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.activeInstrument);
//   });
//   commonTests();
// });


const { test: pwTest, afterEach } = require('@playwright/test');

afterEach(async ({}, testInfo) => {
  
  const durationInSeconds = (testInfo.duration / 1000).toFixed(2);

  const data = {
    test_name: testInfo.title,
    duration: `${durationInSeconds} seconds`,
  };

  const testStatus = testInfo.status;
  await callApiRunCompletion(data, testStatus);
});


pwTest('Example test', async ({ page }) => {
    // Tu lógica de prueba aquí
});
