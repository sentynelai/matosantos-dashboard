import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, AlertCircle } from 'lucide-react';

interface AccessOverlayProps {
  onAccess: (code: string) => void;
}

export const AccessOverlay: React.FC<AccessOverlayProps> = ({ onAccess }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.toLowerCase() === 'admin') {
      onAccess(code);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-emerald-600 to-emerald-800">
        <div className="absolute inset-0">
          <div className="orb-1" />
          <div className="orb-2" />
          <div className="orb-3" />
          <div className="orb-4" />
          <div className="orb-5" />
        </div>
      </div>

      <main className="flex-grow flex items-center justify-center p-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center text-white">
            Welcome to Matosantos Custom Sentynel
          </h1>
          <h2 className="text-xl md:text-2xl text-white/80 text-center mb-8">
            Your AI-powered data analysis assistant
          </h2>

          <div className="bg-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/20">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-center mb-2 text-white">Access Required</h3>
            <p className="text-white/80 text-center mb-8">
              Please enter your access code to continue
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="password"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter access code"
                  className="w-full px-4 py-3 rounded-xl border border-white/20 focus:outline-none 
                    focus:border-white/40 focus:ring-1 focus:ring-white/40 bg-white/5 backdrop-blur-sm
                    text-white placeholder-white/50"
                />
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-300 text-sm"
                    >
                      <AlertCircle size={14} />
                      <span>Invalid access code</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-400 
                  transition-colors shadow-lg hover:shadow-xl backdrop-blur-sm border border-emerald-400/50"
              >
                Continue
              </motion.button>
            </form>
          </div>
        </motion.div>
      </main>

      <footer className="relative z-10 w-full py-6 px-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="text-center md:text-left">
              <p className="text-sm md:text-base text-white/90 font-medium mb-2">
                Sentynel LLC - Guiding industries into the future with precision and purpose.
              </p>
              <div className="space-x-4 text-sm text-white/60">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <span>|</span>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
            
            <div className="text-center md:text-right space-y-2">
              <a href="tel:+18563910926" className="block text-sm md:text-base text-white/90 hover:text-white transition-colors">
                +1 856-391-0926
              </a>
              <a href="mailto:control@sentynel.ai" className="block text-sm md:text-base text-white/90 hover:text-white transition-colors">
                control@sentynel.ai
              </a>
              <p className="text-sm text-white/60">
                400 NW 26th St, Miami, FL 33127
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center text-xs text-white/40">
            © {new Date().getFullYear()} Sentynel LLC. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};