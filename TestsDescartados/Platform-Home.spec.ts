import { test, expect } from '@playwright/test';
import { ConfigSettings, platformMenuNames } from '../../trazit-config';
import { OpenHome } from '../../trazit-models/test-config.platform-home'; 
test.beforeEach(async ({ page }, testInfo) => {
  await page.goto(ConfigSettings.platformUrl);
  await page.pause();
  await page.getByLabel(ConfigSettings.login.fldUser.label).fill(ConfigSettings.login.fldUser.value);
  await page.pause();
  await page.pause();
  await page.getByLabel(ConfigSettings.login.fldPss.label).fill(ConfigSettings.login.fldPss.value);
  await page.pause();
  await page.pause();
  await page.getByLabel(ConfigSettings.login.fldPss.label).press(ConfigSettings.login.fldPss.actionName);
  await page.pause();
  await page.pause();
  await testInfo.attach(ConfigSettings.screenShotsCredencials.screenShotsName, {body: await page.locator(ConfigSettings.screenShotsCredencials.pageElementName).screenshot(), contentType: ConfigSettings.screenShotsContentType});
  await page.pause();
  // await page.getByText('My Settings').nth(1).hover();
  // await page.locator("sp-action-menu#dashboardmysettings").click();
  // await page.pause();
  // await page.locator("sp-menu-item#mysettingsholidayscalendar").click();
  // await page.pause();
});


// Abre la pestaña
test('Trazit-Platform-Home-Open', async ({ page }, testInfo) => {
  await page.getByText(OpenHome.button).nth(1).hover();
  await page.pause()
  await page.getByText(OpenHome.buttonName).nth(0).click();
  await page.pause()
  await page.pause()
  await page.pause()
  await testInfo.attach(OpenHome.screenAfterClickOpenHome, {
    body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
  await page.pause()
  await page.getByText(OpenHome.buttonTitle).nth(2).click();   
  await testInfo.attach(OpenHome.screenAfterClickOpenHome, {
    body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    await page.pause()
});