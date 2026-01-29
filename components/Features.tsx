
import React, { useState } from 'react';
import { Target, Layers, Zap, MousePointer2 } from 'lucide-react';
import { motion, Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';

const featureList = [
  {
    icon: <Target className="w-8 h-8" />,
    title: "Master Reverse Engineering",
    description: "Break down complex production systems like Slack or Stripe into buildable chunks."
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: "Production Blueprints",
    description: "Get curated lists of tech stacks and milestones used by world-class engineering teams."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "AI Project Architect",
    description: "Generate tailored coding challenges based on your skill level and target domain."
  }
];

const FeatureCard = ({ feature, index }: { feature: any, index: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      className="group relative bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl p-10 rounded-[3rem] border border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[3rem] opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(79, 70, 229, 0.15), transparent 40%)`
          ),
        }}
      />
      
      <div className="relative z-10">
        <div className="bg-indigo-600/10 dark:bg-indigo-500/10 w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-500 shadow-inner">
          <div className="text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors duration-500">
            {feature.icon}
          </div>
        </div>
        
        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight group-hover:translate-x-1 transition-transform duration-300">
          {feature.title}
        </h3>
        <p className="text-gray-500 dark:text-slate-400 text-lg leading-relaxed font-medium">
          {feature.description}
        </p>
      </div>

      <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        <MousePointer2 className="w-6 h-6 text-indigo-500 rotate-12" />
      </div>
    </motion.div>
  );
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight"
          >
            The Architect's Toolkit.
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="text-xl text-gray-500 dark:text-slate-400 font-medium"
          >
            Everything you need to level up from "coder" to "engineer".
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureList.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
