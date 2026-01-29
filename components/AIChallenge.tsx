
import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, X, ChevronRight, Terminal, Cpu, Database, Layout, ShieldCheck, Box } from 'lucide-react';
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
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    "Initializing Neural Architect...",
    "Scanning Project Repositories...",
    "Synthesizing Build Milestones...",
    "Optimizing Tech Stack Selection...",
    "Finalizing Replicode Blueprint..."
  ];

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingSteps.length);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setLoadingStep(0);
    try {
      const result = await generateProjectIdea(topic);
      setProject(result);
    } catch (err) {
      setError('System Failure: Connection to Neural Architect lost.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 rounded-[3.5rem] p-1 md:p-2 text-white shadow-[0_0_100px_-20px_rgba(79,70,229,0.3)] relative overflow-hidden ring-1 ring-white/10">
      <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 relative overflow-hidden border border-white/5">
        
        {/* IDE-like Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-slate-950/50 border-b border-white/5 flex items-center px-6 justify-between">
          <div className="flex space-x-2">
             <div className="w-3 h-3 rounded-full bg-red-500/50" />
             <div className="w-3 h-3 rounded-full bg-amber-500/50" />
             <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
          </div>
          <div className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">
            replicode_architect_v3.0.4.bin
          </div>
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.05)" }}
            onClick={onClose}
            className="p-1.5 rounded-lg"
          >
            <X className="w-4 h-4 text-slate-500" />
          </motion.button>
        </div>

        <div className="relative z-10 pt-8">
          <AnimatePresence mode="wait">
            {!project && !loading ? (
              <motion.div 
                key="input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="w-20 h-20 bg-indigo-600/20 rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 border border-indigo-500/30">
                  <Cpu className="w-10 h-10 text-indigo-400" />
                </div>
                <h2 className="text-4xl font-black mb-4 tracking-tight">What should we architect?</h2>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
                  Enter a domain or leave it blank to get a randomized high-level engineering challenge.
                </p>
                <div className="flex flex-col sm:row gap-4">
                  <div className="relative flex-grow">
                    <Terminal className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-500" />
                    <input 
                      type="text"
                      placeholder="E-commerce, Crypto, Messaging..."
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-2xl pl-14 pr-6 py-5 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder:text-slate-600 font-mono transition-all"
                    />
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGenerate}
                    className="px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-500 transition-all flex items-center justify-center space-x-3 shadow-xl shadow-indigo-500/30"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Initiate Sequence</span>
                  </motion.button>
                </div>
              </motion.div>
            ) : loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center"
              >
                <div className="relative w-32 h-32 mx-auto mb-10">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-t-2 border-indigo-500 rounded-full"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 border-b-2 border-indigo-400 rounded-full opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Cpu className="w-8 h-8 text-indigo-400 animate-pulse" />
                  </div>
                </div>
                <motion.div
                  key={loadingStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-indigo-400 font-mono text-sm tracking-widest uppercase mb-2"
                >
                  {loadingSteps[loadingStep]}
                </motion.div>
                <div className="w-48 h-1 bg-slate-800 mx-auto rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-indigo-500"
                    animate={{ width: ["0%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12"
              >
                <div className="lg:col-span-7">
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-lg text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">
                      {project?.difficulty}
                    </span>
                    <span className="w-1 h-1 bg-slate-700 rounded-full" />
                    <span className="text-xs font-mono text-slate-500">v3.0 GENERATED</span>
                  </div>
                  <h3 className="text-5xl font-black mb-6 tracking-tight leading-tight">
                    {project?.title}
                  </h3>
                  <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium border-l-2 border-indigo-500/30 pl-6">
                    {project?.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8">
                     <div>
                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                           <Database className="w-3 h-3" /> Recommended Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                           {project?.techStack.map((tech, i) => (
                              <span key={i} className="px-3 py-1 bg-slate-950 border border-white/5 rounded-lg text-xs font-mono text-indigo-300">
                                 {tech}
                              </span>
                           ))}
                        </div>
                     </div>
                     <div>
                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                           <Layout className="w-3 h-3" /> Core Complexity
                        </h4>
                        <div className="flex flex-wrap gap-2">
                           <span className="px-3 py-1 bg-slate-950 border border-white/5 rounded-lg text-xs font-mono text-emerald-400">High Scalability</span>
                           <span className="px-3 py-1 bg-slate-950 border border-white/5 rounded-lg text-xs font-mono text-amber-400">Distributed Architecture</span>
                        </div>
                     </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="bg-slate-950 rounded-[2.5rem] border border-white/10 p-8 relative shadow-2xl overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Terminal className="w-40 h-40" />
                    </div>
                    <h4 className="font-black text-xl mb-8 flex items-center gap-3">
                       <Box className="w-6 h-6 text-indigo-500" />
                       Build Log
                    </h4>
                    <div className="space-y-6 relative">
                      <div className="absolute left-3 top-0 bottom-0 w-px bg-slate-800" />
                      {project?.tasks.map((task, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex items-start space-x-6 group/task relative"
                        >
                          <div className="relative z-10 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center group-hover/task:border-indigo-500 transition-colors">
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                          </div>
                          <p className="text-slate-300 font-medium leading-snug group-hover/task:text-white transition-colors pt-0.5">
                            {task}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setProject(null)}
                      className="mt-12 w-full py-5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 font-black rounded-2xl transition-all border border-indigo-500/30 text-sm tracking-widest uppercase"
                    >
                      Regenerate Challenge
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
