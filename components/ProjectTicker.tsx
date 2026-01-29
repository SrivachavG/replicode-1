
import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  "Netflix Clone", "Spotify UI", "Airbnb Dashboard", "Linear Task Manager", 
  "Discord Redesign", "Stripe Checkout", "Instagram Feed", "Notion Editor",
  "Slack Workspace", "Uber Dispatch", "Trello Boards", "Twitch Player"
];

export const ProjectTicker: React.FC = () => {
  const duplicatedProjects = [...projects, ...projects, ...projects, ...projects];

  return (
    <div className="w-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border-y border-gray-100 dark:border-slate-800 py-6 overflow-hidden whitespace-nowrap transition-colors duration-300">
      <motion.div 
        animate={{ x: [0, -2000] }}
        transition={{ 
          duration: 50, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        whileHover={{ animationPlayState: 'paused' }}
        className="flex space-x-16 items-center"
      >
        {duplicatedProjects.map((project, i) => (
          <div key={i} className="flex items-center space-x-4 text-sm font-semibold text-gray-400 dark:text-slate-500 group cursor-default">
            <span className="w-2.5 h-2.5 bg-indigo-500/30 dark:bg-indigo-500/10 group-hover:bg-indigo-500 rounded-full transition-colors duration-300 shadow-sm"></span>
            <span className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
              Someone just started replicating: <span className="text-gray-900 dark:text-slate-200 font-bold ml-1">{project}</span>
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
