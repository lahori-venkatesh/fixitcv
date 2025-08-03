import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Tag, 
  TrendingUp,
  BookOpen,
  Star,
  Share2,
  Bookmark,
  Eye,
  MessageCircle
} from 'lucide-react';
import Header from './Header';

interface BlogProps {
  isDarkMode?: boolean;
  onNavigate?: (page: 'landing' | 'about' | 'pricing' | 'templates' | 'blog' | 'builder') => void;
  onToggleTheme?: () => void;
}

const Blog: React.FC<BlogProps> = ({ isDarkMode = false, onNavigate, onToggleTheme }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Posts', count: 24 },
    { id: 'career-tips', label: 'Career Tips', count: 8 },
    { id: 'resume-writing', label: 'Resume Writing', count: 6 },
    { id: 'interview-prep', label: 'Interview Prep', count: 5 },
    { id: 'industry-insights', label: 'Industry Insights', count: 3 },
    { id: 'job-search', label: 'Job Search', count: 2 }
  ];

  const featuredPost = {
    id: 1,
    title: "The Ultimate Guide to ATS-Optimized Resumes in 2025",
    excerpt: "Learn how to create resumes that pass through Applicant Tracking Systems and land you more interviews. Our comprehensive guide covers everything from keyword optimization to formatting best practices.",
    author: "Sarah Johnson",
    authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    date: "January 15, 2025",
    readTime: "12 min read",
    category: "resume-writing",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    views: "15.2K",
    comments: 89,
    featured: true
  };

  const blogPosts = [
    {
      id: 2,
      title: "10 Common Resume Mistakes That Cost You Job Interviews",
      excerpt: "Avoid these critical errors that hiring managers see every day. From formatting issues to content mistakes, we break down what not to do.",
      author: "Michael Chen",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      date: "January 12, 2025",
      readTime: "8 min read",
      category: "resume-writing",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
      views: "8.7K",
      comments: 45
    },
    {
      id: 3,
      title: "How to Negotiate Your Salary: A Complete Guide",
      excerpt: "Master the art of salary negotiation with proven strategies that help you get the compensation you deserve.",
      author: "Emily Rodriguez",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      date: "January 10, 2025",
      readTime: "15 min read",
      category: "career-tips",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop",
      views: "12.3K",
      comments: 67
    },
    {
      id: 4,
      title: "Remote Work Resume: How to Showcase Virtual Experience",
      excerpt: "Learn how to effectively highlight your remote work experience and skills that employers value in the new work landscape.",
      author: "David Kim",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      date: "January 8, 2025",
      readTime: "10 min read",
      category: "resume-writing",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=250&fit=crop",
      views: "9.1K",
      comments: 34
    },
    {
      id: 5,
      title: "Interview Preparation: 50 Questions You Should Be Ready For",
      excerpt: "Comprehensive list of interview questions with sample answers to help you prepare for any job interview.",
      author: "Jessica Williams",
      authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      date: "January 5, 2025",
      readTime: "20 min read",
      category: "interview-prep",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      views: "18.5K",
      comments: 92
    },
    {
      id: 6,
      title: "Tech Industry Resume Trends for 2025",
      excerpt: "Stay ahead of the curve with the latest resume trends specifically for technology professionals and software engineers.",
      author: "Alex Thompson",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      date: "January 3, 2025",
      readTime: "12 min read",
      category: "industry-insights",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop",
      views: "11.8K",
      comments: 56
    },
    {
      id: 7,
      title: "Building a Personal Brand Through Your Resume",
      excerpt: "Learn how to infuse your personal brand into your resume to stand out from other candidates and make a lasting impression.",
      author: "Rachel Davis",
      authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      date: "December 30, 2024",
      readTime: "14 min read",
      category: "career-tips",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
      views: "7.2K",
      comments: 28
    }
  ];

  const filteredPosts = blogPosts.filter(post => 
    selectedCategory === 'all' || post.category === selectedCategory
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-white text-gray-900'
    }`}>
      {/* Header */}
      <Header 
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        onNavigate={onNavigate}
        currentPage="blog"
      />

      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Career Insights & Advice
            </h1>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover expert tips, industry trends, and practical advice to elevate your career and job search.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center space-x-2 mb-6">
              <Star className="w-5 h-5 text-blue-500" />
              <span className={`text-sm font-semibold ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Featured Article
              </span>
            </div>
            <motion.div 
              className={`rounded-xl overflow-hidden border shadow-md ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}
              whileHover={{ scale: 1.01 }}
            >
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="aspect-[3/2] lg:aspect-auto">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                      {categories.find(c => c.id === featuredPost.category)?.label}
                    </span>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{featuredPost.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{featuredPost.comments}</span>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-2xl font-semibold mb-3 leading-tight">{featuredPost.title}</h2>
                  <p className={`text-base mb-6 leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={featuredPost.authorImage}
                        alt={featuredPost.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-sm">{featuredPost.author}</div>
                        <div className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {featuredPost.date} • {featuredPost.readTime}
                        </div>
                      </div>
                    </div>
                    <motion.button 
                      className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 hover:from-blue-700 hover:to-blue-900 shadow-md"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                Browse by Category
              </h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {filteredPosts.length} Articles Available
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : isDarkMode
                        ? 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{category.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : isDarkMode
                        ? 'bg-gray-700 text-gray-400'
                        : 'bg-gray-100 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`group cursor-pointer rounded-xl border shadow-sm transition-all duration-300 hover:shadow-md ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 hover:border-blue-500' 
                    : 'bg-white border-gray-200 hover:border-blue-500'
                }`}
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {categories.find(c => c.id === post.category)?.label}
                    </span>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className={`text-sm mb-4 leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={post.authorImage}
                        alt={post.author}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium">{post.author}</div>
                        <div className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {post.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.button 
                        className={`p-2 rounded-lg transition-colors ${
                          isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Bookmark className="w-4 h-4" />
                      </motion.button>
                      <motion.button 
                        className={`p-2 rounded-lg transition-colors ${
                          isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Share2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="text-center mt-12">
            <motion.button 
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-lg font-medium text-base hover:from-blue-700 hover:to-blue-900 shadow-md transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Load More Articles
            </motion.button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-700 ${
        isDarkMode ? 'bg-gray-900/30' : 'bg-white'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`p-10 rounded-xl border shadow-md ${
              isDarkMode 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
            <p className={`text-lg mb-6 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Subscribe to receive weekly career advice and industry insights directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                }`}
              />
              <motion.button 
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg font-medium text-base hover:from-blue-700 hover:to-blue-900 shadow-md transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;