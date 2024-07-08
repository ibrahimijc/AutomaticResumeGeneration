import { useEffect, useState } from 'react';
import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from 'src/stores/skills';
import EditSectionContainer from 'src/helpers/common/components/EditSectionContainer';
import Skill from './components/Skill';
import { fetchResumeData } from 'src/services/basics';

const SkillsLayout = () => {
  const skillState = [
    useLanguages(),
    useFrameworks(),
    useTechnologies(),
    useLibraries(),
    useDatabases(),
    usePractices(),
    useTools(),
  ];

  const [expanded, setExpanded] = useState<string | false>('Languages');

  const [skilldata, SetSkilldata] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchResumeData(); // Fetch resume data
        SetSkilldata(data?.data?.skills);
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };

    fetchData();
  }, []);

  console.log('skils', skilldata);

  const handleChange = (panel: string, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  console.log('skilldata',skilldata);
  
  return (
    <div className="flex flex-col gap-8 mb-8">
  {(skilldata || skillState)?.map((state) => {
    console.log('state', state);
    return (
      <EditSectionContainer
        key={state.title}
        title={state.title}
        expanded={expanded === state.title}
        isEnabled={state.isEnabled}
        setIsEnabled={state.setIsEnabled}
        clickHandler={() => handleChange(state.title, expanded !== state.title)}
      >
        <Skill
          // items={state.values}
           items={state.items}
          addItem={state.add}
          removeItem={state.remove}
          setItems={state.reset}
          hasLevel={state.hasLevel}
        />
      </EditSectionContainer>
    );
  })}
</div>

  );
};

export default SkillsLayout;
