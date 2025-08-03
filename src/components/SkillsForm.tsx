import React, { useState } from 'react';
import { Plus, Trash2, Zap, Star, Code, Palette, Link, Calendar, Sparkles, Save, RotateCcw } from 'lucide-react';
import { Skill } from '../types/resume';

interface SkillsFormProps {
  skills: Skill[];
  onUpdate: (skills: Skill[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ skills, onUpdate }) => {
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Intermediate');
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const addSkill = () => {
    if (!newSkillName.trim()) return;
    
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: newSkillName.trim(),
      level: newSkillLevel
    };
    onUpdate([...skills, newSkill]);
    setNewSkillName('');
    setNewSkillLevel('Intermediate');
    setShowSkillForm(false);
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    onUpdate(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const deleteSkill = (id: string) => {
    onUpdate(skills.filter(skill => skill.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addSkill();
    }
  };

  const openSkillForm = () => {
    setShowSkillForm(true);
    setEditingSkill(null);
    setNewSkillName('');
    setNewSkillLevel('Intermediate');
  };

  const editSkill = (skill: Skill) => {
    setEditingSkill(skill);
    setNewSkillName(skill.name);
    setNewSkillLevel(skill.level);
    setShowSkillForm(true);
  };

  const saveEditedSkill = () => {
    if (!editingSkill || !newSkillName.trim()) return;
    
    updateSkill(editingSkill.id, 'name', newSkillName.trim());
    updateSkill(editingSkill.id, 'level', newSkillLevel);
    setEditingSkill(null);
    setNewSkillName('');
    setNewSkillLevel('Intermediate');
    setShowSkillForm(false);
  };

  const cancelEdit = () => {
    setEditingSkill(null);
    setNewSkillName('');
    setNewSkillLevel('Intermediate');
    setShowSkillForm(false);
  };

  const enhanceWithAI = async (skillName: string) => {
    if (!skillName.trim()) return;
    
    // Simulate AI enhancement
    const enhancedSkill = await simulateAIEnhancement(skillName);
    setNewSkillName(enhancedSkill);
  };

  const simulateAIEnhancement = async (skill: string): Promise<string> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock AI enhancement
    const skillLower = skill.toLowerCase();
    if (skillLower.includes('js') || skillLower.includes('javascript')) {
      return 'JavaScript (ES6+, Node.js, React)';
    }
    if (skillLower.includes('python')) {
      return 'Python (Django, Flask, Data Analysis)';
    }
    if (skillLower.includes('react')) {
      return 'React.js (Hooks, Context API, Redux)';
    }
    if (skillLower.includes('css')) {
      return 'CSS3 (Flexbox, Grid, Animations)';
    }
    return skill;
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically save to backend/localStorage
      localStorage.setItem('resumeSkills', JSON.stringify(skills));
      
      setSaveMessage('Skills saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Failed to save. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all skills? This action cannot be undone.')) {
      onUpdate([]);
      setShowSkillForm(false);
      setEditingSkill(null);
      setNewSkillName('');
      setNewSkillLevel('Intermediate');
      setSaveMessage('All skills cleared.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const AIEnhanceButton = ({ onClick, isLoading = false }: { onClick: () => void; isLoading?: boolean }) => (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors disabled:opacity-50"
      title="Enhance with AI"
    >
      {isLoading ? (
        <div className="animate-spin">
          <Sparkles className="w-4 h-4" />
        </div>
      ) : (
        <Zap className="w-4 h-4" />
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <Star className="w-6 h-6 text-blue-600" />
            <span>Skills</span>
          </h3>
          <p className="text-gray-600 mt-1">Add your technical and professional skills</p>
        </div>
        <div className="flex items-center space-x-3">
          {saveMessage && (
            <span className={`text-sm font-medium ${
              saveMessage.includes('success') ? 'text-green-600' : 
              saveMessage.includes('Failed') ? 'text-red-600' : 'text-blue-600'
            }`}>
              {saveMessage}
            </span>
          )}
          <button
            onClick={handleClear}
            className="flex items-center space-x-2 px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save'}</span>
          </button>
          <button
            onClick={openSkillForm}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            <span>Add Skill</span>
          </button>
        </div>
      </div>

      {/* Skill Creation Form */}
      {showSkillForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-purple-600" />
              <span>{editingSkill ? 'Edit Skill' : 'Create Skills'}</span>
            </h4>
            {!editingSkill && (
              <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                <Zap className="w-4 h-4" />
                <span>AI Skill Suggestion</span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Skill Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skill <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter Skill"
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <AIEnhanceButton 
                  onClick={() => enhanceWithAI(newSkillName)}
                />
              </div>
            </div>

            {/* Skill Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proficiency Level
              </label>
              <select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value as any)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                onClick={editingSkill ? saveEditedSkill : addSkill}
                disabled={!newSkillName.trim()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {editingSkill ? 'Save Changes' : 'Add Skill'}
              </button>
              <button
                onClick={cancelEdit}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skills List */}
      <div className="grid gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center space-x-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-blue-600" />
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{skill.name}</h4>
              <p className="text-sm text-gray-500">{skill.level}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => editSkill(skill)}
                className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                title="Edit skill"
              >
                <Palette className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteSkill(skill.id)}
                className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                title="Delete skill"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {skills.length === 0 && !showSkillForm && (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Skills Added Yet</h3>
          <p className="text-gray-600 mb-4">Add your technical and professional skills to showcase your expertise</p>
          <button
            onClick={openSkillForm}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add Your First Skill
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;