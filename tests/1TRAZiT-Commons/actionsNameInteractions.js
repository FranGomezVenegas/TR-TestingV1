import { test, expect } from '@playwright/test';

import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config.js';

import { clickButtonById, clickElementByText, attachScreenshot } from '../1TRAZiT-Commons/actionsHelper.js';

export const handleActionNameInteraction = async (page, testInfo, Button) => {
    // Sino salgo de la función
    if (!Button.buttonName) {
        return;
    }

    try {
        // Paso 1: Hago clic en el elemento solo si selectName está definido
        if (Button.selectName) {
            await test.step(Button.phraseSelect, async () => {
                await clickElementByText(page, Button.selectName);
            });
        }

        // Paso 2: Pauso la ejecución
        await test.step(Button.phrasePauses, async () => {
            await page.pause();
        });

        if (Button.screenShotsSelect) {
            // Paso 3: Captura de pantalla
            await test.step(Button.phraseScreenShots, async () => {
            await attachScreenshot(testInfo, Button.screenShotsSelect, page, ConfigSettingsAlternative.screenShotsContentType);
            // Sub-paso: Pauso después de la captura de pantalla
            await test.step(Button.phrasePauses, async () => {
                await page.pause();
            });
        });
        }
        
        // Paso 4: Hago clic en el botón
        await test.step(Button.phraseButtonName, async () => {
            await clickButtonById(page, Button.buttonName);
        });

        // Paso 5: Captura de pantalla
        await test.step(Button.phraseScreenShots, async () => {
            await attachScreenshot(testInfo, Button.screenShotsButtonName, page, ConfigSettingsAlternative.screenShotsContentType);
            // Sub-paso: Pauso después de la captura de pantalla
            await test.step(Button.phrasePauses, async () => {
                await page.pause();
            });
        });

    } catch (error) {
        // Si ocurre algún error, lo muestro en la consola
        console.error("Error en actionNames:", error);
        throw error; // Lanzo el error para que sea gestionado en otro sitio si es necesario
    }
};
