import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config.js';

// Función para manejar la interacción (selección + botón) para el componente de las tablas de dragDropBoxes.
export const handleRowActionsInteraction = async (page, button, testInfo) => {
    // Verifico si rowName está definido
    if (!button.rowName) {
        return false; 
    }

    try {
        await test.step(`Click on button with ID "${button.buttonName}" in row "${button.rowName}"`, async () => {
            // Selecciono la fila por su nombre y luego hago clic en el botón por ID
            await page.getByRole('row', { name: button.rowName }).locator(`#${button.buttonName}`).dblclick({ timeout: 5000 });
        });
        
        await test.step(button.phraseScreenShots, async () => {
            await testInfo.attach(button.screenShotRowNameAndButtonName, {
                body: await page.screenshot(),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
        });

        await test.step(button.phrasePauses, async () => {
            await page.pause();
        });

        return true; 
    } catch (error) {
        console.log("Error in handleRowActionsInteraction:", error);
        return false; 
    }
};
