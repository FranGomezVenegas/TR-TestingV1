import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.trazit.net/');
  await page.getByLabel('User').fill('admin');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('trazit');
  await page.getByRole('button', { name: 'Access' }).click();
  await page.goto('https://demo.trazit.net/dashboard');
  await page.goto('https://demo.trazit.net/dashboard/procedures?procName=instruments&viewName=PlatformInstruments&filterName=');
  await page.getByLabel('create_new_folder').click();
  await page.getByLabel('* New Instrument Name').click();
  await page.getByLabel('* New Instrument Name').fill('testing');
  await page.getByLabel('* Family').click();
  await page.getByRole('option', { name: 'Viscosimetro' }).click();
  await page.getByLabel('* Model').click();
  await page.getByLabel('* Model').fill('1');
  await page.getByLabel('* Supplier').click();
  await page.getByLabel('* Serial Number').click();
  await page.getByLabel('* Serial Number').fill('1');
  await page.getByLabel('* ManufacturerName').click();
  await page.getByRole('option', { name: 'Mettler Toledo' }).click();
  await page.getByLabel('Responsible', { exact: true }).click();
  await page.getByRole('option', { name: 'admin', exact: true }).click();
  await page.getByLabel('Responsible Backup').click();
  await page.getByRole('option', { name: 'admin', exact: true }).click();
  await page.getByLabel('Purchase Date').fill('2024-08-31');
  await page.getByRole('cell', { name: '09', exact: true }).click();
  await page.getByTitle('Turn online').getByRole('img').click();
  await page.getByTitle('Turn off-line').getByRole('img').click();
  await page.getByRole('textbox', { name: 'Justification Phrase' }).fill('testing');
  await page.goto('https://demo.trazit.net/dashboard/procedures?procName=instruments&viewName=PlatformInstrumentsBalanzas&filterName=');
  await page.getByLabel('* New Instrument Name').click();
  await page.getByLabel('* New Instrument Name').fill('testing');
  await page.getByLabel('* Model').click();
  await page.getByLabel('* Model').fill('1');
  await page.getByLabel('* Supplier').click();
  await page.getByLabel('* Serial Number').fill('1');
  await page.getByLabel('* ManufacturerName').click();
  await page.getByRole('option', { name: 'Perkin Elmer' }).locator('span').click();
  await page.getByLabel('Responsible', { exact: true }).click();
  await page.getByLabel('Responsible Backup').click();
  await page.getByLabel('Purchase Date').fill('2024-08-31');
  await page.locator('#TURN_ON_LINE').getByRole('img').click();
  await page.getByRole('button', { name: 'Accept' }).click();
  await page.getByRole('cell', { name: 'pr' }).click();
  await page.locator('objecttabs-composition').click();
  await page.getByLabel('* New Instrument Name').click();
  await page.getByLabel('* New Instrument Name').fill('testing');
  await page.getByLabel('* Model').fill('1');
  await page.getByLabel('* Serial Number').fill('1');
  await page.getByRole('option', { name: 'responsible' }).click();
  await page.getByLabel('Responsible Backup').click();
  await page.getByRole('option', { name: 'responsible_backup' }).click();
  await page.getByLabel('Purchase Date').fill('2024-08-31');
});