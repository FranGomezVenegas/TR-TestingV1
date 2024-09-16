import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { MenuStock } from '../../trazit-models/test-config-stock-global';
import { Export } from '../../trazit-models/test-config-StockControl-ActiveInventoryLots-Export';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

import {Logger, NetworkInterceptor} from '../1TRAZiT-Commons/consoleInterceptionAndRequestResponse';


const commonTests = () => {
  test('Trazit-StockControl-ActiveInventoryLots-Export-MultiSelect', async ({ page }, testInfo) => {
    // Create instances of Logger and NetworkInterceptor
    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();

    // Attach Logger and NetworkInterceptor to the page
    test.step('Attach Logger and NetworkInterceptor to the page', async () => {
        logger.attachToPage(page);
        networkInterceptor.attachToPage(page);
    });
    await page.pause();
   
    const select1 = page.getByText(Export.select1Name);
    await select1.scrollIntoViewIfNeeded();
    await select1.click();
    await page.pause();
    await page.pause();
    const select2 = page.getByText(Export.select2Name);
    await select2.scrollIntoViewIfNeeded();
    await select2.click();
    await page.pause();
    await page.pause();
    const select3 = page.getByText(Export.select3Name);
    await select3.scrollIntoViewIfNeeded();
    await select3.click();
    await page.pause();
    await page.pause();
    await testInfo.attach(Export.screenShotsSelectName, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.pause();

    // Preparo para esperar la descarga
    const downloadPromise = page.waitForEvent('download');
    await page.getByLabel(Export.buttonName).click();
    await page.pause();
    await page.pause();

    // Espero a que la descarga termine
    const download = await downloadPromise;
    await page.pause();

    await testInfo.attach(Export.screenShotsDownload, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    // Guardo el archivo descargado en una ruta específica
    const downloadPath = Export.downloadPath;
    const filePath = path.join(downloadPath, download.suggestedFilename());
    await download.saveAs(filePath);

    // Verifico que el archivo .csv se haya descargado, sino muestro un error en la consola.
    if (!fs.existsSync(filePath)) {
      console.error(Export.consoleError);
      return;
    }

    // Leo el contenido del archivo .csv
    const csvContent = fs.readFileSync(filePath, 'utf8');

    // Ajusto el parsing para manejar errores de formato
    const records = parse(csvContent, {
      delimiter: ',', // Ajusto según el delimitador utilizado en tu archivo
      skip_empty_lines: true,
      trim: true,
      relax_column_count: true, // Permito un número variable de columnas
      quote: '"',
      escape: '\\',
      skip_records_with_error: true, // Permito delimitadores de registro incorrectos
      columns: false,
      comment: '#' // Manejo de líneas de comentarios
    });

    // Mostrar el contenido del CSV en la consola
    console.log('\nContenido del CSV:', csvContent, "\n");

    await test.step('Log all captured logs and network data', async () => {
      logger.printLogs();
      networkInterceptor.printNetworkData();
    });

    await test.step('Verify no console errors', async () => {
        expect(logger.errors.length).toBe(0);
    });

    await test.step('Verify network responses captured', async () => {
        const responses: any[] = networkInterceptor.responses;

        console.log('Captured network responses:', responses);

        const nonImageNullResponses = responses.filter(response => {
            const contentType = response.headers?.['content-type'] || '';
            const isImage = contentType.includes('image') || 
                            response.url.endsWith('.svg') || 
                            response.url.endsWith('.png') || 
                            response.url.endsWith('.jpg') || 
                            response.url.endsWith('.jpeg');
            return response.body === null && !isImage;
        });

        if (nonImageNullResponses.length > 0) {
            console.error('Responses with null body found (excluding images):');
            nonImageNullResponses.forEach((response, index) => {
                console.error(`Response ${index + 1}:`, response);
            });
        }

        expect(nonImageNullResponses.length).toBe(0);
    });

  });

  test('Trazit-StockControl-ActiveInventoryLots-Export-All', async ({ page }, testInfo) => {
    await page.pause();
    // Create instances of Logger and NetworkInterceptor
    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();

    // Attach Logger and NetworkInterceptor to the page
    test.step('Attach Logger and NetworkInterceptor to the page', async () => {
        logger.attachToPage(page);
        networkInterceptor.attachToPage(page);
    });
    await page.pause();

    // Preparo para esperar la descarga
    const downloadPromise = page.waitForEvent('download');
    await page.pause();
    await page.getByLabel(Export.buttonName).click();
    await page.pause();
    await page.pause();

    // Espero a que la descarga termine
    const download = await downloadPromise;
    await page.pause();
    await testInfo.attach(Export.screenShotsDownload, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.pause();
    await page.pause();
    
    // Guardo el archivo descargado en una ruta específica
    const downloadPath = Export.downloadPath;
    await page.pause();
    const filePath = path.join(downloadPath, download.suggestedFilename());
    await page.pause();
    await download.saveAs(filePath);
    await page.pause();
    await page.pause();

    // Verifico que el archivo .csv se haya descargado, sino muestro un error en la consola.
    await page.pause();
    if (!fs.existsSync(filePath)) {
      console.error(Export.consoleError);
      return;
    }
    await page.pause();
    await page.pause();

    // Leo el contenido del archivo .csv
    const csvContent = fs.readFileSync(filePath, 'utf8');
    await page.pause();

    // Ajusto el parsing para manejar errores de formato
    const records = parse(csvContent, {
      delimiter: ',', // Ajusto según el delimitador utilizado en tu archivo
      skip_empty_lines: true,
      trim: true,
      relax_column_count: true, // Permito un número variable de columnas
      quote: '"',
      escape: '\\',
      skip_records_with_error: true, // Permito delimitadores de registro incorrectos
      columns: false,
      comment: '#' // Manejo de líneas de comentarios
    });
    await page.pause();

    // Mostrar el contenido del CSV en la consola
    console.log('\nContenido del CSV:', csvContent, "\n");
    await page.pause();
    await test.step('Log all captured logs and network data', async () => {
      logger.printLogs();
      networkInterceptor.printNetworkData();
  });

  await test.step('Verify no console errors', async () => {
      expect(logger.errors.length).toBe(0);
  });

  await test.step('Verify network responses captured', async () => {
      const responses: any[] = networkInterceptor.responses;

      console.log('Captured network responses:', responses);

      const nonImageNullResponses = responses.filter(response => {
          const contentType = response.headers?.['content-type'] || '';
          const isImage = contentType.includes('image') || 
                          response.url.endsWith('.svg') || 
                          response.url.endsWith('.png') || 
                          response.url.endsWith('.jpg') || 
                          response.url.endsWith('.jpeg');
          return response.body === null && !isImage;
      });

      if (nonImageNullResponses.length > 0) {
          console.error('Responses with null body found (excluding images):');
          nonImageNullResponses.forEach((response, index) => {
              console.error(`Response ${index + 1}:`, response);
          });
      }

      expect(nonImageNullResponses.length).toBe(0);
  });

  });
};

test.describe('Desktop Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1365, height: 821 });   
    const logPlat = new LogIntoPlatform({ page });
    const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
    await page.waitForTimeout(3000);
    const openWindow = new OpenProcedureWindow({ page });
    await page.waitForTimeout(3000);
    await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuStock.Stock.main, MenuStock.Stock.ActiveInventoryLots);
  });
  // And I call the tests.
  commonTests();
});

