// import { useEffect, useState } from 'react';
// import { useVoluteeringStore } from 'src/stores/volunteering';
// import AddVolunteeringExp from './components/AddVolunteering';
// import Volunteering from './components/Volunteer';

// import MoveEditSection from 'src/helpers/common/components/MoveEditSectionContainer';
// import { fetchResumeData } from 'src/services/basics';
// import { OutlinedButton } from 'src/helpers/common/atoms/Buttons';
// import { UpdateResumeData } from 'src/services/updateResume';

// const VolunteeringLayout = () => {
//   const allVolunteeringExps = useVoluteeringStore((state) => state.volunteeredExps);
//   const removeExperience = useVoluteeringStore.getState().remove;
//   const onMoveUp = useVoluteeringStore.getState().onmoveup;
//   const onMoveDown = useVoluteeringStore.getState().onmovedown;
//   const [volunteerdata, SetVolunteerdata] = useState(null);
//   const [expanded, setExpanded] = useState<string | false>(false);
//   const [updatevolunteerresume,setUpdatVolunteerresume]=useState(null)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchResumeData(); // Fetch resume data
//         SetVolunteerdata(data?.data?.volunteer);
//         setUpdatVolunteerresume(data?.data)
//       } catch (error) {
//         console.error('Error fetching resume data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     setExpanded(allVolunteeringExps[0]?.id);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleChange = (panel: string, isExpanded: boolean) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   const updateNewVolunteer = async() => {

//     try {
//       // Create the final data object by replacing the education array
//       const finalData = {
//         ...updatevolunteerresume,
//         volunteer: volunteerdata // Replace the education array with educationdata
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
//     <div className="flex flex-col gap-8 mb-8">
//       {(volunteerdata || allVolunteeringExps)?.map((volunteeringInfo, index) => (
//         <MoveEditSection
//           key={volunteeringInfo.id}
//           title={volunteeringInfo.organization || 'Experience'}
//           expanded={expanded === volunteeringInfo.id}
//           length={allVolunteeringExps.length}
//           index={index}
//           clickHandler={() => handleChange(volunteeringInfo.id, expanded !== volunteeringInfo.id)}
//           onMoveUp={onMoveUp}
//           onMoveDown={onMoveDown}
//           onDelete={removeExperience}
//         >
//           <Volunteering volunteeringInfo={volunteeringInfo} currentIndex={index} />
//         </MoveEditSection>
//       ))}
//       <AddVolunteeringExp handleChange={handleChange} isEmpty={allVolunteeringExps.length === 0} />
//       <OutlinedButton onClick={updateNewVolunteer} >Update Volunteer</OutlinedButton>
//     </div>
//   );
// };

// export default VolunteeringLayout;



import React, { useEffect, useState } from 'react';
import { fetchResumeData } from 'src/services/basics';
import { UpdateResumeData } from 'src/services/updateResume';
import { useVoluteeringStore } from 'src/stores/volunteering';
import AddVolunteeringExp from './components/AddVolunteering';
import Volunteer from './components/Volunteer';
import MoveEditSection from 'src/helpers/common/components/MoveEditSectionContainer';
import { OutlinedButton } from 'src/helpers/common/atoms/Buttons';

const VolunteeringLayout = () => {
  const allVolunteeringExps = useVoluteeringStore((state) => state.volunteeredExps);
  // const removeExperience = useVoluteeringStore.getState().remove;
  // const onMoveUp = useVoluteeringStore.getState().onmoveup;
  // const onMoveDown = useVoluteeringStore.getState().onmovedown;
  const [volunteerdata, setVolunteerdata] = useState(null);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [updatevolunteerresume, setUpdateVolunteerResume] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchResumeData(); // Fetch resume data
        setVolunteerdata(data?.data?.volunteer);
        setUpdateVolunteerResume(data?.data);
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setExpanded(allVolunteeringExps[0]?.id);
  }, [allVolunteeringExps]);

  const handleChange = (panel: string, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleVolunteeringChange = (index: number, updatedVolunteeringInfo: any) => {
    const updatedVolunteerData = [...volunteerdata];
    updatedVolunteerData[index] = updatedVolunteeringInfo;
    setVolunteerdata(updatedVolunteerData);
  };

  const updateNewVolunteer = async () => {
    try {
      // Create the final data object by replacing the volunteering array
      const finalData = {
        ...updatevolunteerresume,
        volunteer: volunteerdata || allVolunteeringExps, // Use either local state or global state data
      };

      // Call the API to update the resume data
      const response = await UpdateResumeData(finalData);

      // Handle the response if needed
      console.log('Update successful:', response);
    } catch (error) {
      console.error('Error updating volunteer data:', error);
    }
  };

  const removeExperience = (index: number) => {
    setVolunteerdata(prevData => prevData.filter((_, i) => i !== index));
  };

  const onMoveUp = (index: number) => {
    if (index === 0) return;
    setVolunteerdata(prevData => {
      const updatedData = [...prevData];
      [updatedData[index - 1], updatedData[index]] = [updatedData[index], updatedData[index - 1]];
      return updatedData;
    });
  };

  const onMoveDown = (index: number) => {
    if (index === volunteerdata.length - 1) return;
    setVolunteerdata(prevData => {
      const updatedData = [...prevData];
      [updatedData[index], updatedData[index + 1]] = [updatedData[index + 1], updatedData[index]];
      return updatedData;
    });
  };


  return (
    <div className="flex flex-col gap-8 mb-8">
      {(volunteerdata || allVolunteeringExps)?.map((volunteeringInfo, index, array) => (
        <MoveEditSection
          key={volunteeringInfo.id}
          title={volunteeringInfo.organization || 'Experience'}
          expanded={expanded === volunteeringInfo.id}
          length={array.length} // Use the length of the mapped array
          index={index}
          clickHandler={() => handleChange(volunteeringInfo.id, expanded !== volunteeringInfo.id)}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onDelete={removeExperience}
        >
          <Volunteer
            volunteeringInfo={volunteeringInfo}
            onChange={(updatedInfo) => handleVolunteeringChange(index, updatedInfo)}
            currentIndex={index}
          />
        </MoveEditSection>
      ))}

      {/* <AddVolunteeringExp handleChange={handleChange} isEmpty={allVolunteeringExps.length === 0} /> */}
      <AddVolunteeringExp handleChange={handleChange} isEmpty={volunteerdata?.length === 0} setVolunteerdata={setVolunteerdata} />

      <OutlinedButton onClick={updateNewVolunteer}>Update Volunteer</OutlinedButton>
    </div>
  );
};

export default VolunteeringLayout;
