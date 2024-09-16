import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { Reactivate } from '../../trazit-models/test-config-Platform-HolidaysCalendar-Reactivate';
import { MenuInstrumentsControl } from '../../trazit-models/test-config-instruments-global';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenSettingsWindow } from '../1TRAZiT-Commons/openSettingsWindows';

//Function with all tests.
const commonTests = () => {
    test('Trazit-Plataform-HolidaysCalendar-Reactivate-Cancel', async ({ page }, testInfo) => {   
        await page.getByLabel(Reactivate.buttonReactivate).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(Reactivate.screenShotsEmptyForm, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        
        await page.getByLabel(Reactivate.fldNumberOfDays.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(Reactivate.fldNumberOfDays.label).fill(Reactivate.fldNumberOfDays.value);
        await page.pause();
        await page.pause();
        await page.locator(Reactivate.fldRefresh.label).getByLabel(Reactivate.fldRefresh.actionName).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(Reactivate.fldCalendar.label).click();
        await page.pause();
        await page.pause();
        await page.getByRole('option', { name: Reactivate.fldCalendar.option }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(Reactivate.screenShotsEmptyForm, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: Reactivate.buttonCancel }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(Reactivate.screenShotsCancel, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    })
    
    test('Trazit-Plataform-HolidaysCalendar-Reactivate-Accept', async ({ page }, testInfo) => {   
        let afterEachData = {
            textInNotif1:"",
            textInNotif2:"",
            textInNotif3:"",
        }

        // await page.getByRole('menuitem', { name: 'list Holidays Calendar' }).locator('#label').click();
        await page.getByLabel(Reactivate.buttonReactivate).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(Reactivate.screenShotsEmptyForm, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        
        await page.getByLabel(Reactivate.fldNumberOfDays.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(Reactivate.fldNumberOfDays.label).fill(Reactivate.fldNumberOfDays.value);
        await page.pause();
        await page.pause();
        await page.locator(Reactivate.fldRefresh.label).getByLabel(Reactivate.fldRefresh.actionName).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(Reactivate.fldCalendar.label).click();
        await page.pause();
        await page.pause();
        await page.getByRole('option', { name: Reactivate.fldCalendar.option }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(Reactivate.screenShotsEmptyForm, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: Reactivate.buttonAccept }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(Reactivate.screenShotsAccept, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    
        afterEachData.textInNotif1=Reactivate.textInNotif1
        afterEachData.textInNotif2=Reactivate.textInNotif2
        afterEachData.textInNotif3=Reactivate.textInNotif3
    
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
            await testInfo.attach(Reactivate.screenformNotifications, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
            });
            const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
            if (notificationDiv !== null) {
            await testInfo.attach(Reactivate.screenformLastNotifications, {
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

    
}


test.describe('Desktop Mode', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        await page.setViewportSize({ width: 1365, height: 821 });
        const logPlat = new LogIntoPlatform({ page });
        const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
        await page.waitForTimeout(3000);
        const openWindow = new OpenSettingsWindow({ page });
        await page.waitForTimeout(3000);
        await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, platformMenuNames.mySettings.main, platformMenuNames.mySettings.holidaysCalendar);
    });
    commonTests();
});
    
    
// test.describe('Mobile mode', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//         await page.setViewportSize({ width: 385, height: 812 });
//         const logPlat = new LogIntoPlatform({ page });
//         const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//         await page.waitForTimeout(3000);
//         const openWindow = new OpenSettingsWindow({ page });
//         await page.waitForTimeout(3000);
//         await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.mySettings.mobile, platformMenuNames.mySettings.holidaysCalendar);
//     });
//     commonTests();
// });
    
// test.describe('Mobile mode Retrato', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//         await page.setViewportSize({ width: 812, height: 385 });
//         const logPlat = new LogIntoPlatform({ page });
//         const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//         await page.waitForTimeout(3000);
//         const openWindow = new OpenSettingsWindow({ page });
//         await page.waitForTimeout(3000);
//         await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.mySettings.mobile, platformMenuNames.mySettings.holidaysCalendar);
//     });
//     commonTests();
// });
    
// test.describe('Tablets mode', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//         await page.setViewportSize({ width: 768, height: 1024 });
//         const logPlat = new LogIntoPlatform({ page });
//         const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//         await page.waitForTimeout(3000);
//         const openWindow = new OpenSettingsWindow({ page });
//         await page.waitForTimeout(3000);
//         await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.mySettings.mobile, platformMenuNames.mySettings.holidaysCalendar);
//     });
//     commonTests();
// });
    
// test.describe('Tablets mode Retrato', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//         await page.setViewportSize({ width: 1024, height: 768 });
//         const logPlat = new LogIntoPlatform({ page });
//         const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//         await page.waitForTimeout(3000);
//         const openWindow = new OpenSettingsWindow({ page });
//         await page.waitForTimeout(3000);
//         await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, platformMenuNames.mySettings.main, platformMenuNames.mySettings.holidaysCalendar);
//     });
//     commonTests();
// });
    
    
const { test: pwTest, afterEach } = require('@playwright/test');

afterEach(async ({}, testInfo) => {  
    const durationInSeconds = (testInfo.duration / 1000).toFixed(2);
  
    const data = {
      test_name: testInfo.title,
      duration: `${durationInSeconds} seconds`,
    };
  
    const testStatus = testInfo.status;
    await callApiRunCompletion(data, testStatus);
});

pwTest('Example test', async ({ page }) => {
    // Tu lógica de prueba aquí
});
