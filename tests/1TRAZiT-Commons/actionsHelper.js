import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';


export const clickElementByText = async (page, text, timeout = 30000) => {
    try {
        let element = page.getByText(text, { exact: true });

        // Si el elemento no es visible, intentar hacer scroll para verlo
        if (!(await element.isVisible())) {
            await element.scrollIntoViewIfNeeded({ timeout });
        }

        // Intentar hacer clic en el primer elemento encontrado
        await element.click({ timeout });

    } catch (error) {
        console.log(`No se pudo hacer clic en el primer elemento con texto: '${text}'. Intentando con nth(1).`);

        try {
            // Intentar con el segundo elemento si el primero falla
            const elementNth = page.getByText(text, { exact: true }).nth(1);

            if (!(await elementNth.isVisible())) {
                await elementNth.scrollIntoViewIfNeeded({ timeout });
            }

            await elementNth.click({ timeout });

        } catch (nthError) {
            console.error(`Error al hacer clic en el segundo elemento con texto: '${text}'. Detalles del error:`, nthError);
            throw nthError; // Propagar el error si ambos intentos fallan
        }
    }
};


// Clic a un elemento para luego escribir o hacer click a un botón.
export const clickElement = async (page, selector, timeout = 30000) => {
    try {
        await page.getByLabel(selector, { exact: true }).click({ timeout });
    } catch (error) {
        console.log(`Primer intento fallido para hacer clic en el elemento: '${selector}'. Intentando con el primer elemento.`);
        try {
            await page.getByLabel(selector, { exact: true }).first().click({ timeout });
        } catch (secondError) {
            console.log(`Error al hacer clic en el primer elemento: '${selector}'. Detalles del error:`, secondError);
            throw secondError;
        }
    }
};


export const clickButtonById = async (page, id, timeout = 30000) => {
    try {
        // Usa getById para seleccionar el elemento por su id
        const element = page.locator(`#${id}`);

        // Espera a que el elemento esté visible y haz clic
        await element.dblclick({ timeout });
    } catch (error) {
        console.error(`Error al hacer clic en el elemento con id: '${id}'. Detalles del error:`, error);
        throw error;
    }
};


// Escribe el texto en un elemento.
export const fillField = async (page, label, value) => {
    try {
        //await page.getByLabel(label).fill(value);
        await page.getByLabel(label, { exact: true }).fill(value);
    } catch (error) {
        console.error(`Error al llenar el campo: '${label}' con valor: '${value}'. Detalles del error:`, error);
        throw error;
    }
};

// Selecciona un elemento de una lista. 
export const clickOption = async (page, optionName, timeout = 30000) => {
    try {
        const option = page.getByRole('option', { name: optionName, exact: true });
        if (await option.isVisible()) {
            await option.click({ timeout });
        } else {
            console.log(`La opción con nombre '${optionName}' no es visible.`);
        }
    } catch (error) {
        console.log(`Error al hacer clic en la opción: '${optionName}'. Detalles del error:`, error);
        throw error;
    }
};


// Escribe en un campo que ha sido seleccionado.
export const clickTextbox = async (page, textboxName, timeout = 30000) => {
    try {
        // Buscar el textbox con el nombre exacto proporcionado
        const textbox = page.getByRole('textbox', { name: textboxName, exact: true });

        // Comprobar si el textbox es visible
        if (await textbox.isVisible()) {
            // Hacer clic en el textbox
            await textbox.click({ timeout });
        } else {
            // Advertir si el textbox no es visible
            console.log(`El textbox con nombre '${textboxName}' no es visible.`);
        }
    } catch (error) {
        // Manejar errores al hacer clic en el textbox
        console.error(`Error al hacer clic en el textbox: '${textboxName}'. Detalles del error:`, error);
        throw error; // Vuelve a lanzar el error para manejarlo en un nivel superior
    }
};


