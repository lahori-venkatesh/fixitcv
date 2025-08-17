import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ResumeData, SectionOrder, ResumeCustomization } from '../../types/resume';

interface PaginatedResumeProps {
  resumeData: ResumeData;
  customization: ResumeCustomization;
  sectionOrder: SectionOrder[];
  selectedTemplate: string;
}

interface PageContent {
  sections: React.ReactNode[];
  height: number;
}

export const PaginatedResume: React.FC<PaginatedResumeProps> = ({
  resumeData,
  customization,
  sectionOrder,
  selectedTemplate
}) => {
  const [pages, setPages] = useState<PageContent[]>([]);
  const measureRef = useRef<HTMLDivElement>(null);

  // A4 dimensions
  const A4_WIDTH_PX = 816;
  const A4_HEIGHT_PX = 1056;
  const MARGIN = customization.spacing?.page || 48;
  const HEADER_HEIGHT = 120;
  const PAGE_NUMBER_HEIGHT = customization.layout?.showPageNumbers ? 30 : 0;
  const AVAILABLE_CONTENT_HEIGHT = A4_HEIGHT_PX - (MARGIN * 2) - HEADER_HEIGHT - PAGE_NUMBER_HEIGHT;

  // Render header
  const renderHeader = () => (
    <div style={{
      textAlign: 'center' as const,
      marginBottom: `${customization.spacing?.section || 24}px`,
      paddingBottom: `${customization.spacing?.item || 16}px`,
      borderBottom: customization.borders?.headerBorder ? `2px solid ${customization.colors?.border || '#e5e7eb'}` : 'none'
    }}>
      <h1 style={{
        fontSize: `${customization.fontSize?.name || 32}px`,
        fontWeight: customization.fontWeight?.name || 'bold',
        color: customization.colors?.text || '#000',
        margin: '0 0 16px 0',
        letterSpacing: '1px'
      }}>
        {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
      </h1>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap' as const,
        gap: '15px',
        fontSize: `${customization.fontSize?.small || 14}px`,
        color: customization.colors?.textLight || '#6b7280'
      }}>
        {resumeData.personalInfo.email && <span>✉ {resumeData.personalInfo.email}</span>}
        {resumeData.personalInfo.phone && <span>📞 {resumeData.personalInfo.phone}</span>}
        {resumeData.personalInfo.location && <span>📍 {resumeData.personalInfo.location}</span>}
      </div>
    </div>
  );

  // Render individual sections
  const renderSection = (section: SectionOrder) => {
    const sectionHeaderStyle = {
      fontSize: `${customization.fontSize?.heading || 20}px`,
      fontWeight: customization.fontWeight?.heading || 'bold',
      color: customization.colors?.text || '#000',
      marginTop: `${customization.spacing?.section || 24}px`,
      marginBottom: `${customization.spacing?.item || 16}px`,
      textTransform: 'uppercase' as const,
      letterSpacing: '1px',
      borderBottom: customization.borders?.sectionBorder ? `1px solid ${customization.colors?.text || '#000'}` : 'none',
      paddingBottom: customization.borders?.sectionBorder ? `${customization.spacing?.line || 8}px` : '0'
    };

    switch (section.component) {
      case 'personal':
        if (!resumeData.personalInfo.summary) return null;
        return (
          <div key={section.id}>
            <h2 style={sectionHeaderStyle}>PROFESSIONAL SUMMARY</h2>
            <p style={{ 
              marginBottom: `${customization.spacing?.item || 16}px`,
              textAlign: 'justify' as const,
              lineHeight: customization.lineHeight?.body || 1.6,
              fontSize: `${customization.fontSize?.body || 14}px`
            }}>
              {resumeData.personalInfo.summary}
            </p>
          </div>
        );

      case 'experience':
        const visibleExperience = resumeData.experience.filter(exp => exp.visible !== false);
        if (visibleExperience.length === 0) return null;
        return (
          <div key={section.id}>
            <h2 style={sectionHeaderStyle}>PROFESSIONAL EXPERIENCE</h2>
            {visibleExperience.map((exp, index) => (
              <div key={exp.id} style={{ marginBottom: `${customization.spacing?.item || 16}px` }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: `${customization.spacing?.line || 8}px`
                }}>
                  <div>
                    <strong style={{ fontSize: `${customization.fontSize?.body || 14}px` }}>
                      {exp.position} - {exp.company}
                    </strong>
                  </div>
                  <div style={{ 
                    fontSize: `${customization.fontSize?.small || 12}px`, 
                    color: customization.colors?.textLight || '#6b7280' 
                  }}>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <ul style={{ marginLeft: '20px', paddingLeft: '0' }}>
                  {exp.description.map((desc, descIndex) => (
                    <li key={descIndex} style={{ 
                      marginBottom: `${customization.spacing?.line || 8}px`,
                      fontSize: `${customization.fontSize?.body || 14}px`,
                      lineHeight: customization.lineHeight?.body || 1.6
                    }}>
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      case 'education':
        const visibleEducation = resumeData.education.filter(edu => edu.visible !== false);
        if (visibleEducation.length === 0) return null;
        return (
          <div key={section.id}>
            <h2 style={sectionHeaderStyle}>EDUCATION</h2>
            {visibleEducation.map((edu, index) => (
              <div key={edu.id} style={{ marginBottom: `${customization.spacing?.item || 16}px` }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: `${customization.spacing?.line || 8}px`
                }}>
                  <div>
                    <strong style={{ fontSize: `${customization.fontSize?.body || 14}px` }}>
                      {edu.institution}
                    </strong>
                    <div style={{ fontSize: `${customization.fontSize?.body || 14}px` }}>
                      {edu.degree} in {edu.field}
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: `${customization.fontSize?.small || 12}px`, 
                    color: customization.colors?.textLight || '#6b7280' 
                  }}>
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'skills':
        if (resumeData.skills.length === 0) return null;
        return (
          <div key={section.id}>
            <h2 style={sectionHeaderStyle}>SKILLS</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: `${customization.spacing?.item || 16}px` 
            }}>
              {resumeData.skills.map((skill, index) => (
                <div key={skill.id} style={{ 
                  marginBottom: `${customization.spacing?.line || 8}px`,
                  fontSize: `${customization.fontSize?.body || 14}px`
                }}>
                  <strong>{skill.name}</strong>: {skill.level}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Measure section height
  const measureSectionHeight = useCallback((sectionElement: React.ReactNode): Promise<number> => {
    return new Promise((resolve) => {
      if (!measureRef.current) {
        resolve(100); // fallback height
        return;
      }

      // Create a temporary container to measure the section
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.visibility = 'hidden';
      tempContainer.style.width = `${A4_WIDTH_PX - (MARGIN * 2)}px`;
      tempContainer.style.fontFamily = customization.fontFamily || 'Arial';
      tempContainer.style.fontSize = `${customization.fontSize?.body || 14}px`;
      tempContainer.style.lineHeight = `${customization.lineHeight?.body || 1.6}`;
      
      document.body.appendChild(tempContainer);
      
      // Render the section into the temp container
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = typeof sectionElement === 'string' ? sectionElement : '';
      tempContainer.appendChild(tempDiv);
      
      // Measure height
      const height = tempContainer.offsetHeight;
      
      // Clean up
      document.body.removeChild(tempContainer);
      
      resolve(height || 100);
    });
  }, [customization, A4_WIDTH_PX, MARGIN]);

  // Create pages with proper pagination
  useEffect(() => {
    const createPages = async () => {
      const visibleSections = sectionOrder.filter(section => section.visible);
      const newPages: PageContent[] = [];
      let currentPageSections: React.ReactNode[] = [];
      let currentPageHeight = HEADER_HEIGHT; // Start with header height

      for (const section of visibleSections) {
        const sectionElement = renderSection(section);
        if (!sectionElement) continue;

        // Estimate section height based on content
        let estimatedHeight = 0;
        switch (section.component) {
          case 'personal':
            const summaryLength = resumeData.personalInfo.summary?.length || 0;
            estimatedHeight = 60 + Math.ceil(summaryLength / 80) * (customization.fontSize?.body || 14) * (customization.lineHeight?.body || 1.6);
            break;
          case 'experience':
            const expCount = resumeData.experience.filter(exp => exp.visible !== false).length;
            estimatedHeight = 60 + expCount * 120;
            break;
          case 'education':
            const eduCount = resumeData.education.filter(edu => edu.visible !== false).length;
            estimatedHeight = 60 + eduCount * 80;
            break;
          case 'skills':
            estimatedHeight = 60 + Math.ceil(resumeData.skills.length / 2) * 30;
            break;
          default:
            estimatedHeight = 100;
        }

        // Add spacing
        estimatedHeight += (customization.spacing?.section || 24) + (customization.spacing?.item || 16);

        // Check if this section would exceed the available height
        if (currentPageHeight + estimatedHeight > AVAILABLE_CONTENT_HEIGHT && currentPageSections.length > 0) {
          // Create a new page with current sections
          newPages.push({
            sections: [...currentPageSections],
            height: currentPageHeight
          });

          // Start new page with this section
          currentPageSections = [sectionElement];
          currentPageHeight = HEADER_HEIGHT + estimatedHeight;
        } else {
          // Add to current page
          currentPageSections.push(sectionElement);
          currentPageHeight += estimatedHeight;
        }
      }

      // Add the last page if it has content
      if (currentPageSections.length > 0) {
        newPages.push({
          sections: [...currentPageSections],
          height: currentPageHeight
        });
      }

      // Ensure at least one page
      if (newPages.length === 0) {
        newPages.push({
          sections: [],
          height: HEADER_HEIGHT
        });
      }

      setPages(newPages);
    };

    createPages();
  }, [resumeData, customization, sectionOrder, AVAILABLE_CONTENT_HEIGHT, HEADER_HEIGHT]);

  // Render a single page
  const renderPage = (pageContent: PageContent, pageIndex: number) => (
    <div
      key={pageIndex}
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        maxWidth: `${A4_WIDTH_PX}px`,
        maxHeight: `${A4_HEIGHT_PX}px`,
        minWidth: `${A4_WIDTH_PX}px`,
        minHeight: `${A4_HEIGHT_PX}px`,
        margin: '0 auto 20px auto',
        backgroundColor: customization.colors?.background || '#ffffff',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        padding: `${MARGIN}px`,
        fontFamily: customization.fontFamily || 'Arial',
        fontSize: `${customization.fontSize?.body || 14}px`,
        lineHeight: customization.lineHeight?.body || 1.6,
        color: customization.colors?.text || '#000'
      }}
    >
      {/* Header only on first page */}
      {pageIndex === 0 && renderHeader()}
      
      {/* Content area with fixed height */}
      <div style={{
        height: `${AVAILABLE_CONTENT_HEIGHT}px`,
        maxHeight: `${AVAILABLE_CONTENT_HEIGHT}px`,
        overflow: 'hidden',
        position: 'relative'
      }}>
        {pageContent.sections}
      </div>

      {/* Page number */}
      {customization.layout?.showPageNumbers && (
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: `${customization.fontSize?.small || 12}px`,
          color: customization.colors?.textLight || '#6b7280',
          zIndex: 10
        }}>
          {pageIndex + 1}
        </div>
      )}
    </div>
  );

  return (
    <div>
      {/* Hidden measuring container */}
      <div ref={measureRef} style={{ position: 'absolute', visibility: 'hidden', top: '-9999px' }} />
      
      {/* Render all pages */}
      {pages.map((pageContent, index) => renderPage(pageContent, index))}
      
      {/* Page count indicator */}
      {pages.length > 1 && (
        <div style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          {pages.length} pages total
        </div>
      )}
    </div>
  );
};