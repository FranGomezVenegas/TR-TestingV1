import { test, expect } from '@playwright/test';
import { ConfigSettings } from '../../trazit-config';
test.beforeEach(async ({ page }) => {
  await page.goto(ConfigSettings.platformUrl);

  await page.getByLabel('User').fill(ConfigSettings.userAdmin);
  await page.getByLabel('Password').fill(ConfigSettings.userAdminPss);
  await page.getByLabel('Password').press('Enter');
});

test('Trazit-Air-SampleIncubations', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText('Sample').nth(3).click();   
});

test('Trazit-Air-SampleIncubations-Batch-Cancel', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText('Sample').nth(3).click();   
  await page.getByText('Batch').nth(0).click();   
  await page.getByText('Batch Name').fill("Prueba");   
  await page.getByText('Cancel').nth(3).click();   
});

test('Trazit-Air-SampleIncubations-Batch-Accept', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText('Sample').nth(3).click();   
  await page.getByText('Batch').nth(0).click();   
  await page.getByText('Batch Name').fill("Prueba");   
  await page.getByText('Accept').nth(2).click();   
});

test('Trazit-Air-SampleIncubations-Assign-Cancel', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText('Sample').nth(3).click();   
  await page.getByText('Incub').nth(7).click();   
  await page.getByText('Assign').click();   
  await page.getByText('Incub 1').nth(13).click();   
  await page.getByText('Cancel').nth(3).click();   
});

test('Trazit-Air-SampleIncubations-Assign-Accept', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText('Sample').nth(3).click();   
  await page.getByText('InCub').nth(7).click();   
  await page.getByText('Assign').click();   
  await page.getByText('Incub 1').nth(13).click();  
  await page.getByText('Accept').nth(3).click();   
});

test('Trazit-Air-SampleIncubations-StartIncubation', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText('Sample').nth(3).click();   
  await page.getByText('Prueba').click();   
  await page.getByText('Start').nth(1).click();   
});

test('Trazit-Air-SampleIncubations-EndIncubator', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText('Sample').nth(3).click();   
  await page.getByText('Prueba').click();     
  await page.getByText('End').nth(15).click();   
});

test('Trazit-Air-SampleIncubations-DeleteBatch', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText('Sample').nth(3).click();   
  await page.getByText('Prueba').click();     
  await page.getByText('Delete').click();     
});