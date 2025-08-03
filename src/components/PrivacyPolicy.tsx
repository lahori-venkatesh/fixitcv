import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  Globe, 
  UserCheck, 
  AlertTriangle, 
  Mail, 
  Calendar,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Header from './Header';

interface PrivacyPolicyProps {
  isDarkMode?: boolean;
  onNavigate?: (page: 'landing' | 'about' | 'pricing' | 'templates' | 'blog' | 'builder') => void;
  onToggleTheme?: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ isDarkMode = false, onNavigate, onToggleTheme }) => {
  const lastUpdated = "January 15, 2025";

  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: Database,
      content: `
        <h3>Personal Information</h3>
        <p>When you create an account or use our services, we may collect:</p>
        <ul>
          <li>Name, email address, and contact information</li>
          <li>Professional information (work history, education, skills)</li>
          <li>Account credentials and authentication data</li>
          <li>Payment information (processed securely through third-party providers)</li>
        </ul>

        <h3>Usage Information</h3>
        <p>We automatically collect information about how you use our platform:</p>
        <ul>
          <li>Device information (IP address, browser type, operating system)</li>
          <li>Usage patterns and feature interactions</li>
          <li>Performance data and error logs</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>

        <h3>Resume Content</h3>
        <p>We store the content you create in our platform, including:</p>
        <ul>
          <li>Resume text, formatting, and design choices</li>
          <li>Uploaded documents and images</li>
          <li>Template preferences and customizations</li>
          <li>Draft versions and revision history</li>
        </ul>
      `
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: UserCheck,
      content: `
        <h3>Service Provision</h3>
        <p>We use your information to:</p>
        <ul>
          <li>Provide and maintain our resume building services</li>
          <li>Process your account registration and authentication</li>
          <li>Generate and customize resume templates</li>
          <li>Enable document export and sharing features</li>
        </ul>

        <h3>Improvement and Analytics</h3>
        <p>Your data helps us:</p>
        <ul>
          <li>Analyze usage patterns to improve our platform</li>
          <li>Develop new features and templates</li>
          <li>Optimize performance and user experience</li>
          <li>Conduct research and analytics</li>
        </ul>

        <h3>Communication</h3>
        <p>We may contact you for:</p>
        <ul>
          <li>Service updates and important notifications</li>
          <li>Customer support and technical assistance</li>
          <li>Marketing communications (with your consent)</li>
          <li>Security alerts and account notifications</li>
        </ul>
      `
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing and Disclosure',
      icon: Globe,
      content: `
        <h3>We Do Not Sell Your Data</h3>
        <p>ResumeSurge does not sell, rent, or trade your personal information to third parties for marketing purposes.</p>

        <h3>Service Providers</h3>
        <p>We may share information with trusted service providers who assist us in:</p>
        <ul>
          <li>Cloud hosting and data storage</li>
          <li>Payment processing</li>
          <li>Email delivery and communication</li>
          <li>Analytics and performance monitoring</li>
        </ul>

        <h3>Legal Requirements</h3>
        <p>We may disclose information when required by law or to:</p>
        <ul>
          <li>Comply with legal processes and government requests</li>
          <li>Protect our rights, property, or safety</li>
          <li>Prevent fraud or security threats</li>
          <li>Enforce our terms of service</li>
        </ul>

        <h3>Business Transfers</h3>
        <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction, subject to the same privacy protections.</p>
      `
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Lock,
      content: `
        <h3>Security Measures</h3>
        <p>We implement industry-standard security measures to protect your data:</p>
        <ul>
          <li>Encryption in transit and at rest using AES-256</li>
          <li>Secure authentication and access controls</li>
          <li>Regular security audits and vulnerability assessments</li>
          <li>Employee training on data protection practices</li>
        </ul>

        <h3>Data Centers</h3>
        <p>Your data is stored in secure, SOC 2 compliant data centers with:</p>
        <ul>
          <li>24/7 physical security and monitoring</li>
          <li>Redundant backup systems</li>
          <li>Disaster recovery procedures</li>
          <li>Regular security certifications</li>
        </ul>

        <h3>Access Controls</h3>
        <p>We maintain strict access controls:</p>
        <ul>
          <li>Role-based access for employees</li>
          <li>Multi-factor authentication requirements</li>
          <li>Regular access reviews and audits</li>
          <li>Immediate access revocation for departing employees</li>
        </ul>
      `
    },
    {
      id: 'user-rights',
      title: 'Your Rights and Choices',
      icon: Eye,
      content: `
        <h3>Data Access and Portability</h3>
        <p>You have the right to:</p>
        <ul>
          <li>Access and review your personal information</li>
          <li>Export your resume data in standard formats</li>
          <li>Request a copy of all data we have about you</li>
          <li>Receive your data in a machine-readable format</li>
        </ul>

        <h3>Data Correction and Deletion</h3>
        <p>You can:</p>
        <ul>
          <li>Update your personal information at any time</li>
          <li>Delete your account and associated data</li>
          <li>Request correction of inaccurate information</li>
          <li>Remove specific pieces of content</li>
        </ul>

        <h3>Communication Preferences</h3>
        <p>You can control:</p>
        <ul>
          <li>Marketing email subscriptions</li>
          <li>Notification preferences</li>
          <li>Cookie and tracking settings</li>
          <li>Data processing consent</li>
        </ul>

        <h3>Exercising Your Rights</h3>
        <p>To exercise any of these rights, contact us at privacy@FixitCV.com. We will respond within 30 days of receiving your request.</p>
      `
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      icon: AlertTriangle,
      content: `
        <h3>Types of Cookies</h3>
        <p>We use different types of cookies:</p>
        <ul>
          <li><strong>Essential Cookies:</strong> Required for basic platform functionality</li>
          <li><strong>Performance Cookies:</strong> Help us understand how you use our site</li>
          <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
          <li><strong>Marketing Cookies:</strong> Used for targeted advertising (with consent)</li>
        </ul>

        <h3>Third-Party Tracking</h3>
        <p>We may use third-party services for:</p>
        <ul>
          <li>Google Analytics for usage analytics</li>
          <li>Customer support chat widgets</li>
          <li>Social media integration</li>
          <li>Payment processing</li>
        </ul>

        <h3>Managing Cookies</h3>
        <p>You can control cookies through:</p>
        <ul>
          <li>Browser settings and preferences</li>
          <li>Our cookie consent banner</li>
          <li>Account privacy settings</li>
          <li>Third-party opt-out tools</li>
        </ul>
      `
    },
    {
      id: 'international',
      title: 'International Data Transfers',
      icon: Globe,
      content: `
        <h3>Global Operations</h3>
        <p>FixitCV operates globally and may transfer your data to countries outside your residence, including the United States.</p>

        <h3>Transfer Safeguards</h3>
        <p>When transferring data internationally, we ensure:</p>
        <ul>
          <li>Adequate protection through legal frameworks</li>
          <li>Standard contractual clauses with service providers</li>
          <li>Compliance with applicable data protection laws</li>
          <li>Regular assessment of transfer mechanisms</li>
        </ul>

        <h3>Regional Compliance</h3>
        <p>We comply with regional privacy laws including:</p>
        <ul>
          <li>GDPR (European Union)</li>
          <li>CCPA (California)</li>
          <li>PIPEDA (Canada)</li>
          <li>Other applicable local privacy regulations</li>
        </ul>
      `
    },
    {
      id: 'children',
      title: 'Children\'s Privacy',
      icon: Shield,
      content: `
        <h3>Age Restrictions</h3>
        <p>FixitCV is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>

        <h3>Parental Rights</h3>
        <p>If we become aware that we have collected personal information from a child under 13:</p>
        <ul>
          <li>We will delete the information immediately</li>
          <li>We will notify the parents or guardians</li>
          <li>We will take steps to prevent future collection</li>
        </ul>

        <h3>Teen Users (13-17)</h3>
        <p>For users between 13-17 years old:</p>
        <ul>
          <li>Parental consent may be required in some jurisdictions</li>
          <li>Additional privacy protections may apply</li>
          <li>Limited data collection and processing</li>
        </ul>
      `
    },
    {
      id: 'changes',
      title: 'Changes to This Policy',
      icon: Calendar,
      content: `
        <h3>Policy Updates</h3>
        <p>We may update this privacy policy from time to time to reflect:</p>
        <ul>
          <li>Changes in our data practices</li>
          <li>New features or services</li>
          <li>Legal or regulatory requirements</li>
          <li>Industry best practices</li>
        </ul>

        <h3>Notification of Changes</h3>
        <p>When we make significant changes, we will:</p>
        <ul>
          <li>Update the "Last Updated" date</li>
          <li>Send email notifications to registered users</li>
          <li>Display prominent notices on our platform</li>
          <li>Provide a summary of key changes</li>
        </ul>

        <h3>Continued Use</h3>
        <p>Your continued use of ResumeSurge after policy changes constitutes acceptance of the updated terms. If you disagree with changes, you may delete your account.</p>
      `
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 text-gray-900'
    }`}>
      <Header 
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        onNavigate={onNavigate}
        currentPage="privacy"
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

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
              isDarkMode 
                ? 'bg-blue-900/30 text-blue-300 border border-blue-700/30' 
                : 'bg-blue-100 text-blue-700 border border-blue-200'
            }`}>
              <Shield className="w-4 h-4 mr-2" />
              Your Privacy Matters
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Privacy <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Policy</span>
            </h1>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              We are committed to protecting your privacy and being transparent about how we collect, use, and protect your personal information.
            </p>
            
            <div className={`inline-flex items-center px-4 py-2 rounded-lg ${
              isDarkMode ? 'bg-slate-800 text-gray-300' : 'bg-white text-gray-700 border border-gray-200'
            }`}>
              <Calendar className="w-4 h-4 mr-2" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </motion.div>

          {/* Key Principles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            {[
              {
                icon: Lock,
                title: 'Data Security',
                description: 'Your information is protected with enterprise-grade security measures.'
              },
              {
                icon: Eye,
                title: 'Transparency',
                description: 'We clearly explain what data we collect and how we use it.'
              },
              {
                icon: UserCheck,
                title: 'Your Control',
                description: 'You have full control over your data and privacy settings.'
              }
            ].map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`p-6 rounded-xl border text-center ${
                  isDarkMode 
                    ? 'bg-slate-900/50 border-slate-700' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <principle.icon className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{principle.title}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`p-6 rounded-xl border mb-12 ${
              isDarkMode 
                ? 'bg-slate-900/50 border-slate-700' 
                : 'bg-white border-gray-200'
            }`}
          >
            <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {sections.map((section, index) => (
                <a 
                  key={section.id}
                  href={`#${section.id}`}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isDarkMode
                      ? 'hover:bg-slate-800'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <section.icon className="w-5 h-5 text-blue-500" />
                  <span>{index + 1}. {section.title}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Policy Sections */}
          <div className="space-y-16">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="scroll-mt-24"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                  }`}>
                    <section.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold">{index + 1}. {section.title}</h2>
                </div>
                
                <div 
                  className={`prose max-w-none ${isDarkMode ? 'prose-invert' : ''}`}
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`py-24 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? 'bg-slate-900/50' : 'bg-white/50'
      }`}>
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
            <Mail className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Privacy Questions?</h2>
            <p className={`text-xl mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              If you have any questions about our privacy practices, please contact our Data Protection Officer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a 
                href="mailto:privacy@resumesurge.com"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-5 h-5" />
                <span>privacy@FixitCV.com</span>
              </motion.a>
              
              <motion.button
                onClick={() => onNavigate && onNavigate('contact')}
                className={`px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-800 text-white hover:bg-slate-700' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Contact Us</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;