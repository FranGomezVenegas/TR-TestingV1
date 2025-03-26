export async function validateNotificationTexts(page, expectedTexts, testInfo) {
    // Esperar a que la notificación aparezca con la clase "show"
    const snackbarDiv = await page.locator('.snackbar.bottom.show').first();
    await snackbarDiv.waitFor({ state: 'visible', timeout: 5000 });

    if (await snackbarDiv.isVisible()) {
        const snackbarContent = await snackbarDiv.textContent();
        const snackbarContentLower = snackbarContent?.trim().toLowerCase();

        // Mostrar en consola el contenido de la notificación y los textos esperados
        console.log('\nExtracted notification content:', snackbarContentLower);
        console.log('\nExpected notification texts:', expectedTexts, '\n');

        // Verificar si la notificación contiene los textos esperados
        expectedTexts.forEach((expectedText) => {
            if (expectedText && !snackbarContentLower.includes(expectedText.toLowerCase())) {
                throw new Error(`Notification text mismatch. Expected to include: "${expectedText}", but got: "${snackbarContentLower}"`);
            }
        });

        // Adjuntar captura de pantalla de la notificación si el texto es el esperado
        await testInfo.attach('Notification', {
            body: await snackbarDiv.screenshot(),
            contentType: 'image/png'
        });
    } else {
        throw new Error('Snackbar not visible');
    }
}
