import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Filter, Globe, Crown, Zap, Lightbulb, Building, Heart, Award, Briefcase, GraduationCap, Stethoscope, Star, FileText } from 'lucide-react';
import { resumeTemplates } from '../data/templates';
import { getTemplates } from '../lib/supabase';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplate, onTemplateSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [templates, setTemplates] = useState(resumeTemplates);
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch templates from Supabase
  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoading(true);
      try {
        const supabaseTemplates = await getTemplates();
        if (supabaseTemplates && supabaseTemplates.length > 0) {
          // Convert Supabase templates to the format expected by the app
          const formattedTemplates = supabaseTemplates.map(template => ({
            id: template.id,
            name: template.name,
            preview: template.preview,
            type: template.type,
            country: template.country,
            colors: template.colors,
            description: template.description,
            features: template.features,
            layout: template.layout,
            style: template.style,
            tier: template.tier,
            atsScore: template.ats_score,
            category: template.category
          }));
          setTemplates(formattedTemplates);
        }
      } catch (error) {
        console.error('Error fetching templates:', error);
        // Fallback to local templates if there's an error
        setTemplates(resumeTemplates);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTemplates();
  }, []);
  
  const categories = [
    { id: 'all', label: 'All Templates', icon: Globe, count: templates.length },
    { id: 'modern', label: 'Modern', icon: Lightbulb, count: templates.filter(t => t.style === 'modern').length },
    { id: 'classic', label: 'Classic', icon: Star, count: templates.filter(t => t.style === 'classic').length },
    { id: 'professional', label: 'Professional', icon: Building, count: templates.filter(t => t.category === 'professional').length },
    { id: 'creative', label: 'Creative', icon: Heart, count: templates.filter(t => t.category === 'creative').length },
  ];

  const filteredTemplates = templates.filter(template => {
    const categoryMatch = selectedCategory === 'all' || 
                         template.category === selectedCategory || 
                         template.style === selectedCategory;
    return categoryMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Template</h2>
        <p className="text-gray-600">
          Select a professional template for your resume
        </p>
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          Category
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
                <span className={`px-1.5 py-0.5 rounded text-xs ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Templates Grid */}
      {!isLoading && filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-lg group ${
                selectedTemplate === template.id
                  ? 'border-blue-500 bg-blue-50 shadow-md scale-105'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              onClick={() => onTemplateSelect(template.id)}
            >
              {/* Selected Check */}
              {selectedTemplate === template.id && (
                <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg z-10">
                  <Check className="w-4 h-4" />
                </div>
              )}

              {/* Template Preview Card */}
              <div className="aspect-[3/4] rounded-lg mb-3 relative overflow-hidden border border-gray-200">
                {/* Harvard Classic Template Preview */}
                {template.id === 'harvard-classic' ? (
                  <div className="w-full h-full bg-white p-4 text-xs">
                    {/* Header */}
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-bold text-black mb-1">Jacob McLaren</h3>
                      <div className="flex justify-center items-center space-x-2 text-xs text-gray-600">
                        <span>📍 54 Dunster St, Cambridge, MA 02138</span>
                        <span>✉ mclaren@gmail.com</span>
                        <span>📞 555-555-5555</span>
                      </div>
                    </div>
                    
                    {/* Education Section */}
                    <div className="mb-3">
                      <h4 className="text-sm font-bold text-black border-b border-black mb-1">EDUCATION</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="font-semibold">Harvard University, Extension School</span>
                          <span>May 2018</span>
                        </div>
                        <div className="italic">Master of Liberal Arts, Information Management Systems</div>
                        <div className="text-xs">• Dean's List Academic Achievement Award recipient</div>
                      </div>
                    </div>
                    
                    {/* Experience Section */}
                    <div className="mb-3">
                      <h4 className="text-sm font-bold text-black border-b border-black mb-1">PROFESSIONAL EXPERIENCE</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="font-semibold">STATE STREET CORPORATION</span>
                          <span>Sep 2011 – Jul 2013 | Boston, MA</span>
                        </div>
                        <div className="italic">Principal – Simulated Technology</div>
                        <div className="text-xs">• Led 8 cross functional, geographically dispersed teams</div>
                        <div className="text-xs">• Improved process efficiency 75% by standardizing workflow</div>
                      </div>
                    </div>
                    
                    {/* Skills Section */}
                    <div>
                      <h4 className="text-sm font-bold text-black border-b border-black mb-1">TECHNICAL EXPERTISE</h4>
                      <div className="text-xs">MS Excel, PowerPoint, Relational Databases, Project Management</div>
                    </div>
                  </div>
                ) : (
                  /* Default Template Preview */
                  <div 
                    className="w-full h-full rounded-md border border-gray-100"
                    style={{ 
                      background: `linear-gradient(135deg, ${template.colors.primary}10, ${template.colors.accent}10)`
                    }}
                  >
                    <div className="p-3 h-full flex flex-col">
                      {/* Header */}
                      <div className="space-y-1.5 mb-4">
                        <div 
                          className="h-2.5 rounded"
                          style={{ backgroundColor: template.colors.primary, width: '75%' }}
                        />
                        <div 
                          className="h-1.5 rounded"
                          style={{ backgroundColor: template.colors.secondary, width: '55%' }}
                        />
                        <div className="h-1 bg-gray-200 rounded w-2/3" />
                      </div>
                      
                      {/* Content Sections */}
                      <div className="space-y-3 flex-1">
                        <div>
                          <div 
                            className="h-1.5 rounded mb-1.5"
                            style={{ backgroundColor: template.colors.accent, width: '45%' }}
                          />
                          <div className="space-y-1">
                            <div className="h-1 bg-gray-200 rounded w-full" />
                            <div className="h-1 bg-gray-200 rounded w-4/5" />
                            <div className="h-1 bg-gray-200 rounded w-3/5" />
                          </div>
                        </div>
                        
                        <div>
                          <div 
                            className="h-1.5 rounded mb-1.5"
                            style={{ backgroundColor: template.colors.accent, width: '40%' }}
                          />
                          <div className="space-y-1">
                            <div className="h-1 bg-gray-200 rounded w-4/5" />
                            <div className="h-1 bg-gray-200 rounded w-3/5" />
                          </div>
                        </div>

                        <div>
                          <div 
                            className="h-1.5 rounded mb-1.5"
                            style={{ backgroundColor: template.colors.accent, width: '35%' }}
                          />
                          <div className="space-y-1">
                            <div className="h-1 bg-gray-200 rounded w-3/5" />
                            <div className="h-1 bg-gray-200 rounded w-2/5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tier Badge */}
                <div className="absolute top-2 right-2">
                  {template.tier === 'premium' ? (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center space-x-1 shadow-sm">
                      <Crown className="w-3 h-3" />
                      <span>PRO</span>
                    </div>
                  ) : (
                    <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">
                      FREE
                    </div>
                  )}
                </div>

                {/* ATS Score */}
                <div className="absolute bottom-2 right-2">
                  <div className="bg-black/85 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1 shadow-sm">
                    <Zap className="w-3 h-3 text-green-400" />
                    <span>{template.atsScore}%</span>
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div className="text-center space-y-2">
                <h3 className={`font-semibold text-base ${
                  selectedTemplate === template.id ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {template.name}
                </h3>
                
                <div className="flex items-center justify-center space-x-2 text-xs">
                  <span className={`px-2 py-1 rounded-full ${
                    selectedTemplate === template.id 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {template.style}
                  </span>
                  <span className={`px-2 py-1 rounded-full ${
                    selectedTemplate === template.id 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {template.layout}
                  </span>
                </div>

                <p className={`text-sm leading-relaxed ${
                  selectedTemplate === template.id ? 'text-blue-700' : 'text-gray-600'
                }`}>
                  {template.description}
                </p>

                {/* Color Palette */}
                <div className="flex justify-center space-x-1.5 pt-2">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: template.colors.primary }}
                    title="Primary Color"
                  />
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: template.colors.secondary }}
                    title="Secondary Color"
                  />
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: template.colors.accent }}
                    title="Accent Color"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : !isLoading && (
        /* Empty State */
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">No Templates Found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            No templates match your current filter selection.
          </p>
        </motion.div>
      )}

      {/* Selected Template Info */}
      {selectedTemplate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-blue-900">
                {templates.find(t => t.id === selectedTemplate)?.name} Selected
              </h4>
              <p className="text-blue-700 text-sm">
                Template ready to use. Customize colors and fonts in the next step.
              </p>
            </div>
            <div className="text-xl">
              🇺🇸
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TemplateSelector;