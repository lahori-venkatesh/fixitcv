import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = async (elementId: string, filename: string = 'resume.pdf') => {
  try {
    // Show loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 9999; display: flex; align-items: center; justify-content: center; color: white; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="text-align: center; padding: 40px; background: rgba(255,255,255,0.1); border-radius: 16px; backdrop-filter: blur(10px);">
          <div style="width: 60px; height: 60px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid #3B82F6; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 24px;"></div>
          <div style="font-size: 20px; font-weight: 600; margin-bottom: 8px;">Generating PDF...</div>
          <div style="font-size: 14px; opacity: 0.8;">Capturing your customized resume</div>
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

    // Find the resume preview element
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }

    // Get all A4 pages (they should have the class 'a4-page-forced' or similar)
    const pages = element.querySelectorAll('.a4-page-forced, [style*="816px"], [style*="1056px"]');
    
    if (pages.length === 0) {
      // Fallback: capture the entire element
      await captureElementToPDF(element, filename);
    } else {
      // Capture each page separately for multi-page PDF
      await capturePagesToPDF(Array.from(pages) as HTMLElement[], filename);
    }

    // Remove loading indicator
    document.body.removeChild(loadingDiv);

    // Show success message
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `
      <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #10B981, #059669); color: white; padding: 20px 28px; border-radius: 12px; box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3); z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          <div>
            <div style="font-weight: 600; font-size: 16px; margin-bottom: 2px;">PDF Downloaded!</div>
            <div style="font-size: 13px; opacity: 0.9;">Resume exported with all customizations</div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(successDiv);
    setTimeout(() => {
      if (document.body.contains(successDiv)) {
        document.body.removeChild(successDiv);
      }
    }, 4000);

  } catch (error) {
    console.error('PDF Export Error:', error);
    
    // Remove loading indicator if it exists
    const loadingDiv = document.querySelector('[style*="position: fixed"][style*="z-index: 9999"]');
    if (loadingDiv && loadingDiv.parentNode) {
      loadingDiv.parentNode.removeChild(loadingDiv);
    }

    // Show error message
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `
      <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #EF4444, #DC2626); color: white; padding: 20px 28px; border-radius: 12px; box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3); z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
          <div>
            <div style="font-weight: 600; font-size: 16px; margin-bottom: 2px;">Export Failed</div>
            <div style="font-size: 13px; opacity: 0.9;">Please try again or contact support</div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(errorDiv);
    setTimeout(() => {
      if (document.body.contains(errorDiv)) {
        document.body.removeChild(errorDiv);
      }
    }, 5000);

    throw error;
  }
};

const captureElementToPDF = async (element: HTMLElement, filename: string) => {
  // Find all A4 pages within the element
  const a4Pages = element.querySelectorAll('.a4-page-forced, [style*="816px"][style*="1056px"]');
  
  if (a4Pages.length > 0) {
    // Use the multi-page capture function
    await capturePagesToPDF(Array.from(a4Pages) as HTMLElement[], filename);
    return;
  }

  // Fallback: capture the entire element
  // Temporarily remove any transform scaling for accurate capture
  const originalTransform = element.style.transform;
  const originalTransformOrigin = element.style.transformOrigin;
  
  // Find the parent container that might have scaling
  let scaledParent = element.parentElement;
  let originalParentTransform = '';
  
  while (scaledParent) {
    if (scaledParent.style.transform && scaledParent.style.transform.includes('scale')) {
      originalParentTransform = scaledParent.style.transform;
      scaledParent.style.transform = scaledParent.style.transform.replace(/scale\([^)]*\)/g, 'scale(1)');
      break;
    }
    scaledParent = scaledParent.parentElement;
  }

  // Wait for fonts to load
  await document.fonts.ready;

  // Configure html2canvas for high quality
  const canvas = await html2canvas(element, {
    scale: 3, // Higher DPI for crisp text
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    scrollX: 0,
    scrollY: 0,
    logging: false,
    onclone: (clonedDoc) => {
      // Ensure all styles are preserved in the cloned document
      const clonedElement = clonedDoc.getElementById(element.id);
      if (clonedElement) {
        clonedElement.style.transform = 'none';
        clonedElement.style.transformOrigin = 'initial';
        
        // Copy all computed styles to ensure exact match
        const originalStyles = window.getComputedStyle(element);
        for (let i = 0; i < originalStyles.length; i++) {
          const property = originalStyles[i];
          const value = originalStyles.getPropertyValue(property);
          clonedElement.style.setProperty(property, value);
        }
      }
    }
  });

  // Restore original transforms
  if (originalTransform) {
    element.style.transform = originalTransform;
    element.style.transformOrigin = originalTransformOrigin;
  }
  if (scaledParent && originalParentTransform) {
    scaledParent.style.transform = originalParentTransform;
  }

  // Create PDF with exact A4 dimensions
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Calculate dimensions to fit A4 (210mm x 297mm)
  const pdfWidth = 210;
  const pdfHeight = 297;
  
  // Add the canvas to PDF with high quality
  const imgData = canvas.toDataURL('image/png', 1.0);
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST');

  // Download the PDF
  pdf.save(filename);
};

