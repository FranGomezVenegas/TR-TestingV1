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
import { NotificationWitness

 } from '../1TRAZiT-Commons/notification';
// import * as fs1 from 'fs/promises'; // Importar fs/promises para operaciones asíncronas
// import * as path from 'path'; 
// import { exec } from 'child_process'; 
// import { promisify } from 'util';
// const execPromise = promisify(exec);

 
// import { renameReportFolders, uploadReportToAWS } from '../1TRAZiT-Commons/utils'; // Vamos a crear estas funciones nuevas

// Function with all tests.
const commonTests = async (ConfigSettings, page, testInfo) => { 
    // Pausa para depuración
    await page.pause();

   
    // Crear instancias de Logger y NetworkInterceptor
    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();

    // Adjuntar Logger y NetworkInterceptor a la página
    await test.step('Attach Logger and NetworkInterceptor to the page', async () => {
        logger.attachToPage(page);
        networkInterceptor.attachToPage(page);
    });

    let UpdateInstrumentFamily;

    // Si hay datos de configuración disponibles, procesar el JSON
    if (ConfigSettings !== undefined && ConfigSettings.dataForTest !== undefined) {
        let validJsonString = ConfigSettings.dataForTest.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
        UpdateInstrumentFamily = dataForTestFromFile; // JSON.parse(validJsonString);
    } else {
        UpdateInstrumentFamily = dataForTestFromFile;
    }

    // NOTIFICATIONS
    let afterEachData = {
      textInNotif1: UpdateInstrumentFamily.textInNotif1,
      textInNotif2: UpdateInstrumentFamily.textInNotif2,
      textInNotif3: UpdateInstrumentFamily.textInNotif3,
    }

    const notificationWitness = new NotificationWitness(page);

    // Encontrar el elemento de familia de instrumentos y realizar scroll hasta él
    await test.step('Select instrument family', async () => {
      let selectFamilyName;
    
      try {
          // Intentar encontrar el elemento de nuevo en caso de que se haya perdido
          selectFamilyName = await page.getByText(UpdateInstrumentFamily.selectInstrument, { exact: true, timeout: 30000 });
          
          // Intentar hacer scroll al elemento si es necesario y hacer clic
          await selectFamilyName.scrollIntoViewIfNeeded(); // Hace scroll solo si es necesario
          await selectFamilyName.click(); // Hacer clic directamente
          await testInfo.attach(UpdateInstrumentFamily.screenShotsSelectInstrument, {
                body: await page.screenshot(),
                contentType: ConfigSettings.screenShotsContentType
            });
      } catch (error) {
          console.error('Error al intentar seleccionar la familia de instrumentos:', error);
          // Puedes agregar lógica adicional para manejar el error, como lanzar un error o tomar una captura de pantalla
          // await page.screenshot({ path: 'screenshot.png' }); // Ejemplo para capturar una pantalla
          throw error; // Re-lanzar el error si deseas que la prueba falle
      }
    });

    // Clic en el botón
    await test.step('Click on the button', async () => {
        await page.getByLabel(UpdateInstrumentFamily.buttonName).click();
        await testInfo.attach(UpdateInstrumentFamily.screenShotsFormEmpty, {
          body: await page.screenshot(),
          contentType: ConfigSettings.screenShotsContentType
      });
    });

    // Rellenar el campo de descripción
    await test.step('Fill the description field', async () => {
        await page.getByLabel(UpdateInstrumentFamily.fldDescription.label).dblclick();
        // await page.locator('label').filter({ hasText: UpdateInstrumentFamily.fldDescription.label }).dblclick();

        await page.getByLabel(UpdateInstrumentFamily.fldDescription.label).fill(UpdateInstrumentFamily.fldDescription.value);

        await testInfo.attach(UpdateInstrumentFamily.screenShotsFormFilled, {
          body: await page.screenshot(),
          contentType: ConfigSettings.screenShotsContentType
      });
    });

    // Aceptar los cambios
    await test.step('Click accept button', async () => {
      const button1 = page.getByRole('button', { name: UpdateInstrumentFamily.buttonAccept });
  
      try {
          // Intentar hacer clic en el primer botón
          if (await button1.isVisible()) {
              await button1.click();
              await testInfo.attach(UpdateInstrumentFamily.screenShotsButtonAccept, {
                body: await page.screenshot(),
                contentType: ConfigSettings.screenShotsContentType
            });
              // Si el primer botón no es visible, intentar hacer clic en el segundo botón
          } else {
              // Manejar el caso en que ninguno de los botones es visible
              console.log('Ningun boton está visible.');
              // Aquí puedes lanzar un error o manejar la situación según sea necesario
              // await expect(button1).toBeVisible(); // Descomenta si quieres que el test falle si los botones no están visibles
          }
      } catch (error) {
          console.error('Error al intentar hacer clic en el botón de aceptar:', error);
          // Puedes agregar lógica adicional para manejar el error, como tomar una captura de pantalla
          // await page.screenshot({ path: 'screenshot.png' }); // Ejemplo para capturar una pantalla
          throw error; // Re-lanzar el error si deseas que la prueba falle
      }
  });
  
    // Verificar que no haya errores de consola
    await test.step('Verify no console errors', async () => {
        logger.printLogs();
        expect(logger.errors.length).toBe(0);
    });

    // Verificar respuestas de red capturadas
    await test.step('Verify network responses', async () => {
        networkInterceptor.printNetworkData();
        const nullResponsesCount = networkInterceptor.verifyNonImageNullResponses();
        expect(nullResponsesCount).toBe(0);  // Asegurarse que no hay respuestas nulas
    });

    const mode = await notificationWitness.getDeviceMode(testInfo);
    
    // Llamar a addNotificationWitness después de realizar las acciones
    const capturedObjectName = await notificationWitness.addNotificationWitness(testInfo, afterEachData, mode);
      
    console.log('Captured Object Name:', capturedObjectName);

      // Añadir pausas finales si son necesarias
      await page.pause();
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

test.describe('Mobile mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 385, height: 812 });
    const logPlat = new LogIntoPlatform({ page });
    trazitTestName = testInfo.title
    ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName);
    await page.waitForTimeout(3000);
    const openWindow = new OpenProcedureWindow({ page });
    await page.waitForTimeout(3000);
    await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.InstrumentFamilyList);
  });
   test('UpdateInstrumentFamily', async ({page}, testInfo) => {
    await commonTests(ConfigSettings, page, testInfo);

  });
});

