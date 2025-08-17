import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Star, 
  Award, 
  Building, 
  Lock, 
  Unlock, 
  FileText, 
  Download, 
  Edit, 
  Eye,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Info,
  Zap,
  Target,
  TrendingUp,
  Users,
  Heart,
  CreditCard,
  ChevronDown,
  Filter
} from 'lucide-react';
import { ResumeTemplate } from '../types/resume';
import { detectPremiumInstitution, DetectedInstitution } from '../utils/institutionDetector';
import { ResumeData } from '../types/resume';

interface TemplateAccessControlProps {
  resumeData: ResumeData;
  isDarkMode?: boolean;
  onTemplateSelect?: (template: ResumeTemplate) => void;
  onUpgrade?: () => void;
}

interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  accessLevel: 'free' | 'premium' | 'elite';
  templates: ResumeTemplate[];
}

const TemplateAccessControl: React.FC<TemplateAccessControlProps> = ({
  resumeData,
  isDarkMode = false,
  onTemplateSelect,
  onUpgrade
}) => {
  const [detectedInstitution, setDetectedInstitution] = useState<DetectedInstitution | null>(null);
  const [userTier, setUserTier] = useState<'tier1' | 'tier2' | 'tier3' | 'tier4'>('tier4');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Detect institution when resume data changes
  useEffect(() => {
    if (resumeData.education.length > 0) {
      setIsAnalyzing(true);
      
      setTimeout(() => {
        const detection = detectPremiumInstitution(resumeData);
        setDetectedInstitution(detection);
        
        if (detection.type && detection.confidence >= 0.6) {
          setUserTier('tier1');
        } else if (detection.confidence >= 0.3) {
          setUserTier('tier2');
        } else if (detection.confidence > 0) {
          setUserTier('tier3');
        } else {
          setUserTier('tier4');
        }
        
        setIsAnalyzing(false);
      }, 1500);
    }
  }, [resumeData.education]);

  // Mock template data - in real app, this would come from API
  const templateCategories: TemplateCategory[] = [
    {
      id: 'free',
      name: 'Free Templates',
      description: 'Professional templates available to all users',
      icon: Building,
      accessLevel: 'free',
      templates: [
        {
          id: 'modern-professional',
          name: 'Modern Professional',
          preview: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
          type: 'professional',
          country: 'IN',
          description: 'Clean, modern professional template',
          features: ['ATS Friendly', 'Professional Layout', 'Easy Customization'],
          colors: { primary: '#2563eb', secondary: '#1e40af', accent: '#3b82f6' },
          layout: 'single-column',
          style: 'modern',
          tier: 'free',
          atsScore: 95,
          category: 'Professional',
          institution: 'General',
          institutionName: 'Standard',
          creatorProfile: {
            name: 'ResumeSurge Team',
            batch: '2024',
            branch: 'Professional',
            company: 'ResumeSurge',
            position: 'Design Team',
            verified: true
          },
          downloadCount: 15420,
          rating: 4.8,
          price: 0,
          isVerified: true,
          createdAt: '2024-01-01'
        },
        {
          id: 'classic-executive',
          name: 'Classic Executive',
          preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
          type: 'executive',
          country: 'IN',
          description: 'Traditional executive resume format',
          features: ['Executive Style', 'ATS Optimized', 'Professional Layout'],
          colors: { primary: '#1f2937', secondary: '#374151', accent: '#6b7280' },
          layout: 'single-column',
          style: 'classic',
          tier: 'free',
          atsScore: 92,
          category: 'Executive',
          institution: 'General',
          institutionName: 'Standard',
          creatorProfile: {
            name: 'ResumeSurge Team',
            batch: '2024',
            branch: 'Executive',
            company: 'ResumeSurge',
            position: 'Design Team',
            verified: true
          },
          downloadCount: 8920,
          rating: 4.7,
          price: 0,
          isVerified: true,
          createdAt: '2024-01-05'
        }
      ]
    },
    {
      id: 'premium',
      name: 'Premium Templates',
      description: 'Advanced templates with enhanced features',
      icon: Star,
      accessLevel: 'premium',
      templates: [
        {
          id: 'nit-premium',
          name: 'NIT Premium - Tech Excellence',
          preview: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=500&fit=crop',
          type: 'tech',
          country: 'IN',
          description: 'Premium NIT-focused resume template',
          features: ['NIT Optimized', 'ATS Score: 97%', 'Tech Focus', 'Premium Design'],
          colors: { primary: '#7c3aed', secondary: '#8b5cf6', accent: '#a78bfa' },
          layout: 'single-column',
          style: 'modern',
          tier: 'premium',
          atsScore: 97,
          category: 'Engineering',
          institution: 'NIT',
          institutionName: 'NIT Trichy',
          creatorProfile: {
            name: 'Prof. Anjali Sharma',
            batch: '2019-2023',
            branch: 'Computer Science Engineering',
            company: 'Microsoft',
            position: 'Senior Software Engineer',
            verified: true
          },
          downloadCount: 2847,
          rating: 4.9,
          price: 199,
          isVerified: true,
          createdAt: '2024-01-20'
        }
      ]
    },
    {
      id: 'elite',
      name: 'Elite Templates',
      description: 'Exclusive templates for top institutions',
      icon: Crown,
      accessLevel: 'elite',
      templates: [
        {
          id: 'iit-premium',
          name: 'IIT Elite - Engineering Excellence',
          preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
          type: 'tech',
          country: 'IN',
          description: 'Premium engineering resume template from IIT Bombay',
          features: ['ATS Score: 98%', 'Research Focus', 'Technical Leadership', 'IIT Verified'],
          colors: { primary: '#1e40af', secondary: '#3b82f6', accent: '#60a5fa' },
          layout: 'single-column',
          style: 'academic',
          tier: 'elite',
          atsScore: 98,
          category: 'Engineering',
          institution: 'IIT',
          institutionName: 'IIT Bombay',
          creatorProfile: {
            name: 'Dr. Rajesh Kumar',
            batch: '2018-2022',
            branch: 'Computer Science Engineering',
            company: 'Google',
            position: 'Senior Software Engineer',
            verified: true
          },
          downloadCount: 3247,
          rating: 4.95,
          price: 299,
          isVerified: true,
          createdAt: '2024-01-15'
        }
      ]
    }
  ];

  const getAccessLevel = (category: TemplateCategory) => {
    switch (userTier) {
      case 'tier1':
        return 'full';
      case 'tier2':
        return category.accessLevel === 'free' ? 'full' : 'limited';
      case 'tier3':
        return category.accessLevel === 'free' ? 'full' : 'upgrade';
      default:
        return category.accessLevel === 'free' ? 'full' : 'upgrade';
    }
  };

  const getTierInfo = (tier: string) => {
    switch (tier) {
      case 'tier1':
        return {
          title: 'Tier 1 Institution',
          description: 'Full access to all templates',
          color: 'from-purple-600 to-blue-600',
          icon: Crown,
          badge: 'Elite Access'
        };
      case 'tier2':
        return {
          title: 'Tier 2 Institution',
          description: 'Access to free and premium templates',
          color: 'from-blue-600 to-green-600',
          icon: Star,
          badge: 'Premium Access'
        };
      case 'tier3':
        return {
          title: 'Tier 3 Institution',
          description: 'Access to free templates',
          color: 'from-green-600 to-yellow-600',
          icon: Award,
          badge: 'Standard Access'
        };
      default:
        return {
          title: 'Tier 4 Institution',
          description: 'Access to free templates',
          color: 'from-gray-600 to-slate-600',
          icon: Building,
          badge: 'Basic Access'
        };
    }
  };

  const filteredCategories = selectedCategory === 'all' 
    ? templateCategories 
    : templateCategories.filter(cat => cat.id === selectedCategory);

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
                <Building className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl animate-pulse" />
            </div>
            
            <div className="text-center">
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Analyzing Your Institution
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                Determining template access level...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tierInfo = getTierInfo(userTier);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* User Tier Information */}
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
        
        <div className="relative p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${tierInfo.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                <tierInfo.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {tierInfo.title}
                </h3>
                <p className={`text-base sm:text-lg ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  {tierInfo.description}
                </p>
              </div>
            </div>
            
            <div className={`px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${tierInfo.color} text-white shadow-lg text-center sm:text-left`}>
              {tierInfo.badge}
            </div>
          </div>

          {detectedInstitution?.type && (
            <div className={`p-4 rounded-xl border-2 ${
              detectedInstitution.type === 'IIT' ? 'border-red-200 bg-red-50/50 dark:border-red-700 dark:bg-red-900/10' :
              detectedInstitution.type === 'NIT' ? 'border-blue-200 bg-blue-50/50 dark:border-blue-700 dark:bg-blue-900/10' :
              detectedInstitution.type === 'IIM' ? 'border-green-200 bg-green-50/50 dark:border-green-700 dark:bg-green-900/10' :
              'border-purple-200 bg-purple-50/50 dark:border-purple-700 dark:bg-purple-900/10'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  detectedInstitution.type === 'IIT' ? 'bg-red-500' :
                  detectedInstitution.type === 'NIT' ? 'bg-blue-500' :
                  detectedInstitution.type === 'IIM' ? 'bg-green-500' :
                  'bg-purple-500'
                }`}>
                  <Building className="w-4 h-4 text-white" />
                </div>
                <div className="text-center sm:text-left">
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
        </div>
      </motion.div>

      {/* Mobile Filter Toggle */}
      <div className="block sm:hidden">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
            isDarkMode 
              ? 'bg-slate-900/95 border-slate-700/50' 
              : 'bg-white/95 border-blue-200/50'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filter Templates</span>
          </div>
          <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${showMobileFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`rounded-2xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-slate-900/95 border-slate-700/50 shadow-xl' 
            : 'bg-white/95 border-blue-200/50 shadow-xl'
        } ${showMobileFilters ? 'block sm:block' : 'hidden sm:block'}`}
      >
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Template Categories
                </h4>
                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  Choose from available templates based on your access level
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 sm:px-4 py-2 rounded-xl border-2 transition-all duration-200 text-sm sm:text-base ${
                selectedCategory === 'all'
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-300'
                  : isDarkMode
                    ? 'border-slate-600 text-slate-300 hover:bg-slate-800'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              All Categories
            </button>
            {templateCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 sm:px-4 py-2 rounded-xl border-2 transition-all duration-200 flex items-center space-x-2 text-sm sm:text-base ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-300'
                    : isDarkMode
                      ? 'border-slate-600 text-slate-300 hover:bg-slate-800'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                {category.accessLevel === 'elite' && <Crown className="w-4 h-4 text-yellow-500" />}
                {category.accessLevel === 'premium' && <Star className="w-4 h-4 text-blue-500" />}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Templates Grid */}
      <div className="space-y-6">
        {filteredCategories.map((category) => {
          const accessLevel = getAccessLevel(category);
          
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`rounded-2xl border backdrop-blur-sm ${
                isDarkMode 
                  ? 'bg-slate-900/95 border-slate-700/50 shadow-xl' 
                  : 'bg-white/95 border-blue-200/50 shadow-xl'
              }`}
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${
                      category.accessLevel === 'elite' ? 'from-purple-500 to-blue-600' :
                      category.accessLevel === 'premium' ? 'from-blue-500 to-green-600' :
                      'from-green-500 to-blue-600'
                    } rounded-lg flex items-center justify-center`}>
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {category.name}
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                        {category.description}
                      </p>
                    </div>
                  </div>
                  
                  {accessLevel === 'upgrade' && (
                    <div className="flex items-center space-x-2">
                      <Lock className="w-5 h-5 text-slate-400" />
                      <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Requires Upgrade
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {category.templates.map((template, index) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`group rounded-xl border overflow-hidden hover:shadow-xl transition-all duration-300 ${
                        isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'
                      }`}
                    >
                      {/* Template Preview */}
                      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                        <img
                          src={template.preview}
                          alt={template.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        
                        {/* Tier Badge */}
                        <div className="absolute top-2 left-2 flex items-center space-x-1 bg-white/90 dark:bg-slate-900/90 px-2 py-1 rounded-full text-xs">
                          {template.tier === 'elite' ? (
                            <Crown className="w-3 h-3 text-yellow-500" />
                          ) : template.tier === 'premium' ? (
                            <Star className="w-3 h-3 text-blue-500" />
                          ) : (
                            <Building className="w-3 h-3 text-green-500" />
                          )}
                          <span className="font-medium capitalize">{template.tier}</span>
                        </div>

                        {/* ATS Score Badge */}
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          {template.atsScore}% ATS
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute bottom-2 left-2 right-2 flex flex-col sm:flex-row gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {accessLevel === 'full' ? (
                            <>
                              <button
                                onClick={() => onTemplateSelect?.(template)}
                                className="flex-1 bg-white/95 dark:bg-slate-900/95 text-gray-900 dark:text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-white dark:hover:bg-slate-900 transition-colors flex items-center justify-center space-x-1 shadow-lg"
                              >
                                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">Preview</span>
                                <span className="sm:hidden">View</span>
                              </button>
                              <button
                                onClick={() => onTemplateSelect?.(template)}
                                className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 shadow-lg"
                              >
                                <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>Use</span>
                              </button>
                            </>
                          ) : accessLevel === 'limited' ? (
                            <button
                              onClick={() => onTemplateSelect?.(template)}
                              className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 shadow-lg"
                            >
                              <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>Use</span>
                            </button>
                          ) : (
                            <button
                              onClick={onUpgrade}
                              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-colors flex items-center justify-center space-x-1 shadow-lg"
                            >
                              <Crown className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>Upgrade</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Template Info */}
                      <div className="p-3 sm:p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-sm sm:text-lg leading-tight line-clamp-2">{template.name}</h3>
                          <div className="flex items-center space-x-1 text-yellow-500 flex-shrink-0 ml-2">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                            <span className="text-xs sm:text-sm font-medium">{template.rating}</span>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {template.description}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="flex items-center space-x-1">
                              <Download className="w-3 h-3" />
                              <span className="hidden sm:inline">{template.downloadCount.toLocaleString()}</span>
                              <span className="sm:hidden">{template.downloadCount > 1000 ? `${(template.downloadCount/1000).toFixed(1)}k` : template.downloadCount}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Target className="w-3 h-3" />
                              <span className="hidden sm:inline">{template.atsScore}% ATS</span>
                              <span className="sm:hidden">{template.atsScore}%</span>
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        {template.price > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Price:</span>
                              <span className="text-sm sm:text-lg font-bold text-green-600 dark:text-green-400">
                                ₹{template.price}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Upgrade CTA */}
      {userTier !== 'tier1' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-2xl border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-700/50 shadow-xl' 
              : 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 shadow-xl'
          }`}
        >
          <div className="p-6 sm:p-8 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
              <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            
            <h3 className={`text-xl sm:text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Unlock Premium Templates
            </h3>
            <p className={`text-base sm:text-lg mb-6 max-w-2xl mx-auto ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
              Get access to elite institution templates, advanced ATS scoring, and premium features to create a standout resume.
            </p>
            
            <motion.button
              onClick={onUpgrade}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg transform hover:scale-105 flex items-center space-x-2 sm:space-x-3 mx-auto text-sm sm:text-base"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Crown className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Upgrade to Premium</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TemplateAccessControl;
