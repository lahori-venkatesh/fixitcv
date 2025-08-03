import React from 'react';
import { Experience, ResumeCustomization } from '../../../types/resume';

interface ExperienceSectionProps {
  experience: Experience[];
  customization: ResumeCustomization;
  template?: string;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  customization,
  template
}) => {
  const isHarvardTemplate = template === 'harvard-classic';

  // Don't render if no experience data
  if (!experience || experience.length === 0) {
    return null;
  }

  // Filter out experiences with no meaningful data
  const validExperience = experience.filter(exp => 
    exp.company || exp.position || (exp.description && exp.description.some(desc => desc.trim()))
  );

  // Don't render if no valid experience
  if (validExperience.length === 0) {
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

  const getItemSpacing = () => ({
    marginBottom: `${customization.spacing.item}px`
  });

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getBulletStyle = () => {
    switch (customization.bulletStyle) {
      case 'circle':
        return 'circle';
      case 'square':
        return 'square';
      case 'dash':
        return 'none'; // We'll handle this with ::before content
      case 'arrow':
        return 'none'; // We'll handle this with ::before content
      case 'diamond':
        return 'none'; // We'll handle this with ::before content
      default:
        return 'disc';
    }
  };

  const getBulletContent = () => {
    switch (customization.bulletStyle) {
      case 'dash':
        return '"-"';
      case 'arrow':
        return '"→"';
      case 'diamond':
        return '"◆"';
      default:
        return '';
    }
  };

  return (
    <div style={{ marginBottom: `${customization.spacing.section}px` }}>
      <h2 style={getSectionTitleStyles()}>
        {isHarvardTemplate ? 'PROFESSIONAL EXPERIENCE' : 'Work Experience'}
      </h2>
      
      {validExperience.map((exp) => (
        <div key={exp.id} style={getItemSpacing()}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: `${customization.spacing.line / 2}px`,
            flexWrap: 'wrap',
            textAlign: customization.layout.contentAlignment as 'left' | 'center' | 'right'
          }}>
            <div style={{ flex: 1 }}>
              {exp.company && (
                <h3 style={{
                  fontSize: `${customization.fontSize.body + 2}px`,
                  fontWeight: customization.fontWeight.heading,
                  color: isHarvardTemplate ? customization.colors.text || '#000000' : customization.colors.text,
                  marginBottom: `${customization.spacing.line / 4}px`,
                  textAlign: customization.layout.contentAlignment as 'left' | 'center' | 'right'
                }}>
                  {isHarvardTemplate ? exp.company.toUpperCase() : exp.company}
                </h3>
              )}
              {exp.position && (
                <h4 style={{
                  fontSize: `${customization.fontSize.body}px`,
                  fontWeight: isHarvardTemplate ? 'normal' : 600,
                  fontStyle: isHarvardTemplate ? 'italic' : 'normal',
                  color: isHarvardTemplate ? customization.colors.text || '#000000' : customization.colors.secondary,
                  marginBottom: `${customization.spacing.line / 4}px`,
                  textAlign: customization.layout.contentAlignment as 'left' | 'center' | 'right'
                }}>
                  {exp.position}
                </h4>
              )}
              {exp.location && !isHarvardTemplate && (
                <p style={{
                  fontSize: `${customization.fontSize.small}px`,
                  color: customization.colors.textLight,
                  margin: 0,
                  textAlign: customization.layout.contentAlignment as 'left' | 'center' | 'right'
                }}>
                  {exp.location}
                </p>
              )}
            </div>
            {(exp.startDate || exp.endDate || exp.current) && (
              <div style={{
                textAlign: 'right',
                fontSize: `${customization.fontSize.small}px`,
                color: isHarvardTemplate ? customization.colors.text || '#000000' : customization.colors.textLight,
                whiteSpace: 'nowrap'
              }}>
                {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
              </div>
            )}
          </div>

          {exp.description && exp.description.length > 0 && exp.description.some(desc => desc.trim()) && (
            <ul style={{
              margin: 0,
              paddingLeft: '20px',
              listStyleType: getBulletStyle(),
              textAlign: customization.layout.contentAlignment as 'left' | 'center' | 'right'
            }}>
              {exp.description.filter(desc => desc.trim()).map((desc, index) => (
                <li key={index} style={{
                  fontSize: `${customization.fontSize.body}px`,
                  lineHeight: customization.lineHeight.body,
                  color: isHarvardTemplate ? customization.colors.text || '#000000' : customization.colors.text,
                  marginBottom: `${customization.spacing.line / 2}px`,
                  position: 'relative',
                  ...(customization.bulletStyle === 'dash' || customization.bulletStyle === 'arrow' || customization.bulletStyle === 'diamond' ? { 
                    listStyleType: 'none',
                    paddingLeft: '1em',
                    position: 'relative',
                  } : {})
                }}>
                  {(customization.bulletStyle === 'dash' || customization.bulletStyle === 'arrow' || customization.bulletStyle === 'diamond') && (
                    <span style={{
                      position: 'absolute',
                      left: '-0.7em',
                      top: '0',
                      display: 'inline-block',
                      width: '1em',
                      textAlign: 'center'
                    }}>
                      {customization.bulletStyle === 'dash' ? '-' : 
                       customization.bulletStyle === 'arrow' ? '→' : 
                       customization.bulletStyle === 'diamond' ? '◆' : ''}
                    </span>
                  )}
                  {desc}
                </li>
              ))}
            </ul>
          )}

          {/* Custom Fields for Experience */}
          {exp.customFields && Object.keys(exp.customFields).length > 0 && (
            <div style={{ marginTop: `${customization.spacing.line}px` }}>
              {Object.entries(exp.customFields).filter(([key, value]) => value.trim()).map(([key, value]) => (
                <div key={key} style={{
                  fontSize: `${customization.fontSize.small}px`,
                  color: customization.colors.textLight,
                  marginBottom: `${customization.spacing.line / 4}px`,
                  textAlign: customization.layout.contentAlignment as 'left' | 'center' | 'right'
                }}>
                  <strong>{key}:</strong> {value}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};