import { test, expect } from '@playwright/test';
import {  platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { MenuStock } from '../../trazit-models/test-config-stock-global';
import { AddAttachment as dataForTestFromFile} from '../../trazit-models/test-config-StockControl-ActiveInventoryLots-AddAttachment';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

import {Logger, NetworkInterceptor} from '../1TRAZiT-Commons/consoleAndNetworkMonitor';

//Function with all tests.
const  commonTests = async (ConfigSettings, page, testInfo) => {
    let afterEachData = {
        textInNotif1: "",
        textInNotif2: "",
        textInNotif3: "",
    }

    // Crear instancias de Logger y NetworkInterceptor
    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();

    // Adjuntar Logger y NetworkInterceptor a la página
    await test.step('Attach Logger and NetworkInterceptor to the page', async () => {
        logger.attachToPage(page);
        networkInterceptor.attachToPage(page);
    });


    let AddAttachment; 

    if (ConfigSettings!==undefined && ConfigSettings.dataForTest!== undefined ) {
      let validJsonString = ConfigSettings.dataForTest.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
   
      // Intenta convertir el string en un objeto JSON
      AddAttachment = dataForTestFromFile;//JSON.parse(validJsonString);
    } else {
      AddAttachment = dataForTestFromFile;
    }

    // Interacción con la página y capturas de pantalla
    await page.getByText(AddAttachment.selectName, { exact: true }).click();
    await page.pause();
    // await testInfo.attach(AddAttachment.screenShotsSelect, {
    //     body: await page.screenshot({ fullPage: true }),
    //     contentType: ConfigSettingsAlternative.screenShotsContentType
    // });
    await page.getByTitle(AddAttachment.buttonName.title, { exact: true }).getByLabel(AddAttachment.buttonName.label).click();
    // await testInfo.attach(AddAttachment.screenShotsEmptyForm, {
    //     body: await page.screenshot({ fullPage: true }),
    //     contentType: ConfigSettingsAlternative.screenShotsContentType
    // });
    await page.getByLabel(AddAttachment.fldDocUrl.label).fill(AddAttachment.fldDocUrl.value);
    await page.getByLabel(AddAttachment.fldTitle.label).fill(AddAttachment.fldTitle.value);
    await page.getByRole('button', { name: AddAttachment.buttonAccept }).click();
    // await testInfo.attach(AddAttachment.screenShotsAccept, {
    //     body: await page.screenshot({ fullPage: true }),
    //     contentType: ConfigSettingsAlternative.screenShotsContentType
    // });
    await page.getByRole('button', { name: AddAttachment.buttonAccept }).nth(1).click();

    // await testInfo.attach(AddAttachment.screenShotsAccept, {
    //     body: await page.screenshot({ fullPage: true }),
    //     contentType: ConfigSettingsAlternative.screenShotsContentType
    // });


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
    
    await page.pause();
    await page.pause();
    await page.pause();
    

    // Procesar notificaciones y capturar screenshots según el modo
    afterEachData.textInNotif1 = AddAttachment.textInNotif1;
    afterEachData.textInNotif2 = AddAttachment.textInNotif2;
    afterEachData.textInNotif3 = AddAttachment.textInNotif3;

    // Obtener el modo de dispositivo usando page.evaluate
    const viewportWidth = await page.evaluate(() => {
        return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    });

    if (viewportWidth >= 1024) {
        const notificationElement = await page.locator(MenuStock.Notification.main.pageElement);
        if (notificationElement) {
            await notificationElement.hover();
          await page.pause();
          await page.pause();
          await page.pause();
          await page.pause();
          await page.pause();

        }
        // await testInfo.attach(AddAttachment.screenformNotifications, {
        //     body: await page.screenshot({ fullPage: true }),
        //     contentType: ConfigSettingsAlternative.screenShotsContentType
        // });
    } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        await page.click('mwc-icon-button.menu');
        await page.click('mwc-list-item#dashboardnotifications');
        // await testInfo.attach('TabletNotifications', {
        //     body: await page.screenshot({ fullPage: true }),
        //     contentType: ConfigSettingsAlternative.screenShotsContentType
        // });
    } else {
        await page.click('mwc-icon-button.menu');
        await page.click('mwc-list-item#dashboardnotifications');
        // await testInfo.attach('NotificationsMobile', {
        //     body: await page.screenshot({ fullPage: true }),
        //     contentType: ConfigSettingsAlternative.screenShotsContentType
        // });
    }
};


let trazitTestName;
let ConfigSettings;

test.describe('Desktop Mode', () => {
  //Added the before common.  
  //And I add another beforeEach for the navigation between the different tabs, this part is specific in each mode.
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
      test('ActiveInventoryLotsAddAttachmentAccept', async ({page}, testInfo) => {
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
//     await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.ActiveInventoryLots);
//     });
//       //And I call the tests.
//       commonTests();
//   });


const { test:pwTest, afterEach } = require('@playwright/test');
 
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
    // Your test logic here
  });