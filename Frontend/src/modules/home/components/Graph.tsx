// import React from 'react';
// import { Line, Bar } from 'react-chartjs-2';

// export default function Graph(props:any) {
//   const lineChartOptions = {
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         grid: {
//           borderWidth: 0.5,
//           borderColor: 'rgba(0, 0, 0, 0.05)',
//         },
//         ticks: {
//           display: true,
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//     layout: {
//       padding: {
//         top: 8,
//       },
//     },
//     maintainAspectRatio: false,
//   };

//   const barChartOptions = {
//     indexAxis: 'x',
//     scales: {
//       y: {
//         grid: {
//           display: false,
//         },
//       },
//       x: {
//         grid: {
//           borderWidth: 0.5,
//           borderColor: 'rgba(0, 0, 0, 0.05)',
//         },
//         ticks: {
//           display: true,
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//     layout: {
//       padding: {
//         top: 8,
//       },
//     },
//     maintainAspectRatio: false,
//   };

//   return (
//     <div id="graph">
//       {props.type === 'line' ? (
//         <Line data={props.data} options={lineChartOptions} height={'300px'} />
//       ) : (
//         <Bar data={props.data} options={barChartOptions} height={'300px'} />
//       )}
//     </div>
//   );
// }

import React from 'react';
import { Line, Bar } from 'react-chartjs-2';

export default function Graph(props: any) {
  const lineChartOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          borderWidth: 0.5,
          borderColor: 'rgba(0, 0, 0, 0.05)',
        } as GridOptions,
        ticks: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {
        top: 8,
      },
    },
    maintainAspectRatio: false,
  };

  const barChartOptions = {
    // indexAxis: 'x',
    scales: {
      y: {
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: true,
          borderWidth: 0.5,
          borderColor: 'rgba(0, 0, 0, 0.05)',
        } as GridOptions,
        ticks: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {
        top: 8,
      },
    },
    maintainAspectRatio: false,
  };

  type GridOptions = {
    display: boolean;
    borderWidth?: number;
    borderColor?: string;
  };

  return (
    <div id="graph">
      {props.type === 'line' ? (
        <Line data={props.data} options={lineChartOptions} height={'300px'} />
      ) : (
        <Bar data={props.data} options={barChartOptions} height={'300px'} />
      )}
    </div>
  );
}

