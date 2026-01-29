
import React, { useState } from 'react';
import { Sparkles, Loader2, X, ChevronRight, Terminal, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateProjectIdea } from '../services/gemini';

interface ProjectIdea {
  title: string;
  difficulty: string;
  description: string;
  techStack: string[];
  tasks: string[];
}

export const AIChallenge: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<ProjectIdea | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await generateProjectIdea(topic);
      setProject(result);
    } catch (err) {
      setError('Failed to generate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-indigo-950 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden ring-1 ring-white/20">
      {/* Background Decor */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -top-24 -right-24 p-4 opacity-5 pointer-events-none"
      >
        <Terminal className="w-96 h-96" />
      </motion.div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 font-bold tracking-widest text-sm uppercase mb-2">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>AI Project Mentor</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold">Replicate Your Next Idea</h2>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose} 
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {!project ? (
            <motion.div 
              key="input"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-xl"
            >
              <p className="text-indigo-200 text-lg mb-8 leading-relaxed">
                Not sure what to build next? Tell us a topic or leave it blank, and our AI will architect a realistic coding challenge for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="text"
                  placeholder="e.g., E-commerce, Social Media, Dashboard..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder:text-indigo-400 transition-all"
                />
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerate}
                  disabled={loading}
                  className="px-8 py-4 bg-indigo-500 text-white font-bold rounded-2xl hover:bg-indigo-400 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 shadow-xl shadow-indigo-900/40"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Thinking...</span>
                    </>
                  ) : (
                    <>
                      <Cpu className="w-5 h-5" />
                      <span>Generate Challenge</span>
                    </>
                  )}
                </motion.button>
              </div>
              {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-red-400 text-sm font-medium">{error}</motion.p>}
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-block px-4 py-1 bg-indigo-500/30 border border-indigo-400/30 rounded-full text-xs font-bold mb-4 uppercase tracking-wider"
                >
                  {project.difficulty} Challenge
                </motion.div>
                <motion.h3 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold mb-4"
                >
                  {project.title}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-indigo-200 text-lg mb-8 leading-relaxed"
                >
                  {project.description}
                </motion.p>
                
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                  Recommended Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <motion.span 
                      key={i} 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 shadow-inner"
              >
                <h4 className="font-bold text-xl mb-6 flex items-center gap-2">
                   <Terminal className="w-5 h-5 text-indigo-400" />
                   Build Milestones
                </h4>
                <ul className="space-y-4">
                  {project.tasks.map((task, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-start space-x-3 group"
                    >
                      <div className="mt-1 bg-indigo-500 rounded-full p-0.5 group-hover:scale-125 transition-transform duration-300">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                      <span className="text-indigo-100/90 leading-snug group-hover:text-white transition-colors">{task}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.button 
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setProject(null)}
                  className="mt-8 w-full py-4 bg-white/10 border border-white/20 rounded-2xl font-bold transition-all"
                >
                  New Challenge
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
