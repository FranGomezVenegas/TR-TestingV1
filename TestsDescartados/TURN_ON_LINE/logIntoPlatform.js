// loginIntoPlatform.js
import { ConfigSettings } from '../../trazit-config'; // Asegúrate de ajustar la ruta correctamente
import { test } from '@playwright/test';

export async function loginIntoPlatform(page) {
  try {
    await test.step('Navigate to the platform', async () => {
      await page.goto(ConfigSettings.platformUrl);
      console.log(`Navigated to ${ConfigSettings.platformUrl}`);
      await page.waitForTimeout(3000);
    });

    await test.step('Enter username', async () => {
      await page.getByLabel(ConfigSettings.login.fldUser.label).fill(ConfigSettings.login.fldUser.value);
      await page.waitForTimeout(1000);
    });

    await test.step('Enter password', async () => {
      await page.getByLabel(ConfigSettings.login.fldPss.label).fill(ConfigSettings.login.fldPss.value);
      await page.waitForTimeout(1000);
    });

    await test.step('Click login button', async () => {
      await page.getByLabel(ConfigSettings.login.fldPss.label).press(ConfigSettings.login.fldPss.actionName);
      await page.waitForTimeout(3000);
    });

    console.log('Login process completed successfully');
  } catch (error) {
    console.error('Error during login process:', error);
    throw new Error(`Login failed: ${error.message}`);
  }
}