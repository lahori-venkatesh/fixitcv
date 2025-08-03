"use client";
import React from "react";
import { motion } from "framer-motion";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-10 rounded-3xl border shadow-lg shadow-primary/10 max-w-xs w-full" key={i}>
                  <div>{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5">{name}</div>
                      <div className="leading-5 opacity-60 tracking-tight">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

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