const capturePagesToPDF = async (pages: HTMLElement[], filename: string) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pdfWidth = 210;
  const pdfHeight = 297;

  // Wait for fonts to load
  await document.fonts.ready;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    
    // Temporarily remove any transform scaling for accurate capture
    const originalTransform = page.style.transform;
    const originalTransformOrigin = page.style.transformOrigin;
    
    // Find the parent container that might have scaling
    let scaledParent = page.parentElement;
    let originalParentTransform = '';
    
    while (scaledParent) {
      if (scaledParent.style.transform && scaledParent.style.transform.includes('scale')) {
        originalParentTransform = scaledParent.style.transform;
        scaledParent.style.transform = scaledParent.style.transform.replace(/scale\([^)]*\)/g, 'scale(1)');
        break;
      }
      scaledParent = scaledParent.parentElement;
    }

    // Ensure the page is visible and properly styled
    page.style.visibility = 'visible';
    page.style.opacity = '1';

    // Capture this page with high quality settings
    const canvas = await html2canvas(page, {
      scale: 3, // Higher DPI for crisp text
      useCORS: true,
      allowTaint: true,
      backgroundColor: page.style.backgroundColor || '#ffffff',
      width: 816, // A4 width in pixels
      height: 1056, // A4 height in pixels
      scrollX: 0,
      scrollY: 0,
      logging: false,
      onclone: (clonedDoc) => {
        // Find the cloned page element and preserve all styles
        const clonedPages = clonedDoc.querySelectorAll('.a4-page-forced, [style*="816px"], [style*="1056px"]');
        const clonedPage = clonedPages[i] as HTMLElement;
        if (clonedPage) {
          clonedPage.style.transform = 'none';
          clonedPage.style.transformOrigin = 'initial';
          
          // Copy all computed styles to ensure exact match
          const originalStyles = window.getComputedStyle(page);
          for (let j = 0; j < originalStyles.length; j++) {
            const property = originalStyles[j];
            const value = originalStyles.getPropertyValue(property);
            clonedPage.style.setProperty(property, value);
          }
          
          // Ensure all child elements maintain their styles
          const originalChildren = page.querySelectorAll('*');
          const clonedChildren = clonedPage.querySelectorAll('*');
          
          originalChildren.forEach((originalChild, index) => {
            const clonedChild = clonedChildren[index] as HTMLElement;
            if (clonedChild) {
              const childStyles = window.getComputedStyle(originalChild);
              for (let k = 0; k < childStyles.length; k++) {
                const property = childStyles[k];
                const value = childStyles.getPropertyValue(property);
                clonedChild.style.setProperty(property, value);
              }
            }
          });
        }
      }
    });

    // Restore original transforms
    if (originalTransform) {
      page.style.transform = originalTransform;
      page.style.transformOrigin = originalTransformOrigin;
    }
    if (scaledParent && originalParentTransform) {
      scaledParent.style.transform = originalParentTransform;
    }

    // Add page to PDF
    if (i > 0) {
      pdf.addPage();
    }
    
    const imgData = canvas.toDataURL('image/png', 1.0);
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST');
  }

  // Download the PDF
  pdf.save(filename);
};