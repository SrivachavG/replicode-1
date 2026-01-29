
import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface FloatingBackgroundProps {
  theme: 'light' | 'dark';
}

export const FloatingBackground: React.FC<FloatingBackgroundProps> = ({ theme }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 200 };
  const tx = useSpring(mouseX, springConfig);
  const ty = useSpring(mouseY, springConfig);

  // We use transforms instead of raw calculations for cleaner motion value management
  const negTx = useTransform(tx, (v) => v * -1.5);
  const negTy = useTransform(ty, (v) => v * -1.5);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 50);
      mouseY.set((clientY / innerHeight - 0.5) * 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        style={{ x: tx, y: ty }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full blur-[120px] transition-colors duration-700 ${
          theme === 'dark' ? 'bg-indigo-900/20' : 'bg-indigo-200/20'
        }`}
      />
      <motion.div
        style={{ x: negTx, y: negTy }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[120px] transition-colors duration-700 ${
          theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-200/20'
        }`}
      />
      <motion.div
        style={{ x: tx, y: negTy }}
        className={`absolute -bottom-[10%] left-[20%] w-[55%] h-[55%] rounded-full blur-[120px] transition-colors duration-700 ${
          theme === 'dark' ? 'bg-purple-900/15' : 'bg-purple-200/15'
        }`}
      />
    </div>
  );
};
