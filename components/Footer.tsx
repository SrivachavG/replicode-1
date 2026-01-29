
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-4">
        <div className="text-gray-500 text-sm font-medium tracking-wide">
          &copy; 2026 REPLICODE
        </div>
        <div className="flex space-x-6 text-xs text-gray-400 uppercase tracking-widest">
          <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};
