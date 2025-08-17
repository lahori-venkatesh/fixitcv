import { ResumeData } from '../types/resume';

export const nitTemplateData: ResumeData = {
  personalInfo: {
    firstName: 'Lahori',
    lastName: 'Venkatesh',
    email: 'lahorivenkatesh709@gmail.com',
    phone: '7095656427',
    location: 'Vijayawada',
    website: '',
    linkedin: 'linkedin.com/in/lahorivenkatesh',
    github: 'github.com/lahorivenkatesh',
    jobTitle: '',
    dateOfBirth: '',
    nationality: '',
    gender: '',
    maritalStatus: '',
    summary: '',
    customLinks: [
      {
        id: '1',
        label: 'Portfolio',
        url: 'portfolio.lahorivenkatesh.dev',
        platform: 'portfolio'
      }
    ]
  },
  experience: [
    {
      id: '1',
      company: 'The Social Artist Startup',
      position: 'Frontend Developer',
      location: 'Remote',
      startDate: '2025-04',
      endDate: '',
      current: true,
      description: [
        'Engineered responsive and user-friendly web interfaces using HTML, CSS, JavaScript, and React.js, increasing user engagement by 30%.',
        'Partnered with cross-functional teams, including designers and backend developers, to integrate APIs and databases seamlessly, ensuring a cohesive product experience.'
      ]
    }
  ],
  education: [
    {
      id: '1',
      institution: 'NIT Jaipur (MNIT)',
      degree: 'B.Tech',
      field: 'Metallurgy and Materials Engineering',
      location: 'Jaipur',
      startDate: '2022',
      endDate: '2026',
      gpa: ''
    },
    {
      id: '2',
      institution: 'NIT Jaipur (MNIT)',
      degree: 'B.Tech',
      field: 'Metallurgical and Materials Engineering',
      location: 'Jaipur',
      startDate: '2022-11',
      endDate: '2026-05',
      gpa: ''
    },
    {
      id: '3',
      institution: 'MJPAPBC welfare junior College (Mopidevi)',
      degree: 'Board of Intermediate (PCM)',
      field: 'Science',
      location: 'Mopidevi',
      startDate: '2018-01',
      endDate: '2020-04',
      gpa: ''
    }
  ],
  skills: [],
  customSections: [
    {
      id: '1',
      title: 'Professional Summary',
      type: 'text',
      content: 'Frontend Developer with hands-on experience building responsive web applications using React.js, TypeScript, and JavaScript. Proficient in modern tools like Vite, Webpack, and Tailwind CSS, focused on optimizing user experience and delivering scalable code. Demonstrated leadership in Aspire Leadership Program with strong collaboration and problem-solving skills.',
      visible: true
    },
    {
      id: '2',
      title: 'Technical Skills',
      type: 'list',
      content: [
        { category: 'Languages', skills: 'JavaScript, TypeScript, Python, Java' },
        { category: 'Frontend', skills: 'React.js, Next.js, React Native, Vite, Webpack, Tailwind CSS, Bootstrap, HTML5, CSS3' },
        { category: 'State Management', skills: 'Redux, Context API, React Router, React Query' },
        { category: 'Tools & Design', skills: 'Git, GitHub, VS Code, Figma, Canva' },
        { category: 'Concepts', skills: 'Code Splitting, Lazy Loading, Core Web Vitals, Responsive Design' }
      ],
      visible: true
    },
    {
      id: '3',
      title: 'Academic Projects',
      type: 'list',
      content: [
        {
          name: 'InfyCo Mentorship & Networking Platform',
          description: [
            'Responsive web app using Next.js, TypeScript, Tailwind CSS for student mentorship and networking',
            'Implemented event section for internships/hackathons, optimized performance by 30% through code splitting'
          ],
          technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React'],
          startDate: '2024-08',
          endDate: '2024-12',
          url: 'github.com/lahorivenkatesh/infyco-platform',
          githubUrl: 'infyco-platform.vercel.app'
        },
        {
          name: 'Flexara - Freelance Bidding Platform',
          description: [
            'React and TypeScript UI achieving 98% Lighthouse score, role-based dashboards increased engagement by 40%',
            'Multi-step onboarding with React Hook Form and Zustand decreased form abandonment by 25%'
          ],
          technologies: ['React', 'TypeScript', 'Vite', 'React Query', 'Zustand'],
          startDate: '2023-06',
          endDate: '2024-01',
          url: 'github.com/lahorivenkatesh/flexara-platform',
          githubUrl: 'flexara.vercel.app'
        },
        {
          name: 'pdfCircle - PDF Processing Platform',
          description: [
            'Secure offline-first platform with 85% Lighthouse score, drag-and-drop PDF tools boosted retention by 35%',
            'Web Workers integration reduced load times by 50%, optimized processing with pdflib and Sharp.js'
          ],
          technologies: ['React', 'TypeScript', 'Vite', 'React Query', 'Web Workers', 'pdflib', 'Sharp.js'],
          startDate: '2023-06',
          endDate: '2024-01',
          url: 'github.com/lahorivenkatesh/pdfcircle',
          githubUrl: 'pdfcircle.vercel.app'
        }
      ],
      visible: true
    },
    {
      id: '4',
      title: 'CERTIFICATIONS',
      type: 'list',
      content: [
        'Complete Web Development & DSA with Java | Apna College | Jun 2023: Front-end development with HTML, CSS, JavaScript, React.js and DSA.',
        'Google UX Design Professional Certificate | Coursera | Feb 2023: User-centered design, prototyping, and usability testing.'
      ],
      visible: true
    },
    {
      id: '5',
      title: 'Achievements',
      type: 'achievements',
      content: [
        {
          title: 'Event Organization Leadership',
          description: 'Organized 5+ events for NSS and Think India clubs at MNIT Jaipur, enhancing event management skills.',
          date: '',
          category: 'Leadership',
          issuer: 'MNIT Jaipur'
        },
        {
          title: 'Aspire Leadership Program Recognition',
          description: 'Led team to develop project prototype, recognized for problem-solving and collaboration.',
          date: '',
          category: 'Leadership',
          issuer: 'Aspire Leadership Program'
        }
      ],
      visible: true
    }
  ],
  projects: [],
  certifications: [],
  achievements: []
};