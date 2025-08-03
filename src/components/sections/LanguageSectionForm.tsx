import React from 'react';
import { Trash2 } from 'lucide-react';

interface Language {
  name: string;
  proficiency: string;
}

interface LanguageSectionFormProps {
  sectionId: string;
  items: any[];
  onUpdateItems: (items: any[]) => void;
}

const LanguageSectionForm: React.FC<LanguageSectionFormProps> = ({
  sectionId,
  items,
  onUpdateItems
}) => {
  // Convert string items to language objects if needed
  const languages: Language[] = items.map(item => {
    if (typeof item === 'string') {
      // Try to parse from format "Language – Proficiency"
      const parts = item.split('–').map(part => part.trim());
      return {
        name: parts[0] || '',
        proficiency: parts[1] || 'Intermediate'
      };
    }
    return item;
  });

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [field]: value
    };
    onUpdateItems(updatedLanguages);
  };

  const addLanguage = () => {
    const newLanguages = [...languages, { name: '', proficiency: 'Intermediate' }];
    onUpdateItems(newLanguages);
  };

  const removeLanguage = (index: number) => {
    const newLanguages = languages.filter((_, i) => i !== index);
    onUpdateItems(newLanguages);
  };

  const proficiencyLevels = ['Basic', 'Intermediate', 'Fluent', 'Native'];

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {languages.map((language, index) => (
          <div key={index} className="flex items-center space-x-1.5">
            <div className="flex-1 grid grid-cols-2 gap-1.5">
              <input
                type="text"
                value={language.name}
                onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                placeholder="Language (e.g., English)"
                className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
              />
              <select
                value={language.proficiency}
                onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
              >
                {proficiencyLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => removeLanguage(index)}
              className="text-red-600 hover:text-red-700 p-1"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addLanguage}
        className="text-blue-600 hover:text-blue-700 text-xs font-medium"
      >
        + Add Language
      </button>
      
      <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-xs text-blue-700">
          <strong>Output Format:</strong> Languages will appear on your resume as:
        </p>
        <p className="text-xs text-blue-600 mt-0.5">
          • English – Fluent<br />
          • Hindi – Native
        </p>
      </div>
    </div>
  );
};

export default LanguageSectionForm;