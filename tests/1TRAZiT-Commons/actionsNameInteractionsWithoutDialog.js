import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config.js';
import { attachScreenshot } from '../1TRAZiT-Commons/actionsHelper.js';
import { handleSelectAction } from './utils/selectElement/handleSelectAction.js';
import { handleArrowDirectionAction } from './utils/sorter/handleArrowDirectionAction.js';
import { consoleMessages, handleConsoleMessage, handlePageError, handleRequestFailed, handleResponse, handleWorkerError, handleDialog, systemErrors } from './utils/alertsAndErrors.js/errorHandlers.js';

const timeout = 3000;

export const handleActionNameInteraction = async (page, testInfo, Button) => {
    if (!Button?.buttonName) {
        console.warn("Button.buttonName no está definido, se omite la interacción.");
        return;
    }

    try {
        // Agrego los manejadores de eventos
        page.on('console', handleConsoleMessage);
        page.on('pageerror', handlePageError);
        page.on('requestfailed', handleRequestFailed);
        page.on('response', handleResponse);
        page.on('worker', handleWorkerError);
        page.on('dialog', handleDialog);

        await page.waitForTimeout(3000);

        // Sorter
        await handleArrowDirectionAction(page, testInfo, Button);
        
        // Llamo a la función para seleccionar un elemento si 
        await handleSelectAction(page, testInfo, Button);
        
        // Intento hacer clic en el botón principal
        await test.step(Button.phraseButtonName, async () => {
            const selectorBoton = `#${Button.buttonName}`;
            const elementos = page.locator(selectorBoton);
            const cantidad = await elementos.count();
            console.log(`Encontrados ${cantidad} elementos con el ID ${Button.buttonName}`);

            if (cantidad > 0) {
                const indice = Button.positionButton || 0;
                if (indice >= cantidad) {
                    throw new Error(`Índice ${indice} fuera de rango. Solo hay ${cantidad} elementos disponibles.`);
                }
                // await page.waitForTimeout(8000);
                // await elementos.nth(indice).waitFor({ state: 'visible', timeout });

                try {
                    await elementos.nth(indice).click({ timeout });
                    console.log(`Clic correctamente nth(${indice})`);
                } catch (clickError) {
                    console.log(`Error en clic directo: ${clickError.message}`);
                    // await page.evaluate((selector, index) => {
                    //     const elementos = document.querySelectorAll(selector);
                    //     if (elementos[index]) {
                    //         elementos[index].click({ timeout: 3000 });
                    //     }
                    // }, selectorBoton, indice);
                    // onsole.log(`Clic correctamente`);
                }
            } else {
                // throw new Error(`No se pudo hacer clic en ningún elemento con ID: ${Button.buttonName}`);
            }
        });

        // // Si hay un botón de acciones ocultas, intento hacer clic en él antes de hacer clic en el botón principal
        if (Button.hideActionsButton) {
            await test.step('Click en botón de más opciones', async () => {
                try {
                    const position = Button.hideActionsButton.position ?? 0;
                    await page.locator(Button.hideActionsButton.locator).nth(position).click({ force: true, timeout: 1000 });

                    // Intento nuevamente hacer clic en el botón principal después de mostrar más opciones
                    await test.step(Button.phraseButtonName, async () => {
                        const selectorBoton = `#${Button.buttonName}`;
                        const elementos = page.locator(selectorBoton);
                        const cantidad = await elementos.count();

                        if (cantidad === 0) throw new Error(`No se encontró el botón con ID: ${Button.buttonName}`);
                        await elementos.nth(Button.positionButton || 0).click({ timeout });
                    });
                } catch (error) {
                    console.log('No fue necesario hacer clic en "más opciones":', error.message);
                }
            });
        }

        // Si se especifica una captura de pantalla, la tomo
        if (Button.screenShotsButtonName) {
            await test.step(Button.phraseScreenShots, async () => {
                await attachScreenshot(testInfo, Button.screenShotsButtonName, page, ConfigSettingsAlternative.screenShotsContentType);
            });
            if (Button.phrasePauses) {
                await test.step(Button.phrasePauses, async () => {
                    await page.pause();
                });
            }
        }
        

    } catch (error) {
        console.error("Error en handleActionNameInteraction:", error);
        throw error;
    } finally {
        // Elimino los manejadores de eventos y adjunto errores al reporte del test
        page.removeAllListeners();
        page.off('dialog', handleDialog);

        testInfo.attachments.push({
            name: 'console-messages.json',
            contentType: 'application/json',
            body: Buffer.from(JSON.stringify({ consoleMessages, systemErrors }, null, 2)),
        });

        if (systemErrors.pageErrors.length > 0 || systemErrors.networkErrors.length > 0 || systemErrors.responseErrors.length > 0) {
            throw new Error('Errores detectados durante la ejecución del test.');
        }
    }
};
