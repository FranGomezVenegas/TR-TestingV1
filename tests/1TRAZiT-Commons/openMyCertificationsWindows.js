import { platformMenuNames } from '../../trazit-config';
import { Menu } from '../../trazit-models/test-config-water-global';

export class OpenMyCertificationsWindow {
    constructor(page) {
        // this.page = page;
    }

    async openWindowForDesktop(page, testInfo, ConfigSettings, MyCertificationsInfo, windowInfo) {
        console.log("openWindowForDesktop - MyCertificationsInfo:", MyCertificationsInfo);
        console.log("openWindowForDesktop - windowInfo:", windowInfo);

        try {
            if (!platformMenuNames.myCertification.main.pageElementName) {
                throw new Error('platformMenuNames.myCertification.main.pageElementName is not defined.');
            }

            console.log(`Attempting to click on ${platformMenuNames.myCertification.main.pageElementName}`);

            await page.waitForSelector(platformMenuNames.myCertification.main.pageElementName, { visible: true });
            console.log("Element is visible");

            // Click on the element with text "My Certifications"
            await page.locator(platformMenuNames.myCertification.main.pageElementName).getByText(platformMenuNames.myCertification.main.textToClick).click();
            console.log("Clicked on main page element name 'My Certifications'");
            await page.waitForTimeout(2000);

            let screenshot = await page.screenshot({ fullPage: true });
            await testInfo.attach(MyCertificationsInfo.screenShotsName, {
                body: screenshot,
                contentType: ConfigSettings.screenShotsContentType
            });
            console.log("Screenshot attached");

            if (MyCertificationsInfo && MyCertificationsInfo.pageElementName) {
                await page.locator(MyCertificationsInfo.pageElementName).click();
                console.log("Clicked on MyCertifications page element");
                await page.waitForTimeout(2000);
            } else {
                console.error('MyCertificationsInfo.pageElementName is undefined');
                throw new Error("Configuration element name is undefined.");
            }

            screenshot = await page.screenshot({ fullPage: true });
            await testInfo.attach(MyCertificationsInfo.screenShotsNameIncident, {
                body: screenshot,
                contentType: ConfigSettings.screenShotsContentType
            });
            console.log("Screenshot attached");
            
            const fullPagrUrl = `${ConfigSettings.platformUrl.replace(/\/+$/, '')}/${windowInfo.pageElement.replace(/^\/+/, '')}`;
            // const fullPagrUrl=ConfigSettings.platformUrl+windowInfo.pageElementName
            await page.goto(fullPagrUrl);

            //await page.goto(windowInfo.pageElementName);
            console.log("Navigated to window page element URL");
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);

            screenshot = await page.screenshot({ fullPage: true });
            await testInfo.attach(windowInfo.screenShotsName, {
                body: screenshot,
                contentType: ConfigSettings.screenShotsContentType
            });
            console.log("Final screenshot attached");

        } catch (error) {
            console.error('Error in openWindowForDesktop:', error);
            throw error;
        }
    }

    async openWindowForMobile(page, testInfo, ConfigSettings, MyCertificationsInfo, windowInfo) {
        console.log("openWindowForMobile - MyCertificationsInfo:", MyCertificationsInfo);
        console.log("openWindowForMobile - windowInfo:", windowInfo);

        try {
            // Verifica si el selector de página móvil está definido
            if (!platformMenuNames.myCertification.mobile.pageElementName) {
                throw new Error('platformMenuNames.myCertification.mobile.pageElementName is not defined.');
            }

            // Hago clic en el menú móvil
            await page.getByLabel(Menu.clickMenu).click();
            await page.pause();

            // Verificar si el menú desplegable es visible
            const menuVisible = await page.isVisible(platformMenuNames.myCertification.mobile.pageElementName);
            if (!menuVisible) {
                throw new Error(`Mobile menu element ${platformMenuNames.myCertification.mobile.pageElementName} is not visible`);
            }

            console.log(`Attempting to click on ${platformMenuNames.myCertification.mobile.pageElementName}`);
            await page.locator(platformMenuNames.myCertification.mobile.pageElementName).click();
            console.log("Clicked on My Certifications menu element in mobile");
            await page.waitForTimeout(2000);

            let screenshot = await page.screenshot({ fullPage: true });
            await testInfo.attach(MyCertificationsInfo.screenShotsName, {
                body: screenshot,
                contentType: ConfigSettings.screenShotsContentType
            });
            console.log("Screenshot attached");

            if (MyCertificationsInfo && MyCertificationsInfo.pageElementName) {
                await page.locator(MyCertificationsInfo.pageElementName).click();
                console.log("Clicked on MyCertifications page element in mobile");
                await page.waitForTimeout(2000);
            } else {
                console.error('MyCertificationsInfo.pageElementName is undefined');
                throw new Error("Configuration element name is undefined.");
            }

            screenshot = await page.screenshot({ fullPage: true });
            await testInfo.attach(MyCertificationsInfo.screenShotsNameIncident, {
                body: screenshot,
                contentType: ConfigSettings.screenShotsContentType
            });
            console.log("Screenshot attached");

            const fullPagrUrl=ConfigSettings.platformUrl+windowInfo.pageElementName
            await page.goto(fullPagrUrl);
            // await page.goto(windowInfo.pageElementName);
            console.log("Navigated to window page element URL");
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);

            screenshot = await page.screenshot({ fullPage: true });
            await testInfo.attach(windowInfo.screenShotsName, {
                body: screenshot,
                contentType: ConfigSettings.screenShotsContentType
            });
            console.log("Final screenshot attached");

        } catch (error) {
            console.error('Error in openWindowForMobile:', error);
            throw error;
        }
    }
    
    async openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, myCertificationsInfo, windowInfo) {
        console.log("openWindowForTabletsModeRetrato - myCertificationsInfo:", myCertificationsInfo);
        console.log("openWindowForTabletsModeRetrato - windowInfo:", windowInfo);

        try {
            // Hago clic en el elemento del menú principal My Certification
            await page.locator(platformMenuNames.myCertification.main.pageElementName).click();
            await page.pause();

            // Adjunto una captura de pantalla del menú desplegado 'My Certification' en modo tableta
            await testInfo.attach(myCertificationsInfo.screenShotsName, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettings.screenShotsContentType
            });
            await page.pause();

            // Obtengo los textos de los elementos de la página
            const textosElementos = await page.$$eval('span[slot="label"][style="rgb(36, 192, 235);font-weight:bold;"]', elementos => elementos.map(elemento => elemento.textContent));
            console.log(textosElementos);
            await page.pause();

            // Adjunto una captura de pantalla de los elementos de configuración en modo tableta
            await testInfo.attach(myCertificationsInfo.screenShotsNameIncident, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettings.screenShotsContentType
            });
            await page.pause();

            // Verifico si windowInfo y su elemento de página están definidos
            if (windowInfo && windowInfo.pageElementName) {
                // Navego a la URL del elemento de la ventana
                const fullPagrUrl=ConfigSettings.platformUrl+windowInfo.pageElementName
                await page.goto(fullPagrUrl); 

                // await page.goto(windowInfo.pageElementName);
                await page.waitForLoadState('networkidle');
                await page.pause();

            } else {
                console.error('windowInfo.pageElementName es undefined');
                throw new Error("El nombre del elemento de la ventana es undefined.");
            }

            // Adjunto una captura de pantalla final de la ventana en modo tableta
            await testInfo.attach(windowInfo.screenShotsName, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettings.screenShotsContentType
            });
            await page.pause();

        } catch (error) {
            console.error('Error en openWindowForTabletsModeRetrato:', error);
            throw error;
        }
    }
}