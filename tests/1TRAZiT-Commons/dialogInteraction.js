import { clickElementByText1, dateTextBox, clickElement, clickElementByText,fillField, clickTextbox, fillTextbox, clickOption, attachScreenshot } from '../1TRAZiT-Commons/actionsHelper';
import { test, expect } from '@playwright/test';

// Main function for processing test data
export const processTestData = async (page, consoleData, testDataGame) => {
    const testData = JSON.parse(testDataGame);

    const processFields = async (fieldType) => {
        if (fieldType === 'checkbox') {
            await processCheckboxField(page, testDataGame);
            return;
        }
        if (fieldType === 'select') {
            await processSelectFields(page, testDataGame);
            return;
        }
        if (fieldType === 'input') {
            await processInputFields(page, testDataGame);
            return;
        }
        
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
                                await processCheckboxField(page, testDataGame, checkboxField);
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

    await test.step("Processing list fields", async () => {
        await processFields('list');
    });
    // Sequential processing of field types to reduce blocking
    await test.step("Processing text fields", async () => {
        await processFields('text');
    });
    await test.step("Processing tree fields", async () => {
        await processFields('tree');
    });
    // await test.step("Processing list fields", async () => {
    //     await processFields('list');
    // });
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
    await test.step("Processing select fields", async () => {
        await processFields('select');
    });
    await test.step("Processing input fields", async () => {
        await processFields('input');
    });
};



const globalProcessedLists = new Set();

export const processListField = async (page, consoleData, testDataGame, listField) => {
    const searchAttempts = [listField.label, `* ${listField.label}`];

    for (const searchLabel of searchAttempts) {
        try {
            await test.step(`Trying to click on list field: ${searchLabel}`, async () => {
                await clickElement(page, searchLabel, 50);
                await clickOption(page, listField.option, 50);
                console.log(`Selected list field: ${searchLabel}`);
            });
            return;
        } catch (attemptError) {
            await clickOption(page, listField.option, 50);
            console.log(`Selected list field: ${searchLabel}`);
        }
    }

    try {
        await test.step('Trying to click using ID selector pattern', async () => {
            await page.waitForTimeout(50);

            const parsedData = JSON.parse(testDataGame);
            const listFields = Object.keys(parsedData).filter(key => key.startsWith('list'));

            for (const listKey of listFields) {
                if (globalProcessedLists.has(listKey)) {
                    console.log(`Skipping already processed list: ${listKey}`);
                    continue;
                }

                const listNumberMatch = listKey.match(/list(\d+)/i);
                if (!listNumberMatch) {
                    console.log(`Could not extract list number for ${listKey}`);
                    continue;
                }

                const listNumber = listNumberMatch[1];

                // Prueba diferentes selectores en orden de prioridad
                const possibleSelectors = [
                    `#list${listNumber} #label`,
                    `#list${listNumber}SelectedRow #label`,
                    `#listLinked${listNumber} #label`,
                    `#listLinked${listNumber}SelectedRow #label`,
                    `#mAdd #label`
                ];

                let listSelector = null;

                for (const selector of possibleSelectors) {
                    if (await page.locator(selector).isVisible()) {
                        listSelector = selector;
                        break;
                    }
                }

                if (!listSelector) {
                    console.log(`No valid selector found for ${listKey}`);
                    continue;
                }

                try {
                    await test.step(`Processing list: ${listKey}`, async () => {
                        console.log(`Attempting to click list: ${listSelector}`);
                        await page.locator(listSelector).click({ timeout: 500 });
                        await page.waitForTimeout(500);

                        const optionSelector = parsedData[listKey]?.option;
                        if (!optionSelector) {
                            throw new Error(`Option not defined for list: ${listKey}`);
                        }

                        console.log(`Selecting option: ${optionSelector}`);
                        await clickOption(page, optionSelector, 500);

                        globalProcessedLists.add(listKey);
                        console.log(`Processed list: ${listKey}`);
                        await page.waitForTimeout(50);
                    });
                } catch (error) {
                    console.log(`Error processing ${listKey}: ${error.message}`);
                }
            }
        });
    } catch (error) {
        console.log(`ID selector attempt failed: ${error.message}`);
    }

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



// const processedTextFields = new Set(); // Guarda los campos ya procesados

// export const processTextField = async (page, consoleData, textField, useTextBoxMethods = false) => {
//     console.log(`🔄 Intentando procesar: ${textField.label}`);

//     // Si ya procesamos este campo, salimos
//     if (processedTextFields.has(textField.label)) {
//         console.log(`⏭️  Campo ${textField.label} ya fue procesado, omitiendo.`);
//         return;
//     }

//     const searchAttempts = [
//         textField.label,
//         `* ${textField.label}`,
//     ];

//     let processed = false;

//     await page.waitForTimeout(200); // Pausa inicial

//     for (const searchLabel of searchAttempts) {
//         if (processed) break;

//         try {
//             console.log(`🎯 Intentando con etiqueta: ${searchLabel}`);

//             if (useTextBoxMethods) {
//                 console.log("📝 Usando método de TextBox");
//                 await clickTextbox(page, searchLabel, 550);
//                 await fillTextbox(page, searchLabel, textField.value, 550);
//             } else {
//                 console.log("📝 Usando método de Elemento Genérico");
//                 await clickElement(page, searchLabel, 550);
//                 await fillField(page, searchLabel, textField.value);
//             }

//             console.log(`✅ Campo procesado correctamente: ${searchLabel}`);
//             processed = true;
//             processedTextFields.add(textField.label); // Guardamos el campo como procesado
//             break;
//         } catch (attemptError) {
//             console.log(`❌ Error con ${searchLabel}, probando siguiente...`);
//         }
//     }

//     if (!processed) {
//         // Flexible search como última opción
//         const matchingField = findMatchingField(consoleData, textField.label);
//         if (matchingField) {
//             const flexibleLabel = determineFlexibleLabel(matchingField);
//             try {
//                 console.log(`🔍 Usando búsqueda flexible: ${flexibleLabel}`);

//                 if (useTextBoxMethods) {
//                     await clickTextbox(page, flexibleLabel, 450);
//                     await fillTextbox(page, flexibleLabel, textField.value, 450);
//                 } else {
//                     await clickElement(page, flexibleLabel, 450);
//                     await fillField(page, flexibleLabel, textField.value);
//                 }

//                 console.log(`✅ Campo procesado con búsqueda flexible: ${flexibleLabel}`);
//                 processedTextFields.add(textField.label); // Guardamos el campo como procesado
//             } catch (flexibleError) {
//                 throw new Error(`❌ No se encontró el campo: ${textField.label}`);
//             }
//         } else {
//             throw new Error(`❌ No se encontró el campo: ${textField.label}`);
//         }
//     }
// };
// Function to process text fields

export const processTextField = async (page, consoleData, textField, useTextBoxMethods = false) => {
    const processedTextFields = new Set(); // Almacena los campos ya procesados
    const searchAttempts = [
        textField.label,
        `* ${textField.label}`,
    ];

    await test.step(`Pauses`, async () => {
        await page.waitForTimeout(200);
    });

    for (const searchLabel of searchAttempts) {
        if (processedTextFields.has(searchLabel)) {
            console.log(`Skipping already processed text field: ${searchLabel}`);
            return; // Si ya se procesó, no lo intenta de nuevo
        }

        try {
            await test.step(`Trying to click on text field: ${searchLabel}`, async () => {
                if (useTextBoxMethods) {
                    await clickTextbox(page, searchLabel, 550);
                    await fillTextbox(page, searchLabel, textField.value, 550);
                } else {
                    await clickElement(page, searchLabel, 550);
                    await fillField(page, searchLabel, textField.value);
                }
                console.log(`Clicked and added text field: ${searchLabel}`);
                processedTextFields.add(searchLabel); // Guarda el campo como procesado
            });
            return; // Sale de la función si tuvo éxito
        } catch (attemptError) {
            console.log(`Error processing text field: ${searchLabel}. Details:`, attemptError);
        }
    }

    // Búsqueda flexible como último recurso
    const matchingField = findMatchingField(consoleData, textField.label);
    if (matchingField) {
        const flexibleLabel = determineFlexibleLabel(matchingField);

        if (processedTextFields.has(flexibleLabel)) {
            console.log(`Skipping already processed flexible label: ${flexibleLabel}`);
            return;
        }

        try {
            await test.step(`Using flexible label to click on text field: ${flexibleLabel}`, async () => {
                if (useTextBoxMethods) {
                    await clickTextbox(page, flexibleLabel, 450);
                    await fillTextbox(page, flexibleLabel, textField.value, 450);
                } else {
                    await clickElement(page, flexibleLabel, 450);
                    await fillField(page, flexibleLabel, textField.value);
                }
                console.log(`Clicked and added text field with flexible label: ${flexibleLabel}`);
                processedTextFields.add(flexibleLabel);
            });
        } catch (flexibleError) {
            throw new Error(`Could not find text field: ${textField.label}`);
        }
    } else {
        throw new Error(`Could not find text field: ${textField.label}`);
    }
};

// Date
const processedDateField = new Set();
export const processDateField = async (page, consoleData, dateField) => {
    const searchAttempts = [
        dateField.label,
        `* ${dateField.label}`,
    ];

    // Comprobar si el campo ya ha sido procesado
    if (processedDateField.has(dateField.label)) {
        console.log(`El campo de fecha '${dateField.label}' ya ha sido procesado. Saltando...`);
        return; // Si ya se ha procesado, no hacer nada más
    }

    for (const searchLabel of searchAttempts) {
        try {
            await test.step(`Filling date field: ${searchLabel} (using fillTextbox)`, async () => {
                await fillTextbox(page, searchLabel, dateField.date, 450); // Primer intento
                console.log(`Successfully added date field: ${searchLabel}`);
                processedDateField.add(dateField.label); // Marcar como procesado
            });
            return; // Si se llena correctamente, salir de la función
        } catch (attemptError) {
            console.log(`Error trying to fill date field with fillTextbox: '${searchLabel}'. Retrying with dateTextBox...`);
            try {
                // Segundo intento con dateTextBox
                await test.step(`Filling date field: ${searchLabel} (using dateTextBox)`, async () => {
                    await dateTextBox(page, searchLabel, dateField.date, 450);
                    console.log(`Successfully added date field using dateTextBox: ${searchLabel}`);
                    processedDateField.add(dateField.label); // Marcar como procesado
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
                processedDateField.add(dateField.label); // Marcar como procesado
            });
        } catch (flexibleError) {
            console.log(`Error filling date field with flexible label: '${flexibleLabel}'. Retrying with dateTextBox...`);
            await test.step(`Filling date field with flexible label (using dateTextBox): ${flexibleLabel}`, async () => {
                await dateTextBox(page, flexibleLabel, dateField.date, 450); // Intento flexible con dateTextBox
                console.log(`Successfully added date field with flexible label using dateTextBox: ${flexibleLabel}`);
                processedDateField.add(dateField.label); // Marcar como procesado
            });
        }
    } else {
        throw new Error(`Could not find date field: ${dateField.label}`);
    }
};

const globalProcessedCheckboxes = new Set();
export const processCheckboxField = async (page, testDataGame) => {
    try {
        await test.step('Procesando checkboxes', async () => {
            const parsedData = typeof testDataGame === 'string' ? JSON.parse(testDataGame) : testDataGame;
            
            const checkboxFields = Object.entries(parsedData)
                .filter(([key]) => key.startsWith('checkbox'))
                .map(([key, field]) => ({ key, ...field }));

            for (const field of checkboxFields) {
                if (globalProcessedCheckboxes.has(field.key)) continue;

                const selector = `#${field.key} #input`;
                const checkbox = page.locator(selector);

                if (await checkbox.isVisible()) {
                    try {
                        if (field.boolean) {
                            await checkbox.check({ timeout: 500 });
                        } else {
                            await checkbox.uncheck({ timeout: 500 });
                        }
                        await page.waitForTimeout(50);
                        globalProcessedCheckboxes.add(field.key);
                    } catch (error) {
                        console.error(`Error en checkbox ${field.key}: ${error.message}`);
                    }
                }
            }
        });
    } catch (error) {
        console.error(`Error general: ${error.message}`);
    }
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
            await clickElementByText1(page, treeField.label, 0, 1000); // Hacer clic en el primer elemento
            await page.waitForTimeout(400);

            // Luego, seleccionamos el ítem específico dentro del árbol, la opción.
            const itemText = treeField.option;  // 'option' es el texto que buscamos
            const itemPosition = treeField.position || 0;  // Si no se pasa la posición, cogemos la primera
            await clickElementByText1(page, itemText, itemPosition, 1000);
            await page.waitForTimeout(1000);
            
            console.log(`Processed tree field: ${treeField.label}`);
        });
    } catch (error) {
        const itemText = treeField.option;  
        const itemPosition = treeField.position || 0;
        // await page.locator(itemText).nth(itemPosition).click(3000);
        await page.getByText(`* ${treeField.label}`).nth(treeField.positionLabel).click(1000);
        await page.locator(itemText).nth(itemPosition).click(1000);
        console.log(`Error processing tree field: ${treeField.label}. Details:`, error);
        throw new Error(`Could not process tree field: ${treeField.label}`);
    }
};


