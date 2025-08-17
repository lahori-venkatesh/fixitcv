import { ResumeData } from '../types/resume';

// Sample data for IIT Elite Template
export const iitEliteSampleData: ResumeData = {
  personalInfo: {
    firstName: 'Rajesh',
    lastName: 'Kumar',
    email: 'rajesh.kumar@iitb.ac.in',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra, India',
    linkedin: 'linkedin.com/in/rajeshkumar-iitb',
    github: 'github.com/rajeshkumar-iitb',
    jobTitle: 'Senior Software Engineer',
    summary: 'Experienced software engineer with 4+ years of expertise in full-stack development, machine learning, and cloud technologies. Graduated from IIT Bombay with a strong foundation in computer science and engineering. Proven track record of delivering scalable solutions at Google, specializing in distributed systems and AI applications. Passionate about innovation and mentoring junior developers.'
  },
  experience: [
    {
      id: 'exp-1',
      company: 'Google',
      position: 'Senior Software Engineer',
      location: 'Mountain View, CA',
      startDate: '06/2022',
      endDate: 'Present',
      current: true,
      description: [
        'Led development of Google Cloud AI platform serving 10M+ users globally',
        'Architected and implemented microservices using Go, Python, and Kubernetes',
        'Mentored 5 junior engineers and conducted technical interviews',
        'Improved system performance by 40% through optimization and caching strategies',
        'Collaborated with cross-functional teams to deliver ML-powered features'
      ],
      visible: true
    },
    {
      id: 'exp-2',
      company: 'Microsoft',
      position: 'Software Engineer II',
      location: 'Redmond, WA',
      startDate: '07/2020',
      endDate: '05/2022',
      current: false,
      description: [
        'Developed Azure Machine Learning services using C# and Python',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
        'Designed REST APIs handling 1M+ requests per day',
        'Collaborated with research teams on cutting-edge ML algorithms'
      ],
      visible: true
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'Indian Institute of Technology Bombay',
      degree: 'Bachelor of Technology',
      field: 'Computer Science and Engineering',
      location: 'Mumbai, Maharashtra',
      startDate: '07/2016',
      endDate: '05/2020',
      gpa: '9.2/10.0',
      visible: true
    }
  ],
  skills: [
    { id: 'skill-1', name: 'Python', level: 'Expert' },
    { id: 'skill-2', name: 'Go', level: 'Expert' },
    { id: 'skill-3', name: 'Machine Learning', level: 'Expert' },
    { id: 'skill-4', name: 'Kubernetes', level: 'Advanced' },
    { id: 'skill-5', name: 'Distributed Systems', level: 'Expert' },
    { id: 'skill-6', name: 'TensorFlow', level: 'Advanced' },
    { id: 'skill-7', name: 'Docker', level: 'Advanced' },
    { id: 'skill-8', name: 'React', level: 'Intermediate' }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'AI-Powered Resume Parser',
      description: 'Developed a machine learning model that automatically extracts and categorizes information from resumes with 95% accuracy using NLP and computer vision techniques.',
      technologies: ['Python', 'TensorFlow', 'OpenCV', 'NLTK', 'Flask'],
      role: 'Lead Developer',
      highlights: [
        'Achieved 95% accuracy in information extraction',
        'Processed 10,000+ resumes in production',
        'Reduced manual review time by 80%'
      ],
      visible: true
    },
    {
      id: 'proj-2',
      name: 'Distributed Task Scheduler',
      description: 'Built a scalable task scheduling system using microservices architecture that handles 1M+ tasks per day with fault tolerance and load balancing.',
      technologies: ['Go', 'Kubernetes', 'Redis', 'PostgreSQL', 'gRPC'],
      role: 'Architect',
      highlights: [
        'Handles 1M+ tasks per day',
        '99.9% uptime with fault tolerance',
        'Horizontal scaling support'
      ],
      visible: true
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Google Cloud Professional Data Engineer',
      issuer: 'Google',
      date: '03/2023',
      visible: true
    },
    {
      id: 'cert-2',
      name: 'AWS Solutions Architect Associate',
      issuer: 'Amazon Web Services',
      date: '12/2022',
      visible: true
    }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Google Excellence Award',
      description: 'Recognized for outstanding contribution to AI platform development and innovation',
      issuer: 'Google',
      date: '12/2023',
      visible: true
    },
    {
      id: 'ach-2',
      title: 'IIT Bombay Gold Medalist',
      description: 'Graduated with highest honors and received gold medal for academic excellence',
      issuer: 'IIT Bombay',
      date: '05/2020',
      visible: true
    }
  ],
  customSections: []
};

