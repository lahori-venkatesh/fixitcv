import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  RefreshCw,
  FileText,
  Eye,
  Zap,
  Award,
  BarChart3,
  Lightbulb,
  ArrowUp,
  ArrowDown,
  Minus,
  X
} from 'lucide-react';
import { ATSScore, ATSSuggestion, ResumeData } from '../types/resume';
import { calculateATSScore, getAutoFixes } from '../utils/atsScoring';

interface ATSScorePanelProps {
  resumeData: ResumeData;
  isDarkMode?: boolean;
  onSuggestionApply?: (suggestion: ATSSuggestion) => void;
  onAutoFix?: (fixes: { [key: string]: any }) => void;
}

const ATSScorePanel: React.FC<ATSScorePanelProps> = ({
  resumeData,
  isDarkMode = false,
  onSuggestionApply,
  onAutoFix
}) => {
  const [atsScore, setAtsScore] = useState<ATSScore | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Real ATS analysis function using our scoring system
  const analyzeResume = async () => {
    setIsAnalyzing(true);
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const score = calculateATSScore(resumeData);
      setAtsScore(score); // This can be null if insufficient content
    } catch (error) {
      console.error('Error calculating ATS score:', error);
      // Fallback to basic scoring if there's an error
      setAtsScore({
        overall: 50,
        breakdown: {
          formatting: 50,
          keywords: 50,
          sections: 50,
          readability: 50,
          atsCompatibility: 50
        },
        suggestions: [{
          id: 'error',
          type: 'critical',
          category: 'content',
          title: 'Analysis Error',
          description: 'Unable to complete full analysis',
          suggestion: 'Please try refreshing the analysis',
          impact: 'high'
        }],
        lastUpdated: new Date().toISOString()
      });
    }
    
    setIsAnalyzing(false);
  };

  // Auto-fix function
  const handleAutoFix = async () => {
    if (!onAutoFix || atsScore === null) return;
    
    setIsAnalyzing(true);
    
    try {
      const fixes = getAutoFixes(resumeData);
      
      // Show loading for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onAutoFix(fixes);
      
      // Re-analyze after fixes
      setTimeout(() => {
        analyzeResume();
      }, 500);
      
      // Show success message
      const successDiv = document.createElement('div');
      successDiv.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #10B981, #059669); color: white; padding: 20px 28px; border-radius: 16px; box-shadow: 0 20px 40px rgba(16, 185, 129, 0.4); z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 32px; height: 32px; background: rgba(255,255,255,0.25); border-radius: 50%; display: flex; align-items: center; justify-center;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
            <div>
              <div style="font-weight: 700; font-size: 16px; margin-bottom: 4px;">Auto-Fix Applied!</div>
              <div style="font-size: 14px; opacity: 0.95;">Your resume has been optimized for better ATS compatibility.</div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(successDiv);
      setTimeout(() => {
        if (document.body.contains(successDiv)) {
          document.body.removeChild(successDiv);
        }
      }, 4000);
      
    } catch (error) {
      console.error('Error applying auto-fixes:', error);
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    analyzeResume();
  }, [resumeData]);

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'critical': 
        return (
          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
            <AlertTriangle className="w-4 h-4 text-white" />
          </div>
        );
      case 'warning': 
        return (
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
            <Info className="w-4 h-4 text-white" />
          </div>
        );
      default: 
        return (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
        );
    }
  };

  const filteredSuggestions = selectedCategory === 'all' 
    ? atsScore?.suggestions || []
    : atsScore?.suggestions.filter(s => s.category === selectedCategory) || [];

  // Generate ATS report
  const generateATSReport = () => {
    if (!atsScore || atsScore === null) return '';
    
    const report = `
ATS COMPATIBILITY REPORT
Generated on: ${new Date().toLocaleDateString()}

OVERALL SCORE: ${atsScore.overall}/100

DETAILED BREAKDOWN:
- Formatting: ${atsScore.breakdown.formatting}/100
- Keywords: ${atsScore.breakdown.keywords}/100
- Sections: ${atsScore.breakdown.sections}/100
- Readability: ${atsScore.breakdown.readability}/100
- ATS Compatibility: ${atsScore.breakdown.atsCompatibility}/100

RECOMMENDATIONS:
${atsScore.suggestions.map((suggestion, index) => `
${index + 1}. ${suggestion.title} (${suggestion.impact.toUpperCase()} IMPACT)
   Issue: ${suggestion.description}
   Solution: ${suggestion.suggestion}
`).join('')}

NEXT STEPS:
1. Address all critical issues first
2. Implement suggested improvements
3. Re-run analysis to track progress
4. Test with different job descriptions

This report was generated by FixitCV's ATS Analysis Engine.
    `.trim();
    
    return report;
  };

  // Download report function
  const downloadReport = (report: string) => {
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ATS_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success message
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `
      <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #10B981, #059669); color: white; padding: 20px 28px; border-radius: 16px; box-shadow: 0 20px 40px rgba(16, 185, 129, 0.4); z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="font-weight: 700; font-size: 16px; margin-bottom: 4px;">Report Downloaded!</div>
        <div style="font-size: 14px; opacity: 0.95;">Your ATS analysis report has been saved.</div>
      </div>
    `;
    document.body.appendChild(successDiv);
    setTimeout(() => {
      if (document.body.contains(successDiv)) {
        document.body.removeChild(successDiv);
      }
    }, 3000);
  };

  if (isAnalyzing) {
    return (
      <div className={`relative overflow-hidden rounded-2xl border backdrop-blur-sm ${
        isDarkMode 
          ? 'bg-slate-900/95 border-slate-700/50 shadow-2xl' 
          : 'bg-white/95 border-blue-200/50 shadow-2xl'
      }`}>
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 animate-pulse" />
        </div>
        
        <div className="relative p-8">
          <div className="flex flex-col items-center space-y-6">
            {/* Animated Icon */}
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <RefreshCw className="w-8 h-8 text-white animate-spin" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl animate-pulse" />
            </div>
            
            {/* Text Content */}
            <div className="text-center">
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Analyzing Your Resume
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                Checking ATS compatibility and optimization...
              </p>
            </div>
            
            {/* Progress Dots */}
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

  // Show message when there's insufficient content for ATS analysis
  if (atsScore === null) {
    return (
      <div className={`relative overflow-hidden rounded-2xl border backdrop-blur-sm ${
        isDarkMode 
          ? 'bg-slate-900/95 border-slate-700/50 shadow-2xl' 
          : 'bg-white/95 border-blue-200/50 shadow-2xl'
      }`}>
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10" />
        
        <div className="relative p-8">
          <div className="flex flex-col items-center space-y-6 text-center">
            {/* Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-600/30 rounded-2xl flex items-center justify-center">
              <FileText className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            
            {/* Content */}
            <div>
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Ready to Analyze Your Resume?
              </h3>
              <p className={`text-base mb-4 max-w-md ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                To get an accurate ATS compatibility score, please fill out at least 3 sections of your resume:
              </p>
              
              {/* Checklist */}
              <div className="space-y-3 mb-6">
                {[
                  { 
                    label: 'Personal Information (Name & Email)', 
                    completed: !!(resumeData.personalInfo.firstName && resumeData.personalInfo.email) 
                  },
                  { 
                    label: 'Work Experience', 
                    completed: resumeData.experience.length > 0 
                  },
                  { 
                    label: 'Education', 
                    completed: resumeData.education.length > 0 
                  },
                  { 
                    label: 'Skills (at least 3)', 
                    completed: resumeData.skills.length >= 3 
                  },
                  { 
                    label: 'Professional Summary', 
                    completed: !!(resumeData.personalInfo.summary && resumeData.personalInfo.summary.length > 30) 
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      item.completed 
                        ? 'bg-green-500 text-white' 
                        : isDarkMode 
                          ? 'bg-slate-700 text-slate-400' 
                          : 'bg-gray-200 text-gray-400'
                    }`}>
                      {item.completed ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-current" />
                      )}
                    </div>
                    <span className={`text-sm ${
                      item.completed 
                        ? isDarkMode ? 'text-green-400' : 'text-green-600'
                        : isDarkMode ? 'text-slate-400' : 'text-gray-600'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                Complete any 3 sections above to unlock your ATS compatibility analysis
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!atsScore) return null;

  return (
    <div className="space-y-4">
      {/* Main Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-2xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-slate-900/95 border-slate-700/50 shadow-2xl' 
            : 'bg-white/95 border-blue-200/50 shadow-2xl'
        }`}
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10" />
        
        {/* Header */}
        <div className="relative p-6 border-b border-blue-200/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  ATS Compatibility Score
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  Real-time optimization analysis
                </p>
              </div>
            </div>
            <button
              onClick={analyzeResume}
              className={`p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-300' 
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
              }`}
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Score Display */}
        <div className="relative p-6">
          <div className="flex items-center justify-center mb-6">
            {/* Circular Progress */}
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                {/* Background Circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke={isDarkMode ? '#334155' : '#E2E8F0'}
                  strokeWidth="8"
                />
                {/* Progress Circle */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="url(#scoreGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: atsScore.overall / 100 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  style={{
                    pathLength: atsScore.overall / 100,
                    strokeDasharray: "314.16",
                    strokeDashoffset: 314.16 * (1 - atsScore.overall / 100)
                  }}
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Score Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-blue-700 bg-clip-text text-transparent"
                >
                  {atsScore.overall}
                </motion.div>
                <div className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  ATS Score
                </div>
              </div>
            </div>
          </div>

          {/* Score Status */}
          <div className="text-center mb-6">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className={`inline-flex items-center space-x-3 px-6 py-3 rounded-2xl text-sm font-bold shadow-lg border-2 ${
                atsScore.overall >= 80 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white border-green-400 shadow-green-200 dark:shadow-green-900/50'
                  : atsScore.overall >= 60 
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-yellow-400 shadow-yellow-200 dark:shadow-yellow-900/50'
                    : 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-400 shadow-red-200 dark:shadow-red-900/50'
              }`}
            >
              {atsScore.overall >= 80 ? (
                <>
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span>Excellent - Ready to Apply</span>
                </>
              ) : atsScore.overall >= 60 ? (
                <>
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <span>Good - Minor Improvements Needed</span>
                </>
              ) : (
                <>
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <span>Needs Improvement</span>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Score Breakdown */}
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
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Detailed Breakdown
            </h4>
          </div>
          
          <div className="space-y-4">
            {Object.entries(atsScore.breakdown).map(([key, score]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                    {key.replace(/([A-Z])/g, ' $1').trim().replace(/^\w/, c => c.toUpperCase())}
                  </span>
                  <div className="flex items-center space-x-2">
                    {score >= 80 ? (
                      <ArrowUp className="w-4 h-4 text-green-500" />
                    ) : score >= 60 ? (
                      <Minus className="w-4 h-4 text-yellow-500" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-bold ${
                      score >= 80 ? 'text-green-600 dark:text-green-400' :
                      score >= 60 ? 'text-yellow-600 dark:text-yellow-400' : 
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {score}%
                    </span>
                  </div>
                </div>
                <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
                  <motion.div
                    className={`h-2 rounded-full ${
                      score >= 80 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                      score >= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 
                      'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`rounded-2xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-slate-900/95 border-slate-700/50 shadow-xl' 
            : 'bg-white/95 border-blue-200/50 shadow-xl'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Optimization Suggestions
              </h4>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`text-sm px-4 py-2 rounded-xl border-2 transition-all duration-200 font-medium shadow-md ${
                isDarkMode 
                  ? 'bg-slate-800 border-slate-600 text-white focus:border-blue-500 hover:border-slate-500 focus:shadow-lg' 
                  : 'bg-white border-gray-300 focus:border-blue-500 hover:border-gray-400 focus:shadow-lg'
              }`}
            >
              <option value="all">🔍 All Categories</option>
              <option value="formatting">📝 Formatting</option>
              <option value="content">📄 Content</option>
              <option value="keywords">🔑 Keywords</option>
              <option value="structure">🏗️ Structure</option>
            </select>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {filteredSuggestions.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h5 className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                    Great Job!
                  </h5>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    No suggestions for this category. Your resume looks optimized!
                  </p>
                </motion.div>
              ) : (
                filteredSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-5 rounded-2xl border-l-4 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] ${
                      suggestion.type === 'critical' 
                        ? 'border-red-500 bg-gradient-to-r from-red-50 to-red-100/50 dark:from-red-900/30 dark:to-red-800/20 shadow-red-100 dark:shadow-red-900/20' :
                      suggestion.type === 'warning' 
                        ? 'border-yellow-500 bg-gradient-to-r from-yellow-50 to-yellow-100/50 dark:from-yellow-900/30 dark:to-yellow-800/20 shadow-yellow-100 dark:shadow-yellow-900/20' :
                        'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-800/20 shadow-blue-100 dark:shadow-blue-900/20'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {getSuggestionIcon(suggestion.type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {suggestion.title}
                          </h5>
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className={`text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wide shadow-md border ${
                              suggestion.impact === 'high' 
                                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-400 shadow-red-200 dark:shadow-red-900/50' :
                              suggestion.impact === 'medium' 
                                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-yellow-400 shadow-yellow-200 dark:shadow-yellow-900/50' :
                                'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-400 shadow-blue-200 dark:shadow-blue-900/50'
                            }`}
                          >
                            {suggestion.impact} impact
                          </motion.span>
                        </div>
                        <p className={`text-sm mb-3 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                          {suggestion.description}
                        </p>
                        <div className={`p-4 rounded-xl border-2 border-dashed ${
                          suggestion.type === 'critical' 
                            ? 'border-red-300 bg-red-50/50 dark:border-red-700 dark:bg-red-900/10' :
                          suggestion.type === 'warning' 
                            ? 'border-yellow-300 bg-yellow-50/50 dark:border-yellow-700 dark:bg-yellow-900/10' :
                            'border-blue-300 bg-blue-50/50 dark:border-blue-700 dark:bg-blue-900/10'
                        }`}>
                          <div className="flex items-start space-x-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                              suggestion.type === 'critical' 
                                ? 'bg-red-500' :
                              suggestion.type === 'warning' 
                                ? 'bg-yellow-500' :
                                'bg-blue-500'
                            }`}>
                              <Lightbulb className="w-3 h-3 text-white" />
                            </div>
                            <p className={`text-sm font-medium leading-relaxed ${isDarkMode ? 'text-slate-200' : 'text-gray-800'}`}>
                              {suggestion.suggestion}
                            </p>
                          </div>
                        </div>
                        {onSuggestionApply && (
                          <motion.button
                            onClick={() => onSuggestionApply(suggestion)}
                            className="mt-4 text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center space-x-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Zap className="w-4 h-4" />
                            <span>Apply Suggestion</span>
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`rounded-2xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-slate-900/95 border-slate-700/50 shadow-xl' 
            : 'bg-white/95 border-blue-200/50 shadow-xl'
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Actions
              </span>
            </div>
            <div className="flex space-x-2">
              <motion.button
                onClick={handleAutoFix}
                disabled={isAnalyzing || !onAutoFix || atsScore === null}
                className="text-xs bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border border-white border-t-transparent"></div>
                    <span>Fixing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3 h-3" />
                    <span>Auto-Fix Issues</span>
                  </>
                )}
              </motion.button>
              <motion.button
                onClick={() => {
                  // Generate and download ATS report
                  const report = generateATSReport();
                  downloadReport(report);
                }}
                className="text-xs bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium flex items-center space-x-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-3 h-3" />
                <span>Generate Report</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ATSScorePanel;