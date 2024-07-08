import { HTMLRenderer } from 'src/helpers/common/components/HTMLRenderer';
import { IAwards as LocalAwards } from 'src/stores/index.interface';
import { SectionHeading } from '../atoms/SectionHeading';
import { SectionList } from '../atoms/SectionList';
import { SectionSubtitle } from '../atoms/SectionSubtitle';
import { SectionTitle } from '../atoms/SectionTitle';
import { dateParser } from 'src/helpers/utils';
import { useEffect, useState } from 'react';
import { fetchResumeData } from 'src/services/basics.jsx';


interface ResumeData {
  data: {
    awards?: IAwards[];
    
  }
}


interface IAwards {
  title: string;
  awarder: string;
  date: string; 
  summary: string;

}
export const AwardSection = ({ awardsReceived }: { awardsReceived: IAwards[] }) => {

  const [resumedata, setResumedata] = useState<ResumeData | null>(null);

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
    const fetchData = async () => {
      try {
        const data = await fetchResumeData(); // Fetch resume data
        setResumedata(data);
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="mb-2">
      <SectionHeading title="Awards" />

      {(resumedata?.data?.awards || awardsReceived)?.map((award: IAwards, index: number) => {
        return (
          <div key={index} className="pb-2">
            <SectionTitle label={award.title} />
            <div className="flex justify-between awards-center">
              <SectionSubtitle label={award.awarder} />
              <div>
                <p className="text-xs">{dateParser(award.date)}</p>
              </div>
            </div>
            <SectionList>
              <HTMLRenderer htmlString={award.summary} />
            </SectionList>
          </div>
        );
      })}
    </div>
  );
};
