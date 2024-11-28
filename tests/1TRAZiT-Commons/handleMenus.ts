// Asegúrate de que el archivo sea tratado como un módulo
export {};

// Importa las dependencias necesarias
import { test } from '@playwright/test';

// Define las funciones
export async function clickIfExists(page, text: string) {
    const element = page.getByText(text);
    if (await element.count() > 0) {
        await element.click();
    } else {
        // console.log(`Error: No se encontró el elemento con el texto "${text}"`);
    }
}

export async function handleMenus(page) {
    // Menú principal y opciones
    const menus = {
        "Lots": [
            "Lots-Home",
            "Lots-Lot Creation",
            "Lots-Lot view",
            "Lots-Samples weight",
            "Lots-Sample Enter Results",
            "Lots-Data Mining",
            "Lots-Pending Usage Decision",
            "Lots-Deviations view",
            "Lots-Anaysis designer",
            "Lots-Specification designs",
            "Lots-Report browser",
            "Lots-Pending Review Testing",
            "Lots-Pending Review Testing Group"
        ],
        "Intruments Control": [
            "Intruments Control-Active Instruments",
            "Intruments Control-Active Instruments Balances",
            "Intruments Control-Active Instruments CG",
            "Intruments Control-Instrument Family List",
            "Intruments Control-Events in progress",
            "Intruments Control-Events Calendar",
            "Intruments Control-Deviations"
        ],
        "Micro EM": [
            "Micro EM-All production lots",
            "Micro EM-Login New Samples",
            "Micro EM-Pending Sampling",
            "Micro EM-Pending sampling Interval",
            "Micro EM-Samples 1st Incubation",
            "Micro EM-Samples 2nd Incubation",
            "Micro EM-Plate reading",
            "Micro EM-Second Plate Reading",
            "Micro EM-Miicroorganism identification",
            "Micro EM-Revision",
            "Micro EM-Program ",
            "Micro EM-Deviation",
            "Micro EM-Incubators list",
            "Micro EM-Scheduled samples report"
        ],
        "Stock control": [
            "Stock control-Home",
            "Stock control-Active Inventory Lots",
            "Stock control-Active Inventory Culture Media Lots",
            "Stock control-Active Inventory Primary Standard Lots",
            "Stock control-Active Inventory Secondary Standard Lots",
            "Stock control-Active Inventory consumables lots",
            "Stock control-Active Inventory Other lots",
            "Stock control-Active Inventory Lots Reactive",
            "Stock control-Qualifications in progress",
            "Stock control-Inventory Control",
            "Stock control-Deviations",
            "Stock control-Master Of References"
        ],
        "Water monitoring": [
            "Water monitoring-Production Lots",
            "Water monitoring-Login New Samples",
            "Water monitoring-Pending Sampling",
            "Water monitoring-FQ and MB Testing Pending Results",
            "Water monitoring-Pending Review Testing",
            "Water monitoring-Pending Review Testing Group",
            "Water monitoring-Samples Review",
            "Water monitoring-Program List",
            "Water monitoring-Deviations",
            "Water monitoring-Reports Browser"
        ],
        "R&D projects": [
            "R&D projects-Product development",
            "R&D projects-Method Validation",
            "R&D projects-Analysis Designer",
            "R&D projects-Spec Designer"
        ]
    };

    for (const [menu, options] of Object.entries(menus)) {
        const menuElement = page.getByText(menu, { exact: true }); // Identifica el menú principal
        if (await menuElement.count() > 0) {
            console.log(`Procesando menú: ${menu}`);
            for (const option of options) {
                const optionElement = page.getByText(option, { exact: true }); // Busca cada opción específica
                if (await optionElement.count() > 0) {
                    console.log(`Haciendo clic en: ${option}`);
                    await optionElement.click(); // Haz clic en la opción encontrada
                } else {
                    // console.log(`No se encontró la opción: ${option}`);
                }
            }
        } else {
            // console.log(`No se encontró el menú principal: ${menu}`);
        }
    }
}