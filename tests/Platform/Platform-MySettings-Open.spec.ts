import { test, expect, Page, TestInfo } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';
import { OpenSettingsWindow } from '../1TRAZiT-Commons/openSettingsWindows';
import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';

// Array con las ventanas 
const windowsInfoArray = [
  {
    procedure: platformMenuNames.mySettings.main.pageElementName,
    screenShotsProcedure: platformMenuNames.mySettings.main.screenShotsName,

    pageElementName: platformMenuNames.mySettings.holidaysCalendar.pageElementName,
    screenShotsName: platformMenuNames.mySettings.holidaysCalendar.screenShotsName,
  },
  {
    procedure: platformMenuNames.mySettings.main.pageElementName,
    screenShotsProcedure: platformMenuNames.mySettings.main.screenShotsName,

    pageElementName: platformMenuNames.mySettings.incidents.pageElementName,
    screenShotsName: platformMenuNames.mySettings.incidents.screenShotsName,
  },
  {
    procedure: platformMenuNames.mySettings.main.pageElementName,
    screenShotsProcedure: platformMenuNames.mySettings.main.screenShotsName,

    pageElementName: platformMenuNames.mySettings.endPoints.pageElementName,
    screenShotsName: platformMenuNames.mySettings.endPoints.screenShotsName,
  },
  {
    procedure: platformMenuNames.mySettings.main.pageElementName,
    screenShotsProcedure: platformMenuNames.mySettings.main.screenShotsName,

    pageElementName: platformMenuNames.mySettings.userProfile.pageElementName,
    screenShotsName: platformMenuNames.mySettings.userProfile.screenShotsName,
  },
  {
    procedure: platformMenuNames.mySettings.main.pageElementName,
    screenShotsProcedure: platformMenuNames.mySettings.main.screenShotsName,

    pageElementName: platformMenuNames.mySettings.videotutorial.pageElementName,
    screenShotsName: platformMenuNames.mySettings.videotutorial.screenShotsName,
  }
];

// Función para abrir todas las ventanas según diferentes modos
async function openAllWindowsInMode(page: Page, testInfo: TestInfo, mode: string, openWindowFunction: (page: Page, testInfo: TestInfo, ConfigSettings: any, SettingsInfo: any, windowConfig: any) => Promise<void>) {
  await test.step(`Starting openAllWindowsInMode for mode: ${mode}`, async () => {
    const logPlat = new LogIntoPlatform(page);
    
    // Retrieve configuration settings
    const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
    console.log('ConfigSettings retrieved:', ConfigSettings);
    
    await page.waitForTimeout(3000);
    const openWindow = new OpenSettingsWindow();
    await page.waitForTimeout(3000);

    for (const windowConfig of windowsInfoArray) {
      await test.step(`Opening window with config: ${windowConfig.pageElementName}`, async () => {
        if (!windowConfig.pageElementName) {
          console.error(`windowConfig.pageElementName is undefined or null for config:`, windowConfig);
          return; 
        }

        // Abre la ventana y realiza acciones
        await openWindowFunction(page, testInfo, ConfigSettings, platformMenuNames.mySettings[mode], windowConfig);
        console.log(`Completed opening window: ${windowConfig.pageElementName}`);
      });
    }
  });
}

// Function with all tests
const commonTests = () => {
  test('Trazit-Platform-MySettings-Open', async ({ page }) => {
    await test.step('Pause the test execution', async () => {
      await page.pause();  
      await page.pause();
    });
  });
};

// Desktop Mode
test.describe('Desktop Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await test.step('Set Viewport Size for Desktop Mode', async () => {
      await page.setViewportSize({ width: 1365, height: 821 });
    });
    await test.step('Open All Windows in Desktop Mode', async () => {
      await openAllWindowsInMode(page, testInfo, 'main', async (page, testInfo, ConfigSettings, SettingsInfo, windowConfig) => {
        await test.step('Open Window for Desktop Mode', async () => {
          const openWindow = new OpenSettingsWindow();
          await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, SettingsInfo, windowConfig);
        });
      });
    });
  });
  commonTests();
});


// Mobile Mode
test.describe('Mobile Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 385, height: 812 });
    await openAllWindowsInMode(page, testInfo, 'mobile', async (page, testInfo, ConfigSettings, SettingsInfo, windowConfig) => {
      await test.step('Open window in Mobile Mode', async () => {
        const openWindow = new OpenSettingsWindow();
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, SettingsInfo, windowConfig);
      });
    });
  });
  commonTests();
});

// Mobile Mode Retrato
test.describe('Mobile Mode Retrato', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 812, height: 385 });
    await openAllWindowsInMode(page, testInfo, 'mobile', async (page, testInfo, ConfigSettings, SettingsInfo, windowConfig) => {
      await test.step('Open window in Mobile Mode Retrato', async () => {
        const openWindow = new OpenSettingsWindow();
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, SettingsInfo, windowConfig);
      });
    });
  });
  commonTests();
});

// Tablets Mode
test.describe('Tablets Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await openAllWindowsInMode(page, testInfo, 'mobile', async (page, testInfo, ConfigSettings, SettingsInfo, windowConfig) => {
      await test.step('Open window in Tablets Mode', async () => {
        const openWindow = new OpenSettingsWindow();
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, SettingsInfo, windowConfig);
      });
    });
  });
  commonTests();
});

// Tablets Mode Retrato
test.describe('Tablets Mode Retrato', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await openAllWindowsInMode(page, testInfo, 'main', async (page, testInfo, ConfigSettings, SettingsInfo, windowConfig) => {
      await test.step('Open window in Tablets Mode Retrato', async () => {
        const openWindow = new OpenSettingsWindow();
        await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, SettingsInfo, windowConfig);
      });
    });
  });
  commonTests();
});

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