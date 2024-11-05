import { clickElement, clickElementByText,fillField, clickTextbox, fillTextbox, clickOption, attachScreenshot } from '../1TRAZiT-Commons/actionsHelper';
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
                                await processListField(page, consoleData, field);
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

// Function to process list fields
export const processListField = async (page, consoleData, listField) => {
    const searchAttempts = [
        listField.label,
        `* ${listField.label}`,
    ];

    for (const searchLabel of searchAttempts) {
        try {
            await test.step(`Trying to click on list field: ${searchLabel}`, async () => {
                await clickElement(page, searchLabel, 450);
                await clickOption(page, listField.option, 450);
                console.log(`Selected list field: ${searchLabel}`);
            });
            return;
        } catch (attemptError) {
            // Silently continue to the next attempt
        }
    }

    // Flexible search as a last resort
    const matchingField = findMatchingField(consoleData, listField.label);
    if (matchingField) {
        const flexibleLabel = determineFlexibleLabel(matchingField);
        await test.step(`Using flexible label to click on list field: ${flexibleLabel}`, async () => {
            await clickElement(page, flexibleLabel, 450);
            await clickOption(page, listField.option, 450);
            console.log(`Selected list field with flexible label: ${flexibleLabel}`);
        });
    } else {
        throw new Error(`Could not find list field: ${listField.label}`);
    }
};

// Function to process date fields
export const processDateField = async (page, consoleData, dateField) => {
    const searchAttempts = [
        dateField.label,
        `* ${dateField.label}`,
    ];

    for (const searchLabel of searchAttempts) {
        try {
            await test.step(`Filling date field: ${searchLabel}`, async () => {
                await fillTextbox(page, searchLabel, dateField.date, 450);
                console.log(`Added date field: ${searchLabel}`);
            });
            return;
        } catch (attemptError) {
            // Silently continue to the next attempt
        }
    }

    // Flexible search as a last resort
    const matchingField = findMatchingField(consoleData, dateField.label);
    if (matchingField) {
        const flexibleLabel = determineFlexibleLabel(matchingField);
        await test.step(`Filling date field with flexible label: ${flexibleLabel}`, async () => {
            await fillTextbox(page, flexibleLabel, dateField.date, 450);
            console.log(`Added date field with flexible label: ${flexibleLabel}`);
        });
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

    for (const searchLabel of searchAttempts) {
        try {
            await test.step(`Trying to click on multi-list field: ${searchLabel}`, async () => {
                await clickElementByText(page, searchLabel, 450); // Click to open the multi-list
                
                // Loop through the options to select
                for (const option of multiListField.options) {
                    await page.locator(`#${multiListField.id}`).getByText(option, { exact: true }).click();
                    console.log(`Selected option in multi-list: ${option}`);
                }

                // Click the arrow_drop_down to close the multi-list
                await page.getByText('arrow_drop_down').click(); // Close the dropdown
                console.log(`Closed multi-list field: ${searchLabel}`);
                console.log(`Processed multi-list field: ${searchLabel}`);
            });
            return; // Exit function if processed successfully
        } catch (attemptError) {
            console.log(`Error processing multi-list field: ${searchLabel}. Details:`, attemptError);
        }
        await page.waitForTimeout(1000);
    }

    // Flexible search as a last resort
    const matchingField = findMatchingField(consoleData, multiListField.label);
    if (matchingField) {
        const flexibleLabel = determineFlexibleLabel(matchingField);
        await test.step(`Using flexible label to click on multi-list field: ${flexibleLabel}`, async () => {
            await clickElement(page, flexibleLabel, 450);

            for (const option of multiListField.options) {
                await page.locator(`#${multiListField.id}`).getByText(option, { exact: true }).click();
                console.log(`Selected option in multi-list with flexible label: ${option}`);
            }

            // Click the arrow_drop_down to close the multi-list
            await page.getByText('arrow_drop_down').click(); // Close the dropdown
            console.log(`Closed multi-list field with flexible label: ${flexibleLabel}`);
            console.log(`Processed multi-list field with flexible label: ${flexibleLabel}`);
        });
        await page.waitForTimeout(1000);
    } else {
        throw new Error(`Could not find multi-list field: ${multiListField.label}`);
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
