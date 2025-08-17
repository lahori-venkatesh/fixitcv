import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  Plus, 
  Sparkles, 
  ArrowRight, 
  Check, 
  AlertCircle, 
  FileUp, 
  Zap, 
  Edit3, 
  Download,
  X,
  Loader2,
  Palette
} from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

interface ResumeCreationOptionsProps {
  onCreateFromScratch: () => void;
  onUploadResume: (extractedData: any) => void;
  onSelectTemplate: () => void;
  onSelectPremiumTemplate?: () => void;
  isDarkMode?: boolean;
}

const ResumeCreationOptions: React.FC<ResumeCreationOptionsProps> = ({
  onCreateFromScratch,
  onUploadResume,
  onSelectTemplate,
  onSelectPremiumTemplate,
  isDarkMode = false
}) => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [uploadError, setUploadError] = useState<string>('');
  const [extractedData, setExtractedData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, isLoaded } = useUser();
  const [isNewUser, setIsNewUser] = useState(false);

  // Check if user just authenticated
  useEffect(() => {
    const justAuthenticated = sessionStorage.getItem('justAuthenticated');
    if (justAuthenticated === 'true') {
      setIsNewUser(true);
      // Remove the flag so it doesn't show again on refresh
      sessionStorage.removeItem('justAuthenticated');
    }
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Please upload a PDF or Word document');
      setUploadStatus('error');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size must be less than 10MB');
      setUploadStatus('error');
      return;
    }

    setUploadStatus('uploading');
    setUploadError('');

    try {
      // Simulate file upload and processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      setUploadStatus('processing');

      // Simulate AI extraction process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock extracted data - in real implementation, this would come from AI/OCR service
      const mockExtractedData = {
        personalInfo: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@email.com',
          phone: '(555) 123-4567',
          location: 'San Francisco, CA',
          website: 'johndoe.dev',
          linkedin: 'linkedin.com/in/johndoe',
          summary: 'Experienced software engineer with 5+ years of experience in full-stack development. Passionate about creating scalable web applications and leading development teams.'
        },
        experience: [
          {
            id: '1',
            company: 'Tech Solutions Inc.',
            position: 'Senior Software Engineer',
            location: 'San Francisco, CA',
            startDate: '2022-01',
            endDate: '',
            current: true,
            description: [
              'Led development of microservices architecture serving 1M+ users',
              'Implemented CI/CD pipelines reducing deployment time by 60%',
              'Mentored 3 junior developers and conducted technical interviews'
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
              'Designed and implemented RESTful APIs',
              'Collaborated with design team to improve user experience'
            ]
          }
        ],
        education: [
          {
            id: '1',
            institution: 'University of California, Berkeley',
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            location: 'Berkeley, CA',
            startDate: '2016-09',
            endDate: '2020-05',
            gpa: '3.7'
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
            name: 'E-commerce Platform',
            description: 'Built a full-stack e-commerce platform using React, Node.js, and MongoDB',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
            startDate: '2021-06',
            endDate: '2021-12'
          }
        ],
        certifications: [
          {
            id: '1',
            name: 'AWS Certified Solutions Architect',
            issuer: 'Amazon Web Services',
            date: '2022-05',
            description: 'Validated expertise in designing distributed systems on AWS'
          }
        ],
        achievements: [
          {
            id: '1',
            title: 'Innovation Award',
            date: '2022-11',
            description: 'Recognized for developing an AI-powered code review tool'
          }
        ]
      };

      setExtractedData(mockExtractedData);
      setUploadStatus('success');
    } catch (error) {
      setUploadError('Failed to process the resume. Please try again.');
      setUploadStatus('error');
    }
  };

  const handleUseExtractedData = () => {
    if (extractedData) {
      onUploadResume(extractedData);
    }
  };

  const resetUpload = () => {
    setUploadStatus('idle');
    setUploadError('');
    setExtractedData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const creationOptions = [
    {
      id: 'scratch',
      title: 'Start from Scratch',
      description: 'Build your resume step by step with our guided process',
      icon: Plus,
      color: 'from-blue-500 to-blue-600',
      features: ['AI-powered suggestions', 'Custom sections', 'Professional templates', 'ATS optimization'],
      action: onCreateFromScratch,
      recommended: true
    },
    {
      id: 'template',
      title: 'Choose a Template',
      description: 'Start with a professional template and customize it',
      icon: Palette,
      color: 'from-purple-500 to-purple-600',
      features: ['Professional designs', 'Easy customization', 'Industry-specific', 'Quick setup'],
      action: onSelectTemplate,
      recommended: false
    },
    {
      id: 'upload',
      title: 'Upload Existing Resume',
      description: 'Import your current resume and enhance it with our tools',
      icon: Upload,
      color: 'from-green-500 to-green-600',
      features: ['AI content extraction', 'Auto-formatting', 'Section restructuring', 'Easy editing'],
      action: () => fileInputRef.current?.click(),
      recommended: false
    },
    {
      id: 'premium',
      title: 'Premium Templates',
      description: 'Access exclusive premium templates with advanced customization',
      icon: Sparkles,
      color: 'from-yellow-500 to-orange-600',
      features: ['Exclusive designs', 'Advanced customization', 'Priority support', 'Premium features'],
      action: onSelectPremiumTemplate || (() => console.log('Premium templates not available')),
      recommended: false
    }
  ];

  return (
    <div className={`min-h-screen flex items-center justify-center p-8 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50'
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-20 ${
          isDarkMode ? 'bg-blue-500' : 'bg-blue-200'
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-20 ${
          isDarkMode ? 'bg-purple-500' : 'bg-purple-200'
        }`} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
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
            <Sparkles className="w-4 h-4 mr-2" />
            Resume Creation Options
          </div>

          {isNewUser && isLoaded && user ? (
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Welcome, {user.firstName || 'there'}! 👋
            </h1>
          ) : (
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              How would you like to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                get started?
              </span>
            </h1>
          )}

          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {isNewUser 
              ? "Let's create your professional resume. Choose one of the options below to begin."
              : "Choose the method that works best for you. All options will help you create a professional, ATS-optimized resume."}
          </p>
        </motion.div>

        {/* Creation Options */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {creationOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`relative p-8 rounded-2xl border transition-all duration-300 hover:shadow-2xl group cursor-pointer ${
                  isDarkMode 
                    ? 'bg-slate-900/50 border-slate-700 hover:bg-slate-800/50' 
                    : 'bg-white border-gray-200 hover:shadow-blue-100/50'
                }`}
                onClick={option.action}
              >
                {/* Recommended Badge */}
                {option.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1 shadow-lg">
                      <Check className="w-3 h-3" />
                      <span>Recommended</span>
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className={`text-2xl font-bold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {option.title}
                </h3>

                <p className={`text-lg mb-6 leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {option.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {option.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${option.color} flex items-center justify-center flex-shrink-0`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <div className={`flex items-center justify-between p-4 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <span className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {option.id === 'upload' ? 'Choose File' : option.id === 'template' ? 'Browse Templates' : option.id === 'premium' ? 'View Premium' : 'Get Started'}
                  </span>
                  <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform duration-200 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>

        {/* Upload Processing Modal */}
        {uploadStatus !== 'idle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`max-w-2xl w-full rounded-2xl border p-8 ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-700' 
                  : 'bg-white border-gray-200'
              }`}
            >
              {/* Close Button */}
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Resume Upload
                </h3>
                <button
                  onClick={resetUpload}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'hover:bg-slate-800 text-gray-400 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Upload Status */}
              {uploadStatus === 'uploading' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  </div>
                  <h4 className={`text-lg font-semibold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Uploading Resume...
                  </h4>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Please wait while we upload your file
                  </p>
                </div>
              )}

              {uploadStatus === 'processing' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-purple-600 animate-pulse" />
                  </div>
                  <h4 className={`text-lg font-semibold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Processing with AI...
                  </h4>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Our AI is extracting and structuring your resume content
                  </p>
                  <div className="mt-4 flex justify-center space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {uploadStatus === 'success' && extractedData && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className={`text-lg font-semibold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Resume Successfully Processed!
                    </h4>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      We've extracted and structured your resume content. Review the sections below:
                    </p>
                  </div>

                  {/* Extracted Data Preview */}
                  <div className={`rounded-lg border p-4 max-h-64 overflow-y-auto ${
                    isDarkMode 
                      ? 'bg-slate-800/50 border-slate-700' 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="space-y-4">
                      {/* Personal Info */}
                      <div>
                        <h5 className={`font-semibold mb-2 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          Personal Information
                        </h5>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {extractedData.personalInfo.firstName} {extractedData.personalInfo.lastName} • {extractedData.personalInfo.email}
                        </p>
                      </div>

                      {/* Experience */}
                      <div>
                        <h5 className={`font-semibold mb-2 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          Work Experience
                        </h5>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {extractedData.experience.length} positions extracted
                        </p>
                      </div>

                      {/* Education */}
                      <div>
                        <h5 className={`font-semibold mb-2 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          Education
                        </h5>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {extractedData.education.length} degrees extracted
                        </p>
                      </div>

                      {/* Skills */}
                      <div>
                        <h5 className={`font-semibold mb-2 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          Skills
                        </h5>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {extractedData.skills.length} skills identified
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <button
                      onClick={handleUseExtractedData}
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Edit3 className="w-5 h-5" />
                      <span>Use This Data</span>
                    </button>
                    <button
                      onClick={resetUpload}
                      className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                        isDarkMode 
                          ? 'bg-slate-700 text-white hover:bg-slate-600' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {uploadStatus === 'error' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <h4 className={`text-lg font-semibold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Upload Failed
                  </h4>
                  <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {uploadError}
                  </p>
                  <button
                    onClick={resetUpload}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`text-center p-8 rounded-2xl border ${
            isDarkMode 
              ? 'bg-slate-900/30 border-slate-700' 
              : 'bg-white/50 border-gray-200'
          }`}
        >
          <h3 className={`text-xl font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Why Choose ResumeSurge?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'AI-Powered',
                description: 'Smart content suggestions and ATS optimization'
              },
              {
                icon: FileText,
                title: 'Professional Templates',
                description: '50+ industry-specific templates to choose from'
              },
              {
                icon: Download,
                title: 'Export Ready',
                description: 'Download in PDF format, perfectly formatted'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className={`font-semibold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {feature.title}
                  </h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumeCreationOptions;