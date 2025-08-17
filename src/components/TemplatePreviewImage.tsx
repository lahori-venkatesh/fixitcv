import React from 'react';
import { NITPremiumTemplate } from './resume/templates/NITPremiumTemplate';
import { nitTemplateData } from '../data/nitTemplateData';
import { ResumeCustomization, SectionOrder } from '../types/resume';
import { User, Briefcase, GraduationCap, Star, Plus } from 'lucide-react';

interface TemplatePreviewImageProps {
  templateId: string;
  className?: string;
}

const defaultCustomization: ResumeCustomization = {
  fontFamily: 'Inter',
  fontSize: {
    name: 20,
    heading: 12,
    body: 9,
    small: 7
  },
  fontWeight: {
    name: 700,
    heading: 600,
    body: 400
  },
  lineHeight: {
    heading: 1.0,
    body: 1.1
  },
  colors: {
    primary: '#000000',
    secondary: '#64748B',
    accent: '#10B981',
    text: '#000000',
    textLight: '#6B7280',
    background: '#FFFFFF',
    border: '#E5E7EB'
  },
  spacing: {
    page: 14,
    section: 10,
    item: 6,
    line: 3
  },
  layout: {
    pageWidth: 8.27,
    pageHeight: 11.69,
    columns: 1,
    headerAlignment: 'center',
    contentAlignment: 'left',
    sectionHeadingAlignment: 'left',
    sectionSpacing: 32,
    pageFormat: 'A4',
    orientation: 'portrait',
    maxPages: 3,
    pageBreakBehavior: 'auto',
    showPageNumbers: false,
    pageNumberPosition: 'bottom-center',
    headerOnAllPages: false,
    footerText: ''
  },
  borders: {
    sectionBorder: true,
    sectionBorderWidth: 1,
    sectionBorderStyle: 'solid',
    headerBorder: true,
    headerBorderWidth: 1,
    pageBorder: false,
    pageBorderWidth: 1,
    pageBorderColor: '#E5E7EB'
  },
  shadows: false,
  roundedCorners: 0,
  bulletStyle: 'disc'
};

const defaultSectionOrder: SectionOrder[] = [
  { id: 'personal', title: 'Personal Information', component: 'personal', visible: true, icon: User },
  { id: 'custom-1', title: 'Professional Summary', component: 'custom', visible: true, icon: User, customSectionId: '1' },
  { id: 'experience', title: 'Work Experience', component: 'experience', visible: true, icon: Briefcase },
  { id: 'education', title: 'Education', component: 'education', visible: true, icon: GraduationCap },
  { id: 'custom-2', title: 'Technical Skills', component: 'custom', visible: true, icon: Star, customSectionId: '2' },
  { id: 'custom-3', title: 'Academic Projects', component: 'custom', visible: true, icon: Plus, customSectionId: '3' },
  { id: 'custom-4', title: 'CERTIFICATIONS', component: 'custom', visible: true, icon: Star, customSectionId: '4' },
  { id: 'custom-5', title: 'Achievements', component: 'custom', visible: true, icon: Star, customSectionId: '5' }
];

export const TemplatePreviewImage: React.FC<TemplatePreviewImageProps> = ({ 
  templateId, 
  className = "" 
}) => {
  if (templateId !== 'nit-premium') {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
        <span className="text-gray-500">Preview not available</span>
      </div>
    );
  }

  return (
    <div className={`relative bg-white border border-gray-200 shadow-sm ${className}`} 
         style={{ width: '300px', height: '400px' }}>
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ 
          transform: 'scale(0.38)', 
          transformOrigin: 'top left',
          width: '794px',
          height: '1123px'
        }}
      >
        <div className="bg-white" style={{ width: '794px', minHeight: '1123px' }}>
          <NITPremiumTemplate
            resumeData={nitTemplateData}
            customization={defaultCustomization}
            sectionOrder={defaultSectionOrder}
          />
        </div>
      </div>
      
      {/* Overlay to show it's a preview */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Preview label */}
      <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
        Preview
      </div>
    </div>
  );
};

export default TemplatePreviewImage;