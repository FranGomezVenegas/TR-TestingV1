import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.trazit.net/');
  await page.getByLabel('User').click();
  await page.getByLabel('User').fill('procsadmin');
  await page.getByLabel('Password').fill('trazit4ever');
  await page.getByRole('button', { name: 'Access' }).click();
  await page.getByText('lock lock_open lock R&D').click({
    button: 'right'
  });
  await page.locator('#RandD').getByLabel('lock_open').click();
  await page.getByRole('textbox', { name: 'Justification Phrase' }).click();
  await page.getByRole('textbox', { name: 'Justification Phrase' }).fill('prueba');
  await page.getByRole('button', { name: 'Accept' }).click();
  await page.getByRole('textbox', { name: 'Justification Phrase' }).click();
  await page.getByRole('textbox', { name: 'Justification Phrase' }).fill('prueba');
  await page.getByRole('button', { name: 'Accept' }).click();
});