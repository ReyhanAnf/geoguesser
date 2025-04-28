'use client';

import { motion } from 'framer-motion';

export default function GlassButton({ children, className = '', ...props }) {
  return (
    <motion.button
      className={`glass-btn ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
} 