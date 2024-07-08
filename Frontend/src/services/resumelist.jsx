import axios from 'axios';

export const fetchResumeList = () => {
  let userId = sessionStorage.getItem('UserId');
  let accessToken = sessionStorage.getItem('accessToken');

  // Define the headers
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    // Add other headers if needed
  };

  // Make the POST request with the specified headers
  return axios
    .post(
      'https://resume.depchip.com/api/v1/GenerateResume/List',
      null, // Passing null as the second argument because you don't have any request body
      {
        headers: headers, // Pass the headers object here
      }
    )
    .then((response) => {
      console.log('response.data',response?.data);
      return response?.data;
     
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};
