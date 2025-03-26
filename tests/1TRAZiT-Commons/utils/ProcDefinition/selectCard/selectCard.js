import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../../../../trazit-config.js';
import { attachScreenshot } from '../../../actionsHelper.js';

export const handleSelectCard = async (page, testInfo, Button) => {
    if (!Button?.selectCard) {
        return;
    }

    try {
        await test.step('Select Card Interaction by Text', async () => {
            // Defino el locator del texto del botón
            const cardTextLocator = await page.locator(`text=${Button.selectCard}`).first();
            const labelTextLocator = await page.getByText(Button.labelCard, { exact: true });
            
            // Verifico si los elementos existen antes de interactuar
            if (await cardTextLocator.count() === 0) {
                throw new Error(`No se encontró el texto: ${Button.selectCard}`);
            }
            
            
            // Desplazo y clic en la card
            await cardTextLocator.scrollIntoViewIfNeeded();
            if (Button.phrasePauses) {
                await page.pause();
                await page.waitForTimeout(1000);
            }
            await cardTextLocator.click({ timeout: 3000 });
            
            if (Button.phrasePauses) {
                await page.pause();
                await page.pause();
                // await page.waitForTimeout(1000);
            }
            if (await labelTextLocator.count() === 0) {
                throw new Error(`No se encontró el label: ${Button.labelCard}`);
            }

            // Clic en el label
            await labelTextLocator.scrollIntoViewIfNeeded();
            await labelTextLocator.click({ timeout: 3000 });
            
            // Captura de pantalla si es necesario
            if (Button.screenShotsCard) {
                await attachScreenshot(testInfo, Button.screenShotsCard, page, ConfigSettingsAlternative.screenShotsContentType);
            }
        });
    } catch (error) {
        console.error("Error en handleSelectCard:", error);
        throw error;
    }
};
