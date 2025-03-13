import { test, expect } from '@playwright/test';
import { clickElement, attachScreenshot, fillField } from '../1TRAZiT-Commons/actionsHelper.js';

// Función de envoltura para manejar el selector con comodín si es necesario
export const clickElementWithWildcard = async (page, selector, useWildcard = false, timeout = 2500) => {
    const modifiedSelector = useWildcard ? `* ${selector}` : selector;
    await clickElement(page, modifiedSelector, timeout);
};

export const fillFieldWithWildcard = async (page, selector, value, useWildcard = false) => {
    const modifiedSelector = useWildcard ? `* ${selector}` : selector;
    await fillField(page, modifiedSelector, value);
};

// Ejemplo de uso en handleObjectByTabsWithSearchInteraction
export async function handleObjectByTabsWithSearchInteraction(page, testInfo, configSettings, button) {
    if (button.search) {
        console.log('Se encontró el buscador...');
        await test.step(button.phraseClickSearch, async () => {
            // Unificamos la condición: si `label` o `value` están vacíos o no definidos, hacemos clic en en la opcion 
            if (button.search.label && button.search.value) {
                // Si ambos `label` y `value` están presentes y son válidos, hacer clic y llenar el campo
                await clickElementWithWildcard(page, button.search.label, true); // useWildcard en true
                console.log('Hizo clic en el buscador...');
                
                await fillFieldWithWildcard(page, button.search.label, button.search.value, true); // useWildcard en true
                console.log('Escribiendo en el buscador...');
                await test.step(button.phraseSearch, async () => {
                    try {
                        await page.getByRole('button', { name: button.search.press }).click({ timeout: 1000 });
                        console.log('Búsqueda realizada.');
                    } catch (error) {
                        await page.getByText(button.search.press, { exact: true }).click({ force: true, timeout: 1000 });
                        console.log('Búsqueda Realizada.');
                    }
                });
        
                await test.step(button.phrasePauses, async () => {
                    await page.pause();
                    await page.pause();
                    await page.pause();
                    await page.pause();
                });
        
            } else {
                // Si `label` o `value` no están definidos, hacer clic en el botón en la opcion 
                console.log('No se encontraron label o value. Haciendo clic en el botón');
                await page.getByRole('button', { name: button.search.selectObjectSearch }).click({ force: true, timeout: 2000 });
            }
        });

        await test.step(button.phrasePauses, async () => {
            await page.pause();
        });

       
        await test.step(button.phraseScreenShots, async () => {
            await attachScreenshot(testInfo, button.screenShotSearch, page, configSettings.screenShotsContentType);
        });
        
        await test.step(button.phrasePauses, async () => {
            await page.waitForTimeout(1000);
        });
    }
}
