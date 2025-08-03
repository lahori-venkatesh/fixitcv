import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, X } from 'lucide-react';
import { ResumeData, SectionOrder, ResumeCustomization } from '../../types/resume';
import { resumeTemplates } from '../../data/templates';
import { ZoomControls } from './ZoomControls';
import { HarvardClassicTemplate } from './templates/HarvardClassicTemplate';
import { DefaultTemplate } from './templates/DefaultTemplate';
import { useResumePreview } from './hooks/useResumePreview';

interface ResumePreviewProps {
  resumeData: ResumeData;
  selectedTemplate: string;
  customization: ResumeCustomization;
  sectionOrder: SectionOrder[];
  showZoomControls?: boolean;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  resumeData,
  selectedTemplate,
  customization,
  sectionOrder,
  showZoomControls = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const {
    currentZoom,
    pages,
    zoomLevels,
    getZoomProgress,
    zoomIn,
    zoomOut,
    resetZoom,
    toggleFullscreen: handleToggleFullscreen,
    isDragging
  } = useResumePreview({
    resumeData,
    selectedTemplate,
    customization,
    sectionOrder,
    containerRef
  });

  const template = resumeTemplates.find(t => t.id === selectedTemplate);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    handleToggleFullscreen();
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="relative h-full flex flex-col">

      {/* Resume Content Container */}
      <div 
        ref={containerRef}
        className={`transition-all duration-300 ${
          isFullscreen 
            ? 'fixed inset-0 z-50 bg-gray-100 overflow-auto p-4' 
            : 'flex-1 overflow-auto bg-gray-50 rounded-lg p-3'
        } ${isDragging ? 'cursor-grabbing' : currentZoom > 0.65 ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
        style={{
          maxHeight: isFullscreen ? '100vh' : 'calc(100vh - 200px)'
        }}
      >
        <div 
          id="resume-preview" 
          className="flex justify-center min-h-full"
          style={{
            transform: `scale(${currentZoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            minHeight: '100%',
            width: '100%'
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
            style={{
              filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.15)) drop-shadow(0 8px 10px rgba(0, 0, 0, 0.1))'
            }}
        >
          {/* Render the appropriate template based on selection */}
          {selectedTemplate === 'harvard-classic' ? (
            <HarvardClassicTemplate
              resumeData={resumeData}
              customization={customization}
              sectionOrder={sectionOrder}
            />
          ) : (
            /* Default Template */
            <DefaultTemplate
              resumeData={resumeData}
              customization={customization}
              sectionOrder={sectionOrder}
              template={template}
              pages={pages}
            />
          )}
          </motion.div>
        </div>
      </div>

      {/* Zoom Controls - Compact bottom section */}
      {showZoomControls && !isFullscreen && (
        <div className="flex-shrink-0 p-2 border-t border-gray-200">
          <div className="flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-2 flex items-center space-x-2">
              {/* Zoom Out */}
              <button
                onClick={zoomOut}
                disabled={currentZoom <= zoomLevels[0]}
                className="p-1.5 rounded-md hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Zoom Out (Ctrl + -)"
              >
                <ZoomOut className="w-3.5 h-3.5 text-gray-600" />
              </button>

              {/* Zoom Level Display - Compact */}
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-medium text-gray-700 min-w-[45px] text-center">
                  {Math.round(currentZoom * 100)}%
                </span>
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden relative">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${getZoomProgress()}%` }}
                  />
                </div>
              </div>

              {/* Zoom In */}
              <button
                onClick={zoomIn}
                disabled={currentZoom >= zoomLevels[zoomLevels.length - 1]}
                className="p-1.5 rounded-md hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Zoom In (Ctrl + +)"
              >
                <ZoomIn className="w-3.5 h-3.5 text-gray-600" />
              </button>

              {/* Reset Zoom */}
              <button
                onClick={resetZoom}
                className="p-1.5 rounded-md hover:bg-gray-100 transition-all duration-200"
                title="Reset Zoom (Ctrl + 0)"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gray-600" />
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-md hover:bg-gray-100 transition-all duration-200"
                title="Toggle Fullscreen (F11)"
              >
                <Maximize2 className="w-3.5 h-3.5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Close Button */}
      {isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="fixed top-4 right-4 z-60 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default ResumePreview;