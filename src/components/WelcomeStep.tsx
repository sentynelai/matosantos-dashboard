import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { Logo } from './Logo';

interface WelcomeStepProps {
  onStart: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center px-4 md:px-0"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <Logo className="w-full max-w-[400px] h-auto mx-auto" />
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4 }}
        className="w-20 h-20 rounded-full bg-black/5 flex items-center justify-center mx-auto mb-6"
      >
        <Bot size={32} className="text-black" />
      </motion.div>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Welcome to Matosantos Custom Sentynel</h1>
      <h2 className="text-xl md:text-2xl text-black/60 mb-8">Your AI-powered data analysis assistant</h2>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="px-8 py-3 bg-black text-white rounded-xl hover:bg-black/90 
          transition-colors shadow-lg hover:shadow-xl"
      >
        Start Analysis
      </motion.button>
    </motion.div>
  );
};