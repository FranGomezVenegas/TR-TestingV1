const { chromium } = require('playwright');
import { ConfigSettings } from '../../trazit-config';
import { getTestConfigSettings } from './ApiCalls';
// Definino la clase JustificationPhrase
export class NotificationWitness {
    constructor(page) {
        //this.page = page;
    }

    async addNotificationWitness({ page }, testInfo, testData) {
        await page.locator(ConfigSettings.Notification.main.pageElement).hover();
        await testInfo.attach(ConfigSettings.Notification.main.screenShotsName, {
          body: await page.screenshot({ fullPage: true }),
          contentType: ConfigSettings.screenShotsContentType
        });
        const notif = await page.locator(ConfigSettings.Notification.main.pageElementdiv).first();
        await testInfo.attach(ConfigSettings.Notification.main.screenShotsdivNotification, {
          body: await notif.screenshot(),
          contentType: ConfigSettings.screenShotsContentType
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
      };
}