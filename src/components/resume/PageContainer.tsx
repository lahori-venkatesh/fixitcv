import React, { useRef, useEffect, useState } from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  pageNumber: number;
  showPageNumbers?: boolean;
  customization: any;
  onOverflow?: (hasOverflow: boolean) => void;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  pageNumber,
  showPageNumbers = false,
  customization,
  onOverflow
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  // ABSOLUTE A4 dimensions - NEVER change these regardless of customization
  const A4_WIDTH_PX = 816; // 8.5 * 96 - FIXED
  const A4_HEIGHT_PX = 1056; // 11 * 96 - FIXED
  const FIXED_MARGIN = 48; // FIXED margin - ignore customization.spacing.page
  const PAGE_NUMBER_HEIGHT = showPageNumbers ? 30 : 0;
  const AVAILABLE_CONTENT_HEIGHT = A4_HEIGHT_PX - (FIXED_MARGIN * 2) - PAGE_NUMBER_HEIGHT; // 960px or 930px

  // Monitor content height and detect overflow
  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const overflow = contentHeight > AVAILABLE_CONTENT_HEIGHT;
        
        if (overflow !== hasOverflow) {
          setHasOverflow(overflow);
          onOverflow?.(overflow);
        }
      }
    };

    // Check immediately
    checkOverflow();

    // Set up ResizeObserver to monitor content changes
    const resizeObserver = new ResizeObserver(checkOverflow);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    // Also check on DOM mutations
    const mutationObserver = new MutationObserver(checkOverflow);
    if (contentRef.current) {
      mutationObserver.observe(contentRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
      });
    }

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [hasOverflow, AVAILABLE_CONTENT_HEIGHT, onOverflow]);

  return (
    <div
      className="resume-page-container"
      style={{
        // ABSOLUTE A4 dimensions - NEVER change regardless of any customization
        width: '816px !important',
        height: '1056px !important',
        maxWidth: '816px !important',
        maxHeight: '1056px !important',
        minWidth: '816px !important',
        minHeight: '1056px !important',
        margin: '0 auto 20px auto',
        backgroundColor: customization.colors?.background || '#ffffff',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        borderRadius: '8px',
        overflow: 'hidden !important',
        position: 'relative',
        boxSizing: 'border-box',
        display: 'block !important',
        padding: '0',
        flex: 'none !important',
        flexGrow: '0 !important',
        flexShrink: '0 !important',
        contain: 'layout size style !important'
      }}
    >
      {/* ABSOLUTE Content Area - NEVER changes height */}
      <div
        ref={contentRef}
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: showPageNumbers ? '30px' : '0',
          width: '816px',
          height: showPageNumbers ? '1026px' : '1056px',
          maxWidth: '816px',
          maxHeight: showPageNumbers ? '1026px' : '1056px',
          overflow: 'hidden',
          boxSizing: 'border-box',
          padding: `${customization.spacing?.page || 48}px`
        }}
      >
        {children}
      </div>

      {/* Page Number - Absolute positioned */}
      {showPageNumbers && (
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${customization.fontSize?.small || 12}px`,
            color: customization.colors?.textLight || '#6b7280',
            zIndex: 10
          }}
        >
          {pageNumber}
        </div>
      )}

      {/* Overflow Indicator (for debugging) */}
      {hasOverflow && process.env.NODE_ENV === 'development' && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: '#ef4444',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
            zIndex: 20
          }}
        >
          OVERFLOW
        </div>
      )}
    </div>
  );
};