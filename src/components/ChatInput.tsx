import React, { useState } from 'react';
import { Mic, Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSubmit: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSubmit, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSubmit(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about your data..."
        disabled={disabled}
        className="w-full px-4 py-3 pr-24 rounded-xl border border-black/5 
          focus:outline-none focus:border-black/20 focus:ring-1 focus:ring-black/20
          bg-white/50 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={disabled}
          className="p-2 rounded-lg hover:bg-black/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Mic size={20} className="text-black/60" />
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={!message.trim() || disabled}
          className="p-2 rounded-lg hover:bg-black/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={20} className={message.trim() && !disabled ? 'text-black' : 'text-black/30'} />
        </motion.button>
      </div>
    </form>
  );
};