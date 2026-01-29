import React from 'react';
import { Target, Layers, Zap } from 'lucide-react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const featureList = [
  {
    icon: <Target className="w-8 h-8" />,
    title: "Learn By Doing",
    description: "Improve your coding skills by building complex real-world apps."
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: "Project Examples",
    description: "Study real-world projects and master their architecture."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Easy to follow",
    description: "Simple steps to replicate even the most complex systems."
  }
];

const FeatureCard = ({ feature, index }: { feature: any, index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl transition-all duration-300 hover:shadow-2xl"
    >
      <div className="relative z-10 text-center flex flex-col items-center">
        <div className="bg-indigo-600/10 dark:bg-indigo-500/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:bg-indigo-600 group-hover:scale-110">
          <div className="text-indigo-600 dark:text-indigo-400 group-hover:text-white">
            {feature.icon}
          </div>
        </div>
        
        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
          {feature.title}
        </h3>
        <p className="text-gray-500 dark:text-slate-400 text-lg leading-relaxed font-medium">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureList.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};