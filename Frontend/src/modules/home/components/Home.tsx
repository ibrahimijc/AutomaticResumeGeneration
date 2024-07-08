// import React, { useState, useContext, useEffect } from 'react';
// // import { SvgIcons } from '../../../icons';
// // import { LayoutContext } from '../../../context/layout.context';
// //import { useNavigate } from 'react-router-dom';
// import type { NextPage } from 'next';

// import Select, { SelectChangeEvent } from '@mui/material/Select';
// // import { useNavigate } from 'next/router';
// import MenuItem from '@mui/material/MenuItem';
// import Graph from './Graph';
// import { faker } from '@faker-js/faker';
// // Assuming CustomButton is imported correctly, else import it here
// // import CustomButton from '../../../components/CustomButton';

// interface TableData {
//   name: string;
//   value: number;
//   fname: string;
//   trackName: string;
//   distance: string;
// }

// export default function Home(): JSX.Element {
//   const [age, setAge] = useState<number>(30);
//   const [aged, setAged] = useState<number>(30);
//   const [showAll, setShowAll] = useState<boolean>(false);
// //   const navigation = useNavigate();
//   // const layout = useContext(LayoutContext);

// //   useEffect(() => {
// //     layout.setLayout({
// //       expandedBar: false,
// //       title: 'Dashboard',
// //       switch: '',
// //       subTitle: '',
// //       showCollapseIcon: false,
// //       showLogo: false,
// //       borderBottom: false,
// //       height: '56px',
// //       button: '',
// //       selectedSideBar: 'Dashboard',
// //     });
// //   }, []);

// //   const handleChange = (event: SelectChangeEvent<number>) => {
// //     setAge(event.target.value);
//     //   };
    
    
//     const handleChange = (event: SelectChangeEvent<string | number>) => {
//         setAged(typeof event.target.value === 'string' ? parseInt(event.target.value) : event.target.value);
//       };
// const newandleChange = (event: SelectChangeEvent<string | number>) => {
//     setAged(typeof event.target.value === 'string' ? parseInt(event.target.value) : event.target.value);
//   };
  

//   const handleSeeAllClick = () => {
//     // navigation('/races');
//   };

//   const renderTableHeader = () => {
//     return (
//       <tr className='column'>
//         <th>Race Name</th>
//         <th>Race Number</th>
//         <th>Jockey</th>
//         <th>Track</th>
//         <th>Distance</th>
//       </tr>
//     );
//   };

//   const renderTableData = () => {
//     const visibleRows = showAll ? tableData : tableData.slice(0, 4);
//     return visibleRows.map((rowData, rowIndex) => (
//       <tr key={rowIndex}>
//         <td>{rowData.name}</td>
//         <td>{rowData.value}</td>
//         <td>{rowData.fname}</td>
//         <td>{rowData.trackName}</td>
//         <td>{rowData.distance}</td>
//       </tr>
//     ));
//   };

//   const tableData: TableData[] = [
//     {
//       name: 'Race Name 01',
//       value: 532,
//       fname: 'John Doe',
//       trackName: 'Track Name',
//       distance: '4 KMs',
//     },
//     // Add more data here
//   ];

//   const info = [
//     {
//       tag: 'Races',
//       img: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
//       value: 204,
//     },
//     {
//       tag: 'Horses',
//       img: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
//       value: 154,
//     },
//     {
//       tag: 'Last Update',
//       img: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
//       value: '16/06/2023',
//     },
//   ];

//   const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: 'Dataset 2',
//             // data: labels.map(() => faker.datatype.number({ min: 200, max: 1000 })),
//             data: labels.map(() => faker.random.number({ min: 300, max: 1000 })),
//         borderColor: '#E0E08F',
//         backgroundColor: 'rgba(224, 224, 143, 0.2)',
//         opacity: 0.1,
//         pointBackgroundColor: '#FFF',
//         borderWidth: 2,
//       },
//     ],
//   };
  
//   const data2 = {
//     labels,
//     datasets: [
//       {
//         label: 'Dataset 2',
//             // data: labels.map(() => faker.datatype.number({ min: 300, max: 1000 })),
//             data: labels.map(() => faker.random.number({ min: 300, max: 1000 })),
//         backgroundColor: 'rgba(53, 162, 235, 0.5)',
//         borderRadius: 10,
//       },
//       {
//         label: 'Dataset 4',
//           // data: labels.map(() => faker.datatype.number({ min: 300, max: 1000 })),
//           data: labels.map(() => faker.random.number({ min: 300, max: 1000 })),
//         backgroundColor: '#E5BDBE',
//         borderRadius: 10,
//       },
//     ],
//   };
  

