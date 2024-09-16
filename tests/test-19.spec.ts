import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://demo.ff2024.s3-website.eu-west-3.amazonaws.com/dashboard/procedures?procName=instruments&viewName=EventsInProgress&filterName=');
  await page.goto('http://demo.ff2024.s3-website.eu-west-3.amazonaws.com/');
  await page.getByLabel('User').fill('admin');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('trazit');
  await page.getByLabel('Password').press('Enter');
  await page.goto('http://demo.ff2024.s3-website.eu-west-3.amazonaws.com/dashboard/procedures?procName=instruments&viewName=EventsInProgress&filterName=');
  await page.getByRole('row', { name: 'SERVICE HPLC01 22/06/24 02:12' }).locator('div').first().click();
  await page.getByRole('cell', { name: 'SERVICE' }).first().click();
  await page.getByRole('cell', { name: 'SERVICE' }).first().click();
});