import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';
import {MenuInstrumentsControl} from '../../trazit-models/test-config-instruments-global';

import { MenuLots, Menu } from '../../trazit-models/test-config-lots-global';
import { LotsViewSearch } from '../../trazit-models/test-config-losts-lots-view-search';
import { AdjustQuantity } from '../../trazit-models/test-config-Lots-View-Summary-LotBulk-AdjustQuantity';
import { Summary } from '../../trazit-models/test-config-Lots-Summary';

import { callApiEndpoint } from '../../trazit-models/test-config-Call-ApiName';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';



//Function with all tests.
const commonTests = () => {
    test('Trazit-LotsView-Search-Summary-AdjustBulkQuantity-Accept', async ({ page }, testInfo) => {
        await page.pause();
        let afterEachData = {
            textInNotif1: "",
            textInNotif2: "",
            textInNotif3: "",
        };
        
        await page.pause();
        await page.pause();
        await page.getByLabel(Summary.buttonSummary).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(Summary.screenShotsButtonSummary, {
            body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
        await page.pause();
        await page.getByLabel(LotsViewSearch.buttonName).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsViewSearch.fldSearch.label).fill(LotsViewSearch.fldSearch.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(LotsViewSearch.screenShotsFormFilled, {
            body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
        await page.pause();
        await page.getByRole('button', { name: LotsViewSearch.buttonSearch.label }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(LotsViewSearch.screenShotsSearch, {
            body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
        await page.pause();
        await page.pause();
        await page.locator(AdjustQuantity.buttonName.locator).getByLabel(AdjustQuantity.buttonName.label).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AdjustQuantity.screenShotsEmptyForm, {
            body: await page.screenshot({fullPage: true }), 
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.pause();
        await page.getByLabel(AdjustQuantity.fldAdjustBulkQuantity.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(AdjustQuantity.fldAdjustBulkQuantity.label).fill(AdjustQuantity.fldAdjustBulkQuantity.value);
        await page.pause();
        await page.pause();
        await page.getByLabel(AdjustQuantity.fldUOM.label).click();
        await page.pause();
        await page.pause();
        await page.getByRole('option', { name: AdjustQuantity.fldUOM.option }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AdjustQuantity.screenShotsFilledForm, {
            body: await page.screenshot({fullPage: true }), 
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: AdjustQuantity.buttonAccept }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AdjustQuantity.screenShotsAccept, {
            body: await page.screenshot({fullPage: true }), 
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        


        afterEachData.textInNotif1 = AdjustQuantity.textInNotif1;
        afterEachData.textInNotif2 = AdjustQuantity.textInNotif2;
        afterEachData.textInNotif3 = AdjustQuantity.textInNotif3;
    
        // Obtener el modo de dispositivo usando page.evaluate
        const viewportWidth = await page.evaluate(() => {
            return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        });
    
        // Manejo de capturas de pantalla y notificaciones según el modo del dispositivo
        if (viewportWidth >= 1024) {
            // Modo escritorio o tablet en modo paisaje
            const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
            if (notificationElement !== null) {
                await notificationElement.hover();
            }
            await testInfo.attach(AdjustQuantity.screenformNotifications, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
            const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
            if (notificationDiv !== null) {
                await testInfo.attach(AdjustQuantity.screenformLastNotifications, {
                    body: await notificationDiv.screenshot(),
                    contentType: ConfigSettingsAlternative.screenShotsContentType
                });
            }
        } else if (viewportWidth >= 768 && viewportWidth < 1024) {
            // Tablet en modo retrato
            const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
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
  
    });

    test('Trazit-LotsView-Search-Summary-AdjustBulkQuantity-Cancel', async ({ page }, testInfo) => {
        await page.pause();
        await page.pause();
        await page.getByLabel(Summary.buttonSummary).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(Summary.screenShotsButtonSummary, {
            body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
        await page.pause();
        await page.getByLabel(LotsViewSearch.buttonName).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsViewSearch.fldSearch.label).fill(LotsViewSearch.fldSearch.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(LotsViewSearch.screenShotsFormFilled, {
            body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
        await page.pause();
        await page.getByRole('button', { name: LotsViewSearch.buttonSearch.label }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(LotsViewSearch.screenShotsSearch, {
            body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
        await page.pause();
        await page.pause();
        await page.locator(AdjustQuantity.buttonName.locator).getByLabel(AdjustQuantity.buttonName.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(AdjustQuantity.fldAdjustBulkQuantity.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(AdjustQuantity.fldAdjustBulkQuantity.label).fill(AdjustQuantity.fldAdjustBulkQuantity.value);
        await page.pause();
        await page.pause();
        await page.getByLabel(AdjustQuantity.fldUOM.label).click();
        await page.pause();
        await page.pause();
        await page.getByRole('option', { name: AdjustQuantity.fldUOM.option }).click();
        await page.pause();
        await page.pause();
        await page.getByRole('button', { name: AdjustQuantity.buttonCancel }).click();
        await page.pause();
        await page.pause();

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
        await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuLots.Lots.main, MenuLots.Lots.lostView);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.lostView);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.lostView);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.lostView);
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
        await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, MenuLots.Lots.main, MenuLots.Lots.lostView);
    });
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
   
    await callApiEndpoint(data, testStatus);
  });
   
  pwTest('Example test', async ({ page }) => {
    // Your test logic here
  });
  