export const processSelectFields = async (page, testDataGame, selectField = null) => {
    const testData = typeof testDataGame === 'string' ? JSON.parse(testDataGame) : testDataGame;

    if (selectField && selectField.label) {
        // Si tenemos un campo select específico, procesa solo ese
        try {
            const selector = `#${selectField.key}`;
            if (await page.locator(selector).isVisible()) {
                console.log(`Procesando campo select con id: ${selectField.key}`);
                await page.locator(selector).click();
                await page.selectOption(selector, { value: selectField.value.toString() });
                await page.waitForTimeout(50); // Pequeña espera para evitar errores de sincronización
            } else {
                console.error(`El campo select con id ${selectField.key} no es visible.`);
            }
        } catch (error) {
            console.error(`Error en select ${selectField.key}: ${error.message}`);
        }
    } else {
        // Procesa todos los campos select
        try {
            // const selectFields = Object.entries(testData)
            //     .filter(([key]) => key.startsWith('select'))
            //     .map(([key, field]) => ({ key, ...field }));
            const selectFields = Object.entries(testData)
                .filter(([key]) => /^select\d+$/.test(key)) 
                .map(([key, field]) => ({ key, ...field }));
                
            for (const field of selectFields) {
                const selector = `#${field.id}`;
                const selectField = page.locator(selector);

                if (await selectField.isVisible()) {
                    try {
                        console.log(`Procesando campo select con id: ${field.id}`);
                        await selectField.click({timeout: 3000}); // Clic para abrir el select
                        await page.selectOption(selector, { value: field.value.toString() }); // Selecciona la opción por su valor
                        await page.waitForTimeout(50); // Pequeña espera para evitar errores de sincronización
                    } catch (error) {
                        console.error(`Error en select ${field.id}: ${error.message}`);
                    }
                } else {
                    console.error(`El campo select con id ${field.id} no es visible.`);
                }
            }
        } catch (error) {
            console.error(`Error general en processSelectFields: ${error.message}`);
        }
    }
};

