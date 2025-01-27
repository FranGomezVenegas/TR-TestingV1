import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';
import {MenuInstrumentsControl} from '../../trazit-models/test-config-instruments-global';

import { MenuLots, Menu } from '../../trazit-models/test-config-lots-global';
import { LotsViewSearch } from '../../trazit-models/test-config-losts-lots-view-search';
import { Summary } from '../../trazit-models/test-config-Lots-Summary';
import { EnterResult } from '../../trazit-models/test-config-Lots-View-Summary-InventoryRetain-EnterResult';

import { callApiEndpoint } from '../../trazit-models/test-config-Call-ApiName';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';



//Function with all tests.
const commonTests = () => {
    test('Trazit-LotsView-Summary-LotSample-EnterResult-Accept', async ({ page }, testInfo) => {
      await page.pause();
        await page.pause();
        await page.getByLabel(Summary.buttonSummary).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(Summary.screenShotsButtonSummary, {
            body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
        await page.pause();
        await page.getByLabel(LotsViewSearch.buttonName).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsViewSearch.fldSearch.label).fill(LotsViewSearch.fldSearch.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(LotsViewSearch.screenShotsFormFilled, {
            body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
        await page.pause();
        await page.getByRole('button', { name: LotsViewSearch.buttonSearch.label }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(LotsViewSearch.screenShotsSearch, {
            body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
        await page.pause();
        await page.pause();

        await page.getByLabel(EnterResult.buttonName).click();
        await page.pause();
        await testInfo.attach(EnterResult.screenShotsEnterResult, {
          body: await page.screenshot({fullPage: true}), 
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
        await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuLots.Lots.main, MenuLots.Lots.lostView);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.lostView);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.lostView);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.lostView);
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
        await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, MenuLots.Lots.main, MenuLots.Lots.lostView);
    });
    commonTests();
  });
  
    
  const { test:pwTest, afterEach } = require('@playwright/test');
   
  afterEach(async ({}, testInfo) => {
    // Example JSON data, could be anything relevant to your tests
    const data = {
      test_name: testInfo.title,
      duration: testInfo.duration,
      // other test-related data you might want to send
    };
   
    // Determine the test outcome
    const testStatus = testInfo.status; // 'passed', 'failed', 'timedOut', 'skipped'
   
    await callApiEndpoint(data, testStatus);
  });
   
  pwTest('Example test', async ({ page }) => {
    // Your test logic here
  });
  