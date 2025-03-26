export const consoleMessages = [];
export const systemErrors = {
    pageErrors: [],
    networkErrors: [],
    responseErrors: [],
    dialogErrors: [],
    workerErrors: [],
};

export const handleConsoleMessage = (msg) => {
    console.log(`[${new Date().toISOString()}] Console ${msg.type()}:`, msg.text());
    consoleMessages.push({
        type: msg.type(),
        text: msg.text(),
        location: msg.location(),
        timestamp: new Date().toISOString(),
        args: msg.args().map(arg => arg.toString()),
    });
};

export const handlePageError = (error) => {
    console.error(`[Page Error] ${error.message}`);
    systemErrors.pageErrors.push({ message: error.message, stack: error.stack, timestamp: new Date().toISOString() });
};

export const handleRequestFailed = (request) => {
    console.error(`[Network Error] ${request.failure()?.errorText || 'Unknown error'} - ${request.url()}`);
    systemErrors.networkErrors.push({
        url: request.url(),
        method: request.method(),
        failure: request.failure()?.errorText || 'Unknown error',
        timestamp: new Date().toISOString(),
    });
};

export const handleResponse = async (response) => {
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

export const handleWorkerError = (worker) => {
    console.error(`[Worker Error] Worker at ${worker.url()} encountered an error.`);
    systemErrors.workerErrors.push({ url: worker.url(), timestamp: new Date().toISOString() });
};

export const handleDialog = async (dialog) => {
    console.error(`Se detectó un alert con el mensaje: "${dialog.message()}"`);
    await dialog.dismiss();
    throw new Error(`El test falló debido a un alert con el mensaje: "${dialog.message()}"`);
};

export const addEventListeners = (page) => {
    page.on('console', handleConsoleMessage);
    page.on('pageerror', handlePageError);
    page.on('requestfailed', handleRequestFailed);
    page.on('response', handleResponse);
    page.on('worker', handleWorkerError);
    page.on('dialog', handleDialog);
};

export const removeEventListeners = (page) => {
    page.removeListener('console', handleConsoleMessage);
    page.removeListener('pageerror', handlePageError);
    page.removeListener('requestfailed', handleRequestFailed);
    page.removeListener('response', handleResponse);
    page.removeListener('worker', handleWorkerError);
    page.removeListener('dialog', handleDialog);
};