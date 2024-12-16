import { clickElementByText1, dateTextBox, clickElement, clickElementByText,fillField, clickTextbox, fillTextbox, clickOption, attachScreenshot } from '../1TRAZiT-Commons/actionsHelper';
import { test, expect } from '@playwright/test';

// Main function for processing test data
export const processTestData = async (page, consoleData, testDataGame) => {
    const testData = JSON.parse(testDataGame);

    const processFields = async (fieldType) => {
        const fieldsToProcess = Object.keys(testData)
            .filter(key => key.startsWith(fieldType))
            .map(key => testData[key]);

        for (const field of fieldsToProcess) {
            if (field.label) {
                try {
                    await test.step(`Processing field of type: ${fieldType}`, async () => {
                        switch (fieldType) {
                            case 'text':
                                await processTextField(page, consoleData, field);
                                break;
                            case 'list':
                                await processListField(page, consoleData, testDataGame, field);
                                break;
                            case 'date':
                                await processDateField(page, consoleData, field);
                                break;
                            case 'checkbox':
                                await processCheckboxField(page, field);
                                break;
                            case 'multilist':  
                                await processMultiListField(page, field);
                                break;
                            case 'datetime':  
                                await processDateTimeField(page, field);
                                break;
                            case 'tree':  
                                await processTreeField(page, field);
                                break;
                        }
                        console.log(`Processed field ${fieldType}: ${field.label}`);
                    });
                } catch (error) {
                    console.log(`Error processing field ${fieldType}: ${field.label}`, error);
                }
            }
        }
    };

    // Sequential processing of field types to reduce blocking
    await test.step("Processing text fields", async () => {
        await processFields('text');
    });
    await test.step("Processing tree fields", async () => {
        await processFields('tree');
    });
    await test.step("Processing list fields", async () => {
        await processFields('list');
    });
    await test.step("Processing date fields", async () => {
        await processFields('date');
    });
    await test.step("Processing checkbox fields", async () => {
        await processFields('checkbox');
    });
    await test.step("Processing multi-list fields", async () => {
        await processFields('multilist');
    });
    await test.step("Processing datetime fields", async () => {
        await processFields('datetime');
    });
};






// Function to process text fields
export const processTextField = async (page, consoleData, textField, useTextBoxMethods = false) => {
    const searchAttempts = [
        textField.label,
        `* ${textField.label}`,
    ];

    for (const searchLabel of searchAttempts) {
        try {
            await test.step(`Trying to click on text field: ${searchLabel}`, async () => {
                if (useTextBoxMethods) {
                    // Usar las funciones de textbox
                    await clickTextbox(page, searchLabel, 550);
                    await fillTextbox(page, searchLabel, textField.value, 550);
                } else {
                    // Usar las funciones de elementos genéricos
                    await clickElement(page, searchLabel, 550);
                    await fillField(page, searchLabel, textField.value);
                }
                console.log(`Clicked and added text field: ${searchLabel}`);
            });
            return; // Exit function if processed successfully
        } catch (attemptError) {
            console.log(`Error processing text field: ${searchLabel}. Details:`, attemptError);
        }
    }

    // Flexible search as a last resort
    const matchingField = findMatchingField(consoleData, textField.label);
    if (matchingField) {
        const flexibleLabel = determineFlexibleLabel(matchingField);
        try {
            await test.step(`Using flexible label to click on text field: ${flexibleLabel}`, async () => {
                if (useTextBoxMethods) {
                    // Usar las funciones de textbox
                    await clickTextbox(page, flexibleLabel, 450);
                    await fillTextbox(page, flexibleLabel, textField.value, 450);
                } else {
                    // Usar las funciones de elementos genéricos
                    await clickElement(page, flexibleLabel, 450);
                    await fillField(page, flexibleLabel, textField.value);
                }
                console.log(`Clicked and added text field with flexible label: ${flexibleLabel}`);
            });
        } catch (flexibleError) {
            throw new Error(`Could not find text field: ${textField.label}`);
        }
    } else {
        throw new Error(`Could not find text field: ${textField.label}`);
    }
};


const globalProcessedLists = new Set();

