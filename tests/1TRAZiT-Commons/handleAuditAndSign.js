import { attachScreenshot } from '../1TRAZiT-Commons/actionsHelper.js';
import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config.js';
import { handleActionNameInteraction } from '../1TRAZiT-Commons/actionsNameInteractions';

export const handleAuditAndSign = async (page, Button, test, testInfo) => {
    if (!Button?.sign) {
        return;
    }

    try {
        // Ajuste del tamaño del diálogo para mejor visibilidad
        await page.evaluate(() => {
            const element = document.querySelector('.mdc-dialog__surface');
            if (element) {
                element.style.transform = 'scale(0.9)';
                element.style.marginTop = '10px';
            }
        });

        await test.step(Button.phraseSearchElement, async () => {
            let locator = Button.sign.locator.startsWith('#tooltip-') ? Button.sign.locator : `#tooltip-${Button.sign.locator}`;
            
            // Modificado para manejar múltiples elementos
            let elements = page.locator(locator).filter({ hasText: Button.sign.text });
            
            await test.step(Button.phraseElementVisible, async () => {
                const count = await elements.count();
                console.log(`Se encontraron ${count} elementos coincidentes`);

                if (count === 0) {
                    // Intenta sin guión si no se encuentran elementos
                    locator = locator.replace('#tooltip-', '#tooltip');
                    elements = page.locator(locator).filter({ hasText: Button.sign.text });
                    console.log(`Reintentando con locator modificado: ${locator}`);
                }
            });

            // Captura de pantalla antes de cualquier interacción
            await test.step(Button.phraseScreenShots, async () => {
                await attachScreenshot(testInfo, Button.screenShotsButton, page, ConfigSettingsAlternative.screenShotsContentType);
                if (Button.phrasePauses) {
                    await page.pause();
                }
            });

            await test.step(Button.phraseElementVisible, async () => {
                const count = await elements.count();
                if (count === 0) {
                    throw new Error(`No se encontraron elementos con el locator ${locator} y texto "${Button.sign.text}"`);
                }

                // Buscar el primer elemento visible
                let elementoObjetivo = null;
                let indiceObjetivo = -1;

                for (let i = 0; i < count; i++) {
                    const element = elements.nth(i);
                    const isVisible = await element.isVisible();
                    if (isVisible) {
                        // Asegurar que el elemento esté en el viewport
                        await element.scrollIntoViewIfNeeded();
                        elementoObjetivo = element;
                        indiceObjetivo = i;
                        break;
                    }
                }

                if (elementoObjetivo === null) {
                    throw new Error('No se encontraron elementos visibles que coincidan con los criterios');
                }

                console.log(`Seleccionado elemento en el índice ${indiceObjetivo}`);

                await test.step(Button.phraseScreenShots, async () => {
                    await attachScreenshot(testInfo, Button.screenShotsVisibleElement, page, ConfigSettingsAlternative.screenShotsContentType);
                    if (Button.phrasePauses) {
                        await page.pause();
                    }
                });

                // Hacer clic en el elemento seleccionado
                await test.step(Button.phraseClickOnButton, async () => {
                    await elementoObjetivo.click({ timeout: 30000 });
                });

                await test.step(Button.phraseScreenShots, async () => {
                    await attachScreenshot(testInfo, Button.screenShotsSign, page, ConfigSettingsAlternative.screenShotsContentType);
                    if (Button.phrasePauses) {
                        await page.pause();
                    }
                });
            });
        });
    } catch (err) {
        console.error("HandleAuditAndSign:", err);

        // Plan B: búsqueda por texto simple
        try {
            console.log("Intentando encontrar el elemento solo por contenido de texto...");
            const elements = page.getByText(Button.sign.text, { exact: true });
            const count = await elements.count();

            if (count > 0) {
                // Hacer clic en la primera instancia visible
                for (let i = 0; i < count; i++) {
                    const element = elements.nth(i);
                    if (await element.isVisible()) {
                        await element.click({ timeout: 30000 });
                        return;
                    }
                }
            }
            throw new Error(`No se encontraron elementos visibles con el texto "${Button.sign.text}"`);
        } catch (fallbackError) {
            console.log("El intento alternativo falló:", fallbackError);
            throw fallbackError;
        }
    }
};