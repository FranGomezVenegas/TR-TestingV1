export class OpenModuleWindow {
    constructor(page) {
        this.page = page;
    }

    // Mapa de módulos y sus respectivos selectores
    moduleSelectors = {
        DiseaseStudies: '#DiseaseStudies > .procCard',
        RandD: '#RandD > .procCard',
        Demo: '#Demo > .procCard',
        mb_em: '#mb_em > .procCard',
        stock: '#stock > .procCard',
        instruments: '#instruments > .procCard',
        inspection_lot: '#inspection_lot > .procCard',
        mon_water: '#mon_water > .procCard',
    };

    // Método para abrir un módulo basado en su nombre
    async openModule(moduleName, testInfo, ConfigSettings) {
        try {
            console.log(`Abriendo el módulo: ${moduleName}`);

            // Verifica si el módulo existe
            if (this.moduleSelectors[moduleName]) {
                const selector = this.moduleSelectors[moduleName];
                await this.page.locator(selector).click();
                console.log(`Hizo clic en el módulo: ${moduleName}`);

                // Adjunta una captura de pantalla después de abrir el módulo
                await testInfo.attach(`${moduleName}_Open`, {
                    body: await this.page.screenshot({ fullPage: true }),
                    contentType: ConfigSettings.screenShotsContentType
                });
            } else {
                throw new Error(`El módulo '${moduleName}' no existe en los selectores definidos.`);
            }
        } catch (error) {
            console.error(`Error al abrir el módulo '${moduleName}':`, error);
            throw error;
        }
    }
}
