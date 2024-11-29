import { platformMenuNames } from '../../trazit-config';
import { Menu } from '../../trazit-models/test-config-water-global';
import { test } from '@playwright/test';

export class OpenProcedureWindow {
    constructor(page) {
        // this.page = page;
    }

    async openWindowForDesktop(page, testInfo, ConfigSettings) {
        console.log("openWindowForDesktop - ConfigSettings:", ConfigSettings);
        let dataForTest = {};        
        if (ConfigSettings.dataForTest) {
            let unescapedString = ConfigSettings.dataForTest.replace(/\\+/g, '\\');
            try {
                dataForTest = JSON.parse(unescapedString);
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }            
            dataForTest = JSON.parse(dataForTest.testDataGame);
        } else {
            throw new Error("ConfigSettings.dataForTest está indefinido o vacío");
        }
    
        try {
            await test.step("Check dataForTest.desktopMode is defined", async () => {
                if (!dataForTest.desktopMode) {
                    throw new Error("dataForTest.desktopMode es undefined.");
                }
            });
    
            await test.step("Check dataForTest.desktopMode.pageElementName is defined", async () => {
                if (!dataForTest.desktopMode.pageElementName) {
                    throw new Error("dataForTest.desktopMode.pageElementName es undefined.");
                }
            });
    
            await test.step("Take screenshot of session label element", async () => {
                const sessionLabelElement = page.locator('#sessionLabel').first();
                await testInfo.attach("User Session Details", {
                    body: await sessionLabelElement.screenshot(),
                    contentType: ConfigSettings.screenShotsContentType
                });
            });
            await page.waitForTimeout(200);
    
            await test.step("Click on the main page element", async () => {
                await page.waitForTimeout(200);
                await page.locator(dataForTest.desktopMode.pageElementName).click({ timeout: 1000 });
                console.log("Clicked on main page element name");
            });
    
            await test.step("Take screenshot after hover main element", async () => {
                await testInfo.attach(dataForTest.desktopMode.screenShotsName, {
                    body: await page.screenshot(),
                    contentType: ConfigSettings.screenShotsContentType
                });
            });
    
            await page.pause();
    
            await test.step("Verify dataForTest and dataForTest.pageElement.label are defined", async () => {
                if (dataForTest && dataForTest.desktopMode && dataForTest.desktopMode.label) {
                    try {
                        await page.getByRole('menuitem', { name: dataForTest.desktopMode.label }).locator('span').nth(0).click({ timeout: 1000 });
                        console.log("Clicked on procedure page element label (Opción 1)");
                    } catch (error) {
                        console.log("Opción 1 no encontrada, intentando Opción 2...");
                        try {
                              //await page.getByRole('button', { name: 'Micro EM' }).click();

                            await page.getByRole('button', { name: dataForTest.desktopMode.label, exact: true }).click({ timeout: 1000 });
                            console.log("Clicked on procedure page element label (Opción 2)");
                        } catch (error) {
                            console.log("Opción 2 no encontrada, intentando Opción 3...");
                            try {
                                await page.getByText(dataForTest.desktopMode.label)
                                    .click({ timeout: 1000 });
                                console.log("Clicked on procedure page element label (Opción 3)");
                            } catch (error) {
                                console.error("No se encontró ninguna de las opciones para el elemento de procedimiento.");
                                throw new Error("El nombre del elemento de procedimiento es undefined.");
                            }
                        }
                    }
                } else {
                    console.error("dataForTest.desktopMode.label is undefined");
                    throw new Error("El nombre del elemento de procedimiento es undefined.");
                }
            });
    
            await page.pause();
    
            await test.step("Take screenshot after clicking procedure element", async () => {
                await testInfo.attach(dataForTest.desktopMode.viewScreenShotLabel, {
                    body: await page.screenshot(),
                    contentType: ConfigSettings.screenShotsContentType
                });
            });
    
            await test.step("First attempt to click and fallback to URL navigation if needed", async () => {
                try {
                    // Primer intento: hacer clic en el texto 'Active Instruments'
                    await page.getByText(dataForTest.desktopMode.screenShotName, { exact: true }).first().click({timeout:1000});
                    console.log("Clicked on 'menu text'");
                } catch (error) {
                    console.log("'Pestaña' no encontrada, intentando navegar por URL...");
                    
                    // Segundo intento: navegación por URL
                    if (dataForTest.desktopMode.pageElement) {
                        // Asegúrate de que la URL se construya correctamente
                        const baseUrl = ConfigSettings.platformUrl.replace(/\/+$/, '');  // Eliminar barras extra al final
                        const pageUrl = dataForTest.desktopMode.pageElement.replace(/^\/+/, '');  // Eliminar barras al principio
                        const fullPagrUrl = `${baseUrl}/${pageUrl}`;
                        
                        console.log("Constructed URL: ", fullPagrUrl);
                        await page.goto(fullPagrUrl);
                        console.log("Navigated to window page element");
                        await page.waitForTimeout(1000);
                
                        // Verificar que la URL actual sea la esperada
                        const currentUrl = page.url();
                        if (currentUrl !== fullPagrUrl) {
                            console.error(`Navigation failed. Expected URL: ${fullPagrUrl}, but navigated to: ${currentUrl}`);
                            throw new Error("La navegación a la URL de la ventana falló.");
                        } else {
                            console.log("Successfully navigated to the expected URL.");
                        }
                    } else {
                        console.error("dataForTest.desktopMode.pageElement is undefined");
                        throw new Error("La URL de la ventana es undefined.");
                    }
                }
            });
            ;
    
            await page.pause();
    
        } catch (error) {
            console.error("Error en openWindowForDesktop:", error);
            throw error;
        }
    }
    


    async openWindowForMobile(page, testInfo, ConfigSettings) {
        console.log("openWindowForMobile - ConfigSettings:", ConfigSettings);
        let dataForTest={};        
        if (ConfigSettings.dataForTest) {
            // dataForTest = JSON.parse(ConfigSettings.dataForTest);
            let unescapedString = ConfigSettings.dataForTest.replace(/\\+/g, '\\');
            try {
                dataForTest = JSON.parse(unescapedString);
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }            
            // dataForTest = JSON.parse(unescapedString);
            dataForTest = JSON.parse(dataForTest.testDataGame)
           // dataForTest = ConfigSettings.dataForTest.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');

        } else {
            throw new Error("ConfigSettings.dataForTest está indefinido o vacío");
        }

        try {
            // await test.step("Take screenshot of session label element", async () => {
            //     const sessionLabelElement = page.locator('#sessionLabel').first();
            //     await testInfo.attach("User Session Details", {
            //         body: await sessionLabelElement.screenshot(),
            //         contentType: ConfigSettings.screenShotsContentType
            //     });
            // });
            await page.waitForTimeout(500);

            // await test.step("Click on the mobile menu", async () => {
            //     // Espera a que el botón esté visible antes de hacer clic
            //     await page.locator('md-icon', { hasText: dataForTest.mobileMode.clickMenu }).click();

            //     // await page.click('md-filled-icon-button.menu');

            //     console.log("Clicked on mobile menu");
            // });
            await test.step("Click on the mobile menu", async () => {
                // Intenta hacer clic en el menú móvil usando la primera opción
                const firstMenu = page.locator('md-icon', { hasText: dataForTest.mobileMode.clickMenu });
            
                // Verifica si el primer botón está visible
                if (await firstMenu.isVisible()) {
                    await firstMenu.click();
                    console.log("Clicked on mobile menu using first option");
                } else {
                    // Si no está visible, intenta la segunda opción
                    await page.click('md-filled-icon-button.menu');
                    console.log("Clicked on mobile menu using second option");
                }
            });
            
            await test.step("Check dataForTest.mobileMode.pageElementName is defined", async () => {
                if (!dataForTest.mobileMode.pageElementName) {
                    throw new Error("dataForTest.mobileMode.pageElementName es undefined.");
                }
            });


            await page.pause();

            await test.step("Click on the main procedure element in the mobile menu", async () => {
                // await page.getByRole('button', { name: dataForTest.mobileMode.pageElementName }).click();
                await page.locator(dataForTest.mobileMode.pageElementName).click({timeout: 2000});
                // await page.locator(dataForTest.mobileMode.pageElementName).click({timeout:5000})
                console.log("Clicked on mobile procedure page element");
            });

            await page.pause();

            await test.step("Take screenshot after opening the procedure menu", async () => {
                await testInfo.attach(dataForTest.mobileMode.screenShotsName, {
                    body: await page.screenshot(),
                    contentType: ConfigSettings.screenShotsContentType
                });
            });

            await page.pause();

            await test.step("Verify dataForTest.mobileMode.label is defined and click", async () => {
                if (dataForTest && dataForTest.mobileMode.label) {
                    // await page.getByRole('button', { name: dataForTest.mobileMode.label }).click({timeout:5000})
                    await page.getByRole('button', { name: dataForTest.mobileMode.label }).click({timeout: 2000});

                    // await page.locator(dataForTest.mobileMode.label).click({timeout:5000})
                    await test.step("Take screenshot after clicking procedure element", async () => {
                             await testInfo.attach(dataForTest.mobileMode.viewScreenShotLabel, {
                                 body: await page.screenshot(),
                                 contentType: ConfigSettings.screenShotsContentType
                             });
                        });
                } else {
                    console.error('dataForTest.mobileMode.label is undefined');
                    throw new Error("El nombre del elemento de configuración es undefined.");
                }
            });

            await page.pause();

            // await test.step("Take screenshot of mobile page configuration", async () => {
            //     await testInfo.attach(dataForTest.mobileMode.viewScreenShotLabel, {
            //         body: await page.screenshot(),
            //         contentType: ConfigSettings.screenShotsContentType
            //     });
            // });

            await test.step("Navigate to window URL", async () => {
                const fullPagrUrl = `${ConfigSettings.platformUrl.replace(/\/+$/, '')}/${dataForTest.mobileMode.pageElement.replace(/^\/+/, '')}`;
                await page.goto(fullPagrUrl);
                await page.waitForLoadState('networkidle');
            });

            await page.pause();

            // await test.step("Take final screenshot on mobile window", async () => {
            //     await testInfo.attach(dataForTest.mobileMode.screenShotName, {
            //         body: await page.screenshot(),
            //         contentType: ConfigSettings.screenShotsContentType
            //     });
            // });

            await page.pause();

        } catch (error) {
            console.error('Error en openWindowForMobile:', error);
            throw error;
        }
    }

