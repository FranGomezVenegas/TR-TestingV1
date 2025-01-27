import { test, expect } from '@playwright/test';
import { ConfigSettings } from '../../trazit-config';
test.beforeEach(async ({ page }) => {
  await page.goto(ConfigSettings.platformUrl);

  await page.getByLabel('User').fill(ConfigSettings.userAdmin);
  await page.getByLabel('Password').fill(ConfigSettings.userAdminPss);
  await page.getByLabel('Password').press('Enter');
});

// Abre la pestaña
test('Trazit-Air-ProductionLotOpen', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Production Lots").nth(1).click();   
});
// Crea un lote
test('Trazit-Air-ProductionLotNew', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Production Lots").nth(1).click();
  await page.getByTitle('New').click();
  await page.getByLabel('New').fill('Prueba{TZ_DATE}');
  await page.getByText('Accept').nth(4).click();    
});
// Crea un lote ya existente
test('Trazit-Air-ProductionLotNew-AlreadyExist', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Production Lots").nth(1).click();
  await page.getByTitle('New').click();
  await page.getByLabel('New').fill('Hola');
  await page.getByText('Accept').nth(4).click();
});
// Activa un lote
test('Trazit-Air-ProductionLot-Activate', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Production Lots").nth(1).click();
  await page.getByTitle('Activate').nth(0).click();
  await page.getByText('').nth(586).click();
  await page.getByText('Accept').nth(4).click();
});
// Cancelar el activar
test('Trazit-Air-ProductionLot-CancelActivate', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Production Lots").nth(1).click();
  await page.getByTitle('Activate').nth(0).click();
  await page.getByText('Cancel').nth(4).click();
});
// Desactiva un lote
test('Trazit-Air-ProductionLot-Deactivate', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("Production Lots").nth(1).click();
  await page.getByText('Lot').nth(13).click();
  await page.getByTitle('Activate').nth(1).click();
});