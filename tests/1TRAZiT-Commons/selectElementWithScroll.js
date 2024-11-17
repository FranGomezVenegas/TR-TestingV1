const { test, expect } = require('@playwright/test');

export async function selectElementWithScroll(page, gridContent, fields, element) {
  // Verificar si 'fields' no existe o está vacío y si 'gridContent' es verdadero
  if (!fields && gridContent) {
    await test.step('Scrolling and selecting an element', async () => {
      try {
        // Intentar encontrar el elemento con getByText (primer intento)
        let el = await page.getByText(element, { exact: true }).first();

        // Si no encontramos el primer elemento, intentamos con nth(1)
        if (!(await el.isVisible())) {
          el = await page.getByText(element, { exact: true }).nth(1);
        }

        // Si aún no encontramos el elemento después de intentar con `first()` y `nth(1)`
        if (!(await el.isVisible())) {
          throw new Error(`Element with text '${element}' not found.`);
        }

        // Realizar scroll si el elemento no está visible
        await el.scrollIntoViewIfNeeded();

        // Verificar que el elemento esté visible
        await expect(el).toBeVisible();

        // Hacer clic en el elemento encontrado
        await el.click();

        
      } catch (error) {
        console.error(`Error while selecting element: ${error.message}`);
        throw error; // Re-throw the error to ensure the test fails if needed
      }
    });
  } else {
    console.log("Conditions not met for scrolling and selecting an element.");
  }
}

