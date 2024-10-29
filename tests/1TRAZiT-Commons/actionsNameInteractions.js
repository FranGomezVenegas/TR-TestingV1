import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config.js';
import { clickButtonById, clickElementByText, attachScreenshot } from '../1TRAZiT-Commons/actionsHelper.js';

const timeout = 30000;

export const handleActionNameInteraction = async (page, testInfo, Button) => {
    if (!Button?.buttonName) {
        return;
    }

    try {
        if (Button.selectName) {
            await test.step(Button.phraseSelect, async () => {
                // Selecciona el elemento en la posición especificada por positionSelectElement o el primer elemento (0) si no está definido
                const position = Button.positionSelectElement !== undefined ? Button.positionSelectElement : 0;
                await page.getByText(Button.selectName).nth(position).click();
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
            
            try {
                // Primero verificamos cuántos elementos existen con ese ID
                const elementos = page.locator(selectorBoton);
                const cantidad = await elementos.count();
                console.log(`Encontrados ${cantidad} elementos con el ID ${Button.buttonName}`);

                if (cantidad > 0) {
                    // Si hay múltiples elementos, usamos la posición especificada o el primero por defecto
                    const indice = Button.positionButton || 0;
                    
                    if (indice >= cantidad) {
                        throw new Error(`Índice ${indice} fuera de rango. Solo hay ${cantidad} elementos disponibles.`);
                    }

                    // Espero a que el elemento específico sea visible
                    await elementos.nth(indice).waitFor({ state: 'visible', timeout: timeout })
                    
                    // Intento hacer clic con diferentes estrategias
                    try {
                        // Intento 1: Clic directo
                        await elementos.nth(indice).dblclick({ timeout: timeout })
                        console.log(`Clic correctamente nth(${indice})`);
                        return;
                    } catch (clickError) {
                        console.log(`Error en clic directo: ${clickError.message}`);
                        
                        // Intento 2: Clic con JavaScript
                        await page.evaluate((selector, index) => {
                            const elementos = document.querySelectorAll(selector);
                            if (elementos[index]) {
                                elementos[index].dblclick();
                            }
                        }, selectorBoton, indice);
                        console.log(`Clic correctamente `);
                        return;
                    }
                }

                // Si llegamos aquí, intentamos con selectores alternativos
                const selectoresAlternativos = [
                    `button[title="${await elementos.first().getAttribute('title')}"]`,
                    `mwc-icon-button[icon="${await elementos.first().getAttribute('icon')}"]`,
                    `[role="button"][title="${await elementos.first().getAttribute('title')}"]`,
                    `button:has-text("${Button.buttonName}")`,
                    `[data-testid="${Button.buttonName}"]`
                ];

                for (const selector of selectoresAlternativos) {
                    try {
                        const elementosAlternativos = page.locator(selector);
                        const cantidadAlternativos = await elementosAlternativos.count();
                        
                        if (cantidadAlternativos > 0) {
                            const indice = Button.positionButton || 0;
                            await elementosAlternativos.nth(indice).dblclick();
                            console.log(`Clic exitoso usando selector alternativo: ${selector}`);
                            return;
                        }
                    } catch (error) {
                        console.log(`Intento fallido con selector ${selector}: ${error.message}`);
                        continue;
                    }
                }
            } catch (error) {
                console.error(`Error al intentar hacer clic: ${error.message}`);
                throw error;
            }

            throw new Error(`No se pudo hacer clic en ningún elemento con ID: ${Button.buttonName}`);
        });

        // Paso 5 Captura de pantalla al hacer una clic en el botón.
        if (Button.screenShotsButtonName) {
            await test.step(Button.phraseScreenShots, async () => {
                await attachScreenshot(testInfo, Button.screenShotsButtonName, page, ConfigSettingsAlternative.screenShotsContentType);
                if (Button.phrasePauses) {
                    await page.pause();
                }
            });
        }
    } catch (error) {
        // Si falla lanzo un error.
        console.error("Error en handleActionNameInteraction:", error);
        throw error;
    }
};