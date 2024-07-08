// import React, { useEffect, useState } from 'react';
// import { OutlinedButton } from 'src/helpers/common/atoms/Buttons';
// import { RichtextEditor } from 'src/helpers/common/components/richtext';
// import { fetchResumeData } from 'src/services/basics';
// import { UpdateResumeData } from 'src/services/updateResume';
// import { useActivity } from 'src/stores/activity';

// const Achievements = () => {
//   const activitiess = useActivity((state) => state.activities);

//   const [activitiesdata, SetActivitiesdata] = useState(null);
//   const [updatachievemntresume,setUpdatachievemntresume]=useState(null)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchResumeData(); // Fetch resume data
//         SetActivitiesdata(data?.data?.activities);
//         setUpdatachievemntresume(data?.data)
//       } catch (error) {
//         console.error('Error fetching resume data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const activities = activitiesdata || activitiess;

// console.log('activitiesdata',activitiesdata);


    
//   const updatemyAchievements = async() => {

//     try {
//       // Create the final data object by replacing the education array
//       const finalData = {
//         ...updatachievemntresume,
//         achievements: activitiesdata // Replace the education array with educationdata
//       };


      

// console.log('finalData',finalData);


//       // Call the API to update the resume data
//      const response = await UpdateResumeData(finalData);

//       // Handle the response if needed
//       console.log('Update successful:', response);
//     } catch (error) {
//       console.error('Error updating education:', error);
//     }
    
//   }

//   return (
//     <>
   
//     <RichtextEditor
//       label="Achievements"
//       value={activities.achievements}
//       onChange={(htmlOutput) => {
//         useActivity.getState().updateAchievements(htmlOutput);
//       }}
//       name="achievements"
//     />
//     <OutlinedButton onClick={updatemyAchievements} >Update Achievments</OutlinedButton>
//     </>
//   );
// };

// export default Achievements;


import React, { useEffect, useState } from 'react';
import { OutlinedButton } from 'src/helpers/common/atoms/Buttons';
import { RichtextEditor } from 'src/helpers/common/components/richtext';
import { fetchResumeData } from 'src/services/basics';
import { UpdateResumeData } from 'src/services/updateResume';
import { useActivity } from 'src/stores/activity';

const Achievements = () => {
  const activitiesState = useActivity((state) => state.activities);

  const [activitiesdata, SetActivitiesdata] = useState(null);
  const [updatachievemntresume, setUpdatachievemntresume] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchResumeData(); // Fetch resume data
        SetActivitiesdata(data?.data?.activities);
        setUpdatachievemntresume(data?.data);
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };

    fetchData();
  }, []);

  const activities = activitiesdata || activitiesState;

  const updatemyAchievements = async () => {
    try {
      // Create the final data object by replacing the activities array
      const finalData = {
        ...updatachievemntresume,
        activities: activities, // Replace the activities array with activities data
      };

      console.log('finalData', finalData);

      // Call the API to update the resume data
      const response = await UpdateResumeData(finalData);

      // Handle the response if needed
      console.log('Update successful:', response);
    } catch (error) {
      console.error('Error updating achievements:', error);
    }
  };

  return (
    <>
      <RichtextEditor
        label="Achievements"
        value={activities?.achievements}
        onChange={(htmlOutput) => {
          useActivity.getState().updateAchievements(htmlOutput);
          SetActivitiesdata({
            ...activities,
            achievements: htmlOutput,
          });
        }}
        name="achievements"
      />
      <OutlinedButton onClick={updatemyAchievements}>Update Achievements</OutlinedButton>
    </>
  );
};

export default Achievements;

