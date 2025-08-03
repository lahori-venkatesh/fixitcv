import React from 'react';
import { ModernPricingCard } from './ui/ModernPricingCard';
import Header from './Header';

interface PricingProps {
  isDarkMode?: boolean;
  onNavigate?: (page: 'landing' | 'about' | 'pricing' | 'templates' | 'blog' | 'builder') => void;
  onToggleTheme?: () => void;
}

const Pricing: React.FC<PricingProps> = ({ isDarkMode = false, onNavigate, onToggleTheme }) => {
  return (
    <div className="min-h-screen">
      <Header 
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        onNavigate={onNavigate}
        currentPage="pricing"
      />
      <div className="pt-0">
        <ModernPricingCard 
          isDarkMode={isDarkMode}
          title="Choose Your Plan"
          subtitle="Select the perfect plan to accelerate your career growth"
        />
      </div>
    </div>
  );
};

export default Pricing;