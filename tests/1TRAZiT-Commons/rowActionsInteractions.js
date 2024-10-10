import { test, expect } from '@playwright/test';

// Función para manejar la interacción (selección + botón) para el componente de las tablas de dragDropBoxes.
export const handleRowActionsInteraction = async (page, button, testInfo) => {
    // Verifico si rowName está definido
    if (!button.rowName) {
        return false; // Devuelvo false si rowName no está definido
    }

    try {
        await test.step(`Click on button with ID "${button.buttonName}" in row "${button.rowName}"`, async () => {
            // Selecciono la fila por su nombre y luego hago clic en el botón por ID
            await page.getByRole('row', { name: button.rowName }).locator(`#${button.buttonName}`).click({ timeout: 30000 });
        });
        
        await test.step(button.phraseScreenShots, async () => {
            //await attachScreenshot(testInfo, button.screenShotRowNameAndButtonName, page, button.screenShotsContentType);
            await testInfo.attach(button.screenShotRowNameAndButtonName, {
                body: await page.screenshot(),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
        });

        await test.step(button.phrasePauses, async () => {
            await page.pause();
        });

        return false; // Devuelvo true si se completó con éxito
    } catch (error) {
        console.error("Error in handleDragDropBoxesInteraction:", error);
        return true; // Devuelvo false si ocurrió un error
    }
};
