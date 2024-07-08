// import { useEffect, useState } from 'react';
// import { useEducations } from 'src/stores/education';
// import AddEducation from './components/AddEducation';
// import Education from './components/Education';

// import MoveEditSection from 'src/helpers/common/components/MoveEditSectionContainer';
// import { fetchResumeData } from 'src/services/basics';

// const EducationLayout = () => {
//   const allAcademics = useEducations((state) => state.academics);
//   const removeEducation = useEducations.getState().remove;
//   const onMoveUp = useEducations.getState().onmoveup;
//   const onMoveDown = useEducations.getState().onmovedown;
//   const [educationdata, SetEducationdata] = useState(null);

//   const [expanded, setExpanded] = useState<string | false>(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchResumeData(); // Fetch resume data
//         SetEducationdata(data?.data?.education);
//       } catch (error) {
//         console.error('Error fetching resume data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     setExpanded(allAcademics[0]?.id);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleChange = (panel: string, isExpanded: boolean) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   //console.log("apiData", apiData)

//   return (
//     <div className="flex flex-col gap-8 mb-8">
//       {(educationdata || allAcademics)?.map((education, index) => (
//         <MoveEditSection
//           key={education.id}
//           title={education.institution || 'Education'}
//           expanded={expanded === education.id}
//           length={allAcademics.length}
//           index={index}
//           clickHandler={() => handleChange(education.id, expanded !== education.id)}
//           onMoveUp={onMoveUp}
//           onMoveDown={onMoveDown}
//           onDelete={removeEducation}
//         >
//           <Education educationInfo={education} currentIndex={index} />
//         </MoveEditSection>
//       ))}
//       <AddEducation handleChange={handleChange} isEmpty={allAcademics.length === 0} />
//     </div>
//   );
// };

// export default EducationLayout;

import { useEffect, useState } from 'react';
import { useEducations } from 'src/stores/education';
import AddEducation from './components/AddEducation';
import Education from './components/Education';
import MoveEditSection from 'src/helpers/common/components/MoveEditSectionContainer';
import { fetchResumeData } from 'src/services/basics';
import { OutlinedButton } from 'src/helpers/common/atoms/Buttons';
import { UpdateResumeData } from '../../../../../services/updateResume';

const EducationLayout = () => {
  const allAcademics = useEducations((state) => state.academics);
  // const removeEducation = useEducations.getState().remove;
  // const onMoveUp = useEducations.getState().onmoveup;
  // const onMoveDown = useEducations.getState().onmovedown;
  const [educationdata, setEducationdata] = useState(null);
  const [updatEducationresume, setUpdatEducationresume] = useState(null);
  const [expanded, setExpanded] = useState<string | false>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchResumeData(); // Fetch resume data
        setEducationdata(data?.data?.education);
        setUpdatEducationresume(data?.data);
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };
    // if (educationdata == null) {
    fetchData();
    // }
  }, []);

  const updateEducation = async () => {
    try {
      // Create the final data object by replacing the education array
      const finalData = {
        ...updatEducationresume,
        education: educationdata, // Replace the education array with educationdata
      };

      console.log('finalData', finalData);

      // Call the API to update the resume data
      const response = await UpdateResumeData(finalData);

      // Handle the response if needed
      console.log('Update successful:', response);
    } catch (error) {
      console.error('Error updating education:', error);
    }
  };

  useEffect(() => {
    setExpanded(allAcademics[0]?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (panel: string, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleEducationChange = (index: number, name: string, value: any) => {
    setEducationdata((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        [name]: value,
      };
      return updatedData;
    });
  };

  const removeEducation = (index: number) => {
    setEducationdata((prevData) => prevData.filter((_, i) => i !== index));
  };

  const onMoveUp = (index: number) => {
    if (index === 0) return;
    setEducationdata((prevData) => {
      const updatedData = [...prevData];
      [updatedData[index - 1], updatedData[index]] = [updatedData[index], updatedData[index - 1]];
      return updatedData;
    });
  };

  const onMoveDown = (index: number) => {
    if (index === educationdata.length - 1) return;
    setEducationdata((prevData) => {
      const updatedData = [...prevData];
      [updatedData[index], updatedData[index + 1]] = [updatedData[index + 1], updatedData[index]];
      return updatedData;
    });
  };

  return (
    <div className="flex flex-col gap-8 mb-8">
      {(educationdata || allAcademics)?.map((education, index) => (
        <MoveEditSection
          key={education.id}
          title={education.institution || 'Education'}
          expanded={expanded === education.id}
          length={allAcademics.length}
          index={index}
          clickHandler={() => handleChange(education.id, expanded !== education.id)}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onDelete={removeEducation}
        >
          <Education
            educationInfo={education}
            currentIndex={index}
            onEducationChange={handleEducationChange}
          />
        </MoveEditSection>
      ))}
      {/* <AddEducation handleChange={handleChange} isEmpty={allAcademics.length === 0} /> */}
      <AddEducation
        handleChange={handleChange}
        isEmpty={allAcademics.length === 0}
        educationdata={educationdata}
        setEducationdata={setEducationdata}
      />
      <OutlinedButton onClick={updateEducation}>Update Education</OutlinedButton>
    </div>
  );
};

export default EducationLayout;
