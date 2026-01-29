
import React, { useRef } from 'react';
import { Github, ArrowRight, Play } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, Variants } from 'framer-motion';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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

  // Fix: Added explicit Variants type and cast the ease array to a tuple of 4 numbers [number, number, number, number]
  // to satisfy Framer Motion's Easing type and prevent TypeScript from inferring it as a generic number array.
  const textVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { 
        delay: i * 0.1, 
        duration: 0.8, 
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] 
      }
    })
  };

  const titleLines = ["Build.", "Learn.", "Replicate."];

  return (
    <section 
      className="relative pt-32 pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]" 
      ref={containerRef} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-500/30 px-4 py-1.5 rounded-full mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-widest">New: 3.0 Engine is live</span>
        </motion.div>

        <div className="mb-8 flex flex-wrap justify-center gap-x-6">
          {titleLines.map((line, i) => (
            <motion.h1
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className={`text-6xl md:text-9xl font-black tracking-tighter ${
                line === "Replicate." ? "text-indigo-600 dark:text-indigo-400 drop-shadow-2xl shadow-indigo-500/20" : "text-gray-900 dark:text-white"
              }`}
            >
              {line}
            </motion.h1>
          ))}
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto text-xl text-gray-500 dark:text-slate-400 mb-12 leading-relaxed font-medium"
        >
          Stop watching tutorials. Start building the systems that power the world. Replicode gives you the blueprint to master production coding.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.button 
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCtaClick}
            className="group relative w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center space-x-3 shadow-2xl shadow-indigo-500/40"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Generate Project</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.a 
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-slate-900 text-gray-900 dark:text-white border-2 border-gray-100 dark:border-slate-800 font-bold rounded-2xl transition-all flex items-center justify-center space-x-3 shadow-lg hover:border-indigo-500/50"
          >
            <Github className="w-5 h-5" />
            <span>Star on GitHub</span>
          </motion.a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 1, type: "spring", bounce: 0.3 }}
          className="mt-24 relative perspective-2000 px-4"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          <div className="relative max-w-5xl mx-auto rounded-[2.5rem] p-2 bg-gradient-to-b from-white/20 to-transparent dark:from-slate-700/30 border border-white/30 dark:border-slate-700/30 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] dark:shadow-indigo-500/10 backdrop-blur-sm">
            <div className="absolute top-4 left-4 flex space-x-1.5 z-20">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <img 
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200&h=600" 
              alt="Code Interface" 
              className="relative rounded-[2rem] w-full object-cover shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
