import { attachScreenshot } from '../1TRAZiT-Commons/actionsHelper.js';
import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config.js';
import { handleActionNameInteraction } from '../1TRAZiT-Commons/actionsNameInteractions';

export const handleAuditAndSign = async (page, Button, test, testInfo) => {
    if (!Button?.sign) {
        return;
    }

    try {
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
                if (!(await element.isVisible())) {
                    await element.scrollIntoViewIfNeeded({ timeout: 30000 });

                    await test.step(Button.phrasePauses, async () => {
                        await page.waitForTimeout(500);
                        await page.pause();
                    });

                    await test.step(Button.phraseAdditionalScroll, async () => {
                        await page.evaluate(() => {
                            window.scrollBy(0, 30);
                        });
                    });

                    await test.step(Button.phraseScreenShots, async () => {
                        await attachScreenshot(testInfo, Button.screenShotsVisibleElement, page, ConfigSettingsAlternative.screenShotsContentType);
                        if (Button.phrasePauses) {
                            await page.pause();
                        }
                    });
                }
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
            throw fallbackError; // Lanzar el error si también falla el intento con getByText
        }
    }
};
