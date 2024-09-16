import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://demo.ff2024.s3-website.eu-west-3.amazonaws.com/dashboard');
  await page.goto('http://demo.ff2024.s3-website.eu-west-3.amazonaws.com/');
  await page.getByLabel('User').fill('admin');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('trazit');
  await page.getByText('Access').click();
  await page.goto('http://demo.ff2024.s3-website.eu-west-3.amazonaws.com/dashboard');
  await page.goto('http://demo.ff2024.s3-website.eu-west-3.amazonaws.com/dashboard/holidayscalendar');
  await page.getByLabel('Calendar Name').click();
  await page.getByRole('option', { name: '(2023)' }).click();
});