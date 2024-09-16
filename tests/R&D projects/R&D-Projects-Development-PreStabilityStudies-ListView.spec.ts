import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { MenuRDProjects } from '../../trazit-models/test-config-R&DProjects-global';
import { ListView } from '../../trazit-models/test-config-R&D-Projects-Development-PreStabilityStudies-ListView';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

//Function with all tests.
const commonTests = () => {
    test('Trazit-Projects-Development-MethodDevelopment-PreStabilityStudies-ListView-Open', async ({ page }, testInfo) => {
        await page.pause();
        await page.pause();
        await page.getByLabel(ListView.windowPreStabilityStudies).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(ListView.screenShotsWindowPreStabilityStudies, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(ListView.search.label).click();  
        await page.pause();
        await page.pause();
        await page.getByLabel(ListView.search.label).fill(ListView.search.value);
        await page.pause();
        await page.pause();
        await page.getByRole('button', { name: ListView.search.action }).click();
        await page.pause();
        await page.pause();
        await page.getByRole('button', { name: ListView.search.option }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(ListView.scrennShotsSearch, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('cell', { name: ListView.selectName.label }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(ListView.screenShotsSelectName, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByText(ListView.buttonListView).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(ListView.screenShotsbuttonListView, {
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



