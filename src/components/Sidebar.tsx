import React, { useCallback, useRef } from 'react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Download, 
  Palette, 
  Layout,
  Plus,
  Eye,
  EyeOff,
  GripVertical,
  Sliders,
  Save,
  Star,
  Crown,
  ArrowRight,
  Type,
  List
} from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd';
import { ResumeData, SectionOrder } from '../types/resume';
import { motion } from 'framer-motion';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onExport: () => void;
  onBackToLanding?: () => void;
  resumeData?: ResumeData;
  sectionOrder?: SectionOrder[];
  onSectionOrderChange?: (newOrder: SectionOrder[]) => void;
  onSectionVisibilityToggle?: (sectionId: string) => void;
  isDarkMode?: boolean;
}

interface DraggableSidebarSectionProps {
  section: any;
  index: number;
  isActive: boolean;
  onClick: () => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onVisibilityToggle: (sectionId: string) => void;
  resumeData?: ResumeData;
  isDarkMode?: boolean;
}

const DraggableSidebarSection: React.FC<DraggableSidebarSectionProps> = ({
  section,
  index,
  isActive,
  onClick,
  onMove,
  onVisibilityToggle,
  resumeData,
  isDarkMode = false
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'sidebar-section',
    item: { index, id: section.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'sidebar-section',
    hover: (item: { index: number; id: string }, monitor) => {
      if (!ref.current) return;
      if (!item) return;
      
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      
      if (!clientOffset) return;
      
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Don't replace items with themselves
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      // Perform the move
      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  // Combine drag and drop refs
  drag(drop(ref));

  const Icon = section.icon;

  const getSectionCount = () => {
    if (!resumeData) return section.description || '';
    
    switch (section.id) {
      case 'experience':
        const visibleExperience = resumeData.experience.filter(exp => exp.visible !== false);
        const totalDescriptions = visibleExperience.reduce((total, exp) => 
          total + exp.description.filter(desc => desc.trim()).length, 0
        );
        return `${visibleExperience.length} positions, ${totalDescriptions} points`;
      case 'education':
        const visibleEducation = resumeData.education.filter(ed => ed.visible !== false);
        return `${visibleEducation.length} degrees`;
      case 'personal':
        return 'Contact & summary';
      case 'skills':
        return `${resumeData.skills.length} skills`;
      case 'projects':
        return `${resumeData.projects.length} projects`;
      case 'certifications':
        return `${resumeData.certifications.length} certifications`;
      case 'achievements':
        return `${resumeData.achievements.length} achievements`;
      default:
        // For custom sections, use the description property
        if (section.id.startsWith('custom-') && section.description) {
          return section.description;
        }
        return section.description || '';
    }
  };

  return (
    <div
      ref={ref}
      className={`group relative transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      }`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <button
        onClick={onClick}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
          isActive
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
            : isDarkMode
              ? 'text-slate-300 hover:bg-slate-800 hover:scale-102'
              : 'text-gray-700 hover:bg-gray-100 hover:scale-102'
        }`}
      >
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
          isActive 
            ? 'bg-white/20' 
            : isDarkMode
              ? 'bg-slate-800 group-hover:bg-slate-700'
              : 'bg-gray-100 group-hover:bg-gray-200'
        }`}>
          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : isDarkMode ? 'text-slate-400' : 'text-gray-600'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className={`font-medium text-sm ${isActive ? 'text-white' : isDarkMode ? 'text-slate-200' : 'text-gray-900'}`}>
            {section.title}
          </div>
          <div className={`text-xs ${isActive ? 'text-blue-100' : isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            {getSectionCount()}
          </div>
        </div>
        
        {/* Visibility Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onVisibilityToggle(section.id);
          }}
          className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
            section.visible
              ? isActive 
                ? 'text-white/70 hover:text-white' 
                : isDarkMode 
                  ? 'text-slate-400 hover:text-slate-300' 
                  : 'text-gray-500 hover:text-gray-700'
              : 'text-red-500 hover:text-red-600'
          }`}
          title={section.visible ? 'Hide from resume' : 'Show in resume'}
        >
          {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
        
        {/* Drag Handle */}
        <div
          className={`cursor-move p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
            isActive ? 'text-white/70 hover:text-white' : isDarkMode ? 'text-slate-500 hover:text-slate-400' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <GripVertical className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  onExport, 
  onBackToLanding,
  resumeData,
  sectionOrder,
  onSectionOrderChange,
  onSectionVisibilityToggle,
  isDarkMode = false
}) => {
  const staticSections = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Layout, 
      description: 'Overview & quick actions',
      category: 'main'
    },
    { 
      id: 'templates', 
      label: 'Templates', 
      icon: Palette, 
      description: 'Choose your design',
      category: 'main'
    },
    { 
      id: 'premium-templates', 
      label: 'Premium Templates', 
      icon: Crown, 
      description: 'IIT, NIT, IIM & IISc templates',
      category: 'premium'
    },
    { 
      id: 'ats-score', 
      label: 'ATS Score', 
      icon: Star, 
      description: 'Real-time optimization',
      category: 'premium'
    },
    { 
      id: 'customize', 
      label: 'Customize', 
      icon: Sliders, 
      description: 'Fonts, colors & layout',
      category: 'main'
    },
    { 
      id: 'preview', 
      label: 'Preview', 
      icon: Eye, 
      description: 'Full page preview',
      category: 'main'
    }
  ];

  // Convert sectionOrder to sidebar format with icons - INCLUDE ALL SECTIONS
  const draggableContentSections = sectionOrder?.map(section => {
    return {
      ...section,
      label: section.title,
      description: section.description || (section.id.startsWith('custom-') 
        ? `Custom ${resumeData?.customSections.find(cs => cs.id === section.customSectionId)?.type || 'section'}`
        : section.title)
    };
  }) || [];

  // UNIFIED move function that handles ALL sections together
  const moveContentSection = useCallback((dragIndex: number, hoverIndex: number) => {
    if (!sectionOrder || !onSectionOrderChange) return;
    
    console.log('=== MOVING SECTION ===');
    console.log('From index:', dragIndex, 'To index:', hoverIndex);
    console.log('Before move:', sectionOrder.map(s => s.title));
    
    const newOrder = [...sectionOrder];
    const draggedSection = newOrder[dragIndex];
    
    // Remove the dragged section
    newOrder.splice(dragIndex, 1);
    // Insert it at the new position
    newOrder.splice(hoverIndex, 0, draggedSection);
    
    console.log('After move:', newOrder.map(s => s.title));
    onSectionOrderChange(newOrder);
  }, [sectionOrder, onSectionOrderChange]);

  const handleSectionClick = (sectionId: string) => {
    // Handle custom section clicks
    if (sectionId.startsWith('custom-')) {
      // Navigate to custom sections
      onSectionChange('custom');
    } else {
      onSectionChange(sectionId);
    }
  };

  const handleVisibilityToggle = (sectionId: string) => {
    if (onSectionVisibilityToggle) {
      onSectionVisibilityToggle(sectionId);
    }
  };

  const handleUpgradeClick = () => {
    if (onSectionChange) {
      onSectionChange('pricing');
    }
  };

  return (
    <div className={`w-80 h-full flex flex-col shadow-xl border-r transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-900 border-slate-800' 
        : 'bg-white border-gray-200'
    }`}>
      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Static Sections */}
          <div>
            <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 px-2 ${
              isDarkMode ? 'text-slate-500' : 'text-gray-500'
            }`}>
              Main
            </h3>
            <div className="space-y-1">
              {staticSections.filter(s => s.category === 'main').map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                
                return (
                  <button
                    key={section.id}
                    onClick={() => onSectionChange(section.id)}
                    className={`w-full group flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                        : isDarkMode
                          ? 'text-slate-300 hover:bg-slate-800 hover:scale-102'
                          : 'text-gray-700 hover:bg-gray-100 hover:scale-102'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isActive 
                        ? 'bg-white/20' 
                        : isDarkMode
                          ? 'bg-slate-800 group-hover:bg-slate-700'
                          : 'bg-gray-100 group-hover:bg-gray-200'
                    }`}>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : isDarkMode ? 'text-slate-400' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium text-sm ${isActive ? 'text-white' : isDarkMode ? 'text-slate-200' : 'text-gray-900'}`}>
                        {section.label}
                      </div>
                      <div className={`text-xs ${isActive ? 'text-blue-100' : isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                        {section.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Premium Sections */}
          <div>
            <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 px-2 ${
              isDarkMode ? 'text-slate-500' : 'text-gray-500'
            }`}>
              Premium Features
            </h3>
            <div className="space-y-1">
              {staticSections.filter(s => s.category === 'premium').map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                
                return (
                  <button
                    key={section.id}
                    onClick={() => onSectionChange(section.id)}
                    className={`w-full group flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 relative overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg transform scale-105'
                        : isDarkMode
                          ? 'text-slate-300 hover:bg-gradient-to-r hover:from-purple-900/20 hover:to-purple-800/20 hover:scale-102'
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 hover:scale-102'
                    }`}
                  >
                    {/* Premium Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-purple-600/10 to-purple-700/10 opacity-0 group-hover:opacity-100 transition-opacity ${
                      isActive ? 'opacity-100' : ''
                    }`} />
                    
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors relative z-10 ${
                      isActive 
                        ? 'bg-white/20' 
                        : isDarkMode
                          ? 'bg-purple-900/30 group-hover:bg-purple-800/40'
                          : 'bg-purple-100 group-hover:bg-purple-200'
                    }`}>
                      <Icon className={`w-4 h-4 ${
                        isActive 
                          ? 'text-white' 
                          : isDarkMode 
                            ? 'text-purple-400' 
                            : 'text-purple-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0 relative z-10">
                      <div className={`font-medium text-sm flex items-center space-x-2 ${
                        isActive ? 'text-white' : isDarkMode ? 'text-slate-200' : 'text-gray-900'
                      }`}>
                        <span>{section.label}</span>
                        <Crown className="w-3 h-3 text-yellow-500" />
                      </div>
                      <div className={`text-xs ${
                        isActive ? 'text-purple-100' : isDarkMode ? 'text-slate-400' : 'text-gray-500'
                      }`}>
                        {section.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Draggable Content Sections - ALL SECTIONS INCLUDING DEFAULTS */}
          <div>
            <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 px-2 ${
              isDarkMode ? 'text-slate-500' : 'text-gray-500'
            }`}>
              Resume Sections
            </h3>
            <div className="space-y-1">
              {draggableContentSections.map((section, index) => (
                <DraggableSidebarSection
                  key={section.id}
                  section={section}
                  index={index}
                  isActive={activeSection === section.component || (section.id.startsWith('custom-') && activeSection === 'custom')}
                  onClick={() => handleSectionClick(section.id)}
                  onMove={moveContentSection}
                  onVisibilityToggle={handleVisibilityToggle}
                  resumeData={resumeData}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </div>

          {/* Add Custom Section Button */}
          <div>
            <button
              onClick={() => onSectionChange('custom')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 border-2 border-dashed ${
                isDarkMode
                  ? 'text-purple-400 hover:bg-purple-900/20 border-purple-600 hover:border-purple-500'
                  : 'text-purple-600 hover:bg-purple-50 border-purple-300 hover:border-purple-400'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100'
              }`}>
                <Plus className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-medium text-sm ${isDarkMode ? 'text-purple-300' : 'text-purple-900'}`}>
                  Add Custom Section
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                  Create unique sections
                </div>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Upgrade to Pro Button */}
      <div className={`flex-shrink-0 p-4 border-t transition-colors duration-300 ${
        isDarkMode 
          ? 'border-slate-800 bg-slate-900/50' 
          : 'border-gray-100 bg-gray-50'
      }`}>
        <motion.button
          onClick={handleUpgradeClick}
          className="w-full flex items-center justify-between space-x-3 bg-gradient-to-r from-pink-600 to-blue-800 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all duration-200 font-semibold shadow-lg transform hover:scale-105"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Crown className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-sm">Upgrade to Pro</div>
              <div className="text-xs text-blue-100">Unlock premium templates</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-white" />
        </motion.button>
      </div>

      {/* Export Section */}
      <div className={`flex-shrink-0 p-4 border-t transition-colors duration-300 ${
        isDarkMode 
          ? 'border-slate-800 bg-slate-900/50' 
          : 'border-gray-100 bg-gray-50'
      }`}>
        <button
          onClick={onExport}
          className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold shadow-lg transform hover:scale-105"
        >
          <Download className="w-5 h-5" />
          <span>Export Resume</span>
        </button>
        <div className="mt-3 text-center">
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            Preview before download • ATS-optimized
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
