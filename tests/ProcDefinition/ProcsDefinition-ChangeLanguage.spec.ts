import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoProcDefinition } from '../1TRAZiT-Commons/logIntoProcDefinition';

import { changeES, changeEN} from '../../trazit-models/test-config.platform-changeLanguage';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';


// Function with all tests.
const commonTests = () => {
    test('Trazit-ProceduresDefinition-ChangeES', async ({ page }, testInfo) => {
        // Verifico el idioma actual antes de hacer clic en el botón
        const currentLanguage = await page.evaluate(() => {
          // Suponiendo que el idioma actual esté en el atributo lang del elemento html
            return document.documentElement.lang; 
        });
    
        try {
            if (currentLanguage !== 'es') {
                // Si el idioma no es español, cambio a inglés primero
                const enButton = await page.getByRole('button', { name: changeES.en, exact: true });
                if (await enButton.isVisible()) {
                    await enButton.click();
                    await page.waitForTimeout(1000); 
                }
            }
    
            // Hago clic en el botón 'es' para cambiar el idioma a español
            const esButton = await page.getByRole('button', { name: changeES.es, exact: true });
            if (await esButton.isVisible()) {
                await esButton.click();
                await page.waitForTimeout(1000); 
            }
    
            await testInfo.attach(changeES.screenAfterClickChangeES, {
              body: await page.screenshot({ fullPage: true }),
              contentType: ConfigSettingsAlternative.screenShotsContentType
            });
        } catch (error) {
            console.error(changeES.error, error);
        }
    });
    
    test('Trazit-ProceduresDefinition-ChangeEN', async ({ page }, testInfo) => {
    // Verifico el idioma actual antes de hacer clic en el botón
    const currentLanguage = await page.evaluate(() => {
        // Suponiendo que el idioma actual esté en el atributo lang del elemento html
        return document.documentElement.lang; 
    });

    try {
        if (currentLanguage !== 'en') {
            // Si el idioma no es español, cambio a inglés primero
            const enButton = await page.getByRole('button', { name: changeEN.es, exact: true });
            if (await enButton.isVisible()) {
                await enButton.click();
                await page.waitForTimeout(1000); 
            }
        }

        // Hago clic en el botón 'es' para cambiar el idioma a español
        const esButton = await page.getByRole('button', { name: changeEN.en, exact: true });
        if (await esButton.isVisible()) {
            await esButton.click();
            await page.waitForTimeout(1000); 
        }

        await testInfo.attach(changeEN.screenAfterClickChangeEN, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    } catch (error) {
        console.error(changeEN.error, error);
    }
})

}

test.describe('Desktop Mode', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        await page.setViewportSize({ width: 1365, height: 821 });
        const logProc = new LogIntoProcDefinition(page);
        const ConfigSettings = await logProc.commonBeforeEach(page, testInfo);
        await page.waitForTimeout(3000);
    });
    commonTests();
});

// // Mobile Mode 
test.describe('Mobile mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 385, height: 812 }); 
    const logProc = new LogIntoProcDefinition({page});
    const ConfigSettings=await logProc.commonBeforeEach(page, testInfo);
    await page.waitForTimeout(3000);
  });
  //And I call the tests.
  commonTests();
});

// Mobile Mode - Retrato
test.describe('Mobile mode Retrato', () => {
    test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 812, height: 385 }); 
    const logProc = new LogIntoProcDefinition({page});
    const ConfigSettings=await logProc.commonBeforeEach(page, testInfo);
    await page.waitForTimeout(3000);
    });
  commonTests();
});


// Tablets Mode
test.describe('Tablets mode', () => {
test.beforeEach(async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 768, height: 1024 }); 
  const logProc = new LogIntoProcDefinition({page});
  const ConfigSettings=await logProc.commonBeforeEach(page, testInfo);
  await page.waitForTimeout(3000);
});
  commonTests();
});

// // Tablets Mode - Retrato
test.describe('Tablets mode Retrato', () => {
    test.beforeEach(async ({ page }, testInfo) => {
      await page.setViewportSize({ width: 1024, height: 768}); 
      const logProc = new LogIntoProcDefinition({page});
      const ConfigSettings=await logProc.commonBeforeEach(page, testInfo);
      await page.waitForTimeout(3000);
    });
      //And I call the tests.
      commonTests();
  });


const { test:pwTest, afterEach } = require('@playwright/test');
 
  afterEach(async ({}, testInfo) => {
    // Example JSON data, could be anything relevant to your tests
    const data = {
      test_name: testInfo.title,


      duration: testInfo.duration,
      // other test-related data you might want to send
    };
   
    // Determine the test outcome
    const testStatus = testInfo.status; // 'passed', 'failed', 'timedOut', 'skipped'
   
    await callApiRunCompletion(data, testStatus);
  });
   
  pwTest('Example test', async ({ page }) => {
    // Your test logic here
  });