import { test, expect } from '@playwright/test';
import { ConfigSettings } from '../../trazit-config';
import { Config, logSampleSuccess,  newInvLotAlreadyExists, 
  newInvLotRegressionStdPrimario, tryTurnAvailableWhenNotQualified,
  newInvLotStdSecundatioNoQualifSuccess, turnAvailableWhenQualifNotRequired, newInvLotStdSecundariosAlternativeUnitsSuccess} from '../../trazit-models/test-config-mb_em';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto(ConfigSettings.platformUrl);

  await page.getByLabel('User').fill(ConfigSettings.userAdmin);
  await page.getByLabel('Password').fill(ConfigSettings.userAdminPss);
  await page.pause();
  await page.pause();
  await page.getByLabel('Password').press('Enter');
  await page.pause();
  await testInfo.attach("credentials", {body: await page.locator('.header').screenshot(), contentType: "image/png"});
  await page.locator('sp-action-menu#procedures').hover();
  await page.pause();
  await page.getByText(Config.procNameLabel).nth(0).click();
  await page.pause();
});
test.afterAll(async ({page}) => {
  await page.close();
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
  await expect(notif).toContainText(testData.textInNotif1);
  await expect(notif).toContainText(testData.textInNotif2);
  await expect(notif).toContainText(testData.textInNotif3);

  const notifText = await notif.textContent(); // Get the text content of the notification element

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
async function fillGenericDialog({ page }, testInfo, testModel) {
  if (testModel.genericFormFields===undefined){return;}
  for (const curFld of testModel.genericFormFields) {
    console.log(curFld, curFld.type)
    if (String(curFld.type).toLowerCase() == "list"){
      console.log('is list')
      await page.getByLabel(curFld.label_en).nth(0).click(); 
      await page.getByText(curFld.value).nth(0).click(); 
    }
    if (String(curFld.type).toLowerCase() == "text"){
      console.log('is text')
      await page.getByText(curFld.label_en).nth(0).fill(curFld.value); 
    }
  }
  await page.pause();
  
  await testInfo.attach("formFilled", {
    body: await page.screenshot({fullPage: true }), contentType: "image/png"});

}
async function fillTableFilter({ page }, testInfo, testModel) {
  if (testModel.filtersInTable===undefined){return;}
  await testInfo.attach("View just open - No record selected to perform the action", {
    body: await page.screenshot({fullPage: true }), contentType: "image/png"});  

  for (const curFld of testModel.filtersInTable) {
    console.log(curFld)
      await page.getByLabel(curFld.colName).click();
      await page.getByLabel(curFld.colName).fill(curFld.colValue);        
      await page.pause();            
  }
  let recordLabelToGet=testModel.filtersInTable[0].colValue
  console.log('recordLabelToGet', recordLabelToGet)
  await page.getByText(recordLabelToGet).first().click();
  await page.pause();  

  await testInfo.attach("Button enabled when one record selected therefor action can be perform", 
    {body: await page.getByTitle(testModel.buttonLabel).screenshot(), contentType: "image/png"});
  await page.pause();
  await testInfo.attach("One lot selected", {
    body: await page.screenshot({fullPage: true }), contentType: "image/png"});
}
async function pressActionButton({ page }, testInfo, testModel) {
  await page.getByTitle(testModel.buttonLabel).click();   
  await page.pause();
  await testInfo.attach("result", {
    body: await page.screenshot({fullPage: true }), contentType: "image/png"});
  await page.pause();
}




test('MBEMlogSampleSuccess', async ({ page }, testInfo) => {   
  let testModel=logSampleSuccess
  
  await page.pause();  
  await page.getByTitle(testModel.viewNameOrTextToGet).nth(1).click(); 
  await page.pause();  
  
  await fillTableFilter({page}, testInfo, testModel)

  await fillGenericDialog({page}, testInfo, testModel)
  await page.pause();

  await page.getByText("Accept").nth(4).click();   
  await page.pause();
  await testInfo.attach("result", {
    body: await page.screenshot({fullPage: true }), contentType: "image/png"});
  await page.pause(); 

  await addNotificationWitness({page}, testInfo, testModel)
});

test('newInvLotAlreadyExists', async ({ page }, testInfo) => {  
  let testModel=newInvLotAlreadyExists
  await page.getByTitle(testModel.buttonLabel).click(); 
  await page.pause();  

  await page.getByLabel(newInvLotAlreadyExists.fields[0].label_en).nth(0).click(); 
  await page.getByText(newInvLotAlreadyExists.fields[0].value).nth(0).click(); 
  await page.getByText(newInvLotAlreadyExists.fields[1].label_en).nth(0).fill(newInvLotAlreadyExists.fields[1].value); 
  await page.getByText(newInvLotAlreadyExists.fields[2].label_en).nth(0).fill(newInvLotAlreadyExists.fields[2].value); 
  await page.pause();
  
  await testInfo.attach("formFilled", {
    body: await page.screenshot({fullPage: true }), contentType: "image/png"});

  await page.getByText("Accept").nth(4).click();   
  await page.pause();
  await testInfo.attach("result", {
    body: await page.screenshot({fullPage: true }), contentType: "image/png"});
  await page.pause(); 

  await addNotificationWitness({page}, testInfo, testModel)

});

test('TryTurnAvailableNotBeingQualified', async ({page}, testInfo) => {
  let testResult = 'Pass';
  try {
    let testModel=tryTurnAvailableWhenNotQualified    

    await fillTableFilter({page}, testInfo, testModel)

    await pressActionButton({page}, testInfo, testModel)  

    await addNotificationWitness({page}, testInfo, testModel)
  } catch (error) {
    console.error('Test Error:', error);
    testResult = 'Fail'; // Set the test result to 'Fail' on error    
  }
  try {
    //const response = await axios.get('http://51.75.202.142:8888/LabPLANET-API/app/procs/InstrumentsAPIqueries?actionName=GET_INSTRUMENT_REPORT&dbName=labplanet&procInstanceName=app-proc&finalToken=eyJ1c2VyREIiOiJtYXJjIiwiZGF0ZXRpbWVGb3JtYXRBdFBsYXRmb3JtTGV2ZWwiOiJESVNBQkxFRCIsInByb2NzTW9kdWxlTmFtZSI6ImVtLWRlbW8tYSpFTlZJUk9OTUVOVEFMX01PTklUT1JJTkd8YXBwLXByb2MqSU5TVFJVTUVOVFN8YXBwKlBMQVRGT1JNX0FETUlOIiwiZGJOYW1lIjoibGFicGxhbmV0IiwidHlwIjoiSldUIiwidXNlcl9wcm9jZWR1cmVfaGFzaGNvZGVzIjoiZW0tZGVtby1hKjEqMTYyNjAwNTIyM3xhcHAtcHJvYyoxKi0xNDE0MTI1MzN8YXBwKjEqMTExIiwiZVNpZ24iOiJsb2NvbyIsInVzZXJEQlBhc3N3b3JkIjoiYXVsaW4iLCJ1c2VyTWFpbCI6InRyYXppdC5pbmZvQGdtYWlsLmNvbSIsInVzZXJfcHJvY2VkdXJlcyI6IltlbS1kZW1vLWEsIGFwcC1wcm9jLCBhcHBdIiwiYXBwU2Vzc2lvbklkIjoiMjUxMDMiLCJhcHBTZXNzaW9uU3RhcnRlZERhdGUiOiJXZWQgQXVnIDE2IDEwOjQ3OjM1IFVUQyAyMDIzIiwidXNlclJvbGUiOiJjb29yZGluYXRvciIsImFsZyI6IkhTMjU2IiwiaW50ZXJuYWxVc2VySUQiOiIxMiJ9.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.6Zggntw6t_w0YnsCqwZvwyndQ1iLm75Tij2HVZqtQow&instrumentName=res_230323&isForTesting=false');
    //console.log('API Response:', response.data);
} catch (error) {
    console.error('API Error:', error);
}
});

test('newInvLotStdSecundariosSuccess', async ({ page }, testInfo) => {  
  let testModel=newInvLotStdSecundatioNoQualifSuccess
  
  await page.pause();  
  await page.getByTitle(testModel.buttonLabel).click(); 
  await page.pause();  
  
  await fillGenericDialog({page}, testInfo, testModel)
  await page.pause();

  await page.getByText("Accept").nth(4).click();   
  await page.pause();
  await testInfo.attach("result", {
    body: await page.screenshot({fullPage: true }), contentType: "image/png"});
  await page.pause(); 

  await addNotificationWitness({page}, testInfo, testModel)
});

test('newInvLotStdSecundariosAlternativeUnitsSuccess', async ({ page }, testInfo) => {  
  let testModel=newInvLotStdSecundariosAlternativeUnitsSuccess
  
  await page.pause();  
  await page.getByTitle(testModel.buttonLabel).click(); 
  await page.pause();  
  
  await fillGenericDialog({page}, testInfo, testModel)
  await page.pause();

  await page.getByText("Accept").nth(4).click();   
  await page.pause();
  await testInfo.attach("result", {
    body: await page.screenshot({fullPage: true }), contentType: "image/png"});
  await page.pause(); 

  let lotCreated= await addNotificationWitness({page}, testInfo, testModel)
});


test('turnAvailableWhenQualifNotRequired', async ({page}, testInfo) => {
  let testResult = 'Pass';
  try {
    //let testModel=tryTurnAvailableWhenNotQualified
    let testModel=turnAvailableWhenQualifNotRequired

    await fillTableFilter({page}, testInfo, testModel)

    await pressActionButton({page}, testInfo, testModel)  

    await addNotificationWitness({page}, testInfo, testModel)
  } catch (error) {
    console.error('Test Error:', error);
    testResult = 'Fail'; // Set the test result to 'Fail' on error    
  }
  try {
    //const response = await axios.get('http://51.75.202.142:8888/LabPLANET-API/app/procs/InstrumentsAPIqueries?actionName=GET_INSTRUMENT_REPORT&dbName=labplanet&procInstanceName=app-proc&finalToken=eyJ1c2VyREIiOiJtYXJjIiwiZGF0ZXRpbWVGb3JtYXRBdFBsYXRmb3JtTGV2ZWwiOiJESVNBQkxFRCIsInByb2NzTW9kdWxlTmFtZSI6ImVtLWRlbW8tYSpFTlZJUk9OTUVOVEFMX01PTklUT1JJTkd8YXBwLXByb2MqSU5TVFJVTUVOVFN8YXBwKlBMQVRGT1JNX0FETUlOIiwiZGJOYW1lIjoibGFicGxhbmV0IiwidHlwIjoiSldUIiwidXNlcl9wcm9jZWR1cmVfaGFzaGNvZGVzIjoiZW0tZGVtby1hKjEqMTYyNjAwNTIyM3xhcHAtcHJvYyoxKi0xNDE0MTI1MzN8YXBwKjEqMTExIiwiZVNpZ24iOiJsb2NvbyIsInVzZXJEQlBhc3N3b3JkIjoiYXVsaW4iLCJ1c2VyTWFpbCI6InRyYXppdC5pbmZvQGdtYWlsLmNvbSIsInVzZXJfcHJvY2VkdXJlcyI6IltlbS1kZW1vLWEsIGFwcC1wcm9jLCBhcHBdIiwiYXBwU2Vzc2lvbklkIjoiMjUxMDMiLCJhcHBTZXNzaW9uU3RhcnRlZERhdGUiOiJXZWQgQXVnIDE2IDEwOjQ3OjM1IFVUQyAyMDIzIiwidXNlclJvbGUiOiJjb29yZGluYXRvciIsImFsZyI6IkhTMjU2IiwiaW50ZXJuYWxVc2VySUQiOiIxMiJ9.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.6Zggntw6t_w0YnsCqwZvwyndQ1iLm75Tij2HVZqtQow&instrumentName=res_230323&isForTesting=false');
    //console.log('API Response:', response.data);
} catch (error) {
    console.error('API Error:', error);
}
});


test('Trazit-Inventory-Primario-New', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Estándares Primarios' }).getByText('New inventory Lot Estándares Primarios').click();
  await page.getByTitle("New").click();
  await page.getByLabel("refer").nth(0).click();
  await page.getByText("REF1").nth(0).click();
  await page.getByLabel("lot id").fill("PruebaPrimario");
  await page.getByLabel("volume").nth(0).fill("1");
  await page.getByLabel("date").nth(0).type("12052025");
  await page.getByLabel("date").nth(1).type("12052025");
  await page.getByLabel("date").nth(2).type("12052025");
  await page.getByLabel("vendor").nth(0).fill("Prueba");
  await page.getByLabel("vendor").nth(1).fill("Prueba");
  await page.getByLabel("vendor").nth(2).fill("Prueba");
  await page.getByLabel("purity").fill("Prueba");
  await page.getByLabel("conservation").fill("Prueba");
  await page.getByLabel("Number of").fill("1");
  await page.locator('#genericDialog').getByRole('button', { name: 'Accept' }).click();
});

test('Trazit-Inventory-Primario-New-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Estándares Primarios' }).getByText('New inventory Lot Estándares Primarios').click();
  await page.getByTitle("New").click();
  await page.getByLabel("refer").nth(0).click();
  await page.getByText("REF1").nth(0).click();
  await page.getByLabel("lot id").fill("PruebaPrimario");
  await page.getByLabel("volume").nth(0).fill("1");
  await page.getByLabel("date").nth(0).type("12052025");
  await page.getByLabel("date").nth(1).type("12052025");
  await page.getByLabel("date").nth(2).type("12052025");
  await page.getByLabel("vendor").nth(0).fill("Prueba");
  await page.getByLabel("vendor").nth(1).fill("Prueba");
  await page.getByLabel("vendor").nth(2).fill("Prueba");
  await page.getByLabel("purity").fill("Prueba");
  await page.getByLabel("conservation").fill("Prueba");
  await page.getByLabel("Number of").fill("1");
  await page.locator('#genericDialog').getByRole('button', { name: 'Cancel' }).locator('#label').click();
});

