import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { MenuStock } from '../../trazit-models/test-config-stock-global';
import { AddToInvestigation } from '../../trazit-models/test-config-StockControl-Deviations-PendingDeviations-AddToInvestigation';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

async function zzzaddNotificationWitness({ page }, testInfo, testData) {
    await page.locator(MenuStock.Notification.main.pageElement).hover();
    await testInfo.attach(MenuStock.Notification.main.screenShotsName, {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    const notif = await page.locator(MenuStock.Notification.main.pageElementdiv).first();
    await testInfo.attach(MenuStock.Notification.main.screenShotsdivNotification, {
        body: await notif.screenshot(),
        contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await expect(notif).toContainText(testData.textInNotif1);
    await expect(notif).toContainText(testData.textInNotif2);
    await expect(notif).toContainText(testData.textInNotif3);

    const notifText = await notif.textContent(); // Get the text content of the notification element

    const regexPattern = new RegExp(`${testData.textInNotif1}\\s+(.*?)\\s+${testData.textInNotif2}`);
    const match = notifText.match(regexPattern);

    if (match && match[1]) {
        console.log(notifText, 'ObjectName:', match[1]);
        return match[1];
    } else {
        console.log(notifText);
        return notifText;
    }
}

const commonTests = () => {
    test('Trazit-StockControl-Deviations-PendingDecision-AddToInvestigation', async ({ page }, testInfo) => {
        let afterEachData = {
            textInNotif1: "",
            textInNotif2: "",
            textInNotif3: "",
        };

        await page.getByLabel(AddToInvestigation.buttonPendingDecision).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddToInvestigation.screenShotsButtonPendingDecision, {
            body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.pause();
        await page.getByText(AddToInvestigation.selectLotName).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddToInvestigation.screenShotsSelectLotName, {
            body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.pause();
        await page.getByLabel(AddToInvestigation.buttonName).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddToInvestigation.screenShotsAddToInvestigation, {
            body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.pause();

        afterEachData.textInNotif1 = AddToInvestigation.textInNotif1;
        afterEachData.textInNotif2 = AddToInvestigation.textInNotif2;
        afterEachData.textInNotif3 = AddToInvestigation.textInNotif3;

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
            await testInfo.attach(AddToInvestigation.screenformNotifications, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
            const notificationDiv = await page.locator(MenuStock.Notification.main.pageElementdiv).first();
            if (notificationDiv !== null) {
                await testInfo.attach(AddToInvestigation.screenformLastNotifications, {
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
        
};



test.describe('Desktop Mode', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        const logPlat = new LogIntoPlatform({ page });
        const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
        await page.waitForTimeout(3000);
        const openWindow = new OpenProcedureWindow({ page });
        await page.waitForTimeout(3000);
        await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuStock.Stock.main, MenuStock.Stock.Deviations);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuStock.Stock.mobile, MenuStock.Stock.Deviations);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuStock.Stock.mobile, MenuStock.Stock.Deviations);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuStock.Stock.mobile, MenuStock.Stock.Deviations);
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
        await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, MenuStock.Stock.mobile, MenuStock.Stock.Deviations);
    });
    commonTests();
});

const { test: pwTest, afterEach } = require('@playwright/test');

afterEach(async ({}, testInfo) => {
    const data = {
        test_name: testInfo.title,
        duration: testInfo.duration,
    };

    const testStatus = testInfo.status; // 'passed', 'failed', 'timedOut', 'skipped'

    await callApiRunCompletion(data, testStatus);
});

pwTest('Example test', async ({ page }) => {
    // Your test logic here
});
