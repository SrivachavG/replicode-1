
import React from 'react';
import { Github, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
            Build. Learn. <motion.span 
              initial={{ color: "#111827" }}
              animate={{ color: "#4f46e5" }}
              transition={{ delay: 1, duration: 1 }}
              className="inline-block"
            >Replicate.</motion.span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-xl text-gray-600 mb-10 leading-relaxed"
        >
          Practice coding by building real-world projects. Study the masters and learn the architecture behind the web's biggest platforms.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCtaClick}
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-indigo-200"
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border-2 border-gray-100 font-semibold rounded-full hover:bg-gray-50 transition-all flex items-center justify-center space-x-2"
          >
            <Github className="w-5 h-5" />
            <span>View on GitHub</span>
          </motion.a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, type: "spring", bounce: 0.4 }}
          className="mt-16 relative perspective-1000"
        >
          <motion.div
            whileHover={{ rotateX: 2, rotateY: -2, scale: 1.02 }}
            className="transition-transform duration-500"
          >
            <img 
              src="https://picsum.photos/seed/replicode/1200/600" 
              alt="Dashboard Preview" 
              className="rounded-2xl shadow-2xl border border-gray-100 mx-auto max-w-5xl w-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