test('Trazit-Inventory-Primario-Select', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Estándares Primarios' }).getByText('New inventory Lot Estándares Primarios').click();
  await page.getByText("PruebaPrimario").click();
});

test('Trazit-Inventory-Primario-Audit', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Estándares Primarios' }).getByText('New inventory Lot Estándares Primarios').click();
  await page.getByText("PruebaPrimario").click();
  await page.getByTitle("audit").click();
});

test('Trazit-Inventory-Primario-Unavaliable', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Estándares Primarios' }).getByText('New inventory Lot Estándares Primarios').click();
  await page.getByText("PruebaPrimario").click();
  await page.getByTitle("unava").click();
});

test('Trazit-Inventory-Primario-Avaliable', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Estándares Primarios' }).getByText('New inventory Lot Estándares Primarios').click();
  await page.getByText("PruebaPrimario").click();
  await page.getByTitle("turn ava").click();
});

test('Trazit-Inventory-Primario-Qualification-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Estándares Primarios' }).getByText('New inventory Lot Estándares Primarios').click();
  await page.getByText("PruebaPrimario").click();
  await page.getByTitle("qualification").nth(0).click();
  await page.locator('#list8').getByRole('combobox').click();
  await page.getByRole('option', { name: 'Accepted', exact: true }).click();
  await page.getByText('Cancel').nth(4).click();
});

