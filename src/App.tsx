import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import LandingPage from './components/LandingPage';
import ResumeBuilder from './components/ResumeBuilder';
import Pricing from './components/Pricing';
import Templates from './components/Templates';
import HowToUse from './components/HowToUse';
import ContactUs from './components/ContactUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CookiePolicy from './components/CookiePolicy';
import { syncUserWithSupabase } from './lib/supabase';

type Page = 'landing' | 'builder' | 'pricing' | 'templates' | 'how-to-use' | 'contact' | 'privacy' | 'terms' | 'cookies';

// Auth redirect component to handle post-authentication flow
const AuthRedirect: React.FC = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    const handleAuthRedirect = async () => {
      if (isLoaded && isSignedIn && user) {
        // Sync user with Supabase
        try {
          await syncUserWithSupabase(user.id, {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.primaryEmailAddress?.emailAddress
          });
          
          // Set a flag in session storage to indicate the user just signed in
          sessionStorage.setItem('justAuthenticated', 'true');
          
          // Redirect to resume builder
          window.location.href = '/builder';
        } catch (error) {
          console.error('Error syncing user with Supabase:', error);
          // Redirect anyway
          window.location.href = '/builder';
        }
      } else if (isLoaded && !isSignedIn) {
        // Redirect to landing page if not signed in
        window.location.href = '/';
      }
    };

    if (isLoaded) {
      handleAuthRedirect();
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting you to the resume builder...</p>
      </div>
    </div>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const { isSignedIn, isLoaded } = useUser();

  // Check URL path to determine current page
  useEffect(() => {
    const path = window.location.pathname;
    
    if (path === '/') {
      setCurrentPage('landing');
    } else if (path === '/builder' || path.startsWith('/resume/')) {
      setCurrentPage('builder');
    } else if (path === '/pricing') {
      setCurrentPage('pricing');
    } else if (path === '/templates') {
      setCurrentPage('templates');
    } else if (path === '/how-to-use') {
      setCurrentPage('how-to-use');
    } else if (path === '/contact') {
      setCurrentPage('contact');
    } else if (path === '/privacy') {
      setCurrentPage('privacy');
    } else if (path === '/terms') {
      setCurrentPage('terms');
    } else if (path === '/cookies') {
      setCurrentPage('cookies');
    } else if (path === '/auth-redirect') {
      // Special case for auth redirect
      return;
    }
  }, []);

  // Redirect signed-in users to resume builder if they're on landing page
  useEffect(() => {
    if (isLoaded && isSignedIn && currentPage === 'landing') {
      setCurrentPage('builder');
    }
  }, [isSignedIn, isLoaded, currentPage]);

  // Check for stored template selection when user signs in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const storedTemplate = localStorage.getItem('selectedTemplate');
      if (storedTemplate) {
        setSelectedTemplate(storedTemplate);
        localStorage.removeItem('selectedTemplate'); // Clean up
        setCurrentPage('builder');
      }
    }
  }, [isSignedIn, isLoaded]);

  const handleGetStarted = () => {
    setCurrentPage('builder');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    if (isSignedIn) {
      setCurrentPage('builder');
    }
  };

  const renderCurrentPage = () => {
    const pageProps = {
      isDarkMode,
      onToggleTheme: toggleTheme,
      onNavigate: handleNavigation,
      onTemplateSelect: handleTemplateSelect
    };

    switch (currentPage) {
      case 'builder':
        return (
          <ResumeBuilder 
            onBackToLanding={handleBackToLanding} 
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
            selectedTemplate={selectedTemplate}
          />
        );
      case 'pricing':
        return <Pricing {...pageProps} />;
      case 'templates':
        return <Templates {...pageProps} />;
      case 'how-to-use':
        return <HowToUse {...pageProps} />;
      case 'contact':
        return <ContactUs {...pageProps} />;
      case 'privacy':
        return <PrivacyPolicy {...pageProps} />;
      case 'terms':
        return <TermsOfService {...pageProps} />;
      case 'cookies':
        return <CookiePolicy {...pageProps} />;
      default:
        return (
          <LandingPage 
            onGetStarted={handleGetStarted}
            onNavigate={handleNavigation}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
            onTemplateSelect={handleTemplateSelect}
          />
        );
    }
  };

  // Special route for auth redirect
  if (window.location.pathname === '/auth-redirect') {
    return <AuthRedirect />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark' : ''
    }`}>
      {renderCurrentPage()}
    </div>
  );
}

export default App;