import { test, expect } from '@playwright/test';
import { clickElement, attachScreenshot } from '../1TRAZiT-Commons/actionsHelper.js';

// Función para manejar la interacción con las pestañas
export async function handleTabInteraction(page, testInfo, configSettings, button) {
    if (button.tab) {
        await test.step(button.phraseTab, async () => {
            let clicked = false;

            try {
                // Intentar primer clic
                await clickElement(page, button.tab);
                console.log('Clicked on Tab (First option)');
                clicked = true; // Si funciona, marcar como clickeado
            } catch (error) {
                console.log('First option failed, trying second option.');
            }

            if (!clicked) {
                try {
                    // Intentar segundo clic
                    await page.getByLabel(button.tab).click({ timeout: 1000 });
                    console.log('Clicked on Tab (Second option)');
                    clicked = true; // Si funciona, marcar como clickeado
                } catch (error) {
                    console.log('Second option failed, trying third option.');
                }
            }

            if (!clicked) {
                try {
                    await test.step('Pauses', async () => {
                        await page.waitForTimeout(500);
                    });
                    // Intentar tercer clic
                    await page.getByRole('button', { name: button.tab, exact: true }).click({ force: true, timeout: 1000 });
                    console.log('Clicked on Tab (Third option)');
                    clicked = true; // Si funciona, marcar como clickeado
                } catch (error) {
                    console.log('Third option failed.');
                }
            }

            if (!clicked) {
                try {
                    // Intentar segundo clic
                    await page.getByRole('button', { name: button.tab }).click({ force: true,  timeout: 1000 });
                    console.log('Clicked on Tab (The Fourth option)');
                    clicked = true; // Si funciona, marcar como clickeado
                } catch (error) {
                    console.log('The Fourth option failed, trying third option.');
                }
            }

            // Si después de los tres intentos no se ha hecho clic, lanzar un error
            // if (!clicked) {
            //     console.error('Failed to click on the tab. All attempts failed.');
            //     throw new Error('Failed to click on the tab after four attempts.');
            // }
        });


        // Pausa
        await test.step(button.phrasePauses, async () => {
            await page.mouse.click(15, 20);
            await page.pause();
        });

        // Captura de pantalla
        await test.step(button.phraseScreenShots, async () => {
            await attachScreenshot(testInfo, button.screenShotTab, page, configSettings.screenShotsContentType);
        });

        await test.step(button.phrasePauses, async () => {
            await page.waitForTimeout(1500);
        });
    }
}
