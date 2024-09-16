import { platformMenuNames } from '../../trazit-config';
import { test, expect, Page, TestInfo } from '@playwright/test';

export class OpenSettingsWindow {
    constructor(page) {
        // this.page = page;
    }

    async openWindowForDesktop(page, testInfo, ConfigSettings, SettingsInfo, windowInfo) {
        await test.step('Start opening window for Desktop mode', async () => {
            console.log("openWindowForDesktop - SettingsInfo:", SettingsInfo);
            console.log("openWindowForDesktop - windowInfo:", windowInfo);
    
            try {
                // Hago clic en el elemento del menú principal My Settings
                await test.step('Click on main page element name "My Settings"', async () => {
                    await page.locator(platformMenuNames.mySettings.main.pageElementName).click();
                    console.log("Clicked on main page element name 'My Settings'");
                    await test.step('Pause the test execution', async () => {
                        await page.pause();
                    });
                });
    
                // Obtén el tamaño del viewport
                const { width, height } = await page.evaluate(() => {
                    return {
                        width: window.innerWidth,
                        height: window.innerHeight
                    };
                });
    
                // Captura la parte visible de la página
                await test.step('Capture visible part of the page', async () => {
                    await testInfo.attach(SettingsInfo.screenShotsName, {
                        body: await page.screenshot({
                            clip: {
                                x: 0,
                                y: 0,
                                width: width,
                                height: height
                            }
                        }),
                        contentType: ConfigSettings.screenShotsContentType
                    });
                    await test.step('Pause the test execution', async () => {
                        await page.pause();
                    });
                });
    
                // Verifico si SettingsInfo y su elemento de página están definidos
                await test.step('Verify and click on settings page element', async () => {
                    if (SettingsInfo && SettingsInfo.pageElementName) {
                        await page.locator(SettingsInfo.pageElementName).click();
                        console.log("Clicked on settings page element");
                        await page.pause();
                    } else {
                        console.error('SettingsInfo.pageElementName es undefined');
                        throw new Error("El nombre del elemento de configuración es undefined.");
                    }
                });
    
                // Navego a la URL del elemento de la ventana final
                await test.step('Navigate to final window page URL', async () => {
                    const fullPagrUrl = `${ConfigSettings.platformUrl.replace(/\/+$/, '')}/${windowInfo.pageElement.replace(/^\/+/, '')}`;
                    // const fullPagrUrl=ConfigSettings.platformUrl+windowInfo.pageElementName
                    await page.goto(fullPagrUrl);        
                    //await page.goto(windowInfo.pageElementName);
                    console.log("Navigated to window page element URL");
                    await test.step('Wait for the page to reach network idle state.', async () => {
                        await page.waitForLoadState('networkidle');
                    });
                    await test.step('Pause the test execution', async () => {
                        await page.pause();
                    });
                });
    
                // Adjunto una captura de pantalla final de la ventana
                await test.step('Attach final screenshot of the window', async () => {
                    await testInfo.attach(windowInfo.screenShotsName, {
                        body: await page.screenshot({
                            clip: {
                                x: 0,
                                y: 0,
                                width: width,
                                height: height
                            }
                        }),
                        contentType: ConfigSettings.screenShotsContentType
                    });
                    await test.step('Pause the test execution', async () => {
                        await page.pause();
                    });
                });
    
            } catch (error) {
                console.error('Error en openWindowForDesktop:', error);
                throw error;
            }
        });
    }

    
    async openWindowForMobile(page, testInfo, ConfigSettings, SettingsInfo, windowInfo) {
        console.log("openWindowForMobile - SettingsInfo:", SettingsInfo);
        console.log("openWindowForMobile - windowInfo:", windowInfo);

        try {
            // Verifica si el selector de página móvil está definido
            if (!platformMenuNames.mySettings.mobile.pageElement) {
                throw new Error('platformMenuNames.mySettings.mobile.pageElement no está definido.');
            }

            // Hago clic en el menú móvil
            await page.click('md-filled-icon-button.menu');
            // await page.getByLabel(Menu.clickMenu).click();
            await page.pause();

            // Hago clic en el elemento del menú principal My Settings para abrirlo
            await page.locator(platformMenuNames.mySettings.mobile.pageElement).click();
            await page.pause();

            // Adjunto una captura de pantalla del menú desplegado 'My Settings' en móvil
            await testInfo.attach(SettingsInfo.screenShotsName, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettings.screenShotsContentType
            });
            await page.pause();

            // Verifico si SettingsInfo y su elemento de página están definidos
            if (SettingsInfo && SettingsInfo.pageElement) {
                // Hago clic en el elemento del menú correspondiente
                await page.locator(SettingsInfo.pageElement).click();
                await page.pause();

            } else {
                console.error('SettingsInfo.pageElement es undefined');
                throw new Error("El nombre del elemento de configuración es undefined.");
            }

            // Adjunto una captura de pantalla de la página de configuración en móvil
            await testInfo.attach(SettingsInfo.screenShotsNameIncident, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettings.screenShotsContentType
            });
            await page.pause();

