import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { MenuRDProjects } from '../../trazit-models/test-config-R&DProjects-global';
import { AddNote } from '../../trazit-models/test-config-R&D-Projects-Product-Development-DailyEntries-AddNote';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

//Function with all tests.
const commonTests = () => {
    test('Trazit-R&D-Projects-Product-Development-DailyEntries-AddNote-Accept', async ({ page }, testInfo) => {
        let afterEachData = {
            textInNotif1:"",
            textInNotif2:"",
            textInNotif3:"",
        }

        await page.getByLabel(AddNote.windowDailyEntries).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddNote.screenShotsWindowDailyEntries, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(AddNote.search.label).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddNote.screenShotsBeforeSelectProjects, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(AddNote.search.label).fill(AddNote.search.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(AddNote.screenShotsSelectProject, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: AddNote.search.action }).click();
        await page.pause();
        await page.pause();   
        await testInfo.attach(AddNote.scrennShotsSearch, {
            body: await page.screenshot({ fullPage: true}),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(AddNote.buttonName).first().click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddNote.screenShotsEmptyForm, {
            body: await page.screenshot({ fullPage: true}),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(AddNote.fldTitle.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(AddNote.fldTitle.label).fill(AddNote.fldTitle.value);
        await page.pause();
        await page.pause();
        await page.getByLabel(AddNote.fldNote.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(AddNote.fldNote.label).fill(AddNote.fldNote.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(AddNote.screenShotsEmptyForm, {
            body: await page.screenshot({ fullPage: true}),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        })
        await page.getByRole('button', { name: AddNote.buttonAccept }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddNote.screenShotsAccept, {
            body: await page.screenshot({ fullPage: true}),
            contentType: ConfigSettingsAlternative.scrennShotsContentType
        });

        afterEachData.textInNotif1=AddNote.textInNotif1
        afterEachData.textInNotif2=AddNote.textInNotif2
        afterEachData.textInNotif3=AddNote.textInNotif3
    
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
            await testInfo.attach(AddNote.screenformNotifications, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
            });
            const notificationDiv = await page.locator(MenuRDProjects.Notification.main.pageElementdiv).first();
            if (notificationDiv !== null) {
            await testInfo.attach(AddNote.screenformLastNotifications, {
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


    test('Trazit-R&D-Projects-Product-Development-DailyEntries-AddNote-Cancel', async ({ page }, testInfo) => {
        await page.pause();
        await page.getByLabel(AddNote.windowDailyEntries).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddNote.screenShotsWindowDailyEntries, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(AddNote.search.label).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddNote.screenShotsBeforeSelectProjects, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(AddNote.search.label).fill(AddNote.search.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(AddNote.screenShotsSelectProject, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: AddNote.search.action }).click();
        await page.pause();
        await page.pause();   
        await testInfo.attach(AddNote.scrennShotsSearch, {
            body: await page.screenshot({ fullPage: true}),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(AddNote.buttonName).first().click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddNote.screenShotsEmptyForm, {
            body: await page.screenshot({ fullPage: true}),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(AddNote.fldTitle.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(AddNote.fldTitle.label).fill(AddNote.fldTitle.value);
        await page.pause();
        await page.pause();
        await page.getByLabel(AddNote.fldNote.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(AddNote.fldNote.label).fill(AddNote.fldNote.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(AddNote.screenShotsEmptyForm, {
            body: await page.screenshot({ fullPage: true}),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: AddNote.buttonCancel }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddNote.screenShotsCancel, {
            body: await page.screenshot({ fullPage: true}),
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
