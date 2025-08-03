import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Calendar, Building, ChevronDown, ChevronUp } from 'lucide-react';

interface Organization {
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  description: string[];
}

interface OrganizationSectionFormProps {
  sectionId: string;
  items: any[];
  onUpdateItems: (items: any[]) => void;
}

const OrganizationSectionForm: React.FC<OrganizationSectionFormProps> = ({
  sectionId,
  items,
  onUpdateItems
}) => {
  const [expandedOrg, setExpandedOrg] = useState<number | null>(null);

  // Convert string items to organization objects if needed
  const organizations: Organization[] = items.map(item => {
    if (typeof item === 'string') {
      // Try to parse from format "Name – Role"
      const parts = item.split('–').map(part => part.trim());
      return {
        name: parts[0] || '',
        role: parts[1] || '',
        startDate: '',
        endDate: '',
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

  const updateOrganization = (index: number, field: keyof Organization, value: any) => {
    const updatedOrgs = [...organizations];
    updatedOrgs[index] = {
      ...updatedOrgs[index],
      [field]: value
    };
    onUpdateItems(updatedOrgs);
  };

  const addOrganization = () => {
    const newOrgs = [...organizations, { 
      name: '', 
      role: '', 
      startDate: '', 
      endDate: '', 
      current: false,
      description: [''] 
    }];
    onUpdateItems(newOrgs);
    setExpandedOrg(organizations.length);
  };

  const removeOrganization = (index: number) => {
    const newOrgs = organizations.filter((_, i) => i !== index);
    onUpdateItems(newOrgs);
    if (expandedOrg === index) {
      setExpandedOrg(null);
    } else if (expandedOrg !== null && index < expandedOrg) {
      setExpandedOrg(expandedOrg - 1);
    }
  };

  const updateDescription = (orgIndex: number, descIndex: number, value: string) => {
    const updatedOrgs = [...organizations];
    const descriptions = [...(updatedOrgs[orgIndex].description || [])];
    descriptions[descIndex] = value;
    updatedOrgs[orgIndex].description = descriptions;
    onUpdateItems(updatedOrgs);
  };

  const addDescriptionItem = (orgIndex: number) => {
    const updatedOrgs = [...organizations];
    updatedOrgs[orgIndex].description = [
      ...(updatedOrgs[orgIndex].description || []),
      ''
    ];
    onUpdateItems(updatedOrgs);
  };

  const removeDescriptionItem = (orgIndex: number, descIndex: number) => {
    const updatedOrgs = [...organizations];
    updatedOrgs[orgIndex].description = (updatedOrgs[orgIndex].description || [])
      .filter((_, i) => i !== descIndex);
    onUpdateItems(updatedOrgs);
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
        <h4 className="text-sm font-medium text-gray-900">Organizations</h4>
      </div>
      
      <div className="space-y-2">
        {organizations.map((org, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-2 border rounded-md ${
              expandedOrg === index 
                ? 'border-blue-300 bg-blue-50' 
                : 'border-gray-200 bg-gray-50 hover:border-gray-300'
            }`}
          >
            {/* Organization Header - always visible */}
            <div 
              className="flex justify-between items-start cursor-pointer"
              onClick={() => setExpandedOrg(expandedOrg === index ? null : index)}
            >
              <div className="flex-1">
                <div className="flex items-center">
                  <Building className="w-3 h-3 text-blue-500 mr-1" />
                  <h5 className="font-medium text-xs text-gray-900">
                    {org.name || 'New Organization'}
                  </h5>
                </div>
                {expandedOrg !== index && (
                  <>
                    {org.role && (
                      <p className="text-xs text-gray-600 mt-0.5">{org.role}</p>
                    )}
                    {(org.startDate || org.endDate || org.current) && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {formatDate(org.startDate)} – {org.current ? 'Present' : formatDate(org.endDate)}
                      </p>
                    )}
                    {org.description && org.description.length > 0 && (
                      <p className="text-xs text-blue-600 mt-0.5">
                        {org.description.filter(d => d.trim()).length} bullet points
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className="flex items-center space-x-1">
                {expandedOrg === index ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOrganization(index);
                  }}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            {/* Expanded Organization Form */}
            <AnimatePresence>
              {expandedOrg === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-2 pt-2 border-t border-gray-200 space-y-2"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        Organization Name *
                      </label>
                      <input
                        type="text"
                        value={org.name}
                        onChange={(e) => updateOrganization(index, 'name', e.target.value)}
                        placeholder="Design For Good"
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        Your Role *
                      </label>
                      <input
                        type="text"
                        value={org.role}
                        onChange={(e) => updateOrganization(index, 'role', e.target.value)}
                        placeholder="UX Volunteer"
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        <Calendar className="w-3 h-3 inline mr-0.5" />
                        Start Date
                      </label>
                      <input
                        type="month"
                        value={org.startDate}
                        onChange={(e) => updateOrganization(index, 'startDate', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        <Calendar className="w-3 h-3 inline mr-0.5" />
                        End Date
                      </label>
                      <div className="flex flex-col space-y-1">
                        <input
                          type="month"
                          value={org.endDate}
                          onChange={(e) => updateOrganization(index, 'endDate', e.target.value)}
                          disabled={org.current}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 text-xs"
                        />
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={org.current || false}
                            onChange={(e) => updateOrganization(index, 'current', e.target.checked)}
                            className="rounded text-blue-600 focus:ring-blue-500 mr-1 h-3 w-3"
                          />
                          <span className="text-xs text-gray-700">Current</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description Bullet Points */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-0.5">
                      Description (bullet points)
                    </label>
                    
                    {(org.description || []).map((desc, descIndex) => (
                      <div key={descIndex} className="flex items-center space-x-1.5 mb-1">
                        <div className="flex-1 relative">
                          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">•</span>
                          <input
                            type="text"
                            value={desc}
                            onChange={(e) => updateDescription(index, descIndex, e.target.value)}
                            placeholder="Conducted user research sessions"
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
        onClick={addOrganization}
        className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors font-medium text-xs"
      >
        <Plus className="w-3 h-3" />
        <span>Add Organization</span>
      </button>
      
      <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
        <h5 className="font-medium text-xs text-blue-800 mb-0.5 flex items-center">
          <Building className="w-3 h-3 mr-1" />
          Format Example
        </h5>
        
        <div className="bg-white p-2 rounded border border-blue-100 mb-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-xs">Design For Good – UX Volunteer</p>
              <div className="text-xs text-gray-600 mt-0.5">
                <p>• Conducted 5+ user research sessions</p>
                <p>• Designed mobile-first wireframes</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 whitespace-nowrap">Jan 2023 – Present</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSectionForm;