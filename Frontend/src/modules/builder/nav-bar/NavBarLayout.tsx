import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { NavBarActions, NavBarMenu, StyledButton } from './atoms';
import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from 'src/stores/skills';

import { AVAILABLE_TEMPLATES } from 'src/helpers/constants';
import DEFAULT_RESUME_JSON from 'src/helpers/constants/resume-data.json';
import Image from 'next/image';
import Link from 'next/link';
import { NavMenuItem } from './components/MenuItem';
import { PrintResume } from './components/PrintResume';
import { TemplateSelect } from './components/TemplateSelect';
import { ThemeSelect } from './components/ThemeSelect';
import { Toast } from 'src/helpers/common/atoms/Toast';
import exportFromJSON from 'export-from-json';
import { useActivity } from 'src/stores/activity';
import { useAwards } from 'src/stores/awards';
import { useBasicDetails } from 'src/stores/basic';
import { useEducations } from 'src/stores/education';
import { useExperiences } from 'src/stores/experience';
import { useVoluteeringStore } from 'src/stores/volunteering';
import { useRouter } from 'next/router';
import CustomModal from '../nav-bar/components/CustomModal';
import { useFormik } from 'formik';
import CustomButton from "../nav-bar/components/CustomButton"
import { generateresume } from "../../../services/generateresume"


const TOTAL_TEMPLATES_AVAILABLE = Object.keys(AVAILABLE_TEMPLATES).length;

