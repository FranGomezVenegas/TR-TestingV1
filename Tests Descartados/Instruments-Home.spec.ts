// import { test, expect } from '@playwright/test';
// import { ConfigSettings, platformMenuNames } from '../../trazit-config';
// import { InstrumentsConfig, MenuInstrumentsControl } from '../../trazit-models/test-config-instruments - global';

// test.beforeEach(async ({ page }, testInfo) => {
//   await page.pause();
//   await page.pause();
//   await page.goto(ConfigSettings.platformUrl);
//   await page.pause();
//   await page.pause();
//   await page.getByLabel(ConfigSettings.login.fldUser.label).fill(ConfigSettings.login.fldUser.value);
//   await page.pause();
//   await page.pause();
//   await page.getByLabel(ConfigSettings.login.fldPss.label).fill(ConfigSettings.login.fldPss.value);
//   await page.pause();
//   await page.pause();
//   await page.getByLabel(ConfigSettings.login.fldPss.label).press(ConfigSettings.login.fldPss.actionName);
//   await page.pause();
//   await page.pause();
//   await testInfo.attach(ConfigSettings.screenShotsCredencials.screenShotsName, {body: await page.locator(ConfigSettings.screenShotsCredencials.pageElementName).screenshot(), contentType: ConfigSettings.screenShotsContentType});
//   await page.locator(platformMenuNames.procedure.main.pageElementName).click();
//   await page.pause();
//   await page.pause();
//   await page.pause();
//   await testInfo.attach(platformMenuNames.procedure.main.screenShotsName, {
//     body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
//   await page.pause();

//   await page.getByRole('menuitem', { name: MenuInstrumentsControl.Instruments.main.pageElement.label }).locator('span').click();
//   await page.pause();
//   await page.pause();
//   await testInfo.attach(MenuInstrumentsControl.screenShotsName, {
//     body: await page.screenshot({ fullPage: true }),
//     contentType: ConfigSettings.screenShotsContentType
//   });

//   await page.goto(MenuInstrumentsControl.Instruments.activeInstrument.pageElement);
//   await testInfo.attach(InstrumentsConfig.screenShotsName, {
//     body: await page.screenshot({ fullPage: true }),
//     contentType: ConfigSettings.screenShotsContentType
//   });
//   await page.pause();
// });

// test('Trazit-Instruments-Home', async ({ page }) => {
//   await page.getByText("Home").nth(2).click();  
//   await page.close(); 
// });
