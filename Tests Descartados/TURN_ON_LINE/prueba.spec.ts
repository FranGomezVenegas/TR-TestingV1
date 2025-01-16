import { test, expect } from '@playwright/test';
import { loginIntoPlatform } from '../TURN_ON_LINE/logIntoPlatform'; 
import { navigateAndExecute } from '../TURN_ON_LINE/navigateAndExecute';
import { captureNotifications } from '../TURN_ON_LINE/captureNotifications';
import { setupErrorHandling } from '../TURN_ON_LINE/setupErrorHandling'; 
import deviceConfig from '../TURN_ON_LINE/deviceConfig'; 

const pagesToTest = [
  { url: 'https://demo.trazit.net/dashboard/procedures?procName=instruments&viewName=PlatformInstruments&filterName=', name: 'Item1', model: 'Model1', serialNumber: 'SN1', manufacturer: 'Mettler Toledo' },
  { url: 'https://demo.trazit.net/dashboard/procedures?procName=instruments&viewName=PlatformInstrumentsBalanzas&filterName=', name: 'Item2', model: 'Model2', serialNumber: 'SN2', manufacturer: 'Perkin Elmer' }
  // Agrega más objetos para más páginas
];

test.describe('Automated Tests for Multiple Devices', () => {
  for (const [deviceName, { width, height }] of Object.entries(deviceConfig)) {
    test.describe(deviceName, () => {
      test.beforeEach(async ({ page }) => {
        await test.step('Set viewport size', async () => {
          await page.setViewportSize({ width, height });
        });

        await test.step('Login into the platform', async () => {
          await loginIntoPlatform(page);
        });

        // Configura el manejo de errores
        const checkForErrors = setupErrorHandling(page);
        page.on('close', checkForErrors); // Verificar errores cuando se cierre la página
      });

      test('Automated Test for Multiple Pages', async ({ page }) => {
        await test.step('Navigate and execute tests on pages', async () => {
          await navigateAndExecute(page, pagesToTest);
        });

        await test.step('Capture notifications', async () => {
          await captureNotifications(page);
        });

        // Verifica errores al final del test
        await test.step('Close the page', async () => {
          await page.close(); // Cierra la página para activar el evento 'close'
        });
      });
    });
  }
});
