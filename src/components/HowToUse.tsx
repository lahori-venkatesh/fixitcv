import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  FileText, 
  Palette, 
  Download, 
  User, 
  Briefcase, 
  GraduationCap, 
  Star, 
  Eye, 
  Settings, 
  CheckCircle, 
  ArrowRight, 
  Lightbulb, 
  Zap, 
  Target,
  Edit3,
  Upload,
  Plus,
  Save
} from 'lucide-react';
import Header from './Header';

interface HowToUseProps {
  isDarkMode?: boolean;
  onNavigate?: (page: 'landing' | 'pricing' | 'templates' | 'how-to-use' | 'contact' | 'privacy' | 'terms' | 'cookies') => void;
  onToggleTheme?: () => void;
}

const HowToUse: React.FC<HowToUseProps> = ({ isDarkMode = false, onNavigate, onToggleTheme }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Play,
      description: 'Choose how you want to create your resume',
      content: {
        overview: 'FixitCV offers three ways to start building your professional resume. Choose the method that works best for you.',
        options: [
          {
            title: 'Start from Scratch',
            description: 'Build your resume step by step with our guided process',
            features: ['AI-powered suggestions', 'Custom sections', 'Professional templates', 'ATS optimization'],
            recommended: true
          },
          {
            title: 'Choose a Template',
            description: 'Start with a professional template and customize it',
            features: ['Professional designs', 'Easy customization', 'Industry-specific', 'Quick setup']
          },
          {
            title: 'Upload Existing Resume',
            description: 'Import your current resume and enhance it with our tools',
            features: ['AI content extraction', 'Auto-formatting', 'Section restructuring', 'Easy editing']
          }
        ]
      }
    },
    {
      id: 'personal-info',
      title: 'Personal Information',
      icon: User,
      description: 'Add your contact details and professional summary',
      content: {
        overview: 'Start by adding your basic information. This forms the header of your resume and is the first thing employers see.',
        sections: [
          {
            title: 'Basic Details',
            fields: ['Full Name', 'Job Title', 'Email Address', 'Phone Number', 'Location']
          },
          {
            title: 'Professional Links',
            fields: ['LinkedIn Profile', 'GitHub (for tech roles)', 'Portfolio Website', 'Custom Links']
          },
          {
            title: 'Additional Information (Optional)',
            fields: ['Date of Birth', 'Nationality', 'Visa Status', 'Languages']
          }
        ],
        tips: [
          'Use a professional email address',
          'Include your city and state/country',
          'Add relevant social profiles for your industry',
          'Keep your job title clear and specific'
        ]
      }
    },
    {
      id: 'experience',
      title: 'Work Experience',
      icon: Briefcase,
      description: 'Showcase your professional background and achievements',
      content: {
        overview: 'Your work experience is the most important section. Focus on achievements and quantifiable results.',
        structure: [
          'Company Name',
          'Job Title',
          'Location',
          'Employment Dates',
          'Key Achievements (bullet points)'
        ],
        tips: [
          'Start each bullet point with an action verb',
          'Quantify your achievements with numbers and percentages',
          'Focus on results, not just responsibilities',
          'Tailor your experience to match the job you\'re applying for',
          'Use the STAR method (Situation, Task, Action, Result)'
        ],
        examples: [
          '• Led a team of 8 developers, resulting in 40% faster project delivery',
          '• Implemented new marketing strategy that increased sales by 25%',
          '• Reduced customer support response time from 24 hours to 2 hours'
        ]
      }
    },
    {
      id: 'education',
      title: 'Education',
      icon: GraduationCap,
      description: 'Add your educational background and qualifications',
      content: {
        overview: 'Include your formal education, certifications, and relevant coursework.',
        structure: [
          'Institution Name',
          'Degree Type and Field of Study',
          'Location',
          'Graduation Date',
          'GPA (if 3.5 or higher)',
          'Relevant Coursework or Honors'
        ],
        tips: [
          'List education in reverse chronological order',
          'Include relevant coursework for entry-level positions',
          'Add academic achievements and honors',
          'Include certifications and professional development'
        ]
      }
    },
    {
      id: 'skills',
      title: 'Skills & Expertise',
      icon: Star,
      description: 'Highlight your technical and soft skills',
      content: {
        overview: 'Showcase the skills that make you qualified for your target role.',
        categories: [
          {
            title: 'Technical Skills',
            examples: ['Programming Languages', 'Software Tools', 'Frameworks', 'Databases']
          },
          {
            title: 'Soft Skills',
            examples: ['Leadership', 'Communication', 'Problem-solving', 'Time Management']
          },
          {
            title: 'Industry-Specific Skills',
            examples: ['Project Management', 'Data Analysis', 'Digital Marketing', 'Design Tools']
          }
        ],
        tips: [
          'Include skills mentioned in the job description',
          'Be honest about your skill level',
          'Group similar skills together',
          'Prioritize skills most relevant to your target role'
        ]
      }
    },
    {
      id: 'customization',
      title: 'Design & Customization',
      icon: Palette,
      description: 'Personalize your resume\'s appearance',
      content: {
        overview: 'Make your resume stand out with professional design customization.',
        options: [
          {
            title: 'Templates',
            description: 'Choose from professional, creative, or industry-specific templates'
          },
          {
            title: 'Colors',
            description: 'Customize primary, secondary, and accent colors'
          },
          {
            title: 'Typography',
            description: 'Adjust fonts, sizes, and spacing for optimal readability'
          },
          {
            title: 'Layout',
            description: 'Configure page format, margins, and section arrangement'
          }
        ],
        tips: [
          'Keep colors professional and easy to read',
          'Ensure good contrast between text and background',
          'Use consistent spacing throughout',
          'Test how your resume looks when printed in black and white'
        ]
      }
    },
    {
      id: 'preview-export',
      title: 'Preview & Export',
      icon: Download,
      description: 'Review and download your finished resume',
      content: {
        overview: 'Review your resume carefully before downloading and sending to employers.',
        features: [
          {
            title: 'Live Preview',
            description: 'See exactly how your resume will look in real-time'
          },
          {
            title: 'Zoom Controls',
            description: 'Zoom in and out to check details and formatting'
          },
          {
            title: 'PDF Export',
            description: 'Download high-quality, ATS-optimized PDF files'
          },
          {
            title: 'Multiple Formats',
            description: 'Export in different formats for various applications'
          }
        ],
        checklist: [
          'Check for spelling and grammar errors',
          'Verify all contact information is correct',
          'Ensure consistent formatting throughout',
          'Test that all links work properly',
          'Review for ATS compatibility',
          'Get feedback from others before sending'
        ]
      }
    }
  ];

  const quickTips = [
    {
      icon: Target,
      title: 'ATS Optimization',
      description: 'Our templates are designed to pass Applicant Tracking Systems with 95%+ success rate.'
    },
    {
      icon: Zap,
      title: 'AI-Powered Suggestions',
      description: 'Get intelligent content suggestions and improvements as you build your resume.'
    },
    {
      icon: Eye,
      title: 'Real-time Preview',
      description: 'See exactly how your resume will look as you make changes.'
    },
    {
      icon: Save,
      title: 'Auto-Save',
      description: 'Your progress is automatically saved so you never lose your work.'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 text-gray-900'
    }`}>
      <Header 
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        onNavigate={onNavigate}
        currentPage="how-to-use"
      />

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-20 ${
            isDarkMode ? 'bg-blue-500' : 'bg-blue-200'
          }`} />
          <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-20 ${
            isDarkMode ? 'bg-purple-500' : 'bg-purple-200'
          }`} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
              isDarkMode 
                ? 'bg-blue-900/30 text-blue-300 border border-blue-700/30' 
                : 'bg-blue-100 text-blue-700 border border-blue-200'
            }`}>
              <Lightbulb className="w-4 h-4 mr-2" />
              Step-by-Step Guide
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              How to Use <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">FixitCV</span>
            </h1>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Learn how to create a professional, ATS-optimized resume that gets you noticed by employers.
            </p>
          </motion.div>

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
          >
            {quickTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`text-center p-6 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-slate-900/50 border-slate-700' 
                    : 'bg-white/50 border-gray-200'
                }`}
              >
                <tip.icon className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{tip.title}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {tip.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Step Navigation */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeStep === index
                      ? 'bg-blue-600 text-white shadow-lg'
                      : isDarkMode
                        ? 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{step.title}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Step Content */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`rounded-2xl border p-8 ${
              isDarkMode 
                ? 'bg-slate-900/50 border-slate-700' 
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                {React.createElement(steps[activeStep].icon, { className: "w-6 h-6 text-white" })}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{steps[activeStep].title}</h2>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {steps[activeStep].description}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {steps[activeStep].content.overview}
              </p>

              {/* Render step-specific content */}
              {steps[activeStep].id === 'getting-started' && (
                <div className="grid md:grid-cols-3 gap-6">
                  {steps[activeStep].content.options?.map((option, index) => (
                    <div key={index} className={`p-6 rounded-xl border ${
                      option.recommended 
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                        : isDarkMode 
                          ? 'border-slate-700 bg-slate-800/50' 
                          : 'border-gray-200 bg-gray-50'
                    }`}>
                      {option.recommended && (
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-600 text-white mb-3">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Recommended
                        </div>
                      )}
                      <h3 className="font-semibold mb-2">{option.title}</h3>
                      <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {option.description}
                      </p>
                      <ul className="space-y-1">
                        {option.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {steps[activeStep].content.sections && (
                <div className="space-y-4">
                  {steps[activeStep].content.sections.map((section, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      isDarkMode ? 'border-slate-700 bg-slate-800/30' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <h3 className="font-semibold mb-2">{section.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {section.fields.map((field, i) => (
                          <span key={i} className={`px-3 py-1 rounded-full text-sm ${
                            isDarkMode ? 'bg-slate-700 text-gray-300' : 'bg-white text-gray-700'
                          }`}>
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {steps[activeStep].content.structure && (
                <div className={`p-4 rounded-lg border ${
                  isDarkMode ? 'border-slate-700 bg-slate-800/30' : 'border-gray-200 bg-gray-50'
                }`}>
                  <h3 className="font-semibold mb-3">Resume Structure</h3>
                  <ol className="space-y-2">
                    {steps[activeStep].content.structure.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
                          {index + 1}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {steps[activeStep].content.categories && (
                <div className="grid md:grid-cols-3 gap-4">
                  {steps[activeStep].content.categories.map((category, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      isDarkMode ? 'border-slate-700 bg-slate-800/30' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <h3 className="font-semibold mb-2">{category.title}</h3>
                      <ul className="space-y-1">
                        {category.examples.map((example, i) => (
                          <li key={i} className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            • {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {steps[activeStep].content.options && steps[activeStep].id !== 'getting-started' && (
                <div className="grid md:grid-cols-2 gap-6">
                  {steps[activeStep].content.options.map((option, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      isDarkMode ? 'border-slate-700 bg-slate-800/30' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <h3 className="font-semibold mb-2">{option.title}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {option.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {steps[activeStep].content.features && (
                <div className="grid md:grid-cols-2 gap-6">
                  {steps[activeStep].content.features.map((feature, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      isDarkMode ? 'border-slate-700 bg-slate-800/30' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {steps[activeStep].content.tips && (
                <div className={`p-6 rounded-lg border ${
                  isDarkMode 
                    ? 'border-blue-700/30 bg-blue-900/20' 
                    : 'border-blue-200 bg-blue-50'
                }`}>
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-blue-500" />
                    Pro Tips
                  </h3>
                  <ul className="space-y-2">
                    {steps[activeStep].content.tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className={isDarkMode ? 'text-blue-200' : 'text-blue-800'}>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {steps[activeStep].content.examples && (
                <div className={`p-6 rounded-lg border ${
                  isDarkMode 
                    ? 'border-green-700/30 bg-green-900/20' 
                    : 'border-green-200 bg-green-50'
                }`}>
                  <h3 className="font-semibold mb-4">Examples</h3>
                  <ul className="space-y-2">
                    {steps[activeStep].content.examples.map((example, index) => (
                      <li key={index} className={`font-mono text-sm ${
                        isDarkMode ? 'text-green-200' : 'text-green-800'
                      }`}>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {steps[activeStep].content.checklist && (
                <div className={`p-6 rounded-lg border ${
                  isDarkMode 
                    ? 'border-purple-700/30 bg-purple-900/20' 
                    : 'border-purple-200 bg-purple-50'
                }`}>
                  <h3 className="font-semibold mb-4">Final Checklist</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {steps[activeStep].content.checklist.map((item, index) => (
                      <label key={index} className="flex items-center">
                        <input type="checkbox" className="mr-2 rounded" />
                        <span className={isDarkMode ? 'text-purple-200' : 'text-purple-800'}>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeStep === 0
                    ? 'opacity-50 cursor-not-allowed'
                    : isDarkMode
                      ? 'bg-slate-800 text-white hover:bg-slate-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                <span>Previous</span>
              </button>

              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === activeStep
                        ? 'bg-blue-600'
                        : isDarkMode
                          ? 'bg-slate-700'
                          : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                disabled={activeStep === steps.length - 1}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeStep === steps.length - 1
                    ? 'opacity-50 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? 'bg-slate-900/50' : 'bg-white/50'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`p-12 rounded-2xl border ${
              isDarkMode 
                ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-slate-700' 
                : 'bg-gradient-to-br from-blue-50 to-purple-50 border-gray-200'
            }`}
          >
            <FileText className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Ready to Build Your Resume?</h2>
            <p className={`text-xl mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Now that you know how to use FixitCV, start creating your professional resume today.
            </p>
            <motion.button 
              onClick={() => onNavigate && onNavigate('landing')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-3 mx-auto shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Building Now</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowToUse;