import React from 'react';
import { PersonalInfo, ResumeCustomization } from '../../../types/resume';
import { getLinkIcon } from '../utils/iconHelpers';

interface PersonalInfoSectionProps {
  personalInfo: PersonalInfo;
  customization: ResumeCustomization;
  template?: string;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  personalInfo,
  customization,
  template
}) => {
  const isHarvardTemplate = template === 'harvard-classic';
  
  // Check if we have any contact information to display
  const hasContactInfo = personalInfo.email || personalInfo.phone || personalInfo.location || 
                        personalInfo.website || personalInfo.linkedin || personalInfo.github ||
                        (personalInfo.customLinks && personalInfo.customLinks.length > 0);
  
  // Check if we have additional personal information
  const hasAdditionalInfo = personalInfo.dateOfBirth || personalInfo.nationality || 
                           personalInfo.passportOrId || personalInfo.maritalStatus || 
                           personalInfo.militaryService || personalInfo.drivingLicense || 
                           personalInfo.gender || personalInfo.visa;
  
  const getNameStyles = () => {
    if (isHarvardTemplate) {
      return {
        fontSize: `${customization.fontSize.name}px`,
        fontWeight: customization.fontWeight.name,
        lineHeight: customization.lineHeight.heading,
        color: customization.colors.text || '#000000',
        marginBottom: `${customization.spacing.line}px`,
        textAlign: customization.layout.headerAlignment as const,
        border: 'none',
        textDecoration: 'none'
      };
    }

    return {
      fontSize: `${customization.fontSize.name}px`,
      fontWeight: customization.fontWeight.name,
      lineHeight: customization.lineHeight.heading,
      color: customization.colors.primary,
      marginBottom: `${customization.spacing.line}px`,
      textAlign: customization.layout.headerAlignment as const,
      border: 'none',
      textDecoration: 'none'
    };
  };

  const getJobTitleStyles = () => {
    if (isHarvardTemplate) {
      return {
        fontSize: `${customization.fontSize.heading}px`,
        fontWeight: customization.fontWeight.heading,
        lineHeight: customization.lineHeight.heading,
        color: customization.colors.secondary || '#333333',
        marginBottom: `${customization.spacing.section / 2}px`,
        textAlign: customization.layout.headerAlignment as const,
        border: 'none',
        textDecoration: 'none'
      };
    }

    return {
      fontSize: `${customization.fontSize.heading}px`,
      fontWeight: customization.fontWeight.heading,
      lineHeight: customization.lineHeight.heading,
      color: customization.colors.secondary,
      marginBottom: `${customization.spacing.section}px`,
      textAlign: customization.layout.headerAlignment as const,
      border: 'none',
      textDecoration: 'none'
    };
  };

  const getContactStyles = () => {
    if (isHarvardTemplate) {
      return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap' as const,
        gap: `${customization.spacing.line * 2}px`,
        fontSize: `${customization.fontSize.body}px`,
        color: customization.colors.text || '#333333',
        marginBottom: `${customization.spacing.section}px`,
        border: 'none',
        textDecoration: 'none'
      };
    }

    return {
      display: 'flex',
      justifyContent: customization.layout.headerAlignment === 'left' ? 'flex-start' : 
                     customization.layout.headerAlignment === 'right' ? 'flex-end' : 'center',
      alignItems: 'center',
      flexWrap: 'wrap' as const,
      gap: `${customization.spacing.line}px`,
      fontSize: `${customization.fontSize.body}px`,
      color: customization.colors.text,
      marginBottom: `${customization.spacing.section}px`,
      border: 'none',
      textDecoration: 'none'
    };
  };

  const getAdditionalInfoStyles = () => {
    if (isHarvardTemplate) {
      return {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: `${customization.spacing.line}px`,
        fontSize: `${customization.fontSize.small}px`,
        color: customization.colors.textLight || '#555555',
        marginBottom: `${customization.spacing.section / 2}px`,
        padding: `${customization.spacing.item}px`,
        backgroundColor: `${customization.colors.primary}05`,
        borderRadius: `${customization.roundedCorners}px`,
        border: `1px solid ${customization.colors.primary}20`
      };
    }

    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: `${customization.spacing.line}px`,
      fontSize: `${customization.fontSize.small}px`,
      color: customization.colors.textLight,
      marginBottom: `${customization.spacing.section}px`,
      padding: `${customization.spacing.item}px`,
      backgroundColor: `${customization.colors.primary}05`,
      borderRadius: `${customization.roundedCorners}px`,
      border: `1px solid ${customization.colors.primary}20`
    };
  };

  const getContactItemStyles = () => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: 'none',
    textDecoration: 'none',
    outline: 'none',
    boxShadow: 'none',
    cursor: 'pointer'
  });

  const iconSize = isHarvardTemplate ? '14px' : '16px';
  const iconColor = isHarvardTemplate ? customization.colors.text || '#333333' : customization.colors.primary;

  // Professional Email Icon (simple symbol for better PDF rendering)
  const EmailIcon = () => (
    <span style={{ 
      fontSize: iconSize, 
      color: iconColor, 
      marginRight: '4px',
      fontWeight: 'normal'
    }}>
      ✉
    </span>
  );

  // Professional Phone Icon (simple symbol for better PDF rendering)
  const PhoneIcon = () => (
    <span style={{ 
      fontSize: iconSize, 
      color: iconColor, 
      marginRight: '4px',
      fontWeight: 'normal'
    }}>
      📞
    </span>
  );

  // Professional Location Icon (simple symbol for better PDF rendering)
  const LocationIcon = () => (
    <span style={{ 
      fontSize: iconSize, 
      color: iconColor, 
      marginRight: '4px',
      fontWeight: 'normal'
    }}>
      📍
    </span>
  );

  // Professional Website Icon (simple symbol for better PDF rendering)
  const WebsiteIcon = () => (
    <span style={{ 
      fontSize: iconSize, 
      color: iconColor, 
      marginRight: '4px',
      fontWeight: 'normal'
    }}>
      🌐
    </span>
  );

  // Professional LinkedIn Icon (simple symbol for better PDF rendering)
  const LinkedInIcon = () => (
    <span style={{ 
      fontSize: iconSize, 
      color: iconColor, 
      marginRight: '4px',
      fontWeight: 'normal'
    }}>
      💼
    </span>
  );

  // Professional GitHub Icon (simple symbol for better PDF rendering)
  const GitHubIcon = () => (
    <span style={{ 
      fontSize: iconSize, 
      color: iconColor, 
      marginRight: '4px',
      fontWeight: 'normal'
    }}>
      💻
    </span>
  );

  const handleLinkClick = (url: string) => {
    if (!url) return;
    
    let fullUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      fullUrl = `https://${url}`;
    }
    
    window.open(fullUrl, '_blank', 'noopener,noreferrer');
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateStr; // Return original if parsing fails
    }
  };

  // Don't render anything if no personal info exists
  if (!personalInfo.firstName && !personalInfo.lastName && !personalInfo.jobTitle && !hasContactInfo && !personalInfo.summary && !hasAdditionalInfo) {
    return null;
  }

  return (
    <div style={{
      marginBottom: `${customization.spacing.section}px`,
      textAlign: customization.layout.headerAlignment as any,
      border: 'none',
      borderBottom: 'none',
      paddingBottom: (hasContactInfo || hasAdditionalInfo) ? `${customization.spacing.line}px` : '0'
    }}>
      {/* Name - only show if we have a name */}
      {(personalInfo.firstName || personalInfo.lastName) && (
        <h1 style={getNameStyles()}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
      )}

      {/* Job Title - only show if exists */}
      {personalInfo.jobTitle && (
        <h2 style={getJobTitleStyles()}>
          {personalInfo.jobTitle}
        </h2>
      )}

      {/* Contact Information - only show if we have contact info */}
      {hasContactInfo && (
        <div style={getContactStyles()}>
          {personalInfo.email && (
            <div style={getContactItemStyles()}>
              <EmailIcon />
              <span style={{ border: 'none', textDecoration: 'none' }}>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div style={getContactItemStyles()}>
              <PhoneIcon />
              <span style={{ border: 'none', textDecoration: 'none' }}>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div style={getContactItemStyles()}>
              <LocationIcon />
              <span style={{ border: 'none', textDecoration: 'none' }}>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div style={getContactItemStyles()}>
              <WebsiteIcon />
              <span style={{ border: 'none', textDecoration: 'none' }}>{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div style={getContactItemStyles()}>
              <LinkedInIcon />
              <span style={{ border: 'none', textDecoration: 'none' }}>LinkedIn</span>
            </div>
          )}
          {personalInfo.github && (
            <div style={getContactItemStyles()}>
              <GitHubIcon />
              <span style={{ border: 'none', textDecoration: 'none' }}>GitHub</span>
            </div>
          )}
          {/* Custom Links */}
          {personalInfo.customLinks && personalInfo.customLinks.map((link) => {
            return (
              <div key={link.id} style={getContactItemStyles()}>
                <span style={{ 
                  fontSize: iconSize, 
                  color: iconColor, 
                  marginRight: '4px',
                  fontWeight: 'normal'
                }}>
                  🔗
                </span>
                <span style={{ border: 'none', textDecoration: 'none' }}>{link.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Additional Personal Information - only show if we have additional info */}
      {hasAdditionalInfo && (
        <div style={getAdditionalInfoStyles()}>
          {personalInfo.dateOfBirth && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong>Date of Birth:</strong>
              <span>{formatDate(personalInfo.dateOfBirth)}</span>
            </div>
          )}
          {personalInfo.nationality && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong>Nationality:</strong>
              <span>{personalInfo.nationality}</span>
            </div>
          )}
          {personalInfo.passportOrId && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong>Passport/ID:</strong>
              <span>{personalInfo.passportOrId}</span>
            </div>
          )}
          {personalInfo.maritalStatus && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong>Marital Status:</strong>
              <span>{personalInfo.maritalStatus}</span>
            </div>
          )}
          {personalInfo.militaryService && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong>Military Service:</strong>
              <span>{personalInfo.militaryService}</span>
            </div>
          )}
          {personalInfo.drivingLicense && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong>Driving License:</strong>
              <span>{personalInfo.drivingLicense}</span>
            </div>
          )}
          {personalInfo.gender && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong>Gender/Pronoun:</strong>
              <span>{personalInfo.gender}</span>
            </div>
          )}
          {personalInfo.visa && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong>Visa Status:</strong>
              <span>{personalInfo.visa}</span>
            </div>
          )}
        </div>
      )}

      {/* Summary - only show if exists and not Harvard template */}
      {personalInfo.summary && !isHarvardTemplate && (
        <div style={{
          fontSize: `${customization.fontSize.body}px`,
          lineHeight: customization.lineHeight.body,
          color: customization.colors.text,
          textAlign: customization.layout.contentAlignment as any,
          marginTop: `${customization.spacing.line}px`,
          border: 'none',
          textDecoration: 'none'
        }}>
          {personalInfo.summary}
        </div>
      )}
    </div>
  );
};