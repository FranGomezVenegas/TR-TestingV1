import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.trazit.net/');
  await page.getByLabel('User').fill('admin');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('trazit');
  await page.getByRole('button', { name: 'Access' }).click();
  await page.getByText('superuser', { exact: true }).click();
  await page.goto('https://demo.trazit.net/dashboard');
  await page.locator('tr-app').click();
  await page.goto('https://demo.trazit.net/dashboard/procedures?procName=mb_em&viewName=ProductionLots&filterName=');
  await page.getByLabel('create_new_folder').click();
});