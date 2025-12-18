/**
 * Page Transition Component
 * Smooth fade-in animation wrapper for pages using Framer Motion
 */

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}
