import { test, expect } from '@playwright/test';
import { ConfigSettings, platformMenuNames } from '../../trazit-config';
import { InstrumentsConfig, MenuInstrumentsControl } from '../../trazit-models/test-config-instruments - global';
import { newInstrumentSuccess, newInstrumentAlreadyExists, newCancel} from '../../trazit-models/test-config-instruments-newInstrument';
import { deactivate } from '../../trazit-models/tests-config-instruments-deactivate';
import { newInstrumentRegression } from '../../trazit-models/test-config-instruments-regression';

test.describe('Regression testing', () => {
mode: 'serial'
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

test.beforeAll(async ({ page }, testInfo) => {
  await page.goto(ConfigSettings.platformUrl);
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
//  });
  await testInfo.attach(ConfigSettings.screenShotsCredencials.screenShotsName, {body: await page.locator(ConfigSettings.screenShotsCredencials.pageElementName).screenshot(), contentType: ConfigSettings.screenShotsContentType});
  await page.pause();
});


test.afterAll(async ({page}) => {
  await page.close();
});


test('SerialOpenInstrumentView', async ({ page }, testInfo) => {  
  await page.locator(platformMenuNames.procedure.main.pageElementName).hover();
  await page.pause();
  await page.pause();
  await page.pause();
  await page.pause();
  await testInfo.attach(platformMenuNames.procedure.main.screenShotsName, {
    body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
  await page.pause();
  //await page.locator('sp-action-menu#procedures').hover();
  await page.pause();
  await page.getByText(InstrumentsConfig.procNameLabel).nth(0).click();
  await page.pause();
  await page.pause();
  await page.getByText(newInstrumentAlreadyExists.viewNameOrTextToGet).nth(2).click();  
  await page.pause();
  await page.pause(); 
  await testInfo.attach(platformMenuNames.procedure.main.screenShotsName, {
    body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});

});


test('SerialNewInstrumentSuccess', async ({ page }, testInfo) => {  
    let afterEachData = {
      textInNotif1:"",
      textInNotif2:"",
      textInNotif3:""
    }
    await page.getByTitle(newInstrumentSuccess.fldName.label).click(); 
    await page.pause();  
    await page.getByLabel(newInstrumentSuccess.fldName.label).nth(0).fill(newInstrumentSuccess.fldName.value); 
    await page.getByLabel(newInstrumentSuccess.fldFamily.label).nth(0).click(); 
    await page.getByText(newInstrumentSuccess.fldFamily.value).nth(0).click(); 
    await page.getByLabel(newInstrumentSuccess.fldModel.label).nth(0).fill(newInstrumentSuccess.fldModel.value); 
    await page.getByLabel(newInstrumentSuccess.fldSupplier.label).nth(0).click(); 
    await page.getByText(newInstrumentSuccess.fldSupplier.value).nth(0).click(); 
    await page.getByLabel(newInstrumentSuccess.fldSerial.label).nth(0).fill(newInstrumentSuccess.fldSerial.value); 
    await page.getByLabel(newInstrumentSuccess.fldManufacturer.label).nth(0).click(); 
    await page.getByText(newInstrumentSuccess.fldManufacturer.value).nth(1).click(); 
    await page.getByLabel(newInstrumentSuccess.fldResponsible.label).nth(0).click(); 
    await page.getByText(newInstrumentSuccess.fldResponsible.value).nth(0).click(); 
    await page.getByLabel(newInstrumentSuccess.fldResponsibleBackup.label).click(); 
    await page.getByText(newInstrumentSuccess.fldResponsibleBackup.value).nth(1).click(); 
    await page.getByLabel(newInstrumentSuccess.fldPurchase.label).type(newInstrumentSuccess.fldPurchase.value); 
    await page.getByLabel(newInstrumentSuccess.fldInstallation.label).nth(0).type(newInstrumentSuccess.fldInstallation.value);   
    await page.pause();
    
    await testInfo.attach(MenuInstrumentsControl.Instruments.main.screenShotsNameIncident, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
  
    await page.getByText(newInstrumentSuccess.buttonAccept).nth(4).click();   
    await page.pause();
    await testInfo.attach(newInstrumentSuccess.screenResult, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    await page.pause(); 
  
    afterEachData.textInNotif1=newInstrumentSuccess.textInNotif1
    afterEachData.textInNotif2=newInstrumentSuccess.textInNotif2
    afterEachData.textInNotif3=newInstrumentSuccess.textInNotif3
  
    await page.locator(MenuInstrumentsControl.Notification.main.pageElement).hover();
    await testInfo.attach(MenuInstrumentsControl.Notification.main.screenShotsName, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});  
    let notif=await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first()
    await testInfo.attach(MenuInstrumentsControl.Notification.main.screenShotsdivNotification, {body: await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).screenshot(), contentType: ConfigSettings.screenShotsContentType});
    await page.close();
  });
  

  test('SerialDeactivate', async ({page}, testInfo) => {
    const newInstrument=await addNotificationWitness({page}, testInfo, newInstrumentRegression)
    let objectToGet = testInfo.attachments['newInstrument'];
    if (objectToGet==undefined){
      objectToGet=deactivate.tableFilterValue
    }
    await testInfo.attach("Button disabled when no record selected", {body: await page.getByTitle(deactivate.buttonTitle).screenshot(), contentType: ConfigSettings.screenShotsContentType});
    await page.pause();
    await testInfo.attach("View just open - No instrument selected", {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});  
    await page.getByLabel('Name').click();
    await page.getByLabel('Name').fill(objectToGet);
    await page.getByText(objectToGet).nth(0).click();
    await page.pause();
    await testInfo.attach("Button enabled when one instrument selected", {body: await page.getByTitle(deactivate.buttonTitle).screenshot(), contentType: ConfigSettings.screenShotsContentType});
    await page.pause();
    await testInfo.attach("One instrument selected", {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
  
    await page.getByTitle(deactivate.buttonTitle).click();   
    await page.pause();
    await testInfo.attach(newInstrumentSuccess.screenResult, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    await page.pause();
    await addNotificationWitness({page}, testInfo, deactivate)
    await page.close();  
    //const notif=await page.locator('#notif-item-div').first()
   // await testInfo.attach("Notification", {body: await page.locator('#notif-item-div').screenshot(), contentType: ConfigSettings.screenShotsContentType});  
  
    // await expect(notif).toContainText('Instrument')
    // await expect(notif).toContainText('success')
  
  
    //await page.press('body', "Escape");
    //await page.getByText(newInstrumentAlreadyExists.fldName.value).nth(0).click();   
    //await page.getByTitle("Deactivate").nth(0).click();
  
  
  /*  
    await page.getByText(newInstrumentAlreadyExists.fldName.value).click();   
    await page.getByTitle("Deactivate").nth(0).click();
    //await page.getByPlaceholder('vaadin-grid#mainGrid').click();
    //await page.locator('vaadin-grid#mainGrid').first().click();
    //await page.getByText("testing").nth(12).click();   
    await page.getByText(newInstrumentAlreadyExists.fldName.value).click();
    await page.getByTitle("Deactivate").nth(1).click();
    //let order = await page.getByRole("grid", { name: "Orders" }).getByRole("link");
    //await expect(order).toBeVisible();
    //await order.click();
    //console.log("Order found!");
    //break; */
  });


  test('SerialNewInstrumentAlreadyExists', async ({ page }, testInfo) => {  
    let afterEachData = {
      textInNotif1:"",
      textInNotif2:"",
      textInNotif3:""
    }
    await page.getByTitle(newInstrumentAlreadyExists.fldName.label).click(); 
    await page.pause();  
    await page.getByLabel(newInstrumentAlreadyExists.fldName.label).nth(0).fill(newInstrumentAlreadyExists.fldName.value); 
    await page.getByLabel(newInstrumentAlreadyExists.fldFamily.label).nth(0).click(); 
    await page.getByText(newInstrumentAlreadyExists.fldFamily.value).nth(0).click(); 
    await page.getByLabel(newInstrumentAlreadyExists.fldModel.label).nth(0).fill(newInstrumentAlreadyExists.fldModel.value); 
    await page.getByLabel(newInstrumentAlreadyExists.fldSupplier.label).nth(0).click(); 
    await page.getByText(newInstrumentAlreadyExists.fldSupplier.value).nth(0).click(); 
    await page.getByLabel(newInstrumentAlreadyExists.fldSerial.label).nth(0).fill(newInstrumentAlreadyExists.fldSerial.value); 
    await page.getByLabel(newInstrumentAlreadyExists.fldManufacturer.label).nth(0).click(); 
    await page.getByText(newInstrumentAlreadyExists.fldManufacturer.value).nth(1).click(); 
    await page.getByLabel(newInstrumentAlreadyExists.fldResponsible.label).nth(0).click(); 
    await page.getByText(newInstrumentAlreadyExists.fldResponsible.value).nth(0).click(); 
    await page.getByLabel(newInstrumentAlreadyExists.fldResponsibleBackup.label).click(); 
    await page.getByText(newInstrumentAlreadyExists.fldResponsibleBackup.value).nth(1).click(); 
    await page.getByLabel(newInstrumentAlreadyExists.fldPurchase.label).type(newInstrumentAlreadyExists.fldPurchase.value); 
    await page.getByLabel(newInstrumentAlreadyExists.fldInstallation.label).nth(0).type(newInstrumentAlreadyExists.fldInstallation.value);   
    await page.pause();
    
    await testInfo.attach(MenuInstrumentsControl.Instruments.main.screenShotsNameIncident, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
  
    await page.getByText(newInstrumentSuccess.buttonAccept).nth(4).click();   
    await page.pause();
    await testInfo.attach(newInstrumentSuccess.screenResult, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});
    await page.pause(); 
  
    afterEachData.textInNotif1=newInstrumentAlreadyExists.textInNotif1
    afterEachData.textInNotif2=newInstrumentAlreadyExists.textInNotif2
    afterEachData.textInNotif3=newInstrumentAlreadyExists.textInNotif3
  
    await page.locator(MenuInstrumentsControl.Notification.main.pageElement).hover();
    await testInfo.attach(MenuInstrumentsControl.Notification.main.screenShotsName, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettings.screenShotsContentType});  
    let notif=await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first()
    await testInfo.attach(MenuInstrumentsControl.Notification.main.screenShotsdivNotification, {body: await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).screenshot(), contentType: ConfigSettings.screenShotsContentType});
    await page.close();
  });

}); 