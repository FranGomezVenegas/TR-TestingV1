// Interactúa con una tabla. Su propósito es realizar una serie de acciones en las celdas de una tabla, 
// como buscar celdas específicas, obtener información de esas celdas y realizar validaciones. 
const { test, expect } = require('@playwright/test');

export async function interactWithTable(page, testDataGame) {
  return await test.step(testDataGame.phraseSearchSelectCell, async () => {
    // Reemplazar las comillas simples por comillas dobles si es necesario
    let locatorCommon = testDataGame.locatorCommon.replace(/'/g, '"');
    console.log(locatorCommon);
    await test.step(testDataGame.phrasePauses, async () => {
      await page.waitForTimeout(1000); 
    });
    
    const tdList = await test.step(testDataGame.phraseSearchCellsInTable, async () => {
      const cells = await test.step(testDataGame.phraseGetCellsCount, async () => {
        return await page.locator(locatorCommon).all();
      });

      await test.step(testDataGame.phraseLogCellsCount, async () => {
        console.log(`✅ Found ${cells.length} cells with inputs or selects.`);
      });

      await test.step(testDataGame.phraseValidateIfCellsFound, async () => {
        if (cells.length === 0) {
          throw new Error(`⚠️ No ${testDataGame.searchId.labelCellSelector} found with the expected ID`);
        }
      });

      return cells;
    });

    await test.step(testDataGame.phraseListFoundCells, async () => {
      for (let i = 0; i < tdList.length; i++) {
        
        const inputId = await test.step(`${testDataGame.phraseGetInputIdInCell} ${i + 1}`, async () => {
          return await tdList[i].locator(testDataGame.searchId.labelCellSelector).getAttribute(testDataGame.searchId.labelSearch, { timeout: 30000 });
        });
    
        const tdText = await test.step(`${testDataGame.phraseGetTextInCell} ${i + 1}`, async () => {
          return await tdList[i].innerText({ timeout: 30000 });
        });
    
        await test.step(`${testDataGame.phraseLogInformationForCell} ${i + 1}`, async () => {
          console.log(`🔎 Cell ${i + 1}: ID -> ${inputId}, Content -> "${tdText}"`);
        });
      }
    });
    
    const targetTd = await test.step(testDataGame.phraseSelectSpecificCell, async () => {
      const cell = await test.step(testDataGame.phraseGetCellLocatorAndPosition, async () => {
        return page.locator(locatorCommon).nth(Number(testDataGame.positionCell));
      });
    
      await test.step(testDataGame.phraseVerifyCellIsVisible, async () => {
        await expect(cell).toBeVisible({ timeout: 30000 });
      });
    
      return cell;
    });
    
    await test.step(testDataGame.phraseGetIdOfSelectedInput, async () => {
      const selectedInputId = await targetTd.locator(testDataGame.searchId.labelCellSelector).getAttribute(testDataGame.searchId.labelSearch, { timeout: 30000 });
    
      await test.step(testDataGame.phraseLogIdToConsole, async () => {
        console.log(`✅ Using ${testDataGame.searchId.labelCellSelector} with ID: ${selectedInputId}`);
      });
    
      return selectedInputId;
    });
    
    return targetTd;
  });
}

