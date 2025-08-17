import { ResumeData, SectionOrder, ResumeCustomization } from '../types/resume';

// Function to capture the exact HTML from the preview
const capturePreviewHTML = (): string => {
  const previewElement = document.getElementById('resume-preview');
  if (!previewElement) {
    throw new Error('Resume preview element not found');
  }

  // Get all stylesheets
  const stylesheets = Array.from(document.styleSheets);
  let allCSS = '';
  
  stylesheets.forEach(sheet => {
    try {
      const rules = Array.from(sheet.cssRules || sheet.rules || []);
      rules.forEach(rule => {
        allCSS += rule.cssText + '\n';
      });
    } catch (e) {
      // Skip stylesheets that can't be accessed due to CORS
      console.warn('Could not access stylesheet:', e);
    }
  });

  // Get the preview HTML
  const previewHTML = previewElement.innerHTML;
  
  // Get computed styles for all elements
  const elements = previewElement.querySelectorAll('*');
  let inlineStyles = '';
  
  elements.forEach((element, index) => {
    const computedStyle = window.getComputedStyle(element);
    const selector = `[data-element-index="${index}"]`;
    element.setAttribute('data-element-index', index.toString());
    
    let styleString = '';
    for (let i = 0; i < computedStyle.length; i++) {
      const property = computedStyle[i];
      const value = computedStyle.getPropertyValue(property);
      styleString += `${property}: ${value}; `;
    }
    
    if (styleString) {
      inlineStyles += `${selector} { ${styleString} }\n`;
    }
  });

  // Create complete HTML document
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resume PDF Export</title>
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: white;
          margin: 0;
          padding: 20px;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Original CSS */
        ${allCSS}
        
        /* Computed styles */
        ${inlineStyles}
        
        /* Print optimizations */
        @media print {
          body { 
            margin: 0; 
            padding: 0; 
            background: white !important;
          }
          
          .a4-page-forced {
            page-break-after: always;
            margin: 0 !important;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
        
        /* Ensure A4 dimensions */
        .a4-page-forced {
          width: 816px !important;
          height: 1056px !important;
          max-width: 816px !important;
          max-height: 1056px !important;
          min-width: 816px !important;
          min-height: 1056px !important;
          overflow: hidden !important;
        }
      </style>
    </head>
    <body>
      ${previewHTML}
    </body>
    </html>
  `;
};

export const exportToPuppeteer = async (
  resumeData: ResumeData,
  customization: ResumeCustomization,
  sectionOrder: SectionOrder[],
  selectedTemplate: string = 'default',
  filename: string = 'resume.pdf'
) => {
  try {
    // Show enhanced loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 9999; display: flex; align-items: center; justify-content: center; color: white; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="text-align: center; padding: 48px; background: rgba(255,255,255,0.1); border-radius: 20px; backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.2);">
          <div style="width: 80px; height: 80px; border: 4px solid rgba(255,255,255,0.3); border-top: 4px solid #3B82F6; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 32px;"></div>
          <div style="font-size: 24px; font-weight: 700; margin-bottom: 12px; letter-spacing: -0.02em;">Generating Premium PDF...</div>
          <div style="font-size: 16px; opacity: 0.9; font-weight: 500; margin-bottom: 8px;">Capturing exact preview with all customizations</div>
          <div style="font-size: 14px; opacity: 0.7; font-weight: 400;">Perfect quality • Exact match • Vector graphics</div>
          <div style="margin-top: 24px; padding: 12px 24px; background: rgba(59, 130, 246, 0.2); border-radius: 12px; border: 1px solid rgba(59, 130, 246, 0.3);">
            <div style="font-size: 13px; opacity: 0.9;">⚡ Powered by Supabase Edge Functions</div>
          </div>
        </div>
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      </div>
    `;
    document.body.appendChild(loadingDiv);

    // Capture the exact HTML from the preview
    const exactHTML = capturePreviewHTML();

    // Get Supabase configuration
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase configuration missing, falling back to client-side PDF generation');
      // Clean up loading indicator
      document.body.removeChild(loadingDiv);
      
      // Fallback to client-side PDF generation
      const { exportToPDF } = await import('./exportToPDF');
      await exportToPDF('resume-preview', filename);
      return;
    }

    console.log('🚀 Calling Supabase Edge Function with exact preview HTML...');

    let response;
    try {
      response = await fetch(`${supabaseUrl}/functions/v1/generate-pdf`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          exactHTML, // Send the captured HTML instead of generating new HTML
          resumeData,
          customization,
          sectionOrder,
          selectedTemplate,
          filename,
          usePuppeteer: true,
          useExactHTML: true // Flag to indicate we're sending exact HTML
        })
      });
    } catch (fetchError) {
      console.warn('Edge Function not available, falling back to client-side PDF generation:', fetchError);
      // Clean up loading indicator
      document.body.removeChild(loadingDiv);
      
      // Fallback to client-side PDF generation
      const { exportToPDF } = await import('./exportToPDF');
      await exportToPDF('resume-preview', filename);
      return;
    }

    if (!response.ok) {
      console.warn('Edge Function failed, falling back to client-side PDF generation');
      // Clean up loading indicator
      document.body.removeChild(loadingDiv);
      
      // Fallback to client-side PDF generation
      const { exportToPDF } = await import('./exportToPDF');
      await exportToPDF('resume-preview', filename);
      return;
    }

    let result;
    try {
      result = await response.json();
    } catch (parseError) {
      console.warn('Failed to parse Edge Function response, falling back to client-side PDF generation');
      // Clean up loading indicator
      document.body.removeChild(loadingDiv);
      
      // Fallback to client-side PDF generation
      const { exportToPDF } = await import('./exportToPDF');
      await exportToPDF('resume-preview', filename);
      return;
    }
    
    console.log('✅ Edge Function Response:', result);

    // Clean up loading indicator
    document.body.removeChild(loadingDiv);

    if (result.html || result.pdfUrl) {
      // If we get a PDF URL, download it directly
      if (result.pdfUrl) {
        const link = document.createElement('a');
        link.href = result.pdfUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (result.html) {
        // Create a high-quality print window with the generated HTML
        const printWindow = window.open('', '_blank', 'width=1200,height=800');
        
        if (printWindow) {
          printWindow.document.write(result.html);
          printWindow.document.close();
          
          // Wait for content and fonts to load
          printWindow.onload = () => {
            // Add a small delay to ensure all fonts and styles are loaded
            setTimeout(() => {
              // Focus the window and trigger print
              printWindow.focus();
              printWindow.print();
              
              // Close the window after printing
              setTimeout(() => {
                printWindow.close();
              }, 1000);
            }, 1000);
          };
        } else {
          console.warn('Unable to open print window, falling back to client-side PDF generation');
          // Fallback to client-side PDF generation
          const { exportToPDF } = await import('./exportToPDF');
          await exportToPDF('resume-preview', filename);
        }
      }

      // Show success message with enhanced styling
      const successDiv = document.createElement('div');
      successDiv.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #10B981, #059669); color: white; padding: 24px 32px; border-radius: 20px; box-shadow: 0 25px 50px rgba(16, 185, 129, 0.4), 0 12px 20px rgba(16, 185, 129, 0.2); z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.2);">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.25); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 12px rgba(0,0,0,0.15);">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
            <div>
              <div style="font-weight: 700; font-size: 18px; margin-bottom: 6px; letter-spacing: -0.02em;">Perfect PDF Generated!</div>
              <div style="font-size: 15px; opacity: 0.95; font-weight: 500; margin-bottom: 4px;">Exact match with preview - all customizations preserved</div>
              <div style="font-size: 13px; opacity: 0.8; font-weight: 400;">✨ Fonts • Spacing • Colors • Layout perfectly matched</div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(successDiv);
      setTimeout(() => {
        if (document.body.contains(successDiv)) {
          document.body.removeChild(successDiv);
        }
      }, 6000);

    } else {
      console.warn('No HTML content received, falling back to client-side PDF generation');
      // Fallback to client-side PDF generation
      const { exportToPDF } = await import('./exportToPDF');
      await exportToPDF('resume-preview', filename);
    }

  } catch (error) {
    console.error('❌ PDF Export Error:', error);
    
    // Clean up loading indicator if it exists
    const loadingDiv = document.querySelector('[style*="position: fixed"][style*="z-index: 9999"]');
    if (loadingDiv && loadingDiv.parentNode) {
      loadingDiv.parentNode.removeChild(loadingDiv);
    }
    
    // Fallback to client-side PDF generation as last resort
    try {
      console.log('Attempting fallback to client-side PDF generation...');
      const { exportToPDF } = await import('./exportToPDF');
      await exportToPDF('resume-preview', filename);
    } catch (fallbackError) {
      console.error('Fallback PDF generation also failed:', fallbackError);
      
      // Show enhanced error message only if all methods fail
      const errorDiv = document.createElement('div');
      errorDiv.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #EF4444, #DC2626); color: white; padding: 24px 32px; border-radius: 20px; box-shadow: 0 25px 50px rgba(239, 68, 68, 0.4), 0 12px 20px rgba(239, 68, 68, 0.2); z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.2);">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.25); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 12px rgba(0,0,0,0.15);">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </div>
            <div>
              <div style="font-weight: 700; font-size: 18px; margin-bottom: 6px; letter-spacing: -0.02em;">PDF Export Failed</div>
              <div style="font-size: 15px; opacity: 0.95; font-weight: 500; margin-bottom: 4px;">Unable to generate PDF at this time</div>
              <div style="font-size: 13px; opacity: 0.8; font-weight: 400;">Please try again or contact support if the issue persists</div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(errorDiv);
      setTimeout(() => {
        if (document.body.contains(errorDiv)) {
          document.body.removeChild(errorDiv);
        }
      }, 8000);
    }
  }
};