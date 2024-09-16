import { test, expect } from '@playwright/test';
import { ConfigSettings } from '../../trazit-config';
test.beforeEach(async ({ page }) => {
  await page.goto(ConfigSettings.platformUrl);

  await page.getByLabel('User').fill(ConfigSettings.userAdmin);
  await page.getByLabel('Password').fill(ConfigSettings.userAdminPss);
  await page.getByLabel('Password').press('Enter');
});

test('Trazit-P-PendingSampling-Open', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText('').nth(29).click();   
});

test('Trazit-P-PendingSampling-Select', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(29).click();   
  await page.getByText("FA2018").nth(0).click();   
});

test('Trazit-P-PendingSampling-Audit', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(29).click();   
  await page.getByText("FA2018").nth(0).click();   
  await page.getByTitle("Audit").click();   
});


test('Trazit-P-PendingSampling-SetSample', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(29).click();   
  await page.getByText("FA2018").nth(0).click();   
  await page.getByTitle("Set Sample").click();   
});

test('Trazit-P-PendingSampling-ChangeSample', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(29).click();   
  await page.getByText("FA2018").nth(0).click();   
  await page.getByTitle("Change Sample").click();   
});

test('Trazit-P-PendingSampling-ChangeSample-Accept', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(29).click();   
  await page.getByText("FA2018").nth(0).click();   
  await page.getByTitle("Change Sample").click();   
  await page.locator('#datetime1').click();
  // await page.locator('#datetime1').type("20020020231212"); 
  await page.locator('#datetime1').type("20022023"); 
  await page.locator('#datetime1').press('ArrowRight'); 
  await page.locator('#datetime1').type("1212");
  await page.locator('#genericDialog').getByRole('button', { name: 'Accept' }).click(); 
});

test('Trazit-P-PendingSampling-Next', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(29).click();   
  await page.getByText("FA2018").nth(0).click();   
  await page.getByTitle("Next").click();   
});

test('Trazit-P-PendingSampling-AddComment', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(29).click();   
  await page.getByText("FA2018").nth(0).click();   
  await page.getByTitle("Add Sampling").click();   
});

test('Trazit-P-PendingSampling-AddComment-Cancel', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(29).click();   
  await page.getByText("FA2018").nth(0).click();   
  await page.getByTitle("Add Sampling").click();   
  await page.getByText("Comment").nth(0).fill("Prueba");   
  await page.getByText("Cancel").nth(4).click();   
});

test('Trazit-P-PendingSampling-AddComment-Accept', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(29).click();   
  await page.getByText("FA2018").nth(0).click();   
  await page.getByTitle("Add Sampling").click();   
  await page.getByText("Comment").nth(0).fill("Prueba");   
  await page.getByText("Accept").nth(4).click();   
});

test('Trazit-P-PendingSampling-RemoveComment', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(29).click();   
  await page.getByText("667").click();   
  await page.getByTitle("Remove Sampling").click();   
});