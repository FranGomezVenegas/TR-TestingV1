import { test, expect } from '@playwright/test';
import {  platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { MenuStock } from '../../trazit-models/test-config-stock-global';
import { AddAttachmentWAS as dataForTestFromFile} from '../../trazit-models/test-config-StockControl-ActiveInventoryLots-AddAttachmentWAS';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

import {Logger, NetworkInterceptor} from '../1TRAZiT-Commons/consoleAndNetworkMonitor';


const fs = require('fs').promises;


//Function with all tests.
const  commonTests = async (ConfigSettings, page, testInfo) => {
    let afterEachData = {
        textInNotif1:"",
        textInNotif2:"",
        textInNotif3:"",
    }

    // Crear instancias de Logger y NetworkInterceptor
    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();

    // Adjuntar Logger y NetworkInterceptor a la página
    await test.step('Attach Logger and NetworkInterceptor to the page', async () => {
        logger.attachToPage(page);
        networkInterceptor.attachToPage(page);
    });

    let AddAttachmentWAS; 

    if (ConfigSettings!==undefined && ConfigSettings.dataForTest!== undefined ) {
      let validJsonString = ConfigSettings.dataForTest.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
   
      // Intenta convertir el string en un objeto JSON
      AddAttachmentWAS = dataForTestFromFile;//JSON.parse(validJsonString);
    } else {
      AddAttachmentWAS = dataForTestFromFile;
    }

    // Ruta al archivo que deseo subir (para no hacerlo manualmente siempre, sino que ya haya un archivo predeterminado de prueba).
    const filePath = 'D:\\FrontE-Testing-master\\testingAWS.txt';
    // Capturo el contenido del archivo antes de subirlo
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // Y empiezo a realizar las acciones necesarias para llevar acabo la subida del archivo.
    // Selecciono un nombre de Lote, luego clico al botón de Add Attachment WAS y finalmente clico en Choose Or Drop para subir el archivo que he añadido anteriormente en la ruta.
    await page.getByText(AddAttachmentWAS.selectName, { exact: true }).click();
    await page.pause();
    await page.pause();
    await page.getByTitle(AddAttachmentWAS.buttonName.title).getByLabel(AddAttachmentWAS.buttonName.label).click();
    await page.pause();
    await page.pause();
    await page.getByText(AddAttachmentWAS.chooseOrDrop).click();
    await page.pause();
    await page.pause();

    // Selecciono y subo el archivo
    //const input = await page.getByLabel(AddAttachmentWAS.uploadFile);
    const input = await page.locator('input[type="file"]');
    await input.setInputFiles(filePath);

    // Espero la subida del archivo 
    await page.getByLabel(AddAttachmentWAS.uploadFile).click();

    // Verifico que el contenido del archivo
    console.log('\nContenido del archivo:\n', fileContent);

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


    afterEachData.textInNotif1=AddAttachmentWAS.textInNotif1
    afterEachData.textInNotif2=AddAttachmentWAS.textInNotif2
    afterEachData.textInNotif3=AddAttachmentWAS.textInNotif3

    // Obtener el modo de dispositivo usando page.evaluate
    const viewportWidth = await page.evaluate(() => {
        return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    });
    
    if (viewportWidth >= 1024) {
        // Modo escritorio o tablet en modo paisaje
        const notificationElement = await page.locator(MenuStock.Notification.main.pageElement);
        await page.waitForSelector(notificationElement, {timeout: 60000})
        if (notificationElement !== null) {
        await notificationElement.hover();
        }
        await testInfo.attach(AddAttachmentWAS.screenformNotifications, {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        const notificationDiv = await page.locator(MenuStock.Notification.main.pageElementdiv).first();
        await page.waitForSelector(notificationDiv, {timeout: 60000})

        if (notificationDiv !== null) {
        await testInfo.attach(AddAttachmentWAS.screenformLastNotifications, {
            body: await notificationDiv.screenshot(),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        }
    } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        // Tablet en modo retrato
        await page.click('mwc-icon-button.menu');
        await page.waitForSelector("mwc-list-item#dashboardnotifications", {timeout: 60000})
        await page.click('mwc-list-item#dashboardnotifications');


        await testInfo.attach('TabletNotifications', {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    } else {
        // Modo móvil
        await page.click('mwc-icon-button.menu');
        await page.click('mwc-list-item#dashboardnotifications');
        await testInfo.attach('NotificationsMobile', {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType
        });
      }; 
    }
    

let trazitTestName;
let ConfigSettings;

test.describe('Desktop Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.pause();
    await page.pause();
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
      test('ActiveInventoryLotsAddAttachmentAWSAccept', async ({page}, testInfo) => {
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