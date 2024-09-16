import { test, expect } from '@playwright/test';
import { ConfigSettings } from '../../trazit-config';
test.beforeEach(async ({ page }) => {
  await page.goto(ConfigSettings.platformUrl);

  await page.getByLabel('User').fill(ConfigSettings.userAdmin);
  await page.getByLabel('Password').fill(ConfigSettings.userAdminPss);
  await page.getByLabel('Password').press('Enter');
});
// Abre pestaña
test('Trazit-S-SamplingStatic-Open', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(31).click(); 
});
// Selecciona la muestra
test('Trazit-S-SamplingStatic-Select', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(31).click(); 
  await page.getByText("660").click(); 
});
// Pulsa el boton de Audit
test('Trazit-S-SamplingStatic-Audit-Open', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(31).click(); 
  await page.getByText("660").click(); 
  await page.getByTitle("Audit").click();
});
// Cierra el menu de Audit
test('Trazit-S-SamplingStatic-Audit-Close', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(31).click(); 
  await page.getByText("660").click(); 
  await page.getByTitle("Audit").click();
  await page.getByText("close").nth(12).click();
});
// Pulsa el boton Sample Date
test('Trazit-S-SamplingStatic-SampleDate', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(31).click(); 
  await page.getByText("660").click(); 
  await page.getByTitle("Set Sample Date").click();
});
// Pulsa el boton Sample Date ya puesto
test('Trazit-S-SamplingStatic-AlreadySampleDate', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(31).click(); 
  await page.getByText("660").click(); 
  await page.getByTitle("Set Sample Date").click();
});
// Pulsa el boton Change Sample
test('Trazit-S-SamplingStatic-ChangeSample-Open', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(31).click(); 
  await page.getByText("660").click(); 
  await page.getByTitle("Change Sample").click(); 
});
// Pone una fecha y acepta
test('Trazit-P-SamplingStatic-ChangeSample-Fill-Accept', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(32).click(); 
  await page.getByText("132").click(); 
  await page.getByTitle("Change Sample").click(); 
  await page.locator('#datetime1').click();
    // await page.locator('#datetime1').type("20020020231212");
  await page.locator('#datetime1').type("20022023"); 
  await page.locator('#datetime1').press('ArrowRight');
  await page.locator('#datetime1').type("1212");  
  await page.getByText("Accept").nth(4).click();
  await page.getByLabel('User').nth(2).fill("jmerlo");  
  await page.getByLabel('Password').nth(2).fill("trazit4ever");
  await page.getByLabel('Password').nth(2).press('Enter');
  await page.getByLabel('Justification').nth(0).fill("Pruebas");
  await page.getByText('Accept').nth(2).click();
});
// Cancela el menu Change Sample
test('Trazit-S-SamplingStatic-ChangeSample-Cancel', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(31).click(); 
  await page.getByText("660").click(); 
  await page.getByTitle("Change Sample").click();
    // await page.locator('#datetime1').type("20020020231212");
  await page.locator('#datetime1').type("20022023"); 
  await page.locator('#datetime1').press('ArrowRight');
  await page.locator('#datetime1').type("1212"); 
  await page.getByText("Cancel").nth(4).click();
});
// Cierra el menu Change Sample
test('Trazit-S-SamplingStatic-ChangeSample-Close', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(31).click(); 
  await page.getByText("660").click(); 
  await page.getByTitle("Change Sample").click(); 
  await page.getByText("close").nth(10).click();
});
// Pulsa el boton Set End
test('Trazit-S-SamplingStatic-SetEnd', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(31).click(); 
  await page.getByText("660").click(); 
  await page.getByTitle("Set End").click(); 
});
// Pulsa el boton Set End ya puesto
test('Trazit-S-SamplingStatic-AlreadySetEnd', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(31).click(); 
  await page.getByText("660").click(); 
  await page.getByTitle("Set End").click(); 
});
// Pulsa el boton Change End
test('Trazit-S-SamplingStatic-ChangeEnd-Open', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(31).click(); 
  await page.getByText("660").click(); 
  await page.getByTitle("Change End").click(); 
});

