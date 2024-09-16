import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { changeES, changeEN } from '../../trazit-models/test-config.platform-changeLanguage';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

// Function with all tests.
const commonTests = () => {
  test('Trazit-Platform-ChangeES', async ({ page }, testInfo) => {
    await test.step('Get current language', async () => {
      const currentLanguage = await page.evaluate(() => document.documentElement.lang);
      console.log('Current language:', currentLanguage);
    });

    try {
      await test.step('Change language to English if needed', async () => {
        const currentLanguage = await page.evaluate(() => document.documentElement.lang);
        if (currentLanguage !== 'es') {
          await test.step('Find English button', async () => {
            const enButton = await page.getByRole('button', { name: changeES.en, exact: true });
            await test.step('Click English button if visible', async () => {
              if (await enButton.isVisible()) {
                await enButton.click();
                await page.waitForTimeout(1000); // Wait for any transitions or AJAX requests
              }
            });
          });
        }
      });

      await test.step('Click on Spanish button to change language', async () => {
        await test.step('Find Spanish button', async () => {
          const esButton = await page.getByRole('button', { name: changeES.es, exact: true });
          await test.step('Click Spanish button if visible', async () => {
            if (await esButton.isVisible()) {
              await esButton.click();
              await page.waitForTimeout(1000); // Wait for any transitions or AJAX requests
            }
          });
        });

        await testInfo.attach(changeES.screenAfterClickChangeES, {
          body: await page.screenshot({ fullPage: true }),
          contentType: ConfigSettingsAlternative.screenShotsContentType
        });
      });
    } catch (error) {
      await test.step('Handle error', async () => {
        console.error(changeES.error, error);
      });
    }
  });

  test('Trazit-Platform-ChangeEN', async ({ page }, testInfo) => {
    await test.step('Get current language', async () => {
      const currentLanguage = await page.evaluate(() => document.documentElement.lang);
      console.log('Current language:', currentLanguage);
    });

    try {
      await test.step('Change language to Spanish if needed', async () => {
        const currentLanguage = await page.evaluate(() => document.documentElement.lang);
        if (currentLanguage !== 'en') {
          await test.step('Find Spanish button', async () => {
            const esButton = await page.getByRole('button', { name: changeEN.es, exact: true });
            await test.step('Click Spanish button if visible', async () => {
              if (await esButton.isVisible()) {
                await esButton.click();
                await page.waitForTimeout(1000); // Wait for any transitions or AJAX requests
              }
            });
          });
        }
      });

      await test.step('Click on English button to change language', async () => {
        await test.step('Find English button', async () => {
          const enButton = await page.getByRole('button', { name: changeEN.en, exact: true });
          await test.step('Click English button if visible', async () => {
            if (await enButton.isVisible()) {
              await enButton.click();
              await page.waitForTimeout(1000); // Wait for any transitions or AJAX requests
            }
          });
        });

        await testInfo.attach(changeEN.screenAfterClickChangeEN, {
          body: await page.screenshot({ fullPage: true }),
          contentType: ConfigSettingsAlternative.screenShotsContentType
        });
      });
    } catch (error) {
      await test.step('Handle error', async () => {
        console.error(changeEN.error, error);
      });
    }
  });
};

// Desktop Mode
test.describe('Desktop Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await test.step('Set viewport size for Desktop Mode', async () => {
      await page.setViewportSize({ width: 1365, height: 821 });
    });

    await test.step('Log into platform and open settings', async () => {
      const logPlat = new LogIntoPlatform({ page });
      const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
      await page.waitForTimeout(3000);
      const openWindow = new OpenProcedureWindow({ page });
      await page.waitForTimeout(3000);
      // await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, platformMenuNames.changeLanguage.main, platformMenuNames.changeLanguage);
    });
  });

  commonTests();
});

// // Mobile Mode
// test.describe('Mobile Mode', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//     await test.step('Set viewport size for Mobile Mode', async () => {
//       await page.setViewportSize({ width: 385, height: 812 });
//     });

//     await test.step('Log into platform and open settings', async () => {
//       const logPlat = new LogIntoPlatform({ page });
//       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow = new OpenProcedureWindow({ page });
//       await page.waitForTimeout(3000);
//       // await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.changeLanguage.mobile, platformMenuNames.changeLanguage);
//     });
//   });

//   commonTests();
// });

// // Mobile Mode Retrato
// test.describe('Mobile Mode Retrato', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//     await test.step('Set viewport size for Mobile Mode Retrato', async () => {
//       await page.setViewportSize({ width: 812, height: 385 });
//     });

//     await test.step('Log into platform and open settings', async () => {
//       const logPlat = new LogIntoPlatform({ page });
//       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow = new OpenProcedureWindow({ page });
//       await page.waitForTimeout(3000);
//       // await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.changeLanguage.mobile, platformMenuNames.changeLanguage);
//     });
//   });

//   commonTests();
// });

// // Tablets Mode
// test.describe('Tablets Mode', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//     await test.step('Set viewport size for Tablets Mode', async () => {
//       await page.setViewportSize({ width: 768, height: 1024 });
//     });

//     await test.step('Log into platform and open settings', async () => {
//       const logPlat = new LogIntoPlatform({ page });
//       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow = new OpenProcedureWindow({ page });
//       await page.waitForTimeout(3000);
//       // await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.changeLanguage.mobile, platformMenuNames.changeLanguage);
//     });
//   });

//   commonTests();
// });

// // Tablets Mode Retrato
// test.describe('Tablets Mode Retrato', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//     await test.step('Set viewport size for Tablets Mode Retrato', async () => {
//       await page.setViewportSize({ width: 1024, height: 768 });
//     });

//     await test.step('Log into platform and open settings', async () => {
//       const logPlat = new LogIntoPlatform({ page });
//       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow = new OpenProcedureWindow({ page });
//       await page.waitForTimeout(3000);
//       // await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, platformMenuNames.changeLanguage.mobile, platformMenuNames.changeLanguage);
//     });
//   });

//   commonTests();
// });

// After Each Hook to log results
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