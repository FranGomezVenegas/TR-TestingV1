// Esta función la utilizo para llenar un valor en una celda de una tabla.
// Primero, identifico si la celda contiene un input o un select.  
// Si es un input, lleno el valor correspondiente. 
// Si es un select, selecciono la opción con el valor indicado. 
// Luego, valido que el valor ingresado sea el esperado. 
// Finalmente, verifico y registro en la consola que el valor se haya ingresado correctamente.

const { test, expect } = require('@playwright/test');
import { attachScreenshot } from '../../../1TRAZiT-Commons/actionsHelper.js';
// const {attachScreenshot} = require('../../../1TRAZiT-Commons/actionsHelper.js');

export async function fillValueInCell(targetTd, testDataGame, testInfo, page, ConfigSettingsAlternative) {
    await test.step(`${testDataGame.phraseWritingOrSelecting} ${testDataGame.fillValue}`, async () => {
  
      if (testDataGame.searchId.labelCellSelector === "input") {
        await test.step(`${testDataGame.phraseFillValue}`, async () => {
          await targetTd.locator(testDataGame.searchId.labelCellSelector).fill(testDataGame.fillValue, { timeout: 30000 });
        });
      }
      if (testDataGame.searchId.labelCellSelector === "select") {
        await test.step(`${testDataGame.phraseSelectOption}`, async () => {
          await targetTd.locator(testDataGame.searchId.labelCellSelector).selectOption({ value: testDataGame.fillValue }, { timeout: 30000 });
        });
      }
      if (testDataGame.screenShotsFilledForm) {
          await test.step(testDataGame.phraseScreenShots, async () => {
              await attachScreenshot(testInfo, testDataGame.screenShotsFilledForm, page, ConfigSettingsAlternative.screenShotsContentType);
          });
          if (testDataGame.phrasePauses) {
              await test.step(testDataGame.phrasePauses, async () => {
                  await page.pause();
              });
          }
      }
        
      await test.step(`${testDataGame.phraseEnterValueOrSelectOption}`, async () => {
        // Here you can trigger enter if needed
        await targetTd.locator(testDataGame.searchId.labelCellSelector).press(testDataGame.pressEnter, { timeout: 30000 });
      });
    
      if (testDataGame.screenShotsEnter) {
        await test.step(testDataGame.phraseScreenShots, async () => {
            await attachScreenshot(testInfo, testDataGame.screenShotsEnter, page, ConfigSettingsAlternative.screenShotsContentType);
        });
        if (testDataGame.phrasePauses) {
            await test.step(testDataGame.phrasePauses, async () => {
                await page.pause();
            });
        }
      }
      // Validate that the input has the expected value
      await test.step(`${testDataGame.phraseValidateValueOrOption}`, async () => {
        await expect(targetTd.locator(testDataGame.searchId.labelCellSelector)).toHaveValue(testDataGame.fillValue, { timeout: 30000 });
      });

      await test.step(`${testDataGame.phraseVerifyInputContainsExpectedValue} ${testDataGame.searchId.labelCellSelector} ${testDataGame.fillValue}`, async () => {
        console.log(`✅ Verified that ${testDataGame.searchId.labelCellSelector} contains: ${testDataGame.fillValue} correctly.`);
      });
    });
}
