import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit3, Type, List, Award, Briefcase, X, Minimize2, User, GraduationCap, MapPin, Globe, Languages, AlignCenterVertical as Certificate, Heart, Building, BookOpen, Users, FileText, Zap, Target, Star, Code, Palette, Link as LinkIcon, Calendar, Hash, Bold as BoldIcon, AlignLeft, AlignCenter, AlignRight, List as ListIcon, ListOrdered, Save, RotateCcw } from 'lucide-react';
import { CustomSection } from '../types/resume';

// Import section components
import TextSectionForm from './sections/TextSectionForm';
import ListSectionForm from './sections/ListSectionForm';
import LanguageSectionForm from './sections/LanguageSectionForm';
import CourseSectionForm from './sections/CourseSectionForm';
import AwardSectionForm from './sections/AwardSectionForm';
import OrganizationSectionForm from './sections/OrganizationSectionForm';
import PublicationSectionForm from './sections/PublicationSectionForm';
import DeclarationSectionForm from './sections/DeclarationSectionForm';
import TechnicalSkillsForm from './sections/TechnicalSkillsForm';
import ProjectsForm from './sections/ProjectsForm';
import CertificationsForm from './sections/CertificationsForm';
import InterestsForm from './sections/InterestsForm';
import ProfessionalSummaryForm from './sections/ProfessionalSummaryForm';
import ReferencesForm from './sections/ReferencesForm';
import AchievementsForm from './sections/AchievementsForm';
import SkillsListForm from './sections/SkillsListForm';

interface CustomSectionFormProps {
  customSections: CustomSection[];
  onUpdate: (sections: CustomSection[]) => void;
}

