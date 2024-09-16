import { test, expect } from '@playwright/test';

test('trazit login', async ({ page }) => {
  await page.goto('https://http://trazit.platform.app.s3-website.eu-west-3.amazonaws.com//');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