test.describe('Mobile mode Retrato', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 812, height: 385 });
    const logPlat = new LogIntoPlatform({ page });
    trazitTestName = testInfo.title
    ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName);
    await page.waitForTimeout(3000);
    const openWindow = new OpenProcedureWindow({ page });
    await page.waitForTimeout(3000);
    await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.InstrumentFamilyList);
  });
    test('UpdateInstrumentFamily', async ({page}, testInfo) => {
      await commonTests(ConfigSettings, page, testInfo);

    });;
});

test.describe('Tablets mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    const logPlat = new LogIntoPlatform({ page });
    trazitTestName = testInfo.title
    ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName);
    await page.waitForTimeout(3000);
    const openWindow = new OpenProcedureWindow({ page });
    await page.waitForTimeout(3000);
    await openWindow.openWindowForMobile(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.mobile, MenuInstrumentsControl.Instruments.InstrumentFamilyList);
  });
    test('UpdateInstrumentFamily', async ({page}, testInfo) => {
      await commonTests(ConfigSettings, page, testInfo);

    });
});

test.describe('Tablets mode Retrato', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    const logPlat = new LogIntoPlatform({ page });
    trazitTestName = testInfo.title
    ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName);

    await page.waitForTimeout(3000);
    const openWindow = new OpenProcedureWindow({ page });
    await page.waitForTimeout(3000);
    await openWindow.openWindowForTabletsModeRetrato(page, testInfo, ConfigSettings, MenuInstrumentsControl.Instruments.main, MenuInstrumentsControl.Instruments.InstrumentFamilyList);
  });
    test('UpdateInstrumentFamily', async ({page}, testInfo) => {
      await commonTests(ConfigSettings, page, testInfo);

    });
});

import { test as pwTest } from '@playwright/test';


test.afterEach(async ({}, testInfo) => {
  
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

// pwTest('Example test', async ({ page }) => {
//   // Tu lógica de prueba aquí
// });
