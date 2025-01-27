import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoProcDefinition } from '../1TRAZiT-Commons/logIntoProcDefinition';

import { MenuRDProjects } from '../../trazit-models/test-config-R&DProjects-global';
import { Export } from '../../trazit-models/test-config-ProcsDefinition-RandD-Export';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { OpenModuleWindow } from '../1TRAZiT-Commons/openModuleWindows';

import fs from 'fs';
import path from 'path';
// import pdfParse from 'pdf-parse';
import { parse } from 'csv-parse/sync';


// Function with all tests
const commonTests = () => {
    test('Trazit-ProceduresDefinition-RandD-Export-Roles', async ({ page, context }, testInfo) => {
        await page.pause();
        await page.pause();

        // Preparo para esperar la descarga
        const downloadPromise = page.waitForEvent('download');
        await page.getByLabel(Export.buttonName).nth(0).click();
        await page.pause();
        await page.pause();
    
        // Espero a que la descarga termine
        const download = await downloadPromise;
        await page.pause();
    
        await testInfo.attach(Export.screenShotsDownload, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    
        // Defino la ruta donde se guardará el archivo descargado
        const downloadPath = Export.downloadPath
        
        // Verifico si la carpeta existe; si no, la creo
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
    
        // Defino la ruta completa del archivo, añadiendo "Roles" al final del nombre del archivo sugerido
        const originalFileName = download.suggestedFilename();
        const fileNameWithRoles = path.basename(originalFileName, path.extname(originalFileName)) + '-Roles' + path.extname(originalFileName);
        const filePath = path.join(downloadPath, fileNameWithRoles)

        await download.saveAs(filePath);
    
        // Verifico que el archivo .csv se haya descargado, sino muestro un error en la consola.
        if (!fs.existsSync(filePath)) {
            console.error(Export.error);
            return;
        }
    
        // Leo el contenido del archivo .csv
        const csvContent = fs.readFileSync(filePath, 'utf8');
    
        // Ajusto el parsing para manejar errores de formato
        const records = parse(csvContent, {
            delimiter: ',', // Ajusto según el delimitador utilizado en tu archivo
            skip_empty_lines: true,
            trim: true,
            relax_column_count: true, // Permito un número variable de columnas
            quote: '"',
            escape: '\\',
            skip_records_with_error: true, // Permito delimitadores de registro incorrectos
            columns: false,
            comment: '#' // Manejo de líneas de comentarios
        });
    
        // Mostrar el contenido del CSV en la consola
        console.log('\nContenido del CSV:', csvContent, "\n");
    
        // Cierro la página
        await page.close();
    });

    
    test('Trazit-ProceduresDefinition-RandD-Export-Users', async ({ page, context }, testInfo) => {
        await page.pause();
    
        // Asegurar que el botón esté visible
        const exportButton = await page.getByLabel(Export.buttonName).nth(1);
        await exportButton.scrollIntoViewIfNeeded(); // Baja el scroll para que el botón esté visible
    
        // Preparo para esperar la descarga
        const downloadPromise = page.waitForEvent('download');
        await exportButton.click(); // Haz clic en el botón después de asegurarte de que es visible
        
        // Espero a que la descarga termine
        const download = await downloadPromise;
    
        await testInfo.attach(Export.screenShotsDownload, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    
        // Defino la ruta donde se guardará el archivo descargado
        const downloadPath = Export.downloadPath;
        
        // Verifico si la carpeta existe; si no, la creo
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
    
        // Defino la ruta completa del archivo, añadiendo "Users" al final del nombre del archivo sugerido
        const originalFileName = download.suggestedFilename();
        const fileNameWithUsers = path.basename(originalFileName, path.extname(originalFileName)) + '-Users' + path.extname(originalFileName);
        const filePath = path.join(downloadPath, fileNameWithUsers);
    
        await download.saveAs(filePath);
    
        // Verifico que el archivo .csv se haya descargado, sino muestro un error en la consola.
        if (!fs.existsSync(filePath)) {
            console.error(Export.error);
            return;
        }
    
        // Leo el contenido del archivo .csv
        const csvContent = fs.readFileSync(filePath, 'utf8');
    
        // Ajusto el parsing para manejar errores de formato
        const records = parse(csvContent, {
            delimiter: ',', // Ajusto según el delimitador utilizado en tu archivo
            skip_empty_lines: true,
            trim: true,
            relax_column_count: true, // Permito un número variable de columnas
            quote: '"',
            escape: '\\',
            skip_records_with_error: true, // Permito delimitadores de registro incorrectos
            columns: false,
            comment: '#' // Manejo de líneas de comentarios
        });
    
        // Mostrar el contenido del CSV en la consola
        console.log('\nContenido del CSV:', csvContent, "\n");
    
        // Cierro la página
        await page.close();
    });

    test('Trazit-ProceduresDefinition-RandD-Export-UserRoles', async ({ page, context }, testInfo) => {
        await page.pause();
    
        // Asegurar que el botón esté visible
        const exportButton = await page.getByLabel(Export.buttonName).nth(2);
        await exportButton.scrollIntoViewIfNeeded(); // Baja el scroll para que el botón esté visible
    
        // Preparo para esperar la descarga
        const downloadPromise = page.waitForEvent('download');
        await exportButton.click(); // Haz clic en el botón después de asegurarte de que es visible
        
        // Espero a que la descarga termine
        const download = await downloadPromise;
    
        await testInfo.attach(Export.screenShotsDownload, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettingsAlternative.screenShotsContentType
        });
    
        // Defino la ruta donde se guardará el archivo descargado
        const downloadPath = Export.downloadPath;
        
        // Verifico si la carpeta existe; si no, la creo
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
    
        // Defino la ruta completa del archivo, añadiendo "Users" al final del nombre del archivo sugerido
        const originalFileName = download.suggestedFilename();
        const fileNameWithUsers = path.basename(originalFileName, path.extname(originalFileName)) + '-UserRoles' + path.extname(originalFileName);
        const filePath = path.join(downloadPath, fileNameWithUsers);
    
        await download.saveAs(filePath);
    
        // Verifico que el archivo .csv se haya descargado, sino muestro un error en la consola.
        if (!fs.existsSync(filePath)) {
            console.error(Export.error);
            return;
        }
    
        // Leo el contenido del archivo .csv
        const csvContent = fs.readFileSync(filePath, 'utf8');
    
        // Ajusto el parsing para manejar errores de formato
        const records = parse(csvContent, {
            delimiter: ',', // Ajusto según el delimitador utilizado en tu archivo
            skip_empty_lines: true,
            trim: true,
            relax_column_count: true, // Permito un número variable de columnas
            quote: '"',
            escape: '\\',
            skip_records_with_error: true, // Permito delimitadores de registro incorrectos
            columns: false,
            comment: '#' // Manejo de líneas de comentarios
        });
    
        // Mostrar el contenido del CSV en la consola
        console.log('\nContenido del CSV:', csvContent, "\n");
    
        // Cierro la página
        await page.close();
    });



};

test.describe('Desktop Mode', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        await page.setViewportSize({ width: 1365, height: 821 });
        const logProc = new LogIntoProcDefinition(page);
        const ConfigSettings = await logProc.commonBeforeEach(page, testInfo);
        await page.waitForTimeout(3000);
        const moduleWindow = new OpenModuleWindow(page);
        await moduleWindow.openModule(MenuRDProjects.RD.main.name, testInfo, ConfigSettings);
    });
    commonTests();
});

