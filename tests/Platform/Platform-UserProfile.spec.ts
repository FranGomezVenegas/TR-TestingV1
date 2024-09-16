import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { setPassword, setEsign, setShift, setAlias, setMail, save } from '../../trazit-models/test-config.platform-userProfile';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenSettingsWindow } from '../1TRAZiT-Commons/openSettingsWindows';


//Function with all tests.
const commonTests = () => {
  test('Trazit-Platform-UserProfile-Open', async ({ page }, testInfo) => {
    const logs: { message: any, type: string }[] = [];
    const errors: Error[] = [];

    // Captura los mensajes de la consola
    page.on('console', (message) => {
      logs.push({ message: message.text(), type: message.type() });
    });

    // Captura los errores de la página
    page.on('pageerror', (exception) => {
      errors.push(exception);
    });

    await page.pause();
    await page.pause();

    console.log('Console logs:', logs);
    console.log('Page errors:', errors);

    //expect.soft(logs.length).toBe(0);
    expect(errors.length).toBe(0);
  });

  test('Trazit-Platform-UserProfile-Password', async ({ page }, testInfo) => {
    await page.pause();
    let afterEachData = {
      textInNotif1:"",
      textInNotif2:"",
      textInNotif3:"",
    }

    const logs: { message: any, type: string }[] = [];
    const errors: Error[] = [];

    // Captura los mensajes de la consola
    page.on('console', (message) => {
      logs.push({ message: message.text(), type: message.type() });
    });

    // Captura los errores de la página
    page.on('pageerror', (exception) => {
      errors.push(exception);
    });

    await page.pause();
    await testInfo.attach(setPassword.screenBeforePasswordChange, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.getByLabel(setPassword.fldNewPwd.label).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(setPassword.fldNewPwd.label).fill(setPassword.fldNewPwd.newValue);
    await page.pause();
    await page.pause();
    await testInfo.attach(setPassword.screenCompletedChangePasswordForm, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.getByLabel(setPassword.fldNewPwd.actionName).nth(3).click();
    await page.pause();
    await page.pause();
    // Dialog Confirm
    await testInfo.attach(setPassword.screenEmptyForm, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.getByRole('textbox', { name: ConfigSettingsAlternative.login.fldUser.label }).click();
    await page.pause();
    await page.pause();
    await page.getByRole('textbox', { name: ConfigSettingsAlternative.login.fldUser.label }).fill(ConfigSettingsAlternative.login.fldUser.value);
    await page.pause();
    await page.pause();
    await page.getByLabel(setPassword.CurrentPassword).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(setPassword.CurrentPassword).fill(ConfigSettingsAlternative.login.fldPss.value);
    await page.pause();
    await page.pause();
    await testInfo.attach(setPassword.screenFilledForm, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.getByRole('button', { name: setPassword.Accept }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(setPassword.screenShotsAccept, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
      
    
    console.log('Console logs:', logs);
    console.log('Page errors:', errors);

    // expect.soft(logs.length).toBe(0);
    expect(errors.length).toBe(0);
    
    afterEachData.textInNotif1=setPassword.textInNotif1
    afterEachData.textInNotif2=setPassword.textInNotif2
    afterEachData.textInNotif3=setPassword.textInNotif3

    // Obtener el modo de dispositivo usando page.evaluate
    const viewportWidth = await page.evaluate(() => {
        return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    });
    
    
    if (viewportWidth >= 1024) {
      // Modo escritorio o tablet en modo paisaje
      const notificationElement = await page.locator(platformMenuNames.Notification.main.pageElement);
      if (notificationElement !== null) {
      await notificationElement.hover();
      }
      await testInfo.attach(setPassword.screenformNotifications, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
      });
      const notificationDiv = await page.locator(platformMenuNames.Notification.main.pageElementdiv).first();
      if (notificationDiv !== null) {
      await testInfo.attach(setPassword.screenformLastNotifications, {
          body: await notificationDiv.screenshot(),
          contentType: ConfigSettingsAlternative.screenShotsContentType
      });
      }
  } else if (viewportWidth >= 768 && viewportWidth < 1024) {
      await page.click('mwc-icon-button.menu');
      await page.click('mwc-list-item#dashboardnotifications');
      await testInfo.attach('TabletNotifications', {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
      });
  } else {
      // Modo móvil
      await page.click('mwc-icon-button.menu');
      await page.click('mwc-list-item#dashboardnotifications');
      await testInfo.attach('NotificationsMobile', {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
      });
  }
});

  // firmademo
  test('Trazit-Platform-UserProfile-Esign', async ({ page }, testInfo) => {
    let afterEachData = {
      textInNotif1:"",
      textInNotif2:"",
      textInNotif3:"",
    }

    
    const logs: { message: any, type: string }[] = [];
    const errors: Error[] = [];

    // Captura los mensajes de la consola
    page.on('console', (message) => {
      logs.push({ message: message.text(), type: message.type() });
    });

    // Captura los errores de la página
    page.on('pageerror', (exception) => {
      errors.push(exception);
    });

    await testInfo.attach(setEsign.screenBeforeEsignChange, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    
    await page.getByLabel(setEsign.fldEsign.label).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(setEsign.fldEsign.label).fill(setEsign.fldEsign.newValue);
    await page.pause();
    await page.pause();
    await testInfo.attach(setEsign.screenCompletedChangeEsignForm, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.getByLabel(setEsign.fldEsign.actionName).nth(4).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(setEsign.screenShotsEmptyForm, {
      body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByLabel(setEsign.fldCurrentEsign.label).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(setEsign.fldCurrentEsign.label).fill(setEsign.fldCurrentEsign.originalValue);
    await page.pause();
    await page.pause();
    await testInfo.attach(setEsign.screenShotsFilledForm, {
      body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByRole('button', { name: setEsign.buttonAccept }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(setEsign.screenShotsAccept, {
      body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
    });

    console.log('Console logs:', logs);
    console.log('Page errors:', errors);

    // expect.soft(logs.length).toBe(0);
    expect(errors.length).toBe(0);
    

    afterEachData.textInNotif1=setEsign.textInNotif1
    afterEachData.textInNotif2=setEsign.textInNotif2
    afterEachData.textInNotif3=setEsign.textInNotif3

    // Obtener el modo de dispositivo usando page.evaluate
    const viewportWidth = await page.evaluate(() => {
        return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    });
    
    
  if (viewportWidth >= 1024) {
    // Modo escritorio o tablet en modo paisaje
    const notificationElement = await page.locator(platformMenuNames.Notification.main.pageElement);
    if (notificationElement !== null) {
    await notificationElement.hover();
    }
    await testInfo.attach(setEsign.screenformNotifications, {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    const notificationDiv = await page.locator(platformMenuNames.Notification.main.pageElementdiv).first();
    if (notificationDiv !== null) {
    await testInfo.attach(setEsign.screenformLastNotifications, {
        body: await notificationDiv.screenshot(),
        contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    }
} else if (viewportWidth >= 768 && viewportWidth < 1024) {
    await page.click('mwc-icon-button.menu');
    await page.click('mwc-list-item#dashboardnotifications');
    await testInfo.attach('TabletNotifications', {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettingsAlternative.screenShotsContentType
    });
} else {
    // Modo móvil
    await page.click('mwc-icon-button.menu');
    await page.click('mwc-list-item#dashboardnotifications');
    await testInfo.attach('NotificationsMobile', {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettingsAlternative.screenShotsContentType
    });
}
  });

  test('Trazit-Platform-UserProfile-setShift', async ({ page }, testInfo) => {
    await page.pause();
    let afterEachData = {
      textInNotif1:"",
      textInNotif2:"",
      textInNotif3:"",
    }

    const logs: { message: any, type: string }[] = [];
    const errors: Error[] = [];

    // Captura los mensajes de la consola
    page.on('console', (message) => {
      logs.push({ message: message.text(), type: message.type() });
    });

    // Captura los errores de la página
    page.on('pageerror', (exception) => {
      errors.push(exception);
    });

    await testInfo.attach(setShift.screenBeforeShiftChange, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.getByLabel(setShift.fldShift.label).click();
    await page.pause();
    await page.pause();
    await page.getByRole('option', { name: setShift.fldShift.newValue }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(setPassword.screenSelectOptionShift, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.getByLabel(setShift.fldShift.actionName).nth(2).click();
    await page.pause();
    await page.pause();

    // Dialog Confirm
    await testInfo.attach(setPassword.screenEmptyForm, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.getByRole('textbox', { name: ConfigSettingsAlternative.login.fldUser.label }).click();
    await page.pause();
    await page.pause();
    await page.getByRole('textbox', { name: ConfigSettingsAlternative.login.fldUser.label }).fill(ConfigSettingsAlternative.login.fldUser.value);
    await page.pause();
    await page.pause();
    await page.getByLabel(setShift.CurrentPassword).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(setShift.CurrentPassword).fill(ConfigSettingsAlternative.login.fldPss.value);
    await page.pause();
    await page.pause();
    await testInfo.attach(setShift.screenFilledForm, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});

    await page.getByRole('button', { name: setShift.buttonAccept }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(setShift.screenShotsAccept, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
  
    console.log('Console logs:', logs);
    console.log('Page errors:', errors);

    // expect.soft(logs.length).toBe(0);
    expect(errors.length).toBe(0);

    afterEachData.textInNotif1=setShift.textInNotif1
    afterEachData.textInNotif2=setShift.textInNotif2
    afterEachData.textInNotif3=setShift.textInNotif3

    // Obtener el modo de dispositivo usando page.evaluate
    const viewportWidth = await page.evaluate(() => {
        return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    });
    
    if (viewportWidth >= 1024) {
        // Modo escritorio o tablet en modo paisaje
        const notificationElement = await page.locator(platformMenuNames.Notification.main.pageElement);
        if (notificationElement !== null) {
        await notificationElement.hover();
        }
        await testInfo.attach(setShift.screenformNotifications, {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        const notificationDiv = await page.locator(platformMenuNames.Notification.main.pageElementdiv).first();
        if (notificationDiv !== null) {
        await testInfo.attach(setShift.screenformLastNotifications, {
            body: await notificationDiv.screenshot(),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        }
    } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        await page.click('mwc-icon-button.menu');
        await page.click('mwc-list-item#dashboardnotifications');
        await testInfo.attach('TabletNotifications', {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    } else {
        // Modo móvil
        await page.click('mwc-icon-button.menu');
        await page.click('mwc-list-item#dashboardnotifications');
        await testInfo.attach('NotificationsMobile', {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    }
  });

  test('Trazit-Platform-UserProfile-setAlias', async ({ page }, testInfo) => {
    await page.pause();
    let afterEachData = {
      textInNotif1:"",
      textInNotif2:"",
      textInNotif3:"",
    } 
    
    const logs: { message: any, type: string }[] = [];
    const errors: Error[] = [];

    // Captura los mensajes de la consola
    page.on('console', (message) => {
      logs.push({ message: message.text(), type: message.type() });
    });

    // Captura los errores de la página
    page.on('pageerror', (exception) => {
      errors.push(exception);
    });

    await testInfo.attach(setAlias.screenBeforeAliasChange, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.getByLabel(setAlias.fldAlias.label).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(setAlias.fldAlias.label).fill(setAlias.fldAlias.newValue);
    await page.pause();
    await page.pause();
    await testInfo.attach(setAlias.screenCompletedChangeAliasForm, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.getByLabel(setAlias.fldAlias.actionName).first().click();
    await page.pause();
    await page.pause();

    // Dialog Confirm
    await testInfo.attach(setAlias.screenEmptyForm, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.getByRole('textbox', { name: ConfigSettingsAlternative.login.fldUser.label }).click();
    await page.pause();
    await page.pause();
    await page.getByRole('textbox', { name: ConfigSettingsAlternative.login.fldUser.label }).fill(ConfigSettingsAlternative.login.fldUser.value);
    await page.pause();
    await page.pause();
    await page.getByLabel(setAlias.CurrentPassword).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(setAlias.CurrentPassword).fill(ConfigSettingsAlternative.login.fldPss.value);
    await page.pause();
    await page.pause();
    await testInfo.attach(setAlias.screenFilledForm, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});

    await page.getByRole('button', { name: setAlias.buttonAccept }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(setAlias.screenShotsAccept, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});

    console.log('Console logs:', logs);
    console.log('Page errors:', errors);

    // expect.soft(logs.length).toBe(0);
    expect(errors.length).toBe(0);

    afterEachData.textInNotif1=setAlias.textInNotif1
    afterEachData.textInNotif2=setAlias.textInNotif2
    afterEachData.textInNotif3=setAlias.textInNotif3

      // Obtener el modo de dispositivo usando page.evaluate
      const viewportWidth = await page.evaluate(() => {
        return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    });
    
    if (viewportWidth >= 1024) {
        // Modo escritorio o tablet en modo paisaje
        const notificationElement = await page.locator(platformMenuNames.Notification.main.pageElement);
        if (notificationElement !== null) {
        await notificationElement.hover();
        }
        await testInfo.attach(setAlias.screenformNotifications, {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        const notificationDiv = await page.locator(platformMenuNames.Notification.main.pageElementdiv).first();
        if (notificationDiv !== null) {
        await testInfo.attach(setAlias.screenformLastNotifications, {
            body: await notificationDiv.screenshot(),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        }
    } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        await page.click('mwc-icon-button.menu');
        await page.click('mwc-list-item#dashboardnotifications');
        await testInfo.attach('TabletNotifications', {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    } else {
        // Modo móvil
        await page.click('mwc-icon-button.menu');
        await page.click('mwc-list-item#dashboardnotifications');
        await testInfo.attach('NotificationsMobile', {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    }
});



  test('Trazit-Platform-UserProfile-NewMail', async ({ page }, testInfo) => {
    await page.pause();
    let afterEachData = {
      textInNotif1:"",
      textInNotif2:"",
      textInNotif3:"",
    } 
    
    const logs: { message: any, type: string }[] = [];
    const errors: Error[] = [];

    // Captura los mensajes de la consola
    page.on('console', (message) => {
      logs.push({ message: message.text(), type: message.type() });
    });

    // Captura los errores de la página
    page.on('pageerror', (exception) => {
      errors.push(exception);
    });

    await testInfo.attach(setMail.screenBeforeMailChange, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});  
    await page.getByLabel(setMail.fldMail.label).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(setMail.fldMail.label).fill(setMail.fldMail.newValue);
    await page.pause();
    await page.pause();
    await testInfo.attach(setMail.screenCompletedChangeMailForm, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.getByLabel(setMail.fldMail.actionName).nth(1).click();
    await page.pause();
    await page.pause();

  // Dialog Confirm
  await testInfo.attach(setMail.screenEmptyForm, {
    body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
  await page.getByRole('textbox', { name: ConfigSettingsAlternative.login.fldUser.label }).click();
  await page.pause();
  await page.pause();
  await page.getByRole('textbox', { name: ConfigSettingsAlternative.login.fldUser.label }).fill(ConfigSettingsAlternative.login.fldUser.value);
  await page.pause();
  await page.pause();
  await page.getByLabel(setMail.CurrentPassword).click();
  await page.pause();
  await page.pause();
  await page.getByLabel(setMail.CurrentPassword).fill(ConfigSettingsAlternative.login.fldPss.value);
  await page.pause();
  await page.pause();
  await testInfo.attach(setMail.screenFilledForm, {
    body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});

  await page.getByRole('button', { name: setMail.buttonAccept }).click();
  await page.pause();
  await page.pause();
  await testInfo.attach(setMail.screenShotsAccept, {
    body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});

  console.log('Console logs:', logs);
  console.log('Page errors:', errors);

  // expect.soft(logs.length).toBe(0);
  expect(errors.length).toBe(0);
  
  afterEachData.textInNotif1=setMail.textInNotif1
  afterEachData.textInNotif2=setMail.textInNotif2
  afterEachData.textInNotif3=setMail.textInNotif3

  // Obtener el modo de dispositivo usando page.evaluate
  const viewportWidth = await page.evaluate(() => {
      return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  });
  
  
  if (viewportWidth >= 1024) {
    // Modo escritorio o tablet en modo paisaje
    const notificationElement = await page.locator(platformMenuNames.Notification.main.pageElement);
    if (notificationElement !== null) {
    await notificationElement.hover();
    }
    await testInfo.attach(setMail.screenformNotifications, {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    const notificationDiv = await page.locator(platformMenuNames.Notification.main.pageElementdiv).first();
    if (notificationDiv !== null) {
    await testInfo.attach(setMail.screenformLastNotifications, {
        body: await notificationDiv.screenshot(),
        contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    }
} else if (viewportWidth >= 768 && viewportWidth < 1024) {
    await page.click('mwc-icon-button.menu');
    await page.click('mwc-list-item#dashboardnotifications');
    await testInfo.attach('TabletNotifications', {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettingsAlternative.screenShotsContentType
    });
} else {
    // Modo móvil
    await page.click('mwc-icon-button.menu');
    await page.click('mwc-list-item#dashboardnotifications');
    await testInfo.attach('NotificationsMobile', {
    body: await page.screenshot({ fullPage: true }),
    contentType: ConfigSettingsAlternative.screenShotsContentType
    });
}
});


  test('Trazit-Platform-UserProfile-Save', async ({ page }, testInfo) => {
    await page.pause();
    
    const logs: { message: any, type: string }[] = [];
    const errors: Error[] = [];

    // Captura los mensajes de la consola
    page.on('console', (message) => {
      logs.push({ message: message.text(), type: message.type() });
    });

    // Captura los errores de la página
    page.on('pageerror', (exception) => {
      errors.push(exception);
    });

    await page.getByRole('button', { name: save.buttonSave }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(save.screenAfterClickSave, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    console.log('Console logs:', logs);
    console.log('Page errors:', errors);

    // expect.soft(logs.length).toBe(0);
    expect(errors.length).toBe(0);
    })
    
}


test.describe('Desktop Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
      await page.setViewportSize({ width: 1365, height: 821 });
      const logPlat = new LogIntoPlatform({ page });
      const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
      await page.waitForTimeout(3000);
      const openWindow = new OpenSettingsWindow({ page });
      await page.waitForTimeout(3000);
      await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, platformMenuNames.mySettings.main, platformMenuNames.mySettings.userProfile);
  });
  commonTests();
});

// test.describe('Mobile mode', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//       await page.setViewportSize({ width: 385, height: 812 });
//       const logPlat = new LogIntoPlatform({ page });
//       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow = new OpenSettingsWindow({ page });
//       await page.waitForTimeout(3000);
//       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.mySettings.mobile, platformMenuNames.mySettings.userProfile);
//   });
//   commonTests();
// });

// test.describe('Mobile mode Retrato', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//       await page.setViewportSize({ width: 812, height: 385 });
//       const logPlat = new LogIntoPlatform({ page });
//       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow = new OpenSettingsWindow({ page });
//       await page.waitForTimeout(3000);
//       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.mySettings.mobile, platformMenuNames.mySettings.userProfile);
//   });
//   commonTests();
// });

// test.describe('Tablets mode', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//       await page.setViewportSize({ width: 768, height: 1024 });
//       const logPlat = new LogIntoPlatform({ page });
//       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow = new OpenSettingsWindow({ page });
//       await page.waitForTimeout(3000);
//       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.mySettings.mobile, platformMenuNames.mySettings.userProfile);
//   });
//   commonTests();
// });

// test.describe('Tablets mode Retrato', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//       await page.setViewportSize({ width: 1024, height: 768 });
//       const logPlat = new LogIntoPlatform({ page });
//       const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//       await page.waitForTimeout(3000);
//       const openWindow = new OpenSettingsWindow({ page });
//       await page.waitForTimeout(3000);
//       await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, platformMenuNames.mySettings.main, platformMenuNames.mySettings.userProfile);
//   });
//   commonTests();
// });


const { test: pwTest, afterEach } = require('@playwright/test');


// After Each Hook to log results
test.afterEach(async ({ page }, testInfo) => {
  const durationInSeconds = (testInfo.duration / 1000).toFixed(2);
  await test.step('Log test results', async () => {
  const data = {
    test_name: testInfo.title,
    duration: `${durationInSeconds} seconds`,
  };

  const testStatus = testInfo.status;
  await callApiRunCompletion(data, testStatus);
  })
});

pwTest('Example test', async ({ page }) => {
    // Tu lógica de prueba aquí
});
