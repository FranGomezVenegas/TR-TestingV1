import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoProcDefinition } from '../1TRAZiT-Commons/logIntoProcDefinition';
import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { procedures, unlockProcedure, lockProcedure } from '../1TRAZiT-Commons/Funciones-Generales/ProcsDefinition-Unlock-LockProcedures';

// Function with all tests.
const commonTests = () => {
    test('Trazit-ProceduresDefinition-RandD-Lock', async ({ page }, testInfo) => {
        page.pause();
        page.pause();
        await lockProcedure(page, procedures.RandD, testInfo);
        await page.pause();
        await page.pause();
        await page.close();
    });
  }

test.describe('Desktop Mode', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        await page.setViewportSize({ width: 1365, height: 821 });
        const logProc = new LogIntoProcDefinition(page);
        const ConfigSettings = await logProc.commonBeforeEach(page, testInfo);
        await page.waitForTimeout(3000);
  
    });
    commonTests();
});

// // // Mobile Mode 
// test.describe('Mobile mode', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//     // Size of the viewport of a mobile device
//     await page.setViewportSize({ width: 385, height: 812 }); 
//     // Common configuration for both modes.
//     const logProc = new LogIntoProcDefinition({page});
//     const ConfigSettings=await logProc.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
  
//   });
//   //And I call the tests.
//   commonTests();
// });

// // Mobile Mode - Retrato
// test.describe('Mobile mode Retrato', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//     // Tamaño del viewport para móviles en modo retrato
//     await page.setViewportSize({ width: 812, height: 385 }); 
//     // Configuración común para ambos modos.
//     const logProc = new LogIntoProcDefinition({page});
//     const ConfigSettings=await logProc.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
//     });
//   commonTests();
// });


// // Tablets Mode
// test.describe('Tablets mode', () => {
// test.beforeEach(async ({ page }, testInfo) => {
//   // Tamaño del viewport para móviles en modo retrato
//   await page.setViewportSize({ width: 768, height: 1024 }); 
//   // Configuración común para ambos modos.
//   const logProc = new LogIntoProcDefinition({page});
//   const ConfigSettings=await logProc.commonBeforeEach(page, testInfo);
//   await page.waitForTimeout(3000);
// });
//   commonTests();
// });

// // // Tablets Mode - Retrato
// test.describe('Tablets mode Retrato', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//     // Tamaño del viewport para móviles en modo retrato
//     await page.setViewportSize({ width: 1024, height: 768}); 
//     // Configuración común para ambos modos.
//     const logProc = new LogIntoProcDefinition({page});
//     const ConfigSettings=await logProc.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
//     });
//       //And I call the tests.
//       commonTests();
//   });


const { test:pwTest, afterEach } = require('@playwright/test');
 
  afterEach(async ({}, testInfo) => {
    // Example JSON data, could be anything relevant to your tests
    const data = {
      test_name: testInfo.title,


      duration: testInfo.duration,
      // other test-related data you might want to send
    };
   
    // Determine the test outcome
    const testStatus = testInfo.status; // 'passed', 'failed', 'timedOut', 'skipped'
   
    await callApiRunCompletion(data, testStatus);
  });
   
  pwTest('Example test', async ({ page }) => {
    // Your test logic here
  });