import { test, expect, Page, TestInfo } from '@playwright/test';
import { platformMenuNames, ConfigSettings } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';
import { MenuInstrumentsControl } from '../../trazit-models/test-config-instruments-global';
import { ACTIONS } from './actions';

// Array con las ventanas
export const windowsInfoArray = [
  {
    pageElement: MenuInstrumentsControl.Instruments.main.pageElement.label,
    instrumentsScreenShotsName: MenuInstrumentsControl.Instruments.main.screenShotsName,
    pageElementName: MenuInstrumentsControl.Instruments.activeInstrument.pageElement,
    screenShotsNameUrl: MenuInstrumentsControl.Instruments.activeInstrument.screenShotsName,
  },
  {
    // pageElement: "sp-action-menu#instruments",
    pageElement: MenuInstrumentsControl.Instruments.main.pageElement.label,
    instrumentsScreenShotsName: MenuInstrumentsControl.Instruments.main.screenShotsName,
    pageElementName: MenuInstrumentsControl.Instruments.activeInstrument.pageElement,
    screenShotsNameUrl: MenuInstrumentsControl.Instruments.activeInstrument.screenShotsName,
  }
];

// Función para abrir todas las ventanas según diferentes modos
async function openAllWindowsInMode(
  page: Page,
  testInfo: TestInfo,
  mode: string,
  openWindowFunction: (page: Page, testInfo: TestInfo, ConfigSettings: any, procedureInfo: any, windowConfig: any) => Promise<void>
) {
  await test.step(`Starting openAllWindowsInMode for mode: ${mode}`, async () => {
    const logPlat = new LogIntoPlatform(page);
    const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
    console.log('ConfigSettings retrieved:', ConfigSettings);

    await page.waitForTimeout(3000); 

    for (const windowConfig of windowsInfoArray) {
      await test.step(`Opening window with config: ${windowConfig.pageElementName}`, async () => {
        if (!windowConfig.pageElementName) {
          console.error(`windowConfig.pageElementName is undefined or null for config:`, windowConfig);
          return; 
        }

        try {
          const procedureMenuSelector = platformMenuNames.procedure[mode]?.pageElementName;
          if (procedureMenuSelector) {
            await page.locator(procedureMenuSelector).click();
            await page.waitForTimeout(3000); 
            console.log(`Clicked on procedure menu: ${procedureMenuSelector}`);
          } else {
            console.error(`No se encontró el menú de procedimiento para el modo: ${mode}`);
            return;
          }

          if (windowConfig.pageElement) {
            await page.locator(windowConfig.pageElement).waitFor({ state: 'visible' });
            await page.locator(windowConfig.pageElement).click();
            await page.waitForTimeout(3000); 
            console.log(`Clicked on menu: ${windowConfig.pageElement}`);
          }

          if (windowConfig.pageElementName) {
            await page.goto(windowConfig.pageElementName); 
            await page.waitForLoadState('networkidle'); 
            console.log(`Navigated to URL: ${windowConfig.pageElementName}`);
          }

          console.log('Procedure Info:', platformMenuNames.procedure[mode]);
          console.log('Window Config:', windowConfig);
          
          await test.step('Platform actions begin', async () => {
            await ACTIONS.createNewFolder(page);
            await testInfo.attach("Form Empty", {
              body: await page.screenshot({ fullPage: true }), 
              contentType: ConfigSettings.screenShotsContentType
            });

            await ACTIONS.newInstrumentsName(page);
            await ACTIONS.selectFamily(page);
            await ACTIONS.model(page);
            await ACTIONS.selectSupplier(page);
            await ACTIONS.serialNumber(page);
            await ACTIONS.selectManafucterName(page);
            await ACTIONS.selectResponsible(page);
            await ACTIONS.selectResponsibleBackup(page);
            await ACTIONS.purchaseDate(page);
            await ACTIONS.installationDate(page);

            await testInfo.attach("Form Filled", {
              body: await page.screenshot({ fullPage: true }), 
              contentType: ConfigSettings.screenShotsContentType
            });

            await ACTIONS.cancelOrAccept(page);
          });

          await openWindowFunction(page, testInfo, ConfigSettings, platformMenuNames.procedure[mode], windowConfig);
          console.log(`Completed opening window: ${windowConfig.pageElementName}`);

          await page.waitForTimeout(3000); 

        } catch (error) {
          console.error(`Failed to open window with config: ${windowConfig.pageElementName}`, error);
        }
      });
    }
  });
}

// Function with all tests
const commonTests = () => {
  test('Trazit-Instruments-New', async ({ page }) => {
    await page.pause();  
  });
};

// Desktop Mode
test.describe('Desktop Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1365, height: 821 });
    await openAllWindowsInMode(page, testInfo, 'main', async (page, testInfo, ConfigSettings, procedureInfo, windowConfig) => {
      await new OpenProcedureWindow(page).openWindowForDesktop(page, testInfo, ConfigSettings, procedureInfo, windowConfig);
    });
  });
  commonTests();
});

// Mobile Mode
test.describe('Mobile Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 385, height: 812 });
    await openAllWindowsInMode(page, testInfo, 'mobile', async (page, testInfo, ConfigSettings, procedureInfo, windowConfig) => {
      await new OpenProcedureWindow(page).openWindowForMobile(page, testInfo, ConfigSettings, procedureInfo, windowConfig);
    });
  });
  commonTests();
});

// Mobile Mode Retrato
test.describe('Mobile Mode Retrato', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 812, height: 385 });
    await openAllWindowsInMode(page, testInfo, 'mobile', async (page, testInfo, ConfigSettings, procedureInfo, windowConfig) => {
      await new OpenProcedureWindow(page).openWindowForMobile(page, testInfo, ConfigSettings, procedureInfo, windowConfig);
    });
  });
  commonTests();
});

// Tablets Mode
test.describe('Tablets Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await openAllWindowsInMode(page, testInfo, 'mobile', async (page, testInfo, ConfigSettings, procedureInfo, windowConfig) => {
      await new OpenProcedureWindow(page).openWindowForMobile(page, testInfo, ConfigSettings, procedureInfo, windowConfig);
    });
  });
  commonTests();
});

// Tablets Mode Retrato
test.describe('Tablets Mode Retrato', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await openAllWindowsInMode(page, testInfo, 'main', async (page, testInfo, ConfigSettings, procedureInfo, windowConfig) => {
      await new OpenProcedureWindow(page).openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, procedureInfo, windowConfig);
    });
  });
  commonTests();
});
