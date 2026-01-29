import React, { useRef } from 'react';
import { Github, ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const titleWords = ["Build.", "Learn.", "Replicate."];

  return (
    <section 
      className="relative pt-44 pb-32 overflow-hidden flex flex-col items-center justify-center" 
      ref={containerRef} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
        <div className="mb-8 flex flex-wrap justify-center gap-x-6">
          {titleWords.map((word, i) => (
            <motion.h1
              key={i}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.8, type: "spring" }}
              className={`text-6xl md:text-9xl font-black tracking-tighter ${
                word === "Replicate." ? "text-indigo-600 dark:text-indigo-400" : "text-gray-900 dark:text-white"
              }`}
            >
              {word}
            </motion.h1>
          ))}
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto text-xl md:text-2xl text-gray-500 dark:text-slate-400 mb-12 leading-relaxed font-semibold"
        >
          Practice coding by building real projects
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.a 
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/SrivachavG" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center space-x-3 shadow-2xl shadow-indigo-500/40"
          >
            <Github className="w-5 h-5" />
            <span>View on Github</span>
          </motion.a>
          
          <motion.button 
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCtaClick}
            className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-slate-900 text-gray-900 dark:text-white border-2 border-gray-100 dark:border-slate-800 font-bold rounded-2xl transition-all flex items-center justify-center space-x-3 shadow-lg hover:border-indigo-500/50"
          >
            <span>Learn More</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.9, type: "spring" }}
          className="mt-24 relative perspective-2000"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          <div className="relative max-w-5xl mx-auto rounded-[2.5rem] p-2 bg-gradient-to-b from-white/20 to-transparent dark:from-slate-700/30 border border-white/30 dark:border-slate-700/30 shadow-2xl backdrop-blur-sm overflow-hidden">
             <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" 
              alt="Workspace" 
              className="rounded-[2rem] w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};