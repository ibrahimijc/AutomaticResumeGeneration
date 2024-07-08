// // components/ChatGPTLeftSideUI.tsx

// import React, { useEffect, useState } from 'react';
// // import styles from './ChatGPTLeftSideUI.module.css';
// import pica from "../../../../../public/images/Background.png"
// import picb from "../../../../../public/images/Container.png"

// import { fetchResumeList } from 'src/services/resumelist';
// import Image from 'next/image';

// interface GenratedResumeLayoutProps {
//   children: React.ReactNode;
// }

// const previousSearches = [
//   'Mark henry resume 1',
//   'Mark henry resume 2',
//   'Mark henry resume 3',
//   'Mark henry resume 4',
//   'Mark henry resume 5',
// ];





// const GenratedResumeLayout = () => {
//   interface ResumeItem {
//     jobTitle: string;
//     companyTitle?: string;
//   }
  
//   const [resumelist, setresumelist] = useState<ResumeItem[] | null>(null);
  




//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchResumeList(); // Fetch resume data
//         setresumelist(data?.data);
//       } catch (error) {
//         console.error('Error fetching resume data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   console.log('resumelist',resumelist);
  

//   return (
//     <div style={{background:'#F9F9F9'}} className="chatGPTLeftSide">
//       <div  className="logoContainer">

//       {/* <div>
//           <Image src={pica} width={30} alt='no' />
//         </div> */}
//         <div className="heading">AI Generated Resume</div>
//         {/* <div>
//           <Image src={picb} width={25} alt='no' />
//         </div> */}
//       </div>
//       <div className="content">
//         <div className="previousSearches">
//           <ul className="searchList">
//             {resumelist?.map((search, index) => (
//               // <li key={index} style={{ backgroundColor: index === 0 ? '#add8e6' : 'transparent' }}>
//               <li key={index} >

//                 {search?.jobTitle}
//                 <p>{search?.companyTitle || "xyz company"}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//         {/* <div className="children">{children}</div> */}
//       </div>
//     </div>
//   );
// };

// export default GenratedResumeLayout;


import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchResumeList } from 'src/services/resumelist';
import { fetchResumeData } from 'src/services/basics';
import { useRouter } from 'next/router';

interface GenratedResumeLayoutProps {
  children: React.ReactNode;
}

const GenratedResumeLayout = () => {
  interface ResumeItem {
    id: string;
    jobTitle: string;
    companyTitle?: string;
  }

  const [resumelist, setresumelist] = useState<ResumeItem[] | null>(null);
  const router = useRouter();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchResumeList(); // Fetch resume data
        setresumelist(data?.data);
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };
    fetchData();
  }, []);

  const handleItemClick = (id: string) => {
    sessionStorage.setItem('resumeId', id);
    fetchResumeData()
    window.dispatchEvent(new Event('storage'));
  
  //this will reload the page without doing SSR
    // window.location.reload()
  };

  console.log('resumelist', resumelist);

  return (
    <div style={{ background: '#F9F9F9' }} className="chatGPTLeftSide">
      <div className="logoContainer">
        {/* <div>
          <Image src={pica} width={30} alt='no' />
        </div> */}
        <div className="heading">AI Generated Resume</div>
        {/* <div>
          <Image src={picb} width={25} alt='no' />
        </div> */}
      </div>
      <div className="content">
        <div className="previousSearches">
          <ul className="searchList">
            {resumelist?.map((search, index) => (
              <li key={index} onClick={() => handleItemClick(search.id)}>
                {search.jobTitle}
                <p>{search.companyTitle || "xyz company"}</p>
              </li>
            ))}
          </ul>
        </div>
        {/* <div className="children">{children}</div> */}
      </div>
    </div>
  );
};

export default GenratedResumeLayout;