//   return (
//     <div className='w-100' id='home-container'>
//       <div className='info-divs w-95'>
//         {info.map((element, idx) => (
//           <div className='each-info w-100 d-flex align-items-center' key={idx}>
//             {element.img}
//             <div className='info-content'>
//               <div className='info-head'>{element.tag}</div>
//               <div className='info-value'>{element.value}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className='chart-divs'>
//         <div className='t-races w-100'>
//           <div className='race-head d-flex w-96 align-items-center justify-content-between'>
//             Total Races
//             <Select onChange={newandleChange} value={aged} className='gg'>
//               <MenuItem value={10}>Last 7 Days</MenuItem>
//               <MenuItem value={20}>This Month</MenuItem>
//               <MenuItem value={30}>Last 6 Months</MenuItem>
//               <MenuItem value={40}>This Year</MenuItem>
//             </Select>
//           </div>
//           <Graph type='line' data={data} />
//         </div>

//         <div className='t-horses w-100'>
//           <div className='race-head d-flex w-96 align-items-center justify-content-between '>
//             Total Horses
//             <Select value={age} onChange={handleChange} className='gg'>
//               <MenuItem value={10}>Last 7 Days</MenuItem>
//               <MenuItem value={20}>This Month</MenuItem>
//               <MenuItem value={30}>Last 6 Months</MenuItem>
//               <MenuItem value={40}>This Year</MenuItem>
//             </Select>
//           </div>
//           <Graph data={data2} />
//         </div>
//       </div>

//       <div className='maintable'>
//         <div className='newtable w-100'>
//           <div className='race-myhead d-flex '>Races</div>
//           <table>
//             <thead>{renderTableHeader()}</thead>
//             <tbody>{renderTableData()}</tbody>
//           </table>

//           <button className='btn' onClick={handleSeeAllClick}>
//             See All
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
 import Graph from './Graph';
import Image from 'next/image';
import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,Tooltip,Legend,PointElement,LineController, LineElement } from 'chart.js'
// import  faker  from 'faker';
import { faker } from '@faker-js/faker';
import { Bar } from 'react-chartjs-2';
import firstbtn from "../../../../public/icons/firstbutton.png";
import secondbtn from "../../../../public/icons/secondbutton.png";
import thirdbtn from "../../../../public/icons/thordbuttpon.png";
import { fetchAnalytics } from "../../../services/Analytics"
import { fetchResumeList } from 'src/services/resumelist';


ChartJS.register  (
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineController,
    LineElement,
    Tooltip,
    Legend
);


interface Dataset {
  label: string;
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
}

interface TableData {
  name: string;
  value: number;
  fname: string;
  trackName: string;
  distance: string;
}





