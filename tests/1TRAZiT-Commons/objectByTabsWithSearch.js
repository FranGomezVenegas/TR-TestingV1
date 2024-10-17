import { test, expect } from '@playwright/test';
import { clickElement, attachScreenshot, fillField } from '../1TRAZiT-Commons/actionsHelper.js';

// Función para manejar la interacción con los objectByTabs que tienen un search en la parte izquierda, para filtrar.

export async function handleObjectByTabsWithSearchInteraction(page, testInfo, configSettings, button) {
    if (button.search) {
        console.log('Found the Search...'); 
        await test.step(button.phraseClickSearch, async () => {
            await clickElement(page, button.search.label); 
            console.log('Clicked on Search...'); 

        });
        
        await test.step(button.phrasePauses, async () => {
            await page.pause();
        });
        await test.step(button.phraseFillField, async () => { 
            await fillField(page, button.search.label, button.search.value);
            console.log('Writing in the Search...'); 
        })
        
        
        await test.step(button.phrasePauses, async () => {
            await page.pause();
        });

        await test.step(button.phraseSearch, async () => {
            await page.getByRole('button', { name: button.search.press }).click();
        });

        await test.step(button.phrasePauses, async () => {
            await page.pause();
            await page.pause();
            await page.pause();
            await page.pause();
            await test.step('Wait 3 seconds for the page to load completely.', async () => {
                await page.waitForTimeout(3000); 
            }); 
        });

        await test.step(button.phraseScreenShots, async () => {
            await attachScreenshot(testInfo, button.screenShotSearch, page, configSettings.screenShotsContentType);
        });

        
    }
}