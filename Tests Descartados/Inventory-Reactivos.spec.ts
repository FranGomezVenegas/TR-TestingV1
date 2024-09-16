import { test, expect } from '@playwright/test';
import { ConfigSettings } from '../../trazit-config';
test.beforeEach(async ({ page }) => {
  await page.goto(ConfigSettings.platformUrl);

  await page.getByLabel('User').fill(ConfigSettings.userAdmin);
  await page.getByLabel('Password').fill(ConfigSettings.userAdminPss);
  await page.getByLabel('Password').press('Enter');
});


test('Trazit-Inventory-Reactivos-Open', async ({ page }) => {
    await page.locator('#procedures').getByText('Procedures').hover();
    await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
    await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
});

test('Trazit-Inventory-Reactivos-Comerciales', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots Reactivos Comerciales' }).click();
});

test('Trazit-Inventory-Reactivos-Comerciales-New', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots Reactivos Comerciales' }).click();
  await page.getByTitle("New").click();
  await page.getByLabel("refer").nth(0).click();
  await page.getByText("REF1").nth(0).click();
  await page.getByLabel("lot id").fill("PruebaComerciales");
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

test('Trazit-Inventory-Reactivos-Comerciales-New-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots Reactivos Comerciales' }).click();
  await page.getByTitle("New").click();
  await page.getByLabel("refer").nth(0).click();
  await page.getByText("REF1").nth(0).click();
  await page.getByLabel("lot id").fill("PruebaComerciales");
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

test('Trazit-Inventory-Reactivos-Comerciales-Select', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots Reactivos Comerciales' }).click();
  await page.getByText("PruebaComerciales").click();
});

test('Trazit-Inventory-Reactivos-Comerciales-Audit', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots Reactivos Comerciales' }).click();
  await page.getByText("PruebaComerciales").click();
  await page.getByTitle("audit").click();
});

test('Trazit-Inventory-Reactivos-Comerciales-Unavaliable', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots Reactivos Comerciales' }).click();
  await page.getByText("PruebaComerciales").click();
  await page.getByTitle("unava").click();
});

test('Trazit-Inventory-Reactivos-Comerciales-Avaliable', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots Reactivos Comerciales' }).click();
  await page.getByText("PruebaComerciales").click();
  await page.getByTitle("turn ava").click();
});

test('Trazit-Inventory-Reactivos-Comerciales-Qualification-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots Reactivos Comerciales' }).click();
  await page.getByText("PruebaComerciales").click();
  await page.getByTitle("qualification").nth(0).click();
  await page.locator('#list8').getByRole('combobox').click();
  await page.getByRole('option', { name: 'Accepted', exact: true }).click();
  await page.getByText('Cancel').nth(4).click();
});

test('Trazit-Inventory-Reactivos-Comerciales-Qualification-Accept', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots Reactivos Comerciales' }).click();
  await page.getByText("PruebaComerciales").click();
  await page.getByTitle("qualification").nth(0).click();
  await page.locator('#list8').getByRole('combobox').click();
  await page.getByRole('option', { name: 'Accepted', exact: true }).click();
  await page.locator('#genericDialog').getByRole('button', { name: 'Accept' }).click();
});

test('Trazit-Inventory-Reactivos-Comerciales-Qualification + Avaliable-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots Reactivos Comerciales' }).click();
  await page.getByText("PruebaComerciales").click();
  await page.getByTitle("qualification +").click();
  await page.getByLabel("Decision").click();
  await page.getByText("Accepted").nth(0).click();
  await page.getByText('Cancel').nth(4).click();
});

test('Trazit-Inventory-Reactivos-Comerciales-Qualification + Avaliable-Accept', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots Reactivos Comerciales' }).click();
  await page.getByText("PruebaComerciales").click();
  await page.getByTitle("qualification +").click();
  await page.getByLabel("Decision").click();
  await page.getByText("Accepted").nth(0).click();
  await page.getByText('Accept').nth(4).click();
});

test('Trazit-Inventory-Reactivos-Comerciales-Consume-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots Reactivos Comerciales' }).click();
  await page.getByText("PruebaComerciales").click();
  await page.getByTitle("Consume").click();
  await page.getByLabel("Consume").fill("1");
  await page.getByText("Cancel").nth(4).click();
});

test('Trazit-Inventory-Reactivos-Comerciales-Consume-Accept', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots Reactivos Comerciales' }).click();
  await page.getByText("PruebaComerciales").click();
  await page.getByTitle("Consume").click();
  await page.getByLabel("Consume").fill("1");
  await page.getByText("Accept").nth(4).click();
});

test('Trazit-Inventory-Reactivos-Comerciales-Adjust-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots Reactivos Comerciales' }).click();
  await page.getByText("PruebaComerciales").click();
  await page.getByTitle("Adjust").click();
  await page.getByLabel("Adjust").fill("2");
  await page.getByText("Cancel").nth(4).click();
});

test('Trazit-Inventory-Reactivos-Comerciales-Adjust-Accept', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots Reactivos Comerciales' }).click();
  await page.getByText("PruebaComerciales").click();
  await page.getByTitle("Adjust").click();
  await page.getByLabel("Adjust").fill("2");
  await page.getByText("Accept").nth(4).click();
});

test('Trazit-Inventory-Reactivos-Comerciales-Add-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots Reactivos Comerciales' }).click();
  await page.getByText("PruebaComerciales").click();
  await page.getByTitle("add").click();
  await page.getByLabel("Add").fill("2");
  await page.getByText("Cancel").nth(4).click();
});

