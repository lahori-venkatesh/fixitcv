import React from 'react';
import { ResumeData, SectionOrder, ResumeCustomization } from '../../../types/resume';
import { PersonalInfoSection } from '../sections/PersonalInfoSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { EducationSection } from '../sections/EducationSection';
import { SkillsSection } from '../sections/SkillsSection';
import { CustomSectionRenderer } from '../sections/CustomSectionRenderer';
import { useTemplateHelpers } from '../hooks/useTemplateHelpers';

interface HarvardClassicTemplateProps {
  resumeData: ResumeData;
  customization: ResumeCustomization;
  sectionOrder: SectionOrder[];
}

export const HarvardClassicTemplate: React.FC<HarvardClassicTemplateProps> = ({
  resumeData,
  customization,
  sectionOrder
}) => {
  const { getOrderedSections, isSectionVisible, getVisibleExperience, getVisibleEducation } = useTemplateHelpers({
    resumeData,
    sectionOrder
  });

  const { personalInfo } = resumeData;
  const visibleExperience = getVisibleExperience();
  const visibleEducation = getVisibleEducation();
  const orderedSections = getOrderedSections();

  const getTemplateStyles = () => {
    const baseStyles = {
      width: `${customization.layout.pageWidth * 96}px`,
      minHeight: `${customization.layout.pageHeight * 96}px`,
      padding: `${customization.spacing.page}px`,
      backgroundColor: customization.colors.background || 'white',
      fontFamily: customization.fontFamily || 'Times, serif',
      fontSize: `${customization.fontSize.body}px`,
      lineHeight: customization.lineHeight.body,
      color: customization.colors.text || '#000000',
      borderRadius: `${customization.roundedCorners}px`,
      boxShadow: customization.shadows ? '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)' : 'none'
    };

    // Add page border if enabled
    if (customization.borders.pageBorder) {
      return {
        ...baseStyles,
        border: `${customization.borders.pageBorderWidth}px solid ${customization.borders.pageBorderColor}`
      };
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
  const hasPersonalInfo = personalInfo.firstName || personalInfo.lastName || personalInfo.jobTitle || 
                         personalInfo.email || personalInfo.phone || personalInfo.location;
  const hasAnyContent = hasPersonalInfo || visibleExperience.length > 0 || visibleEducation.length > 0 || 
                       resumeData.skills.length > 0 || resumeData.customSections.length > 0;

  // If no content, show a blank page
  if (!hasAnyContent) {
    return (
      <div className="relative mb-8">
        <div className="bg-white shadow-2xl mx-auto rounded-lg overflow-hidden" style={getTemplateStyles()}>
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
      <div className="bg-white shadow-2xl mx-auto rounded-lg overflow-hidden border border-gray-200" style={getTemplateStyles()}>
        {/* Header - Only show if personal section is visible */}
        {isSectionVisible('personal') && (
          <PersonalInfoSection
            personalInfo={personalInfo}
            customization={customization}
            template="harvard-classic"
          />
        )}

        {/* Render sections in the order specified by sectionOrder */}
        {orderedSections.map((sectionConfig) => {
          const sectionId = sectionConfig.id;
          
          if (sectionId === 'personal') {
            return null; // Personal info is already rendered in header
          }

          if (sectionId.startsWith('custom-')) {
            const customSectionId = sectionId.replace('custom-', '');
            const customSection = resumeData.customSections.find(cs => cs.id === customSectionId);
            
            if (!customSection) return null;

            return (
              <CustomSectionRenderer
                key={sectionId}
                section={customSection}
                customization={customization}
                template="harvard-classic"
              />
            );
          }

          switch (sectionId) {
            case 'experience':
              return (
                <ExperienceSection
                  key={sectionId}
                  experience={visibleExperience}
                  customization={customization}
                  template="harvard-classic"
                />
              );

            case 'education':
              return (
                <EducationSection
                  key={sectionId}
                  education={visibleEducation}
                  customization={customization}
                  template="harvard-classic"
                />
              );

            case 'skills':
              return (
                <SkillsSection
                  key={sectionId}
                  skills={resumeData.skills}
                  customization={customization}
                  template="harvard-classic"
                />
              );

            default:
              return null;
          }
        })}

        {/* Summary Section - Only show if personal section is visible and summary exists */}
        {isSectionVisible('personal') && personalInfo.summary && (
          <div style={{ marginBottom: `${customization.spacing.section}px` }}>
            <h2 style={{
              fontSize: `${customization.fontSize.heading}px`,
              fontWeight: customization.fontWeight.heading,
              color: customization.colors.primary,
              borderBottom: customization.borders.sectionBorder 
                ? `${customization.borders.sectionBorderWidth}px ${customization.borders.sectionBorderStyle} ${customization.colors.primary}`
                : '2px solid #000000',
              marginBottom: `${customization.spacing.item}px`,
              paddingBottom: `${customization.spacing.line / 2}px`,
              textAlign: customization.layout.headerAlignment === 'center' ? 'center' : 'left'
            }}>
              SUMMARY
            </h2>
            <p style={{
              fontSize: `${customization.fontSize.body}px`,
              lineHeight: customization.lineHeight.body,
              color: customization.colors.text,
              textAlign: 'justify'
            }}>
              {personalInfo.summary}
            </p>
          </div>
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