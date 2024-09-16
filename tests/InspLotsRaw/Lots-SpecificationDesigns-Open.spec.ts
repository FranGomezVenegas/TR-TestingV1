import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { MenuLots, Menu } from '../../trazit-models/test-config-lots-global';
import { LotsSpecificationDesignsSearch } from '../../trazit-models/test-config-Lots-SpecificationDesigns-Search';
import { Summary } from '../../trazit-models/test-config-Lots-SpecificationDesigns-Summary';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

//Notifications
async function zzzaddNotificationWitness({ page }, testInfo, testData) {
    await page.locator(MenuLots.Notification.main.pageElement).hover();
    await testInfo.attach(MenuLots.Notification.main.screenShotsName, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    const notif = await page.locator(MenuLots.Notification.main.pageElementdiv).first();
    await testInfo.attach(MenuLots.Notification.main.screenShotsdivNotification, {
      body: await notif.screenshot(),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await expect(notif).toContainText(testData.textInNotif1);
    await expect(notif).toContainText(testData.textInNotif2);
    await expect(notif).toContainText(testData.textInNotif3);
  
    const notifText = await notif.textContent(); // Get the text content of the notification element
    
    //const inputText = "Instrument X h is found";
    //const regex = /testData.textInNotif1 \s+(.*?)\s+ testData.textInNotif2/;
    const regexPattern = new RegExp(`${testData.textInNotif1}\\s+(.*?)\\s+${testData.textInNotif2}`);
    const match = notifText.match(regexPattern);
    
    if (match && match[1]) {
      console.log(notifText, 'ObjectName:', match[1])
      return match[1];
    } else {
        console.log(notifText)
        return notifText;
    }
  }

   //Function with all tests.
  const commonTests = () => {
    test('Trazit-SpecificationDesigns-Open', async ({ page }) => {
        await page.pause();
        await page.pause();
        await page.close();
      })

      test('Trazit-SpecificationDesigns-Search', async ({ page }, testInfo) => {
        await page.pause();
        await page.pause();
        //await page.locator('#document').click();
        await page.locator('#dragMe').click();
        //await page.locator('#document').click();
        await page.getByLabel(LotsSpecificationDesignsSearch.fldSpecName.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsSpecificationDesignsSearch.fldSpecName.label).press(LotsSpecificationDesignsSearch.fldSpecName.action);
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsSpecificationDesignsSearch.fldSpecName.label).fill(LotsSpecificationDesignsSearch.fldSpecName.value);
        await page.pause();
        await page.pause();
        await page.getByRole('button', { name: LotsSpecificationDesignsSearch.buttonSearch.label }).click();
        await page.pause();
        await testInfo.attach(LotsSpecificationDesignsSearch.screenShotsSearch, {
          body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
        await page.pause();
        await page.close();
      })
      
  }

test.describe('Desktop Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
      await page.setViewportSize({ width: 1365, height: 821 });
      const logPlat = new LogIntoPlatform({ page });
      const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
      await page.waitForTimeout(3000);
      const openWindow = new OpenProcedureWindow({ page });
      await page.waitForTimeout(3000);
      await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuLots.Lots.main, MenuLots.Lots.lotsSpecificationDesigns);
  });
  commonTests();
});

test.describe('Mobile mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
      await page.setViewportSize({ width: 385, height: 812 });
      const logPlat = new LogIntoPlatform({ page });
      const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
      await page.waitForTimeout(3000);
      const openWindow = new OpenProcedureWindow({ page });
      await page.waitForTimeout(3000);
      await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.lotsSpecificationDesigns);
  });
  commonTests();
});

test.describe('Mobile mode Retrato', () => {
  test.beforeEach(async ({ page }, testInfo) => {
      await page.setViewportSize({ width: 812, height: 385 });
      const logPlat = new LogIntoPlatform({ page });
      const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
      await page.waitForTimeout(3000);
      const openWindow = new OpenProcedureWindow({ page });
      await page.waitForTimeout(3000);
      await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.lotsSampleEnterResult);
  });
  commonTests();
});

test.describe('Tablets mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      const logPlat = new LogIntoPlatform({ page });
      const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
      await page.waitForTimeout(3000);
      const openWindow = new OpenProcedureWindow({ page });
      await page.waitForTimeout(3000);
      await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.lotsSampleEnterResult);
  });
  commonTests();
});

test.describe('Tablets mode Retrato', () => {
  test.beforeEach(async ({ page }, testInfo) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      const logPlat = new LogIntoPlatform({ page });
      const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
      await page.waitForTimeout(3000);
      const openWindow = new OpenProcedureWindow({ page });
      await page.waitForTimeout(3000);
      await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.lotsSampleEnterResult);
  });
  commonTests();
});


const { test: pwTest, afterEach } = require('@playwright/test');

afterEach(async ({}, testInfo) => {
    const data = {
        test_name: testInfo.title,
        duration: testInfo.duration,
    };

    const testStatus = testInfo.status;

    await callApiRunCompletion(data, testStatus);
});

pwTest('Example test', async ({ page }) => {
    // Tu lógica de prueba aquí
});