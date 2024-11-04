import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Bot, Loader2, AlertCircle } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  chart?: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isBot, 
  chart,
  isLoading = false,
  isError = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isBot ? 'flex-row' : 'flex-row-reverse'} items-start mb-4`}
    >
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
        ${isBot ? 'bg-black/5' : 'bg-black/5'} ${isError ? 'bg-red-100' : ''}`}>
        {isBot ? (
          isLoading ? (
            <Loader2 size={20} className="text-black animate-spin" />
          ) : isError ? (
            <AlertCircle size={20} className="text-red-500" />
          ) : (
            <Bot size={20} className="text-black" />
          )
        ) : (
          <MessageCircle size={20} className="text-black" />
        )}
      </div>
      <div className={`max-w-[80%] ${isBot ? 'bg-white/50' : 'bg-black/5'} 
        ${isError ? 'bg-red-50 border-red-100' : 'border-black/5'}
        backdrop-blur-sm rounded-2xl p-4 shadow-sm border`}>
        <p className={`${isError ? 'text-red-600' : 'text-black/80'}`}>{message}</p>
        {chart && !isError && (
          <div className="mt-4">
            {chart}
          </div>
        )}
      </div>
    </motion.div>
  );
};