            // Navego a la URL del elemento de la ventana final
            const fullPagrUrl=ConfigSettings.platformUrl+windowInfo.pageElementName
            await page.goto(fullPagrUrl);   

            // await page.goto(windowInfo.pageElementName);
            await page.waitForLoadState('networkidle');
            await page.pause();

            // Adjunto una captura de pantalla final de la ventana en móvil
            await testInfo.attach(windowInfo.screenShotsName, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettings.screenShotsContentType
            });
            await page.pause();

        } catch (error) {
            console.error('Error en openWindowForMobile:', error);
            throw error;
        }
    }

    
    async openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, SettingsInfo, windowInfo) {
        console.log("openWindowForTabletsModeRetrato - SettingsInfo:", SettingsInfo);
        console.log("openWindowForTabletsModeRetrato - windowInfo:", windowInfo);

        try {
            // Hago clic en el elemento del menú principal My Settings
            await page.locator(platformMenuNames.mySettings.main.pageElementName).click();
            await page.pause();

            // Adjunto una captura de pantalla del menú desplegado 'My Settings' en modo tableta
            await testInfo.attach(SettingsInfo.screenShotsName, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettings.screenShotsContentType
            });
            await test.step('Pause the test execution', async () => {
                await page.pause();
            });

            // Obtengo los textos de los elementos de la página
            const textosElementos = await page.$$eval('span[slot="label"][style="rgb(36, 192, 235);font-weight:bold;"]', elementos => elementos.map(elemento => elemento.textContent));
            console.log(textosElementos);
            await test.step('Pause the test execution', async () => {
                await page.pause();
            });

            // Adjunto una captura de pantalla de los elementos de configuración en modo tableta
            await testInfo.attach(SettingsInfo.screenShotsNameIncident, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettings.screenShotsContentType
            });
            await test.step('Pause the test execution', async () => {
                await page.pause();
            });

            // Verifico si windowInfo y su elemento de página están definidos
            if (windowInfo && windowInfo.pageElementName) {
                // Navego a la URL del elemento de la ventana
                const fullPagrUrl=ConfigSettings.platformUrl+windowInfo.pageElementName
                await page.goto(fullPagrUrl);   
                
                // await page.goto(windowInfo.pageElementName);
                await page.waitForLoadState('networkidle');
                await test.step('Pause the test execution', async () => {
                    await page.pause();
                });

            } else {
                console.error('windowInfo.pageElementName es undefined');
                throw new Error("El nombre del elemento de la ventana es undefined.");
            }

            // Adjunto una captura de pantalla final de la ventana en modo tableta
            await testInfo.attach(windowInfo.screenShotsName, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettings.screenShotsContentType
            });
            await test.step('Pause the test execution', async () => {
                await page.pause();
            });

        } catch (error) {
            console.error('Error en openWindowForTabletsModeRetrato:', error);
            throw error;
        }
    }
}