// // Mobile Mode 
// test.describe('Mobile mode', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//         await page.setViewportSize({ width: 385, height: 812 }); 
//         const logProc = new LogIntoProcDefinition(page);
//         const ConfigSettings = await logProc.commonBeforeEach(page, testInfo);
//         await page.waitForTimeout(3000);
//         const moduleWindow = new OpenModuleWindow(page);
//         await moduleWindow.openModule(MenuRDProjects.RD.main.name, testInfo, ConfigSettings);
//     });
//     commonTests();
// });

// // Mobile Mode - Retrato
// test.describe('Mobile mode Retrato', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//         await page.setViewportSize({ width: 812, height: 385 }); 
//         const logProc = new LogIntoProcDefinition(page);
//         const ConfigSettings = await logProc.commonBeforeEach(page, testInfo);
//         await page.waitForTimeout(3000);
//         const moduleWindow = new OpenModuleWindow(page);
//         await moduleWindow.openModule(MenuRDProjects.RD.main.name, testInfo, ConfigSettings);
//     });
//     commonTests();
// });

// // Tablets Mode
// test.describe('Tablets mode', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//         await page.setViewportSize({ width: 768, height: 1024 }); 
//         const logProc = new LogIntoProcDefinition(page);
//         const ConfigSettings = await logProc.commonBeforeEach(page, testInfo);
//         await page.waitForTimeout(3000);
//         const moduleWindow = new OpenModuleWindow(page);
//         await moduleWindow.openModule(MenuRDProjects.RD.main.name, testInfo, ConfigSettings);
//     });
//     commonTests();
// });

// // Tablets Mode - Retrato
// test.describe('Tablets mode Retrato', () => {
//     test.beforeEach(async ({ page }, testInfo) => {
//         await page.setViewportSize({ width: 1024, height: 768 }); 
//         const logProc = new LogIntoProcDefinition(page);
//         const ConfigSettings = await logProc.commonBeforeEach(page, testInfo);
//         await page.waitForTimeout(3000);
//         const moduleWindow = new OpenModuleWindow(page);
//         await moduleWindow.openModule(MenuRDProjects.RD.main.name, testInfo, ConfigSettings);
//     });
//     commonTests();
// });

const { test: pwTest, afterEach } = require('@playwright/test');

afterEach(async ({}, testInfo) => {
    // Example JSON data, could be anything relevant to your tests
    const data = {
        test_name: testInfo.title,
        duration: testInfo.duration,
        // other test-related data you might want to send
    };
   
    // Determine the test outcome
    const testStatus = testInfo.status; // 'passed', 'failed', 'timedOut', 'skipped'
   
    await callApiRunCompletion(data, testStatus);
});

pwTest('Example test', async ({ page }) => {
    // Your test logic here
});
