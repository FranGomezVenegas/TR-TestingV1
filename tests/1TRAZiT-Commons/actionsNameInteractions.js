import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config.js';
import { attachScreenshot } from '../1TRAZiT-Commons/actionsHelper.js';

const timeout = 3000;

export const handleActionNameInteraction = async (page, testInfo, Button) => {
    if (!Button?.buttonName) {
        console.warn("Button.buttonName no está definido, se omite la interacción.");
        return;
    }

    // Almaceno los mensajes de consola y errores del sistema
    const consoleMessages = [];
    const systemErrors = {
        pageErrors: [],
        networkErrors: [],
        responseErrors: [],
        dialogErrors: [],
        workerErrors: [],
    };

    // Configuro los manejadores de eventos para registrar mensajes y errores
    const handleConsoleMessage = (msg) => {
        console.log(`[${new Date().toISOString()}] Console ${msg.type()}:`, msg.text());
        consoleMessages.push({
            type: msg.type(),
            text: msg.text(),
            location: msg.location(),
            timestamp: new Date().toISOString(),
            args: msg.args().map(arg => arg.toString()),
        });
    };

    const handlePageError = (error) => {
        console.error(`[Page Error] ${error.message}`);
        systemErrors.pageErrors.push({ message: error.message, stack: error.stack, timestamp: new Date().toISOString() });
    };

    const handleRequestFailed = (request) => {
        console.error(`[Network Error] ${request.failure()?.errorText || 'Unknown error'} - ${request.url()}`);
        systemErrors.networkErrors.push({
            url: request.url(),
            method: request.method(),
            failure: request.failure()?.errorText || 'Unknown error',
            timestamp: new Date().toISOString(),
        });
    };

    const handleResponse = async (response) => {
        if (!response.ok()) {
            const errorEntry = {
                url: response.url(),
                status: response.status(),
                statusText: response.statusText(),
                timestamp: new Date().toISOString(),
            };
            try {
                errorEntry.body = await response.text();
            } catch {
                errorEntry.body = 'No se pudo obtener el cuerpo de la respuesta';
            }
            console.error(`[Response Error] ${response.status()} - ${response.url()}`);
            systemErrors.responseErrors.push(errorEntry);
        }
    };

    const handleWorkerError = (worker) => {
        console.error(`[Worker Error] Worker at ${worker.url()} encountered an error.`);
        systemErrors.workerErrors.push({ url: worker.url(), timestamp: new Date().toISOString() });
    };

    const handleDialog = async (dialog) => {
        console.error(`Se detectó un alert con el mensaje: "${dialog.message()}"`);
        await dialog.dismiss();
        throw new Error(`El test falló debido a un alert con el mensaje: "${dialog.message()}"`);
    };

    try {
        // Agrego los manejadores de eventos
        page.on('console', handleConsoleMessage);
        page.on('pageerror', handlePageError);
        page.on('requestfailed', handleRequestFailed);
        page.on('response', handleResponse);
        page.on('worker', handleWorkerError);
        page.on('dialog', handleDialog);

        await page.waitForTimeout(3000);

        // Verifico si el botón de acciones (UP/DOWN) está presente
        if (Button?.arrowDirection) {
            const arrowSymbol = Button.arrowDirection.toUpperCase() === 'UP' ? '▲' : '▼'; // Mapeo de "UP"(arriba) y "DOWN"(abajo)
            const position = Button.positionArrow || 0;  

            await test.step(`Hacer clic en botón de dirección ${arrowSymbol}`, async () => {
                try {
                    // Intentamos hacer clic en el botón correspondiente (UP o DOWN) en función de su dirección
                    await page.getByRole('button', { name: arrowSymbol }).nth(position).click({ timeout: 3000 });
                    console.log(`Clic en ${arrowSymbol} correctamente.`);
                    // Después de hacer clic, tomamos la captura de pantalla si es necesario
                    if (Button?.screenShotsArrow) {
                        await test.step(`Captura de pantalla después de hacer clic en ${arrowSymbol}`, async () => {
                            await attachScreenshot(testInfo, Button.screenShotsArrow, page, ConfigSettingsAlternative.screenShotsContentType);
                        });
                    }
                } catch (error) {
                    console.error(`Error al hacer clic en ${arrowSymbol}: ${error.message}`);
                }
            });
        }
        
        // await handleSelectAction(page, testInfo, Button);
        // Si hay un elemento para seleccionar, intento hacer clic en él
        if (Button.selectName) {
            await test.step(Button.phraseSelect, async () => {
                const position = Button.positionSelectElement ?? 0;
                try {
                    await page.getByText(Button.selectName, { exact: true }).nth(position).click({ timeout: 3000 });
                } catch (exactClickError) {
                    console.log(`Error en clic exacto: ${exactClickError.message}`);
                    await page.getByText(Button.selectName).nth(position).click({ timeout: 3000 });
                }
            });

            if (Button.screenShotsSelect) {
                await attachScreenshot(testInfo, Button.screenShotsSelect, page, ConfigSettingsAlternative.screenShotsContentType);
            }
        }

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
                throw new Error(`No se pudo hacer clic en ningún elemento con ID: ${Button.buttonName}`);
            }
        });

        // Si hay un botón de acciones ocultas, intento hacer clic en él antes de hacer clic en el botón principal
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
