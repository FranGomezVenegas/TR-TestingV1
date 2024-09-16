import { test, expect } from '@playwright/test';
import { ConfigSettings } from '../../trazit-config';
test.beforeEach(async ({ page }) => {
  await page.goto(ConfigSettings.platformUrl);

  await page.getByLabel('User').fill(ConfigSettings.userAdmin);
  await page.getByLabel('Password').fill(ConfigSettings.userAdminPss);
  await page.getByLabel('Password').press('Enter');
});


test('Trazit-Water-SamplesReview', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Samples").nth(2).click(); 
});

// await page.getByText("46").nth(1).click(); 
// await page.getByTitle("Audit").click();
// await page.getByText("close").nth(12).click();
// await page.getByTitle("Result").click();
// await page.getByText("close").nth(10).click();
// await page.getByTitle("Review").click();