import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cookie, 
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
  Settings,
  Eye,
  Target,
  MessageSquare
} from 'lucide-react';
import Header from './Header';

interface CookiePolicyProps {
  isDarkMode?: boolean;
  onNavigate?: (page: 'landing' | 'about' | 'pricing' | 'templates' | 'blog' | 'builder') => void;
  onToggleTheme?: () => void;
}

const CookiePolicy: React.FC<CookiePolicyProps> = ({ isDarkMode = false, onNavigate, onToggleTheme }) => {
  const lastUpdated = "January 15, 2025";
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    performance: true,
    functional: true,
    marketing: false
  });

  const handleCookieToggle = (type: keyof typeof cookiePreferences) => {
    if (type === 'essential') return; // Essential cookies can't be disabled
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const sections = [
    {
      id: 'what-are-cookies',
      title: 'What Are Cookies',
      icon: Cookie,
      content: `
        <p>Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.</p>
        
        <h3>Types of Cookies</h3>
        <ul>
          <li><strong>Session Cookies:</strong> Temporary cookies that are deleted when you close your browser</li>
          <li><strong>Persistent Cookies:</strong> Remain on your device for a specified period</li>
          <li><strong>First-Party Cookies:</strong> Set by the website you are visiting</li>
          <li><strong>Third-Party Cookies:</strong> Set by domains other than the one you are visiting</li>
        </ul>
        
        <h3>How Cookies Work</h3>
        <p>When you visit our website, cookies are stored on your device. When you return to our site, your browser sends these cookies back to us, allowing us to recognize you and remember your preferences.</p>
      `
    },
    {
      id: 'cookies-we-use',
      title: 'Cookies We Use',
      icon: Settings,
      content: `
        <h3>Essential Cookies</h3>
        <p>These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You cannot opt out of these cookies.</p>
        <table class="w-full border-collapse my-4">
          <thead>
            <tr>
              <th class="border p-2 text-left">Cookie Name</th>
              <th class="border p-2 text-left">Purpose</th>
              <th class="border p-2 text-left">Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border p-2">session_id</td>
              <td class="border p-2">Maintains your session state</td>
              <td class="border p-2">Session</td>
            </tr>
            <tr>
              <td class="border p-2">auth_token</td>
              <td class="border p-2">Authenticates your account</td>
              <td class="border p-2">30 days</td>
            </tr>
            <tr>
              <td class="border p-2">csrf_token</td>
              <td class="border p-2">Prevents cross-site request forgery</td>
              <td class="border p-2">Session</td>
            </tr>
          </tbody>
        </table>

        <h3>Performance Cookies</h3>
        <p>These cookies collect information about how you use our website, such as which pages you visit most often. They help us improve how our website works.</p>
        <table class="w-full border-collapse my-4">
          <thead>
            <tr>
              <th class="border p-2 text-left">Cookie Name</th>
              <th class="border p-2 text-left">Purpose</th>
              <th class="border p-2 text-left">Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border p-2">_ga</td>
              <td class="border p-2">Google Analytics - Distinguishes users</td>
              <td class="border p-2">2 years</td>
            </tr>
            <tr>
              <td class="border p-2">_gid</td>
              <td class="border p-2">Google Analytics - Identifies user session</td>
              <td class="border p-2">24 hours</td>
            </tr>
            <tr>
              <td class="border p-2">_gat</td>
              <td class="border p-2">Google Analytics - Throttles request rate</td>
              <td class="border p-2">1 minute</td>
            </tr>
          </tbody>
        </table>

        <h3>Functional Cookies</h3>
        <p>These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.</p>
        <table class="w-full border-collapse my-4">
          <thead>
            <tr>
              <th class="border p-2 text-left">Cookie Name</th>
              <th class="border p-2 text-left">Purpose</th>
              <th class="border p-2 text-left">Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border p-2">user_preferences</td>
              <td class="border p-2">Stores your site preferences</td>
              <td class="border p-2">1 year</td>
            </tr>
            <tr>
              <td class="border p-2">language</td>
              <td class="border p-2">Remembers your language preference</td>
              <td class="border p-2">1 year</td>
            </tr>
            <tr>
              <td class="border p-2">theme</td>
              <td class="border p-2">Stores your theme preference (light/dark)</td>
              <td class="border p-2">1 year</td>
            </tr>
          </tbody>
        </table>

        <h3>Marketing Cookies</h3>
        <p>These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad.</p>
        <table class="w-full border-collapse my-4">
          <thead>
            <tr>
              <th class="border p-2 text-left">Cookie Name</th>
              <th class="border p-2 text-left">Purpose</th>
              <th class="border p-2 text-left">Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border p-2">_fbp</td>
              <td class="border p-2">Facebook Pixel - Identifies browsers for ad delivery</td>
              <td class="border p-2">3 months</td>
            </tr>
            <tr>
              <td class="border p-2">_gcl_au</td>
              <td class="border p-2">Google Adsense - Stores ad click information</td>
              <td class="border p-2">3 months</td>
            </tr>
          </tbody>
        </table>
      `
    },
    {
      id: 'third-party',
      title: 'Third-Party Cookies',
      icon: Globe,
      content: `
        <p>Our website may use third-party services that set their own cookies. These third parties may include:</p>
        
        <h3>Analytics Providers</h3>
        <ul>
          <li><strong>Google Analytics:</strong> Helps us understand how visitors interact with our website</li>
          <li><strong>Hotjar:</strong> Provides heatmaps and session recordings to improve user experience</li>
          <li><strong>Mixpanel:</strong> Tracks user interactions with our application</li>
        </ul>
        
        <h3>Marketing and Advertising</h3>
        <ul>
          <li><strong>Facebook Pixel:</strong> Measures the effectiveness of advertising and understand user actions</li>
          <li><strong>Google Ads:</strong> Helps deliver relevant advertisements</li>
          <li><strong>LinkedIn Insight Tag:</strong> Enables detailed campaign reporting and insights</li>
        </ul>
        
        <h3>Functionality</h3>
        <ul>
          <li><strong>Intercom:</strong> Powers our customer messaging and support chat</li>
          <li><strong>Stripe:</strong> Processes payments securely</li>
          <li><strong>Cloudflare:</strong> Improves website performance and security</li>
        </ul>
        
        <p>We do not control these third-party cookies. Please refer to the respective privacy policies of these services for more information about how they use cookies.</p>
      `
    },
    {
      id: 'managing-cookies',
      title: 'Managing Your Cookies',
      icon: Settings,
      content: `
        <h3>Browser Settings</h3>
        <p>You can control cookies through your browser settings. Here's how to manage cookies in common browsers:</p>
        <ul>
          <li><strong>Chrome:</strong> Settings > Privacy and security > Cookies and other site data</li>
          <li><strong>Firefox:</strong> Options > Privacy & Security > Cookies and Site Data</li>
          <li><strong>Safari:</strong> Preferences > Privacy > Cookies and website data</li>
          <li><strong>Edge:</strong> Settings > Cookies and site permissions > Cookies and site data</li>
        </ul>
        
        <h3>Our Cookie Preferences Tool</h3>
        <p>You can use our cookie preferences tool to manage your cookie settings for our website. This allows you to:</p>
        <ul>
          <li>View all cookies we use</li>
          <li>Enable or disable non-essential cookies</li>
          <li>Update your preferences at any time</li>
        </ul>
        
        <h3>Do Not Track</h3>
        <p>Some browsers have a "Do Not Track" feature that signals to websites that you don't want your online activities tracked. Due to the lack of a common understanding of how to interpret this signal, our website currently does not respond to Do Not Track signals.</p>
      `
    },
    {
      id: 'updates',
      title: 'Updates to This Policy',
      icon: Calendar,
      content: `
        <p>We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will be posted on this page with an updated "Last Updated" date.</p>
        
        <p>For significant changes, we will provide a more prominent notice, which may include:</p>
        <ul>
          <li>Email notifications to registered users</li>
          <li>Banner notifications on our website</li>
          <li>Pop-up notifications when you next visit our site</li>
        </ul>
        
        <p>We encourage you to review this Cookie Policy periodically to stay informed about our use of cookies.</p>
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
        currentPage="cookies"
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
              <Cookie className="w-4 h-4 mr-2" />
              Transparency
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Cookie <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Policy</span>
            </h1>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              This policy explains how we use cookies and similar technologies to recognize you when you visit our website.
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

      {/* Cookie Preferences */}
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
            <h2 className="text-xl font-bold mb-6">Manage Cookie Preferences</h2>
            <p className="mb-6">You can customize which cookies you allow us to use. Essential cookies cannot be disabled as they are necessary for the website to function properly.</p>
            
            <div className="space-y-4">
              {[
                { 
                  id: 'essential', 
                  label: 'Essential Cookies', 
                  description: 'Necessary for the website to function properly',
                  icon: Shield
                },
                { 
                  id: 'performance', 
                  label: 'Performance Cookies', 
                  description: 'Help us understand how visitors interact with our website',
                  icon: Target
                },
                { 
                  id: 'functional', 
                  label: 'Functional Cookies', 
                  description: 'Enable enhanced functionality and personalization',
                  icon: Settings
                },
                { 
                  id: 'marketing', 
                  label: 'Marketing Cookies', 
                  description: 'Used to deliver relevant advertisements and track campaign performance',
                  icon: Eye
                }
              ].map(cookie => {
                const type = cookie.id as keyof typeof cookiePreferences;
                const isDisabled = type === 'essential';
                return (
                  <div 
                    key={cookie.id}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-slate-800 border-slate-700' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isDarkMode ? 'bg-slate-700' : 'bg-white'
                      }`}>
                        <cookie.icon className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">{cookie.label}</h3>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {cookie.description}
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={cookiePreferences[type]}
                        disabled={isDisabled}
                        onChange={() => handleCookieToggle(type)}
                      />
                      <div className={`w-11 h-6 rounded-full peer ${
                        isDisabled 
                          ? isDarkMode ? 'bg-slate-600' : 'bg-gray-300'
                          : cookiePreferences[type]
                            ? 'bg-blue-600'
                            : isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
                      } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                    </label>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </motion.div>

          {/* Table of Contents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
            <MessageSquare className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Questions About Cookies?</h2>
            <p className={`text-xl mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              If you have any questions about our use of cookies, please contact our privacy team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a 
                href="mailto:privacy@resumesurge.com"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-5 h-5" />
                <span>privacy@XFixitCV.com</span>
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

export default CookiePolicy;