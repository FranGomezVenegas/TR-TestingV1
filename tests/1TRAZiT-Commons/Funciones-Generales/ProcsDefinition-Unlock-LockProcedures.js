import {Lock, UnLock} from '../../../trazit-models/test-config-ProcsDefinition-Unlock-Lock';
import { ConfigSettings } from '../../../trazit-config';


// Definimos las opciones como un objeto llamado "procedures"
export const procedures = {
    DiseaseStudies: '#DiseaseStudies',
    RandD: '#RandD',
    Demo: '#Demo',
    mb_em: '#mb_em',
    stock: '#stock',
    instruments: '#instruments',
    inspection_lot: '#inspection_lot',
    mon_water: '#mon_water'
};

// Función para desbloquear con captura de pantalla
export async function unlockProcedure(page, section, testInfo) {
    await page.locator(section).getByLabel(UnLock.buttonLabel).click();
    await page.pause();
    await testInfo.attach(`UnLock ${section.replace('#', '')}`, {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettings.screenShotsContentType
    });
}

// Función para bloquear con captura de pantalla
export async function lockProcedure(page, section, testInfo) {
    await page.locator(section).getByTitle(Lock.buttonTitle, { exact: true }).getByLabel(Lock.buttonLabel).click();
    await page.pause();
    await testInfo.attach(`Lock ${section.replace('#', '')}`, {
        body: await page.screenshot({ fullPage: true }),
        contentType: ConfigSettings.screenShotsContentType
    });
}

