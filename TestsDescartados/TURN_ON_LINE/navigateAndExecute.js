import { test } from '@playwright/test';
import { PageActions } from '../TURN_ON_LINE/pageAction'; // Ajusta la ruta según corresponda

export async function navigateAndExecute(page, pagesToTest) {
  const pageActions = new PageActions(page);

  for (let i = 0; i < pagesToTest.length; i++) {
    const pageInfo = pagesToTest[i];

    await test.step(`Testing page: ${pageInfo.url}`, async () => {
      try {
        await test.step('Navigate to page', async () => {
          await page.goto(pageInfo.url);
          console.log(`Navigated to ${pageInfo.url}`);
          
          // Esperar a que aparezca un elemento específico en lugar de usar networkidle
          await page.waitForSelector('body', { state: 'visible' });
          
          await page.screenshot({ path: `screenshots/page-loaded-${i}.png` });
        });

        await test.step('Check for actions', async () => {
          const actionsExist = await pageActions.checkActionsExist();
          
          if (actionsExist) {
            console.log(`Actions found on ${pageInfo.url}`);
            await page.screenshot({ path: `screenshots/actions-found-${i}.png` });
          } else {
            console.log(`Actions not found on ${pageInfo.url}`);
            await page.screenshot({ path: `screenshots/actions-not-found-${i}.png` });
            return; // Skip further steps if actions don't exist
          }
        });

        await test.step('Create new item', async () => {
          await pageActions.createNewItem(
            pageInfo.name,
            pageInfo.model,
            pageInfo.serialNumber,
            pageInfo.manufacturer
          );
          await page.screenshot({ path: `screenshots/item-created-${i}.png` });
        });

        await test.step('Turn item online', async () => {
          await pageActions.turnOnline();
          await page.screenshot({ path: `screenshots/item-online-${i}.png` });
        });

        await test.step('Turn item offline', async () => {
          await pageActions.turnOffline();
          await page.screenshot({ path: `screenshots/item-offline-${i}.png` });
        });

      } catch (error) {
        console.error(`Error on ${pageInfo.url}:`, error);
        await page.screenshot({ path: `screenshots/error-${i}.png` });
        // Manejo adicional de errores según sea necesario
      }
    });
  }
}