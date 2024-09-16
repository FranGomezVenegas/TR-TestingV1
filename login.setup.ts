import { test as setup } from '@playwright/test';
import { ConfigSettings } from './trazit-config';


setup('Login UI', async({ page}, testInfo) => {
    await page.goto(ConfigSettings.platformUrl);

    await page.getByLabel('User').fill(ConfigSettings.userAdmin);
    await page.getByLabel('Password').fill(ConfigSettings.userAdminPss);
    await page.getByLabel('Password').press('Enter');
    await page.pause();
    await testInfo.attach("credentials", {body: await page.locator('.header').screenshot(), contentType: "image/png"});
    await page.locator('sp-action-menu#procedures').hover();
    await page.pause();
}
)