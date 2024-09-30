import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';


// seleccionar elementos y hacer scroll si no es visible.
export const clickElementByText = async (page, text, timeout = 30000) => {
    try {
        const element = page.getByText(text, { exact: true });

        if (!(await element.isVisible())) {
            await element.scrollIntoViewIfNeeded({timeout});
        }
        await element.click({ timeout });
    } catch (error) {
        console.error(`Error al hacer clic en el elemento con texto: '${text}'. Detalles del error:`, error);
        throw error;
    }
};


// Clic a un elemento para luego escribir o hacer click a un botón.
export const clickElement = async (page, selector, timeout = 30000) => {
    try {
        await page.getByLabel(selector, {exact: true}).click({ timeout });
    } catch (error) {
        console.error(`Error al hacer clic en el elemento: '${selector}'. Detalles del error:`, error);
        throw error;
    }
};

// Escribe el texto en un elemento.
export const fillField = async (page, label, value) => {
    try {
        await page.getByLabel(label).fill(value);
    } catch (error) {
        console.error(`Error al llenar el campo: '${label}' con valor: '${value}'. Detalles del error:`, error);
        throw error;
    }
};

// Selecciona un elemento de una lista. 
export const selectOption = async (page, optionName, timeout = 30000) => {
    try {
        await page.getByRole('option', { name: optionName, exact: true }).click({ timeout });
    } catch (error) {
        console.error(`Error al seleccionar la opción: '${optionName}'. Detalles del error:`, error);
        throw error;
    }
};

// Escribe en un campo que ha sido seleccionado.
export const clickTextbox = async (page, textboxName, timeout = 30000) => {
    try {
        const textbox = page.getByRole('textbox', { name: textboxName, exact: true });
        if (await textbox.isVisible()) {
            await textbox.click({ timeout });
        } else {
            console.warn(`El textbox con nombre '${textboxName}' no es visible.`);
        }
    } catch (error) {
        console.error(`Error al hacer clic en el textbox: '${textboxName}'. Detalles del error:`, error);
        throw error;
    }
};

// Escribe en un campo de in elemento.
export const fillTextbox = async (page, textboxName, text, timeout = 30000) => {
    try {
        await page.getByRole('textbox', { name: textboxName, exact: true }).fill(text, { timeout });
    } catch (error) {
        console.error(`Error al llenar el textbox: '${textboxName}' con el texto '${text}'. Detalles del error:`, error);
        throw error;
    }
};


// Click en botones de Accept o Cancel
export const clickButtonAcceptCancel = async (page, buttonName, timeout = 30000) => {
    try {
        await page.getByRole('button', { name: buttonName, exact: true }).click({ timeout });
    } catch (error) {
        console.error(`Error al hacer clic en el botón: '${buttonName}'. Detalles del error:`, error);
        throw error;
    }
};

export const attachScreenshot = async (testInfo, screenshotName, page, contentType, timeout = 30000) => {
    try {
        await testInfo.attach(screenshotName, {
            body: await page.screenshot(),
            contentType: contentType
        }), timeout;
    } catch (error) {
        console.error(`Error al adjuntar la captura de pantalla: '${screenshotName}'. Detalles del error:`, error);
        throw error;
    }
};