export const processListField = async (page, consoleData, testDataGame, listField) => {
    const searchAttempts = [listField.label, `* ${listField.label}`];

    // Intentar buscar el campo de lista por las etiquetas proporcionadas
    for (const searchLabel of searchAttempts) {
        try {
            await test.step(`Trying to click on list field: ${searchLabel}`, async () => {
                await clickElement(page, searchLabel, 450);
                await clickOption(page, listField.option, 450);
                console.log(`Selected list field: ${searchLabel}`);
            });
            return;
        } catch (attemptError) {
            await clickOption(page, listField.option, 450);
            console.log(`Selected list field: ${searchLabel}`);
        }
    }

    // Intentar procesar las listas con un selector por ID, pero asegurándonos de no procesarlas más de una vez
    try {
        await test.step('Trying to click using ID selector pattern', async () => {
            await page.waitForTimeout(450);

            const parsedData = JSON.parse(testDataGame);
            const listFields = Object.keys(parsedData).filter(key => key.startsWith('list')); // Filtrar campos de listas

            for (const listKey of listFields) {
                // Verificar si esta lista ya fue procesada globalmente
                if (globalProcessedLists.has(listKey)) {
                    console.log(`Skipping already processed list: ${listKey}`);
                    return;
                }

                const listNumber = listKey.match(/\d+/)[0]; // Obtener el número de la lista
                const listSelector = `#list${listNumber} #label`; // Selector único para la lista
                const currentList = parsedData[listKey]; // Datos de la lista actual

                try {
                    // Procesar la lista si no fue procesada antes
                    await page.locator(listSelector).click({ timeout: 3000 });
                    await page.waitForTimeout(450);

                    const optionSelector = `${currentList.option}`; // Selector para la opción
                    await clickOption(page, optionSelector, 1000);
                    await page.pause(); // Pausa opcional para inspección

                    // Marcar la lista como procesada globalmente
                    globalProcessedLists.add(listKey);
                    await page.waitForTimeout(450);

                } catch (error) {
                    console.log(`Error in ${listKey}: ${error.message}`);
                }
            }
        });
    } catch (error) {
        console.log(`ID selector attempt failed: ${error.message}`);
    }

    // Si no se pudo encontrar el campo con los intentos previos, buscar coincidencias flexibles
    const matchingField = findMatchingField(consoleData, listField.label);
    if (matchingField) {
        try {
            const flexibleLabel = determineFlexibleLabel(matchingField);
            await clickElement(page, flexibleLabel, 450);
            await clickOption(page, listField.option, 450);
        } catch {
            throw new Error(`Could not find list field: ${listField.label}`);
        }
    }
};


export const processDateField = async (page, consoleData, dateField) => {
    const searchAttempts = [
        dateField.label,
        `* ${dateField.label}`,
    ];

    for (const searchLabel of searchAttempts) {
        try {
            await test.step(`Filling date field: ${searchLabel} (using fillTextbox)`, async () => {
                await fillTextbox(page, searchLabel, dateField.date, 450); // Primer intento
                console.log(`Successfully added date field: ${searchLabel}`);
            });
            return; // Si se llena correctamente, salir de la función
        } catch (attemptError) {
            console.log(`Error trying to fill date field with fillTextbox: '${searchLabel}'. Retrying with dateTextBox...`);
            try {
                // Segundo intento con dateTextBox
                await test.step(`Filling date field: ${searchLabel} (using dateTextBox)`, async () => {
                    await dateTextBox(page, searchLabel, dateField.date, 450);
                    console.log(`Successfully added date field using dateTextBox: ${searchLabel}`);
                });
                return; // Salir si se llena correctamente con el segundo método
            } catch (secondError) {
                console.log(`Error trying to fill date field with dateTextBox: '${searchLabel}'. Continuing to next attempt...`);
            }
        }
    }

    // Flexible search as a last resort
    const matchingField = findMatchingField(consoleData, dateField.label);
    if (matchingField) {
        const flexibleLabel = determineFlexibleLabel(matchingField);
        try {
            await test.step(`Filling date field with flexible label: ${flexibleLabel}`, async () => {
                await fillTextbox(page, flexibleLabel, dateField.date, 450); // Intento flexible con fillTextbox
                console.log(`Successfully added date field with flexible label: ${flexibleLabel}`);
            });
        } catch (flexibleError) {
            console.log(`Error filling date field with flexible label: '${flexibleLabel}'. Retrying with dateTextBox...`);
            await test.step(`Filling date field with flexible label (using dateTextBox): ${flexibleLabel}`, async () => {
                await dateTextBox(page, flexibleLabel, dateField.date, 450); // Intento flexible con dateTextBox
                console.log(`Successfully added date field with flexible label using dateTextBox: ${flexibleLabel}`);
            });
        }
    } else {
        throw new Error(`Could not find date field: ${dateField.label}`);
    }
};

// New function to process checkbox fields
export const processCheckboxField = async (page, checkboxField) => {
    const checkboxLabel = checkboxField.label;

    // Find the checkbox element
    const checkbox = await page.getByLabel(checkboxLabel);

    if (checkboxField.boolean === true) {
        if (!(await checkbox.isChecked())) {
            // Check the checkbox if it is not already checked
            await test.step(`Checking checkbox: ${checkboxLabel}`, async () => {
                await checkbox.check({ timeout: 15000 });
                console.log(`Checked checkbox: ${checkboxLabel}`);
            });
        }
    } else if (checkboxField.boolean === false) {
        if (await checkbox.isChecked()) {
            // Uncheck the checkbox if it is checked
            await test.step(`Unchecking checkbox: ${checkboxLabel}`, async () => {
                await checkbox.uncheck({ timeout: 15000 });
                console.log(`Unchecked checkbox: ${checkboxLabel}`);
            });
        }
    }
    await page.waitForTimeout(1000);
};

export const processMultiListField = async (page, multiListField) => {
    const searchAttempts = [
        multiListField.label,
        `* ${multiListField.label}`,
    ];

    let processedAny = false; // Bandera para rastrear si al menos un intento fue exitoso

    for (const searchLabel of searchAttempts) {
        try {
            await test.step(`Trying to click on multi-list field: ${searchLabel}`, async () => {
                // Intentar hacer clic en el multi-list usando el texto del label
                await clickElementByText(page, searchLabel, 450);

                // Loop para seleccionar todas las opciones disponibles en el multi-list
                for (const option of multiListField.options) {
                    try {
                        await page.locator(`#${multiListField.id}`).getByText(option, { exact: true }).click({ timeout: 3000 });
                        console.log(`Selected option in multi-list: ${option}`);
                    } catch (optionError) {
                        console.log(`Option not found or already selected: ${option}. Skipping.`);
                    }
                }

                // Cerrar el multi-list
                try {
                    await page.getByText('arrow_drop_down').click({ timeout: 3000 });
                    console.log(`Closed multi-list field: ${searchLabel}`);
                } catch (closeError) {
                    console.log(`Failed to close multi-list field: ${searchLabel}. It might already be closed.`);
                }

                processedAny = true; // Marcar como procesado al menos una vez
            });
        } catch (attemptError) {
            console.log(`Error processing multi-list field: ${searchLabel}. Details:`, attemptError);
        }
        await page.waitForTimeout(1000); // Pausa entre intentos
    }

    // Método alternativo si no se procesó nada en los intentos anteriores
    if (!processedAny) {
        try {
            await test.step(`Using fallback method for multi-list field with label: ${multiListField.label}`, async () => {
                // Usar directamente el label para encontrar el elemento
                await page.locator(`#${multiListField.id}`).getByText(multiListField.label, { exact: true }).click();
                console.log(`Clicked multi-list field using label: ${multiListField.label}`);

                // Seleccionar todas las opciones
                for (const option of multiListField.options) {
                    try {
                        await page.locator(`#${multiListField.id}`).getByText(option, { exact: true }).click();
                        console.log(`Selected option in multi-list using fallback method: ${option}`);
                    } catch (optionError) {
                        console.log(`Option not found or already selected in fallback: ${option}. Skipping.`);
                    }
                }

                // Cerrar el multi-list
                try {
                    await page.getByText('arrow_drop_down').click();
                    console.log(`Closed multi-list field using fallback method: ${multiListField.label}`);
                } catch (closeError) {
                    console.log(`Failed to close multi-list field using fallback method: ${multiListField.label}. It might already be closed.`);
                }
            });
        } catch (fallbackError) {
            console.log(`Fallback method failed for multi-list field with label: ${multiListField.label}. Details:`, fallbackError);
            throw new Error(`Could not process multi-list field: ${multiListField.label}`);
        }
    }
};


