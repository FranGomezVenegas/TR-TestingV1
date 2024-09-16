import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { MenuInstrumentsControl } from '../../trazit-models/test-config-instruments-global';
import { UpdateInstrumentFamily as dataForTestFromFile } from '../../trazit-models/test-config-update-instrumentFamily';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { ConfirmDialogController } from '../1TRAZiT-Commons/1TRAZiT-ConfirmDialogs/1actionHasConfirmDialog';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

import { Logger, NetworkInterceptor } from '../1TRAZiT-Commons/consoleAndNetworkMonitor';

import * as fs1 from 'fs/promises'; // Importar fs/promises para operaciones asíncronas
import * as path from 'path'; 
import { exec } from 'child_process'; 
import { promisify } from 'util';
const execPromise = promisify(exec);

 
// import { renameReportFolders, uploadReportToAWS } from '../1TRAZiT-Commons/utils'; // Vamos a crear estas funciones nuevas

// Function with all tests.
const  commonTests = async (ConfigSettings, page, testInfo) => {
  // test('UpdateInstrumentFamily', async ({ page }, testInfo) => {
    await page.pause();
    let afterEachData = {
      textInNotif1:"",
      textInNotif2:"",
      textInNotif3:"",
    }


    // Create instances of Logger and NetworkInterceptor
    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();

    // Attach Logger and NetworkInterceptor to the page
    test.step('Attach Logger and NetworkInterceptor to the page', async () => {
        logger.attachToPage(page);
        networkInterceptor.attachToPage(page);
    });

    let UpdateInstrumentFamily; 

    if (ConfigSettings!==undefined && ConfigSettings.dataForTest!== undefined ) {
      let validJsonString = ConfigSettings.dataForTest.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
   
      // Intenta convertir el string en un objeto JSON
      UpdateInstrumentFamily = dataForTestFromFile;//JSON.parse(validJsonString);
    } else {
      UpdateInstrumentFamily = dataForTestFromFile;
    }
    await page.pause();
    await page.pause();
    await page.pause();
    await page.pause();
    const selectFamilyName = page.getByText(UpdateInstrumentFamily.selectInstrument, { exact: true });
    await selectFamilyName.scrollIntoViewIfNeeded();
    await page.pause();
    await page.pause();
    await page.pause();
    await page.pause();
    await selectFamilyName.click();
    await page.pause();
    await page.pause();
    await page.pause();
    await page.pause();
    await page.getByLabel(UpdateInstrumentFamily.buttonName).click();
    await page.pause();
    await page.pause();
    await page.pause();
    await page.pause();
    await page.getByLabel(UpdateInstrumentFamily.fldDescription.label).click();
    await page.pause();
    await page.pause();
    await page.getByLabel(UpdateInstrumentFamily.fldDescription.label).fill(UpdateInstrumentFamily.fldDescription.value);
    await page.pause();
    await page.pause();
    await page.getByRole('button', {name: UpdateInstrumentFamily.buttonAccept}).click();
    await page.pause();
    await page.pause();
    
    // Verificar que no haya errores de consola
    await test.step('Log all captured logs and network data', async () => {
      logger.printLogs();
      networkInterceptor.printNetworkData();
  });

  await test.step('Verify no console errors', async () => {
      expect(logger.errors.length).toBe(0);
  });

  // Verificar respuestas de red capturadas
  await test.step('Verify network responses captured', async () => {
      const nullResponsesCount = networkInterceptor.verifyNonImageNullResponses();
      expect(nullResponsesCount).toBe(0);
  });
  
    
  await page.pause();
  await page.pause();
  await page.pause();
  await page.pause();
  await page.pause();

  afterEachData.textInNotif1=UpdateInstrumentFamily.textInNotif1
  afterEachData.textInNotif2=UpdateInstrumentFamily.textInNotif2
  afterEachData.textInNotif3=UpdateInstrumentFamily.textInNotif3
  
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
        // await testInfo.attach(UpdateInstrumentFamily.screenformNotifications, {
        // body: await page.screenshot({ fullPage: true }),
        // contentType: ConfigSettingsAlternative.screenShotsContentType
        // });
        // const notificationDiv = await page.locator(MenuInstrumentsControl.Notification.main.pageElementdiv).first();
        // if (notificationDiv !== null) {
        // await testInfo.attach(UpdateInstrumentFamily.screenformLastNotifications, {
        //     body: await notificationDiv.screenshot(),
        //     contentType: ConfigSettingsAlternative.screenShotsContentType
        // });
        // }
    } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        // Tablet en modo retrato
        await page.click('md-filled-icon-button.menu');
        await page.click('md-list-item#dashboardnotifications');
        // await testInfo.attach('Tablet Notifications', {
        // body: await page.screenshot({ fullPage: true }),
        // contentType: ConfigSettingsAlternative.screenShotsContentType
        // });
    } else {
        // Modo móvil
        await page.click('md-filled-icon-button.menu');
        await page.click('md-list-item#dashboardnotifications');
        // await testInfo.attach('Notifications Mobile', {
        // body: await page.screenshot({ fullPage: true }),
        // contentType: ConfigSettingsAlternative.screenShotsContentType
        // });
    }

  // });

};

