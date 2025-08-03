import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Shield, 
  AlertTriangle, 
  Clock, 
  Globe, 
  Mail, 
  Calendar, 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  Info,
  Zap,
  Lock,
  CreditCard,
  Copyright
} from 'lucide-react';
import Header from './Header';

interface TermsOfServiceProps {
  isDarkMode?: boolean;
  onNavigate?: (page: 'landing' | 'about' | 'pricing' | 'templates' | 'blog' | 'builder') => void;
  onToggleTheme?: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ isDarkMode = false, onNavigate, onToggleTheme }) => {
  const lastUpdated = "January 15, 2025";

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: CheckCircle,
      content: `
        <p>By accessing or using FixitCV website, applications, or services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Services.</p>
        
        <p>These Terms constitute a legally binding agreement between you and ResumeSurge, Inc. ("FixitCV," "we," "us," or "our") regarding your use of the Services.</p>
        
        <p>You represent and warrant that:</p>
        <ul>
          <li>You are at least 13 years of age</li>
          <li>You have the legal capacity to enter into these Terms</li>
          <li>You will use the Services in accordance with these Terms</li>
          <li>If you are using the Services on behalf of an organization, you have authority to bind that organization to these Terms</li>
        </ul>
      `
    },
    {
      id: 'account',
      title: 'Account Registration and Security',
      icon: Lock,
      content: `
        <h3>Account Creation</h3>
        <p>To access certain features of the Services, you may need to register for an account. When registering, you agree to provide accurate, current, and complete information about yourself.</p>
        
        <h3>Account Security</h3>
        <p>You are responsible for:</p>
        <ul>
          <li>Maintaining the confidentiality of your account credentials</li>
          <li>All activities that occur under your account</li>
          <li>Immediately notifying us of any unauthorized use of your account</li>
          <li>Ensuring that you log out of your account at the end of each session</li>
        </ul>
        
        <h3>Account Termination</h3>
        <p>We reserve the right to:</p>
        <ul>
          <li>Suspend or terminate your account</li>
          <li>Delete your content</li>
          <li>Prohibit your access to the Services</li>
        </ul>
        <p>We may take these actions at our sole discretion, with or without notice, for any reason, including if we believe you have violated these Terms.</p>
      `
    },
    {
      id: 'services',
      title: 'Services and Subscription',
      icon: Zap,
      content: `
        <h3>Service Description</h3>
        <p>ResumeSurge provides resume building, editing, and optimization tools, including:</p>
        <ul>
          <li>Resume templates and design tools</li>
          <li>Content suggestions and optimization</li>
          <li>Document export and sharing capabilities</li>
          <li>Career resources and guidance</li>
        </ul>
        
        <h3>Subscription Plans</h3>
        <p>We offer various subscription plans with different features and pricing. By subscribing to a paid plan:</p>
        <ul>
          <li>You agree to pay all fees in accordance with the billing terms</li>
          <li>Subscription fees are charged at the beginning of each billing period</li>
          <li>Subscriptions automatically renew unless canceled before the renewal date</li>
          <li>You may cancel your subscription at any time through your account settings</li>
        </ul>
        
        <h3>Free Trial</h3>
        <p>We may offer free trials of our premium services. At the end of the trial period:</p>
        <ul>
          <li>Your account will automatically convert to a paid subscription unless canceled</li>
          <li>You will be charged the applicable subscription fee</li>
          <li>You may cancel during the trial period to avoid charges</li>
        </ul>
        
        <h3>Service Modifications</h3>
        <p>We reserve the right to modify, suspend, or discontinue any part of the Services at any time, with or without notice. We will not be liable to you or any third party for any such modifications, suspension, or discontinuation.</p>
      `
    },
    {
      id: 'payment',
      title: 'Payment and Billing',
      icon: CreditCard,
      content: `
        <h3>Pricing</h3>
        <p>Pricing for our Services is available on our website. We reserve the right to change our prices at any time, with notice provided to current subscribers before the change takes effect.</p>
        
        <h3>Payment Methods</h3>
        <p>We accept various payment methods, including credit cards, debit cards, and other forms of electronic payment. By providing payment information, you:</p>
        <ul>
          <li>Represent that you are authorized to use the payment method</li>
          <li>Authorize us to charge your payment method for the Services</li>
          <li>Agree to keep your payment information current</li>
        </ul>
        
        <h3>Billing Issues</h3>
        <p>For any billing issues or questions:</p>
        <ul>
          <li>Contact our support team at billing@resumesurge.com</li>
          <li>Provide detailed information about the issue</li>
          <li>Allow up to 5 business days for a response</li>
        </ul>
        
        <h3>Refunds</h3>
        <p>Our refund policy is as follows:</p>
        <ul>
          <li>We offer a 14-day money-back guarantee for new subscriptions</li>
          <li>Refund requests must be submitted within 14 days of the initial purchase</li>
          <li>Refunds are processed within 5-10 business days</li>
          <li>We do not provide partial refunds for subscription downgrades or cancellations after the refund period</li>
        </ul>
      `
    },
    {
      id: 'content',
      title: 'User Content and Ownership',
      icon: FileText,
      content: `
        <h3>Your Content</h3>
        <p>You retain ownership of all content you create, upload, or store using our Services, including resumes, cover letters, and personal information ("User Content").</p>
        
        <h3>License to Us</h3>
        <p>You grant ResumeSurge a non-exclusive, worldwide, royalty-free license to:</p>
        <ul>
          <li>Use, reproduce, modify, and store your User Content</li>
          <li>Display and distribute your User Content as necessary to provide the Services</li>
          <li>Improve our Services, including AI and machine learning features</li>
        </ul>
        <p>This license is solely for the purpose of operating, improving, and promoting the Services.</p>
        
        <h3>Content Restrictions</h3>
        <p>You agree not to create, upload, or share User Content that:</p>
        <ul>
          <li>Infringes on intellectual property rights</li>
          <li>Contains false, misleading, or fraudulent information</li>
          <li>Violates any applicable laws or regulations</li>
          <li>Contains malware, viruses, or harmful code</li>
          <li>Is offensive, abusive, or promotes discrimination</li>
        </ul>
        
        <h3>Content Removal</h3>
        <p>We reserve the right to remove any User Content that violates these Terms or that we determine, in our sole discretion, is harmful, offensive, or otherwise inappropriate.</p>
      `
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property Rights',
      icon: Copyright,
      content: `
        <h3>Our Intellectual Property</h3>
        <p>The Services, including all software, designs, text, graphics, logos, icons, images, audio, videos, and the selection and arrangement thereof, are owned by ResumeSurge or our licensors and are protected by copyright, trademark, and other intellectual property laws.</p>
        
        <h3>Limited License to You</h3>
        <p>We grant you a limited, non-exclusive, non-transferable, revocable license to:</p>
        <ul>
          <li>Access and use the Services for your personal or internal business purposes</li>
          <li>Create and export resumes and related documents</li>
          <li>Use our templates and tools as intended</li>
        </ul>
        
        <h3>Restrictions</h3>
        <p>You may not:</p>
        <ul>
          <li>Copy, modify, or create derivative works of the Services</li>
          <li>Reverse engineer, decompile, or disassemble the Services</li>
          <li>Remove or alter any copyright, trademark, or other proprietary notices</li>
          <li>Sell, license, sublicense, or distribute the Services</li>
          <li>Use the Services to build a competitive product</li>
        </ul>
        
        <h3>Feedback</h3>
        <p>If you provide feedback or suggestions about the Services, you grant us a perpetual, irrevocable, non-exclusive, royalty-free right to use that feedback for any purpose without compensation to you.</p>
      `
    },
    {
      id: 'prohibited-conduct',
      title: 'Prohibited Conduct',
      icon: XCircle,
      content: `
        <p>You agree not to:</p>
        <ul>
          <li>Use the Services for any illegal purpose or in violation of any laws</li>
          <li>Impersonate any person or entity or misrepresent your affiliation</li>
          <li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>
          <li>Attempt to gain unauthorized access to any part of the Services</li>
          <li>Use any robot, spider, scraper, or other automated means to access the Services</li>
          <li>Bypass or circumvent measures designed to prevent or limit access to any part of the Services</li>
          <li>Collect or harvest any information about other users</li>
          <li>Upload or transmit viruses, malware, or other malicious code</li>
          <li>Engage in any activity that could disable, overburden, or impair the Services</li>
          <li>Use the Services to send unsolicited communications or advertisements</li>
        </ul>
      `
    },
    {
      id: 'disclaimers',
      title: 'Disclaimers and Limitations',
      icon: AlertTriangle,
      content: `
        <h3>No Guarantees</h3>
        <p>While we strive to provide high-quality services, we cannot guarantee:</p>
        <ul>
          <li>That using our Services will result in employment or interviews</li>
          <li>The accuracy or effectiveness of AI-generated content</li>
          <li>That the Services will be error-free or uninterrupted</li>
          <li>That any defects will be corrected</li>
        </ul>
        
        <h3>Disclaimer of Warranties</h3>
        <p>THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.</p>
        
        <h3>Limitation of Liability</h3>
        <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL RESUMESURGE, ITS AFFILIATES, DIRECTORS, EMPLOYEES, OR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, THAT RESULT FROM THE USE OF, OR INABILITY TO USE, THE SERVICES.</p>
        
        <h3>Exclusions</h3>
        <p>Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of liability for certain types of damages. Accordingly, some of the above limitations may not apply to you.</p>
      `
    },
    {
      id: 'indemnification',
      title: 'Indemnification',
      icon: Shield,
      content: `
        <p>You agree to indemnify, defend, and hold harmless ResumeSurge, its affiliates, officers, directors, employees, consultants, agents, and representatives from any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) that arise from or relate to:</p>
        <ul>
          <li>Your use or misuse of the Services</li>
          <li>Your User Content</li>
          <li>Your violation of these Terms</li>
          <li>Your violation of any rights of another person or entity</li>
          <li>Your conduct in connection with the Services</li>
        </ul>
        
        <p>We reserve the right, at our own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will cooperate with us in asserting any available defenses.</p>
      `
    },
    {
      id: 'termination',
      title: 'Termination',
      icon: XCircle,
      content: `
        <h3>Termination by You</h3>
        <p>You may terminate your account at any time by:</p>
        <ul>
          <li>Following the account deletion process in your account settings</li>
          <li>Contacting our support team at support@resumesurge.com</li>
        </ul>
        
        <h3>Termination by Us</h3>
        <p>We may terminate or suspend your account and access to the Services:</p>
        <ul>
          <li>Immediately, without prior notice or liability, for any reason</li>
          <li>If you breach any of these Terms</li>
          <li>If you fail to pay any fees when due</li>
          <li>Upon request by law enforcement or government agencies</li>
        </ul>
        
        <h3>Effect of Termination</h3>
        <p>Upon termination:</p>
        <ul>
          <li>Your right to use the Services will immediately cease</li>
          <li>We may delete your User Content and account information</li>
          <li>You will remain liable for all amounts due up to the date of termination</li>
          <li>Sections of these Terms that by their nature should survive will remain in effect</li>
        </ul>
      `
    },
    {
      id: 'changes',
      title: 'Changes to Terms',
      icon: Calendar,
      content: `
        <p>We reserve the right to modify these Terms at any time. When we make changes:</p>
        <ul>
          <li>We will update the "Last Updated" date at the top of these Terms</li>
          <li>We will notify you of material changes via email or through the Services</li>
          <li>We may require you to acknowledge and accept the updated Terms to continue using the Services</li>
        </ul>
        
        <p>Your continued use of the Services after the changes take effect constitutes your acceptance of the revised Terms. If you do not agree to the changes, you must stop using the Services and terminate your account.</p>
      `
    },
    {
      id: 'governing-law',
      title: 'Governing Law and Dispute Resolution',
      icon: Globe,
      content: `
        <h3>Governing Law</h3>
        <p>These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.</p>
        
        <h3>Dispute Resolution</h3>
        <p>Any dispute arising from or relating to these Terms or the Services will be resolved as follows:</p>
        <ol>
          <li><strong>Informal Resolution:</strong> We encourage you to contact us first to seek an informal resolution.</li>
          <li><strong>Arbitration:</strong> If informal resolution is unsuccessful, any dispute will be resolved by binding arbitration in San Francisco, California, conducted by a single arbitrator in accordance with the rules of the American Arbitration Association.</li>
          <li><strong>Exceptions:</strong> The arbitration requirement does not apply to claims of intellectual property infringement or claims that qualify for small claims court.</li>
        </ol>
        
        <h3>Class Action Waiver</h3>
        <p>You agree that any proceedings to resolve disputes will be conducted on an individual basis and not in a class, consolidated, or representative action.</p>
        
        <h3>Limitation Period</h3>
        <p>Any claim arising out of or related to these Terms or the Services must be filed within one year after such claim arose, otherwise, the claim is permanently barred.</p>
      `
    },
    {
      id: 'miscellaneous',
      title: 'Miscellaneous',
      icon: Info,
      content: `
        <h3>Entire Agreement</h3>
        <p>These Terms, together with our Privacy Policy and any other agreements expressly incorporated by reference, constitute the entire agreement between you and ResumeSurge concerning the Services.</p>
        
        <h3>Severability</h3>
        <p>If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will continue in full force and effect.</p>
        
        <h3>No Waiver</h3>
        <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of such right or provision. The waiver of any such right or provision will be effective only if in writing and signed by an authorized representative of ResumeSurge.</p>
        
        <h3>Assignment</h3>
        <p>You may not assign or transfer these Terms or your rights under these Terms without our prior written consent. We may assign or transfer these Terms without your consent to any affiliate or in connection with a merger, acquisition, corporate reorganization, or sale of all or substantially all of our assets.</p>
        
        <h3>Force Majeure</h3>
        <p>We will not be liable for any failure or delay in performance resulting from causes beyond our reasonable control, including but not limited to acts of God, natural disasters, pandemic, war, terrorism, riots, civil unrest, government actions, labor disputes, or internet service disruptions.</p>
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
        currentPage="terms"
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
              <FileText className="w-4 h-4 mr-2" />
              Legal Agreement
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Terms of <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Service</span>
            </h1>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Please read these terms carefully before using FixitCV services. By using our platform, you agree to these legally binding terms.
            </p>
            
            <div className={`inline-flex items-center px-4 py-2 rounded-lg ${
              isDarkMode ? 'bg-slate-800 text-gray-300' : 'bg-white text-gray-700 border border-gray-200'
            }`}>
              <Calendar className="w-4 h-4 mr-2" />
              <span>Last updated: {lastUpdated}</span>
            </div>
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

          {/* Terms Sections */}
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
            <h2 className="text-3xl font-bold mb-6">Questions About Our Terms?</h2>
            <p className={`text-xl mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              If you have any questions about our Terms of Service, please contact our legal team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a 
                href="mailto:legal@resumesurge.com"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-5 h-5" />
                <span>legal@FixitCV.com</span>
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

export default TermsOfService;