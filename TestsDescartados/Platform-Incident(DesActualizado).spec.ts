import { test, expect } from '@playwright/test';
import { ConfigSettings } from '../../trazit-config';
test.beforeEach(async ({ page }) => {
  await page.goto(ConfigSettings.platformUrl);

  await page.getByLabel('User').fill(ConfigSettings.userAdmin);
  await page.getByLabel('Password').fill(ConfigSettings.userAdminPss);
  await page.getByLabel('Password').press('Enter');
});


test('Trazit-Platform-Incidents-Open', async ({ page }) => {
  await page.getByText('My Settings').nth(1).hover();
  await page.locator("sp-menu-item").nth(1).click();
});

test('Trazit-Platform-Incident-NewTicket', async ({ page }) => {
  await page.getByText('My Settings').nth(1).hover();
  await page.locator("sp-menu-item").nth(1).click();
  await page.getByTitle('New').click();
  await page.getByLabel('Title').nth(1).fill('Hola');
  await page.getByLabel('Detail').nth(1).fill('Hola Detalle');
  await page.getByText('Create').click();
  // ASSET TICKET CREADO
});

test('Trazit-Platform-ConfirmNewTicket', async ({ page }) => {
  // acceder en incidentes
  await page.getByText('My Settings').nth(1).hover();
  await page.locator("sp-menu-item").nth(1).click();
  // crear ticket
  await page.getByTitle('New').click();
  await page.getByLabel('Title').nth(1).fill('Hola 2');
  await page.getByLabel('Detail').nth(1).fill('Hola Detalle 2');
  await page.getByText('Create').click();
  await page.getByText('Hola2').click(); 
  // ASSET TICKET CREADO
});

test('Boton Confirm', async ({ page }) => {
  await page.getByText('My Settings').nth(1).hover();
  await page.locator("sp-menu-item").nth(1).click();
  await page.getByText('Hola2').click(); 
  await page.getByTitle('confirm').click();
  await page.getByText('detail').nth(1).fill('confirmado');
  await page.getByText('confirm').nth(1).click()
});

test('Boton Nota', async ({ page }) => {
  await page.getByText('My Settings').nth(1).hover();
  await page.locator("sp-menu-item").nth(1).click();
  await page.getByText('Hola2').click(); 
  await page.getByTitle('Add Note').click();
  await page.getByText('detail').nth(1).fill('Nota');
  await page.getByText('accept').nth(2).click()
});

test('Boton Close It!', async ({ page }) => {
  await page.getByText('My Settings').nth(1).hover();
  await page.locator("sp-menu-item").nth(1).click();
  await page.getByText('Hola2').click(); 
  await page.getByTitle('Close It!').click();
  await page.getByText('detail').nth(1).fill('Cerrado');
  await page.getByText('accept').nth(3).click()
});

test('Boton ReOpen It!', async ({ page }) => {
  await page.getByText('My Settings').nth(1).hover();
  await page.locator("sp-menu-item").nth(1).click();
  await page.getByTitle('ReOpen It!').click();
  await page.getByText('detail').nth(1).fill('ReAbrir');
  await page.getByText('accept').nth(4).click()
});