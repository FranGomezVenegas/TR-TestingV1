const { chromium } = require('playwright');
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { getTestConfigSettings } from './ApiCalls';
import { test } from '@playwright/test';

export class LogIntoPlatform {
    constructor(page) {
        //this.page = page;
    }

    // añade las credenciales y llama a la primera api getTestConfigSetting
    async commonBeforeEach(page, testInfo, testDataGame, trazitTestName, procInstanceName) {
        try {
            console.log('Starting API call with params:', { testInfo, testDataGame, trazitTestName, procInstanceName });
            
            // Realiza la llamada a la API
            const ConfigSettings = await getTestConfigSettings({}, testInfo.status, testInfo, testDataGame, trazitTestName, procInstanceName);

            // Verifica si los datos de configuración fueron obtenidos correctamente
            if (!ConfigSettings || !ConfigSettings.platformUrl || !ConfigSettings.login) {
                throw new Error('Configuration settings are invalid or not found');
            }
            
            console.log('ConfigSettings received:', ConfigSettings);

            // Pausa la ejecución del test
            await test.step('Pause the test execution', async () => {
                await page.pause();
            });

            // Accede a la plataforma
            await test.step('Access to the TRAZiT platform', async () => {
                await page.goto(ConfigSettings.platformUrl);
            });

            // Realiza login
            await test.step('Login in the platform', async () => {
                await test.step('Click and add the user', async () => {
                    await this.withTimeout(page.getByLabel(ConfigSettings.login.fldUser.label).fill(ConfigSettingsAlternative.login.fldUser.value), 5000);
                    // await page.locator('input[type="text"]').click({timeout: 5000});
                    // await page.locator('input[type="text"]').fill(ConfigSettingsAlternative.login.fldUser.value);
                    await page.getByLabel(ConfigSettings.login.fldUser.label).fill(ConfigSettingsAlternative.login.fldUser.value);
                });

                await test.step('Click and add the password', async () => {
                    // await page.locator('input[type="password"]').click();
                    // await page.locator('input[type="password"]').fill("trazit");
                    await page.getByLabel(ConfigSettings.login.fldPss.label).fill(ConfigSettingsAlternative.login.fldPss.value);
                });

                await test.step('Enter the Platform', async () => {
                    // await page.locator('#access span').first().click();
                    await page.getByLabel(ConfigSettings.login.fldPss.label).press(ConfigSettings.login.fldPss.actionName);
                });
            });

            // Pausa para esperar el procesamiento
            await test.step('Pause the test execution', async () => {
                await page.pause();
            });

            // Espera 3 segundos para la carga completa
            await test.step('Wait 1 second for the page to load completely.', async () => {
                await page.waitForTimeout(1000);
            });

            // Adjunta la captura de pantalla después del login
            await test.step('Credentials just entered', async () => {
                await testInfo.attach('Access', {
                    body: await page.screenshot(),
                    contentType: ConfigSettingsAlternative.screenShotsContentType
                });
            });

            return ConfigSettings;
        } catch (error) {
            console.error('Error during commonBeforeEach:', error);
            throw new Error('Failed to execute commonBeforeEach: ' + error.message);
        }
    }

    // Método auxiliar para agregar timeout a las promesas
    async withTimeout(promise, timeout) {
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout reached')), timeout)
        );
        return Promise.race([promise, timeoutPromise]);
    }
}
