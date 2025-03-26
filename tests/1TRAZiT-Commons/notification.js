import { ConfigSettings } from '../../trazit-config';
import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';

export class NotificationWitness {
    constructor(page) {
        this.page = page;
    }

    async addNotificationWitness(testInfo, testData, mode) {
        let notificationElementOldPlatform, notificationElementNewPlatform, notificationDiv, notificationDiv1;
        let notif; // Declaramos notif al inicio de la función
    
        // Comprobación de modo y acción correspondiente
        if (mode === 'desktop') {
            console.log('Modo: Desktop o TV');
            
            // Intentar con la notificación para plataforma antigua.
            notificationElementOldPlatform = await this.page.locator(platformMenuNames.Notification.main.pageElement);
            // Si no se encuentra, intentamos con la notificación para la plataforma nueva.
            notificationElementNewPlatform = await this.page.locator('sp-action-menu#dashboardnotifications');
            // Verificar visibilidad y hacer hover o clic
            if (await notificationElementOldPlatform.isVisible()) {
                try {
                    console.log('Elemento de notificación de plataforma antigua localizado, pasando el mouse sobre él.');
                    await notificationElementOldPlatform.hover();
                } catch (error) {
                    console.log('Hover falló en la plataforma antigua, intentando click.');
                    await notificationElementOldPlatform.click();
                }
            } else if (await notificationElementNewPlatform.isVisible()) {
                try {
                    console.log('Elemento de notificación de plataforma nueva localizado, pasando el mouse sobre él.');
                    await notificationElementNewPlatform.hover();
                } catch (error) {
                    console.log('Hover falló en la plataforma nueva, intentando click.');
                    await notificationElementNewPlatform.click();
                }
            } else {
                console.log('No se encontraron elementos de notificación en ninguna plataforma.');
            }
    
            // Verifica la notificación en la plataforma antigua o nueva
            notificationDiv = await this.page.locator(platformMenuNames.notification.main.pageElementNameDiv).first();
            notificationDiv1 = await this.page.locator('.operation-dropdown-option').first();
            
            if (await notificationDiv.isVisible()) {
                console.log('Usando elemento de notificación de plataforma antigua');
                notif = notificationDiv;
            } else if (await notificationDiv1.isVisible()) {
                console.log('Usando elemento de notificación de plataforma nueva');
                notif = notificationDiv1;
            } else {
                console.log('No se encontró ningún elemento de notificación visible');
                return 'Elemento de notificación no encontrado';
            }
    
        } else if (mode === 'tablet') {
            console.log('Modo: Tablet');
            
            // Verifica si el botón del menú está visible y habilitado
            const menuButton = this.page.locator(platformMenuNames.notification.mobile.pageElementMenu);
            if (await menuButton.isVisible() && await menuButton.isEnabled()) {
                console.log('Botón del menú visible, haciendo clic.');
                await menuButton.click();
            } else {
                console.log('Botón del menú no visible o no habilitado.');
                return 'Botón del menú no encontrado';
            }
            
            // Verifica el botón de notificaciones
            try {
                await this.page.waitForSelector(platformMenuNames.notification.mobile.pageElement, { timeout: 1000 });
                const notificationButton = this.page.locator(platformMenuNames.notification.mobile.pageElement);
    
                if (await notificationButton.isVisible() && await notificationButton.isEnabled()) {
                    console.log('Botón de notificación localizado, haciendo clic.');
                    await notificationButton.click();
                    // Asignar el elemento de notificación después del clic
                    notif = await this.page.locator('.operation-dropdown-option').first();
                } else {
                    console.log('Botón de notificación no visible o no habilitado.');
                    return 'Botón de notificación no encontrado';
                }
            } catch (error) {
                console.log('Error al esperar o hacer clic en el botón de notificaciones:', error.message);
                return 'Error en el modo tablet';
            }
    
        } else if (mode === 'mobilePortrait') {
            console.log('Modo: Mobile Portrait');
            await this.page.click(platformMenuNames.notification.mobile.pageElementMenu);
            await this.page.waitForSelector(platformMenuNames.notification.mobile.pageElement, { timeout: 1000 });
            
            const notificationButton = await this.page.locator(platformMenuNames.notification.mobile.pageElement);
            if (await notificationButton.isVisible() && await notificationButton.isEnabled()) {
                console.log('Elemento de notificación localizado, haciendo clic.');
                await notificationButton.click();
                // Asignar el elemento de notificación después del clic
                notif = await this.page.locator('.operation-dropdown-option').first();
            } else {
                console.log('Elemento de notificación no visible o no habilitado.');
                return 'Elemento de notificación no encontrado';
            }
    
        } else {
            console.log('Modo: Mobile');
            await this.page.click(platformMenuNames.notification.mobile.pageElementMenu);
            await this.page.waitForSelector(platformMenuNames.notification.mobile.pageElement, { timeout: 1000 });
    
            const notificationButton = await this.page.locator(platformMenuNames.notification.mobile.pageElement);
            if (await notificationButton.isVisible() && await notificationButton.isEnabled()) {
                console.log('Elemento de notificación localizado, haciendo clic.');
                await notificationButton.click();
                // Asignar el elemento de notificación después del clic
                notif = await this.page.locator('.operation-dropdown-option').first();
            } else {
                console.log('Elemento de notificación no visible o no habilitado.');
                return 'Elemento de notificación no encontrado';
            }
        }
    
        if (!notif || !(await notif.isVisible()) || !(await notif.textContent())) {
            console.log('No se encontró el contenido de la notificación o no está visible.');
            return 'Contenido de notificación no encontrado';
        }
    
        console.log('Elemento de notificación determinado:', notif);
    
        const notifTextLower = (await notif.textContent()).toLowerCase();
        const textInNotif1Lower = testData.textInNotif1 ? testData.textInNotif1.toLowerCase() : '';
        const textInNotif2Lower = testData.textInNotif2 ? testData.textInNotif2.toLowerCase() : '';
        const textInNotif3Lower = testData.textInNotif3 ? testData.textInNotif3.toLowerCase() : '';
    
        console.log('Texto de la notificación:', notifTextLower);
        console.log('Texto esperado 1:', textInNotif1Lower);
        console.log('Texto esperado 2:', textInNotif2Lower);
        console.log('Texto esperado 3:', textInNotif3Lower);
    
        await expect(notifTextLower).toContain(textInNotif1Lower);
        await expect(notifTextLower).toContain(textInNotif2Lower);
    
        if (textInNotif3Lower) {
            await expect(notifTextLower).toContain(textInNotif3Lower);
        }
    
        const regexPattern = new RegExp(`${textInNotif1Lower}\\s+(.*?)\\s+${textInNotif2Lower}`, 'i');
        const match = notifTextLower.match(regexPattern);
    
        if (match && match[1]) {
            console.log('Objeto extraído de la notificación:', match[1]);
            return match[1];
        } else {
            console.log('No se pudo extraer un objeto entre los textos esperados. Texto completo de la notificación:', notifTextLower);
            return notifTextLower;
        }
    }
    

