import { test, expect } from '@playwright/test';
import { ConfigSettings } from '../../trazit-config';
test.beforeEach(async ({ page }) => {
  await page.goto(ConfigSettings.platformUrl);

  await page.getByLabel('User').fill(ConfigSettings.userAdmin);
  await page.getByLabel('Password').fill(ConfigSettings.userAdminPss);
  await page.getByLabel('Password').press('Enter');
});


test('Trazit-Inventory-Otros-Open', async ({ page }) => {
    await page.locator('#procedures').getByText('Procedures').hover();
    await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
    await page.getByRole('menuitem', { name: 'New inventory Lot Others' }).getByText('New inventory Lot Others').click();
});

test('Trazit-Inventory-Otros-New', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Others' }).getByText('New inventory Lot Others').click();
  await page.getByTitle("New").click();
  await page.getByLabel("refer").nth(0).click();
  await page.getByText("REF1").nth(0).click();
  await page.getByLabel("lot id").fill("PruebaOtros");
  await page.getByLabel("volume").nth(0).fill("1");
  await page.getByLabel("date").nth(0).type("12052025");
  await page.getByLabel("date").nth(1).type("12052025");
  await page.getByLabel("date").nth(2).type("12052025");
  await page.getByLabel("vendor").nth(0).fill("Prueba");
  await page.getByLabel("vendor").nth(1).fill("Prueba");
  await page.getByLabel("vendor").nth(2).fill("Prueba");
  await page.getByLabel("purity").fill("Prueba");
  await page.getByLabel("conservation").fill("Prueba");
  await page.getByLabel("Number of").fill("1");
  await page.locator('#genericDialog').getByRole('button', { name: 'Accept' }).click();
});

test('Trazit-Inventory-Otros-New-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Others' }).getByText('New inventory Lot Others').click();
  await page.getByTitle("New").click();
  await page.getByLabel("refer").nth(0).click();
  await page.getByText("REF1").nth(0).click();
  await page.getByLabel("lot id").fill("PruebaOtros");
  await page.getByLabel("volume").nth(0).fill("1");
  await page.getByLabel("date").nth(0).type("12052025");
  await page.getByLabel("date").nth(1).type("12052025");
  await page.getByLabel("date").nth(2).type("12052025");
  await page.getByLabel("vendor").nth(0).fill("Prueba");
  await page.getByLabel("vendor").nth(1).fill("Prueba");
  await page.getByLabel("vendor").nth(2).fill("Prueba");
  await page.getByLabel("purity").fill("Prueba");
  await page.getByLabel("conservation").fill("Prueba");
  await page.getByLabel("Number of").fill("1");
  await page.locator('#genericDialog').getByRole('button', { name: 'Cancel' }).locator('#label').click();
});

test('Trazit-Inventory-Otros-Select', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Others' }).getByText('New inventory Lot Others').click();
  await page.getByText("PruebaOtros").click();
});

test('Trazit-Inventory-Otros-Audit', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Others' }).getByText('New inventory Lot Others').click();
  await page.getByText("PruebaOtros").click();
  await page.getByTitle("audit").click();
});

test('Trazit-Inventory-Otros-Unavaliable', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Others' }).getByText('New inventory Lot Others').click();
  await page.getByText("PruebaOtros").click();
  await page.getByTitle("unava").click();
});

test('Trazit-Inventory-Otros-Avaliable', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Others' }).getByText('New inventory Lot Others').click();
  await page.getByText("PruebaOtros").click();
  await page.getByTitle("turn ava").click();
});

test('Trazit-Inventory-Otros-Qualification-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Others' }).getByText('New inventory Lot Others').click();
  await page.getByText("PruebaOtros").click();
  await page.getByTitle("qualification").nth(0).click();
  await page.locator('#list8').getByRole('combobox').click();
  await page.getByRole('option', { name: 'Accepted', exact: true }).click();
  await page.getByText('Cancel').nth(4).click();
});

test('Trazit-Inventory-Otros-Qualification-Accept', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Others' }).getByText('New inventory Lot Others').click();
  await page.getByText("PruebaOtros").click();
  await page.getByTitle("qualification").nth(0).click();
  await page.locator('#list8').getByRole('combobox').click();
  await page.getByRole('option', { name: 'Accepted', exact: true }).click();
  await page.locator('#genericDialog').getByRole('button', { name: 'Accept' }).click();
});

test('Trazit-Inventory-Otros-Qualification + Avaliable-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Others' }).getByText('New inventory Lot Others').click();
  await page.getByText("PruebaOtros").click();
  await page.getByTitle("qualification +").click();
  await page.getByLabel("Decision").click();
  await page.getByText("Accepted").nth(0).click();
  await page.getByText('Cancel').nth(4).click();
});

test('Trazit-Inventory-Otros-Qualification + Avaliable-Accept', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Others' }).getByText('New inventory Lot Others').click();
  await page.getByText("PruebaOtros").click();
  await page.getByTitle("qualification +").click();
  await page.getByLabel("Decision").click();
  await page.getByText("Accepted").nth(0).click();
  await page.getByText('Accept').nth(4).click();
});

test('Trazit-Inventory-Otros-Consume-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Others' }).getByText('New inventory Lot Others').click();
  await page.getByText("PruebaOtros").click();
  await page.getByTitle("Consume").click();
  await page.getByLabel("Consume").fill("1");
  await page.getByText("Cancel").nth(4).click();
});

test('Trazit-Inventory-Otros-Consume-Accept', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Others' }).getByText('New inventory Lot Others').click();
  await page.getByText("PruebaOtros").click();
  await page.getByTitle("Consume").click();
  await page.getByLabel("Consume").fill("1");
  await page.getByText("Accept").nth(4).click();
});

test('Trazit-Inventory-Otros-Adjust-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Others' }).getByText('New inventory Lot Others').click();
  await page.getByText("PruebaOtros").click();
  await page.getByTitle("Adjust").click();
  await page.getByLabel("Adjust").fill("2");
  await page.getByText("Cancel").nth(4).click();
});

test('Trazit-Inventory-Otros-Adjust-Accept', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Others' }).getByText('New inventory Lot Others').click();
  await page.getByText("PruebaOtros").click();
  await page.getByTitle("Adjust").click();
  await page.getByLabel("Adjust").fill("2");
  await page.getByText("Accept").nth(4).click();
});

test('Trazit-Inventory-Otros-Add-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Others' }).getByText('New inventory Lot Others').click();
  await page.getByText("PruebaOtros").click();
  await page.getByTitle("add").click();
  await page.getByLabel("Add").fill("2");
  await page.getByText("Cancel").nth(4).click();
});

test('Trazit-Inventory-Otros-Add-Accept', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Others' }).getByText('New inventory Lot Others').click();
  await page.getByText("PruebaOtros").click();
  await page.getByTitle("add").click();
  await page.getByLabel("Add").fill("2");
  await page.getByText("Accept").nth(4).click();
});