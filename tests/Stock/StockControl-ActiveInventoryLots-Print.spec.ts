import { test, expect} from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';
import pdfParse from 'pdf-parse'; // Import pdf-parse

import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';
import { MenuStock } from '../../trazit-models/test-config-stock-global';
import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

import {Logger, NetworkInterceptor} from '../1TRAZiT-Commons/consoleInterceptionAndRequestResponse';


const commonTests = () => {
  test('Trazit-StockControl-ActiveInventoryLots-Print-Save', async ({ page }) => {
    // Create instances of Logger and NetworkInterceptor
    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();

    // Attach Logger and NetworkInterceptor to the page
    test.step('Attach Logger and NetworkInterceptor to the page', async () => {
        logger.attachToPage(page);
        networkInterceptor.attachToPage(page);
    });
    await page.pause();
   

    // Interactuar con el menú para generar el PDF
    //const page3Promise = page.waitForEvent('popup');
    await page.getByLabel('print').click();
    //const page3 = await page3Promise;
    
    // Start waiting for download before clicking. Note no await.
    const downloadPromise = page.waitForEvent('download');
    await page.getByText('Download file').click();
    const download = await downloadPromise;

    // Wait for the download process to complete and save the downloaded file somewhere.
    await download.saveAs('/print/' + download.suggestedFilename());

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
