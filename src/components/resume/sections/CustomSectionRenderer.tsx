import React from 'react';
import { CustomSection, ResumeCustomization } from '../../../types/resume';

interface CustomSectionRendererProps {
  section: CustomSection;
  customization: ResumeCustomization;
  template?: string;
}

// Local interfaces for different content types
interface LocalAchievement {
  title: string;
  description?: string[] | string;
  date?: string;
  category?: string;
  issuer?: string;
  url?: string;
  displayFormat?: 'detailed' | 'compact' | 'grouped';
}

interface LocalProject {
  name: string;
  description?: string;
  technologies?: string[];
  url?: string;
  githubUrl?: string;
  startDate?: string;
  endDate?: string;
  highlights?: string[];
  category?: string;
  status?: string;
  role?: string;
  linkLabels?: {
    github?: { label: string; color: string; underline: boolean };
    live?: { label: string; color: string; underline: boolean };
  };
}

interface LocalLanguage {
  name: string;
  proficiency?: string;
}

interface LocalCourse {
  name: string;
  institution?: string;
  year?: string;
  url?: string;
  description?: string[];
}

interface LocalAward {
  title: string;
  organization?: string;
  year?: string;
  url?: string;
  description?: string[];
}

interface LocalOrganization {
  name: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description?: string[];
}

interface LocalPublication {
  title: string;
  source?: string;
  date?: string;
  url?: string;
  description?: string[];
}

interface LocalReference {
  name: string;
  title?: string;
  company?: string;
  email?: string;
  phone?: string;
  relationship?: string;
}

interface LocalCertification {
  name: string;
  issuer?: string;
  date?: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
  description?: string[];
}

interface TechnicalSkill {
  category: string;
  skills: string;
}

interface SkillItem {
  category?: string;
  skills: string;
}

