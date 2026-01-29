
import React from 'react';
import { Target, Layers, Zap } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

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

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 80,
      damping: 15
    } 
  }
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
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
              whileHover={{ 
                y: -15, 
                rotateX: 2, 
                rotateY: -2,
                transition: { duration: 0.2 } 
              }}
              className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-2xl dark:hover:shadow-indigo-900/20 transition-all duration-500 group relative overflow-hidden transform-gpu perspective-1000"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
              
              <div className="bg-gray-50 dark:bg-slate-800 group-hover:bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-indigo-200 dark:group-hover:shadow-none">
                <div className="group-hover:text-white transition-colors duration-500">
                  {React.cloneElement(feature.icon as React.ReactElement<any>, { 
                    className: "w-8 h-8 transition-colors duration-500" 
                  })}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-slate-400 text-lg leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
