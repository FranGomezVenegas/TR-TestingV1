import { test, expect } from '@playwright/test';
import { ConfigSettings, platformMenuNames } from '../../trazit-config';
import { InstrumentsConfig, MenuInstrumentsControl } from '../../trazit-models/test-config-instruments - global';
import { newInstrumentRegression } from '../../trazit-models/test-config-instruments-regression';
import { deactivate } from '../../trazit-models/tests-config-instruments-deactivate';

test.beforeEach(async ({ page }, testInfo) => {
    await page.pause();
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
    await page.pause();
    await testInfo.attach(ConfigSettings.screenShotsCredencials.screenShotsName, {body: await page.locator(ConfigSettings.screenShotsCredencials.pageElementName).screenshot(), contentType: ConfigSettings.screenShotsContentType});
    await page.locator(platformMenuNames.procedure.main.pageElementName).click();
    await page.pause();
    await page.pause();
    await page.pause();
    await page.pause();
    await testInfo.attach(platformMenuNames.procedure.main.screenShotsName, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    await page.pause();
    await page.getByRole('menuitem', { name: 'Intruments Control' }).locator('span').click();
    await testInfo.attach(MenuInstrumentsControl.Instruments.main.screenShotsNameIncident, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettings.screenShotsContentType
    });
    await page.pause();
    await page.goto(MenuInstrumentsControl.Instruments.activeInstrument.pageElement); 
    await testInfo.attach(MenuInstrumentsControl.Instruments.activeInstrument.screenShotsName, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    await page.pause();
  });
  //test.afterAll(async ({page}) => {
    //await page.close();
  //});
  async function addNotificationWitness({ page }, testInfo, testData) {
    
    await page.locator(MenuInstrumentsControl.Notification.main.pageElement).hover();
  
    await testInfo.attach(MenuInstrumentsControl.Notification.main.screenShotsName, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettings.screenShotsContentType
    });
    const notif = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
    await testInfo.attach(MenuInstrumentsControl.Notification.main.screenShotsdivNotification, {
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

test('NewInstrumentWithRegression', async ({ page }, testInfo) => {  
    let afterEachData = {
      textInNotif1:"",
      textInNotif2:"",
      textInNotif3:""
    }
    await page.getByTitle(newInstrumentRegression.fldName.label).click();
    await page.pause();
    await page.getByLabel(newInstrumentRegression.fldName.label).nth(0).fill(newInstrumentRegression.fldName.value); 
    await page.getByLabel(newInstrumentRegression.fldFamily.label).nth(0).click();
    await page.pause();
    await page.getByText(newInstrumentRegression.fldFamily.value).nth(0).click();
    await page.pause();
    await page.getByLabel(newInstrumentRegression.fldModel.label).nth(0).fill(newInstrumentRegression.fldModel.value); 
    await page.getByLabel(newInstrumentRegression.fldSupplier.label).nth(0).click();
    await page.pause();
    await page.getByText(newInstrumentRegression.fldSupplier.value).nth(0).click();
    await page.pause();
    await page.getByLabel(newInstrumentRegression.fldSerial.label).nth(0).fill(newInstrumentRegression.fldSerial.value); 
    await page.getByLabel(newInstrumentRegression.fldManufacturer.label).nth(0).click();
    await page.pause();
    await page.getByText(newInstrumentRegression.fldManufacturer.value).nth(1).click();
    await page.pause();
    await page.getByLabel(newInstrumentRegression.fldResponsible.label).nth(0).click();
    await page.pause();
    await page.getByText(newInstrumentRegression.fldResponsible.value).nth(1).click();
    await page.pause();
    await page.getByLabel(newInstrumentRegression.fldResponsibleBackup.label).nth(0).click();
    await page.pause();
    await page.getByText(newInstrumentRegression.fldResponsibleBackup.value).nth(1).click();
    await page.pause();
    await page.getByLabel(newInstrumentRegression.fldPurchase.label).type(newInstrumentRegression.fldPurchase.value);
    await page.getByLabel(newInstrumentRegression.fldInstallation.label).nth(0).type(newInstrumentRegression.fldInstallation.value);
    await page.pause();
    
    await testInfo.attach(MenuInstrumentsControl.Instruments.main.screenShotsNameIncident, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
  
    await page.getByText(newInstrumentRegression.buttonAccept).nth(4).click();   
    await page.pause();
    await testInfo.attach(newInstrumentRegression.screenShotsResult, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    await page.pause(); 
  
    const newInstrument=await addNotificationWitness({page}, testInfo, newInstrumentRegression)
    await page.getByRole('menu').press('Escape');
  // End Test #1 . new Instrument
      
    let objectToGet=newInstrument
    if (objectToGet==undefined){
      objectToGet=deactivate.tableFilterValue
    }
    await testInfo.attach(newInstrumentRegression.screenShots, {body: await page.getByTitle(deactivate.buttonTitle).screenshot(), contentType: ConfigSettings.screenShotsContentType});
    await page.pause();
    await testInfo.attach(newInstrumentRegression.screenShotsView, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType}); +
    await page.locator(newInstrumentRegression.filterColumn).nth(13).click();  
    await page.locator(newInstrumentRegression.filterColumn).nth(13).fill(objectToGet);
    //await page.getByLabel('Name').nth(2).click();
    //await page.getByLabel('Name').nth(2).fill(objectToGet);
    await page.getByText(objectToGet).nth(0).click();
    await page.pause();
    await testInfo.attach(newInstrumentRegression.screenShotsInstrumentsButtonEnable, {body: await page.getByTitle(deactivate.buttonTitle).screenshot(), contentType: ConfigSettings.screenShotsContentType});
    await page.pause();
    await testInfo.attach(newInstrumentRegression.screenShotsInstrumentSelect, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
  
    await page.getByTitle(deactivate.buttonTitle).click();   
    await page.pause();
    await testInfo.attach(newInstrumentRegression.screenShotsResult, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    await page.pause();
    await addNotificationWitness({page}, testInfo, deactivate)
    await page.close();
  
  
      //await testInfo.attach("newInstrument", newInstrument);
      
      //const objectToPass = { newInstrument: newInstrument };
          
      //await test('Deactivate', objectToPass);
      //await deactivate({page}, testInfo);
  
  /*
      await testInfo.attach("Deactivate button is disabled as no entry selected", {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
      await page.pause();
  
      await page.getByLabel('Name', { exact: true }).click();
      await page.pause();
      await page.getByLabel('Name', { exact: true }).fill(newInstrument.toString());
      await page.pause();
      await page.getByText(newInstrument.toString()).nth(0).click();
      await page.pause();
      
      await testInfo.attach("Deactivate button is now enabled once record is selected", {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
      await page.pause();
  
      await page.getByTitle(deactivate.buttonTitle).click();   
      await page.pause();
      await testInfo.attach("result2", {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
        await page.pause();
    
      await addNotificationWitness({page}, testInfo, deactivate)*/
  });
  
  