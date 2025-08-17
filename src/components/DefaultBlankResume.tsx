import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Crown, 
  Star, 
  Building, 
  Plus, 
  Edit, 
  Eye, 
  ArrowRight,
  CheckCircle,
  Sparkles,
  Target,
  Users,
  Award,
  Zap
} from 'lucide-react';
import { ResumeTemplate } from '../types/resume';

interface DefaultBlankResumeProps {
  isDarkMode?: boolean;
  onTemplateSelect?: (template: ResumeTemplate) => void;
  onContinueWithDefault?: () => void;
}

const DefaultBlankResume: React.FC<DefaultBlankResumeProps> = ({
  isDarkMode = false,
  onTemplateSelect,
  onContinueWithDefault
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Default resume data structure
  const defaultResumeData = {
    personalInfo: {
      firstName: 'Your',
      lastName: 'Name',
      email: 'your.email@example.com',
      phone: '+91 98765 43210',
      location: 'City, State, India',
      website: 'yourwebsite.com',
      linkedin: 'linkedin.com/in/yourprofile',
      summary: 'Passionate professional with expertise in [your field]. Seeking opportunities to contribute and grow in a dynamic environment.'
    },
    experience: [
      {
        id: '1',
        company: 'Company Name',
        position: 'Your Position',
        location: 'City, State',
        startDate: '2023-01',
        endDate: '',
        current: true,
        description: [
          'Describe your key responsibilities and achievements',
          'Highlight your contributions and impact',
          'Mention technologies and tools used'
        ]
      }
    ],
    education: [
      {
        id: '1',
        institution: 'Your University/College',
        degree: 'Your Degree',
        field: 'Your Field of Study',
        location: 'City, State',
        startDate: '2020-08',
        endDate: '2024-05',
        gpa: '8.5'
      }
    ],
    skills: [
      { id: '1', name: 'Skill 1', level: 'Expert' },
      { id: '2', name: 'Skill 2', level: 'Advanced' },
      { id: '3', name: 'Skill 3', level: 'Intermediate' }
    ],
    customSections: [],
    projects: [
      {
        id: '1',
        name: 'Project Name',
        description: 'Brief description of your project and its impact',
        technologies: ['Technology 1', 'Technology 2', 'Technology 3'],
        startDate: '2023-06',
        endDate: '2023-12'
      }
    ],
    certifications: [],
    achievements: []
  };

  // Template options
  const templateOptions = [
    {
      id: 'default-modern',
      name: 'Default Modern',
      description: 'Clean, professional template with modern design',
      icon: Building,
      color: 'from-blue-500 to-blue-600',
      features: ['ATS Friendly', 'Professional Layout', 'Easy Customization'],
      tier: 'free',
      recommended: true
    },
    {
      id: 'default-classic',
      name: 'Default Classic',
      description: 'Traditional professional template',
      icon: FileText,
      color: 'from-gray-500 to-gray-600',
      features: ['Classic Style', 'ATS Optimized', 'Professional'],
      tier: 'free'
    },
    {
      id: 'premium-modern',
      name: 'Premium Modern',
      description: 'Advanced template with enhanced features',
      icon: Star,
      color: 'from-purple-500 to-purple-600',
      features: ['Advanced ATS', 'Premium Layout', 'Enhanced Customization'],
      tier: 'premium'
    },
    {
      id: 'elite-institution',
      name: 'Elite Institution',
      description: 'Premium templates from top institutions',
      icon: Crown,
      color: 'from-yellow-500 to-orange-600',
      features: ['IIT/NIT/IIM/IISc', 'Advanced Features', 'Priority Support'],
      tier: 'elite'
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      // Create a template object for the selected template
      const template: ResumeTemplate = {
        id: selectedTemplate,
        name: templateOptions.find(t => t.id === selectedTemplate)?.name || 'Default Template',
        preview: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
        type: 'professional',
        country: 'IN',
        description: 'Professional template for building your resume',
        features: ['ATS Friendly', 'Professional Layout', 'Easy Customization'],
        colors: { primary: '#2563eb', secondary: '#1e40af', accent: '#3b82f6' },
        layout: 'single-column',
        style: 'modern',
        tier: 'free',
        atsScore: 85,
        category: 'Professional',
        institution: null,
        institutionName: null,
        creatorProfile: null,
        downloadCount: 0,
        rating: 4.5,
        price: 0,
        isVerified: false,
        createdAt: new Date().toISOString()
      };
      
      onTemplateSelect?.(template);
    } else {
      onContinueWithDefault?.();
    }
  };

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
            isDarkMode 
              ? 'bg-blue-900/30 text-blue-300 border border-blue-700/30' 
              : 'bg-blue-100 text-blue-700 border border-blue-200'
          }`}>
            <Sparkles className="w-4 h-4 mr-2" />
            Start Building Your Resume
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Starting Point
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-600 dark:text-gray-400">
            Select a template to get started, or continue with our default blank resume and customize it later.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Template Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold mb-2">Template Options</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Choose from our collection of professional templates
              </p>
            </div>

            <div className="space-y-4">
              {templateOptions.map((template, index) => {
                const Icon = template.icon;
                const isSelected = selectedTemplate === template.id;
                
                return (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    onClick={() => handleTemplateSelect(template.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/50 dark:border-blue-400 dark:bg-blue-900/20'
                        : isDarkMode
                          ? 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${template.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{template.name}</h3>
                          {template.recommended && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs rounded-full">
                              Recommended
                            </span>
                          )}
                          {template.tier === 'premium' && (
                            <Star className="w-4 h-4 text-blue-500" />
                          )}
                          {template.tier === 'elite' && (
                            <Crown className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {template.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {template.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.button
              onClick={handleContinue}
              disabled={!selectedTemplate}
              className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                selectedTemplate
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              whileHover={selectedTemplate ? { scale: 1.02 } : {}}
              whileTap={selectedTemplate ? { scale: 0.98 } : {}}
            >
              <span>
                {selectedTemplate ? 'Continue with Selected Template' : 'Select a Template to Continue'}
              </span>
              {selectedTemplate && <ArrowRight className="w-4 h-4" />}
            </motion.button>
          </motion.div>

          {/* Default Resume Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold mb-2">Default Resume Preview</h2>
              <p className="text-gray-600 dark:text-gray-400">
                This is how your resume will look with default content
              </p>
            </div>

            <div className={`rounded-xl border-2 overflow-hidden shadow-lg ${
              isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-white'
            }`}>
              {/* Resume Header */}
              <div className={`p-6 border-b-2 ${
                isDarkMode ? 'border-slate-700 bg-slate-900' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">
                    {defaultResumeData.personalInfo.firstName} {defaultResumeData.personalInfo.lastName}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">
                    {defaultResumeData.experience[0]?.position} at {defaultResumeData.experience[0]?.company}
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{defaultResumeData.personalInfo.email}</span>
                    <span>{defaultResumeData.personalInfo.phone}</span>
                    <span>{defaultResumeData.personalInfo.location}</span>
                  </div>
                </div>
              </div>

              {/* Resume Content */}
              <div className="p-6 space-y-6">
                {/* Summary */}
                <div>
                  <h4 className="text-lg font-semibold mb-2 border-b-2 border-gray-300 dark:border-slate-600 pb-1">
                    Professional Summary
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {defaultResumeData.personalInfo.summary}
                  </p>
                </div>

                {/* Experience */}
                <div>
                  <h4 className="text-lg font-semibold mb-3 border-b-2 border-gray-300 dark:border-slate-600 pb-1">
                    Work Experience
                  </h4>
                  <div className="space-y-3">
                    {defaultResumeData.experience.map((exp, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="font-medium">{exp.position}</h5>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {exp.company}, {exp.location}
                        </p>
                        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                          {exp.description.map((desc, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-blue-500 mt-1">•</span>
                              <span>{desc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h4 className="text-lg font-semibold mb-3 border-b-2 border-gray-300 dark:border-slate-600 pb-1">
                    Education
                  </h4>
                  <div className="space-y-3">
                    {defaultResumeData.education.map((edu, index) => (
                      <div key={index} className="border-l-4 border-green-500 pl-4">
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="font-medium">{edu.degree} in {edu.field}</h5>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {edu.startDate} - {edu.endDate}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {edu.institution}, {edu.location}
                        </p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            GPA: {edu.gpa}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-lg font-semibold mb-3 border-b-2 border-gray-300 dark:border-slate-600 pb-1">
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {defaultResumeData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                      >
                        {skill.name} ({skill.level})
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={onContinueWithDefault}
                className="px-6 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors font-medium"
              >
                Continue with Default Resume
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DefaultBlankResume;