let trazitTestName;
let ConfigSettings;

test.describe('Desktop Mode', () => {

  
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1365, height: 821 });
    const logPlat = new LogIntoPlatform({ page });

    trazitTestName = testInfo.title
    ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName);

    await page.waitForTimeout(3000);
    const openWindow = new OpenProcedureWindow({ page });
    await page.waitForTimeout(3000);
    await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.main, MenuInstrumentsControl.Instruments.InstrumentFamilyList);
  });
  test('UpdateInstrumentFamily', async ({page}, testInfo) => {
    await commonTests(ConfigSettings, page, testInfo);

  });
  // test.afterEach(async () => {
  //   // Usar trazitTestName en el afterEach
  //   console.log(`El nombre del test en afterEach es: ${trazitTestName}`);
  // });
});

// test.describe('Mobile mode', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//     await page.setViewportSize({ width: 385, height: 812 });
//     const logPlat = new LogIntoPlatform({ page });
//     const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
//     const openWindow = new OpenProcedureWindow({ page });
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.InstrumentFamilyList);
//   });
//    test('UpdateInstrumentFamily', async ({page}, testInfo) => {
  //   await commonTests(ConfigSettings, page, testInfo);

  // });
// });

// test.describe('Mobile mode Retrato', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//     await page.setViewportSize({ width: 812, height: 385 });
//     const logPlat = new LogIntoPlatform({ page });
//     const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
//     const openWindow = new OpenProcedureWindow({ page });
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.InstrumentFamilyList);
//   });
    // test('UpdateInstrumentFamily', async ({page}, testInfo) => {
    //   await commonTests(ConfigSettings, page, testInfo);

    // });;
// });

// test.describe('Tablets mode', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//     await page.setViewportSize({ width: 768, height: 1024 });
//     const logPlat = new LogIntoPlatform({ page });
//     const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
//     const openWindow = new OpenProcedureWindow({ page });
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.InstrumentFamilyList);
//   });
    // test('UpdateInstrumentFamily', async ({page}, testInfo) => {
    //   await commonTests(ConfigSettings, page, testInfo);

    // });
// });

// test.describe('Tablets mode Retrato', () => {
//   test.beforeEach(async ({ page }, testInfo) => {
//     await page.setViewportSize({ width: 1024, height: 768 });
//     const logPlat = new LogIntoPlatform({ page });
//     const ConfigSettings = await logPlat.commonBeforeEach(page, testInfo);
//     await page.waitForTimeout(3000);
//     const openWindow = new OpenProcedureWindow({ page });
//     await page.waitForTimeout(3000);
//     await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.main, MenuInstrumentsControl.Instruments.InstrumentFamilyList);
//   });
    // test('UpdateInstrumentFamily', async ({page}, testInfo) => {
    //   await commonTests(ConfigSettings, page, testInfo);

    // });
// });

const { test: pwTest, afterEach } = require('@playwright/test');

afterEach(async ({}, testInfo) => {
  
  const durationInSeconds = (testInfo.duration / 1000).toFixed(2);

  const data = {
    test_name: testInfo.title,
    duration: `${durationInSeconds} seconds`,
  };

  const testStatus = testInfo.status;
  await callApiRunCompletion(data, testStatus, trazitTestName, testInfo)

  // const renameReportDir = await renameReportFolders(testInfo);

  // // Subir el reporte a AWS S3
  // const bucketName = ConfigSettings.bucket_for_testing_rpt; // Asumiendo que tienes esta propiedad en ConfigSettings
  // await uploadReportToAWS(bucketName, renameReportDir);

});

// test.afterAll(async () => {
//   try {
//       // Llamada al archivo .bat después de completar los tests y generar los reportes
//       const scriptPath = path.join(__dirname, 'RenameAndAWS.bat');
//       console.log(`Ruta absoluta del script: ${scriptPath}`);

//       const { stdout, stderr } = await execPromise(`"${scriptPath}"`);
//       if (stderr) {
//         throw new Error(`Error al ejecutar el script: ${stderr}`);
//       }
//       console.log('Salida del script:', stdout);
//     } catch (error) {
//       console.error('Error al ejecutar el script .bat:', error);
//     }
// })

pwTest('Example test', async ({ page }) => {
  // Tu lógica de prueba aquí
});
