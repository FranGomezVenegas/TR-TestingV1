import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { newCalendar, cancelCalendar, selectCalendar, cancelAddDate, completeAddDate, removeDate } from '../../trazit-models/test-config.platform-holidayscalendar.js'
import { MenuInstrumentsControl } from '../../trazit-models/test-config-instruments-global';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenSettingsWindow } from '../1TRAZiT-Commons/openSettingsWindows';


//Function with all tests.
const commonTests = () => {
  test('Trazit-Plataform-HolidaysCalendar-Open', async ({ page }, testInfo) => {   
      await page.pause();
      await page.pause();
      
      // // Variable usada paa almacenar la URL del request.
      // let requestUrl = '';

      // // Listener para capturar la URL del request que contiene la parte común.   
      // page.on('request', request => {
      //     const url = request.url();
      //     const urlIncluded = request.url().includes('https://platform.trazit.net:8443/TRAZiT-API/')
      //     expect(urlIncluded).toBe(true);
      // });
      // await page.pause();
      // await page.pause();

      // // Espero la solicitud capturada usando waitForRequest
      // const requestPromise = page.waitForRequest(request => {
      //     return request.url().includes('https://platform.trazit.net:8443/TRAZiT-API/') &&
      //         request.method() === 'GET';
      // });
      // await page.pause();
      // await page.pause();
      // // Espero la respuesta capturada usando waitForResponse
      // const responsePromise = page.waitForResponse(response => {
      //     return response.url().includes('https://platform.trazit.net:8443/TRAZiT-API/');
      // });
      // await page.pause();
      // await page.pause();
      // // Espero tanto la solicitud como la respuesta capturadas
      // const [request, response] = await Promise.all([requestPromise, responsePromise]);
      // await page.pause();

      // if (request && response) {
      //     console.log(`\nRequest captured:\n${request.url()}`);
      //     console.log(`\nResponse captured:\n${response.url()}`);
      // } else {
      //     console.error('No request or response captured for the expected URL');
      // }

      // await page.pause();
      // await page.pause();
      // //await page.close();
  });

  
  test('Trazit-Plataform-HolidaysCalendar-NewCalendar', async ({ page }, testInfo) => {
    let afterEachData = {
      textInNotif1:"",
      textInNotif2:"",
      textInNotif3:"",
    }
    await page.getByText(newCalendar.buttonName).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(newCalendar.screenShotsEmptyForm, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByLabel(newCalendar.fldName.label).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(newCalendar.fldName.label).fill(newCalendar.fldName.value);
    await page.pause();
    await page.pause();
    await page.getByLabel(newCalendar.fldDescription.label).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(newCalendar.fldDescription.label).fill(newCalendar.fldDescription.value);
    await page.pause();
    await page.pause();
    await testInfo.attach(newCalendar.screenShotsFilledForm, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByRole('button', {name: newCalendar.buttonAccept}).click()
    await page.pause();
    await page.pause();
    await testInfo.attach(newCalendar.screenAfterClickAccept, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.pause();

    afterEachData.textInNotif1=newCalendar.textInNotif1
    afterEachData.textInNotif2=newCalendar.textInNotif2
    afterEachData.textInNotif3=newCalendar.textInNotif3

    // Obtener el modo de dispositivo usando page.evaluate
    const viewportWidth = await page.evaluate(() => {
        return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    });
    
    if (viewportWidth >= 1024) {
        // Modo escritorio o tablet en modo paisaje
        const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
        if (notificationElement !== null) {
        await notificationElement.hover();
        }
        await testInfo.attach(newCalendar.screenformNotifications, {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
        if (notificationDiv !== null) {
        await testInfo.attach(newCalendar.screenformLastNotifications, {
            body: await notificationDiv.screenshot(),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        }
    } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        // Tablet en modo retrato
        await page.click('mwc-icon-button.menu');
        await page.click('mwc-list-item#dashboardnotifications');
        await testInfo.attach('Tablet Notifications', {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    } else {
        // Modo móvil
        await page.click('mwc-icon-button.menu');
        await page.click('mwc-list-item#dashboardnotifications');
        await testInfo.attach('Notifications Mobile', {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    }
  })
    
  test('Trazit-Plataform-HolidaysCalendar-CancelCalendar', async ({ page }, testInfo) => { 
    await page.pause();
    await page.pause();
    //await page.getByRole('menuitem', { name: 'list Holidays Calendar' }).locator('#label').click();
    await page.getByText(cancelCalendar.buttonName).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(cancelCalendar.screenShotsEmptyForm, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByLabel(cancelCalendar.fldName.label).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(cancelCalendar.fldName.label).fill(cancelCalendar.fldName.value);
    await page.pause();
    await page.pause();
    await page.getByLabel(cancelCalendar.fldDescription.label).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(cancelCalendar.fldDescription.label).fill(cancelCalendar.fldDescription.value);
    await page.pause();
    await page.pause();
    await testInfo.attach(cancelCalendar.screenShotsFilledForm, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByRole('button', {name: cancelCalendar.buttonCancel}).click()
    await page.pause();
    await page.pause();
    await testInfo.attach(cancelCalendar.screenAfterClickCancel, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.pause();
  })

  test('Trazit-Plataform-HolidaysCalendar-SelectCalendar', async ({ page }, testInfo) => {
    await page.pause();
    await page.getByLabel(selectCalendar.fldCalendarList.label).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(selectCalendar.scrennShotsOptionCalendar, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByRole('option', { name: selectCalendar.fldCalendarList.value }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(selectCalendar.screenAfterClickCalendar, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
  });


  test('Trazit-Plataform-HolidaysCalendar-CancelAddDate', async ({ page }, testInfo) => {
    await page.pause();
    await page.getByLabel(selectCalendar.fldCalendarList.label).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(selectCalendar.scrennShotsOptionCalendar, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByRole('option', { name: selectCalendar.fldCalendarList.value }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(selectCalendar.screenAfterClickCalendar, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByLabel(cancelAddDate.buttonName).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(cancelAddDate.screenShotsEmptyForm, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    }); 
    await page.getByLabel(cancelAddDate.fldDate.label).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(cancelAddDate.fldDate.label).fill(cancelAddDate.fldDate.value);
    await page.pause();
    await page.pause();
    await page.locator(cancelAddDate.date.label).click();
    await page.fill(cancelAddDate.date.label, cancelAddDate.date.value);
    await testInfo.attach(cancelAddDate.screenShotsFilledForm, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    }); 
    await page.getByRole('button', { name: cancelAddDate.buttonCancel  }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(cancelAddDate.screenShotsCancel, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    }); 
    await page.pause();
  });

  test('Trazit-Plataform-HolidaysCalendar-CompleteAddDate', async ({ page }, testInfo) => {
    let afterEachData = {
      textInNotif1:"",
      textInNotif2:"",
      textInNotif3:"",
    }
    await page.pause();
    await page.getByLabel(selectCalendar.fldCalendarList.label).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(selectCalendar.scrennShotsOptionCalendar, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByRole('option', { name: selectCalendar.fldCalendarList.value }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(selectCalendar.screenAfterClickCalendar, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    }); 
    await page.getByLabel(completeAddDate.buttonName).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(completeAddDate.screenShotsEmptyForm, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    }); 
    await page.getByLabel(completeAddDate.fldDate.label).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(completeAddDate.fldDate.label).fill(completeAddDate.fldDate.value);
    await page.pause();
    await page.pause();
    await page.locator(completeAddDate.date.label).click();
    await page.pause();
    await page.pause();
    await page.fill(completeAddDate.date.label, completeAddDate.date.value);
    await page.pause();
    await page.pause();
    await page.getByRole('button', { name: completeAddDate.buttonAccept  }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(completeAddDate.screenShotsAccept, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    }); 
    await page.pause();
    await page.pause();

    afterEachData.textInNotif1=completeAddDate.textInNotif1
    afterEachData.textInNotif2=completeAddDate.textInNotif2
    afterEachData.textInNotif3=completeAddDate.textInNotif3

    // Obtener el modo de dispositivo usando page.evaluate
    const viewportWidth = await page.evaluate(() => {
        return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    });
    
    if (viewportWidth >= 1024) {
        // Modo escritorio o tablet en modo paisaje
        const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
        if (notificationElement !== null) {
        await notificationElement.hover();
        }
        await testInfo.attach(completeAddDate.screenformNotifications, {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
        if (notificationDiv !== null) {
        await testInfo.attach(completeAddDate.screenformLastNotifications, {
            body: await notificationDiv.screenshot(),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        }
    } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        // Tablet en modo retrato
        const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
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

  test('Trazit-Plataform-HolidaysCalendar-RemoveDate', async ({ page }, testInfo) => {
    let afterEachData = {
      textInNotif1:"",
      textInNotif2:"",
      textInNotif3:"",
    }

    await page.pause();
    await page.getByLabel(selectCalendar.fldCalendarList.label).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(selectCalendar.scrennShotsOptionCalendar, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByRole('option', { name: selectCalendar.fldCalendarList.value }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(selectCalendar.screenAfterClickCalendar, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    }); 
        
    await page.getByText(removeDate.selectName, {exact: true}).click();
    await testInfo.attach(removeDate.screenShotsSelectName, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });
    await page.getByLabel(removeDate.buttonRemove).click();
    await testInfo.attach(removeDate.screenShotsRemoveDate, {
      body: await page.screenshot({ fullPage: true }),
      contentType: ConfigSettingsAlternative.screenShotsContentType
    });


    afterEachData.textInNotif1=removeDate.textInNotif1
    afterEachData.textInNotif2=removeDate.textInNotif2
    afterEachData.textInNotif3=removeDate.textInNotif3

    // Obtener el modo de dispositivo usando page.evaluate
    const viewportWidth = await page.evaluate(() => {
        return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    });
    
    if (viewportWidth >= 1024) {
        // Modo escritorio o tablet en modo paisaje
        const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
        if (notificationElement !== null) {
        await notificationElement.hover();
        }
        await testInfo.attach(removeDate.screenformNotifications, {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
        if (notificationDiv !== null) {
        await testInfo.attach(removeDate.screenformLastNotifications, {
            body: await notificationDiv.screenshot(),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        }
    } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        // Tablet en modo retrato
        const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
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
}



test.describe('Desktop Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
      await page.setViewportSize({ width: 1365, height: 821 });
      const logPlat = new LogIntoPlatform({ page });
      const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
      await page.waitForTimeout(3000);
      const openWindow = new OpenSettingsWindow({ page });
      await page.waitForTimeout(3000);
      await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, platformMenuNames.mySettings.main, platformMenuNames.mySettings.holidaysCalendar);
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
//       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.mySettings.mobile, platformMenuNames.mySettings.holidaysCalendar);
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
//       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.mySettings.mobile, platformMenuNames.mySettings.holidaysCalendar);
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
//       await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, platformMenuNames.mySettings.mobile, platformMenuNames.mySettings.holidaysCalendar);
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
//       await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, platformMenuNames.mySettings.main, platformMenuNames.mySettings.holidaysCalendar);
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
