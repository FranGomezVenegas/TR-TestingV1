export class JustificationPhrase {
    constructor(page) {
        this.page = page;
    }

    // Método para completar la justificación en un campo de texto
    async fillJustification(ConfigSettings, justificationType, justificationList, testInfo) { 
        let fillJustifTestData={
            buttonAccept: {label:"Accept"},
            screenShotsJustificationPhraseEmpty: "Empty",
            screenShotsJustificationPhraseFilled: "Filled",
            fldJustificationPhrase: {label: "Justification Phrase", value:"a"},
        }
        //await this.page.waitForTimeout(2000);
        // Lleno el campo de texto con el valor proporcionado
        // await this.page.getByRole('textbox', { name: fillJustifTestData.fldJustificationPhrase.label }).fill(fillJustifTestData.fldJustificationPhrase.value);
        await this.page.getByRole('textbox', { name: fillJustifTestData.fldJustificationPhrase.label}).click();
        await this.page.pause();
        await this.page.pause();
        await this.page.getByRole('textbox', { name: fillJustifTestData.fldJustificationPhrase.label}).fill(fillJustifTestData.fldJustificationPhrase.value);
        // Pausas
        await this.page.pause();
        await this.page.pause();
        // Hago clic en el campo de texto 
        // await this.page.getByRole('textbox', { name: fillJustifTestData.fldJustificationPhrase.label }).click();
        // Captura
        await testInfo.attach(fillJustifTestData.screenShotsJustificationPhraseFilled, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettings.screenShotsContentType
        });
        await this.pause();
        await this.pause();
        await this.page.waitForLoadState('networkidle');

        await this.acceptIfPresent(page, ConfigSettings, fillJustifTestData, testInfo); // Llamada al método interno 'acceptIfPresent' con 'page'
    }

    // Método para aceptar si el botón de aceptar está presente
    async acceptIfPresent(page, ConfigSettings, fillJustifTestData, testInfo) { // Modificado para recibir 'page' como parámetro
        // Busco el botón de aceptar utilizando su etiqueta.
        const acceptButton = await page.getByRole('button', { name: fillJustifTestData.buttonAccept.label });
        // Imprimo en la consola si el botón de aceptar está presente
        console.log("Accept button:", acceptButton);
        // Verifico si el botón de aceptar está presente
        if (acceptButton) {
            console.log("Accept button is present. Clicking...");
            // Si está presente, hago clic en él
            await acceptButton.click();
            console.log("Clicked on accept button.");
            // Captura
            await testInfo.attach(fillJustifTestData.screenShotsAccept, {
                body: await page.screenshot({ fullPage: true }),
                contentType: ConfigSettings.screenShotsContentType
            });
        // Si no está presente, imprimimos en la consola
        } else {
            console.log("Accept button is not present.");
        }
    }     
}