const NavBarLayout = () => {
  const [openToast, setOpenToast] = useState(false);
  const fileInputRef = useRef(null);


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [state, setState] = useState({
    modalOpen: false,
    modalOpendelete: false,
    AppliedmodalOpen: false
  });

  const formik = useFormik({
    initialValues: {
      jobTitle: '',
      jobDescription: '',
      companyTitle: '',
    },


    
    onSubmit: (values) => {
      console.log('Form values:', values);
    },
  });
  console.log('formik',formik);

  const router = useRouter();
  const isInAiresumeRoute = router.pathname === '/airesume';

  const exportResumeData = useCallback(() => {
    const updatedResumeJson = {
      ...DEFAULT_RESUME_JSON,
      basics: {
        ...DEFAULT_RESUME_JSON.basics,
        ...useBasicDetails.getState().values,
      },
      work: useExperiences.getState().experiences,
      education: useEducations.getState().academics,
      awards: useAwards.getState().awards,
      volunteer: useVoluteeringStore.getState().volunteeredExps,
      skills: {
        languages: useLanguages.getState().get(),
        frameworks: useFrameworks.getState().get(),
        technologies: useTechnologies.getState().get(),
        libraries: useLibraries.getState().get(),
        databases: useDatabases.getState().get(),
        practices: usePractices.getState().get(),
        tools: useTools.getState().get(),
      },
      activities: useActivity.getState().activities,
    };
    const fileName = updatedResumeJson.basics.name + '_' + new Date().toLocaleString();
    const exportType = exportFromJSON.types.json;
    exportFromJSON({
      data: updatedResumeJson,
      fileName,
      exportType,
    });
  }, []);

  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    const reader = new FileReader();

    reader.readAsText(fileObj);

    event.target.value = ''; // To read the same file

    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        const uploadedResumeJSON = JSON.parse(e.target?.result);
        const {
          basics = {},
          skills = {},
          work = [],
          education = [],
          activities = {
            involvements: '',
            achievements: '',
          },
          volunteer = [],
          awards = [],
        } = uploadedResumeJSON;
        const {
          languages = [],
          frameworks = [],
          libraries = [],
          databases = [],
          technologies = [],
          practices = [],
          tools = [],
        } = skills;
        useBasicDetails.getState().reset(basics);
        useLanguages.getState().reset(languages);
        useFrameworks.getState().reset(frameworks);
        useLibraries.getState().reset(libraries);
        useDatabases.getState().reset(databases);
        useTechnologies.getState().reset(technologies);
        usePractices.getState().reset(practices);
        useTools.getState().reset(tools);
        useExperiences.getState().reset(work);
        useEducations.getState().reset(education);
        useVoluteeringStore.getState().reset(volunteer);
        useAwards.getState().reset(awards);
        useActivity.getState().reset(activities);
        setOpenToast(true);
      }
    };
  }, []);


  const applyopenModal = () => {
    console.log('hell0');
    setState({ ...state, AppliedmodalOpen: true });
  }

  const applycloseModal = () => {
    console.log('hell0');
    setState({ ...state, AppliedmodalOpen: false });





  }
  // const ApplyModalComponent = () => {


  //   const handleSubmit = async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {



  //       const resumeData = await generateresume(formik.values);
  //       console.log('Resume Data:', resumeData);
  //       setSuccess(true);
  //       formik.resetForm();
  //       applycloseModal()
  //     } catch (error) {
  //       console.log('Error:', error);
  //       //  setError('Failed to submit data');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };



  //   return (



  //     <div style={{ display: 'flex', margin: 'auto', justifyContent: 'center', background: 'white', position: 'relative', top: '76%', right: '202%', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px' }}>
  //       <div style={{ textAlign: 'center', padding: '20px' }}>
  //         <div style={{ fontWeight: 'bold', fontSize: '20px', color: '#007bff' }}>
  //           Upload Job Details
  //         </div>
  //         <div style={{ marginTop: '12px', fontSize: '12px', color: '#007bff' }}>
  //           Upload your company title, job title, and job description. Ensure your information is updated for potential employers to reach you.
  //         </div>
  //         <form onSubmit={formik.handleSubmit}>
  //           <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  //             <div style={{ fontWeight: '600', fontSize: '16px' }}>
  //               Company Title <span style={{ color: '#ff5b5b' }}>*</span>
  //             </div>
  //           </div>
  //           <div style={{ marginTop: '5px', fontSize: '12px', color: '#ff5b5b' }}>
  //             <input
  //               name="compannytitle"
  //               style={{ width: '100%', color: 'black', fontSize: '10px' }}
  //               type="text"
  //               placeholder="Enter Your Company Title"
  //               value={formik.values.companyTitle}
  //               //onChange={formik.handleChange}
  //               onChange={(e) => formik.setValues({ ...formik.values, companyTitle: e.target.value })}
  //             />
  //           </div>
  //           <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  //             <div style={{ fontWeight: '600', fontSize: '16px' }}>
  //               job title <span style={{ color: '#ff5b5b' }}>*</span>
  //             </div>
  //           </div>
  //           <div style={{ marginTop: '5px', fontSize: '12px', color: '#ff5b5b' }}>
  //             <input
  //                  value={formik.values.jobTitle}
  //               // onChange={formik.handleChange}
  //                  onChange={(e) => formik.setValues({ ...formik.values, jobTitle: e.target.value })}
  //               style={{ width: '100%', color: 'black', fontSize: '10px' }}
  //               type='text'
  //               placeholder='Enter Your job Title' />
  //           </div>

  //           <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  //             <div style={{ fontWeight: '600', fontSize: '16px' }}>
  //               job Description <span style={{ color: '#ff5b5b' }}>*</span>
  //             </div>
  //           </div>
  //           <div style={{ marginTop: '5px', fontSize: '12px', color: '#ff5b5b' }}>
  //             <input
  //               value={formik.values.jobDescription}
  //               //       onChange={formik.handleChange}
  //               onChange={(e) => formik.setValues({ ...formik.values, jobDescription: e.target.value })}

  //               style={{ width: '100%', color: 'black', fontSize: '12px', height: '70px' }} type='text' placeholder='Enter Your Job description' />
  //           </div>



  //           <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between' }}>
  //             <div style={{ width: '50%', borderRadius: '100px' }}>
  //               <CustomButton
  //                 varient='secondary'
  //                 btntext={'Cancel'}
  //                 onClick={() => applycloseModal()} />
  //             </div>
  //             <div style={{ width: '50%' }}>
  //               <CustomButton
  //                 onClick={() => handleSubmit()}
  //                 varient='primary'
  //                 btntext={'Apply Now'} />
  //             </div>
  //           </div>
  //         </form>
  //       </div>
  //     </div>




  //   );
  // };


  const ApplyModalComponent = ({ applycloseModal }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
  
    const formik = useFormik({
      initialValues: {
        jobTitle: '',
        jobDescription: '',
        companyTitle: '',
      },
      onSubmit: async (values) => {
        setLoading(true);
        setError(null);
        try {
          console.log('values',values);
          
          const resumeData = await generateresume(values);
          console.log('Resume Data:', resumeData);
          setSuccess(true);
          formik.resetForm();
          applycloseModal();
        } catch (error) {
          console.log('Error:', error);
          // setError('Failed to submit data');
        } finally {
          setLoading(false);
        }
      },
    });
  
    return (
      <div style={{ display: 'flex', margin: 'auto', justifyContent: 'center', background: 'white', position: 'relative', top: '76%', right: '202%', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px' }}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '20px', color: '#007bff' }}>
            Upload Job Details
          </div>
          <div style={{ marginTop: '12px', fontSize: '12px', color: '#007bff' }}>
            Upload your company title, job title, and job description. Ensure your information is updated for potential employers to reach you.
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: '600', fontSize: '16px' }}>
                Company Title <span style={{ color: '#ff5b5b' }}>*</span>
              </div>
            </div>
            <div style={{ marginTop: '5px', fontSize: '12px', color: '#ff5b5b' }}>
              <input
                name="companyTitle"
                style={{ width: '100%', color: 'black', fontSize: '10px' }}
                type="text"
                placeholder="Enter Your Company Title"
                value={formik.values.companyTitle}
                onChange={formik.handleChange}
              />
            </div>
            <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: '600', fontSize: '16px' }}>
                Job Title <span style={{ color: '#ff5b5b' }}>*</span>
              </div>
            </div>
            <div style={{ marginTop: '5px', fontSize: '12px', color: '#ff5b5b' }}>
              <input
                name="jobTitle"
                value={formik.values.jobTitle}
                onChange={formik.handleChange}
                style={{ width: '100%', color: 'black', fontSize: '10px' }}
                type="text"
                placeholder="Enter Your Job Title"
              />
            </div>
            <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: '600', fontSize: '16px' }}>
                Job Description <span style={{ color: '#ff5b5b' }}>*</span>
              </div>
            </div>
            <div style={{ marginTop: '5px', fontSize: '12px', color: '#ff5b5b' }}>
              <input
                name="jobDescription"
                value={formik.values.jobDescription}
                onChange={formik.handleChange}
                style={{ width: '100%', color: 'black', fontSize: '12px', height: '70px' }}
                type="text"
                placeholder="Enter Your Job Description"
              />
            </div>
            <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '50%', borderRadius: '100px' }}>
                <CustomButton
                  varient="secondary"
                  btntext="Cancel"
                  onClick={applycloseModal}
                />
              </div>
              <div style={{ width: '50%' }}>
                <CustomButton
                  type="submit"
                  varient="primary"
                  btntext="Apply Now"
                  disabled={loading}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      );
    };
  return (
    <nav className="h-14 w-full bg-resume-800 relative flex py-2.5 pl-5 pr-4 items-center shadow-level-8dp z-20 print:hidden">
      <Link href="/">
        <Image src={'/icons/resume-icon.png'} alt="logo" height="36" width="36" />
      </Link>
      <div className="flex-auto flex justify-between items-center ml-5">
        <NavBarMenu>

          {!isInAiresumeRoute && (
            <>
              <NavMenuItem
                caption={`Templates (${TOTAL_TEMPLATES_AVAILABLE})`}
                popoverChildren={<TemplateSelect />}
              />
              <NavMenuItem caption="Colours" popoverChildren={<ThemeSelect />} />
            </>
          )}

          {isInAiresumeRoute && (
            <div onClick={() => applyopenModal()}>
              <NavMenuItem
                caption="airesume"

                popoverChildren={null}
              //  popoverChildren={<ThemeSelect />}
              />
            </div>
          )}
        </NavBarMenu>



        <NavBarActions>
          <StyledButton variant="text" onClick={exportResumeData}>
            Export
          </StyledButton>
          <StyledButton
            variant="text"
            onClick={() => {
              if (fileInputRef.current) {
                const fileElement = fileInputRef.current as HTMLInputElement;
                fileElement.click();
              }
            }}
          >
            Import{' '}
            <input
              type="file"
              hidden
              ref={fileInputRef}
              accept="application/json"
              onChange={handleFileChange}
            />
          </StyledButton>
          <PrintResume />
        </NavBarActions>
      </div>
      <Toast
        open={openToast}
        onClose={() => {
          setOpenToast(false);
        }}
        content={'Resume data was successfully imported.'}
      />


      <CustomModal
        open={state.AppliedmodalOpen}
        component={<ApplyModalComponent />}
        borderRadius='8px'
        padding='32px'
        width='100%'
        heigth="auto"
        onClose={() => setState({ ...state, AppliedmodalOpen: false })}

      />
    </nav>



  );
};

export default NavBarLayout;
