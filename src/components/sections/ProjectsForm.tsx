import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Calendar, ExternalLink, Github, Globe, Code, Award, Users, Target, ChevronDown, ChevronUp, Tag, Zap, Sparkles, Briefcase, Laptop, Palette, FileText, User, Link as LinkIcon, Edit3 } from 'lucide-react';
import { Project } from '../../types/resume';

interface ProjectsFormProps {
  sectionId: string;
  items: any[];
  onUpdateItems: (items: any[]) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({
  sectionId,
  items,
  onUpdateItems
}) => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [projectType, setProjectType] = useState<'Technical' | 'Non-Technical' | 'Custom'>('Technical');
  const [customType, setCustomType] = useState<string>('');
  const [editingLink, setEditingLink] = useState<{
    projectIndex: number;
    type: 'github' | 'live';
    label: string;
    color: string;
    underline: boolean;
  } | null>(null);

  // Convert string items to project objects if needed
  const projects: Project[] = items.map(item => {
    if (typeof item === 'string') {
      return {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        name: item,
        description: '',
        technologies: [],
        startDate: '',
        endDate: '',
        url: '',
        githubUrl: '',
        highlights: [],
        category: projectType === 'Custom' ? customType : projectType,
        role: '',
        linkLabels: {
          github: { label: 'GitHub', color: '#3B82F6', underline: true },
          live: { label: 'Live', color: '#3B82F6', underline: true }
        }
      };
    }
    
    // Ensure linkLabels exists
    if (!item.linkLabels) {
      item.linkLabels = {
        github: { label: 'GitHub', color: '#3B82F6', underline: true },
        live: { label: 'Live', color: '#3B82F6', underline: true }
      };
    }
    
    return item;
  });

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    onUpdateItems(updatedProjects);
  };

  const updateLinkLabel = (index: number, type: 'github' | 'live', updates: any) => {
    const updatedProjects = [...projects];
    const project = updatedProjects[index];
    
    if (!project.linkLabels) {
      project.linkLabels = {
        github: { label: 'GitHub', color: '#3B82F6', underline: true },
        live: { label: 'Live', color: '#3B82F6', underline: true }
      };
    }
    
    updatedProjects[index].linkLabels = {
      ...project.linkLabels,
      [type]: {
        ...project.linkLabels[type],
        ...updates
      }
    };
    
    onUpdateItems(updatedProjects);
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name: '',
      description: '',
      technologies: [],
      startDate: '',
      endDate: '',
      url: '',
      githubUrl: '',
      highlights: [],
      category: projectType === 'Custom' ? customType : projectType,
      role: '',
      linkLabels: {
        github: { label: 'GitHub', color: '#3B82F6', underline: true },
        live: { label: 'Live', color: '#3B82F6', underline: true }
      }
    };
    onUpdateItems([...projects, newProject]);
    setExpandedProject(projects.length);
  };

  const removeProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    onUpdateItems(updatedProjects);
    if (expandedProject === index) {
      setExpandedProject(null);
    } else if (expandedProject !== null && index < expandedProject) {
      setExpandedProject(expandedProject - 1);
    }
  };

  const addTechnology = (projectIndex: number) => {
    const project = projects[projectIndex];
    const updatedTechnologies = [...(project.technologies || []), ''];
    updateProject(projectIndex, 'technologies', updatedTechnologies);
  };

  const updateTechnology = (projectIndex: number, techIndex: number, value: string) => {
    const project = projects[projectIndex];
    const updatedTechnologies = (project.technologies || []).map((tech, i) =>
      i === techIndex ? value : tech
    );
    updateProject(projectIndex, 'technologies', updatedTechnologies);
  };

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const project = projects[projectIndex];
    const updatedTechnologies = (project.technologies || []).filter((_, i) => i !== techIndex);
    updateProject(projectIndex, 'technologies', updatedTechnologies);
  };

  const addHighlight = (projectIndex: number) => {
    const project = projects[projectIndex];
    const updatedHighlights = [...(project.highlights || []), ''];
    updateProject(projectIndex, 'highlights', updatedHighlights);
  };

  const updateHighlight = (projectIndex: number, highlightIndex: number, value: string) => {
    const project = projects[projectIndex];
    const updatedHighlights = (project.highlights || []).map((highlight, i) =>
      i === highlightIndex ? value : highlight
    );
    updateProject(projectIndex, 'highlights', updatedHighlights);
  };

  const removeHighlight = (projectIndex: number, highlightIndex: number) => {
    const project = projects[projectIndex];
    const updatedHighlights = (project.highlights || []).filter((_, i) => i !== highlightIndex);
    updateProject(projectIndex, 'highlights', updatedHighlights);
  };

  // Sort projects by date (most recent first)
  const sortProjects = () => {
    const sortedProjects = [...projects].sort((a, b) => {
      const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
      const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
      return dateB - dateA;
    });
    onUpdateItems(sortedProjects);
  };

  const getCategoryIcon = (category: string) => {
    if (category === 'Technical') return <Laptop className="w-4 h-4 text-blue-500" />;
    if (category === 'Non-Technical') return <Briefcase className="w-4 h-4 text-purple-500" />;
    if (category?.includes('Design')) return <Palette className="w-4 h-4 text-pink-500" />;
    if (category?.includes('Research')) return <FileText className="w-4 h-4 text-orange-500" />;
    if (category?.includes('Freelance')) return <Zap className="w-4 h-4 text-green-500" />;
    return <Tag className="w-4 h-4 text-gray-500" />;
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Projects</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showcase your key projects and technical accomplishments
          </p>
        </div>
        <motion.button
          onClick={addProject}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </motion.button>
      </div>

      {/* Project Type Selection */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <Zap className="w-4 h-4 inline mr-1" />
          Project Type for New Projects
        </label>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {[
            { id: 'Technical', label: 'Technical', icon: Laptop, description: 'Apps, websites, tools' },
            { id: 'Non-Technical', label: 'Non-Technical', icon: Briefcase, description: 'Events, initiatives, writing' },
            { id: 'Custom', label: 'Custom Type', icon: Tag, description: 'Create your own category' }
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setProjectType(type.id as any)}
              className={`p-3 border rounded-lg text-left transition-colors ${
                projectType === type.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
              }`}
            >
              <div className="flex items-center space-x-2">
                <type.icon className="w-4 h-4" />
                <div>
                  <div className="font-medium text-sm">{type.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{type.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Custom Type Input */}
        {projectType === 'Custom' && (
          <div className="mt-3">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Custom Project Type
            </label>
            <input
              type="text"
              value={customType}
              onChange={(e) => setCustomType(e.target.value)}
              placeholder="e.g., Design Projects, Freelance Projects"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        )}
      </div>

      <AnimatePresence>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Project Header */}
            <div
              className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setExpandedProject(expandedProject === index ? null : index)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    {getCategoryIcon(project.category || 'Technical')}
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {project.name || `Project ${index + 1}`}
                    </h4>
                    {project.role && (
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                        {project.role}
                      </span>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {project.description}
                    </p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-500">
                    {(project.startDate || project.endDate) && (
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {project.startDate ? formatDate(project.startDate) : ''} 
                          {project.startDate && project.endDate ? ' – ' : ''} 
                          {project.endDate ? formatDate(project.endDate) : ''}
                        </span>
                      </span>
                    )}
                    {project.highlights && project.highlights.length > 0 && (
                      <span className="text-blue-600 dark:text-blue-400 text-xs">
                        {project.highlights.length} bullet points
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeProject(index);
                  }}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Expanded Project Form */}
            <AnimatePresence>
              {expandedProject === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="p-4 space-y-4">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Project Name *
                        </label>
                        <input
                          type="text"
                          value={project.name}
                          onChange={(e) => updateProject(index, 'name', e.target.value)}
                          placeholder="BestXpe Hotel Booking App"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          <User className="w-4 h-4 inline mr-1" />
                          Your Role
                        </label>
                        <input
                          type="text"
                          value={project.role || ''}
                          onChange={(e) => updateProject(index, 'role', e.target.value)}
                          placeholder="Team Lead, Developer, etc."
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description *
                      </label>
                      <textarea
                        value={project.description}
                        onChange={(e) => updateProject(index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Brief description of the project and its purpose..."
                      />
                    </div>

                    {/* Key Highlights & Bullet Points */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Key Highlights & Bullet Points
                        </label>
                        <button
                          onClick={() => addHighlight(index)}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                        >
                          + Add Bullet Point
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(project.highlights || []).map((highlight, highlightIndex) => (
                          <div key={highlightIndex} className="flex items-center space-x-2">
                            <div className="flex-1 relative">
                              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 dark:text-gray-500">•</span>
                              <input
                                type="text"
                                value={highlight}
                                onChange={(e) => updateHighlight(index, highlightIndex, e.target.value)}
                                className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Built a fully responsive web app for hotel search & booking"
                              />
                            </div>
                            <button
                              onClick={() => removeHighlight(index, highlightIndex)}
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          <Code className="w-4 h-4 inline mr-1" />
                          Technologies Used
                        </label>
                        <button
                          onClick={() => addTechnology(index)}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                        >
                          + Add Technology
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(project.technologies || []).map((tech, techIndex) => (
                          <div key={techIndex} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={tech}
                              onChange={(e) => updateTechnology(index, techIndex, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                              placeholder="React, Node.js, Python, etc."
                            />
                            <button
                              onClick={() => removeTechnology(index, techIndex)}
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          Start Date
                        </label>
                        <input
                          type="month"
                          value={project.startDate || ''}
                          onChange={(e) => updateProject(index, 'startDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          End Date
                        </label>
                        <input
                          type="month"
                          value={project.endDate || ''}
                          onChange={(e) => updateProject(index, 'endDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>

                    {/* URLs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            <Github className="w-4 h-4 inline mr-1" />
                            GitHub URL
                          </label>
                          <button
                            onClick={() => setEditingLink({
                              projectIndex: index,
                              type: 'github',
                              label: project.linkLabels?.github?.label || 'GitHub',
                              color: project.linkLabels?.github?.color || '#3B82F6',
                              underline: project.linkLabels?.github?.underline !== false
                            })}
                            className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                          >
                            <Edit3 className="w-3 h-3 mr-1" />
                            Customize
                          </button>
                        </div>
                        <input
                          type="url"
                          value={project.githubUrl || ''}
                          onChange={(e) => updateProject(index, 'githubUrl', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="https://github.com/username/project"
                        />
                        {project.githubUrl && (
                          <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                            <span>Shows as: </span>
                            <span 
                              style={{ 
                                color: project.linkLabels?.github?.color || '#3B82F6',
                                textDecoration: project.linkLabels?.github?.underline !== false ? 'underline' : 'none'
                              }}
                            >
                              {project.linkLabels?.github?.label || 'GitHub'}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            <Globe className="w-4 h-4 inline mr-1" />
                            Live URL (optional)
                          </label>
                          <button
                            onClick={() => setEditingLink({
                              projectIndex: index,
                              type: 'live',
                              label: project.linkLabels?.live?.label || 'Live',
                              color: project.linkLabels?.live?.color || '#3B82F6',
                              underline: project.linkLabels?.live?.underline !== false
                            })}
                            className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                          >
                            <Edit3 className="w-3 h-3 mr-1" />
                            Customize
                          </button>
                        </div>
                        <input
                          type="url"
                          value={project.url || ''}
                          onChange={(e) => updateProject(index, 'url', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="https://myproject.com"
                        />
                        {project.url && (
                          <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                            <span>Shows as: </span>
                            <span 
                              style={{ 
                                color: project.linkLabels?.live?.color || '#3B82F6',
                                textDecoration: project.linkLabels?.live?.underline !== false ? 'underline' : 'none'
                              }}
                            >
                              {project.linkLabels?.live?.label || 'Live'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>

      {projects.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Add your first project to showcase your technical skills and accomplishments.
          </p>
          <button
            onClick={addProject}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Project
          </button>
        </div>
      )}

      {/* Format Preview */}
      {projects.length > 0 && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
              <Sparkles className="w-4 h-4 mr-1 text-blue-500" />
              Format Preview
            </h4>
            <div className="flex items-center space-x-2">
              {projects.length > 1 && (
                <button
                  onClick={sortProjects}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-medium"
                >
                  Sort by Date
                </button>
              )}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700">
            <h5 className="font-bold text-sm mb-3 text-gray-900 dark:text-white">PROJECTS</h5>
            
            {/* Technical Project Example */}
            <div className="space-y-3">
              <div className="mb-2">
                <div className="flex justify-between items-start">
                  <div className="font-medium text-sm text-gray-900 dark:text-white">
                    BestXpe Hotel Booking App | Team Lead | 
                    <span 
                      className="ml-1"
                      style={{ 
                        color: projects[0]?.linkLabels?.github?.color || '#3B82F6',
                        textDecoration: projects[0]?.linkLabels?.github?.underline !== false ? 'underline' : 'none'
                      }}
                    >
                      {projects[0]?.linkLabels?.github?.label || 'GitHub'}
                    </span> | 
                    <span 
                      className="ml-1"
                      style={{ 
                        color: projects[0]?.linkLabels?.live?.color || '#3B82F6',
                        textDecoration: projects[0]?.linkLabels?.live?.underline !== false ? 'underline' : 'none'
                      }}
                    >
                      {projects[0]?.linkLabels?.live?.label || 'Live'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Jan 2023 – Apr 2023</div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  <p>• Built a fully responsive web app for hotel search & booking</p>
                  <p>• Used React, Firebase, and TailwindCSS</p>
                  <p>• Integrated Razorpay for payments</p>
                </div>
              </div>
              
              {/* Non-Technical Project Example */}
              <div className="mb-2">
                <div className="flex justify-between items-start">
                  <div className="font-medium text-sm text-gray-900 dark:text-white">
                    UX Community Event | Event Coordinator | 
                    <span 
                      className="ml-1"
                      style={{ 
                        color: projects[0]?.linkLabels?.live?.color || '#3B82F6',
                        textDecoration: projects[0]?.linkLabels?.live?.underline !== false ? 'underline' : 'none'
                      }}
                    >
                      {projects[0]?.linkLabels?.live?.label || 'Live'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">May 2023</div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  <p>• Organized a local event with 150+ participants focused on design careers</p>
                  <p>• Coordinated logistics, speakers, and branding</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
            <p><strong>Note:</strong> The format shown above will be applied when your resume is generated.</p>
          </div>
        </div>
      )}

      {/* Link Customization Modal */}
      {editingLink && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Customize Link Appearance
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Link Label
                </label>
                <input
                  type="text"
                  value={editingLink.label}
                  onChange={(e) => setEditingLink({...editingLink, label: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="GitHub"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Link Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={editingLink.color}
                    onChange={(e) => setEditingLink({...editingLink, color: e.target.value})}
                    className="w-10 h-10 border border-gray-300 dark:border-gray-600 rounded-md"
                  />
                  <input
                    type="text"
                    value={editingLink.color}
                    onChange={(e) => setEditingLink({...editingLink, color: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="#3B82F6"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="underline-checkbox"
                  checked={editingLink.underline}
                  onChange={(e) => setEditingLink({...editingLink, underline: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                />
                <label htmlFor="underline-checkbox" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Show underline
                </label>
              </div>
              
              <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Preview:</p>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm text-gray-900 dark:text-white">Project Name</span>
                  <span className="text-gray-500 dark:text-gray-400">|</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Role</span>
                  <span 
                    className="text-sm"
                    style={{ 
                      color: editingLink.color,
                      textDecoration: editingLink.underline ? 'underline' : 'none'
                    }}
                  >
                    {editingLink.label}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingLink(null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateLinkLabel(
                    editingLink.projectIndex,
                    editingLink.type,
                    {
                      label: editingLink.label,
                      color: editingLink.color,
                      underline: editingLink.underline
                    }
                  );
                  setEditingLink(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;