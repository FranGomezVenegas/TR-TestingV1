import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../../../trazit-config.js';
import { attachScreenshot } from '../../../1TRAZiT-Commons/actionsHelper.js';

export const handleSelectAction = async (page, testInfo, Button) => {
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
};
