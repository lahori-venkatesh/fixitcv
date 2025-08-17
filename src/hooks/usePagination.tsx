import { useState, useEffect, useCallback } from 'react';
import React from 'react';

interface PaginationOptions {
  maxContentHeight: number;
  estimateItemHeight: (item: any) => number;
}

export const usePagination = <T,>(
  items: T[],
  options: PaginationOptions
) => {
  const [pages, setPages] = useState<T[][]>([]);

  const distributeItems = useCallback(() => {
    if (items.length === 0) {
      setPages([[]]);
      return;
    }

    const newPages: T[][] = [];
    let currentPage: T[] = [];
    let currentPageHeight = 0;

    items.forEach((item) => {
      const itemHeight = options.estimateItemHeight(item);
      
      // Check if adding this item would exceed the page height
      if (currentPageHeight + itemHeight > options.maxContentHeight && currentPage.length > 0) {
        // Start a new page
        newPages.push([...currentPage]);
        currentPage = [item];
        currentPageHeight = itemHeight;
      } else {
        // Add to current page
        currentPage.push(item);
        currentPageHeight += itemHeight;
      }
    });

    // Add the last page if it has content
    if (currentPage.length > 0) {
      newPages.push(currentPage);
    }

    // Ensure at least one page exists
    if (newPages.length === 0) {
      newPages.push([]);
    }

    setPages(newPages);
  }, [items, options.maxContentHeight, options.estimateItemHeight]);

  useEffect(() => {
    distributeItems();
  }, [distributeItems]);

  return {
    pages,
    totalPages: pages.length,
    redistribute: distributeItems
  };
};

// Section-based pagination for resume sections
export const useSectionPagination = (
  sections: any[],
  customization: any
) => {
  const A4_HEIGHT_PX = 11 * 96; // 1056px
  const MARGIN = customization.spacing?.page || 48;
  const HEADER_HEIGHT = 120;
  const PAGE_NUMBER_HEIGHT = customization.layout?.showPageNumbers ? 30 : 0;
  const AVAILABLE_CONTENT_HEIGHT = A4_HEIGHT_PX - (MARGIN * 2) - HEADER_HEIGHT - PAGE_NUMBER_HEIGHT;

  const estimateSectionHeight = useCallback((section: any) => {
    const baseHeight = 60; // Section header
    
    switch (section.component) {
      case 'personal':
        const summaryLength = section.data?.summary?.length || 0;
        return baseHeight + Math.ceil(summaryLength / 80) * 20 + 40;
        
      case 'experience':
        const experiences = section.data || [];
        return baseHeight + experiences.length * 100; // Rough estimate per experience
        
      case 'education':
        const education = section.data || [];
        return baseHeight + education.length * 60; // Rough estimate per education
        
      case 'projects':
        const projects = section.data || [];
        return baseHeight + projects.length * 120; // Rough estimate per project
        
      case 'skills':
        return baseHeight + 80; // Skills section is usually compact
        
      case 'achievements':
        const achievements = section.data || [];
        return baseHeight + achievements.length * 40;
        
      case 'certifications':
        const certifications = section.data || [];
        return baseHeight + certifications.length * 80;
        
      default:
        return baseHeight + 50;
    }
  }, []);

  return usePagination(sections, {
    maxContentHeight: AVAILABLE_CONTENT_HEIGHT,
    estimateItemHeight: estimateSectionHeight
  });
};