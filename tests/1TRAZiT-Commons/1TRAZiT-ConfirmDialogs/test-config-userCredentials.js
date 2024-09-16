export class UserCredentialsPhrase {
    constructor(page) {
        this.page = page;
    }

    // Método para completar la justificación en un campo de texto
    async checkUserCredentials(ConfigSettings, justificationType, justificationList, testInfo) {
        let userCredentialSettings={
            fldPassword:{label: "Current Password"},
            fldUser:{label:"User", value:"admin"},
            fldPss:{label:"Password", value:"trazit", actionName: "Enter"},     
            btnAccept:{name: "Accept" },
            btnCancel:{name: "Cancel" },
            buttonAccept: {label:"Accept"},
            screenShotsUserCredentialsEmpty: "Empty",
            screenShotsUserCredentialsFilled: "Filled",
            fldUserCredentials: {label: "Justification Phrase • Toggle", value:"a"},
        }
        await page.getByRole('textbox', { name: userCredentialSettings.fldUser.name }).click();
        await page.pause();
        await page.getByRole('textbox', { name: userCredentialSettings.fldUser.name }).fill(ConfigSettings.fldUser.value);
        await page.pause();
        await page.getByLabel(userCredentialSettings.fldPassword.label).click();
        await page.pause();
        await page.getByLabel(userCredentialSettings.fldPassword.label).fill(ConfigSettings.fldPss.value); 
        await page.pause();
        await page.getByRole('button', { name: userCredentialSettings.btnAccept.name }).click();
        await page.pause();
        await testInfo.attach(userCredentialSettings.screenShotsUserCredentialsFilled, {
            body: await this.page.screenshot({ fullPage: true }),
            contentType: ConfigSettings.screenShotsContentType
        });
        await UserCredentials.acceptIfPresent(ConfigSettings, userCredentialSettings, testInfo);
    }

    // Método para aceptar si el botón de aceptar está presente
    async acceptIfPresent(ConfigSettings, userCredentialSettings, testInfo) {
        // Busco el botón de aceptar utilizando su etiqueta.
        const acceptButton = await this.page.getByRole('button', { name: userCredentialSettings.buttonAccept.label });
        // Imprimo en la consola si el botón de aceptar está presente
        console.log("Accept button:", acceptButton);
        // Verifico si el botón de aceptar está presente
        if (acceptButton) {
            console.log("Accept button is present. Clicking...");
            // Si está presente, hago clic en él
            await acceptButton.click();
            console.log("Clicked on accept button.");
            // Captura
            await testInfo.attach(userCredentialSettings.screenShotsAccept, {
                body: await this.page.screenshot({ fullPage: true }),
                contentType: ConfigSettings.screenShotsContentType
            });
        // Si no está presente, imprimimos en la consola
        } else {
            console.log("Accept button is not present.");
        }
    }     
}