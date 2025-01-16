import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { MenuLots, Menu } from '../../trazit-models/test-config-lots-global';
import { LotsSpecificationDesignsSearch } from '../../trazit-models/test-config-Lots-SpecificationDesigns-Search';
import { Summary } from '../../trazit-models/test-config-Lots-SpecificationDesigns-Summary';
import { AddAnalysis } from '../../trazit-models/test-config-Lots-SpecificationDesigns-AddAnalysisMethod'

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';


//Function with all tests.
const commonTests = () => {
      test('Trazit-SpecificationDesigns-AddAnalysisMethod-Accept', async ({ page }, testInfo) => {
        await page.pause();
        let afterEachData = {
            textInNotif1:"",
            textInNotif2:"",
            textInNotif3:"",
        }
        await page.pause();
        await page.pause();
        await page.locator('#dragMe').click();
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

        await page.getByRole('row', { name: AddAnalysis.buttonName.name }).getByLabel(AddAnalysis.buttonName.label).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddAnalysis.screenShotsEmptyForm, {
            body: await page.screenshot({fullPage: true }), 
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(AddAnalysis.fldMethodCode.label).click();
        await page.pause();
        await page.pause();
        await page.getByRole('option', { name: AddAnalysis.fldMethodCode.option }).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(AddAnalysis.fldMethodVersion.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(AddAnalysis.fldMethodVersion.label).fill(AddAnalysis.fldMethodVersion.value);
        await page.pause();
        await page.pause();
        await page.getByLabel(AddAnalysis.fldExpiry.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(AddAnalysis.fldExpiry.label).fill(AddAnalysis.fldExpiry.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(AddAnalysis.screenShotsFilledForm, {
            body: await page.screenshot({fullPage: true }), 
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: AddAnalysis.buttonAccept }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddAnalysis.screenShotsAccept, {
            body: await page.screenshot({fullPage: true }), 
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        

        afterEachData.textInNotif1=AddAnalysis.textInNotif1
        afterEachData.textInNotif2=AddAnalysis.textInNotif2
        afterEachData.textInNotif3=AddAnalysis.textInNotif3
      
        const viewportWidth = await page.evaluate(() => {
            return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        });

        if (viewportWidth >= 1024) {
            const notificationElement = await page.locator(MenuLots.Notification.main.pageElement);
            if (notificationElement !== null) {
                await notificationElement.hover();
            }
            await testInfo.attach(AddAnalysis.screenformNotifications, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
            const notificationDiv = await page.locator(MenuLots.Notification.main.pageElementdiv).first();
            if (notificationDiv !== null) {
                await testInfo.attach(AddAnalysis.screenformLastNotifications, {
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

        test('Trazit-SpecificationDesigns-AddAnalysisMethod-Cancel', async ({ page }, testInfo) => {
            await page.pause();
            await page.pause();
            await page.locator('#dragMe').click();
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
    
            await page.getByRole('row', { name: AddAnalysis.buttonName.name }).getByLabel(AddAnalysis.buttonName.label).click();
            await page.pause();
            await page.pause();
            await testInfo.attach(AddAnalysis.screenShotsEmptyForm, {
                body: await page.screenshot({fullPage: true }), 
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
            await page.getByLabel(AddAnalysis.fldMethodCode.label).click();
            await page.pause();
            await page.pause();
            await page.getByRole('option', { name: AddAnalysis.fldMethodCode.option }).click();
            await page.pause();
            await page.pause();
            await page.getByLabel(AddAnalysis.fldMethodVersion.label).click();
            await page.pause();
            await page.pause();
            await page.getByLabel(AddAnalysis.fldMethodVersion.label).fill(AddAnalysis.fldMethodVersion.value);
            await page.pause();
            await page.pause();
            await page.getByLabel(AddAnalysis.fldExpiry.label).click();
            await page.pause();
            await page.pause();
            await page.getByLabel(AddAnalysis.fldExpiry.label).fill(AddAnalysis.fldExpiry.value);
            await page.pause();
            await page.pause();
            await testInfo.attach(AddAnalysis.screenShotsFilledForm, {
                body: await page.screenshot({fullPage: true }), 
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
            await page.getByRole('button', { name: AddAnalysis.buttonCancel }).click();
            await page.pause();
            await page.pause();
            await testInfo.attach(AddAnalysis.screenShotsCancel, {
                body: await page.screenshot({fullPage: true }), 
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
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