// Sample data for IIM Executive Template
export const iimExecutiveSampleData: ResumeData = {
  personalInfo: {
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@iima.ac.in',
    phone: '+91 98765 43211',
    location: 'Mumbai, Maharashtra, India',
    linkedin: 'linkedin.com/in/priyasharma-iim',
    jobTitle: 'Associate Consultant',
    summary: 'Strategic business consultant with 3+ years of experience in management consulting at McKinsey & Company. MBA graduate from IIM Ahmedabad with expertise in business strategy, digital transformation, and organizational change. Proven track record of delivering 15+ client engagements across technology, healthcare, and financial services sectors. Strong analytical skills and leadership experience in cross-functional teams.'
  },
  experience: [
    {
      id: 'exp-1',
      company: 'McKinsey & Company',
      position: 'Associate',
      location: 'Mumbai, India',
      startDate: '07/2021',
      endDate: 'Present',
      current: true,
      description: [
        'Led 8+ client engagements across technology and healthcare sectors',
        'Developed digital transformation strategies resulting in 25% cost reduction',
        'Managed cross-functional teams of 5-8 consultants and client stakeholders',
        'Conducted market research and competitive analysis for Fortune 500 companies',
        'Presented strategic recommendations to C-suite executives'
      ],
      visible: true
    },
    {
      id: 'exp-2',
      company: 'Tata Consultancy Services',
      position: 'Business Analyst',
      location: 'Mumbai, India',
      startDate: '06/2019',
      endDate: '06/2021',
      current: false,
      description: [
        'Analyzed business processes and identified improvement opportunities',
        'Implemented process optimization initiatives saving $2M annually',
        'Collaborated with IT teams on digital transformation projects',
        'Conducted stakeholder interviews and requirement gathering sessions'
      ],
      visible: true
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'Indian Institute of Management Ahmedabad',
      degree: 'Master of Business Administration',
      field: 'Business Administration',
      location: 'Ahmedabad, Gujarat',
      startDate: '06/2019',
      endDate: '04/2021',
      gpa: '3.8/4.0',
      visible: true
    },
    {
      id: 'edu-2',
      institution: 'Delhi University',
      degree: 'Bachelor of Commerce',
      field: 'Commerce',
      location: 'New Delhi, India',
      startDate: '07/2015',
      endDate: '05/2018',
      gpa: '8.5/10.0',
      visible: true
    }
  ],
  skills: [
    { id: 'skill-1', name: 'Strategic Planning', level: 'Expert' },
    { id: 'skill-2', name: 'Business Analysis', level: 'Expert' },
    { id: 'skill-3', name: 'Digital Transformation', level: 'Advanced' },
    { id: 'skill-4', name: 'Market Research', level: 'Advanced' },
    { id: 'skill-5', name: 'Financial Modeling', level: 'Advanced' },
    { id: 'skill-6', name: 'Stakeholder Management', level: 'Expert' },
    { id: 'skill-7', name: 'Data Analysis', level: 'Intermediate' },
    { id: 'skill-8', name: 'Project Management', level: 'Advanced' }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Healthcare Digital Transformation',
      description: 'Led strategic initiative for a leading healthcare provider to digitize patient care processes and improve operational efficiency.',
      technologies: ['Strategy', 'Digital Transformation', 'Healthcare IT'],
      role: 'Project Lead',
      highlights: [
        'Reduced patient wait times by 40%',
        'Improved operational efficiency by 30%',
        'Implemented 5 new digital solutions'
      ],
      visible: true
    },
    {
      id: 'proj-2',
      name: 'Financial Services Strategy',
      description: 'Developed growth strategy for a regional bank to expand into digital banking and fintech partnerships.',
      technologies: ['Strategy', 'Financial Services', 'Digital Banking'],
      role: 'Strategy Consultant',
      highlights: [
        'Identified $50M revenue opportunity',
        'Developed 3-year growth roadmap',
        'Established 2 strategic partnerships'
      ],
      visible: true
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Project Management Professional (PMP)',
      issuer: 'Project Management Institute',
      date: '09/2022',
      visible: true
    },
    {
      id: 'cert-2',
      name: 'Six Sigma Green Belt',
      issuer: 'American Society for Quality',
      date: '06/2021',
      visible: true
    }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'McKinsey Excellence Award',
      description: 'Recognized for outstanding client delivery and team leadership',
      issuer: 'McKinsey & Company',
      date: '12/2023',
      visible: true
    },
    {
      id: 'ach-2',
      title: 'IIM Ahmedabad Dean\'s List',
      description: 'Consistently maintained top 10% academic performance',
      issuer: 'IIM Ahmedabad',
      date: '04/2021',
      visible: true
    }
  ],
  customSections: []
};

