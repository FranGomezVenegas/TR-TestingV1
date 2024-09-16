import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { MenuRDProjects } from '../../trazit-models/test-config-R&DProjects-global';
import { TakePlatePicture } from '../../trazit-models/test-config-R&D-Projects-Development-DailyEntries-TakePlatePicture';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

//Function with all tests.
const commonTests = () => {
    test('Trazit-R&D-Projects-Development-DailyEntries-TakePlatePicute-StartCamara', async ({ page }, testInfo) => {
        await page.getByLabel(TakePlatePicture.windowDailyEntries).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(TakePlatePicture.screenShotsWindowDailyEntries, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
        await page.getByLabel(TakePlatePicture.search.label).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(TakePlatePicture.scrennShotsBeforeProject, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
        await page.getByLabel(TakePlatePicture.search.label).fill(TakePlatePicture.search.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(TakePlatePicture.scrennShotsSearchProject, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
        await page.getByRole('button', { name: TakePlatePicture.search.action }).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(TakePlatePicture.buttonName).first().click();
        await page.pause();
        await page.pause();
        await testInfo.attach(TakePlatePicture.screenShotsButton, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
        await page.getByRole('button', { name: TakePlatePicture.buttonStartCamara.label }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(TakePlatePicture.screenShotsStartCamera, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
    });


    test('Trazit-R&D-Projects-Development-DailyEntries-TakePlatePicute-Capture', async ({ page }, testInfo) => {
        await page.getByLabel(TakePlatePicture.windowDailyEntries).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(TakePlatePicture.screenShotsWindowDailyEntries, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
        await page.getByLabel(TakePlatePicture.search.label).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(TakePlatePicture.scrennShotsBeforeProject, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
        await page.getByLabel(TakePlatePicture.search.label).fill(TakePlatePicture.search.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(TakePlatePicture.scrennShotsSearchProject, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
        await page.getByRole('button', { name: TakePlatePicture.search.action }).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(TakePlatePicture.buttonName).first().click();
        await page.pause();
        await page.pause();
        await testInfo.attach(TakePlatePicture.screenShotsButton, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
        await page.getByRole('button', { name: TakePlatePicture.buttonStartCamara.label }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(TakePlatePicture.screenShotsStartCamera, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
        await page.getByRole('button', { name: TakePlatePicture.buttonStartCapture.label }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(TakePlatePicture.screenShotsCapture, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
    });

    test('Trazit-R&D-Projects-Development-DailyEntries-TakePlatePicute-Upload', async ({ page }, testInfo) => {
        await page.getByLabel(TakePlatePicture.windowDailyEntries).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(TakePlatePicture.screenShotsWindowDailyEntries, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
        await page.getByLabel(TakePlatePicture.search.label).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(TakePlatePicture.scrennShotsBeforeProject, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
        await page.getByLabel(TakePlatePicture.search.label).fill(TakePlatePicture.search.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(TakePlatePicture.scrennShotsSearchProject, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
        await page.getByRole('button', { name: TakePlatePicture.search.action }).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(TakePlatePicture.buttonName).first().click();
        await page.pause();
        await page.pause();
        await testInfo.attach(TakePlatePicture.screenShotsButton, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
        await page.getByRole('button', { name: TakePlatePicture.buttonStartCamara.label }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(TakePlatePicture.screenShotsStartCamera, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
        await page.getByRole('button', { name: TakePlatePicture.buttonStartCapture.label }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(TakePlatePicture.screenShotsCapture, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
        await page.getByRole('button', { name: TakePlatePicture.buttonStartUpload.label }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(TakePlatePicture.screenShotsCapture, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
    });

    test('Trazit-R&D-Projects-Development-DailyEntries-TakePlatePicute-Close', async ({ page }, testInfo) => {
        await page.getByLabel(TakePlatePicture.windowDailyEntries).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(TakePlatePicture.screenShotsWindowDailyEntries, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
        await page.getByLabel(TakePlatePicture.search.label).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(TakePlatePicture.scrennShotsBeforeProject, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
        await page.getByLabel(TakePlatePicture.search.label).fill(TakePlatePicture.search.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(TakePlatePicture.scrennShotsSearchProject, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
        await page.getByRole('button', { name: TakePlatePicture.search.action }).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(TakePlatePicture.buttonName).first().click();
        await page.pause();
        await page.pause();
        await testInfo.attach(TakePlatePicture.screenShotsButton, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
          });
        await page.locator(TakePlatePicture.closePicture.label).filter({ hasText: TakePlatePicture.closePicture.value }).nth(3).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(TakePlatePicture.screenShotsClose, {
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
