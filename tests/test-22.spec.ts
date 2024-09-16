import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://demo.ff2024.s3-website.eu-west-3.amazonaws.com/dashboard/procedures?procName=instruments&viewName=EventsInProgress&filterName=');
  await page.goto('http://demo.ff2024.s3-website.eu-west-3.amazonaws.com/');
  await page.getByLabel('User').fill('admin');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('trazit');
  await page.getByLabel('Password').press('Enter');
  await page.goto('http://demo.ff2024.s3-website.eu-west-3.amazonaws.com/dashboard');
  await page.getByRole('menuitem', { name: 'Deviations' }).locator('label').click();
  await page.getByRole('cell', { name: '36' }).locator('div').click();
  await page.getByLabel('loupe').click();
  await page.locator('#genericDialogGrid').getByText('13', { exact: true }).click();
  await page.getByRole('button', { name: 'Close', exact: true }).click();
});