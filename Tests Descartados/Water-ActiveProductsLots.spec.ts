import { test, expect } from '@playwright/test';
import { ConfigSettings } from '../../trazit-config';
test.beforeEach(async ({ page }) => {
  await page.goto(ConfigSettings.platformUrl);

  await page.getByLabel('User').fill(ConfigSettings.userAdmin);
  await page.getByLabel('Password').fill(ConfigSettings.userAdminPss);
  await page.getByLabel('Password').press('Enter');
});


test('Trazit-Water-ActiveProductsLots-Open', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Active").nth(2).click();   
});

test('Trazit-Water-ActiveProductsLots-Select', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Active").nth(2).click();
  await page.getByText('123').nth(0).click();   
});

test('Trazit-Water-ActiveProductsLots-New', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Active").nth(2).click(); 
  await page.getByTitle('New').click();
  await page.getByLabel('New').fill('Hola');  
});

test('Trazit-Water-ActiveProductsLots-NewComplete', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Active").nth(2).click(); 
  await page.getByTitle('New').click();
  await page.getByLabel('New').fill('Hola');
  await page.getByText('Accept').nth(4).click();  
});

test('Trazit-Water-ProductionLotNew-AlreadyExist', async ({ page }) => {
 await page.getByText('Procedures').nth(1).hover();
 await page.getByText("Air").nth(0).click();
 await page.getByText("Active").nth(2).click();
 await page.getByTitle('New').click();
 await page.getByLabel('New').fill('Hola');
 await page.getByText('Accept').nth(4).click();
});

test('Trazit-Water-ActiveProductsLots-Activate', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Active").nth(2).click(); 
  await page.getByTitle('Activate').nth(0).click(); 
});

test('Trazit-Water-ActiveProductsLots-AcceptActivate', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Active").nth(2).click(); 
  await page.getByTitle('Activate').nth(0).click();
  await page.getByText('').nth(562).click();
  await page.getByText('Accept').nth(4).click();
});

test('Trazit-Water-ActiveProductsLots-CancelActivate', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Active").nth(2).click(); 
  await page.getByTitle('Activate').nth(0).click();
  await page.getByText('Cancel').nth(4).click();
});

test('Trazit-Water-ActiveProductsLots-Deactivate', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Active").nth(2).click(); 
  await page.getByText("Prueba").click(); 
  await page.getByTitle('Activate').nth(1).click(); 
});

