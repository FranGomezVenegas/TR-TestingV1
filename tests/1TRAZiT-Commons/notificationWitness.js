export class NotificationWitness {
    constructor(page) {
        this.page = page; // Opcional: guardar referencia a la página si es necesario
    }
  
    async addNotificationWitness({ page }, testInfo, testData) {
        // Hover sobre el elemento de la notificación
        await page.locator(ConfigSettings.Notification.main.pageElement).hover();
  
        // Adjuntar captura de pantalla del contexto de la página
        await testInfo.attach(ConfigSettings.Notification.main.screenShotsName, {
            body: await page.screenshot({ fullPage: true }),
            contentType: ConfigSettings.screenShotsContentType,
        });
  
        // Localizar el div de la notificación y tomar su captura de pantalla
        const notif = await page.locator(ConfigSettings.Notification.main.pageElementdiv).first();
        await testInfo.attach(ConfigSettings.Notification.main.screenShotsdivNotification, {
            body: await notif.screenshot(),
            contentType: ConfigSettings.screenShotsContentType,
        });
  
        // Obtener el texto completo de la notificación
        const notifText = await notif.textContent();
  
        // Crear los patrones de expresión regular, permitiendo que algunos textos sean opcionales
        const regexPatternGroup1 = new RegExp(
            `${testData.textInNotif1}\\s+(.*?)\\s+${testData.textInNotif2}\\s+(.*?)\\s+(${testData.textInNotif3 || ""})`
        );
        const regexPatternGroup2 = new RegExp(
            `${testData.textInNotif4 || ""}\\s+(.*?)\\s+${testData.textInNotif5 || ""}\\s+(.*?)\\s+(${testData.textInNotif6 || ""})`
        );
  
        // Mostrar el texto extraído de la notificación
        console.log("Texto extraído de la notificación:", notifText);
  
        // Intentar encontrar coincidencias para ambos patrones
        const matchGroup1 = notifText.match(regexPatternGroup1);
        const matchGroup2 = notifText.match(regexPatternGroup2);
  
        // Validar si alguno de los patrones coincide
        if (matchGroup1 && matchGroup1[1]) {
            console.log("Group 1 matched:", matchGroup1[1]);
            expect(matchGroup1[1]).toBeTruthy(); // Asegurar que el grupo coincidente es válido
            return matchGroup1[1]; // Devuelve el valor del primer grupo válido
        } else if (matchGroup2 && matchGroup2[1]) {
            console.log("Group 2 matched:", matchGroup2[1]);
            expect(matchGroup2[1]).toBeTruthy(); // Asegurar que el grupo coincidente es válido
            return matchGroup2[1]; // Si no coincide el grupo 1, devuelve el del grupo 2
        } else {
            // Si ninguno de los grupos coincide, usa expect para fallar el test con un mensaje claro
            console.error("No match found in either group. Text content:", notifText);
            expect(matchGroup1 || matchGroup2).toBeTruthy(); // Forzar un fallo de test
        }
    }
  }
  