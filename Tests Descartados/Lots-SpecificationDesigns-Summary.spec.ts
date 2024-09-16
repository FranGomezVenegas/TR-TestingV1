import { test, expect } from '@playwright/test';
import { ConfigSettings, platformMenuNames } from '../../trazit-config';
import { MenuLots, Menu } from '../../trazit-models/test-config-lots-global';
import { LotsSpecificationDesignsSearch } from '../../trazit-models/test-config-Lots-SpecificationDesigns-Search';
import { Summary } from '../../trazit-models/test-config-Lots-SpecificationDesigns-Summary';

const commonBeforeEach = async ({ page }, testInfo) => {
  await page.pause();
  await page.goto(ConfigSettings.platformUrl);
  await page.pause();
  await page.pause();
  await page.getByLabel(ConfigSettings.login.fldUser.label).fill(ConfigSettings.login.fldUser.value);
  await page.pause();
  await page.pause();
  await page.getByLabel(ConfigSettings.login.fldPss.label).fill(ConfigSettings.login.fldPss.value);
  await page.pause();
  await page.pause();
  await page.getByLabel(ConfigSettings.login.fldPss.label).press(ConfigSettings.login.fldPss.actionName);
  await page.pause();
  await testInfo.attach(ConfigSettings.screenShotsCredencials.screenShotsName, {body: await page.locator(ConfigSettings.screenShotsCredencials.pageElementName).screenshot(), contentType: ConfigSettings.screenShotsContentType});
  await page.pause();
  await page.pause();    
};


async function addNotificationWitness({ page }, testInfo, testData) {
    await page.locator(MenuLots.Notification.main.pageElement).hover();
    await testInfo.attach(MenuLots.Notification.main.screenShotsName, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettings.screenShotsContentType
    });
    const notif = await page.locator(MenuLots.Notification.main.pageElementdiv).first();
    await testInfo.attach(MenuLots.Notification.main.screenShotsdivNotification, {
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
  }

  const commonTests = () => {
    test('Trazit-SpecificationDesigns-Open', async ({ page }) => {
      await page.pause();
      await page.pause();
      await page.close();
    })

    test('Trazit-SpecificationDesigns-Search', async ({ page }, testInfo) => {
      await page.pause();
      await page.getByLabel(LotsSpecificationDesignsSearch.fldSpecName.label).click();
      await page.pause();
      await page.pause();
      await page.getByLabel(LotsSpecificationDesignsSearch.fldSpecName.label).press(LotsSpecificationDesignsSearch.fldSpecName.action);
      await page.pause();
      await page.pause();
      await page.getByLabel(LotsSpecificationDesignsSearch.fldSpecName.label).fill(LotsSpecificationDesignsSearch.fldSpecName.value);
      await page.pause();
      await page.pause();
      await page.getByRole('button', { name: LotsSpecificationDesignsSearch.buttonSearch.label }).click();
      await page.pause();
      await testInfo.attach(LotsSpecificationDesignsSearch.screenShotsSearch, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
      await page.pause();
      await page.close();
    })


    test('Trazit-SpecificationDesigns-Search-Summary', async ({ page }, testInfo) => {
      await page.pause();
      await page.getByLabel(LotsSpecificationDesignsSearch.fldSpecName.label).click();
      await page.pause();
      await page.pause();
      await page.getByLabel(LotsSpecificationDesignsSearch.fldSpecName.label).press(LotsSpecificationDesignsSearch.fldSpecName.action);
      await page.pause();
      await page.pause();
      await page.getByLabel(LotsSpecificationDesignsSearch.fldSpecName.label).fill(LotsSpecificationDesignsSearch.fldSpecName.value);
      await page.pause();
      await page.pause();
      await page.getByRole('button', { name: LotsSpecificationDesignsSearch.buttonSearch.label }).click();
      await page.pause();
      await page.pause();
      await page.getByLabel(Summary.buttonSummary).click();
      await page.pause();
      await page.pause();
      await testInfo.attach(Summary.screenShotsSummary, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
      await page.pause();
      await page.pause();
      await page.close();
    });
  };

test.describe('Desktop Mode', () => {
  //Added the before common.
  test.beforeEach(commonBeforeEach);
  //And I add another beforeEach for the navigation between the different tabs, this part is specific in each mode.
  test.beforeEach(async ({ page }, testInfo) => {
      await page.locator(platformMenuNames.procedure.main.pageElementName).click();
      await testInfo.attach(platformMenuNames.procedure.main.screenShotsName, {
          body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
      await page.getByRole('menuitem', { name: 'Lots' }).locator('span').click();
      await testInfo.attach( MenuLots.Lots.main.screenShotsName, {
          body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
      await page.goto(MenuLots.Lots.lotsSpecificationDesigns.pageElement); 
      await page.waitForTimeout(4000);
      await testInfo.attach( MenuLots.Lots.lotsSpecificationDesigns.screenShotsName, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    
      //And I call the tests.
      commonTests();
  });
}); 

// Mobile Mode
test.describe('Mobile mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    // Size of the viewport of a mobile device
    await page.setViewportSize({ width: 385, height: 812 }); 
    // Common configuration for both modes.
    await commonBeforeEach({ page }, testInfo);
    await page.getByLabel(Menu.clickMenu).click();
    await page.locator(platformMenuNames.procedure.mobile.pageElementName).click();
    
    await testInfo.attach(platformMenuNames.procedure.mobile.screenShotsName, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    await page.click(MenuLots.Lots.mobile.pageElement);
    
    await testInfo.attach( MenuLots.Lots.mobile.screenShotsName, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    
    await page.goto(MenuLots.Lots.lotsSpecificationDesigns.pageElement); 
    await page.waitForTimeout(4000);
    await testInfo.attach( MenuLots.Lots.lotsSpecificationDesigns.screenShotsName, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
  //And I call the tests.
  commonTests();  
  });
}); 
