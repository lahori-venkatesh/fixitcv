import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Calendar, BookOpen, ExternalLink, Plus, ChevronDown, ChevronUp } from 'lucide-react';

interface Course {
  name: string;
  institution: string;
  year?: string;
  url?: string;
  description: string[];
}

interface CourseSectionFormProps {
  sectionId: string;
  items: any[];
  onUpdateItems: (items: any[]) => void;
}

const CourseSectionForm: React.FC<CourseSectionFormProps> = ({
  sectionId,
  items,
  onUpdateItems
}) => {
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);

  // Convert string items to course objects if needed
  const courses: Course[] = items.map(item => {
    if (typeof item === 'string') {
      // Try to parse from format "Course Name – Institution – Year"
      const parts = item.split('–').map(part => part.trim());
      return {
        name: parts[0] || '',
        institution: parts[1] || '',
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

  const updateCourse = (index: number, field: keyof Course, value: any) => {
    const updatedCourses = [...courses];
    updatedCourses[index] = {
      ...updatedCourses[index],
      [field]: value
    };
    onUpdateItems(updatedCourses);
  };

  const addCourse = () => {
    const newCourses = [...courses, { 
      name: '', 
      institution: '', 
      year: '', 
      url: '',
      description: [''] 
    }];
    onUpdateItems(newCourses);
    setExpandedCourse(courses.length);
  };

  const removeCourse = (index: number) => {
    const newCourses = courses.filter((_, i) => i !== index);
    onUpdateItems(newCourses);
    if (expandedCourse === index) {
      setExpandedCourse(null);
    } else if (expandedCourse !== null && index < expandedCourse) {
      setExpandedCourse(expandedCourse - 1);
    }
  };

  const updateDescription = (courseIndex: number, descIndex: number, value: string) => {
    const updatedCourses = [...courses];
    const descriptions = [...(updatedCourses[courseIndex].description || [])];
    descriptions[descIndex] = value;
    updatedCourses[courseIndex].description = descriptions;
    onUpdateItems(updatedCourses);
  };

  const addDescriptionItem = (courseIndex: number) => {
    const updatedCourses = [...courses];
    updatedCourses[courseIndex].description = [
      ...(updatedCourses[courseIndex].description || []),
      ''
    ];
    onUpdateItems(updatedCourses);
  };

  const removeDescriptionItem = (courseIndex: number, descIndex: number) => {
    const updatedCourses = [...courses];
    updatedCourses[courseIndex].description = (updatedCourses[courseIndex].description || [])
      .filter((_, i) => i !== descIndex);
    onUpdateItems(updatedCourses);
  };

  // Sort courses by year (most recent first)
  const sortCourses = () => {
    const sortedCourses = [...courses].sort((a, b) => {
      const yearA = a.year ? parseInt(a.year.split('/')[1] || a.year) : 0;
      const yearB = b.year ? parseInt(b.year.split('/')[1] || b.year) : 0;
      return yearB - yearA;
    });
    onUpdateItems(sortedCourses);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-900">Courses</h4>
        {courses.length > 1 && (
          <button
            onClick={sortCourses}
            className="text-blue-600 hover:text-blue-700 text-xs"
          >
            Sort by Year
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        {courses.map((course, index) => (
          <div 
            key={index} 
            className={`p-2 border rounded-md ${
              expandedCourse === index 
                ? 'border-blue-300 bg-blue-50' 
                : 'border-gray-200 bg-gray-50 hover:border-gray-300'
            }`}
          >
            {/* Header - always visible */}
            <div 
              className="flex justify-between items-start cursor-pointer"
              onClick={() => setExpandedCourse(expandedCourse === index ? null : index)}
            >
              <div className="flex-1">
                <div className="flex items-center">
                  <BookOpen className="w-3 h-3 text-blue-500 mr-1" />
                  <h5 className="font-medium text-xs text-gray-900">
                    {course.name || 'New Course'}
                  </h5>
                </div>
                {expandedCourse !== index && (
                  <>
                    {course.institution && (
                      <p className="text-xs text-gray-600 mt-0.5">{course.institution}</p>
                    )}
                    {course.year && (
                      <p className="text-xs text-gray-500 mt-0.5">{course.year}</p>
                    )}
                    {course.description && course.description.length > 0 && (
                      <p className="text-xs text-blue-600 mt-0.5">
                        {course.description.filter(d => d.trim()).length} bullet points
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className="flex items-center space-x-1">
                {expandedCourse === index ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCourse(index);
                  }}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            {/* Expanded Course Form */}
            {expandedCourse === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-2 pt-2 border-t border-gray-200 space-y-2"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-0.5">
                      Course Name *
                    </label>
                    <input
                      type="text"
                      value={course.name}
                      onChange={(e) => updateCourse(index, 'name', e.target.value)}
                      placeholder="UX Design for Beginners"
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-0.5">
                      Institution / Platform *
                    </label>
                    <input
                      type="text"
                      value={course.institution}
                      onChange={(e) => updateCourse(index, 'institution', e.target.value)}
                      placeholder="Coursera"
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-0.5">
                      <Calendar className="w-3 h-3 inline mr-0.5" />
                      Completion Date *
                    </label>
                    <input
                      type="month"
                      value={course.year || ''}
                      onChange={(e) => updateCourse(index, 'year', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-0.5">
                      <ExternalLink className="w-3 h-3 inline mr-0.5" />
                      Certificate URL (optional)
                    </label>
                    <input
                      type="url"
                      value={course.url || ''}
                      onChange={(e) => updateCourse(index, 'url', e.target.value)}
                      placeholder="https://coursera.org/verify/..."
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                    />
                  </div>
                </div>
                
                {/* Description Bullet Points */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-0.5">
                    Description Bullet Points
                  </label>
                  
                  {(course.description || []).map((desc, descIndex) => (
                    <div key={descIndex} className="flex items-center space-x-1.5 mb-1">
                      <div className="flex-1 relative">
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">•</span>
                        <input
                          type="text"
                          value={desc}
                          onChange={(e) => updateDescription(index, descIndex, e.target.value)}
                          placeholder="Built 3 mobile-first responsive designs"
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
          </div>
        ))}
      </div>
      
      <button
        onClick={addCourse}
        className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors font-medium text-xs"
      >
        <Plus className="w-3 h-3" />
        <span>Add Course</span>
      </button>
      
      <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
        <h5 className="font-medium text-xs text-blue-800 mb-0.5 flex items-center">
          <BookOpen className="w-3 h-3 mr-1" />
          Format Example
        </h5>
        
        <div className="bg-white p-2 rounded border border-blue-100 mb-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-xs">UX Design for Beginners | Coursera | <span className="text-blue-600 underline">Certificate</span></p>
              <div className="text-xs text-gray-600 mt-0.5">
                <p>• Built 3 mobile-first responsive designs</p>
                <p>• Learned user flow mapping using Figma</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 whitespace-nowrap">Mar 2024</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSectionForm;