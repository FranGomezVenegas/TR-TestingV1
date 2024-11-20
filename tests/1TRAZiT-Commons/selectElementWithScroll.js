import { test, expect } from '@playwright/test';

export async function selectElementWithScroll(page, gridContent, fields, element, nthIndex) {
  // Verifico si no hay 'fields' y si 'gridContent' es verdadero para proceder con la selección
  if (!fields && gridContent) {
    await test.step('Scrolling and selecting an element', async () => {
      try {
        // Si me dan un índice (nthIndex), intento seleccionar el elemento en ese índice.
        // Si no, selecciono el primer elemento como predeterminado.
        let el;
        if (nthIndex !== undefined) {
          el = await page.getByText(element, { exact: true }).nth(nthIndex);
        } else {
          el = await page.getByText(element, { exact: true }).first();
        }

        // Verifico si el elemento existe antes de intentar interactuar con él
        if (!el) {
          throw new Error(`No se encontró el elemento con el texto '${element}' en el índice ${nthIndex ?? 0}.`);
        }

        // Me aseguro de que el elemento sea visible
        if (!(await el.isVisible())) {
          throw new Error(`El elemento con el texto '${element}' no es visible.`);
        }

        // Realizo un scroll para que el elemento sea visible en la pantalla
        await el.scrollIntoViewIfNeeded();

        // Confirmo que el elemento está visible antes de interactuar con él
        await expect(el).toBeVisible();

        // Finalmente, hago clic en el elemento
        await el.click();
      } catch (error) {
        // Registro el error en la consola y lo lanzo de nuevo para que el test falle si es necesario
        console.error(`Hubo un error al intentar seleccionar el elemento: ${error.message}`);
        throw error;
      }
    });
  } else {
    // Si no se cumplen las condiciones, lo informo en la consola
    console.log("No se cumplen las condiciones para realizar el scroll y seleccionar un elemento.");
  }
}
