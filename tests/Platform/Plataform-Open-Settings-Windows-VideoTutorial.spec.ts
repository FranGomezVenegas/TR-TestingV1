import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenSettingsWindow } from '../1TRAZiT-Commons/openSettingsWindows';


//Function with all tests.
const commonTests = () => {
  test('Trazit-Plataform-UserSettings-VideoTutorial-Open', async ({ page }, testInfo) => {
    await page.pause();
  })
}


test.describe('Desktop Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
      await page.setViewportSize({ width: 1365, height: 821 });
      const logPlat = new LogIntoPlatform({ page });
      const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
      await page.waitForTimeout(3000);
      const openWindow = new OpenSettingsWindow({ page });
      await page.waitForTimeout(3000);
      await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, platformMenuNames.mySettings.main, platformMenuNames.mySettings.videotutorial);
  });
  commonTests();
});

// test.describe('Mobile mode', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//       await page.setViewportSize({ width: 385, height: 812 });
//       const logPlat = new LogIntoPlatform({ page });
//       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow = new OpenSettingsWindow({ page });
//       await page.waitForTimeout(3000);
//       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.mySettings.mobile, platformMenuNames.mySettings.videotutorial);
//   });
//   commonTests();
// });

// test.describe('Mobile mode Retrato', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//       await page.setViewportSize({ width: 812, height: 385 });
//       const logPlat = new LogIntoPlatform({ page });
//       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow = new OpenSettingsWindow({ page });
//       await page.waitForTimeout(3000);
//       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.mySettings.mobile, platformMenuNames.mySettings.videotutorial);
//   });
//   commonTests();
// });

// test.describe('Tablets mode', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//       await page.setViewportSize({ width: 768, height: 1024 });
//       const logPlat = new LogIntoPlatform({ page });
//       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow = new OpenSettingsWindow({ page });
//       await page.waitForTimeout(3000);
//       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.mySettings.mobile, platformMenuNames.mySettings.videotutorial);
//   });
//   commonTests();
// });

// test.describe('Tablets mode Retrato', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//       await page.setViewportSize({ width: 1024, height: 768 });
//       const logPlat = new LogIntoPlatform({ page });
//       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow = new OpenSettingsWindow({ page });
//       await page.waitForTimeout(3000);
//       await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, platformMenuNames.mySettings.main, platformMenuNames.mySettings.videotutorial);
//   });
//   commonTests();
// });


const { test: pwTest, afterEach } = require('@playwright/test');

afterEach(async ({}, testInfo) => {
  const durationInSeconds = (testInfo.duration / 1000).toFixed(2);

  const data = {
    test_name: testInfo.title,
    duration: `${durationInSeconds} seconds`,
  };

  const testStatus = testInfo.status;
  await callApiRunCompletion(data, testStatus);
});

pwTest('Example test', async ({ page }) => {
    // Tu lógica de prueba aquí
});
