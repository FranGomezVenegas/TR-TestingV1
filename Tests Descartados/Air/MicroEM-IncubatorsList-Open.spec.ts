// import { test, expect } from '@playwright/test';
// import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
// import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';
// import { MenuInstrumentsControl } from '../../trazit-models/test-config-instruments-global';

// import { MenuMicroEM } from '../../trazit-models/test-config-MicroEM-global';

// import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
// import {ConfirmDialogController} from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
// import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';
// import { SetSamplingDate } from '../../trazit-models/test-config-MicroEM-PendingSampling-SetSamplingDate';


// // Función con todas las pruebas comunes
// const commonTests = () => {
//     test('Trazit-WaterMonitoring-IncubatorsList-Open', async ({ page }, testInfo) => {
//         await page.pause();
//         await page.pause();
//         await page.pause();
//     })
// }


// test.describe('Desktop Mode', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//       await page.setViewportSize({ width: 1365, height: 821 }); 
//       const logPlat = new LogIntoPlatform({page});
//       const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow=new OpenProcedureWindow({page});
//       await page.waitForTimeout(3000);
//       await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuMicroEM.MicroEM.main, MenuMicroEM.MicroEM.IncubatorsList);
    
//     });
//         //And I call the tests.
//         commonTests();
//     });
  
  
     
//   // // Mobile Mode 
//   // test.describe('Mobile mode', () => {
//   //   test.beforeEach(async ({ page }, testInfo) => {
//   //     await page.setViewportSize({ width: 385, height: 812 }); 
//   //     const logPlat = new LogIntoPlatform({page});
//   //     const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
//   //     await page.waitForTimeout(3000);
//   //     const openWindow=new OpenProcedureWindow({page}); 
//   //     await page.waitForTimeout(3000);
//   //     await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuMicroEM.MicroEM.mobile, MenuMicroEM.MicroEM.IncubatorsList);    
    
//   //   });
//   //   //And I call the tests.
//   //   commonTests();
//   // });
  
//   // // Mobile Mode - Retrato
//   // test.describe('Mobile mode Retrato', () => {
//   // test.beforeEach(async ({ page }, testInfo) => {
//   //   // Tamaño del viewport para móviles en modo retrato
//   //   await page.setViewportSize({ width: 812, height: 385 }); 
//   //   // Configuración común para ambos modos.
//   //   const logPlat = new LogIntoPlatform({page});
//   //   const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
//   //   await page.waitForTimeout(3000);
//   //   const openWindow=new OpenProcedureWindow({page}); 
//   //   await page.waitForTimeout(3000);
//   //   await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuMicroEM.MicroEM.mobile, MenuMicroEM.MicroEM.IncubatorsList);    
//   // });
//   //   commonTests();
//   // });
  
  
//   // // Tablets Mode
//   // test.describe('Tablets mode', () => {
//   //   test.beforeEach(async ({ page }, testInfo) => {
//   //     await page.setViewportSize({ width: 768, height: 1024 }); 
//   //     const logPlat = new LogIntoPlatform({page});
//   //     const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
//   //     await page.waitForTimeout(3000);
//   //     const openWindow=new OpenProcedureWindow({page}); 
//   //     await page.waitForTimeout(3000);
//   //     await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuMicroEM.MicroEM.mobile, MenuMicroEM.MicroEM.IncubatorsList);    
//   //   });
//   //   commonTests();
//   // });
  
//   // // Tablets Mode - Retrato
//   // test.describe('Tablets mode Retrato', () => {
//   //   test.beforeEach(async ({ page }, testInfo) => {
//   //     await page.setViewportSize({ width: 1024, height: 768}); 
//   //     const logPlat = new LogIntoPlatform({page});
//   //     const ConfigSettings=await logPlat.commonBeforeEach(page, testInfo);
//   //     await page.waitForTimeout(3000);
//   //     const openWindow=new OpenProcedureWindow({page});
//   //     await page.waitForTimeout(3000);
//   //     await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuMicroEM.MicroEM.main, MenuMicroEM.MicroEM.IncubatorsList);
//   //     });
//   //       //And I call the tests.
//   //       commonTests();
//   //   });
  
  
//   const { test:pwTest, afterEach } = require('@playwright/test');
   
//     afterEach(async ({}, testInfo) => {
//       // Example JSON data, could be anything relevant to your tests
//       const data = {
//         test_name: testInfo.title,
  
  
//         duration: testInfo.duration,
//         // other test-related data you might want to send
//       };
     
//       // Determine the test outcome
//       const testStatus = testInfo.status; // 'passed', 'failed', 'timedOut', 'skipped'
     
//       await callApiRunCompletion(data, testStatus);
//     });
     
//     pwTest('Example test', async ({ page }) => {
//       // Your test logic here
//     });
