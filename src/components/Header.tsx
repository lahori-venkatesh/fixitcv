import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  ArrowLeft 
} from 'lucide-react';
import { 
  SignedIn, 
  SignedOut, 
  SignInButton, 
  UserButton,
  useUser 
} from '@clerk/clerk-react';

interface HeaderProps {
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  onNavigate?: (page: 'landing' | 'about' | 'pricing' | 'templates' | 'blog' | 'builder' | 'career-tips' | 'interview-guide' | 'contact' | 'privacy' | 'terms' | 'cookies') => void;
  currentPage?: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = memo(
  ({ 
    isDarkMode = false, 
    onToggleTheme, 
    onNavigate, 
    currentPage = 'landing', 
    showBackButton = false 
  }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { user } = useUser();

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
      { label: 'Home', page: 'landing' },
      { label: 'Pricing', page: 'pricing' },
      { label: 'Templates', page: 'templates' },
      { label: 'How to Use', page: 'how-to-use' },
    ];

    const handleNavClick = (page: string) => {
      if (onNavigate) {
        onNavigate(page as any);
      }
      setIsMenuOpen(false);
    };

    const handleGetStarted = () => {
      if (onNavigate) {
        onNavigate('builder');
      }
      setIsMenuOpen(false);
    };

    const handleToggleTheme = () => {
      if (onToggleTheme) {
        onToggleTheme();
      }
    };

    const handleLogoClick = () => {
      if (onNavigate) {
        onNavigate('landing');
      }
    };

    return (
      <header
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          isScrolled || currentPage !== 'landing'
            ? isDarkMode
              ? 'bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 shadow-lg'
              : 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-lg'
            : isDarkMode
              ? 'bg-slate-900/80 backdrop-blur-sm'
              : 'bg-white/80 backdrop-blur-sm'
        }`}
        role="banner"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              {showBackButton && onNavigate && (
                <motion.button
                  onClick={() => handleNavClick('landing')}
                  className={`p-2 rounded-lg transition-colors mr-2 ${
                    isDarkMode
                      ? 'text-slate-200 hover:text-white hover:bg-slate-800'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  aria-label="Back to Home"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.button>
              )}
              <motion.button
                onClick={handleLogoClick}
                className="flex items-center space-x-3 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="ResumeSurge - Go to homepage"
              >
                <div className="relative">
                  <motion.div 
                    className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FileText className="w-5 h-5 text-white" aria-hidden="true" />
                  </motion.div>
                  <motion.div 
                    className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-200">
                  FixitCV
                </span>
              </motion.button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`text-sm font-medium transition-colors relative ${
                    currentPage === item.page
                      ? 'text-blue-600'
                      : isDarkMode
                        ? 'text-slate-200 hover:text-blue-400'
                        : 'text-slate-600 hover:text-blue-600'
                  }`}
                  aria-current={currentPage === item.page ? 'page' : undefined}
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                >
                  {item.label}
                  {currentPage === item.page && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={handleToggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'text-yellow-400 hover:text-yellow-300 hover:bg-slate-800'
                    : 'text-blue-600 hover:text-blue-700 hover:bg-slate-100'
                }`}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isDarkMode ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5 text-yellow-400" strokeWidth={2.5} />
                  ) : (
                    <Moon className="w-5 h-5 text-blue-600" strokeWidth={2.5} />
                  )}
                </motion.div>
              </motion.button>

              {/* Authentication Buttons */}
              <SignedOut>
                <SignInButton mode="modal">
                  <motion.button
                    className={`hidden md:flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isDarkMode
                        ? 'text-slate-200 hover:text-white hover:bg-slate-800'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                    aria-label="Log in to your account"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Log In</span>
                  </motion.button>
                </SignInButton>

                <SignInButton mode="modal">
                  <motion.button
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
                    aria-label="Get started with ResumeSurge"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Get Started</span>
                  </motion.button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <motion.button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
                  aria-label="Go to Resume Builder"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Build Resume</span>
                </motion.button>

                <div className="flex items-center">
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10",
                        userButtonPopoverCard: isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200",
                        userButtonPopoverText: isDarkMode ? "text-slate-200" : "text-gray-900"
                      }
                    }}
                  />
                </div>
              </SignedIn>

              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  isDarkMode ? 'text-slate-200 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={{
              height: isMenuOpen ? 'auto' : 0,
              opacity: isMenuOpen ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`lg:hidden overflow-hidden border-t ${
              isDarkMode ? 'border-slate-800' : 'border-slate-200'
            }`}
          >
            <div className="py-4 space-y-3">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`block w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === item.page
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : isDarkMode
                        ? 'text-slate-200 hover:text-white hover:bg-slate-800'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  aria-current={currentPage === item.page ? 'page' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  {item.label}
                </motion.button>
              ))}
              
              <div className="border-t pt-3 mt-3">
                <SignedOut>
                  <SignInButton mode="modal">
                    <motion.button
                      className={`w-full flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isDarkMode
                          ? 'text-slate-200 hover:text-white hover:bg-slate-800'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                      aria-label="Log in to your account"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navItems.length * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      <span>Log In</span>
                    </motion.button>
                  </SignInButton>

                  <SignInButton mode="modal">
                    <motion.button
                      className="w-full mt-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                      aria-label="Get started with ResumeSurge"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (navItems.length + 1) * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      <span>Get Started</span>
                    </motion.button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <motion.button
                    onClick={handleGetStarted}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                    aria-label="Go to Resume Builder"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <span>Build Resume</span>
                  </motion.button>

                  <div className="flex items-center justify-center mt-4">
                    <UserButton 
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10",
                          userButtonPopoverCard: isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200",
                          userButtonPopoverText: isDarkMode ? "text-slate-200" : "text-gray-900"
                        }
                      }}
                    />
                  </div>
                </SignedIn>
              </div>
            </div>
          </motion.div>
        </nav>
      </header>
    );
  }
);

Header.displayName = 'Header';

export default Header;