    async getDeviceMode(testInfo) {
        const viewportWidth = await this.page.evaluate(() => {
            return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        });
        console.log(`Viewport width: ${viewportWidth}`);
    
        // Agregar pausas de prueba para el paso
        await test.step(ReportNotificationPhase.phasePauses, async () => {
            await this.page.pause();
            await this.page.pause();
            await this.page.pause();
            await this.page.pause();
            await this.page.pause();
            await this.page.pause();
        });
    
        // Modo escritorio o tablet en modo paisaje
        if (viewportWidth >= 1024) {
            await this.page.waitForTimeout(1000);
    
            // Primera opción de notificación plataforma antigua.
            const notificationSelector = platformMenuNames.Notification.main.pageElement;
            const notificationSelector2 = 'sp-action-menu#dashboardnotifications';  // Segunda opción de notificación plataforma antigua.
    
            let notificationElement;
    
            // Intentamos con la primera opción de notificación
            try {
                notificationElement = await this.page.locator(notificationSelector);
                await this.page.waitForSelector(notificationSelector, { timeout: 1000 });
                console.log('Notificación de la primera opción localizada.');
            } catch (error) {
                console.log('No se pudo encontrar la primera opción de notificación, pasando a la segunda opción.');
            }
    
            // Si la primera opción no es visible, intentamos la segunda
            if (!notificationElement || !(await notificationElement.isVisible())) {
                notificationElement = await this.page.locator(notificationSelector2);
                console.log('Notificación de la segunda opción localizada.');
            }
    
            // Verificamos si encontramos la notificación y la manejamos
            if (await notificationElement.isVisible()) {
                console.log('Elemento de notificación localizado, pasando el mouse sobre él.');
    
                let hoverSuccess = false;
                const maxAttempts = 3;
                const waitTime = 10000; // Tiempo de espera entre intentos
    
                for (let attempt = 0; attempt < maxAttempts; attempt++) {
                    try {
                        if (await notificationElement.isVisible()) {
                            console.log(`Intento ${attempt + 1}: Pasando el mouse sobre el elemento.`);
                            await notificationElement.hover();
                            hoverSuccess = true;
                            break;
                        } else {
                            console.log('Elemento de notificación no visible, intentando de nuevo.');
                        }
                    } catch (error) {
                        console.log(`Error en el intento ${attempt + 1}: ${error.message}`);
                    }
                    await this.page.waitForTimeout(waitTime);
                }
    
                if (!hoverSuccess) {
                    console.log('Hover fallido, haciendo clic en el elemento.');
                    await notificationElement.click();
                }
            } else {
                console.log('Elemento de notificación no visible.');
                console.log('Intentando clic en el elemento de notificación.');
                await this.page.click(notificationSelector2);  // Usamos la segunda opción si la primera no funciona.
            }
    
            // Adjuntamos capturas de pantalla
            await testInfo.attach(platformMenuNames.notification.main.screenShotsName, {
                body: await this.page.screenshot(),
                contentType: ConfigSettings.screenShotsContentType
            });
    
            // Primera opción de la última notificación de la plataforma antigua. 
            const notificationDiv = await this.page.locator(platformMenuNames.notification.main.pageElementNameDiv).first();
            // await this.page.waitForSelector(platformMenuNames.notification.main.pageElementNameDiv, { timeout: 35000 });
            // Segunda opción de la última notificación de la plataforma antigua.
            const notificationDiv2 = await this.page.locator('.operation-dropdown-option').first();
    
            // Verificamos si encontramos la notificación de la primera opción, sino, pasamos a la segunda
            let notificationDivToClick;
            if (await notificationDiv.isVisible()) {
                notificationDivToClick = notificationDiv;
                console.log('Notificación de la plataforma antigua localizada.');
            } else {
                console.log('No se encontró la primera notificación de la plataforma antigua, pasando a la segunda opción.');
                notificationDivToClick = notificationDiv2;
            }
    
            // Adjuntamos capturas de pantalla para la notificación seleccionada
            if (notificationDivToClick) {
                await testInfo.attach(platformMenuNames.notification.main.screenShotsName, {
                    body: await notificationDivToClick.screenshot({timeout: 2000}),
                    contentType: ConfigSettings.screenShotsContentType
                });
    
                // Hacemos clic en la notificación seleccionada
                console.log('Haciendo clic en la notificación seleccionada.');
                await notificationDivToClick.click({timeout: 5000});
            }
    
            return 'desktop';
    
        // Modo tablet
        } else if (viewportWidth >= 768 && viewportWidth < 1024) {
            const menuButton = this.page.locator(platformMenuNames.notification.mobile.pageElementMenu);
            await test.step(ReportNotificationPhase.phasePauses, async () => {
                await this.page.pause();
                await this.page.pause();
                await this.page.pause();
                await this.page.pause();
                await this.page.pause();
            });
    
            if (await menuButton.isVisible() && await menuButton.isEnabled()) {
                console.log('Botón del menú visible, haciendo clic.');
                await menuButton.click();
            } else {
                console.log('Botón del menú no visible o no habilitado.');
                return 'Botón del menú no encontrado';
            }
    
            await test.step(ReportNotificationPhase.phasePauses, async () => {
                await this.page.pause();
                await this.page.pause();
                await this.page.pause();
            });
    
            await testInfo.attach(platformMenuNames.notification.mobile.screenShotsMenu, {
                body: await this.page.screenshot(),
                contentType: ConfigSettings.screenShotsContentType
            });
    
            try {
                await this.page.waitForSelector(platformMenuNames.notification.mobile.pageElement, { timeout: 1000 });
                await test.step(ReportNotificationPhase.phasePauses, async () => {
                    await this.page.pause();
                    await this.page.pause();
                });
    
                const notificationButton = this.page.locator(platformMenuNames.notification.mobile.pageElement);
                await test.step(ReportNotificationPhase.phasePauses, async () => {
                    await this.page.pause();
                    await this.page.pause();
                });
    
                if (await notificationButton.isVisible() && await notificationButton.isEnabled()) {
                    console.log('Botón de notificación localizado, haciendo clic.');
                    await notificationButton.click();
                } else {
                    console.log('Botón de notificación no visible o no habilitado.');
                    return 'Botón de notificación no encontrado';
                }
    
                await test.step(ReportNotificationPhase.phasePauses, async () => {
                    await this.page.pause();
                    await this.page.pause();
                    await this.page.pause();
                    await this.page.pause();
                    await this.page.pause();
                    await this.page.pause();
                    await this.page.pause();
                });
    
                await testInfo.attach(platformMenuNames.notification.mobile.screenShotsName, {
                    body: await this.page.screenshot(),
                    contentType: ConfigSettings.screenShotsContentType
                });
    
            } catch (error) {
                console.log('Error al esperar o hacer clic en el botón de notificaciones:', error.message);
                return 'Error en el modo tablet';
            }
    
            return 'tablet';
    
        // Modo móvil en retrato
        } else {
            await this.page.click(platformMenuNames.notification.mobile.pageElementMenu);
            await test.step(ReportNotificationPhase.phasePauses, async () => {
                await this.page.pause();
                await this.page.pause();
                await this.page.pause();
                await this.page.pause();
                await this.page.pause();
            });
    
            await testInfo.attach(platformMenuNames.notification.mobile.screenShotsMenu, {
                body: await this.page.screenshot(),
                contentType: ConfigSettings.screenShotsContentType
            });
    
            await this.page.waitForSelector(platformMenuNames.notification.mobile.pageElement, { timeout: 1000 });
            await test.step(ReportNotificationPhase.phasePauses, async () => {
                await this.page.pause();
                await this.page.pause();
                await this.page.pause();
            });
    
            const notificationButton = await this.page.locator(platformMenuNames.notification.mobile.pageElement);
            if (await notificationButton.isVisible() && await notificationButton.isEnabled()) {
                console.log('Elemento de notificación localizado, haciendo clic.');
                await notificationButton.click();
            } else {
                console.log('Elemento de notificación no visible o no habilitado.');
            }
    
            await testInfo.attach(platformMenuNames.notification.mobile.screenShotsName, {
                body: await this.page.screenshot(),
                contentType: ConfigSettings.screenShotsContentType
            });
    
            return 'mobilePortrait';
        }
    }
    
    
}


export const ReportNotificationPhase={
    "phraseCaptureNotification": "Capture notification witness",
    "phrasePauses": "Execution Pauses"
}