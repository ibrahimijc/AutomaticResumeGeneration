import axios from 'axios';

export const generateresume = (resumeData) => { // Accept resumeData as a parameter
  let userId = sessionStorage.getItem('UserId');
  let accessToken = sessionStorage.getItem('accessToken');

  // Define the headers
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    // Add other headers if needed
  };

  // Make the POST request with the specified headers and request body
  return axios
    .post(
      'https://resume.depchip.com/api/v1/GenerateResume',
      resumeData, // Pass the resumeData as the request body
      {
        headers: headers, // Pass the headers object here
      }
    )
    .then((response) => {
      console.log('response.data', response?.data);
      return response?.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};
