import { getTestConfigSettings } from './ApiCalls';

const { chromium } = require('playwright');
const { ConfigSettings } = require('../../trazit-config');

export class LogIntoProcDefinition {
    constructor(page) {
        this.page = page;
    }

    async commonBeforeEach(page, testInfo) {
        await page.pause();
        await page.goto(ConfigSettings.platformUrl);
        await page.pause();
        console.log("Añadiendo las credenciales...")
        await page.getByLabel(ConfigSettings.procdefinition.fldUser.label).fill(ConfigSettings.procdefinition.fldUser.value);
        await page.pause();
        await page.getByLabel(ConfigSettings.procdefinition.fldPss.label).fill(ConfigSettings.procdefinition.fldPss.value);
        await page.pause();
        await page.pause();
        await testInfo.attach('Access', {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettings.screenShotsContentType
        });
        await page.getByLabel(ConfigSettings.procdefinition.fldPss.label).press(ConfigSettings.procdefinition.fldPss.actionName);
        await page.pause();
        await page.pause();
        await page.pause();
        await page.pause();
        await page.waitForTimeout(25000); 
        await testInfo.attach('Home', {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettings.screenShotsContentType
        });

        return ConfigSettings;
    }
}
