import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Users, 
  Lightbulb, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  Award, 
  Briefcase, 
  MessageCircle,
  Search,
  Filter,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import Header from './Header';

interface CareerTipsProps {
  isDarkMode?: boolean;
  onNavigate?: (page: 'landing' | 'about' | 'pricing' | 'templates' | 'blog' | 'builder') => void;
  onToggleTheme?: () => void;
}

const CareerTips: React.FC<CareerTipsProps> = ({ isDarkMode = false, onNavigate, onToggleTheme }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Tips', icon: BookOpen },
    { id: 'resume', label: 'Resume Writing', icon: Briefcase },
    { id: 'interview', label: 'Interview Prep', icon: MessageCircle },
    { id: 'networking', label: 'Networking', icon: Users },
    { id: 'career-growth', label: 'Career Growth', icon: TrendingUp },
    { id: 'job-search', label: 'Job Search', icon: Target }
  ];

  const careerTips = [
    {
      id: '1',
      title: 'How to Write a Compelling Professional Summary',
      category: 'resume',
      readTime: '5 min read',
      difficulty: 'Beginner',
      excerpt: 'Learn to craft a professional summary that captures attention and showcases your value proposition.',
      content: `
        <h3>What is a Professional Summary?</h3>
        <p>A professional summary is a brief statement at the top of your resume that highlights your most relevant qualifications, skills, and career achievements. It's your elevator pitch in written form.</p>
        
        <h3>Key Elements of an Effective Summary</h3>
        <ul>
          <li><strong>Length:</strong> Keep it to 3-4 sentences or 50-100 words</li>
          <li><strong>Focus:</strong> Highlight your most relevant skills and achievements</li>
          <li><strong>Keywords:</strong> Include industry-specific terms from the job description</li>
          <li><strong>Value Proposition:</strong> Show what you can offer the employer</li>
        </ul>
        
        <h3>Formula for Success</h3>
        <p>Follow this proven formula: [Your Title] with [X years] of experience in [Industry/Field]. Proven track record of [Key Achievement]. Skilled in [Relevant Skills]. Seeking to [Career Goal] at [Type of Company].</p>
        
        <h3>Example</h3>
        <blockquote>"Results-driven Marketing Manager with 7+ years of experience in digital marketing and brand management. Proven track record of increasing brand awareness by 150% and driving $2M+ in revenue growth. Skilled in SEO, content marketing, and data analytics. Seeking to leverage expertise in growth marketing at a fast-paced tech startup."</blockquote>
      `,
      tags: ['Resume Writing', 'Professional Summary', 'Career Branding'],
      author: 'Sarah Johnson',
      authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      publishDate: '2025-01-15'
    },
    {
      id: '2',
      title: 'Mastering the STAR Method for Interview Success',
      category: 'interview',
      readTime: '7 min read',
      difficulty: 'Intermediate',
      excerpt: 'Use the STAR method to structure compelling answers that showcase your achievements and problem-solving skills.',
      content: `
        <h3>What is the STAR Method?</h3>
        <p>STAR stands for Situation, Task, Action, and Result. It's a structured approach to answering behavioral interview questions that helps you provide specific, compelling examples of your experience.</p>
        
        <h3>Breaking Down STAR</h3>
        <ul>
          <li><strong>Situation:</strong> Set the context and background</li>
          <li><strong>Task:</strong> Describe your responsibility or challenge</li>
          <li><strong>Action:</strong> Explain the specific steps you took</li>
          <li><strong>Result:</strong> Share the outcome and impact</li>
        </ul>
        
        <h3>Common Behavioral Questions</h3>
        <ul>
          <li>"Tell me about a time you faced a difficult challenge"</li>
          <li>"Describe a situation where you had to work with a difficult team member"</li>
          <li>"Give an example of when you went above and beyond"</li>
          <li>"Tell me about a time you failed and what you learned"</li>
        </ul>
        
        <h3>STAR Example</h3>
        <p><strong>Question:</strong> "Tell me about a time you improved a process."</p>
        <p><strong>Situation:</strong> "At my previous company, our customer onboarding process was taking 2-3 weeks and causing frustration."</p>
        <p><strong>Task:</strong> "As the operations manager, I was tasked with streamlining the process to improve customer satisfaction."</p>
        <p><strong>Action:</strong> "I analyzed each step, identified bottlenecks, implemented automation tools, and created a standardized checklist."</p>
        <p><strong>Result:</strong> "We reduced onboarding time to 3-5 days, increased customer satisfaction scores by 40%, and saved 15 hours per week."</p>
      `,
      tags: ['Interview Prep', 'STAR Method', 'Behavioral Questions'],
      author: 'Michael Rodriguez',
      authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      publishDate: '2025-01-12'
    },
    {
      id: '3',
      title: 'Building Your Professional Network: A Strategic Approach',
      category: 'networking',
      readTime: '10 min read',
      difficulty: 'Intermediate',
      excerpt: 'Develop meaningful professional relationships that can accelerate your career growth and open new opportunities.',
      content: `
        <h3>Why Networking Matters</h3>
        <p>Studies show that 70-80% of jobs are never publicly advertised. Building a strong professional network gives you access to the hidden job market and valuable career insights.</p>
        
        <h3>Networking Strategies</h3>
        <ul>
          <li><strong>Quality over Quantity:</strong> Focus on building meaningful relationships</li>
          <li><strong>Give Before You Receive:</strong> Offer help and value to others first</li>
          <li><strong>Be Authentic:</strong> Build genuine connections based on shared interests</li>
          <li><strong>Follow Up:</strong> Maintain relationships with regular, valuable touchpoints</li>
        </ul>
        
        <h3>Online Networking</h3>
        <ul>
          <li>Optimize your LinkedIn profile with a professional photo and compelling headline</li>
          <li>Share valuable content and engage with others' posts</li>
          <li>Join industry-specific groups and participate in discussions</li>
          <li>Send personalized connection requests with context</li>
        </ul>
        
        <h3>Offline Networking</h3>
        <ul>
          <li>Attend industry conferences, meetups, and professional events</li>
          <li>Join professional associations in your field</li>
          <li>Participate in alumni networks from your school</li>
          <li>Volunteer for causes you care about</li>
        </ul>
        
        <h3>Networking Follow-Up Template</h3>
        <blockquote>"Hi [Name], It was great meeting you at [Event] yesterday. I really enjoyed our conversation about [Topic]. I'd love to continue our discussion over coffee sometime. Would you be available for a brief chat next week? Best regards, [Your Name]"</blockquote>
      `,
      tags: ['Networking', 'Professional Relationships', 'Career Growth'],
      author: 'Emily Chen',
      authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      publishDate: '2025-01-10'
    },
    {
      id: '4',
      title: 'Negotiating Your Salary: Research, Strategy, and Tactics',
      category: 'career-growth',
      readTime: '12 min read',
      difficulty: 'Advanced',
      excerpt: 'Learn proven strategies to research, prepare for, and successfully negotiate a higher salary.',
      content: `
        <h3>The Importance of Salary Negotiation</h3>
        <p>Salary negotiation can significantly impact your lifetime earnings. A successful negotiation early in your career compounds over time, potentially adding hundreds of thousands to your total compensation.</p>
        
        <h3>Research Phase</h3>
        <ul>
          <li>Use salary comparison websites (Glassdoor, PayScale, Salary.com)</li>
          <li>Network with professionals in similar roles</li>
          <li>Consider location, company size, and industry factors</li>
          <li>Research the company's financial health and compensation philosophy</li>
        </ul>
        
        <h3>Preparation Strategies</h3>
        <ul>
          <li><strong>Document Your Value:</strong> List achievements, metrics, and contributions</li>
          <li><strong>Practice Your Pitch:</strong> Rehearse your negotiation conversation</li>
          <li><strong>Consider Total Compensation:</strong> Look beyond base salary</li>
          <li><strong>Set Your Range:</strong> Know your minimum, target, and stretch goals</li>
        </ul>
        
        <h3>Negotiation Tactics</h3>
        <ul>
          <li>Let them make the first offer when possible</li>
          <li>Express enthusiasm for the role before discussing compensation</li>
          <li>Use data to support your request</li>
          <li>Be prepared to negotiate non-salary benefits</li>
          <li>Give them time to consider your request</li>
        </ul>
        
        <h3>Sample Negotiation Script</h3>
        <blockquote>"I'm very excited about this opportunity and believe I can make a significant impact. Based on my research and experience, the market rate for this position is $X-Y. Given my [specific qualifications/achievements], I was hoping we could discuss a salary of $Z. Is there flexibility in the compensation package?"</blockquote>
      `,
      tags: ['Salary Negotiation', 'Career Growth', 'Compensation'],
      author: 'David Kim',
      authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      publishDate: '2025-01-08'
    },
    {
      id: '5',
      title: 'Optimizing Your Job Search Strategy for 2025',
      category: 'job-search',
      readTime: '8 min read',
      difficulty: 'Beginner',
      excerpt: 'Develop a systematic approach to job searching that maximizes your chances of landing interviews.',
      content: `
        <h3>Modern Job Search Landscape</h3>
        <p>The job market has evolved significantly. Today's successful job seekers need a multi-channel approach that combines traditional methods with modern digital strategies.</p>
        
        <h3>Job Search Channels</h3>
        <ul>
          <li><strong>Company Websites (25%):</strong> Apply directly to companies you want to work for</li>
          <li><strong>Networking (70%):</strong> Leverage professional relationships and referrals</li>
          <li><strong>Job Boards (5%):</strong> Use as a research tool and backup option</li>
          <li><strong>Recruiters:</strong> Build relationships with industry recruiters</li>
        </ul>
        
        <h3>Creating Your Job Search System</h3>
        <ul>
          <li>Set daily and weekly job search goals</li>
          <li>Create a target company list (20-30 companies)</li>
          <li>Track applications, interviews, and follow-ups</li>
          <li>Schedule regular networking activities</li>
          <li>Set aside time for skill development</li>
        </ul>
        
        <h3>Application Strategy</h3>
        <ul>
          <li>Customize your resume for each application</li>
          <li>Write compelling cover letters that tell a story</li>
          <li>Follow up appropriately after applications</li>
          <li>Prepare for different types of interviews</li>
        </ul>
        
        <h3>Staying Motivated</h3>
        <ul>
          <li>Set realistic expectations (job searches take 3-6 months on average)</li>
          <li>Celebrate small wins and milestones</li>
          <li>Maintain a routine and treat job searching like a job</li>
          <li>Take care of your mental health and well-being</li>
        </ul>
      `,
      tags: ['Job Search', 'Career Strategy', 'Job Applications'],
      author: 'Rachel Davis',
      authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      publishDate: '2025-01-05'
    },
    {
      id: '6',
      title: 'Personal Branding: Standing Out in a Competitive Market',
      category: 'career-growth',
      readTime: '9 min read',
      difficulty: 'Intermediate',
      excerpt: 'Build a strong personal brand that differentiates you and attracts the right career opportunities.',
      content: `
        <h3>What is Personal Branding?</h3>
        <p>Personal branding is the practice of marketing yourself and your career as a brand. It's about defining and communicating your unique value proposition to your target audience.</p>
        
        <h3>Elements of Personal Branding</h3>
        <ul>
          <li><strong>Brand Identity:</strong> Your values, personality, and unique strengths</li>
          <li><strong>Brand Message:</strong> What you stand for and what you offer</li>
          <li><strong>Brand Presence:</strong> How you show up online and offline</li>
          <li><strong>Brand Reputation:</strong> What others say about you</li>
        </ul>
        
        <h3>Building Your Online Presence</h3>
        <ul>
          <li>Create a professional LinkedIn profile with a compelling headline</li>
          <li>Share valuable content related to your industry</li>
          <li>Build a personal website or portfolio</li>
          <li>Maintain consistent messaging across all platforms</li>
        </ul>
        
        <h3>Content Strategy</h3>
        <ul>
          <li>Share industry insights and trends</li>
          <li>Write about your professional experiences and lessons learned</li>
          <li>Comment thoughtfully on others' content</li>
          <li>Showcase your work and achievements</li>
        </ul>
        
        <h3>Offline Brand Building</h3>
        <ul>
          <li>Speak at industry events and conferences</li>
          <li>Volunteer for professional organizations</li>
          <li>Mentor others in your field</li>
          <li>Consistently deliver high-quality work</li>
        </ul>
      `,
      tags: ['Personal Branding', 'Professional Development', 'Online Presence'],
      author: 'Alex Thompson',
      authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      publishDate: '2025-01-03'
    }
  ];

  const filteredTips = careerTips.filter(tip => {
    const categoryMatch = selectedCategory === 'all' || tip.category === selectedCategory;
    const searchMatch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       tip.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       tip.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return categoryMatch && searchMatch;
  });

  const toggleTip = (tipId: string) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
        currentPage="career-tips"
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
              <Lightbulb className="w-4 h-4 mr-2" />
              Career Development
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Career <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Tips & Strategies</span>
            </h1>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Expert advice and proven strategies to accelerate your career growth and land your dream job.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search career tips..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : isDarkMode
                          ? 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Career Tips */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {filteredTips.map((tip, index) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isDarkMode 
                    ? 'bg-slate-900/50 border-slate-700 hover:border-blue-500/50' 
                    : 'bg-white border-gray-200 hover:border-blue-500/50 hover:shadow-lg'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tip.difficulty)}`}>
                          {tip.difficulty}
                        </span>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{tip.readTime}</span>
                        </div>
                      </div>
                      
                      <h3 className={`text-xl font-bold mb-3 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {tip.title}
                      </h3>
                      
                      <p className={`text-base leading-relaxed mb-4 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {tip.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={tip.authorImage}
                            alt={tip.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <div className="text-sm font-medium">{tip.author}</div>
                            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {tip.publishDate}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleTip(tip.id)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                            isDarkMode
                              ? 'bg-slate-800 text-white hover:bg-slate-700'
                              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}
                        >
                          <span>{expandedTip === tip.id ? 'Collapse' : 'Read More'}</span>
                          {expandedTip === tip.id ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedTip === tip.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mt-6 pt-6 border-t ${
                        isDarkMode ? 'border-slate-700' : 'border-gray-200'
                      }`}
                    >
                      <div 
                        className={`prose max-w-none ${
                          isDarkMode ? 'prose-invert' : ''
                        }`}
                        dangerouslySetInnerHTML={{ __html: tip.content }}
                      />
                      
                      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-700">
                        <div className="flex flex-wrap gap-2">
                          {tip.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                isDarkMode 
                                  ? 'bg-slate-800 text-gray-300' 
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredTips.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                isDarkMode ? 'bg-slate-800' : 'bg-gray-200'
              }`}>
                <Search className={`w-8 h-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <h3 className="text-lg font-medium mb-2">No tips found</h3>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Try adjusting your search terms or category filter
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
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
            <Award className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Ready to Accelerate Your Career?</h2>
            <p className={`text-xl mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Start building your professional resume with our AI-powered tools and expert templates.
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

export default CareerTips;