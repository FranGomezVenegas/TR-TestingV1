const axios = require('axios');
import { ConfigSettings } from '../../trazit-config';


export async function getTestConfigSettings(data, testStatus, testInfo, testDataGame, trazitTestName, procInstanceName) {
  const actionName = "actionName=GET_LOGINTOPLATFORM_DATA";
  const finalToken = "finalToken=" + ConfigSettings.finalToken;
  const dbName = "dbName=" + ConfigSettings.dbName;
  const playwrightProcInstanceName = "procInstanceName=" + procInstanceName;
  const playwrightTestName = "playwrightTestName=" + testInfo.title;
  const argTrazitTestName = "trazitTestName=" + trazitTestName;
  const argBackendUrl = ConfigSettings.backendUrl;
  const overrideTestDataGame = "overrideTestDataGame=true";
  
  // Construcción de la URL para la llamada a la API
  const apiEndpointRequest = `${argBackendUrl}?${actionName}&${finalToken}&${dbName}&${playwrightProcInstanceName}&isForTesting=true&${overrideTestDataGame}&${playwrightTestName}&${argTrazitTestName}`;
  
  try {
    // Asegúrate de que testDataGame es serializable en JSON
    let serializedTestDataGame;
    try {
      serializedTestDataGame = JSON.stringify(testDataGame);
    } catch (err) {
      console.error('Error serializing testDataGame:', err);
      return null; // Si no se puede serializar, terminamos aquí.
    }
    
    // Preparamos el payload para la solicitud
    const payload = {
      ...data,
      testDataGame: serializedTestDataGame,
    };

    // Log de la información de la solicitud antes de enviarla
    console.log('Request Info:');
    console.log('URL:', apiEndpointRequest);
    console.log('Method: POST');
    console.log('Headers:', {
      'Content-Type': 'application/json', // Puedes ajustar según tus headers reales
    });
    console.log('Payload:', JSON.stringify(payload, null, 2)); // Mostrando el payload en formato JSON

    // Realizamos la llamada a la API
    const response = await axios.post(apiEndpointRequest, payload);

    // Verifica si la respuesta de la API indica un error
    if (response.data.is_error === true) {
      console.error('API Call Failed:', 'url', apiEndpointRequest, 'error', response.data);
      return null; // Si la API devuelve un error, retornamos null
    }

    // Si la llamada a la API es exitosa, mostramos la respuesta
    console.log('API Response1:', response.data);
    return response.data;
  } catch (error) {
    // Manejo del error de la llamada a la API
    console.error('API Call Failed:', 'url', apiEndpointRequest, 'error', error.message || error);
    
    // Si el error es una respuesta de error (por ejemplo, error de red o status 5xx)
    if (error.response) {
      console.error('API Response Error:', error.response.status, error.response.data);
    } else {
      console.error('Error details:', error.stack);
    }
    
    return null;
  }
}


export async function callApiRunCompletion(data, testStatus, trazitTestName, testInfo, procInstanceName) {
  try {
    const actionName = "actionName=TEST_RUN_FEEDBACK";
    const finalToken = "finalToken=" + ConfigSettings.finalToken;
    const dbName = "dbName=" + ConfigSettings.dbName;
    const playwrightProcInstanceName = "procInstanceName=" + procInstanceName; // procInstanceName pasado como argumento
    const playwrightTestName = "playwrightTestName=" + testInfo.title;
    const argTrazitTestName = "trazitTestName=" + trazitTestName;
    const duration = "duration=" + testInfo.duration;
    const argTestStatus = "testStatus=" + testStatus;

    // Construcción del endpoint de la API
    let apiEndpointRequest=ConfigSettings.backendUrl+"?"+actionName+"&"+finalToken+"&"+dbName+"&"+playwrightProcInstanceName+"&isForTesting=true"+"&"+playwrightTestName+"&"+argTrazitTestName
    apiEndpointRequest+="&"+duration+"&"+argTestStatus

    // Mostrar detalles del endpoint antes de hacer la llamada
    console.log('API endpoint:', apiEndpointRequest);

    // Prepara el payload con los datos de la prueba
    const payload = {
      ...data,
      status: testStatus, // Asegúrate de que el estado de la prueba se pase correctamente
    };

    // Realiza la llamada POST a la API
    const response = await axios.post(apiEndpointRequest, payload);

    // Verifica que la respuesta sea válida
    if (response && response.data) {
      console.log('API Response2:', response.data);
    } else {
      console.error('Error en la respuesta de la API. Respuesta vacía o no válida:', response);
    }

    return response.data;

  } catch (error) {
    // Captura cualquier error en el proceso de la API
    console.error('API Call Failed:', 'url', apiEndpointRequest, 'error', error);
    throw new Error(`Error en la llamada API: ${error.message}`);
  }
}
