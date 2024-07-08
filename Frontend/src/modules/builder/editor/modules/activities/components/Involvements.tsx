import React, { useEffect, useState } from 'react';
import { OutlinedButton } from 'src/helpers/common/atoms/Buttons';
import { RichtextEditor } from 'src/helpers/common/components/richtext';
import { fetchResumeData } from 'src/services/basics';
import { UpdateResumeData } from 'src/services/updateResume';
import { useActivity } from 'src/stores/activity';

const Involvements = () => {
  const activitiess = useActivity((state) => state.activities);
  const [activitiesdata, SetActivitiesdata] = useState(null);
  const [updateinvolvementresume, setUpdateinvolvementresume] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchResumeData(); // Fetch resume data
        SetActivitiesdata(data?.data?.activities);
        setUpdateinvolvementresume(data?.data)
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };

    fetchData();
  }, []);

  const activities = activitiesdata || activitiess;

  const updatemyinvolvnets = async () => {
    
    try {
      // Create the final data object by replacing the activities array
      const finalData = {
        ...updateinvolvementresume,
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
  
}

  return (
    <>
    <RichtextEditor
      label="Involvements"
      value={activities.involvements}        
     onChange={(htmlOutput) => {
          useActivity.getState().updateInvolvements(htmlOutput);
          SetActivitiesdata({
            ...activities,
            involvements: htmlOutput,
          });
        }}
      name="involvements"
      />
            <OutlinedButton onClick={updatemyinvolvnets}>Update Involvements</OutlinedButton>
      </>
  );
};

export default Involvements;
