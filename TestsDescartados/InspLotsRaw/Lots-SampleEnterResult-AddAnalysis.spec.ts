import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';


import { MenuLots, Menu } from '../../trazit-models/test-config-lots-global';
import { AlreadyAnalyzed, AddAnalysis } from '../../trazit-models/test-config-Lots-SampleEnterResult-AddAnalysis';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';
   

//Function with all tests.
const commonTests = () => {
  test('Trazit-Lots-SampleEnterResult-Open', async ({ page }) => {
    await page.pause();
        await page.pause();
        // Variable usada para almacenar la URL del request.
        let requestUrl = '';

        // Listener para capturar la URL del request que contiene la parte común.   
        page.on('request', request => {
            const url = request.url();
            const urlIncluded = request.url().includes('https://platform.trazit.net:8443/TRAZiT-API/')
            expect(urlIncluded).toBe(true);
        });
        await page.pause();
        await page.pause();

        // Espero la solicitud capturada usando waitForRequest
        const requestPromise = page.waitForRequest(request => {
            return request.url().includes('https://platform.trazit.net:8443/TRAZiT-API/') &&
                request.method() === 'GET';
        });
        await page.pause();
        await page.pause();
        // Espero la respuesta capturada usando waitForResponse
        const responsePromise = page.waitForResponse(response => {
            return response.url().includes('https://platform.trazit.net:8443/TRAZiT-API/');
        });
        await page.pause();
        await page.pause();
        
        // Espero tanto la solicitud como la respuesta capturadas
        const [request, response] = await Promise.all([requestPromise, responsePromise]);
        await page.pause();

        if (request && response) {
            console.log(`\nRequest captured:\n${request.url()}`);
            console.log(`\nResponse captured:\n${response.url()}`);
        } else {
            console.error('No request or response captured for the expected URL');
        }

        await page.pause();
        await page.pause();

    }),
    

  test('Trazit-Lots-SampleEnterResult-AlreadyAnalyzed', async ({ page }, testInfo) => {
    await page.pause();
    let afterEachData = {
        textInNotif1:"",
        textInNotif2:"",
        textInNotif3:"",
    }

    await page.getByText(AlreadyAnalyzed.selectSampleID, { exact: true }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AlreadyAnalyzed.screenShotsSelectSampleID, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.getByLabel(AlreadyAnalyzed.buttonAddAnalysis).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AlreadyAnalyzed.screenShotsButtonAdd, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.getByText(AlreadyAnalyzed.selectAnalysis).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AlreadyAnalyzed.screenShotsSelectAnalysis, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.getByRole('button', { name: AlreadyAnalyzed.fldAccept.label }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AlreadyAnalyzed.screenShotsButtonAdd, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
                
    await page.getByRole('button', { name: AlreadyAnalyzed.fldAccept.label }).first().click();
    await page.pause();
    await page.pause();
   
    afterEachData.textInNotif1=AlreadyAnalyzed.textInNotif1
    afterEachData.textInNotif2=AlreadyAnalyzed.textInNotif2
    afterEachData.textInNotif3=AlreadyAnalyzed.textInNotif3
      
    const viewportWidth = await page.evaluate(() => {
        return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    });

    if (viewportWidth >= 1024) {
        const notificationElement = await page.locator(MenuLots.Notification.main.pageElement);
        if (notificationElement !== null) {
            await notificationElement.hover();
        }
        await testInfo.attach(AlreadyAnalyzed.screenformNotifications, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        const notificationDiv = await page.locator(MenuLots.Notification.main.pageElementdiv).first();
        if (notificationDiv !== null) {
            await testInfo.attach(AlreadyAnalyzed.screenformLastNotifications, {
                body: await notificationDiv.screenshot(),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
        }
    } else if (viewportWidth >= 768 && viewportWidth < 769) {
        await page.click('mwc-icon-button.menu');
        await page.click('mwc-list-item#dashboardnotifications');
        await testInfo.attach('Tablet Notifications', {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    } else if (viewportWidth >= 812 && viewportWidth < 813) {
        await page.click('mwc-icon-button.menu');
        await page.click('mwc-list-item#dashboardnotifications');
        await testInfo.attach('Notifications Mobile Retrato', {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    } else {
        await page.click('mwc-icon-button.menu');
        await page.click('mwc-list-item#dashboardnotifications');
        await testInfo.attach('NotificationsMobile', {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    }
  });

  test('Trazit-Lots-SampleEnterResult-AddAnalysis-Accept', async ({ page }, testInfo) => {
    await page.pause();
    
    let afterEachData = {
        textInNotif1:"",
        textInNotif2:"",
        textInNotif3:"",
    }


    // Variable usada paa almacenar la URL del request.
    let requestUrl = '';

    // Listener para capturar la URL del request que contiene la parte común        
        page.on('request', request => {
            const url = request.url();
            const urlIncluded = request.url().includes('https://platform.trazit.net:8443/TRAZiT-API/')
            expect(urlIncluded).toBe(true);
            });

    await page.getByText(AddAnalysis.selectSampleID, { exact: true }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AddAnalysis.screenShotsSelectSampleId, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.getByLabel(AddAnalysis.buttonAddAnalysis).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AddAnalysis.screenShotsAddAnalysis, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.getByText(AddAnalysis.selectAnalysis).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AddAnalysis.screenShotsSelectAnalysis, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.getByRole('button', { name: AddAnalysis.buttonAccept.label }).click();
    await page.pause();
    await page.pause();
    // Espero la solicitud capturada usando waitForRequest
    const requestPromise = page.waitForRequest(request => {
        return request.url().includes('https://platform.trazit.net:8443/TRAZiT-API/') &&
            request.method() === 'GET';
    });
    await page.pause();

    // Espero la respuesta capturada usando waitForResponse
    const responsePromise = page.waitForResponse(response => {
        return response.url().includes('https://platform.trazit.net:8443/TRAZiT-API/');
    });
    await page.pause();

    await testInfo.attach(AddAnalysis.screenShotsButtonAccept, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});

    await page.pause();
    await page.pause();
        
    // Espero tanto la solicitud como la respuesta capturadas
    const [request, response] = await Promise.all([requestPromise, responsePromise]);

    if (request && response) {
        console.log(`\nRequest captured:\n${request.url()}`);
        console.log(`\nResponse captured:\n${response.url()}`);
    } else {
        console.error('No request or response captured for the expected URL');
    }
    await page.pause();
    await page.pause();


    afterEachData.textInNotif1=AddAnalysis.textInNotif1
    afterEachData.textInNotif2=AddAnalysis.textInNotif2
    afterEachData.textInNotif3=AddAnalysis.textInNotif3
      
    const viewportWidth = await page.evaluate(() => {
        return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    });

    if (viewportWidth >= 1024) {
        const notificationElement = await page.locator(MenuLots.Notification.main.pageElement);
        if (notificationElement !== null) {
            await notificationElement.hover();
        }
        await testInfo.attach(AddAnalysis.screenformNotifications, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        const notificationDiv = await page.locator(MenuLots.Notification.main.pageElementdiv).first();
        if (notificationDiv !== null) {
            await testInfo.attach(AddAnalysis.screenformLastNotifications, {
                body: await notificationDiv.screenshot(),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
        }
    } else if (viewportWidth >= 768 && viewportWidth < 769) {
        await page.click('mwc-icon-button.menu');
        await page.click('mwc-list-item#dashboardnotifications');
        await testInfo.attach('Tablet Notifications', {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    } else if (viewportWidth >= 812 && viewportWidth < 813) {
        await page.click('mwc-icon-button.menu');
        await page.click('mwc-list-item#dashboardnotifications');
        await testInfo.attach('Notifications Mobile Retrato', {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    } else {
        await page.click('mwc-icon-button.menu');
        await page.click('mwc-list-item#dashboardnotifications');
        await testInfo.attach('NotificationsMobile', {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    }
  });  
  

  test('Trazit-Lots-SampleEnterResult-AddAnalysis-Close', async ({ page }, testInfo) => {
    await page.pause();
    await page.getByText(AlreadyAnalyzed.selectSampleID, { exact: true }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AlreadyAnalyzed.screenShotsSelectSampleID, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.getByLabel(AlreadyAnalyzed.buttonAddAnalysis).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AlreadyAnalyzed.screenShotsButtonAdd, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.getByText(AlreadyAnalyzed.selectAnalysis).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AlreadyAnalyzed.screenShotsSelectAnalysis, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.getByRole('button', { name: AlreadyAnalyzed.fldClose.label, exact: true }).click();
    await page.pause();
    await page.pause();
    await testInfo.attach(AlreadyAnalyzed.screenShotsClose, {
        body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
    await page.pause();
    //await page.close();
  });
}



test.describe('Desktop Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
      await page.setViewportSize({ width: 1365, height: 821 });
      const logPlat = new LogIntoPlatform({ page });
      const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
      await page.waitForTimeout(3000);
      const openWindow = new OpenProcedureWindow({ page });
      await page.waitForTimeout(3000);
      await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuLots.Lots.main, MenuLots.Lots.lotsSampleEnterResult);
  });
  commonTests();
});

test.describe('Mobile mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
      await page.setViewportSize({ width: 385, height: 812 });
      const logPlat = new LogIntoPlatform({ page });
      const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
      await page.waitForTimeout(3000);
      const openWindow = new OpenProcedureWindow({ page });
      await page.waitForTimeout(3000);
      await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.lotsSampleEnterResult);
  });
  commonTests();
});

test.describe('Mobile mode Retrato', () => {
  test.beforeEach(async ({ page }, testInfo) => {
      await page.setViewportSize({ width: 812, height: 385 });
      const logPlat = new LogIntoPlatform({ page });
      const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
      await page.waitForTimeout(3000);
      const openWindow = new OpenProcedureWindow({ page });
      await page.waitForTimeout(3000);
      await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.lotsSampleEnterResult);
  });
  commonTests();
});

test.describe('Tablets mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      const logPlat = new LogIntoPlatform({ page });
      const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
      await page.waitForTimeout(3000);
      const openWindow = new OpenProcedureWindow({ page });
      await page.waitForTimeout(3000);
      await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.lotsSampleEnterResult);
  });
  commonTests();
});

test.describe('Tablets mode Retrato', () => {
  test.beforeEach(async ({ page }, testInfo) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      const logPlat = new LogIntoPlatform({ page });
      const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
      await page.waitForTimeout(3000);
      const openWindow = new OpenProcedureWindow({ page });
      await page.waitForTimeout(3000);
      await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.lotsSampleEnterResult);
  });
  commonTests();
});


const { test: pwTest, afterEach } = require('@playwright/test');

afterEach(async ({}, testInfo) => {
    const data = {
        test_name: testInfo.title,
        duration: testInfo.duration,
    };

    const testStatus = testInfo.status;

    await callApiRunCompletion(data, testStatus);
});

pwTest('Example test', async ({ page }) => {
    // Tu lógica de prueba aquí
});