// import { useEffect, useState } from 'react';
// import { useAwards } from 'src/stores/awards';
// import AddAward from './components/AddAward';
// import AwardComponent from './components/Award';

// import MoveEditSection from 'src/helpers/common/components/MoveEditSectionContainer';
// import { fetchResumeData } from 'src/services/basics';
// import { OutlinedButton } from 'src/helpers/common/atoms/Buttons';
// import { UpdateResumeData } from 'src/services/updateResume';

// const AwardsLayout = () => {
//   const allAwards = useAwards((state) => state.awards);
//   const removeEducation = useAwards.getState().remove;
//   const onMoveUp = useAwards.getState().onmoveup;
//   const onMoveDown = useAwards.getState().onmovedown;

//   const [awardsdata, SetAwardsdata] = useState(null);
//   const [updatwardsresume,setUpdatewardsresume]=useState(null)

//   const [expanded, setExpanded] = useState<string | false>(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchResumeData(); // Fetch resume data
//         SetAwardsdata(data?.data?.awards);
//         setUpdatewardsresume(data?.data)
//       } catch (error) {
//         console.error('Error fetching resume data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   console.log('awards', awardsdata);

//   useEffect(() => {
//     setExpanded(allAwards[0]?.id);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleChange = (panel: string, isExpanded: boolean) => {
//     setExpanded(isExpanded ? panel : false);
//   };

    
//   const updateNewAwards = async() => {

//     try {
//       // Create the final data object by replacing the education array
//       const finalData = {
//         ...updatwardsresume,
//         awards: awardsdata // Replace the education array with educationdata
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
//       {/* {(awardsdata || allAwards)?.map((award, index) => (
//         <MoveEditSection
//           key={award.id}
//           title={award.title || 'Award'}
//           expanded={expanded === award.id}
//           length={allAwards.length}
//           index={index}
//           clickHandler={() => handleChange(award.id, expanded !== award.id)}
//           onMoveUp={onMoveUp}
//           onMoveDown={onMoveDown}
//           onDelete={removeEducation}
//         >
//           <AwardComponent awardInfo={award} currentIndex={index} />
//         </MoveEditSection>
//       ))} */}
//       {(awardsdata ? awardsdata : allAwards)?.map((award, index, array) => (
//         <MoveEditSection
//           key={award.id}
//           title={award.title || 'Award'}
//           expanded={expanded === award.id}
//           length={array.length} // Use the length of the mapped array
//           index={index}
//           clickHandler={() => handleChange(award.id, expanded !== award.id)}
//           onMoveUp={onMoveUp}
//           onMoveDown={onMoveDown}
//           onDelete={removeEducation}
//         >
//           <AwardComponent awardInfo={award} currentIndex={index} />
//           <OutlinedButton onClick={updateNewAwards} >Update Experience</OutlinedButton>
//         </MoveEditSection>
//       ))}

//       <AddAward handleChange={handleChange} isEmpty={allAwards.length === 0} />
//     </div>
//   );
// };

// export default AwardsLayout;

import React, { useEffect, useState } from 'react';
import { useAwards } from 'src/stores/awards';
import AddAward from './components/AddAward';
import AwardComponent from './components/Award';
import MoveEditSection from 'src/helpers/common/components/MoveEditSectionContainer';
import { fetchResumeData } from 'src/services/basics';
import { OutlinedButton } from 'src/helpers/common/atoms/Buttons';
import { UpdateResumeData } from 'src/services/updateResume';

const AwardsLayout = () => {
  const allAwards = useAwards((state) => state.awards);
  // const removeAward = useAwards.getState().remove;
  // const onMoveUp = useAwards.getState().onMoveUp;
  // const onMoveDown = useAwards.getState().onMoveDown;

  const [awardsdata, setAwardsData] = useState(null);
  const [updateAwardsResume, setUpdateAwardsResume] = useState(null);
  const [expanded, setExpanded] = useState<string | false>(false);


  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchResumeData(); // Fetch resume data
        setAwardsData(data?.data?.awards);
        setUpdateAwardsResume(data?.data);
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setExpanded(allAwards[0]?.id);
  }, [allAwards]);

  const handleChange = (panel: string, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleAwardChange = (index: number, updatedAward: any) => {
    const updatedAwards = [...awardsdata];
    console.log('updatedAwards',updatedAwards);
    
    updatedAwards[index] = updatedAward;
    setAwardsData(updatedAwards);
  };

  const updateNewAwards = async () => {
    try {
      // Create the final data object by replacing the awards array
      const finalData = {
        ...updateAwardsResume,
        awards: awardsdata || allAwards, // Use either local state or global state data
      };

      console.log('finalData',finalData);
      

      // Call the API to update the resume data
      const response = await UpdateResumeData(finalData);

      // Handle the response if needed
      console.log('Update successful:', response);
    } catch (error) {
      console.error('Error updating awards:', error);
    }
  };

  const removeAward = (index: number) => {
    setAwardsData(prevData => prevData.filter((_, i) => i !== index));
  };

  const onMoveUp = (index: number) => {
    if (index === 0) return;
    setAwardsData(prevData => {
      const updatedData = [...prevData];
      [updatedData[index - 1], updatedData[index]] = [updatedData[index], updatedData[index - 1]];
      return updatedData;
    });
  };

  const onMoveDown = (index: number) => {
    if (index === awardsdata.length - 1) return;
    setAwardsData(prevData => {
      const updatedData = [...prevData];
      [updatedData[index], updatedData[index + 1]] = [updatedData[index + 1], updatedData[index]];
      return updatedData;
    });
  };


  return (
    <div className="flex flex-col gap-8 mb-8">
      {(awardsdata ? awardsdata : allAwards)?.map((award, index, array) => (
        <MoveEditSection
          key={award.id}
          title={award.title || 'Award'}
          expanded={expanded === award.id}
          length={array.length} // Use the length of the mapped array
          index={index}
          clickHandler={() => handleChange(award.id, expanded !== award.id)}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onDelete={removeAward}
        >
          <AwardComponent
            awardInfo={award}
            currentIndex={index}
            onChange={(updatedAward) => handleAwardChange(index, updatedAward)} // Pass the onChange handler
          />
          <OutlinedButton onClick={updateNewAwards}>Update Awards</OutlinedButton>
        </MoveEditSection>
      ))}

      {/* <AddAward handleChange={handleChange} isEmpty={allAwards.length === 0} /> */}
      <AddAward handleChange={handleChange} isEmpty={awardsdata?.length === 0} setAwardsData={setAwardsData} />
    </div>
  );
};

export default AwardsLayout;