// Escribe en un campo de in elemento.
export const fillTextbox = async (page, textboxName, text, timeout = 30000) => {
    try {
        await page.getByRole('textbox', { name: textboxName, exact: true }).fill(text, { timeout });
    } catch (error) {
        console.log(`Error al llenar el textbox: '${textboxName}' con el texto '${text}'. Detalles del error:`, error);
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

// export const attachScreenshot = async (testInfo, screenshotName, page, contentType, timeout = 30000) => {
//     try {
//         await testInfo.attach(screenshotName, {
//             body: await page.screenshot(),
//             contentType: contentType
//         }), timeout;
//     } catch (error) {
//         console.error(`Error al adjuntar la captura de pantalla: '${screenshotName}'. Detalles del error:`, error);
//         throw error;
//     }
// };
export const attachScreenshot = async (testInfo, screenshotName, page, contentType, timeout = 30000) => {
    if (process.env.NO_HTML_REPORT === 'true') {
        console.log(`Captura de pantalla omitida para ${screenshotName} porque NO_HTML_REPORT está activo.`);
    } else {
        // Aquí es donde se hace la captura de pantalla si NO_HTML_REPORT no está activo
        try {
            await testInfo.attach(screenshotName, {
                body: await page.screenshot(),
                contentType: contentType
            });
            console.log(`Captura de pantalla adjuntada: ${screenshotName}`);
        } catch (error) {
            console.error(`Error al adjuntar la captura de pantalla: '${screenshotName}'. Detalles del error:`, error);
            throw error;
        }
    }
};




// 3 constantes para la Justification Phrase (Justification Phrase, Credenciales, Accept)
export const justificationPhrase = async (page, timeout = 30000, testInfo) => {
    console.log("Intentando ejecutar justificationPhrase...")

    try {
        console.log("Intentando ejecutar justificationPhrase...")

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


export const fillUserField = async (page, testInfo, timeout = 30000) => {
    const userCredentialSettings = {
        fldUser: { label: "User", value: "admin" }
    };
    console.log("Intentando ejecutar fillUserField...")

    try {
        // Comprobar si el campo 'User' es visible
        const isUserVisible = await page.getByRole('textbox', { name: userCredentialSettings.fldUser.label }).isVisible({ timeout }).catch(() => false);
        console.log("Intentando ejecutar fillUserField...")
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

    } catch (error) {
        console.error("An unexpected error occurred while trying to fill the 'User' field:", error);
        throw error; 
    }
};

export const fillPasswordField = async (page, testInfo, timeout = 30000) => {
    const userCredentialSettings = {
        fldPss: { label: "Password", value: "trazit", id: "pwd" }
    };
    console.log("Intentando ejecutar fillPasswordField...")
    try {
        console.log("Intentando ejecutar fillPasswordField...")

        // Comprobar si el campo 'Password' es visible usando el id 'pwd'
        const isPasswordVisible = await page.locator(`#${userCredentialSettings.fldPss.id}`).isVisible({ timeout }).catch(() => false);
        
        if (isPasswordVisible) {
            await test.step("Start - Fill 'Password' field", async () => {
                await test.step("Click on 'Password' field", async () => {
                    // Hacer clic en el campo con el id 'pwd'
                    await page.locator(`#${userCredentialSettings.fldPss.id}`).click();
                    await page.pause(); // Pausa después de hacer clic para ver la acción en tiempo real (opcional)
                });

                // Esperar a que el campo interno de input esté disponible y luego rellenar
                await test.step("Fill in 'Password' field", async () => {
                    // Seleccionar el input interno y rellenarlo
                    const inputLocator = page.locator(`#${userCredentialSettings.fldPss.id} input[type="password"]`);
                    await inputLocator.fill(userCredentialSettings.fldPss.value);
                });

                // Pausa opcional después de rellenar el campo
                await test.step("Pause after filling 'Password'", async () => {
                    await page.pause();
                });
            });
        }

    } catch (error) {
        console.error("An unexpected error occurred while trying to fill the 'Password' field:", error);
        throw error; 
    }
};

let hasClicked = false;  // Variable para evitar clics repetidos

export const clickAcceptButton = async (page, timeout = 3000) => {
  if (hasClicked) {
    console.log("Button 'Accept' has already been clicked.");
    return;  // Salir si ya se hizo clic
  }

  try {
    await test.step("Check if 'Accept' button is visible", async () => {
      const acceptButton = page.getByRole('button', { name: 'Accept' });
      const isVisible = await acceptButton.isVisible({ timeout }).catch(() => false); // Manejo seguro si el botón no es visible

      if (isVisible) {
        await test.step("Click 'Accept' button using first element", async () => {
          try {
            // Intentar hacer clic en el primer botón
            await acceptButton.first().click({ timeout });
            hasClicked = true; // Marcar que ya se hizo clic
            console.log("Clicked 'Accept' button using first element.");
          } catch (error) {
            console.log("Failed to click 'Accept' button using first element. Trying nth(1)...");

            try {
              // Intentar hacer clic en nth(1) si el primer intento falla
              await acceptButton.nth(1).click({ timeout });
              hasClicked = true; // Marcar que ya se hizo clic
              console.log("Clicked 'Accept' button using nth(1).");
            } catch (error) {
              console.log("Failed to click 'Accept' button using nth(1). No further action will be taken.");
            }
          }
        });
      } else {
        console.log("No 'Accept' button is visible. Skipping the step.");
      }
    });
  } catch (error) {
    console.log("Error while attempting to click 'Accept' button:", error);
  }
};


export const clickDoButton = async (page, timeout = 10000) => {
    let hasClicked = false; // Variable local para rastrear si se ha hecho clic

    try {
        await test.step("Check if 'Do' button is visible", async () => {
            const DoButton = page.getByRole('button', { name: 'Do' });
            const isVisible = await DoButton.isVisible({ timeout }).catch(() => false);

            if (isVisible) {
                await test.step("Try clicking 'Do' button with multiple approaches", async () => {
                    const attempts = [
                        { method: 'first', action: () => DoButton.first().click({ timeout }) },
                        { method: 'nth(0)', action: () => DoButton.nth(0).click({ timeout }) },
                        { method: 'nth(1)', action: () => DoButton.nth(1).click({ timeout }) },
                        { method: 'nth(2)', action: () => DoButton.nth(2).click({ timeout }) }
                    ];

                    for (const attempt of attempts) {
                        if (hasClicked) break; // Salir si ya se hizo clic

                        try {
                            console.log(`Attempting to click 'Do' button using ${attempt.method}...`);
                            await attempt.action(); // Intentar la acción definida
                            hasClicked = true; // Marcar que se hizo clic
                            console.log(`Successfully clicked 'Do' button using ${attempt.method}.`);
                        } catch (error) {
                            console.log(`Failed to click 'Do' button using ${attempt.method}.`);
                        }
                    }

                    if (!hasClicked) {
                        console.log("All attempts to click 'Do' button failed.");
                        throw new Error("Unable to click 'Do' button after multiple attempts.");
                    }
                });
            } else {
                console.log("No 'Do' button is visible. Skipping the step.");
            }
        });
    } catch (error) {
        console.log("Error while attempting to click 'Do' button:", error);
        throw error; // Lanzar el error para que el test falle explícitamente
    }
};

