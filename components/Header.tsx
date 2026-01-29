import React from 'react';
import { Code2, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Left aligned as per sketch */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
              Replicode
            </span>
          </motion.div>
          
          {/* Nav Items - Right aligned as per sketch */}
          <nav className="flex items-center space-x-8">
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.05 }}
              className="text-sm font-bold text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Home
            </motion.a>
            <motion.a 
              href="#features" 
              whileHover={{ scale: 1.05 }}
              className="text-sm font-bold text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Features
            </motion.a>
            
            <div className="h-6 w-px bg-gray-200 dark:bg-slate-800" />
            
            <motion.button
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={onToggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </motion.button>
          </nav>
        </div>
      </div>
    </header>
  );
};