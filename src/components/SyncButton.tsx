import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface SyncButtonProps {
  onClick: () => void;
}

const SyncButton: React.FC<SyncButtonProps> = ({ onClick }) => {
  const BREATH_EASE = [0.4, 0, 0.2, 1] as const;

  return (
    <motion.button
      onClick={onClick}
      className="relative group px-8 py-3.5 sm:px-12 sm:py-5 rounded-full glass-gold overflow-hidden transition-all active:scale-95"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.8, ease: BREATH_EASE }}
    >
      {/* Pulsating heartbeat glow */}
      <div className="absolute inset-0 bg-cosmic-gold/10 animate-pulse-gold -z-10" />
      
      {/* Button content */}
      <div className="flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-cosmic-gold" />
        <span className="text-cosmic-gold font-display font-medium tracking-[0.15em] uppercase text-sm">
          Sync with Universe
        </span>
      </div>

      {/* Glossy overlay */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white/5 skew-y-[-5deg] origin-top-left" />
    </motion.button>
  );
};

export default SyncButton;
