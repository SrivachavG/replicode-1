
import React from 'react';
import { Target, Layers, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const featureList = [
  {
    icon: <Target className="w-8 h-8 text-indigo-500" />,
    title: "Learn by Doing",
    description: "Improve your coding skills by actually writing code for production-grade projects."
  },
  {
    icon: <Layers className="w-8 h-8 text-blue-500" />,
    title: "Project Examples",
    description: "Study real-world projects from industry leaders. Reverse engineer popular architectures."
  },
  {
    icon: <Zap className="w-8 h-8 text-purple-500" />,
    title: "Easy to Follow",
    description: "Simple steps to replicate complex systems. Guided tutorials for every experience level."
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {featureList.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={item}
              whileHover={{ y: -10 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="bg-gray-50 group-hover:bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
