import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { MenuStock } from '../../trazit-models/test-config-stock-global';
import { adjustQuantity as dataForTestFromFile } from '../../trazit-models/test-config-StockControl-ActiveInventoryLots-AdjustQuantity';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import {ConfirmDialogController} from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

import {Logger, NetworkInterceptor} from '../1TRAZiT-Commons/consoleAndNetworkMonitor';

//Function with all tests.
const  commonTests = async (ConfigSettings, page, testInfo) => {
  let afterEachData = {
      textInNotif1: "",
      textInNotif2: "",
      textInNotif3: "",
  };


    /// Create instances of Logger and NetworkInterceptor
    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();

    // Attach Logger and NetworkInterceptor to the page
    test.step('Attach Logger and NetworkInterceptor to the page', async () => {
        logger.attachToPage(page);
        networkInterceptor.attachToPage(page);
    });

    let adjustQuantity; 

    if (ConfigSettings!==undefined && ConfigSettings.dataForTest!== undefined ) {
      let validJsonString = ConfigSettings.dataForTest.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
   
      // Intenta convertir el string en un objeto JSON
      adjustQuantity = dataForTestFromFile;//JSON.parse(validJsonString);
    } else {
        adjustQuantity = dataForTestFromFile;
    }

  
    await test.step('Scroll to the select element', async () => {
      const selects = await page.getByText(adjustQuantity.select, { exact: true });
      try {
          await selects.click();
      } catch (error) {
          throw new Error(`The element "${adjustQuantity.select}" does not exist.`);
      }
      await selects.scrollIntoViewIfNeeded();
  });
  await page.pause();

  await test.step('Click on the select element and click button to adjustQuantity', async () => {
      try {
          await await page.getByText(adjustQuantity.select, { exact: true }).dblclick();
          await page.getByLabel(adjustQuantity.buttonName).nth(1).dblclick();
      } catch (error) {
          throw new Error(`The button "${adjustQuantity.buttonName}" does not exist.`);
      }
  });

  await page.pause();

  await test.step('Take a screenshot of the form when it is empty', async () => {
      await testInfo.attach(adjustQuantity.screenShotsFormEmpty, {
          body: await page.screenshot({ fullPage: true }),
          contentType: ConfigSettingsAlternative.screenShotsContentType
      });
  });

  await page.pause();

  await test.step('Fill in the quantity to adjustQuantity', async () => {
      try {
          await page.getByLabel(adjustQuantity.fldAdjustQuantity.label).click();
          await page.getByLabel(adjustQuantity.fldAdjustQuantity.label).fill(adjustQuantity.fldAdjustQuantity.value);
      } catch (error) {
          throw new Error(`The field "${adjustQuantity.fldAdjustQuantity.label}" does not exist.`);
      }
  });

  // Añadir el UOM (Unidad de Medida)
  await test.step('Select UOM (Unit of Measurement)', async () => {
      await page.getByLabel(adjustQuantity.fldUOM.label).click();
      await page.getByRole('option', { name: adjustQuantity.fldUOM.value, exact:true }).click();
  })

  await test.step('Take a screenshot of the form when it is filled', async () => {
      await testInfo.attach(adjustQuantity.screenShotsFormFilled, {
          body: await page.screenshot({ fullPage: true }),
          contentType: ConfigSettingsAlternative.screenShotsContentType
      });
  });

  await page.pause();

  await test.step('Click on the accept button', async () => {
      try {
          await page.getByRole('button', { name: adjustQuantity.buttonAccept.label }).click();
      } catch (error) {
          throw new Error(`The button "${adjustQuantity.buttonAccept.label}" does not exist.`);
      }
  });

  await page.pause();

  await test.step('Take a screenshot of the result', async () => {
      await testInfo.attach(adjustQuantity.screenResult, {
          body: await page.screenshot({ fullPage: true }),
          contentType: ConfigSettingsAlternative.screenShotsContentType
      });
  });

  await page.pause();

    // Verificar que no haya errores de consola
    await test.step('Log all captured logs and network data', async () => {
        logger.printLogs();
        networkInterceptor.printNetworkData();
    });
  
    await test.step('Verify no console errors', async () => {
        expect(logger.errors.length).toBe(0);
    });
  
    // Verificar respuestas de red capturadas
    await test.step('Verify network responses captured', async () => {
        const nullResponsesCount = networkInterceptor.verifyNonImageNullResponses();
        expect(nullResponsesCount).toBe(0);
    });
  

  afterEachData.textInNotif1 = adjustQuantity.textInNotif1;
  afterEachData.textInNotif2 = adjustQuantity.textInNotif2;
  afterEachData.textInNotif3 = adjustQuantity.textInNotif3;

  const viewportWidth = await page.evaluate(() => {
      return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  });

  if (viewportWidth >= 1024) {
      // Modo escritorio o tablet en modo paisaje
      const notificationElement = await page.locator(MenuStock.Notification.main.pageElement);
      if (notificationElement !== null) {
          await test.step('Hover over the notification element and check for "success"', async () => {
              await notificationElement.hover();
            //   const notificationText = (await notificationElement.textContent()) ?? '';
            //   if (!notificationText.includes('success')) {
            //       throw new Error(`The notification does not contain the expected text: ${notificationText}`);
            //   }
          });
        //   await testInfo.attach(adjustQuantity.screenformNotifications, {
        //       body: await page.screenshot({ fullPage: true }),
        //       contentType: ConfigSettingsAlternative.screenShotsContentType
        //   });
          const notificationDiv = await page.locator(MenuStock.Notification.main.pageElementdiv).first();
          if (notificationDiv !== null) {
            //   await testInfo.attach(adjustQuantity.screenformLastNotifications, {
            //       body: await notificationDiv.screenshot(),
            //       contentType: ConfigSettingsAlternative.screenShotsContentType
            //   });
          }
      }
  } else if (viewportWidth >= 768 && viewportWidth < 1024) {
      // Tablet en modo retrato
      await test.step('Click on the menu button and navigate to notifications', async () => {
          try {
              await page.click('mwc-icon-button.menu');
              await page.click('mwc-list-item#dashboardnotifications');
              const notificationElement = await page.locator('mwc-list-item#dashboardnotifications');
              const notificationText = (await notificationElement.textContent()) ?? '';
              if (!notificationText.includes('success')) {
                  throw new Error(`The notification does not contain the expected text: ${notificationText}`);
              }
          } catch (error) {
              throw new Error('Menu button or dashboard notifications not found.');
          }
        //   await testInfo.attach('TabletNotifications', {
        //       body: await page.screenshot({ fullPage: true }),
        //       contentType: ConfigSettingsAlternative.screenShotsContentType
        //   });
      });
  } else {
      // Modo móvil
      await test.step('Click on the menu button and navigate to notifications', async () => {
          try {
              await page.click('mwc-icon-button.menu');
              await page.click('mwc-list-item#dashboardnotifications');
              const notificationElement = await page.locator('mwc-list-item#dashboardnotifications');
              const notificationText = (await notificationElement.textContent()) ?? '';
              if (!notificationText.includes('success')) {
                  throw new Error(`The notification does not contain the expected text: ${notificationText}`);
              }
          } catch (error) {
              throw new Error('Menu button or dashboard notifications not found.');
          }
        //   await testInfo.attach('NotificationsMobile', {
        //       body: await page.screenshot({ fullPage: true }),
        //       contentType: ConfigSettingsAlternative.screenShotsContentType
        //   });
    });
}
}


