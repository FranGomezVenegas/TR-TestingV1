import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { MenuLots, Menu } from '../../trazit-models/test-config-lots-global';
import { decision } from '../../trazit-models/test-config-Lots-DeviationsView-Investigation-Decision';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';
   

//Function with all tests.
const commonTests = () => {
    test('Trazit-Lots-DeviationsView-Investigations-Open', async ({ page }, testInfo) => {
        await page.pause();
        await page.getByLabel(decision.buttonInvestigations).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(decision.screenShotsButtonInvestigations, {
            body: await page.screenshot({ fullPage: true }), 
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.pause();
        await page.close();
    });

    test('Trazit-Lots-DeviationsView-Investigations-Decision-Accept', async ({ page }, testInfo) => {
        let afterEachData = {
            textInNotif1: "",
            textInNotif2: "",
            textInNotif3: "",
        };

        await page.getByLabel(decision.buttonInvestigations).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(decision.screenShotsButtonInvestigations, {
            body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByText(decision.selectInvestigation, { exact: true }).first().click();
        await page.pause();
        await page.pause();
        await testInfo.attach(decision.screenShotsSelectInvestigations, {
            body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.waitForTimeout(3000); // Espera 3 segundos
        await page.getByLabel(decision.buttonName, { exact: true }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(decision.screenShotsEmptyForm, {
            body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('textbox', { name: decision.fldSystemName.label, exact: true }).click();
        await page.pause();
        await page.pause();
        await page.getByRole('textbox', { name: decision.fldSystemName.label, exact: true }).fill(decision.fldSystemName.value);
        await page.pause();
        await page.pause();
        await page.getByRole('textbox', { name: decision.fldSystemName.label, exact: true }).press(decision.fldSystemName.press);
        await page.pause();
        await page.pause();
        await page.getByRole('textbox', { name: decision.fldSystemId.label, exact: true }).fill(decision.fldSystemId.value);
        await page.pause();
        await page.pause();
        await page.getByRole('checkbox', { name: decision.capaRequire }).check();
        await page.pause();
        await page.pause();
        await page.getByRole('textbox', { name: decision.fldCAPASystemName.label }).click();
        await page.pause();
        await page.pause();
        await page.getByRole('textbox', { name: decision.fldCAPASystemName.label }).press(decision.fldCAPASystemName.press);
        await page.pause();
        await page.pause();
        await page.getByRole('textbox', { name: decision.fldCAPASystemName.label }).fill(decision.fldCAPASystemName.value);
        await page.pause();
        await page.pause();
        await page.getByRole('textbox', { name: decision.fldCAPAId.label }).click();
        await page.pause();
        await page.pause();
        await page.getByRole('textbox', { name: decision.fldCAPAId.label }).fill(decision.fldCAPAId.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(decision.screenShotsFilledForm, {
            body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: decision.fldAccept.label }).click();
        await testInfo.attach(decision.screenShotsButtonAccept, {
            body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
        });

        afterEachData.textInNotif1 = decision.textInNotif1;
        afterEachData.textInNotif2 = decision.textInNotif2;
        afterEachData.textInNotif3 = decision.textInNotif3;

        // Obtener el modo de dispositivo usando page.evaluate
        const viewportWidth = await page.evaluate(() => {
            return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        });

        if (viewportWidth >= 1024) {
            // Modo escritorio o tablet en modo paisaje
            const notificationElement = await page.locator(MenuLots.Notification.main.pageElement);
            if (notificationElement !== null) {
                await notificationElement.hover();
            }
            await testInfo.attach(decision.screenformNotifications, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
            const notificationDiv = await page.locator(MenuLots.Notification.main.pageElementdiv).first();
            if (notificationDiv !== null) {
                await testInfo.attach(decision.screenformLastNotifications, {
                    body: await notificationDiv.screenshot(),
                    contentType: ConfigSettingsAlternative.screenShotsContentType
                });
            }
        } else if (viewportWidth >= 768 && viewportWidth < 769) {
            // Tablet 
            await page.click('mwc-icon-button.menu');
            await page.click('mwc-list-item#dashboardnotifications');
            await testInfo.attach('Tablet Notifications', {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
        
        } else if (viewportWidth >= 812 && viewportWidth < 813) {
            // Mobile Mode Retrato
            await page.click('mwc-icon-button.menu');
            await page.click('mwc-list-item#dashboardnotifications');
            await testInfo.attach('Notifications Mobile Retrato', {
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
    
    test('Trazit-Lots-DeviationsView-Investigations-Decision-Cancel', async ({ page }, testInfo) => {
        await page.getByLabel(decision.buttonInvestigations).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(decision.screenShotsButtonInvestigations, {
            body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByText(decision.selectInvestigation, { exact: true }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(decision.screenShotsSelectInvestigations, {
            body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.waitForTimeout(3000); // Espera 3 segundos
        await page.getByLabel(decision.buttonName, { exact: true }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(decision.screenShotsEmptyForm, {
            body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('textbox', { name: decision.fldSystemName.label, exact: true }).click();
        await page.pause();
        await page.pause();
        await page.getByRole('textbox', { name: decision.fldSystemName.label, exact: true }).fill(decision.fldSystemName.value);
        await page.pause();
        await page.pause();
        await page.getByRole('textbox', { name: decision.fldSystemName.label, exact: true }).press(decision.fldSystemName.press);
        await page.pause();
        await page.pause();
        await page.getByRole('textbox', { name: decision.fldSystemId.label, exact: true }).fill(decision.fldSystemId.value);
        await page.pause();
        await page.pause();
        await page.getByRole('checkbox', { name: decision.capaRequire }).check();
        await page.pause();
        await page.pause();
        await page.getByRole('textbox', { name: decision.fldCAPASystemName.label }).click();
        await page.pause();
        await page.pause();
        await page.getByRole('textbox', { name: decision.fldCAPASystemName.label }).press(decision.fldCAPASystemName.press);
        await page.pause();
        await page.pause();
        await page.getByRole('textbox', { name: decision.fldCAPASystemName.label }).fill(decision.fldCAPASystemName.value);
        await page.pause();
        await page.pause();
        await page.getByRole('textbox', { name: decision.fldCAPAId.label }).click();
        await page.pause();
        await page.pause();
        await page.getByRole('textbox', { name: decision.fldCAPAId.label }).fill(decision.fldCAPAId.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(decision.screenShotsFilledForm, {
            body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: decision.fldCancel.label }).click();
        await testInfo.attach(decision.screenShotsButtonCancel, {
            body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    });
};





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