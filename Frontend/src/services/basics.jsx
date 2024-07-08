// import axios from 'axios';

// export const fetchResumeData = () => {
//   let userId = sessionStorage.getItem('UserId');
//   let accessToken = sessionStorage.getItem('accessToken');


//   //https://resume.depchip.com/
//   return axios
//     .get(`https://resume.depchip.com/api/v1/BasicDetails?userId=${userId}`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     })
//     .then((response) => {
//       //console.log(response?.data);
//       return response?.data; // Return the response data
//     })
//     .catch((error) => {
//       console.log(error);
//       throw error; // Throw the error to be caught by the caller
//     });
// };


import axios from 'axios';

export const fetchResumeData = () => {
  const userId = sessionStorage.getItem('UserId');
  const accessToken = sessionStorage.getItem('accessToken');
  const resumeId = sessionStorage.getItem('resumeId');

  if (resumeId) {
console.log('resumeid',resumeId);

    // If resumeId exists in session storage, call the GenerateResume API
    return axios
      .get(`https://resume.depchip.com/api/v1/GenerateResume/Generated-Resume-By-Id?resumeId=${resumeId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log('inside',response?.data);
        return response?.data; // Return the response data
      })
      .catch((error) => {
        console.log(error);
        throw error; // Throw the error to be caught by the caller
      });
  } else {
    // If resumeId does not exist in session storage, call the BasicDetails API
    return axios
      .get(`https://resume.depchip.com/api/v1/BasicDetails?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log('me',response?.data);
        return response?.data; // Return the response data
      })
      .catch((error) => {
        console.log(error);
        throw error; // Throw the error to be caught by the caller
      });
  }
};