let trazitTestName;
let ConfigSettings;
  
test.describe('Desktop Mode', () => {
  //Added the before common.  
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1365, height: 821 }); 
    const logPlat = new LogIntoPlatform({page});

    trazitTestName = testInfo.title
    ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName);

    await page.waitForTimeout(3000);
    const openWindow=new OpenProcedureWindow({page});
    await page.waitForTimeout(3000);
    await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuStock.Stock.main, MenuStock.Stock.ActiveInventoryLots);
  });
      //And I call the tests.
      test('ActiveInventoryLotsAdjustQuantityAccept', async ({page}, testInfo) => {
        await commonTests(ConfigSettings, page, testInfo);
      });
  });


   
// // Mobile Mode 
// test.describe('Mobile mode', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//     // Size of the viewport of a mobile device
//     await page.setViewportSize({ width: 385, height: 812 }); 
//     // Common configuration for both modes.
//     const logPlat = new LogIntoPlatform({page});
//     const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
//     const openWindow=new OpenProcedureWindow({page}); 
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.ActiveInventoryLots);    
  
//   });
//   //And I call the tests.
//   commonTests();
// });

// // Mobile Mode - Retrato
// test.describe('Mobile mode Retrato', () => {
// test.beforeEach(async ({ page }, testInfo) => {
//   // Tamaño del viewport para móviles en modo retrato
//   await page.setViewportSize({ width: 812, height: 385 }); 
//   // Configuración común para ambos modos.
//   const logPlat = new LogIntoPlatform({page});
//   const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
//   await page.waitForTimeout(3000);
//   const openWindow=new OpenProcedureWindow({page}); 
//   await page.waitForTimeout(3000);
//   await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.ActiveInventoryLots);    
// });
//   commonTests();
// });


// // Tablets Mode
// test.describe('Tablets mode', () => {
// test.beforeEach(async ({ page }, testInfo) => {
//   // Tamaño del viewport para móviles en modo retrato
//   await page.setViewportSize({ width: 768, height: 1024 }); 
//   // Configuración común para ambos modos.
//   const logPlat = new LogIntoPlatform({page});
//   const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
//   await page.waitForTimeout(3000);
//   const openWindow=new OpenProcedureWindow({page}); 
//   await page.waitForTimeout(3000);
//   await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.ActiveInventoryLots);    
// });
//   commonTests();
// });

// // Tablets Mode - Retrato
// test.describe('Tablets mode Retrato', () => {
// test.beforeEach(async ({ page }, testInfo) => {
//   // Tamaño del viewport para móviles en modo retrato
//   await page.setViewportSize({ width: 1024, height: 768}); 
//   // Configuración común para ambos modos.
//   const logPlat = new LogIntoPlatform({page});
//     const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
//     const openWindow=new OpenProcedureWindow({page});
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, MenuStock.Stock.mobile, MenuStock.Stock.ActiveInventoryLots);
//   });
//       //And I call the tests.
//       commonTests();
//   });


const { test: pwTest, afterEach } = require('@playwright/test');

afterEach(async ({}, testInfo) => {
  
  const durationInSeconds = (testInfo.duration / 1000).toFixed(2);

  const data = {
    test_name: testInfo.title,
    duration: `${durationInSeconds} seconds`,
  };

  const testStatus = testInfo.status;
  await callApiRunCompletion(data, testStatus, trazitTestName, testInfo)


});

pwTest('Example test', async ({ page }) => {
    // Tu lógica de prueba aquí
  });
  
