import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';
import { MenuInstrumentsControl } from '../../trazit-models/test-config-instruments-global';
import { platformMenuNames } from '../../trazit-models/test-config-water-global';

import { Refresh } from '../../trazit-models/test-config-WaterMonitoring-PendingSampling-Refresh';
import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';


//Function with all tests.
const commonTests = () => {
  test('Trazit-WaterMonitoring-PendingSampling-Refresh', async ({ page }, testInfo) => {
      await page.pause();
      await page.getByLabel(Refresh.buttonRefresh).click();
      await page.pause();
      await page.pause();
      await testInfo.attach(Refresh.screenShotsRefresh, {
          body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
      await page.pause();
      await page.close();
  });
}


test.describe('Desktop Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1365, height: 821 }); 
    const logPlat = new LogIntoPlatform({page});
    const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
    await page.waitForTimeout(3000);
    const openWindow=new OpenProcedureWindow({page});
    await page.waitForTimeout(3000);
    await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, platformMenuNames.WaterMonitoring.main, platformMenuNames.WaterMonitoring.PendingSampling);
  
  });
      //And I call the tests.
      commonTests();
  });


// Mobile Mode 
test.describe('Mobile mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 385, height: 812 }); 
    const logPlat = new LogIntoPlatform({page});
    const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
    await page.waitForTimeout(3000);
    const openWindow=new OpenProcedureWindow({page}); 
    await page.waitForTimeout(3000);
    await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.WaterMonitoring.mobile, platformMenuNames.WaterMonitoring.PendingSampling);    
  
  });
  //And I call the tests.
  commonTests();
});

// Mobile Mode - Retrato
test.describe('Mobile mode Retrato', () => {
test.beforeEach(async ({ page }, testInfo) => {
  // Tamaño del viewport para móviles en modo retrato
  await page.setViewportSize({ width: 812, height: 385 }); 
  // Configuración común para ambos modos.
  const logPlat = new LogIntoPlatform({page});
  const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
  await page.waitForTimeout(3000);
  const openWindow=new OpenProcedureWindow({page}); 
  await page.waitForTimeout(3000);
  await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.WaterMonitoring.mobile, platformMenuNames.WaterMonitoring.PendingSampling);    
});
  commonTests();
});


// Tablets Mode
test.describe('Tablets mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 768, height: 1024 }); 
    const logPlat = new LogIntoPlatform({page});
    const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
    await page.waitForTimeout(3000);
    const openWindow=new OpenProcedureWindow({page}); 
    await page.waitForTimeout(3000);
    await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.WaterMonitoring.mobile, platformMenuNames.WaterMonitoring.PendingSampling);    
  });
  commonTests();
});

// Tablets Mode - Retrato
test.describe('Tablets mode Retrato', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1024, height: 768}); 
    const logPlat = new LogIntoPlatform({page});
    const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
    await page.waitForTimeout(3000);
    const openWindow=new OpenProcedureWindow({page});
    await page.waitForTimeout(3000);
    await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, platformMenuNames.WaterMonitoring.main, platformMenuNames.WaterMonitoring.PendingSampling);
    });
      //And I call the tests.
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
   
    await callApiRunCompletion(data, testStatus);
  });
   
  pwTest('Example test', async ({ page }) => {
    // Your test logic here
  });