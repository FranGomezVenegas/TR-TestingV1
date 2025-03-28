import { test, expect } from '@playwright/test';
import { ConfigSettings, ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';


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
            console.log(`Error al hacer clic en el segundo elemento con texto: '${text}'. Detalles del error:`, nthError);
            throw nthError; // Propagar el error si ambos intentos fallan
        }
    }
};


export const clickElementByText1 = async (page, text, position = 0, timeout = 30000) => {
    try {
        let element = page.getByText(text, { exact: true }).nth(position);

        // Si el elemento no es visible, intentar hacer scroll para verlo
        if (!(await element.isVisible())) {
            await element.scrollIntoViewIfNeeded({ timeout });
        }

        // Intentar hacer doble clic en el elemento encontrado
        await element.dblclick({ timeout });

    } catch (error) {
        console.log(`Error al hacer clic en el elemento con texto: '${text}'. Intentando con '* ${text}'...`);

        try {
            let wildcardElement = page.getByText(`* ${text}`, { exact: true }).nth(position);

            if (!(await wildcardElement.isVisible())) {
                await wildcardElement.scrollIntoViewIfNeeded({ timeout });
            }

            await wildcardElement.dblclick({ timeout });

        } catch (secondError) {
            console.log(`Error también con '* ${text}'. Detalles:`, secondError);
            throw secondError; // Propagar el error final
        }
    }
};

