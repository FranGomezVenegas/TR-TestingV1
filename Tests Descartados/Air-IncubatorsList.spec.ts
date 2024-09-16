import { test, expect } from '@playwright/test';
import { InstrumentsConfig, MenuInstrumentsControl, MicroEM } from '../../trazit-models/test-config-instruments - global';
import { ConfigSettings, platformMenuNames,  } from '../../trazit-config';
import { Activate, New, Desactivate } from '../../trazit-models/test-config-air-incubatorsList';

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
  await page.getByRole('menuitem', { name: MicroEM.main.pageElement.label }).locator('span').hover();
  await page.pause();
  await page.pause();
  await testInfo.attach(MicroEM.main.screenShotsName, {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettings.screenShotsContentType
  });
  await page.pause();
  await page.getByRole('menuitem', { name: MicroEM.incubatorsList.pageElement.label }).locator('label').click();
  await page.pause();
  await page.pause();
  await testInfo.attach(MicroEM.incubatorsList.screenShotsName, {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettings.screenShotsContentType
  });
  await page.pause();
});

test('Trazit-Air-IncubatorList-Open', async ({ page }) => {
  await page.pause();
});

test('Trazit-Air-IncubatorList-NewOpen', async ({ page }, testInfo) => {  
  await page.getByLabel(New.buttonName).click();
  await page.pause();
  await page.pause();
  await testInfo.attach(New.screenShotAfterButtonNew, {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettings.screenShotsContentType
  });
  await page.pause();
});

test('Trazit-Air-IncubatorList-NewComplete', async ({ page }, testInfo) => {
  await page.getByLabel(New.buttonName).click();
  await page.pause();
  await page.pause();
  await testInfo.attach(New.screenShotAfterButtonNew, {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettings.screenShotsContentType
  });
  await page.pause();
  await page.getByLabel(New.fldName.label).click();
  await page.pause();
  await page.pause();
  await page.getByLabel(New.fldName.label).fill(New.fldName.value);
  await page.pause();
  await testInfo.attach(New.screenshotsaftertheForm, {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettings.screenShotsContentType
  });
  await page.pause();
});

test('Trazit-Air-IncubatorList-NewAccepted', async ({ page }, testInfo) => {
  await page.getByLabel(New.buttonName).click();
  await page.pause();
  await page.pause();
  await testInfo.attach(New.screenShotAfterButtonNew, {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettings.screenShotsContentType
  });
  await page.pause();
  await page.getByLabel(New.fldName.label).click();
  await page.pause();
  await page.pause();
  await testInfo.attach(New.screenShotsformerly, {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettings.screenShotsContentType
  });
  await page.pause();
  await page.getByLabel(New.fldName.label).fill(New.fldName.value);
  await page.pause();
  await page.getByLabel(New.buttonIncubationstage).click();
  await page.pause();
  await page.getByRole('option', { name: New.option.label}).click();
  await page.pause();
  await page.pause();
  await page.getByLabel(New.fldMinTemp.label).click();
  await page.pause();
  await page.pause();
  await page.getByLabel(New.fldMinTemp.label).fill(New.fldMinTemp.value);
  await page.pause();
  await page.getByLabel(New.fldMaxTemp.label).click();
  await page.pause();
  await page.pause();
  await page.getByLabel(New.fldMaxTemp.label).fill(New.fldMaxTemp.value);
  await page.pause();
  await testInfo.attach(New.screenshotsaftertheForm, {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettings.screenShotsContentType
  });
  await page.pause();
  await page.getByRole('button', { name: New.buttonAccept.label}).click();
  await page.pause();
  await page.pause();
  await testInfo.attach(New.screenshotsaftertheForm, {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettings.screenShotsContentType
  });
  await page.pause();

});

test('Trazit-Air-IncubatorList-NewCanceled', async ({ page }, testInfo) => {
  await page.getByLabel(New.buttonName).click();
  await page.pause();
  await page.pause();
  await testInfo.attach(New.screenShotAfterButtonNew, {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettings.screenShotsContentType
  });
  await page.pause();
  await page.getByLabel(New.fldName.label).click();
  await page.pause();
  await page.pause();
  await page.getByLabel(New.fldName.label).fill(New.fldName.value);
  await page.pause();
  await testInfo.attach(New.screenshotsaftertheForm, {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettings.screenShotsContentType
  });
  await page.pause();
  await page.getByRole('button', { name: New.buttonCancel.label}).click();
  await page.pause();
  await page.pause();
  await testInfo.attach(New.screenshotsaftertheForm, {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettings.screenShotsContentType
  });
  await page.pause();
});

test('Trazit-Air-IncubatorList-DesActivated', async ({ page }, testInfo) => {
  await page.getByText(Desactivate.selectName, { exact: true }).click();
  await page.pause();
  await page.pause();
  await testInfo.attach(Desactivate.screenShot, {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettings.screenShotsContentType
  });
  await page.pause();
  await page.getByLabel(Desactivate.buttonName).click();
  await page.pause();
  await page.pause();
  await testInfo.attach(Desactivate.screenShotsAfterDesactivate, {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettings.screenShotsContentType
  });
  await page.pause();
  
});

test('Trazit-Air-IncubatorList-Activated', async ({ page }, testInfo) => {
  await page.getByLabel(Activate.buttonName).click();
  await page.pause();
  await page.pause();
  await testInfo.attach(New.screenShotsformerly, {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettings.screenShotsContentType
  })
  await page.pause();
  await page.getByLabel(Activate.fldDays.label).click();
  await page.pause();
  await page.pause();
  await page.getByLabel(Activate.fldDays.label).fill(Activate.fldDays.value);
  await page.pause();
  await testInfo.attach(New.screenshotsaftertheForm, {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettings.screenShotsContentType
  });
  await page.pause();
  await page.getByRole('button', { name: New.buttonAccept.label}).click();
  await page.pause();
  await page.pause();
  await testInfo.attach(Activate. screenShotsAfterAccept, {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettings.screenShotsContentType
  });
  await page.pause();
});

