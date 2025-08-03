import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Calendar, Trophy, Award, Star, Target, Medal, ExternalLink, ChevronDown, ChevronUp, Sparkles, Zap, Tag } from 'lucide-react';
import { Achievement } from '../types/resume';

interface AchievementsFormProps {
  sectionId: string;
  items: any[];
  onUpdateItems: (items: any[]) => void;
}

const AchievementsForm: React.FC<AchievementsFormProps> = ({
  sectionId,
  items,
  onUpdateItems
}) => {
  const [expandedAchievement, setExpandedAchievement] = useState<number | null>(null);
  const [displayFormat, setDisplayFormat] = useState<'detailed' | 'compact' | 'grouped'>('detailed');

  // Convert string items to achievement objects if needed
  const achievements: Achievement[] = items.map(item => {
    if (typeof item === 'string') {
      return {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        title: item,
        description: [],
        date: '',
        category: 'Professional',
        issuer: '',
        displayFormat: displayFormat
      };
    }
    
    // Ensure description is an array
    if (item && typeof item === 'object') {
      return {
        ...item,
        id: item.id || (Date.now().toString() + Math.random().toString(36).substring(2, 9)),
        description: Array.isArray(item.description) ? item.description : 
                    item.description ? [item.description] : [],
        displayFormat: item.displayFormat || displayFormat
      };
    }
    
    return item;
  });

  const updateAchievement = (index: number, field: keyof Achievement, value: any) => {
    const updatedAchievements = [...achievements];
    updatedAchievements[index] = {
      ...updatedAchievements[index],
      [field]: value
    };
    onUpdateItems(updatedAchievements);
  };

  // Update display format for all achievements
  const updateAllAchievementsFormat = (format: 'detailed' | 'compact' | 'grouped') => {
    setDisplayFormat(format);
    const updatedAchievements = achievements.map(achievement => ({
      ...achievement,
      displayFormat: format
    }));
    onUpdateItems(updatedAchievements);
  };

  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      title: '',
      description: [''],
      date: '',
      category: 'Professional',
      issuer: '',
      url: '',
      displayFormat: displayFormat
    };
    onUpdateItems([...achievements, newAchievement]);
    setExpandedAchievement(achievements.length);
  };

  const removeAchievement = (index: number) => {
    const updatedAchievements = achievements.filter((_, i) => i !== index);
    onUpdateItems(updatedAchievements);
    if (expandedAchievement === index) {
      setExpandedAchievement(null);
    } else if (expandedAchievement !== null && index < expandedAchievement) {
      setExpandedAchievement(expandedAchievement - 1);
    }
  };

  const updateDescription = (achievementIndex: number, descIndex: number, value: string) => {
    const updatedAchievements = [...achievements];
    const descriptions = [...(updatedAchievements[achievementIndex].description || [])];
    descriptions[descIndex] = value;
    updatedAchievements[achievementIndex].description = descriptions;
    onUpdateItems(updatedAchievements);
  };

  const addDescriptionItem = (achievementIndex: number) => {
    const updatedAchievements = [...achievements];
    updatedAchievements[achievementIndex].description = [
      ...(updatedAchievements[achievementIndex].description || []),
      ''
    ];
    onUpdateItems(updatedAchievements);
  };

  const removeDescriptionItem = (achievementIndex: number, descIndex: number) => {
    const updatedAchievements = [...achievements];
    updatedAchievements[achievementIndex].description = (updatedAchievements[achievementIndex].description || [])
      .filter((_, i) => i !== descIndex);
    onUpdateItems(updatedAchievements);
  };

  // Sort achievements by date (most recent first)
  const sortAchievements = () => {
    const sortedAchievements = [...achievements].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
    onUpdateItems(sortedAchievements);
  };

  // Group achievements by category
  const groupedAchievements = achievements.reduce((groups: {[key: string]: Achievement[]}, achievement) => {
    const category = achievement.category || 'Other';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(achievement);
    return groups;
  }, {});

  const categories = [
    { value: 'Academic', label: 'Academic' },
    { value: 'Professional', label: 'Professional' },
    { value: 'Personal', label: 'Personal' },
    { value: 'Volunteer', label: 'Volunteer' },
    { value: 'Other', label: 'Other' }
  ];

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      // Handle YYYY-MM format (from month input)
      if (dateString.match(/^\d{4}-\d{2}$/)) {
        const date = new Date(dateString + '-01');
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      }
      
      // Handle full date format
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      }
      
      return dateString;
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-900">Achievements</h4>
        <div className="flex items-center space-x-2">
          {achievements.length > 1 && (
            <button
              onClick={sortAchievements}
              className="text-blue-600 hover:text-blue-700 text-xs"
            >
              Sort by Date
            </button>
          )}
        </div>
      </div>

      {/* Format Selection */}
      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <label className="block text-xs font-medium text-gray-700 mb-2">
          <Zap className="w-3 h-3 inline mr-1" />
          Display Format
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'detailed', label: 'Detailed', description: 'With bullet points', icon: Trophy },
            { id: 'compact', label: 'Compact', description: 'One-line summary', icon: Award },
            { id: 'grouped', label: 'Grouped', description: 'By category', icon: Tag }
          ].map((format) => (
            <button
              key={format.id}
              onClick={() => updateAllAchievementsFormat(format.id as any)}
              className={`p-2 border rounded-md text-left transition-colors ${
                displayFormat === format.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <format.icon className="w-3 h-3" />
                <div>
                  <div className="font-medium text-xs">{format.label}</div>
                  <div className="text-xs text-gray-500">{format.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-2 border rounded-md ${
              expandedAchievement === index 
                ? 'border-blue-300 bg-blue-50' 
                : 'border-gray-200 bg-gray-50 hover:border-gray-300'
            }`}
          >
            {/* Achievement Header - always visible */}
            <div 
              className="flex justify-between items-start cursor-pointer"
              onClick={() => setExpandedAchievement(expandedAchievement === index ? null : index)}
            >
              <div className="flex-1">
                <div className="flex items-center">
                  <Trophy className="w-3 h-3 text-blue-500 mr-1" />
                  <h5 className="font-medium text-xs text-gray-900">
                    {achievement.title || 'New Achievement'}
                  </h5>
                  {achievement.category && (
                    <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {achievement.category}
                    </span>
                  )}
                </div>
                {expandedAchievement !== index && (
                  <>
                    {achievement.issuer && (
                      <p className="text-xs text-gray-600 mt-0.5">{achievement.issuer}</p>
                    )}
                    {achievement.date && (
                      <p className="text-xs text-gray-500 mt-0.5">{formatDate(achievement.date)}</p>
                    )}
                    {achievement.description && Array.isArray(achievement.description) && achievement.description.length > 0 && (
                      <p className="text-xs text-blue-600 mt-0.5">
                        {achievement.description.filter(d => d.trim()).length} bullet points
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className="flex items-center space-x-1">
                {expandedAchievement === index ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeAchievement(index);
                  }}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            {/* Expanded Achievement Form */}
            <AnimatePresence>
              {expandedAchievement === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-2 pt-2 border-t border-gray-200 space-y-2"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        Achievement Title *
                      </label>
                      <input
                        type="text"
                        value={achievement.title}
                        onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                        placeholder="First Prize – National UI Challenge"
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        Issuer/Organization *
                      </label>
                      <input
                        type="text"
                        value={achievement.issuer || ''}
                        onChange={(e) => updateAchievement(index, 'issuer', e.target.value)}
                        placeholder="Figma India"
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        <Calendar className="w-3 h-3 inline mr-0.5" />
                        Date *
                      </label>
                      <input
                        type="month"
                        value={achievement.date || ''}
                        onChange={(e) => updateAchievement(index, 'date', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        Category
                      </label>
                      <select
                        value={achievement.category || 'Professional'}
                        onChange={(e) => updateAchievement(index, 'category', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                      >
                        {categories.map(category => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-0.5">
                      <ExternalLink className="w-3 h-3 inline mr-0.5" />
                      Certificate URL (optional)
                    </label>
                    <input
                      type="url"
                      value={achievement.url || ''}
                      onChange={(e) => updateAchievement(index, 'url', e.target.value)}
                      placeholder="https://example.com/certificate"
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-0.5">
                      Display Format
                    </label>
                    <select
                      value={achievement.displayFormat || displayFormat}
                      onChange={(e) => updateAchievement(index, 'displayFormat', e.target.value as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                    >
                      <option value="detailed">Detailed (with bullet points)</option>
                      <option value="compact">Compact (one-line summary)</option>
                      <option value="grouped">Grouped (by category)</option>
                    </select>
                  </div>
                  
                  {/* Description Bullet Points */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-0.5">
                      Description (bullet points)
                    </label>
                    
                    {(achievement.description || []).map((desc, descIndex) => (
                      <div key={descIndex} className="flex items-center space-x-1.5 mb-1">
                        <div className="flex-1 relative">
                          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">•</span>
                          <input
                            type="text"
                            value={desc}
                            onChange={(e) => updateDescription(index, descIndex, e.target.value)}
                            placeholder="Selected from 5,000+ participants nationwide"
                            className="w-full pl-5 pr-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                          />
                        </div>
                        <button
                          onClick={() => removeDescriptionItem(index, descIndex)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    
                    <button
                      onClick={() => addDescriptionItem(index)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-xs"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Bullet Point</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      
      <button
        onClick={addAchievement}
        className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors font-medium text-xs"
      >
        <Plus className="w-3 h-3" />
        <span>Add Achievement</span>
      </button>
      
      {/* Format Preview */}
      <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
        <div className="flex items-center justify-between mb-2">
          <h5 className="font-medium text-xs text-blue-800 flex items-center">
            <Sparkles className="w-3 h-3 mr-1" />
            Format Preview
          </h5>
          <span className="text-xs text-blue-600 font-medium">
            {displayFormat === 'detailed' ? 'Detailed Format' : 
             displayFormat === 'compact' ? 'Compact Format' : 
             'Grouped Format'}
          </span>
        </div>
        
        <div className="bg-white p-2 rounded border border-blue-100">
          <h6 className="font-bold text-xs mb-2">ACHIEVEMENTS</h6>
          
          {displayFormat === 'detailed' && (
            <div className="space-y-2">
              <div>
                <div className="flex justify-between items-start">
                  <div className="font-medium text-xs">First Prize – National UI Challenge | Figma India | <span className="text-blue-600 underline">Certificate</span></div>
                  <div className="text-xs text-gray-500 whitespace-nowrap">Aug 2023</div>
                </div>
                <div className="text-xs text-gray-600 mt-0.5">
                  <p>• Selected from 5,000+ participants nationwide</p>
                  <p>• Created a fully responsive mobile-first prototype using Figma</p>
                </div>
              </div>
            </div>
          )}
          
          {displayFormat === 'compact' && (
            <div className="space-y-1">
              <p className="text-xs">• First Prize – National UI Challenge, Figma India (Aug 2023) <span className="text-blue-600 underline">Certificate</span></p>
              <p className="text-xs">• Finalist – UX Sprint, IIIT-Hyderabad (May 2023)</p>
              <p className="text-xs">• Runner-up – Startup Hackfest, T-Hub (Nov 2022)</p>
            </div>
          )}
          
          {displayFormat === 'grouped' && (
            <div className="space-y-2">
              <div>
                <p className="text-xs font-medium">🔹 Academic</p>
                <p className="text-xs">• AIR 52 in GATE 2024 (Feb 2024)</p>
                <p className="text-xs">• 9.6 GPA – 2nd Rank in Department (2023)</p>
              </div>
              <div>
                <p className="text-xs font-medium">🔹 Professional</p>
                <p className="text-xs">• Winner – National UI Challenge, Figma India (Aug 2023)</p>
                <p className="text-xs">• Finalist – UX Sprint, IIIT-Hyderabad (May 2023)</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-2 text-xs text-blue-700">
          <p className="font-medium">Format Details:</p>
          {displayFormat === 'detailed' && (
            <p>Detailed format shows each achievement with bullet points - best for storytelling & UX/design roles.</p>
          )}
          {displayFormat === 'compact' && (
            <p>Compact format shows one-line achievements - best for fresher resumes and 1-pagers.</p>
          )}
          {displayFormat === 'grouped' && (
            <p>Grouped format organizes achievements by category - great for users with both academic + extracurricular records.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementsForm;