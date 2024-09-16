import { test, expect } from '@playwright/test';
import { ConfigSettings as ConfigSettingsAlternative } from '../../trazit-config';
import { LogIntoProcDefinition } from '../1TRAZiT-Commons/logIntoProcDefinition';

import { MenuRDProjects } from '../../trazit-models/test-config-R&DProjects-global';
import { Print } from '../../trazit-models/test-config-ProcsDefinition-RandD-Print';

import { callApiRunCompletion } from '../1TRAZiT-Commons/ApiCalls';
import { OpenModuleWindow } from '../1TRAZiT-Commons/openModuleWindows';

import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';

// Constante para mostrar el contenido de los PDFs
const logPdfContent = async (label, pdfPath) => {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    console.log(`\n${label}\n${data.text}`);
};

// Function with all tests
const commonTests = () => {
    test('Trazit-ProceduresDefinition-RandD-Print-Vertical', async ({ page, context }, testInfo) => {
        await page.pause();
        
        // Hacer clic en el botón de imprimir para abrir el diálogo de impresión en una nueva pestaña
        const [newPage] = await Promise.all([
            context.waitForEvent('page'), // Espero a que se abra una nueva página
            page.getByLabel(Print.buttonName).first().click(), // Click en el botón de imprimir
        ]);
    
        // Esperar a que la nueva página cargue completamente
        await newPage.waitForLoadState('load');
        
        // Esperar un poco más si es necesario
        await newPage.waitForTimeout(10000); // Ajusta el tiempo según sea necesario
    
        // Definir la ruta base para guardar el PDF
        const basePath = Print.pathBase;
    
        // Crear carpeta si no existe
        const fileName = Print.fileName;
        
        // const testName = '[testname]'; 
        const testFolder = path.join(basePath, fileName);
        if (!fs.existsSync(testFolder)){
            fs.mkdirSync(testFolder, { recursive: true });
        }
    
        // Generar PDF desde la nueva página
        const pdfPathPortrait = path.join(testFolder, 'vertical.pdf');
        await newPage.pdf({ 
            path: pdfPathPortrait, 
            format: 'A4', 
            printBackground: true 
        });
    
        console.log(`PDF guardado en orientación vertical desde la nueva página: ${pdfPathPortrait}`);
    
        // Opcionalmente, mostrar el contenido del PDF para su revisión
        await logPdfContent("Contenido PDF vertical desde la nueva página:", pdfPathPortrait);
    
        // Cierro 
        await newPage.close();
    });

    test('Trazit-ProceduresDefinition-RandD-Print-Horizontal', async ({ page, context }) => {
        await page.pause();
        
        // Hacer clic en el botón de imprimir para abrir el diálogo de impresión en una nueva pestaña
        const [newPage] = await Promise.all([
            context.waitForEvent('page'), // Esperar a que se abra una nueva página
            page.getByLabel(Print.buttonName).first().click(), // Click en el botón de imprimir
        ]);
    
        // Esperar a que la nueva página cargue completamente
        await newPage.waitForLoadState('load');
        
        // Esperar un poco más si es necesario
        await newPage.waitForTimeout(10000); 
    
        // Definir la ruta base para guardar el PDF
        const basePath = Print.pathBase;
        
        // Crear carpeta si no existe
        const fileName = Print.fileName;
        const testFolder = path.join(basePath, fileName);
        if (!fs.existsSync(testFolder)){
            fs.mkdirSync(testFolder, { recursive: true });
        }
    
        // Generar PDF en orientación horizontal (landscape)
        const pdfPathLandscape = path.join(testFolder, 'horizontal.pdf');
        await newPage.pdf({ 
            path: pdfPathLandscape, 
            format: 'A4', 
            landscape: true, 
            printBackground: true 
        });
    
        console.log(`PDF guardado en orientación horizontal: ${pdfPathLandscape}`);
    
        // Mostrar el contenido del PDF en orientación horizontal
        await logPdfContent("Contenido PDF horizontal:", pdfPathLandscape);
    
        // Cerrar la nueva pestaña
        await newPage.close();
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
