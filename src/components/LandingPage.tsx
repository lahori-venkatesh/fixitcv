import React, { useState, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  FileText, 
  Zap, 
  Shield, 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  Clock, 
  Star, 
  TrendingUp, 
  Globe, 
  Play, 
  ChevronDown, 
  Edit, 
  Layout, 
  Upload,
  ChevronRight,
  ExternalLink,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Facebook,
} from 'lucide-react';
import Header from './Header';
import HeroSection from './ui/HeroSection';
import GradientFooter from './ui/GradientFooter';

const Testimonials = lazy(() => import('./ui/Testimonials'));

interface LandingPageProps {
  onGetStarted: () => void;
  onNavigate?: (page: 'landing' | 'about' | 'pricing' | 'templates' | 'blog' | 'builder' | 'career-tips' | 'interview-guide' | 'contact' | 'privacy' | 'terms' | 'cookies') => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  onTemplateSelect?: (templateId: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ 
  onGetStarted, 
  onNavigate, 
  isDarkMode = false, 
  onToggleTheme,
  onTemplateSelect 
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleGetStarted = () => {
    if (typeof onGetStarted === 'function') {
      onGetStarted();
    }
  };

  const handleTemplateNavigation = () => {
    if (onNavigate) {
      onNavigate('templates');
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Builder",
      description: "Intelligent suggestions and content optimization powered by advanced AI algorithms",
    },
    {
      icon: Shield,
      title: "ATS Optimization",
      description: "Guaranteed to pass Applicant Tracking Systems with industry-leading compatibility",
    },
    {
      icon: Globe,
      title: "Global Templates",
      description: "Professional templates designed for markets worldwide with regional preferences",
    },
    {
      icon: TrendingUp,
      title: "Career Analytics",
      description: "Track your application success rate and get insights to improve your job search",
    },
  ];

  const faqs = [
    {
      question: "How does FixitCV ensure my resume passes ATS systems?",
      answer: "Our AI-powered builder optimizes your resume with industry-standard keywords and formatting that aligns with Applicant Tracking Systems, ensuring maximum compatibility and visibility.",
    },
    {
      question: "Can I use FixitCV for free?",
      answer: "Yes! We offer a free forever plan with access to basic templates and core features. Premium plans unlock additional templates and advanced tools.",
    },
    {
      question: "How long does it take to create a resume?",
      answer: "With our AI-powered suggestions and pre-designed templates, you can create a professional resume in as little as 10 minutes.",
    },
    {
      question: "Are my personal details secure with FixitCV?",
      answer: "Absolutely. We use industry-leading encryption and security protocols to protect your data, and we never share your information with third parties.",
    },
    {
      question: "Can I customize the templates to match my personal brand?",
      answer: "Yes, our templates are fully customizable. You can adjust colors, fonts, and layouts to create a resume that reflects your unique professional identity.",
    },
  ];

  const howToUseSteps = [
    {
      icon: Edit,
      title: "Enter Your Details",
      description: "Input your professional information, and our AI will suggest optimized content tailored to your industry.",
      illustration: (
        <svg className="w-full h-48" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="160" height="80" rx="8" className={`${isDarkMode ? 'fill-slate-800' : 'fill-slate-100'}`} />
          <path d="M40 40 H160" stroke={isDarkMode ? '#60A5FA' : '#3B82F6'} strokeWidth="4" strokeLinecap="round" />
          <path d="M40 60 H140" stroke={isDarkMode ? '#60A5FA' : '#3B82F6'} strokeWidth="4" strokeLinecap="round" />
          <circle cx="170" cy="30" r="10" className={`${isDarkMode ? 'fill-blue-500' : 'fill-blue-600'}`} />
          <path d="M168 28 L172 32 M168 32 L172 28" stroke="white" strokeWidth="2" />
        </svg>
      ),
    },
    {
      icon: Layout,
      title: "Choose a Template",
      description: "Select from a variety of ATS-friendly, professionally designed templates to match your personal brand.",
      illustration: (
        <svg className="w-full h-48" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="20" width="60" height="80" rx="6" className={`${isDarkMode ? 'fill-slate-800' : 'fill-slate-100'}`} />
          <rect x="100" y="20" width="60" height="80" rx="6" className={`${isDarkMode ? 'fill-blue-500' : 'fill-blue-600'}`} />
          <path d="M110 30 H150" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <path d="M110 50 H140" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <rect x="40" y="30" width="40" height="10" rx="2" className={`${isDarkMode ? 'fill-blue-400' : 'fill-blue-500'}`} />
        </svg>
      ),
    },
    {
      icon: Upload,
      title: "Download & Apply",
      description: "Download your polished resume in PDF format and start applying to your dream jobs instantly.",
      illustration: (
        <svg className="w-full h-48" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="70" y="20" width="60" height="80" rx="6" className={`${isDarkMode ? 'fill-slate-800' : 'fill-slate-100'}`} />
          <path d="M90 70 L100 80 L110 70" stroke={isDarkMode ? '#60A5FA' : '#3B82F6'} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M100 40 V80" stroke={isDarkMode ? '#60A5FA' : '#3B82F6'} strokeWidth="4" strokeLinecap="round" />
          <circle cx="100" cy="30" r="8" className={`${isDarkMode ? 'fill-blue-500' : 'fill-blue-600'}`} />
        </svg>
      ),
    },
  ];

  // Footer menu items
  const footerMenuItems = [
    {
      title: "Product",
      links: [
        { text: "Templates", url: "templates" },
        { text: "Features", url: "#features" },
        { text: "Pricing", url: "pricing" },
        { text: "AI Builder", url: "builder" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "Contact", url: "contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "How to Use", url: "how-to-use" },
      ],
    },
    {
      title: "Legal",
      links: [
        { text: "Privacy Policy", url: "privacy" },
        { text: "Terms of Service", url: "terms" },
        { text: "Cookie Policy", url: "cookies" },
      ],
    },
  ];

  // Social links for footer
  const socialLinks = [
    { platform: "Twitter", url: "https://twitter.com/resumesurge", icon: Twitter },
    { platform: "LinkedIn", url: "https://linkedin.com/company/resumesurge", icon: Linkedin },
    { platform: "GitHub", url: "https://github.com/resumesurge", icon: Github },
    { platform: "Instagram", url: "https://instagram.com/resumesurge", icon: Instagram },
    { platform: "Facebook", url: "https://facebook.com/resumesurge", icon: Facebook },
  ];

  return (
    <div className={`min-h-screen font-inter transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      <Header 
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        onNavigate={onNavigate}
        currentPage="landing"
        showBackButton={false}
      />

      {/* Hero Section */}
      <HeroSection 
        isDarkMode={isDarkMode}
        onGetStarted={handleGetStarted}
        onNavigate={onNavigate}
      />

      {/* Features Section */}
      <section id="features" className={`py-24 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`} aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4"
            >
              <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
              <span>Industry-Leading Features</span>
            </motion.div>

            <motion.h2
              id="features-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
            >
              Everything You Need to Succeed
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}
            >
              Professional tools and intelligent features designed to help you create resumes that get noticed by employers and pass ATS systems.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl group ${
                  isDarkMode ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-800/50' : 'border-slate-200 bg-white hover:shadow-blue-100/50'
                }`}
                style={{
                  boxShadow: isDarkMode 
                    ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' 
                    : '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <feature.icon className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{feature.title}</h3>
                <p className={`text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section id="how-to-use" className={`py-32 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`} aria-labelledby="how-to-use-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4"
            >
              <Play className="w-4 h-4 mr-2" aria-hidden="true" />
              <span>Easy as 1-2-3</span>
            </motion.div>

            <motion.h2
              id="how-to-use-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
            >
              How to Use ResumeSurge
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}
            >
              Create a professional resume in minutes with our simple, guided process. Follow these steps to get started.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howToUseSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl group ${
                    isDarkMode ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-800/50' : 'border-slate-200 bg-white hover:shadow-blue-100/50'
                  }`}
                  style={{
                    boxShadow: isDarkMode 
                      ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' 
                      : '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{step.title}</h3>
                  <p className={`text-base leading-relaxed mb-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{step.description}</p>
                  {step.illustration}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <Suspense fallback={<div className="text-center py-24">Loading testimonials...</div>}>
        <Testimonials isDarkMode={isDarkMode} />
      </Suspense>

      {/* FAQ Section */}
      <section id="faq" className={`py-32 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`} aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 id="faq-heading" className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Frequently Asked Questions
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Got questions? We've got answers about how FixitCV can help you land your dream job.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`border rounded-2xl overflow-hidden ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white'}`}
                style={{
                  boxShadow: isDarkMode 
                    ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)' 
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                }}
              >
                <motion.button
                  onClick={() => toggleFaq(index)}
                  className={`w-full flex justify-between items-center p-6 text-left transition-colors ${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}`}
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                  whileHover={{ x: 4 }}
                >
                  <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} aria-hidden="true" />
                  </motion.div>
                </motion.button>
                {openFaq === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`px-6 py-4 ${isDarkMode ? 'bg-slate-900/50 text-slate-200' : 'bg-white text-gray-600'}`}
                  >
                    <p className={`text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-32 relative" aria-labelledby="cta-heading">
        {/* Background with texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 overflow-hidden">
          {/* Grid Texture */}
          <div className="absolute inset-0 opacity-10">
            <div 
              className="absolute inset-0" 
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
          
          {/* Dot Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div 
              className="absolute inset-0" 
              style={{ 
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }}
            />
          </div>
          
          {/* Abstract Lines */}
          <div className="absolute inset-0 opacity-10">
            <div 
              className="absolute inset-0" 
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,50 Q25,25 50,50 T100,50' stroke='%23FFFFFF' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
                backgroundSize: '100px 100px',
              }}
            />
          </div>
          
          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${5 + Math.random() * 10}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 id="cta-heading" className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join millions of professionals who have successfully landed their dream jobs with ResumeSurge. Start building your perfect resume today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                onClick={handleGetStarted}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-3 justify-center hover:bg-blue-50 hover:shadow-2xl transition-all duration-300 shadow-xl"
                aria-label="Get started with ResumeSurge for free"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  boxShadow: '0 10px 25px -5px rgba(255, 255, 255, 0.3), 0 8px 10px -6px rgba(255, 255, 255, 0.2)'
                }}
              >
                <Clock className="w-5 h-5" aria-hidden="true" />
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </motion.button>
              
              <motion.button
                onClick={handleTemplateNavigation}
                className="px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white/30 text-white backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View Templates</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Animated wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg 
            className="absolute bottom-0 w-full h-24" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path 
              fill={isDarkMode ? '#0f172a' : '#ffffff'} 
              fillOpacity="1" 
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Footer */}
      <GradientFooter 
        isDarkMode={isDarkMode}
        logo={{
          url: "#",
          alt: "ResumeSurge Logo",
          title: "FixitCV"
        }}
        tagline="Empowering professionals worldwide with AI-driven resume solutions that help you land your dream job."
        menuItems={footerMenuItems}
        socialLinks={socialLinks}
        copyright="© FixitCV. All rights reserved."
        bottomLinks={[
          { text: "Privacy Policy", url: "privacy" },
          { text: "Terms of Service", url: "terms" },
          { text: "Cookie Policy", url: "cookies" }
        ]}
        onNavigate={(page) => onNavigate && onNavigate(page as any)}
      />

      

      {/* Floating Animation Particles */}
      <div className="fixed bottom-6 right-6 pointer-events-none z-40">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            animate={{
              y: [0, -30, -60],
              x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut"
            }}
            style={{
              left: `${20 + i * 8}px`,
              bottom: `${60 + i * 5}px`
            }}
          />
        ))}
      </div>
      
      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;