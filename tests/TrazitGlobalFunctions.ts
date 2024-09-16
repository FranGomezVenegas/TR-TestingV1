import { test, expect } from '@playwright/test';

import { ConfigSettings } from '../trazit-config';
import { InstrumentsConfig, newInstrumentAlreadyExists, newInstrumentSuccess, deactivate, newInstrumentRegression} from '../trazit-models/test-config-instruments';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto(ConfigSettings.platformUrl);

  await page.getByLabel('User').fill(ConfigSettings.userAdmin);
  await page.getByLabel('Password').fill(ConfigSettings.userAdminPss);
  await page.pause();
  await page.getByLabel('Password').press('Enter');
  await page.pause();
  await testInfo.attach("credentials", {body: await page.locator('.header').screenshot(), contentType: "image/png"});
  await page.locator('sp-action-menu#procedures').hover();
  await page.pause();
  await page.getByText(InstrumentsConfig.procNameLabel).nth(0).click();
  await page.pause();
  await page.getByText(newInstrumentAlreadyExists.viewNameOrTextToGet).nth(2).click();   
  await page.pause(); 
});
test.afterAll(async ({page}) => {
  await page.close();
});
export async function addNotificationWitness({ page }, testInfo, testData) {
  
  await page.locator('sp-action-menu#notif-menu').hover();

  await testInfo.attach("Notifications", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png"
  });
  const notif = await page.locator('#notif-item-div').first();
  await testInfo.attach("Last notification", {
    body: await notif.screenshot(),
    contentType: "image/png"
  });
  await expect(notif).toContainText(testData.textInNotif1);
  await expect(notif).toContainText(testData.textInNotif2);
  await expect(notif).toContainText(testData.textInNotif3);

  const notifText = await notif.textContent(); // Get the text content of the notification element
  

  //const inputText = "Instrument X h is found";
  //const regex = /testData.textInNotif1 \s+(.*?)\s+ testData.textInNotif2/;
  const regexPattern = new RegExp(`${testData.textInNotif1}\\s+(.*?)\\s+${testData.textInNotif2}`);
  const match = notifText.match(regexPattern);
  
  if (match && match[1]) {
    console.log(notifText, 'ObjectName:', match[1])
    return match[1];
  } else {
      console.log(notifText)
      return notifText;
  }
}

