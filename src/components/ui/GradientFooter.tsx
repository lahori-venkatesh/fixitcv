import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Twitter, Linkedin, Github, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface GradientFooterProps {
  logo?: {
    url: string;
    src?: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
  socialLinks?: SocialLink[];
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  animationDuration?: number;
  isDarkMode?: boolean;
  onNavigate?: (page: string) => void;
}

const GradientFooter = ({
  logo = {
    src: undefined,
    alt: "Company Logo",
    title: "FixitCV",
    url: "#",
  },
  tagline = "Empowering professionals worldwide with AI-driven resume solutions that help you land your dream job.",
  menuItems = [
    {
      title: "Product",
      links: [
        { text: "Templates", url: "templates" },
        { text: "Features", url: "#features" },
        { text: "Pricing", url: "pricing" },
        
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
  ],
  copyright = "© FixitCV.com. All rights reserved.",
  bottomLinks = [
    { text: "Privacy Policy", url: "privacy" },
    { text: "Terms of Service", url: "terms" },
    { text: "Security", url: "#security" },
    { text: "Accessibility", url: "#accessibility" },
  ],
  socialLinks = [
    { platform: "Twitter", url: "https://twitter.com/resumesurge", icon: Twitter },
    { platform: "LinkedIn", url: "https://linkedin.com/company/resumesurge", icon: Linkedin },
    { platform: "GitHub", url: "https://github.com/resumesurge", icon: Github },
    { platform: "Instagram", url: "https://instagram.com/resumesurge", icon: Instagram },
    { platform: "Facebook", url: "https://facebook.com/resumesurge", icon: Facebook },
  ],
  contactInfo = {
    email: "hello@FixitCV.com",
    phone: "+91 7095656427",
    address: "MNIT Jaipur "
  },
  animationDuration = 8,
  isDarkMode = false,
  onNavigate,
}: GradientFooterProps) => {
  
  const handleNavigation = (url: string) => {
    if (onNavigate && !url.startsWith('#') && !url.startsWith('http')) {
      onNavigate(url);
    }
  };
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
      {/* Enhanced Background Text with Gradient - Positioned at Bottom */}
<div className="absolute inset-x-0 bottom-0 flex items-end justify-center pointer-events-none select-none overflow-hidden">
  <div 
    className="text-[19vw] md:text-[26vw] lg:text-[28vw] font-black tracking-[-0.05em] uppercase whitespace-nowrap leading-[1]"
    style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      transform: 'translateY(20%)',
      opacity: 0.4, /* Adjust text opacity (0 to 1) */
     
      textStroke: '1px rgba(255,255,255,0.5)' /* Stroke for cross-browser compatibility */
    }}
  >
    FIXITCV
  </div>
</div>
      
     
      
      <div className="relative z-10">
        <div className="container mx-auto py-20 px-6 md:px-8 lg:px-12">
          <footer>
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Company Info Section */}
              <div className="lg:col-span-4">
                <motion.div 
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="relative">
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl"
                      whileHover={{ rotate: 8, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FileText className="w-6 h-6 text-white" />
                    </motion.div>
                    <motion.div 
                      className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {logo.title}
                  </h1>
                </motion.div>
                
                <motion.p 
                  className="text-gray-300 leading-relaxed mb-8 text-lg"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {tagline}
                </motion.p>
                
                {/* Contact Information */}
                {/*  <motion.div 
                  className="space-y-4 mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {contactInfo.email && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors duration-300">
                        {contactInfo.email}
                      </a>
                    </div>
                  )}
                  {contactInfo.phone && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <Phone className="w-5 h-5 text-blue-400" />
                      <a href={`tel:${contactInfo.phone}`} className="hover:text-white transition-colors duration-300">
                        {contactInfo.phone}
                      </a>
                    </div>
                  )}
                  {contactInfo.address && (
                    <div className="flex items-start gap-3 text-gray-300">
                      <MapPin className="w-5 h-5 text-blue-400 mt-0.5" />
                      <span className="leading-relaxed">{contactInfo.address}</span>
                    </div>
                  )}
                </motion.div>*/}
                
                {/* Enhanced Social Links */}
                <motion.div 
                  className="flex space-x-3"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 hover:from-blue-600 hover:to-blue-500 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        title={social.platform}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </motion.a>
                    );
                  })}
                </motion.div>
              </div>
              
              {/* Menu Links */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                  {menuItems.map((section, sectionIdx) => (
                    <motion.div 
                      key={sectionIdx}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.1 * (sectionIdx + 2) }}
                    >
                      <h3 className="mb-6 text-lg font-bold text-white">{section.title}</h3>
                      <ul className="space-y-4">
                        {section.links.map((link, linkIdx) => (
                          <li key={linkIdx}>
                            <motion.a
                              href={link.url.startsWith('http') ? link.url : '#'}
                              onClick={(e) => {
                                if (!link.url.startsWith('http') && !link.url.startsWith('#')) {
                                  e.preventDefault();
                                  handleNavigation(link.url);
                                }
                              }}
                              className="text-gray-300 hover:text-white transition-all duration-300 text-base leading-relaxed hover:translate-x-1 inline-block"
                              whileHover={{ x: 4 }}
                            >
                              {link.text}
                            </motion.a>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Enhanced Bottom Section */}
            <motion.div 
              className="mt-4 pt-4 border-t border-gradient-to-r from-transparent via-blue-600 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex flex-col justify-between gap-6 text-gray-300 md:flex-row md:items-center">
                <div className="flex flex-col gap-2">
                  <p className="text-base font-medium">{copyright}</p>
                  <p className="text-sm text-gray-400">
                    Made with ❤️ for professionals worldwide
                  </p>
                </div>
                <div className="flex flex-wrap gap-6">
                  {bottomLinks.map((link, linkIdx) => (
                    <motion.a
                      key={linkIdx}
                      href={link.url.startsWith('http') ? link.url : '#'}
                      onClick={(e) => {
                        if (!link.url.startsWith('http') && !link.url.startsWith('#')) {
                          e.preventDefault();
                          handleNavigation(link.url);
                        }
                      }}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium"
                      whileHover={{ y: -2 }}
                    >
                      {link.text}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </footer>
        </div>
      </div>
    </section>
  );
};

export default GradientFooter;