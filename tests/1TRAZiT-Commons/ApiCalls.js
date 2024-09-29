const axios = require('axios');
import { ConfigSettings } from '../../trazit-config';
 

export async function getTestConfigSettings(data, testStatus, testInfo, testDataGame, trazitTestName) {
  const actionName="actionName=GET_LOGINTOPLATFORM_DATA"
  const finalToken="finalToken="+ConfigSettings.finalToken
  const dbName="dbName="+ConfigSettings.dbName
  const procInstanceName="procInstanceName="+ConfigSettings.procInstanceName
  //const argTestDataGame=""//"testDataGame="+JSON.stringify(testDataGame)
  const playwrightTestName = "playwrightTestName="+testInfo.title
  const argTrazitTestName = "trazitTestName="+trazitTestName
  const argBackendUrl = ConfigSettings.backendUrl
  const overrideTestDataGame="overrideTestDataGame=true"
  
  const apiEndpointRequest=argBackendUrl+"?"+actionName+"&"+finalToken+"&"+dbName+"&"+procInstanceName+"&isForTesting=true"+"&"+overrideTestDataGame+"&"+playwrightTestName+"&"+argTrazitTestName
  try {
    // Enhance the data object with test status information
    const payload = {
      ...data,
      testDataGame: JSON.stringify(testDataGame),
    };    

  // Log the request details before sending it
  console.log('Request Info:');
  console.log('URL:', apiEndpointRequest);
  console.log('Method: POST');
  console.log('Headers:', {
    'Content-Type': 'application/json', // Puedes ajustar según tus headers reales
  });
  console.log('Body:', JSON.stringify(payload, null, 2)); // Mostrando el payload en formato JSON


    const response = await axios.post(apiEndpointRequest, payload);
    if (response.data.is_error===true){
      console.error('API Call Failed:', 'url', apiEndpointRequest, 'error', error);  
      return null
    }
    console.log('API Response:', response.data);
    return response.data
  } catch (error) {
    console.error('API Call Failed:', 'url', apiEndpointRequest, 'error', error);
    return null
  }
}

export async function callApiRunCompletion(data, testStatus, trazitTestName, testInfo) {
  const actionName="actionName=TEST_RUN_FEEDBACK" 
  const finalToken="finalToken="+ConfigSettings.finalToken
  const dbName="dbName="+ConfigSettings.dbName
  const procInstanceName="procInstanceName="+ConfigSettings.procInstanceName
  const playwrightTestName = "playwrightTestName="+testInfo.title
  const argTrazitTestName = "trazitTestName="+trazitTestName
  const duration = "duration="+testInfo.duration
  const argTestStatus = "testStatus="+testStatus
  let apiEndpointRequest=ConfigSettings.backendUrl+"?"+actionName+"&"+finalToken+"&"+dbName+"&"+procInstanceName+"&isForTesting=true"+"&"+playwrightTestName+"&"+argTrazitTestName
  apiEndpointRequest+="&"+duration+"&"+argTestStatus
  try {
    // Enhance the data object with test status information
    const payload = {
      ...data,
      status: testStatus,
    };   
    const response = await axios.post(apiEndpointRequest, payload);
    //const response = await axios.post('https://platform.trazit.net:8443/TRAZiT-API/userinterface/RunConfirmation', payload);
    //const response = await axios.post('https://your-api-endpoint.com/data', payload);
     
    console.log('API Response:', response);
    
  } catch (error) {
    console.error('API Call Failed:', 'url', apiEndpointRequest, 'error', error);
  }
}