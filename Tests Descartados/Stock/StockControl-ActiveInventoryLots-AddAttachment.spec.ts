import { test, expect } from '@playwright/test';
import {  platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { MenuStock } from '../../trazit-models/test-config-stock-global';
import { AddAttachment as dataForTestFromFile} from '../../trazit-models/test-config-StockControl-ActiveInventoryLots-AddAttachment';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import {ConfirmDialogController} from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

import {Logger, NetworkInterceptor} from '../1TRAZiT-Commons/consoleAndNetworkMonitor';

//Function with all tests.
const  commonTests = async (ConfigSettings, page, testInfo) => {
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
        await page.getByText(AddAttachment.selectName, {exact: true}).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddAttachment.screenShotsSelect, {
            body: await page.screenshot({fullPage: true }), 
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByTitle(AddAttachment.buttonName.title, { exact: true }).getByLabel(AddAttachment.buttonName.label).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddAttachment.screenShotsEmptyForm, {
            body: await page.screenshot({fullPage: true }), 
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByLabel(AddAttachment.fldDocUrl.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(AddAttachment.fldDocUrl.label).fill(AddAttachment.fldDocUrl.value);
        await page.pause();
        await page.pause();
        await page.getByLabel(AddAttachment.fldTitle.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(AddAttachment.fldTitle.label).fill(AddAttachment.fldTitle.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(AddAttachment.screenShotsFilledForm, {
          body: await page.screenshot({fullPage: true }), 
          contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: AddAttachment.buttonAccept }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddAttachment.screenShotsAccept, {
            body: await page.screenshot({fullPage: true }), 
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.getByRole('button', { name: AddAttachment.buttonCancel }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(AddAttachment.screenShotsCancel, {
            body: await page.screenshot({fullPage: true }), 
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });

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
      test('ActiveInventoryLotsAddAttachmentCancel', async ({page}, testInfo) => {
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