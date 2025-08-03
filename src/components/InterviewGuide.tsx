import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  CheckCircle, 
  Clock, 
  Star, 
  ArrowRight, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX,
  ChevronDown,
  ChevronRight,
  Lightbulb,
  Target,
  Users,
  Briefcase,
  Award,
  AlertCircle
} from 'lucide-react';
import Header from './Header';

interface InterviewGuideProps {
  isDarkMode?: boolean;
  onNavigate?: (page: 'landing' | 'about' | 'pricing' | 'templates' | 'blog' | 'builder') => void;
  onToggleTheme?: () => void;
}

const InterviewGuide: React.FC<InterviewGuideProps> = ({ isDarkMode = false, onNavigate, onToggleTheme }) => {
  const [selectedCategory, setSelectedCategory] = useState('behavioral');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const categories = [
    { id: 'behavioral', label: 'Behavioral Questions', icon: Users, count: 15 },
    { id: 'technical', label: 'Technical Questions', icon: Briefcase, count: 12 },
    { id: 'situational', label: 'Situational Questions', icon: Target, count: 10 },
    { id: 'company', label: 'Company-Specific', icon: Award, count: 8 }
  ];

  const interviewQuestions = {
    behavioral: [
      {
        id: 'b1',
        question: 'Tell me about yourself.',
        category: 'behavioral',
        difficulty: 'Easy',
        tips: [
          'Keep it professional and relevant to the role',
          'Follow the present-past-future structure',
          'Highlight key achievements and skills',
          'End with why you\'re interested in this position'
        ],
        sampleAnswer: `"I'm a software engineer with 5 years of experience building scalable web applications. Currently, I lead a team of 4 developers at TechCorp, where I've helped increase our deployment frequency by 300% through implementing CI/CD pipelines. Previously, I worked at StartupXYZ where I built their core product from scratch, serving over 100K users. I'm passionate about clean code and mentoring junior developers. I'm excited about this opportunity because it would allow me to work on cutting-edge AI technologies while leading a larger engineering team."`,
        followUp: [
          'What motivates you in your work?',
          'How do you stay current with technology trends?'
        ]
      },
      {
        id: 'b2',
        question: 'Describe a time when you faced a significant challenge at work.',
        category: 'behavioral',
        difficulty: 'Medium',
        tips: [
          'Use the STAR method (Situation, Task, Action, Result)',
          'Choose a challenge that shows problem-solving skills',
          'Focus on your actions and the positive outcome',
          'Show what you learned from the experience'
        ],
        sampleAnswer: `"At my previous company, we had a critical system outage that affected 50% of our users during peak hours. As the lead engineer, I needed to quickly identify the root cause and restore service. I assembled a cross-functional team, implemented our incident response protocol, and discovered the issue was caused by a database connection pool exhaustion. I implemented a temporary fix within 2 hours and a permanent solution the next day. This experience taught me the importance of monitoring and led me to implement better alerting systems that prevented similar issues."`,
        followUp: [
          'How do you handle stress in high-pressure situations?',
          'What would you do differently if faced with a similar challenge?'
        ]
      },
      {
        id: 'b3',
        question: 'Tell me about a time you had to work with a difficult team member.',
        category: 'behavioral',
        difficulty: 'Medium',
        tips: [
          'Focus on your communication and conflict resolution skills',
          'Show empathy and understanding',
          'Highlight the positive outcome',
          'Avoid speaking negatively about the person'
        ],
        sampleAnswer: `"I once worked with a colleague who was very resistant to code reviews and often pushed changes without following our team processes. Instead of escalating immediately, I scheduled a one-on-one conversation to understand their perspective. I learned they felt the review process was slowing them down due to tight deadlines. Together, we developed a streamlined review process for urgent fixes while maintaining quality standards for regular features. This improved our team dynamics and actually reduced bugs by 25%."`,
        followUp: [
          'How do you handle disagreements with team members?',
          'What\'s your approach to giving constructive feedback?'
        ]
      }
    ],
    technical: [
      {
        id: 't1',
        question: 'Explain the difference between SQL and NoSQL databases.',
        category: 'technical',
        difficulty: 'Medium',
        tips: [
          'Cover the fundamental differences in data structure',
          'Mention use cases for each type',
          'Discuss scalability and consistency trade-offs',
          'Give specific examples of each type'
        ],
        sampleAnswer: `"SQL databases use structured, tabular data with predefined schemas and support ACID transactions. They're ideal for applications requiring strong consistency, like financial systems. Examples include PostgreSQL and MySQL. NoSQL databases offer flexible schemas and horizontal scalability, making them suitable for big data and real-time applications. They include document stores (MongoDB), key-value stores (Redis), column-family (Cassandra), and graph databases (Neo4j). The choice depends on your data structure, scalability needs, and consistency requirements."`,
        followUp: [
          'When would you choose one over the other?',
          'How do you handle data consistency in NoSQL systems?'
        ]
      },
      {
        id: 't2',
        question: 'How would you optimize a slow-performing web application?',
        category: 'technical',
        difficulty: 'Hard',
        tips: [
          'Start with identifying the bottleneck',
          'Cover both frontend and backend optimizations',
          'Mention monitoring and measurement tools',
          'Discuss caching strategies'
        ],
        sampleAnswer: `"I'd start by identifying the bottleneck using profiling tools like Chrome DevTools for frontend and APM tools like New Relic for backend. Common optimizations include: Frontend - code splitting, lazy loading, image optimization, CDN usage; Backend - database query optimization, caching (Redis/Memcached), connection pooling; Infrastructure - load balancing, auto-scaling, database indexing. I'd implement changes incrementally and measure performance improvements to ensure each optimization provides value."`,
        followUp: [
          'What metrics would you track to measure performance?',
          'How do you balance performance with maintainability?'
        ]
      }
    ],
    situational: [
      {
        id: 's1',
        question: 'How would you handle a situation where you disagree with your manager\'s technical decision?',
        category: 'situational',
        difficulty: 'Medium',
        tips: [
          'Show respect for hierarchy while advocating for your position',
          'Emphasize data-driven decision making',
          'Demonstrate willingness to compromise',
          'Focus on the business impact'
        ],
        sampleAnswer: `"I would first ensure I fully understand their reasoning by asking clarifying questions. Then I'd prepare a well-researched proposal outlining my concerns, including potential risks, alternative solutions, and business impact. I'd request a private meeting to discuss this professionally, presenting data and examples to support my position. If they still prefer their approach, I'd implement it while documenting my concerns. Ultimately, I respect that managers have broader context and accountability for decisions."`,
        followUp: [
          'How do you handle situations where you\'re overruled?',
          'What if the decision leads to problems you predicted?'
        ]
      }
    ],
    company: [
      {
        id: 'c1',
        question: 'Why do you want to work for our company?',
        category: 'company',
        difficulty: 'Easy',
        tips: [
          'Research the company\'s mission, values, and recent news',
          'Connect your career goals with the company\'s direction',
          'Mention specific products, services, or initiatives',
          'Show genuine enthusiasm and interest'
        ],
        sampleAnswer: `"I'm excited about your company's mission to democratize AI technology. Your recent launch of the developer-friendly ML platform aligns perfectly with my passion for making complex technology accessible. I've been following your engineering blog and am impressed by your commitment to open-source contributions and technical excellence. The opportunity to work on products that directly impact millions of developers while being part of a team that values innovation and continuous learning is exactly what I'm looking for in my next role."`,
        followUp: [
          'What do you know about our recent product launches?',
          'How do you see yourself contributing to our mission?'
        ]
      }
    ]
  };

  const allQuestions = Object.values(interviewQuestions).flat();
  const currentCategoryQuestions = interviewQuestions[selectedCategory as keyof typeof interviewQuestions] || [];

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  const startPracticeMode = () => {
    setPracticeMode(true);
    setCurrentQuestionIndex(0);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentCategoryQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setRecordingTime(0);
      // Start timer
      const timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      // Store timer reference to clear it later
      (window as any).recordingTimer = timer;
    } else {
      // Stop timer
      if ((window as any).recordingTimer) {
        clearInterval((window as any).recordingTimer);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
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
        currentPage="interview-guide"
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
              <MessageCircle className="w-4 h-4 mr-2" />
              Interview Preparation
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Interview <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Success Guide</span>
            </h1>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Master the most common interview questions with expert answers, practice tools, and proven strategies.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
          >
            {[
              { number: '50+', label: 'Interview Questions', icon: MessageCircle },
              { number: '4', label: 'Question Categories', icon: Target },
              { number: '95%', label: 'Success Rate', icon: Star },
              { number: '10min', label: 'Practice Sessions', icon: Clock }
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

      {/* Practice Mode */}
      {practiceMode ? (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl border p-8 ${
                isDarkMode 
                  ? 'bg-slate-900/50 border-slate-700' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Practice Mode</h2>
                <button
                  onClick={() => setPracticeMode(false)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isDarkMode
                      ? 'bg-slate-800 text-white hover:bg-slate-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Exit Practice
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">
                    Question {currentQuestionIndex + 1} of {currentCategoryQuestions.length}
                  </span>
                  <div className="w-48 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestionIndex + 1) / currentCategoryQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-6">
                  {currentCategoryQuestions[currentQuestionIndex]?.question}
                </h3>

                {/* Recording Controls */}
                <div className={`p-6 rounded-xl border mb-6 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Record Your Answer</h4>
                    <div className="text-lg font-mono">
                      {formatTime(recordingTime)}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={toggleRecording}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                        isRecording
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isRecording ? (
                        <>
                          <Pause className="w-5 h-5" />
                          <span>Stop Recording</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" />
                          <span>Start Recording</span>
                        </>
                      )}
                    </button>
                    
                    {recordingTime > 0 && (
                      <button
                        onClick={() => setRecordingTime(0)}
                        className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                          isDarkMode
                            ? 'bg-slate-700 text-white hover:bg-slate-600'
                            : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                        }`}
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={prevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      currentQuestionIndex === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : isDarkMode
                          ? 'bg-slate-800 text-white hover:bg-slate-700'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Previous
                  </button>
                  
                  <button
                    onClick={nextQuestion}
                    disabled={currentQuestionIndex === currentCategoryQuestions.length - 1}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      currentQuestionIndex === currentCategoryQuestions.length - 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Next Question
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ) : (
        <>
          {/* Categories */}
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold mb-4">Question Categories</h2>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Choose a category to explore questions and practice your answers
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.button
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-6 rounded-xl border transition-all duration-300 text-left ${
                        selectedCategory === category.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : isDarkMode
                            ? 'border-slate-700 bg-slate-900/50 hover:border-slate-600'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className={`w-8 h-8 mb-4 ${
                        selectedCategory === category.id ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                      <h3 className="font-semibold mb-2">{category.label}</h3>
                      <p className={`text-sm ${
                        selectedCategory === category.id 
                          ? 'text-blue-600' 
                          : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {category.count} questions
                      </p>
                    </motion.button>
                  );
                })}
              </div>

              {/* Practice Mode Button */}
              <div className="text-center mb-12">
                <motion.button
                  onClick={startPracticeMode}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-3 mx-auto shadow-xl hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5" />
                  <span>Start Practice Session</span>
                </motion.button>
              </div>
            </div>
          </section>

          {/* Questions List */}
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {currentCategoryQuestions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isDarkMode 
                        ? 'bg-slate-900/50 border-slate-700' 
                        : 'bg-white border-gray-200 hover:shadow-lg'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                              {question.difficulty}
                            </span>
                          </div>
                          
                          <h3 className={`text-lg font-semibold mb-3 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {question.question}
                          </h3>
                        </div>

                        <button
                          onClick={() => toggleQuestion(question.id)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                            isDarkMode
                              ? 'bg-slate-800 text-white hover:bg-slate-700'
                              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}
                        >
                          <span>{expandedQuestion === question.id ? 'Collapse' : 'View Answer'}</span>
                          {expandedQuestion === question.id ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* Expanded Content */}
                      {expandedQuestion === question.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`mt-6 pt-6 border-t space-y-6 ${
                            isDarkMode ? 'border-slate-700' : 'border-gray-200'
                          }`}
                        >
                          {/* Tips */}
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center">
                              <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                              Tips for Success
                            </h4>
                            <ul className="space-y-2">
                              {question.tips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="flex items-start space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                    {tip}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Sample Answer */}
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center">
                              <MessageCircle className="w-5 h-5 mr-2 text-blue-500" />
                              Sample Answer
                            </h4>
                            <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${
                              isDarkMode ? 'bg-slate-800' : 'bg-blue-50'
                            }`}>
                              <p className={`italic ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {question.sampleAnswer}
                              </p>
                            </div>
                          </div>

                          {/* Follow-up Questions */}
                          {question.followUp && question.followUp.length > 0 && (
                            <div>
                              <h4 className="font-semibold mb-3 flex items-center">
                                <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
                                Potential Follow-up Questions
                              </h4>
                              <ul className="space-y-2">
                                {question.followUp.map((followUp, followUpIndex) => (
                                  <li key={followUpIndex} className="flex items-start space-x-2">
                                    <ArrowRight className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                      {followUp}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

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
            <Star className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Ready to Ace Your Interview?</h2>
            <p className={`text-xl mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Combine interview preparation with a professional resume to maximize your job search success.
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

export default InterviewGuide;