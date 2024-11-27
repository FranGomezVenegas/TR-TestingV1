import { test, expect } from '@playwright/test';

import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoPlatform } from '../1TRAZiT-Commons/logIntoPlatform';

import { openAttachment as dataForTestFromFile } from '../../trazit-models/test-config-instruments-attachment';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { OpenProcedureWindow } from '../1TRAZiT-Commons/openProcedureWindow';

import { Logger, NetworkInterceptor, ResponseValidator, phraseReport } from '../1TRAZiT-Commons/consoleAndNetworkMonitor';
import { NotificationWitness, ReportNotificationPhase } from '../1TRAZiT-Commons/notification';
import { clickElementByText, clickElement, fillUserField,fillPasswordField, justificationPhrase, clickAcceptButton, attachScreenshot } from '../1TRAZiT-Commons/actionsHelper';

import {handleTabInteraction} from '../1TRAZiT-Commons/tabsInteractions';
import {handleActionNameInteraction} from '../1TRAZiT-Commons/actionsNameInteractions';
import {handleObjectByTabsWithSearchInteraction} from '../1TRAZiT-Commons/objectByTabsWithSearch';
import {handleRowActionsInteraction} from '../1TRAZiT-Commons/rowActionsInteractions';
import { handleMenus } from '../1TRAZiT-Commons/handleMenus';

// Función con todas las pruebas.
const commonTests = async (ConfigSettings, page, testInfo) => { 
    await handleMenus(page);

    // Crear instancias de Logger y NetworkInterceptor
    const logger = new Logger();
    const networkInterceptor = new NetworkInterceptor();

    let openAttachment;

    // Procesar los datos de configuración si están disponibles
    if (ConfigSettings && ConfigSettings.dataForTest) {
        let unescapedString = ConfigSettings.dataForTest.replace(/\\+/g, '\\');
        try {
            openAttachment = JSON.parse(unescapedString);
            openAttachment = JSON.parse(openAttachment.testDataGame);  // Parsear JSON anidado
        } catch (error) {
            console.error("Error al analizar el JSON:", error);
        }
    } else {
        openAttachment = dataForTestFromFile;
    }

    // Adjuntar Logger y NetworkInterceptor a la página
    await test.step(phraseReport.phraseNetworkInterceptionAndLogger, async () => {
        logger.attachToPage(page);
        networkInterceptor.attachToPage(page);
    });

    
    // Función de interacción con pestañas
    await handleTabInteraction(page, testInfo, ConfigSettingsAlternative, openAttachment);

    // Comprueba si un objeto con pestañas tiene un campo de búsqueda, interactuar si es así
    await handleObjectByTabsWithSearchInteraction(page, testInfo, ConfigSettingsAlternative, openAttachment);

    // Llamada a la función para los rowActions
    const rowActions = await handleRowActionsInteraction(page, openAttachment, testInfo); 
    console.log("Resultado de handleRowActionsInteraction:", rowActions);

    // Si `handleRowActionsInteraction` se ejecutó correctamente, omitir secciones específicas
    if (rowActions) {
        console.log("El resultado fue verdadero, realizando acciones adicionales...");
        await fillUserField(page, testInfo); // Rellenar campo de usuario
        await fillPasswordField(page, testInfo); // Rellenar campo de contraseña
        await justificationPhrase(page, 30000, testInfo); // Continuar con la justificación
        await clickAcceptButton(page);

        // Verificar respuestas de red capturadas
        await test.step(phraseReport.phraseVerifyNetwork, async () => {
            networkInterceptor.printNetworkData();
            const nullResponsesCount = networkInterceptor.verifyNonImageNullResponses();
            expect(nullResponsesCount).toBe(0);  // Asegurar que no haya respuestas nulas
        });

        // Validar respuestas usando ResponseValidator
        await test.step(phraseReport.phraseVerifyNetwork, async () => {
            const responseValidator = new ResponseValidator(networkInterceptor.responses);
            try {
                await responseValidator.validateResponses(); // Lanzar error si no hay respuestas válidas
            } catch (error) {
                console.error("Error al validar respuestas:", error);
            }
        });

       
        return; // Finaliza si rowActions fue exitoso
    }

    console.log("El resultado fue falso, continuando con el flujo normal...");

    // Si `handleDragDropBoxesInteraction` no fue exitoso, continuar con el flujo normal
    await handleActionNameInteraction(page, testInfo, openAttachment);

    // Realizar pausas configuradas en el test
    await test.step(openAttachment.phrasePauses, async () => {
        await page.pause();
    });

    // Realizar pausas configuradas en el test
    await test.step(openAttachment.phrasePauses, async () => {
        await page.pause();
    });

    // Crear un nuevo contexto de navegador para `page1`
    const browser = page.context().browser();
    if (browser) {
        const context = await browser.newContext();
        const page1 = await context.newPage();
        
        // Navegar a la URL en `page1`
        await test.step(openAttachment.phraseNavigation, async () => {
            const positionURL = openAttachment.positionURL - 1;
            
            await page.getByLabel(openAttachment.labelURL).nth(positionURL).click({timeout: 30000});
            await page1.goto(openAttachment.url); // Navegar a la URL en `page1`
        });

        // Capturar pantalla de `page1` (la nueva página)
        await test.step(openAttachment.phraseScreenShots, async () => {
            const screenshot = await page1.screenshot(); // Captura en `page1`
            await testInfo.attach(openAttachment.screenShotsUrl, {
                body: screenshot,
                contentType: ConfigSettingsAlternative.screenShotsContentType,
            });
            if (openAttachment.phrasePauses) {
                await page.pause();
            }
        });

        // Continuar con el flujo
        // Justification Phrase
        await fillUserField(page1, testInfo); // Rellena el campo de "User"
        await fillPasswordField(page1, testInfo); // Rellena el campo de "Password"

        // Continuar con la justificación y otras acciones
        await justificationPhrase(page1, 30000, testInfo);    
        await clickAcceptButton(page1);
        
        const acceptButton = page1.getByRole('button', { name: openAttachment.buttonAccept }).nth(1);
        if (await acceptButton.isVisible()) {
            await test.step("Aceptar", async () => {
                await acceptButton.click();
            });
        } else {
            console.log("Botón de Aceptar no encontrado, omitiendo paso.");
        }

        // Verificar respuestas de red capturadas
        await test.step(phraseReport.phraseVerifyNetwork, async () => {
            networkInterceptor.printNetworkData();
            const nullResponsesCount = networkInterceptor.verifyNonImageNullResponses();
            expect(nullResponsesCount).toBe(0);  // Asegurarse de que no haya respuestas nulas
        });

        // Validar respuestas usando ResponseValidator
        await test.step(phraseReport.phraseVerifyNetwork, async () => {
            const responseValidator = new ResponseValidator(networkInterceptor.responses);
            try {
                await responseValidator.validateResponses(); // Lanzar error si no hay respuestas válidas
            } catch (error) {
                console.error("Error al validar respuestas:", error);
            }
        });
    }
};

