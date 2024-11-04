import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-4 border-t border-black/5 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="text-center md:text-left">
            <p className="text-sm md:text-base text-black/80 font-medium mb-2">
              Sentynel LLC - Guiding industries into the future with precision and purpose.
            </p>
            <div className="space-x-4 text-sm text-black/60">
              <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
            </div>
          </div>
          
          <div className="text-center md:text-right space-y-2">
            <a href="tel:+18563910926" className="block text-sm md:text-base text-black/80 hover:text-black transition-colors">
              +1 856-391-0926
            </a>
            <a href="mailto:control@sentynel.ai" className="block text-sm md:text-base text-black/80 hover:text-black transition-colors">
              control@sentynel.ai
            </a>
            <p className="text-sm text-black/60">
              400 NW 26th St, Miami, FL 33127
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-center text-xs text-black/40">
          © {new Date().getFullYear()} Sentynel LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
};