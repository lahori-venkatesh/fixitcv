import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Zap, Sparkles, Eye, EyeOff, GripVertical, Save, RotateCcw } from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd';
import { Experience } from '../types/resume';

interface ExperienceFormProps {
  experience: Experience[];
  onUpdate: (experience: Experience[]) => void;
}

interface DraggableExperienceProps {
  experience: Experience;
  index: number;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onEdit: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onDelete: (id: string) => void;
  isEditing: boolean;
  onUpdateExperience: (id: string, field: keyof Experience, value: any) => void;
  onUpdateDescription: (id: string, index: number, value: string) => void;
  onAddDescriptionItem: (id: string) => void;
  onRemoveDescriptionItem: (id: string, index: number) => void;
  onEnhanceWithAI: (id: string, field: string, currentValue: string) => void;
  onSave: () => void;
  onClear: (id: string) => void;
  isSaving: boolean;
  saveMessage: string;
}

const DraggableExperience: React.FC<DraggableExperienceProps> = ({
  experience,
  index,
  onMove,
  onEdit,
  onToggleVisibility,
  onDelete,
  isEditing,
  onUpdateExperience,
  onUpdateDescription,
  onAddDescriptionItem,
  onRemoveDescriptionItem,
  onEnhanceWithAI,
  onSave,
  onClear,
  isSaving,
  saveMessage,
}) => {
  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: 'experience',
    item: { index, id: experience.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'experience',
    hover: (item: { index: number; id: string }) => {
      if (!item) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const AIEnhanceButton = ({ onClick, isLoading = false }: { onClick: () => void; isLoading?: boolean }) => (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-full transition-colors disabled:opacity-50"
      title="Enhance with AI"
    >
      {isLoading ? (
        <div className="animate-spin">
          <Sparkles className="w-3 h-3" />
        </div>
      ) : (
        <Zap className="w-3 h-3" />
      )}
    </button>
  );

  const handleClear = () => {
    onClear(experience.id);
  };

  return (
    <div
      ref={(node) => dragPreview(drop(node))}
      className={`relative bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-3 transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div
            ref={drag}
            className="cursor-move p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            title="Drag to reorder"
          >
            <GripVertical className="w-4 h-4 text-gray-400" />
          </div>
          <button
            onClick={() => onEdit(experience.id)}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-xs"
          >
            <Edit3 className="w-3 h-3" />
            <span>{isEditing ? 'Collapse' : 'Edit'}</span>
          </button>
          <button
            onClick={() => onToggleVisibility(experience.id)}
            className={`flex items-center space-x-1 px-2 py-0.5 rounded-md text-xs font-medium transition-colors ${
              experience.visible !== false
                ? 'text-green-600 hover:text-green-700 hover:bg-green-50'
                : 'text-red-600 hover:text-red-700 hover:bg-red-50'
            }`}
            title={experience.visible !== false ? 'Hide from resume' : 'Show in resume'}
          >
            {experience.visible !== false ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span>{experience.visible !== false ? 'Visible' : 'Hidden'}</span>
          </button>
        </div>
        <button
          onClick={() => onDelete(experience.id)}
          className="text-red-600 hover:text-red-700 p-1 hover:bg-red-50 rounded-full transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Company Name"
                value={experience.company || ''}
                onChange={(e) => onUpdateExperience(experience.id, 'company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <AIEnhanceButton onClick={() => onEnhanceWithAI(experience.id, 'company', experience.company || '')} />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Job Title"
                value={experience.position || ''}
                onChange={(e) => onUpdateExperience(experience.id, 'position', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <AIEnhanceButton onClick={() => onEnhanceWithAI(experience.id, 'position', experience.position || '')} />
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Location"
              value={experience.location || ''}
              onChange={(e) => onUpdateExperience(experience.id, 'location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <AIEnhanceButton onClick={() => onEnhanceWithAI(experience.id, 'location', experience.location || '')} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700">Start Date</label>
              <input
                type="month"
                value={experience.startDate || ''}
                onChange={(e) => onUpdateExperience(experience.id, 'startDate', e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">End Date</label>
              <input
                type="month"
                value={experience.endDate || ''}
                onChange={(e) => onUpdateExperience(experience.id, 'endDate', e.target.value)}
                disabled={experience.current}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-sm"
              />
            </div>
          </div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={experience.current || false}
              onChange={(e) => onUpdateExperience(experience.id, 'current', e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-700">I currently work here</span>
          </label>
          <div>
            <label className="block text-xs font-medium text-gray-700">Job Description</label>
            {experience.description.map((desc, idx) => (
              <div key={idx} className="flex items-center space-x-2 mb-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="• Describe your achievement or responsibility"
                    value={desc || ''}
                    onChange={(e) => onUpdateDescription(experience.id, idx, e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <AIEnhanceButton onClick={() => onEnhanceWithAI(experience.id, 'description', desc || '')} />
                </div>
                {experience.description.length > 1 && (
                  <button
                    onClick={() => onRemoveDescriptionItem(experience.id, idx)}
                    className="text-red-600 hover:text-red-700 p-1 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => onAddDescriptionItem(experience.id)}
              className="text-blue-600 hover:text-blue-700 text-xs font-medium"
            >
              + Add bullet point
            </button>
          </div>
        </div>
      ) : (
        <div className={`${experience.visible === false ? 'opacity-50' : ''}`}>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-sm text-gray-900">{experience.position || 'Position'}</h4>
              <p className="text-xs text-gray-700">{experience.company || 'Company'}</p>
              <p className="text-xs text-gray-500">{experience.location || ''}</p>
              {experience.description.filter(desc => desc.trim()).length > 0 && (
                <p className="text-xs text-blue-600 mt-1">
                  {experience.description.filter(desc => desc.trim()).length} responsibilities
                </p>
              )}
            </div>
            {experience.visible === false && (
              <div className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                Hidden
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons for Each Experience */}
      <div className="flex justify-end items-center space-x-3 mt-3">
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
          className="flex items-center space-x-1 px-3 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium text-xs"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Clear</span>
        </button>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium text-xs disabled:opacity-50"
        >
          <Save className="w-3 h-3" />
          <span>{isSaving ? 'Saving...' : 'Save'}</span>
        </button>
      </div>
    </div>
  );
};

const ExperienceForm: React.FC<ExperienceFormProps> = ({ experience, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: [''],
      visible: true,
    };
    onUpdate([...experience, newExp]);
    setEditingId(newExp.id);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onUpdate(experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const deleteExperience = (id: string) => {
    onUpdate(experience.filter(exp => exp.id !== id));
  };

  const toggleVisibility = (id: string) => {
    updateExperience(id, 'visible', !experience.find(exp => exp.id === id)?.visible);
  };

  const moveExperience = (dragIndex: number, hoverIndex: number) => {
    const draggedExperience = experience[dragIndex];
    const newExperience = [...experience];
    newExperience.splice(dragIndex, 1);
    newExperience.splice(hoverIndex, 0, draggedExperience);
    onUpdate(newExperience);
  };

  const updateDescription = (id: string, index: number, value: string) => {
    const exp = experience.find(e => e.id === id);
    if (!exp) return;
    const newDescription = [...exp.description];
    newDescription[index] = value;
    updateExperience(id, 'description', newDescription);
  };

  const addDescriptionItem = (id: string) => {
    const exp = experience.find(e => e.id === id);
    if (!exp) return;
    updateExperience(id, 'description', [...exp.description, '']);
  };

  const removeDescriptionItem = (id: string, index: number) => {
    const exp = experience.find(e => e.id === id);
    if (!exp || exp.description.length <= 1) return;
    const newDescription = exp.description.filter((_, i) => i !== index);
    updateExperience(id, 'description', newDescription);
  };

  const enhanceWithAI = async (id: string, field: string, currentValue: string) => {
    if (!currentValue.trim()) return;
    const enhancedContent = await simulateAIEnhancement(currentValue, field);
    if (field === 'description') {
      const exp = experience.find(e => e.id === id);
      if (exp) {
        const index = exp.description.findIndex(desc => desc === currentValue);
        if (index !== -1) updateDescription(id, index, enhancedContent);
      }
    } else {
      updateExperience(id, field as keyof Experience, enhancedContent);
    }
  };

  const simulateAIEnhancement = async (content: string, field: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    switch (field) {
      case 'position':
        return content.includes('Senior') ? content : `Senior ${content}`;
      case 'company':
        return content;
      case 'description':
        if (content.toLowerCase().includes('led')) {
          return `Successfully ${content.toLowerCase()} resulting in improved team performance and project delivery`;
        }
        if (content.toLowerCase().includes('developed')) {
          return `${content} using industry best practices, enhancing user experience and system efficiency`;
        }
        return `Effectively ${content.toLowerCase()} contributing to organizational goals and team success`;
      default:
        return content;
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('resumeExperience', JSON.stringify(experience));
      setSaveMessage('Work experience saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Failed to save. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = (id: string) => {
    onUpdate(experience.map(exp => 
      exp.id === id ? {
        ...exp,
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: [''],
      } : exp
    ));
    setSaveMessage('Experience cleared.');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Add Experience Button */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900">Work Experience</h3>
          <p className="text-gray-600 text-xs">Add your professional work experience and achievements</p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors font-medium text-xs"
        >
          <Plus className="w-3 h-3" />
          <span>Add Experience</span>
        </button>
      </div>

      {experience.length > 0 ? (
        <div className="space-y-3">
          {experience.map((exp, index) => (
            <DraggableExperience
              key={exp.id}
              experience={exp}
              index={index}
              onMove={moveExperience}
              onEdit={(id) => setEditingId(editingId === id ? null : id)}
              onToggleVisibility={toggleVisibility}
              onDelete={deleteExperience}
              isEditing={editingId === exp.id}
              onUpdateExperience={updateExperience}
              onUpdateDescription={updateDescription}
              onAddDescriptionItem={addDescriptionItem}
              onRemoveDescriptionItem={removeDescriptionItem}
              onEnhanceWithAI={enhanceWithAI}
              onSave={handleSave}
              onClear={handleClear}
              isSaving={isSaving}
              saveMessage={saveMessage}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
            <Plus className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-base font-medium text-gray-900 mb-1">No Work Experience Added Yet</h3>
          <p className="text-gray-600 mb-3 text-sm">Add your professional work experience to showcase your career journey</p>
          <button
            onClick={addExperience}
            className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            Add Your First Experience
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;