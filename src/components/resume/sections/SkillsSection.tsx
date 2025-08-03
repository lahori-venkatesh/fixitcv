import React from 'react';
import { Skill, ResumeCustomization } from '../../../types/resume';

interface SkillsSectionProps {
  skills: Skill[];
  customization: ResumeCustomization;
  template?: string;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  customization,
  template
}) => {
  const isHarvardTemplate = template === 'harvard-classic';

  // Don't render if no skills data
  if (!skills || skills.length === 0) {
    return null;
  }

  // Filter out skills with no name
  const validSkills = skills.filter(skill => skill.name && skill.name.trim());

  // Don't render if no valid skills
  if (validSkills.length === 0) {
    return null;
  }

  const getSectionTitleStyles = () => {
    if (isHarvardTemplate) {
      return {
        fontSize: `${customization.fontSize.heading}px`,
        fontWeight: customization.fontWeight.heading,
        lineHeight: customization.lineHeight.heading,
        color: customization.colors.text || '#000000',
        borderBottom: customization.borders.sectionBorder 
          ? `${customization.borders.sectionBorderWidth}px ${customization.borders.sectionBorderStyle} ${customization.colors.text || '#000000'}`
          : '2px solid #000000',
        marginBottom: `${customization.spacing.item}px`,
        paddingBottom: `${customization.spacing.line / 2}px`,
        textAlign: customization.layout.sectionHeadingAlignment as 'left' | 'center' | 'right'
      };
    }

    return {
      fontSize: `${customization.fontSize.heading}px`,
      fontWeight: customization.fontWeight.heading,
      lineHeight: customization.lineHeight.heading,
      color: customization.colors.primary,
      marginBottom: `${customization.spacing.item}px`,
      borderBottom: customization.borders.sectionBorder 
        ? `${customization.borders.sectionBorderWidth}px ${customization.borders.sectionBorderStyle} ${customization.colors.primary}`
        : 'none',
      paddingBottom: customization.borders.sectionBorder ? `${customization.spacing.line / 2}px` : '0',
      textAlign: customization.layout.sectionHeadingAlignment as 'left' | 'center' | 'right'
    };
  };

  if (isHarvardTemplate) {
    return (
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        <h2 style={getSectionTitleStyles()}>
          TECHNICAL EXPERTISE
        </h2>
        <div style={{
          fontSize: `${customization.fontSize.body}px`,
          lineHeight: customization.lineHeight.body,
          color: customization.colors.text || '#000000',
          textAlign: customization.layout.contentAlignment as 'left' | 'center' | 'right'
        }}>
          {validSkills.map(skill => skill.name).join(', ')}
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: `${customization.spacing.section}px` }}>
      <h2 style={getSectionTitleStyles()}>
        Skills & Expertise
      </h2>
      
      {/* Template-specific skills layout */}
      {template && template.layout === 'two-column' ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
          gap: `${customization.spacing.line}px`,
          textAlign: customization.layout.contentAlignment as 'left' | 'center' | 'right'
        }}>
          {validSkills.map((skill) => (
            <div key={skill.id} style={{
              fontSize: `${customization.fontSize.body}px`,
              color: customization.colors.text,
              padding: `${customization.spacing.line / 2}px`,
              backgroundColor: `${customization.colors.primary}10`,
              borderRadius: `${customization.roundedCorners}px`,
              textAlign: 'center'
            }}>
              {skill.name}
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: `${customization.spacing.line}px`,
          justifyContent: customization.layout.contentAlignment === 'center' ? 'center' : 
                         customization.layout.contentAlignment === 'right' ? 'flex-end' : 'flex-start'
        }}>
          {validSkills.map((skill) => (
            <span key={skill.id} style={{
              fontSize: `${customization.fontSize.body}px`,
              color: customization.colors.text,
              padding: `${customization.spacing.line / 2}px ${customization.spacing.line}px`,
              backgroundColor: `${customization.colors.primary}15`,
              borderRadius: `${customization.roundedCorners}px`,
              border: `1px solid ${customization.colors.primary}30`
            }}>
              {skill.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};