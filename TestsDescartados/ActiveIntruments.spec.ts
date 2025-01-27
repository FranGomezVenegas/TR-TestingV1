import { test, expect } from '@playwright/test';

import { ConfigSettings } from '../../trazit-config';
import { InstrumentsConfig, newFillAccept} from '../../trazit-models/test-config-instruments';


test.beforeEach(async ({ page }, testInfo) => {
  await page.goto(ConfigSettings.platformUrl);

  await page.getByLabel('User').fill(ConfigSettings.userAdmin);
  await page.getByLabel('Password').fill(ConfigSettings.userAdminPss);
  await page.getByLabel('Password').press('Enter');
  await page.pause();
  await testInfo.attach("credentials", {body: await page.locator('.header').screenshot(), contentType: "image/png"});
  await page.locator('sp-action-menu#procedures').hover();
  await page.pause();
  await page.getByText(InstrumentsConfig.procNameLabel).nth(0).click();
  await page.pause();
  
});

test.afterEach(async ({ page }, testInfo) => {
  const notif=await page.locator('#notif-item-div').first()
  await testInfo.attach("Notification", {body: await page.locator('#notif-item-div').screenshot(), contentType: "image/png"});

  await expect(notif).toContainText('instrument')
  await expect(notif).toContainText('not found')  
});
test.afterAll(async ({ page }, testInfo) => {
  await page.close()
});  

test('NewFillAccept', async ({ page }, testInfo) => {
  await page.getByText("Active").nth(2).click();   
  await page.pause();
  await page.getByTitle("New").click(); 
  await page.pause();
  await page.getByLabel(newFillAccept.fldName.label).nth(0).fill(newFillAccept.fldName.value); 
  await page.getByLabel(newFillAccept.fldFamily.label).nth(0).click(); 
  await page.getByText(newFillAccept.fldFamily.value).nth(0).click(); 
  await page.getByLabel(newFillAccept.fldModel.label).nth(0).fill(newFillAccept.fldModel.value); 
  await page.getByLabel("Supplier").nth(0).click(); 
  await page.getByText("Leica Bio").nth(0).click(); 
  await page.getByLabel("Serial").nth(0).fill("123"); 
  await page.getByLabel("Manufacture").nth(0).click(); 
  await page.getByText("Mettler Toledo").nth(1).click(); 
  await page.getByLabel("Owner").click(); 
  await page.getByText("Operator 1").nth(0).click(); 
  await page.getByLabel("Responsible").click(); 
  await page.getByText("Operator 1").nth(1).click(); 
  await page.getByLabel("Purchase").type("12032023"); 
  await page.getByLabel("Installation").nth(0).type("12042023");   
  await page.pause();
  
  await testInfo.attach("formFilled", {
    body: await page.screenshot({fullPage: true }), contentType: "image/png"});

  await page.getByText("Accept").nth(4).click();   
  await page.pause();
  
  await page.locator('sp-action-menu#notif-menu').hover();
  
  await testInfo.attach("result", {
    body: await page.screenshot({fullPage: true }), contentType: "image/png"});
  
//  const notif=await page.locator('#notif-item-div').first()
  // await testInfo.attach("Notification", {body: await page.locator('#notif-item-div').screenshot(), contentType: "image/png"});


  // await expect(notif).toContainText('instrument')
  // await expect(notif).toContainText('not found')
  //await page.close()
  
});

});