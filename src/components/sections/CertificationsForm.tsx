import React, { useState } from 'react';
import { Trash2, Calendar, Award, ExternalLink, Plus } from 'lucide-react';

interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
  description?: string[];
}

interface CertificationsFormProps {
  sectionId: string;
  items: any[];
  onUpdateItems: (items: any[]) => void;
}

const CertificationsForm: React.FC<CertificationsFormProps> = ({
  sectionId,
  items,
  onUpdateItems
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Convert string items to certification objects if needed
  const certifications: Certification[] = items.map(item => {
    if (typeof item === 'string') {
      // Try to parse from format "Name – Issuer – Date"
      const parts = item.split('–').map(part => part.trim());
      return {
        name: parts[0] || '',
        issuer: parts[1] || '',
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

  const updateCertification = (index: number, field: keyof Certification, value: any) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value
    };
    onUpdateItems(updatedCertifications);
  };

  const addCertification = () => {
    const newCertifications = [...certifications, { 
      name: '', 
      issuer: '', 
      date: '',
      url: '',
      description: ['']
    }];
    onUpdateItems(newCertifications);
    setExpandedIndex(certifications.length);
  };

  const removeCertification = (index: number) => {
    const newCertifications = certifications.filter((_, i) => i !== index);
    onUpdateItems(newCertifications);
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else if (expandedIndex !== null && index < expandedIndex) {
      setExpandedIndex(expandedIndex - 1);
    }
  };

  const updateDescription = (certIndex: number, descIndex: number, value: string) => {
    const updatedCertifications = [...certifications];
    const descriptions = [...(updatedCertifications[certIndex].description || [])];
    descriptions[descIndex] = value;
    updatedCertifications[certIndex].description = descriptions;
    onUpdateItems(updatedCertifications);
  };

  const addDescriptionItem = (certIndex: number) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[certIndex].description = [
      ...(updatedCertifications[certIndex].description || []),
      ''
    ];
    onUpdateItems(updatedCertifications);
  };

  const removeDescriptionItem = (certIndex: number, descIndex: number) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[certIndex].description = (updatedCertifications[certIndex].description || [])
      .filter((_, i) => i !== descIndex);
    onUpdateItems(updatedCertifications);
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
      <div className="space-y-2">
        {certifications.map((certification, index) => (
          <div 
            key={index} 
            className={`p-2 border rounded-md ${
              expandedIndex === index 
                ? 'border-blue-300 bg-blue-50' 
                : 'border-gray-200 bg-gray-50 hover:border-gray-300'
            }`}
          >
            {/* Header - always visible */}
            <div 
              className="flex justify-between items-start cursor-pointer"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className="flex-1">
                <div className="flex items-center">
                  <Award className="w-3 h-3 text-blue-500 mr-1" />
                  <h5 className="font-medium text-xs text-gray-900">
                    {certification.name || 'New Certification'}
                  </h5>
                </div>
                {expandedIndex !== index && (
                  <>
                    {certification.issuer && (
                      <p className="text-xs text-gray-600 mt-0.5">{certification.issuer}</p>
                    )}
                    {certification.date && (
                      <p className="text-xs text-gray-500 mt-0.5">{formatDate(certification.date)}</p>
                    )}
                  </>
                )}
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCertification(index);
                  }}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            {/* Expanded Form */}
            {expandedIndex === index && (
              <div className="mt-2 pt-2 border-t border-gray-200 space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-0.5">
                      Course/Certificate Name *
                    </label>
                    <input
                      type="text"
                      value={certification.name}
                      onChange={(e) => updateCertification(index, 'name', e.target.value)}
                      placeholder="Complete Web Development & DSA with Java"
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-0.5">
                      Course Provider/Institution *
                    </label>
                    <input
                      type="text"
                      value={certification.issuer}
                      onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                      placeholder="Coursera"
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-0.5">
                      <Calendar className="w-3 h-3 inline mr-0.5" />
                      Issue Date *
                    </label>
                    <input
                      type="month"
                      value={certification.date}
                      onChange={(e) => updateCertification(index, 'date', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-0.5">
                      <ExternalLink className="w-3 h-3 inline mr-0.5" />
                      Certificate URL
                    </label>
                    <input
                      type="url"
                      value={certification.url || ''}
                      onChange={(e) => updateCertification(index, 'url', e.target.value)}
                      placeholder="https://verify.example.com/cert/123"
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                    />
                  </div>
                </div>
                
                {/* Description Bullet Points */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-0.5">
                    Description Bullet Points
                  </label>
                  
                  {(certification.description || []).map((desc, descIndex) => (
                    <div key={descIndex} className="flex items-center space-x-1.5 mb-1">
                      <div className="flex-1 relative">
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">•</span>
                        <input
                          type="text"
                          value={desc}
                          onChange={(e) => updateDescription(index, descIndex, e.target.value)}
                          placeholder="Mastered front-end development using HTML, CSS, JavaScript, and React.js"
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
              </div>
            )}
          </div>
        ))}
      </div>
      
      <button
        onClick={addCertification}
        className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors font-medium text-xs"
      >
        <Plus className="w-3 h-3" />
        <span>Add Certification</span>
      </button>
      
      <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
        <h5 className="font-medium text-xs text-blue-800 mb-0.5 flex items-center">
          <Award className="w-3 h-3 mr-1" />
          Format Example
        </h5>
        
        <div className="bg-white p-2 rounded border border-blue-100 mb-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-xs">Complete Web Development & DSA with Java |Coursera| <span className="text-blue-600 underline">Certificate</span></p>
              <div className="text-xs text-gray-600 mt-0.5">
                <p>• Mastered front-end development using HTML, CSS, JavaScript, and React.js.</p>
                <p>• Acquired strong problem-solving skills by implementing data structures and algorithms.</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 whitespace-nowrap">June 2023</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationsForm;