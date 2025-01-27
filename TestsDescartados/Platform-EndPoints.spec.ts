import { test, expect } from '@playwright/test';
import { ConfigSettings, platformMenuNames } from '../../trazit-config';
test.beforeEach(async ({ page }, testInfo) => {
  await page.goto(ConfigSettings.platformUrl);

  await page.getByLabel(ConfigSettings.login.fildUser.label).fill(ConfigSettings.login.fildUser.value);
  await page.pause();
  await page.getByLabel(ConfigSettings.login.fildPss.label).fill(ConfigSettings.login.fildPss.value);
  await page.pause();
  await page.getByLabel(ConfigSettings.login.fildPss.label).press(ConfigSettings.login.fildPss.actionName);
  await page.pause();
  await testInfo.attach(ConfigSettings.screenShotsCredencials.screenShotsName, {body: await page.locator(ConfigSettings.screenShotsCredencials.pageElementName).screenshot(), contentType: ConfigSettings.screenShotsContentType});
  // await page.getByText('My Settings').nth(1).hover();
  await page.locator(platformMenuNames.mySettings.main.pageElementName).click();
  await page.pause();
  await page.pause();
  await testInfo.attach(platformMenuNames.mySettings.main.screenShotsName, {
    body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
  await page.locator(platformMenuNames.mySettings.endPoints.pageElementName).click();
  await page.pause();
  await page.pause();
  await testInfo.attach(platformMenuNames.mySettings.endPoints.screenShotsName, {
    body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
  await page.pause();
});


// Abre la pestaña
test('Trazit-Plataform-UserSettings-EndPointList-Open', async ({ page }, testInfo) => {
  //await page.getByText('My Settings').nth(1).hover();
  //await page.locator("sp-menu-item").nth(4).click();
});

test('Trazit-Plataform-UserSettings-EndPointList-Select', async ({ page }, testInfo) => {
  //await page.getByText('My Settings').nth(1).hover();
  //await page.locator("sp-menu-item").nth(4).click();
  await page.locator('[id="\\32 "]').click();
  await page.pause();
  await page.pause();
  await testInfo.attach("screenshotAfterFirstClick", {
    body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
  await page.locator('[id="\\32 "]').click();
  await page.pause();
  await page.pause();
  await testInfo.attach("screenshotAfterSecondClick", {
    body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
});
