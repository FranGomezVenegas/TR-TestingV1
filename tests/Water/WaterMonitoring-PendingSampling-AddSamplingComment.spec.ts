import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-models/test-config-water-global';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';


import { MenuInstrumentsControl } from '../../trazit-models/test-config-instruments-global';
import { AddSamplingComment } from '../../trazit-models/test-config-WaterMonitoring-PendingSampling-AddSamplingComment';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenSettingsWindow } from '../1TRAZiT-Commons/openSettingsWindows';


//Function with all tests.
const commonTests = () => {
    test('Trazit-WaterMonitoring-PendingSampling-AddSamplingComment-Accept', async ({ page }, testInfo) => {
        let afterEachData = {
            textInNotif1:"",
            textInNotif2:"",
            textInNotif3:"",
        }
 
        await page.getByText(AddSamplingComment.selectSampleID, { exact: true }).click();
        page.pause();
        page.pause();
        await testInfo.attach(AddSamplingComment.screenShotsSelectSampleID, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(AddSamplingComment.buttonName).click();
        page.pause();
        page.pause();
        await testInfo.attach(AddSamplingComment.screenShotsEmptyForm, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(AddSamplingComment.fldNewComment.label).click();
        page.pause();
        page.pause();
        await page.getByLabel(AddSamplingComment.fldNewComment.label).fill(AddSamplingComment.fldNewComment.value);
        page.pause();
        page.pause();
        await testInfo.attach(AddSamplingComment.screenShotsFilledForm, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: AddSamplingComment.buttonAccept }).click();
        page.pause();
        page.pause();
        await testInfo.attach(AddSamplingComment.screenShotsAccept, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        afterEachData.textInNotif1=AddSamplingComment.textInNotif1
        afterEachData.textInNotif2=AddSamplingComment.textInNotif2
        afterEachData.textInNotif3=AddSamplingComment.textInNotif3
    
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
            await testInfo.attach(AddSamplingComment.screenformNotifications, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
            });
            const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
            if (notificationDiv !== null) {
            await testInfo.attach(AddSamplingComment.screenformLastNotifications, {
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

    test('Trazit-WaterMonitoring-PendingSampling-AddSamplingComment-Cancel', async ({ page }, testInfo) => {
        await page.getByText(AddSamplingComment.selectSampleID, { exact: true }).click();
        page.pause();
        page.pause();
        await testInfo.attach(AddSamplingComment.screenShotsSelectSampleID, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(AddSamplingComment.buttonName).click();
        page.pause();
        page.pause();
        await testInfo.attach(AddSamplingComment.screenShotsEmptyForm, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(AddSamplingComment.fldNewComment.label).click();
        page.pause();
        page.pause();
        await page.getByLabel(AddSamplingComment.fldNewComment.label).fill(AddSamplingComment.fldNewComment.value);
        page.pause();
        page.pause();
        await testInfo.attach(AddSamplingComment.screenShotsFilledForm, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: AddSamplingComment.buttonCancel }).click();
        page.pause();
        page.pause();
        await testInfo.attach(AddSamplingComment.screenShotsCancel, {
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
        const openWindow = new OpenSettingsWindow({ page });
        await page.waitForTimeout(3000);
        await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, platformMenuNames.WaterMonitoring.main, platformMenuNames.WaterMonitoring.PendingSampling);
    });
    commonTests();
});
    
    
test.describe('Mobile mode', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        await page.setViewportSize({ width: 385, height: 812 });
        const logPlat = new LogIntoPlatform({ page });
        const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
        await page.waitForTimeout(3000);
        const openWindow = new OpenSettingsWindow({ page });
        await page.waitForTimeout(3000);
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.WaterMonitoring.mobile, platformMenuNames.WaterMonitoring.PendingSampling);
    });
    commonTests();
});
    
test.describe('Mobile mode Retrato', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        await page.setViewportSize({ width: 812, height: 385 });
        const logPlat = new LogIntoPlatform({ page });
        const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
        await page.waitForTimeout(3000);
        const openWindow = new OpenSettingsWindow({ page });
        await page.waitForTimeout(3000);
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.WaterMonitoring.mobile, platformMenuNames.WaterMonitoring.PendingSampling);
    });
    commonTests();
});
    
test.describe('Tablets mode', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        const logPlat = new LogIntoPlatform({ page });
        const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
        await page.waitForTimeout(3000);
        const openWindow = new OpenSettingsWindow({ page });
        await page.waitForTimeout(3000);
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.WaterMonitoring.mobile, platformMenuNames.WaterMonitoring.PendingSampling);
    });
    commonTests();
});
    
test.describe('Tablets mode Retrato', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        await page.setViewportSize({ width: 1024, height: 768 });
        const logPlat = new LogIntoPlatform({ page });
        const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
        await page.waitForTimeout(3000);
        const openWindow = new OpenSettingsWindow({ page });
        await page.waitForTimeout(3000);
        await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, platformMenuNames.WaterMonitoring.main, platformMenuNames.WaterMonitoring.PendingSampling);
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
