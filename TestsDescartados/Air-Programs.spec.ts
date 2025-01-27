import { test, expect } from '@playwright/test';
import { ConfigSettings } from '../../trazit-config';
test.beforeEach(async ({ page }) => {
  await page.goto(ConfigSettings.platformUrl);

  await page.getByLabel('User').fill(ConfigSettings.userAdmin);
  await page.getByLabel('Password').fill(ConfigSettings.userAdminPss);
  await page.getByLabel('Password').press('Enter');
});

test('Trazit-Air-Programs', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText('Programs').nth(1).click();   
  await page.getByText('Summary').click();   
});

test('Trazit-Air-Programs-Limits', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText('Programs').nth(1).click();   
  await page.getByText('Limits').nth(0).click();   
});

test('Trazit-Air-Programs-Calendar', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText('Programs').nth(1).click();   
  await page.getByText('Calendar').nth(3).click();   
});

test('Trazit-Air-Programs-SPoints', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText('Programs').nth(1).click();   
  await page.getByText('Sampling Points').nth(0).click();   
});

test('Trazit-Air-Programs-SPoints-Select', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText('Programs').nth(1).click();   
  await page.getByText('Sampling Points').nth(0).click();   
  await page.getByText('Llenado').nth(7).click(); 
});

test('Trazit-Air-Programs-SPoints-Select-Accept', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText('Programs').nth(1).click();   
  await page.getByText('Sampling Points').nth(0).click();   
  await page.getByText('Llenado').nth(7).click(); 
  await page.getByText('Accept').nth(10).click(); 
});

test('Trazit-Air-Programs-SPoints-Select-Log', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText('Programs').nth(1).click();   
  await page.getByText('Sampling Points').nth(0).click();   
  await page.getByText('Llenado').nth(7).click(); 
  await page.getByText('Log').nth(6).click(); 
});

test('Trazit-Air-Programs-SPMap', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText('Programs').nth(1).click();   
  await page.getByText('Sampling Points').nth(1).click();   
});


test('Trazit-Air-Programs-SPMap-Select', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText('Programs').nth(1).click();   
  await page.getByText('Sampling Points').nth(1).click();   
  await page.locator('img:nth-child(4)').hover();   //Bucle con hover y con click
});

test('Trazit-Air-Programs-SPMap-Log', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText('Programs').nth(1).click();   
  await page.getByText('Sampling Points').nth(1).click();   
  await page.locator('img:nth-child(4)').click();   
  await page.getByText('Log').nth(7).click();   
});

test('Trazit-Air-Programs-SPMap-Close', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText('Programs').nth(1).click();   
  await page.getByText('Sampling Points').nth(1).click();   
  await page.locator('img:nth-child(4)').click();  
  await page.getByText('Close').nth(13).click();   
});