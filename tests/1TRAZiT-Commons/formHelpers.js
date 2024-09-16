const { expect } = require('@playwright/test');

async function readFormFields(page) {
  await page.waitForSelector('.mdc-dialog__surface');
  
  const formFields = await page.evaluate(() => {
    const dialog = document.querySelector('.mdc-dialog__surface');
    if (!dialog) {
      console.warn('Dialog not found');
      return [];
    }
    const fields = dialog.querySelectorAll('input, select, textarea');
    
    return Array.from(fields).map(field => ({
      name: field.name || field.id,
      type: field.tagName.toLowerCase() === 'select' ? 'select' : field.type,
      options: field.tagName.toLowerCase() === 'select' ? 
        Array.from(field.options).map(option => option.value) : null
    }));
  });

  return formFields;
}

module.exports = { readFormFields };
