import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SuggestionButtonProps {
  icon: LucideIcon;
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

export const SuggestionButton: React.FC<SuggestionButtonProps> = ({ 
  icon: Icon, 
  text, 
  onClick,
  disabled = false 
}) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-black/5 
        hover:border-black/20 hover:bg-black/5 transition-all backdrop-blur-sm
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-black/5 disabled:hover:bg-transparent"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon size={18} className="text-black" />
      <span className="text-sm text-black/80">{text}</span>
    </motion.button>
  );
};