import { platformMenuNames } from '../../trazit-config';
import { Menu } from '../../trazit-models/test-config-water-global';

export class OpenClickOneElement {
    constructor(page) {
        // this.page = page;
    }

    async openWindowForDesktop(page, testInfo, ConfigSettings, elementInfo) {
        console.log(`openWindowForDesktop - ElementInfo:`, elementInfo);

        try {
            // Captura la pantalla inicial
            await testInfo.attach('Initial Screenshot', {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettings.screenShotsContentType
            });
            console.log(`Initial screenshot attached`);

            // Esperar a que el selector esté presente y sea interactuable
            await page.waitForSelector(elementInfo.pageElementName);

            // Hacer clic en el elemento especificado
            await page.locator(elementInfo.pageElementName).click();
            console.log(`Clicked on element (desktop): ${elementInfo.pageElementName}`);
            await page.waitForTimeout(2000); // Espera breve después del clic

            // Adjuntar una captura de pantalla después del clic en el elemento
            await testInfo.attach(elementInfo.screenShotsName, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettings.screenShotsContentType
            });

        } catch (error) {
            console.error(`Error in openWindowForDesktop:`, error);
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

            // Hacer clic en el botón de menú <md-filled-icon-button class="menu">
            await page.click('md-filled-icon-button.menu');

            //await page.getByLabel(Menu.clickMenu).click();
            console.log(`Clicked on mobile menu`);
            await page.waitForTimeout(1000); // Breve espera después del menú móvil
    
            // Esperar a que el selector del elemento esté presente y sea interactuable
            await page.waitForSelector(elementInfo.pageElementName);
            console.log(`Selector ${elementInfo.pageElementName} encontrado`);
    
            // Hacer clic en el elemento especificado para móvil
            await page.locator(elementInfo.pageElementName).click();
            console.log(`Clicked on element (mobile): ${elementInfo.pageElementName}`);
            await page.waitForTimeout(2000); // Espera breve después del clic
    
            // Adjuntar una captura de pantalla después del clic en el elemento (mobile)
            await testInfo.attach(elementInfo.screenShotsName, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettings.screenShotsContentType
            });
            console.log(`Screenshot attached: ${elementInfo.screenShotsName}`);
    
        } catch (error) {
            console.error(`Error in openWindowForMobile:`, error);
            throw error; // Propagar el error para que se maneje externamente
        }
    }
    

    async openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, elementInfo) {
        console.log(`openWindowForTabletsModeRetrato - ElementInfo:`, elementInfo);

        try {
            // Captura la pantalla inicial
            await testInfo.attach('Initial Screenshot', {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettings.screenShotsContentType
            });
            console.log(`Initial screenshot attached`);

            // Hacer clic en el menú de tablet si es necesario
            if (elementInfo.tablet) {
                await page.getByLabel(Menu.clickMenu).click();
                await page.pause();
            }

            // Esperar a que el selector esté presente y sea interactuable
            await page.waitForSelector(elementInfo.pageElementName);

            // Hacer clic en el elemento especificado para tablet
            await page.locator(elementInfo.pageElementName).click();
            console.log(`Clicked on element (tablet): ${elementInfo.pageElementName}`);
            await page.waitForTimeout(2000); // Espera breve después del clic

            // Adjuntar una captura de pantalla después del clic en el elemento (tablet)
            await testInfo.attach(elementInfo.screenShotsName, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettings.screenShotsContentType
            });

        } catch (error) {
            console.error(`Error in openWindowForTabletsModeRetrato:`, error);
            throw error; // Propagar el error para que se maneje externamente
        }
    }
}