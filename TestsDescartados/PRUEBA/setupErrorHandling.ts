import { Page } from '@playwright/test';

export function setupErrorHandling(page: Page) {
  const logs: { message: any, type: string }[] = [];
  const errors: Error[] = [];

  // Captura los mensajes de la consola
  page.on('console', (message) => {
    logs.push({ message: message.text(), type: message.type() });
  });

  // Captura los errores de la página
  page.on('pageerror', (exception) => {
    errors.push(exception);
  });

  // Función para verificar errores al final del test
  return async function checkForErrors() {
    console.log('Console logs:', logs);
    console.log('Page errors:', errors);

    if (errors.length > 0) {
      // Toma una captura de pantalla si hay errores
      await page.screenshot({ path: 'page-errors.png', fullPage: true });
      throw new Error('Test failed due to page errors.');
    }
  };
}