// Sample data for IISc Research Template
export const iiscResearchSampleData: ResumeData = {
  personalInfo: {
    firstName: 'Amit',
    lastName: 'Patel',
    email: 'amit.patel@iisc.ac.in',
    phone: '+91 98765 43212',
    location: 'Bangalore, Karnataka, India',
    linkedin: 'linkedin.com/in/amitpatel-iisc',
    jobTitle: 'Postdoctoral Researcher',
    summary: 'Dedicated researcher with 5+ years of experience in theoretical physics and quantum computing. PhD graduate from IISc Bangalore with expertise in quantum algorithms, quantum error correction, and quantum machine learning. Published 12+ peer-reviewed papers in top-tier journals including Nature and Physical Review Letters. Passionate about advancing quantum computing research and mentoring graduate students.'
  },
  experience: [
    {
      id: 'exp-1',
      company: 'Indian Institute of Science Bangalore',
      position: 'Postdoctoral Researcher',
      location: 'Bangalore, India',
      startDate: '08/2022',
      endDate: 'Present',
      current: true,
      description: [
        'Leading research on quantum error correction algorithms for fault-tolerant quantum computing',
        'Published 6 peer-reviewed papers in top-tier physics journals',
        'Mentoring 3 PhD students and 2 master\'s students',
        'Collaborating with international research teams on quantum computing projects',
        'Developing quantum machine learning algorithms for optimization problems'
      ],
      visible: true
    },
    {
      id: 'exp-2',
      company: 'Max Planck Institute',
      position: 'Research Fellow',
      location: 'Munich, Germany',
      startDate: '09/2020',
      endDate: '07/2022',
      current: false,
      description: [
        'Conducted research on quantum algorithms for quantum chemistry applications',
        'Published 4 papers in Physical Review Letters and Nature Communications',
        'Presented research at 8 international conferences and workshops',
        'Collaborated with experimental physicists on quantum hardware implementation'
      ],
      visible: true
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'Indian Institute of Science Bangalore',
      degree: 'Doctor of Philosophy',
      field: 'Theoretical Physics',
      location: 'Bangalore, Karnataka',
      startDate: '08/2017',
      endDate: '07/2020',
      gpa: '9.5/10.0',
      visible: true
    },
    {
      id: 'edu-2',
      institution: 'IIT Kanpur',
      degree: 'Master of Science',
      field: 'Physics',
      location: 'Kanpur, Uttar Pradesh',
      startDate: '07/2015',
      endDate: '05/2017',
      gpa: '9.2/10.0',
      visible: true
    }
  ],
  skills: [
    { id: 'skill-1', name: 'Quantum Computing', level: 'Expert' },
    { id: 'skill-2', name: 'Theoretical Physics', level: 'Expert' },
    { id: 'skill-3', name: 'Quantum Algorithms', level: 'Expert' },
    { id: 'skill-4', name: 'Quantum Error Correction', level: 'Expert' },
    { id: 'skill-5', name: 'Python', level: 'Advanced' },
    { id: 'skill-6', name: 'Mathematica', level: 'Advanced' },
    { id: 'skill-7', name: 'Research Methodology', level: 'Expert' },
    { id: 'skill-8', name: 'Scientific Writing', level: 'Expert' }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Quantum Error Correction Codes',
      description: 'Developed novel quantum error correction codes that improve fault tolerance in quantum computers by 30% compared to existing methods.',
      technologies: ['Quantum Computing', 'Error Correction', 'Theoretical Physics'],
      role: 'Principal Investigator',
      highlights: [
        'Improved fault tolerance by 30%',
        'Published in Nature journal',
        'Cited by 50+ research papers'
      ],
      visible: true
    },
    {
      id: 'proj-2',
      name: 'Quantum Machine Learning Algorithms',
      description: 'Designed quantum algorithms for machine learning tasks that demonstrate quantum advantage in specific optimization problems.',
      technologies: ['Quantum ML', 'Optimization', 'Algorithm Design'],
      role: 'Lead Researcher',
      highlights: [
        'Demonstrated quantum advantage',
        'Published in Physical Review Letters',
        'Presented at 5 international conferences'
      ],
      visible: true
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'IBM Quantum Developer',
      issuer: 'IBM',
      date: '06/2023',
      visible: true
    },
    {
      id: 'cert-2',
      name: 'Google Quantum Computing',
      issuer: 'Google',
      date: '03/2022',
      visible: true
    }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Young Scientist Award',
      description: 'Recognized for outstanding contribution to quantum computing research',
      issuer: 'Indian National Science Academy',
      date: '12/2023',
      visible: true
    },
    {
      id: 'ach-2',
      title: 'Best PhD Thesis Award',
      description: 'Awarded for exceptional research contribution in theoretical physics',
      issuer: 'IISc Bangalore',
      date: '07/2020',
      visible: true
    }
  ],
  customSections: []
};

