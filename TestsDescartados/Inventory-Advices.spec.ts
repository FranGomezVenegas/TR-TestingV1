import { test, expect } from '@playwright/test';
import { ConfigSettings, platformMenuNames } from '../../trazit-config';
import { MenuLots } from '../../trazit-models/test-config-stock-global';

test.beforeEach(async ({ page }, testInfo) => {
  await page.pause();
  await page.pause();
  await page.goto(ConfigSettings.platformUrl);
  await page.pause();
  await page.pause();
  await page.getByLabel(ConfigSettings.login.fldUser.label).fill(ConfigSettings.login.fldUser.value);
  await page.pause();
  await page.pause();
  await page.getByLabel(ConfigSettings.login.fldPss.label).fill(ConfigSettings.login.fldPss.value);
  await page.pause();
  await page.pause();
  await page.getByLabel(ConfigSettings.login.fldPss.label).press(ConfigSettings.login.fldPss.actionName);
  await page.pause();
  await page.pause();
  await page.pause();
  await testInfo.attach(ConfigSettings.screenShotsCredencials.screenShotsName, {body: await page.locator(ConfigSettings.screenShotsCredencials.pageElementName).screenshot(), contentType: ConfigSettings.screenShotsContentType});
  await page.getByRole('menuitem', { name: 'Lots' }).locator('span').click();
  await page.locator(platformMenuNames.procedure.main.pageElementName).click();
  await page.pause();
  await page.pause();
  await page.pause();
  await testInfo.attach(platformMenuNames.procedure.main.screenShotsName, {
    body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
  await page.pause();
  await page.pause();
  //await page.pause();
  await testInfo.attach( MenuLots.Lots.lotsCreation.screenShotsName, {
    body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
  await page.goto(MenuLots.Lots.lotsCreation.pageElement); 
  //await page.getByRole('menuitem', { name: 'Lots Creation' }).locator('span').click();
  await testInfo.attach( MenuLots.Lots.lotsCreation.screenShotsName, {
     body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
});


test('Trazit-Inventory-Advice-Open', async ({ page }) => {
  await page.pause();
  await page.close();
    // await page.locator('#procedures').getByText('Procedures').hover();
    // await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
    // await page.getByRole('menuitem', { name: 'Advices' }).getByText('Advices').click();
});


test('Trazit-Inventory-Advice-Expired', async ({ page }, testInfo) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'Advices' }).getByText('Advices').click();
  await page.getByLabel("Queries").click();
  await page.getByText("Expired").nth(0).click();
});


test('Trazit-Inventory-Advice-Expired-Filter-Lot Name', async ({ page }, testInfo) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'Advices' }).getByText('Advices').click();
  await page.getByLabel("Queries").click();
  await page.getByText("Expired").nth(0).click();
  await page.getByLabel('Reference').fill("");
  await page.getByLabel('Lot Name').fill("lot2");
  await page.getByText('Search').click();
});


test('Trazit-Inventory-Advice-Expired-Filter-Reference', async ({ page }, testInfo) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'Advices' }).getByText('Advices').click();
  await page.getByLabel("Queries").click();
  await page.getByText("Expired").nth(0).click();
  await page.getByLabel('Reference').fill("REF1");
  await page.getByText('Search').click();
});


test('Trazit-Inventory-Advice-Expired-Filter-Category', async ({ page }, testInfo) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'Advices' }).getByText('Advices').click();
  await page.getByLabel("Queries").click();
  await page.getByText("Expired").nth(0).click();
  await page.getByLabel('Reference').fill("");
  await page.getByLabel('category').fill("Reactivos Comerciales");
  await page.getByText('Search').click();
});


test('Trazit-Inventory-Advice-Expired-Filter-Lot Name + Reference', async ({ page }, testInfo) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'Advices' }).getByText('Advices').click();
  await page.getByLabel("Queries").click();
  await page.getByText("Expired").nth(0).click();
  await page.getByLabel('Reference').fill("REF1");
  await page.getByLabel('Lot Name').fill("lot2");
  await page.getByText('Search').click();
});


test('Trazit-Inventory-Advice-Expired-Filter-Lot Name + Category', async ({ page }, testInfo) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'Advices' }).getByText('Advices').click();
  await page.getByLabel("Queries").click();
  await page.getByText("Expired").nth(0).click();
  await page.getByLabel('Reference').fill("");
  await page.getByLabel('category').fill("Reactivos Comerciales");
  await page.getByLabel('Lot Name').fill("lot2");
  await page.getByText('Search').click();
});


test('Trazit-Inventory-Advice-Expired-Filter-Reference + Category', async ({ page }, testInfo) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'Advices' }).getByText('Advices').click();
  await page.getByLabel("Queries").click();
  await page.getByText("Expired").nth(0).click();
  await page.getByLabel('Reference').fill("REF1");
  await page.getByLabel('category').fill("Reactivos Comerciales");
  await page.getByText('Search').click();
});


test('Trazit-Inventory-Advice-Expired-Filter-Lot Name + Category + Reference', async ({ page }, testInfo) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'Advices' }).getByText('Advices').click();
  await page.getByLabel("Queries").click();
  await page.getByText("Expired").nth(0).click();
  await page.getByLabel('Reference').fill("REF1");
  await page.getByLabel('category').fill("Reactivos Comerciales");
  await page.getByLabel('Lot Name').fill("lot2");
  await page.getByText('Search').click();
});


test('Trazit-Inventory-Advice-Reference', async ({ page }, testInfo) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'Advices' }).getByText('Advices').click();
  await page.getByLabel("Queries").click();
  await page.getByText("Reference").nth(0).click();
});


test('Trazit-Inventory-Advice-Reference-Filter-Reference', async ({ page }, testInfo) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'Advices' }).getByText('Advices').click();
  await page.getByLabel("Queries").click();
  await page.getByText("Reference").nth(0).click();
  await page.getByLabel('Reference').fill("REF1");
  await page.getByText('Search').click();
});


test('Trazit-Inventory-Advice-Reference-Filter-Category', async ({ page }, testInfo) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'Advices' }).getByText('Advices').click();
  await page.getByLabel("Queries").click();
  await page.getByText("Reference").nth(0).click();
  await page.getByLabel('Reference').fill("");
  await page.getByLabel('category').fill("Reactivos Comerciales");
  await page.getByText('Search').click();
});


test('Trazit-Inventory-Advice-Reference-Filter-Reference + Category', async ({ page }, testInfo) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'Advices' }).getByText('Advices').click();
  await page.getByLabel("Queries").click();
  await page.getByText("Reference").nth(0).click();
  await page.getByLabel('Reference').fill("REF1");
  await page.getByLabel('category').fill("Reactivos Comerciales");
  await page.getByText('Search').click();
});