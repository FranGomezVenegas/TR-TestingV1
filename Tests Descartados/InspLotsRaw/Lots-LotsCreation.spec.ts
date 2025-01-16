import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';
import { MenuInstrumentsControl } from '../../trazit-models/test-config-instruments-global';

import { MenuLots, Menu } from '../../trazit-models/test-config-lots-global';
import { LotsCreationNew } from '../../trazit-models/test-config-Lots-LotsCreation-New';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';


//Function with all tests.
const commonTests = () => {
    test('Trazit-Lots-LotsCreation-Open', async ({ page }) => {
        // Variable para almacenar la URL del request.
        let requestUrl = '';
        
        // Variables para indicar si se ha encontrado una URL válida y una respuesta válida.
        let validRequestFound = false;
        let validResponseFound = false;
        
        // Listener para capturar la URL del request que contiene la parte común.
        page.on('request', request => {
            const url = request.url();
            // Verifico si la URL del request contiene la parte común esperada.
            if (url.includes('https://platform.trazit.net:8443/TRAZiT-API/')) {
                // Verifico explícitamente que la URL contenga la parte común esperada.
                expect(url).toContain('https://platform.trazit.net:8443/TRAZiT-API/');
                validRequestFound = true; // Marco que se encontró una URL válida.
                console.log(`Request URL matched: ${url}`);
            } else {
                // Si la URL del request no coincide con la parte común esperada, muestro un error.
                console.error(`Unexpected request URL: ${url}`);
            }
        });
        
        // Espero la solicitud capturada usando waitForRequest
        const requestPromise = page.waitForRequest(request => {
            // Espero hasta que se capture una solicitud que tenga la URL esperada y sea un método GET.
            return request.url().includes('https://platform.trazit.net:8443/TRAZiT-API/') &&
                request.method() === 'GET';
        }, { timeout: 10000 }) // Espero hasta 10 segundos antes de que falle la espera.
        .catch(error => {
            // Manejo el caso donde no se captura la solicitud como se esperaba.
            console.error('Request not captured as expected:', error);
            return null; // Retorno null para indicar que no se capturó la solicitud.
        });
        
        // Espero la respuesta capturada usando waitForResponse
        const responsePromise = page.waitForResponse(response => {
            // Espero hasta que se capture una respuesta que tenga la URL esperada.
            return response.url().includes('https://platform.trazit.net:8443/TRAZiT-API/');
        }, { timeout: 10000 }) // Espero hasta 10 segundos antes de que falle la espera.
        .catch(error => {
            // Manejo el caso donde no se captura la respuesta como se esperaba.
            console.error('Response not captured as expected:', error);
            return null; // Retorno null para indicar que no se capturó la respuesta.
        });
        
        // Espero tanto la solicitud como la respuesta capturadas
        const [request, response] = await Promise.all([requestPromise, responsePromise]);
        
        if (request && response) {
            // Si se capturaron tanto la solicitud como la respuesta, muestro sus URLs.
            console.log(`\nRequest captured:\n${request.url()}`);
            console.log(`\nResponse captured:\n${response.url()}`);
            validResponseFound = true; // Marco que se encontró una respuesta válida.
        } else {
            // Si no se capturó ni la solicitud ni la respuesta, muestro un error.
            console.error('No request or response captured for the expected URL');
        }
        
        // Verifico si se ha encontrado una solicitud y una respuesta válidas. 
        expect(validRequestFound).toBe(true); 
        expect(validResponseFound).toBe(true); 
    });
    

    
    test('Trazit-Lots-LotsCreation-New-Accept', async ({ page }, testInfo) => {
        await page.pause();

        let afterEachData = {
            textInNotif1: "",
            textInNotif2: "",
            textInNotif3: "",
        };

        
        // Variable para almacenar la URL del request.
        let requestUrl = '';
            
        // Variables para indicar si se ha encontrado una URL válida y una respuesta válida.
        let validRequestFound = false;
        let validResponseFound = false;
        
        // Listener para capturar la URL del request que contiene la parte común.
        page.on('request', request => {
            const url = request.url();
            // Verifico si la URL del request contiene la parte común esperada.
            if (url.includes('https://platform.trazit.net:8443/TRAZiT-API/')) {
                // Verifico explícitamente que la URL contenga la parte común esperada.
                expect(url).toContain('https://platform.trazit.net:8443/TRAZiT-API/');
                validRequestFound = true; // Marco que se encontró una URL válida.
                console.log(`Request URL matched: ${url}`);
            } else {
                // Si la URL del request no coincide con la parte común esperada, muestro un error.
                console.error(`Unexpected request URL: ${url}`);
            }
        });
        
    
        await page.getByText(LotsCreationNew.select).click();
        await page.pause();
        await page.pause();

        await page.getByLabel(LotsCreationNew.buttonNew).click();
        await page.pause();
        await testInfo.attach(LotsCreationNew.screenShotsFormEmpty, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.pause();
        await page.getByLabel(LotsCreationNew.fldNameLot.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsCreationNew.fldNameLot.label).press(LotsCreationNew.fldNameLot.actionName);
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsCreationNew.fldNameLot.label).fill(LotsCreationNew.fldNameLot.value);
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsCreationNew.fldQuantity.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsCreationNew.fldQuantity.label).fill(LotsCreationNew.fldQuantity.value);
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsCreationNew.fldUOM.label).click();
        await page.pause();
        await page.pause();
        await page.getByRole('option', { name: LotsCreationNew.fldUOM.value }).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsCreationNew.fldNumBulks.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsCreationNew.fldNumBulks.label).fill(LotsCreationNew.fldNumBulks.value);
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsCreationNew.fldNumContainers.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsCreationNew.fldNumContainers.label).fill(LotsCreationNew.fldNumContainers.value);
        await page.pause();
        await page.pause();
    
        await testInfo.attach(LotsCreationNew.screenShotsFormFilled, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.pause();

        await page.getByRole('button', { name: LotsCreationNew.buttonAccept.label }).click();
        await page.pause();
        await page.pause();
    
        
        // Espero la solicitud capturada usando waitForRequest
        const requestPromise = page.waitForRequest(request => {
            // Espero hasta que se capture una solicitud que tenga la URL esperada y sea un método GET.
            return request.url().includes('https://platform.trazit.net:8443/TRAZiT-API/') &&
                request.method() === 'GET';
        }, { timeout: 10000 }) // Espero hasta 10 segundos antes de que falle la espera.
        .catch(error => {
            // Manejo el caso donde no se captura la solicitud como se esperaba.
            console.error('Request not captured as expected:', error);
            return null; // Retorno null para indicar que no se capturó la solicitud.
        });
        
        // Espero la respuesta capturada usando waitForResponse
        const responsePromise = page.waitForResponse(response => {
            // Espero hasta que se capture una respuesta que tenga la URL esperada.
            return response.url().includes('https://platform.trazit.net:8443/TRAZiT-API/');
        }, { timeout: 10000 }) // Espero hasta 10 segundos antes de que falle la espera.
        .catch(error => {
            // Manejo el caso donde no se captura la respuesta como se esperaba.
            console.error('Response not captured as expected:', error);
            return null; // Retorno null para indicar que no se capturó la respuesta.
        });
        
        await page.pause();

        await page.getByRole('button', { name: LotsCreationNew.buttonAccept.label }).click();
        await page.pause();
        await page.pause();

        // Espero tanto la solicitud como la respuesta capturadas
        const [request, response] = await Promise.all([requestPromise, responsePromise]);
        
        if (request && response) {
            // Si se capturaron tanto la solicitud como la respuesta, muestro sus URLs.
            console.log(`\nRequest captured:\n${request.url()}`);
            console.log(`\nResponse captured:\n${response.url()}`);
            validResponseFound = true; // Marco que se encontró una respuesta válida.
        } else {
            // Si no se capturó ni la solicitud ni la respuesta, muestro un error.
            console.error('No request or response captured for the expected URL');
        }
         
        // Verifico si se ha encontrado una solicitud y una respuesta válidas. 
        expect(validRequestFound).toBe(true); 
        expect(validResponseFound).toBe(true); 

    
        await page.pause();
    
        await testInfo.attach(LotsCreationNew.screenShotsAfterClickButtonAccept, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
        await page.pause();

        //await page.waitForResponse(response => response.url().includes('https://platform.trazit.net:8443/TRAZiT-API/'));
        await page.pause();

        afterEachData.textInNotif1 = LotsCreationNew.textInNotif1;
        afterEachData.textInNotif2 = LotsCreationNew.textInNotif2;
        afterEachData.textInNotif3 = LotsCreationNew.textInNotif3;
    
        // Obtener el modo de dispositivo usando page.evaluate
        const viewportWidth = await page.evaluate(() => {
            return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        });
    
        // Manejo de capturas de pantalla y notificaciones según el modo del dispositivo
        if (viewportWidth >= 1024) {
            // Modo escritorio o tablet en modo paisaje
            const notificationElement = await page.locator(MenuInstrumentsControl.Notification.main.pageElement);
            if (notificationElement !== null) {
                await notificationElement.hover();
            }
            await testInfo.attach(LotsCreationNew.screenformNotifications, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettingsAlternative.screenShotsContentType
            });
            const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
            if (notificationDiv !== null) {
                await testInfo.attach(LotsCreationNew.screenformLastNotifications, {
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
    
    


    test('Trazit-Lots-LotsCreation-New-Cancel', async ({ page }, testInfo) => {
        await page.getByText(LotsCreationNew.select).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsCreationNew.buttonNew).click();
        await page.pause();
        await page.pause();
        await testInfo.attach( LotsCreationNew.screenShotsFormEmpty, {
            body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
        await page.getByLabel(LotsCreationNew.fldNameLot.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsCreationNew.fldNameLot.label).press(LotsCreationNew.fldNameLot.actionName);
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsCreationNew.fldNameLot.label).fill(LotsCreationNew.fldNameLot.value);
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsCreationNew.fldNameLot.label).press(LotsCreationNew.fldNameLot.actionName);
        await page.pause();
        await page.getByLabel(LotsCreationNew.fldQuantity.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsCreationNew.fldQuantity.label).fill(LotsCreationNew.fldQuantity.value);
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsCreationNew.fldUOM.label).click();
        await page.pause();
        await page.pause();
        await page.getByRole('option', { name: LotsCreationNew.fldUOM.value }).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsCreationNew.fldNumBulks.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsCreationNew.fldNumBulks.label).fill(LotsCreationNew.fldNumBulks.value);
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsCreationNew.fldNumContainers.label).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsCreationNew.fldNumContainers.label).fill(LotsCreationNew.fldNumContainers.value);
        await page.pause();
        await page.pause();
        await testInfo.attach( LotsCreationNew.screenShotsFormFilled, {
            body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
        await page.pause();
        await page.getByRole('button', { name: LotsCreationNew.buttonCancel.label }).click();
        await page.pause();
        await page.pause();
        await testInfo.attach( LotsCreationNew.screenShotsAfterClickButtonCancel, {
            body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
        await page.pause();
        await page.close();
    })

}


test.describe('Desktop Mode', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        await page.setViewportSize({ width: 1365, height: 821 });
        const logPlat = new LogIntoPlatform({ page });
        const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
        await page.waitForTimeout(3000);
        const openWindow = new OpenProcedureWindow({ page });
        await page.waitForTimeout(3000);
        await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuLots.Lots.main, MenuLots.Lots.lotsCreation);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.lotsCreation);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.lotsCreation);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.lotsCreation);
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
        await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, MenuLots.Lots.main, MenuLots.Lots.lotsCreation);
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
