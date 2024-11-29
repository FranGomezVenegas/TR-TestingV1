import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config.js';
import { attachScreenshot } from '../1TRAZiT-Commons/actionsHelper.js';

const timeout = 40000;

export const handleActionNameInteraction = async (page, testInfo, Button) => {
    if (!Button?.buttonName) {
        return;
    }

    try {
        if (Button.selectName) {
            await test.step(Button.phraseSelect, async () => {
                const position = Button.positionSelectElement !== undefined ? Button.positionSelectElement : 0;
                try {
                    await page.getByText(Button.selectName, { exact: true }).nth(position).click({ timeout: 3000 });
                } catch (exactClickError) {
                    console.log(`Error en clic exacto: ${exactClickError.message}`);
                    await page.getByText(Button.selectName).nth(position).click({ timeout: 3000 });
                }
            });

            if (Button.phrasePauses) {
                await test.step(Button.phrasePauses, async () => {
                    await page.pause();
                });
            }

            if (Button.screenShotsSelect) {
                await test.step(Button.phraseScreenShots, async () => {
                    await attachScreenshot(testInfo, Button.screenShotsSelect, page, ConfigSettingsAlternative.screenShotsContentType);
                    if (Button.phrasePauses) {
                        await page.pause();
                    }
                });
            }
            
        }

        // Paso 4: Clic en el botón
        await test.step(Button.phraseButtonName, async () => {
            const selectorBoton = `#${Button.buttonName}`;

            // Configuro el listener 'dialog' justo antes del clic
            const handleDialog = async (dialog) => {
                console.error(`Se detectó un alert con el mensaje: "${dialog.message()}"`);
                await dialog.dismiss(); // Cierro el alert. 
                throw new Error(`El test falló debido a un alert con el mensaje: "${dialog.message()}"`);
            };

            page.on('dialog', handleDialog);

            try {
                const elementos = page.locator(selectorBoton);
                const cantidad = await elementos.count();
                console.log(`Encontrados ${cantidad} elementos con el ID ${Button.buttonName}`);

                if (cantidad > 0) {
                    // Si hay múltiples elementos, usa la posición especificada o el primero por defecto
                    const indice = Button.positionButton || 0;
                    if (indice >= cantidad) {
                        throw new Error(`Índice ${indice} fuera de rango. Solo hay ${cantidad} elementos disponibles.`);
                    }

                    await elementos.nth(indice).waitFor({ state: 'visible', timeout });
                    // Comentar si no es con dialogo.
                    try {
                        await elementos.nth(indice).click({ timeout });
                        const position = Button.positionSelectElement !== undefined ? Button.positionSelectElement : 0;
                        try {
                            await page.getByText(Button.selectName, { exact: true }).nth(position).click({ timeout: 4000 });
                            await page.getByText(Button.selectName, { exact: true }).nth(position).click({ timeout: 4000 });
                        } catch (exactClickError) {
                            console.log(`Error en clic exacto: ${exactClickError.message}`);
                            await page.getByText(Button.selectName).nth(position).click({ timeout: 4000 });
                            await page.getByText(Button.selectName).nth(position).click({ timeout: 4000 });
                        }
                        await elementos.nth(indice).click({ timeout });
                        // Hasta aqui, el console.log ya no.
                        console.log(`Clic correctamente nth(${indice})`);
                    } catch (clickError) {
                        console.log(`Error en clic directo: ${clickError.message}`);
                        await page.evaluate((selector, index) => {
                            const elementos = document.querySelectorAll(selector);
                            if (elementos[index]) {
                                elementos[index].click();
                                elementos[index].click();
                            }
                        }, selectorBoton, indice);
                        console.log(`Clic correctamente`);
                    }
                } else {
                    throw new Error(`No se pudo hacer clic en ningún elemento con ID: ${Button.buttonName}`);
                }
            } finally {
                // Quito el listener para evitar capturar diálogos no deseados después del clic
                page.off('dialog', handleDialog);
            }
        });

        if (Button.phrasePauses) {
            await test.step(Button.phrasePauses, async () => {
                await page.pause();
            });
        }

        await page.waitForTimeout(3000);
        if (Button.screenShotsButtonName) {
            await test.step(Button.phraseScreenShots, async () => {
                await attachScreenshot(testInfo, Button.screenShotsButtonName, page, ConfigSettingsAlternative.screenShotsContentType);
                if (Button.phrasePauses) {
                    await page.pause();
                }
            });
        }
    } catch (error) {
        console.error("Error en handleActionNameInteraction:", error);
        throw error;
    }
};
