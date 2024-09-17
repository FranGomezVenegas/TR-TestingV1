import { platformMenuNames } from '../../trazit-config';
import { Menu } from '../../trazit-models/test-config-water-global';
import { Logger, NetworkInterceptor } from '../1TRAZiT-Commons/consoleAndNetworkMonitor';
import { test, expect } from '@playwright/test';

export class OpenProcedureWindow {
    constructor(page) {
        //this.page = page;
    }

    async openWindowForDesktop(page, testInfo, ConfigSettings, procedureInfo, windowInfo) {
        

        console.log("openWindowForDesktop - procedureInfo:", procedureInfo);
        console.log("openWindowForDesktop - windowInfo:", windowInfo);

        try {    
            // Asegúrate de que `platformMenuNames.procedure.main.pageElementName` está definido
            if (!platformMenuNames.procedure.main.pageElementName) {
                throw new Error("platformMenuNames.procedure.main.pageElementName es undefined.");
            }

            await page.pause();
            await page.pause();
            await page.pause();
            // Hacer clic en el elemento del menú principal
            await page.locator(platformMenuNames.procedure.main.pageElementName).hover();
            console.log("Clicked on main page element name");

            // Captura de pantalla después de hacer clic
            // await testInfo.attach(platformMenuNames.procedure.main.screenShotsName, {
            //     body: await page.screenshot(),
            //     contentType: ConfigSettings.screenShotsContentType
            // });
            await page.pause();
            await page.pause();

            // Verifica si `procedureInfo` y `procedureInfo.pageElement` están definidos
            if (procedureInfo && procedureInfo.pageElement && procedureInfo.pageElement.label) {
                console.log("Trying to click on menu item with label:", procedureInfo.pageElement.label);
                await page.getByRole('menuitem', { name: procedureInfo.pageElement.label }).locator('span').click();
                console.log("Clicked on procedure page element label");
            } else {
                console.error("procedureInfo.pageElement.label es undefined");
                throw new Error("El nombre del elemento de procedimiento es undefined.");
            }

            // Captura de pantalla después de hacer clic en el elemento de procedimiento
            await page.pause();
            // await testInfo.attach(procedureInfo.screenShotsName, {
            //     body: await page.screenshot(),
            //     contentType: ConfigSettings.screenShotsContentType
            // });

            // Navegar a la URL de la ventana
            
            const networkInterceptor = new NetworkInterceptor();
            networkInterceptor.attachToPage(page);

            if (windowInfo && windowInfo.pageElement) {
                const fullPagrUrl = `${ConfigSettings.platformUrl.replace(/\/+$/, '')}/${windowInfo.pageElement.replace(/^\/+/, '')}`;
                // const fullPagrUrl=ConfigSettings.platformUrl+windowInfo.pageElement
                await page.pause();
                await page.pause();
                        
                await page.goto(fullPagrUrl);
                console.log("Navigated to window page element");
                await page.pause();
                await page.pause();
                await page.pause();
                await page.waitForTimeout(3000);

                // Captura de pantalla de la ventana
                // await testInfo.attach(windowInfo.screenShotsName, {
                //     body: await this.page.screenshot(),
                //     contentType: ConfigSettings.screenShotsContentType
                // });
            } else {
                console.error("windowInfo.pageElement es undefined");
                throw new Error("La URL de la ventana es undefined.");
            }

            await page.pause();
            
            // Verificar respuestas de red capturadas
            await test.step('Verify network responses captured', async () => {
                const nullResponsesCount = networkInterceptor.verifyNonImageNullResponses();
                // expect(nullResponsesCount).toBe(0);
            });
            
        } catch (error) {
            console.error("Error en openWindowForDesktop:", error);
            throw error;
        }
    }
    