export const processDateTimeField = async (page, dateTimeField) => {
    // await page.locator('#datetime1').click();
    // await page.locator('#datetime1').fill('2024-11-08T23:26');

    // Generate ID automatically based on the label, removing spaces and special characters
    const fieldId = `#${cleanString(dateTimeField.label).replace(/\s+/g, '').replace(/[^\w\s]/gi, '')}`;

    // Try multiple search attempts to locate the field by label
    const searchAttempts = [
        dateTimeField.label,
        `* ${dateTimeField.label}`,
    ];

    for (const searchLabel of searchAttempts) {
        try {
            await test.step(`Filling datetime field: ${searchLabel}`, async () => {
                await page.locator(fieldId).click();
                await page.locator(fieldId).fill(dateTimeField.datetime); // Fill with date-time format, e.g., '2024-11-08T23:26'
                console.log(`Added datetime field: ${searchLabel}`);
            });
            return; // Exit function if processed successfully
        } catch (attemptError) {
            console.log(`Error processing datetime field: ${searchLabel}. Details:`, attemptError);
        }
    }

    // Flexible search as a last resort
    const matchingField = findMatchingField(consoleData, dateTimeField.label);
    if (matchingField) {
        const flexibleLabel = determineFlexibleLabel(matchingField);
        const flexibleId = `#${cleanString(flexibleLabel).replace(/\s+/g, '').replace(/[^\w\s]/gi, '')}`;
        
        await test.step(`Filling datetime field with flexible label: ${flexibleLabel}`, async () => {
            await page.locator(flexibleId).click();
            await page.locator(flexibleId).fill(dateTimeField.datetime);
            console.log(`Added datetime field with flexible label: ${flexibleLabel}`);
        });
    } else {
        throw new Error(`Could not find datetime field: ${dateTimeField.label}`);
    }
};


// Función para procesar el campo "tree" (árbol)
export const processTreeField = async (page, treeField) => {
    try {
        // Iniciar el proceso de selección en el árbol
        await test.step(`Processing tree field: ${treeField.label}`, async () => {
            // Primero, haz clic en el elemento para desplegar el árbol (por ejemplo, 'Select an item')
            // Select an item
            await clickElementByText1(page, treeField.label, 0, 3000); // Hacer clic en el primer elemento
            await page.waitForTimeout(400);


            // Luego, seleccionamos el ítem específico dentro del árbol, la opción.
            const itemText = treeField.option;  // 'option' es el texto que buscamos
            const itemPosition = treeField.position || 0;  // Si no se pasa la posición, cogemos la primera
            await clickElementByText1(page, itemText, itemPosition, 3000);
            await page.waitForTimeout(1000);
            

            console.log(`Processed tree field: ${treeField.label}`);
        });
    } catch (error) {
        console.log(`Error processing tree field: ${treeField.label}. Details:`, error);
        throw new Error(`Could not process tree field: ${treeField.label}`);
    }
};

    
// Function to find a matching field
const findMatchingField = (consoleData, label) => {
    return consoleData.find(field => {
        const fieldData = Object.values(field)[0];
        const consoleLabel = fieldData?.label_es || 
                             fieldData?.label_en || 
                             fieldData?.label;
        
        return consoleLabel && cleanString(consoleLabel) === cleanString(label);
    });
};

// Function to determine the flexible label
const determineFlexibleLabel = (matchingField) => {
    const fieldData = Object.values(matchingField)[0];
    const labels = [
        fieldData?.label_es, 
        fieldData?.label_en, 
        fieldData?.label,
        `* ${fieldData?.label_es}`,
        `* ${fieldData?.label_en}`,
        `* ${fieldData?.label}`
    ].filter(Boolean);

    return labels[0];
};

// Utility to clean strings
export const cleanString = (str) => {
    return str.toLowerCase()
              .trim()
              .replace(/\s+/g, ' ')
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '');
};
