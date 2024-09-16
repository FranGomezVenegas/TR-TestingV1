const { chromium } = require('playwright');
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { getTestConfigSettings } from './ApiCalls';
import { test } from '@playwright/test';

export class LogIntoPlatform {
    constructor(page) {
        //this.page = page;
    }

    async commonBeforeEach(page, testInfo, testDataGame, trazitTestName) {
        const ConfigSettings = await getTestConfigSettings({}, testInfo.status, testInfo, testDataGame, trazitTestName);

        if (!ConfigSettings || !ConfigSettings.platformUrl || !ConfigSettings.login) {
            throw new Error('Configuration settings are invalid or not found');
        }
        await test.step('Pause the test execution', async () => {
            await page.pause();
            await page.pause();

            await page.pause();
            await page.pause();
        }); 

        console.log('commonBeforeEach', 'ConfigSettings', ConfigSettings);
        await test.step('Pause the test execution', async () => {
            await page.pause();
            await page.pause();
            await page.pause();
        })
        await test.step('Access to the TRAZiT platform', async () => {
            await page.goto(ConfigSettings.platformUrl);
        })
        await test.step('Pause the test execution', async () => {
            await page.pause();
            await page.pause();
        })
        await test.step('Login in the platform', async () => {
            await test.step('Click and add the user', async () => {
                await page.getByLabel(ConfigSettings.login.fldUser.label).fill(ConfigSettingsAlternative.login.fldUser.value);
            })
            await test.step('Pause the test execution', async () => {
                await page.pause();
                await page.pause();
                await page.pause();
                await page.pause();
            })
            await test.step('Click and add the password', async () => {
                await page.getByLabel(ConfigSettings.login.fldPss.label).fill(ConfigSettingsAlternative.login.fldPss.value);
            })
            await test.step('Pause the test execution', async () => {
                await page.pause();
                await page.pause();
                await page.pause();
                await page.pause();
            })

            await test.step('Enter the Platform', async () => {
                await page.getByLabel(ConfigSettings.login.fldPss.label).press(ConfigSettings.login.fldPss.actionName);
            });
        });
        await test.step('Pause the test execution', async () => {
            await page.pause();
            await page.pause();
            await page.pause();
            await page.pause();
        });

        await test.step('Wait 3 seconds for the page to load completely.', async () => {
            await page.waitForTimeout(3000); 
        });

        await test.step('Attach a screenshot', async () => {
            await testInfo.attach('Access', {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
        });

        await test.step('Wait 3 seconds for the page to load completely.', async () => {
            await page.waitForTimeout(3000); 
        }); 

        console.log('Home');
        await test.step('Attach a screenshot', async () => {
            await testInfo.attach('Home', {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
        });

        return ConfigSettings;
    }

}
