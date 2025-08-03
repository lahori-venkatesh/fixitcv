import { ResumeData } from '../types/resume';

export const sampleResumeData: ResumeData = {
  personalInfo: {
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    website: 'alexjohnson.dev',
    linkedin: 'linkedin.com/in/alexjohnson',
    github: 'github.com/alexjohnson',
    jobTitle: 'Senior Software Engineer',
    dateOfBirth: '',
    nationality: '',
    gender: '',
    maritalStatus: '',
    summary: 'Results-driven software engineer with 5+ years of experience building scalable web applications. Passionate about creating efficient, user-focused solutions that drive business growth.'
  },
  experience: [
    {
      id: '1',
      company: 'TechCorp Inc.',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2022-01',
      endDate: '',
      current: true,
      description: [
        'Lead development of microservices architecture serving 10M+ users',
        'Reduced system latency by 40% through performance optimization',
        'Mentor junior developers and conduct technical interviews'
      ]
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      location: 'San Francisco, CA',
      startDate: '2020-03',
      endDate: '2021-12',
      current: false,
      description: [
        'Built responsive web applications using React and Node.js',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
        'Collaborated with design team to improve user experience'
      ]
    }
  ],
  education: [
    {
      id: '1',
      institution: 'Stanford University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Stanford, CA',
      startDate: '2016-09',
      endDate: '2020-06',
      gpa: '3.8'
    }
  ],
  skills: [
    { id: '1', name: 'JavaScript', level: 'Expert' },
    { id: '2', name: 'React', level: 'Expert' },
    { id: '3', name: 'Node.js', level: 'Advanced' },
    { id: '4', name: 'Python', level: 'Advanced' },
    { id: '5', name: 'AWS', level: 'Intermediate' },
    { id: '6', name: 'Docker', level: 'Intermediate' }
  ],
  customSections: [],
  projects: [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: [
        'Developed a full-stack e-commerce platform using React, Node.js, and MongoDB',
        'Implemented secure payment processing with Stripe integration',
        'Designed responsive UI with 99% mobile compatibility'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'Redux'],
      url: 'https://github.com/alexjohnson/ecommerce-platform',
      startDate: '2021-06',
      endDate: '2021-12',
      visible: true
    },
    {
      id: '2',
      title: 'Task Management App',
      description: [
        'Built a collaborative task management application with real-time updates',
        'Implemented drag-and-drop functionality for intuitive task organization',
        'Integrated with Google Calendar API for deadline synchronization'
      ],
      technologies: ['React', 'Firebase', 'Material UI', 'Google API'],
      url: 'https://github.com/alexjohnson/task-manager',
      startDate: '2020-09',
      endDate: '2021-03',
      visible: true
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2022-05',
      description: 'Validated expertise in designing distributed systems on AWS',
      url: 'https://www.credly.com/badges/aws-certified-solutions-architect',
      visible: true
    },
    {
      id: '2',
      name: 'Professional Scrum Master I',
      issuer: 'Scrum.org',
      date: '2021-08',
      description: 'Certified in Scrum framework implementation and agile practices',
      url: 'https://www.scrum.org/certificates',
      visible: true
    }
  ],
  achievements: [
    {
      id: '1',
      title: 'Innovation Award',
      date: '2022-11',
      description: 'Recognized for developing an AI-powered code review tool that improved team productivity by 35%',
      visible: true
    },
    {
      id: '2',
      title: 'Speaker at ReactConf 2021',
      date: '2021-04',
      description: 'Presented "Optimizing React Performance in Large-Scale Applications" to an audience of 500+ developers',
      visible: true
    }
  ]
};