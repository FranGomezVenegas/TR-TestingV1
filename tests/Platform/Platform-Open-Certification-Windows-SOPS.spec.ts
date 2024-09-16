import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenMyCertificationsWindow } from '../1TRAZiT-Commons/openMyCertificationsWindows';


//Function with all tests.
const commonTests = () => {
  test('Trazit-Platform-Open-sops', async ({ page }, testInfo) => {
    const logs: { message: any, type: string }[] = [];
    const errors: Error[] = [];

    // Captura los mensajes de la consola
    page.on('console', (message) => {
      logs.push({ message: message.text(), type: message.type() });
    });

    // Captura los errores de la página
    page.on('pageerror', (exception) => {
      errors.push(exception);
    });

    await page.pause();
    await page.pause();

    console.log('Console logs:', logs);
    console.log('Page errors:', errors);

    expect.soft(errors.length).toBe(0);
    expect(errors.length).toBe(0);
  });
}


test.describe('Desktop Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
      await page.setViewportSize({ width: 1365, height: 821 });
      const logPlat = new LogIntoPlatform({ page });
      const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
      await page.waitForTimeout(3000);
      const openWindow = new OpenMyCertificationsWindow({ page });
      await page.waitForTimeout(3000);
      await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, platformMenuNames.myCertification.main, platformMenuNames.myCertification.SOP);
  });
  commonTests();
});

// test.describe('Mobile mode', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//       await page.setViewportSize({ width: 385, height: 812 });
//       const logPlat = new LogIntoPlatform({ page });
//       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow = new OpenMyCertificationsWindow({ page });
//       await page.waitForTimeout(3000);
//       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.myCertification.mobile, platformMenuNames.myCertification.SOP);
//   });
//   commonTests();
// });

// test.describe('Mobile mode Retrato', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//       await page.setViewportSize({ width: 812, height: 385 });
//       const logPlat = new LogIntoPlatform({ page });
//       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow = new OpenMyCertificationsWindow({ page });
//       await page.waitForTimeout(3000);
//       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.myCertification.mobile, platformMenuNames.myCertification.SOP);
//   });
//   commonTests();
// });

// test.describe('Tablets mode', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//       await page.setViewportSize({ width: 768, height: 1024 });
//       const logPlat = new LogIntoPlatform({ page });
//       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow = new OpenMyCertificationsWindow({ page });
//       await page.waitForTimeout(3000);
//       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.myCertification.mobile, platformMenuNames.myCertification.SOP);
//   });
//   commonTests();
// });

// test.describe('Tablets mode Retrato', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//       await page.setViewportSize({ width: 1024, height: 768 });
//       const logPlat = new LogIntoPlatform({ page });
//       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow = new OpenMyCertificationsWindow({ page });
//       await page.waitForTimeout(3000);
//       await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, platformMenuNames.myCertification.main, platformMenuNames.myCertification.SOP);
//   });
//   commonTests();
// });


const { test: pwTest, afterEach } = require('@playwright/test');

// After Each Hook to log results
test.afterEach(async ({ page }, testInfo) => {
  const durationInSeconds = (testInfo.duration / 1000).toFixed(2);
  await test.step('Log test results', async () => {
  const data = {
    test_name: testInfo.title,
    duration: `${durationInSeconds} seconds`,
  };

  const testStatus = testInfo.status;
  await callApiRunCompletion(data, testStatus);
  })
});

pwTest('Example test', async ({ page }) => {
    // Tu lógica de prueba aquí
});