test('Trazit-Inventory-Primario-Qualification-Accept', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Estándares Primarios' }).getByText('New inventory Lot Estándares Primarios').click();
  await page.getByText("PruebaPrimario").click();
  await page.getByTitle("qualification").nth(0).click();
  await page.locator('#list8').getByRole('combobox').click();
  await page.getByRole('option', { name: 'Accepted', exact: true }).click();
  await page.locator('#genericDialog').getByRole('button', { name: 'Accept' }).click();
});


test('Trazit-Inventory-Primario-Qualification + Avaliable-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Estándares Primarios' }).getByText('New inventory Lot Estándares Primarios').click();
  await page.getByText("PruebaPrimario").click();
  await page.getByTitle("qualification +").click();
  await page.getByLabel("Decision").click();
  await page.getByText("Accepted").nth(0).click();
  await page.getByText('Cancel').nth(4).click();
});

test('Trazit-Inventory-Primario-Qualification + Avaliable-Accept', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Estándares Primarios' }).getByText('New inventory Lot Estándares Primarios').click();
  await page.getByText("PruebaPrimario").click();
  await page.getByTitle("qualification +").click();
  await page.getByLabel("Decision").click();
  await page.getByText("Accepted").nth(0).click();
  await page.locator('#genericDialog').getByRole('button', { name: 'Accept' }).click();
});

