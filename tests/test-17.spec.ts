import { test, expect } from '@playwright/test';

test('Trazit-Instruments-OpenAttachment', async ({ page }, testInfo) => {
  // Paso 1: Hacer clic en la celda específica con nombre exacto "w"
  await test.step('Click on the specific cell with exact name "w"', async () => {
    await page.getByRole('cell', { name: 'w', exact: true }).locator('div').click();
  });

  // Paso 2: Hacer clic en el label de "attach file"
  await test.step('Click on the attach file label', async () => {
    await page.getByLabel('attach_file').click();
  });

  // Crear un nuevo contexto de navegador para `page1`
  const browser = page.context().browser();
  if (browser) {
    const context = await browser.newContext();
    const page1 = await context.newPage();

    // Paso 3: Navegar a Google en `page1`
    await test.step('Navigate to Google on page1', async () => {
      await page1.goto('https://www.google.com/?hl=es');
    });

    // Paso 4: Aceptar todas las cookies en la página de Google
    await test.step('Accept all cookies on Google page', async () => {
      await page1.getByRole('button', { name: 'Aceptar todo' }).click();
    });

    // Paso 5: Capturar captura de pantalla de `page1`
    await test.step('Capture screenshot of page1', async () => {
      await testInfo.attach('GooglePage1Screenshot', {
        body: await page1.screenshot({ fullPage: true }),
        contentType: 'image/png',
      });
    });
  } else {
    throw new Error('Browser context is not available.');
  }
});
