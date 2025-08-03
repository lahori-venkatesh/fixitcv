import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { Check, Star, Crown, Zap, ArrowRight, Sparkles, Download, FileText } from 'lucide-react';
import { Badge } from './badge';
import { Button } from './button';

interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  isPopular?: boolean;
  accent: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface PricingCardProps {
  plans?: PricingPlan[];
  title?: string;
  subtitle?: string;
  className?: string;
  isDarkMode?: boolean;
}

const Counter = ({ from, to }: { from: number; to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  React.useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        node.textContent = value.toFixed(0);
      },
    });
    return () => controls.stop();
  }, [from, to]);
  return <span ref={nodeRef} />;
};

const resumePlans: PricingPlan[] = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "1 resume template",
      "Basic customization",
      "PDF download",
      "ATS-friendly format",
      "Email support"
    ],
    isPopular: false,
    accent: "from-blue-500 to-cyan-500",
    icon: FileText,
    description: "Perfect for getting started with your first resume"
  },
  {
    name: "Professional",
    monthlyPrice: 5,
    yearlyPrice: 49,
    features: [
      "50+ premium templates",
      "advanced customization",
      "Unlimited PDF downloads",
      "ATS optimization",
      "Custom sections",
      "Country-specific formats",
      "Priority support",
      "Cover letter templates"
    ],
    isPopular: true,
    accent: "from-blue-600 to-blue-800",
    icon: Crown,
    description: "Most popular choice for job seekers"
  }
];

