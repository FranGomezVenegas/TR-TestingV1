import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config.js';
import { attachScreenshot } from '../1TRAZiT-Commons/actionsHelper.js';

const timeout = 40000;

export const handleSelectCard = async (page, testInfo, Button) => {
    if (!Button?.selectCard) {
        return;
    }

    try {
        // Lógica para 'selectCard' para el ProcsDefinition
        if (Button.selectCard) {
            await test.step('Select Card Interaction', async () => {
                // Me aseguro de que el selector esté bien formado
                let cardLocator = Button.selectCard;
        
                // Añado '#' al principio si no está presente
                if (!cardLocator.startsWith('#')) {
                    cardLocator = `#${cardLocator}`;
                }
        
                // Añado '>' y '.procCard' si no están presentes
                if (!cardLocator.includes('>')) {
                    cardLocator = `${cardLocator} > .procCard`;
                } else if (!cardLocator.endsWith('.procCard')) {
                    cardLocator = `${cardLocator} .procCard`;
                }
        
                // Defino el locator usando el selector ya corregido
                const cardLocatorElement = page.locator(cardLocator);
                const labelLocator = page.getByText(Button.labelCard, { exact: true });
        
                // Desplazo y clic en la card
                await cardLocatorElement.scrollIntoViewIfNeeded();
                if (Button.phrasePauses) {
                    await page.pause();
                    await page.pause();
                    await page.waitForTimeout(2000);
                }
                await cardLocatorElement.click({ timeout: 3000 });
        
                // Clic en el label
                await labelLocator.scrollIntoViewIfNeeded();
                await labelLocator.click({ timeout: 3000 });
        
                // Pausa si es necesario
                if (Button.phrasePauses) {
                    await page.pause();
                }
        
                // Captura de pantalla si es necesario
                if (Button.screenShotsCard) {
                    await attachScreenshot(testInfo, Button.screenShotsCard, page, ConfigSettingsAlternative.screenShotsContentType);
                }
            });
        } else{
            return
        }
    } catch (error) {
        console.error("Error en handleSelectCard:", error);
        throw error;
    }
};