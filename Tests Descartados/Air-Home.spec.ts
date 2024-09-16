import { test, expect } from '@playwright/test';
import { ConfigSettings } from '../../trazit-config';
test.beforeEach(async ({ page }) => {
  await page.goto(ConfigSettings.platformUrl);

  await page.getByLabel('User').fill(ConfigSettings.userAdmin);
  await page.getByLabel('Password').fill(ConfigSettings.userAdminPss);
  await page.getByLabel('Password').press('Enter');
});

test('Trazit-Air-Home', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Home").nth(2).click();   
});

test('Trazit-Air-Home-Start', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Home").nth(2).click();
  await page.getByText("Start").click();
});

test('Trazit-Air-Home-Location1', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Home").nth(2).click();
  await page.getByText("Location 1").click();
});

test('Trazit-Air-Home-Location2', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Home").nth(2).click();
  await page.getByText("Location 2").click();
});

test('Trazit-Air-Home-Person1', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Home").nth(2).click();
  await page.getByText("Person 1").click();
});

test('Trazit-Air-Home-Person2', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Home").nth(2).click();
  await page.getByText("Person 2").click();
});

test('Trazit-Air-Home-End', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Home").nth(2).click();
  await page.getByText("End").nth(15).click();
});