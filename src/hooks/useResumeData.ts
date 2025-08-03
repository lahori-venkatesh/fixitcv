import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { ResumeData, SectionOrder, CustomSection, ResumeCustomization, Project, Certification, Achievement } from '../types/resume';
import { sampleResumeData } from '../data/sampleData';
import { resumeTemplates } from '../data/templates';
import { User, Briefcase, GraduationCap, Plus, Type, List, Star } from 'lucide-react';
import { saveResume } from '../lib/supabase';

const defaultCustomization: ResumeCustomization = {
  fontFamily: 'Inter',
  fontSize: {
    name: 32,
    heading: 20,
    body: 14,
    small: 12
  },
  fontWeight: {
    name: 700,
    heading: 600,
    body: 400
  },
  lineHeight: {
    heading: 1.2,
    body: 1.5
  },
  colors: {
    primary: '#000000',
    secondary: '#64748B',
    accent: '#10B981',
    text: '#000000',
    textLight: '#6B7280',
    background: '#FFFFFF',
    border: '#E5E7EB'
  },
  spacing: {
    page: 32,
    section: 24,
    item: 16,
    line: 8
  },
  layout: {
    pageWidth: 8.27,
    pageHeight: 11.69,
    columns: 1,
    headerAlignment: 'center',
    contentAlignment: 'left',
    sectionHeadingAlignment: 'left',
    sectionSpacing: 32,
    pageFormat: 'A4',
    orientation: 'portrait',
    maxPages: 3,
    pageBreakBehavior: 'auto',
    showPageNumbers: false,
    pageNumberPosition: 'bottom-center',
    headerOnAllPages: false,
    footerText: ''
  },
  borders: {
    sectionBorder: true,
    sectionBorderWidth: 2,
    sectionBorderStyle: 'solid',
    headerBorder: true,
    headerBorderWidth: 2,
    pageBorder: false,
    pageBorderWidth: 1,
    pageBorderColor: '#E5E7EB'
  },
  shadows: false,
  roundedCorners: 0,
  bulletStyle: 'disc'
};

const harvardSampleData: ResumeData = {
  personalInfo: {
    firstName: 'Jacob',
    lastName: 'McLaren',
    email: 'mclaren@gmail.com',
    phone: '555-555-5555',
    location: '54 Dunster St, Cambridge, MA 02138',
    jobTitle: 'Software Engineer',
    summary: 'Experienced software engineer with a strong background in full-stack development and a passion for creating efficient, scalable applications.'
  },
  experience: [
    {
      id: '1',
      company: 'STATE STREET CORPORATION',
      position: 'Principal – Simulated Technology',
      location: 'Boston, MA',
      startDate: '2011-09',
      endDate: '2013-07',
      current: false,
      description: [
        'Led 8 cross functional, geographically dispersed teams',
        'Improved process efficiency 75% by standardizing workflow',
        'Reduced application testing time 30% by automating testing'
      ]
    }
  ],
  education: [
    {
      id: '1',
      institution: 'Harvard University, Extension School',
      degree: 'Master of Liberal Arts',
      field: 'Information Management Systems',
      location: 'Cambridge, MA',
      startDate: '2016-09',
      endDate: '2018-05',
      gpa: '3.8'
    }
  ],
  skills: [
    { id: '1', name: 'MS Excel', level: 'Expert' },
    { id: '2', name: 'PowerPoint', level: 'Expert' },
    { id: '3', name: 'Relational Databases', level: 'Advanced' },
    { id: '4', name: 'Project Management', level: 'Advanced' },
    { id: '5', name: 'Quantitative Analysis', level: 'Intermediate' },
    { id: '6', name: 'SQL', level: 'Intermediate' },
    { id: '7', name: 'Java', level: 'Intermediate' }
  ],
  customSections: [],
  projects: [],
  certifications: [],
  achievements: []
};

