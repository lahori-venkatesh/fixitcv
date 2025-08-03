import React, { useState } from 'react';
import { Trash2, Plus, Code, GripVertical, Save, RotateCcw } from 'lucide-react';

interface SkillCategory {
  category: string;
  skills: string;
}

interface TechnicalSkillsFormProps {
  sectionId: string;
  items: any[];
  onUpdateItems: (items: any[]) => void;
}

const TechnicalSkillsForm: React.FC<TechnicalSkillsFormProps> = ({
  sectionId,
  items,
  onUpdateItems
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  
  // Convert items to skill categories if needed
  const skillCategories: SkillCategory[] = items.map(item => {
    if (typeof item === 'string') {
      // Try to parse from format "Category : Skills"
      const parts = item.split(':').map(part => part.trim());
      return {
        category: parts[0] || '',
        skills: parts[1] || ''
      };
    }
    return item;
  });

  const updateCategory = (index: number, field: keyof SkillCategory, value: string) => {
    const updatedCategories = [...skillCategories];
    updatedCategories[index] = {
      ...updatedCategories[index],
      [field]: value
    };
    onUpdateItems(updatedCategories);
  };

  const addCategory = () => {
    const newCategories = [...skillCategories, { category: '', skills: '' }];
    onUpdateItems(newCategories);
  };

  const removeCategory = (index: number) => {
    const newCategories = skillCategories.filter((_, i) => i !== index);
    onUpdateItems(newCategories);
  };

  // Drag and drop functionality
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newCategories = [...skillCategories];
    const draggedItem = newCategories[draggedIndex];
    newCategories.splice(draggedIndex, 1);
    newCategories.splice(index, 0, draggedItem);
    
    onUpdateItems(newCategories);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically save to backend/localStorage
      localStorage.setItem('technicalSkills', JSON.stringify(skillCategories));
      
      setSaveMessage('Technical skills saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Failed to save. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all technical skills? This action cannot be undone.')) {
      onUpdateItems([]);
      setSaveMessage('All technical skills cleared.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  // Common skill category suggestions
  const categoryExamples = [
    { category: 'Languages', skills: 'JavaScript, TypeScript, Python, Java' },
    { category: 'Frontend Development', skills: 'React.js, Next.js, HTML5, CSS3, Tailwind CSS' },
    { category: 'Backend Development', skills: 'Node.js, Express, Django, Flask, Spring Boot' },
    { category: 'Database', skills: 'MongoDB, PostgreSQL, MySQL, Redis' },
    { category: 'DevOps', skills: 'Docker, Kubernetes, AWS, CI/CD, Git' },
    { category: 'Mobile Development', skills: 'React Native, Flutter, Swift, Kotlin' },
    { category: 'Design', skills: 'Figma, Adobe XD, Sketch, Photoshop' },
    { category: 'Testing', skills: 'Jest, Cypress, Selenium, JUnit' },
    { category: 'Tools', skills: 'Git, JIRA, Confluence, VS Code, Postman' }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-2">
        <div>
          <h3 className="text-sm font-bold text-gray-900 flex items-center">
            <Code className="w-4 h-4 text-blue-600 mr-1" />
            <span>Technical Skills</span>
          </h3>
          <p className="text-gray-600 text-xs mt-0.5">Add your technical skills organized by category</p>
        </div>
        <div className="flex items-center space-x-2">
          {saveMessage && (
            <span className={`text-xs font-medium ${
              saveMessage.includes('success') ? 'text-green-600' : 
              saveMessage.includes('Failed') ? 'text-red-600' : 'text-blue-600'
            }`}>
              {saveMessage}
            </span>
          )}
          <button
            onClick={handleClear}
            className="flex items-center space-x-1 px-2 py-1 text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors font-medium text-xs"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-1 px-2 py-1 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors font-medium text-xs disabled:opacity-50"
          >
            <Save className="w-3 h-3" />
            <span>{isSaving ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Example Format */}
      <div className="p-2 bg-blue-50 border border-blue-200 rounded-md">
        <h4 className="font-medium text-xs text-blue-800 mb-1 flex items-center">
          <Code className="w-3 h-3 mr-1" />
          Format Example
        </h4>
        
        <div className="bg-white p-2 rounded border border-blue-100 mb-2">
          <h5 className="font-bold text-xs text-gray-900 mb-1">TECHNICAL SKILLS</h5>
          <div className="space-y-1">
            <div className="flex">
              <div className="w-1/3 font-medium text-xs">• Languages</div>
              <div className="w-2/3 text-xs">: JavaScript, TypeScript, Python, Java</div>
            </div>
            <div className="flex">
              <div className="w-1/3 font-medium text-xs">• Frontend Development</div>
              <div className="w-2/3 text-xs">: React.js, Next.js, React Native, Vite, HTML5, CSS3</div>
            </div>
            <div className="flex">
              <div className="w-1/3 font-medium text-xs">• Tools</div>
              <div className="w-2/3 text-xs">: Git, Figma, VS Code</div>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Categories */}
      <div className="space-y-2">
        {skillCategories.map((category, index) => (
          <div 
            key={index} 
            className="p-2 border border-gray-200 rounded-md bg-gray-50 cursor-move"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center mb-2">
              <GripVertical className="w-4 h-4 text-gray-400 mr-1" />
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-0.5">
                    Skill Category *
                  </label>
                  <input
                    type="text"
                    value={category.category}
                    onChange={(e) => updateCategory(index, 'category', e.target.value)}
                    placeholder="Languages"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-0.5">
                    Skill List *
                  </label>
                  <input
                    type="text"
                    value={category.skills}
                    onChange={(e) => updateCategory(index, 'skills', e.target.value)}
                    placeholder="JavaScript, TypeScript, Python, Java"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                  />
                </div>
              </div>
              <button
                onClick={() => removeCategory(index)}
                className="ml-1 text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
            
            {/* Preview */}
            <div className="mt-1 p-1 bg-white rounded border border-gray-200">
              <div className="flex">
                <div className="w-1/3 font-medium text-xs">• {category.category || 'Category'}</div>
                <div className="w-2/3 text-xs">: {category.skills || 'Skills list'}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add Category Button */}
      <button
        onClick={addCategory}
        className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors font-medium text-xs"
      >
        <Plus className="w-3 h-3" />
        <span>Add Skill Category</span>
      </button>
      
      {/* Quick Templates */}
      {skillCategories.length === 0 && (
        <div className="mt-3">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Quick Templates</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {categoryExamples.slice(0, 6).map((example, index) => (
              <button
                key={index}
                onClick={() => onUpdateItems([...skillCategories, example])}
                className="p-2 border border-gray-200 rounded-md hover:bg-blue-50 hover:border-blue-300 transition-colors text-left"
              >
                <div className="font-medium text-xs text-gray-900">{example.category}</div>
                <div className="text-xs text-gray-600 truncate">{example.skills}</div>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Empty State */}
      {skillCategories.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 mt-4">
          <Code className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <h3 className="text-sm font-medium text-gray-900 mb-1">No Technical Skills Added Yet</h3>
          <p className="text-gray-600 mb-3 text-xs">
            Add your technical skills organized by category to showcase your expertise
          </p>
          <button
            onClick={addCategory}
            className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors font-medium text-xs"
          >
            Add Your First Skill Category
          </button>
        </div>
      )}
    </div>
  );
};

export default TechnicalSkillsForm;