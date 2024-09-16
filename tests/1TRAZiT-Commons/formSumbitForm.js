const { expect } = require('@playwright/test');

async function submitForm(page, action = 'accept') {
  const buttonSelector = action.toLowerCase() === 'accept' ? 
    '[aria-label="Accept"], [aria-label="OK"], [type="submit"]' :
    '[aria-label="Cancel"], [aria-label="Close"]';
  
  try {
    await page.click(buttonSelector);
  } catch (error) {
    console.error(`Failed to click the submit button for action "${action}":`, error);
  }
}

module.exports = { submitForm };
