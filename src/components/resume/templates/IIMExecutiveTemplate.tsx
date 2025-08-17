import React, { useState, useEffect, useMemo } from 'react';
import { ResumeData, SectionOrder, ResumeCustomization } from '../../../types/resume';
import { PageContainer } from '../PageContainer';
import { useSectionPagination } from '../../../hooks/usePagination';

interface IIMExecutiveTemplateProps {
  resumeData: ResumeData;
  customization: ResumeCustomization;
  sectionOrder: SectionOrder[];
}

export const IIMExecutiveTemplate: React.FC<IIMExecutiveTemplateProps> = ({
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

  // Render header component with IIM branding
  const renderHeader = () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      gap: '30px',
      marginBottom: `${customization.spacing.section}px`,
      padding: `${customization.spacing.section}px`,
      background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
      color: 'white',
      borderRadius: '12px',
      alignItems: 'center'
    }}>
      {/* Left Column - Name and Title */}
      <div style={{
        textAlign: 'center' as const,
        padding: '20px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '8px',
        border: '2px solid rgba(255,255,255,0.2)'
      }}>
        <h1 style={{
          fontSize: `${customization.fontSize.name + 6}px`,
          fontWeight: 'bold',
          color: 'white',
          margin: '0 0 10px 0',
          letterSpacing: '2px',
          textTransform: 'uppercase' as const,
          lineHeight: '1.1'
        }}>
          {personalInfo.firstName}
          <br />
          {personalInfo.lastName}
        </h1>
        {personalInfo.jobTitle && (
          <div style={{
            fontSize: `${customization.fontSize.heading}px`,
            color: 'rgba(255,255,255,0.9)',
            fontWeight: '500',
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '20px',
            display: 'inline-block'
          }}>
            {personalInfo.jobTitle}
          </div>
        )}
      </div>
      
      {/* Right Column - Contact Info */}
      <div style={{
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '12px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          {personalInfo.location && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: `${customization.fontSize.body}px`
            }}>
              <span style={{ fontSize: '18px' }}>📍</span>
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: `${customization.fontSize.body}px`
            }}>
              <span style={{ fontSize: '18px' }}>📞</span>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.email && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: `${customization.fontSize.body}px`
            }}>
              <span style={{ fontSize: '18px' }}>✉</span>
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: `${customization.fontSize.body}px`
            }}>
              <span style={{ fontSize: '18px' }}>💼</span>
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
        </div>
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
        background: '#f0fdf4',
        borderRadius: '12px',
        border: '2px solid #10b981',
        position: 'relative' as const
      }}>
        <div style={{
          position: 'absolute' as const,
          top: '-12px',
          left: '20px',
          background: '#10b981',
          color: 'white',
          padding: '4px 16px',
          borderRadius: '20px',
          fontSize: `${customization.fontSize.small}px`,
          fontWeight: 'bold',
          textTransform: 'uppercase' as const,
          letterSpacing: '1px'
        }}>
          Executive Summary
        </div>
        <p style={{
          ...baseStyles,
          margin: '20px 0 0 0',
          lineHeight: '1.7',
          color: '#065f46',
          fontSize: `${customization.fontSize.body + 1}px`
        }}>
          {personalInfo.summary}
        </p>
      </div>
    );
  };

  // Render experience section with executive style
  const renderExperience = () => {
    if (visibleExperience.length === 0) return null;

    return (
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        <h2 style={{
          fontSize: `${customization.fontSize.heading + 2}px`,
          fontWeight: 'bold',
          color: '#059669',
          marginBottom: `${customization.spacing.item}px`,
          paddingBottom: '12px',
          borderBottom: `3px solid #10b981`,
          display: 'flex',
          alignItems: 'center',
          textTransform: 'uppercase' as const,
          letterSpacing: '1px'
        }}>
          <span style={{ marginRight: '12px', fontSize: '24px' }}>💼</span>
          Professional Experience
        </h2>
        
        {visibleExperience.map((exp, index) => (
          <div key={exp.id} style={{
            marginBottom: `${customization.spacing.item + 10}px`,
            padding: `${customization.spacing.item + 10}px`,
            background: index % 2 === 0 ? '#f0fdf4' : 'white',
            borderRadius: '12px',
            border: '2px solid #d1fae5',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '20px',
              marginBottom: '15px'
            }}>
              <div>
                <h3 style={{
                  fontSize: `${customization.fontSize.heading + 2}px`,
                  fontWeight: 'bold',
                  color: '#059669',
                  margin: '0 0 8px 0',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.5px'
                }}>
                  {exp.position}
                </h3>
                <div style={{
                  fontSize: `${customization.fontSize.body + 2}px`,
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  {exp.company}
                </div>
                <div style={{
                  fontSize: `${customization.fontSize.body}px`,
                  color: '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px'
                }}>
                  <span>📍 {exp.location}</span>
                  <span>📅 {exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
              </div>
              
              {/* Company Logo Placeholder */}
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '20px'
              }}>
                {exp.company.charAt(0).toUpperCase()}
              </div>
            </div>
            
            <ul style={{
              margin: '0',
              paddingLeft: '25px'
            }}>
              {exp.description.map((desc, descIndex) => (
                <li key={descIndex} style={{
                  ...baseStyles,
                  marginBottom: '8px',
                  lineHeight: '1.6',
                  color: '#374151',
                  fontSize: `${customization.fontSize.body}px`
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

  // Render education section with IIM emphasis
  const renderEducation = () => {
    if (visibleEducation.length === 0) return null;

    return (
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        <h2 style={{
          fontSize: `${customization.fontSize.heading + 2}px`,
          fontWeight: 'bold',
          color: '#059669',
          marginBottom: `${customization.spacing.item}px`,
          paddingBottom: '12px',
          borderBottom: `3px solid #10b981`,
          display: 'flex',
          alignItems: 'center',
          textTransform: 'uppercase' as const,
          letterSpacing: '1px'
        }}>
          <span style={{ marginRight: '12px', fontSize: '24px' }}>🎓</span>
          Education & Qualifications
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {visibleEducation.map((edu, index) => (
            <div key={edu.id} style={{
              padding: `${customization.spacing.item + 10}px`,
              background: index % 2 === 0 ? '#f0fdf4' : 'white',
              borderRadius: '12px',
              border: '2px solid #d1fae5',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  marginRight: '15px'
                }}>
                  🎓
                </div>
                <div>
                  <h3 style={{
                    fontSize: `${customization.fontSize.heading}px`,
                    fontWeight: 'bold',
                    color: '#059669',
                    margin: '0 0 4px 0'
                  }}>
                    {edu.degree}
                  </h3>
                  <div style={{
                    fontSize: `${customization.fontSize.body}px`,
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>
                    {edu.field}
                  </div>
                </div>
              </div>
              
              <div style={{
                fontSize: `${customization.fontSize.body}px`,
                fontWeight: '600',
                color: '#059669',
                marginBottom: '8px'
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
          ))}
        </div>
      </div>
    );
  };

  // Render skills section with business focus
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
          fontSize: `${customization.fontSize.heading + 2}px`,
          fontWeight: 'bold',
          color: '#059669',
          marginBottom: `${customization.spacing.item}px`,
          paddingBottom: '12px',
          borderBottom: `3px solid #10b981`,
          display: 'flex',
          alignItems: 'center',
          textTransform: 'uppercase' as const,
          letterSpacing: '1px'
        }}>
          <span style={{ marginRight: '12px', fontSize: '24px' }}>⚡</span>
          Core Competencies
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {skillLevels.map(level => {
            const levelSkills = skills.filter(skill => skill.level === level);
            if (levelSkills.length === 0) return null;
            
            return (
              <div key={level} style={{
                padding: `${customization.spacing.item + 10}px`,
                background: '#f0fdf4',
                borderRadius: '12px',
                border: `3px solid ${skillColors[level as keyof typeof skillColors]}`,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <h4 style={{
                  fontSize: `${customization.fontSize.body + 2}px`,
                  fontWeight: 'bold',
                  color: skillColors[level as keyof typeof skillColors],
                  margin: '0 0 12px 0',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '1px',
                  textAlign: 'center' as const,
                  padding: '8px',
                  background: `${skillColors[level as keyof typeof skillColors]}20`,
                  borderRadius: '8px'
                }}>
                  {level}
                </h4>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  justifyContent: 'center'
                }}>
                  {levelSkills.map(skill => (
                    <span key={skill.id} style={{
                      padding: '6px 12px',
                      background: skillColors[level as keyof typeof skillColors],
                      color: 'white',
                      borderRadius: '20px',
                      fontSize: `${customization.fontSize.small}px`,
                      fontWeight: '600',
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.5px'
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
          fontSize: `${customization.fontSize.heading + 2}px`,
          fontWeight: 'bold',
          color: '#059669',
          marginBottom: `${customization.spacing.item}px`,
          paddingBottom: '12px',
          borderBottom: `3px solid #10b981`,
          display: 'flex',
          alignItems: 'center',
          textTransform: 'uppercase' as const,
          letterSpacing: '1px'
        }}>
          <span style={{ marginRight: '12px', fontSize: '24px' }}>🚀</span>
          Key Projects & Initiatives
        </h2>
        
        {visibleProjects.map((project, index) => (
          <div key={project.id} style={{
            marginBottom: `${customization.spacing.item + 10}px`,
            padding: `${customization.spacing.item + 10}px`,
            background: index % 2 === 0 ? '#f0fdf4' : 'white',
            borderRadius: '12px',
            border: '2px solid #d1fae5',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '15px'
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: `${customization.fontSize.heading + 1}px`,
                  fontWeight: 'bold',
                  color: '#059669',
                  margin: '0 0 8px 0',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.5px'
                }}>
                  {project.name || 'Strategic Project'}
                </h3>
                {project.role && (
                  <div style={{
                    fontSize: `${customization.fontSize.body}px`,
                    fontWeight: '600',
                    color: '#10b981',
                    marginBottom: '6px',
                    fontStyle: 'italic'
                  }}>
                    Role: {project.role}
                  </div>
                )}
              </div>
              
              {project.technologies && project.technologies.length > 0 && (
                <div style={{
                  display: 'flex',
                  gap: '6px',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-end'
                }}>
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} style={{
                      padding: '4px 10px',
                      background: '#10b981',
                      color: 'white',
                      borderRadius: '15px',
                      fontSize: '11px',
                      fontWeight: '600',
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.5px'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <p style={{
              ...baseStyles,
              margin: '0 0 12px 0',
              lineHeight: '1.6',
              color: '#374151',
              fontSize: `${customization.fontSize.body}px`
            }}>
              {project.description}
            </p>
            
            {project.highlights && project.highlights.length > 0 && (
              <div style={{
                background: '#f8fafc',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <h4 style={{
                  fontSize: `${customization.fontSize.body}px`,
                  fontWeight: 'bold',
                  color: '#059669',
                  margin: '0 0 10px 0'
                }}>
                  Key Achievements:
                </h4>
                <ul style={{
                  margin: 0,
                  paddingLeft: '20px'
                }}>
                  {project.highlights.map((highlight, highlightIndex) => (
                    <li key={highlightIndex} style={{
                      ...baseStyles,
                      marginBottom: '6px',
                      lineHeight: '1.5',
                      color: '#4b5563',
                      fontSize: `${customization.fontSize.small}px`
                    }}>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
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
          fontSize: `${customization.fontSize.heading + 2}px`,
          fontWeight: 'bold',
          color: '#059669',
          marginBottom: `${customization.spacing.item}px`,
          paddingBottom: '12px',
          borderBottom: `3px solid #10b981`,
          display: 'flex',
          alignItems: 'center',
          textTransform: 'uppercase' as const,
          letterSpacing: '1px'
        }}>
          <span style={{ marginRight: '12px', fontSize: '24px' }}>🏆</span>
          Professional Certifications
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {visibleCertifications.map((cert) => (
            <div key={cert.id} style={{
              padding: `${customization.spacing.item + 10}px`,
              background: '#f0fdf4',
              borderRadius: '12px',
              border: '2px solid #d1fae5',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              textAlign: 'center' as const
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '24px',
                margin: '0 auto 15px auto'
              }}>
                🏆
              </div>
              <h4 style={{
                fontSize: `${customization.fontSize.body + 1}px`,
                fontWeight: 'bold',
                color: '#059669',
                margin: '0 0 8px 0',
                lineHeight: '1.3'
              }}>
                {cert.name}
              </h4>
              <div style={{
                fontSize: `${customization.fontSize.body}px`,
                fontWeight: '600',
                color: '#374151',
                marginBottom: '6px'
              }}>
                {cert.issuer}
              </div>
              <div style={{
                fontSize: `${customization.fontSize.small}px`,
                color: '#10b981',
                fontWeight: '600'
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
          fontSize: `${customization.fontSize.heading + 2}px`,
          fontWeight: 'bold',
          color: '#059669',
          marginBottom: `${customization.spacing.item}px`,
          paddingBottom: '12px',
          borderBottom: `3px solid #10b981`,
          display: 'flex',
          alignItems: 'center',
          textTransform: 'uppercase' as const,
          letterSpacing: '1px'
        }}>
          <span style={{ marginRight: '12px', fontSize: '24px' }}>⭐</span>
          Achievements & Recognition
        </h2>
        
        {visibleAchievements.map((achievement, index) => (
          <div key={achievement.id} style={{
            marginBottom: `${customization.spacing.item}px`,
            padding: `${customization.spacing.item + 10}px`,
            background: index % 2 === 0 ? '#f0fdf4' : 'white',
            borderRadius: '12px',
            border: '2px solid #d1fae5',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '20px',
                marginRight: '15px'
              }}>
                ⭐
              </div>
              <div>
                <h4 style={{
                  fontSize: `${customization.fontSize.heading}px`,
                  fontWeight: 'bold',
                  color: '#059669',
                  margin: '0 0 4px 0'
                }}>
                  {achievement.title}
                </h4>
                <div style={{
                  fontSize: `${customization.fontSize.small}px`,
                  color: '#6b7280',
                  fontWeight: '500'
                }}>
                  {achievement.issuer} • {achievement.date}
                </div>
              </div>
            </div>
            
            <p style={{
              ...baseStyles,
              margin: 0,
              lineHeight: '1.6',
              color: '#374151',
              fontSize: `${customization.fontSize.body}px`
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
          fontSize: `${customization.fontSize.heading + 2}px`,
          fontWeight: 'bold',
          color: '#059669',
          marginBottom: `${customization.spacing.item}px`,
          paddingBottom: '12px',
          borderBottom: `3px solid #10b981`,
          display: 'flex',
          alignItems: 'center',
          textTransform: 'uppercase' as const,
          letterSpacing: '1px'
        }}>
          <span style={{ marginRight: '12px', fontSize: '24px' }}>📋</span>
          {section.title}
        </h2>
        
        <div style={{
          padding: `${customization.spacing.item + 10}px`,
          background: '#f0fdf4',
          borderRadius: '12px',
          border: '2px solid #d1fae5',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          {typeof section.data.content === 'string' ? (
            <p style={{
              ...baseStyles,
              margin: 0,
              lineHeight: '1.6',
              color: '#374151',
              fontSize: `${customization.fontSize.body}px`
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
                  marginBottom: '8px',
                  lineHeight: '1.5',
                  color: '#374151',
                  fontSize: `${customization.fontSize.body}px`
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
      maxWidth: '900px',
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

