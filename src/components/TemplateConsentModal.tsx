import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Crown, 
  Star, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  ArrowRight,
  Building,
  Users,
  Award,
  Shield,
  Lock,
  Unlock,
  Download,
  Edit,
  Eye,
  Zap,
  TrendingUp,
  Target,
  FileText,
  CreditCard,
  GraduationCap,
  Globe,
  Award as AwardIcon
} from 'lucide-react';
import { ResumeData } from '../types/resume';
import { detectPremiumInstitution } from '../utils/institutionDetector';

interface TemplateConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
  isDarkMode?: boolean;
  onConsentGiven?: (consent: boolean, templateData?: any) => void;
}

const TemplateConsentModal: React.FC<TemplateConsentModalProps> = ({
  isOpen,
  onClose,
  resumeData,
  isDarkMode = false,
  onConsentGiven
}) => {
  const [consentStep, setConsentStep] = useState<'initial' | 'details' | 'benefits' | 'final'>('initial');
  const [consentGiven, setConsentGiven] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('professional');
  const [selectedTier, setSelectedTier] = useState('premium');

  const detectedInstitution = detectPremiumInstitution(resumeData);
  const isPremiumInstitution = detectedInstitution.type && detectedInstitution.confidence >= 0.6;

  const templateCategories = [
    { id: 'professional', name: 'Professional', icon: Building },
    { id: 'academic', name: 'Academic', icon: GraduationCap },
    { id: 'creative', name: 'Creative', icon: Star },
    { id: 'executive', name: 'Executive', icon: Crown },
    { id: 'technical', name: 'Technical', icon: Zap },
    { id: 'research', name: 'Research', icon: Target }
  ];

  const templateTiers = [
    { id: 'premium', name: 'Premium', icon: Star, price: '₹99-199', description: 'Standard premium template' },
    { id: 'elite', name: 'Elite', icon: Crown, price: '₹199-299', description: 'High-value institution template' },
    { id: 'exclusive', name: 'Exclusive', icon: AwardIcon, price: '₹299-499', description: 'Rare, highly sought template' }
  ];

  const handleConsent = (consent: boolean) => {
    if (consent) {
      if (consentStep === 'initial') {
        setConsentStep('details');
      } else if (consentStep === 'details') {
        setConsentStep('benefits');
      } else if (consentStep === 'benefits') {
        setConsentStep('final');
      } else {
        // Final consent
        setConsentGiven(true);
        const templateData = {
          name: templateName,
          description: templateDescription,
          category: selectedCategory,
          tier: selectedTier,
          institution: detectedInstitution.type,
          institutionName: detectedInstitution.name,
          creatorProfile: {
            name: `${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}`,
            batch: resumeData.education[0]?.endDate || '2024',
            branch: resumeData.education[0]?.field || 'Engineering',
            company: resumeData.experience[0]?.company || 'Student',
            position: resumeData.experience[0]?.position || 'Student',
            verified: true
          }
        };
        onConsentGiven?.(true, templateData);
        onClose();
      }
    } else {
      onConsentGiven?.(false);
      onClose();
    }
  };

  const getInstitutionBadge = (institution: string) => {
    const badges = {
      IIT: { color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300', icon: '🏛️' },
      NIT: { color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300', icon: '🎓' },
      IIM: { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300', icon: '💼' },
      IISc: { color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300', icon: '🔬' }
    };
    return badges[institution as keyof typeof badges] || badges.IIT;
  };

  const renderStep = () => {
    switch (consentStep) {
      case 'initial':
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Heart className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Premium Template Opportunity</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
              Your resume has been identified as a potential premium template! Share it to help other students succeed.
            </p>

            {isPremiumInstitution && (
              <div className={`p-4 rounded-xl border-2 mb-6 ${
                detectedInstitution.type === 'IIT' ? 'border-red-200 bg-red-50/50 dark:border-red-700 dark:bg-red-900/10' :
                detectedInstitution.type === 'NIT' ? 'border-blue-200 bg-blue-50/50 dark:border-blue-700 dark:bg-blue-900/10' :
                detectedInstitution.type === 'IIM' ? 'border-green-200 bg-green-50/50 dark:border-green-700 dark:bg-green-900/10' :
                'border-purple-200 bg-purple-50/50 dark:border-purple-700 dark:bg-purple-900/10'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    detectedInstitution.type === 'IIT' ? 'bg-red-500' :
                    detectedInstitution.type === 'NIT' ? 'bg-blue-500' :
                    detectedInstitution.type === 'IIM' ? 'bg-green-500' :
                    'bg-purple-500'
                  }`}>
                    <Building className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {detectedInstitution.type} Institution Detected
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {detectedInstitution.name} - Premium tier access
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl border-2 border-green-200 bg-green-50/50 dark:border-green-700 dark:bg-green-900/10">
                <div className="flex items-center space-x-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-green-700 dark:text-green-300">What You Get</span>
                </div>
                <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
                  <li>• Recognition as template creator</li>
                  <li>• Revenue sharing from sales</li>
                  <li>• Portfolio enhancement</li>
                  <li>• Community contribution</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl border-2 border-blue-200 bg-blue-50/50 dark:border-blue-700 dark:bg-blue-900/10">
                <div className="flex items-center space-x-3 mb-2">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold text-blue-700 dark:text-blue-300">Privacy Protected</span>
                </div>
                <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                  <li>• Personal info anonymized</li>
                  <li>• Company names removed</li>
                  <li>• Contact details hidden</li>
                  <li>• Professional focus only</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'details':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Template Details</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Customize how your template will appear to other users
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Template Name
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="e.g., NIT Professional - Frontend Developer"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-slate-800 border-slate-600 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 focus:border-blue-500'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                  placeholder="Describe what makes this template special..."
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-slate-800 border-slate-600 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 focus:border-blue-500'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {templateCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 flex items-center space-x-2 ${
                        selectedCategory === category.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-300'
                          : isDarkMode
                            ? 'border-slate-600 text-slate-300 hover:bg-slate-800'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <category.icon className="w-4 h-4" />
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Template Tier
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {templateTiers.map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedTier(tier.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        selectedTier === tier.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-300'
                          : isDarkMode
                            ? 'border-slate-600 text-slate-300 hover:bg-slate-800'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <tier.icon className="w-5 h-5" />
                          <div>
                            <div className="font-semibold">{tier.name}</div>
                            <div className="text-sm opacity-75">{tier.description}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{tier.price}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'benefits':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Your Benefits</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Here's what you'll receive as a template creator
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border-2 border-purple-200 bg-purple-50/50 dark:border-purple-700 dark:bg-purple-900/10">
                <div className="flex items-center space-x-3 mb-4">
                  <Crown className="w-8 h-8 text-purple-500" />
                  <h3 className="text-lg font-bold text-purple-700 dark:text-purple-300">Recognition</h3>
                </div>
                <ul className="space-y-2 text-purple-600 dark:text-purple-400">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Featured creator profile</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Portfolio showcase</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>LinkedIn integration</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Industry networking</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl border-2 border-green-200 bg-green-50/50 dark:border-green-700 dark:bg-green-900/10">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="w-8 h-8 text-green-500" />
                  <h3 className="text-lg font-bold text-green-700 dark:text-green-300">Revenue</h3>
                </div>
                <ul className="space-y-2 text-green-600 dark:text-green-400">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>30% revenue share</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Monthly payouts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Performance bonuses</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Referral rewards</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl border-2 border-blue-200 bg-blue-50/50 dark:border-blue-700 dark:bg-blue-900/10">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="w-8 h-8 text-blue-500" />
                  <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">Community</h3>
                </div>
                <ul className="space-y-2 text-blue-600 dark:text-blue-400">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Creator community access</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Mentorship opportunities</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Workshop invitations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Industry events</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl border-2 border-yellow-200 bg-yellow-50/50 dark:border-yellow-700 dark:bg-yellow-900/10">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="w-8 h-8 text-yellow-500" />
                  <h3 className="text-lg font-bold text-yellow-700 dark:text-yellow-300">Growth</h3>
                </div>
                <ul className="space-y-2 text-yellow-600 dark:text-yellow-400">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Skill development</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Portfolio building</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Career advancement</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Industry exposure</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'final':
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold">Ready to Share?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              You're about to contribute to the success of thousands of students. Your template will be carefully curated and presented professionally.
            </p>

            <div className="p-6 rounded-xl border-2 border-green-200 bg-green-50/50 dark:border-green-700 dark:bg-green-900/10">
              <h3 className="font-semibold text-green-700 dark:text-green-300 mb-3">Template Summary</h3>
              <div className="text-left space-y-2 text-green-600 dark:text-green-400">
                <div><strong>Name:</strong> {templateName}</div>
                <div><strong>Category:</strong> {templateCategories.find(c => c.id === selectedCategory)?.name}</div>
                <div><strong>Tier:</strong> {templateTiers.find(t => t.id === selectedTier)?.name}</div>
                <div><strong>Institution:</strong> {detectedInstitution.type} - {detectedInstitution.name}</div>
              </div>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              By clicking "I Consent", you agree to share your resume as an anonymized premium template
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-700' 
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="p-6">
              {renderStep()}

              <div className="flex space-x-3 mt-8">
                {consentStep === 'initial' ? (
                  <>
                    <button
                      onClick={() => handleConsent(false)}
                      className={`flex-1 px-6 py-3 rounded-xl border-2 transition-all duration-200 ${
                        isDarkMode 
                          ? 'border-slate-600 text-slate-300 hover:bg-slate-800' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Maybe Later
                    </button>
                    <button
                      onClick={() => handleConsent(true)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-semibold flex items-center justify-center space-x-2"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                ) : consentStep === 'final' ? (
                  <>
                    <button
                      onClick={() => setConsentStep('benefits')}
                      className={`flex-1 px-6 py-3 rounded-xl border-2 transition-all duration-200 ${
                        isDarkMode 
                          ? 'border-slate-600 text-slate-300 hover:bg-slate-800' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Back
                    </button>
                    <button
                      onClick={() => handleConsent(true)}
                      className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-semibold flex items-center justify-center space-x-2"
                    >
                      <Heart className="w-4 h-4" />
                      <span>Share as Premium Template</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setConsentStep(consentStep === 'details' ? 'initial' : 'details')}
                      className={`flex-1 px-6 py-3 rounded-xl border-2 transition-all duration-200 ${
                        isDarkMode 
                          ? 'border-slate-600 text-slate-300 hover:bg-slate-800' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Back
                    </button>
                    <button
                      onClick={() => handleConsent(true)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-semibold flex items-center justify-center space-x-2"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TemplateConsentModal;