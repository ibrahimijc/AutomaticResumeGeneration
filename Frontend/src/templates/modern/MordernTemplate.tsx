import { BasicIntro } from './components/BasicIntro';
import { EducationSection } from './components/Education';
import { VolunteerSection } from './components/Volunteer';
import { Objective } from './components/Objective';
import { SkillsSection } from './components/Skills';
import { SummarySection } from './components/Summary';
import { WorkSection } from './components/Work';
import { AwardSection } from './components/Awards';
import { useContext } from 'react';
import { StateContext } from 'src/modules/builder/resume/ResumeLayout';
import { SectionValidator } from 'src/helpers/common/components/ValidSectionRenderer';
import { fetchResumeData } from 'src/services/basics.jsx';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function MordernTemplate() {
  const router = useRouter();

  const resumeData = useContext(StateContext);
  const [resumedatas, setResumedatas] = useState();

  const [resumeId, setResumeId] = useState(sessionStorage.getItem('resumeId'));

  useEffect(() => {
    const handleStorageChange = () => {
      setResumeId(sessionStorage.getItem('resumeId'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (resumeId) {
      const fetchData = async () => {
        try {
          const data = await fetchResumeData(); // Fetch resume data
          setResumedatas(data.data); // Set the initial value to an empty array if data is null or undefined
        } catch (error) {
          console.error('Error fetching resume data:', error);
        }
      };

      fetchData();
    } else {
      console.log('No resumeId found in session storage.');
    }
  }, [resumeId]);

  console.log('kashafnewrsumedaat', resumedatas);

  useEffect(() => {
    console.log(router.query.isEditor)
    if (router.query.isEditor) {
      const fetchData = async () => {
        try {
          const data = await fetchResumeData(); // Fetch resume data
          setResumedatas(data.data); // Set the initial value to an empty array if data is null or undefined
          console.log('original data', data);
        } catch (error) {
          console.error('Error fetching resume data:', error);
        }
      };


      fetchData();
      router.query.isEditor = undefined;
    }
  }, [router.query.isEditor]);

  return (
    <div className="p-2">
      <BasicIntro
        name={resumedatas?.basics?.name || resumeData.basics.name}
        label={resumedatas?.basics?.label || resumeData.basics.label}
        url={resumedatas?.basics?.url || resumeData.basics.url}
        email={resumedatas?.basics?.email || resumeData.basics.email}
        city={resumedatas?.basics?.location?.city || resumeData.basics.location.city}
        phone={resumedatas?.basics?.phone || resumeData.basics.phone}
        image={resumeData.basics.image}
      />
      <div className="flex">
        <div className="basis-[60%] p-3">
          <SectionValidator value={resumedatas?.basics?.summary || resumeData.basics.summary}>
            <SummarySection summary={resumedatas?.basics?.summary || resumeData.basics.summary} />
          </SectionValidator>

          <SectionValidator value={resumedatas?.work || resumeData.work}>
            <WorkSection experience={resumedatas?.work || resumeData.work} />
          </SectionValidator>

          <SectionValidator value={resumeData.awards}>
            <AwardSection awardsReceived={resumeData.awards} />
          </SectionValidator>
        </div>

        <div className="basis-[40%] p-3">
          <SectionValidator value={resumedatas?.basics?.objective || resumeData.basics.objective}>
            <Objective objective={resumedatas?.basics?.objective || resumeData.basics.objective} />
          </SectionValidator>

          {Array.isArray(resumedatas?.skills) && resumedatas?.skills.length > 0 ? (
            resumedatas?.skills.map((data: { items: string[] }, index: number) => (
              <SectionValidator key={index} value={data?.items || []}>
                <SkillsSection title={data.title} list={data?.items || []}>
                  {data.items?.map((item: string, itemIndex: number) => (
                    <div key={itemIndex}>{item}</div>
                  ))}
                </SkillsSection>
              </SectionValidator>
            ))
          ) : (
            <>
              <SectionValidator
                value={resumedatas?.skills?.languages || resumeData.skills.languages}
              >
                <SkillsSection
                  title="Languages"
                  list={resumedatas?.skills?.languages || resumeData.skills.languages}
                />
              </SectionValidator>

              <SectionValidator
                value={resumedatas?.skills?.technologies || resumeData.skills.technologies}
              >
                <SkillsSection
                  title="Technologies"
                  list={resumedatas?.skills?.technologies || resumeData.skills.technologies}
                />
              </SectionValidator>

              <SectionValidator
                value={resumedatas?.skills?.frameworks || resumeData.skills.frameworks}
              >
                <SkillsSection
                  title="Frameworks"
                  list={resumedatas?.skills?.frameworks || resumeData.skills.frameworks}
                />
              </SectionValidator>

              <SectionValidator value={resumedatas?.skills?.tools || resumeData.skills.tools}>
                <SkillsSection
                  title="Tools"
                  list={resumedatas?.skills?.tools || resumeData.skills.tools}
                />
              </SectionValidator>
            </>
          )}

          <SectionValidator value={resumedatas?.education || resumeData.education}>
            <EducationSection education={resumedatas?.education || resumeData.education} />
          </SectionValidator>

          <SectionValidator value={resumedatas?.volunteer || resumeData.volunteer}>
            <VolunteerSection volunteer={resumedatas?.volunteer || resumeData.volunteer} />
          </SectionValidator>
        </div>
      </div>
    </div>
  );
}
