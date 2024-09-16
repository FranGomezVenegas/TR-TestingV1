import { test, expect } from '@playwright/test';
import {  platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { MenuStock } from '../../trazit-models/test-config-stock-global';
import { reopenQualification } from '../../trazit-models/test-config-StockControl-EventsInProgress-ReopenQualification';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import {ConfirmDialogController} from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';


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

//Function with all tests.
const commonTests = () => {
  test('Trazit-StockControl-QualificationInProgress-Open', async ({ page }, testInfo) => {
      await page.pause();
      await page.close();
  })


  test('Trazit-StockControl-QualificationInProgress-ReopenQualification-Accept', async ({ page }, testInfo) => {
      let afterEachData = {
          textInNotif1:"",
          textInNotif2:"",
          textInNotif3:"",
      }

      await page.pause();
      await page.pause();
      await page.getByLabel(reopenQualification.buttonReopenQualification).click();
      await page.pause();
      await page.pause();
      await testInfo.attach(reopenQualification.screenShotsBeforeClickReopenQualification, {
          body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
      await page.pause();
      await page.locator(reopenQualification.refresh.label).getByLabel(reopenQualification.refresh.value).click();
      await page.pause();
      await page.pause();
      await testInfo.attach(reopenQualification.screenShotsFormEmpty, {
          body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
      await page.pause();
      await page.getByLabel(reopenQualification.fldNumberOfDays.label).fill(reopenQualification.fldNumberOfDays.value);
      await page.pause();
      await page.pause();
      // await page.getByLabel(reopenQualification.buttonReopenOpen).click();
      // await page.pause();
      // await page.pause();
      // await page.getByRole('option', { name: reopenQualification.option.label }).locator(reopenQualification.option.locator).click();
      // await page.pause();
      // await page.pause();
      await page.getByRole('button', { name: reopenQualification.buttonAccept.label }).click();
      await page.pause();
      await page.pause();
      await testInfo.attach(reopenQualification.screenResult, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
      await page.pause();
      await page.pause();
      await page.getByRole('button', { name: reopenQualification.buttonAccept.label }).click();

      
      afterEachData.textInNotif1=reopenQualification.textInNotif1
      afterEachData.textInNotif2=reopenQualification.textInNotif2
      afterEachData.textInNotif3=reopenQualification.textInNotif3

      // Obtener el modo de dispositivo usando page.evaluate
  const viewportWidth = await page.evaluate(() => {
    return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  });

  if (viewportWidth >= 1024) {
    // Modo escritorio o tablet en modo paisaje
    const notificationElement = await page.locator(MenuStock.Notification.main.pageElement);
    if (notificationElement !== null) {
      await notificationElement.hover();
    }
    await testInfo.attach(reopenQualification.screenformNotifications, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    const notificationDiv = await page.locator(MenuStock.Notification.main.pageElementdiv).first();
    if (notificationDiv !== null) {
      await testInfo.attach(reopenQualification.screenformLastNotifications, {
        body: await notificationDiv.screenshot(),
        contentType: ConfigSettingsAlternative.screenShotsContentType
      });
    }
  } else if (viewportWidth >= 768 && viewportWidth < 1024) {
    // Tablet en modo retrato
    const notificationElement = await page.locator(MenuStock.Notification.main.pageElement);
    if (notificationElement !== null) {
      await notificationElement.click();
    }
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

})
  test('Trazit-StockControl-QualificationInProgress-ReopenQualification-Cancel', async ({ page }, testInfo) => {
      await page.pause();
      await page.pause();
      await page.getByLabel(reopenQualification.buttonReopenQualification).click();
      await page.pause();
      await page.pause();
      await testInfo.attach(reopenQualification.screenShotsBeforeClickReopenQualification, {
          body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
        await page.pause();
      await page.locator(reopenQualification.refresh.label).getByLabel(reopenQualification.refresh.value).click();
      await page.pause();
      await page.pause();
      await testInfo.attach(reopenQualification.screenShotsFormEmpty, {
          body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
        await page.pause();
      await page.getByLabel(reopenQualification.fldNumberOfDays.label).fill(reopenQualification.fldNumberOfDays.value);
      await page.pause();
      await page.pause();
      //await page.getByLabel(reopenQualification.buttonReopenOpen).click();
      await page.pause();
      await page.pause();
      //await page.getByRole('option', { name: reopenQualification.option.label }).locator(reopenQualification.option.locator).click();
      await page.pause();
      await page.pause();
      await page.getByRole('button', { name: reopenQualification.buttonCancel.label }).click();
      await page.pause();
      await page.pause();
      await testInfo.attach(reopenQualification.screenResult, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
      await page.pause();
      await page.pause();
      await page.close();
  })
}


test.describe('Desktop Mode', () => {
  //Added the before common.  
  //And I add another beforeEach for the navigation between the different tabs, this part is specific in each mode.

  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1920, height: 1080 }); 
    const logPlat = new LogIntoPlatform({page});
    const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
    await page.waitForTimeout(3000);
    const openWindow=new OpenProcedureWindow({page});
    await page.waitForTimeout(3000);
    await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuStock.Stock.main, MenuStock.Stock.QualificationInProgress);
  
  });
      //And I call the tests.
      commonTests();
  });


   
// Mobile Mode 
test.describe('Mobile mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    // Size of the viewport of a mobile device
    await page.setViewportSize({ width: 385, height: 812 }); 
    // Common configuration for both modes.
    const logPlat = new LogIntoPlatform({page});
    const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
    await page.waitForTimeout(3000);
    const openWindow=new OpenProcedureWindow({page}); 
    await page.waitForTimeout(3000);
    await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.QualificationInProgress);    
  
  });
  //And I call the tests.
  commonTests();
});

// Mobile Mode - Retrato
test.describe('Mobile mode Retrato', () => {
test.beforeEach(async ({ page }, testInfo) => {
  // Tamaño del viewport para móviles en modo retrato
  await page.setViewportSize({ width: 812, height: 385 }); 
  // Configuración común para ambos modos.
  const logPlat = new LogIntoPlatform({page});
  const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
  await page.waitForTimeout(3000);
  const openWindow=new OpenProcedureWindow({page}); 
  await page.waitForTimeout(3000);
  await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.QualificationInProgress);    
});
  commonTests();
});


// Tablets Mode
test.describe('Tablets mode', () => {
test.beforeEach(async ({ page }, testInfo) => {
  // Tamaño del viewport para móviles en modo retrato
  await page.setViewportSize({ width: 768, height: 1024 }); 
  // Configuración común para ambos modos.
  const logPlat = new LogIntoPlatform({page});
  const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
  await page.waitForTimeout(3000);
  const openWindow=new OpenProcedureWindow({page}); 
  await page.waitForTimeout(3000);
  await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.QualificationInProgress);    
});
  commonTests();
});

// Tablets Mode - Retrato
test.describe('Tablets mode Retrato', () => {
test.beforeEach(async ({ page }, testInfo) => {
  // Tamaño del viewport para móviles en modo retrato
  await page.setViewportSize({ width: 1024, height: 768}); 
  // Configuración común para ambos modos.
  const logPlat = new LogIntoPlatform({page});
    const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
    await page.waitForTimeout(3000);
    const openWindow=new OpenProcedureWindow({page});
    await page.waitForTimeout(3000);
    await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.QualificationInProgress);
    });
      //And I call the tests.
      commonTests();
  });


const { test:pwTest, afterEach } = require('@playwright/test');
 
  afterEach(async ({}, testInfo) => {
    // Example JSON data, could be anything relevant to your tests
    const data = {
      test_name: testInfo.title,


      duration: testInfo.duration,
      // other test-related data you might want to send
    };
   
    // Determine the test outcome
    const testStatus = testInfo.status; // 'passed', 'failed', 'timedOut', 'skipped'
   
    await callApiRunCompletion(data, testStatus);
  });
   
  pwTest('Example test', async ({ page }) => {
    // Your test logic here
  });