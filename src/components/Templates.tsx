import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Download, 
  Eye, 
  Globe, 
  Users, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Building, 
  Stethoscope, 
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Zap,
  Crown,
  Sparkles,
  Check,
  FileText,
  Plus
} from 'lucide-react';
import Header from './Header';
import { resumeTemplates, countryFormats } from '../data/templates';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';

interface TemplatesProps {
  isDarkMode?: boolean;
  onNavigate?: (page: 'landing' | 'about' | 'pricing' | 'templates' | 'blog' | 'builder') => void;
  onToggleTheme?: () => void;
  onTemplateSelect?: (templateId: string) => void;
}

const Templates: React.FC<TemplatesProps> = ({ 
  isDarkMode = false, 
  onNavigate, 
  onToggleTheme,
  onTemplateSelect 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Templates', icon: Globe, count: resumeTemplates.length },
    { id: 'modern', label: 'Modern', icon: Lightbulb, count: resumeTemplates.filter(t => t.style === 'modern').length },
    { id: 'classic', label: 'Classic', icon: Star, count: resumeTemplates.filter(t => t.style === 'classic').length },
    { id: 'professional', label: 'Professional', icon: Building, count: resumeTemplates.filter(t => t.category === 'professional').length },
    { id: 'creative', label: 'Creative', icon: Heart, count: resumeTemplates.filter(t => t.category === 'creative').length },
  ];

  const filteredTemplates = resumeTemplates.filter(template => 
    selectedCategory === 'all' || 
    template.category === selectedCategory || 
    template.style === selectedCategory
  );

  const handleTemplateSelect = (templateId: string) => {
    localStorage.setItem('selectedTemplate', templateId);
    if (onTemplateSelect) {
      onTemplateSelect(templateId);
    }
    if (onNavigate) {
      onNavigate('builder');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-white via-gray-50 to-white text-gray-900'
    }`}>
      {/* Header */}
      <Header 
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        onNavigate={onNavigate}
        currentPage="templates"
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute top-0 left-0 w-full h-64 rounded-b-3xl filter blur-3xl opacity-10 ${
            isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
          }`} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              Professional Resume Templates
            </h1>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Select from our curated collection of ATS-optimized resume templates, designed for various industries and global hiring standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                Browse Categories
              </h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {filteredTemplates.length} Templates Available
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : isDarkMode
                          ? 'bg-slate-800 text-gray-300 border-slate-700 hover:bg-slate-700'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.label}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      selectedCategory === category.id
                        ? 'bg-blue-500 text-white'
                        : isDarkMode
                          ? 'bg-slate-700 text-gray-400'
                          : 'bg-gray-100 text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`group cursor-pointer rounded-xl border transition-all duration-300 hover:shadow-xl overflow-hidden ${
                  isDarkMode 
                    ? 'border-slate-700 bg-slate-800/50 hover:border-blue-500' 
                    : 'border-gray-200 bg-white hover:border-blue-500'
                }`}
              >
                {/* Template Preview */}
                <div className="aspect-[3/4] overflow-hidden relative">
                  {template.id === 'harvard-classic' ? (
                    <div className="w-full h-full bg-white p-6 text-xs">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-black mb-2">Jacob McLaren</h3>
                        <div className="flex justify-center items-center space-x-4 text-xs text-gray-600">
                          <span>📍 54 Dunster St, Cambridge, MA 02138</span>
                          <span>✉ mclaren@gmail.com</span>
                          <span>📞 555-555-5555</span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-sm font-bold text-black border-b border-black mb-2">EDUCATION</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-semibold">Harvard University, Extension School</span>
                            <span>May 2018</span>
                          </div>
                          <div className="italic">Master of Liberal Arts, Information Management Systems</div>
                          <div className="text-xs">• Dean's List Academic Achievement Award recipient</div>
                          <div className="text-xs">• Relevant coursework: Trends in Enterprise Information Systems</div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-sm font-bold text-black border-b border-black mb-2">PROFESSIONAL EXPERIENCE</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-semibold">STATE STREET CORPORATION</span>
                            <span>Sep 2011 – Jul 2013 | Boston, MA</span>
                          </div>
                          <div className="italic">Principal – Simulated Technology</div>
                          <div className="text-xs">• Led 8 cross functional, geographically dispersed teams</div>
                          <div className="text-xs">• Improved process efficiency 75% by standardizing workflow</div>
                          <div className="text-xs">• Reduced application testing time 30% by automating testing</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-black border-b border-black mb-2">TECHNICAL EXPERTISE</h4>
                        <div className="text-xs">MS Excel, PowerPoint, Relational Databases, Project Management, Quantitative Analysis, SQL, Java</div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3">
                    {template.tier === 'premium' ? (
                      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 shadow-md">
                        <Crown className="w-3 h-3" />
                        <span>PRO</span>
                      </div>
                    ) : (
                      <div className="bg-blue-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-md">
                        FREE
                      </div>
                    )}
                  </div>
                  <div className="absolute top-3 left-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg w-8 h-8 flex items-center justify-center text-lg shadow-sm">
                      🇺🇸
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <div className="bg-black/80 text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1">
                      <Zap className="w-3 h-3 text-blue-400" />
                      <span>{template.atsScore}%</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-3">
                      <motion.button 
                        className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-gray-100 transition-colors shadow-md"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye className="w-4 h-4" />
                        <span>Preview</span>
                      </motion.button>
                      <SignedOut>
                        <SignInButton mode="modal">
                          <motion.button 
                            onClick={() => handleTemplateSelect(template.id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-blue-700 transition-colors shadow-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span>Use Template</span>
                            <ArrowRight className="w-4 h-4" />
                          </motion.button>
                        </SignInButton>
                      </SignedOut>
                      <SignedIn>
                        <motion.button 
                          onClick={() => handleTemplateSelect(template.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-blue-700 transition-colors shadow-md"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>Use Template</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </SignedIn>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg leading-tight">{template.name}</h3>
                    <div className="flex items-center space-x-1 ml-2">
                      <Star className="w-4 h-4 text-blue-500 fill-current" />
                      <span className="text-sm text-gray-600">4.9</span>
                    </div>
                  </div>
                  <p className={`text-sm mb-4 leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.features.slice(0, 2).map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className={`px-3 py-1 rounded-md text-xs font-medium ${
                          isDarkMode 
                            ? 'bg-slate-700 text-gray-300' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {feature}
                      </span>
                    ))}
                    {template.features.length > 2 && (
                      <span className="px-3 py-1 rounded-md text-xs font j-medium bg-blue-100 text-blue-700">
                        +{template.features.length - 2} more
                      </span>
                    )}
                  </div>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <motion.button 
                        onClick={() => handleTemplateSelect(template.id)}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2.5 rounded-lg font-medium hover:from-blue-700 hover:to-blue-900 transition-colors flex items-center justify-center space-x-2 shadow-md"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Use This Template</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <motion.button 
                      onClick={() => handleTemplateSelect(template.id)}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2.5 rounded-lg font-medium hover:from-blue-700 hover:to-blue-900 transition-colors flex items-center justify-center space-x-2 shadow-md"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Use This Template</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </SignedIn>
                </div>
              </motion.div>
            ))}
          </div>
          {filteredTemplates.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                isDarkMode ? 'bg-slate-800' : 'bg-gray-100'
              }`}>
                <FileText className={`w-8 h-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <h3 className="text-lg font-medium mb-2">No Templates Found</h3>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Try adjusting your category selection
              </p>
              <motion.button
                onClick={() => setSelectedCategory('all')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Reset Filters
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-slate-700 ${
        isDarkMode ? 'bg-slate-900/30' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Templates</h2>
            <p className={`text-lg max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Our templates are crafted to maximize your chances of landing your dream job
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "ATS-Optimized",
                description: "Designed to pass Applicant Tracking Systems with a 99% success rate"
              },
              {
                icon: Globe,
                title: "Global Standards",
                description: "Formats tailored to meet regional hiring practices and expectations"
              },
              {
                icon: CheckCircle,
                title: "Proven Success",
                description: "Trusted by over 2.5M professionals to secure their ideal roles"
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className={`text-center p-6 rounded-xl border ${
                    isDarkMode 
                      ? 'bg-slate-800/50 border-slate-700' 
                      : 'bg-white border-gray-200'
                  } shadow-sm hover:shadow-md`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`p-10 rounded-xl border ${
              isDarkMode 
                ? 'bg-gradient-to-br from-blue-900/20 to-slate-900/20 border-slate-700' 
                : 'bg-gradient-to-br from-blue-50 to-gray-50 border-gray-200'
            } shadow-lg`}
          >
            <Sparkles className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Create Your Winning Resume</h2>
            <p className={`text-lg mb-6 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Select a template and start building a resume that stands out to employers.
            </p>
            <SignedOut>
              <SignInButton mode="modal">
                <motion.button 
                  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-lg font-semibold text-base flex items-center space-x-2 mx-auto shadow-md hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Start Building Now</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <motion.button 
                onClick={() => onNavigate && onNavigate('builder')}
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-lg font-semibold text-base flex items-center space-x-2 mx-auto shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start Building Now</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </SignedIn>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Templates;