    async openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings) {
        console.log("openWindowForMobile - ConfigSettings:", ConfigSettings);
        let dataForTest={};        
        if (ConfigSettings.dataForTest) {
            // dataForTest = JSON.parse(ConfigSettings.dataForTest);
            let unescapedString = ConfigSettings.dataForTest.replace(/\\+/g, '\\');
            try {
                dataForTest = JSON.parse(unescapedString);
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }            
            // dataForTest = JSON.parse(unescapedString);
            dataForTest = JSON.parse(dataForTest.testDataGame)
           // dataForTest = ConfigSettings.dataForTest.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');

        } else {
            throw new Error("ConfigSettings.dataForTest está indefinido o vacío");
        }
        
        
        try {
            // Verifico que tabletRetratoMode esté definido
            await test.step("Check dataForTest.tabletRetratoMode is defined", async () => {
                if (!dataForTest.tabletRetratoMode) {
                    throw new Error("dataForTest.tabletRetratoMode es undefined.");
                }
            });

            await test.step("Check dataForTest.tabletRetratoMode.pageElementName is defined", async () => {
                if (!dataForTest.tabletRetratoMode.pageElementName) {
                    throw new Error("dataForTest.tabletRetratoMode.pageElementName es undefined.");
                }
            });
            await test.step("Take screenshot of session label element", async () => {
                const sessionLabelElement = page.locator('#sessionLabel').first();
                await testInfo.attach("User Session Details", {
                    body: await sessionLabelElement.screenshot(),
                    contentType: ConfigSettings.screenShotsContentType
                });
            });
            await page.waitForTimeout(500);

            await test.step("Click on the main page element", async () => {
                // await page.getByRole('button', { name: dataForTest.tabletRetratoMode.pageElementName }).click({timeout: 5000});
                await page.waitForTimeout(500);
                await page.locator(dataForTest.tabletRetratoMode.pageElementName).click({timeout:15000})
                console.log("Clicked on main page element name");
            });

            await test.step("Take screenshot after hover main element", async () => {
                await testInfo.attach(dataForTest.tabletRetratoMode.screenShotsName, {
                    body: await page.screenshot(),
                    contentType: ConfigSettings.screenShotsContentType
                });
            });

            await page.pause();

            // await test.step("Verify dataForTest and dataForTest.pageElement.label are defined", async () => {
            //     if (dataForTest && dataForTest.tabletRetratoMode && dataForTest.tabletRetratoMode.label) {
            //         // await page.getByRole('button', { name: dataForTest.tabletRetratoMode.label }).click({timeout:5000})
            //         await page.waitForTimeout(3000);
            //         // opcion 1:
            //         await page.getByRole('menuitem', { name: dataForTest.tabletRetratoMode.label }).locator('span').click({timeout:5000})
            //         // opción 2:
            //         await page.getByRole('button', { name: dataForTest.tabletRetratoMode.label }).click({timeout: 5000});
                    
            //         console.log("Clicked on procedure page element label");
            //     } else {
            //         console.error("dataForTest.tabletRetratoMode.label is undefined");
            //         throw new Error("El nombre del elemento de procedimiento es undefined.");
            //     }
            // });
            await test.step("Verify dataForTest and dataForTest.pageElement.label are defined", async () => {
                if (dataForTest && dataForTest.tabletRetratoMode && dataForTest.tabletRetratoMode.label) {
                    try {
                        // Primer intento: Opción 1 (1 segundo de timeout)
                        await page.getByRole('menuitem', { name: dataForTest.tabletRetratoMode.label })
                            .locator('span')
                            .click({ timeout: 1000 });
                        
                        console.log("Clicked on procedure page element label (Opción 1)");
                    } catch (error) {
                        console.log("Opción 1 no encontrada, intentando Opción 2...");
                        try {
                            // Segundo intento: Opción 2 (1.5 segundos de timeout)
                            await page.getByRole('button', { name: dataForTest.tabletRetratoMode.label })
                                .click({ timeout: 1500 });
                            
                            console.log("Clicked on procedure page element label (Opción 2)");
                        } catch (error) {
                            // Si ambas opciones fallan, lanza un error
                            console.error("No se encontró ninguna de las opciones para el elemento de procedimiento.");
                            throw new Error("El nombre del elemento de procedimiento es undefined.");
                        }
                    }
                } else {
                    console.error("dataForTest.tabletRetratoMode.label is undefined");
                    throw new Error("El nombre del elemento de procedimiento es undefined.");
                }
            });
            

            await page.pause();
            await test.step("Take screenshot after clicking procedure element", async () => {
                await testInfo.attach(dataForTest.tabletRetratoMode.viewScreenShotLabel, {
                    body: await page.screenshot(),
                    contentType: ConfigSettings.screenShotsContentType
                });
            });

            await test.step("Navigate to window URL", async () => {
                if (dataForTest.tabletRetratoMode.pageElement && dataForTest.tabletRetratoMode.pageElement) {
                    const fullPagrUrl = `${ConfigSettings.platformUrl.replace(/\/+$/, '')}/${dataForTest.tabletRetratoMode.pageElement.replace(/^\/+/, '')}`;
                    await page.goto(fullPagrUrl);
                    console.log(fullPagrUrl);
                    console.log("Navigated to window page element");
                    await page.waitForTimeout(3000);

                    // await testInfo.attach(dataForTest.tabletRetratoMode.pageElement.screenShotName, {
                    //     body: await page.screenshot(),
                    //     contentType: ConfigSettings.screenShotsContentType
                    // });
                } else {
                    console.error("dataForTest.tabletRetratoMode.pageElement is undefined");
                    throw new Error("La URL de la ventana es undefined.");
                }
            });

            await page.pause();
        } catch (error) {
            console.error("Error en openWindowForTabletsModeRetrato:", error);
            throw error;
        }
    }
}
