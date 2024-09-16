import { test, expect } from '@playwright/test';
import { ConfigSettings, platformMenuNames } from '../../trazit-config';
import { InstrumentsConfig, MenuInstrumentsControl, MicroEM } from '../../trazit-models/test-config-instruments - global';
import { PendingDecisions } from '../../trazit-models/test-config-air-derivations';

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
  await testInfo.attach(ConfigSettings.screenShotsCredencials.screenShotsName, {body: await page.locator(ConfigSettings.screenShotsCredencials.pageElementName).screenshot(), contentType: ConfigSettings.screenShotsContentType});
  await page.locator(platformMenuNames.procedure.main.pageElementName).click();
  await page.pause();
  await page.pause();
  await page.pause();
  await page.pause();
  await testInfo.attach(platformMenuNames.procedure.main.screenShotsName, {
    body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
  await page.pause();
  await page.getByRole('menuitem', { name: MicroEM.main.pageElement.label }).locator('span').hover();
  await page.pause();
  await page.pause();
  await testInfo.attach(MicroEM.main.screenShotsName, {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettings.screenShotsContentType
  });
  await page.pause();
  await page.getByRole('menuitem', { name: MicroEM.deviation.pageElement.label }).locator('label').click(); 
  await page.pause();
  await page.pause();
  await testInfo.attach(MicroEM.deviation.screenShotsName, {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettings.screenShotsContentType
  });
  await page.pause();
});


test('Trazit-Air-Deviations-Open', async ({ page }, testInfo) => {
  await page.pause();
});


test('Trazit-Air-Deviations-PendingDecisions', async ({ page }, testInfo) => {
  await page.getByLabel(PendingDecisions.buttonPending).click();
  await page.pause();
  await page.pause();
  await testInfo.attach(PendingDecisions.screenShotsAfterButton, {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettings.screenShotsContentType
  });
  await page.pause();
});

test('Trazit-Air-Deviations-PendingDecisions-Select', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Pending").nth(10).click();
  await page.getByText('2023').nth(4).click();
});

test('Trazit-Air-Deviations-PendingDecisions-CreateInvestigation', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Pending").nth(10).click();
  await page.getByText('2023').nth(4).click();
  await page.getByText("create").click();
});

test('Trazit-Air-Deviations-PendingDecisions-AddInvestigation', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Pending").nth(10).click();
  await page.getByText('2023').nth(4).click();
  await page.getByText("Add").click();
});

test('Trazit-Air-Deviations-PendingDecisions-AddInvestigation-Cancel', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Pending").nth(10).click();
  await page.getByText('2023').nth(4).click();
  await page.getByText("Add").click();
  await page.getByText("Cancel").nth(4).click();
});

test('Trazit-Air-Deviations-PendingDecisions-AddInvestigation-Accept', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Pending").nth(10).click();
  await page.getByText('2023').nth(4).click();
  await page.getByText("Add").click();
  await page.getByText("12").nth(4).click();
  await page.getByText("Accept").nth(4).click();
});

test('Trazit-Air-Deviations-Investigations', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Investigations").click();
});

test('Trazit-Air-Deviations-Investigations-Select', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Investigations").click();
  await page.getByText("2").nth(2).click();
});

test('Trazit-Air-Deviations-Investigations-Decision', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Investigations").click();
  await page.getByText("2").nth(2).click();
  await page.getByText("Decision").nth(1).click();
});

test('Trazit-Air-Deviations-Investigations-Close', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Investigations").click();
  await page.getByText("2").nth(2).click();
  await page.getByText("Close").nth(3).click();
});

test('Trazit-Air-Deviations-Investigations-Decision-SysName', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Investigations").click();
  await page.getByText("2").nth(2).click();
  await page.getByText("Decision").nth(1).click();
  await page.getByText("System Name").nth(1).fill('Nombre Prueba');
});

test('Trazit-Air-Deviations-Investigations-Decision-SysId', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Investigations").click();
  await page.getByText("2").nth(2).click();
  await page.getByText("Decision").nth(1).click();
  await page.getByText("System Id").nth(2).fill('123');
});

test('Trazit-Air-Deviations-Investigations-Decision-NoCAPADecision', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Investigations").click();
  await page.getByText("2").nth(2).click();
  await page.getByText("Decision").nth(1).click();
  await page.getByText("System Name").nth(1).fill('Nombre Prueba');
  await page.getByText("System Id").nth(2).fill('123');
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

test('Trazit-Air-Deviations-Investigations-Decision-CAPA', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Investigations").click();
  await page.getByText("2").nth(2).click();
  await page.getByText("Decision").nth(1).click();
  await page.getByText("CAPA Required").click();
});


test('Trazit-Air-Deviations-Investigations-Decision-FullDecision', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Investigations").click();
  await page.getByText("2").nth(2).click();
  await page.getByText("Decision").nth(1).click();
  await page.getByText("System Name").nth(1).fill('Nombre Prueba');
  await page.getByText("System Id").nth(2).fill('123');
  await page.getByText("CAPA Required").click();
  await page.getByText("CAPA System Name").fill('CAPA Prueba');
  await page.getByText("CAPA Id").fill('123');
});

test('Trazit-Air-Deviations-Investigations-Decision-FullDecision-Cancel', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Investigations").click();
  await page.getByText("2").nth(2).click();
  await page.getByText("Decision").nth(1).click();
  await page.getByText("System Name").nth(1).fill('Nombre Prueba');
  await page.getByText("System Id").nth(2).fill('123');
  await page.getByText("CAPA Required").click();
  await page.getByText("CAPA System Name").fill('CAPA Prueba');
  await page.getByText("CAPA Id").fill('123');
  await page.getByText("Cancel").nth(4).click();
});


test('Trazit-Air-Deviations-Investigations-Decision-FullDecision-Accept', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Deviations").nth(1).click(); 
  await page.getByText("Investigations").click();
  await page.getByText("2").nth(2).click();
  await page.getByText("Decision").nth(1).click();
  await page.getByText("System Name").nth(1).fill('Nombre Prueba');
  await page.getByText("System Id").nth(2).fill('123');
  await page.getByText("CAPA Required").click();
  await page.getByText("CAPA System Name").fill('CAPA Prueba');
  await page.getByText("CAPA Id").fill('123');
  await page.getByText("Accept").nth(4).click();
});