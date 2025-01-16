import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { MenuInstrumentsControl } from '../../trazit-models/test-config-instruments-global';
import {EnterResult, ReEnterResult } from '../../trazit-models/test-config-WaterMonitoring-FQandMBTestingPendingResult-EnterResult';
import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenSettingsWindow } from '../1TRAZiT-Commons/openSettingsWindows';


//Function with all tests.
const commonTests = () => {
    test('Trazit-WaterMonitoring-FQandMBTestingPendingResult-FQ-EnterResult-Accept', async ({ page }, testInfo) => {
        let afterEachData = {
            textInNotif1:"",
            textInNotif2:"",
            textInNotif3:"",
        }
        
        await page.getByLabel(EnterResult.buttonName).first().click();
        await page.pause();
        await page.pause();
        await testInfo.attach(EnterResult.screenShotsEmptyResult, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.locator(EnterResult.fldselectAnalysisValue.locator).click();
        await page.pause();
        await page.pause();
        await page.locator(EnterResult.fldselectAnalysisValue.locator).fill(EnterResult.fldselectAnalysisValue.value);
        await page.pause();
        await page.pause();        
        await page.locator(EnterResult.fldselectAnalysisValue.locator).press(EnterResult.fldselectAnalysisValue.action);
        await page.pause();
        await page.pause();
        await testInfo.attach(EnterResult.screenShotsFilledResult, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: EnterResult.buttonAccept }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(EnterResult.screenShotsAccept, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });


        afterEachData.textInNotif1=EnterResult.textInNotif1
        afterEachData.textInNotif2=EnterResult.textInNotif2
        afterEachData.textInNotif3=EnterResult.textInNotif3
    
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
            await testInfo.attach(EnterResult.screenformNotifications, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
            });
            const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
            if (notificationDiv !== null) {
            await testInfo.attach(EnterResult.screenformLastNotifications, {
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

    test('Trazit-WaterMonitoring-FQandMBTestingPendingResult-FQ-EnterResult-Cancel', async ({ page }, testInfo) => {
        let afterEachData = {
            textInNotif1:"",
            textInNotif2:"",
            textInNotif3:"",
        }
        
        await page.getByLabel(EnterResult.buttonName).first().click();
        await page.pause();
        await page.pause();
        await testInfo.attach(EnterResult.screenShotsEmptyResult, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.locator(EnterResult.fldselectAnalysisValue.locator).click();
        await page.pause();
        await page.pause();
        await page.locator(EnterResult.fldselectAnalysisValue.locator).fill(EnterResult.fldselectAnalysisValue.value);
        await page.pause();
        await page.pause();        
        await page.locator(EnterResult.fldselectAnalysisValue.locator).press(EnterResult.fldselectAnalysisValue.action);
        await page.pause();
        await page.pause();
        await testInfo.attach(EnterResult.screenShotsFilledResult, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: EnterResult.buttonCancel }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(EnterResult.screenShotsCancel, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    });

    test('Trazit-WaterMonitoring-FQandMBTestingPendingResult-FQ-ReEnterResult-Accept', async ({ page }, testInfo) => {
        let afterEachData = {
            textInNotif1:"",
            textInNotif2:"",
            textInNotif3:"",
        }
        
        await page.getByLabel(ReEnterResult.buttonName).first().click();
        await page.pause();
        await page.pause();
        await testInfo.attach(ReEnterResult.screenShotsEmptyResult, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.locator(ReEnterResult.fldselectAnalysisValue.locator).click();
        await page.pause();
        await page.pause();
        await page.locator(ReEnterResult.fldselectAnalysisValue.locator).fill(ReEnterResult.fldselectAnalysisValue.value);
        await page.pause();
        await page.pause();        
        await page.locator(ReEnterResult.fldselectAnalysisValue.locator).press(ReEnterResult.fldselectAnalysisValue.action);
        await page.pause();
        await page.pause();
        await testInfo.attach(ReEnterResult.screenShotsFilledResult, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: ReEnterResult.buttonAccept }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(ReEnterResult.screenShotsAccept, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });


        afterEachData.textInNotif1=ReEnterResult.textInNotif1
        afterEachData.textInNotif2=ReEnterResult.textInNotif2
        afterEachData.textInNotif3=ReEnterResult.textInNotif3
    
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
            await testInfo.attach(ReEnterResult.screenformNotifications, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
            });
            const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
            if (notificationDiv !== null) {
            await testInfo.attach(ReEnterResult.screenformLastNotifications, {
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

    test('Trazit-WaterMonitoring-FQandMBTestingPendingResult-FQ-ReEnterResult-Cancel', async ({ page }, testInfo) => {
        let afterEachData = {
            textInNotif1:"",
            textInNotif2:"",
            textInNotif3:"",
        }
        
        await page.getByLabel(ReEnterResult.buttonName).first().click();
        await page.pause();
        await page.pause();
        await testInfo.attach(ReEnterResult.screenShotsEmptyResult, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.locator(ReEnterResult.fldselectAnalysisValue.locator).click();
        await page.pause();
        await page.pause();
        await page.locator(ReEnterResult.fldselectAnalysisValue.locator).fill(ReEnterResult.fldselectAnalysisValue.value);
        await page.pause();
        await page.pause();        
        await page.locator(ReEnterResult.fldselectAnalysisValue.locator).press(ReEnterResult.fldselectAnalysisValue.action);
        await page.pause();
        await page.pause();
        await testInfo.attach(ReEnterResult.screenShotsFilledResult, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: ReEnterResult.buttonCancel }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(ReEnterResult.screenShotsCancel, {
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
        await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, platformMenuNames.WaterMonitoring.main, platformMenuNames.WaterMonitoring.FQandMBTestingPendingResultsFQ);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.WaterMonitoring.mobile, platformMenuNames.WaterMonitoring.FQandMBTestingPendingResultsFQ);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.WaterMonitoring.mobile, platformMenuNames.WaterMonitoring.FQandMBTestingPendingResultsFQ);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.WaterMonitoring.mobile, platformMenuNames.WaterMonitoring.FQandMBTestingPendingResultsFQ);
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
        await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, platformMenuNames.WaterMonitoring.main, platformMenuNames.WaterMonitoring.FQandMBTestingPendingResultsFQ);
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

