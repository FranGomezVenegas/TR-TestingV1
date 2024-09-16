import { test, expect } from '@playwright/test';

import { ConfigSettings } from '../../trazit-config';
import { modelConfig} from '../../trazit-models/test-config-trazitmodels';

test.beforeEach(async ({ page }, testInfo) => {
    
    await page.goto(ConfigSettings.platformUrl);
  
    await page.getByLabel('User').fill(ConfigSettings.userAdmin);
    await page.getByLabel('Password').fill(ConfigSettings.userAdminPss);
    await page.pause();
    await page.getByLabel('Password').press('Enter');
    await page.pause();
    await testInfo.attach("credentials", {body: await page.locator('.header').screenshot(), contentType: "image/png"});
    
  });

  async function addNotificationWitness({ page }, testInfo, testData) {
    
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
    if (testData.runNotifMessageCheck===true){
      await expect(notif).toContainText(testData.textInNotif1);
      await expect(notif).toContainText(testData.textInNotif2);
      await expect(notif).toContainText(testData.textInNotif3);
    }
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

  test('GridActionNoDialog', async ({page}, testInfo) => {

    for (const key in modelConfig.procModel) {
        if (modelConfig.procModel.hasOwnProperty(key)) {
          const keyContent = modelConfig.procModel[key];
          console.log(`Entry Name: ${key}, Content: ${keyContent}`);
          if (key!=="TrackingChanges"&&key!=="ModuleSettings"
                    &&keyContent.component==="TableWithButtons"&&keyContent.actions!==undefined){
            const viewTitleProperty = Object.keys(keyContent.langConfig.title)[0];
            const viewTitleLabelEn = keyContent.langConfig.title[viewTitleProperty].label_en;
            console.log(viewTitleLabelEn)        
            await page.locator('sp-action-menu#procedures').hover();
            await page.pause();
            await page.getByText(modelConfig.procNameLabel).nth(0).click();   
            await page.pause();     
            //await page.locator('sp-action-menu#'+viewTitleLabelEn).hover();
            await page.getByText(viewTitleLabelEn).nth(0).click();
            await page.pause();     
            await testInfo.attach("open view "+viewTitleLabelEn, {
                body: await page.screenshot({fullPage: true }), contentType: "image/png"});
            await page.pause();
            for (const [index, object] of keyContent.actions.entries()) {            
                if (object.requiresDialog!==undefined&&object.requiresDialog===true){
                  console.log(`  Object ${index + 1}:`, object.actionName, ' This action requires dialog');
                }else{
                  if (object.button.showWhenSelectedItem!==undefined||object.button.hideWhenSelectedItem!==undefined){
                    console.log(`  Object ${index + 1}:`, object.actionName, ' This action is not supported yet due to it is dynamic button by showWhenSelectedItem/hideWhenSelectedItem');
                  }else{
                    console.log(`  Object ${index + 1}:`, object.actionName, 'Button:', object.button.title.label_en);               
                    let objectToGet=modelConfig.tableFilterValue;
                    await page.pause();
                    await testInfo.attach("Button disabled when no record selected", {body: await page.getByTitle(object.button.title.label_en).screenshot(), contentType: "image/png"});
                    await page.pause();
                    await testInfo.attach("View just open - No instrument selected", {
                      body: await page.screenshot({fullPage: true }), contentType: "image/png"});  
                    await page.getByLabel('Name').click();
                    await page.pause();
                    await page.getByLabel('Name').fill(objectToGet);
                    await page.pause();
                    await page.getByText(objectToGet).nth(0).click();
                    await page.pause();
                    await testInfo.attach("Button enabled when one instrument selected", {body: await page.getByTitle(object.button.title.label_en).screenshot(), contentType: "image/png"});
                    await page.pause();
                    await testInfo.attach("One instrument selected", {
                      body: await page.screenshot({fullPage: true }), contentType: "image/png"});
                  
                    await page.getByTitle(object.button.title.label_en).click();   
                    await page.pause();
                    await testInfo.attach("result", {
                      body: await page.screenshot({fullPage: true }), contentType: "image/png"});
                    await page.pause();
                    await addNotificationWitness({page}, testInfo, modelConfig)
                  }
                }
            }
          }
        }
    }

  });  