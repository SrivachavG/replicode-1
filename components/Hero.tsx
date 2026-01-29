
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

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const titleWords = "Build. Learn. Replicate.".split(" ");

  return (
    <section className="relative pt-24 pb-32 overflow-hidden" ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6 overflow-hidden">
          <h1 className="text-5xl md:text-8xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight flex justify-center flex-wrap gap-x-4">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: i * 0.1, 
                  type: "spring", 
                  damping: 15 
                }}
                className={word === "Replicate." ? "text-indigo-600 dark:text-indigo-400" : ""}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-slate-400 mb-10 leading-relaxed font-medium"
        >
          Master your craft by building real-world projects. Reverse-engineer the web's most complex systems, one line at a time.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-all flex items-center justify-center space-x-2 shadow-xl shadow-indigo-200 dark:shadow-indigo-900/20"
          >
            <Github className="w-5 h-5" />
            <span>View on GitHub</span>
          </motion.a>
          <motion.button 
            whileHover={{ scale: 1.05, y: -2, backgroundColor: "var(--tw-hover-bg)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onCtaClick}
            className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-slate-900 text-gray-900 dark:text-white border-2 border-gray-100 dark:border-slate-800 font-bold rounded-full transition-all flex items-center justify-center space-x-2 shadow-lg hover:bg-gray-50 dark:hover:bg-slate-800"
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8, type: "spring" }}
          className="mt-20 relative perspective-2000"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src="https://picsum.photos/seed/replicode-v2/1200/600" 
              alt="Dashboard Preview" 
              className="relative rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 mx-auto max-w-5xl w-full object-cover transform transition duration-500"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