const PricingCard = ({
  plan,
  isYearly,
  index,
  isDarkMode = false
}: {
  plan: PricingPlan;
  isYearly: boolean;
  index: number;
  isDarkMode?: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);

  const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const previousPrice = !isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const savings = isYearly ? (plan.monthlyPrice * 12) - plan.yearlyPrice : 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      style={{
        rotateX,
        rotateY,
        perspective: 1000,
      }}
      onMouseMove={(e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;
        mouseX.set((e.clientX - centerX) / rect.width);
        mouseY.set((e.clientY - centerY) / rect.height);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      className={`relative w-full backdrop-blur-xl rounded-2xl p-8 border transition-all duration-300 hover:shadow-2xl ${
        isDarkMode 
          ? 'bg-slate-900/80 border-slate-700' 
          : 'bg-white/80 border-gray-200'
      } ${
        plan.isPopular 
          ? 'border-blue-500 shadow-lg ring-2 ring-blue-500/20' 
          : isDarkMode 
            ? 'hover:border-blue-400/50' 
            : 'hover:border-blue-500/50'
      }`}
    >
      {plan.isPopular && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-4 left-1/2 transform -translate-x-1/2"
        >
          <Badge className="bg-blue-600 text-white px-4 py-1">
            <Sparkles className="w-3 h-3 mr-1" />
            Most Popular
          </Badge>
        </motion.div>
      )}

      <div className="text-center mb-6">
        <motion.div
          className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.accent} p-4 shadow-lg`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <plan.icon className="w-full h-full text-white" />
        </motion.div>
        
        <h3 className={`text-2xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>{plan.name}</h3>
        <p className={`text-sm ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>{plan.description}</p>
      </div>

      <div className="text-center mb-8">
        <div className="flex items-baseline justify-center gap-2 mb-2">
          <span className={`text-4xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            $<Counter from={previousPrice} to={currentPrice} />
          </span>
          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
            /{isYearly ? 'year' : 'month'}
          </span>
        </div>
        {isYearly && savings > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-600 text-sm font-medium"
          >
            Save ${savings} per year
          </motion.p>
        )}
      </div>

      <div className="space-y-4 mb-8">
        {plan.features.map((feature, i) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3"
          >
            <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.accent} flex items-center justify-center flex-shrink-0`}>
              <Check className="w-3 h-3 text-white" />
            </div>
            <span className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>{feature}</span>
          </motion.div>
        ))}
      </div>

      <Button
        className={`w-full ${
          plan.isPopular 
            ? 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white' 
            : isDarkMode
              ? 'bg-slate-700 hover:bg-slate-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
        }`}
        size="lg"
      >
        {plan.monthlyPrice === 0 ? 'Get Started' : 'Upgrade to Pro'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  );
};

const FeatureComparison = ({ plans, isDarkMode = false }: { plans: PricingPlan[]; isDarkMode?: boolean }) => {
  const allFeatures = Array.from(new Set(plans.flatMap(plan => plan.features)));
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="mt-20"
    >
      <div className="text-center mb-12">
        <h3 className={`text-3xl font-bold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Feature Comparison</h3>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
          Compare all features across our plans
        </p>
      </div>

      <div className={`backdrop-blur-xl rounded-2xl border overflow-hidden ${
        isDarkMode 
          ? 'bg-slate-900/50 border-slate-700' 
          : 'bg-white/50 border-gray-200'
      }`}>
        <div className={`grid grid-cols-3 gap-4 p-6 border-b ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <div className={`font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Features</div>
          {plans.map((plan) => (
            <div key={plan.name} className="text-center">
              <div className={`w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-br ${plan.accent} p-2`}>
                <plan.icon className="w-full h-full text-white" />
              </div>
              <div className={`font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{plan.name}</div>
            </div>
          ))}
        </div>

        {allFeatures.map((feature, index) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`grid grid-cols-3 gap-4 p-4 border-b last:border-b-0 ${
              isDarkMode 
                ? 'border-slate-700 hover:bg-slate-800/20' 
                : 'border-gray-200 hover:bg-gray-50/20'
            }`}
          >
            <div className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>{feature}</div>
            {plans.map((plan) => (
              <div key={plan.name} className="flex justify-center">
                {plan.features.includes(feature) ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <div className={`w-5 h-5 rounded-full ${
                    isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export function ModernPricingCard({
  plans = resumePlans,
  title = "Choose Your Plan",
  subtitle = "Select the perfect plan for your career goals",
  className = "",
  isDarkMode = false
}: PricingCardProps) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className={`min-h-screen bg-gradient-to-br p-4 md:p-8 ${
      isDarkMode 
        ? 'from-slate-950 via-slate-900/20 to-slate-950' 
        : 'from-gray-50 via-blue-50/20 to-gray-50'
    } ${className}`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            Pricing Plans
          </Badge>
          
          <h1 className={`text-3xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h1>
          
          <p className={`text-lg mb-6 max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {subtitle}
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm font-medium ${
              !isYearly 
                ? isDarkMode ? 'text-white' : 'text-gray-900'
                : isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Monthly
            </span>
            <motion.button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-16 h-8 rounded-full border-2 transition-all ${
                isYearly 
                  ? 'bg-blue-600 border-blue-600' 
                  : isDarkMode 
                    ? 'bg-slate-700 border-slate-600' 
                    : 'bg-gray-200 border-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className={`absolute top-0.5 w-6 h-6 rounded-full shadow-lg border ${
                  isDarkMode ? 'bg-white border-gray-300' : 'bg-white border-gray-200'
                }`}
                animate={{
                  x: isYearly ? 32 : 2
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
              />
            </motion.button>
            <span className={`text-sm font-medium ${
              isYearly 
                ? isDarkMode ? 'text-white' : 'text-gray-900'
                : isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Yearly
            </span>
            {isYearly && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
              >
                Save 17%
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              isYearly={isYearly}
              index={index}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>

        {/* Feature Comparison */}
        <FeatureComparison plans={plans} isDarkMode={isDarkMode} />

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className={`text-center mt-12 p-8 rounded-2xl border ${
            isDarkMode 
              ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-slate-700' 
              : 'bg-gradient-to-br from-blue-50 to-purple-50 border-gray-200'
          }`}
        >
          <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Ready to get started?
          </h3>
          <p className={`mb-6 max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join thousands of professionals who have transformed their careers with ResumeSurge.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            Start Free Trial
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default function PricingDemo() {
  return <ModernPricingCard />;
}