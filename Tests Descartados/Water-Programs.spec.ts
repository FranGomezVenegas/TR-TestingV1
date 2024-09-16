import { test, expect } from '@playwright/test';
import { ConfigSettings } from '../../trazit-config';
test.beforeEach(async ({ page }) => {
  await page.goto(ConfigSettings.platformUrl);

  await page.getByLabel('User').fill(ConfigSettings.userAdmin);
  await page.getByLabel('Password').fill(ConfigSettings.userAdminPss);
  await page.getByLabel('Password').press('Enter');
});


test('Trazit-Water-Programs', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText('Programs').nth(1).click();   
  await page.getByText('Summary').click();   
});

test('Trazit-Water-Programs-Limits', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText('Programs').nth(1).click();   
  await page.getByText('Limits').nth(0).click();   
});

test('Trazit-Water-Programs-Calendar', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText('Programs').nth(1).click();   
  await page.getByText('Calendar').nth(3).click();   
});

test('Trazit-Water-Programs-SPoints', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText('Programs').nth(1).click();   
  await page.getByText('Sampling Points').nth(0).click();   
});

test('Trazit-Water-Programs-SPoints-Select', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText('Programs').nth(1).click();   
  await page.getByText('Sampling Points').nth(0).click();   
  await page.getByText('WFI').click(); 
});

test('Trazit-Water-Programs-SPoints-Select-Accept', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText('Programs').nth(1).click();   
  await page.getByText('Sampling Points').nth(0).click();   
  await page.getByText('WFI').click(); 
  await page.getByText('Accept').nth(10).click(); 
});

test('Trazit-Water-Programs-SPoints-Select-Log', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText('Programs').nth(1).click();   
  await page.getByText('Sampling Points').nth(0).click();   
  await page.getByText('WFI').nth(7).click(); 
  await page.getByText('Log').nth(6).click(); 
});

test('Trazit-Water-Programs-SPMap', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText('Programs').nth(1).click();   
  await page.getByText('Sampling Points').nth(1).click();   
});


test('Trazit-Water-Programs-SPMap-Select', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText('Programs').nth(1).click();   
  await page.getByText('Sampling Points').nth(1).click();   
  await page.getByRole('main').getByRole('img').nth(1).click();   //No funciona el hover pero al poner click se queda en bucle
});

test('Trazit-Water-Programs-SPMap-Log', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText('Programs').nth(1).click();   
  await page.getByText('Sampling Points').nth(1).click();   
  await page.getByRole('main').getByRole('img').nth(1).hover();   
  await page.getByText('Log').nth(7).click();   
});

test('Trazit-Water-Programs-SPMap-Close', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText('Programs').nth(1).click();   
  await page.getByText('Sampling Points').nth(1).click();   
  await page.getByRole('main').getByRole('img').nth(1).hover(); 
  await page.getByText('Close').nth(13).click();   

});