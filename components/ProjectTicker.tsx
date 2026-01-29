
import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  "Netflix Clone", "Spotify UI", "Airbnb Dashboard", "Linear Task Manager", 
  "Discord Redesign", "Stripe Checkout", "Instagram Feed", "Notion Editor"
];

export const ProjectTicker: React.FC = () => {
  const duplicatedProjects = [...projects, ...projects, ...projects];

  return (
    <div className="w-full bg-white/50 border-y border-gray-100 py-4 overflow-hidden whitespace-nowrap">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex space-x-12 items-center"
      >
        {duplicatedProjects.map((project, i) => (
          <div key={i} className="flex items-center space-x-3 text-sm font-medium text-gray-500">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            <span>Someone just started replicating: <span className="text-indigo-600 font-bold">{project}</span></span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
