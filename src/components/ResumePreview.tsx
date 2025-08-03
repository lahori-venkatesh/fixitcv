import React, { useRef, useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, ZoomIn, ZoomOut, RotateCcw, Maximize2 } from 'lucide-react';
import { ResumeData, SectionOrder, ResumeCustomization } from '../types/resume';
import { resumeTemplates } from '../data/templates';

interface ResumePreviewProps {
  resumeData: ResumeData;
  selectedTemplate: string;
  customization: ResumeCustomization;
  sectionOrder?: SectionOrder[];
  showZoomControls?: boolean;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ 
  resumeData, 
  selectedTemplate, 
  customization,
  sectionOrder,
  showZoomControls = true
}) => {
  const template = resumeTemplates.find(t => t.id === selectedTemplate) || resumeTemplates[0];
  const { personalInfo, experience, education, skills, customSections } = resumeData;
  const [pages, setPages] = useState<React.ReactNode[]>([]);
  const [zoomLevel, setZoomLevel] = useState(0.65); // Default zoom level
  const [isFullscreen, setIsFullscreen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isZooming, setIsZooming] = useState(false);

  // Zoom levels
  const zoomLevels = [0.25, 0.33, 0.5, 0.65, 0.75, 0.85, 1.0, 1.25, 1.5, 2.0];
  const currentZoomIndex = zoomLevels.findIndex(level => level === zoomLevel);

  // Merge template colors with customization (template takes precedence for primary colors)
  const effectiveColors = {
    ...customization.colors,
    primary: template.colors.primary,
    secondary: template.colors.secondary,
    accent: template.colors.accent
  };

  // Smooth zoom transition function
  const smoothZoomTo = (targetZoom: number) => {
    if (isZooming) return;
    
    setIsZooming(true);
    const startZoom = zoomLevel;
    const duration = 300; // 300ms transition
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easeOutCubic for smooth deceleration
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const newZoom = startZoom + (targetZoom - startZoom) * easeOutCubic;
      
      setZoomLevel(newZoom);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setZoomLevel(targetZoom);
        setIsZooming(false);
      }
    };
    
    requestAnimationFrame(animate);
  };

  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const getBulletSymbol = () => {
    switch (customization.bulletStyle) {
      case 'circle': return '○';
      case 'square': return '■';
      case 'dash': return '–';
      case 'arrow': return '→';
      default: return '•';
    }
  };

  // Zoom control functions
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
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      smoothZoomTo(1.0);
    } else {
      smoothZoomTo(0.65);
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
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
          case 'f':
            e.preventDefault();
            toggleFullscreen();
            break;
        }
      }
    };

    // Handle smooth wheel zoom
    const handleWheel = (e: WheelEvent) => {
      if ((e.ctrlKey || e.metaKey) && showZoomControls) {
        e.preventDefault();
        
        if (isZooming) return; // Prevent multiple zoom operations
        
        // Calculate zoom direction with reduced sensitivity
        const zoomFactor = 0.1; // Reduced from default for smoother zooming
        const delta = e.deltaY > 0 ? -zoomFactor : zoomFactor;
        
        // Calculate new zoom level
        let newZoom = zoomLevel + delta;
        
        // Clamp to min/max zoom levels
        newZoom = Math.max(zoomLevels[0], Math.min(zoomLevels[zoomLevels.length - 1], newZoom));
        
        // Find the closest zoom level for snapping
        const closestLevel = zoomLevels.reduce((prev, curr) => 
          Math.abs(curr - newZoom) < Math.abs(prev - newZoom) ? curr : prev
        );
        
        // Only snap to level if we're close enough (within 0.05)
        const finalZoom = Math.abs(closestLevel - newZoom) < 0.05 ? closestLevel : newZoom;
        
        if (finalZoom !== zoomLevel) {
          smoothZoomTo(finalZoom);
        }
      }
    };

    if (showZoomControls) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('wheel', handleWheel);
      };
    }
  }, [currentZoomIndex, showZoomControls, zoomLevel, isZooming]);

  const getCustomStyles = () => {
    // Apply template-specific styling based on layout type
    const baseStyles = {
      fontFamily: customization.fontFamily,
      color: effectiveColors.text,
      backgroundColor: effectiveColors.background,
      lineHeight: customization.lineHeight.body,
      fontSize: `${customization.fontSize.body}px`,
      fontWeight: customization.fontWeight.body,
      width: `${customization.layout.pageWidth}in`,
      minHeight: `${customization.layout.pageHeight}in`,
      maxHeight: `${customization.layout.pageHeight}in`,
      boxShadow: customization.shadows ? '0 10px 25px rgba(0,0,0,0.1)' : 'none',
      borderRadius: `${customization.roundedCorners}px`,
      border: customization.borders.pageBorder 
        ? `${customization.borders.pageBorderWidth}px solid ${customization.borders.pageBorderColor}`
        : 'none',
      padding: `${customization.spacing.page}px`,
      pageBreakAfter: 'always',
      overflow: 'hidden',
      position: 'relative' as const
    };

    // Apply template-specific modifications
    switch (template.layout) {
      case 'two-column':
        return {
          ...baseStyles,
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: `${customization.spacing.section}px`
        };
      case 'german-standard':
        return {
          ...baseStyles,
          padding: `${customization.spacing.page * 1.5}px`,
          lineHeight: 1.4
        };
      case 'japanese-standard':
        return {
          ...baseStyles,
          fontSize: `${customization.fontSize.body - 1}px`,
          lineHeight: 1.3
        };
      case 'europass':
        return {
          ...baseStyles,
          border: '2px solid #003d82',
          padding: `${customization.spacing.page * 1.2}px`
        };
      default:
        return baseStyles;
    }
  };

  const getHeadingStyles = () => ({
    fontSize: `${customization.fontSize.heading}px`,
    fontWeight: customization.fontWeight.heading,
    color: effectiveColors.primary,
    lineHeight: customization.lineHeight.heading,
    marginBottom: `${customization.spacing.item}px`,
    paddingBottom: `${customization.spacing.line}px`,
    borderBottom: customization.borders.sectionBorder 
      ? `${customization.borders.sectionBorderWidth}px ${customization.borders.sectionBorderStyle} ${effectiveColors.primary}`
      : 'none'
  });

  const getNameStyles = () => {
    // Template-specific name styling
    const baseNameStyles = {
      fontSize: `${customization.fontSize.name}px`,
      fontWeight: customization.fontWeight.name,
      color: effectiveColors.primary,
      textAlign: customization.layout.headerAlignment as any,
      marginBottom: `${customization.spacing.item}px`
    };

    switch (template.style) {
      case 'elegant':
        return {
          ...baseNameStyles,
          fontFamily: 'serif',
          letterSpacing: '1px'
        };
      case 'modern':
        return {
          ...baseNameStyles,
          background: `linear-gradient(135deg, ${effectiveColors.primary}, ${effectiveColors.accent})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        };
      case 'creative':
        return {
          ...baseNameStyles,
          textShadow: `2px 2px 4px ${effectiveColors.primary}20`
        };
      default:
        return baseNameStyles;
    }
  };

  const getSectionSpacing = () => ({
    marginBottom: `${customization.spacing.section}px`
  });

  const getItemSpacing = () => ({
    marginBottom: `${customization.spacing.item}px`
  });

  const getLineSpacing = () => ({
    marginBottom: `${customization.spacing.line}px`
  });

  const getPageNumberStyles = () => {
    const position = customization.layout.pageNumberPosition;
    const baseStyles = {
      position: 'absolute' as const,
      fontSize: `${customization.fontSize.small}px`,
      color: effectiveColors.textLight,
      zIndex: 10
    };

    switch (position) {
      case 'top-left':
        return { ...baseStyles, top: '16px', left: '16px' };
      case 'top-center':
        return { ...baseStyles, top: '16px', left: '50%', transform: 'translateX(-50%)' };
      case 'top-right':
        return { ...baseStyles, top: '16px', right: '16px' };
      case 'bottom-left':
        return { ...baseStyles, bottom: '16px', left: '16px' };
      case 'bottom-center':
        return { ...baseStyles, bottom: '16px', left: '50%', transform: 'translateX(-50%)' };
      case 'bottom-right':
        return { ...baseStyles, bottom: '16px', right: '16px' };
      default:
        return { ...baseStyles, bottom: '16px', left: '50%', transform: 'translateX(-50%)' };
    }
  };

  const renderHeader = (pageNumber: number) => {
    if (pageNumber > 1 && !customization.layout.headerOnAllPages) {
      return null;
    }

    const headerStyle = template.layout === 'two-column' ? 
      { gridColumn: '1 / -1', marginBottom: `${customization.spacing.section}px` } :
      { 
        marginBottom: `${customization.spacing.section}px`,
        textAlign: customization.layout.headerAlignment,
        borderBottom: customization.borders.headerBorder 
          ? `${customization.borders.headerBorderWidth}px solid ${effectiveColors.primary}20`
          : 'none',
        paddingBottom: `${customization.spacing.item}px`
      };

    return (
      <div style={headerStyle}>
        <h1 style={getNameStyles()}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: customization.layout.headerAlignment,
          gap: `${customization.spacing.item}px`,
          fontSize: `${customization.fontSize.small}px`,
          color: effectiveColors.textLight,
          marginBottom: `${customization.spacing.item}px`
        }}>
          {personalInfo.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Mail style={{ width: '14px', height: '14px' }} />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Phone style={{ width: '14px', height: '14px' }} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin style={{ width: '14px', height: '14px' }} />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Globe style={{ width: '14px', height: '14px' }} />
              <span>{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Linkedin style={{ width: '14px', height: '14px' }} />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
        </div>

        {personalInfo.summary && pageNumber === 1 && (
          <p style={{ 
            color: effectiveColors.text,
            lineHeight: customization.lineHeight.body,
            maxWidth: '800px',
            margin: '0 auto',
            fontStyle: template.style === 'elegant' ? 'italic' : 'normal',
            fontSize: template.style === 'academic' ? `${customization.fontSize.body + 1}px` : undefined
          }}>
            {personalInfo.summary}
          </p>
        )}
      </div>
    );
  };

  const renderFooter = () => {
    if (!customization.layout.footerText) return null;

    return (
      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: `${customization.fontSize.small}px`,
        color: effectiveColors.textLight,
        textAlign: 'center'
      }}>
        {customization.layout.footerText}
      </div>
    );
  };

  const renderCustomSection = (section: any) => {
    return (
      <div style={getSectionSpacing()}>
        <h2 style={getHeadingStyles()}>
          {section.title}
        </h2>
        
        {section.type === 'text' && (
          <p style={{ 
            ...getLineSpacing(), 
            color: effectiveColors.text,
            whiteSpace: 'pre-wrap' 
          }}>
            {section.content}
          </p>
        )}
        
        {(section.type === 'list' || section.type === 'achievements' || section.type === 'projects') && (
          <div style={getItemSpacing()}>
            {Array.isArray(section.content) && section.content
              .filter((item: string) => item.trim())
              .map((item: string, index: number) => (
                <div key={index} style={{ 
                  ...getLineSpacing(),
                  display: 'flex',
                  alignItems: 'flex-start'
                }}>
                  <span style={{ 
                    color: effectiveColors.accent,
                    marginRight: '8px',
                    fontSize: '1.2em',
                    lineHeight: '1'
                  }}>
                    {getBulletSymbol()}
                  </span>
                  <span style={{ color: effectiveColors.text }}>{item}</span>
                </div>
              ))
            }
          </div>
        )}

        {/* Custom Fields */}
        {section.customFields && Object.keys(section.customFields).length > 0 && (
          <div style={getItemSpacing()}>
            {Object.entries(section.customFields).map(([fieldName, fieldValue]) => (
              fieldValue && (
                <div key={fieldName} style={getLineSpacing()}>
                  <span style={{ 
                    fontWeight: 600, 
                    color: effectiveColors.text,
                    marginRight: '8px'
                  }}>
                    {fieldName}:
                  </span>
                  <span style={{ color: effectiveColors.textLight }}>{fieldValue}</span>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSection = (sectionId: string) => {
    // Handle individual custom sections
    if (sectionId.startsWith('custom-')) {
      const customSectionId = sectionId.replace('custom-', '');
      const customSection = customSections.find(cs => cs.id === customSectionId);
      if (!customSection) return null;
      return renderCustomSection(customSection);
    }

    // Handle core sections
    switch (sectionId) {
      case 'experience':
        return renderExperienceSection();
      case 'education':
        return renderEducationSection();
      case 'skills':
        return renderSkillsSection();
      default:
        return null;
    }
  };

  const renderExperienceSection = () => {
    return experience.length > 0 && (
      <div style={getSectionSpacing()}>
        <h2 style={getHeadingStyles()}>
          Professional Experience
        </h2>
        
        {experience.map((exp) => (
          <div key={exp.id} style={getItemSpacing()}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              marginBottom: `${customization.spacing.line}px`
            }}>
              <div>
                <h3 style={{ 
                  fontWeight: 600, 
                  fontSize: `${customization.fontSize.body + 2}px`,
                  color: effectiveColors.text,
                  margin: 0
                }}>
                  {exp.position}
                </h3>
                <p style={{ 
                  fontWeight: 500, 
                  color: effectiveColors.secondary,
                  margin: `${customization.spacing.line / 2}px 0`
                }}>
                  {exp.company}
                </p>
                <p style={{ 
                  fontSize: `${customization.fontSize.small}px`,
                  color: effectiveColors.textLight,
                  margin: 0
                }}>
                  {exp.location}
                </p>
              </div>
              <div style={{ 
                fontSize: `${customization.fontSize.small}px`,
                color: effectiveColors.textLight,
                textAlign: 'right'
              }}>
                {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
              </div>
            </div>
            
            {exp.description.length > 0 && (
              <div style={{ marginLeft: '16px' }}>
                {exp.description.filter(desc => desc.trim()).map((desc, index) => (
                  <div key={index} style={{ 
                    ...getLineSpacing(),
                    display: 'flex',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{ 
                      color: effectiveColors.accent,
                      marginRight: '8px',
                      fontSize: '1.2em',
                      lineHeight: '1'
                    }}>
                      {getBulletSymbol()}
                    </span>
                    <span style={{ color: effectiveColors.text }}>{desc}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Custom Fields for Experience */}
            {exp.customFields && Object.keys(exp.customFields).length > 0 && (
              <div style={{ marginTop: `${customization.spacing.line}px` }}>
                {Object.entries(exp.customFields).map(([fieldName, fieldValue]) => (
                  fieldValue && (
                    <div key={fieldName} style={{ 
                      fontSize: `${customization.fontSize.small}px`,
                      color: effectiveColors.textLight,
                      marginBottom: `${customization.spacing.line / 2}px`
                    }}>
                      <span style={{ fontWeight: 500 }}>{fieldName}:</span> {fieldValue}
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderEducationSection = () => {
    return education.length > 0 && (
      <div style={getSectionSpacing()}>
        <h2 style={getHeadingStyles()}>
          Education
        </h2>
        
        {education.map((ed) => (
          <div key={ed.id} style={getItemSpacing()}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start'
            }}>
              <div>
                <h3 style={{ 
                  fontWeight: 600, 
                  fontSize: `${customization.fontSize.body + 2}px`,
                  color: effectiveColors.text,
                  margin: 0
                }}>
                  {ed.degree} {ed.field && `in ${ed.field}`}
                </h3>
                <p style={{ 
                  fontWeight: 500, 
                  color: effectiveColors.secondary,
                  margin: `${customization.spacing.line / 2}px 0`
                }}>
                  {ed.institution}
                </p>
                <p style={{ 
                  fontSize: `${customization.fontSize.small}px`,
                  color: effectiveColors.textLight,
                  margin: 0
                }}>
                  {ed.location}
                </p>
                {ed.gpa && (
                  <p style={{ 
                    fontSize: `${customization.fontSize.small}px`,
                    color: effectiveColors.textLight,
                    margin: 0
                  }}>
                    GPA: {ed.gpa}
                  </p>
                )}
              </div>
              <div style={{ 
                fontSize: `${customization.fontSize.small}px`,
                color: effectiveColors.textLight
              }}>
                {formatDate(ed.startDate)} - {formatDate(ed.endDate)}
              </div>
            </div>

            {/* Custom Fields for Education */}
            {ed.customFields && Object.keys(ed.customFields).length > 0 && (
              <div style={{ marginTop: `${customization.spacing.line}px` }}>
                {Object.entries(ed.customFields).map(([fieldName, fieldValue]) => (
                  fieldValue && (
                    <div key={fieldName} style={{ 
                      fontSize: `${customization.fontSize.small}px`,
                      color: effectiveColors.textLight,
                      marginBottom: `${customization.spacing.line / 2}px`
                    }}>
                      <span style={{ fontWeight: 500 }}>{fieldName}:</span> {fieldValue}
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderSkillsSection = () => {
    return skills.length > 0 && (
      <div style={getSectionSpacing()}>
        <h2 style={getHeadingStyles()}>
          Skills & Expertise
        </h2>
        
        {/* Template-specific skills layout */}
        {template.layout === 'two-column' ? (
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: `${customization.spacing.item}px`
          }}>
            {skills.map((skill) => (
              <div key={skill.id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center'
              }}>
                <span style={{ 
                  color: effectiveColors.text, 
                  fontWeight: 500 
                }}>
                  {skill.name}
                </span>
                <span style={{ 
                  fontSize: `${customization.fontSize.small}px`,
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontWeight: 500,
                  backgroundColor: `${effectiveColors.accent}20`,
                  color: effectiveColors.accent
                }}>
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: `${customization.spacing.item}px`
          }}>
            {skills.map((skill) => (
              <div key={skill.id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center'
              }}>
                <span style={{ 
                  color: effectiveColors.text, 
                  fontWeight: 500 
                }}>
                  {skill.name}
                </span>
                <span style={{ 
                  fontSize: `${customization.fontSize.small}px`,
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontWeight: 500,
                  backgroundColor: `${effectiveColors.accent}20`,
                  color: effectiveColors.accent
                }}>
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Split content into pages based on height
  useEffect(() => {
    const splitIntoPages = () => {
      const pageHeight = customization.layout.pageHeight * 96; // Convert inches to pixels (96 DPI)
      const maxContentHeight = pageHeight - (customization.spacing.page * 2) - 100; // Account for padding and margins
      
      const allSections = sectionOrder ? 
        sectionOrder.filter(section => section.visible).map(section => renderSection(section.id)) :
        [renderSection('experience'), renderSection('education'), renderSection('skills'), ...customSections.map(section => renderCustomSection(section))];

      const newPages: React.ReactNode[] = [];
      let currentPageContent: React.ReactNode[] = [];
      let currentPageHeight = 0;

      // Add header to first page
      const headerHeight = 200; // Estimated header height
      currentPageHeight += headerHeight;

      allSections.forEach((section, index) => {
        if (!section) return;

        const estimatedSectionHeight = 150; // Estimated section height
        
        if (currentPageHeight + estimatedSectionHeight > maxContentHeight && currentPageContent.length > 0) {
          // Start new page
          newPages.push(
            <div key={newPages.length} className="resume-page" style={getCustomStyles()}>
              {renderHeader(newPages.length + 1)}
              {template.layout === 'two-column' ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: `${customization.spacing.section}px` }}>
                  {currentPageContent}
                </div>
              ) : (
                currentPageContent
              )}
              {customization.layout.showPageNumbers && (
                <div style={getPageNumberStyles()}>
                  {newPages.length + 1}
                </div>
              )}
              {renderFooter()}
            </div>
          );
          
          currentPageContent = [section];
          currentPageHeight = (newPages.length > 0 && !customization.layout.headerOnAllPages) ? 0 : headerHeight;
          currentPageHeight += estimatedSectionHeight;
        } else {
          currentPageContent.push(section);
          currentPageHeight += estimatedSectionHeight;
        }
      });

      // Add remaining content to final page
      if (currentPageContent.length > 0) {
        newPages.push(
          <div key={newPages.length} className="resume-page" style={getCustomStyles()}>
            {renderHeader(newPages.length + 1)}
            {template.layout === 'two-column' ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: `${customization.spacing.section}px` }}>
                {currentPageContent}
              </div>
            ) : (
              currentPageContent
            )}
            {customization.layout.showPageNumbers && (
              <div style={getPageNumberStyles()}>
                {newPages.length + 1}
              </div>
            )}
            {renderFooter()}
          </div>
        );
      }

      // Limit to max pages
      const limitedPages = newPages.slice(0, customization.layout.maxPages);
      setPages(limitedPages);
    };

    splitIntoPages();
  }, [resumeData, customization, sectionOrder, selectedTemplate]);

  return (
    <div className="relative h-full flex flex-col">

      {/* Resume Content Container */}
      <div 
        ref={containerRef}
        className={`transition-all duration-300 ${
          isFullscreen 
            ? 'fixed inset-0 z-50 bg-gray-100 overflow-auto p-4' 
            : 'flex-1 bg-gray-50 rounded-lg p-3 overflow-auto'
        }`}
      >
        <div 
          ref={contentRef}
          className="flex flex-col items-center space-y-8 min-h-full"
          style={{ 
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
        >
          <div id="resume-preview">
            {pages.length > 0 ? (
              pages.map((page, index) => (
                <div key={index} className="relative mb-8" style={{
                  filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.15)) drop-shadow(0 8px 10px rgba(0, 0, 0, 0.1))'
                }}>
                  {page}
                  {pages.length > 1 && (
                    <div className="text-center mt-4 text-sm text-gray-500">
                      Page {index + 1} of {pages.length}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white shadow-2xl mx-auto rounded-lg overflow-hidden border border-gray-200" style={{
                ...getCustomStyles(),
                filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.15)) drop-shadow(0 8px 10px rgba(0, 0, 0, 0.1))'
              }}>
                {renderHeader(1)}
                
                {/* Template-specific layout */}
                {template.layout === 'two-column' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: `${customization.spacing.section}px` }}>
                    {/* Left Column - Skills and other info */}
                    <div>
                      {renderSection('skills')}
                    </div>
                    
                    {/* Right Column - Experience and Education */}
                    <div>
                      {sectionOrder ? (
                        sectionOrder
                          .filter(section => section.visible && section.id !== 'skills')
                          .map((section) => (
                            <div key={section.id}>
                              {renderSection(section.id)}
                            </div>
                          ))
                      ) : (
                        <>
                          {renderSection('experience')}
                          {renderSection('education')}
                          {customSections.map((section) => (
                            <div key={section.id}>
                              {renderCustomSection(section)}
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Single Column Layout */
                  <>
                    {sectionOrder ? (
                      sectionOrder
                        .filter(section => section.visible)
                        .map((section) => (
                          <div key={section.id}>
                            {renderSection(section.id)}
                          </div>
                        ))
                    ) : (
                      <>
                        {renderSection('experience')}
                        {renderSection('education')}
                        {renderSection('skills')}
                        {customSections.map((section) => (
                          <div key={section.id}>
                            {renderCustomSection(section)}
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}

                {customization.layout.showPageNumbers && (
                  <div style={getPageNumberStyles()}>
                    1
                  </div>
                )}
                {renderFooter()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compact Zoom Controls at Bottom */}
      {showZoomControls && !isFullscreen && (
        <div className="flex-shrink-0 p-2 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-center">
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-2 flex items-center space-x-2">
              {/* Zoom Out */}
              <button
                onClick={zoomOut}
                disabled={zoomLevel <= zoomLevels[0]}
                className="p-1.5 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                title="Zoom Out (Ctrl + -)"
              >
                <ZoomOut className="w-3.5 h-3.5 text-gray-600" />
              </button>

              {/* Compact Zoom Display */}
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-medium text-gray-700 min-w-[45px] text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${((zoomLevel - zoomLevels[0]) / (zoomLevels[zoomLevels.length - 1] - zoomLevels[0])) * 100}%` }}
                  />
                </div>
              </div>

              {/* Zoom In */}
              <button
                onClick={zoomIn}
                disabled={zoomLevel >= zoomLevels[zoomLevels.length - 1]}
                className="p-1.5 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                title="Zoom In (Ctrl + +)"
              >
                <ZoomIn className="w-3.5 h-3.5 text-gray-600" />
              </button>

              {/* Reset */}
              <button
                onClick={resetZoom}
                className="p-1.5 rounded-md hover:bg-gray-200 transition-all duration-200"
                title="Reset (Ctrl + 0)"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gray-600" />
              </button>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-md hover:bg-gray-200 transition-all duration-200"
                title="Fullscreen"
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
          className="fixed top-4 right-4 z-60 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default ResumePreview;