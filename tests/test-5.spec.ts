import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.trazit.net/');
  await page.getByLabel('User').fill('admin');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('trazit');
  await page.getByRole('button', { name: 'Access' }).click();
  await page.getByText('superuser', { exact: true }).click();
  await page.goto('https://demo.trazit.net/dashboard');
  await page.getByRole('menuitem', { name: 'Lot Creation' }).locator('label').click();
  await page.goto('https://demo.trazit.net/dashboard/procedures?procName=instruments&viewName=PlatformInstruments&filterName=');
  await page.getByTitle('Turn online').getByRole('img').click();
  await page.getByRole('button', { name: 'Accept' }).click();
  await page.goto('https://demo.trazit.net/dashboard/procedures?procName=mb_em&viewName=ProductionLots&filterName=');
  await page.goto('https://demo.trazit.net/dashboard/procedures?procName=instruments&viewName=PlatformInstrumentsBalanzas&filterName=');
  await page.getByRole('cell', { name: 'HTTPS2' }).click();
  await page.getByRole('cell', { name: 'HTTPS2' }).locator('div').click();
  await page.getByText('HTTPS2').click();
  await page.getByRole('cell', { name: 'HTTPS2' }).locator('div').click();
  await page.getByText('HTTPS2', { exact: true }).click();
  await page.locator('#TURN_ON_LINE').getByRole('img').click();
  await page.getByRole('button', { name: 'Accept' }).click();
  await page.goto('https://demo.trazit.net/dashboard/procedures?procName=stock&viewName=InventoryLotsMediosDeCultivo&filterName=');
});