test('Trazit-Inventory-Reactivos-Comerciales-Add-Accept', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots Reactivos Comerciales' }).click();
  await page.getByText("PruebaComerciales").click();
  await page.getByTitle("add").click();
  await page.getByLabel("Add").fill("2");
  await page.getByText("Accept").nth(4).click();
});

test('Trazit-Inventory-Reactivos-Preparados', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots ReactivosPreparados' });
});

test('Trazit-Inventory-Reactivos-Preparados-New', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots ReactivosPreparados' }).click();
  await page.getByTitle("New").click();
  await page.getByLabel("refer").nth(0).click();
  await page.getByText("REF1").nth(0).click();
  await page.getByLabel("lot id").fill("PruebaPreparados");
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

test('Trazit-Inventory-Reactivos-Preparados-New-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots ReactivosPreparados' }).click();
  await page.getByTitle("New").click();
  await page.getByLabel("refer").nth(0).click();
  await page.getByText("REF1").nth(0).click();
  await page.getByLabel("lot id").fill("PruebaPreparados");
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

test('Trazit-Inventory-Reactivos-Preparados-Select', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots ReactivosPreparados' }).click();
  await page.getByText("PruebaPreparados").click();
});

test('Trazit-Inventory-Reactivos-Preparados-Audit', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots ReactivosPreparados' }).click();
  await page.getByText("PruebaPreparados").click();
  await page.getByTitle("audit").click();
});

test('Trazit-Inventory-Reactivos-Preparados-Unavaliable', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots ReactivosPreparados' }).click();
  await page.getByText("PruebaPreparados").click();
  await page.getByTitle("unava").click();
});

test('Trazit-Inventory-Reactivos-Preparados-Avaliable', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots ReactivosPreparados' }).click();
  await page.getByText("PruebaPreparados").click();
  await page.getByTitle("turn ava").click();
});

test('Trazit-Inventory-Reactivos-Preparados-Qualification-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots ReactivosPreparados' }).click();
  await page.getByText("PruebaPreparados").click();
  await page.getByTitle("qualification").nth(0).click();
  await page.locator('#list8').getByRole('combobox').click();
  await page.getByRole('option', { name: 'Accepted', exact: true }).click();
  await page.getByText('Cancel').nth(4).click();
});

test('Trazit-Inventory-Reactivos-Preparados-Qualification-Accept', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots ReactivosPreparados' }).click();
  await page.getByText("PruebaPreparados").click();
  await page.getByTitle("qualification").nth(0).click();
  await page.locator('#list8').getByRole('combobox').click();
  await page.getByRole('option', { name: 'Accepted', exact: true }).click();
  await page.locator('#genericDialog').getByRole('button', { name: 'Accept' }).click();
});

test('Trazit-Inventory-Reactivos-Preparados-Qualification + Avaliable-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots ReactivosPreparados' }).click();
  await page.getByText("PruebaPreparados").click();
  await page.getByTitle("qualification +").click();
  await page.getByLabel("Decision").click();
  await page.getByText("Accepted").nth(0).click();
  await page.getByText('Cancel').nth(4).click();
});

test('Trazit-Inventory-Reactivos-Preparados-Qualification + Avaliable-Accept', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots ReactivosPreparados' }).click();
  await page.getByText("PruebaPreparados").click();
  await page.getByTitle("qualification +").click();
  await page.getByLabel("Decision").click();
  await page.getByText("Accepted").nth(0).click();
  await page.getByText('Accept').nth(4).click();
});

test('Trazit-Inventory-Reactivos-Preparados-Consume-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots ReactivosPreparados' }).click();
  await page.getByText("PruebaPreparados").click();
  await page.getByTitle("Consume").click();
  await page.getByLabel("Consume").fill("1");
  await page.getByText("Cancel").nth(4).click();
});

test('Trazit-Inventory-Reactivos-Preparados-Consume-Accept', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots ReactivosPreparados' }).click();
  await page.getByText("PruebaPreparados").click();
  await page.getByTitle("Consume").click();
  await page.getByLabel("Consume").fill("1");
  await page.getByText("Accept").nth(4).click();
});

test('Trazit-Inventory-Reactivos-Preparados-Adjust-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots ReactivosPreparados' }).click();
  await page.getByText("PruebaPreparados").click();
  await page.getByTitle("Adjust").click();
  await page.getByLabel("Adjust").fill("2");
  await page.getByText("Cancel").nth(4).click();
});

test('Trazit-Inventory-Reactivos-Preparados-Adjust-Accept', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots ReactivosPreparados' }).click();
  await page.getByText("PruebaPreparados").click();
  await page.getByTitle("Adjust").click();
  await page.getByLabel("Adjust").fill("2");
  await page.getByText("Accept").nth(4).click();
});

test('Trazit-Inventory-Reactivos-Preparados-Add-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots ReactivosPreparados' }).click();
  await page.getByText("PruebaPreparados").click();
  await page.getByTitle("add").click();
  await page.getByLabel("Add").fill("2");
  await page.getByText("Cancel").nth(4).click();
});

test('Trazit-Inventory-Reactivos-Preparados-Add-Accept', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Reactivos' }).getByText('New inventory Lot Reactivos').click();
  await page.getByRole('button', { name: 'Active Inventory Lots ReactivosPreparados' }).click();
  await page.getByText("PruebaPreparados").click();
  await page.getByTitle("add").click();
  await page.getByLabel("Add").fill("2");
  await page.getByText("Accept").nth(4).click();
});