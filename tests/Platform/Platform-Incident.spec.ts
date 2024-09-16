import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { newTicket, botonConfirm, botonNota, botonCloseIt, botonReopenIt } from '../../trazit-models/test-config.platform-incident';
import { MenuInstrumentsControl } from '../../trazit-models/test-config-instruments-global';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenSettingsWindow } from '../1TRAZiT-Commons/openSettingsWindows';


//Function with all tests.
const commonTests = () => {
  test('Trazit-Platform-Incidents-Open', async ({ page }, testInfo) => {
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

    // expect.soft(errors.length).toBe(0);
    expect(errors.length).toBe(0);
  });

  test('Trazit-Platform-Incident-NewTicket', async ({ page }, testInfo) => {
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

      
    await page.getByLabel(newTicket.buttonName, { exact: true }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(newTicket.screenShotsNew, {
      body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.locator(newTicket.optionIncident).first().click();
    await page.pause();
    await page.pause();
    await testInfo.attach(newTicket.screenShotsEmptyForm, {
      body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByRole('combobox', { name: newTicket.fldProcedure.label }).click();
    await page.pause();
    await page.pause();
    await page.getByRole('listbox').click();
    await page.pause();
    await page.pause();
    await page.getByRole('option', { name: newTicket.fldProcedure.option }).click();
    await page.pause();
    await page.pause();
    await page.getByRole('textbox', { name: newTicket.fldTitle.label }).click();
    await page.pause();
    await page.pause();
    await page.getByRole('textbox', { name: newTicket.fldTitle.label }).fill(newTicket.fldTitle.value);
    await page.pause();
    await page.pause();
    await page.getByRole('combobox', { name: newTicket.fldPriority.label }).click();
    await page.pause();
    await page.pause();
    await page.getByRole('option', { name: newTicket.fldPriority.value }).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(newTicket.fldNote.label, { exact: true }).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(newTicket.fldNote.label, { exact: true }).fill(newTicket.fldNote.value);
    await page.pause();
    await page.pause();
    await testInfo.attach(newTicket.screenShotsFilledForm, {
      body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByRole('button', { name: newTicket.buttonNew }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(newTicket.screenShotsButtonNew, {
      body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
    });

    console.log('Console logs:', logs);
    console.log('Page errors:', errors);

    // expect.soft(errors.length).toBe(0);
    expect(errors.length).toBe(0);

    afterEachData.textInNotif1=newTicket.textInNotif1
    afterEachData.textInNotif2=newTicket.textInNotif2
    afterEachData.textInNotif3=newTicket.textInNotif3

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
        await testInfo.attach(newTicket.screenformNotifications, {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        const notificationDiv = await page.locator(platformMenuNames.Notification.main.pageElementdiv).first();
        if (notificationDiv !== null) {
        await testInfo.attach(newTicket.screenformLastNotifications, {
            body: await notificationDiv.screenshot(),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        }
    } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        // Tablet en modo retrato
        const notificationElement = await page.locator(platformMenuNames.Notification.main.pageElement);
        if (notificationElement !== null) {
        await notificationElement.click();
        }
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
  })
    

  test('Boton Confirm', async ({ page }, testInfo) => {
    await page.pause();
    let afterEachData = {
      textInNotif1:"",
      textInNotif2:"",
      textInNotif3:"",
    }
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


    await page.getByText(botonConfirm.selectNombre, { exact: true }).first().click();
    await page.pause();
    await page.pause();
    await testInfo.attach(botonConfirm.screenShotsSelect, {
      body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.pause();
    await page.getByLabel(botonConfirm.buttonNameConfirm).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(botonConfirm.screenShotsEmptyForm, {
      body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByLabel(botonConfirm.fldNote.label, { exact: true }).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(botonConfirm.fldNote.label, { exact: true }).fill(botonConfirm.fldNote.value);
    await page.pause();
    await page.pause();
    await testInfo.attach(botonConfirm.screenShotsFilledForm, {
      body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByRole('button', { name: botonConfirm.buttonConfirm }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(newTicket.screenShotsConfirm, {
      body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.pause();

    console.log('Console logs:', logs);
    console.log('Page errors:', errors);

    // expect.soft(errors.length).toBe(0);
    expect(errors.length).toBe(0);
    
    afterEachData.textInNotif1=botonConfirm.textInNotif1
    afterEachData.textInNotif2=botonConfirm.textInNotif2
    afterEachData.textInNotif3=botonConfirm.textInNotif3

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
        await testInfo.attach(botonConfirm.screenformNotifications, {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        const notificationDiv = await page.locator(platformMenuNames.Notification.main.pageElementdiv).first();
        if (notificationDiv !== null) {
        await testInfo.attach(botonConfirm.screenformLastNotifications, {
            body: await notificationDiv.screenshot(),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        }
    } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        // Tablet en modo retrato
        const notificationElement = await page.locator(platformMenuNames.Notification.main.pageElement);
        if (notificationElement !== null) {
        await notificationElement.click();
        }
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


  test('Boton Nota', async ({ page }, testInfo) => {
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

    await page.getByText(botonNota.selectNombre, { exact: true }).first().click();
    await page.pause();
    await page.pause();
    await page.getByLabel(botonNota.buttonNameNote).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(botonNota.screenShotsEmptyForm, {
      body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByLabel(botonNota.fldNote.label, { exact: true }).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(botonNota.fldNote.label, { exact: true }).fill(botonNota.fldNote.value);
    await page.pause();
    await page.pause();
    await testInfo.attach(botonNota.screenShotsFilledForm, {
      body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByRole('button', { name: botonNota.buttonAddNote }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(botonNota.screenShotsAddNote, {
      body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.pause();

    console.log('Console logs:', logs);
    console.log('Page errors:', errors);

    // expect.soft(errors.length).toBe(0);
    expect(errors.length).toBe(0);

    
    afterEachData.textInNotif1=botonNota.textInNotif1
    afterEachData.textInNotif2=botonNota.textInNotif2
    afterEachData.textInNotif3=botonNota.textInNotif3

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
        await testInfo.attach(botonNota.screenformNotifications, {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        const notificationDiv = await page.locator(platformMenuNames.Notification.main.pageElementdiv).first();
        if (notificationDiv !== null) {
        await testInfo.attach(botonNota.screenformLastNotifications, {
            body: await notificationDiv.screenshot(),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        }
    } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        // Tablet en modo retrato
        const notificationElement = await page.locator(platformMenuNames.Notification.main.pageElement);
        if (notificationElement !== null) {
        await notificationElement.click();
        }
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


  test('Boton Close It!', async ({ page }, testInfo) => {
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
    await page.getByText(botonCloseIt.selectNombre, { exact: true }).first().click();
    await page.pause();
    await page.pause();
    await testInfo.attach(botonNota.screenShotsSelectName, {
      body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByTitle(botonCloseIt.buttonCloseIt.label).getByLabel(botonCloseIt.buttonCloseIt.value).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(botonNota.screenShotsEmptyForm, {
      body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByLabel(botonCloseIt.fldNote.label, { exact: true }).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(botonCloseIt.fldNote.label, { exact: true }).fill(botonCloseIt.fldNote.value);
    await page.pause();
    await page.pause();
    await testInfo.attach(botonNota.screenShotsFilledForm, {
      body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByRole('button', { name: botonCloseIt.buttonConfirmCloseIt }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(botonNota.screenShotsCloseIt, {
      body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
    });
  
    console.log('Console logs:', logs);
    console.log('Page errors:', errors);

    // expect.soft(errors.length).toBe(0);
    expect(errors.length).toBe(0);

    afterEachData.textInNotif1=botonCloseIt.textInNotif1
    afterEachData.textInNotif2=botonCloseIt.textInNotif2
    afterEachData.textInNotif3=botonCloseIt.textInNotif3

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
        await testInfo.attach(botonCloseIt.screenformNotifications, {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        const notificationDiv = await page.locator(platformMenuNames.Notification.main.pageElementdiv).first();
        if (notificationDiv !== null) {
        await testInfo.attach(botonCloseIt.screenformLastNotifications, {
            body: await notificationDiv.screenshot(),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        }
    } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        // Tablet en modo retrato
        const notificationElement = await page.locator(platformMenuNames.Notification.main.pageElement);
        if (notificationElement !== null) {
        await notificationElement.click();
        }
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



  test('Boton ReOpen It!', async ({ page }, testInfo) => {
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

    await page.getByText(botonReopenIt.selectNombre, { exact: true }).first().click();
    await page.pause();
    await page.pause();  
    await testInfo.attach(botonReopenIt.screenShotsSelectName, {
      body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByText(botonReopenIt.buttonTitle, { exact: true }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(botonReopenIt.screenShotsEmptyForm, {
      body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByLabel(botonReopenIt.fldNumberOfDays.label).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(botonReopenIt.fldNumberOfDays.label).fill(botonReopenIt.fldNumberOfDays.value);
    await page.pause();
    await page.pause();
    await page.locator(botonReopenIt.refresh.locator).getByLabel(botonReopenIt.refresh.actionName).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(botonReopenIt.screenShotsFilledForm, {
      body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    //await page.getByLabel('Incident Id - Date Creation').click();
    await page.pause();
    await page.pause();
    await page.getByRole('button', { name: 'ReOpen it!' }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(botonReopenIt.screenShotsReopenIt, {
      body: await page.screenshot({ fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType
    });

    
    console.log('Console logs:', logs);
    console.log('Page errors:', errors);

    // expect.soft(errors.length).toBe(0);
    expect(errors.length).toBe(0);

    
    afterEachData.textInNotif1=botonCloseIt.textInNotif1
    afterEachData.textInNotif2=botonCloseIt.textInNotif2
    afterEachData.textInNotif3=botonCloseIt.textInNotif3
    
    await page.locator(MenuInstrumentsControl.Notification.main.pageElement).hover();
    await testInfo.attach(MenuInstrumentsControl.Notification.main.screenShotsName, {
      body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});  
    let notif=await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first()
    await page.pause();  
    await page.pause();  
    await page.pause();  
    
    await testInfo.attach(MenuInstrumentsControl.Notification.main.screenShotsdivNotification, {body: await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).screenshot(), contentType:  ConfigSettingsAlternative.screenShotsContentType});
    await page.close();
  });
}



test.describe('Desktop Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
      await page.setViewportSize({ width: 1365, height: 821 });
      const logPlat = new LogIntoPlatform({ page });
      const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
      await page.waitForTimeout(3000);
      const openWindow = new OpenSettingsWindow({ page });
      await page.waitForTimeout(3000);
      await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, platformMenuNames.mySettings.main, platformMenuNames.mySettings.incidents);
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
//       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.mySettings.mobile, platformMenuNames.mySettings.incidents);
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
//       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.mySettings.mobile, platformMenuNames.mySettings.incidents);
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
//       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.mySettings.mobile, platformMenuNames.mySettings.incidents);
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
//       await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, platformMenuNames.mySettings.main, platformMenuNames.mySettings.incidents);
//   });
//   commonTests();
// });


const { test: pwTest, afterEach } = require('@playwright/test');

afterEach(async ({}, testInfo) => {
  const durationInSeconds = (testInfo.duration / 1000).toFixed(2);
  
  const data = {
    test_name: testInfo.title,
    duration: `${durationInSeconds} seconds`,
  };

  const testStatus = testInfo.status;
  await callApiRunCompletion(data, testStatus);
});

pwTest('Example test', async ({ page }) => {
    // Tu lógica de prueba aquí
});
