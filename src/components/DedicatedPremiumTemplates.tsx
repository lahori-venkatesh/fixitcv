import React, { useState, useEffect } from 'react';
import { 
  Crown, 
  Star, 
  Building, 
  Lock, 
  Eye, 
  Edit, 
  Download, 
  Target, 
  TrendingUp, 
  Users,
  Filter,
  ChevronDown,
  ArrowRight,
  Zap,
  Award,
  CheckCircle,
  ArrowLeft,
  Sparkles,
  Shield,
  BookOpen,
  Briefcase,
  Beaker,
  Wallet,
  Clock,
  Search,
  X
} from 'lucide-react';

interface DedicatedPremiumTemplatesProps {
  isDarkMode?: boolean;
  onUpgrade: () => void;
  onBackToBuilder?: () => void;
  onTemplateSelect?: (template: any) => void;
}

interface InstitutionFilter {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

// Add a lightweight Template type so we avoid `any` and satisfy linting rules
interface Template {
  id: string;
  name: string;
  preview: string;
  atsScore: number;
  rating: number;
  downloadCount: number;
  institution?: string;
  institutionName?: string;
  price?: number;
  originalPrice?: number;
  creatorProfile?: {
    name: string;
    verified?: boolean;
    company?: string;
    position?: string;
    batch?: string;
    branch?: string;
  };
  createdAt?: string;
  isNew?: boolean;
  isTrending?: boolean;
  description?: string;
  category?: string;
  // Additional optional fields used in dataset
  type?: string;
  country?: string;
  features?: string[];
  colors?: Record<string, string>;
  layout?: string;
  style?: string;
  tier?: string;
  isVerified?: boolean;
}

// InstitutionFilter type is declared below (after Template) to keep types grouped.
// Allow icon types from lucide-react (silence explicit any rule for these props)
/* eslint-disable @typescript-eslint/no-explicit-any */
interface InstitutionFilter {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const DedicatedPremiumTemplates: React.FC<DedicatedPremiumTemplatesProps> = ({
  isDarkMode = false,
  onUpgrade,
  onBackToBuilder,
  onTemplateSelect
}) => {
   const [selectedInstitution, setSelectedInstitution] = useState<string>('all');
   const [showMobileFilters, setShowMobileFilters] = useState(false);
   const [sortBy, setSortBy] = useState<'rating' | 'downloads' | 'newest' | 'ats'>('rating');
   const [searchQuery, setSearchQuery] = useState('');
   // hoveredTemplate removed as it was unused

   // Institution filters with better icons and colors
   const institutionFilters: InstitutionFilter[] = [
     {
       id: 'all',
       name: 'All Institutions',
       icon: Crown,
       color: 'from-violet-500 via-purple-500 to-indigo-600',
       description: 'All premium templates'
     },
     {
       id: 'IIT',
       name: 'IIT',
       icon: Building,
       color: 'from-red-500 via-orange-500 to-amber-500',
       description: 'Elite engineering templates'
     },
     {
       id: 'NIT',
       name: 'NIT',
       icon: Shield,
       color: 'from-blue-500 via-indigo-500 to-purple-500',
       description: 'Premium engineering templates'
     },
     {
       id: 'IISc',
       name: 'IISc',
       icon: Beaker,
       color: 'from-emerald-500 via-green-500 to-teal-500',
       description: 'Research-focused templates'
     },
     {
       id: 'IIM',
       name: 'IIM',
       icon: Briefcase,
       color: 'from-purple-500 via-pink-500 to-rose-500',
       description: 'Business & management templates'
     }
   ];

   // Premium templates data
   const premiumTemplates: Template[] = [
     {
       id: 'iit-bombay-elite',
       name: 'IIT Bombay - Engineering Excellence',
       preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
       type: 'tech',
       country: 'IN',
       description: 'Elite engineering resume template from IIT Bombay with research focus and technical leadership',
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
       originalPrice: 399,
       isVerified: true,
       createdAt: '2024-01-15',
       isNew: false,
       isTrending: true
     },
     {
       id: 'iit-delhi-premium',
       name: 'IIT Delhi - Tech Leadership',
       preview: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=500&fit=crop',
       type: 'tech',
       country: 'IN',
       description: 'Premium tech leadership template from IIT Delhi with startup and innovation focus',
       features: ['ATS Score: 97%', 'Tech Leadership', 'Startup Focus', 'Innovation Ready', 'IIT Verified'],
       colors: { primary: '#dc2626', secondary: '#ef4444', accent: '#f87171' },
       layout: 'single-column',
       style: 'modern',
       tier: 'elite',
       atsScore: 97,
       category: 'Technology',
       institution: 'IIT',
       institutionName: 'IIT Delhi',
       creatorProfile: {
         name: 'Prof. Priya Sharma',
         batch: '2019-2023',
         branch: 'Information Technology',
         company: 'Microsoft',
         position: 'Product Manager',
         verified: true
       },
       downloadCount: 2890,
       rating: 4.92,
       price: 299,
       originalPrice: 399,
       isVerified: true,
       createdAt: '2024-01-18',
       isNew: true,
       isTrending: false
     },
     {
       id: 'nit-trichy-elite',
       name: 'NIT Trichy - Engineering Professional',
       preview: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
       type: 'tech',
       country: 'IN',
       description: 'Elite engineering resume template from NIT Trichy with industry focus',
       features: ['ATS Score: 97%', 'Industry Focus', 'Technical Excellence', 'NIT Verified', 'Professional Layout'],
       colors: { primary: '#7c3aed', secondary: '#8b5cf6', accent: '#a78bfa' },
       layout: 'single-column',
       style: 'professional',
       tier: 'elite',
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
       originalPrice: 299,
       isVerified: true,
       createdAt: '2024-01-20',
       isNew: false,
       isTrending: true
     },
     {
       id: 'iisc-bangalore-research',
       name: 'IISc Bangalore - Research Excellence',
       preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
       type: 'research',
       country: 'IN',
       description: 'Elite research-focused template from IISc Bangalore with academic and publication focus',
       features: ['ATS Score: 99%', 'Research Excellence', 'Publication Ready', 'IISc Verified', 'Academic Focus'],
       colors: { primary: '#1f2937', secondary: '#374151', accent: '#6b7280' },
       layout: 'single-column',
       style: 'academic',
       tier: 'elite',
       atsScore: 99,
       category: 'Research',
       institution: 'IISc',
       institutionName: 'IISc Bangalore',
       creatorProfile: {
         name: 'Dr. Arjun Reddy',
         batch: '2017-2021',
         branch: 'Physics',
         company: 'CERN',
         position: 'Research Scientist',
         verified: true
       },
       downloadCount: 1890,
       rating: 4.96,
       price: 399,
       originalPrice: 499,
       isVerified: true,
       createdAt: '2024-01-10',
       isNew: false,
       isTrending: false
     },
     {
       id: 'iim-ahmedabad-leadership',
       name: 'IIM Ahmedabad - Business Leadership',
       preview: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=500&fit=crop',
       type: 'business',
       country: 'IN',
       description: 'Elite business leadership template from IIM Ahmedabad with consulting and strategy focus',
       features: ['ATS Score: 98%', 'Business Leadership', 'Consulting Focus', 'IIM Verified', 'Strategy Ready'],
       colors: { primary: '#7c2d12', secondary: '#92400e', accent: '#b45309' },
       layout: 'single-column',
       style: 'executive',
       tier: 'elite',
       atsScore: 98,
       category: 'Business',
       institution: 'IIM',
       institutionName: 'IIM Ahmedabad',
       creatorProfile: {
         name: 'Prof. Meera Kapoor',
         batch: '2018-2022',
         branch: 'MBA',
         company: 'McKinsey',
         position: 'Associate Partner',
         verified: true
       },
       downloadCount: 2456,
       rating: 4.94,
       price: 399,
       originalPrice: 499,
       isVerified: true,
       createdAt: '2024-01-12',
       isNew: false,
       isTrending: true
     }
   ];

   // Filter templates based on selected institution and search query
   const filteredTemplates = premiumTemplates.filter(template => {
     const matchesInstitution = selectedInstitution === 'all' || template.institution === selectedInstitution;
     const q = searchQuery.toLowerCase();
     const matchesSearch = template.name.toLowerCase().includes(q) ||
                          (template.description ?? '').toLowerCase().includes(q) ||
                          (template.category ?? '').toLowerCase().includes(q);
     return matchesInstitution && matchesSearch;
   });

   // Sort templates
   const sortedTemplates = [...filteredTemplates].sort((a, b) => {
     switch (sortBy) {
       case 'rating': return b.rating - a.rating;
       case 'downloads': return b.downloadCount - a.downloadCount;
       case 'newest': return (b.createdAt ? new Date(b.createdAt).getTime() : 0) - (a.createdAt ? new Date(a.createdAt).getTime() : 0);
       case 'ats': return b.atsScore - a.atsScore;
       default: return 0;
     }
   });

   // New: exported sort options used by the redesigned segmented control
   /* eslint-disable @typescript-eslint/no-explicit-any */
   const sortOptions: Array<{ id: 'rating' | 'downloads' | 'newest' | 'ats'; label: string; icon: React.ComponentType<any>; desc: string }> = [
     { id: 'rating', label: 'Highest Rated', icon: Star, desc: 'Top rated by users' },
     { id: 'downloads', label: 'Most Popular', icon: TrendingUp, desc: 'Most downloaded' },
     { id: 'newest', label: 'Latest', icon: Zap, desc: 'Newest templates' },
     { id: 'ats', label: 'Best ATS Score', icon: Target, desc: 'Optimized for ATS' }
   ];
   /* eslint-enable @typescript-eslint/no-explicit-any */

   const handleTemplateAction = (action: 'preview' | 'edit' | 'download', template: Template) => {
     if (action === 'edit' && onTemplateSelect) {
       onTemplateSelect(template);
     } else {
       onUpgrade();
     }
   };

   // Helper: render institution chips (keeps JSX smaller)
   const renderInstitutionChips = () => (
     <div>
       <div className="flex items-center space-x-3 overflow-x-auto py-1">
         {institutionFilters.map((filter) => {
           const Icon = filter.icon;
           const isSelected = selectedInstitution === filter.id;
           return (
             <button
               key={filter.id}
               onClick={() => setSelectedInstitution(filter.id)}
               aria-pressed={isSelected}
               title={filter.description}
               className={`flex-shrink-0 inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                 isSelected
                   ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-md'
                   : isDarkMode
                     ? 'bg-slate-800 text-slate-200 border-slate-600'
                     : 'bg-white text-gray-700 border-gray-300'
               }`}
             >
               <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
               <span className="text-sm font-medium">{filter.name}</span>
             </button>
           );
         })}
       </div>
       <div className="mt-3 text-sm text-gray-500 dark:text-slate-400">Click a chip to filter templates. Selected: <span className="font-medium text-gray-700 dark:text-slate-200">{selectedInstitution === 'all' ? 'All' : selectedInstitution}</span></div>
     </div>
   );

   // Helper: render sort tabs (fixed to wrap and scroll responsively)
   const renderSortTabs = () => (
     <div>
       <div role="tablist" aria-label="Sort templates" className="grid grid-cols-2 gap-2 w-full auto-rows-fr">
         {sortOptions.map((option) => {
           /* eslint-disable @typescript-eslint/no-explicit-any */
           const Icon = option.icon as React.ComponentType<any>;
           /* eslint-enable @typescript-eslint/no-explicit-any */
           const isSelected = sortBy === option.id;
           return (
             <button
               key={option.id}
               role="tab"
               aria-selected={isSelected}
               onClick={() => setSortBy(option.id)}
               title={option.desc}
               className={`w-full flex items-center justify-start space-x-3 px-3 sm:px-4 py-2 rounded-lg h-12 transition-all duration-200 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                 isSelected
                   ? 'bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 shadow'
                   : isDarkMode
                     ? 'text-slate-300 bg-slate-900/40'
                     : 'text-gray-700 bg-white/60'
               }`}
             >
               <Icon className={`w-4 h-4 ${isSelected ? 'text-purple-600' : 'text-gray-400'}`} />
               <span className="truncate">{option.label}</span>
             </button>
           );
         })}
       </div>
       <div className="mt-2 text-xs text-gray-500 dark:text-slate-400">Sort determines the order of templates shown.</div>
     </div>
   );

   return (
     <div className="min-h-screen space-y-8 max-w-7xl mx-auto p-4 sm:p-6">
       {/* Animated Background */}
       <div className="fixed inset-0 -z-10 overflow-hidden">
         <div className={`absolute inset-0 ${isDarkMode ? 'bg-slate-950' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`} />
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse" />
         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-300/20 to-indigo-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
       </div>

       {/* Header with improved typography */}
       <div className="relative">
         {onBackToBuilder && (
           <div className="flex justify-start mb-8">
             <button
               onClick={onBackToBuilder}
               className={`group flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300 backdrop-blur-sm ${
                 isDarkMode
                   ? 'text-slate-300 hover:text-white hover:bg-slate-800/50 border border-slate-700/50'
                   : 'text-slate-600 hover:text-slate-900 hover:bg-white/80 border border-gray-200/50 shadow-sm'
               }`}
             >
               <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
               <span className="font-medium">Back to Resume Builder</span>
             </button>
           </div>
         )}

         <div className="text-center mb-12">
           <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl shadow-purple-500/25 animate-pulse">
             <Crown className="w-5 h-5 mr-2" />
             Premium Institution Templates
             <Sparkles className="w-4 h-4 ml-2" />
           </div>
           
           <h1 className={`text-5xl sm:text-7xl font-extrabold mb-6 leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
             Elite Templates from{' '}
             <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
               Top Institutions
             </span>
           </h1>
           
           <p className={`text-xl sm:text-2xl max-w-4xl mx-auto leading-relaxed font-light ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
             Access premium resume templates exclusively designed for IIT, NIT, IISc, and IIM students. 
             <span className="block mt-2 text-lg opacity-80">All templates require a premium subscription.</span>
           </p>
         </div>
       </div>

       {/* Enhanced Search Bar */}
       <div className="relative max-w-2xl mx-auto mb-8">
         <div className="relative">
           <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`} />
           <input
             type="text"
             placeholder="Search templates by name, category, or institution..."
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className={`w-full pl-12 pr-12 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 font-medium ${
               isDarkMode 
                 ? 'bg-slate-900/80 border-slate-700 focus:border-purple-500 focus:ring-purple-500/20 text-white placeholder-slate-400' 
                 : 'bg-white/80 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 text-gray-900 placeholder-gray-500'
             } backdrop-blur-sm shadow-lg`}
           />
           {searchQuery && (
             <button
               onClick={() => setSearchQuery('')}
               className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
             >
               <X className="w-4 h-4" />
             </button>
           )}
         </div>
       </div>

       {/* Mobile Filter Toggle */}
       <div className="block lg:hidden">
         <button
           onClick={() => setShowMobileFilters(!showMobileFilters)}
           className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm ${
             isDarkMode 
               ? 'bg-slate-900/80 border-slate-700/50 hover:border-slate-600' 
               : 'bg-white/80 border-gray-200/50 hover:border-gray-300 shadow-lg'
           }`}
         >
           <div className="flex items-center space-x-3">
             <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
               <Filter className="w-5 h-5 text-white" />
             </div>
             <div className="text-left">
               <div className="font-semibold">Filter & Sort</div>
               <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                 {filteredTemplates.length} templates
               </div>
             </div>
           </div>
           <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showMobileFilters ? 'rotate-180' : ''}`} />
         </button>
       </div>

       {/* Enhanced Filters */}
       <div className={`${showMobileFilters ? 'block lg:block' : 'hidden lg:block'}`}>
         <div className={`rounded-3xl border-2 p-4 sm:p-6 backdrop-blur-sm ${isDarkMode ? 'bg-slate-900/80 border-slate-700/50' : 'bg-white/80 border-gray-200/50'} shadow-2xl shadow-purple-600/25 dark:shadow-black/40` }>
           <div className="flex flex-col lg:flex-row lg:items-center gap-6">
             <div className="flex-1">
               <h4 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Institution</h4>
               {renderInstitutionChips()}
             </div>

             <div className="lg:w-80">
               <h4 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sort By</h4>
               {renderSortTabs()}
             </div>
           </div>
         </div>
       </div>

       {/* Templates Grid with enhanced cards */}
       <div className="space-y-8">
         {sortedTemplates.length > 0 ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
             {sortedTemplates.map((template, index) => (
               <div
                 key={template.id}
                 className={`group relative rounded-3xl border-2 overflow-hidden transition-all duration-500 cursor-pointer ${
                   isDarkMode 
                     ? 'bg-slate-900/80 border-slate-700/50 hover:border-slate-600 hover:shadow-2xl hover:shadow-purple-500/20' 
                     : 'bg-white/80 border-gray-200/50 hover:border-gray-300 hover:shadow-2xl hover:shadow-purple-500/20'
                 } backdrop-blur-sm transform hover:-translate-y-2 hover:scale-105`}
                 style={{ animationDelay: `${index * 100}ms` }}
               >
                 {/* Template Preview with enhanced overlay */}
                 <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900">
                   <img
                     src={template.preview}
                     alt={template.name}
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   />
                   
                   {/* Enhanced overlay with blur effect */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]" />
                   
                   {/* Badges with better positioning */}
                   <div className="absolute top-4 left-4 flex flex-col gap-2">
                     <div className="flex items-center space-x-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                       <Crown className="w-3 h-3" />
                       <span>Premium</span>
                     </div>
                     {template.isNew && (
                       <div className="flex items-center space-x-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                         <Sparkles className="w-3 h-3" />
                         <span>New</span>
                       </div>
                     )}
                     {template.isTrending && (
                       <div className="flex items-center space-x-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                         <TrendingUp className="w-3 h-3" />
                         <span>Trending</span>
                       </div>
                     )}
                   </div>

                   {/* ATS Score with better styling */}
                   <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                     {template.atsScore}% ATS
                   </div>

                   {/* Institution badge */}
                   <div className="absolute bottom-20 left-4 right-4">
                     <div className="bg-white/95 dark:bg-slate-900/95 px-3 py-2 rounded-xl backdrop-blur-sm shadow-lg">
                       <div className="flex items-center space-x-2">
                         <Building className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                         <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                           {template.institutionName}
                         </span>
                       </div>
                     </div>
                   </div>

                   {/* Enhanced action buttons */}
                   <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                     <button
                       onClick={() => handleTemplateAction('preview', template)}
                       className="w-full bg-white/95 dark:bg-slate-900/95 text-gray-900 dark:text-white px-4 py-3 rounded-xl font-semibold hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl backdrop-blur-sm transform hover:scale-105"
                     >
                       <Eye className="w-4 h-4" />
                       <span>Preview Template</span>
                     </button>
                     <button
                       onClick={() => handleTemplateAction('edit', template)}
                       className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl transform hover:scale-105"
                     >
                       <Edit className="w-4 h-4" />
                       <span>Use Template</span>
                     </button>
                   </div>
                 </div>

                 {/* Enhanced template info */}
                 <div className="p-6">
                   <div className="flex items-start justify-between mb-3">
                     <h3 className="font-bold text-lg leading-tight line-clamp-2 flex-1">{template.name}</h3>
                     <div className="flex items-center space-x-1 text-yellow-500 flex-shrink-0 ml-3">
                       <Star className="w-4 h-4 fill-current" />
                       <span className="text-sm font-bold">{template.rating}</span>
                     </div>
                   </div>

                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                     {template.description}
                   </p>

                   {/* Enhanced stats */}
                   <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                     <div className="flex items-center space-x-3">
                       <div className="flex items-center space-x-1">
                         <Download className="w-3 h-3" />
                         <span>{template.downloadCount > 1000 ? `${(template.downloadCount/1000).toFixed(1)}k` : template.downloadCount}</span>
                       </div>
                       <div className="flex items-center space-x-1">
                         <Target className="w-3 h-3" />
                         <span>{template.atsScore}%</span>
                       </div>
                     </div>
                   </div>

                   {/* Enhanced pricing with discount */}
                   <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                     <div className="flex items-center justify-between">
                       <div className="flex flex-col">
                         <div className="flex items-center space-x-2">
                           <span className="text-xl font-bold text-green-600 dark:text-green-400">
                             ₹{template.price ?? 0}
                           </span>
                           {template.originalPrice && template.originalPrice > (template.price ?? 0) && (
                             <span className="text-sm text-gray-500 line-through">
                               ₹{template.originalPrice}
                             </span>
                           )}
                         </div>
                         {template.originalPrice && template.originalPrice > (template.price ?? 0) && (
                           <span className="text-xs text-green-600 font-medium">
                             Save ₹{template.originalPrice - (template.price ?? 0)}
                           </span>
                         )}
                       </div>
                       <div className="flex items-center space-x-1 text-xs text-gray-500">
                         <Clock className="w-3 h-3" />
                         <span>Instant Access</span>
                       </div>
                     </div>
                   </div>

                   {/* Creator badge */}
                   {template.creatorProfile && (
                     <div className="mt-3 p-2 rounded-lg bg-gray-50 dark:bg-slate-800">
                       <div className="flex items-center space-x-2">
                         <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                           <span className="text-xs font-bold text-white">
                             {template.creatorProfile.name.charAt(0)}
                           </span>
                         </div>
                         <div className="flex-1 min-w-0">
                           <div className="flex items-center space-x-1">
                             <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                               {template.creatorProfile.name}
                             </span>
                             {template.creatorProfile.verified && (
                               <CheckCircle className="w-3 h-3 text-blue-500 flex-shrink-0" />
                             )}
                           </div>
                           <div className="text-xs text-gray-500 truncate">
                             {template.creatorProfile.company} • {template.creatorProfile.position}
                           </div>
                         </div>
                       </div>
                     </div>
                   )}
                 </div>

                 {/* Hover effect glow */}
                 <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                   template.institution === 'IIT' ? 'shadow-xl shadow-red-500/20' :
                   template.institution === 'NIT' ? 'shadow-xl shadow-blue-500/20' :
                   template.institution === 'IISc' ? 'shadow-xl shadow-green-500/20' :
                   template.institution === 'IIM' ? 'shadow-xl shadow-purple-500/20' :
                   'shadow-xl shadow-purple-500/20'
                 }`} />
               </div>
             ))}
           </div>
         ) : (
           <div className="text-center py-16">
             <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700 rounded-3xl flex items-center justify-center mx-auto mb-6">
               <Search className="w-12 h-12 text-gray-400 dark:text-slate-500" />
             </div>
             <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
               No templates found
             </h3>
             <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
               Try adjusting your filters or search query.
             </p>
             <button
               onClick={() => {
                 setSearchQuery('');
                 setSelectedInstitution('all');
               }}
               className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold transform hover:scale-105"
             >
               Clear Filters
             </button>
           </div>
         )}
       </div>

       {/* Enhanced upgrade CTA with better visual hierarchy */}
       <div className={`relative overflow-hidden rounded-3xl border-2 backdrop-blur-sm ${
         isDarkMode 
           ? 'bg-gradient-to-br from-purple-900/50 via-slate-900/80 to-blue-900/50 border-purple-700/50' 
           : 'bg-gradient-to-br from-purple-50 via-white/90 to-blue-50 border-purple-200/50'
       } shadow-2xl`}>
         {/* Background decoration */}
         <div className="absolute inset-0 overflow-hidden">
           <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
           <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
         </div>

         <div className="relative p-8 sm:p-12 text-center">
           <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30 animate-pulse">
             <Crown className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
           </div>
           
           <h3 className={`text-3xl sm:text-4xl font-extrabold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
             Unlock Premium Templates
           </h3>
           <p className={`text-lg sm:text-xl mb-8 max-w-3xl mx-auto leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
             Get access to all premium institution templates, advanced ATS scoring, exclusive features, 
             and professional guidance to create a standout resume that gets you hired.
           </p>
           
           {/* Features list */}
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
             {[
               { icon: CheckCircle, text: 'All Premium Templates' },
               { icon: Target, text: '99% ATS Compatibility' },
               { icon: Award, text: 'Expert Career Guidance' }
             ].map((feature, index) => (
               <div key={index} className="flex items-center space-x-3 justify-center sm:justify-start">
                 <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                   <feature.icon className="w-4 h-4 text-white" />
                 </div>
                 <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                   {feature.text}
                 </span>
               </div>
             ))}
           </div>
           
           <button
             onClick={onUpgrade}
             className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-bold shadow-2xl shadow-purple-500/30 transform hover:scale-105 hover:-translate-y-1 flex items-center space-x-3 mx-auto text-lg"
           >
             <Crown className="w-6 h-6" />
             <span>Upgrade to Premium</span>
             <ArrowRight className="w-6 h-6" />
           </button>
           
           <p className={`text-sm mt-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
             30-day money-back guarantee • Cancel anytime • Instant access
           </p>
         </div>
       </div>
     </div>
   );
};

export default DedicatedPremiumTemplates