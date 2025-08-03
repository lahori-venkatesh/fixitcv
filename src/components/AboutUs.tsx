import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Award, 
  Globe, 
  Heart, 
  Zap, 
  Shield, 
  TrendingUp,
  CheckCircle,
  Star,
  ArrowRight,
  Linkedin,
  Twitter,
  Github
} from 'lucide-react';
import Header from './Header';

interface AboutUsProps {
  isDarkMode?: boolean;
  onNavigate?: (page: 'landing' | 'about' | 'pricing' | 'templates' | 'blog' | 'builder') => void;
  onToggleTheme?: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ isDarkMode = false, onNavigate, onToggleTheme }) => {
  const stats = [
    { number: "2.5M+", label: "Resumes Created", icon: Users },
    { number: "96%", label: "Success Rate", icon: TrendingUp },
    { number: "180+", label: "Countries", icon: Globe },
    { number: "4.9/5", label: "User Rating", icon: Star }
  ];

  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "We're committed to democratizing career success by making professional resume creation accessible to everyone, everywhere."
    },
    {
      icon: Heart,
      title: "User-Centric",
      description: "Every feature we build starts with understanding our users' needs and challenges in their career journey."
    },
    {
      icon: Zap,
      title: "Innovation First",
      description: "We leverage cutting-edge AI and design principles to stay ahead of industry trends and ATS requirements."
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Your personal information and career data are protected with enterprise-grade security measures."
    }
  ];

  const team = [
    {
      name: "Lahori Venkatesh",
      role: "CEO & Co-Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "Former VP of Product at LinkedIn with 15+ years in career technology.",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Ramavathu Nagaraju",
      role: "CTO & Co-Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Ex-Google engineer specializing in AI and machine learning applications.",
      social: { linkedin: "#", github: "#" }
    },
    {
      name: "Prudvi Varma",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Award-winning designer with expertise in user experience and accessibility.",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Santhosh",
      role: "VP of Engineering",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Former Microsoft architect with deep expertise in scalable systems.",
      social: { linkedin: "#", github: "#" }
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Started with a vision to revolutionize resume creation"
    },
    {
      year: "2021",
      title: "AI Integration",
      description: "Launched AI-powered content suggestions and optimization"
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Expanded to 50+ countries with localized templates"
    },
    {
      year: "2023",
      title: "1M Users",
      description: "Reached our first million successful resume creations"
    },
    {
      year: "2024",
      title: "Enterprise Launch",
      description: "Introduced enterprise solutions for HR teams"
    },
    {
      year: "2025",
      title: "2.5M+ Users",
      description: "Continuing to grow and innovate for career success"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <Header 
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        onNavigate={onNavigate}
        currentPage="about"
      />

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-20 ${
            isDarkMode ? 'bg-blue-500' : 'bg-blue-200'
          }`} />
          <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-20 ${
            isDarkMode ? 'bg-purple-500' : 'bg-purple-200'
          }`} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">FixitCV</span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              We're on a mission to empower every professional with the tools they need to showcase their best self and land their dream job.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={index} 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                    isDarkMode ? 'bg-slate-800' : 'bg-white'
                  } shadow-lg`}>
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h2>
              <div className="space-y-6 text-lg leading-relaxed">
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  FixitCV was born from a simple observation: talented professionals were being overlooked because their resumes didn't effectively communicate their value. Traditional resume builders were either too basic or too complex, leaving job seekers frustrated.
                </p>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Our founders, having experienced this challenge firsthand in their careers at top tech companies, decided to build something different. They envisioned a platform that would combine beautiful design, intelligent technology, and deep understanding of what employers actually want to see.
                </p>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Today, FixitCV has helped  professionals across 180+ countries land their dream jobs. We're not just building software; we're building careers.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className={`rounded-2xl overflow-hidden shadow-2xl ${
                isDarkMode ? 'bg-slate-800' : 'bg-white'
              }`}>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-80 object-cover"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Building the Future of Careers</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Every day, we work to make career advancement more accessible and equitable for professionals worldwide.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`py-24 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? 'bg-slate-900/50' : 'bg-white/50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Values</h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl ${
                    isDarkMode 
                      ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800' 
                      : 'bg-white border-gray-200 hover:shadow-blue-100/50'
                  }`}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Journey</h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Key milestones in our mission to transform careers
            </p>
          </motion.div>

          <div className="relative">
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${
              isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
            }`} />
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <motion.div 
                    className={`p-6 rounded-2xl border ${
                      isDarkMode 
                        ? 'bg-slate-800 border-slate-700' 
                        : 'bg-white border-gray-200'
                    } shadow-lg`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-blue-600 font-bold text-lg mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {milestone.description}
                    </p>
                  </motion.div>
                </div>
                
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 ${
                  isDarkMode 
                    ? 'bg-slate-900 border-blue-500' 
                    : 'bg-white border-blue-500'
                }`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={`py-24 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? 'bg-slate-900/50' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Team</h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              The passionate people behind FixitCV
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`text-center p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-700' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className={`text-sm mb-6 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {member.bio}
                </p>
                <div className="flex justify-center space-x-4">
                  {member.social.linkedin && (
                    <motion.a 
                      href={member.social.linkedin} 
                      className="text-blue-600 hover:text-blue-700"
                      whileHover={{ scale: 1.2 }}
                    >
                      <Linkedin className="w-5 h-5" />
                    </motion.a>
                  )}
                  {member.social.twitter && (
                    <motion.a 
                      href={member.social.twitter} 
                      className="text-blue-600 hover:text-blue-700"
                      whileHover={{ scale: 1.2 }}
                    >
                      <Twitter className="w-5 h-5" />
                    </motion.a>
                  )}
                  {member.social.github && (
                    <motion.a 
                      href={member.social.github} 
                      className="text-blue-600 hover:text-blue-700"
                      whileHover={{ scale: 1.2 }}
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`p-12 rounded-2xl border ${
              isDarkMode 
                ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-slate-700' 
                : 'bg-gradient-to-br from-blue-50 to-purple-50 border-gray-200'
            }`}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
            <p className={`text-xl mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Join millions of professionals who trust FixitCV to showcase their best self.
            </p>
            <motion.button 
              onClick={() => onNavigate && onNavigate('builder')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-3 mx-auto shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Building Your Resume</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;