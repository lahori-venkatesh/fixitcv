import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Calendar, Trophy, Award, Star, Target, Medal, ExternalLink, ChevronDown, ChevronUp, Sparkles, Zap, Tag } from 'lucide-react';
import { Achievement } from '../types/resume';

interface AchievementsFormProps {
  achievements: Achievement[];
  onUpdate: (achievements: Achievement[]) => void;
}

const AchievementsForm: React.FC<AchievementsFormProps> = ({ achievements, onUpdate }) => {
  const [expandedAchievement, setExpandedAchievement] = useState<number | null>(null);
  const [displayFormat, setDisplayFormat] = useState<'detailed' | 'compact' | 'grouped'>('detailed');

  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: '',
      description: [''],
      date: '',
      category: 'Professional',
      issuer: '',
      url: '',
      displayFormat: displayFormat
    };
    onUpdate([...achievements, newAchievement]);
    setExpandedAchievement(achievements.length);
  };

  const updateAchievement = (index: number, field: keyof Achievement, value: any) => {
    const updatedAchievements = achievements.map((achievement, i) =>
      i === index ? { ...achievement, [field]: value } : achievement
    );
    onUpdate(updatedAchievements);
  };

  const removeAchievement = (index: number) => {
    const updatedAchievements = achievements.filter((_, i) => i !== index);
    onUpdate(updatedAchievements);
    if (expandedAchievement === index) {
      setExpandedAchievement(null);
    } else if (expandedAchievement !== null && index < expandedAchievement) {
      setExpandedAchievement(expandedAchievement - 1);
    }
  };

  const updateDescription = (achievementIndex: number, descIndex: number, value: string) => {
    const updatedAchievements = [...achievements];
    if (!Array.isArray(updatedAchievements[achievementIndex].description)) {
      updatedAchievements[achievementIndex].description = [''];
    }
    const descriptions = [...updatedAchievements[achievementIndex].description as string[]];
    descriptions[descIndex] = value;
    updatedAchievements[achievementIndex].description = descriptions;
    onUpdate(updatedAchievements);
  };

  const addDescriptionItem = (achievementIndex: number) => {
    const updatedAchievements = [...achievements];
    if (!Array.isArray(updatedAchievements[achievementIndex].description)) {
      updatedAchievements[achievementIndex].description = [];
    }
    updatedAchievements[achievementIndex].description = [
      ...updatedAchievements[achievementIndex].description as string[],
      ''
    ];
    onUpdate(updatedAchievements);
  };

  const removeDescriptionItem = (achievementIndex: number, descIndex: number) => {
    const updatedAchievements = [...achievements];
    if (!Array.isArray(updatedAchievements[achievementIndex].description)) {
      return;
    }
    updatedAchievements[achievementIndex].description = (updatedAchievements[achievementIndex].description as string[])
      .filter((_, i) => i !== descIndex);
    onUpdate(updatedAchievements);
  };

  // Update display format for all achievements
  const updateAllAchievementsFormat = (format: 'detailed' | 'compact' | 'grouped') => {
    setDisplayFormat(format);
    const updatedAchievements = achievements.map(achievement => ({
      ...achievement,
      displayFormat: format
    }));
    onUpdate(updatedAchievements);
  };

  // Sort achievements by date (most recent first)
  const sortAchievements = () => {
    const sortedAchievements = [...achievements].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
    onUpdate(sortedAchievements);
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Professional':
        return <Trophy className="w-4 h-4 text-blue-500" />;
      case 'Academic':
        return <Award className="w-4 h-4 text-green-500" />;
      case 'Personal':
        return <Star className="w-4 h-4 text-purple-500" />;
      case 'Volunteer':
        return <Target className="w-4 h-4 text-orange-500" />;
      default:
        return <Medal className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Professional':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Academic':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Personal':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Volunteer':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Achievements</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Highlight your awards, honors, and notable accomplishments
          </p>
        </div>
        <motion.button
          onClick={addAchievement}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          <span>Add Achievement</span>
        </motion.button>
      </div>

      {/* Format Selection */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <Zap className="w-4 h-4 inline mr-1" />
          Display Format
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'detailed', label: 'Detailed', description: 'With bullet points', icon: Trophy },
            { id: 'compact', label: 'Compact', description: 'One-line summary', icon: Award },
            { id: 'grouped', label: 'Grouped', description: 'By category', icon: Tag }
          ].map((format) => (
            <button
              key={format.id}
              onClick={() => updateAllAchievementsFormat(format.id as any)}
              className={`p-3 border rounded-lg text-left transition-colors ${
                displayFormat === format.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                <format.icon className="w-4 h-4" />
                <div>
                  <div className="font-medium text-sm">{format.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{format.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Achievement Header */}
            <div
              className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setExpandedAchievement(expandedAchievement === index ? null : index)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    {getCategoryIcon(achievement.category || 'Other')}
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {achievement.title || `Achievement ${index + 1}`}
                    </h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(achievement.category || 'Other')}`}>
                      {achievement.category || 'Other'}
                    </span>
                  </div>
                  {achievement.description && Array.isArray(achievement.description) && achievement.description.length > 0 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {achievement.description[0]}
                    </p>
                  )}
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-500">
                    {achievement.date && (
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(achievement.date)}</span>
                      </span>
                    )}
                    {achievement.issuer && (
                      <span>• Issued by {achievement.issuer}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeAchievement(index);
                  }}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-4 h-4" />
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
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="p-4 space-y-4">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Achievement Title *
                        </label>
                        <input
                          type="text"
                          value={achievement.title}
                          onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                          placeholder="First Prize – National UI Challenge"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Category
                        </label>
                        <select
                          value={achievement.category || 'Professional'}
                          onChange={(e) => updateAchievement(index, 'category', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                          {categories.map(category => (
                            <option key={category.value} value={category.value}>{category.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Issuer and Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Issuer/Organization *
                        </label>
                        <input
                          type="text"
                          value={achievement.issuer || ''}
                          onChange={(e) => updateAchievement(index, 'issuer', e.target.value)}
                          placeholder="Figma India"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          Date Received
                        </label>
                        <input
                          type="month"
                          value={achievement.date || ''}
                          onChange={(e) => updateAchievement(index, 'date', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>

                    {/* Certificate URL */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        <ExternalLink className="w-4 h-4 inline mr-1" />
                        Certificate URL (optional)
                      </label>
                      <input
                        type="url"
                        value={achievement.url || ''}
                        onChange={(e) => updateAchievement(index, 'url', e.target.value)}
                        placeholder="https://example.com/certificate"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    {/* Display Format */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Display Format
                      </label>
                      <select
                        value={achievement.displayFormat || displayFormat}
                        onChange={(e) => updateAchievement(index, 'displayFormat', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="detailed">Detailed (with bullet points)</option>
                        <option value="compact">Compact (one-line summary)</option>
                        <option value="grouped">Grouped (by category)</option>
                      </select>
                    </div>

                    {/* Description Bullet Points */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description (bullet points)
                      </label>
                      
                      {Array.isArray(achievement.description) && achievement.description.map((desc, descIndex) => (
                        <div key={descIndex} className="flex items-center space-x-2 mb-2">
                          <div className="flex-1 relative">
                            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">•</span>
                            <input
                              type="text"
                              value={desc}
                              onChange={(e) => updateDescription(index, descIndex, e.target.value)}
                              placeholder="Selected from 5,000+ participants nationwide"
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          {(achievement.description as string[]).length > 1 && (
                            <button
                              onClick={() => removeDescriptionItem(index, descIndex)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      
                      <button
                        onClick={() => addDescriptionItem(index)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        + Add bullet point
                      </button>
                    </div>

                    {/* Achievement Tips */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <Trophy className="w-4 h-4 text-blue-500 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                            Tips for describing achievements:
                          </h4>
                          <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                            <li>• Quantify your achievement when possible (e.g., "Selected from 5,000+ participants")</li>
                            <li>• Mention the impact or significance of the achievement</li>
                            <li>• Include any competitive aspects (e.g., "Top 1% of applicants")</li>
                            <li>• Highlight skills or qualities that led to the achievement</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>

      {achievements.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No achievements yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Add your awards, honors, and notable accomplishments to stand out from other candidates.
          </p>
          <button
            onClick={addAchievement}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Achievement
          </button>
        </div>
      )}

      {/* Format Preview */}
      {achievements.length > 0 && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
              <Sparkles className="w-4 h-4 mr-1 text-blue-500" />
              Format Preview
            </h4>
            <div className="flex items-center space-x-2">
              {achievements.length > 1 && (
                <button
                  onClick={sortAchievements}
                  className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                >
                  Sort by Date
                </button>
              )}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700">
            <h5 className="font-bold text-sm mb-3 text-gray-900 dark:text-white">ACHIEVEMENTS</h5>
            
            {displayFormat === 'detailed' && (
              <div className="space-y-3">
                {achievements.slice(0, 2).map((achievement, i) => (
                  <div key={i} className="mb-2">
                    <div className="flex justify-between items-start">
                      <div className="font-medium text-sm text-gray-900 dark:text-white">
                        {achievement.title || 'First Prize – National UI Challenge'} | {achievement.issuer || 'Figma India'} {achievement.url && <span className="text-blue-600 underline">| Certificate</span>}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {achievement.date ? formatDate(achievement.date) : 'Aug 2023'}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      {Array.isArray(achievement.description) && achievement.description.length > 0 ? (
                        achievement.description.map((desc, j) => (
                          <p key={j}>• {desc || 'Selected from 5,000+ participants nationwide'}</p>
                        ))
                      ) : (
                        <>
                          <p>• Selected from 5,000+ participants nationwide</p>
                          <p>• Created a fully responsive mobile-first prototype using Figma</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                {achievements.length > 2 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                    + {achievements.length - 2} more achievements
                  </p>
                )}
              </div>
            )}
            
            {displayFormat === 'compact' && (
              <div className="space-y-1">
                {achievements.slice(0, 3).map((achievement, i) => (
                  <p key={i} className="text-xs text-gray-700 dark:text-gray-300">
                    • {achievement.title || 'First Prize – National UI Challenge'}, {achievement.issuer || 'Figma India'} ({achievement.date ? formatDate(achievement.date) : 'Aug 2023'}) {achievement.url && <span className="text-blue-600 underline">Certificate</span>}
                  </p>
                ))}
                {achievements.length > 3 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                    + {achievements.length - 3} more achievements
                  </p>
                )}
              </div>
            )}
            
            {displayFormat === 'grouped' && (
              <div className="space-y-3">
                {Object.entries(groupedAchievements).map(([category, categoryAchievements]) => (
                  <div key={category}>
                    <p className="text-xs font-medium text-gray-900 dark:text-white mb-1">🔹 {category}</p>
                    {categoryAchievements.slice(0, 2).map((achievement, i) => (
                      <p key={i} className="text-xs text-gray-700 dark:text-gray-300">
                        • {achievement.title || 'First Prize – National UI Challenge'}, {achievement.issuer || 'Figma India'} ({achievement.date ? formatDate(achievement.date) : 'Aug 2023'})
                      </p>
                    ))}
                    {categoryAchievements.length > 2 && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                        + {categoryAchievements.length - 2} more in this category
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
            <p><strong>Note:</strong> The format you choose here will be applied when your resume is generated.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementsForm;