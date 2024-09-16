import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.trazit.net/');
  await page.getByLabel('User').fill('admin');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('trazit');
  await page.getByRole('button', { name: 'Access' }).click();
  await page.goto('https://demo.trazit.net/dashboard');
  await page.getByLabel('* New Instrument Name').click();
  await page.getByLabel('* New Instrument Name').fill('w');
  await page.getByLabel('* Family').click();
  await page.getByLabel('* Family').click();
  await page.getByRole('option', { name: 'Viscosimetro' }).click();
  await page.getByLabel('* Model').click();
  await page.getByLabel('* Model').fill('1');
  await page.getByLabel('* Supplier').click();
  await page.getByRole('option', { name: 'Mettler Toledo' }).click();
  await page.getByLabel('* Serial Number').click();
  await page.getByLabel('* Serial Number').fill('1');
  await page.getByLabel('* ManufacturerName').click();
  await page.getByRole('option', { name: 'Agilent' }).click();
  await page.getByLabel('Responsible', { exact: true }).click();
  await page.getByRole('option', { name: 'admin', exact: true }).click();
  await page.getByLabel('Responsible Backup').click();
  await page.getByRole('option', { name: 'admin', exact: true }).click();
  await page.getByLabel('Purchase Date').fill('2024-08-31');
  await page.getByLabel('* Installation Date').fill('2024-08-31');  
  await page.getByRole('button', { name: 'Accept' }).click();
  
});