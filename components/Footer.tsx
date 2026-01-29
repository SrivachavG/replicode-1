import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-20 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="text-gray-900 dark:text-white text-xl font-bold tracking-tight">
          &copy; 2026 Replicode
        </div>
      </div>
    </footer>
  );
};