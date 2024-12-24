import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config.js';
import { attachScreenshot } from '../1TRAZiT-Commons/actionsHelper.js';

const timeout = 5000;

export const handleActionNameInteraction = async (page, testInfo, Button) => {
    if (!Button?.buttonName) {
        console.warn("Button.buttonName no está definido, se omite la interacción.");
        return;
    }

    // Estructura para almacenar todos los mensajes de consola y errores del sistema
    const consoleMessages = [];
    const systemErrors = {
        pageErrors: [],
        networkErrors: [],
        responseErrors: [],
        dialogErrors: [],
        workerErrors: [],
    };

    // Manejadores para capturar mensajes y errores
    const handleConsoleMessage = (msg) => {
        const logEntry = {
            type: msg.type(),
            text: msg.text(),
            location: msg.location(),
            timestamp: new Date().toISOString(),
            args: msg.args().map(arg => arg.toString()),
        };

        console.log(`[${logEntry.timestamp}] Console ${logEntry.type}:`, logEntry.text);
        consoleMessages.push(logEntry); // Almacenar todos los mensajes de consola
    };

    const handlePageError = (error) => {
        systemErrors.pageErrors.push({
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
        });
        console.error(`[Page Error] ${error.message}`);
    };

    const handleRequestFailed = (request) => {
        systemErrors.networkErrors.push({
            url: request.url(),
            method: request.method(),
            failure: request.failure()?.errorText || 'Unknown error',
            timestamp: new Date().toISOString(),
        });
        console.error(`[Network Error] ${request.failure()?.errorText || 'Unknown error'} - ${request.url()}`);
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
                errorEntry.body = 'Unable to fetch response body';
            }
            systemErrors.responseErrors.push(errorEntry);
            console.error(`[Response Error] ${response.status()} - ${response.url()}`);
        }
    };

    const handleWorkerError = (worker) => {
        systemErrors.workerErrors.push({
            url: worker.url(),
            timestamp: new Date().toISOString(),
        });
        console.error(`[Worker Error] Worker at ${worker.url()} encountered an error.`);
    };

    // Definir el manejador de diálogos aquí, fuera del bloque try
    const handleDialog = async (dialog) => {
        console.error(`Se detectó un alert con el mensaje: "${dialog.message()}"`);
        await dialog.dismiss(); // Cierro el alert. 
        throw new Error(`El test falló debido a un alert con el mensaje: "${dialog.message()}"`);
    };

    try {
        // Configurar listeners
        page.on('console', handleConsoleMessage);
        page.on('pageerror', handlePageError);
        page.on('requestfailed', handleRequestFailed);
        page.on('response', handleResponse);
        page.on('worker', handleWorkerError);

        // Interactuar con el select si está definido
        if (Button.selectName) {
            await test.step(Button.phraseSelect, async () => {
                const position = Button.positionSelectElement ?? 0;
                await page.getByText(Button.selectName).nth(position).click({ timeout });
            });

            if (Button.screenShotsSelect) {
                await attachScreenshot(testInfo, Button.screenShotsSelect, page, ConfigSettingsAlternative.screenShotsContentType);
            }
            await test.step('Pauses', async () => {
                await page.pause();
                await page.pause();
                await page.pause();
            });
        }

        // Configuro el listener 'dialog' justo antes del clic
        page.on('dialog', handleDialog);

        // Clic en el botón
        await test.step(Button.phraseButtonName, async () => {
            const selectorBoton = `#${Button.buttonName}`;
            const elementos = page.locator(selectorBoton);
            const cantidad = await elementos.count();
            await page.waitForTimeout(2000);

            if (cantidad === 0) throw new Error(`No se encontró el botón con ID: ${Button.buttonName}`);
            await elementos.nth(Button.positionButton || 0).click({ timeout });
        });

        if (Button.screenShotsButtonName) {
            await attachScreenshot(testInfo, Button.screenShotsButtonName, page, ConfigSettingsAlternative.screenShotsContentType);
        }
    } catch (error) {
        console.error("Error en handleActionNameInteraction:", error);
        throw error;
    } finally {
        // Remover listeners y adjuntar errores al test
        page.removeAllListeners();
        page.off('dialog', handleDialog);

        // Adjuntar los errores y mensajes al reporte del test
        testInfo.attachments.push({
            name: 'console-messages.json',
            contentType: 'application/json',
            body: Buffer.from(JSON.stringify({ consoleMessages, systemErrors }, null, 2)),
        });

        // Lanzar un error si se detectaron problemas críticos
        if (
            systemErrors.pageErrors.length > 0 ||
            systemErrors.networkErrors.length > 0 ||
            systemErrors.responseErrors.length > 0
        ) {
            throw new Error('Errores detectados durante la ejecución del test.');
        }
    }
};