// Clic Elemento
export const clickElement = async (page, selector, timeout = 350) => {
    try {
        await page.getByLabel(selector, { exact: true }).click({ timeout });
        return; // Si el clic tiene éxito, sale de la función
    } catch (error) {
        console.log(`Primer intento fallido para hacer clic en el elemento: '${selector}'. Intentando con el primer elemento.`);
        
        try {
            await page.getByLabel(selector, { exact: true }).first().click({ timeout });
            return; // Sale si tiene éxito
        } catch (error) {
            console.log(`Segundo intento fallido para hacer clic en el elemento: '${selector}'. Probando con nth(0).`);
            try {
                await page.getByLabel(selector).nth(0).click({ timeout });
            } catch (error) {
                console.log(`Detalles del error:`, error);
                throw error;
            }
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
        await page.getByLabel(label).fill(value);
        // await page.getByLabel(label, { exact: true }).first({timeout: 500}).fill(value);
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
            await option.click({ timeout, force: true });
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

export const dateTextBox = async (page, dateTextName, text, timeout = 30000) => {
    try {
        await page.getByPlaceholder(dateTextName, {exact: true}).fill(text, {timeout}); 
     
    } catch (error) {
        console.log(`Error al llenar el textbox: '${dateTextName}' con el texto '${text}'. Detalles del error:`, error);
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
    console.log("Intentando ejecutar justificationPhrase...");

    const possibleLabels = [
        "Justification Phrase",
        "Justification",
        "Justificación",
        "Frase de justificación"
    ];

    try {
        console.log("Buscando un campo visible con las posibles etiquetas...");

        let phraseBox = null;

        // Verificar cada etiqueta de manera progresiva, buscando también con y sin '*'
        for (const label of possibleLabels) {
            // Verificar la etiqueta sin '*'
            await test.step(`Check visibility of '${label}'`, async () => {
                const isVisible = await page.getByRole('textbox', { name: label }).isVisible({ timeout }).catch(() => false);
                if (isVisible) {
                    phraseBox = label; // Guardar la etiqueta encontrada
                    console.log(`Found visible field: '${label}'`);
                }
            });

            // Si no se encontró, buscar con '*'
            if (!phraseBox) {
                await test.step(`Check visibility of '* ${label}'`, async () => {
                    const isVisible = await page.getByRole('textbox', { name: `* ${label}` }).isVisible({ timeout }).catch(() => false);
                    if (isVisible) {
                        phraseBox = `* ${label}`; // Guardar la etiqueta con '*'
                        console.log(`Found visible field with '*': '* ${label}'`);
                    }
                });
            }

            if (phraseBox) break; // Salir del bucle si se encuentra un campo visible
        }

        // Si no se encontró ninguno, registrar y salir
        if (!phraseBox) {
            console.log("No visible Justification Phrase field found within the timeout.");
            return;
        }

        // Agregar pasos detallados para interactuar con el campo encontrado
        await test.step("Add Justification Phrase", async () => {
            // await test.step("Attach screenshot before filling", async () => {
            //     await attachScreenshot(testInfo, "Empty Justification Phrase", page, ConfigSettingsAlternative.screenShotsContentType);
            // });

            await test.step("Pause execution before clicking on the field", async () => {
                await page.pause();  // Pausa antes de la acción
            });

            await test.step(`Click on visible Justification Phrase field: '${phraseBox}'`, async () => {
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
        console.error("Error during Justification Phrase handling", error);
        throw error;
    }
};


export const esignRequired = async (page, timeout = 30000, testInfo) => {
    console.log("Intentando ejecutar esignRequired...");

    try {
        await test.step("Add Sign Field", async () => {
            let signField = null;

            // Comprobar si el campo 'Firma Electrónica' está visible
            await test.step("Check visibility of 'Firma Electrónica'", async () => {
                try {
                    const isVisible = await page.getByLabel('Firma Electrónica').isVisible({ timeout });
                    if (isVisible) {
                        signField = 'Firma Electrónica';
                        console.log("Campo 'Firma Electrónica' encontrado.");
                    } else {
                        console.log("'Firma Electrónica' no es visible.");
                    }
                } catch (error) {
                    console.log("Error al verificar visibilidad de 'Firma Electrónica':", error);
                }
            });

            // Si no se encontró 'Firma Electrónica', comprobar 'Electronic Signature'
            if (!signField) {
                await test.step("Check visibility of 'Electronic Signature'", async () => {
                    try {
                        const isVisible = await page.getByLabel('Electronic Signature').isVisible({ timeout });
                        if (isVisible) {
                            signField = 'Electronic Signature';
                            console.log("Campo 'Electronic Signature' encontrado.");
                        } else {
                            console.log("'Electronic Signature' no es visible.");
                        }
                    } catch (error) {
                        console.log("Error al verificar visibilidad de 'Electronic Signature':", error);
                    }
                });
            }

            // Si no se encontró ningún campo, salir de la función
            if (!signField) {
                console.log("No se encontró 'Firma Electrónica' ni 'Electronic Signature' dentro del tiempo especificado.");
                return;
            }

            // Capturar antes de interactuar
            // await test.step("Attach screenshot before interacting with Sign field", async () => {
            //     await attachScreenshot(testInfo, "Empty Sign Field", page, ConfigSettingsAlternative.screenShotsContentType);
            // });

            // Pausar para inspeccionar antes del clic
            await test.step("Pause execution before clicking on the Sign field", async () => {
                console.log(`Preparado para hacer clic en el campo: ${signField}`);
                await page.pause();
            });

            // Realizar clic en el campo
            await test.step(`Click on the Sign field: ${signField}`, async () => {
                try {
                    await page.getByLabel(signField).click({ timeout });
                    console.log(`Clic realizado en el campo: ${signField}`);
                } catch (error) {
                    console.log(`Error al hacer clic en el campo: ${signField}`, error);
                    throw error;
                }
            });

            // Pausar para inspeccionar después del clic
            await test.step("Pause after clicking on the Sign field", async () => {
                await page.pause();
            });

            // Llenar el campo
            await test.step("Fill the Sign field with test data", async () => {
                try {
                    await page.getByLabel(signField).fill("firmademo");
                    console.log(`Campo '${signField}' llenado correctamente.`);
                } catch (error) {
                    console.log(`Error al llenar el campo '${signField}':`, error);
                    throw error;
                }
            });

            // Capturar después de llenar
            await test.step("Attach screenshot after filling the Sign field", async () => {
                await attachScreenshot(testInfo, "Filled Sign Field", page, ConfigSettingsAlternative.screenShotsContentType);
            });

            // Pausar para inspeccionar después de llenar
            await test.step("Pause execution after filling the Sign field", async () => {
                await page.pause();
            });
        });
    } catch (error) {
        console.log("Error during Sign field handling:", error);
        throw error;
    }
};


export const fillUserField = async (page, testInfo, timeout = 30000) => {
    const userCredentialSettings = {
        fldUser: { label: "User", value: "admin" },
        fldUser2: { label: "Usuario", value: "admin" }
    };
    console.log("Intentando ejecutar fillUserField...");

    try {
        let visibleField = null;

        // Comprobar si el campo 'User' es visible
        await test.step("Check visibility of 'User' field", async () => {
            const isUserVisible = await page.getByRole('textbox', { name: userCredentialSettings.fldUser.label })
                .isVisible({ timeout })
                .catch(() => false);

            if (isUserVisible) {
                visibleField = userCredentialSettings.fldUser;
                console.log("'User' field is visible.");
            }
        });

        // Si no se encontró 'User', comprobar 'Usuario'
        if (!visibleField) {
            await test.step("Check visibility of 'Usuario' field", async () => {
                const isUser2Visible = await page.getByRole('textbox', { name: userCredentialSettings.fldUser2.label })
                    .isVisible({ timeout })
                    .catch(() => false);

                if (isUser2Visible) {
                    visibleField = userCredentialSettings.fldUser2;
                    console.log("'Usuario' field is visible.");
                }
            });
        }

        // Si no se encontró ninguno de los campos, salir de la función
        if (!visibleField) {
            console.log("Neither 'User' nor 'Usuario' fields are visible.");
            return;
        }

        // Interactuar con el campo visible
        await test.step(`Start - Fill '${visibleField.label}' field`, async () => {
            await test.step(`Click on '${visibleField.label}' field`, async () => {
                await page.getByRole('textbox', { name: visibleField.label }).click();
                await page.pause(); // Pausa después de hacer clic
            });

            await test.step(`Fill in '${visibleField.label}' field`, async () => {
                await page.getByRole('textbox', { name: visibleField.label }).fill(visibleField.value);
            });

            await test.step("Pause after filling the field", async () => {
                await page.pause(); // Pausa después de rellenar el campo
            });

            console.log(`Successfully filled the '${visibleField.label}' field.`);
        });

    } catch (error) {
        console.log("An unexpected error occurred while trying to fill the 'User' or 'Usuario' field:", error);
        throw error;
    }
};


export const fillPasswordField = async (page, testInfo, timeout = 30000) => {
    const userCredentialSettings = {
        fldPss: { label: "Password", value: "trazit", id: "pwd" },
        fldPss1: { label: "Contraseña", value: "trazit" } // No se usa ID para fldPss1
    };

    console.log("Intentando ejecutar fillPasswordField...");

    try {
        let visibleField = null;

        // Comprobar si el campo 'Password' es visible usando el id 'pwd'
        const isPasswordVisible = await page.locator(`#${userCredentialSettings.fldPss.id}`).isVisible({ timeout }).catch(() => false);
        if (isPasswordVisible) {
            visibleField = userCredentialSettings.fldPss;
            console.log("'Password' field with ID 'pwd' is visible.");
        }

        // Si no se encontró 'Password', comprobar 'Contraseña' usando el label
        if (!visibleField) {
            const isPassword1LabelVisible = await page.getByLabel(userCredentialSettings.fldPss1.label).isVisible({ timeout }).catch(() => false);
            if (isPassword1LabelVisible) {
                visibleField = userCredentialSettings.fldPss1;
                console.log("'Contraseña' field with label is visible.");
            }
        }

        // Si no se encontró ninguno de los campos, salir de la función
        if (!visibleField) {
            console.log("Neither 'Password' nor 'Contraseña' fields are visible.");
            return;
        }

        // Interactuar con el campo visible
        await test.step(`Start - Fill '${visibleField.label}' field`, async () => {
            await test.step(`Click on '${visibleField.label}' field`, async () => {
                const fieldLocator = visibleField.id ? page.locator(`#${visibleField.id}`) : page.getByLabel(visibleField.label);
                await fieldLocator.click();
                await page.pause(); // Pausa después de hacer clic para ver la acción en tiempo real (opcional)
            });

            await test.step(`Fill in '${visibleField.label}' field`, async () => {
                const inputLocator = visibleField.id
                    ? page.locator(`#${visibleField.id} input[type="password"]`)
                    : page.getByLabel(visibleField.label);
                await inputLocator.fill(visibleField.value);
            });

            await test.step("Pause after filling 'Password'", async () => {
                await page.pause(); // Pausa opcional después de rellenar el campo
            });

            console.log(`Successfully filled the '${visibleField.label}' field.`);
        });

    } catch (error) {
        console.error("An unexpected error occurred while trying to fill the 'Password' or 'Contraseña' field:", error);
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


export const clickDoButton = async (page, timeout = 3000) => {
    try {
        await test.step("Check if 'Do' button is visible", async () => {
            const DoButton = page.getByRole('button', { name: 'Do', exact: true });
            const isVisible = await DoButton.isVisible({ force: true, timeout }).catch(() => false);

            if (!isVisible) {
                console.log("No 'Do' button is visible. Skipping the step.");
                return; // Si no es visible, no hacer nada y salir de la función
            }

            // Solo se ejecuta si el botón es visible
            await test.step("Try clicking 'Do' button with multiple approaches", async () => {
                const attempts = [
                    { method: 'first', action: () => DoButton.first().click({ timeout }) },
                    { method: 'nth(0)', action: () => DoButton.nth(0).click({ timeout }) },
                    { method: 'nth(1)', action: () => DoButton.nth(1).click({ timeout }) },
                    { method: 'nth(2)', action: () => DoButton.nth(2).click({ timeout }) }
                ];

                for (const attempt of attempts) {
                    try {
                        console.log(`Attempting to click 'Do' button using ${attempt.method}...`);
                        await attempt.action(); // Intentar la acción definida
                        console.log(`Successfully clicked 'Do' button using ${attempt.method}.`);
                        return; // Si se hace clic correctamente, salir de la función
                    } catch (error) {
                        console.log(`Failed to click 'Do' button using ${attempt.method}.`);
                    }
                }

                // Si no se hizo clic después de todos los intentos
                console.log("All attempts to click 'Do' button failed.");
                // throw new Error("Unable to click 'Do' button after multiple attempts.");
                return;
            });
        });
        await page.waitForTimeout(1500);
    } catch (error) {
        console.log("Error while attempting to click 'Do' button:", error);
        throw error; // Lanzar el error para que el test falle explícitamente
    }
};

export async function clickDoButtonJustification(page) {
    try {
        // Target specifically the second 'Do' button using nth(1)
        const buttonLocator = page.locator('md-filled-button', { hasText: 'Do' }).nth(1);

        // Wait for the button to be visible
        const isVisible = await buttonLocator.isVisible({ timeout: 2000 })
            .catch(() => false);

        if (!isVisible) {
            console.log('Second "Do" button is not visible');
            return;
        }

        // Click the button
        await buttonLocator.click({
            timeout: 2000,
            force: true
        });
        await page.waitForTimeout(1500);
        console.log('Successfully clicked second "Do" button');
    } catch (error) {
        console.log('Failed to click second "Do" button:', error);
        // throw error;
    }
}

export async function clickDo_Button_Justification(page) {
    try {
        // Intentar hacer clic en el botón usando el atributo value
        const buttonLocator = page.locator('md-filled-button[value=""]');

        await buttonLocator.waitFor({
            state: 'visible',
            timeout: 1000
        });

        await buttonLocator.click({
            timeout: 2000,
            force: true
        });

        console.log('Successfully clicked the "Do" button using [value=""]');
        await page.waitForTimeout(1500);
    } catch (error) {
        console.log('Failed to click using [value=""], trying with hasText "Do"');

        try {
            // Intentar hacer clic en el botón que contiene el texto "Do"
            const buttonByText = page.locator('md-filled-button', { hasText: 'Do' });

            await buttonByText.waitFor({
                state: 'visible',
                timeout: 1000
            });

            await buttonByText.click({
                timeout: 2000,
                force: true
            });

            console.log('Successfully clicked the "Do" button using hasText "Do"');
            await page.waitForTimeout(1500);
        } catch (finalError) {
            console.log('Failed to click the "Do" button:', finalError);
        }
    }
}




export const clickDoButtonUserDialog = async (page, timeout = 3000) => {
    try {
        await test.step("Check if 'Do' button is visible", async () => {
            const DoButton =page.locator('#user-dialog').getByRole('button', { name: 'Do' });

            const isVisible = await DoButton.isVisible({ force: true, timeout }).catch(() => false);

            if (!isVisible) {
                console.log("No 'Do' button is visible. Skipping the step.");
                return; // Si no es visible, no hacer nada y salir de la función
            }

            // Solo se ejecuta si el botón es visible
            await test.step("Try clicking 'Do' button with multiple approaches", async () => {
                const attempts = [
                    { method: 'nth(0)', action: () => DoButton.nth(1).click({ timeout }) },
                    { method: 'nth(1)', action: () => DoButton.nth(2).click({ timeout }) },
                    { method: 'nth(2)', action: () => DoButton.nth(0).click({ timeout }) }
                ];

                for (const attempt of attempts) {
                    try {
                        console.log(`Attempting to click 'Do' button using ${attempt.method}...`);
                        await attempt.action(); // Intentar la acción definida
                        console.log(`Successfully clicked 'Do' button using ${attempt.method}.`);
                        return; // Si se hace clic correctamente, salir de la función
                    } catch (error) {
                        console.log(`Failed to click 'Do' button using ${attempt.method}.`);
                    }
                }

                // Si no se hizo clic después de todos los intentos
                console.log("All attempts to click 'Do' button failed.");
                // throw new Error("Unable to click 'Do' button after multiple attempts.");
                return;
            });
        });
        await page.waitForTimeout(100);
    } catch (error) {
        console.log("Error while attempting to click 'Do' button:", error);
        throw error; // Lanzar el error para que el test falle explícitamente
    }
};


export async function clickConfirmDialogButton(page) {
    try {
        // Localizar el botón "Do" dentro del diálogo de confirmación
        const buttonLocator = page.locator('#confirm-dialog').getByRole('button', { name: 'Do' });

        // Verificar si el botón es visible
        const isButtonVisible = await buttonLocator.isVisible({ timeout: 1000 });

        if (!isButtonVisible) {
            console.log('The "Do" button in the confirm dialog is not visible. Exiting function.');
            return;
        }

        // Hacer clic en el botón
        await buttonLocator.click({
            timeout: 1000,
            force: true
        });

        console.log('Successfully clicked the "Do" button in the confirm dialog.');
        await page.waitForTimeout(1500);
    } catch (error) {
        console.error('Error while trying to click the "Do" button in the confirm dialog:', error);
        throw error;
    }
}

export async function clickJustificationButton(page) {
    try {
        // Localizar el botón "Do" dentro del diálogo de confirmación
        const buttonLocator =  page.locator('#justification-dialog').getByRole('button', { name: 'Do' });

        // Verificar si el botón es visible
        const isButtonVisible = await buttonLocator.isVisible({ timeout: 1000 });

        if (!isButtonVisible) {
            console.log('The "Do" button in the confirm dialog is not visible. Exiting function.');
            return;
        }

        // Hacer clic en el botón
        await buttonLocator.click({
            timeout: 1000,
            force: true
        });

        console.log('Successfully clicked the "Do" button in the confirm dialog.');
        await page.waitForTimeout(1500);
    } catch (error) {
        console.error('Error while trying to click the "Do" button in the confirm dialog:', error);
        throw error;
    }
}

export const saveButton = async (page, label, position, timeout = 3000) => {
    await test.step(`Clicking the "${label}" button at position ${position}`, async () => {
        try {        
            const save = await page.getByText(label);

            if (!save || (await save.count()) === 0) {  
                console.log(`Button with label "${label}" is not available. Continuing...`);
                return; 
            }

            if (save.nth(position)) {
                await save.nth(position).click({timeout});
            }
        } catch (error) {
            console.log(`Error clicking the button: ${error.message}`);
        }
    });
};


export async function clickButton(page, buttonNameLabel) {
    try {
        // Espero que sea visible el botón.
        const button = await page.getByRole('button', { name: buttonNameLabel, exact: true });        
        // Verifico su visibilidad.
        const isVisible = await button.isVisible();
        if (isVisible) {
            // Si el botón es visible, hago clic
            await button.click();
            console.log(`✅ El botón '${buttonNameLabel}' fue clickeado correctamente.`);
        } else {
            // Si el botón no es visible, salgo de la función
            console.log(`⚠️ El botón '${buttonNameLabel}' no es visible, saliendo de la función.`);
            return;
        }
    } catch (error) {
        // Manejo de error si no se encuentra el botón o algo falla
        console.error(`❌ Error al intentar hacer clic en el botón '${buttonNameLabel}':`, error.message);
    }
}


