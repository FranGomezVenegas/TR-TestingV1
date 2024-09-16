import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { MenuLots, Menu } from '../../trazit-models/test-config-lots-global';
import { AddToInvestigation } from '../../trazit-models/test-config-Lots-DeviationsView-AddtoInvestigations';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';
   

//Function with all tests.
const commonTests = () => {
  test('Trazit-Lots-DeviationsView-PendingDecision-AddtoInvestigations-Accept', async ({ page }, testInfo) => {
    await page.pause();
    let afterEachData = {
      textInNotif1:"",
      textInNotif2:"",
      textInNotif3:"",
    }
    
    await page.getByLabel(AddToInvestigation.buttonPendingDecision).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddToInvestigation.screenShotsButtonPendingDecision, {
            body: await page.screenshot({ fullPage: true }), 
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.pause();
        await page.getByText(AddToInvestigation.selectLotName).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddToInvestigation.screenShotsSelectLotName, {
            body: await page.screenshot({ fullPage: true }), 
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.pause();
        await page.getByLabel(AddToInvestigation.buttonName).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddToInvestigation.screenShotsAddToInvestigation, {
            body: await page.screenshot({ fullPage: true }), 
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.pause();

    

    afterEachData.textInNotif1=AddToInvestigation.textInNotif1
    afterEachData.textInNotif2=AddToInvestigation.textInNotif2
    afterEachData.textInNotif3=AddToInvestigation.textInNotif3
      
    const viewportWidth = await page.evaluate(() => {
        return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    });

    if (viewportWidth >= 1024) {
        const notificationElement = await page.locator(MenuLots.Notification.main.pageElement);
        if (notificationElement !== null) {
            await notificationElement.hover();
        }
        await testInfo.attach(AddToInvestigation.screenformNotifications, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        const notificationDiv = await page.locator(MenuLots.Notification.main.pageElementdiv).first();
        if (notificationDiv !== null) {
            await testInfo.attach(AddToInvestigation.screenformLastNotifications, {
                body: await notificationDiv.screenshot(),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
        }
    } else if (viewportWidth >= 768 && viewportWidth < 769) {
        await page.click('mwc-icon-button.menu');
        await page.click('mwc-list-item#dashboardnotifications');
        await testInfo.attach('Tablet Notifications', {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    } else if (viewportWidth >= 812 && viewportWidth < 813) {
        await page.click('mwc-icon-button.menu');
        await page.click('mwc-list-item#dashboardnotifications');
        await testInfo.attach('Notifications Mobile Retrato', {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    } else {
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
        await page.setViewportSize({ width: 1365, height: 821 });
        const logPlat = new LogIntoPlatform({ page });
        const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
        await page.waitForTimeout(3000);
        const openWindow = new OpenProcedureWindow({ page });
        await page.waitForTimeout(3000);
        await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuLots.Lots.main, MenuLots.Lots.deviationsView);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.deviationsView);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.deviationsView);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.deviationsView);
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
        await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.deviationsView);
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