// 3 constantes para la Justification Phrase (Justification Phrase, Credenciales, Accept)
export const justificationPhrase = async (page, timeout = 30000, testInfo) => {
    try {
        await test.step("Add Justification Phrase", async () => {
            let phraseBox = null;

            // Comprobar si el campo 'Justification Phrase' está visible
            await test.step("Check visibility of 'Justification Phrase'", async () => {
                const isVisible = await page.getByRole('textbox', { name: 'Justification Phrase' }).isVisible({ timeout }).catch(() => false);
                if (isVisible) {
                    phraseBox = 'Justification Phrase';
                }
            });

            // Si no se encontró 'Justification Phrase', comprobar '* Justification Phrase'
            if (!phraseBox) {
                await test.step("Check visibility of '* Justification Phrase'", async () => {
                    const isVisible = await page.getByRole('textbox', { name: '* Justification Phrase' }).isVisible({ timeout }).catch(() => false);
                    if (isVisible) {
                        phraseBox = '* Justification Phrase';
                    }
                });
            }

            // Si no se encontró ninguno, salir de la función
            if (!phraseBox) {
                console.log("Justification Phrase field not found or not visible within the timeout.");
                return;
            }

            await test.step("Attach screenshot before filling", async () => {
                await attachScreenshot(testInfo, "Empty Justification Phrase", page, ConfigSettingsAlternative.screenShotsContentType);
            });

            await test.step("Pause execution before clicking on the field", async () => {
                await page.pause();  // Pausa antes de la acción
            });

            await test.step(`Click on visible Justification Phrase field: ${phraseBox}`, async () => {
                await page.getByRole('textbox', { name: phraseBox }).click({ timeout });
            });

            await test.step("Pause after click", async () => {
                await page.pause();  // Pausa después del clic
            });

            await test.step("Fill Justification Phrase field", async () => {
                await page.getByRole('textbox', { name: phraseBox }).fill("Testing");
            });

            await test.step("Attach screenshot after filling", async () => {
                await attachScreenshot(testInfo, "Filled Justification Phrase", page, ConfigSettingsAlternative.screenShotsContentType);
            });

            await test.step("Pause execution after filling the field", async () => {
                await page.pause();  // Pausa después de llenar el campo
            });
        });
    } catch (error) {
        console.log("Error during Justification Phrase handling", error);
        throw error;
    }
};

export const fillUserCredentials = async (page, testInfo, timeout = 30000) => {
    const userCredentialSettings = {
        fldUser: { label: "User", value: "admin" },
        fldPss: { label: "Password", value: "trazit", actionName: "Enter" }
    };

    try {
        // Comprobar si el campo 'User' es visible
        const isUserVisible = await page.getByRole('textbox', { name: userCredentialSettings.fldUser.label }).isVisible({ timeout }).catch(() => false);
        
        if (isUserVisible) {
            await test.step("Start - Fill 'User' field", async () => {
                await test.step("Click on 'User' field", async () => {
                    await page.getByRole('textbox', { name: userCredentialSettings.fldUser.label }).click();
                    await page.pause(); // Pausa después de hacer clic
                });

                // await test.step("Attach screenshot before filling 'User'", async () => {
                //     await attachScreenshot(testInfo, "Before filling User field", page, ConfigSettingsAlternative.screenShotsContentType);
                // });

                await test.step("Fill in 'User' field", async () => {
                    await page.getByRole('textbox', { name: userCredentialSettings.fldUser.label }).fill(userCredentialSettings.fldUser.value);
                });
                
                // await test.step("Attach screenshot after filling 'User'", async () => {
                //     await attachScreenshot(testInfo, "Filled User field", page, ConfigSettingsAlternative.screenShotsContentType);
                // });
            });
        }

        // Comprobar si el campo 'Password' es visible
        const isPasswordVisible = await page.getByLabel(userCredentialSettings.fldPss.label).isVisible({ timeout }).catch(() => false);
        
        if (isPasswordVisible) {
            await test.step("Start - Fill 'Password' field", async () => {
                await test.step("Click on 'Password' field", async () => {
                    await page.getByLabel(userCredentialSettings.fldPss.label).click();
                    await page.pause(); // Pausa después de hacer clic
                });

                // await test.step("Attach screenshot before filling 'Password'", async () => {
                //     await attachScreenshot(testInfo, "Before filling Password field", page, ConfigSettingsAlternative.screenShotsContentType);
                // });

                await test.step("Fill in 'Password' field", async () => {
                    await page.getByLabel(userCredentialSettings.fldPss.label).fill(userCredentialSettings.fldPss.value);
                });

                // await test.step("Attach screenshot after filling 'Password'", async () => {
                //     await attachScreenshot(testInfo, "Filled Password field", page, ConfigSettingsAlternative.screenShotsContentType);
                // });
            });
        }

    } catch (error) {
        console.error("An unexpected error occurred while trying to fill user credentials:", error);
        throw error; 
    }
};


export const clickAcceptButton = async (page, timeout = 30000) => {
    try {
        await test.step("Check if 'Accept' button is visible", async () => {
            const isVisible = await page.getByRole('button', { name: 'Accept' }).isVisible({ timeout }).catch(() => false);
            
            if (isVisible) {
                await test.step("Click 'Accept' button", async () => {
                    await page.getByRole('button', { name: 'Accept' }).first().click({ timeout });
                });
            }
        });
    } catch (error) {
        throw error; 
    }
};