export const CustomSectionRenderer: React.FC<CustomSectionRendererProps> = ({
  section,
  customization,
  template
}) => {
  const isHarvardTemplate = template === 'harvard-classic';

  // Don't render if no section title or content
  if (!section.title || (!section.content && !section.description)) {
    return null;
  }

  // Helper function to safely get string value from item
  const getStringValue = (item: any): string => {
    if (typeof item === 'string') {
      return item;
    }
    if (typeof item === 'object' && item !== null) {
      // Try common string properties based on section type
      return item.title || item.name || item.description || item.category || item.skills || '';
    }
    return '';
  };

  // Helper function to check if an item has meaningful content
  const hasItemContent = (item: any): boolean => {
    if (item === null || item === undefined) return false;
    
    if (typeof item === 'string') {
      return item.trim().length > 0;
    }
    
    if (typeof item === 'object') {
      // Check common properties for content
      const stringProps = ['title', 'name', 'description', 'category', 'skills'];
      return stringProps.some(prop => 
        typeof item[prop] === 'string' && item[prop].trim().length > 0
      );
    }
    
    return false;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    
    // Check if it's already a formatted string
    if (dateStr.includes(' ') && !dateStr.includes('-') && !dateStr.includes('/')) {
      return dateStr;
    }
    
    try {
      // Handle YYYY-MM format (from month input)
      if (dateStr.match(/^\d{4}-\d{2}$/)) {
        const date = new Date(dateStr + '-01');
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      }
      
      // Handle full date format
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      }
      
      return dateStr;
    } catch (e) {
      return dateStr;
    }
  };

  // Check if content has meaningful data
  const hasContent = () => {
    if (section.type === 'text') {
      return section.content && typeof section.content === 'string' && section.content.trim();
    }
    if (section.type === 'list' || section.type === 'achievements') {
      return Array.isArray(section.content) && section.content.some(item => hasItemContent(item));
    }
    return false;
  };

  // Don't render if no meaningful content and no description
  if (!hasContent() && (!section.description || !section.description.trim())) {
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

  const getBulletStyle = () => {
    switch (customization.bulletStyle) {
      case 'circle':
        return 'circle';
      case 'square':
        return 'square';
      case 'dash':
      case 'arrow':
      case 'diamond':
        return 'none'; // We'll handle these with custom styling
      default:
        return 'disc';
    }
  };

  const renderFormattedText = (text: string) => {
    if (!text) return text;
    // Process links: [text](url) -> <a href="url">text</a>
    text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" class="text-blue-600 underline" target="_blank">$1</a>');
    // Process bold: [[bold]]text[[/bold]] -> <b>text</b>
    text = text.replace(/\[\[bold\]\](.*?)\[\[\/bold\]\]/g, '<b>$1</b>');
    return text;
  };

  // Helper function to render different object types
  const renderObjectItem = (item: any, index: number) => {
    const sectionTitle = section.title.toLowerCase();
    
    // Handle different object types based on section title
    if (sectionTitle.includes('achievement') || sectionTitle.includes('award')) {
      const achievement = item as LocalAchievement | LocalAward;
      
      // Check for display format
      const displayFormat = (achievement as LocalAchievement).displayFormat || 'detailed';
      
      // For compact format, render a simple one-liner
      if (displayFormat === 'compact') {
        return (
          <div key={index} style={{ 
            marginBottom: `${customization.spacing.line / 2}px`,
            fontSize: `${customization.fontSize.body}px`,
            lineHeight: customization.lineHeight.body,
            color: customization.colors.text
          }}>
            • {achievement.title} {achievement.issuer && `, ${achievement.issuer}`} ({achievement.date ? formatDate(achievement.date) : ''})
            {achievement.url && (
              <a 
                href={achievement.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  color: customization.colors.primary,
                  textDecoration: 'underline',
                  marginLeft: '4px'
                }}
              >
                Certificate
              </a>
            )}
          </div>
        );
      }
      
      // For detailed format (default)
      return (
        <div key={index} style={{ marginBottom: `${customization.spacing.line}px` }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: `${customization.spacing.line / 2}px`,
            flexWrap: 'wrap'
          }}>
            <div style={{ 
              fontWeight: 'bold', 
              flex: 1,
              fontSize: `${customization.fontSize.body + 1}px`,
              color: customization.colors.text
            }}>
              {achievement.title}
              {(achievement.issuer || (item as LocalAward).organization) && ` | ${achievement.issuer || (item as LocalAward).organization}`}
              {achievement.url && (
                <a 
                  href={achievement.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    color: customization.colors.primary,
                    textDecoration: 'underline',
                    marginLeft: '4px'
                  }}
                >
                  | Certificate
                </a>
              )}
            </div>
            {achievement.date && (
              <div style={{ 
                fontSize: `${customization.fontSize.small}px`, 
                color: customization.colors.textLight,
                whiteSpace: 'nowrap'
              }}>
                {formatDate(achievement.date)}
              </div>
            )}
          </div>
          
          {/* Render bullet points for description */}
          {achievement.description && Array.isArray(achievement.description) && achievement.description.length > 0 && (
            <ul style={{
              margin: 0,
              paddingLeft: '16px',
              listStyleType: getBulletStyle(),
            }}>
              {achievement.description.map((desc, i) => (
                <li key={i} style={{
                  fontSize: `${customization.fontSize.body}px`,
                  lineHeight: customization.lineHeight.body,
                  color: customization.colors.text,
                  marginBottom: `${customization.spacing.line / 4}px`,
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
                  <span dangerouslySetInnerHTML={{ __html: renderFormattedText(desc) }} />
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }
    
    if (sectionTitle.includes('project')) {
      const project = item as LocalProject;
      return (
        <div key={index} style={{ marginBottom: `${customization.spacing.line}px` }}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            marginBottom: `${customization.spacing.line / 2}px`,
            gap: '8px'
          }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              flex: 1,
              gap: '4px'
            }}>
              <span style={{ 
                fontWeight: 'bold',
                fontSize: `${customization.fontSize.body + 1}px`,
                color: customization.colors.text
              }}>
                {project.name}
              </span>
              
              {project.role && (
                <>
                  <span style={{ color: customization.colors.textLight }}>|</span>
                  <span style={{ 
                    fontSize: `${customization.fontSize.body}px`,
                    color: customization.colors.secondary
                  }}>
                    {project.role}
                  </span>
                </>
              )}
              
              {/* GitHub Link */}
              {project.githubUrl && (
                <>
                  <span style={{ color: customization.colors.textLight }}>|</span>
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    color: project.linkLabels?.github?.color || customization.colors.primary,
                    textDecoration: project.linkLabels?.github?.underline !== false ? 'underline' : 'none',
                    fontSize: `${customization.fontSize.body}px`
                  }}
                >
                  {project.linkLabels?.github?.label || 'GitHub'}
                </a>
                </>
              )}
              
              {/* Live Link */}
              {project.url && (
                <>
                  <span style={{ color: customization.colors.textLight }}>|</span>
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    color: project.linkLabels?.live?.color || customization.colors.primary,
                    textDecoration: project.linkLabels?.live?.underline !== false ? 'underline' : 'none',
                    fontSize: `${customization.fontSize.body}px`
                  }}
                >
                  {project.linkLabels?.live?.label || 'Live'}
                </a>
                </>
              )}
            </div>
            
            {(project.startDate || project.endDate) && (
              <div style={{ 
                fontSize: `${customization.fontSize.small}px`, 
                color: customization.colors.textLight,
                whiteSpace: 'nowrap',
                textAlign: 'right'
              }}>
                {project.startDate ? formatDate(project.startDate) : ''} 
                {project.startDate && project.endDate ? ' – ' : ''} 
                {project.endDate ? formatDate(project.endDate) : ''}
              </div>
            )}
          </div>
          
          {/* Project description */}
          {project.description && (
            <div style={{ 
              fontSize: `${customization.fontSize.body}px`,
              lineHeight: customization.lineHeight.body,
              color: customization.colors.text,
              marginBottom: `${customization.spacing.line / 2}px`
            }}>
              {project.description}
            </div>
          )}
          
          {/* Render bullet points for highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <ul style={{
              margin: 0,
              paddingLeft: '20px',
              listStyleType: getBulletStyle(),
              marginBottom: `${customization.spacing.line / 2}px`
            }}>
              {project.highlights.map((highlight, i) => (
                <li key={i} style={{
                  fontSize: `${customization.fontSize.body}px`,
                  lineHeight: customization.lineHeight.body,
                  color: customization.colors.text,
                  marginBottom: `${customization.spacing.line / 4}px`,
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
                  <span dangerouslySetInnerHTML={{ __html: renderFormattedText(highlight) }} />
                </li>
              ))}
            </ul>
          )}
          
          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div style={{ 
              fontSize: `${customization.fontSize.body}px`,
              lineHeight: customization.lineHeight.body,
              color: customization.colors.text,
              marginBottom: `${customization.spacing.line / 2}px`,
              fontWeight: 'bold'
            }}>
              Technologies: {project.technologies.join(', ')}
            </div>
          )}
        </div>
      );
    }
    
    if (sectionTitle.includes('language')) {
      const language = item as LocalLanguage;
      return (
        <div key={index} style={{ marginBottom: `${customization.spacing.line / 2}px` }}>
          <span style={{ fontWeight: 'bold' }}>{language.name}</span>
          {language.proficiency && (
            <span style={{ marginLeft: '8px', color: customization.colors.textLight }}>
              - {language.proficiency}
            </span>
          )}
        </div>
      );
    }
    
    if (sectionTitle.includes('course')) {
      const course = item as LocalCourse;
      return (
        <div key={index} style={{ marginBottom: `${customization.spacing.line}px` }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: `${customization.spacing.line / 2}px`
          }}>
            <div style={{ fontWeight: 'bold', flex: 1 }}>
              {course.name} {course.institution && `| ${course.institution}`} {course.url && 
                <a 
                  href={course.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    color: customization.colors.primary,
                    textDecoration: 'underline',
                    marginLeft: '4px'
                  }}
                >
                  | Certificate
                </a>
              }
            </div>
            {course.year && (
              <div style={{ 
                fontSize: `${customization.fontSize.small}px`, 
                color: customization.colors.textLight,
                whiteSpace: 'nowrap',
                marginLeft: '16px'
              }}>
                {formatDate(course.year)}
              </div>
            )}
          </div>
          
          {/* Render bullet points for description */}
          {course.description && Array.isArray(course.description) && course.description.length > 0 && (
            <ul style={{
              margin: 0,
              paddingLeft: '20px',
              listStyleType: getBulletStyle(),
            }}>
              {course.description.map((desc, i) => (
                <li key={i} style={{
                  fontSize: `${customization.fontSize.body}px`,
                  lineHeight: customization.lineHeight.body,
                  color: customization.colors.text,
                  marginBottom: `${customization.spacing.line / 4}px`,
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
                  <span dangerouslySetInnerHTML={{ __html: renderFormattedText(desc) }} />
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }
    
    if (sectionTitle.includes('organization')) {
      const org = item as LocalOrganization;
      return (
        <div key={index} style={{ marginBottom: `${customization.spacing.line}px` }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: `${customization.spacing.line / 2}px`
          }}>
            <div style={{ fontWeight: 'bold', flex: 1 }}>
              {org.name} {org.role && `– ${org.role}`}
            </div>
            {(org.startDate || org.endDate || org.current) && (
              <div style={{ 
                fontSize: `${customization.fontSize.small}px`, 
                color: customization.colors.textLight,
                whiteSpace: 'nowrap',
                marginLeft: '16px'
              }}>
                {formatDate(org.startDate)} – {org.current ? 'Present' : formatDate(org.endDate)}
              </div>
            )}
          </div>
          
          {/* Render bullet points for description */}
          {org.description && Array.isArray(org.description) && org.description.length > 0 && (
            <ul style={{
              margin: 0,
              paddingLeft: '20px',
              listStyleType: getBulletStyle(),
              marginTop: `${customization.spacing.line / 2}px`
            }}>
              {org.description.map((desc, i) => (
                <li key={i} style={{
                  fontSize: `${customization.fontSize.body}px`,
                  lineHeight: customization.lineHeight.body,
                  color: customization.colors.text,
                  marginBottom: `${customization.spacing.line / 4}px`,
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
                  <span dangerouslySetInnerHTML={{ __html: renderFormattedText(desc) }} />
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }
    
    if (sectionTitle.includes('publication')) {
      const pub = item as LocalPublication;
      return (
        <div key={index} style={{ marginBottom: `${customization.spacing.line}px` }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: `${customization.spacing.line / 2}px`
          }}>
            <div style={{ fontWeight: 'bold', flex: 1 }}>
              {pub.title} {pub.source && `| ${pub.source}`} {pub.url && 
                <a 
                  href={pub.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    color: customization.colors.primary,
                    textDecoration: 'underline',
                    marginLeft: '4px'
                  }}
                >
                  | Read
                </a>
              }
            </div>
            {pub.date && (
              <div style={{ 
                fontSize: `${customization.fontSize.small}px`, 
                color: customization.colors.textLight,
                whiteSpace: 'nowrap',
                marginLeft: '16px'
              }}>
                {formatDate(pub.date)}
              </div>
            )}
          </div>
          
          {/* Render bullet points for description */}
          {pub.description && Array.isArray(pub.description) && pub.description.length > 0 && (
            <ul style={{
              margin: 0,
              paddingLeft: '20px',
              listStyleType: getBulletStyle(),
            }}>
              {pub.description.map((desc, i) => (
                <li key={i} style={{
                  fontSize: `${customization.fontSize.body}px`,
                  lineHeight: customization.lineHeight.body,
                  color: customization.colors.text,
                  marginBottom: `${customization.spacing.line / 4}px`,
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
                  <span dangerouslySetInnerHTML={{ __html: renderFormattedText(desc) }} />
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }
    
    if (sectionTitle.includes('reference')) {
      const ref = item as LocalReference;
      return (
        <div key={index} style={{ marginBottom: `${customization.spacing.line}px` }}>
          <div style={{ fontWeight: 'bold' }}>
            {ref.name}
          </div>
          {ref.title && (
            <div style={{ fontSize: `${customization.fontSize.small}px`, color: customization.colors.textLight }}>
              {ref.title}
            </div>
          )}
          {ref.company && (
            <div style={{ fontSize: `${customization.fontSize.small}px`, color: customization.colors.textLight }}>
              {ref.company}
            </div>
          )}
          {ref.email && (
            <div style={{ fontSize: `${customization.fontSize.small}px`, color: customization.colors.textLight }}>
              Email: {ref.email}
            </div>
          )}
          {ref.phone && (
            <div style={{ fontSize: `${customization.fontSize.small}px`, color: customization.colors.textLight }}>
              Phone: {ref.phone}
            </div>
          )}
        </div>
      );
    }
    
    if (sectionTitle.includes('certification')) {
      const cert = item as LocalCertification;
      return (
        <div key={index} style={{ marginBottom: `${customization.spacing.line}px` }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: `${customization.spacing.line / 2}px`
          }}>
            <div style={{ fontWeight: 'bold', flex: 1 }}>
              {cert.name} {cert.issuer && `| ${cert.issuer}`} {cert.url && 
                <a 
                  href={cert.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    color: customization.colors.primary,
                    textDecoration: 'underline',
                    marginLeft: '4px'
                  }}
                >
                  | Certificate
                </a>
              }
            </div>
            {cert.date && (
              <div style={{ 
                fontSize: `${customization.fontSize.small}px`, 
                color: customization.colors.textLight,
                whiteSpace: 'nowrap',
                marginLeft: '16px'
              }}>
                {formatDate(cert.date)}
              </div>
            )}
          </div>
          
          {/* Render bullet points for description */}
          {cert.description && Array.isArray(cert.description) && cert.description.length > 0 && (
            <ul style={{
              margin: 0,
              paddingLeft: '20px',
              listStyleType: getBulletStyle(),
            }}>
              {cert.description.map((desc, i) => (
                <li key={i} style={{
                  fontSize: `${customization.fontSize.body}px`,
                  lineHeight: customization.lineHeight.body,
                  color: customization.colors.text,
                  marginBottom: `${customization.spacing.line / 4}px`,
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
                  <span dangerouslySetInnerHTML={{ __html: renderFormattedText(desc) }} />
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    // Special handling for Technical Skills section
    if (sectionTitle.toLowerCase().includes('technical skills')) {
      // For technical skills, we expect items to be in the format { category: string, skills: string }
      if (typeof item === 'object' && item !== null && 'category' in item && 'skills' in item) {
        return (
          <div key={index} style={{ 
            display: 'flex',
            marginBottom: `${customization.spacing.line / 2}px`,
            alignItems: 'flex-start'
          }}>
            <div style={{ 
              width: '33%', 
              fontWeight: 'bold',
              paddingRight: '8px',
              display: 'flex',
              alignItems: 'flex-start'
            }}>
              <span style={{ marginRight: '4px' }}>•</span>
              <span>{item.category}</span>
            </div>
            <div style={{ width: '67%' }}>
              : {item.skills}
            </div>
          </div>
        );
      }
    }

    // Special handling for Skills section
    if (sectionTitle.toLowerCase() === 'skills') {
      const skillItem = item as SkillItem;
      
      // If it has a category, render as categorized list
      if (skillItem.category) {
        return (
          <div key={index} style={{ marginBottom: `${customization.spacing.line}px` }}>
            <div style={{ fontWeight: 'bold', marginBottom: `${customization.spacing.line / 4}px` }}>
              {skillItem.category}
            </div>
            <div style={{ 
              color: customization.colors.text,
              fontSize: `${customization.fontSize.body}px`
            }}>
              {skillItem.skills}
            </div>
          </div>
        );
      } 
      // Otherwise render as simple list
      else {
        return (
          <div key={index} style={{ marginBottom: `${customization.spacing.line / 2}px` }}>
            {skillItem.skills}
          </div>
        );
      }
    }
    
    // Fallback for unknown object types - try to display the main string property
    const stringValue = getStringValue(item);
    if (stringValue) {
      return (
        <div key={index} style={{ marginBottom: `${customization.spacing.line / 2}px` }}>
          {stringValue}
        </div>
      );
    }
    
    return null;
  };

  // Helper function to render achievements in different formats
  const renderAchievements = (achievements: any[]) => {
    // Check if we have a display format specified in the first item
    const displayFormat = achievements[0]?.displayFormat || 'detailed';
    
    // Group achievements by category if using grouped format
    if (displayFormat === 'grouped') {
      const groupedAchievements = achievements.reduce((groups: {[key: string]: any[]}, achievement) => {
        const category = achievement.category || 'Other';
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(achievement);
        return groups;
      }, {});
      
      return (
        <div>
          {Object.entries(groupedAchievements).map(([category, categoryAchievements], groupIndex) => (
            <div key={groupIndex} style={{ marginBottom: `${customization.spacing.item}px` }}>
              <div style={{ 
                fontSize: `${customization.fontSize.body}px`,
                fontWeight: 'bold',
                marginBottom: `${customization.spacing.line / 2}px`
              }}>
                🔹 {category}
              </div>
              {categoryAchievements.map((achievement, i) => (
                <div key={i} style={{ 
                  fontSize: `${customization.fontSize.body}px`,
                  marginBottom: `${customization.spacing.line / 2}px`,
                  color: customization.colors.text
                }}>
                  • {achievement.title} {achievement.issuer && `, ${achievement.issuer}`} ({formatDate(achievement.date)})
                  {achievement.url && (
                    <a 
                      href={achievement.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ 
                        color: customization.colors.primary,
                        textDecoration: 'underline',
                        marginLeft: '4px'
                      }}
                    >
                      Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }
    
    // For compact format, render as a simple list
    if (displayFormat === 'compact') {
      return (
        <ul style={{
          margin: 0,
          paddingLeft: '20px',
          listStyleType: getBulletStyle(),
        }}>
          {achievements.map((achievement, i) => (
            <li key={i} style={{
              fontSize: `${customization.fontSize.body}px`,
              lineHeight: customization.lineHeight.body,
              color: customization.colors.text,
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
              {achievement.title} {achievement.issuer && `, ${achievement.issuer}`} ({formatDate(achievement.date)})
              {achievement.url && (
                <a 
                  href={achievement.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    color: customization.colors.primary,
                    textDecoration: 'underline',
                    marginLeft: '4px'
                  }}
                >
                  Certificate
                </a>
              )}
            </li>
          ))}
        </ul>
      );
    }
    
    // Default to detailed format
    return achievements.map((achievement, index) => renderObjectItem(achievement, index));
  };

  // Helper function to render projects
  const renderProjects = (projects: any[]) => {
    // Group projects by category if there are multiple categories
    const categories = [...new Set(projects.map(p => p.category))];
    
    if (categories.length > 1) {
      // Group by category
      const groupedProjects = projects.reduce((groups: {[key: string]: any[]}, project) => {
        const category = project.category || 'Other';
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(project);
        return groups;
      }, {});
      
      return (
        <div>
          {Object.entries(groupedProjects).map(([category, categoryProjects], groupIndex) => (
            <div key={groupIndex} style={{ marginBottom: `${customization.spacing.item}px` }}>
              <div style={{ 
                fontSize: `${customization.fontSize.body}px`,
                fontWeight: 'bold',
                marginBottom: `${customization.spacing.line / 2}px`
              }}>
                {category} Projects
              </div>
              {categoryProjects.map((project, i) => renderObjectItem(project, i))}
            </div>
          ))}
        </div>
      );
    }
    
    // Default to flat list
    return projects.map((project, index) => renderObjectItem(project, index));
  };

  const renderContent = () => {
    switch (section.type) {
      case 'text':
        if (!section.content || typeof section.content !== 'string' || !section.content.trim()) return null;
        return (
          <div style={{
            fontSize: isHarvardTemplate ? `${customization.fontSize.body}px` : `${customization.fontSize.body}px`,
            lineHeight: customization.lineHeight.body,
            color: isHarvardTemplate ? customization.colors.text || '#000000' : customization.colors.text,
            whiteSpace: 'pre-wrap',
            textAlign: customization.layout.contentAlignment as 'left' | 'center' | 'right'
          }} dangerouslySetInnerHTML={{ __html: renderFormattedText(section.content || '') }} />
        );

      case 'list':
      case 'achievements':
        const items = Array.isArray(section.content) ? section.content.filter(item => hasItemContent(item)) : [];
        if (items.length === 0) return null;
        
        // Special handling for Technical Skills section
        if (section.title.toLowerCase().includes('technical skills')) {
          return (
            <div style={{
              textAlign: customization.layout.contentAlignment as 'left' | 'center' | 'right'
            }}>
              {items.map((item, index) => renderObjectItem(item, index))}
            </div>
          );
        }

        // Special handling for Skills section
        if (section.title.toLowerCase() === 'skills') {
          return (
            <div style={{
              textAlign: customization.layout.contentAlignment as 'left' | 'center' | 'right'
            }}>
              {items.map((item, index) => renderObjectItem(item, index))}
            </div>
          );
        }
        
        // Special handling for Achievements section
        if (section.title.toLowerCase().includes('achievement')) {
          return (
            <div style={{
              textAlign: customization.layout.contentAlignment as 'left' | 'center' | 'right'
            }}>
              {renderAchievements(items)}
            </div>
          );
        }
        
        // Special handling for Projects section
        if (section.title.toLowerCase().includes('project')) {
          return (
            <div style={{
              textAlign: customization.layout.contentAlignment as 'left' | 'center' | 'right'
            }}>
              {renderProjects(items)}
            </div>
          );
        }
        
        // Check if items are objects or strings
        const hasObjectItems = items.some(item => typeof item === 'object' && item !== null);
        
        if (hasObjectItems) {
          // Render as structured content for objects
          return (
            <div style={{
              textAlign: customization.layout.contentAlignment as 'left' | 'center' | 'right'
            }}>
              {items.map((item, index) => renderObjectItem(item, index))}
            </div>
          );
        } else {
          // Render as list for strings
          return (
            <ul style={{
              margin: 0,
              paddingLeft: isHarvardTemplate ? '16px' : '20px',
              listStyleType: getBulletStyle(),
              textAlign: customization.layout.contentAlignment as 'left' | 'center' | 'right'
            }}>
              {items.map((item: any, index: number) => {
                const stringValue = getStringValue(item);
                return (
                  <li key={index} style={{
                    fontSize: isHarvardTemplate ? `${customization.fontSize.body}px` : `${customization.fontSize.body}px`,
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
                    <span dangerouslySetInnerHTML={{ __html: renderFormattedText(stringValue) }} />
                  </li>
                );
              })}
            </ul>
          );
        }

      default:
        return null;
    }
  };

  const content = renderContent();
  const hasDescription = section.description && section.description.trim();

  // Don't render if no content and no description
  if (!content && !hasDescription) {
    return null;
  }

  return (
    <div style={{ marginBottom: `${customization.spacing.section}px` }}>
      <h2 style={getSectionTitleStyles()}>
        {isHarvardTemplate ? section.title.toUpperCase() : section.title}
      </h2>
      
      {content}

      {hasDescription && (
        <div style={{
          fontSize: isHarvardTemplate ? `${customization.fontSize.body}px` : `${customization.fontSize.body}px`,
          lineHeight: customization.lineHeight.body,
          color: isHarvardTemplate ? customization.colors.text || '#000000' : customization.colors.text,
          marginTop: content ? `${customization.spacing.line}px` : '0',
          whiteSpace: 'pre-wrap',
          textAlign: customization.layout.contentAlignment as 'left' | 'center' | 'right'
        }} dangerouslySetInnerHTML={{ __html: renderFormattedText(section.description) }} />
      )}

      {/* Custom Fields - only show if they have values */}
      {section.customFields && Object.keys(section.customFields).length > 0 && (
        <div style={getItemSpacing()}>
          {Object.entries(section.customFields).filter(([key, value]) => value && typeof value === 'string' && value.trim()).map(([key, value]) => (
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
  );
};