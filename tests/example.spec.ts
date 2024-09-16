import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
  await page.goto('http://trazit2023.platform.app.testing.s3-website.eu-west-3.amazonaws.com//');

  await page.getByLabel('User').fill('fgomez');
  await page.getByLabel('Password').fill('trazit4ever');
  await page.getByLabel('Password').press('Enter');
});
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('trazit login/logout', async ({ page }) => {
  await page.goto('http://trazit.platform.app.s3-website.eu-west-3.amazonaws.com//');

  await page.getByLabel('User').fill('marc');
  await page.getByLabel('Password').fill('aulin');
  await page.getByLabel('Password').press('Enter');
  //await page.getByLabel('Access').click();
  //await page.getByRole('button').click({ force: true });
  // Expect a title "to contain" a substring.
  //await page.getByText('Procedures').nth(1).hover();
  await page.getByText('My Settings').nth(1).hover();
  //await page.locator("mwc-icon-button").nth(28).click();
  await page.locator("sp-menu-item").nth(6).click();

  //await page.getByRole('button').nth().click({ force: true });
  await expect(page).toHaveTitle(/Trazit Platform - Home/);

});
test('Trazit-Air-ProductionLotNew', async ({ page }) => {
  // await page.goto('http://trazit.platform.app.s3-website.eu-west-3.amazonaws.com//');

  // await page.getByLabel('User').fill('marc');
  // await page.getByLabel('Password').fill('aulin');
  // await page.getByLabel('Password').press('Enter');
  // Expect a title "to contain" a substring.
  // await page.getByText('Procedures').nth(1).hover();
  // await page.locator("sp-menu-item").nth(17).hover();
  // await page.getByText('Air sampling in Europe').nth(1).hover();
  // await page.getByText('Production Lots').nth(2).click();
  // await page.locator("sp-menu-item").nth(1).hover();
  // await page.locator("sp-menu-item").nth(7).click();
  // await page.locator("mwc-icon-button").nth(5).click();
  await page.getByTitle('New').click();
  await page.getByLabel('New').fill('Hola');
 await page.getByText('Accept').nth(4).click();
  // await page.getByLabel('Accept').nth(21).click({ force: true });    
});

test('Trazit-Air-ProductionLotSelect', async ({ page }) => {
  // await page.goto('http://trazit.platform.app.s3-website.eu-west-3.amazonaws.com//');

  // await page.getByLabel('User').fill('marc');
  // await page.getByLabel('Password').fill('aulin');
  // await page.getByLabel('Password').press('Enter');
  // Expect a title "to contain" a substring.
  //await page.getByText('Procedures').nth(1).hover();
//  await page.locator("sp-menu-item").nth(17).hover();
  //await page.getByText('Air sampling in Europe').nth(1).hover();
  //await page.getByText('Production Lots').nth(2).click();
  //await page.locator("sp-menu-item").nth(1).hover();
  //await page.locator("sp-menu-item").nth(7).click();
await page.locator("vaadin-grid-cell-content").nth(5).click();
  //await page.getByLabel('Accept').nth(21).click({ force: true });    
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // set user field value
  await page.getByLabel('User').fill('hola');
  // set user field value
  await page.getByLabel('Password').fill('hola');

  await page.getByRole('button').click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
