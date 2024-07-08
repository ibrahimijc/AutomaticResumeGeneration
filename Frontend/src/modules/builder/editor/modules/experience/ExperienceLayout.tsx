// import { useEffect, useState } from 'react';
// import { useExperiences } from 'src/stores/experience';
// import AddExperience from './components/AddExperience';
// import Experience from './components/Experience';

// import MoveEditSection from 'src/helpers/common/components/MoveEditSectionContainer';
// import { fetchResumeData } from 'src/services/basics';

// const ExperienceLayout = () => {
//   const allWorks = useExperiences((state) => state.experiences);
//   const removeExperience = useExperiences.getState().remove;
//   const onMoveUp = useExperiences.getState().onmoveup;
//   const onMoveDown = useExperiences.getState().onmovedown;
//   const [experiencedata, SetExperiencedata] = useState(null);

//   const [expanded, setExpanded] = useState<string | false>(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchResumeData(); // Fetch resume data
//         SetExperiencedata(data?.data?.work);
//       } catch (error) {
//         console.error('Error fetching resume data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     setExpanded(allWorks[0]?.id);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleChange = (panel: string, isExpanded: boolean) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   return (
//     <div className="flex flex-col gap-8 mb-8">
//       {(experiencedata || allWorks)?.map((work, index) => (
//         <MoveEditSection
//           key={work.id}
//           title={work.name || 'Experience'}
//           expanded={expanded === work.id}
//           length={allWorks.length}
//           index={index}
//           clickHandler={() => handleChange(work.id, expanded !== work.id)}
//           onMoveUp={onMoveUp}
//           onMoveDown={onMoveDown}
//           onDelete={removeExperience}
//         >
//           <Experience experienceInfo={work} currentIndex={index} />
//         </MoveEditSection>
//       ))}
//       <AddExperience handleChange={handleChange} isEmpty={allWorks.length === 0} />
//     </div>
//   );
// };

// export default ExperienceLayout;


import { useEffect, useState } from 'react';
import { useExperiences } from 'src/stores/experience';
import AddExperience from './components/AddExperience';
import Experience from './components/Experience';
import MoveEditSection from 'src/helpers/common/components/MoveEditSectionContainer';
import { fetchResumeData } from 'src/services/basics';
import { UpdateResumeData } from 'src/services/updateResume';
import { OutlinedButton } from 'src/helpers/common/atoms/Buttons';

const ExperienceLayout = () => {
  const allWorks = useExperiences((state) => state.experiences);
  // const removeExperience = useExperiences.getState().remove;
  // const onMoveUp = useExperiences.getState().onmoveup;
  // const onMoveDown = useExperiences.getState().onmovedown;
  const updateExperience = useExperiences.getState().updateExperience;
  const [experiencedata, setExperiencedata] = useState(null);
  const [updatexperienceresume,setUpdatexperienceresume]=useState(null)

  const [expanded, setExpanded] = useState<string | false>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchResumeData(); // Fetch resume data
        setExperiencedata(data?.data?.work);
        setUpdatexperienceresume(data?.data)
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (allWorks.length > 0) {
      setExpanded(allWorks[0].id);
    }
  }, [allWorks]);

  const handleChange = (panel: string, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };


  
  const updateNewExperience = async() => {

    try {
      // Create the final data object by replacing the education array
      const finalData = {
        ...updatexperienceresume,
        work: experiencedata // Replace the education array with educationdata
      };


      

console.log('finalData',finalData);


      // Call the API to update the resume data
     const response = await UpdateResumeData(finalData);

      // Handle the response if needed
      console.log('Update successful:', response);
    } catch (error) {
      console.error('Error updating education:', error);
    }
    
  }

  const handleExperienceChange = (index: number, name: string, value: any) => {
    if (experiencedata) {
      const updatedData = [...experiencedata];
      updatedData[index] = {
        ...updatedData[index],
        [name]: value,
      };
      setExperiencedata(updatedData);

      // updateExperience(index, updatedData[index]);
    }
  };

  const removeExperience = (index: number) => {
    setExperiencedata(prevData => prevData.filter((_, i) => i !== index));
  };

  const onMoveUp = (index: number) => {
    if (index === 0) return;
    setExperiencedata(prevData => {
      const updatedData = [...prevData];
      [updatedData[index - 1], updatedData[index]] = [updatedData[index], updatedData[index - 1]];
      return updatedData;
    });
  };

  const onMoveDown = (index: number) => {
    if (index === experiencedata.length - 1) return;
    setExperiencedata(prevData => {
      const updatedData = [...prevData];
      [updatedData[index], updatedData[index + 1]] = [updatedData[index + 1], updatedData[index]];
      return updatedData;
    });
  };

  return (
    <div className="flex flex-col gap-8 mb-8">
      {(experiencedata || allWorks)?.map((work, index) => (
        <MoveEditSection
          key={work.id}
          title={work.name || 'Experience'}
          expanded={expanded === work.id}
          length={allWorks.length}
          index={index}
          clickHandler={() => handleChange(work.id, expanded !== work.id)}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onDelete={removeExperience}
        >
          <Experience experienceInfo={work} currentIndex={index} onExperienceChange={handleExperienceChange} />
        </MoveEditSection>
      ))}
      {/* <AddExperience handleChange={handleChange} isEmpty={allWorks.length === 0} /> */}
      <AddExperience handleChange={handleChange} isEmpty={allWorks.length === 0} setExperiencedata={setExperiencedata} />
      <OutlinedButton onClick={updateNewExperience} >Update Experience</OutlinedButton>
    </div>
  );
};

export default ExperienceLayout;