// // Mobile Mode 
// test.describe('Mobile mode', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//     // Size of the viewport of a mobile device
//     await page.setViewportSize({ width: 385, height: 812 }); 
//     // Common configuration for both modes.
//     const logPlat = new LogIntoPlatform({ page });
//     const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
//     const openWindow = new OpenProcedureWindow({ page }); 
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuStock.Stock.mobile, MenuStock.Stock.ActiveInventoryLots);    
//   });
//   // And I call the tests.
//   commonTests();
// });

// // Mobile Mode - Retrato
// test.describe('Mobile mode Retrato', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//     // Tamaño del viewport para móviles en modo retrato
//     await page.setViewportSize({ width: 812, height: 385 }); 
//     // Configuración común para ambos modos.
//     const logPlat = new LogIntoPlatform({ page });
//     const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
//     const openWindow = new OpenProcedureWindow({ page }); 
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuStock.Stock.mobile, MenuStock.Stock.ActiveInventoryLots);    
//   });
//   commonTests();
// });

// // Tablets Mode
// test.describe('Tablets mode', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//     // Tamaño del viewport para móviles en modo retrato
//     await page.setViewportSize({ width: 768, height: 1024 }); 
//     // Configuración común para ambos modos.
//     const logPlat = new LogIntoPlatform({ page });
//     const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
//     const openWindow = new OpenProcedureWindow({ page }); 
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuStock.Stock.mobile, MenuStock.Stock.ActiveInventoryLots);    
//   });
//   commonTests();
// });

// // Tablets Mode - Retrato
// test.describe('Tablets mode Retrato', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//     // Tamaño del viewport para móviles en modo retrato
//     await page.setViewportSize({ width: 1024, height: 768 }); 
//     // Configuración común para ambos modos.
//     const logPlat = new LogIntoPlatform({ page });
//     const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
//     const openWindow = new OpenProcedureWindow({ page });
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuStock.Stock.mobile, MenuStock.Stock.ActiveInventoryLots);
//   });
//   // And I call the tests.
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
  // Your test logic here
});