export const processInputFields = async (page, testDataGame, inputField = null) => {
    const testData = typeof testDataGame === 'string' ? JSON.parse(testDataGame) : testDataGame;

    if (inputField && inputField.placeholder) {
        // Si tenemos un campo input específico, procesa solo ese
        try {
            const selector = `input[placeholder="${inputField.placeholder}"]`;
            if (await page.locator(selector).isVisible()) {
                console.log(`Procesando campo input con placeholder: ${inputField.placeholder}`);
                await page.locator(selector).click(); // Clic para poner el foco en el input
                await page.locator(selector).fill(inputField.value.toString()); // Escribir el valor
                await page.waitForTimeout(50); // Pequeña espera para evitar errores de sincronización
            } else {
                console.error(`El campo input con placeholder ${inputField.placeholder} no es visible.`);
            }
        } catch (error) {
            console.error(`Error en input con placeholder ${inputField.placeholder}: ${error.message}`);
        }
    } else {
        // Procesa todos los campos input
        try {
            const inputFields = Object.entries(testData)
                .filter(([key]) => /^input\d+$/.test(key)) // Filtra las claves que empiecen con "input" seguido de números
                .map(([key, field]) => ({ key, ...field }));

            for (const field of inputFields) {
                const selector = `input[placeholder="${field.placeholder}"]`;
                const inputLocator = page.locator(selector);

                if (await inputLocator.isVisible()) {
                    try {
                        console.log(`Procesando campo input con placeholder: ${field.placeholder}`);
                        await inputLocator.click({timeout: 3000}); // Clic para poner el foco en el input
                        await inputLocator.fill(field.value.toString()); // Escribir el valor
                        await page.waitForTimeout(50); // Pequeña espera para evitar errores de sincronización
                    } catch (error) {
                        console.error(`Error en input con placeholder ${field.placeholder}: ${error.message}`);
                    }
                } else {
                    console.error(`El campo input con placeholder ${field.placeholder} no es visible.`);
                }
            }
        } catch (error) {
            console.error(`Error general en processInputFields: ${error.message}`);
        }
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
