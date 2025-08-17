import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SignedIn, SignedOut, RedirectToSignIn, useUser, UserButton } from '@clerk/clerk-react';
import { FileText, Sun, Moon, ArrowLeft, Download, Save, X } from 'lucide-react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import CustomSectionForm from './CustomSectionForm';
import TemplateSelector from './TemplateSelector';
import CustomizationPanel from './CustomizationPanel';
import ResumePreview from './resume/ResumePreview';
import ResumeCreationOptions from './ResumeCreationOptions';
import PremiumTemplateGallery from './PremiumTemplateGallery';
import ATSScorePanel from './ATSScorePanel';
import DefaultBlankResume from './DefaultBlankResume';
import TemplateAccessControl from './TemplateAccessControl';
import DedicatedPremiumTemplates from './DedicatedPremiumTemplates';
import { useResumeData } from '../hooks/useResumeData';
import { exportToPuppeteer } from '../utils/exportToPuppeteer';
import { saveResume, getUserResumes } from '../lib/supabase';
import { ModernPricingCard } from './ui/ModernPricingCard';

interface ResumeBuilderProps {
  onBackToLanding: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  selectedTemplate?: string;
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ 
  onBackToLanding, 
  isDarkMode = false, 
  onToggleTheme,
  selectedTemplate: propSelectedTemplate 
}) => {
  const [activeSection, setActiveSection] = useState('creation-options');
  const [isExporting, setIsExporting] = useState(false);
  const [savedResumes, setSavedResumes] = useState<any[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [resumeName, setResumeName] = useState('');
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveButtonStatus, setSaveButtonStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const { user, isLoaded } = useUser();
  const {
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
  } = useResumeData();

  // Auto-save effect that triggers the save button status
  useEffect(() => {
    if (hasUnsavedChanges && autoSaveEnabled) {
      setSaveButtonStatus('saving');
      // Simulate auto-save process
      const timer = setTimeout(() => {
        setSaveButtonStatus('saved');
        // Reset to idle after showing "saved" for 2 seconds
        setTimeout(() => {
          setSaveButtonStatus('idle');
        }, 2000);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [hasUnsavedChanges, autoSaveEnabled]);

  // Effect to watch for isSaving changes from the hook
  useEffect(() => {
    if (isSaving) {
      setSaveButtonStatus('saving');
    } else if (saveButtonStatus === 'saving') {
      setSaveButtonStatus('saved');
      // Reset to idle after showing "saved" for 2 seconds
      setTimeout(() => {
        setSaveButtonStatus('idle');
      }, 2000);
    }
  }, [isSaving, saveButtonStatus]);

  // Load saved resumes from Supabase
  useEffect(() => {
    const loadSavedResumes = async () => {
      if (!isLoaded || !user) return;
      
      try {
        const resumes = await getUserResumes(user.id);
        if (resumes) {
          setSavedResumes(resumes);
        }
      } catch (error) {
        console.error('Error loading saved resumes:', error);
      }
    };
    
    loadSavedResumes();
  }, [isLoaded, user]);

  // Set template from props when available
  useEffect(() => {
    if (propSelectedTemplate && propSelectedTemplate !== selectedTemplate) {
      setSelectedTemplate(propSelectedTemplate);
      // If user has a template selected, skip creation options
      if (activeSection === 'creation-options') {
        setActiveSection('personal');
      }
    }
  }, [propSelectedTemplate, selectedTemplate, setSelectedTemplate, activeSection]);

  const handleExport = async () => {
    // Check if there's any meaningful content to export
    const hasPersonalInfo = resumeData.personalInfo.firstName || resumeData.personalInfo.lastName || resumeData.personalInfo.email;
    const hasExperience = resumeData.experience.length > 0;
    const hasEducation = resumeData.education.length > 0;
    const hasSkills = resumeData.skills.length > 0;
    const hasCustomSections = resumeData.customSections.length > 0;
    const hasProjects = resumeData.projects && resumeData.projects.length > 0;
    const hasCertifications = resumeData.certifications && resumeData.certifications.length > 0;
    const hasAchievements = resumeData.achievements && resumeData.achievements.length > 0;
    
    if (!hasPersonalInfo && !hasExperience && !hasEducation && !hasSkills && !hasCustomSections && !hasProjects && !hasCertifications && !hasAchievements) {
      // Show a more professional alert
      const alertDiv = document.createElement('div');
      alertDiv.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #F59E0B, #D97706); color: white; padding: 20px 28px; border-radius: 16px; box-shadow: 0 20px 40px rgba(245, 158, 11, 0.4), 0 8px 16px rgba(245, 158, 11, 0.2); z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 450px; backdrop-filter: blur(10px);">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 32px; height: 32px; background: rgba(255,255,255,0.25); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
            </div>
            <div>
              <div style="font-weight: 700; font-size: 16px; margin-bottom: 4px; letter-spacing: -0.02em;">Resume Content Required</div>
              <div style="font-size: 14px; opacity: 0.95; font-weight: 500;">Please add some content to your resume before exporting</div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(alertDiv);
      setTimeout(() => {
        if (document.body.contains(alertDiv)) {
          document.body.removeChild(alertDiv);
        }
      }, 4000);
      return;
    }
    
    // Generate filename based on user's name or default
    const firstName = resumeData.personalInfo.firstName || 'Professional';
    const lastName = resumeData.personalInfo.lastName || '';
    const jobTitle = resumeData.personalInfo.jobTitle ? `_${resumeData.personalInfo.jobTitle.replace(/[^a-zA-Z0-9]/g, '_')}` : '';
    const filename = `${firstName}${lastName ? '_' + lastName : ''}${jobTitle}_Resume.pdf`;
    
    setIsExporting(true);
    
    try {
      // Try Supabase Edge Function first, then fallback to direct PDF export
      try {
        await exportToPuppeteer(resumeData, customization, sectionOrder, selectedTemplate, filename);
      } catch (edgeFunctionError) {
        console.warn('Edge Function failed, using direct PDF export:', edgeFunctionError);
        // Fallback to direct PDF export for exact preview matching
        await exportToPDF('resume-preview', filename);
      }
    } catch (error) {
      console.error('PDF export failed:', error);
      // Show error only if both methods fail
      const errorDiv = document.createElement('div');
      errorDiv.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #EF4444, #DC2626); color: white; padding: 20px 28px; border-radius: 16px; box-shadow: 0 20px 40px rgba(239, 68, 68, 0.4), 0 8px 16px rgba(239, 68, 68, 0.2); z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 450px; backdrop-filter: blur(10px);">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 32px; height: 32px; background: rgba(255,255,255,0.25); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </div>
            <div>
              <div style="font-weight: 700; font-size: 16px; margin-bottom: 4px; letter-spacing: -0.02em;">Export Failed</div>
              <div style="font-size: 14px; opacity: 0.95; font-weight: 500;">Unable to generate PDF - please try again</div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(errorDiv);
      setTimeout(() => {
        if (document.body.contains(errorDiv)) {
          document.body.removeChild(errorDiv);
        }
      }, 5000);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSaveToSupabase = async (name: string) => {
    if (!user?.id) return null;
    
    setSaveButtonStatus('saving');
    
    const savedResume = await saveResumeManually(name, user.id);
    
    if (savedResume) {
      // Update the list of resumes
      const resumes = await getUserResumes(user.id);
      if (resumes) {
        setSavedResumes(resumes);
      }
      
      setSaveButtonStatus('saved');
      setShowSaveModal(false);
      
      // Reset to idle after showing "saved" for 2 seconds
      setTimeout(() => {
        setSaveButtonStatus('idle');
      }, 2000);
      
      return savedResume;
    } else {
      setSaveButtonStatus('idle');
      setSaveError(`Failed to ${isEditingExistingResume ? 'update' : 'save'} resume. Please try again.`);
      return null;
    }
  };

  const handleSectionVisibilityToggle = (sectionId: string) => {
    const newOrder = sectionOrder.map(section =>
      section.id === sectionId ? { ...section, visible: !section.visible } : section
    );
    setSectionOrder(newOrder);
  };

  const handleCreateFromScratch = () => {
    resetForNewResume();
    // Go to default blank resume with template options
    setActiveSection('default-blank');
  };

  const handleSelectTemplate = () => {
    setActiveSection('templates');
  };

  const handleUploadResume = (extractedData: any) => {
    // Reset resume tracking state for new upload
    resetForNewResume();
    
    // Set the extracted data to the resume state
    setResumeData(extractedData);
    // Go directly to personal information section
    setActiveSection('personal');
  };

  const handleLoadSavedResume = (savedResume: any) => {
    loadResumeForEditing(savedResume);
    setActiveSection('personal');
    
    // Update the resume name for future saves
    setResumeName(savedResume.name || `${savedResume.data?.personalInfo?.firstName || 'My'} Resume`);
  };

  const handleSaveButtonClick = () => {
    if (!user) return;
    
    setShowSaveModal(true);
    
    // If editing existing resume, use current name; otherwise generate new name
    if (isEditingExistingResume && currentResumeId) {
      const currentResume = savedResumes.find(r => r.id === currentResumeId);
      setResumeName(currentResume?.name || resumeName || `${resumeData.personalInfo.firstName || 'My'} ${resumeData.personalInfo.jobTitle || ''} Resume`.trim());
    } else {
      setResumeName(`${resumeData.personalInfo.firstName || 'My'} ${resumeData.personalInfo.jobTitle || ''} Resume`.trim());
    }
  };

  // Function to get save button text and styling based on status
  const getSaveButtonProps = () => {
    switch (saveButtonStatus) {
      case 'saving':
        return {
          text: 'Saving...',
          icon: <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>,
          className: 'bg-blue-500 opacity-75 cursor-not-allowed'
        };
      case 'saved':
        return {
          text: 'Saved!',
          icon: <Save className="w-4 h-4" />,
          className: 'bg-green-600 hover:bg-green-700'
        };
      default:
        return {
          text: 'Save',
          icon: <Save className="w-4 h-4" />,
          className: 'hover:bg-slate-800 text-slate-300 hover:text-white'
        };
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'creation-options':
        return (
          <ResumeCreationOptions
            onCreateFromScratch={handleCreateFromScratch}
            onSelectTemplate={handleSelectTemplate}
            onUploadResume={handleUploadResume}
            onSelectPremiumTemplate={() => setActiveSection('premium-templates')}
            isDarkMode={isDarkMode}
          />
        );
      case 'default-blank':
        return (
          <DefaultBlankResume
            isDarkMode={isDarkMode}
            onTemplateSelect={(template) => {
              setSelectedTemplate(template.id);
              setActiveSection('personal');
            }}
            onContinueWithDefault={() => setActiveSection('personal')}
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            resumeData={resumeData}
            sectionOrder={sectionOrder}
            onSectionOrderChange={setSectionOrder}
            onSectionChange={setActiveSection}
            onExport={handleExport}
            selectedTemplate={selectedTemplate}
            saveResumeToSupabase={handleSaveToSupabase}
            setResumeData={setResumeData}
            updateCustomization={updateCustomization}
            setSelectedTemplate={setSelectedTemplate}
            onResumeLoad={handleLoadSavedResume}
            currentResumeId={currentResumeId}
            isEditingExistingResume={isEditingExistingResume}
            hasUnsavedChanges={hasUnsavedChanges}
            lastSaved={lastSaved}
            autoSaveEnabled={autoSaveEnabled}
            onToggleAutoSave={() => setAutoSaveEnabled(!autoSaveEnabled)}
          />
        );
      case 'templates':
        return (
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onTemplateSelect={(templateId) => {
              setSelectedTemplate(templateId);
              // After selecting template, go to personal info
              setActiveSection('personal');
            }}
          />
        );
      case 'customize':
        return (
          <CustomizationPanel
            customization={customization}
            onUpdate={updateCustomization}
            onReset={resetCustomization}
          />
        );
      case 'personal':
        return (
          <PersonalInfoForm
            personalInfo={resumeData.personalInfo}
            onUpdate={updatePersonalInfo}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            experience={resumeData.experience}
            onUpdate={updateExperience}
          />
        );
      case 'education':
        return (
          <EducationForm
            education={resumeData.education}
            onUpdate={updateEducation}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            skills={resumeData.skills}
            onUpdate={updateSkills}
          />
        );
      case 'custom':
        return (
          <CustomSectionForm
            customSections={resumeData.customSections}
            onUpdate={updateCustomSections}
          />
        );
      case 'preview':
        return (
          <div className="flex justify-center items-start min-h-full py-8">
            <ResumePreview
              resumeData={resumeData}
              selectedTemplate={selectedTemplate}
              customization={customization}
              sectionOrder={sectionOrder}
              showZoomControls={true}
            />
          </div>
        );
      case 'pricing':
        return (
          <div className="flex justify-center items-start min-h-full py-8">
            <ModernPricingCard 
              isDarkMode={isDarkMode}
              title="Upgrade to Pro"
              subtitle="Unlock premium templates and advanced features"
            />
          </div>
        );
      case 'premium-templates':
        return (
          <DedicatedPremiumTemplates
            isDarkMode={isDarkMode}
            onUpgrade={() => setActiveSection('pricing')}
            onBackToBuilder={() => setActiveSection('creation-options')}
            onTemplateSelect={(template) => {
              setSelectedTemplate(template.id);
              setActiveSection('personal');
            }}
          />
        );
      case 'ats-score':
        return (
          <div className="flex justify-center items-start min-h-full py-8">
            <ATSScorePanel
              resumeData={resumeData}
              isDarkMode={isDarkMode}
              onSuggestionApply={(suggestion) => {
                // Handle suggestion application
                console.log('Applying suggestion:', suggestion);
              }}
              onAutoFix={(fixes) => {
                // Handle auto-fix application
                console.log('Applying auto-fixes:', fixes);
              }}
            />
          </div>
        );
      case 'profile':
      case 'professional-summary':
        // These sections use the same form as personal info
        return (
          <PersonalInfoForm
            personalInfo={resumeData.personalInfo}
            onUpdate={updatePersonalInfo}
          />
        );
      default:
        return null;
    }
  };

  const getSectionTitle = () => {
    const titles = {
      'creation-options': 'Resume Creation Options',
      'default-blank': 'Choose Template or Start Blank',
      dashboard: 'Dashboard',
      templates: 'Resume Templates',
      customize: 'Customize Design',
      personal: 'Personal Information',
      experience: 'Work Experience',
      education: 'Education',
      skills: 'Skills & Expertise',
      custom: 'Custom Sections',
      preview: 'Resume Preview',
      pricing: 'Upgrade to Pro',
      'premium-templates': 'Premium Institution Templates',
      'ats-score': 'ATS Compatibility Score',
      'profile': 'Profile',
      'professional-summary': 'Professional Summary'
    };
    return titles[activeSection as keyof typeof titles] || 'Resume Builder';
  };

  const getSectionDescription = () => {
    const descriptions = {
      'creation-options': 'Choose how you want to create your resume',
      'default-blank': 'Select a template or start with a blank resume',
      dashboard: 'Overview of your resume progress and quick actions',
      templates: 'Choose a professional template design that matches your style',
      customize: 'Personalize fonts, colors, spacing, and layout to make your resume unique',
      personal: 'Add your contact information and professional summary',
      experience: 'Showcase your professional work experience and achievements',
      education: 'Add your educational background and qualifications',
      skills: 'Highlight your technical and soft skills',
      custom: 'Create custom sections to showcase unique aspects of your background',
      preview: 'See how your resume will look when exported to PDF. Use zoom controls to inspect details.',
      pricing: 'Upgrade to Pro for premium templates and advanced features',
      'premium-templates': 'Access premium templates exclusively from IIT, NIT, IISc, and IIM institutions',
      'ats-score': 'Get real-time ATS compatibility analysis and optimization suggestions for your resume',
      'profile': 'Add a brief professional profile',
      'professional-summary': 'Add a comprehensive professional summary'
    };
    return descriptions[activeSection as keyof typeof descriptions] || '';
  };

  // Determine layout based on active section
  const isFullWidthSection = activeSection === 'creation-options' || activeSection === 'dashboard' || activeSection === 'pricing' || activeSection === 'premium-templates';
  const showPreviewPanel = !isFullWidthSection && activeSection !== 'preview' && activeSection !== 'creation-options';
  const showSidebar = activeSection !== 'creation-options' && activeSection !== 'premium-templates';

  // Show loading state while Clerk is loading
  if (!isLoaded) {
    return (
      <div className={`h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-950 to-slate-900' 
          : 'bg-gradient-to-br from-gray-50 to-gray-100'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={isDarkMode ? 'text-slate-300' : 'text-gray-600'}>Loading...</p>
        </div>
      </div>
    );
  }

  const saveButtonProps = getSaveButtonProps();

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      
      <SignedIn>
        <div className={`h-screen flex overflow-hidden transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-slate-950 to-slate-900' 
            : 'bg-gradient-to-br from-gray-50 to-gray-100'
        }`}>
          {/* Professional Resume Builder Header - Only show when not on creation options */}
          {showSidebar && (
            <div className="absolute top-0 left-0 right-0 z-50">
              <header className={`backdrop-blur-xl border-b transition-all duration-300 ${
                isDarkMode
                  ? 'bg-slate-900/95 border-slate-800 shadow-xl'
                  : 'bg-white/95 border-slate-200 shadow-xl'
              }`}>
                <div className="px-6 py-4">
                  <div className="flex justify-between items-center">
                    {/* Left Side - Logo and Navigation */}
                    <div className="flex items-center space-x-6">
                      {/* Back Button */}
                      <motion.button
                        onClick={() => setActiveSection('creation-options')}
                        className={`group flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                          isDarkMode
                            ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Options</span>
                      </motion.button>

                      {/* Logo and Brand */}
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <motion.div 
                            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg"
                            whileHover={{ rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FileText className="w-6 h-6 text-white" />
                          </motion.div>
                          <motion.div 
                            className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                              FixitCV
                            </span>
                            <div className={`px-2 py-1 rounded-md text-xs font-medium ${
                              isDarkMode 
                                ? 'bg-blue-900/30 text-blue-300' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              Pro
                            </div>
                          </div>
                          <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            Professional Resume Builder
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Actions and Profile */}
                    <div className="flex items-center space-x-4">
                      {/* Action Buttons */}
                      <div className="hidden md:flex items-center space-x-2">
                        {/* Save Button with Dynamic Status */}
                        <motion.button
                          onClick={handleSaveButtonClick}
                          disabled={saveButtonStatus === 'saving'}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            saveButtonStatus === 'idle'
                              ? isDarkMode
                                ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                              : saveButtonProps.className
                          }`}
                          whileHover={{ scale: saveButtonStatus === 'saving' ? 1 : 1.02 }}
                          whileTap={{ scale: saveButtonStatus === 'saving' ? 1 : 0.98 }}
                        >
                          {saveButtonProps.icon}
                          <span>{saveButtonProps.text}</span>
                        </motion.button>

                        {/* Export Button */}
                        <motion.button
                          onClick={handleExport}
                          disabled={isExporting}
                          className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-70"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Download className="w-4 h-4" />
                          <span>{isExporting ? 'Exporting...' : 'Export PDF'}</span>
                        </motion.button>
                      </div>

                      {/* Theme Toggle */}
                      <motion.button
                        onClick={onToggleTheme}
                        className={`p-2.5 rounded-lg transition-colors ${
                          isDarkMode
                            ? 'text-yellow-400 hover:text-yellow-300 hover:bg-slate-800'
                            : 'text-blue-600 hover:text-blue-700 hover:bg-slate-100'
                        }`}
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <motion.div
                          initial={false}
                          animate={{ rotate: isDarkMode ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {isDarkMode ? (
                            <Sun className="w-5 h-5" strokeWidth={2.5} />
                          ) : (
                            <Moon className="w-5 h-5" strokeWidth={2.5} />
                          )}
                        </motion.div>
                      </motion.button>

                      {/* User Profile Section - Just Profile Icon */}
                      <div className="flex items-center pl-4 border-l border-slate-300 dark:border-slate-700">
                        <div className="relative">
                          <UserButton 
                            afterSignOutUrl="/"
                            appearance={{
                              elements: {
                                avatarBox: "w-10 h-10 ring-2 ring-blue-500/20 shadow-lg",
                                userButtonPopoverCard: isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200",
                                userButtonPopoverText: isDarkMode ? "text-slate-200" : "text-gray-900",
                                userButtonPopoverActions: isDarkMode ? "text-slate-300" : "text-gray-700"
                              }
                            }}
                          />
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white dark:border-slate-900 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Action Buttons */}
                  <div className="md:hidden mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-center space-x-2">
                      <motion.button
                        onClick={handleSaveButtonClick}
                        disabled={saveButtonStatus === 'saving'}
                        className={`flex items-center p-2 rounded-lg ${
                          saveButtonStatus === 'idle'
                            ? isDarkMode
                              ? 'text-slate-300 hover:bg-slate-800'
                              : 'text-slate-600 hover:bg-slate-100'
                            : saveButtonProps.className
                        }`}
                        whileHover={{ scale: saveButtonStatus === 'saving' ? 1 : 1.05 }}
                        whileTap={{ scale: saveButtonStatus === 'saving' ? 1 : 0.95 }}
                      >
                        {saveButtonProps.icon}
                      </motion.button>
                      <motion.button
                        onClick={handleExport}
                        disabled={isExporting}
                        className="p-2 bg-green-600 text-white rounded-lg disabled:opacity-70"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </header>
            </div>
          )}

          <DndProvider backend={HTML5Backend}>
            <div className={`flex w-full ${showSidebar ? 'pt-24' : ''}`}>
              {/* Sidebar - Only show when not on creation options */}
              {showSidebar && (
                <div className="flex-shrink-0">
                  <Sidebar
                    activeSection={activeSection}
                    onSectionChange={setActiveSection}
                    onExport={handleExport}
                    onBackToLanding={onBackToLanding}
                    resumeData={resumeData}
                    sectionOrder={sectionOrder}
                    onSectionOrderChange={setSectionOrder}
                    onSectionVisibilityToggle={handleSectionVisibilityToggle}
                    isDarkMode={isDarkMode}
                  />
                </div>
              )}

              {/* Main Content Area */}
              <div className="flex-1 flex min-w-0">
                {/* Editor Panel - 40% width when preview is shown */}
                <div className={`flex flex-col min-w-0 ${showPreviewPanel ? 'w-2/5' : 'flex-1'}`}>
                  {/* Section Header - Only show for non-full-width sections */}
                  {!isFullWidthSection && showSidebar && activeSection !== 'preview' && (
                    <div className={`flex-shrink-0 border-b px-6 py-4 ${
                      isDarkMode 
                        ? 'bg-slate-900/50 border-slate-800' 
                        : 'bg-white/50 border-gray-200'
                    }`}>
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className={`text-xl font-bold mb-1 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {getSectionTitle()}
                        </h2>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-slate-400' : 'text-gray-600'
                        }`}>
                          {getSectionDescription()}
                        </p>
                      </motion.div>
                    </div>
                  )}
                  
                  {/* Content Area */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="h-full">
                      {isFullWidthSection ? (
                        <div className={`h-full ${activeSection === 'creation-options' ? '' : 'p-8'}`}>
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="h-full"
                          >
                            {renderActiveSection()}
                          </motion.div>
                        </div>
                      ) : (
                        <div className="p-4">
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-none"
                          >
                            <div className={`rounded-xl shadow-sm border p-4 ${
                              isDarkMode 
                                ? 'bg-slate-900/50 border-slate-800' 
                                : 'bg-white border-gray-200'
                            }`}>
                              {renderActiveSection()}
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Preview Panel - 60% width when shown */}
                {showPreviewPanel && (
                  <div className={`w-3/5 flex-shrink-0 border-l ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-slate-800' 
                      : 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-200'
                  }`}>
                    <div className="h-full flex flex-col">
                      {/* Preview Content - Takes most space */}
                      <div className="flex-1 overflow-y-auto p-2">
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex justify-center h-full"
                        >
                          <ResumePreview
                            resumeData={resumeData}
                            selectedTemplate={selectedTemplate}
                            customization={customization}
                            sectionOrder={sectionOrder}
                            showZoomControls={true}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DndProvider>
        </div>

        {/* Save Resume Modal */}
        {showSaveModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-md w-full p-6 ${
                isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'
              }`}
            >
              <h3 className="text-xl font-bold mb-4">
                {isEditingExistingResume ? 'Update Resume Name' : 'Resume Name'}
              </h3>
              
              {saveError && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800">
                  {saveError}
                </div>
              )}
              
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Resume Name
                </label>
                <input
                  type="text"
                  value={resumeName}
                  onChange={(e) => setResumeName(e.target.value)}
                  placeholder="e.g., Software Engineer Resume"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isDarkMode
                      ? 'hover:bg-slate-700 text-gray-300'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSaveToSupabase(resumeName)}
                  disabled={saveButtonStatus === 'saving' || !resumeName.trim()}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2 ${
                    saveButtonStatus === 'saving' ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {saveButtonStatus === 'saving' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>{isEditingExistingResume ? 'Updating...' : 'Saving...'}</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{isEditingExistingResume ? 'Update Resume' : 'Save Resume'}</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}

      </SignedIn>
    </>
  );
};

export default ResumeBuilder;
