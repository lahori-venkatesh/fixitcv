import React, { useState } from 'react';
import { Trash2, Plus, Code, Star, Zap, Sparkles } from 'lucide-react';

interface SkillItem {
  category?: string;
  skills: string;
}

interface SkillsListFormProps {
  sectionId: string;
  items: any[];
  onUpdateItems: (items: any[]) => void;
}

const SkillsListForm: React.FC<SkillsListFormProps> = ({
  sectionId,
  items,
  onUpdateItems
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'categorized' | 'simple' | 'tag-cloud' | 'rating'>('categorized');
  const [isEnhancing, setIsEnhancing] = useState(false);

  // Convert items to skill items if needed
  const skillItems: SkillItem[] = items.map(item => {
    if (typeof item === 'string') {
      return { skills: item };
    }
    return item;
  });

  const updateSkillItem = (index: number, field: keyof SkillItem, value: string) => {
    const updatedItems = [...skillItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    onUpdateItems(updatedItems);
  };

  const addSkillItem = () => {
    const newItems = [...skillItems, { category: selectedFormat === 'categorized' ? 'Category' : '', skills: '' }];
    onUpdateItems(newItems);
  };

  const removeSkillItem = (index: number) => {
    const newItems = skillItems.filter((_, i) => i !== index);
    onUpdateItems(newItems);
  };

  const enhanceWithAI = async (index: number, field: keyof SkillItem) => {
    setIsEnhancing(true);
    try {
      // Simulate AI enhancement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const item = skillItems[index];
      let enhancedValue = '';
      
      if (field === 'category') {
        // Enhance category names
        const currentValue = item.category?.toLowerCase() || '';
        if (currentValue.includes('tech') || currentValue.includes('program')) {
          enhancedValue = 'Technical Skills';
        } else if (currentValue.includes('soft') || currentValue.includes('personal')) {
          enhancedValue = 'Soft Skills';
        } else if (currentValue.includes('lang')) {
          enhancedValue = 'Languages';
        } else if (currentValue.includes('tool')) {
          enhancedValue = 'Tools & Software';
        } else {
          enhancedValue = 'Professional Skills';
        }
      } else if (field === 'skills') {
        // Enhance skills list
        const currentValue = item.skills.toLowerCase();
        if (currentValue.includes('java')) {
          enhancedValue = 'Java, Spring Boot, Hibernate, JUnit, Maven';
        } else if (currentValue.includes('python')) {
          enhancedValue = 'Python, Django, Flask, NumPy, Pandas, Scikit-learn';
        } else if (currentValue.includes('web')) {
          enhancedValue = 'HTML5, CSS3, JavaScript, React.js, Node.js, RESTful APIs';
        } else if (currentValue.includes('data')) {
          enhancedValue = 'SQL, MongoDB, PostgreSQL, Data Analysis, ETL, Tableau';
        } else if (currentValue.includes('design')) {
          enhancedValue = 'UI/UX Design, Figma, Adobe XD, Wireframing, Prototyping';
        } else if (currentValue.includes('soft') || currentValue.includes('personal')) {
          enhancedValue = 'Communication, Teamwork, Problem-solving, Time Management, Leadership';
        } else {
          enhancedValue = 'Project Management, Agile/Scrum, Critical Thinking, Attention to Detail';
        }
      }
      
      if (enhancedValue) {
        updateSkillItem(index, field, enhancedValue);
      }
    } finally {
      setIsEnhancing(false);
    }
  };

  const renderFormatPreview = () => {
    switch (selectedFormat) {
      case 'categorized':
        return (
          <div className="p-2 bg-white border border-gray-200 rounded-md">
            <div className="mb-1">
              <div className="font-medium text-xs">Technical Skills</div>
              <div className="text-xs text-gray-600">JavaScript, React, Node.js, TypeScript, Git</div>
            </div>
            <div>
              <div className="font-medium text-xs">Soft Skills</div>
              <div className="text-xs text-gray-600">Communication, Teamwork, Problem-solving</div>
            </div>
          </div>
        );
      case 'simple':
        return (
          <div className="p-2 bg-white border border-gray-200 rounded-md">
            <div className="font-medium text-xs mb-1">Skills</div>
            <div className="text-xs text-gray-600">
              JavaScript • React • Node.js • TypeScript • Git • Communication • Teamwork • Problem-solving
            </div>
          </div>
        );
      case 'tag-cloud':
        return (
          <div className="p-2 bg-white border border-gray-200 rounded-md">
            <div className="font-medium text-xs mb-1">Skills</div>
            <div className="flex flex-wrap gap-1">
              {['JavaScript', 'React', 'Node.js', 'TypeScript', 'Git'].map((skill, i) => (
                <span key={i} className="px-1 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );
      case 'rating':
        return (
          <div className="p-2 bg-white border border-gray-200 rounded-md">
            <div className="font-medium text-xs mb-1">Skills</div>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs">JavaScript</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className={`w-2.5 h-2.5 ${i <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs">React</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className={`w-2.5 h-2.5 ${i <= 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const AIEnhanceButton = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      disabled={isEnhancing}
      className="absolute right-1.5 top-1/2 transform -translate-y-1/2 p-1 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors disabled:opacity-50"
      title="Enhance with AI"
    >
      {isEnhancing ? (
        <div className="animate-spin">
          <Sparkles className="w-3 h-3" />
        </div>
      ) : (
        <Zap className="w-3 h-3" />
      )}
    </button>
  );

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-900">Skills</h4>
        <button
          onClick={() => onUpdateItems([])}
          className="text-red-600 hover:text-red-700 text-xs"
        >
          Clear All
        </button>
      </div>

      {/* Format Selection */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Choose Format
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {[
            { id: 'categorized', label: 'Categorized List' },
            { id: 'simple', label: 'Simple List' },
            { id: 'tag-cloud', label: 'Tag Cloud' },
            { id: 'rating', label: 'Skill Ratings' }
          ].map(format => (
            <button
              key={format.id}
              onClick={() => setSelectedFormat(format.id as any)}
              className={`p-1.5 border rounded-md text-left transition-colors ${
                selectedFormat === format.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-xs">{format.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Format Preview */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Preview
        </label>
        {renderFormatPreview()}
      </div>

      {/* Skills Input */}
      <div className="space-y-2">
        {selectedFormat === 'categorized' ? (
          // Categorized format
          skillItems.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2 border border-gray-200 rounded-md bg-gray-50">
              <div className="relative">
                <label className="block text-xs font-medium text-gray-700 mb-0.5">
                  Category
                </label>
                <input
                  type="text"
                  value={item.category || ''}
                  onChange={(e) => updateSkillItem(index, 'category', e.target.value)}
                  placeholder="Technical Skills"
                  className="w-full px-2 py-1 pr-7 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                />
                <AIEnhanceButton onClick={() => enhanceWithAI(index, 'category')} />
              </div>
              <div className="md:col-span-2 relative">
                <label className="block text-xs font-medium text-gray-700 mb-0.5">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  value={item.skills}
                  onChange={(e) => updateSkillItem(index, 'skills', e.target.value)}
                  placeholder="JavaScript, React, Node.js"
                  className="w-full px-2 py-1 pr-7 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                />
                <AIEnhanceButton onClick={() => enhanceWithAI(index, 'skills')} />
              </div>
              <div className="flex justify-end md:col-span-3 mt-1">
                <button
                  onClick={() => removeSkillItem(index)}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-xs"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          // Other formats (simple list, tag cloud, rating)
          skillItems.map((item, index) => (
            <div key={index} className="relative p-2 border border-gray-200 rounded-md bg-gray-50">
              <label className="block text-xs font-medium text-gray-700 mb-0.5">
                {selectedFormat === 'rating' ? 'Skill & Rating (e.g., JavaScript: 4, React: 5)' : 'Skills (comma separated)'}
              </label>
              <input
                type="text"
                value={item.skills}
                onChange={(e) => updateSkillItem(index, 'skills', e.target.value)}
                placeholder={selectedFormat === 'rating' ? 'JavaScript: 4, React: 5, Node.js: 3' : 'JavaScript, React, Node.js'}
                className="w-full px-2 py-1 pr-7 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
              />
              <AIEnhanceButton onClick={() => enhanceWithAI(index, 'skills')} />
              <div className="flex justify-end mt-1">
                <button
                  onClick={() => removeSkillItem(index)}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-xs"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      <button
        onClick={addSkillItem}
        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-xs"
      >
        <Plus className="w-3 h-3" />
        <span>Add {selectedFormat === 'categorized' ? 'Skill Category' : 'Skills'}</span>
      </button>
      
      <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
        <div className="flex items-start space-x-2">
          <Code className="w-3 h-3 text-blue-500 mt-0.5" />
          <div>
            <h5 className="font-medium text-xs text-blue-800 mb-0.5">Skills Section Tips</h5>
            <ul className="text-xs text-blue-700 space-y-0.5">
              <li>• Choose the format that best showcases your skills for your target role</li>
              <li>• For technical roles, categorized skills help recruiters quickly find relevant expertise</li>
              <li>• For creative roles, the tag cloud format can be more visually appealing</li>
              <li>• Use the AI enhancement to expand your skills with industry-standard terminology</li>
              <li>• List your strongest and most relevant skills first</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsListForm;