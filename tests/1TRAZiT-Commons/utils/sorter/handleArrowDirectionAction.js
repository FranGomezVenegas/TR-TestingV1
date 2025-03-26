import { attachScreenshot } from '../../../1TRAZiT-Commons/actionsHelper.js';

// Sorter
export const handleArrowDirectionAction = async (page, testInfo, Button) => {
    if (Button?.arrowDirection) {
        // Mapeo de "UP"(arriba) y "DOWN"(abajo) 
        const arrowSymbol = Button.arrowDirection.toUpperCase() === 'UP' ? '▲' : '▼';
        // Posición del botón de la flecha si no esta definida 0 (la primera posición).
        const position = Button.positionArrow || 0;

        await test.step(`Click on direction button ${arrowSymbol}`, async () => {
            try {
                // Intentamos hacer clic en el botón correspondiente (UP o DOWN) en función de su dirección
                await page.getByRole('button', { name: arrowSymbol }).nth(position).click({ timeout: 3000 });
                console.log(`Clic en ${arrowSymbol} correctamente.`);
                // Después de hacer clic, hago una captura de pantalla si es necesario
                if (Button?.screenShotsArrow) {
                    await test.step(`Screenshot after clicking on ${arrowSymbol}`, async () => {
                        await attachScreenshot(testInfo, Button.screenShotsArrow, page, ConfigSettingsAlternative.screenShotsContentType);
                    });
                }
            } catch (error) {
                console.error(`Error clicking on ${arrowSymbol}: ${error.message}`);
            }
        });
    }
};
