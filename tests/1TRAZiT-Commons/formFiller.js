const { expect } = require('@playwright/test');

async function fillFormFields(page, formData) {
  for (const field of formData) {
    const selector = `[name="${field.name}"], #${field.name}`;
    
    try {
      switch (field.type) {
        case 'select':
          await page.selectOption(selector, field.value);
          break;
        case 'checkbox':
          if (field.value) {
            await page.check(selector);
          } else {
            await page.uncheck(selector);
          }
          break;
        default:
          await page.fill(selector, field.value);
      }
    } catch (error) {
      console.error(`Failed to fill field ${field.name} of type ${field.type}:`, error);
    }
  }
}

module.exports = { fillFormFields };
