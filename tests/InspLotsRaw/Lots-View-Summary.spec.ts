import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';
import {MenuInstrumentsControl} from '../../trazit-models/test-config-instruments-global';

import { MenuLots, Menu } from '../../trazit-models/test-config-lots-global';
import { LotsViewSearch } from '../../trazit-models/test-config-losts-lots-view-search';

import { Summary } from '../../trazit-models/test-config-Lots-Summary';

import { callApiEndpoint } from '../../trazit-models/test-config-Call-ApiName';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';


//Function with all tests.
const commonTests = () => {
    test('Trazit-Lots-LotsView-Search-Summary', async ({ page }, testInfo) => {
        await page.pause();
        await page.pause();
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
        
        await page.getByLabel(Summary.buttonSummary).click();
        await page.pause();
        await page.pause();
        await testInfo.attach(Summary.screenShotsButtonSummary, {
            body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
        await page.pause();
        await page.getByLabel(LotsViewSearch.buttonName).click();
        await page.pause();
        await page.pause();
        await page.getByLabel(LotsViewSearch.fldSearch.label).fill(LotsViewSearch.fldSearch.value);
        await page.pause();
        await page.pause();
        await testInfo.attach(LotsViewSearch.screenShotsFormFilled, {
            body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
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
        await page.getByRole('button', { name: LotsViewSearch.buttonSearch.label }).click();
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

    
        await testInfo.attach(LotsViewSearch.screenShotsSearch, {
            body: await page.screenshot({fullPage: true }), contentType: ConfigSettingsAlternative.screenShotsContentType});
        await page.pause();
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
        await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuLots.Lots.main, MenuLots.Lots.lostView);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.lostView);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.lostView);
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
        await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuLots.Lots.mobile, MenuLots.Lots.lostView);
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
        await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, MenuLots.Lots.main, MenuLots.Lots.lostView);
    });
    commonTests();
  });
  
    
  const { test:pwTest, afterEach } = require('@playwright/test');
   
  afterEach(async ({}, testInfo) => {
    // Example JSON data, could be anything relevant to your tests
    const data = {
      test_name: testInfo.title,
      duration: testInfo.duration,
      // other test-related data you might want to send
    };
   
    // Determine the test outcome
    const testStatus = testInfo.status; // 'passed', 'failed', 'timedOut', 'skipped'
   
    await callApiEndpoint(data, testStatus);
  });
   
  pwTest('Example test', async ({ page }) => {
    // Your test logic here
  });
  