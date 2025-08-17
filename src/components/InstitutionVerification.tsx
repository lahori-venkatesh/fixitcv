import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
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
  Heart
} from 'lucide-react';
import { ResumeData } from '../types/resume';
import { detectPremiumInstitution, DetectedInstitution } from '../utils/institutionDetector';
import { useUser } from '@clerk/clerk-react';

interface InstitutionVerificationProps {
  resumeData: ResumeData;
  isDarkMode?: boolean;
  onTemplateAccess?: (hasAccess: boolean, institutionType?: string) => void;
  onConsentGiven?: (consent: boolean) => void;
}

const InstitutionVerification: React.FC<InstitutionVerificationProps> = ({
  resumeData,
  isDarkMode = false,
  onTemplateAccess,
  onConsentGiven
}) => {
  const [detectedInstitution, setDetectedInstitution] = useState<DetectedInstitution | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [userTier, setUserTier] = useState<'tier1' | 'tier2' | 'tier3' | 'tier4'>('tier4');
  const { user } = useUser();

  // Detect institution when resume data changes
  useEffect(() => {
    if (resumeData.education.length > 0) {
      setIsAnalyzing(true);
      
      // Simulate analysis time
      setTimeout(() => {
        const detection = detectPremiumInstitution(resumeData);
        setDetectedInstitution(detection);
        
        // Determine user tier
        if (detection.type && detection.confidence >= 0.6) {
          setUserTier('tier1');
          if (onTemplateAccess) {
            onTemplateAccess(true, detection.type);
          }
        } else {
          setUserTier('tier2');
          if (onTemplateAccess) {
            onTemplateAccess(false);
          }
        }
        
        setIsAnalyzing(false);
      }, 2000);
    }
  }, [resumeData.education, onTemplateAccess]);

  const getTierInfo = (tier: string) => {
    switch (tier) {
      case 'tier1':
        return {
          title: 'Tier 1 Institution',
          description: 'Premium access to all templates',
          color: 'from-purple-600 to-blue-600',
          icon: Crown,
          features: [
            'Access to all premium templates',
            'Real-time ATS scoring',
            'Advanced customization',
            'Priority support',
            'Template sharing consent'
          ]
        };
      case 'tier2':
        return {
          title: 'Tier 2 Institution',
          description: 'Access to standard templates',
          color: 'from-blue-600 to-green-600',
          icon: Star,
          features: [
            'Access to standard templates',
            'Basic ATS scoring',
            'Standard customization',
            'Community support'
          ]
        };
      case 'tier3':
        return {
          title: 'Tier 3 Institution',
          description: 'Basic template access',
          color: 'from-green-600 to-yellow-600',
          icon: Award,
          features: [
            'Basic template access',
            'Limited customization',
            'Community support'
          ]
        };
      default:
        return {
          title: 'Tier 4 Institution',
          description: 'Free template access',
          color: 'from-gray-600 to-slate-600',
          icon: Building,
          features: [
            'Free template access',
            'Basic features',
            'Community support'
          ]
        };
    }
  };

  const handleConsent = (consent: boolean) => {
    setConsentGiven(consent);
    setShowConsentModal(false);
    if (onConsentGiven) {
      onConsentGiven(consent);
    }
  };

  const tierInfo = getTierInfo(userTier);

  if (isAnalyzing) {
    return (
      <div className={`relative overflow-hidden rounded-2xl border backdrop-blur-sm ${
        isDarkMode 
          ? 'bg-slate-900/95 border-slate-700/50 shadow-2xl' 
          : 'bg-white/95 border-blue-200/50 shadow-2xl'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10" />
        <div className="relative p-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl animate-pulse" />
            </div>
            
            <div className="text-center">
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Analyzing Your Institution
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                Detecting institution tier and template access...
              </p>
            </div>
            
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Institution Detection Result */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-2xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-slate-900/95 border-slate-700/50 shadow-2xl' 
            : 'bg-white/95 border-blue-200/50 shadow-2xl'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10" />
        
        <div className="relative p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className={`w-16 h-16 bg-gradient-to-br ${tierInfo.color} rounded-2xl flex items-center justify-center shadow-lg`}>
              <tierInfo.icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {tierInfo.title}
              </h3>
              <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                {tierInfo.description}
              </p>
            </div>
          </div>

          {detectedInstitution?.type && (
            <div className={`p-4 rounded-xl border-2 ${
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
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Detected: {detectedInstitution.type} Institution
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    {detectedInstitution.name} (Confidence: {Math.round(detectedInstitution.confidence * 100)}%)
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <h4 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Your Access Level
            </h4>
            <div className="space-y-2">
              {tierInfo.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Template Access Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`rounded-2xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-slate-900/95 border-slate-700/50 shadow-xl' 
            : 'bg-white/95 border-blue-200/50 shadow-xl'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Template Access
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                Based on your institution tier
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Free Templates */}
            <div className={`p-4 rounded-xl border-2 ${
              isDarkMode ? 'border-slate-700 bg-slate-800/50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center space-x-3 mb-3">
                <Unlock className="w-5 h-5 text-green-500" />
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Free Templates
                </span>
              </div>
              <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                <li>• Basic professional templates</li>
                <li>• Standard customization</li>
                <li>• PDF export</li>
                <li>• Community support</li>
              </ul>
            </div>

            {/* Premium Templates */}
            <div className={`p-4 rounded-xl border-2 ${
              userTier === 'tier1' 
                ? 'border-purple-300 bg-purple-50/50 dark:border-purple-600 dark:bg-purple-900/10'
                : 'border-slate-300 bg-slate-50/50 dark:border-slate-600 dark:bg-slate-800/20'
            }`}>
              <div className="flex items-center space-x-3 mb-3">
                {userTier === 'tier1' ? (
                  <Crown className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Lock className="w-5 h-5 text-slate-400" />
                )}
                <span className={`font-semibold ${
                  userTier === 'tier1' 
                    ? 'text-purple-700 dark:text-purple-300'
                    : isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Premium Templates
                </span>
              </div>
              <ul className={`text-sm space-y-1 ${
                userTier === 'tier1' 
                  ? 'text-purple-600 dark:text-purple-400'
                  : isDarkMode ? 'text-slate-500' : 'text-slate-500'
              }`}>
                <li>• IIT, NIT, IIM, IISc templates</li>
                <li>• Advanced ATS scoring</li>
                <li>• Premium customization</li>
                <li>• Priority support</li>
                {userTier !== 'tier1' && (
                  <li className="text-red-500 font-medium">• Requires upgrade</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        {userTier === 'tier1' && (
          <motion.button
            onClick={() => setShowConsentModal(true)}
            className="flex-1 flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg transform hover:scale-105"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Heart className="w-5 h-5" />
            <span>Share as Premium Template</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        )}

        <motion.button
          onClick={() => {/* Navigate to templates */}}
          className="flex-1 flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-4 rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-200 font-semibold shadow-lg transform hover:scale-105"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <FileText className="w-5 h-5" />
          <span>Browse Templates</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        {userTier !== 'tier1' && (
          <motion.button
            onClick={() => {/* Navigate to pricing */}}
            className="flex-1 flex items-center justify-center space-x-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg transform hover:scale-105"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Crown className="w-5 h-5" />
            <span>Upgrade to Premium</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        )}
      </motion.div>

      {/* Consent Modal */}
      <AnimatePresence>
        {showConsentModal && (
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
              className={`w-full max-w-md rounded-2xl border shadow-2xl ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-700' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Premium Template Program
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                      Help other students succeed
                    </p>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border-2 ${
                  isDarkMode ? 'border-slate-600 bg-slate-800/50' : 'border-gray-200 bg-gray-50'
                }`}>
                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                    By joining our premium template program, your resume will be:
                  </p>
                  <ul className={`text-sm space-y-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Anonymized and used as a premium template</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Available to students from other institutions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>You'll receive recognition and rewards</span>
                    </li>
                  </ul>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => handleConsent(false)}
                    className={`flex-1 px-4 py-2 rounded-xl border-2 transition-all duration-200 ${
                      isDarkMode 
                        ? 'border-slate-600 text-slate-300 hover:bg-slate-800' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Maybe Later
                  </button>
                  <button
                    onClick={() => handleConsent(true)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-semibold"
                  >
                    I Consent
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InstitutionVerification;