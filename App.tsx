
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { AIChallenge } from './components/AIChallenge';
import { FloatingBackground } from './components/FloatingBackground';
import { ProjectTicker } from './components/ProjectTicker';

const App: React.FC = () => {
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative">
      <FloatingBackground />
      <Header />
      <main className="flex-grow">
        <Hero onCtaClick={() => setIsChallengeOpen(true)} />
        <ProjectTicker />
        <Features />
        <AnimatePresence>
          {isChallengeOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              id="challenge" 
              className="py-20 bg-white relative z-20"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AIChallenge onClose={() => setIsChallengeOpen(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default App;
