import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://demo.ff2024.s3-website.eu-west-3.amazonaws.com/dashboard/procedures?procName=instruments&viewName=PlatformInstruments&filterName=');
  await page.goto('http://demo.ff2024.s3-website.eu-west-3.amazonaws.com/');
  await page.getByLabel('User').fill('admin');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('trazit');
  await page.getByText('Access').click();
  await page.goto('http://demo.ff2024.s3-website.eu-west-3.amazonaws.com/dashboard');
  await page.getByLabel('create_new_folder').click();
  await page.getByLabel('* New Instrument Name').click();
  await page.getByLabel('* New Instrument Name').fill('testing');
  await page.getByLabel('* Family').click();
  await page.getByLabel('* Model').fill('1');
  await page.getByLabel('* Supplier').click();
  await page.getByRole('option', { name: 'Mettler Toledo' }).click();
  await page.getByLabel('* Serial Number').click();
  await page.getByLabel('* Serial Number').fill('1');
  await page.getByLabel('* ManufacturerName').click();
  await page.getByRole('option', { name: 'Perkin Elmer' }).click();
  await page.getByLabel('Responsible', { exact: true }).click();
  await page.getByLabel('Responsible', { exact: true }).click();
  await page.getByLabel('Purchase Date').fill('2024-09-01');
  await page.getByLabel('* Installation Date').fill('2024-09-01');
  await page.getByLabel('create_new_folder').click();
  await page.getByLabel('* Serial Number').click();
  await page.getByLabel('* Serial Number').fill('1');
  await page.getByRole('button', { name: 'Cancel' }).click();
});