
import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface FloatingBackgroundProps {
  theme: 'light' | 'dark';
}

export const FloatingBackground: React.FC<FloatingBackgroundProps> = ({ theme }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 100, stiffness: 100 };
  const tx = useSpring(mouseX, springConfig);
  const ty = useSpring(mouseY, springConfig);

  const negTx = useTransform(tx, (v) => v * -1.2);
  const negTy = useTransform(ty, (v) => v * -1.2);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 60);
      mouseY.set((clientY / innerHeight - 0.5) * 60);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        style={{ x: tx, y: ty }}
        animate={{
          scale: [1, 1.1, 0.9, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute -top-[20%] -left-[10%] w-[80%] h-[80%] rounded-full blur-[140px] transition-colors duration-1000 ${
          theme === 'dark' ? 'bg-indigo-600/30' : 'bg-indigo-400/20'
        }`}
      />
      <motion.div
        style={{ x: negTx, y: negTy }}
        animate={{
          scale: [1, 0.9, 1.2, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute top-[10%] -right-[15%] w-[70%] h-[70%] rounded-full blur-[160px] transition-colors duration-1000 ${
          theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-400/15'
        }`}
      />
      <motion.div
        style={{ x: tx, y: negTy }}
        animate={{
           y: [0, -50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity }}
        className={`absolute -bottom-[15%] left-[10%] w-[60%] h-[60%] rounded-full blur-[140px] transition-colors duration-1000 ${
          theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-200/20'
        }`}
      />
      <div className="absolute inset-0 bg-white/10 dark:bg-slate-950/20 backdrop-filter" style={{ backdropFilter: 'contrast(1.1) saturate(1.1)' }} />
    </div>
  );
};
