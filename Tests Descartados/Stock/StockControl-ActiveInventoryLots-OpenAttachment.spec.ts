// import { test, expect } from '@playwright/test';
// import {  platformMenuNames } from '../../trazit-config';
// import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
// import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

// import { MenuStock } from '../../trazit-models/test-config-stock-global';
// import { OpenAttachment } from '../../trazit-models/test-config-StockControl-ActiveInventoryLots-OpenAttachment';

// import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
// import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

// import {Logger, NetworkInterceptor} from '../1TRAZiT-Commons/consoleInterceptionAndRequestResponse';

// //Function with all tests.
// const commonTests = () => {
// test('Trazit-StockControl-ActiveInventoryLots-OpenAttachment-Accept', async ({ page }, testInfo) => {
//   // Create instances of Logger and NetworkInterceptor
//   const logger = new Logger();
//   const networkInterceptor = new NetworkInterceptor();

//   // Attach Logger and NetworkInterceptor to the page
//   test.step('Attach Logger and NetworkInterceptor to the page', async () => {
//       logger.attachToPage(page);
//       networkInterceptor.attachToPage(page);
//   });

//   // Paso 1: Hacer clic en la celda específica con nombre exacto "w"
//   await test.step('Click on the specific cell with exact name', async () => {
//     await page.getByText(OpenAttachment.selectName, { exact: true }).click();
//   });
//   // Paso 2: Hacer clic en el label de "attach file"
//   await test.step('Click on the attach file label and capture screenshot', async () => {
//     // Hacer clic en el label de "attach file"
//     await page.getByLabel(OpenAttachment.buttonName).click();

//     // Esperar un breve momento para asegurar que la acción se haya completado
//     await page.waitForTimeout(2000); // Espera 2 segundos (ajusta según sea necesario)

//     // Capturar la pantalla después de hacer clic
//     await testInfo.attach(OpenAttachment.screenShotsButton, {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: ConfigSettingsAlternative.screenShotsContentType,
//     });

//     // Añadir otra pausa si es necesario
//     await page.waitForTimeout(2000); // Espera 2 segundos (ajusta según sea necesario)
//   });

//   // Crear un nuevo contexto de navegador para `page1`
//   const browser = page.context().browser();
//   if (browser) {
//     const context = await browser.newContext();
//     const page1 = await context.newPage();

//     // Paso 3: Navegar a Google en `page1`
//     await test.step('Navigate to URL on page1', async () => {
//       await page.pause();
//       await page.pause();
//       await page1.goto(OpenAttachment.url);
//       await page.pause();
//       await page.pause();
//     });

//     // Paso 4: Aceptar todas las cookies en la página de las URK
//     // await test.step('Scroll to and accept all cookies on Google page', async () => {
//     //   const acceptButton = page1.getByRole('button', { name: OpenAttachment.acceptGoogle });
      
//     //   // Desplazar la página para asegurar que el botón sea visible
//     //   await acceptButton.scrollIntoViewIfNeeded();
      
//     //   // Esperar a que el botón esté disponible y hacer clic
//     //   await acceptButton.click();
//     // });

//     // Paso 5: Capturar captura de pantalla de `page1`
//     await test.step('Capture screenshot of page1', async () => {
//       await testInfo.attach(OpenAttachment.screenShotsUrl, {
//         body: await page1.screenshot({ fullPage: true }),
//         contentType: ConfigSettingsAlternative.screenShotsContentType,
//       });
//     });

//     await test.step('Log all captured logs and network data', async () => {
//       logger.printLogs();
//       networkInterceptor.printNetworkData();
//   });

//   await test.step('Verify no console errors', async () => {
//       expect(logger.errors.length).toBe(0);
//   });

//   await test.step('Verify network responses captured', async () => {
//       const responses: any[] = networkInterceptor.responses;

//       console.log('Captured network responses:', responses);

//       const nonImageNullResponses = responses.filter(response => {
//           const contentType = response.headers?.['content-type'] || '';
//           const isImage = contentType.includes('image') || 
//                           response.url.endsWith('.svg') || 
//                           response.url.endsWith('.png') || 
//                           response.url.endsWith('.jpg') || 
//                           response.url.endsWith('.jpeg');
//           return response.body === null && !isImage;
//       });

