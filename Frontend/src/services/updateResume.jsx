import axios from 'axios';

export const UpdateResumeData = (data) => { // Ensure `data` parameter is defined here
  let userId = sessionStorage.getItem('UserId');
  let accessToken = sessionStorage.getItem('accessToken');

  // Define the headers
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    // Add other headers if needed
  };

  // Make the PUT request with the specified headers and data
  return axios
    .put(
      'https://resume.depchip.com/api/v1/BasicDetails',
      data, // Pass the data here
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
