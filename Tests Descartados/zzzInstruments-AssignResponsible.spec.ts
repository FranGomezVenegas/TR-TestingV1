import { test, expect } from '@playwright/test' ;
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';
import { MenuInstrumentsControl } from '../../trazit-models/test-config-instruments-global';

import { AssignResponsibleInstruments, AssignResponsibleBackupInstruments } from '../../trazit-models/test-config-instruments-assignResponsible';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';


//Function with all tests.
const commonTests = () => {
  test('Trazit-Instruments-AssignResponsible', async ({ page }, testInfo) => {  
    await page.pause();
    await page.getByLabel(AssignResponsibleInstruments.buttonName).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AssignResponsibleInstruments.screenShotsFormFilled, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.pause();
    await page.getByLabel(AssignResponsibleInstruments.fldResponsible.label).nth(0).click(); 
    await page.pause();
    await page.getByText(AssignResponsibleInstruments.fldResponsible.value).nth(1).click(); 
    await page.pause();
    await page.pause();
    await testInfo.attach(AssignResponsibleInstruments.screenShotsAfterAssignResponsible , {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.pause();
    await page.pause();
    //await page.close();
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
        await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.main, MenuInstrumentsControl.Instruments.activeInstrument);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.activeInstrument);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.activeInstrument);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.activeInstrument);
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
        await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.activeInstrument);
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
  




  