    async openWindowForMobile(page, testInfo, ConfigSettings, procedureInfo, windowInfo) {
        console.log("openWindowForMobile - procedureInfo:", procedureInfo);
        console.log("openWindowForMobile - windowInfo:", windowInfo);

        try {
            console.log("platformMenuNames.procedure.mobile.pageElementName:", platformMenuNames.procedure.mobile.pageElementName);

            // Validar y asegurar que platformMenuNames.procedure.mobile.pageElement no sea undefined
            if (!platformMenuNames.procedure.mobile.pageElementName) {
                throw new Error("platformMenuNames.procedure.mobile.pageElement es undefined.");
            }

            // Verificar y asignar un valor por defecto si procedureInfo.pageElement es undefined
            if (!procedureInfo || !procedureInfo.pageElementName) {
                console.warn("procedureInfo.pageElementName no está definido. Se asigna un valor por defecto.");
                procedureInfo = {
                    ...procedureInfo,
                    pageElementName: '.default-element', // Asignar un selector predeterminado adecuado
                    screenShotsName: procedureInfo.screenShotsName || "defaultScreenShotName",
                };
            }

            // Hago clic en el menú móvil
            console.log("Haciendo clic en el menú móvil");
            await page.locator("md-filled-icon-button.menu").click();
            console.log("Clicked on mobile menu");
            await page.pause();

            // Hago clic en el elemento del menú principal Procedure para abrirlo
            console.log("Haciendo clic en el elemento del menú principal Procedure");
            await page.locator(platformMenuNames.procedure.mobile.pageElementName).click();
            console.log("Clicked on mobile procedure page element");
            await page.pause();

            // Adjunto una captura de pantalla del menú desplegado 'Procedure' en móvil
            console.log("Adjuntando captura de pantalla del menú desplegado 'Procedure' en móvil");
            // await testInfo.attach(procedureInfo.screenShotsName, {
            //     body: await page.screenshot(),
            //     contentType: ConfigSettings.screenShotsContentType
            // });
            await page.pause();
            
            
            // Verifico si procedureInfo y su elemento de página están definidos
            if (procedureInfo && procedureInfo.pageElement) {
                // Hago clic en el elemento del menú correspondiente
                await page.locator(procedureInfo.pageElement).click();
                await page.pause();

            } else {
                console.error('procedureInfo.pageElement es undefined');
                throw new Error("El nombre del elemento de configuración es undefined.");
            }

            // Adjunto una captura de pantalla de la página de configuración en móvil
            // await testInfo.attach(procedureInfo.screenShotsNameIncident, {
            //     body: await page.screenshot(),
            //     contentType: ConfigSettings.screenShotsContentType
            // });
            await page.pause();

            // Navego a la URL del elemento de la ventana final
            const fullPagrUrl = `${ConfigSettings.platformUrl.replace(/\/+$/, '')}/${windowInfo.pageElement.replace(/^\/+/, '')}`;

            await page.goto(fullPagrUrl);

            // await page.goto(windowInfo.pageElement);
            await page.waitForLoadState('networkidle');
            await page.pause();
            await page.pause();
            await page.pause();
            await page.pause();

            // Adjunto una captura de pantalla final de la ventana en móvil
            await testInfo.attach(windowInfo.screenShotsName, {
                body: await page.screenshot(),
                contentType: ConfigSettings.screenShotsContentType
            });
            await page.pause();

        } catch (error) {
            console.error('Error en openWindowForMobile:', error);
            throw error;
        }
    }

    async openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, procedureInfo, windowInfo) {
        console.log("openWindowForTabletsModeRetrato - procedureInfo:", procedureInfo);
        console.log("openWindowForTabletsModeRetrato - windowInfo:", windowInfo);

        try {
            await page.locator(platformMenuNames.procedure.main.pageElementName).click();
            await page.pause();
            await testInfo.attach(platformMenuNames.procedure.main.screenShotsName, {
                body: await page.screenshot(),
                contentType: ConfigSettings.screenShotsContentType
            });
            await page.pause();

            const textosElementos = await page.$$eval('span[slot="label"][style="rgb(36, 192, 235);font-weight:bold;"]', elementos => elementos.map(elemento => elemento.textContent));
            console.log(textosElementos);
            await page.pause();

            // await testInfo.attach(procedureInfo.screenShotsName, {
            //     body: await page.screenshot(),
            //     contentType: ConfigSettings.screenShotsContentType
            // });
            const fullPagrUrl = `${ConfigSettings.platformUrl.replace(/\/+$/, '')}/${windowInfo.pageElement.replace(/^\/+/, '')}`;

            await page.goto(fullPagrUrl);

            // await page.goto(windowInfo.pageElement);
            await page.pause();
            await page.pause();
            await page.waitForTimeout(3000);
            await testInfo.attach(windowInfo.screenShotsName, {
                body: await page.screenshot(),
                contentType: ConfigSettings.screenShotsContentType
            });
            await page.pause();
        } catch (error) {
            console.error("Error in openWindowForTabletsModeRetrato:", error);
            throw error;
        }
    }
}
