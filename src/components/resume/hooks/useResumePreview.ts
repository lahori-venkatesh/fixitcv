import { useState, useEffect, useRef } from 'react';
import { ResumeData, SectionOrder, ResumeCustomization } from '../../../types/resume';

interface UseResumePreviewProps {
  resumeData: ResumeData;
  selectedTemplate: string;
  customization: ResumeCustomization;
  sectionOrder: SectionOrder[];
  containerRef: React.RefObject<HTMLDivElement>;
}

export const useResumePreview = ({
  resumeData,
  selectedTemplate,
  customization,
  sectionOrder,
  containerRef
}: UseResumePreviewProps) => {
  const [currentZoom, setCurrentZoom] = useState(0.65);
  const [pages, setPages] = useState<React.ReactNode[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  
  const zoomLevels = [0.25, 0.33, 0.5, 0.65, 0.75, 0.85, 1.0, 1.25, 1.5, 2.0];
  const currentZoomIndex = zoomLevels.findIndex(level => Math.abs(level - currentZoom) < 0.01);

  // Calculate zoom progress for progress bar
  const getZoomProgress = () => {
    const minZoom = zoomLevels[0];
    const maxZoom = zoomLevels[zoomLevels.length - 1];
    return ((currentZoom - minZoom) / (maxZoom - minZoom)) * 100;
  };

  // Smooth zoom transition function
  const smoothZoomTo = (targetZoom: number) => {
    if (isZooming) return;
    
    setIsZooming(true);
    const startZoom = currentZoom;
    const duration = 300; // 300ms transition
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easeOutCubic for smooth deceleration
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const newZoom = startZoom + (targetZoom - startZoom) * easeOutCubic;
      
      setCurrentZoom(newZoom);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentZoom(targetZoom);
        setIsZooming(false);
      }
    };
    
    requestAnimationFrame(animate);
  };

  // Zoom control functions with smooth transitions
  const zoomIn = () => {
    if (currentZoomIndex < zoomLevels.length - 1 && !isZooming) {
      smoothZoomTo(zoomLevels[currentZoomIndex + 1]);
    }
  };

  const zoomOut = () => {
    if (currentZoomIndex > 0 && !isZooming) {
      smoothZoomTo(zoomLevels[currentZoomIndex - 1]);
    }
  };

  const resetZoom = () => {
    if (!isZooming) {
      smoothZoomTo(0.65);
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  // Smooth zoom with mouse wheel and keyboard
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        
        if (isZooming) return; // Prevent multiple zoom operations
        
        // Calculate zoom direction with reduced sensitivity
        const zoomFactor = 0.1; // Reduced from default for smoother zooming
        const delta = e.deltaY > 0 ? -zoomFactor : zoomFactor;
        
        // Calculate new zoom level
        let newZoom = currentZoom + delta;
        
        // Clamp to min/max zoom levels
        newZoom = Math.max(zoomLevels[0], Math.min(zoomLevels[zoomLevels.length - 1], newZoom));
        
        // Find the closest zoom level for snapping
        const closestLevel = zoomLevels.reduce((prev, curr) => 
          Math.abs(curr - newZoom) < Math.abs(prev - newZoom) ? curr : prev
        );
        
        // Only snap to level if we're close enough (within 0.05)
        const finalZoom = Math.abs(closestLevel - newZoom) < 0.05 ? closestLevel : newZoom;
        
        if (finalZoom !== currentZoom) {
          smoothZoomTo(finalZoom);
        }
      }
    };

    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isZooming) return; // Prevent multiple zoom operations
      
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '=':
          case '+':
            e.preventDefault();
            zoomIn();
            break;
          case '-':
            e.preventDefault();
            zoomOut();
            break;
          case '0':
            e.preventDefault();
            resetZoom();
            break;
        }
      }
      if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    // Pan functionality
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0 && currentZoom > 1) { // Left mouse button and zoomed in
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
        if (containerRef.current) {
          setScrollPosition({
            x: containerRef.current.scrollLeft,
            y: containerRef.current.scrollTop
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && containerRef.current) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        containerRef.current.scrollLeft = scrollPosition.x - dx;
        containerRef.current.scrollTop = scrollPosition.y - dy;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('wheel', handleWheel, { passive: false });
    
    if (containerRef.current) {
      containerRef.current.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
      
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousedown', handleMouseDown);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [currentZoom, currentZoomIndex, isDragging, dragStart, scrollPosition, containerRef, isZooming]);

  // Split content into pages based on height
  useEffect(() => {
    const splitIntoPages = () => {
      const pageHeight = customization.layout.pageHeight * 96; // Convert inches to pixels (96 DPI)
      const maxContentHeight = pageHeight - (customization.spacing.page * 2) - 100; // Account for padding and margins
      
      const orderedSections = sectionOrder.filter(section => section.visible);
      const newPages: React.ReactNode[] = [];
      let currentPageContent: string[] = [];
      let currentPageHeight = 0;

      // Add header to first page
      const headerHeight = 200; // Estimated header height
      currentPageHeight += headerHeight;

      orderedSections.forEach((sectionConfig) => {
        const section = sectionConfig.id;
        if (!section) return;

        const estimatedSectionHeight = 150; // Estimated section height
        
        if (currentPageHeight + estimatedSectionHeight > maxContentHeight && currentPageContent.length > 0) {
          // Start new page
          currentPageContent = [section];
          currentPageHeight = estimatedSectionHeight;
        } else {
          currentPageContent.push(section);
          currentPageHeight += estimatedSectionHeight;
        }
      });

      // Limit to max pages
      const limitedPages = newPages.slice(0, customization.layout.maxPages);
      setPages(limitedPages);
    };

    splitIntoPages();
  }, [resumeData, customization, sectionOrder]);

  return {
    currentZoom,
    pages,
    zoomLevels,
    getZoomProgress,
    zoomIn,
    zoomOut,
    resetZoom,
    toggleFullscreen,
    isDragging,
    isZooming
  };
};