import { test, expect } from '@playwright/test';
import { ConfigSettings } from '../../trazit-config';
test.beforeEach(async ({ page }) => {
  await page.goto(ConfigSettings.platformUrl);

  await page.getByLabel('User').fill(ConfigSettings.userAdmin);
  await page.getByLabel('Password').fill(ConfigSettings.userAdminPss);
  await page.getByLabel('Password').press('Enter');
});

test('Trazit-Water-LoginNewSamples-Open', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("New Sample").nth(1).click(); 
});

test('Trazit-Water-LoginNewSamples-Select', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("New Sample").nth(1).click(); 
  await page.getByText("WFI").click(); 
});

test('Trazit-Water-LoginNewSamples-Log-ButtonAccept', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("New Sample").nth(1).click(); 
  await page.getByText("WFI").click(); 
  await page.getByText("Log").nth(7).click(); 
});

test('Trazit-Water-LoginNewSamples-Log-ButtonCancel', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("New Sample").nth(1).click(); 
  await page.getByText("WFI").click(); 
  await page.getByText("Close").nth(4).click(); 
});