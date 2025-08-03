import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ResumeData {
  personalInfo: any;
  experience: any[];
  education: any[];
  skills: any[];
  customSections: any[];
  projects?: any[];
  certifications?: any[];
  achievements?: any[];
}

interface ResumeCustomization {
  fontFamily: string;
  fontSize: {
    name: number;
    heading: number;
    body: number;
    small: number;
  };
  fontWeight: {
    name: number;
    heading: number;
    body: number;
  };
  lineHeight: {
    heading: number;
    body: number;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textLight: string;
    background: string;
    border: string;
  };
  spacing: {
    page: number;
    section: number;
    item: number;
    line: number;
  };
  layout: {
    pageWidth: number;
    pageHeight: number;
    headerAlignment: string;
    contentAlignment: string;
    sectionHeadingAlignment: string;
    pageFormat: string;
    orientation: string;
    showPageNumbers: boolean;
    pageNumberPosition: string;
    headerOnAllPages: boolean;
    footerText: string;
  };
  borders: {
    sectionBorder: boolean;
    sectionBorderWidth: number;
    sectionBorderStyle: string;
    headerBorder: boolean;
    headerBorderWidth: number;
    pageBorder: boolean;
    pageBorderWidth: number;
    pageBorderColor: string;
  };
  bulletStyle: string;
  shadows: boolean;
  roundedCorners: number;
}

interface SectionOrder {
  id: string;
  title: string;
  component: string;
  visible: boolean;
  customSectionId?: string;
}

const generateHighQualityHTML = (
  resumeData: ResumeData,
  customization: ResumeCustomization,
  sectionOrder: SectionOrder[],
  selectedTemplate: string = 'default'
): string => {
  const { personalInfo, experience, education, skills, customSections } = resumeData;
  const isHarvardTemplate = selectedTemplate === 'harvard-classic';

  // Helper functions
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr + '-01');
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const getBulletSymbol = () => {
    switch (customization.bulletStyle) {
      case 'circle': return '○';
      case 'square': return '■';
      case 'dash': return '–';
      case 'arrow': return '→';
      case 'diamond': return '◆';
      default: return '•';
    }
  };

  const renderFormattedText = (text: string) => {
    if (!text) return text;
    // Process links: [text](url) -> <a href="url">text</a>
    text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" style="color: ' + customization.colors.primary + '; text-decoration: underline;" target="_blank">$1</a>');
    // Process bold: [[bold]]text[[/bold]] -> <b>text</b>
    text = text.replace(/\[\[bold\]\](.*?)\[\[\/bold\]\]/g, '<strong>$1</strong>');
    return text;
  };

  // Generate personal info section
  const generatePersonalInfo = () => {
    if (!personalInfo.firstName && !personalInfo.lastName && !personalInfo.email) return '';

    const contactItems = [];
    if (personalInfo.email) contactItems.push(`<span style="display: flex; align-items: center; gap: 4px;"><span style="font-size: 14px;">✉</span> ${personalInfo.email}</span>`);
    if (personalInfo.phone) contactItems.push(`<span style="display: flex; align-items: center; gap: 4px;"><span style="font-size: 14px;">📞</span> ${personalInfo.phone}</span>`);
    if (personalInfo.location) contactItems.push(`<span style="display: flex; align-items: center; gap: 4px;"><span style="font-size: 14px;">📍</span> ${personalInfo.location}</span>`);
    if (personalInfo.website) contactItems.push(`<span style="display: flex; align-items: center; gap: 4px;"><span style="font-size: 14px;">🌐</span> ${personalInfo.website}</span>`);
    if (personalInfo.linkedin) contactItems.push(`<span style="display: flex; align-items: center; gap: 4px;"><span style="font-size: 14px;">💼</span> LinkedIn</span>`);
    if (personalInfo.github) contactItems.push(`<span style="display: flex; align-items: center; gap: 4px;"><span style="font-size: 14px;">💻</span> GitHub</span>`);

    // Add custom links
    if (personalInfo.customLinks && Array.isArray(personalInfo.customLinks)) {
      personalInfo.customLinks.forEach(link => {
        if (link.label && link.url) {
          contactItems.push(`<span style="display: flex; align-items: center; gap: 4px;"><span style="font-size: 14px;">🔗</span> ${link.label}</span>`);
        }
      });
    }
    return `
      <div class="header" style="
        text-align: ${customization.layout.headerAlignment}; 
        margin-bottom: ${customization.spacing.section}px;
        ${customization.borders.headerBorder ? `border-bottom: ${customization.borders.headerBorderWidth}px solid ${customization.colors.primary}20; padding-bottom: ${customization.spacing.item}px;` : ''}
      ">
        <h1 style="
          font-size: ${customization.fontSize.name}px;
          font-weight: ${customization.fontWeight.name};
          color: ${isHarvardTemplate ? customization.colors.text : customization.colors.primary};
          margin: 0 0 ${customization.spacing.line}px 0;
          line-height: ${customization.lineHeight.heading};
          font-family: inherit;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        ">
          ${personalInfo.firstName} ${personalInfo.lastName}
        </h1>
        
        ${personalInfo.jobTitle ? `
          <h2 style="
            font-size: ${customization.fontSize.heading}px;
            font-weight: ${customization.fontWeight.heading};
            color: ${customization.colors.secondary};
            margin: 0 0 ${customization.spacing.item}px 0;
            line-height: ${customization.lineHeight.heading};
            font-family: inherit;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          ">
            ${personalInfo.jobTitle}
          </h2>
        ` : ''}
        
        ${contactItems.length > 0 ? `
          <div style="
            display: flex;
            justify-content: ${customization.layout.headerAlignment === 'center' ? 'center' : customization.layout.headerAlignment === 'right' ? 'flex-end' : 'flex-start'};
            flex-wrap: wrap;
            gap: ${customization.spacing.line * 2}px;
            font-size: ${customization.fontSize.body}px;
            color: ${customization.colors.text};
            margin-bottom: ${customization.spacing.section}px;
            font-family: inherit;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          ">
            ${contactItems.join('')}
          </div>
        ` : ''}
        
        ${personalInfo.summary ? `
          <div style="
            font-size: ${customization.fontSize.body}px;
            line-height: ${customization.lineHeight.body};
            color: ${customization.colors.text};
            margin: 0 0 ${customization.spacing.section}px 0;
            text-align: ${isHarvardTemplate ? 'justify' : customization.layout.contentAlignment};
            font-family: inherit;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          ">
            ${renderFormattedText(personalInfo.summary)}
          </div>
        ` : ''}
      </div>
    `;
  };

  // Generate experience section
  const generateExperience = () => {
    const visibleExperience = experience.filter(exp => exp.visible !== false && (exp.company || exp.position));
    if (visibleExperience.length === 0) return '';

    return `
      <div class="section" style="margin-bottom: ${customization.spacing.section}px;">
        <h2 style="
          font-size: ${customization.fontSize.heading}px;
          font-weight: ${customization.fontWeight.heading};
          color: ${isHarvardTemplate ? customization.colors.text : customization.colors.primary};
          margin: 0 0 ${customization.spacing.item}px 0;
          padding-bottom: ${customization.borders.sectionBorder ? customization.spacing.line / 2 : 0}px;
          border-bottom: ${customization.borders.sectionBorder ? `${customization.borders.sectionBorderWidth}px ${customization.borders.sectionBorderStyle} ${isHarvardTemplate ? customization.colors.text : customization.colors.primary}` : 'none'};
          line-height: ${customization.lineHeight.heading};
          text-align: ${customization.layout.sectionHeadingAlignment};
          font-family: inherit;
        ">
          ${isHarvardTemplate ? 'PROFESSIONAL EXPERIENCE' : 'Work Experience'}
        </h2>
        
        ${visibleExperience.map(exp => `
          <div style="margin-bottom: ${customization.spacing.item}px;">
            <div style="
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: ${customization.spacing.line / 2}px;
              flex-wrap: wrap;
              gap: 8px;
            ">
              <div style="flex: 1; min-width: 200px;">
                ${exp.company ? `
                  <h3 style="
                    font-size: ${customization.fontSize.body + 2}px;
                    font-weight: ${customization.fontWeight.heading};
                    color: ${customization.colors.text};
                    margin: 0 0 ${customization.spacing.line / 4}px 0;
                    font-family: inherit;
                  ">
                    ${isHarvardTemplate ? exp.company.toUpperCase() : exp.company}
                  </h3>
                ` : ''}
                ${exp.position ? `
                  <h4 style="
                    font-size: ${customization.fontSize.body}px;
                    font-weight: ${isHarvardTemplate ? 'normal' : '600'};
                    font-style: ${isHarvardTemplate ? 'italic' : 'normal'};
                    color: ${isHarvardTemplate ? customization.colors.text : customization.colors.secondary};
                    margin: 0 0 ${customization.spacing.line / 4}px 0;
                    font-family: inherit;
                  ">
                    ${exp.position}
                  </h4>
                ` : ''}
                ${exp.location && !isHarvardTemplate ? `
                  <p style="
                    font-size: ${customization.fontSize.small}px;
                    color: ${customization.colors.textLight};
                    margin: 0;
                    font-family: inherit;
                  ">
                    ${exp.location}
                  </p>
                ` : ''}
              </div>
              ${(exp.startDate || exp.endDate || exp.current) ? `
                <div style="
                  font-size: ${customization.fontSize.small}px;
                  color: ${customization.colors.textLight};
                  white-space: nowrap;
                  text-align: right;
                  font-family: inherit;
                ">
                  ${formatDate(exp.startDate)} ${exp.startDate && (exp.endDate || exp.current) ? '–' : ''} ${exp.current ? 'Present' : formatDate(exp.endDate)}
                  ${isHarvardTemplate && exp.location ? `<br/>${exp.location}` : ''}
                </div>
              ` : ''}
            </div>
            
            ${exp.description && exp.description.length > 0 ? `
              <div style="margin-left: ${isHarvardTemplate ? '0' : '16px'};">
                ${exp.description.filter((desc: string) => desc.trim()).map((desc: string) => `
                  <div style="
                    font-size: ${customization.fontSize.body}px;
                    line-height: ${customization.lineHeight.body};
                    color: ${customization.colors.text};
                    margin-bottom: ${customization.spacing.line / 2}px;
                    display: flex;
                    align-items: flex-start;
                    font-family: inherit;
                  ">
                    <span style="
                      color: ${customization.colors.accent};
                      margin-right: 8px;
                      font-size: 1.2em;
                      line-height: 1;
                      flex-shrink: 0;
                    ">${getBulletSymbol()}</span>
                    <span style="flex: 1;">${renderFormattedText(desc)}</span>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  };

  // Generate education section
  const generateEducation = () => {
    const visibleEducation = education.filter(ed => ed.visible !== false && (ed.institution || ed.degree));
    if (visibleEducation.length === 0) return '';

    return `
      <div class="section" style="margin-bottom: ${customization.spacing.section}px;">
        <h2 style="
          font-size: ${customization.fontSize.heading}px;
          font-weight: ${customization.fontWeight.heading};
          color: ${isHarvardTemplate ? customization.colors.text : customization.colors.primary};
          margin: 0 0 ${customization.spacing.item}px 0;
          padding-bottom: ${customization.borders.sectionBorder ? customization.spacing.line / 2 : 0}px;
          border-bottom: ${customization.borders.sectionBorder ? `${customization.borders.sectionBorderWidth}px ${customization.borders.sectionBorderStyle} ${isHarvardTemplate ? customization.colors.text : customization.colors.primary}` : 'none'};
          line-height: ${customization.lineHeight.heading};
          text-align: ${customization.layout.sectionHeadingAlignment};
          font-family: inherit;
        ">
          ${isHarvardTemplate ? 'EDUCATION' : 'Education'}
        </h2>
        
        ${visibleEducation.map(ed => `
          <div style="margin-bottom: ${customization.spacing.item}px;">
            <div style="
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: ${customization.spacing.line / 2}px;
              flex-wrap: wrap;
              gap: 8px;
            ">
              <div style="flex: 1; min-width: 200px;">
                ${ed.institution ? `
                  <h3 style="
                    font-size: ${customization.fontSize.body + 2}px;
                    font-weight: ${customization.fontWeight.heading};
                    color: ${customization.colors.text};
                    margin: 0 0 ${customization.spacing.line / 4}px 0;
                    font-family: inherit;
                  ">
                    ${ed.institution}
                  </h3>
                ` : ''}
                ${(ed.degree || ed.field) ? `
                  <h4 style="
                    font-size: ${customization.fontSize.body}px;
                    font-weight: ${isHarvardTemplate ? 'normal' : '600'};
                    font-style: ${isHarvardTemplate ? 'italic' : 'normal'};
                    color: ${isHarvardTemplate ? customization.colors.text : customization.colors.secondary};
                    margin: 0 0 ${customization.spacing.line / 4}px 0;
                    font-family: inherit;
                  ">
                    ${ed.degree} ${ed.field ? `in ${ed.field}` : ''}
                  </h4>
                ` : ''}
                ${ed.location && !isHarvardTemplate ? `
                  <p style="
                    font-size: ${customization.fontSize.small}px;
                    color: ${customization.colors.textLight};
                    margin: 0;
                    font-family: inherit;
                  ">
                    ${ed.location}
                  </p>
                ` : ''}
                ${ed.gpa ? `
                  <p style="
                    font-size: ${customization.fontSize.small}px;
                    color: ${customization.colors.textLight};
                    margin: 0;
                    font-family: inherit;
                  ">
                    ${ed.gpa.includes('%') ? `Percentage: ${ed.gpa}` : `GPA: ${ed.gpa}`}
                  </p>
                ` : ''}
              </div>
              ${(ed.startDate || ed.endDate) ? `
                <div style="
                  font-size: ${customization.fontSize.small}px;
                  color: ${customization.colors.textLight};
                  white-space: nowrap;
                  text-align: right;
                  font-family: inherit;
                ">
                  ${formatDate(ed.startDate)} ${ed.startDate && ed.endDate ? '–' : ''} ${formatDate(ed.endDate)}
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  };

  // Generate custom sections
  const generateCustomSections = () => {
    const visibleSections = sectionOrder.filter(section => 
      section.visible && section.id.startsWith('custom-')
    );

    return visibleSections.map(sectionConfig => {
      const customSectionId = sectionConfig.id.replace('custom-', '');
      const customSection = customSections.find(cs => cs.id === customSectionId);
      
      if (!customSection) return '';

      const hasContent = () => {
        if (customSection.type === 'text') {
          return customSection.content && typeof customSection.content === 'string' && customSection.content.trim();
        }
        if (customSection.type === 'list' || customSection.type === 'achievements') {
          return Array.isArray(customSection.content) && customSection.content.some(item => {
            if (typeof item === 'string') return item.trim();
            return item && (item.title || item.name || item.description);
          });
        }
        return false;
      };

      if (!hasContent() && (!customSection.description || !customSection.description.trim())) {
        return '';
      }

      return `
        <div class="section" style="margin-bottom: ${customization.spacing.section}px;">
          <h2 style="
            font-size: ${customization.fontSize.heading}px;
            font-weight: ${customization.fontWeight.heading};
            color: ${isHarvardTemplate ? customization.colors.text : customization.colors.primary};
            margin: 0 0 ${customization.spacing.item}px 0;
            padding-bottom: ${customization.borders.sectionBorder ? customization.spacing.line / 2 : 0}px;
            border-bottom: ${customization.borders.sectionBorder ? `${customization.borders.sectionBorderWidth}px ${customization.borders.sectionBorderStyle} ${isHarvardTemplate ? customization.colors.text : customization.colors.primary}` : 'none'};
            line-height: ${customization.lineHeight.heading};
            text-align: ${customization.layout.sectionHeadingAlignment};
            font-family: inherit;
          ">
            ${isHarvardTemplate ? customSection.title.toUpperCase() : customSection.title}
          </h2>
          
          ${customSection.type === 'text' && customSection.content ? `
            <div style="
              font-size: ${customization.fontSize.body}px;
              line-height: ${customization.lineHeight.body};
              color: ${customization.colors.text};
              white-space: pre-wrap;
              text-align: ${customization.layout.contentAlignment};
              font-family: inherit;
            ">
              ${renderFormattedText(customSection.content)}
            </div>
          ` : ''}
          
          ${(customSection.type === 'list' || customSection.type === 'achievements') && Array.isArray(customSection.content) ? `
            <div style="margin-left: ${isHarvardTemplate ? '0' : '16px'};">
              ${customSection.content.filter((item: any) => {
                if (typeof item === 'string') return item.trim();
                return item && (item.title || item.name || item.description);
              }).map((item: any) => {
                const text = typeof item === 'string' ? item : (item.title || item.name || item.description || '');
                return `
                  <div style="
                    font-size: ${customization.fontSize.body}px;
                    line-height: ${customization.lineHeight.body};
                    color: ${customization.colors.text};
                    margin-bottom: ${customization.spacing.line / 2}px;
                    display: flex;
                    align-items: flex-start;
                    font-family: inherit;
                  ">
                    <span style="
                      color: ${customization.colors.accent};
                      margin-right: 8px;
                      font-size: 1.2em;
                      line-height: 1;
                      flex-shrink: 0;
                    ">${getBulletSymbol()}</span>
                    <span style="flex: 1;">${renderFormattedText(text)}</span>
                  </div>
                `;
              }).join('')}
            </div>
          ` : ''}
          
          ${customSection.description && customSection.description.trim() ? `
            <div style="
              font-size: ${customization.fontSize.body}px;
              line-height: ${customization.lineHeight.body};
              color: ${customization.colors.text};
              margin-top: ${customization.spacing.line}px;
              white-space: pre-wrap;
              text-align: ${customization.layout.contentAlignment};
              font-family: inherit;
            ">
              ${renderFormattedText(customSection.description)}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  };

  // Calculate page dimensions in pixels (96 DPI)
  const pageWidthPx = customization.layout.pageWidth * 96;
  const pageHeightPx = customization.layout.pageHeight * 96;

  // Build the complete HTML with enhanced styling for PDF
  const pageStyles = `
    width: ${pageWidthPx}px;
    min-height: ${pageHeightPx}px;
    max-width: ${pageWidthPx}px;
    padding: ${customization.spacing.page}px;
    background-color: ${customization.colors.background};
    font-family: ${customization.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: ${customization.colors.text};
    line-height: ${customization.lineHeight.body};
    font-size: ${customization.fontSize.body}px;
    margin: 0 auto;
    box-sizing: border-box;
    position: relative;
    ${customization.borders.pageBorder ? `border: ${customization.borders.pageBorderWidth}px solid ${customization.borders.pageBorderColor};` : ''}
    ${customization.shadows ? 'box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);' : ''}
    border-radius: ${customization.roundedCorners}px;
  `;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${personalInfo.firstName} ${personalInfo.lastName} Resume</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: ${customization.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: white;
          margin: 0;
          padding: 20px;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .resume-container {
          ${pageStyles}
        }
        
        /* Ensure text is selectable and crisp */
        .resume-container * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
        
        /* Link styles */
        a {
          color: ${customization.colors.primary};
          text-decoration: underline;
        }
        
        a:hover {
          color: ${customization.colors.accent};
        }
        
        /* Print styles for high quality PDF */
        @media print {
          body { 
            margin: 0; 
            padding: 0; 
            background: white !important;
          }
          .resume-container { 
            margin: 0; 
            box-shadow: none;
            border-radius: 0;
            page-break-after: always;
          }
          
          /* Ensure colors are preserved */
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
        
        /* Page number styles */
        ${customization.layout.showPageNumbers ? `
          .page-number {
            position: absolute;
            font-size: ${customization.fontSize.small}px;
            color: ${customization.colors.textLight};
            ${(() => {
              const position = customization.layout.pageNumberPosition;
              switch (position) {
                case 'top-left': return 'top: 16px; left: 16px;';
                case 'top-center': return 'top: 16px; left: 50%; transform: translateX(-50%);';
                case 'top-right': return 'top: 16px; right: 16px;';
                case 'bottom-left': return 'bottom: 16px; left: 16px;';
                case 'bottom-center': return 'bottom: 16px; left: 50%; transform: translateX(-50%);';
                case 'bottom-right': return 'bottom: 16px; right: 16px;';
                default: return 'bottom: 16px; left: 50%; transform: translateX(-50%);';
              }
            })()}
          }
        ` : ''}
        
        /* Footer styles */
        ${customization.layout.footerText ? `
          .footer-text {
            position: absolute;
            bottom: 8px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: ${customization.fontSize.small - 2}px;
            color: ${customization.colors.textLight};
          }
        ` : ''}
      </style>
    </head>
    <body>
      <div class="resume-container">
        ${generatePersonalInfo()}
        
        ${sectionOrder.filter(section => section.visible && section.id !== 'personal').map(section => {
          switch (section.id) {
            case 'experience':
              return generateExperience();
            case 'education':
              return generateEducation();
            default:
              if (section.id.startsWith('custom-')) {
                return generateCustomSections();
              }
              return '';
          }
        }).join('')}
        
        ${customization.layout.showPageNumbers ? '<div class="page-number">1</div>' : ''}
        ${customization.layout.footerText ? `<div class="footer-text">${customization.layout.footerText}</div>` : ''}
      </div>
    </body>
    </html>
  `;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { resumeData, customization, sectionOrder, selectedTemplate, filename, usePuppeteer } = await req.json()

    if (!resumeData || !customization || !sectionOrder) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Generate high-quality HTML content
    const htmlContent = generateHighQualityHTML(resumeData, customization, sectionOrder, selectedTemplate);

    // For now, return HTML for client-side processing
    // In production, you would integrate with:
    // 1. Browserless.io API
    // 2. PDFShift API  
    // 3. HTMLCSStoImage API
    // 4. Or deploy a separate Node.js service with Puppeteer

    if (usePuppeteer) {
      // Future: Integrate with external Puppeteer service
      // Example with Browserless.io:
      /*
      const browserlessResponse = await fetch('https://chrome.browserless.io/pdf?token=YOUR_TOKEN', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          html: htmlContent,
          options: {
            format: customization.layout.pageFormat,
            margin: {
              top: '0.5in',
              right: '0.5in',
              bottom: '0.5in',
              left: '0.5in'
            },
            printBackground: true,
            preferCSSPageSize: true
          }
        })
      });
      
      if (browserlessResponse.ok) {
        const pdfBuffer = await browserlessResponse.arrayBuffer();
        return new Response(pdfBuffer, {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${filename || 'resume.pdf'}"`
          }
        });
      }
      */
      
      return new Response(
        JSON.stringify({ 
          html: htmlContent,
          message: 'High-quality HTML generated. Ready for Puppeteer/Browserless integration.',
          suggestion: 'Integrate with Browserless.io, PDFShift, or deploy dedicated Puppeteer service for production PDF generation.'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    return new Response(
      JSON.stringify({ 
        html: htmlContent,
        message: 'HTML generated successfully for high-quality PDF conversion.'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error generating PDF:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate PDF', details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})