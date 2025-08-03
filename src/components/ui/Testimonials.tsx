import { TestimonialsColumn } from "./testimonials-columns-1";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

const testimonials = [
  {
    text: "ResumeSurge completely transformed my job search. The AI-powered suggestions helped me craft a resume that landed me interviews at top tech companies.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    name: "Sarah Chen",
    role: "Software Engineer at Google",
  },
  {
    text: "The template quality is outstanding. My resume now looks professional and passes ATS systems effortlessly. Highly recommend!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "Michael Rodriguez",
    role: "Product Manager at Microsoft",
  },
  {
    text: "I was struggling with my resume format until I found ResumeSurge. The customization options are incredible and the results speak for themselves.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    name: "Emily Johnson",
    role: "Marketing Director at Netflix",
  },
  {
    text: "The country-specific templates are a game-changer. As an international job seeker, this feature helped me tailor my resume perfectly.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "David Kim",
    role: "Data Scientist at Amazon",
  },
  {
    text: "ResumeSurge's ATS optimization is phenomenal. I went from getting zero responses to landing multiple interviews within weeks.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    name: "Jessica Williams",
    role: "UX Designer at Adobe",
  },
  {
    text: "The export quality is perfect - exactly what I see in preview. No more formatting issues when downloading PDFs!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    name: "Alex Thompson",
    role: "DevOps Engineer at Tesla",
  },
  {
    text: "Building my resume was so intuitive. The drag-and-drop section reordering and customization options are brilliant.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    name: "Rachel Davis",
    role: "Business Analyst at McKinsey",
  },
  {
    text: "The custom sections feature allowed me to showcase my unique background perfectly. Got my dream job in just 2 weeks!",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    name: "James Wilson",
    role: "Startup Founder",
  },
  {
    text: "Professional templates with beautiful design. The healthcare-specific format helped me land a position at a top hospital.",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face",
    name: "Dr. Maria Garcia",
    role: "Physician at Johns Hopkins",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

interface TestimonialsProps {
  isDarkMode?: boolean;
}

const Testimonials: React.FC<TestimonialsProps> = ({ isDarkMode = false }) => {
  return (
    <section className={`py-24 relative overflow-hidden ${
      isDarkMode ? 'bg-slate-950' : 'bg-white'
    }`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-10 ${
          isDarkMode ? 'bg-blue-500' : 'bg-blue-200'
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-10 ${
          isDarkMode ? 'bg-purple-500' : 'bg-purple-200'
        }`} />
      </div>

      <div className="container z-10 mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${
              isDarkMode 
                ? 'bg-slate-800 text-slate-300 border border-slate-700' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              <Users className="w-4 h-4 mr-2" />
              <span>Success Stories</span>
            </div>
          </div>

          <h2 className={`text-4xl md:text-5xl font-bold tracking-tight text-center mb-6 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Trusted by Top Professionals
          </h2>
          
          <p className={`text-xl text-center max-w-3xl mx-auto ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Join thousands of professionals who have successfully landed their dream jobs using ResumeSurge.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden"
        >
          <TestimonialsColumn 
            testimonials={firstColumn} 
            duration={15}
            className={isDarkMode ? '[&_.bg-background]:bg-slate-950' : '[&_.bg-background]:bg-white'}
          />
          <TestimonialsColumn 
            testimonials={secondColumn} 
            className={`hidden md:block ${isDarkMode ? '[&_.bg-background]:bg-slate-950' : '[&_.bg-background]:bg-white'}`}
            duration={19} 
          />
          <TestimonialsColumn 
            testimonials={thirdColumn} 
            className={`hidden lg:block ${isDarkMode ? '[&_.bg-background]:bg-slate-950' : '[&_.bg-background]:bg-white'}`}
            duration={17} 
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;