// Sample data for NIT Professional Template
export const nitProfessionalSampleData: ResumeData = {
  personalInfo: {
    firstName: 'Lahori',
    lastName: 'Venkatesh',
    email: 'lahori.venkatesh@nitj.ac.in',
    phone: '+91 98765 43213',
    location: 'Jaipur, Rajasthan, India',
    linkedin: 'linkedin.com/in/lahorivenkatesh',
    github: 'github.com/lahorivenkatesh',
    jobTitle: 'Frontend Developer',
    summary: 'Passionate frontend developer with 2+ years of experience building modern web applications using React.js and modern web technologies. Currently pursuing B.Tech in Metallurgy and Materials Engineering at NIT Jaipur while working as a Frontend Developer at The Social Artist Startup. Strong foundation in UI/UX design principles and responsive web development. Proven track record of delivering high-quality, user-centric applications.'
  },
  experience: [
    {
      id: 'exp-1',
      company: 'The Social Artist Startup',
      position: 'Frontend Developer',
      location: 'Remote',
      startDate: '01/2023',
      endDate: 'Present',
      current: true,
      description: [
        'Developed responsive web applications using React.js, TypeScript, and Tailwind CSS',
        'Collaborated with design and backend teams to implement user interfaces',
        'Optimized application performance resulting in 25% faster load times',
        'Implemented modern web development practices including component-based architecture',
        'Mentored junior developers and conducted code reviews'
      ],
      visible: true
    },
    {
      id: 'exp-2',
      company: 'Freelance Projects',
      position: 'Web Developer',
      location: 'Remote',
      startDate: '06/2022',
      endDate: '12/2022',
      current: false,
      description: [
        'Built 5+ client websites using HTML, CSS, JavaScript, and React',
        'Implemented responsive design principles for mobile-first development',
        'Integrated third-party APIs and payment gateways',
        'Provided ongoing maintenance and support for client projects'
      ],
      visible: true
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'National Institute of Technology Jaipur',
      degree: 'Bachelor of Technology',
      field: 'Metallurgy and Materials Engineering',
      location: 'Jaipur, Rajasthan',
      startDate: '07/2022',
      endDate: '05/2026',
      gpa: '8.7/10.0',
      visible: true
    }
  ],
  skills: [
    { id: 'skill-1', name: 'React.js', level: 'Advanced' },
    { id: 'skill-2', name: 'JavaScript', level: 'Advanced' },
    { id: 'skill-3', name: 'TypeScript', level: 'Intermediate' },
    { id: 'skill-4', name: 'HTML/CSS', level: 'Expert' },
    { id: 'skill-5', name: 'Tailwind CSS', level: 'Advanced' },
    { id: 'skill-6', name: 'Git', level: 'Intermediate' },
    { id: 'skill-7', name: 'Responsive Design', level: 'Advanced' },
    { id: 'skill-8', name: 'UI/UX Design', level: 'Intermediate' }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'FixItCV Resume Builder',
      description: 'Developed a comprehensive resume builder application with premium templates and real-time ATS scoring using React.js and modern web technologies.',
      technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
      role: 'Full Stack Developer',
      highlights: [
        'Built 4 premium institution templates',
        'Implemented real-time ATS scoring',
        'Responsive design for all devices',
        'Premium template gallery with filtering'
      ],
      visible: true
    },
    {
      id: 'proj-2',
      name: 'E-commerce Platform',
      description: 'Created a full-featured e-commerce website with shopping cart, user authentication, and payment integration.',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Stripe'],
      role: 'Frontend Developer',
      highlights: [
        'Complete shopping experience',
        'Secure payment integration',
        'Responsive mobile design',
        'User authentication system'
      ],
      visible: true
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'React Developer Certification',
      issuer: 'Meta',
      date: '12/2023',
      visible: true
    },
    {
      id: 'cert-2',
      name: 'Web Development Bootcamp',
      issuer: 'Udemy',
      date: '06/2022',
      visible: true
    }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'NIT Jaipur Academic Excellence',
      description: 'Consistently maintained top 15% academic performance',
      issuer: 'NIT Jaipur',
      date: '12/2023',
      visible: true
    },
    {
      id: 'ach-2',
      title: 'Hackathon Winner',
      description: 'Won first place in college hackathon for innovative web application',
      issuer: 'NIT Jaipur',
      date: '10/2023',
      visible: true
    }
  ],
  customSections: []
};

// Export all sample data
export const premiumTemplateSamples = {
  'iit-premium': iitEliteSampleData,
  'iim-premium': iimExecutiveSampleData,
  'iisc-premium': iiscResearchSampleData,
  'nit-premium': nitProfessionalSampleData
};

