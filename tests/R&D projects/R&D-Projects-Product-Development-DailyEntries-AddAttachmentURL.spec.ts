import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { MenuRDProjects } from '../../trazit-models/test-config-R&DProjects-global';
import { AddAttachmentURL } from '../../trazit-models/test-config-R&D-Projects-Product-Development-DailyEntries-AddAttachmentURL';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

//Function with all tests.
const commonTests = () => {
    test('Trazit-R&D-Projects-Product-Development-DailyEntries-AddAttachmentURL-Accept', async ({ page }, testInfo) => {
        let afterEachData = {
            textInNotif1:"",
            textInNotif2:"",
            textInNotif3:"",
        }

        await page.pause();
        await page.pause();
        await page.getByLabel(AddAttachmentURL.windowDailyEntries).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddAttachmentURL.screenShotsWindowDailyEntries, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(AddAttachmentURL.search.label).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddAttachmentURL.screenShotsBeforeSelectProjects, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(AddAttachmentURL.search.label).fill(AddAttachmentURL.search.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(AddAttachmentURL.screenShotsSelectProject, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: AddAttachmentURL.search.action }).click();
        await page.pause();
        await page.pause();   
        await testInfo.attach(AddAttachmentURL.scrennShotsSearch, {
            body: await page.screenshot({ fullPage: true}),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });    
        await page.getByLabel(AddAttachmentURL.buttonName, { exact: true }).first().click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddAttachmentURL.screenShotsEmptyForm, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(AddAttachmentURL.fldDocURL.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(AddAttachmentURL.fldDocURL.label).fill(AddAttachmentURL.fldDocURL.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(AddAttachmentURL.screenShotsFilledForm, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: AddAttachmentURL.buttonAccept }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddAttachmentURL.screenShotsAccept, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });

        afterEachData.textInNotif1=AddAttachmentURL.textInNotif1
        afterEachData.textInNotif2=AddAttachmentURL.textInNotif2
        afterEachData.textInNotif3=AddAttachmentURL.textInNotif3
    
        // Obtener el modo de dispositivo usando page.evaluate
        const viewportWidth = await page.evaluate(() => {
            return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        });
        
        if (viewportWidth >= 1024) {
            // Modo escritorio o tablet en modo paisaje
            const notificationElement = await page.locator(MenuRDProjects.Notification.main.pageElement);
            if (notificationElement !== null) {
            await notificationElement.hover();
            }
            await testInfo.attach(AddAttachmentURL.screenformNotifications, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
            });
            const notificationDiv = await page.locator(MenuRDProjects.Notification.main.pageElementdiv).first();
            if (notificationDiv !== null) {
            await testInfo.attach(AddAttachmentURL.screenformLastNotifications, {
                body: await notificationDiv.screenshot(),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
            }
        } else if (viewportWidth >= 768 && viewportWidth < 1024) {
            // Tablet en modo retrato
            const notificationElement = await page.locator(MenuRDProjects.Notification.main.pageElement);
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


    test('Trazit-R&D-Projects-Product-Development-DailyEntries-AddAttachmentURL-Cancel', async ({ page }, testInfo) => {
        await page.pause();
        await page.pause();
        await page.getByLabel(AddAttachmentURL.windowDailyEntries).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddAttachmentURL.screenShotsWindowDailyEntries, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(AddAttachmentURL.search.label).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddAttachmentURL.screenShotsBeforeSelectProjects, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(AddAttachmentURL.search.label).fill(AddAttachmentURL.search.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(AddAttachmentURL.screenShotsSelectProject, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: AddAttachmentURL.search.action }).click();
        await page.pause();
        await page.pause();   
        await testInfo.attach(AddAttachmentURL.scrennShotsSearch, {
            body: await page.screenshot({ fullPage: true}),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });    
        await page.getByLabel(AddAttachmentURL.buttonName, { exact: true }).first().click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddAttachmentURL.screenShotsEmptyForm, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(AddAttachmentURL.fldDocURL.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(AddAttachmentURL.fldDocURL.label).fill(AddAttachmentURL.fldDocURL.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(AddAttachmentURL.screenShotsFilledForm, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: AddAttachmentURL.buttonCancel }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddAttachmentURL.screenShotsCancel, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
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
        await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuRDProjects.RD.main, MenuRDProjects.RD.ProductDevelopment);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuRDProjects.RD.mobile, MenuRDProjects.RD.ProductDevelopment);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuRDProjects.RD.mobile, MenuRDProjects.RD.ProductDevelopment);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuRDProjects.RD.mobile, MenuRDProjects.RD.ProductDevelopment);
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
        await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, MenuRDProjects.RD.main, MenuRDProjects.RD.ProductDevelopment);
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
