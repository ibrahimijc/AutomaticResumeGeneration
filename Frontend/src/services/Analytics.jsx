import axios from 'axios';

export const fetchAnalytics = () => {
  let userId = sessionStorage.getItem('UserId');
  let accessToken = sessionStorage.getItem('accessToken');


  //https://resume.depchip.com/
  return axios
    .get('https://resume.depchip.com/api/v1/Analytics', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      //console.log(response?.data);
      return response?.data; // Return the response data
    })
    .catch((error) => {
      console.log(error);
      throw error; // Throw the error to be caught by the caller
    });
};
