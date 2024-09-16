import { test, expect } from '@playwright/test';
import {  platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { MenuStock } from '../../trazit-models/test-config-stock-global';
import { addReferences } from '../../trazit-models/test-config-StockControl-MasterOrReferences-AddReferences';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import {ConfirmDialogController} from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

import {Logger, NetworkInterceptor} from '../1TRAZiT-Commons/consoleInterceptionAndRequestResponse';


//Function with all tests.
const commonTests = () => {
test('Trazit-StockControl-MasterOrReferences-Open', async ({ page }, testInfo) => {
    await page.pause();
    await page.close();
})


test('Trazit-StockControl-MasterOrReferences-AddReferences-Accept', async ({ page }, testInfo) => {
    let afterEachData = {
      textInNotif1:"",
      textInNotif2:"",
      textInNotif3:"",
    }   
    // Create instances of Logger and NetworkInterceptor
  const logger = new Logger();
  const networkInterceptor = new NetworkInterceptor();

  // Attach Logger and NetworkInterceptor to the page
  test.step('Attach Logger and NetworkInterceptor to the page', async () => {
      logger.attachToPage(page);
      networkInterceptor.attachToPage(page);
  });

    await page.getByText(addReferences.buttonReferences, {exact:true}).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(addReferences.screenShotsReferences, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.pause();
    await page.getByLabel(addReferences.buttonName).first().click();
    await page.pause();
    await page.pause();
    await testInfo.attach(addReferences.screenShotsFormEmpty, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.pause();
    await page.getByLabel(addReferences.fldNewReferences.label).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(addReferences.fldNewReferences.label).press(addReferences.fldNewReferences.press);
    await page.pause();
    await page.pause();
    await page.getByLabel(addReferences.fldNewReferences.label).fill(addReferences.fldNewReferences.value);
    await page.pause();
    await page.pause();
    await page.getByLabel(addReferences.fldCategory.label).click();
    await page.pause();
    await page.pause();
    await page.getByRole('option', { name: addReferences.fldCategory.value  }).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(addReferences.fldMinStock.label, { exact: true }).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(addReferences.fldMinStock.label, { exact: true }).fill(addReferences.fldMinStock.value);
    await page.pause();
    await page.pause();
    await page.getByLabel(addReferences.fldUOM.label, { exact: true }).click();
    await page.pause();
    await page.pause();
    await page.getByRole('option', { name: addReferences.fldUOM.option, exact:true }).click();
    await page.pause();
    await page.pause();
    await page.getByText(addReferences.fldOtherAllowedUOMs.label).click();
    await page.pause();
    await page.pause();
    await page.locator(addReferences.fldOtherAllowedUOMs.locator).getByText(addReferences.fldOtherAllowedUOMs.value, { exact: true }).click();
    await page.pause();
    

    await page.getByLabel(addReferences.fldMinStockType.label).click();
    await page.pause();
    await page.pause();
    await page.getByRole('option', { name: addReferences.fldMinStockType.value  }).click();
    await page.locator(addReferences.fldMinAvailableForUse.locator).filter({ hasText: addReferences.fldMinAvailableForUse.label }).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(addReferences.fldMinAvailableForUse.label).fill(addReferences.fldMinAvailableForUse.value);
    await page.pause();
    await page.pause();
    // await page.getByLabel(addReferences.fldType.label, { exact: true }).click();
    // await page.pause();
    // await page.pause();
    // await page.getByRole('option', { name: addReferences.fldType.value }).click();
    // await page.pause();
    // await page.pause();
    await page.getByLabel(addReferences.fldQualificationVariablesSet.label).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(addReferences.fldQualificationVariablesSet.label).press(addReferences.fldQualificationVariablesSet.press);
    await page.pause();
    await page.pause();
    await page.getByRole('option', { name: addReferences.fldQualificationVariablesSet.option, exact:true }).click();
    
    // await page.getByLabel(addReferences.fldQualificationVariablesSet.label).fill(addReferences.fldQualificationVariablesSet.value);
    await page.pause();
    await page.pause();
    await testInfo.attach(addReferences.screenShotsFormFilled, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
     await page.pause();
    await page.getByRole('button', { name: addReferences.buttonAccept.label }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(addReferences.screenResult, {
     body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
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


    afterEachData.textInNotif1=addReferences.textInNotif1
    afterEachData.textInNotif2=addReferences.textInNotif2
    afterEachData.textInNotif3=addReferences.textInNotif3


    const viewportWidth = await page.evaluate(() => {
        return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    });

    if (viewportWidth >= 1024) {
        // Modo escritorio o tablet en modo paisaje
        const notificationElement = await page.locator(MenuStock.Notification.main.pageElement);
        if (notificationElement !== null) {
            await test.step('Hover over the notification element and check for "success"', async () => {
                await notificationElement.hover();
                const notificationText = (await notificationElement.textContent()) ?? '';
                // if (!notificationText.includes('success')) {
                //     throw new Error(`The notification does not contain the expected text: ${notificationText}`);
                // }
            });
            await testInfo.attach(addReferences.screenformNotifications, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
            const notificationDiv = await page.locator(MenuStock.Notification.main.pageElementdiv).first();
            if (notificationDiv !== null) {
                await testInfo.attach(addReferences.screenformLastNotifications, {
                    body: await notificationDiv.screenshot(),
                    contentType: ConfigSettingsAlternative.screenShotsContentType
                });
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
                // if (!notificationText.includes('success')) {
                //     throw new Error(`The notification does not contain the expected text: ${notificationText}`);
                // }
            } catch (error) {
                throw new Error('Menu button or dashboard notifications not found.');
            }
            await testInfo.attach('TabletNotifications', {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
        });
    } else {
        // Modo móvil
        await test.step('Click on the menu button and navigate to notifications', async () => {
            try {
                await page.click('mwc-icon-button.menu');
                await page.click('mwc-list-item#dashboardnotifications');
                const notificationElement = await page.locator('mwc-list-item#dashboardnotifications');
                const notificationText = (await notificationElement.textContent()) ?? '';
                // if (!notificationText.includes('success')) {
                //     throw new Error(`The notification does not contain the expected text: ${notificationText}`);
                // }
            } catch (error) {
                throw new Error('Menu button or dashboard notifications not found.');
            }
            await testInfo.attach('NotificationsMobile', {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
        });
    }
});



test('Trazit-StockControl-MasterOrReferences-AddReferences-Cancel', async ({ page }, testInfo) => {
    // Create instances of Logger and NetworkInterceptor
  const logger = new Logger();
  const networkInterceptor = new NetworkInterceptor();

  // Attach Logger and NetworkInterceptor to the page
  test.step('Attach Logger and NetworkInterceptor to the page', async () => {
      logger.attachToPage(page);
      networkInterceptor.attachToPage(page);
  });

    await page.getByText(addReferences.buttonReferences, {exact:true}).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(addReferences.screenShotsReferences, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.pause();
    await page.getByLabel(addReferences.buttonName).first().click();
    await page.pause();
    await page.pause();
    await testInfo.attach(addReferences.screenShotsFormEmpty, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.pause();
    await page.getByLabel(addReferences.fldNewReferences.label).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(addReferences.fldNewReferences.label).press(addReferences.fldNewReferences.press);
    await page.pause();
    await page.pause();
    await page.getByLabel(addReferences.fldNewReferences.label).fill(addReferences.fldNewReferences.value);
    await page.pause();
    await page.pause();
    await page.getByLabel(addReferences.fldCategory.label).click();
    await page.pause();
    await page.pause();
    await page.getByRole('option', { name: addReferences.fldCategory.value  }).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(addReferences.fldMinStock.label, { exact: true }).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(addReferences.fldMinStock.label, { exact: true }).fill(addReferences.fldMinStock.value);
    await page.pause();
    await page.pause();
    await page.getByLabel(addReferences.fldUOM.label, { exact: true }).click();
    await page.pause();
    await page.pause();
    await page.getByRole('option', { name: addReferences.fldUOM.option, exact:true }).click();
    await page.pause();
    await page.pause();
    await page.getByText(addReferences.fldOtherAllowedUOMs.label).click();
    await page.pause();
    await page.pause();
    await page.locator(addReferences.fldOtherAllowedUOMs.locator).getByText(addReferences.fldOtherAllowedUOMs.value, { exact: true }).click();
    await page.pause();
    

    await page.getByLabel(addReferences.fldMinStockType.label).click();
    await page.pause();
    await page.pause();
    await page.getByRole('option', { name: addReferences.fldMinStockType.value  }).click();
    await page.locator(addReferences.fldMinAvailableForUse.locator).filter({ hasText: addReferences.fldMinAvailableForUse.label }).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(addReferences.fldMinAvailableForUse.label).fill(addReferences.fldMinAvailableForUse.value);
    await page.pause();
    await page.pause();
    // await page.getByLabel(addReferences.fldType.label, { exact: true }).click();
    // await page.pause();
    // await page.pause();
    // await page.getByRole('option', { name: addReferences.fldType.value }).click();
    // await page.pause();
    // await page.pause();
    await page.getByLabel(addReferences.fldQualificationVariablesSet.label).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(addReferences.fldQualificationVariablesSet.label).press(addReferences.fldQualificationVariablesSet.press);
    await page.pause();
    await page.pause();
    await page.getByRole('option', { name: addReferences.fldQualificationVariablesSet.option, exact:true }).click();
    
    // await page.getByLabel(addReferences.fldQualificationVariablesSet.label).fill(addReferences.fldQualificationVariablesSet.value);
    await page.pause();
    await page.pause();
    await testInfo.attach(addReferences.screenShotsFormFilled, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
     await page.pause();
    await page.getByRole('button', { name: addReferences.buttonCancel.label }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(addReferences.screenResult, {
     body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
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
})
}


test.describe('Desktop Mode', () => {
  //Added the before common.  
  //And I add another beforeEach for the navigation between the different tabs, this part is specific in each mode.
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1365, height: 821 });   
    const logPlat = new LogIntoPlatform({page});
    const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
    await page.waitForTimeout(3000);
    const openWindow=new OpenProcedureWindow({page});
    await page.waitForTimeout(3000);
    await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuStock.Stock.main, MenuStock.Stock.MasterOrReferences);
  
  });
  
      //And I call the tests.
      commonTests();
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
//     await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.MasterOrReferences);    
  
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
//   await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.MasterOrReferences);    
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
//   await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.MasterOrReferences);    
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
//     await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, MenuStock.Stock.mobile, MenuStock.Stock.Deviations);
//   });
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
    await callApiRunCompletion(data, testStatus);
  });
   
  pwTest('Example test', async ({ page }) => {
    // Your test logic here
  });