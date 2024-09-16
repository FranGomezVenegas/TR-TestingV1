import { test, expect } from '@playwright/test';
import {  platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { MenuStock } from '../../trazit-models/test-config-stock-global';
import { consume } from '../../trazit-models/test-config-StockControl-ActiveInventoryLots-Consume';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import {ConfirmDialogController} from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

import {Logger, NetworkInterceptor} from '../1TRAZiT-Commons/consoleInterceptionAndRequestResponse';



//Function with all tests.
const commonTests = () => {
    test('Trazit-StockControl-ActiveInventoryLots-Consume-Accept', async ({ page }, testInfo) => {
        let afterEachData = {
            textInNotif1: "",
            textInNotif2: "",
            textInNotif3: "",
        };
    
        // Crear instancias de Logger y NetworkInterceptor
        const logger = new Logger();
        const networkInterceptor = new NetworkInterceptor();
    
        // Adjuntar Logger y NetworkInterceptor a la página
        await test.step('Attach Logger and NetworkInterceptor to the page', async () => {
            logger.attachToPage(page);
            networkInterceptor.attachToPage(page);
        });
    
        await test.step('Scroll to the select element', async () => {
            const selects = await page.getByText(consume.select, { exact: true });
            try {
                await selects.click();
            } catch (error) {
                throw new Error(`The element "${consume.select}" does not exist.`);
            }
            await selects.scrollIntoViewIfNeeded();
        });
        await page.pause();
    
        await test.step('Click on the select element and click button to consume', async () => {
            try {
                await await page.getByText(consume.select, { exact: true }).dblclick();
                await page.getByLabel(consume.buttonName).nth(0).dblclick();
            } catch (error) {
                throw new Error(`The button "${consume.buttonName}" does not exist.`);
            }
        });
    
        await page.pause();
    
        await test.step('Take a screenshot of the form when it is empty', async () => {
            await testInfo.attach(consume.screenShotsFormEmpty, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
        });
    
        await page.pause();
    
        await test.step('Fill in the quantity to consume', async () => {
            try {
                await page.getByLabel(consume.fldQuantityConsume.label).click();
                await page.getByLabel(consume.fldQuantityConsume.label).fill(consume.fldQuantityConsume.value);
            } catch (error) {
                throw new Error(`The field "${consume.fldQuantityConsume.label}" does not exist.`);
            }
        });
    
        // Añadir el UOM (Unidad de Medida)
        await test.step('Select UOM (Unit of Measurement)', async () => {
            await page.getByLabel(consume.fldUOM.label).click();
            await page.getByRole('option', { name: consume.fldUOM.value, exact:true }).click();
        })

        await test.step('Take a screenshot of the form when it is filled', async () => {
            await testInfo.attach(consume.screenShotsFormFilled, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
        });
    
        await page.pause();
    
        await test.step('Click on the accept button', async () => {
            try {
                await page.getByRole('button', { name: consume.buttonAccept.label }).click();
            } catch (error) {
                throw new Error(`The button "${consume.buttonAccept.label}" does not exist.`);
            }
        });
    
        await page.pause();
    
        await test.step('Take a screenshot of the result', async () => {
            await testInfo.attach(consume.screenResult, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
        });
    
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
    
        afterEachData.textInNotif1 = consume.textInNotif1;
        afterEachData.textInNotif2 = consume.textInNotif2;
        afterEachData.textInNotif3 = consume.textInNotif3;
    
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
                    if (!notificationText.includes('success')) {
                        throw new Error(`The notification does not contain the expected text: ${notificationText}`);
                    }
                });
                await testInfo.attach(consume.screenformNotifications, {
                    body: await page.screenshot({ fullPage: true }),
                    contentType: ConfigSettingsAlternative.screenShotsContentType
                });
                const notificationDiv = await page.locator(MenuStock.Notification.main.pageElementdiv).first();
                if (notificationDiv !== null) {
                    await testInfo.attach(consume.screenformLastNotifications, {
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
                    if (!notificationText.includes('success')) {
                        throw new Error(`The notification does not contain the expected text: ${notificationText}`);
                    }
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
                    if (!notificationText.includes('success')) {
                        throw new Error(`The notification does not contain the expected text: ${notificationText}`);
                    }
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


test('Trazit-StockControl-ActiveInventoryLots-Consume-Cancel', async ({ page }, testInfo) => {
    // Crear instancias de Logger y NetworkInterceptor
    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();

    // Adjuntar Logger y NetworkInterceptor a la página
    await test.step('Attach Logger and NetworkInterceptor to the page', async () => {
        logger.attachToPage(page);
        networkInterceptor.attachToPage(page);
    });

    await test.step('Scroll to the select element', async () => {
        const selects = await page.getByText(consume.select, { exact: true });
        try {
            await selects.click();
        } catch (error) {
            throw new Error(`The element "${consume.select}" does not exist.`);
        }
        await selects.scrollIntoViewIfNeeded();
    });
    await page.pause();

    await test.step('Click on the select element and click button to consume', async () => {
        try {
            await await page.getByText(consume.select, { exact: true }).dblclick();
            await page.getByLabel(consume.buttonName).nth(0).dblclick();
        } catch (error) {
            throw new Error(`The button "${consume.buttonName}" does not exist.`);
        }
    });

    await page.pause();

    await test.step('Take a screenshot of the form when it is empty', async () => {
        await testInfo.attach(consume.screenShotsFormEmpty, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    });

    await page.pause();

    await test.step('Fill in the quantity to consume', async () => {
        try {
            await page.getByLabel(consume.fldQuantityConsume.label).click();
            await page.getByLabel(consume.fldQuantityConsume.label).fill(consume.fldQuantityConsume.value);
        } catch (error) {
            throw new Error(`The field "${consume.fldQuantityConsume.label}" does not exist.`);
        }
    });

    // Añadir el UOM (Unidad de Medida)
    await test.step('Select UOM (Unit of Measurement)', async () => {
        await page.getByLabel(consume.fldUOM.label).click();
        await page.getByRole('option', { name: consume.fldUOM.value, exact:true }).click();
    })

    await page.pause();

    await test.step('Take a screenshot of the form when it is filled', async () => {
        await testInfo.attach(consume.screenShotsFormFilled, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    });

    await test.step('Click on the accept button', async () => {
        try {
            await page.getByRole('button', { name: consume.buttonCancel.label }).click();
        } catch (error) {
            throw new Error(`The button "${consume.buttonCancel.label}" does not exist.`);
        }
    });

    await page.pause();

    await test.step('Take a screenshot of the result', async () => {
        await testInfo.attach(consume.screenResult, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    });

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
    await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuStock.Stock.main, MenuStock.Stock.ActiveInventoryLots);
  
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
