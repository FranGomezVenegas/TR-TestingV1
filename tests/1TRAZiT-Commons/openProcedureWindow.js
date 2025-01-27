import { platformMenuNames } from '../../trazit-config';
import { Menu } from '../../trazit-models/test-config-water-global';
import { test } from '@playwright/test';

export class OpenProcedureWindow {
    constructor(page) {
        // this.page = page;
    }
     // Función auxiliar para generar variaciones de texto
     async generateCaseVariations(text) {
        if (!text) return [];
        
        const words = text.split(' ');
        const variations = [
            text.toLowerCase(), // todo minúsculas
            text.toUpperCase(), // todo mayúsculas
            words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '), // Title Case
            words.map(word => word.toLowerCase()).join(' '), // todo minúsculas con espacios
            words.map(word => word.toUpperCase()).join(' '), // todo mayúsculas con espacios
            words.map((word, idx) => idx % 2 === 0 ? word.toUpperCase() : word.toLowerCase()).join(' '), // palabras alternadas
            words.map((word, idx) => idx === 0 ? word.toLowerCase() : word.toUpperCase()).join(' '), // primera palabra minúscula, resto mayúsculas
            text // texto original
        ];
        
        return [...new Set(variations)]; // Eliminar duplicados
    }

    // Función auxiliar para intentar clicks con diferentes estrategias
    async tryClickWithVariations(page, text, timeout = 100) {
        const variations = await this.generateCaseVariations(text);
        let lastError = null;
        
        for (const variation of variations) {
            console.log(`Intentando click con variación: "${variation}"`);
            try {
                // Intentar diferentes estrategias de selector
                const strategies = [
                    async () => await page.getByRole('menuitem', { name: variation }).locator('span').nth(0).click({ timeout }),
                    async () => await page.getByRole('button', { name: variation, exact: true }).click({ timeout }),
                    async () => await page.getByText(variation, { exact: true }).click({ timeout }),
                    async () => await page.getByText(variation, { exact: true }).nth(0).click({ timeout }),
                    async () => await page.getByText(variation, { exact: true }).nth(1).click({ timeout }),
                    async () => await page.getByText(variation, { exact: true }).nth(2).click({ timeout }),
                    async () => await page.getByText(variation, { exact: true }).nth(3).click({ timeout }),
                    async () => await page.getByText(variation, { exact: true }).nth(4).click({ timeout }),
                    async () => await page.getByText(variation, { exact: true }).nth(5).click({ timeout }),
                    async () => await page.locator('#desktopMenu').getByText(variation, { exact: true }).click({ force: true, timeout}), 
                    async () => await page.locator('#desktopMenu').getByText(variation,  { exact: true }).nth(1).click({ timeout }),  
                    async () => await page.locator('#desktopMenu').getByText(variation,  { exact: true }).nth(2).click({ timeout }), 
                    async () => await page.locator('#desktopMenu').getByText(variation,  { exact: true }).nth(3).click({ timeout }), 
                    async () => await page.locator('#desktopMenu').getByText(variation,  { exact: true }).nth(4).click({ timeout }), 
                    async () => await page.locator('#desktopMenu').getByText(variation,  { exact: true }).nth(5).click({ timeout }), 
                    async () => await page.getByText(variation).first().click({ timeout }),
                    async () => await page.locator(`text="${variation}"`).click({ timeout }),
                    async () => await page.locator(`text=${variation}`).click({ timeout })
                ];

                for (const strategy of strategies) {
                    try {
                        await strategy();
                        console.log(`Click exitoso usando variación: "${variation}"`);
                        return true;
                    } catch (e) {
                        lastError = e;
                        continue;
                    }
                }
            } catch (e) {
                lastError = e;
                continue;
            }
        }
        
        throw lastError || new Error(`No se pudo hacer click con ninguna variación de: ${text}`);
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
            const handleDialog = async (dialog) => {
                console.error(`Se detectó un alert con el mensaje: "${dialog.message()}"`);
                const alertScreenshot = await page.screenshot();
                await testInfo.attach('Alert Screenshot', {
                    body: alertScreenshot,
                    contentType: 'image/png',
                });
                await dialog.dismiss(); 
                throw new Error(`El test falló debido a un alert con el mensaje: "${dialog.message()}"`);
            };
            page.on('dialog', handleDialog);

            // Verificaciones iniciales
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

            // Screenshots y clicks iniciales
            await test.step("Take screenshot of session label element", async () => {
                const sessionLabelElement = page.locator('#sessionLabel').first({timeout: 5000});
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

            // Intentar click en label con todas las variaciones
            await test.step("Try clicking label with case variations", async () => {
                if (dataForTest?.desktopMode?.label) {
                    await this.tryClickWithVariations(page, dataForTest.desktopMode.label);
                } else {
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

            // Intentar click en screenShotName con todas las variaciones  
            await test.step("Try clicking screenShotName with variations", async () => {  
                try {  
                    if (dataForTest.desktopMode.screenShotName) {  
                        await this.tryClickWithVariations(page, dataForTest.desktopMode.screenShotName);  
                        console.log("Successfully clicked screenShotName element");  
                        await page.mouse.click(15, 20);
                        // await page.mouse.click(10, 20);
                        return
                        
                        // Cerrar después del click exitoso  
                        await this.tryClickWithVariations(page, dataForTest.desktopMode.label);  
                        await page.mouse.click(10, 20);
                        return  
                    }  
                } catch (error) {  
                    console.log("Click fallido en screenShotName, intentando alternativa...");  
                                            
                    if (dataForTest.desktopMode.pageElement) {  
                        const baseUrl = ConfigSettings.platformUrl.replace(/\/+$/, '');  
                        const pageUrl = dataForTest.desktopMode.pageElement.replace(/^\/+/, '');  
                        const fullPagrUrl = `${baseUrl}/${pageUrl}`;  
                        
                        console.log("URL construida: ", fullPagrUrl);  
                        await page.goto(fullPagrUrl);  
                        console.log("Navegación a window page element completada");  
                        await page.waitForTimeout(200);
                        await page.mouse.click(10, 20);  
                        
                        const currentUrl = page.url();
                        if (currentUrl !== fullPagrUrl) {
                            throw new Error(`Navegación fallida. Esperada: ${fullPagrUrl}, obtenida: ${currentUrl}`);
                        }
                        return
                    } else if (dataForTest.desktopMode.pageElementImg) {
                        await page.locator(dataForTest.desktopMode.pageElementImg).first().click();
                        await this.tryClickWithVariations(page, dataForTest.desktopMode.label);
                        await page.mouse.click(10, 20);
                        await page.waitForTimeout(500);  
                        return
                    }  
                }    
            });  

            await page.pause();
            page.off('dialog', handleDialog);

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
