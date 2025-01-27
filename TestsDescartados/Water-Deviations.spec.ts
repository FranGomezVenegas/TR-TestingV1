import { test, expect } from '@playwright/test';
import { ConfigSettings } from '../../trazit-config';
test.beforeEach(async ({ page }) => {
  await page.goto(ConfigSettings.platformUrl);

  await page.getByLabel('User').fill(ConfigSettings.userAdmin);
  await page.getByLabel('Password').fill(ConfigSettings.userAdminPss);
  await page.getByLabel('Password').press('Enter');
});


test('Trazit-Water-Deviations', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
});

test('Trazit-Water-Deviations-PendingDecisions', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Pending").nth(10).click();
});

test('Trazit-Water-Deviations-PendingDecisions-Select', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Pending").nth(10).click();
  await page.getByText('vaadin-grid-cell-content-22').click();
});

test('Trazit-Water-Deviations-PendingDecisions-CreateInvestigation', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Pending").nth(10).click();
  await page.locator('vaadin-grid-cell-content-23').click();
  await page.getByText("create").click();
});

test('Trazit-Water-Deviations-PendingDecisions-AddInvestigation', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Pending").nth(10).click();
  await page.locator('vaadin-grid-cell-content-23').click();
  await page.getByText("Add").click();
});

test('Trazit-Water-Deviations-Investigations', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Pending").nth(10).click();
  await page.locator('vaadin-grid-cell-content-23').click();
});

test('Trazit-Water-Deviations-Investigations-Select', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Investigations").nth(10).click();
  await page.getByText("2").nth(2).click();
});

test('Trazit-Water-Deviations-Investigations-Decision', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Investigations").click();
  await page.getByText("2").nth(2).click();
  await page.getByText("Decision").nth(1).click();
});

test('Trazit-Water-Deviations-Investigations-Close', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Investigations").click();
  await page.getByText("2").nth(2).click();
  await page.getByText("Close").nth(3).click();
});

test('Trazit-Water-Deviations-Investigations-Decision-SysName', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Investigations").click();
  await page.getByText("2").nth(2).click();
  await page.getByText("Decision").nth(1).click();
  await page.getByText("System Name").nth(1).fill('Nombre Prueba');
});

test('Trazit-Water-Deviations-Investigations-Decision-SysId', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Investigations").click();
  await page.getByText("2").nth(2).click();
  await page.getByText("Decision").nth(1).click();
  await page.getByText("System Id").nth(2).fill('Id Prueba');
});

test('Trazit-Water-Deviations-Investigations-Decision-NoCAPADecision', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Investigations").click();
  await page.getByText("2").nth(2).click();
  await page.getByText("Decision").nth(1).click();
  await page.getByText("System Name").nth(1).fill('Nombre Prueba');
  await page.getByText("System Id").nth(2).fill('Id Prueba');
});

test('Trazit-Air-Deviations-Investigations-Decision-NoCAPADecision-Cancel', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Investigations").click();
  await page.getByText("2").nth(2).click();
  await page.getByText("Decision").nth(1).click();
  await page.getByText("System Name").nth(1).fill('Nombre Prueba');
  await page.getByText("System Id").nth(2).fill('123');
  await page.getByText("Cancel").nth(4).click();
});

test('Trazit-Air-Deviations-Investigations-Decision-NoCAPADecision-Accept', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Investigations").click();
  await page.getByText("2").nth(2).click();
  await page.getByText("Decision").nth(1).click();
  await page.getByText("System Name").nth(1).fill('Nombre Prueba');
  await page.getByText("System Id").nth(2).fill('123');
  await page.getByText("Accept").nth(4).click();
});


test('Trazit-Water-Deviations-Investigations-Decision-CAPA', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Investigations").click();
  await page.getByText("2").nth(2).click();
  await page.getByText("Decision").nth(1).click();
  await page.getByText("CAPA Required").click();
});

test('Trazit-Water-Deviations-Investigations-Decision-FullDecision', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Investigations").click();
  await page.getByText("2").nth(2).click();
  await page.getByText("Decision").nth(1).click();
  await page.getByText("System Name").nth(1).fill('Nombre Prueba');
  await page.getByText("System Id").nth(2).fill('Id Prueba');
  await page.getByText("CAPA Required").click();
  await page.getByText("CAPA System Name").fill('CAPA Prueba');
  await page.getByText("CAPA Id").fill('123');
});

test('Trazit-Water-Deviations-Investigations-Decision-FullDecision-Cancel', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Investigations").click();
  await page.getByText("2").nth(2).click();
  await page.getByText("Decision").nth(1).click();
  await page.getByText("System Name").nth(1).fill('Nombre Prueba');
  await page.getByText("System Id").nth(2).fill('Id Prueba');
  await page.getByText("CAPA Required").click();
  await page.getByText("CAPA System Name").fill('CAPA Prueba');
  await page.getByText("CAPA Id").fill('123');
  await page.getByText("Cancel").nth(4).click();
});

test('Trazit-Water-Deviations-Investigations-Decision-FullDecision-Accept', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Water").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Investigations").click();
  await page.getByText("2").nth(2).click();
  await page.getByText("Decision").nth(1).click();
  await page.getByText("System Name").nth(1).fill('Nombre Prueba');
  await page.getByText("System Id").nth(2).fill('Id Prueba');
  await page.getByText("CAPA Required").click();
  await page.getByText("CAPA System Name").fill('CAPA Prueba');
  await page.getByText("CAPA Id").fill('123');
  await page.getByText("Accept").nth(4).click();
});
