import { ConfigSettings } from '../../trazit-config';
import { test, expect } from '@playwright/test';
import { platformMenuNames } from '../../trazit-config';

export class NotificationWitness {
    constructor(page) {
        this.page = page;
    }

    async addNotificationWitness(testInfo, testData, mode) {
        let notificationElement, notificationDiv;

        // Comprobación de modo y acción correspondiente
        if (mode === 'desktop') {
            console.log('Modo: Desktop O TV');
            notificationElement = await this.page.locator(platformMenuNames.Notification.main.pageElement);
            
            if (notificationElement) {
                try {
                    console.log('Elemento de notificación localizado, pasando el mouse sobre él.');
                    await notificationElement.hover();
                } catch (error) {
                    console.log('Hover falló, intentando click.');
                    await notificationElement.click(); // Intentar hacer clic si hover falla
                }
            }
      

            notificationDiv = await this.page.locator(platformMenuNames.notification.main.pageElementNameDiv).first();
            if (notificationDiv) {
                console.log('Elemento de notificación específico encontrado, capturando pantalla.');
                // await testInfo.attach("Last Notification", {
                //     body: await notificationDiv.screenshot(),
                //     contentType: ConfigSettings.screenShotsContentType
                // });
            } else {
                console.log('No se encontró el elemento de notificación específico.');
            }


        } // En el modo tablet
        else if (mode === 'tablet') {
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
        
            // Espera y verifica el botón de notificaciones
            try {
                await this.page.waitForSelector(platformMenuNames.notification.mobile.pageElement, { timeout: 15000 });
      

                const notificationButton = this.page.locator(platformMenuNames.notification.mobile.pageElement);
        
                if (await notificationButton.isVisible() && await notificationButton.isEnabled()) {
                    console.log('Botón de notificación localizado, haciendo clic.');
                    await notificationButton.click();
                } else {
                    console.log('Botón de notificación no visible o no habilitado.');
                    return 'Botón de notificación no encontrado';
                }
            } catch (error) {
                console.log('Error al esperar o hacer clic en el botón de notificaciones:', error.message);
                return 'Error en el modo tablet';
            }
        
            return 'tablet';
        
        
            
        } else if (mode === 'mobilePortrait') {
            
            console.log('Modo: Mobile Portrait');
            await this.page.click(platformMenuNames.notification.mobile.pageElementMenu);


            await this.page.waitForSelector(platformMenuNames.notification.mobile.pageElement, { timeout: 10000 });

            // Asegúrate de que el elemento sea visible y habilitado antes del clic
            const notificationButton = await this.page.locator(platformMenuNames.notification.mobile.pageElement);
            if (await notificationButton.isVisible() && await notificationButton.isEnabled()) {
                console.log('Elemento de notificación localizado, haciendo clic.');
                await notificationButton.click();
            } else {
                console.log('Elemento de notificación no visible o no habilitado.');
            }

            console.log('Capturando pantalla completa para la notificación.');

           
        } else {
            console.log('Modo: Mobile');
            await this.page.click(platformMenuNames.notification.mobile.pageElementMenu);

            await this.page.waitForSelector(platformMenuNames.notification.mobile.pageElement, { timeout: 10000 });

            // Asegúrate de que el elemento sea visible y habilitado antes del clic
            const notificationButton = await this.page.locator(platformMenuNames.notification.mobile.pageElement);


            if (await notificationButton.isVisible() && await notificationButton.isEnabled()) {
                console.log('Elemento de notificación localizado, haciendo clic.');
                await notificationButton.click();
            } else {
                console.log('Elemento de notificación no visible o no habilitado.');
            }

            console.log('Capturando pantalla completa para la notificación.');
        }

        // Comprobación de notificaciones
        const notif = notificationDiv || notificationElement;
        console.log('Elemento de notificación determinado:', notif);

        if (!notif) {
            console.log('No se encontró el elemento de notificación.');
            return 'Elemento de notificación no encontrado';
        }

        const notifTextLower = (await notif.textContent()).toLowerCase();
        const textInNotif1Lower = testData.textInNotif1.toLowerCase();
        const textInNotif2Lower = testData.textInNotif2.toLowerCase();
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
    
        
        // const viewportWidth = await this.page.evaluate(() => {
        //     return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        // });
        await test.step(ReportNotificationPhase.phasePauses, async () => {
            await this.page.pause();
            await this.page.pause();
            await this.page.pause();
            await this.page.pause();
            await this.page.pause();
            await this.page.pause();
        });
        

        // console.log('Ancho del viewport:', viewportWidth);
        if (viewportWidth >= 1024) {
            // Modo escritorio o tablet en modo paisaje
            await this.page.waitForTimeout(3000)
            const notificationSelector = platformMenuNames.Notification.main.pageElement;
            await this.page.waitForSelector(notificationSelector, { timeout: 15000 });
            const notificationElement = await this.page.locator(notificationSelector);
            await test.step(ReportNotificationPhase.phasePauses, async () => {
                await this.page.pause();
                await this.page.pause();
                await this.page.pause();
                await this.page.pause();
                await this.page.pause();
                await this.page.pause();
                await this.page.pause();
                await this.page.pause();
            });
            // Verificar si el elemento es visible antes de intentar interactuar
            if (await notificationElement.isVisible()) {
                console.log('Elemento de notificación localizado, pasando el mouse sobre él.');
        
                // Intentar hover varias veces
                let hoverSuccess = false;
                const maxAttempts = 3;
                const waitTime = 10000; // Tiempo de espera entre intentos en milisegundos
                await test.step(ReportNotificationPhase.phasePauses, async () => {
                    await this.page.pause();
                    await this.page.pause();
                    await this.page.pause();
                    await this.page.pause();
                    await this.page.pause();
                    await this.page.pause();
                });
                
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
        
                // Si el hover no tuvo éxito, intentar click
                if (!hoverSuccess) {
                    console.log('Hover fallido, haciendo clic en el elemento.');
                    await notificationElement.click();
                }
                
            } else {
                console.log('Elemento de notificación no visible.');
                // Si el elemento no es visible, también intentamos un clic en su lugar.
                console.log('Intentando clic en el elemento de notificación.');
                await this.page.click(notificationSelector);
            }
        
            await testInfo.attach(platformMenuNames.notification.main.screenShotsName, {
                body: await this.page.screenshot(), // Captura solo la parte visible del viewport
                contentType: ConfigSettings.screenShotsContentType
            });
            
            const notificationDiv = await this.page.locator(platformMenuNames.notification.main.pageElementNameDiv).first();
            await test.step(ReportNotificationPhase.phasePauses, async () => {
                await this.page.pause();
                await this.page.pause();
                await this.page.pause();
                await this.page.pause();
                await this.page.pause();
                await this.page.pause();
                await this.page.pause();
            });
            
            await this.page.waitForSelector(platformMenuNames.notification.main.pageElementNameDiv, { timeout: 35000 });
            if (notificationDiv) {
                await testInfo.attach(platformMenuNames.notification.main.screenShotsName, {
                    body: await notificationDiv.screenshot(),
                    contentType: ConfigSettings.screenShotsContentType
                });
            }
            return 'desktop';

        } else if (viewportWidth >= 768 && viewportWidth < 1024) {
                // Verifica si el botón del menú está visible y habilitado
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

    // Espera y verifica el botón de notificaciones
    try {
        await this.page.waitForSelector(platformMenuNames.notification.mobile.pageElement, { timeout: 15000 });
        await test.step(ReportNotificationPhase.phasePauses, async () => {
            await this.page.pause();
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
        } else {
            // Modo móvil
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
            await this.page.waitForSelector(platformMenuNames.notification.mobile.pageElement, { timeout: 10000 });
            await test.step(ReportNotificationPhase.phasePauses, async () => {    
                await this.page.pause();
                await this.page.pause();
                await this.page.pause();
            });
            
            // Asegúrate de que el elemento sea visible y habilitado antes del clic
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