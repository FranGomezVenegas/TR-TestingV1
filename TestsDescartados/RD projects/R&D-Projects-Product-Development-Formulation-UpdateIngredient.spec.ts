import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { MenuRDProjects } from '../../trazit-models/test-config-R&DProjects-global';
import { UpdateIngredient } from '../../trazit-models/test-config-R&D-Projects-Product-Development-UpdateIngredient';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';


//Function with all tests.
const commonTests = () => {
    test('Trazit-R&D-Projects-Development-UpdateIngredient-Accept', async ({ page }, testInfo) => {
        let afterEachData = {
            textInNotif1:"",
            textInNotif2:"",
            textInNotif3:"",
        }
        await page.getByLabel('Formulation').click();
        await page.getByLabel('* Project').click();  
        await page.getByLabel('* Project').fill('ALL');
        await page.getByRole('button', { name: 'Search' }).click();
        await page.getByRole('button', { name: 'DevName' }).click();

        await page.getByRole('cell', { name: UpdateIngredient.selectFormula.label }).locator(UpdateIngredient.selectFormula.locator).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(UpdateIngredient.screenShotsSelectFormula, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('row', { name: UpdateIngredient.selectIngredient.label }).getByLabel(UpdateIngredient.buttonUpdateIngredient.label).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(UpdateIngredient.screenShotsformFilled, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(UpdateIngredient.fldQuantity.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(UpdateIngredient.fldQuantity.label).fill(UpdateIngredient.fldQuantity.value);
        await page.pause();
        await page.pause();
        await page.getByLabel(UpdateIngredient.fldUom.label).click();
        await page.pause();
        await page.pause();
        await page.getByRole('option', { name: UpdateIngredient.fldUom.value }).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(UpdateIngredient.fldNotes.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(UpdateIngredient.fldNotes.label).press(UpdateIngredient.fldNotes.press);
        await page.pause();
        await page.pause();
        await page.getByLabel(UpdateIngredient.fldNotes.label).fill(UpdateIngredient.fldNotes.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(UpdateIngredient.screenShotsformEmpty, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.pause();
        await page.getByRole('button', { name: UpdateIngredient.buttonAccept.label }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(UpdateIngredient.screenShotsClickAccept, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        
        afterEachData.textInNotif1=UpdateIngredient.textInNotif1
        afterEachData.textInNotif2=UpdateIngredient.textInNotif2
        afterEachData.textInNotif3=UpdateIngredient.textInNotif3

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
            await testInfo.attach(UpdateIngredient.screenformNotifications, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
            });
            const notificationDiv = await page.locator(MenuRDProjects.Notification.main.pageElementdiv).first();
            if (notificationDiv !== null) {
            await testInfo.attach(UpdateIngredient.screenformLastNotifications, {
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
        })

    test('Trazit-R&D-Projects-Development-UpdateIngredient-Cancel', async ({ page }, testInfo) => {
        await page.getByLabel(UpdateIngredient.search.label).press(UpdateIngredient.search.press);
        await page.pause();
        await page.pause();
        await page.getByLabel(UpdateIngredient.search.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(UpdateIngredient.search.label).fill(UpdateIngredient.search.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(UpdateIngredient.screenShotsWindowFormulation, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        
        await page.getByRole('cell', { name: UpdateIngredient.selectFormula.label }).locator(UpdateIngredient.selectFormula.locator).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(UpdateIngredient.screenShotsSelectFormula, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('row', { name: UpdateIngredient.selectIngredient.label }).getByLabel(UpdateIngredient.buttonUpdateIngredient.label).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(UpdateIngredient.screenShotsformFilled, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(UpdateIngredient.fldQuantity.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(UpdateIngredient.fldQuantity.label).fill(UpdateIngredient.fldQuantity.value);
        await page.pause();
        await page.pause();
        await page.getByLabel(UpdateIngredient.fldUom.label).click();
        await page.pause();
        await page.pause();
        await page.getByRole('option', { name: UpdateIngredient.fldUom.value }).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(UpdateIngredient.fldNotes.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(UpdateIngredient.fldNotes.label).press(UpdateIngredient.fldNotes.press);
        await page.pause();
        await page.pause();
        await page.getByLabel(UpdateIngredient.fldNotes.label).fill(UpdateIngredient.fldNotes.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(UpdateIngredient.screenShotsformEmpty, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.pause();
        await page.getByRole('button', { name: UpdateIngredient.buttonCancel.label }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(UpdateIngredient.screenShotsClickCancel, {
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
