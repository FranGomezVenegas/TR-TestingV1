import { platformMenuNames } from '../../trazit-config';
import { Menu } from '../../trazit-models/test-config-water-global';

export class OpenNotificationsWindows {
    constructor(page) {
        // this.page = page;
    }

    async openWindowForDesktop(page, testInfo, ConfigSettings, elementInfo) {
        console.log(`openNotificationsWindow - ElementInfo:`, elementInfo);

        try {
            // Captura la pantalla inicial
            await testInfo.attach('Initial Screenshot', {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettings.screenShotsContentType
            });
            console.log(`Initial screenshot attached`);

            // Hacer clic en el elemento de notificaciones
            //await page.locator('#notif-menu').getByText('Notifications').click();
            await page.locator('sp-action-menu#notif-menu').click();
            
            console.log(`Clicked on Notifications element`);
            await page.waitForTimeout(2000); // Espera breve después del clic

            // Adjuntar una captura de pantalla después del clic en el elemento de notificaciones
            await testInfo.attach('Notifications Screenshot', {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettings.screenShotsContentType
            });
            console.log(`Screenshot attached: Notifications`);

        } catch (error) {
            console.error(`Error in openNotificationsWindow:`, error);
            throw error; // Propagar el error para que se maneje externamente
        }
    }

    async openWindowForMobile(page, testInfo, ConfigSettings, elementInfo) {
        console.log(`openWindowForMobile - ElementInfo:`, elementInfo);

        try {
            // Captura la pantalla inicial
            await testInfo.attach('Initial Screenshot', {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettings.screenShotsContentType
            });
            console.log(`Initial screenshot attached`);

            // Hacer clic en el menú móvil (siempre necesario según la especificación)
            await page.getByLabel(Menu.clickMenu).click();
            console.log(`Clicked on mobile menu`);
            await page.waitForTimeout(1000); // Breve espera después del menú móvil

            // Hacer clic en el elemento de notificaciones
            await page.locator('mwc-list-item#dashboardnotifications').click();
            console.log(`Clicked on Notifications element`);
            await page.waitForTimeout(2000); // Espera breve después del clic

            // Adjuntar una captura de pantalla después del clic en el elemento de notificaciones
            await testInfo.attach('Notifications Screenshot', {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettings.screenShotsContentType
            });
            console.log(`Screenshot attached: Notifications`);

            } catch (error) {
            console.error(`Error in openNotificationsWindow:`, error);
            throw error; // Propagar el error para que se maneje externamente
            }
            }


    async openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, elementInfo) {
        console.log(`openNotificationsWindow - ElementInfo:`, elementInfo);

        try {
            // Captura la pantalla inicial
            await testInfo.attach('Initial Screenshot', {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettings.screenShotsContentType
            });
            console.log(`Initial screenshot attached`);

            // Hacer clic en el elemento de notificaciones
            //await page.locator('#notif-menu').getByText('Notifications').click();
            await page.locator('sp-action-menu#notif-menu').click();
            
            console.log(`Clicked on Notifications element`);
            await page.waitForTimeout(2000); // Espera breve después del clic

            // Adjuntar una captura de pantalla después del clic en el elemento de notificaciones
            await testInfo.attach('Notifications Screenshot', {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettings.screenShotsContentType
            });
            console.log(`Screenshot attached: Notifications`);

        } catch (error) {
            console.error(`Error in openNotificationsWindow:`, error);
            throw error; // Propagar el error para que se maneje externamente
        }
    }

}
