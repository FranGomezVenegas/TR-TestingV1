import { platformMenuNames } from '../../trazit-config';
import { Menu } from '../../trazit-models/test-config-water-global';
import { test } from '@playwright/test';

export class OpenProcedureWindow {
    constructor(page) {
        // this.page = page;
    }

    async openWindowForDesktop(page, testInfo, ConfigSettings) {
        console.log("openWindowForDesktop - ConfigSettings:", ConfigSettings);
//        let dataForTest=JSON.parse(ConfigSettings.dataForTest)
        let dataForTest;        
        if (ConfigSettings.dataForTest) {
            dataForTest = JSON.parse(ConfigSettings.dataForTest);
        } else {
            throw new Error("ConfigSettings.dataForTest está indefinido o vacío");
        }
        
        try {
            // Verifico que desktopMode esté definido
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

            await test.step("Click on the main page element", async () => {
                await page.locator(dataForTest.desktopMode.pageElementName).click();
                console.log("Clicked on main page element name");
            });

            // await test.step("Take screenshot after clicking main element", async () => {
            //     await testInfo.attach(dataForTest.desktopMode.screenShotsName, {
            //         body: await page.screenshot(),
            //         contentType: ConfigSettings.screenShotsContentType
            //     });
            // });

            await page.pause();

            await test.step("Verify dataForTest and dataForTest.pageElement.label are defined", async () => {
                if (dataForTest && dataForTest.desktopMode && dataForTest.desktopMode.label) {
                    await page.getByRole('menuitem', { name: dataForTest.desktopMode.label }).locator('span').click();
                    console.log("Clicked on procedure page element label");
                } else {
                    console.error("dataForTest.desktopMode.label is undefined");
                    throw new Error("El nombre del elemento de procedimiento es undefined.");
                }
            });

            await page.pause();
            // await test.step("Take screenshot after clicking procedure element", async () => {
            //     await testInfo.attach(dataForTest.desktopMode.viewScreenShotLabel, {
            //         body: await page.screenshot(),
            //         contentType: ConfigSettings.screenShotsContentType
            //     });
            // });

            await test.step("Navigate to window URL", async () => {
                if (dataForTest.desktopMode.pageElement && dataForTest.desktopMode.pageElement) {
                    const fullPagrUrl = `${ConfigSettings.platformUrl.replace(/\/+$/, '')}/${dataForTest.desktopMode.pageElement.replace(/^\/+/, '')}`;
                    await page.goto(fullPagrUrl);
                    console.log("Navigated to window page element");
                    await page.waitForTimeout(3000);

                    // await testInfo.attach(dataForTest.desktopMode.pageElement.screenShotName, {
                    //     body: await page.screenshot(),
                    //     contentType: ConfigSettings.screenShotsContentType
                    // });
                } else {
                    console.error("dataForTest.desktopMode.pageElement is undefined");
                    throw new Error("La URL de la ventana es undefined.");
                }
            });

            await page.pause();
        } catch (error) {
            console.error("Error en openWindowForDesktop:", error);
            throw error;
        }
    }

    async openWindowForMobile(page, testInfo, ConfigSettings) {
        console.log("openWindowForMobile - ConfigSettings:", ConfigSettings);
        let dataForTest;        
        if (ConfigSettings.dataForTest) {
            dataForTest = JSON.parse(ConfigSettings.dataForTest);
        } else {
            throw new Error("ConfigSettings.dataForTest está indefinido o vacío");
        }
        try {
            console.log(dataForTest); // Asegúrate de que contiene mobileMode
            console.log(dataForTest.mobileMode); // Asegúrate de que contiene clickMenu

            await test.step("Click on the mobile menu", async () => {
                // Espera a que el botón esté visible antes de hacer clic
                await page.waitForSelector('md-filled-icon-button.menu', { state: 'visible' });
                await page.click('md-filled-icon-button.menu');

            //     await page.getByLabel(dataForTest.mobileMode.clickMenu).click();
                console.log("Clicked on mobile menu");
            });

            await test.step("Check dataForTest.mobileMode.pageElementName is defined", async () => {
                if (!dataForTest.mobileMode.pageElementName) {
                    throw new Error("dataForTest.mobileMode.pageElementName es undefined.");
                }
            });


            await page.pause();

            await test.step("Click on the main procedure element in the mobile menu", async () => {
                await page.locator(dataForTest.mobileMode.pageElementName).click();
                console.log("Clicked on mobile procedure page element");
            });

            await page.pause();

            // await test.step("Take screenshot after opening the procedure menu", async () => {
            //     await testInfo.attach(dataForTest.mobileMode.screenShotsName, {
            //         body: await page.screenshot(),
            //         contentType: ConfigSettings.screenShotsContentType
            //     });
            // });

            await page.pause();

            await test.step("Verify dataForTest.mobileMode.label is defined and click", async () => {
                if (dataForTest && dataForTest.mobileMode.label) {
                    await page.locator(dataForTest.mobileMode.label).click();
                } else {
                    console.error('dataForTest.mobileMode.label is undefined');
                    throw new Error("El nombre del elemento de configuración es undefined.");
                }
            });

            await page.pause();

            // await test.step("Take screenshot of mobile page configuration", async () => {
            //     await testInfo.attach(dataForTest.mobileMode.screenShotsNameIncident, {
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
        let dataForTest;        
        if (ConfigSettings.dataForTest) {
            dataForTest = JSON.parse(ConfigSettings.dataForTest);
        } else {
            throw new Error("ConfigSettings.dataForTest está indefinido o vacío");
        }
        
        try {
            await test.step("Check platformMenuNames.procedure.main.pageElementName is defined", async () => {
                if (!dataForTest.tabletRetratoMode.pageElementName) {
                    throw new Error("platformMenuNames.procedure.main.pageElementName es undefined.");
                }
            });

            await test.step("Click on the main page element", async () => {
                await page.locator(dataForTest.tabletRetratoMode.pageElementName).click();
                console.log("Clicked on main page element name");
            });

            // await test.step("Take screenshot after clicking main element", async () => {
            //     await testInfo.attach(dataForTest.tabletRetratoMode.screenShotsName, {
            //         body: await page.screenshot(),
            //         contentType: ConfigSettings.screenShotsContentType
            //     });
            // });

            await page.pause();

            await test.step("Verify dataForTest and dataForTest.pageElement.label are defined", async () => {
                if (dataForTest && dataForTest.tabletRetratoMode && dataForTest.tabletRetratoMode.label) {
                    await page.getByRole('menuitem', { name: dataForTest.tabletRetratoMode.label }).locator('span').click();
                    console.log("Clicked on procedure page element label");
                } else {
                    console.error("dataForTest.tabletRetratoMode.label is undefined");
                    throw new Error("El nombre del elemento de procedimiento es undefined.");
                }
            });

            await page.pause();
            // await test.step("Take screenshot after clicking procedure element", async () => {
            //     await testInfo.attach(dataForTest.tabletRetratoMode.viewScreenShotLabel, {
            //         body: await page.screenshot(),
            //         contentType: ConfigSettings.screenShotsContentType
            //     });
            // });

            await test.step("Navigate to window URL", async () => {
                if (dataForTest.tabletRetratoMode.pageElement && dataForTest.tabletRetratoMode.pageElement) {
                    const fullPagrUrl = `${ConfigSettings.platformUrl.replace(/\/+$/, '')}/${dataForTest.tabletRetratoMode.pageElement.replace(/^\/+/, '')}`;
                    await page.goto(fullPagrUrl);
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
            console.error("Error en openWindowForTabletMode:", error);
            throw error;
        }
    }
}
