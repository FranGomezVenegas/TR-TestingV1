// Clase Logger para capturar y almacenar diferentes tipos de mensajes de la consola.
export class Logger {
  constructor() {
    this.errors = [];      // Almacena errores capturados de la consola.
    this.logs = [];        // Almacena mensajes generales de la consola.
    this.warnings = [];    // Almacena advertencias capturadas de la consola.
    this.infoLogs = [];    // Almacena mensajes informativos capturados de la consola.
    this.debugLogs = [];   // Almacena mensajes de depuración capturados de la consola.
    this.traceLogs = [];   // Almacena mensajes de rastreo capturados de la consola.
  }

  // Método para asociar el Logger a la página y empezar a capturar los eventos de la consola.
  attachToPage(page) {
    page.on('console', (message) => {
      const messageType = message.type();  // Tipo de mensaje de la consola (log, error, warning, etc.).
      const text = message.text();         // Contenido del mensaje de la consola.

      // Clasificación de los mensajes según su tipo.
      switch (messageType) {
        case 'warning':
          this.warnings.push(text);
          break;
        case 'info':
          this.infoLogs.push(text);
          break;
        case 'debug':
          this.debugLogs.push(text);
          break;
        case 'trace':
          this.traceLogs.push(text);
          break;
        case 'error':
          this.errors.push(new Error(text));
          break;
        case 'log':
          this.logs.push(text);
          break;
        default:
          break;
      }
    });
  }

  // Método para imprimir en consola todos los logs capturados.
  printLogs() {
    console.log('\nConsole logs:', this.logs);
    console.log('\nPage warnings:', this.warnings);
    console.log('\nInfo logs:', this.infoLogs);
    console.log('\nDebug logs:', this.debugLogs);
    console.log('\nTrace logs:', this.traceLogs);
    console.log('\nErrors logs:', this.errors);
  }
}

export class NetworkInterceptor {
  constructor() {
    this.actionRequests = [];   // Almacena solicitudes de red relacionadas con "actions".
    this.queryRequests = [];    // Almacena solicitudes de red relacionadas con "queries".
    this.responses = [];        // Almacena todas las respuestas de red capturadas.
  }

  // Método para asociar el NetworkInterceptor a la página
  attachToPage(page) {
    page.on('request', async (request) => {
      const url = request.url();
      const method = request.method();
      const postData = request.postData() || '';
      const headers = request.headers();

      // Extraer parámetros de la URL
      const urlParams = this.extractUrlParams(url);

      const actionName = urlParams['actionName'];

      // Separar entre "actions" y "queries"
      if (url.includes('APIqueries?actionName=')) {
        console.log('\nQuery Request Captured:\n', url);  // Añadido para depuración
        this.queryRequests.push({
          url,
          actionName,
          //dbName,
          // procInstanceName,
          // finalToken,
          // postData,
          // headers,
        });
      } else if (url.includes('APIactions?actionName=')) {
        console.log('\nAction Request Captured:\n', url);  // Añadido para depuración
        this.actionRequests.push({
          fullUrl: url,
          //actionName,
          method,
          // postData,
          // headers,
          params: urlParams, // Añade los parámetros extraídos
        });
      }
    });

    page.on('response', async (response) => {
      const url = response.url();
      const status = response.status();
      let body;

      try {
        // Intenta leer el cuerpo de la respuesta si es JSON
        body = await response.json();
      } catch (e) {
        // Si no es JSON, ignora el cuerpo
        body = null;
      }

      this.responses.push({
        url,
        status,
        headers: response.headers(),
        body,
      });
    });
  }

  // Método para extraer todos los parámetros de una URL
  extractUrlParams(url) {
    const urlObj = new URL(url); // Crea un objeto URL
    const params = new URLSearchParams(urlObj.search); // Obtén los parámetros de consulta
    
    const values = {}; // Objeto para almacenar los parámetros
    
    params.forEach((value, key) => {
      values[key] = value; // Asocia el valor al nombre del parámetro
    });

    return values;
  }

  // Método para verificar respuestas con cuerpo nulo, excluyendo imágenes
  // verifyNonImageNullResponses() {
  //   const nonImageNullResponses = this.responses.filter(response => {
  //     const contentType = response.headers?.['content-type'] || '';
  //     const isImage = contentType.includes('image') || 
  //                     response.url.endsWith('.svg') || 
  //                     response.url.endsWith('.png') || 
  //                     response.url.endsWith('.jpg') || 
  //                     response.url.endsWith('.jpeg');
  //     return response.body === null && !isImage;
  //   });

  //   if (nonImageNullResponses.length > 0) {
  //     console.error('Responses with null body found (excluding images):');
  //     nonImageNullResponses.forEach((response, index) => {
  //       console.error(`Response ${index + 1}:`, response);
  //     });
  //   }

  //   // Retorna el número de respuestas con cuerpo nulo no relacionadas con imágenes
  //   return nonImageNullResponses.length;
  // }
  verifyNonImageNullResponses() {
      const nonImageNullResponses = this.responses.filter(response => {
        const contentType = response.headers?.['content-type'] || '';
        const isImage = contentType.includes('image') || 
                        response.url.endsWith('.svg') || 
                        response.url.endsWith('.png') || 
                        response.url.endsWith('.jpg') || 
                        response.url.endsWith('.jpeg') ||
                        response.url.endsWith('.json') ||
                        response.url.endsWith('.woff2')||
                        response.url.endsWith('.gif');

        return response.body === null && !isImage;
      });
  
      if (nonImageNullResponses.length > 0) {
        console.error('Responses with null body found (excluding images):');
        nonImageNullResponses.forEach((response, index) => {
          console.error(`Response ${index + 1}:`, response);
        });
      }
  
      // Retorna el número de respuestas con cuerpo nulo no relacionadas con imágenes
      return nonImageNullResponses.length;
    }


  // Método para imprimir en consola las solicitudes separadas y las respuestas capturadas.
  printNetworkData() {
    console.log('\nAction Requests:', this.actionRequests);
    // console.log('\nQuery Requests:', this.queryRequests);
    // console.log('\nResponses captured:', this.responses);
  }
}
export class ResponseValidator {
  constructor(responses) {
    this.responses = responses; // Almacena las respuestas capturadas
  }

  // Método para validar si hay respuestas
  validateResponses() {
    if (this.responses.length === 0) {
      throw new Error('No network responses captured.'); // Lanza un error si no hay respuestas
    }
  }
}

//module.exports = { Logger, NetworkInterceptor, ResponseValidator };

export const phraseReport={
  "phraseError": "Verify no console errors",
  "phraseNetworkInterceptionAndLogger": "Attach Logger and NetworkInterceptor to the page",
  "phraseVerifyNetwork": "Verify network responses",

}