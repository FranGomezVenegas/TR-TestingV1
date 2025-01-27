import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { MenuRDProjects } from '../../trazit-models/test-config-R&DProjects-global';
import { New } from '../../trazit-models/test-config-R&D-ProductDevelopement-MethodValidation-New';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

//Function with all tests.
const commonTests = () => {
    test('Trazit-Projects-Development-MethodDevelopment-Open', async ({ page }, testInfo) => {
        await page.pause();
        await page.pause();
        await page.getByLabel(New.windowMethodDevelopment).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(New.screenShotsWindowMethodDevelopment, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(New.search.label).click();  
        await page.pause();
        await page.pause();
        await page.getByLabel(New.search.label).fill(New.search.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(New.scrennShotsSearch, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: New.search.button }).click();
        await page.pause();
        await page.pause();
        //await page.getByRole('button', { name: 'DevName' }).click();
        }),

    test('Trazit-Projects-Development-MethodDevelopment-NewAccept-withAnalyticalParameter', async ({ page }, testInfo) => {
        let afterEachData = {
            textInNotif1:"",
            textInNotif2:"",
            textInNotif3:"",
        }
        await page.pause();
        await page.pause();
        await page.getByLabel(New.windowMethodDevelopment).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(New.screenShotsWindowMethodDevelopment, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(New.search.label).click();  
        await page.pause();
        await page.pause();
        await page.getByLabel(New.search.label).fill(New.search.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(New.scrennShotsSearch, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: New.search.button }).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(New.buttonNew).click();
        await testInfo.attach(New.screenShotsformFilled, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(New.fldSequenceName.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(New.fldSequenceName.label).fill(New.fldSequenceName.value);
        await page.pause();
        await page.pause();
        await page.getByLabel(New.fldPurpose.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(New.fldPurpose.label).fill(New.fldPurpose.value);
        await page.pause();
        await page.pause();
        await page.getByLabel(New.fldAnalyticalParameter.label).click();
        await page.pause();
        await page.pause();
        await page.getByRole('option', { name: New.fldAnalyticalParameter.option }).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(New.fldAnalysis.label).click();
        await page.pause();
        await page.pause();
        await page.getByRole('option', { name: New.fldAnalysis.option }).nth(0).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(New.fldResponsible.label).click();
        await page.pause();
        await page.pause();
        await page.getByRole('option', { name: New.fldResponsible.option }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(New.screenShotsformEmpty, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: New.buttonAccept.label }).click();

        afterEachData.textInNotif1=New.textInNotif1
        afterEachData.textInNotif2=New.textInNotif2
        afterEachData.textInNotif3=New.textInNotif3

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
            await testInfo.attach(New.screenformNotifications, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
            });
            const notificationDiv = await page.locator(MenuRDProjects.Notification.main.pageElementdiv).first();
            if (notificationDiv !== null) {
            await testInfo.attach(New.screenformLastNotifications, {
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
        }),

        test('Trazit-Projects-Development-MethodDevelopment-NewAccept-withoutAnalyticalParameter', async ({ page }, testInfo) => {
            let afterEachData = {
                textInNotif1:"",
                textInNotif2:"",
                textInNotif3:"",
            }
            await page.pause();
            await page.pause();
            await page.getByLabel(New.windowMethodDevelopment).click();
            await page.pause();
            await page.pause();
            await testInfo.attach(New.screenShotsWindowMethodDevelopment, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
            await page.getByLabel(New.search.label).click();  
            await page.pause();
            await page.pause();
            await page.getByLabel(New.search.label).fill(New.search.value);
            await page.pause();
            await page.pause();
            await testInfo.attach(New.scrennShotsSearch, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
            await page.getByRole('button', { name: New.search.button }).click();
            await page.pause();
            await page.pause();
            await page.getByLabel(New.buttonNew).click();
            await testInfo.attach(New.screenShotsformFilled, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
            await page.getByLabel(New.fldSequenceName.label).click();
            await page.pause();
            await page.pause();
            await page.getByLabel(New.fldSequenceName.label).fill(New.fldSequenceName.value);
            await page.pause();
            await page.pause();
            await page.getByLabel(New.fldPurpose.label).click();
            await page.pause();
            await page.pause();
            await page.getByLabel(New.fldPurpose.label).fill(New.fldPurpose.value);
            await page.pause();
            await page.pause();
            // await page.getByLabel(New.fldAnalyticalParameter.label).click();
            // await page.pause();
            // await page.pause();
            // await page.getByRole('option', { name: New.fldAnalyticalParameter.option }).click();
            // await page.pause();
            // await page.pause();
            await page.getByLabel(New.fldAnalysis.label).click();
            await page.pause();
            await page.pause();
            await page.getByRole('option', { name: New.fldAnalysis.option }).nth(0).click();
            await page.pause();
            await page.pause();
            await page.getByLabel(New.fldResponsible.label).click();
            await page.pause();
            await page.pause();
            await page.getByRole('option', { name: New.fldResponsible.option }).click();
            await page.pause();
            await page.pause();
            await testInfo.attach(New.screenShotsformEmpty, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
            await page.getByRole('button', { name: New.buttonAccept.label }).click();
    
            afterEachData.textInNotif1=New.textInNotif1
            afterEachData.textInNotif2=New.textInNotif2
            afterEachData.textInNotif3=New.textInNotif3
    
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
                await testInfo.attach(New.screenformNotifications, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettingsAlternative.screenShotsContentType
                });
                const notificationDiv = await page.locator(MenuRDProjects.Notification.main.pageElementdiv).first();
                if (notificationDiv !== null) {
                await testInfo.attach(New.screenformLastNotifications, {
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
            }),
    

    test('Trazit-Projects-Development-MethodDevelopment-New-Cancel', async ({ page }, testInfo) => {
        await page.pause();
        await page.pause();
        await page.getByLabel(New.windowMethodDevelopment).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(New.screenShotsWindowMethodDevelopment, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(New.search.label).click();  
        await page.pause();
        await page.pause();
        await page.getByLabel(New.search.label).fill(New.search.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(New.scrennShotsSearch, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: New.search.button }).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(New.buttonNew).click();
        await testInfo.attach(New.screenShotsformFilled, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(New.fldSequenceName.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(New.fldSequenceName.label).fill(New.fldSequenceName.value);
        await page.pause();
        await page.pause();
        await page.getByLabel(New.fldPurpose.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(New.fldPurpose.label).fill(New.fldPurpose.value);
        await page.pause();
        await page.pause();
        await page.getByLabel(New.fldAnalyticalParameter.label).click();
        await page.pause();
        await page.pause();
        await page.getByRole('option', { name: New.fldAnalyticalParameter.option }).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(New.fldAnalysis.label).click();
        await page.pause();
        await page.pause();
        await page.getByRole('option', { name: New.fldAnalysis.option }).nth(0).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(New.fldResponsible.label).click();
        await page.pause();
        await page.pause();
        await page.getByRole('option', { name: New.fldResponsible.option }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(New.screenShotsformEmpty, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: New.buttonCancel.label }).click();

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