const CustomSectionForm: React.FC<CustomSectionFormProps> = ({ customSections, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSectionOptions, setShowSectionOptions] = useState(false);
  const [minimizedSections, setMinimizedSections] = useState<Set<string>>(new Set());
  const [activeFormat, setActiveFormat] = useState<string | null>(null);
  const [showLinkInput, setShowLinkInput] = useState<{ id: string; selectedText: string; range: { start: number; end: number }; isDescription: boolean } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const descTextareaRef = useRef<HTMLTextAreaElement>(null);

  const sectionOptions = [
    { id: 'languages', title: 'Languages', icon: Languages, description: 'You speak more than one language? Make sure to list them here.', type: 'list' as const },
    { id: 'interests', title: 'Interests', icon: Heart, description: 'Do you have interests that align with your career aspiration?', type: 'text' as const },
    { id: 'courses', title: 'Courses', icon: BookOpen, description: 'Did you complete MOOCs or an evening course? Show them off in this section.', type: 'list' as const },
    { id: 'awards', title: 'Awards', icon: Award, description: 'Awards like student competitions or industry accolades belong here.', type: 'achievements' as const },
    { id: 'organisations', title: 'Organisations', icon: Building, description: 'If you volunteer or participate in a good cause, why not state it?', type: 'list' as const },
    { id: 'publications', title: 'Publications', icon: FileText, description: 'Academic meetings or book releases have a dedicated place here.', type: 'list' as const },
    { id: 'references', title: 'References', icon: Users, description: 'If you have former colleagues or bosses that vouch for you, list them.', type: 'list' as const },
    { id: 'declaration', title: 'Declaration', icon: FileText, description: 'You need a declaration with signature?', type: 'text' as const },
    { id: 'achievements', title: 'Achievements', icon: Target, description: 'This is a custom section', type: 'achievements' as const, isCustom: true },
    { id: 'certifications', title: 'Certifications', icon: Certificate, description: 'This is a custom section', type: 'list' as const, isCustom: true },
    { id: 'technical-skills', title: 'Technical Skills', icon: Code, description: 'This is a custom section', type: 'list' as const, isCustom: true },
    { id: 'skills', title: 'Skills', icon: Star, description: 'Add your skills in various formats', type: 'list' as const, isCustom: true },
    { id: 'academic-projects', title: 'Academic Projects', icon: GraduationCap, description: 'This is a custom section', type: 'list' as const, isCustom: true },
    { id: 'professional-summary', title: 'Professional Summary', icon: User, description: 'This is a custom section', type: 'text' as const, isCustom: true },
    { id: 'custom', title: 'Custom', icon: Plus, description: "You didn't find what you are looking for? Or you want to combine two sections to save space?", type: 'text' as const, isCustom: true },
  ];

  // Helper function to check if an item has meaningful content
  const hasItemContent = (item: any): boolean => {
    if (typeof item === 'string') {
      return item.trim().length > 0;
    }
    if (typeof item === 'object' && item !== null) {
      // Check common string properties in objects
      const stringProps = ['title', 'name', 'description', 'institution', 'company', 'role', 'course', 'award', 'organization', 'publication', 'skill', 'certification', 'project'];
      return stringProps.some(prop => 
        item[prop] && typeof item[prop] === 'string' && item[prop].trim().length > 0
      );
    }
    return false;
  };

  const addSectionFromOption = (option: typeof sectionOptions[0]) => {
    const newSection: CustomSection = {
      id: Date.now().toString(),
      title: option.title,
      type: option.type,
      content: option.type === 'text' ? '' : [],
      customFields: {},
      description: '',
    };
    onUpdate([...customSections, newSection]);
    setEditingId(newSection.id);
    setShowSectionOptions(false);
  };

  const updateSection = (id: string, field: keyof CustomSection, value: any) => {
    onUpdate(customSections.map(section => section.id === id ? { ...section, [field]: value } : section));
  };

  const updateDescription = (id: string, value: string) => {
    onUpdate(customSections.map(section => section.id === id ? { ...section, description: value } : section));
  };

  const deleteSection = (id: string) => {
    onUpdate(customSections.filter(section => section.id !== id));
    setEditingId(null);
    setMinimizedSections(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const toggleMinimize = (id: string) => {
    setMinimizedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const addCustomField = (sectionId: string, fieldName: string) => {
    const section = customSections.find(s => s.id === sectionId);
    if (!section || !fieldName.trim()) return;
    const updatedFields = { ...section.customFields, [fieldName]: '' };
    updateSection(sectionId, 'customFields', updatedFields);
  };

  const updateCustomField = (sectionId: string, fieldName: string, value: string) => {
    const section = customSections.find(s => s.id === sectionId);
    if (!section) return;
    const updatedFields = { ...section.customFields, [fieldName]: value };
    updateSection(sectionId, 'customFields', updatedFields);
  };

  const removeCustomField = (sectionId: string, fieldName: string) => {
    const section = customSections.find(s => s.id === sectionId);
    if (!section) return;
    const updatedFields = { ...section.customFields };
    delete updatedFields[fieldName];
    updateSection(sectionId, 'customFields', updatedFields);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically save to backend/localStorage
      localStorage.setItem('resumeCustomSections', JSON.stringify(customSections));
      
      setSaveMessage('Custom sections saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Failed to save. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    const clearedSections = customSections.map(section => ({
      ...section,
      content: section.type === 'text' ? '' : [],
      description: '',
      customFields: {},
    }));
    onUpdate(clearedSections);
    setSaveMessage('Input fields cleared.');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleTextFormatting = (sectionId: string, action: string, isDescription = false) => {
    const section = customSections.find(s => s.id === sectionId);
    if (!section) return;

    const textarea = isDescription ? descTextareaRef.current : textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    let newContent = isDescription ? section.description || '' : section.content || '';

    if (action === 'link') {
      if (selectedText) {
        setShowLinkInput({ id: sectionId, selectedText, range: { start, end }, isDescription });
      }
      return;
    }

    if (!selectedText) {
      // No selection: toggle format for new input
      setActiveFormat(activeFormat === action ? null : action);
      return;
    }

    // Handle multi-line selection
    const selectedLines = selectedText.split('\n');
    let formattedText = '';
    let cursorOffset = 0;

    if (action === 'bullet' || action === 'number' || action === 'diamondBold') {
      const isAlreadyFormatted = selectedLines.every(line => 
        (action === 'bullet' && line.startsWith('• ')) ||
        (action === 'number' && line.match(/^\d+\. /)) ||
        (action === 'diamondBold' && line.startsWith('◆ '))
      );

      if (isAlreadyFormatted) {
        // Remove formatting
        formattedText = selectedLines.map(line => 
          line.replace(/^• /, '').replace(/^\d+\. /, '').replace(/^◆ /, '')
        ).join('\n');
        setActiveFormat(null);
      } else {
        // Apply formatting
        if (action === 'bullet') {
          formattedText = selectedLines.map(line => line ? `• ${line}` : '').join('\n');
          cursorOffset = 2;
          setActiveFormat('bullet');
        } else if (action === 'number') {
          formattedText = selectedLines.map((line, index) => line ? `${index + 1}. ${line}` : '').join('\n');
          cursorOffset = 3; // Assuming single-digit numbers
          setActiveFormat('number');
        } else if (action === 'diamondBold') {
          formattedText = selectedLines.map(line => line ? `◆ ${line}` : '').join('\n');
          cursorOffset = 2;
          setActiveFormat('diamondBold');
        }
      }
    } else if (action === 'bold') {
      const isAlreadyBold = newContent.slice(start, end).includes('[[bold]]');
      if (isAlreadyBold) {
        // Remove bold
        formattedText = selectedText.replace(/\[\[bold\]\](.*?)\[\[\/bold\]\]/g, '$1');
        setActiveFormat(null);
      } else {
        // Apply bold
        formattedText = `[[bold]]${selectedText}[[/bold]]`;
        cursorOffset = 8; // Length of [[bold]][[/bold]]
        setActiveFormat('bold');
      }
    }

    newContent = newContent.slice(0, start) + formattedText + newContent.slice(end);
    if (isDescription) {
      updateDescription(sectionId, newContent);
    } else {
      updateSection(sectionId, 'content', newContent);
    }

    textarea.focus();
    textarea.setSelectionRange(start + cursorOffset, end + cursorOffset);
  };

  const handleEnterKey = (sectionId: string, e: React.KeyboardEvent<HTMLTextAreaElement>, isDescription = false) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    
    const section = customSections.find(s => s.id === sectionId);
    if (!section) return;

    const textarea = isDescription ? descTextareaRef.current : textareaRef.current;
    if (!textarea) return;

    const cursorPosition = textarea.selectionStart;
    let newContent = isDescription ? section.description || '' : section.content || '';
    const lines = newContent.split('\n');
    const currentLineIndex = newContent.slice(0, cursorPosition).split('\n').length - 1;
    const currentLine = lines[currentLineIndex] || '';

    let prefix = '';
    if (activeFormat === 'bullet' || currentLine.startsWith('• ')) {
      prefix = '• ';
    } else if (activeFormat === 'number' || currentLine.match(/^\d+\. /)) {
      const prevNumber = currentLine.match(/^\d+/) ? parseInt(currentLine.match(/^\d+/)[0]) : 0;
      prefix = `${prevNumber + 1}. `;
    } else if (activeFormat === 'diamondBold' || currentLine.startsWith('◆ ')) {
      prefix = '◆ ';
    }

    lines.splice(currentLineIndex + 1, 0, prefix);
    newContent = lines.join('\n');

    if (isDescription) {
      updateDescription(sectionId, newContent);
    } else {
      updateSection(sectionId, 'content', newContent);
    }

    textarea.focus();
    textarea.setSelectionRange(cursorPosition + prefix.length + 1, cursorPosition + prefix.length + 1);
  };

  const addLink = (sectionId: string, url: string, isDescription = false) => {
    if (!showLinkInput) return;
    const section = customSections.find(s => s.id === sectionId);
    if (!section) return;

    const textarea = isDescription ? descTextareaRef.current : textareaRef.current;
    if (!textarea) return;

    const { selectedText, range } = showLinkInput;
    let newContent = isDescription ? section.description || '' : section.content || '';
    newContent = newContent.slice(0, range.start) + `[${selectedText}](${url})` + newContent.slice(range.end);

    if (isDescription) {
      updateDescription(sectionId, newContent);
    } else {
      updateSection(sectionId, 'content', newContent);
    }

    setShowLinkInput(null);
    textarea.focus();
    textarea.setSelectionRange(range.start + selectedText.length + url.length + 4, range.start + selectedText.length + url.length + 4);
  };

  const renderFormattedText = (text: string) => {
    if (!text) return text;
    // Process links: [text](url) -> <a href="url">text</a>
    text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" class="text-blue-600 underline" target="_blank">$1</a>');
    // Process bold: [[bold]]text[[/bold]] -> <b>text</b>
    text = text.replace(/\[\[bold\]\](.*?)\[\[\/bold\]\]/g, '<b>$1</b>');
    return text;
  };

  const renderSectionContent = (section: CustomSection) => {
    switch (section.type) {
      case 'text':
        if (section.title === 'Professional Summary') {
          return (
            <ProfessionalSummaryForm
              sectionId={section.id}
              content={section.content || ''}
              onUpdateContent={(content) => updateSection(section.id, 'content', content)}
              showLinkInput={showLinkInput}
              setShowLinkInput={setShowLinkInput}
              activeFormat={activeFormat}
              setActiveFormat={setActiveFormat}
              handleTextFormatting={handleTextFormatting}
              handleEnterKey={handleEnterKey}
              addLink={addLink}
            />
          );
        } else if (section.title === 'Interests') {
          return (
            <InterestsForm
              sectionId={section.id}
              content={section.content || ''}
              onUpdateContent={(content) => updateSection(section.id, 'content', content)}
            />
          );
        } else if (section.title === 'Declaration') {
          return (
            <DeclarationSectionForm
              sectionId={section.id}
              content={section.content || ''}
              onUpdateContent={(content) => updateSection(section.id, 'content', content)}
              customFields={section.customFields || {}}
              onUpdateCustomField={(field, value) => {
                const updatedFields = { ...section.customFields, [field]: value };
                updateSection(section.id, 'customFields', updatedFields);
              }}
            />
          );
        } else {
          return (
            <TextSectionForm
              sectionId={section.id}
              content={section.content || ''}
              onUpdateContent={(content) => updateSection(section.id, 'content', content)}
              showLinkInput={showLinkInput}
              setShowLinkInput={setShowLinkInput}
              activeFormat={activeFormat}
              setActiveFormat={setActiveFormat}
              handleTextFormatting={handleTextFormatting}
              handleEnterKey={handleEnterKey}
              addLink={addLink}
            />
          );
        }
      case 'list':
        // Handle different list section types based on section title
        if (section.title === 'Languages') {
          return (
            <LanguageSectionForm
              sectionId={section.id}
              items={Array.isArray(section.content) ? section.content : []}
              onUpdateItems={(items) => updateSection(section.id, 'content', items)}
            />
          );
        } else if (section.title === 'Courses') {
          return (
            <CourseSectionForm
              sectionId={section.id}
              items={Array.isArray(section.content) ? section.content : []}
              onUpdateItems={(items) => updateSection(section.id, 'content', items)}
            />
          );
        } else if (section.title === 'Publications') {
          return (
            <PublicationSectionForm
              sectionId={section.id}
              items={Array.isArray(section.content) ? section.content : []}
              onUpdateItems={(items) => updateSection(section.id, 'content', items)}
            />
          );
        } else if (section.title === 'Organisations' || section.title === 'Organizations') {
          return (
            <OrganizationSectionForm
              sectionId={section.id}
              items={Array.isArray(section.content) ? section.content : []}
              onUpdateItems={(items) => updateSection(section.id, 'content', items)}
            />
          );
        } else if (section.title === 'Technical Skills') {
          return (
            <TechnicalSkillsForm
              sectionId={section.id}
              items={Array.isArray(section.content) ? section.content : []}
              onUpdateItems={(items) => updateSection(section.id, 'content', items)}
            />
          );
        } else if (section.title === 'Skills') {
          return (
            <SkillsListForm
              sectionId={section.id}
              items={Array.isArray(section.content) ? section.content : []}
              onUpdateItems={(items) => updateSection(section.id, 'content', items)}
            />
          );
        } else if (section.title === 'Certifications') {
          return (
            <CertificationsForm
              sectionId={section.id}
              items={Array.isArray(section.content) ? section.content : []}
              onUpdateItems={(items) => updateSection(section.id, 'content', items)}
            />
          );
        } else if (section.title === 'Academic Projects' || section.title.includes('Project')) {
          return (
            <ProjectsForm
              sectionId={section.id}
              items={Array.isArray(section.content) ? section.content : []}
              onUpdateItems={(items) => updateSection(section.id, 'content', items)}
            />
          );
        } else if (section.title === 'References') {
          return (
            <ReferencesForm
              sectionId={section.id}
              items={Array.isArray(section.content) ? section.content : []}
              onUpdateItems={(items) => updateSection(section.id, 'content', items)}
            />
          );
        } else {
          // Default list handling
          return (
            <ListSectionForm
              sectionId={section.id}
              items={Array.isArray(section.content) ? section.content : []}
              description={section.description || ''}
              onUpdateItems={(items) => updateSection(section.id, 'content', items)}
              onUpdateDescription={(description) => updateDescription(section.id, description)}
              showLinkInput={showLinkInput}
              setShowLinkInput={setShowLinkInput}
              activeFormat={activeFormat}
              setActiveFormat={setActiveFormat}
              handleTextFormatting={handleTextFormatting}
              handleEnterKey={handleEnterKey}
              addLink={addLink}
              descTextareaRef={descTextareaRef}
            />
          );
        }
      case 'achievements':
        if (section.title === 'Awards') {
          return (
            <AwardSectionForm
              sectionId={section.id}
              items={Array.isArray(section.content) ? section.content : []}
              onUpdateItems={(items) => updateSection(section.id, 'content', items)}
            />
          );
        } else if (section.title === 'Achievements') {
          return (
            <AchievementsForm
              sectionId={section.id}
              items={Array.isArray(section.content) ? section.content : []}
              onUpdateItems={(items) => updateSection(section.id, 'content', items)}
            />
          );
        } else {
          // Default achievements handling
          const achievementItems = Array.isArray(section.content) ? section.content : [];
          return (
            <ListSectionForm
              sectionId={section.id}
              items={achievementItems}
              description={section.description || ''}
              onUpdateItems={(items) => updateSection(section.id, 'content', items)}
              onUpdateDescription={(description) => updateDescription(section.id, description)}
              showLinkInput={showLinkInput}
              setShowLinkInput={setShowLinkInput}
              activeFormat={activeFormat}
              setActiveFormat={setActiveFormat}
              handleTextFormatting={handleTextFormatting}
              handleEnterKey={handleEnterKey}
              addLink={addLink}
              descTextareaRef={descTextareaRef}
            />
          );
        }
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 relative">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900">Custom Sections</h3>
          <p className="text-gray-600 text-xs">Add personalized sections to showcase unique aspects of your background</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSectionOptions(true)}
            className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors font-medium text-xs"
          >
            <Plus className="w-3 h-3" />
            <span>Add Section</span>
          </button>
        </div>
      </div>

      {showSectionOptions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Add Section</h2>
                  <p className="text-gray-600 text-sm">Choose from our pre-built sections or create a custom one</p>
                </div>
                <button
                  onClick={() => setShowSectionOptions(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {sectionOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    onClick={() => addSectionFromOption(option)}
                    className={`group p-3 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                      option.id === 'custom' 
                        ? 'border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/50 hover:bg-blue-50' 
                        : option.isCustom
                          ? 'border-purple-200 hover:border-purple-400 bg-purple-50/50 hover:bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        option.id === 'custom' 
                          ? 'bg-blue-100 text-blue-600' 
                          : option.isCustom
                            ? 'bg-purple-100 text-purple-600'
                            : 'bg-gray-100 text-gray-600'
                      } group-hover:scale-110 transition-transform duration-200`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 text-sm group-hover:text-blue-600 transition-colors">
                          {option.title}
                        </h3>
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                          {option.description}
                        </p>
                        {option.isCustom && (
                          <div className="mt-1">
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                              <Hash className="w-2.5 h-2.5 mr-0.5" />
                              Custom Section
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}

      {customSections.map((section) => {
        const isMinimized = minimizedSections.has(section.id);
        const isEditing = editingId === section.id;
        const sectionOption = sectionOptions.find(opt => opt.title === section.title);
        const Icon = sectionOption?.icon || Type;

        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                  sectionOption?.isCustom ? 'bg-purple-100' : 'bg-blue-100'
                }`}>
                  <Icon className={`w-3.5 h-3.5 ${
                    sectionOption?.isCustom ? 'text-purple-600' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{section.title}</h4>
                  <p className="text-xs text-gray-500 capitalize">{section.type} section</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {isEditing && (
                  <button
                    onClick={() => toggleMinimize(section.id)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 px-2 py-1 rounded-md hover:bg-gray-50 transition-colors text-xs"
                    title={isMinimized ? 'Expand to see preview' : 'Minimize to see preview'}
                  >
                    <Minimize2 className="w-3 h-3" />
                    <span>{isMinimized ? 'Expand' : 'Minimize'}</span>
                  </button>
                )}
                <button
                  onClick={() => setEditingId(editingId === section.id ? null : section.id)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 px-2 py-1 rounded-md hover:bg-blue-50 transition-colors text-xs"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>{editingId === section.id ? 'Done' : 'Edit'}</span>
                </button>
                <button
                  onClick={() => deleteSection(section.id)}
                  className="text-red-600 hover:text-red-700 p-1 rounded-md hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>

            {editingId === section.id && !isMinimized && (
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Section Title</label>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Content</label>
                  {renderSectionContent(section)}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-medium text-gray-700">Custom Fields</label>
                    <button
                      onClick={() => addCustomField(section.id, `Field_${Object.keys(section.customFields || {}).length + 1}`)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-xs font-medium"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Field</span>
                    </button>
                  </div>
                  {section.customFields && Object.keys(section.customFields).length > 0 && (
                    <div className="space-y-2">
                      {Object.entries(section.customFields).map(([fieldName, fieldValue]) => (
                        <div key={fieldName} className="flex items-center space-x-2">
                          <div className="flex-1">
                            <label className="block text-xs text-gray-500 mb-0.5">{fieldName}</label>
                            <input
                              type="text"
                              value={fieldValue}
                              onChange={(e) => updateCustomField(section.id, fieldName, e.target.value)}
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                          </div>
                          <button
                            onClick={() => removeCustomField(section.id, fieldName)}
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {editingId === section.id && isMinimized && (
              <div className="p-3 bg-gray-50 border-t border-gray-200">
                <div className="text-xs text-gray-600 mb-1">Preview mode - editing minimized</div>
                <div className="bg-white p-2 rounded border">
                  <h5 className="font-medium text-gray-900 mb-1 text-sm">{section.title}</h5>
                  {section.type === 'text' && section.content && (
                    <div className="text-gray-700 text-xs whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: renderFormattedText(section.content) }} />
                  )}
                  {(section.type === 'list' || section.type === 'achievements') && 
                   Array.isArray(section.content) && section.content.length > 0 && (
                    <ul className="list-disc list-inside text-xs text-gray-700 space-y-0.5">
                      {section.content.filter(hasItemContent).map((item, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: renderFormattedText(typeof item === 'string' ? item : JSON.stringify(item)) }} />
                      ))}
                    </ul>
                  )}
                  {section.description && (
                    <div className="text-gray-700 text-xs whitespace-pre-wrap mt-1" dangerouslySetInnerHTML={{ __html: renderFormattedText(section.description) }} />
                  )}
                </div>
              </div>
            )}

            {editingId !== section.id && (
              <div className="p-3">
                <div className="text-xs text-gray-600">
                  {section.type === 'text' && section.content && (
                    <div className="truncate" dangerouslySetInnerHTML={{ __html: renderFormattedText(section.content) }} />
                  )}
                  {(section.type === 'list' || section.type === 'achievements') && 
                   Array.isArray(section.content) && (
                    <p>{section.content.filter(hasItemContent).length} items</p>
                  )}
                  {(!section.content || (Array.isArray(section.content) && section.content.length === 0)) && (
                    <p className="text-gray-400 italic">No content added yet</p>
                  )}
                  {section.description && (
                    <div className="text-gray-600 mt-1 truncate" dangerouslySetInnerHTML={{ __html: renderFormattedText(section.description) }}>Description: </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        );
      })}

      {customSections.length === 0 && !showSectionOptions && (
        <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
            <Plus className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-base font-medium text-gray-900 mb-1">No Custom Sections Yet</h3>
          <p className="text-gray-600 mb-3 text-sm">Add custom sections to highlight unique aspects of your background</p>
          <button
            onClick={() => setShowSectionOptions(true)}
            className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            Create Your First Section
          </button>
        </div>
      )}

      {/* Action Buttons (Save and Clear) */}
      <div className="flex justify-end items-center space-x-3 pt-3">
        {saveMessage && (
          <span className={`text-xs font-medium ${
            saveMessage.includes('success') || saveMessage.includes('cleared') ? 'text-green-600' : 
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
          onClick={handleSave}
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

export default CustomSectionForm;