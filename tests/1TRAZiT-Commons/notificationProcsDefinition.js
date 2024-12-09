export async function validateNotificationTexts(page, expectedTexts, testInfo) {
    // Obtengo el contenido de la notificación
    const snackbarDiv = await page.locator('.mdc-snackbar__label').first();
    if (await snackbarDiv.isVisible()) {
        const snackbarContent = await snackbarDiv.textContent();
        const snackbarContentLower = snackbarContent?.trim().toLowerCase();

        // Muestro en consola el contenido de la notificación y los textos esperados
        console.log('\nExtracted notification content:', snackbarContentLower);
        console.log('\nExpected notification texts:', expectedTexts, '\n');

        // Comparo si el contenido de la notificación incluye los textos esperados
        expectedTexts.forEach((expectedText) => {
            if (expectedText && !snackbarContentLower.includes(expectedText)) {
                throw new Error(`Notification text mismatch. Expected to include: "${expectedText}", but got: "${snackbarContentLower}"`);
            }
        });

        // Adjunto captura de pantalla de la notificación si el texto es el esperado
        await testInfo.attach('Notification', {
            body: await snackbarDiv.screenshot(),
            contentType: 'image/png'  
        });
    } else {
        throw new Error('Snackbar not visible');
    }
}
