import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Download, 
  Eye, 
  Shield, 
  TrendingUp, 
  Filter,
  Search,
  Crown,
  Award,
  Users,
  Edit,
  Play
} from 'lucide-react';
import { ResumeTemplate } from '../types/resume';
import { useUser } from '@clerk/clerk-react';
import TemplatePreviewImage from './TemplatePreviewImage';

interface PremiumTemplateGalleryProps {
  onTemplateEdit: (template: ResumeTemplate) => void;
  onTemplatePreview: (template: ResumeTemplate) => void;
  isDarkMode?: boolean;
}

const PremiumTemplateGallery: React.FC<PremiumTemplateGalleryProps> = ({
  onTemplateEdit,
  onTemplatePreview,
  isDarkMode = false
}) => {
  const [templates, setTemplates] = useState<ResumeTemplate[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<ResumeTemplate[]>([]);
  const [selectedInstitution, setSelectedInstitution] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'downloads' | 'newest'>('rating');
  const { user } = useUser();

  // Premium templates data - All premium institution templates
  useEffect(() => {
    const mockTemplates: ResumeTemplate[] = [
      {
        id: 'nit-premium',
        name: 'NIT Professional - Frontend Developer',
        preview: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face',
        type: 'tech',
        country: 'IN',
        description: 'Professional frontend developer resume from NIT Jaipur student with real project experience',
        features: ['React.js Expert', 'ATS Score: 96%', 'Real Projects', 'Technical Skills', 'Clean Professional Layout'],
        colors: { primary: '#000000', secondary: '#333333', accent: '#666666' },
        layout: 'single-column',
        style: 'professional',
        tier: 'elite',
        atsScore: 96,
        category: 'Frontend Development',
        institution: 'NIT',
        institutionName: 'NIT Jaipur',
        creatorProfile: {
          name: 'Lahori Venkatesh',
          batch: '2022-2026',
          branch: 'Metallurgy and Materials Engineering',
          company: 'The Social Artist Startup',
          position: 'Frontend Developer',
          verified: true
        },
        downloadCount: 2847,
        rating: 4.9,
        price: 199,
        isVerified: true,
        createdAt: '2024-01-20'
      },
      {
        id: 'iit-premium',
        name: 'IIT Elite - Engineering Excellence',
        preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face',
        type: 'tech',
        country: 'IN',
        description: 'Premium engineering resume template from IIT Bombay with research focus and technical leadership',
        features: ['ATS Score: 98%', 'Research Focus', 'Technical Leadership', 'IIT Verified', 'Publication Ready'],
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
      },
      {
        id: 'iim-premium',
        name: 'IIM Executive - Business Leadership',
        preview: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face',
        type: 'executive',
        country: 'IN',
        description: 'Executive business resume template from IIM Ahmedabad with strategic thinking and leadership focus',
        features: ['ATS Score: 97%', 'Leadership Focus', 'Strategic Thinking', 'IIM Verified', 'Business Excellence'],
        colors: { primary: '#059669', secondary: '#10b981', accent: '#34d399' },
        layout: 'two-column',
        style: 'executive',
        tier: 'elite',
        atsScore: 97,
        category: 'Business',
        institution: 'IIM',
        institutionName: 'IIM Ahmedabad',
        creatorProfile: {
          name: 'Priya Sharma',
          batch: '2019-2021',
          branch: 'MBA',
          company: 'McKinsey & Company',
          position: 'Associate',
          verified: true
        },
        downloadCount: 2156,
        rating: 4.92,
        price: 249,
        isVerified: true,
        createdAt: '2024-01-18'
      },
      {
        id: 'iisc-premium',
        name: 'IISc Research - Academic Excellence',
        preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face',
        type: 'academic',
        country: 'IN',
        description: 'Research-focused academic resume template from IISc Bangalore with publication-ready format',
        features: ['ATS Score: 99%', 'Research Focus', 'Publication Ready', 'IISc Verified', 'Academic Excellence'],
        colors: { primary: '#7c3aed', secondary: '#8b5cf6', accent: '#a78bfa' },
        layout: 'single-column',
        style: 'scholarly',
        tier: 'elite',
        atsScore: 99,
        category: 'Research',
        institution: 'IISc',
        institutionName: 'IISc Bangalore',
        creatorProfile: {
          name: 'Dr. Amit Patel',
          batch: '2017-2022',
          branch: 'Physics',
          company: 'IISc Bangalore',
          position: 'Postdoctoral Researcher',
          verified: true
        },
        downloadCount: 1892,
        rating: 4.96,
        price: 279,
        isVerified: true,
        createdAt: '2024-01-22'
      }
    ];

    setTemplates(mockTemplates);
    setFilteredTemplates(mockTemplates);
  }, []);

  // Filter and sort templates
  useEffect(() => {
    let filtered = templates;

    // Filter by institution
    if (selectedInstitution !== 'all') {
      filtered = filtered.filter(t => t.institution === selectedInstitution);
    }

    // Filter by tier
    if (selectedTier !== 'all') {
      filtered = filtered.filter(t => t.tier === selectedTier);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.institutionName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort templates
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'downloads':
          return b.downloadCount - a.downloadCount;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    setFilteredTemplates(filtered);
  }, [templates, selectedInstitution, selectedTier, searchQuery, sortBy]);

  const getInstitutionBadge = (institution: string) => {
    const badges = {
      IIT: { color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300', icon: '🏛️' },
      NIT: { color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300', icon: '🎓' },
      IIM: { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300', icon: '💼' },
      IISc: { color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300', icon: '🔬' }
    };
    return badges[institution as keyof typeof badges] || badges.IIT;
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'elite': return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'premium': return <Award className="w-4 h-4 text-blue-500" />;
      default: return <Star className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Premium Institution Templates</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Professional resume templates from top Indian institutions with real-time ATS scoring
        </p>
      </div>

      {/* Filters */}
      <div className={`p-6 rounded-xl border ${
        isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Institution Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Institution:</label>
            <select
              value={selectedInstitution}
              onChange={(e) => setSelectedInstitution(e.target.value)}
              className={`px-3 py-2 border rounded-lg text-sm ${
                isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="all">All Institutions</option>
              <option value="IIT">IIT</option>
              <option value="NIT">NIT</option>
              <option value="IIM">IIM</option>
              <option value="IISc">IISc</option>
            </select>
          </div>

          {/* Tier Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tier:</label>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className={`px-3 py-2 border rounded-lg text-sm ${
                isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="all">All Tiers</option>
              <option value="elite">Elite</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'downloads' | 'newest')}
              className={`px-3 py-2 border rounded-lg text-sm ${
                isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="rating">Rating</option>
              <option value="downloads">Downloads</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* Search */}
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`px-3 py-2 border rounded-lg text-sm w-48 ${
                isDarkMode ? 'bg-slate-800 border-slate-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredTemplates.map((template, index) => {
          const institutionBadge = getInstitutionBadge(template.institution || 'IIT');
          
          return (
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
                {template.id === 'nit-premium' ? (
                  <TemplatePreviewImage 
                    templateId={template.id} 
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                
                {/* Tier Badge */}
                <div className="absolute top-3 left-3 flex items-center space-x-1 bg-white/90 dark:bg-slate-900/90 px-2 py-1 rounded-full">
                  {getTierIcon(template.tier)}
                  <span className="text-xs font-medium capitalize">{template.tier}</span>
                </div>

                {/* Institution Badge */}
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${institutionBadge.color}`}>
                  {institutionBadge.icon} {template.institution}
                </div>

                {/* ATS Score Badge */}
                <div className="absolute top-12 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {template.atsScore}% ATS
                </div>

                {/* Action Buttons */}
                <div className="absolute bottom-3 left-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => onTemplatePreview(template)}
                    className="flex-1 bg-white/95 dark:bg-slate-900/95 text-gray-900 dark:text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-white dark:hover:bg-slate-900 transition-colors flex items-center justify-center space-x-1 shadow-lg"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => onTemplateEdit(template)}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 shadow-lg"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg leading-tight">{template.name}</h3>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{template.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {template.description}
                </p>

                {/* Creator Info */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Shield className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-medium">{template.creatorProfile?.name}</span>
                    <span className="mx-1">•</span>
                    <span>{template.institutionName}</span>
                    <span className="mx-1">•</span>
                    <span>{template.creatorProfile?.batch}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Download className="w-3 h-3" />
                      <span>{template.downloadCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{template.atsScore}% ATS</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{template.rating}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {template.features.slice(0, 3).map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {template.features.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      +{template.features.length - 3} more
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Price:</span>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                      ₹{template.price}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No templates found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters or search terms
          </p>
        </div>
      )}
    </div>
  );
};

export default PremiumTemplateGallery;