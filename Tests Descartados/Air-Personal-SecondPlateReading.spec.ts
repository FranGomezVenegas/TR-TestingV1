import { test, expect } from '@playwright/test';
import { ConfigSettings } from '../../trazit-config';
test.beforeEach(async ({ page }) => {
  await page.goto(ConfigSettings.platformUrl);

  await page.getByLabel('User').fill(ConfigSettings.userAdmin);
  await page.getByLabel('Password').fill(ConfigSettings.userAdminPss);
  await page.getByLabel('Password').press('Enter');
});

test('Trazit-P-SecondPlateReading', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(39).click();   
});
