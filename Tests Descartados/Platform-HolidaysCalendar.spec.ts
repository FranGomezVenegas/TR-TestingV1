import { test, expect } from '@playwright/test';
import { ConfigSettings } from '../../trazit-config';
test.beforeEach(async ({ page }, testInfo) => {
  await page.goto(ConfigSettings.platformUrl);

  await page.getByLabel('User').fill(ConfigSettings.userAdmin);
  await page.getByLabel('Password').fill(ConfigSettings.userAdminPss);
  await page.getByLabel('Password').press('Enter');
  await page.pause();
  await testInfo.attach("credentials", {body: await page.locator('.header').screenshot(), contentType: "image/png"});
  // await page.getByText('My Settings').nth(1).hover();
  await page.locator("sp-action-menu#dashboardmysettings").click();
  await page.pause();
  await page.locator("sp-menu-item#mysettingsholidayscalendar").click();
  await page.pause();
});


test('Trazit-Platform-HollidayCalendar-Open', async ({ page }) => {
    await page.getByText('My Settings').nth(1).hover();
    await page.locator("sp-menu-item").nth(5).click();
});

test('Trazit-Platform-HolidaysCalendar-NewCalendar', async ({ page }) => {
  await page.getByText('My Settings').nth(1).hover();
  await page.locator("sp-menu-item").nth(5).click();
  await page.getByText("Create").nth(0).click();
  await page.getByText("name").nth(2).fill('Prueba');
  await page.getByText("Description").fill('Prueba descripcion');
  await page.getByText("accept").nth(2).click();
});

test('Trazit-Platform-HolidaysCalendar-CancelCalendar', async ({ page }) => {
  await page.getByText('My Settings').nth(1).hover();
  await page.locator("sp-menu-item").nth(5).click();
  await page.getByText("Create").nth(0).click();
  await page.getByText("cancel").nth(2).click();
});

test('Trazit-Platform-HolidaysCalendar-SelectCalendar', async ({ page }) => {
  await page.getByText('My Settings').nth(1).hover();
  await page.locator("sp-menu-item").nth(5).click();
  await page.getByLabel("Calendar").nth(1).click();
  await page.getByText("Prueba").click();
  // await page.getByText("Prueba").nth(2).click();
});

test('Trazit-Platform-HolidaysCalendar-CancelAddDate', async ({ page }) => {  
  await page.getByText('My Settings').nth(1).hover();
  await page.locator("sp-menu-item").nth(5).click();
  await page.getByLabel("Calendar").nth(1).click();
  await page.getByText("Prueba").click();
  await page.getByText("Add").click();
  await page.getByText("Cancel").nth(2).click();
});

test('Trazit-Platform-HolidaysCalendar-CompleteAddDate', async ({ page }) => {  
  await page.getByText('My Settings').nth(1).hover();
  await page.locator("sp-menu-item").nth(5).click();
  await page.getByLabel("Calendar").nth(1).click();
  await page.getByText("Prueba").click();
  await page.getByText("Add").click();
  await page.getByText("Date Name").nth(1).fill("Prueba");
  await page.locator('#date1').type("22022023");
  await page.getByText("Accept").nth(2).click();
});

test('Trazit-Platform-HolidaysCalendar-AddDateInAGivenExistingCalendar', async ({ page }) => {  
  await page.getByText('My Settings').nth(1).hover();
  await page.locator("sp-menu-item").nth(5).click();
  await page.getByLabel("Calendar").nth(1).click();
  await page.getByText("Prueba").click();
  await page.getByText("Add").click();
  await page.getByText("Date Name").nth(1).fill("Prueba");
  await page.locator('#date1').type("22022023");
  await page.getByText("Accept").nth(2).click();
});

test('Trazit-Platform-HolidaysCalendar-RemoveDate', async ({ page }) => {  
  await page.getByText('My Settings').nth(1).hover();
  await page.locator("sp-menu-item").nth(5).click();
  await page.getByLabel("Calendar").nth(1).click();
  await page.getByText("Prueba").click();
  await page.getByText("3").nth(2).click();
  await page.getByText("Remove").click();
});

test('Trazit-Platform-HolidaysCalendar-AddDateInAGivenNOTExistingCalendar', async ({ page }) => {  
  await page.getByText('My Settings').nth(1).hover();
  await page.locator("sp-menu-item").nth(5).click();
  await page.getByLabel("Calendar").nth(1).click();
  await page.getByText("Prueba").click();
  await page.getByText("3").nth(2).click();
  await page.getByText("Remove").click();
});