//       if (nonImageNullResponses.length > 0) {
//           console.error('Responses with null body found (excluding images):');
//           nonImageNullResponses.forEach((response, index) => {
//               console.error(`Response ${index + 1}:`, response);
//           });
//       }

//       expect(nonImageNullResponses.length).toBe(0);
//   });

//   } else {
//     throw new Error(OpenAttachment.error);
//   }
// })
// }

// test.describe('Desktop Mode', () => {
//   //Added the before common.  
//   //And I add another beforeEach for the navigation between the different tabs, this part is specific in each mode.
//   test.beforeEach(async ({ page }, testInfo) => {
//     await page.setViewportSize({ width: 1365, height: 821 });   
//     const logPlat = new LogIntoPlatform({page});
//     const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
//     const openWindow=new OpenProcedureWindow({page});
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuStock.Stock.main, MenuStock.Stock.ActiveInventoryLots);
  
//   });
//       //And I call the tests.
//       commonTests();
// });


   
// // // Mobile Mode 
// // test.describe('Mobile mode', () => {
// //   test.beforeEach(async ({ page }, testInfo) => {
// //     // Size of the viewport of a mobile device
// //     await page.setViewportSize({ width: 385, height: 812 }); 
// //     // Common configuration for both modes.
// //     const logPlat = new LogIntoPlatform({page});
// //     const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
// //     await page.waitForTimeout(3000);
// //     const openWindow=new OpenProcedureWindow({page}); 
// //     await page.waitForTimeout(3000);
// //     await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.ActiveInventoryLots);    
  
// //   });
// //   //And I call the tests.
// //   commonTests();
// // });

// // // Mobile Mode - Retrato
// // test.describe('Mobile mode Retrato', () => {
// // test.beforeEach(async ({ page }, testInfo) => {
// //   // Tamaño del viewport para móviles en modo retrato
// //   await page.setViewportSize({ width: 812, height: 385 }); 
// //   // Configuración común para ambos modos.
// //   const logPlat = new LogIntoPlatform({page});
// //   const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
// //   await page.waitForTimeout(3000);
// //   const openWindow=new OpenProcedureWindow({page}); 
// //   await page.waitForTimeout(3000);
// //   await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.ActiveInventoryLots);    
// // });
// //   commonTests();
// // });


// // // Tablets Mode
// // test.describe('Tablets mode', () => {
// // test.beforeEach(async ({ page }, testInfo) => {
// //   // Tamaño del viewport para móviles en modo retrato
// //   await page.setViewportSize({ width: 768, height: 1024 }); 
// //   // Configuración común para ambos modos.
// //   const logPlat = new LogIntoPlatform({page});
// //   const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
// //   await page.waitForTimeout(3000);
// //   const openWindow=new OpenProcedureWindow({page}); 
// //   await page.waitForTimeout(3000);
// //   await openWindow.openWindowForMobile(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.ActiveInventoryLots);    
// // });
// //   commonTests();
// // });

// // // Tablets Mode - Retrato
// // test.describe('Tablets mode Retrato', () => {
// // test.beforeEach(async ({ page }, testInfo) => {
// //   // Tamaño del viewport para móviles en modo retrato
// //   await page.setViewportSize({ width: 1024, height: 768}); 
// //   // Configuración común para ambos modos.
// //   const logPlat = new LogIntoPlatform({page});
// //     const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
// //     await page.waitForTimeout(3000);
// //     const openWindow=new OpenProcedureWindow({page});
// //     await page.waitForTimeout(3000);
// //     await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings,  MenuStock.Stock.mobile,  MenuStock.Stock.ActiveInventoryLots);
// //     });
// //       //And I call the tests.
// //       commonTests();
// //   });


// const { test: pwTest, afterEach } = require('@playwright/test');

// afterEach(async ({}, testInfo) => {
  
//   const durationInSeconds = (testInfo.duration / 1000).toFixed(2);

//   const data = {
//     test_name: testInfo.title,
//     duration: `${durationInSeconds} seconds`,
//   };

//   const testStatus = testInfo.status;
//   await callApiRunCompletion(data, testStatus);
// });

// pwTest('Example test', async ({ page }) => {
//   // Tu lógica de prueba aquí
// });

