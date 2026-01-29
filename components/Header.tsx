
import React from 'react';
import { Code2 } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900">
              Replicode
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Home</a>
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Features</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Course</a>
          </nav>

          <div className="md:hidden">
            {/* Mobile menu could go here */}
            <button className="text-gray-500 hover:text-gray-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