test('Trazit-Inventory-Primario-Consume-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Estándares Primarios' }).getByText('New inventory Lot Estándares Primarios').click();
  await page.getByText("PruebaPrimario").click();
  await page.getByTitle("Consume").click();
  await page.getByLabel("Consume").fill("1");
  await page.getByText("Cancel").nth(4).click();
});

test('Trazit-Inventory-Primario-Consume-Accept', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Estándares Primarios' }).getByText('New inventory Lot Estándares Primarios').click();
  await page.getByText("PruebaPrimario").click();
  await page.getByTitle("Consume").click();
  await page.getByTitle("Consume").click();
  await page.getByLabel("Consume").fill("1");
  await page.getByText("Accept").nth(4).click();
});

test('Trazit-Inventory-Primario-Adjust-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Estándares Primarios' }).getByText('New inventory Lot Estándares Primarios').click();
  await page.getByText("PruebaPrimario").click();
  await page.getByTitle("Adjust").click();
  await page.getByLabel("Adjust").fill("2");
  await page.getByText("Cancel").nth(4).click();
});

test('Trazit-Inventory-Primario-Adjust-Accept', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Estándares Primarios' }).getByText('New inventory Lot Estándares Primarios').click();
  await page.getByText("PruebaPrimario").click();
  await page.getByTitle("Adjust").click();
  await page.getByLabel("Adjust").fill("2");
  await page.getByText("Accept").nth(4).click();
});

test('Trazit-Inventory-Primario-Add-Cancel', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Estándares Primarios' }).getByText('New inventory Lot Estándares Primarios').click();
  await page.getByText("PruebaPrimario").click();
  await page.getByTitle("add").click();
  await page.getByLabel("Add").fill("2");
  await page.getByText("Cancel").nth(4).click();
});

test('Trazit-Inventory-Primario-Add-Accept', async ({ page }) => {
  await page.locator('#procedures').getByText('Procedures').hover();
  await page.getByRole('menuitem', { name: 'Inventory Draft' }).click();
  await page.getByRole('menuitem', { name: 'New inventory Lot Estándares Primarios' }).getByText('New inventory Lot Estándares Primarios').click();
  await page.getByText("PruebaPrimario").click();
  await page.getByTitle("add").click();
  await page.getByLabel("Add").fill("2");
  await page.getByText("Accept").nth(4).click();
});