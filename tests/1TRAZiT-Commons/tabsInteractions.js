import { test, expect } from '@playwright/test';
import { clickElement, attachScreenshot } from '../1TRAZiT-Commons/actionsHelper.js';

// Función para manejar la interacción con las pestañas
export async function handleTabInteraction(page, testInfo, configSettings, button) {
    if (button.tab) {
        await test.step(button.phraseTab, async () => {
            await clickElement(page, button.tab);
            console.log('Clicked on Tab'); 
        });
        
        await test.step(button.phrasePauses, async () => {
            await page.pause();
        });
        
        await test.step(button.phraseScreenShots, async () => {
            await attachScreenshot(testInfo, button.screenShotTab, page, configSettings.screenShotsContentType);
        });
    }
}

