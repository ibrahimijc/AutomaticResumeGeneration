using Newtonsoft.Json;
using ResumeBuilderService.API.Controllers;
using ResumeBuilderService.Domain.Models;

namespace ResumeBuilderService.API.Constants;

public static class BasicDefaultResume
{
    public static BasicDetails GetDefaultResume()
    {
        string jsonData2 = @"{
  'CreatedBy': null,
  'UpdatedBy': null,
  'UserId': '66034c377c0e80001c3115e3',
  'Basics': {
    'Name': 'John Doe',
    'Label': 'Middle Backend Developer',
    'Image': 'https://randomuser.me/api/portraits/men/18.jpg',
    'Email': 'ibrahim@gmail.com',
    'Phone': '+92 3322178787',
    'Url': 'www.ibrahim.com',
    'Summary': 'I am a backend engineer having expertise in backend development and exposure to front-end development. I design and develop web applications using the latest technologies to deliver the product with quality code.',
    'Location': {
      'Address': '',
      'PostalCode': '',
      'City': 'Karachi',
      'CountryCode': '',
      'Region': ''
    },
    'RelExp': '4 years',
    'TotalExp': '6 Years',
    'Objective': 'Eager to expand my skill set through external trainings to help boost all major front desk KPIs. Hoping to leverage organizational skills to help Current Corp introduce time-saving schemes for all executives.',
    'Profiles': [
      {
        'Network': 'linkedin',
        'Username': 'ibrahimijc',
        'Url': 'https://www.linkedin.com/in/ibrahimijc/'
      },
      {
        'Network': 'twitter',
        'Username': 'ibrahimijc',
        'Url': 'https://www.twitter.com/ibrahimijc/'
      },
      {
        'Network': 'github',
        'Username': 'ibrahimijc',
        'Url': 'https://github.com/ibrahimijc/'
      },
      {
        'Network': 'hackerrank',
        'Username': '',
        'Url': ''
      },
      {
        'Network': 'hackerearth',
        'Username': '',
        'Url': ''
      },
      {
        'Network': 'codechef',
        'Username': '',
        'Url': ''
      },
      {
        'Network': 'leetcode',
        'Username': '',
        'Url': ''
      }
    ]
  },
  'Skills': [
    {
      'Title': 'Languages',
      'Items': [
        {
          'Name': 'C#',
          'Level': 90
        },
        {
          'Name': 'Node.js',
          'Level': 80
        },
        {
          'Name': 'Javascript',
          'Level': 80
        }
      ]
    },
    {
      'Title': 'Frameworks',
      'Items': [
        {
          'Name': 'React',
          'Level': 70
        },
        {
          'Name': 'Angular',
          'Level': 70
        }
      ]
    },
    {
      'Title': 'Technologies',
      'Items': [
        {
          'Name': 'Algorithms',
          'Level': 3
        },
        {
          'Name': 'Distributed web apps',
          'Level': 3
        },
        {
          'Name': 'SQL',
          'Level': 3
        },
        {
          'Name': 'Data Structures',
          'Level': 3
        }
      ]
    },
    {
      'Title': 'Libraries',
      'Items': [
        {
          'Name': 'Newtonsoft',
          'Level': 3
        },
        {
          'Name': 'Redis',
          'Level': 3
        }
      ]
    },
    {
      'Title': 'Databases',
      'Items': [
        {
          'Name': 'Postgre',
          'Level': 3
        }
      ]
    },
    {
      'Title': 'Tools',
      'Items': [
        {
          'Name': 'Git',
          'Level': 3
        },
        {
          'Name': 'VS Code',
          'Level': 3
        },
        {
          'Name': 'Jira',
          'Level': 3
        },
        {
          'Name': 'Bitbucket',
          'Level': 3
        }
      ]
    }
  ],
  'Work': [
    {
      'Name': 'Dastgyr',
      'Position': 'Middle Backend Engineer',
      'Url': '',
      'StartDate': 'Apr 2021',
      'IsWorkingHere': true,
      'EndDate': null,
      'Highlights': [
        '* Worked on a team of 5 developers to develop a web application for a client'
      ],
      'Summary': '<ul><li> Use my extensive experience with back end development to define the structure and components for the project, making sure they are reusable</li><li>Keep the code quality high reviewing code from other developers and suggesting improvements</li><li> Interact with the architect to discuss changes and to make sure the view he has about the design is translated into actual functionality</li><li> E-commerce maintenance <strong>with Fastcommerce</strong>, a Brazilian e-commerce platform</li></ul>',
      'Years': ''
    },
    {
      'Name': 'Contour',
      'Position': 'Software Developer',
      'Url': '',
      'StartDate': 'Jun 2015',
      'IsWorkingHere': false,
      'EndDate': 'Dec 2017',
      'Highlights': [
        '* Worked on a team of 10 developers to develop a backend for a Dealership management software'
      ],
      'Summary': '<ul><li>Develop web applications based on Dotnet, Pick Basic and Postgre</li><li>Lead a team of 10 backend end developers, giving support to the client\'s multi-cultural team, providing feedback, clarifying requirements and helping with technical questions</li><li>Keep the Project Manager and the IT Leads updated on the overall progress of the projects and manage the tasks distributed to the team</li><li>Keep the code and the features implemented by the other developers in accordance to the requirements</li></ul>',
      'Years': '2 years'
    },
    {
      'Name': 'Planz Creatives',
      'Position': 'Software Engineer',
      'Url': '',
      'StartDate': 'Aug 2011',
      'IsWorkingHere': false,
      'EndDate': 'May 2015',
      'Highlights': [
        '* Worked on a team of 3 developers to develop a web application Vyyral for aggregating data for amazon sellers'
      ],
      'Summary': '<ul><li>Design the complete architecture for backend of vyyral based on AWS, nodejs, SQS, and mongodb</li><li>Code review, ensuring best practices, custom libarary development and training</li><li>E-commerce maintenance with Fastcommerce, a Brazilian e-commerce platform</li><li>E-commerce development with Magento, customizing preexisting themes</li><li>Integrate external services such as payment services, delivery, etc into Magento solutions</li></ul>',
      'Years': '4 year'
    }
  ],
  'Education': [
    {
      'Institution': 'IBA, University',
      'Url': 'https://www.iba.edu.pk/',
      'StudyType': 'MS',
      'Area': 'Computer Science',
      'StartDate': '2021',
      'IsStudyingHere': false,
      'EndDate': '2024',
      'Score': '92%',
      'Courses': []
    },
    {
      'Institution': 'FAST, Karachi',
      'Url': 'https://www.nu.edu.pk/',
      'StudyType': 'BS(CS)',
      'Area': 'Computer Science',
      'StartDate': '2015',
      'IsStudyingHere': false,
      'EndDate': '2019',
      'Score': '3.01 CGPA',
      'Courses': []
    }
  ],
  'Activities': {
    'Involvements': '<ul><li>Prevented millions of dollars in state sales tax undercharges by initiating tests that revealed a bug in a new release of shopping cart software.</li><li>Isolated previously undiscovered flaw in price checking tool resulting in more competitive pricing and a 20 percent increase in revenue.</li><li>Implemented automated testing tools spawning more diligent levels of regression testing, negative testing, error/bug retests and usability.</li><li>Prevented millions of dollars in state sales tax undercharges by initiating tests that revealed a bug in a new release of shopping cart software.</li></ul>',
    'Achievements': '<ul><li>React and redux - A complete guide 2020 from Udemy</li><li>Agile and Scrum Master Certificate from Udacity</li><li>Best performer award for consistently exceeding the performance</li><li>Certificate of exceptional bug finder by XYZ client</li><li>Recognition zero defect delivery</li><li>Best performer award for consistently exceeding the performance</li></ul>'
  },
  'Volunteer': [
    {
      'Organization': 'Al Burhan',
      'Position': 'Management',
      'Url': 'https://alburhan.org/',
      'StartDate': '2021-01-01',
      'EndDate': '2022-01-01',
      'Summary': 'Managed volunteered classes for the students',
      'Highlights': [
        'Awarded \'Volunteer of the Month\''
      ],
      'IsVolunteeringNow': false
    }
  ],
  'Awards': [
    {
      'Title': 'Complete Node.js course for beginners',
      'Date': '2014-11-01',
      'Awarder': 'XYZ client',
      'Summary': '* Recognition zero defect delivery'
    },
    {
      'Title': 'AWS Basic Cloud Practitioner',
      'Date': '2016-11-01',
      'Awarder': 'AWS',
      'Summary': 'Cleared the AWS Cloud certification with 90% score'
    }
  ]
}".Replace("'", "\"");

        var defaultBasicResume = JsonConvert.DeserializeObject<BasicDetails>(jsonData2);
        return defaultBasicResume;
    }
}