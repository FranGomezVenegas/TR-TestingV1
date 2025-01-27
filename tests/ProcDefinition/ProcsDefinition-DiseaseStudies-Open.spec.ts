import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoProcDefinition } from '../1TRAZiT-Commons/logIntoProcDefinition';
import { Home } from '../../trazit-models/test-config-ProcsDefinition-Home';
import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { OpenModuleWindow } from '../1TRAZiT-Commons/openModuleWindows';

// Function with all tests.
const commonTests = () => {
  test('Trazit-ProceduresDefinition-DiseaseStudies-Open', async ({ page }, testInfo) => {
    page.pause();
    page.pause();
  });

  test('Trazit-ProceduresDefinition-DiseaseStudies-Home', async ({ page }, testInfo) => {
    page.pause();
    page.pause();
    await page.getByRole('button', { name: Home.buttonHome }).click();
    page.pause();
    page.pause();
    page.pause();
    await testInfo.attach(Home.screenShotsHome, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
  });
}

test.describe('Desktop Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1365, height: 821 });
    const logProc = new LogIntoProcDefinition(page);
    const ConfigSettings = await logProc.commonBeforeEach(page, testInfo);
    await page.waitForTimeout(3000);
    const moduleWindow = new OpenModuleWindow(page);
    await moduleWindow.openModule('DiseaseStudies', testInfo, ConfigSettings);
  });
  commonTests();
});

// Mobile Mode 
test.describe('Mobile Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 385, height: 812 }); 
    const logProc = new LogIntoProcDefinition(page);
    const ConfigSettings = await logProc.commonBeforeEach(page, testInfo);
    await page.waitForTimeout(3000);
    const moduleWindow = new OpenModuleWindow(page);
    await moduleWindow.openModule('DiseaseStudies', testInfo, ConfigSettings);
  });
  commonTests();
});

// Mobile Mode - Retrato
test.describe('Mobile Mode - Retrato', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 812, height: 385 }); 
    const logProc = new LogIntoProcDefinition(page);
    const ConfigSettings = await logProc.commonBeforeEach(page, testInfo);
    await page.waitForTimeout(3000);
    const moduleWindow = new OpenModuleWindow(page);
    await moduleWindow.openModule('DiseaseStudies', testInfo, ConfigSettings);
  });
  commonTests();
});

// Tablets Mode
test.describe('Tablets Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 768, height: 1024 }); 
    const logProc = new LogIntoProcDefinition(page);
    const ConfigSettings = await logProc.commonBeforeEach(page, testInfo);
    await page.waitForTimeout(3000);
    const moduleWindow = new OpenModuleWindow(page);
    await moduleWindow.openModule('DiseaseStudies', testInfo, ConfigSettings);
  });
  commonTests();
});

// Tablets Mode - Retrato
test.describe('Tablets Mode - Retrato', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1024, height: 768 }); 
    const logProc = new LogIntoProcDefinition(page);
    const ConfigSettings = await logProc.commonBeforeEach(page, testInfo);
    await page.waitForTimeout(3000);
    const moduleWindow = new OpenModuleWindow(page);
    await moduleWindow.openModule('DiseaseStudies', testInfo, ConfigSettings);
  });
  commonTests();
});

const { test: pwTest, afterEach } = require('@playwright/test');

afterEach(async ({}, testInfo) => {
  const data = {
    test_name: testInfo.title,
    duration: testInfo.duration,
  };

  const testStatus = testInfo.status; // 'passed', 'failed', 'timedOut', 'skipped'

  await callApiRunCompletion(data, testStatus);
});

pwTest('Example test', async ({ page }) => {
  // Your test logic here
});
