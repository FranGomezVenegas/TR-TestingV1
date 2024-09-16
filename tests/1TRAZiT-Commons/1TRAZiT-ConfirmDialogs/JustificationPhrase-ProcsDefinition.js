export class JustificationHandler {
    constructor(page) {
      // Guardo la instancia de `page` para usarla en las funciones de la clase
      this.page = page; 
    }
  
    // Método para verificar si el textbox de justificación está presente
    async isJustificationPresent() {
      const textbox = this.page.getByRole('textbox', { name: 'Justification Phrase' });
      // Devuelve true si el textbox está presente y visible
      return await textbox.isVisible(); 
    }
  
    // Función para llenar la frase de justificación
    async fillJustification(phrase) {
      // Constante con el texbox del Justification Phrase
      const textbox = this.page.getByRole('textbox', { name: 'Justification Phrase' });
      // Haz clic en el textbox
      await textbox.click(); 
      // Añade la frase proporcionada al textbox 
      await textbox.fill(phrase); 
    }
  
    // Función para hacer clic en un botón de acción (Accept o Cancel)
    async clickButton(buttonName) {
      const button = this.page.getByRole('button', { name: buttonName });
      // Hace clic en el botón (Accept o Cancel)
      await button.click(); 
    }
  
    // Función principal que maneja la justificación completa, si es necesario
    async handleJustification(phrase, action) {
      // Primero verifico si el textbox de justificación está presente
      if (await this.isJustificationPresent()) {
        // Si el textbox está presente, llena la justificación y realiza la acción del botón (Accept o Cancel)
        await this.fillJustification(phrase);
        if (action) {
          await this.clickButton(action);
        }
      }
      // Si el textbox no está presente, no realizo ninguna acción ni muestro ningún mensaje.
    }
  }
  