import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Type, 
  Palette, 
  Layout, 
  Space as Spacing, 
  Eye, 
  RotateCcw, 
  ChevronDown, 
  ChevronRight, 
  Sliders, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Circle, 
  Square, 
  Minus, 
  ArrowRight,
  FileText,
  RotateCw,
  Hash,
  Monitor
} from 'lucide-react';
import { ResumeCustomization } from '../types/resume';

interface CustomizationPanelProps {
  customization: ResumeCustomization;
  onUpdate: (updates: Partial<ResumeCustomization>) => void;
  onReset: () => void;
}

const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  customization,
  onUpdate,
  onReset
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['typography']));

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const fontFamilies = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Source Sans Pro',
    'Poppins',
    'Nunito',
    'Playfair Display',
    'Merriweather',
    'Georgia',
    'Times New Roman',
    'Arial',
    'Helvetica'
  ];

  const presetColors = [
    { name: 'Professional Blue', primary: '#2563EB', secondary: '#64748B', accent: '#10B981' },
    { name: 'Executive Navy', primary: '#1E3A8A', secondary: '#475569', accent: '#059669' },
    { name: 'Creative Purple', primary: '#7C3AED', secondary: '#6B7280', accent: '#F59E0B' },
    { name: 'Modern Teal', primary: '#0D9488', secondary: '#64748B', accent: '#3B82F6' },
    { name: 'Elegant Rose', primary: '#E11D48', secondary: '#64748B', accent: '#8B5CF6' },
    { name: 'Tech Green', primary: '#059669', secondary: '#6B7280', accent: '#3B82F6' },
    { name: 'Minimal Gray', primary: '#374151', secondary: '#9CA3AF', accent: '#EF4444' },
    { name: 'Warm Orange', primary: '#EA580C', secondary: '#64748B', accent: '#10B981' }
  ];

  const bulletStyles = [
    { id: 'disc', label: 'Disc', icon: Circle },
    { id: 'circle', label: 'Circle', icon: Circle },
    { id: 'square', label: 'Square', icon: Square },
    { id: 'dash', label: 'Dash', icon: Minus },
    { id: 'arrow', label: 'Arrow', icon: ArrowRight }
  ];

  const pageFormats = [
    { id: 'A4', label: 'A4 (8.27" × 11.69")', width: 8.27, height: 11.69 },
    { id: 'Letter', label: 'Letter (8.5" × 11")', width: 8.5, height: 11 },
    { id: 'Legal', label: 'Legal (8.5" × 14")', width: 8.5, height: 14 },
    { id: 'Custom', label: 'Custom Size', width: 0, height: 0 }
  ];

  const pageNumberPositions = [
    { id: 'top-left', label: 'Top Left' },
    { id: 'top-center', label: 'Top Center' },
    { id: 'top-right', label: 'Top Right' },
    { id: 'bottom-left', label: 'Bottom Left' },
    { id: 'bottom-center', label: 'Bottom Center' },
    { id: 'bottom-right', label: 'Bottom Right' }
  ];

  const SectionHeader = ({ title, icon: Icon, sectionKey }: { title: string; icon: any; sectionKey: string }) => {
    const isExpanded = expandedSections.has(sectionKey);
    
    return (
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon className="w-4 h-4 text-blue-600" />
          </div>
          <span className="font-semibold text-gray-900">{title}</span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-500" />
        )}
      </button>
    );
  };

  return (
    <div className="space-y-6 max-w-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resume Customization</h2>
          <p className="text-gray-600 mt-1">Personalize every aspect of your resume design</p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* Page Settings Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <SectionHeader title="Page Settings" icon={FileText} sectionKey="page" />
        
        {expandedSections.has('page') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-6 space-y-6"
          >
            {/* Page Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Page Format</label>
              <div className="space-y-2">
                {pageFormats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => onUpdate({
                      layout: { ...customization.layout, pageFormat: format.id as any }
                    })}
                    className={`w-full flex items-center justify-between p-3 border rounded-lg transition-colors ${
                      customization.layout.pageFormat === format.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span className="font-medium">{format.label}</span>
                    {customization.layout.pageFormat === format.id && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Dimensions */}
            {customization.layout.pageFormat === 'Custom' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Width (inches)</label>
                  <input
                    type="number"
                    min="4"
                    max="20"
                    step="0.1"
                    value={customization.layout.pageWidth}
                    onChange={(e) => onUpdate({
                      layout: { ...customization.layout, pageWidth: parseFloat(e.target.value) }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Height (inches)</label>
                  <input
                    type="number"
                    min="4"
                    max="20"
                    step="0.1"
                    value={customization.layout.pageHeight}
                    onChange={(e) => onUpdate({
                      layout: { ...customization.layout, pageHeight: parseFloat(e.target.value) }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Orientation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Orientation</label>
              <div className="flex space-x-2">
                {[
                  { value: 'portrait', icon: Monitor, label: 'Portrait' },
                  { value: 'landscape', icon: RotateCw, label: 'Landscape' }
                ].map(({ value, icon: Icon, label }) => (
                  <button
                    key={value}
                    onClick={() => onUpdate({
                      layout: { ...customization.layout, orientation: value as any }
                    })}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                      customization.layout.orientation === value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Max Pages */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Pages</label>
              <input
                type="range"
                min="1"
                max="5"
                value={customization.layout.maxPages}
                onChange={(e) => onUpdate({
                  layout: { ...customization.layout, maxPages: parseInt(e.target.value) }
                })}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>1 page</span>
                <span className="font-medium">{customization.layout.maxPages} pages</span>
                <span>5 pages</span>
              </div>
            </div>

            {/* Page Break Behavior */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Page Break Behavior</label>
              <select
                value={customization.layout.pageBreakBehavior}
                onChange={(e) => onUpdate({
                  layout: { ...customization.layout, pageBreakBehavior: e.target.value as any }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="auto">Automatic (Smart breaks)</option>
                <option value="manual">Manual (User controlled)</option>
                <option value="avoid">Avoid breaks (Keep sections together)</option>
              </select>
            </div>

            {/* Page Numbers */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Show Page Numbers</label>
                <input
                  type="checkbox"
                  checked={customization.layout.showPageNumbers}
                  onChange={(e) => onUpdate({
                    layout: { ...customization.layout, showPageNumbers: e.target.checked }
                  })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              
              {customization.layout.showPageNumbers && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Page Number Position</label>
                  <select
                    value={customization.layout.pageNumberPosition}
                    onChange={(e) => onUpdate({
                      layout: { ...customization.layout, pageNumberPosition: e.target.value as any }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {pageNumberPositions.map(pos => (
                      <option key={pos.id} value={pos.id}>{pos.label}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Header on All Pages */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Show Header on All Pages</label>
              <input
                type="checkbox"
                checked={customization.layout.headerOnAllPages}
                onChange={(e) => onUpdate({
                  layout: { ...customization.layout, headerOnAllPages: e.target.checked }
                })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>

            {/* Footer Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Footer Text (Optional)</label>
              <input
                type="text"
                value={customization.layout.footerText}
                onChange={(e) => onUpdate({
                  layout: { ...customization.layout, footerText: e.target.value }
                })}
                placeholder="e.g., Confidential Resume"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Page Border */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Page Border</label>
                <input
                  type="checkbox"
                  checked={customization.borders.pageBorder}
                  onChange={(e) => onUpdate({
                    borders: { ...customization.borders, pageBorder: e.target.checked }
                  })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              
              {customization.borders.pageBorder && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Border Width</label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={customization.borders.pageBorderWidth}
                      onChange={(e) => onUpdate({
                        borders: { ...customization.borders, pageBorderWidth: parseInt(e.target.value) }
                      })}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-500">{customization.borders.pageBorderWidth}px</span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Border Color</label>
                    <input
                      type="color"
                      value={customization.borders.pageBorderColor}
                      onChange={(e) => onUpdate({
                        borders: { ...customization.borders, pageBorderColor: e.target.value }
                      })}
                      className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Typography Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <SectionHeader title="Typography" icon={Type} sectionKey="typography" />
        
        {expandedSections.has('typography') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-6 space-y-6"
          >
            {/* Font Family */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
              <select
                value={customization.fontFamily}
                onChange={(e) => onUpdate({ fontFamily: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {fontFamilies.map(font => (
                  <option key={font} value={font} style={{ fontFamily: font }}>
                    {font}
                  </option>
                ))}
              </select>
            </div>

            {/* Font Sizes */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name Size</label>
                <input
                  type="range"
                  min="24"
                  max="48"
                  value={customization.fontSize.name}
                  onChange={(e) => onUpdate({
                    fontSize: { ...customization.fontSize, name: parseInt(e.target.value) }
                  })}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{customization.fontSize.name}px</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Heading Size</label>
                <input
                  type="range"
                  min="16"
                  max="28"
                  value={customization.fontSize.heading}
                  onChange={(e) => onUpdate({
                    fontSize: { ...customization.fontSize, heading: parseInt(e.target.value) }
                  })}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{customization.fontSize.heading}px</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Body Size</label>
                <input
                  type="range"
                  min="10"
                  max="18"
                  value={customization.fontSize.body}
                  onChange={(e) => onUpdate({
                    fontSize: { ...customization.fontSize, body: parseInt(e.target.value) }
                  })}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{customization.fontSize.body}px</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Small Size</label>
                <input
                  type="range"
                  min="8"
                  max="14"
                  value={customization.fontSize.small}
                  onChange={(e) => onUpdate({
                    fontSize: { ...customization.fontSize, small: parseInt(e.target.value) }
                  })}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{customization.fontSize.small}px</span>
              </div>
            </div>

            {/* Font Weights */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name Weight</label>
                <select
                  value={customization.fontWeight.name}
                  onChange={(e) => onUpdate({
                    fontWeight: { ...customization.fontWeight, name: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={400}>Normal</option>
                  <option value={500}>Medium</option>
                  <option value={600}>Semi Bold</option>
                  <option value={700}>Bold</option>
                  <option value={800}>Extra Bold</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Heading Weight</label>
                <select
                  value={customization.fontWeight.heading}
                  onChange={(e) => onUpdate({
                    fontWeight: { ...customization.fontWeight, heading: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={400}>Normal</option>
                  <option value={500}>Medium</option>
                  <option value={600}>Semi Bold</option>
                  <option value={700}>Bold</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Body Weight</label>
                <select
                  value={customization.fontWeight.body}
                  onChange={(e) => onUpdate({
                    fontWeight: { ...customization.fontWeight, body: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={300}>Light</option>
                  <option value={400}>Normal</option>
                  <option value={500}>Medium</option>
                </select>
              </div>
            </div>

            {/* Line Heights */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Heading Line Height</label>
                <input
                  type="range"
                  min="1"
                  max="2"
                  step="0.1"
                  value={customization.lineHeight.heading}
                  onChange={(e) => onUpdate({
                    lineHeight: { ...customization.lineHeight, heading: parseFloat(e.target.value) }
                  })}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{customization.lineHeight.heading}</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Body Line Height</label>
                <input
                  type="range"
                  min="1.2"
                  max="2"
                  step="0.1"
                  value={customization.lineHeight.body}
                  onChange={(e) => onUpdate({
                    lineHeight: { ...customization.lineHeight, body: parseFloat(e.target.value) }
                  })}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{customization.lineHeight.body}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Colors Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <SectionHeader title="Colors" icon={Palette} sectionKey="colors" />
        
        {expandedSections.has('colors') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-6 space-y-6"
          >
            {/* Color Presets */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Color Presets</label>
              <div className="space-y-2">
                {presetColors.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => onUpdate({
                      colors: {
                        ...customization.colors,
                        primary: preset.primary,
                        secondary: preset.secondary,
                        accent: preset.accent
                      }
                    })}
                    className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                  >
                    <div className="flex space-x-1">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.primary }} />
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.secondary }} />
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.accent }} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Colors */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={customization.colors.primary}
                    onChange={(e) => onUpdate({
                      colors: { ...customization.colors, primary: e.target.value }
                    })}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customization.colors.primary}
                    onChange={(e) => onUpdate({
                      colors: { ...customization.colors, primary: e.target.value }
                    })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={customization.colors.secondary}
                    onChange={(e) => onUpdate({
                      colors: { ...customization.colors, secondary: e.target.value }
                    })}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customization.colors.secondary}
                    onChange={(e) => onUpdate({
                      colors: { ...customization.colors, secondary: e.target.value }
                    })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={customization.colors.accent}
                    onChange={(e) => onUpdate({
                      colors: { ...customization.colors, accent: e.target.value }
                    })}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customization.colors.accent}
                    onChange={(e) => onUpdate({
                      colors: { ...customization.colors, accent: e.target.value }
                    })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={customization.colors.text}
                    onChange={(e) => onUpdate({
                      colors: { ...customization.colors, text: e.target.value }
                    })}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customization.colors.text}
                    onChange={(e) => onUpdate({
                      colors: { ...customization.colors, text: e.target.value }
                    })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Layout Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <SectionHeader title="Layout & Spacing" icon={Layout} sectionKey="layout" />
        
        {expandedSections.has('layout') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-6 space-y-6"
          >
            {/* Header Alignment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Header Alignment</label>
              <div className="flex space-x-2">
                {[
                  { value: 'left', icon: AlignLeft, label: 'Left' },
                  { value: 'center', icon: AlignCenter, label: 'Center' },
                  { value: 'right', icon: AlignRight, label: 'Right' }
                ].map(({ value, icon: Icon, label }) => (
                  <button
                    key={value}
                    onClick={() => onUpdate({
                      layout: { ...customization.layout, headerAlignment: value as any }
                    })}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                      customization.layout.headerAlignment === value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Spacing Controls */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Page Margin</label>
                <input
                  type="range"
                  min="16"
                  max="64"
                  value={customization.spacing.page}
                  onChange={(e) => onUpdate({
                    spacing: { ...customization.spacing, page: parseInt(e.target.value) }
                  })}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{customization.spacing.page}px</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section Spacing</label>
                <input
                  type="range"
                  min="12"
                  max="48"
                  value={customization.spacing.section}
                  onChange={(e) => onUpdate({
                    spacing: { ...customization.spacing, section: parseInt(e.target.value) }
                  })}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{customization.spacing.section}px</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Spacing</label>
                <input
                  type="range"
                  min="8"
                  max="32"
                  value={customization.spacing.item}
                  onChange={(e) => onUpdate({
                    spacing: { ...customization.spacing, item: parseInt(e.target.value) }
                  })}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{customization.spacing.item}px</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Line Spacing</label>
                <input
                  type="range"
                  min="4"
                  max="16"
                  value={customization.spacing.line}
                  onChange={(e) => onUpdate({
                    spacing: { ...customization.spacing, line: parseInt(e.target.value) }
                  })}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{customization.spacing.line}px</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Styling Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <SectionHeader title="Styling & Effects" icon={Sliders} sectionKey="styling" />
        
        {expandedSections.has('styling') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-6 space-y-6"
          >
            {/* Bullet Style */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Bullet Style</label>
              <div className="grid grid-cols-2 gap-2">
                {bulletStyles.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => onUpdate({ bulletStyle: id as any })}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                      customization.bulletStyle === id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Borders */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Section Borders</label>
                <input
                  type="checkbox"
                  checked={customization.borders.sectionBorder}
                  onChange={(e) => onUpdate({
                    borders: { ...customization.borders, sectionBorder: e.target.checked }
                  })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              
              {customization.borders.sectionBorder && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Border Width</label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={customization.borders.sectionBorderWidth}
                      onChange={(e) => onUpdate({
                        borders: { ...customization.borders, sectionBorderWidth: parseInt(e.target.value) }
                      })}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-500">{customization.borders.sectionBorderWidth}px</span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Border Style</label>
                    <select
                      value={customization.borders.sectionBorderStyle}
                      onChange={(e) => onUpdate({
                        borders: { ...customization.borders, sectionBorderStyle: e.target.value as any }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="solid">Solid</option>
                      <option value="dashed">Dashed</option>
                      <option value="dotted">Dotted</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Effects */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Drop Shadows</label>
                <input
                  type="checkbox"
                  checked={customization.shadows}
                  onChange={(e) => onUpdate({ shadows: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rounded Corners</label>
                <input
                  type="range"
                  min="0"
                  max="16"
                  value={customization.roundedCorners}
                  onChange={(e) => onUpdate({ roundedCorners: parseInt(e.target.value) })}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{customization.roundedCorners}px</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CustomizationPanel;