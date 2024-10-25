import { attachScreenshot } from '../1TRAZiT-Commons/actionsHelper.js';
import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config.js';
import { handleActionNameInteraction } from '../1TRAZiT-Commons/actionsNameInteractions';

export const handleAuditAndSign = async (page, Button, test, testInfo) => {
    if (!Button?.sign) {
        return;
    }

    try {
        // Audit más pequeños para que el botón de aceptar no se vea como invisible y se pueda cerrar.
        await page.evaluate(() => {
            const element = document.querySelector('.mdc-dialog__surface');
            if (element) {
                element.style.transform = 'scale(0.9)';
                element.style.marginTop = '10px';
            }
        });

        await test.step(Button.phraseSearchElement, async () => {
            let locator = Button.sign.locator.startsWith('#tooltip-') ? Button.sign.locator : `#tooltip-${Button.sign.locator}`;
            let element = page.locator(locator).getByText(Button.sign.text);

            await test.step(Button.phraseElementVisible, async () => {
                const isVisible = await element.isVisible();
                if (!isVisible) {
                    console.log(`El elemento con ${locator} no es visible. Intentando sin guion.`);

                    // Intentar con el mismo locator pero sin el guion
                    locator = locator.replace('#tooltip-', '#tooltip');
                    element = page.locator(locator).getByText(Button.sign.text);

                    if (!(await element.isVisible())) {
                        console.log(`El elemento no es visible con ${locator}.`);
                    } else {
                        console.log('El elemento es visible sin guion.');
                    }
                } else {
                    console.log('El elemento es visible con guion.');
                }
            });

            await test.step(Button.phraseScreenShots, async () => {
                await attachScreenshot(testInfo, Button.screenShotsButton, page, ConfigSettingsAlternative.screenShotsContentType);
                if (Button.phrasePauses) {
                    await page.pause();
                }
            });

            await test.step(Button.phraseElementVisible, async () => {
                // Forzar scroll hasta que el elemento sea visible
                let isVisible = await element.isVisible();
                const scrollIncrement = 30; // Incremento de desplazamiento
                const maxScrollAttempts = 10; // Número máximo de intentos de desplazamiento
                let attempts = 0;

                while (!isVisible && attempts < maxScrollAttempts) {
                    await page.evaluate((increment) => {
                        window.scrollBy(0, increment);
                    }, scrollIncrement);
                    await page.waitForTimeout(300); 
                    // Verifico la visibilidad del elemento después de hacer scroll
                    isVisible = await element.isVisible();
                    attempts++;
                }

                if (!isVisible) {
                    console.log('El elemento sigue sin ser visible tras varios intentos de scroll.');
                } else {
                    console.log('El elemento es visible tras el scroll.');
                }

                await test.step(Button.phraseScreenShots, async () => {
                    await attachScreenshot(testInfo, Button.screenShotsVisibleElement, page, ConfigSettingsAlternative.screenShotsContentType);
                    if (Button.phrasePauses) {
                        await page.pause();
                    }
                });
            });

            await test.step(Button.phraseClickOnButton, async () => {
                await element.click({ timeout: 30000 });
            });

            await test.step(Button.phraseScreenShots, async () => {
                await attachScreenshot(testInfo, Button.screenShotsSign, page, ConfigSettingsAlternative.screenShotsContentType);
                if (Button.phrasePauses) {
                    await page.pause();
                }
            });
        });
    } catch (err) {
        // console.error("Error en handleAuditAndSign:", err);

        // En caso de que el primer intento falle, intentar solo con getByText
        try {
            console.log("Intentando con getByText directamente...");
            const element = await page.getByText(Button.sign.text);

            // Asegurarse de que el elemento sea visible antes de hacer clic
            if (await element.isVisible()) {
                await element.click({ timeout: 30000 });
            } else {
                console.log("El elemento no es visible al intentar con getByText.");
            }
        } catch (fallbackError) {
            console.log("Error al intentar con getByText:", fallbackError);
            throw fallbackError; // Lanzo el error si también falla el intento con getByText
        }
    }
};
