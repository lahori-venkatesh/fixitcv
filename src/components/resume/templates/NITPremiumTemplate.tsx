import React, { useState, useEffect, useMemo } from 'react';
import { ResumeData, SectionOrder, ResumeCustomization } from '../../../types/resume';
import { PageContainer } from '../PageContainer';
import { useSectionPagination } from '../../../hooks/usePagination';

interface NITPremiumTemplateProps {
  resumeData: ResumeData;
  customization: ResumeCustomization;
  sectionOrder: SectionOrder[];
}

export const NITPremiumTemplate: React.FC<NITPremiumTemplateProps> = ({
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

  // Render header component
  const renderHeader = () => (
    <div style={{
      textAlign: 'center' as const,
      marginBottom: `${customization.spacing.section}px`,
      paddingBottom: `${customization.spacing.item}px`,
      borderBottom: customization.borders.headerBorder ? `${customization.borders.headerBorderWidth}px ${customization.borders.sectionBorderStyle} ${customization.colors.border}` : 'none'
    }}>
      <h1 style={{
        fontSize: `${customization.fontSize.name}px`,
        fontWeight: customization.fontWeight.name,
        color: customization.colors.text,
        marginBottom: `${customization.spacing.line}px`,
        letterSpacing: '1px',
        margin: 0
      }}>
        {personalInfo.firstName} {personalInfo.lastName}
      </h1>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap' as const,
        gap: '15px',
        fontSize: `${customization.fontSize.small}px`,
        color: customization.colors.textLight,
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

  // Render individual sections
  const renderSection = (section: any) => {
    const sectionHeaderStyle = {
      fontSize: `${customization.fontSize.heading}px`,
      fontWeight: customization.fontWeight.heading,
      color: customization.colors.text,
      marginTop: `${customization.spacing.section}px`,
      marginBottom: `${customization.spacing.item}px`,
      textTransform: 'uppercase' as const,
      letterSpacing: '1px',
      borderBottom: customization.borders.sectionBorder ? `${customization.borders.sectionBorderWidth}px ${customization.borders.sectionBorderStyle} ${customization.colors.text}` : 'none',
      paddingBottom: customization.borders.sectionBorder ? `${customization.spacing.line}px` : '0'
    };

    switch (section.component) {
      case 'personal':
        if (!personalInfo.summary) return null;
        return (
          <div key={section.id}>
            <h2 style={sectionHeaderStyle}>PROFESSIONAL SUMMARY</h2>
            <p style={{ 
              marginBottom: `${customization.spacing.item}px`,
              textAlign: 'justify' as const,
              lineHeight: customization.lineHeight.body
            }}>
              {personalInfo.summary}
            </p>
          </div>
        );

      case 'experience':
        if (!section.data || section.data.length === 0) return null;
        return (
          <div key={section.id}>
            <h2 style={sectionHeaderStyle}>PROFESSIONAL EXPERIENCE</h2>
            {section.data.map((exp: any, index: number) => (
              <div key={exp.id || index} style={{ marginBottom: `${customization.spacing.item}px` }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: `${customization.spacing.line}px`
                }}>
                  <div>
                    <strong>{exp.position} - {exp.company}</strong>
                  </div>
                  <div style={{ fontSize: `${customization.fontSize.small}px`, color: customization.colors.textLight }}>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <ul style={{ marginLeft: '20px', paddingLeft: '0' }}>
                  {exp.description.map((desc: string, descIndex: number) => (
                    <li key={descIndex} style={{ 
                      marginBottom: `${customization.spacing.line / 2}px`,
                      textAlign: 'justify' as const
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
        if (!section.data || section.data.length === 0) return null;
        return (
          <div key={section.id}>
            <h2 style={sectionHeaderStyle}>EDUCATION</h2>
            {section.data.map((edu: any, index: number) => (
              <div key={edu.id || index} style={{ marginBottom: `${customization.spacing.item}px` }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: `${customization.spacing.line}px`
                }}>
                  <div>
                    <strong>{edu.institution}</strong>, <em>{edu.degree} in {edu.field}</em>
                  </div>
                  <div style={{ fontSize: `${customization.fontSize.small}px`, color: customization.colors.textLight }}>
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'skills':
        if (!section.data || section.data.length === 0) return null;
        return (
          <div key={section.id}>
            <h2 style={sectionHeaderStyle}>TECHNICAL SKILLS</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: `${customization.spacing.item}px` }}>
              {section.data.map((skill: any, index: number) => (
                <div key={skill.id || index} style={{ marginBottom: `${customization.spacing.line}px` }}>
                  <strong>{skill.name}</strong>: {skill.level}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        // Handle custom sections
        if (section.id.startsWith('custom-') && section.data) {
          const customSection = section.data;
          return (
            <div key={section.id}>
              <h2 style={sectionHeaderStyle}>{customSection.title.toUpperCase()}</h2>
              {customSection.type === 'text' && (
                <p style={{ 
                  marginBottom: `${customization.spacing.item}px`,
                  textAlign: 'justify' as const,
                  lineHeight: customization.lineHeight.body
                }}>
                  {customSection.content}
                </p>
              )}
              {customSection.type === 'list' && Array.isArray(customSection.content) && (
                <div>
                  {customSection.content.map((item: any, index: number) => {
                    if (typeof item === 'string') {
                      return (
                        <div key={index} style={{ marginBottom: `${customization.spacing.line}px` }}>
                          {item}
                        </div>
                      );
                    } else if (item.category && item.skills) {
                      // Technical skills format
                      return (
                        <div key={index} style={{ marginBottom: `${customization.spacing.line}px` }}>
                          <strong>{item.category}</strong>: {item.skills}
                        </div>
                      );
                    } else if (item.name && item.description) {
                      // Project format
                      return (
                        <div key={index} style={{ marginBottom: `${customization.spacing.item}px` }}>
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'flex-start',
                            marginBottom: `${customization.spacing.line}px`
                          }}>
                            <div>
                              <strong>{item.name}</strong>
                              {item.url && (
                                <span style={{ fontSize: `${customization.fontSize.small}px`, color: customization.colors.textLight }}>
                                  {' | '}{item.url}
                                </span>
                              )}
                            </div>
                            {item.startDate && (
                              <div style={{ fontSize: `${customization.fontSize.small}px`, color: customization.colors.textLight }}>
                                {item.startDate} - {item.endDate}
                              </div>
                            )}
                          </div>
                          {Array.isArray(item.description) && (
                            <ul style={{ marginLeft: '20px', paddingLeft: '0' }}>
                              {item.description.map((desc: string, descIndex: number) => (
                                <li key={descIndex} style={{ 
                                  marginBottom: `${customization.spacing.line / 2}px`,
                                  textAlign: 'justify' as const
                                }}>
                                  {desc}
                                </li>
                              ))}
                            </ul>
                          )}
                          {item.technologies && (
                            <div style={{ 
                              fontSize: `${customization.fontSize.small}px`, 
                              color: customization.colors.textLight,
                              marginTop: `${customization.spacing.line / 2}px`
                            }}>
                              <strong>Technologies:</strong> {item.technologies.join(', ')}
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
              {customSection.type === 'achievements' && Array.isArray(customSection.content) && (
                <div>
                  {customSection.content.map((achievement: any, index: number) => (
                    <div key={index} style={{ marginBottom: `${customization.spacing.item}px` }}>
                      <div style={{ marginBottom: `${customization.spacing.line}px` }}>
                        <strong>{achievement.title}</strong>
                        {achievement.issuer && (
                          <span style={{ fontSize: `${customization.fontSize.small}px`, color: customization.colors.textLight }}>
                            {' | '}{achievement.issuer}
                          </span>
                        )}
                      </div>
                      <p style={{ 
                        marginBottom: `${customization.spacing.line}px`,
                        textAlign: 'justify' as const
                      }}>
                        {achievement.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        }
        return null;
    }
  };

  // Render pages using the new pagination system
  const renderPages = () => {
    if (sectionPages.length === 0) {
      return (
        <PageContainer
          pageNumber={1}
          showPageNumbers={customization.layout.showPageNumbers}
          customization={customization}
        >
          <div style={baseStyles}>
            {renderHeader()}
          </div>
        </PageContainer>
      );
    }

    return sectionPages.map((pageSections, pageIndex) => (
      <PageContainer
        key={pageIndex}
        pageNumber={pageIndex + 1}
        showPageNumbers={customization.layout.showPageNumbers}
        customization={customization}
      >
        <div style={baseStyles}>
          {/* Header only on first page */}
          {pageIndex === 0 && renderHeader()}
          
          {/* Render sections for this page */}
          {pageSections.map((section, sectionIndex) => (
            <div key={`${pageIndex}-${sectionIndex}`}>
              {renderSection(section)}
            </div>
          ))}
        </div>
      </PageContainer>
    ));
  };

  return (
    <div className="space-y-0">
      {renderPages()}
    </div>
  );
};