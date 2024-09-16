import { test, expect } from '@playwright/test';
import { ConfigSettings, platformMenuNames } from '../../trazit-config';
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
//  });
  await testInfo.attach(ConfigSettings.screenShotsCredencials.screenShotsName, {body: await page.locator(ConfigSettings.screenShotsCredencials.pageElementName).screenshot(), contentType: ConfigSettings.screenShotsContentType});
  await page.pause();
});

test('Trazit-Air-LoginNewSample-Open', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("New Sample").nth(1).click();
});

test('Trazit-Air-LoginNewSamples-Select', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Micro EM").nth(0).click();
  await page.getByText("New Sample").nth(1).click(); 
  await page.getByText("LlenadoViales").nth(1).click(); 
});

test('Trazit-Air-LoginNewSamples-Log-ButtonAccept', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("New Sample").nth(1).click(); 
  await page.getByText("Log").nth(7).click(); 
});

test('Trazit-Air-LoginNewSamples-Log-ButtonCancel', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("New Sample").nth(1).click(); 
  await page.getByText("LlenadoViales").nth(1).click(); 
  await page.getByText("Close").nth(5).click(); 
});