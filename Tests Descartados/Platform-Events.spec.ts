import { test, expect } from '@playwright/test';
import { ConfigSettings } from '../../trazit-config';
test.beforeEach(async ({ page }) => {
  await page.goto(ConfigSettings.platformUrl);

  await page.getByLabel(ConfigSettings.login.fldUser.label).fill(ConfigSettings.login.fldUser.value);
  await page.getByLabel(ConfigSettings.login.fldPss.label).fill(ConfigSettings.login.fldPss.value);
  await page.getByLabel(ConfigSettings.login.fldPss.label).press(ConfigSettings.login.fldPss.actionName);
});

// Abre la pestaña
test('Trazit-Platform-Events-Open', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Instruments").nth(0).click();
  await page.getByText("Events").nth(0).click();   
});