const emptyResumeData: ResumeData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    jobTitle: '',
    dateOfBirth: '',
    nationality: '',
    gender: '',
    maritalStatus: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  customSections: [],
  projects: [],
  certifications: [],
  achievements: []
};

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(emptyResumeData);
  const { user } = useUser();
  const [selectedTemplate, setSelectedTemplate] = useState('default');
  const [customization, setCustomization] = useState<ResumeCustomization>(defaultCustomization);
  
  // Initialize with default sections
  const getDefaultSectionOrder = (): SectionOrder[] => [
    { id: 'personal', title: 'Personal Information', component: 'personal', visible: true, icon: User },
    { id: 'experience', title: 'Work Experience', component: 'experience', visible: true, icon: Briefcase },
    { id: 'education', title: 'Education', component: 'education', visible: true, icon: GraduationCap },
  ];

  const [sectionOrder, setSectionOrder] = useState<SectionOrder[]>(getDefaultSectionOrder());
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const [isEditingExistingResume, setIsEditingExistingResume] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  // Auto-save functionality
  const saveResumeToSupabase = async (name: string, userId: string, resumeId?: string) => {
    if (!userId) return null;
    
    try {
      setIsSaving(true);
      
      console.log('=== SAVING COMPLETE SECTION ORDER ===');
      console.log('Current section order:', sectionOrder.map(s => ({ 
        id: s.id, 
        title: s.title, 
        visible: s.visible,
        component: s.component 
      })));
      
      // Create a clean section order for saving (remove icon functions)
      const cleanSectionOrder = sectionOrder.map(section => ({
        id: section.id,
        title: section.title,
        component: section.component,
        visible: section.visible,
        ...(section.customSectionId && { customSectionId: section.customSectionId })
      }));
      
      const resumeToSave = {
        name,
        data: resumeData,
        template_id: selectedTemplate === 'default' ? null : selectedTemplate,
        customization,
        sectionOrder: cleanSectionOrder
      };
      
      console.log('Clean section order being saved:', cleanSectionOrder);
      
      const savedResume = await saveResume(resumeToSave, userId, resumeId);
      
      if (savedResume) {
        console.log('Section order saved successfully');
        setCurrentResumeId(savedResume.id);
        setIsEditingExistingResume(true);
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
        return savedResume;
      }
      
      return null;
    } catch (error) {
      console.error('Error saving resume:', error);
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const saveResumeManually = async (name: string, userId: string) => {
    return await saveResumeToSupabase(name, userId, isEditingExistingResume ? currentResumeId || undefined : undefined);
  };

  const performAutoSave = async (userId: string, resumeName: string) => {
    if (!autoSaveEnabled || !isEditingExistingResume || !currentResumeId || isSaving || !hasUnsavedChanges || !userId) {
      return;
    }
    
    try {
      console.log('Auto-saving resume...');
      await saveResumeToSupabase(resumeName, userId, currentResumeId);
      console.log('Auto-save completed');
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  };

  // Auto-save effect - runs when data changes
  useEffect(() => {
    if (!user?.id || !autoSaveEnabled || !isEditingExistingResume || !currentResumeId || !hasUnsavedChanges) {
      return;
    }

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const newDebounceTimer = setTimeout(() => {
      const resumeName = `${resumeData.personalInfo.firstName || 'My'} ${resumeData.personalInfo.jobTitle || ''} Resume`.trim();
      performAutoSave(user.id, resumeName);
    }, 5000);

    setDebounceTimer(newDebounceTimer);

    return () => {
      if (newDebounceTimer) {
        clearTimeout(newDebounceTimer);
      }
    };
  }, [resumeData, customization, user?.id, autoSaveEnabled, isEditingExistingResume, currentResumeId, hasUnsavedChanges]);

  // Periodic auto-save effect
  useEffect(() => {
    if (!autoSaveEnabled || !isEditingExistingResume || !currentResumeId || !user?.id) {
      return;
    }

    const intervalTimer = setInterval(() => {
      if (hasUnsavedChanges && !isSaving) {
        const resumeName = `${resumeData.personalInfo.firstName || 'My'} ${resumeData.personalInfo.jobTitle || ''} Resume`.trim();
        performAutoSave(user.id, resumeName);
      }
    }, 30000);

    setAutoSaveTimer(intervalTimer);

    return () => {
      if (intervalTimer) {
        clearInterval(intervalTimer);
      }
    };
  }, [autoSaveEnabled, isEditingExistingResume, currentResumeId, user?.id, hasUnsavedChanges, isSaving]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimer) {
        clearInterval(autoSaveTimer);
      }
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, []);

  // CRITICAL FIX: Update section order when custom sections change WITHOUT separating them
  useEffect(() => {
    setSectionOrder(prevOrder => {
      // Create all custom section entries
      const customSectionEntries = resumeData.customSections.map(customSection => ({
        id: `custom-${customSection.id}`,
        title: customSection.title,
        component: 'custom' as const,
        visible: true,
        icon: customSection.type === 'text' ? Type : customSection.type === 'list' ? List : Plus,
        customSectionId: customSection.id
      }));

      // Find existing custom sections in current order
      const existingCustomSectionIds = prevOrder
        .filter(s => s.id.startsWith('custom-'))
        .map(s => s.id);

      // Get new custom sections that don't exist yet
      const newCustomSections = customSectionEntries.filter(cs => 
        !existingCustomSectionIds.includes(cs.id)
      );

      // Remove custom sections that no longer exist in resumeData
      const currentCustomIds = customSectionEntries.map(cs => cs.id);
      const filteredOrder = prevOrder.filter(section => 
        !section.id.startsWith('custom-') || currentCustomIds.includes(section.id)
      );

      // Update existing custom sections with new data while preserving position
      const updatedOrder = filteredOrder.map(section => {
        if (section.id.startsWith('custom-')) {
          const updatedCustomSection = customSectionEntries.find(cs => cs.id === section.id);
          return updatedCustomSection ? { ...updatedCustomSection, visible: section.visible } : section;
        }
        return section;
      });

      // Add new custom sections at the end
      return [...updatedOrder, ...newCustomSections];
    });
  }, [resumeData.customSections]);

  // Auto-update section visibility based on content
  useEffect(() => {
    setSectionOrder(prevOrder => 
      prevOrder.map(section => {
        switch (section.id) {
          case 'skills':
            return { ...section, visible: resumeData.skills.length > 0 ? true : section.visible };
          case 'projects':
            return { ...section, visible: resumeData.projects.length > 0 ? true : section.visible };
          case 'certifications':
            return { ...section, visible: resumeData.certifications.length > 0 ? true : section.visible };
          case 'achievements':
            return { ...section, visible: resumeData.achievements.length > 0 ? true : section.visible };
          case 'professional-summary':
            return { ...section, visible: resumeData.personalInfo.summary ? true : section.visible };
          default:
            return section;
        }
      })
    );
  }, [resumeData.skills, resumeData.projects, resumeData.certifications, resumeData.achievements, resumeData.personalInfo.summary]);

  // CRITICAL FIX: Load resume with complete section order restoration
  const loadResumeForEditing = (resume: any) => {
    if (resume && resume.data) {
      console.log('=== LOADING RESUME WITH SECTION ORDER ===');
      console.log('Saved section order:', resume.section_order);
      
      setCurrentResumeId(resume.id);
      setIsEditingExistingResume(true);
      
      const validatedData = {
        ...emptyResumeData,
        ...resume.data,
        personalInfo: {
          ...emptyResumeData.personalInfo,
          ...resume.data.personalInfo
        },
        experience: Array.isArray(resume.data.experience) ? resume.data.experience : [],
        education: Array.isArray(resume.data.education) ? resume.data.education : [],
        skills: Array.isArray(resume.data.skills) ? resume.data.skills : [],
        customSections: Array.isArray(resume.data.customSections) ? resume.data.customSections : [],
        projects: Array.isArray(resume.data.projects) ? resume.data.projects : [],
        certifications: Array.isArray(resume.data.certifications) ? resume.data.certifications : [],
        achievements: Array.isArray(resume.data.achievements) ? resume.data.achievements : []
      };
      
      setResumeData(validatedData);
      
      // RESTORE EXACT SECTION ORDER
      if (resume.section_order && Array.isArray(resume.section_order)) {
        // Recreate section order with icons
        const restoredSectionOrder = resume.section_order.map((savedSection: any) => {
          let icon = User; // default icon
          
          // Assign icons based on section type
          switch (savedSection.component) {
            case 'personal': icon = User; break;
            case 'experience': icon = Briefcase; break;
            case 'education': icon = GraduationCap; break;
            case 'skills': icon = Star; break;
            case 'projects': icon = Plus; break;
            case 'certifications': icon = Star; break;
            case 'achievements': icon = Star; break;
            case 'custom': 
              // For custom sections, determine icon based on type
              if (savedSection.customSectionId) {
                const customSection = validatedData.customSections.find(cs => cs.id === savedSection.customSectionId);
                if (customSection) {
                  icon = customSection.type === 'text' ? Type : customSection.type === 'list' ? List : Plus;
                }
              }
              break;
          }
          
          return {
            ...savedSection,
            icon
          };
        });
        
        console.log('Restored section order:', restoredSectionOrder.map(s => ({ id: s.id, title: s.title })));
        setSectionOrder(restoredSectionOrder);
      } else {
        console.log('No saved section order, using default');
        setSectionOrder(getDefaultSectionOrder());
      }
      
      if (resume.customization) {
        setCustomization(resume.customization);
      }
      
      if (resume.template_id) {
        setSelectedTemplate(resume.template_id);
      }
      
      setHasUnsavedChanges(false);
      setLastSaved(new Date());
    }
  };

  const resetForNewResume = () => {
    setCurrentResumeId(null);
    setIsEditingExistingResume(false);
    setResumeData(emptyResumeData);
    setSelectedTemplate('default');
    setCustomization(defaultCustomization);
    setSectionOrder(getDefaultSectionOrder());
    setHasUnsavedChanges(false);
    setLastSaved(new Date());
  };

  // Make sure section order changes trigger unsaved state
  useEffect(() => {
    if (isEditingExistingResume && currentResumeId) {
      console.log('Section order changed, marking as unsaved');
      setHasUnsavedChanges(true);
    }
  }, [sectionOrder, isEditingExistingResume, currentResumeId]);

  // Load saved resume data from localStorage when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('currentResumeData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData && typeof parsedData === 'object' && parsedData.personalInfo && typeof parsedData.personalInfo === 'object') {
          const validatedData = {
            ...emptyResumeData,
            ...parsedData,
            personalInfo: {
              ...emptyResumeData.personalInfo,
              ...parsedData.personalInfo
            },
            experience: Array.isArray(parsedData.experience) ? parsedData.experience : [],
            education: Array.isArray(parsedData.education) ? parsedData.education : [],
            skills: Array.isArray(parsedData.skills) ? parsedData.skills : [],
            customSections: Array.isArray(parsedData.customSections) ? parsedData.customSections : [],
            projects: Array.isArray(parsedData.projects) ? parsedData.projects : [],
            certifications: Array.isArray(parsedData.certifications) ? parsedData.certifications : [],
            achievements: Array.isArray(parsedData.achievements) ? parsedData.achievements : []
          };
          setResumeData(validatedData);
        } else {
          setResumeData(emptyResumeData);
        }
      } catch (error) {
        console.error('Error loading saved resume data:', error);
        setResumeData(emptyResumeData);
      }
    }
  }, []);

  // Save resume data to localStorage whenever it changes
  useEffect(() => {
    const hasContent = resumeData && resumeData.personalInfo && (
      resumeData.personalInfo.firstName || 
      resumeData.personalInfo.lastName || 
      resumeData.personalInfo.email ||
      resumeData.experience.length > 0 || 
      resumeData.education.length > 0 || 
      resumeData.skills.length > 0 ||
      resumeData.customSections.length > 0
    );
    
    if (hasContent) {
      localStorage.setItem('currentResumeData', JSON.stringify(resumeData));
      
      if (isEditingExistingResume && currentResumeId) {
        setHasUnsavedChanges(true);
      }
    }
  }, [resumeData, isEditingExistingResume, currentResumeId]);

  // Track customization changes
  useEffect(() => {
    if (isEditingExistingResume && currentResumeId) {
      setHasUnsavedChanges(true);
    }
  }, [customization, isEditingExistingResume, currentResumeId]);

  // Update customization colors when template changes
  useEffect(() => {
    if (resumeTemplates.length > 0) {
      const template = resumeTemplates.find(t => t.id === selectedTemplate);
      if (template) {
        setCustomization(prev => ({
          ...prev,
          colors: {
            ...prev.colors,
            primary: template.colors.primary,
            secondary: template.colors.secondary,
            accent: template.colors.accent
          }
        }));
      }
    }
  }, [selectedTemplate]);

  // Load template-specific sample data when template changes
  useEffect(() => {
    if (selectedTemplate === 'harvard-classic') {
      const isEmpty = 
        !resumeData.personalInfo.firstName && 
        !resumeData.personalInfo.lastName && 
        resumeData.experience.length === 0 && 
        resumeData.education.length === 0;
      
      if (isEmpty) {
        setResumeData(harvardSampleData);
      }
      
      setCustomization(prev => ({
        ...prev,
        fontFamily: 'Times New Roman, serif',
        colors: {
          ...prev.colors,
          primary: '#000000',
          secondary: '#333333',
          accent: '#666666',
          text: '#000000',
          textLight: '#444444'
        },
        borders: {
          ...prev.borders,
          sectionBorder: true,
          sectionBorderWidth: 1,
          sectionBorderStyle: 'solid'
        }
      }));
    }
  }, [selectedTemplate]);

  // Update page dimensions when format changes
  useEffect(() => {
    const updatePageDimensions = () => {
      const { pageFormat, orientation } = customization.layout;
      let width = 8.27;
      let height = 11.69;

      switch (pageFormat) {
        case 'A4':
          width = 8.27;
          height = 11.69;
          break;
        case 'Letter':
          width = 8.5;
          height = 11;
          break;
        case 'Legal':
          width = 8.5;
          height = 14;
          break;
        default:
          width = customization.layout.pageWidth;
          height = customization.layout.pageHeight;
      }

      if (orientation === 'landscape') {
        [width, height] = [height, width];
      }

      if (width !== customization.layout.pageWidth || height !== customization.layout.pageHeight) {
        setCustomization(prev => ({
          ...prev,
          layout: {
            ...prev.layout,
            pageWidth: width,
            pageHeight: height
          }
        }));
      }
    };

    updatePageDimensions();
  }, [customization.layout.pageFormat, customization.layout.orientation]);

  const updatePersonalInfo = (personalInfo: Partial<ResumeData['personalInfo']>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...personalInfo }
    }));
  };

  const updateExperience = (experience: ResumeData['experience']) => {
    setResumeData(prev => ({ ...prev, experience }));
  };

  const updateEducation = (education: ResumeData['education']) => {
    setResumeData(prev => ({ ...prev, education }));
  };

  const updateSkills = (skills: ResumeData['skills']) => {
    setResumeData(prev => ({ ...prev, skills }));
  };

  const updateCustomSections = (customSections: CustomSection[]) => {
    setResumeData(prev => ({ ...prev, customSections }));
  };

  const updateProjects = (projects: Project[]) => {
    setResumeData(prev => ({ ...prev, projects }));
  };

  const updateCertifications = (certifications: Certification[]) => {
    setResumeData(prev => ({ ...prev, certifications }));
  };

  const updateAchievements = (achievements: Achievement[]) => {
    setResumeData(prev => ({ ...prev, achievements }));
  };

  const updateCustomization = (updates: Partial<ResumeCustomization>) => {
    setCustomization(prev => ({
      ...prev,
      ...updates
    }));
  };

  const resetCustomization = () => {
    let resetColors = defaultCustomization.colors;
    
    if (resumeTemplates.length > 0) {
      const template = resumeTemplates.find(t => t.id === selectedTemplate);
      if (template) {
        resetColors = {
          ...defaultCustomization.colors,
          primary: template.colors.primary,
          secondary: template.colors.secondary,
          accent: template.colors.accent
        };
      }
    }

    setCustomization({
      ...defaultCustomization,
      colors: resetColors
    });
  };

  return {
    resumeData,
    setResumeData,
    selectedTemplate,
    setSelectedTemplate,
    customization,
    updateCustomization,
    resetCustomization,
    sectionOrder,
    setSectionOrder,
    updatePersonalInfo,
    updateExperience,
    updateEducation,
    updateSkills,
    updateCustomSections,
    updateProjects,
    updateCertifications,
    updateAchievements,
    currentResumeId,
    isEditingExistingResume,
    lastSaved,
    isSaving,
    hasUnsavedChanges,
    autoSaveEnabled,
    setAutoSaveEnabled,
    saveResumeManually,
    loadResumeForEditing,
    resetForNewResume,
    performAutoSave
  };
};
