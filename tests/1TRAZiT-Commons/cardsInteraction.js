import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config.js';
import { attachScreenshot } from './actionsHelper.js';

export const handleCardsInteraction = async (page, testInfo, Button) => {
    if (!Button?.card) {
        return;
    }
    
    const handleDialog = async (dialog) => {
        console.error(`Se detectó un alert con el mensaje: "${dialog.message()}"`);
        await dialog.dismiss(); // Cierro el alert.
        throw new Error(`El test falló debido a un alert con el mensaje: "${dialog.message()}"`);
    };

    try {
        page.on('dialog', handleDialog);

        await test.step(Button.phraseButtonName, async () => {
            // const elementLocator = page.locator(Button.card.cardName).locator(`#${Button.card.buttonName}`);
            const elementLocator = page.locator(`#${Button.card.cardName}`).locator(`#${Button.card.buttonName}`);
            
            // Intentar hacer scroll al elemento antes de hacer clic
            await elementLocator.scrollIntoViewIfNeeded();
            await elementLocator.click({timeout: 5000});
        });

        if (Button.phrasePauses) {
            await page.pause();
            await page.pause();
        }

        if (Button.screenShotsButtonName) {
            await attachScreenshot(testInfo, Button.screenShotsButtonName, page, ConfigSettingsAlternative.screenShotsContentType);
            if (Button.phrasePauses) {
                await page.pause();
            }
        }
    } catch (error) {
        throw new Error(`No se pudo hacer clic en ningún elemento con ID: ${Button.card.buttonName}`);
    } finally {
        // Quito el listener para evitar capturar diálogos no deseados después del clic
        page.off('dialog', handleDialog);
    }
};
