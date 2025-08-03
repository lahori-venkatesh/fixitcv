import React from 'react';
import { ResumeData, SectionOrder, ResumeCustomization, ResumeTemplate } from '../../../types/resume';
import { PersonalInfoSection } from '../sections/PersonalInfoSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { EducationSection } from '../sections/EducationSection';
import { SkillsSection } from '../sections/SkillsSection';
import { CustomSectionRenderer } from '../sections/CustomSectionRenderer';
import { useTemplateHelpers } from '../hooks/useTemplateHelpers';

interface DefaultTemplateProps {
  resumeData: ResumeData;
  customization: ResumeCustomization;
  sectionOrder: SectionOrder[];
  template?: ResumeTemplate;
  pages: React.ReactNode[];
}

export const DefaultTemplate: React.FC<DefaultTemplateProps> = ({
  resumeData,
  customization,
  sectionOrder,
  template,
  pages
}) => {
  const { getOrderedSections, isSectionVisible, getVisibleExperience, getVisibleEducation } = useTemplateHelpers({
    resumeData,
    sectionOrder
  });

  const getCustomStyles = () => {
    const baseStyles = {
      fontFamily: customization.fontFamily,
      width: `${customization.layout.pageWidth * 96}px`,
      minHeight: `${customization.layout.pageHeight * 96}px`,
      padding: `${customization.spacing.page}px`,
      backgroundColor: customization.colors.background,
      color: customization.colors.text,
      lineHeight: customization.lineHeight.body,
      fontSize: `${customization.fontSize.body}px`,
      borderRadius: `${customization.roundedCorners}px`,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.1)',
      border: customization.borders.pageBorder ? `${customization.borders.pageBorderWidth}px solid ${customization.borders.pageBorderColor}` : 'none'
    };

    if (template) {
      switch (template.layout) {
        case 'two-column':
          return { ...baseStyles, display: 'grid', gridTemplateColumns: '1fr 2fr', gap: `${customization.spacing.section}px` };
        default:
          return baseStyles;
      }
    }

    return baseStyles;
  };

  const getPageNumberStyles = () => {
    const position = customization.layout.pageNumberPosition;
    const baseStyles = {
      position: 'absolute' as const,
      fontSize: `${customization.fontSize.small}px`,
      color: customization.colors.textLight
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

  // Check if we have any content to display
  const hasPersonalInfo = resumeData.personalInfo.firstName || resumeData.personalInfo.lastName || 
                         resumeData.personalInfo.jobTitle || resumeData.personalInfo.email;
  const hasExperience = resumeData.experience.some(exp => exp.visible !== false && (exp.company || exp.position));
  const hasEducation = resumeData.education.some(ed => ed.visible !== false && (ed.institution || ed.degree));
  const hasSkills = resumeData.skills.length > 0;
  const hasCustomSections = resumeData.customSections.length > 0;
  const hasAnyContent = hasPersonalInfo || hasExperience || hasEducation || hasSkills || hasCustomSections;

  // If using pages from useResumePreview
  if (pages.length > 0) {
    return (
      <>
        {pages.map((page, index) => (
          <div key={index} className="relative mb-8">
            {page}
          </div>
        ))}
      </>
    );
  }

  // Render a blank page with proper styling if no content
  if (!hasAnyContent) {
    return (
      <div className="relative mb-8">
        <div className="bg-white shadow-2xl mx-auto rounded-lg overflow-hidden border border-gray-200" style={getCustomStyles()}>
          {customization.layout.showPageNumbers && (
            <div style={getPageNumberStyles()}>
              Page 1
            </div>
          )}
          {customization.layout.footerText && (
            <div style={{
              position: 'absolute',
              bottom: '8px',
              left: '0',
              right: '0',
              textAlign: 'center',
              fontSize: `${customization.fontSize.small - 2}px`,
              color: customization.colors.textLight
            }}>
              {customization.layout.footerText}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mb-8">
      <div className="bg-white shadow-2xl mx-auto rounded-lg overflow-hidden border border-gray-200" style={getCustomStyles()}>
        <PersonalInfoSection
          personalInfo={resumeData.personalInfo}
          customization={customization}
        />
        
        {/* Template-specific layout */}
        {template && template.layout === 'two-column' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: `${customization.spacing.section}px` }}>
            {/* Left Column - Skills and other info */}
            <div>
              {isSectionVisible('skills') && (
                <SkillsSection
                  skills={resumeData.skills}
                  customization={customization}
                />
              )}
            </div>
            
            {/* Right Column - Experience and Education */}
            <div>
              {getOrderedSections()
                .filter(section => section.visible && section.id !== 'skills' && section.id !== 'personal')
                .map(section => {
                  if (section.id === 'experience') {
                    return (
                      <ExperienceSection
                        key={section.id}
                        experience={getVisibleExperience()}
                        customization={customization}
                      />
                    );
                  } else if (section.id === 'education') {
                    return (
                      <EducationSection
                        key={section.id}
                        education={getVisibleEducation()}
                        customization={customization}
                      />
                    );
                  } else if (section.id.startsWith('custom-')) {
                    const customSectionId = section.id.replace('custom-', '');
                    const customSection = resumeData.customSections.find(cs => cs.id === customSectionId);
                    
                    if (!customSection) return null;

                    return (
                      <CustomSectionRenderer
                        key={section.id}
                        section={customSection}
                        customization={customization}
                      />
                    );
                  }
                  return null;
                })}
            </div>
          </div>
        ) : (
          /* Single Column Layout */
          <>
            {getOrderedSections()
              .filter(section => section.visible && section.id !== 'personal')
              .map(section => {
                if (section.id === 'experience') {
                  return (
                    <ExperienceSection
                      key={section.id}
                      experience={getVisibleExperience()}
                      customization={customization}
                    />
                  );
                } else if (section.id === 'education') {
                  return (
                    <EducationSection
                      key={section.id}
                      education={getVisibleEducation()}
                      customization={customization}
                    />
                  );
                } else if (section.id === 'skills') {
                  return (
                    <SkillsSection
                      key={section.id}
                      skills={resumeData.skills}
                      customization={customization}
                    />
                  );
                } else if (section.id.startsWith('custom-')) {
                  const customSectionId = section.id.replace('custom-', '');
                  const customSection = resumeData.customSections.find(cs => cs.id === customSectionId);
                  
                  if (!customSection) return null;

                  return (
                    <CustomSectionRenderer
                      key={section.id}
                      section={customSection}
                      customization={customization}
                    />
                  );
                }
                return null;
              })}
          </>
        )}

        {customization.layout.showPageNumbers && (
          <div style={getPageNumberStyles()}>
            Page 1
          </div>
        )}
        
        {customization.layout.footerText && (
          <div style={{
            position: 'absolute',
            bottom: '8px',
            left: '0',
            right: '0',
            textAlign: 'center',
            fontSize: `${customization.fontSize.small - 2}px`,
            color: customization.colors.textLight
          }}>
            {customization.layout.footerText}
          </div>
        )}
      </div>
    </div>
  );
};