export default function Home(): JSX.Element {
 
  const [showAll, setShowAll] = useState(false);
  

  const [analyticsdata, SetAnalyticsdata] = useState<{
    totalResumeCount?: number;
    totalResumesGeneratedToday?: number;
    totalResumesGeneratedLast30Days?: number;
    averageRating?: number;
    totalSignedUpUsersInLast30Days?: number;
    totalSignedUpUsersToday?: number;
    totalResumesWithNoFeedbacks?: number;
    totalResumesWithFeedbacks?: number;
    totalRegisteredUsers?: number;
  } | null>(null);
  


  interface ResumeItem {
    jobTitle?: string;
    companyTitle?: string;
    feedback?: string;
      jobDescription?: string;
      createdBy?: string;
 
  }
  
  const [resumelist, setresumelist] = useState<ResumeItem[] | null>(null);
  




  useEffect(() => {
    const fetchlistData = async () => {
      try {
        const data = await fetchResumeList(); // Fetch resume data
        setresumelist(data?.data);
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };
  
    fetchlistData();
  }, []);

  console.log('resumelist',resumelist);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAnalytics(); // Fetch resume data
        SetAnalyticsdata(data?.data);
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };

    fetchData();
  }, []);



  console.log('analyticsdata',analyticsdata);


  const handleSeeAllClick = () => {
  
     
   };
  const renderTableHeader = () => {
    return (
      <tr className='column'>
        <th>jobTitle</th>
        <th>companyTitle</th>
        <th>feedback</th>
        <th>jobDescription</th>
        <th>createdBy</th>
      </tr>
    );
  };

  // const renderTableData = () => {
  //   const visibleRows = showAll ? resumelist : resumelist.slice(0, 4);
  //   return visibleRows.map((rowData, rowIndex) => (
  //     <tr key={rowIndex}>
  //       <td>{rowData.jobTitle || '-' }</td>
  //       <td>{rowData.companyTitle || '-'}</td>
  //       <td>{rowData.feedback || '-'}</td>
  //       <td>{rowData.jobDescription || '-'}</td>
  //       <td>{rowData.createdBy || '-'}</td>
  //     </tr>
  //   ));
  // };



  const renderTableData = () => {
    const visibleRows = showAll ? resumelist! : resumelist!?.slice(0, 4);
    return visibleRows?.map((rowData, rowIndex) => (
      <tr key={rowIndex}>
        <td>{rowData.jobTitle || '-'}</td>
        <td>{rowData.companyTitle || '-'}</td>
        <td>{rowData.feedback || '-'}</td>
        <td>{rowData.jobDescription || '-'}</td>
        <td>{rowData.createdBy || '-'}</td>
      </tr>
    ));
  };
  

  const tableData: TableData[] = [
    {
      name: 'Race Name 01',
      value: 532,
      fname: 'John Doe',
      trackName: 'Track Name',
      distance: '4 KMs',
    },

    {
        "name":"Race Name 02" ,
        "value":678,
        "fname":"James Parker",
        "trackName":"Track Name",
        "distance":"4 KMs"
    },
   
    {
      "name":"Race Name 03" ,
      "value":156,
      "fname":"Mark Willson",
     "trackName":"Track Name",
     "distance":"4 KMs"
   },
   
   {
     "name":"Race Name 04" ,
     "value":876,
     "fname":"Eli Peterson",
     "trackName":"Track Name",
     "distance":"4 KMs"
   },
   
   {
     "name":"Race Name 05" ,
     "value":829,
     "fname":"mark abbort",
     "trackName":"Track Name",
     "distance":"4 KMs"
   },
   
   {
     "name":"Race Name 06" ,
     "value":349,
     "fname":"james anderson",
     "trackName":"Track Name",
     "distance":"4 KMs"
   },
   
   {
     "name":"Race Name 07" ,
     "value":789,
     "fname":"david marsh",
     "trackName":"Track Name",
     "distance":"4 KMs"
   },
    // Add more data here
  ];
    
  const newandleChange ={
    };
    
    const info = [
        {
          tag: 'Resumes',
          img: firstbtn,
          value: analyticsdata ? analyticsdata?.totalResumeCount : 0
          ,
        },
        {
          tag: 'Total Generated Resumes Today',
          img: secondbtn,
          value: analyticsdata ? analyticsdata?.totalResumesGeneratedToday : 0
        },
        {
          tag: 'Total Generated Resumes Last 30 days',
          img: thirdbtn,
          value: analyticsdata ? analyticsdata?.totalResumesGeneratedLast30Days : 0
      },
      {
        tag: 'Average Ratings',
        img: thirdbtn,
        value: analyticsdata ? analyticsdata?.averageRating : 0
      },
      ];

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


    



    //   const data = {
    // labels,
    // datasets: [
    //   {
    //     label: 'Dataset 2',
    //          data: labels.map(() => faker.datatype.number({ min: 200, max: 1000 })),
    //      //.   data: labels.map(() => faker.random.number({ min: 300, max: 1000 })),
    //     borderColor: '#E0E08F',
    //     backgroundColor: 'rgba(224, 224, 143, 0.2)',
    //     opacity: 0.1,
    //     pointBackgroundColor: '#FFF',
    //     borderWidth: 2,
    //   },
    // ],
    // };
    
    const data = {
      labels: [
        "Total Resume Count",
        "Average Rating",
        "Total Registered Users",
        "Total Resumes Generated Today",
        "Total Resumes Generated Last 30 Days",
        "Total Signed Up Users in Last 30 Days",
        "Total Signed Up Users Today",
        "Total Resumes with No Feedbacks",
        "Total Resumes with Feedbacks"
      ],
      datasets: [
        {
          label: 'Dataset 2',
          data: [
            analyticsdata?.totalResumeCount,
            analyticsdata?.averageRating,
            analyticsdata?.totalRegisteredUsers,
            analyticsdata?.totalResumesGeneratedToday,
            analyticsdata?.totalResumesGeneratedLast30Days,
            analyticsdata?.totalSignedUpUsersInLast30Days,
            analyticsdata?.totalSignedUpUsersToday,
            analyticsdata?.totalResumesWithNoFeedbacks,
            analyticsdata?.totalResumesWithFeedbacks
          ],
          borderColor: '#E0E08F',
          backgroundColor: 'rgba(224, 224, 143, 0.2)',
          opacity: 0.1,
          pointBackgroundColor: '#FFF',
          borderWidth: 2,
        },
      ],
    };


  //     const data2 = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'Dataset 2',
  //            data: labels.map(() => faker.datatype.number({ min: 300, max: 1000 })),
  //         //  data: labels.map(() => faker.random.number({ min: 300, max: 1000 })),
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //       borderRadius: 10,
  //     },
  //     {
  //       label: 'Dataset 4',
  //          data: labels.map(() => faker.datatype.number({ min: 300, max: 1000 })),
  //       //  data: labels.map(() => faker.random.number({ min: 300, max: 1000 })),
  //       backgroundColor: '#E5BDBE',
  //       borderRadius: 10,
  //     },
  //   ],
  // };
  



  const data2 = {
    labels: [
      "Total Resume Count",
      "Average Rating",
      "Total Registered Users",
      "Total Resumes Generated Today",
      "Total Resumes Generated Last 30 Days",
      "Total Signed Up Users in Last 30 Days",
      "Total Signed Up Users Today",
      "Total Resumes with No Feedbacks",
      "Total Resumes with Feedbacks"
    ],
    datasets: [
      {
        label: 'Dataset 2',
        data: [
          analyticsdata?.totalResumeCount,
          analyticsdata?.averageRating,
          analyticsdata?.totalRegisteredUsers,
          analyticsdata?.totalResumesGeneratedToday,
          analyticsdata?.totalResumesGeneratedLast30Days,
          analyticsdata?.totalSignedUpUsersInLast30Days,
          analyticsdata?.totalSignedUpUsersToday,
          analyticsdata?.totalResumesWithNoFeedbacks,
          analyticsdata?.totalResumesWithFeedbacks
        ],
        borderColor: '#E0E08F',
        // backgroundColor: 'rgba(224, 224, 143, 0.2)',
        opacity: 0.1,
        pointBackgroundColor: '#FFF',
        borderWidth: 2,

        backgroundColor: 'rgba(53, 162, 235, 0.5)',
         borderRadius: 10,
      },
    ],
  };


    return (
          <div className='w-100 home-container'>
      <div style={{width:'95%'}} className='info-divs w-95'>
        {info.map((element, idx) => (
          <div className='each-info w-100' style={{display:'flex',alignItems:'center'}} key={idx}>
                {/* {element.img} */}
                <Image src={element.img} alt="Picture" width={100} height={400} />

            <div className='info-content'>
              <div style={{marginBottom:'5px'}} className='info-head'>{element.tag}</div>
              <div className='info-value'>{element.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className='chart-divs'>
        <div className='t-races w-100'>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'96%'}} className='race-head d-flex w-96 align-items-center justify-content-between'>
          Total AI Generated Resumes
           
          </div>
          <Graph type='line' data={data} />
        </div>

        <div className='t-horses w-100'>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'96%'}} className='race-head d-flex w-96 align-items-center justify-content-between '>
            Total AI Generated Resumes
        
          </div>
          <Graph data={data2} />
        </div>
      </div>

      <div className='maintable'>
        <div className='newtable w-100'>
          <div style={{display:'flex'}} className='race-myhead d-flex '>Resumes</div>
          <table>
            <thead>{renderTableHeader()}</thead>
            <tbody>{renderTableData()}</tbody>
          </table>

          <button className='btn' onClick={handleSeeAllClick}>
            See All
          </button>
        </div>
      </div>
    </div>

    
  );
}

