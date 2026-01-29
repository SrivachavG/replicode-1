
import React from 'react';
import { Code2, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#features' },
    { name: 'Projects', href: '#' },
    { name: 'Community', href: '#' }
  ];

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none">
      <header className="max-w-5xl mx-auto glass dark:bg-slate-900/60 border border-white/20 dark:border-slate-800/50 rounded-2xl shadow-2xl shadow-indigo-500/10 pointer-events-auto transition-all duration-300">
        <div className="px-6 h-16 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-indigo-500/40">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white uppercase">
              Replicode
            </span>
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ y: -2 }}
                className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors relative group"
              >
                {item.name}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </motion.a>
            ))}
            
            <div className="w-px h-6 bg-gray-200 dark:bg-slate-800 mx-4" />
            
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={onToggleTheme}
              className="p-2.5 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all border border-transparent hover:border-indigo-500/30"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </motion.button>
          </nav>

          <div className="md:hidden flex items-center space-x-2">
            <button onClick={onToggleTheme} className="p-2 text-gray-500 dark:text-slate-400">
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button className="p-2 text-gray-500 dark:text-slate-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};