let trazitTestName;
let procInstanceName;
let ConfigSettings;

    
test.describe('Desktop Mode', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await test.step('Set viewport size for desktop', async () => {
        await page.setViewportSize({ width: 1365, height: 821 });
      });
  
      const logPlat = new LogIntoPlatform({ page });
        trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution';
  
        // Define procInstanceName antes de pasarlo
        procInstanceName = process.env.PROC_INSTANCE_NAME || 'default'; // Valor predeterminado o el valor de tu entorno
  
        await test.step('Perform common setup', async () => {
            // Ahora pasas procInstanceName al llamar a commonBeforeEach
            ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
        });
  
        await test.step('Wait for 1 seconds', async () => {
            await page.waitForTimeout(1000);
        });
  
      const openWindow = new OpenProcedureWindow({ page });
  
      await test.step('Open procedure window for desktop', async () => {
        await test.step('Wait for 3 seconds', async () => {
          await page.waitForTimeout(3000);
        });
        await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings);
    });
});
      //And I call the tests.
      test('OpenAttachment', async ({ page }, testInfo) => {
        await test.step('Run tests', async () => {
            await commonTests(ConfigSettings, page, testInfo);
        });
    });
  });


// // Mobile Mode 
// test.describe('Mobile mode', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//       // Size of the viewport of a mobile device
//       await test.step('Set mobile viewport size', async () => {
//         await page.setViewportSize({ width: 385, height: 812 });
//       });
      
//       // Common configuration for both modes.
//       const logPlat = new LogIntoPlatform({ page });
//         trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution';
  
//         // Define procInstanceName antes de pasarlo
//         procInstanceName = process.env.PROC_INSTANCE_NAME || 'default'; // Valor predeterminado o el valor de tu entorno
  
//         await test.step('Perform common setup', async () => {
//             // Ahora pasas procInstanceName al llamar a commonBeforeEach
//             ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
//         });
  
//         await test.step('Wait for 1 seconds', async () => {
//             await page.waitForTimeout(1000);
//         });
  
//       const openWindow = new OpenProcedureWindow({ page });
  
//       await test.step('Open procedure window for TV', async () => {
//         await test.step('Wait for 3 seconds', async () => {
//           await page.waitForTimeout(3000);
//         });
//         await openWindow.openWindowForMobile(page, testInfo, ConfigSettings);
//       });
//     });
  
//     // And I call the tests.
//     test('OpenAttachment', async ({ page }, testInfo) => {
//       await test.step('Run tests', async () => {
//         await commonTests(ConfigSettings, page, testInfo);
//       });
//     });
//   });
  

// // // // Mobile Mode - Retrato
// test.describe('Mobile mode Retrato', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//       // Tamaño del viewport para móviles en modo retrato
//       await test.step('Set mobile portrait viewport size', async () => {
//         await page.setViewportSize({ width: 812, height: 385 });
//       });
  
//       // Configuración común para ambos modos.
//       const logPlat = new LogIntoPlatform({ page });
//         trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution';
  
//         // Define procInstanceName antes de pasarlo
//         procInstanceName = process.env.PROC_INSTANCE_NAME || 'default'; // Valor predeterminado o el valor de tu entorno
  
//         await test.step('Perform common setup', async () => {
//             // Ahora pasas procInstanceName al llamar a commonBeforeEach
//             ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
//         });
  
//         await test.step('Wait for 1 seconds', async () => {
//             await page.waitForTimeout(1000);
//         });
  
//       const openWindow = new OpenProcedureWindow({ page });
  
//       await test.step('Open procedure window for mobile', async () => {
//         await test.step('Wait for 3 seconds', async () => {
//           await page.waitForTimeout(3000);
//         });
//         await openWindow.openWindowForMobile(page, testInfo, ConfigSettings);
//       });
//     });
  
//     test('OpenAttachment', async ({ page }, testInfo) => {
//       await test.step('Run tests', async () => {
//         await commonTests(ConfigSettings, page, testInfo);
//       });
//     });
//   });
  


// // Tablets Mode
// test.describe('Tablets mode', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//       // Tamaño del viewport para tablets
//       await test.step('Set tablet viewport size', async () => {
//         await page.setViewportSize({ width: 768, height: 1024 });
//       });
  
//       // Configuración común para ambos modos.
//       const logPlat = new LogIntoPlatform({ page });
//         trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution';
  
//         // Define procInstanceName antes de pasarlo
//         procInstanceName = process.env.PROC_INSTANCE_NAME || 'default'; // Valor predeterminado o el valor de tu entorno
  
//         await test.step('Perform common setup', async () => {
//             // Ahora pasas procInstanceName al llamar a commonBeforeEach
//             ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
//         });
  
//         await test.step('Wait for 1 seconds', async () => {
//             await page.waitForTimeout(1000);
//         });
  
//       const openWindow = new OpenProcedureWindow({ page });
  
//       await test.step('Open procedure window for mobile', async () => {
//         await test.step('Wait for 3 seconds', async () => {
//           await page.waitForTimeout(3000);
//         });
//         await openWindow.openWindowForMobile(page, testInfo, ConfigSettings);
//       });
//     });
  
//     test('OpenAttachment', async ({ page }, testInfo) => {
//       await test.step('Run tests', async () => {
//         await commonTests(ConfigSettings, page, testInfo);
//       });
//     });
//   });
  

// // Tablets Mode - Retrato
// test.describe('Tablets mode Retrato', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//       // Tamaño del viewport para tablets en modo retrato
//       await test.step('Set tablet portrait viewport size', async () => {
//         await page.setViewportSize({ width: 1024, height: 768 });
//       });
  
//       // Configuración común para ambos modos.
//       const logPlat = new LogIntoPlatform({ page });
//         trazitTestName = process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution';
  
//         // Define procInstanceName antes de pasarlo
//         procInstanceName = process.env.PROC_INSTANCE_NAME || 'default'; // Valor predeterminado o el valor de tu entorno
  
//         await test.step('Perform common setup', async () => {
//             // Ahora pasas procInstanceName al llamar a commonBeforeEach
//             ConfigSettings = await logPlat.commonBeforeEach(page, testInfo, dataForTestFromFile, trazitTestName, procInstanceName);
//         });
  
//         await test.step('Wait for 1 seconds', async () => {
//             await page.waitForTimeout(1000);
//         });
  
//       const openWindow = new OpenProcedureWindow({ page });
  
//       await test.step('Open procedure window for desktop', async () => {
//         await test.step('Wait for 3 seconds', async () => {
//           await page.waitForTimeout(3000);
//         });
//         await openWindow.openWindowForDesktop(page, testInfo, ConfigSettings);
//       });
//     });
  
//     // And I call the tests.
//     test('OpenAttachment', async ({ page }, testInfo) => {
//       await test.step('Run tests', async () => {
//         await commonTests(ConfigSettings, page, testInfo);
//       });
//     });
//   });
  
  

const { test:pwTest, afterEach } = require('@playwright/test');
 
  
afterEach(async ({}, testInfo) => {
  
    const durationInSeconds = (testInfo.duration / 1000).toFixed(2);
  
    const data = {
      trazitTestName: process.env.TRAZIT_TEST_NAME || 'No Test Name in the script execution' ,
      duration: `${durationInSeconds} seconds`,
    };
  
    const testStatus = testInfo.status;
    const procInstanceName = process.env.PROC_INSTANCE_NAME || 'default'; 
    await callApiRunCompletion(data, testStatus, trazitTestName, testInfo, procInstanceName)
  });

   
//   pwTest('Example test', async ({ page }) => {
//     // Your test logic here
//   });