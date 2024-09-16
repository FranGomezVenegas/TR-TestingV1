import { test, expect } from '@playwright/test';
import { ConfigSettings } from '../../trazit-config';
test.beforeEach(async ({ page }) => {
  await page.goto(ConfigSettings.platformUrl);

  await page.getByLabel('User').fill(ConfigSettings.userAdmin);
  await page.getByLabel('Password').fill(ConfigSettings.userAdminPss);
  await page.getByLabel('Password').press('Enter');
});

test('Trazit-Air-ProductionLotNew', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Production Lots").nth(1).click();
 // await page.getByText('Air sampling in Europe').nth(1).hover();
 // await page.getByText('Production Lots').nth(2).click();
 // await page.locator("sp-menu-item").nth(1).hover();
 // await page.locator("sp-menu-item").nth(7).click();
 // await page.locator("mwc-icon-button").nth(5).click();
 await page.getByTitle('New').click();
 await page.getByLabel('New').fill('Hola{TZ_DATE}');
 await page.getByText('Accept').nth(4).click();
 // await page.getByLabel('Accept').nth(21).click({ force: true });    
});

test('Trazit-Air-ProductionLotNew-AlreadyExist', async ({ page }) => {
 await page.getByText('Procedures').nth(1).hover();
 await page.getByText("Air").nth(0).click();
 await page.getByText("Production Lots").nth(1).click();
 await page.getByTitle('New').click();
 await page.getByLabel('New').fill('Hola');
 await page.getByText('Accept').nth(4).click();
});