import { test, expect } from '@playwright/test';
import { ConfigSettings, platformMenuNames } from '../../trazit-config';
test.beforeEach(async ({ page }, testInfo) => {
  await page.goto(ConfigSettings.platformUrl);

  await page.getByLabel(ConfigSettings.login.fldUser.label).fill(ConfigSettings.login.fldUser.value);
  await page.pause();
  await page.getByLabel(ConfigSettings.login.fldPss.label).fill(ConfigSettings.login.fldPss.value);
  await page.pause();
  await page.getByLabel(ConfigSettings.login.fldPss.label).press(ConfigSettings.login.fldPss.actionName);
  await page.pause();
  await testInfo.attach(ConfigSettings.screenShotsCredencials.screenShotsName, {body: await page.locator(ConfigSettings.screenShotsCredencials.pageElementName).screenshot(), contentType: ConfigSettings.screenShotsContentType});
  // await page.getByText('My Settings').nth(1).hover();
  await page.locator(platformMenuNames.procedure.main.pageElementName).click();
  await page.pause();
  await page.pause();
  // await page.locator("sp-menu-item#procedure").click();
  await page.pause();
  await testInfo.attach(platformMenuNames.procedure.main.screenShotsName, {
    body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
});



// Abre la pestaña
test('Trazit-Platform-Instruments-Open', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Instruments").nth(0).click();
  await page.getByText("Instruments").nth(1).click();   
});