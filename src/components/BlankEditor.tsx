import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Palette, 
  User, 
  Briefcase, 
  GraduationCap,
  Star,
  Plus,
  Check,
  X
} from 'lucide-react';
import { ResumeData, SectionOrder, ResumeCustomization } from '../types/resume';

interface BlankEditorProps {
  resumeData: ResumeData;
  selectedTemplate: string;
  customization: ResumeCustomization;
  sectionOrder: SectionOrder[];
  onSectionChange: (section: string) => void;
  onTemplateSelect: (templateId: string) => void;
  resetForNewResume: () => void;
}

const BlankEditor: React.FC<BlankEditorProps> = ({
  resumeData,
  selectedTemplate,
  customization,
  sectionOrder,
  onSectionChange,
  onTemplateSelect,
  resetForNewResume
}) => {
  const [useTemplate, setUseTemplate] = useState(false);

  const templates = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean and contemporary design',
      preview: '/api/placeholder/200/280'
    },
    {
      id: 'classic',
      name: 'Classic Traditional',
      description: 'Timeless and professional',
      preview: '/api/placeholder/200/280'
    },
    {
      id: 'creative',
      name: 'Creative Designer',
      description: 'Bold and eye-catching',
      preview: '/api/placeholder/200/280'
    },
    {
      id: 'nit-premium',
      name: 'NIT Premium',
      description: 'Elite template for top institutions',
      preview: '/api/placeholder/200/280',
      isPremium: true
    }
  ];

  const handleStartFromScratch = () => {
    resetForNewResume();
    onSectionChange('personal');
  };

  const handleUseTemplate = (templateId: string) => {
    onTemplateSelect(templateId);
    resetForNewResume();
    onSectionChange('personal');
  };

  const quickStartSections = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Add your contact details and summary',
      icon: User,
      color: 'bg-blue-500',
      completed: !!(resumeData.personalInfo.firstName && resumeData.personalInfo.email)
    },
    {
      id: 'experience',
      title: 'Work Experience',
      description: 'Add your professional experience',
      icon: Briefcase,
      color: 'bg-green-500',
      completed: resumeData.experience.length > 0
    },
    {
      id: 'education',
      title: 'Education',
      description: 'Add your educational background',
      icon: GraduationCap,
      color: 'bg-purple-500',
      completed: resumeData.education.length > 0
    },
    {
      id: 'skills',
      title: 'Skills',
      description: 'Highlight your key skills',
      icon: Star,
      color: 'bg-orange-500',
      completed: resumeData.skills.length > 0
    }
  ];

  return (
    <div className="h-full flex bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create Your Resume
          </h1>
          <p className="text-xl text-gray-600">
            Choose how you want to start building your professional resume
          </p>
        </motion.div>

        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center"
        >
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Build Your Resume?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Use the sidebar to choose a professional template or start from scratch. 
            Templates provide a quick start with professional formatting, while building from scratch 
            gives you complete control over every detail.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleStartFromScratch}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Start from Scratch
            </button>
            <button
              onClick={() => onSectionChange('templates')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Browse All Templates
            </button>
          </div>
        </motion.div>

        {/* Quick Start Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Start Guide</h2>
          <p className="text-gray-600 mb-6">
            Follow these steps to create a complete, professional resume
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStartSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.button
                  key={section.id}
                  onClick={() => onSectionChange(section.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md ${
                    section.completed 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 ${section.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    {section.completed && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">{section.title}</h3>
                  <p className="text-sm text-gray-600">{section.description}</p>
                  
                  <div className="mt-3 text-xs font-medium">
                    <span className={section.completed ? 'text-green-600' : 'text-gray-500'}>
                      Step {index + 1}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Pro Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                <strong>Start with templates</strong> if you want to save time and get professional results quickly.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                <strong>Build from scratch</strong> if you want complete control over your resume's design and content.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                <strong>Complete all sections</strong> for the best results and higher ATS compatibility.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                <strong>Preview frequently</strong> to see how your resume looks to employers.
              </p>
            </div>
          </div>
        </motion.div>
        </div>
      </div>

      {/* Template Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Template Options</h3>
          <p className="text-sm text-gray-600">
            Choose a template or continue from scratch
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* From Scratch Option */}
          <div className="mb-6">
            <button
              onClick={handleStartFromScratch}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                !useTemplate 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">From Scratch</h4>
                  <p className="text-sm text-gray-600">Build step by step</p>
                </div>
              </div>
            </button>
          </div>

          {/* Template Options */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Professional Templates</h4>
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleUseTemplate(template.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  selectedTemplate === template.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Palette className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{template.name}</h4>
                      {template.isPremium && (
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          PRO
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                  {selectedTemplate === template.id && (
                    <Check className="w-5 h-5 text-blue-500" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Action Button */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            {selectedTemplate ? (
              <button
                onClick={() => handleUseTemplate(selectedTemplate)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Use {templates.find(t => t.id === selectedTemplate)?.name}
              </button>
            ) : (
              <button
                onClick={handleStartFromScratch}
                className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Start from Scratch
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlankEditor;