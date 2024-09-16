import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { MenuRDProjects } from '../../trazit-models/test-config-R&DProjects-global';
import { NewFormula } from '../../trazit-models/test-config-R&DProjects-ProductDevelopment-NewFormula';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';


//Function with all tests.
const commonTests = () => {
    test('Trazit-R&D-Projects-Development-Open', async ({ page }) => {
      await page.getByLabel(NewFormula.windowFormulation).first().click();
      await page.pause();
      await page.pause();
      await page.close();
    })

    test('Trazit-R&D-Projects-Development-NewFormula-Accept', async ({ page }, testInfo) => {
        let afterEachData = {
            textInNotif1:"",
            textInNotif2:"",
            textInNotif3:"",
        }
        await page.pause();
        await page.getByLabel(NewFormula.windowFormulation).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(NewFormula.search.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(NewFormula.search.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(NewFormula.search.label).fill(NewFormula.search.value);
        await page.pause();
        await page.pause();
        await page.getByRole('button', { name: NewFormula.search.Search }).click();
        await page.pause();
        await page.pause();
        await page.getByRole('button', { name: NewFormula.search.option }).click();
        await page.pause();
        await page.pause();
        await page.getByRole('button', { name: NewFormula.search.Search }).click();
        await page.pause();
        await page.pause();
        await page.getByTitle(NewFormula.buttonNewFormula.label).getByLabel(NewFormula.buttonNewFormula.button).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(NewFormula.fldFormFormulation.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(NewFormula.fldFormFormulation.label).fill(NewFormula.fldFormFormulation.value);
        await page.pause();
        await page.pause();
        await page.getByLabel(NewFormula.fldFormPurpose.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(NewFormula.fldFormPurpose.label).fill(NewFormula.fldFormPurpose.value);
        await page.pause();
        await page.pause();
        await page.getByLabel(NewFormula.fldIngredientList.label).click();
        await page.pause();
        await page.pause();
        await page.getByRole(NewFormula.ingredientOption.role, { 
          name: NewFormula.ingredientOption.name, 
          exact: NewFormula.ingredientOption.exact 
        }).click();
        const { NewFormulaSelectors } = require('./selectors');

        (async () => {
          await page.getByRole(NewFormulaSelectors.ingredientOption.role, { 
            name: NewFormulaSelectors.ingredientOption.name, 
            exact: NewFormulaSelectors.ingredientOption.exact 
          }).click();

          await page.pause();
          await page.pause();

          await page.getByRole(NewFormulaSelectors.acceptButton.role, { 
            name: NewFormulaSelectors.acceptButton.name 
          }).click();
        })();
      
        afterEachData.textInNotif1=NewFormula.textInNotif1
        afterEachData.textInNotif2=NewFormula.textInNotif2
        afterEachData.textInNotif3=NewFormula.textInNotif3
      
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
          await testInfo.attach(NewFormula.screenformNotifications, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
          const notificationDiv = await page.locator(MenuRDProjects.Notification.main.pageElementdiv).first();
          if (notificationDiv !== null) {
            await testInfo.attach(NewFormula.screenformLastNotifications, {
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
        


    test('Trazit-R&D-Projects-Development-NewFormula-Cancel', async ({ page }, testInfo) => {
        await page.getByLabel(NewFormula.search.label).press(NewFormula.search.press);
        await page.getByLabel(NewFormula.search.label).click();
        await page.getByLabel(NewFormula.search.label).fill(NewFormula.search.value);
        await testInfo.attach(NewFormula.screenShotsWindowFormulation, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: NewFormula.search.action }).click();
        await testInfo.attach(NewFormula.scrennShotsSearch, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(NewFormula.windowFormulation).click();
        await page.getByLabel(NewFormula.buttonNewFormula.label, { exact: true }).click();
        await testInfo.attach(NewFormula.screenShotsformFilled, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(NewFormula.fldFormFormulation.label).click();
        await page.getByLabel(NewFormula.fldFormFormulation.label).press(NewFormula.fldFormFormulation.press);
        await page.getByLabel(NewFormula.fldFormFormulation.label).fill(NewFormula.fldFormFormulation.value);
        await page.getByLabel(NewFormula.fldFormPurpose.label).click();
        await page.getByLabel(NewFormula.fldFormPurpose.label).fill(NewFormula.fldFormPurpose.value);
        await testInfo.attach(NewFormula.screenShotsformEmpty, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
        await page.getByRole('button', { name: NewFormula.buttonCancel.label }).click();
        await testInfo.attach(NewFormula.screenShotsClickCancel, {
            body: await page.screenshot({ fullPage: true }),
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