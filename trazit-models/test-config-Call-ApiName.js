const axios = require('axios');
 

export async function callApiEndpoint(data, testStatus) {
  try {
    // Enhance the data object with test status information
    const payload = {
      ...data,
      status: testStatus,
    };
    
    const response = await axios.post('https://platform.trazit.net:8443/TRAZiT-API/userinterface/RunConfirmation', payload);
    //const response = await axios.post('https://your-api-endpoint.com/data', payload);
     
    console.log('API Response:', response.data);
    alert(response.status)
  } catch (error) {
    console.error('API Call Failed:', error);
  }
}

