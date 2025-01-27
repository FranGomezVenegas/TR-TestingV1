// import { test, expect } from '@playwright/test';
// import { platformMenuNames } from '../../trazit-config';
// import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
// import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

// import { MenuRDProjects } from '../../trazit-models/test-config-R&DProjects-global';
// import { Print } from '../../trazit-models/test-config-R&D-Projects-Products-Development-PreStabilityStudies-Print';

// import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
// import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
// import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

// //Function with all tests.
// const commonTests = () => {
//     test('Trazit-Projects-Development-MethodDevelopment-PreStabilityStudies-Print', async ({ page }, testInfo) => {
//         await page.getByLabel(Print.windowPreStabilityStudies).click();
//         await page.pause();
//         await page.pause();
//         await testInfo.attach(Print.screenShotsWindowPreStabilityStudies, {
//             body: await page.screenshot({ fullPage: true }),
//             contentType: ConfigSettingsAlternative.screenShotsContentType
//         });
//         await page.getByLabel(Print.search.label).click();  
//         await page.pause();
//         await page.pause();
//         await page.getByLabel(Print.search.label).fill(Print.search.value);
//         await page.pause();
//         await page.pause();
//         await page.getByRole('button', { name: Print.search.action }).click();
//         await page.pause();
//         await page.pause();
//         await page.getByRole('button', { name: Print.search.option }).click();
//         await page.pause();
//         await page.pause();
//         await testInfo.attach(Print.scrennShotsSearch, {
//             body: await page.screenshot({ fullPage: true }),
//             contentType: ConfigSettingsAlternative.screenShotsContentType
//         });
//         await page.getByRole('button', { name: Print.search.action }).click();        
//         await page.pause();
//         await page.pause();
//         const page1Promise = page.waitForEvent('popup');
//         await page.pause();
//         await page.pause();
//         await page.getByLabel('print').click();
//         await page.pause();
//         await page.pause();
//         const page1 = await page1Promise;
//         await page.pause();
//         await page.pause();
//         await testInfo.attach(Print.screenShotsPrint, {
//             body: await page.screenshot({ fullPage: true }),
//             contentType: ConfigSettingsAlternative.screenShotsContentType
//         });

//     })
// }




// test.describe('Desktop Mode', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//         await page.setViewportSize({ width: 1365, height: 821 });
//         const logPlat = new LogIntoPlatform({ page });
//         const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//         await page.waitForTimeout(3000);
//         const openWindow = new OpenProcedureWindow({ page });
//         await page.waitForTimeout(3000);
//         await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuRDProjects.RD.main, MenuRDProjects.RD.ProductDevelopment);
//     });
//     commonTests();
//   });
  

// test.describe('Mobile mode', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//         await page.setViewportSize({ width: 385, height: 812 });
//         const logPlat = new LogIntoPlatform({ page });
//         const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//         await page.waitForTimeout(3000);
//         const openWindow = new OpenProcedureWindow({ page });
//         await page.waitForTimeout(3000);
//         await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuRDProjects.RD.mobile, MenuRDProjects.RD.ProductDevelopment);
//     });
//     commonTests();
// });

// test.describe('Mobile mode Retrato', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//         await page.setViewportSize({ width: 812, height: 385 });
//         const logPlat = new LogIntoPlatform({ page });
//         const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//         await page.waitForTimeout(3000);
//         const openWindow = new OpenProcedureWindow({ page });
//         await page.waitForTimeout(3000);
//         await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuRDProjects.RD.mobile, MenuRDProjects.RD.ProductDevelopment);
//     });
//     commonTests();
// });

// test.describe('Tablets mode', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//         await page.setViewportSize({ width: 768, height: 1024 });
//         const logPlat = new LogIntoPlatform({ page });
//         const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//         await page.waitForTimeout(3000);
//         const openWindow = new OpenProcedureWindow({ page });
//         await page.waitForTimeout(3000);
//         await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuRDProjects.RD.mobile, MenuRDProjects.RD.ProductDevelopment);
//     });
//     commonTests();
// });

// test.describe('Tablets mode Retrato', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//         await page.setViewportSize({ width: 1024, height: 768 });
//         const logPlat = new LogIntoPlatform({ page });
//         const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//         await page.waitForTimeout(3000);
//         const openWindow = new OpenProcedureWindow({ page });
//         await page.waitForTimeout(3000);
//         await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, MenuRDProjects.RD.main, MenuRDProjects.RD.ProductDevelopment);
//     });
//     commonTests();
// });

  
// const { test: pwTest, afterEach } = require('@playwright/test');

// afterEach(async ({}, testInfo) => {
//     const data = {
//         test_name: testInfo.title,
//         duration: testInfo.duration,
//     };

//     const testStatus = testInfo.status;

//     await callApiRunCompletion(data, testStatus);
// });

// pwTest('Example test', async ({ page }) => {
//     // Tu lógica de prueba aquí
// });