test('Trazit-S-SamplingStatic-ChangeEnd-Accept', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(31).click(); 
  await page.getByText("660").click(); 
  await page.getByTitle("Change End").click(); 
  await page.locator('#datetime1').click();
    // await page.locator('#datetime1').type("20020020231212");
  await page.locator('#datetime1').type("20022023"); 
  await page.locator('#datetime1').press('ArrowRight');
  await page.locator('#datetime1').type("1212");
  await page.locator('#genericDialog').getByRole('button', { name: 'Accept' }).click();
});

test('Trazit-S-SamplingStatic-ChangeEnd-Cancel', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(31).click(); 
  await page.getByText("660").click(); 
  await page.getByTitle("Change End").click(); 
  await page.locator('#datetime1').click();
    // await page.locator('#datetime1').type("20020020231212");
  await page.locator('#datetime1').type("20022023"); 
  await page.locator('#datetime1').press('ArrowRight');
  await page.locator('#datetime1').type("1212");
  await page.locator('#genericDialog').getByRole('button', { name: 'Cancel' }).click();
});

// Cierra el menu Change End
test('Trazit-S-SamplingStatic-ChangeEnd-Close', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(31).click(); 
  await page.getByText("660").click(); 
  await page.getByTitle("Change End").click(); 
  await page.getByText("close").nth(6).click();
});
// Pulsa el boton Next
test('Trazit-S-SamplingStatic-Next', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(31).click(); 
  await page.getByText("660").click(); 
  await page.getByTitle("Next").click(); 
});
// Pulsa el boton Add Sampling Comment
test('Trazit-S-SamplingStatic-AddComments-Open', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(31).click(); 
  await page.getByText("375").click(); 
  await page.getByTitle("Add Sampling").click(); 
});
// Rellena el mensaje
test('Trazit-S-SamplingStatic-AddComments-Fill', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(31).click(); 
  await page.getByText("375").click(); 
  await page.getByTitle("Add Sampling").click(); 
  await page.getByText("Comment").nth(0).fill('Cometario de Prueba');
});
// Rellena el mensaje y acepta
test('Trazit-S-SamplingStatic-AddComments-Fill-Acepts', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(31).click(); 
  await page.getByText("375").click(); 
  await page.getByTitle("Add Sampling").click(); 
  await page.getByText("Comment").nth(0).fill('Cometario de Prueba');
  await page.getByText("Accept").nth(4).click();
});
// Rellena el mensaje y cancela
test('Trazit-S-SamplingStatic-AddComments-Fill-Cancel', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(31).click(); 
  await page.getByText("375").click(); 
  await page.getByTitle("Add Sampling").click(); 
  await page.getByText("Comment").nth(0).fill('Cometario de Prueba');
  await page.getByText("Cancel").nth(4).click();
});
// Rellena el mensaje y acepta con un mensaje ya puesto
test('Trazit-S-SamplingStatic-AddComments-Already', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(31).click(); 
  await page.getByText("375").click(); 
  await page.getByTitle("Add Sampling").click(); 
  await page.getByText("Comment").nth(0).fill('Cometario de Prueba');
  await page.getByText("Accept").nth(4).click();
});
// Pulsa el boton Remove Sampling comments
test('Trazit-S-SamplingStatic-RemoveComment', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(31).click(); 
  await page.getByText("375").click(); 
  await page.getByTitle("Remove Sampling").click();
});
// Pulsa el boton Remove Sampling comments sin un comentario
test('Trazit-S-SamplingStatic-RemoveComment-WithOutComment', async ({ page }) => {
  await page.getByText('Procedures').nth(1).hover();
  await page.getByText("Air").nth(0).click();
  await page.getByText("").nth(31).click(); 
  await page.getByText("375").click(); 
  await page.getByTitle("Remove Sampling").click();
});
