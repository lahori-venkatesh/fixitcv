import React, { useState, useEffect, useMemo } from 'react';
import { ResumeData, SectionOrder, ResumeCustomization } from '../../../types/resume';
import { PageContainer } from '../PageContainer';
import { useSectionPagination } from '../../../hooks/usePagination';

interface IIScResearchTemplateProps {
  resumeData: ResumeData;
  customization: ResumeCustomization;
  sectionOrder: SectionOrder[];
}

export const IIScResearchTemplate: React.FC<IIScResearchTemplateProps> = ({
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

  // Render header component with IISc branding
  const renderHeader = () => (
    <div style={{
      textAlign: 'center' as const,
      marginBottom: `${customization.spacing.section}px`,
      padding: `${customization.spacing.section + 20}px`,
      background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
      color: 'white',
      borderRadius: '16px',
      position: 'relative' as const,
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        pointerEvents: 'none' as const
      }} />
      
      <div style={{
        position: 'relative' as const,
        zIndex: 1
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: `${customization.spacing.item}px`
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '20px',
            border: '3px solid rgba(255,255,255,0.3)'
          }}>
            <span style={{ fontSize: '32px', fontWeight: 'bold' }}>🔬</span>
          </div>
          <div>
            <h1 style={{
              fontSize: `${customization.fontSize.name + 8}px`,
              fontWeight: 'bold',
              color: 'white',
              margin: 0,
              letterSpacing: '3px',
              textTransform: 'uppercase' as const,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {personalInfo.jobTitle && (
              <div style={{
                fontSize: `${customization.fontSize.heading + 2}px`,
                color: 'rgba(255,255,255,0.9)',
                fontWeight: '500',
                marginTop: '8px',
                fontStyle: 'italic'
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
          gap: '25px',
          fontSize: `${customization.fontSize.body}px`,
          color: 'rgba(255,255,255,0.9)',
          marginTop: `${customization.spacing.item}px`
        }}>
          {personalInfo.location && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.3)'
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
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.3)'
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
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.3)'
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
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.3)'
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
        padding: `${customization.spacing.item + 15}px`,
        background: '#faf5ff',
        borderRadius: '16px',
        border: '3px solid #8b5cf6',
        position: 'relative' as const,
        boxShadow: '0 8px 25px -8px rgba(139, 92, 246, 0.3)'
      }}>
        <div style={{
          position: 'absolute' as const,
          top: '-15px',
          left: '25px',
          background: '#8b5cf6',
          color: 'white',
          padding: '6px 20px',
          borderRadius: '25px',
          fontSize: `${customization.fontSize.small}px`,
          fontWeight: 'bold',
          textTransform: 'uppercase' as const,
          letterSpacing: '1px',
          boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)'
        }}>
          Research Profile
        </div>
        <p style={{
          ...baseStyles,
          margin: '25px 0 0 0',
          lineHeight: '1.8',
          color: '#581c87',
          fontSize: `${customization.fontSize.body + 2}px`,
          textAlign: 'justify' as const
        }}>
          {personalInfo.summary}
        </p>
      </div>
    );
  };

  // Render experience section with research focus
  const renderExperience = () => {
    if (visibleExperience.length === 0) return null;

    return (
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        <h2 style={{
          fontSize: `${customization.fontSize.heading + 4}px`,
          fontWeight: 'bold',
          color: '#7c3aed',
          marginBottom: `${customization.spacing.item + 10}px`,
          paddingBottom: '15px',
          borderBottom: `4px solid #a78bfa`,
          display: 'flex',
          alignItems: 'center',
          textTransform: 'uppercase' as const,
          letterSpacing: '2px'
        }}>
          <span style={{ marginRight: '15px', fontSize: '28px' }}>🔬</span>
          Research Experience
        </h2>
        
        {visibleExperience.map((exp, index) => (
          <div key={exp.id} style={{
            marginBottom: `${customization.spacing.item + 15}px`,
            padding: `${customization.spacing.item + 15}px`,
            background: index % 2 === 0 ? '#faf5ff' : 'white',
            borderRadius: '16px',
            border: '2px solid #e9d5ff',
            boxShadow: '0 8px 25px -8px rgba(139, 92, 246, 0.15)',
            position: 'relative' as const
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '25px',
              marginBottom: '20px'
            }}>
              <div>
                <h3 style={{
                  fontSize: `${customization.fontSize.heading + 3}px`,
                  fontWeight: 'bold',
                  color: '#7c3aed',
                  margin: '0 0 10px 0',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '1px'
                }}>
                  {exp.position}
                </h3>
                <div style={{
                  fontSize: `${customization.fontSize.body + 3}px`,
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  {exp.company}
                </div>
                <div style={{
                  fontSize: `${customization.fontSize.body}px`,
                  color: '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '25px'
                }}>
                  <span>📍 {exp.location}</span>
                  <span>📅 {exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
              </div>
              
              {/* Research Lab Icon */}
              <div style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '24px',
                boxShadow: '0 6px 20px rgba(139, 92, 246, 0.4)'
              }}>
                🧪
              </div>
            </div>
            
            <ul style={{
              margin: '0',
              paddingLeft: '30px'
            }}>
              {exp.description.map((desc, descIndex) => (
                <li key={descIndex} style={{
                  ...baseStyles,
                  marginBottom: '10px',
                  lineHeight: '1.7',
                  color: '#374151',
                  fontSize: `${customization.fontSize.body}px`,
                  position: 'relative' as const
                }}>
                  <span style={{
                    position: 'absolute' as const,
                    left: '-20px',
                    color: '#8b5cf6',
                    fontWeight: 'bold'
                  }}>
                    •
                  </span>
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  // Render education section with IISc emphasis
  const renderEducation = () => {
    if (visibleEducation.length === 0) return null;

    return (
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        <h2 style={{
          fontSize: `${customization.fontSize.heading + 4}px`,
          fontWeight: 'bold',
          color: '#7c3aed',
          marginBottom: `${customization.spacing.item + 10}px`,
          paddingBottom: '15px',
          borderBottom: `4px solid #a78bfa`,
          display: 'flex',
          alignItems: 'center',
          textTransform: 'uppercase' as const,
          letterSpacing: '2px'
        }}>
          <span style={{ marginRight: '15px', fontSize: '28px' }}>🎓</span>
          Academic Background
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '25px'
        }}>
          {visibleEducation.map((edu, index) => (
            <div key={edu.id} style={{
              padding: `${customization.spacing.item + 15}px`,
              background: index % 2 === 0 ? '#faf5ff' : 'white',
              borderRadius: '16px',
              border: '3px solid #e9d5ff',
              boxShadow: '0 8px 25px -8px rgba(139, 92, 246, 0.15)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '22px',
                  marginRight: '20px',
                  boxShadow: '0 6px 20px rgba(139, 92, 246, 0.4)'
                }}>
                  🎓
                </div>
                <div>
                  <h3 style={{
                    fontSize: `${customization.fontSize.heading + 1}px`,
                    fontWeight: 'bold',
                    color: '#7c3aed',
                    margin: '0 0 6px 0',
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.5px'
                  }}>
                    {edu.degree}
                  </h3>
                  <div style={{
                    fontSize: `${customization.fontSize.body + 1}px`,
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>
                    {edu.field}
                  </div>
                </div>
              </div>
              
              <div style={{
                fontSize: `${customization.fontSize.body + 1}px`,
                fontWeight: '600',
                color: '#7c3aed',
                marginBottom: '10px',
                padding: '8px 16px',
                background: '#f3e8ff',
                borderRadius: '8px',
                textAlign: 'center' as const
              }}>
                {edu.institution}
              </div>
              
              <div style={{
                fontSize: `${customization.fontSize.small}px`,
                color: '#6b7280',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                justifyContent: 'center' as const
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

  // Render skills section with research focus
  const renderSkills = () => {
    if (skills.length === 0) return null;

    const skillLevels = ['Expert', 'Advanced', 'Intermediate', 'Beginner'];
    const skillColors = {
      'Expert': '#7c3aed',
      'Advanced': '#0891b2',
      'Intermediate': '#059669',
      'Beginner': '#dc2626'
    };

    return (
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        <h2 style={{
          fontSize: `${customization.fontSize.heading + 4}px`,
          fontWeight: 'bold',
          color: '#7c3aed',
          marginBottom: `${customization.spacing.item + 10}px`,
          paddingBottom: '15px',
          borderBottom: `4px solid #a78bfa`,
          display: 'flex',
          alignItems: 'center',
          textTransform: 'uppercase' as const,
          letterSpacing: '2px'
        }}>
          <span style={{ marginRight: '15px', fontSize: '28px' }}>⚡</span>
          Research Skills & Expertise
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '25px'
        }}>
          {skillLevels.map(level => {
            const levelSkills = skills.filter(skill => skill.level === level);
            if (levelSkills.length === 0) return null;
            
            return (
              <div key={level} style={{
                padding: `${customization.spacing.item + 15}px`,
                background: '#faf5ff',
                borderRadius: '16px',
                border: `3px solid ${skillColors[level as keyof typeof skillColors]}`,
                boxShadow: '0 8px 25px -8px rgba(139, 92, 246, 0.15)'
              }}>
                <h4 style={{
                  fontSize: `${customization.fontSize.body + 3}px`,
                  fontWeight: 'bold',
                  color: skillColors[level as keyof typeof skillColors],
                  margin: '0 0 15px 0',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '1px',
                  textAlign: 'center' as const,
                  padding: '10px',
                  background: `${skillColors[level as keyof typeof skillColors]}15`,
                  borderRadius: '10px'
                }}>
                  {level}
                </h4>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  justifyContent: 'center'
                }}>
                  {levelSkills.map(skill => (
                    <span key={skill.id} style={{
                      padding: '8px 16px',
                      background: skillColors[level as keyof typeof skillColors],
                      color: 'white',
                      borderRadius: '25px',
                      fontSize: `${customization.fontSize.small}px`,
                      fontWeight: '600',
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.5px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
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

  // Render projects section with research focus
  const renderProjects = () => {
    if (visibleProjects.length === 0) return null;

    return (
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        <h2 style={{
          fontSize: `${customization.fontSize.heading + 4}px`,
          fontWeight: 'bold',
          color: '#7c3aed',
          marginBottom: `${customization.spacing.item + 10}px`,
          paddingBottom: '15px',
          borderBottom: `4px solid #a78bfa`,
          display: 'flex',
          alignItems: 'center',
          textTransform: 'uppercase' as const,
          letterSpacing: '2px'
        }}>
          <span style={{ marginRight: '15px', fontSize: '28px' }}>🚀</span>
          Research Projects & Publications
        </h2>
        
        {visibleProjects.map((project, index) => (
          <div key={project.id} style={{
            marginBottom: `${customization.spacing.item + 15}px`,
            padding: `${customization.spacing.item + 15}px`,
            background: index % 2 === 0 ? '#faf5ff' : 'white',
            borderRadius: '16px',
            border: '3px solid #e9d5ff',
            boxShadow: '0 8px 25px -8px rgba(139, 92, 246, 0.15)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '20px'
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: `${customization.fontSize.heading + 2}px`,
                  fontWeight: 'bold',
                  color: '#7c3aed',
                  margin: '0 0 10px 0',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.5px'
                }}>
                  {project.name || 'Research Project'}
                </h3>
                {project.role && (
                  <div style={{
                    fontSize: `${customization.fontSize.body}px`,
                    fontWeight: '600',
                    color: '#8b5cf6',
                    marginBottom: '8px',
                    fontStyle: 'italic',
                    padding: '6px 12px',
                    background: '#f3e8ff',
                    borderRadius: '8px',
                    display: 'inline-block'
                  }}>
                    Role: {project.role}
                  </div>
                )}
              </div>
              
              {project.technologies && project.technologies.length > 0 && (
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-end'
                }}>
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} style={{
                      padding: '6px 12px',
                      background: '#8b5cf6',
                      color: 'white',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: '600',
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.5px',
                      boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <p style={{
              ...baseStyles,
              margin: '0 0 15px 0',
              lineHeight: '1.7',
              color: '#374151',
              fontSize: `${customization.fontSize.body}px`,
              textAlign: 'justify' as const
            }}>
              {project.description}
            </p>
            
            {project.highlights && project.highlights.length > 0 && (
              <div style={{
                background: '#f8fafc',
                padding: '20px',
                borderRadius: '12px',
                border: '2px solid #e5e7eb'
              }}>
                <h4 style={{
                  fontSize: `${customization.fontSize.body + 1}px`,
                  fontWeight: 'bold',
                  color: '#7c3aed',
                  margin: '0 0 12px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '18px' }}>🔬</span>
                  Key Research Outcomes:
                </h4>
                <ul style={{
                  margin: 0,
                  paddingLeft: '25px'
                }}>
                  {project.highlights.map((highlight, highlightIndex) => (
                    <li key={highlightIndex} style={{
                      ...baseStyles,
                      marginBottom: '8px',
                      lineHeight: '1.6',
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
          fontSize: `${customization.fontSize.heading + 4}px`,
          fontWeight: 'bold',
          color: '#7c3aed',
          marginBottom: `${customization.spacing.item + 10}px`,
          paddingBottom: '15px',
          borderBottom: `4px solid #a78bfa`,
          display: 'flex',
          alignItems: 'center',
          textTransform: 'uppercase' as const,
          letterSpacing: '2px'
        }}>
          <span style={{ marginRight: '15px', fontSize: '28px' }}>🏆</span>
          Professional Certifications
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '25px'
        }}>
          {visibleCertifications.map((cert) => (
            <div key={cert.id} style={{
              padding: `${customization.spacing.item + 15}px`,
              background: '#faf5ff',
              borderRadius: '16px',
              border: '3px solid #e9d5ff',
              boxShadow: '0 8px 25px -8px rgba(139, 92, 246, 0.15)',
              textAlign: 'center' as const
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '28px',
                margin: '0 auto 20px auto',
                boxShadow: '0 6px 20px rgba(139, 92, 246, 0.4)'
              }}>
                🏆
              </div>
              <h4 style={{
                fontSize: `${customization.fontSize.body + 2}px`,
                fontWeight: 'bold',
                color: '#7c3aed',
                margin: '0 0 10px 0',
                lineHeight: '1.3'
              }}>
                {cert.name}
              </h4>
              <div style={{
                fontSize: `${customization.fontSize.body}px`,
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                {cert.issuer}
              </div>
              <div style={{
                fontSize: `${customization.fontSize.small}px`,
                color: '#8b5cf6',
                fontWeight: '600',
                padding: '6px 12px',
                background: '#f3e8ff',
                borderRadius: '8px',
                display: 'inline-block'
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
          fontSize: `${customization.fontSize.heading + 4}px`,
          fontWeight: 'bold',
          color: '#7c3aed',
          marginBottom: `${customization.spacing.item + 10}px`,
          paddingBottom: '15px',
          borderBottom: `4px solid #a78bfa`,
          display: 'flex',
          alignItems: 'center',
          textTransform: 'uppercase' as const,
          letterSpacing: '2px'
        }}>
          <span style={{ marginRight: '15px', fontSize: '28px' }}>⭐</span>
          Awards & Recognition
        </h2>
        
        {visibleAchievements.map((achievement, index) => (
          <div key={achievement.id} style={{
            marginBottom: `${customization.spacing.item}px`,
            padding: `${customization.spacing.item + 15}px`,
            background: index % 2 === 0 ? '#faf5ff' : 'white',
            borderRadius: '16px',
            border: '3px solid #e9d5ff',
            boxShadow: '0 8px 25px -8px rgba(139, 92, 246, 0.15)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '15px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '24px',
                marginRight: '20px',
                boxShadow: '0 6px 20px rgba(251, 191, 36, 0.4)'
              }}>
                ⭐
              </div>
              <div>
                <h4 style={{
                  fontSize: `${customization.fontSize.heading + 1}px`,
                  fontWeight: 'bold',
                  color: '#7c3aed',
                  margin: '0 0 6px 0'
                }}>
                  {achievement.title}
                </h4>
                <div style={{
                  fontSize: `${customization.fontSize.small}px`,
                  color: '#6b7280',
                  fontWeight: '500',
                  padding: '4px 12px',
                  background: '#f3e8ff',
                  borderRadius: '8px',
                  display: 'inline-block'
                }}>
                  {achievement.issuer} • {achievement.date}
                </div>
              </div>
            </div>
            
            <p style={{
              ...baseStyles,
              margin: 0,
              lineHeight: '1.7',
              color: '#374151',
              fontSize: `${customization.fontSize.body}px`,
              textAlign: 'justify' as const
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
          fontSize: `${customization.fontSize.heading + 4}px`,
          fontWeight: 'bold',
          color: '#7c3aed',
          marginBottom: `${customization.spacing.item + 10}px`,
          paddingBottom: '15px',
          borderBottom: `4px solid #a78bfa`,
          display: 'flex',
          alignItems: 'center',
          textTransform: 'uppercase' as const,
          letterSpacing: '2px'
        }}>
          <span style={{ marginRight: '15px', fontSize: '28px' }}>📋</span>
          {section.title}
        </h2>
        
        <div style={{
          padding: `${customization.spacing.item + 15}px`,
          background: '#faf5ff',
          borderRadius: '16px',
          border: '3px solid #e9d5ff',
          boxShadow: '0 8px 25px -8px rgba(139, 92, 246, 0.15)'
        }}>
          {typeof section.data.content === 'string' ? (
            <p style={{
              ...baseStyles,
              margin: 0,
              lineHeight: '1.7',
              color: '#374151',
              fontSize: `${customization.fontSize.body}px`,
              textAlign: 'justify' as const
            }}>
              {section.data.content}
            </p>
          ) : Array.isArray(section.data.content) ? (
            <ul style={{
              margin: 0,
              paddingLeft: '25px'
            }}>
              {section.data.content.map((item: string, index: number) => (
                <li key={index} style={{
                  ...baseStyles,
                  marginBottom: '10px',
                  lineHeight: '1.6',
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

