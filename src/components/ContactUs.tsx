import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  MessageCircle, 
  Users, 
  Headphones, 
  Globe,
  ArrowRight,
  Star,
  Zap
} from 'lucide-react';
import Header from './Header';

interface ContactUsProps {
  isDarkMode?: boolean;
  onNavigate?: (page: 'landing' | 'about' | 'pricing' | 'templates' | 'blog' | 'builder') => void;
  onToggleTheme?: () => void;
}

const ContactUs: React.FC<ContactUsProps> = ({ isDarkMode = false, onNavigate, onToggleTheme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
    priority: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: '',
        priority: 'normal'
      });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      contact: 'support@FixitCV.com',
      action: 'Send Email',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      contact: 'Available 9 AM - 6 PM EST',
      action: 'Start Chat',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      contact: '+1 (555) 123-4567',
      action: 'Call Now',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Headphones,
      title: 'Premium Support',
      description: 'Priority support for Pro users',
      contact: 'Dedicated account manager',
      action: 'Learn More',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const supportCategories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'partnership', label: 'Partnership' }
  ];

  const officeLocations = [
    {
      city: 'Banglore',
      address: '123 Market Street, Suite 400',
      zipCode: 'CA 94105',
      country: 'India',
      timezone: 'IST ',
      isHeadquarters: true
    },
    {
      city: 'New York',
      address: '456 Broadway, Floor 12',
      zipCode: 'NY 10013',
      country: 'United States',
      timezone: 'EST (UTC-5)',
      isHeadquarters: false
    },
    {
      city: 'London',
      address: '789 Oxford Street',
      zipCode: 'W1C 1DX',
      country: 'United Kingdom',
      timezone: 'GMT (UTC+0)',
      isHeadquarters: false
    }
  ];

  const faqs = [
    {
      question: 'How quickly will I receive a response?',
      answer: 'We typically respond to all inquiries within 24 hours during business days. Premium users receive priority support with responses within 4 hours.'
    },
    {
      question: 'Do you offer phone support?',
      answer: 'Yes! Phone support is available Monday-Friday, 9 AM to 6 PM EST. You can also schedule a callback at your convenience.'
    },
    {
      question: 'Can I get help with resume writing?',
      answer: 'Absolutely! Our expert team can provide personalized resume advice, template recommendations, and career guidance.'
    },
    {
      question: 'Is there a knowledge base or help center?',
      answer: 'Yes, we have a comprehensive help center with tutorials, guides, and frequently asked questions to help you get the most out of ResumeSurge.'
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
        currentPage="contact"
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
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
              isDarkMode 
                ? 'bg-blue-900/30 text-blue-300 border border-blue-700/30' 
                : 'bg-blue-100 text-blue-700 border border-blue-200'
            }`}>
              <Headphones className="w-4 h-4 mr-2" />
              24/7 Support Available
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get in <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Have questions about FixitCV? Our expert support team is here to help you succeed in your career journey.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { number: '<4hrs', label: 'Response Time', icon: Clock },
              { number: '24/7', label: 'Support Available', icon: Headphones },
              { number: '98%', label: 'Satisfaction Rate', icon: Star },
              { number: '50+', label: 'Countries Served', icon: Globe }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`text-center p-6 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-slate-900/50 border-slate-700' 
                    : 'bg-white/50 border-gray-200'
                }`}
              >
                <stat.icon className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <div className="text-2xl font-bold mb-1">{stat.number}</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Choose Your Preferred Contact Method</h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              We offer multiple ways to get in touch. Choose the option that works best for you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl ${
                    isDarkMode 
                      ? 'bg-slate-900/50 border-slate-700 hover:border-blue-500/50' 
                      : 'bg-white border-gray-200 hover:border-blue-500/50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                  <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {method.description}
                  </p>
                  <p className="font-medium mb-4">{method.contact}</p>
                  
                  <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    isDarkMode
                      ? 'bg-slate-800 text-white hover:bg-slate-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}>
                    {method.action}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? 'bg-slate-900/50' : 'bg-white/50'
      }`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6">Send Us a Message</h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={`rounded-2xl border p-8 ${
              isDarkMode 
                ? 'bg-slate-900/50 border-slate-700' 
                : 'bg-white border-gray-200'
            }`}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Message Sent Successfully!</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                        isDarkMode 
                          ? 'bg-slate-800 border-slate-700 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                        isDarkMode 
                          ? 'bg-slate-800 border-slate-700 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                        isDarkMode 
                          ? 'bg-slate-800 border-slate-700 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      {supportCategories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                        isDarkMode 
                          ? 'bg-slate-800 border-slate-700 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-slate-800 border-slate-700 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none ${
                      isDarkMode 
                        ? 'bg-slate-800 border-slate-700 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Our Global Offices</h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              We have offices around the world to better serve our global community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-2xl border ${
                  isDarkMode 
                    ? 'bg-slate-900/50 border-slate-700' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{office.city}</h3>
                  {office.isHeadquarters && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      HQ
                    </span>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>{office.address}</p>
                      <p>{office.zipCode}</p>
                      <p>{office.country}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <p>{office.timezone}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? 'bg-slate-900/50' : 'bg-white/50'
      }`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Quick answers to common questions about our support services.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-slate-900/50 border-slate-700' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
            <Zap className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className={`text-xl mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Join thousands of professionals who trust FixitCV for their career success.
            </p>
            <motion.button 
              onClick={() => onNavigate && onNavigate('builder')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-3 mx-auto shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Build Your Resume</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;