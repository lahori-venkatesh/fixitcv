'use client'

import React, { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FileText, Palette, Download, ArrowRight, Check, Star, Users, Zap, Play, Sparkles, TrendingUp, Globe } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'

// Utility function
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground"
    }
    
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8"
    }
    
    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

// Background Pattern Component
const BackgroundPattern = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient Background */}
      <div className={`absolute inset-0 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950' 
          : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
      }`} />
      
      {/* Professional Grid Pattern */}
      <div 
        className={`absolute inset-0 ${
          isDarkMode ? 'opacity-[0.08]' : 'opacity-[0.09]'
        }`}
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Dot Pattern Overlay */}
      <div 
        className={`absolute inset-0 ${
          isDarkMode ? 'opacity-[0.04]' : 'opacity-[0.03]'
        }`}
        style={{
          backgroundImage: `radial-gradient(circle, rgba(59, 130, 246, 0.8) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '10px 10px'
        }}
      />
      
      {/* Geometric Shapes */}
      <motion.div
        className={`absolute top-20 left-[10%] w-20 h-20 border rounded-lg ${
          isDarkMode ? 'border-blue-800/30' : 'border-blue-200/30'
        }`}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
       <motion.div
        className={`absolute top-80 left-[20%] w-16 h-16 border rounded-lg ${
          isDarkMode ? 'border-blue-700/30' : 'border-blue-200/30'
        }`}
        animate={{
          rotate: [0, 360],
          scale: [2, 2.2, 2]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className={`absolute top-12 right-[15%] w-24 h-24 rounded-full ${
          isDarkMode ? 'bg-blue-400/10' : 'bg-blue-300/5'
        }`}
        animate={{
          y: [0, -30, 0],
          opacity: [1.1, 0.7, 0.3]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
       <motion.div
        className={`absolute top-48 right-[30%] w-36 h-36 rounded-full ${
          isDarkMode ? 'bg-blue-800/10' : 'bg-blue-500/5'
        }`}
        animate={{
          y: [0, -30, 0],
          opacity: [2, 1.7, 0.5]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className={`absolute bottom-40 left-[12%] w-20 h-20 border-2 rounded-lg rotate-45 ${
          isDarkMode ? 'border-blue-600/20' : 'border-blue-300/20'
        }`}
        animate={{
          rotate: [45, 405],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Professional Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-[5%] w-24 h-24 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-xl"
        animate={{
          y: [0, -25, 0],
          x: [0, 10, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-1/3 right-[8%] w-32 h-32 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-full blur-xl"
        animate={{
          y: [0, 30, 0],
          x: [0, -15, 0],
          opacity: [0.15, 0.35, 0.15]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* Abstract Lines */}
      <svg className={`absolute inset-0 w-full h-full ${
        isDarkMode ? 'opacity-[0.05]' : 'opacity-[0.02]'
      }`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="lines" patternUnits="userSpaceOnUse" width="100" height="100">
            <path d="M0,50 Q25,25 50,50 T100,50" stroke="rgb(59, 130, 246)" strokeWidth="1" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lines)" />
      </svg>
    </div>
  )
}

// Hero Section Component
interface HeroSectionProps {
  isDarkMode?: boolean;
  onGetStarted?: () => void;
  onNavigate?: (page: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  isDarkMode = false, 
  onGetStarted, 
  onNavigate 
}) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  const stats = [
    { number: "500+", label: "Premium Templates", icon: FileText },
    { number: "98%", label: "ATS Pass Rate", icon: TrendingUp },
    { number: "4.9/5", label: "User Rating", icon: Star },
    { number: "50+", label: "Top Institutions", icon: Globe },
  ];
  
  return (
    <section className={`relative min-h-screen flex items-center justify-center pt-20 pb-48 px-4 sm:px-6 lg:px-8 overflow-hidden  ${
      isDarkMode ? 'text-white' : 'text-slate-900'
    }`}>
      <BackgroundPattern isDarkMode={isDarkMode} />
      
      <motion.div
        style={{ y }}
        className="relative z-10 max-w-7xl mx-auto text-center w-full"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-8 ${
            isDarkMode 
              ? 'bg-blue-900/30 text-blue-300 border border-blue-700/30' 
              : 'bg-blue-100 text-blue-700 border border-blue-200'
          }`}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Professional Resume Builder
        </motion.div>
        
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          Premium Templates from
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block">
            IIT • NIT • IIM • IISc
          </span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          Access exclusive resume templates created by successful students from India's top institutions. Get real-time ATS scoring and land your dream job with proven formats.
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <SignedOut>
            <SignInButton mode="modal">
              <motion.button
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl font-semibold text-lg flex items-center space-x-3 shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5" />
                <span>Start Building Free</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <motion.button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-3 shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5" />
              <span>Start Building Free</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </SignedIn>
          
          <motion.button 
            onClick={() => onNavigate?.('templates')}
            className={`flex items-center space-x-2 px-6 py-4 rounded-xl font-semibold text-lg border-2 transition-all duration-300 ${
              isDarkMode 
                ? 'border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800' 
                : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View Templates</span>
          </motion.button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className={`inline-flex items-center space-x-2 text-sm mb-20 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <Check className="w-5 h-5 text-green-500" />
          <span>No credit card required • Free forever plan available</span>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`text-center p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                isDarkMode 
                  ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-800/50' 
                  : 'border-slate-200 bg-white/50 hover:bg-white/80'
              }`}
            >
              <stat.icon className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className={`text-3xl font-bold mb-1 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>{stat.number}</div>
              <div className={`text-sm ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Professional Resume Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
        className="absolute right-8 top-1/4 transform -translate-y-1/3 hidden xl:block"
      >
        {/* Main Resume Card */}
        <div className="relative">
          <div className={`w-72 h-96 rounded-xl shadow-2xl border p-8 backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-slate-800 border-slate-700/50' 
              : 'bg-white border-slate-200/50'
          }`}>
            {/* Header */}
            <div className="space-y-3 mb-6">
              <div className="h-5 bg-gradient-to-r from-blue-600 to-blue-400 rounded w-4/5"></div>
              <div className={`h-3 rounded w-3/5 ${
                isDarkMode ? 'bg-slate-600' : 'bg-slate-300'
              }`}></div>
              <div className={`h-2 rounded w-2/3 ${
                isDarkMode ? 'bg-slate-700' : 'bg-slate-200'
              }`}></div>
            </div>
            
            {/* Content Sections */}
            <div className="space-y-5">
              <div>
                <div className="h-3 bg-blue-500/20 rounded w-1/2 mb-2"></div>
                <div className="space-y-1.5">
                  <div className={`h-2 rounded ${
                    isDarkMode ? 'bg-slate-700' : 'bg-slate-200'
                  }`}></div>
                  <div className={`h-2 rounded w-5/6 ${
                    isDarkMode ? 'bg-slate-700' : 'bg-slate-200'
                  }`}></div>
                  <div className={`h-2 rounded w-4/6 ${
                    isDarkMode ? 'bg-slate-700' : 'bg-slate-200'
                  }`}></div>
                </div>
              </div>
              
              <div>
                <div className="h-3 bg-blue-500/20 rounded w-2/5 mb-2"></div>
                <div className="space-y-1.5">
                  <div className={`h-2 rounded w-4/5 ${
                    isDarkMode ? 'bg-slate-700' : 'bg-slate-200'
                  }`}></div>
                  <div className={`h-2 rounded w-3/5 ${
                    isDarkMode ? 'bg-slate-700' : 'bg-slate-200'
                  }`}></div>
                </div>
              </div>
              
              <div>
                <div className="h-3 bg-blue-500/20 rounded w-1/3 mb-2"></div>
                <div className="space-y-1.5">
                  <div className={`h-2 rounded w-5/6 ${
                    isDarkMode ? 'bg-slate-700' : 'bg-slate-200'
                  }`}></div>
                  <div className={`h-2 rounded w-2/3 ${
                    isDarkMode ? 'bg-slate-700' : 'bg-slate-200'
                  }`}></div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500/10 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-blue-500/20 rounded rotate-45"></div>
          </div>
          
          {/* Floating Secondary Cards */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [2, -2, 2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute -top-4 -left-4 w-48 h-64 rounded-lg shadow-lg border backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-slate-800/80 border-slate-700/30' 
                : 'bg-white/80 border-slate-200/30'
            }`}
          />
          
          <motion.div
            animate={{
              y: [0, 10, 0],
              rotate: [-3, 3, -3]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className={`absolute -bottom-6 -right-6 w-56 h-72 rounded-lg shadow-lg border backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-slate-800/60 border-slate-700/20' 
                : 'bg-white/60 border-slate-200/20'
            }`}
          />
        </div>
        
        {/* Success Indicators */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="absolute -top-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
            <Check className="w-3 h-3 mr-1" />
            ATS Optimized
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 2.3 }}
          className="absolute -bottom-8 right-1/4"
        >
          <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
            <Star className="w-3 h-3 mr-1" />
            Professional
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <div className={`w-6 h-10 border-2 rounded-full flex justify-center ${
          isDarkMode ? 'border-slate-600' : 'border-slate-300'
        }`}>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className={`w-1 h-3 rounded-full mt-2 ${
              isDarkMode ? 'bg-slate-400' : 'bg-slate-600'
            }`}
          />
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection