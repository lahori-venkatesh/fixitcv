import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Calendar, Award, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface AwardItem {
  title: string;
  organization: string;
  year: string;
  url?: string;
  description: string[];
}

interface AwardSectionFormProps {
  sectionId: string;
  items: any[];
  onUpdateItems: (items: any[]) => void;
}

const AwardSectionForm: React.FC<AwardSectionFormProps> = ({
  sectionId,
  items,
  onUpdateItems
}) => {
  const [expandedAward, setExpandedAward] = useState<number | null>(null);

  // Convert string items to award objects if needed
  const awards: AwardItem[] = items.map(item => {
    if (typeof item === 'string') {
      // Try to parse from format "Title – Organization – Year"
      const parts = item.split('–').map(part => part.trim());
      return {
        title: parts[0] || '',
        organization: parts[1] || '',
        year: parts[2] || '',
        url: '',
        description: []
      };
    }
    
    // Ensure description is an array
    if (item && typeof item === 'object') {
      return {
        ...item,
        description: Array.isArray(item.description) ? item.description : 
                    item.description ? [item.description] : []
      };
    }
    
    return item;
  });

  const updateAward = (index: number, field: keyof AwardItem, value: any) => {
    const updatedAwards = [...awards];
    updatedAwards[index] = {
      ...updatedAwards[index],
      [field]: value
    };
    onUpdateItems(updatedAwards);
  };

  const addAward = () => {
    const newAwards = [...awards, { 
      title: '', 
      organization: '', 
      year: '', 
      url: '',
      description: [''] 
    }];
    onUpdateItems(newAwards);
    setExpandedAward(awards.length);
  };

  const removeAward = (index: number) => {
    const newAwards = awards.filter((_, i) => i !== index);
    onUpdateItems(newAwards);
    if (expandedAward === index) {
      setExpandedAward(null);
    } else if (expandedAward !== null && index < expandedAward) {
      setExpandedAward(expandedAward - 1);
    }
  };

  const updateDescription = (awardIndex: number, descIndex: number, value: string) => {
    const updatedAwards = [...awards];
    const descriptions = [...(updatedAwards[awardIndex].description || [])];
    descriptions[descIndex] = value;
    updatedAwards[awardIndex].description = descriptions;
    onUpdateItems(updatedAwards);
  };

  const addDescriptionItem = (awardIndex: number) => {
    const updatedAwards = [...awards];
    updatedAwards[awardIndex].description = [
      ...(updatedAwards[awardIndex].description || []),
      ''
    ];
    onUpdateItems(updatedAwards);
  };

  const removeDescriptionItem = (awardIndex: number, descIndex: number) => {
    const updatedAwards = [...awards];
    updatedAwards[awardIndex].description = (updatedAwards[awardIndex].description || [])
      .filter((_, i) => i !== descIndex);
    onUpdateItems(updatedAwards);
  };

  // Sort awards by year (most recent first)
  const sortAwards = () => {
    const sortedAwards = [...awards].sort((a, b) => {
      const yearA = parseInt(a.year) || 0;
      const yearB = parseInt(b.year) || 0;
      return yearB - yearA;
    });
    onUpdateItems(sortedAwards);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-900">Awards</h4>
        {awards.length > 1 && (
          <button
            onClick={sortAwards}
            className="text-blue-600 hover:text-blue-700 text-xs"
          >
            Sort by Year
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        {awards.map((award, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-2 border rounded-md ${
              expandedAward === index 
                ? 'border-blue-300 bg-blue-50' 
                : 'border-gray-200 bg-gray-50 hover:border-gray-300'
            }`}
          >
            {/* Award Header - always visible */}
            <div 
              className="flex justify-between items-start cursor-pointer"
              onClick={() => setExpandedAward(expandedAward === index ? null : index)}
            >
              <div className="flex-1">
                <div className="flex items-center">
                  <Award className="w-3 h-3 text-blue-500 mr-1" />
                  <h5 className="font-medium text-xs text-gray-900">
                    {award.title || 'New Award'}
                  </h5>
                </div>
                {expandedAward !== index && (
                  <>
                    {award.organization && (
                      <p className="text-xs text-gray-600 mt-0.5">{award.organization}</p>
                    )}
                    {award.year && (
                      <p className="text-xs text-gray-500 mt-0.5">{formatDate(award.year)}</p>
                    )}
                    {award.description && award.description.length > 0 && (
                      <p className="text-xs text-blue-600 mt-0.5">
                        {award.description.filter(d => d.trim()).length} bullet points
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className="flex items-center space-x-1">
                {expandedAward === index ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeAward(index);
                  }}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            {/* Expanded Award Form */}
            <AnimatePresence>
              {expandedAward === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-2 pt-2 border-t border-gray-200 space-y-2"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        Award Title *
                      </label>
                      <input
                        type="text"
                        value={award.title}
                        onChange={(e) => updateAward(index, 'title', e.target.value)}
                        placeholder="Best Design Project 2023"
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        Awarded By *
                      </label>
                      <input
                        type="text"
                        value={award.organization}
                        onChange={(e) => updateAward(index, 'organization', e.target.value)}
                        placeholder="MNIT Jaipur"
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        <Calendar className="w-3 h-3 inline mr-0.5" />
                        Date of Award *
                      </label>
                      <input
                        type="month"
                        value={award.year}
                        onChange={(e) => updateAward(index, 'year', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        <ExternalLink className="w-3 h-3 inline mr-0.5" />
                        Award URL (optional)
                      </label>
                      <input
                        type="url"
                        value={award.url || ''}
                        onChange={(e) => updateAward(index, 'url', e.target.value)}
                        placeholder="https://example.com/certificate"
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                      />
                    </div>
                  </div>
                  
                  {/* Description Bullet Points */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-0.5">
                      Description (bullet points)
                    </label>
                    
                    {(award.description || []).map((desc, descIndex) => (
                      <div key={descIndex} className="flex items-center space-x-1.5 mb-1">
                        <div className="flex-1 relative">
                          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">•</span>
                          <input
                            type="text"
                            value={desc}
                            onChange={(e) => updateDescription(index, descIndex, e.target.value)}
                            placeholder="Selected among 50+ students for design innovation"
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
        onClick={addAward}
        className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors font-medium text-xs"
      >
        <Plus className="w-3 h-3" />
        <span>Add Award</span>
      </button>
      
      <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
        <h5 className="font-medium text-xs text-blue-800 mb-0.5 flex items-center">
          <Award className="w-3 h-3 mr-1" />
          Format Example
        </h5>
        
        <div className="bg-white p-2 rounded border border-blue-100 mb-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-xs">Best Design Project 2023 | MNIT Jaipur | <span className="text-blue-600 underline">Certificate</span></p>
              <div className="text-xs text-gray-600 mt-0.5">
                <p>• Selected among 50+ students for design innovation</p>
                <p>• Project received jury appreciation and campus-wide recognition</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 whitespace-nowrap">July 2023</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardSectionForm;