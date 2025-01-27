import { test, expect } from '@playwright/test';
import { ConfigSettings, platformMenuNames } from '../../trazit-config';
import { MenuLots } from '../../trazit-models/test-config-lots-global';
import { AlreadyAnalyzed, AddAnalysis } from '../../trazit-models/test-config-Lots-SampleEnterResult-AddAnalysis';

test.beforeEach(async ({ page }, testInfo) => {
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
    await page.locator(platformMenuNames.procedure.main.pageElementName).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(platformMenuNames.procedure.main.screenShotsName, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    await page.getByRole('menuitem', { name: 'Lots' }).locator('span').click();
    await page.pause();
    await page.pause();
    await testInfo.attach( MenuLots.Lots.main.screenShotsName, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    await page.pause();
    await page.goto(MenuLots.Lots.lotsSampleEnterResult.pageElement); 
    await page.pause();
    await page.pause();
    await testInfo.attach( MenuLots.Lots.lotsSampleEnterResult.screenShotsName, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    await page.pause();
    await page.pause();
    await page.pause();
    await page.pause();
    await page.pause();
    await page.pause();
    await page.pause();
    await page.pause();
});


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

test('Trazit-Lots-SampleEnterResult-Open', async ({ page }) => {
    await page.pause();
    await page.pause();
    await page.close();
})


test('Trazit-Lots-SampleEnterResult-AlreadyAnalyzed', async ({ page }, testInfo) => {
    await page.pause();
    let afterEachData = {
        textInNotif1:"",
        textInNotif2:"",
        textInNotif3:"",
    }

    await page.getByText(AlreadyAnalyzed.selectSampleID, { exact: true }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AlreadyAnalyzed.screenShotsSelectSampleID, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    await page.getByLabel(AlreadyAnalyzed.buttonAddAnalysis).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AlreadyAnalyzed.screenShotsButtonAdd, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    await page.getByText(AlreadyAnalyzed.selectAnalysis).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AlreadyAnalyzed.screenShotsSelectAnalysis, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    await page.getByRole('button', { name: AlreadyAnalyzed.fldAccept.label }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AlreadyAnalyzed.screenShotsButtonAdd, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
                
    await page.getByRole('button', { name: AlreadyAnalyzed.fldAccept.label }).first().click();
    await page.pause();
    await page.pause();
   
    afterEachData.textInNotif1=AlreadyAnalyzed.textInNotif1
    afterEachData.textInNotif2=AlreadyAnalyzed.textInNotif2
    afterEachData.textInNotif3=AlreadyAnalyzed.textInNotif3
      
    await page.locator(MenuLots.Notification.main.pageElement).hover();
    await testInfo.attach(MenuLots.Notification.main.screenShotsName, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});  
    let notif=await page.locator(MenuLots.Notification.main.pageElementdiv).first()
    await page.pause();  
    await page.pause();  
    await page.pause();  
      
    await testInfo.attach(MenuLots.Notification.main.screenShotsdivNotification, {body: await page.locator(MenuLots.Notification.main.pageElementdiv).screenshot(), contentType:  ConfigSettings.screenShotsContentType});
    //await page.close();
})

test('Trazit-Lots-SampleEnterResult-AddAnalysis-Accept', async ({ page }, testInfo) => {
    await page.pause();
    await page.getByText(AddAnalysis.selectSampleID, { exact: true }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AddAnalysis.screenShotsSelectSampleId, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    await page.getByLabel(AddAnalysis.buttonAddAnalysis).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AddAnalysis.screenShotsAddAnalysis, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    await page.getByText(AddAnalysis.selectAnalysis).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AddAnalysis.screenShotsSelectAnalysis, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    await page.getByRole('button', { name: AddAnalysis.buttonAccept.label }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AddAnalysis.screenShotsButtonAccept, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    await page.pause();
    await page.close();
})



test('Trazit-Lots-SampleEnterResult-AddAnalysis-Close', async ({ page }, testInfo) => {
    await page.pause();
    await page.getByText(AlreadyAnalyzed.selectSampleID, { exact: true }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AlreadyAnalyzed.screenShotsSelectSampleID, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    await page.getByLabel(AlreadyAnalyzed.buttonAddAnalysis).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AlreadyAnalyzed.screenShotsButtonAdd, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    await page.getByText(AlreadyAnalyzed.selectAnalysis).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AlreadyAnalyzed.screenShotsSelectAnalysis, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    await page.getByRole('button', { name: AlreadyAnalyzed.fldClose.label, exact: true }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AlreadyAnalyzed.screenShotsClose, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    await page.pause();
    //await page.close();
})
