import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Calendar, FileText, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface Publication {
  title: string;
  source: string;
  date: string;
  url?: string;
  description: string[];
}

interface PublicationSectionFormProps {
  sectionId: string;
  items: any[];
  onUpdateItems: (items: any[]) => void;
}

const PublicationSectionForm: React.FC<PublicationSectionFormProps> = ({
  sectionId,
  items,
  onUpdateItems
}) => {
  const [expandedPublication, setExpandedPublication] = useState<number | null>(null);

  // Convert string items to publication objects if needed
  const publications: Publication[] = items.map(item => {
    if (typeof item === 'string') {
      // Try to parse from format "Title – Source – Date"
      const parts = item.split('–').map(part => part.trim());
      return {
        title: parts[0] || '',
        source: parts[1] || '',
        date: parts[2] || '',
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

  const updatePublication = (index: number, field: keyof Publication, value: any) => {
    const updatedPublications = [...publications];
    updatedPublications[index] = {
      ...updatedPublications[index],
      [field]: value
    };
    onUpdateItems(updatedPublications);
  };

  const addPublication = () => {
    const newPublications = [...publications, { 
      title: '', 
      source: '', 
      date: '', 
      url: '',
      description: [''] 
    }];
    onUpdateItems(newPublications);
    setExpandedPublication(publications.length);
  };

  const removePublication = (index: number) => {
    const newPublications = publications.filter((_, i) => i !== index);
    onUpdateItems(newPublications);
    if (expandedPublication === index) {
      setExpandedPublication(null);
    } else if (expandedPublication !== null && index < expandedPublication) {
      setExpandedPublication(expandedPublication - 1);
    }
  };

  const updateDescription = (pubIndex: number, descIndex: number, value: string) => {
    const updatedPublications = [...publications];
    const descriptions = [...(updatedPublications[pubIndex].description || [])];
    descriptions[descIndex] = value;
    updatedPublications[pubIndex].description = descriptions;
    onUpdateItems(updatedPublications);
  };

  const addDescriptionItem = (pubIndex: number) => {
    const updatedPublications = [...publications];
    updatedPublications[pubIndex].description = [
      ...(updatedPublications[pubIndex].description || []),
      ''
    ];
    onUpdateItems(updatedPublications);
  };

  const removeDescriptionItem = (pubIndex: number, descIndex: number) => {
    const updatedPublications = [...publications];
    updatedPublications[pubIndex].description = (updatedPublications[pubIndex].description || [])
      .filter((_, i) => i !== descIndex);
    onUpdateItems(updatedPublications);
  };

  // Sort publications by date (most recent first)
  const sortPublications = () => {
    const sortedPublications = [...publications].sort((a, b) => {
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;
      return dateB - dateA;
    });
    onUpdateItems(sortedPublications);
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
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-900">Publications</h4>
        {publications.length > 1 && (
          <button
            onClick={sortPublications}
            className="text-blue-600 hover:text-blue-700 text-xs"
          >
            Sort by Date
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        {publications.map((publication, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-2 border rounded-md ${
              expandedPublication === index 
                ? 'border-blue-300 bg-blue-50' 
                : 'border-gray-200 bg-gray-50 hover:border-gray-300'
            }`}
          >
            {/* Publication Header - always visible */}
            <div 
              className="flex justify-between items-start cursor-pointer"
              onClick={() => setExpandedPublication(expandedPublication === index ? null : index)}
            >
              <div className="flex-1">
                <div className="flex items-center">
                  <FileText className="w-3 h-3 text-blue-500 mr-1" />
                  <h5 className="font-medium text-xs text-gray-900">
                    {publication.title || 'New Publication'}
                  </h5>
                </div>
                {expandedPublication !== index && (
                  <>
                    {publication.source && (
                      <p className="text-xs text-gray-600 mt-0.5">{publication.source}</p>
                    )}
                    {publication.date && (
                      <p className="text-xs text-gray-500 mt-0.5">{formatDate(publication.date)}</p>
                    )}
                    {publication.description && publication.description.length > 0 && (
                      <p className="text-xs text-blue-600 mt-0.5">
                        {publication.description.filter(d => d.trim()).length} bullet points
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className="flex items-center space-x-1">
                {expandedPublication === index ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removePublication(index);
                  }}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            {/* Expanded Publication Form */}
            <AnimatePresence>
              {expandedPublication === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-2 pt-2 border-t border-gray-200 space-y-2"
                >
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-0.5">
                      Publication Title *
                    </label>
                    <input
                      type="text"
                      value={publication.title}
                      onChange={(e) => updatePublication(index, 'title', e.target.value)}
                      placeholder="Redesigning UX for EdTech Apps"
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        Published On *
                      </label>
                      <input
                        type="text"
                        value={publication.source}
                        onChange={(e) => updatePublication(index, 'source', e.target.value)}
                        placeholder="Medium, IEEE, DesignUp Journal"
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        <Calendar className="w-3 h-3 inline mr-0.5" />
                        Date of Publication *
                      </label>
                      <input
                        type="month"
                        value={publication.date}
                        onChange={(e) => updatePublication(index, 'date', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-0.5">
                      <ExternalLink className="w-3 h-3 inline mr-0.5" />
                      Publication URL *
                    </label>
                    <input
                      type="url"
                      value={publication.url || ''}
                      onChange={(e) => updatePublication(index, 'url', e.target.value)}
                      placeholder="https://medium.com/..."
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                    />
                  </div>
                  
                  {/* Description Bullet Points */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-0.5">
                      Description (optional)
                    </label>
                    
                    {(publication.description || []).map((desc, descIndex) => (
                      <div key={descIndex} className="flex items-center space-x-1.5 mb-1">
                        <div className="flex-1 relative">
                          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">•</span>
                          <input
                            type="text"
                            value={desc}
                            onChange={(e) => updateDescription(index, descIndex, e.target.value)}
                            placeholder="Explained design problems and Figma solutions in EdTech apps"
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
        onClick={addPublication}
        className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors font-medium text-xs"
      >
        <Plus className="w-3 h-3" />
        <span>Add Publication</span>
      </button>
      
      <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
        <h5 className="font-medium text-xs text-blue-800 mb-0.5 flex items-center">
          <FileText className="w-3 h-3 mr-1" />
          Format Example
        </h5>
        
        <div className="bg-white p-2 rounded border border-blue-100 mb-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-xs">Redesigning UX for EdTech Apps | Medium | <span className="text-blue-600 underline">Read</span></p>
              <div className="text-xs text-gray-600 mt-0.5">
                <p>• Covered mobile UX challenges and responsive design for online learning platforms.</p>
                <p>• Reached 10,000+ readers within the first two weeks.</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 whitespace-nowrap">May 2024</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationSectionForm;