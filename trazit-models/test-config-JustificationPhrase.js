import { New } from './test-config-WaterMonitoring-ActiveProductionsLots-New';
import { ConfigSettings } from '../trazit-config';

// Definino la clase JustificationPhrase
export class JustificationPhrase {
    constructor(page) {
        this.page = page;
    }

    // Método para completar la justificación en un campo de texto
    async fillJustification(label, value, testInfo) {
        // Lleno el campo de texto con el valor proporcionado
        await this.page.getByRole('textbox', { name: label }).fill(value);
        // Pausas
        await this.page.pause();
        await this.page.pause();
        // Hago clic en el campo de texto 
        await this.page.getByRole('textbox', { name: label }).click();
        // Pausas
        await this.page.pause();
        await this.page.pause();
        // Captura
        await testInfo.attach(New.screenShotsJustificationPhraseFilled, {
            body: await this.page.screenshot({ fullPage: true }),
            contentType: ConfigSettings.screenShotsContentType
        });
    }

    // Método para aceptar si el botón de aceptar está presente
    async acceptIfPresent(testInfo) {
        // Busco el botón de aceptar utilizando su etiqueta.
        const acceptButton = await this.page.getByRole('button', { name: New.buttonAccept.label });
        // Imprimo en la consola si el botón de aceptar está presente
        console.log("Accept button:", acceptButton);
        // Verifico si el botón de aceptar está presente
        if (acceptButton) {
            console.log("Accept button is present. Clicking...");
            // Si está presente, hago clic en él
            await acceptButton.click();
            console.log("Clicked on accept button.");
            // Captura
            await testInfo.attach(New.screenShotsClickButtonAccept, {
                body: await this.page.screenshot({ fullPage: true }),
                contentType: ConfigSettings.screenShotsContentType
            });
        // Si no está presente, imprimimos en la consola
        } else {
            console.log("Accept button is not present.");
        }
    }     
}