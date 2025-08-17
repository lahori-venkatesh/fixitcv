import React, { useState, useEffect, useMemo } from 'react';
import { ResumeData, SectionOrder, ResumeCustomization } from '../../../types/resume';
import { PageContainer } from '../PageContainer';
import { useSectionPagination } from '../../../hooks/usePagination';

interface IITPremiumTemplateProps {
  resumeData: ResumeData;
  customization: ResumeCustomization;
  sectionOrder: SectionOrder[];
}

export const IITPremiumTemplate: React.FC<IITPremiumTemplateProps> = ({
  resumeData,
  customization,
  sectionOrder
}) => {
  const { personalInfo, experience, education, skills, projects, certifications, achievements, customSections } = resumeData;

  // Filter visible sections and prepare data
  const visibleSections = sectionOrder.filter(section => section.visible);
  const visibleExperience = experience.filter(exp => exp.visible !== false);
  const visibleEducation = education.filter(edu => edu.visible !== false);
  const visibleProjects = projects?.filter(proj => proj.visible !== false) || [];
  const visibleCertifications = certifications?.filter(cert => cert.visible !== false) || [];
  const visibleAchievements = achievements?.filter(ach => ach.visible !== false) || [];
  const visibleCustomSections = customSections?.filter(cs => cs.visible !== false) || [];

  // Prepare sections with data for pagination
  const sectionsWithData = useMemo(() => {
    return visibleSections.map(section => ({
      ...section,
      data: (() => {
        switch (section.component) {
          case 'personal': return personalInfo;
          case 'experience': return visibleExperience;
          case 'education': return visibleEducation;
          case 'projects': return visibleProjects;
          case 'skills': return skills;
          case 'achievements': return visibleAchievements;
          case 'certifications': return visibleCertifications;
          default: 
            // Handle custom sections
            if (section.id.startsWith('custom-')) {
              const customSectionId = section.id.replace('custom-', '');
              return visibleCustomSections.find(cs => cs.id === customSectionId);
            }
            return null;
        }
      })()
    }));
  }, [visibleSections, personalInfo, visibleExperience, visibleEducation, visibleProjects, skills, visibleAchievements, visibleCertifications, visibleCustomSections]);

  // Use pagination hook
  const { pages: sectionPages } = useSectionPagination(sectionsWithData, customization);

  // Base styles for content
  const baseStyles = {
    fontFamily: customization.fontFamily,
    fontSize: `${customization.fontSize.body}px`,
    lineHeight: customization.lineHeight.body,
    color: customization.colors.text
  };

  // Render header component with IIT branding
  const renderHeader = () => (
    <div style={{
      textAlign: 'center' as const,
      marginBottom: `${customization.spacing.section}px`,
      paddingBottom: `${customization.spacing.item}px`,
      borderBottom: `3px solid #1e40af`,
      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
      color: 'white',
      padding: `${customization.spacing.section}px`,
      borderRadius: '8px',
      margin: `0 0 ${customization.spacing.section}px 0`
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: `${customization.spacing.item}px`
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '15px'
        }}>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>🏛️</span>
        </div>
        <div>
          <h1 style={{
            fontSize: `${customization.fontSize.name + 4}px`,
            fontWeight: 'bold',
            color: 'white',
            margin: 0,
            letterSpacing: '2px',
            textTransform: 'uppercase' as const
          }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.jobTitle && (
            <div style={{
              fontSize: `${customization.fontSize.heading}px`,
              color: 'rgba(255,255,255,0.9)',
              fontWeight: '500',
              marginTop: '5px'
            }}>
              {personalInfo.jobTitle}
            </div>
          )}
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap' as const,
        gap: '20px',
        fontSize: `${customization.fontSize.small}px`,
        color: 'rgba(255,255,255,0.9)',
        marginTop: `${customization.spacing.item}px`
      }}>
        {personalInfo.location && <span>📍 {personalInfo.location}</span>}
        {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
        {personalInfo.email && <span>✉ {personalInfo.email}</span>}
        {personalInfo.linkedin && <span>💼 {personalInfo.linkedin}</span>}
        {personalInfo.github && <span>⚙ {personalInfo.github}</span>}
      </div>
    </div>
  );

  // Render professional summary
  const renderSummary = () => {
    if (!personalInfo.summary) return null;
    
    return (
      <div style={{
        marginBottom: `${customization.spacing.section}px`,
        padding: `${customization.spacing.item}px`,
        background: '#f8fafc',
        borderRadius: '8px',
        borderLeft: `4px solid #1e40af`
      }}>
        <h2 style={{
          fontSize: `${customization.fontSize.heading}px`,
          fontWeight: 'bold',
          color: '#1e40af',
          marginBottom: `${customization.spacing.line}px`,
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ marginRight: '8px' }}>🎯</span>
          Professional Summary
        </h2>
        <p style={{
          ...baseStyles,
          margin: 0,
          lineHeight: '1.6',
          color: '#374151'
        }}>
          {personalInfo.summary}
        </p>
      </div>
    );
  };

  // Render experience section with IIT style
  const renderExperience = () => {
    if (visibleExperience.length === 0) return null;

    return (
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        <h2 style={{
          fontSize: `${customization.fontSize.heading}px`,
          fontWeight: 'bold',
          color: '#1e40af',
          marginBottom: `${customization.spacing.item}px`,
          paddingBottom: '8px',
          borderBottom: `2px solid #e5e7eb`,
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ marginRight: '8px' }}>💼</span>
          Professional Experience
        </h2>
        
        {visibleExperience.map((exp, index) => (
          <div key={exp.id} style={{
            marginBottom: `${customization.spacing.item}px`,
            padding: `${customization.spacing.item}px`,
            background: index % 2 === 0 ? '#f8fafc' : 'white',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '8px'
            }}>
              <div>
                <h3 style={{
                  fontSize: `${customization.fontSize.heading}px`,
                  fontWeight: 'bold',
                  color: '#1e40af',
                  margin: 0
                }}>
                  {exp.position}
                </h3>
                <div style={{
                  fontSize: `${customization.fontSize.body}px`,
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '4px'
                }}>
                  {exp.company}
                </div>
                <div style={{
                  fontSize: `${customization.fontSize.small}px`,
                  color: '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <span>📍 {exp.location}</span>
                  <span>📅 {exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
              </div>
            </div>
            
            <ul style={{
              margin: '12px 0 0 0',
              paddingLeft: '20px'
            }}>
              {exp.description.map((desc, descIndex) => (
                <li key={descIndex} style={{
                  ...baseStyles,
                  marginBottom: '6px',
                  lineHeight: '1.5',
                  color: '#374151'
                }}>
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  // Render education section with IIT emphasis
  const renderEducation = () => {
    if (visibleEducation.length === 0) return null;

    return (
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        <h2 style={{
          fontSize: `${customization.fontSize.heading}px`,
          fontWeight: 'bold',
          color: '#1e40af',
          marginBottom: `${customization.spacing.item}px`,
          paddingBottom: '8px',
          borderBottom: `2px solid #e5e7eb`,
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ marginRight: '8px' }}>🎓</span>
          Education
        </h2>
        
        {visibleEducation.map((edu, index) => (
          <div key={edu.id} style={{
            marginBottom: `${customization.spacing.item}px`,
            padding: `${customization.spacing.item}px`,
            background: index % 2 === 0 ? '#f8fafc' : 'white',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '8px'
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: `${customization.fontSize.heading}px`,
                  fontWeight: 'bold',
                  color: '#1e40af',
                  margin: 0
                }}>
                  {edu.degree} in {edu.field}
                </h3>
                <div style={{
                  fontSize: `${customization.fontSize.body}px`,
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '4px'
                }}>
                  {edu.institution}
                </div>
                <div style={{
                  fontSize: `${customization.fontSize.small}px`,
                  color: '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <span>📍 {edu.location}</span>
                  <span>📅 {edu.startDate} - {edu.endDate}</span>
                  {edu.gpa && <span>📊 GPA: {edu.gpa}</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render skills section with technical focus
  const renderSkills = () => {
    if (skills.length === 0) return null;

    const skillLevels = ['Expert', 'Advanced', 'Intermediate', 'Beginner'];
    const skillColors = {
      'Expert': '#059669',
      'Advanced': '#0891b2',
      'Intermediate': '#7c3aed',
      'Beginner': '#dc2626'
    };

    return (
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        <h2 style={{
          fontSize: `${customization.fontSize.heading}px`,
          fontWeight: 'bold',
          color: '#1e40af',
          marginBottom: `${customization.spacing.item}px`,
          paddingBottom: '8px',
          borderBottom: `2px solid #e5e7eb`,
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ marginRight: '8px' }}>⚡</span>
          Technical Skills
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px'
        }}>
          {skillLevels.map(level => {
            const levelSkills = skills.filter(skill => skill.level === level);
            if (levelSkills.length === 0) return null;
            
            return (
              <div key={level} style={{
                padding: `${customization.spacing.item}px`,
                background: '#f8fafc',
                borderRadius: '8px',
                border: `2px solid ${skillColors[level as keyof typeof skillColors]}`
              }}>
                <h4 style={{
                  fontSize: `${customization.fontSize.body}px`,
                  fontWeight: 'bold',
                  color: skillColors[level as keyof typeof skillColors],
                  margin: '0 0 8px 0',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '1px'
                }}>
                  {level}
                </h4>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px'
                }}>
                  {levelSkills.map(skill => (
                    <span key={skill.id} style={{
                      padding: '4px 8px',
                      background: skillColors[level as keyof typeof skillColors],
                      color: 'white',
                      borderRadius: '12px',
                      fontSize: `${customization.fontSize.small}px`,
                      fontWeight: '500'
                    }}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render projects section
  const renderProjects = () => {
    if (visibleProjects.length === 0) return null;

    return (
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        <h2 style={{
          fontSize: `${customization.fontSize.heading}px`,
          fontWeight: 'bold',
          color: '#1e40af',
          marginBottom: `${customization.spacing.item}px`,
          paddingBottom: '8px',
          borderBottom: `2px solid #e5e7eb`,
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ marginRight: '8px' }}>🚀</span>
          Projects
        </h2>
        
        {visibleProjects.map((project, index) => (
          <div key={project.id} style={{
            marginBottom: `${customization.spacing.item}px`,
            padding: `${customization.spacing.item}px`,
            background: index % 2 === 0 ? '#f8fafc' : 'white',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '8px'
            }}>
              <h3 style={{
                fontSize: `${customization.fontSize.heading}px`,
                fontWeight: 'bold',
                color: '#1e40af',
                margin: 0
              }}>
                {project.name || 'Project'}
              </h3>
              {project.technologies && project.technologies.length > 0 && (
                <div style={{
                  display: 'flex',
                  gap: '6px',
                  flexWrap: 'wrap'
                }}>
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} style={{
                      padding: '2px 6px',
                      background: '#3b82f6',
                      color: 'white',
                      borderRadius: '8px',
                      fontSize: '10px',
                      fontWeight: '500'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <p style={{
              ...baseStyles,
              margin: '0 0 8px 0',
              lineHeight: '1.5',
              color: '#374151'
            }}>
              {project.description}
            </p>
            
            {project.highlights && project.highlights.length > 0 && (
              <ul style={{
                margin: '8px 0 0 0',
                paddingLeft: '20px'
              }}>
                {project.highlights.map((highlight, highlightIndex) => (
                  <li key={highlightIndex} style={{
                    ...baseStyles,
                    marginBottom: '4px',
                    lineHeight: '1.4',
                    color: '#4b5563',
                    fontSize: `${customization.fontSize.small}px`
                  }}>
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Render certifications section
  const renderCertifications = () => {
    if (visibleCertifications.length === 0) return null;

    return (
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        <h2 style={{
          fontSize: `${customization.fontSize.heading}px`,
          fontWeight: 'bold',
          color: '#1e40af',
          marginBottom: `${customization.spacing.item}px`,
          paddingBottom: '8px',
          borderBottom: `2px solid #e5e7eb`,
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ marginRight: '8px' }}>🏆</span>
          Certifications
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '12px'
        }}>
          {visibleCertifications.map((cert) => (
            <div key={cert.id} style={{
              padding: `${customization.spacing.item}px`,
              background: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <h4 style={{
                fontSize: `${customization.fontSize.body}px`,
                fontWeight: 'bold',
                color: '#1e40af',
                margin: '0 0 6px 0'
              }}>
                {cert.name}
              </h4>
              <div style={{
                fontSize: `${customization.fontSize.small}px`,
                color: '#6b7280',
                marginBottom: '6px'
              }}>
                {cert.issuer}
              </div>
              <div style={{
                fontSize: `${customization.fontSize.small}px`,
                color: '#9ca3af'
              }}>
                {cert.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render achievements section
  const renderAchievements = () => {
    if (visibleAchievements.length === 0) return null;

    return (
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        <h2 style={{
          fontSize: `${customization.fontSize.heading}px`,
          fontWeight: 'bold',
          color: '#1e40af',
          marginBottom: `${customization.spacing.item}px`,
          paddingBottom: '8px',
          borderBottom: `2px solid #e5e7eb`,
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ marginRight: '8px' }}>⭐</span>
          Achievements & Awards
        </h2>
        
        {visibleAchievements.map((achievement, index) => (
          <div key={achievement.id} style={{
            marginBottom: `${customization.spacing.item}px`,
            padding: `${customization.spacing.item}px`,
            background: index % 2 === 0 ? '#f8fafc' : 'white',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h4 style={{
              fontSize: `${customization.fontSize.body}px`,
              fontWeight: 'bold',
              color: '#1e40af',
              margin: '0 0 6px 0'
            }}>
              {achievement.title}
            </h4>
            <div style={{
              fontSize: `${customization.fontSize.small}px`,
              color: '#6b7280',
              marginBottom: '6px'
            }}>
              {achievement.issuer} • {achievement.date}
            </div>
            <p style={{
              ...baseStyles,
              margin: 0,
              lineHeight: '1.5',
              color: '#374151'
            }}>
              {Array.isArray(achievement.description) 
                ? achievement.description.join(' ')
                : achievement.description
              }
            </p>
          </div>
        ))}
      </div>
    );
  };

  // Render custom sections
  const renderCustomSection = (section: any) => {
    if (!section || !section.data) return null;

    return (
      <div key={section.id} style={{ marginBottom: `${customization.spacing.section}px` }}>
        <h2 style={{
          fontSize: `${customization.fontSize.heading}px`,
          fontWeight: 'bold',
          color: '#1e40af',
          marginBottom: `${customization.spacing.item}px`,
          paddingBottom: '8px',
          borderBottom: `2px solid #e5e7eb`,
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ marginRight: '8px' }}>📋</span>
          {section.title}
        </h2>
        
        <div style={{
          padding: `${customization.spacing.item}px`,
          background: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          {typeof section.data.content === 'string' ? (
            <p style={{
              ...baseStyles,
              margin: 0,
              lineHeight: '1.5',
              color: '#374151'
            }}>
              {section.data.content}
            </p>
          ) : Array.isArray(section.data.content) ? (
            <ul style={{
              margin: 0,
              paddingLeft: '20px'
            }}>
              {section.data.content.map((item: string, index: number) => (
                <li key={index} style={{
                  ...baseStyles,
                  marginBottom: '6px',
                  lineHeight: '1.5',
                  color: '#374151'
                }}>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <div style={{
              fontSize: `${customization.fontSize.small}px`,
              color: '#6b7280',
              fontStyle: 'italic'
            }}>
              Content not available
            </div>
          )}
        </div>
      </div>
    );
  };

  // Main render function
  return (
    <div style={{
      ...baseStyles,
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      background: 'white'
    }}>
      {renderHeader()}
      {renderSummary()}
      
      {visibleSections.map(section => {
        switch (section.component) {
          case 'experience':
            return renderExperience();
          case 'education':
            return renderEducation();
          case 'skills':
            return renderSkills();
          case 'projects':
            return renderProjects();
          case 'certifications':
            return renderCertifications();
          case 'achievements':
            return renderAchievements();
          default:
            if (section.id.startsWith('custom-')) {
              return renderCustomSection(section);
            }
            return null;
        }
      })}
    </div>
  );
};

