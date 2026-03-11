import React from 'react';
import { motion } from 'framer-motion';
import { ElementalProfile } from '../utils/elementalLogic';

interface ElementalCardProps {
  profile: ElementalProfile;
  prediction: string;
  onReset: () => void;
}

const ElementalCard: React.FC<ElementalCardProps> = ({ profile, prediction, onReset }) => {
  const Icon = profile.icon;
  const BREATH_EASE = [0.4, 0, 0.2, 1] as const;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: BREATH_EASE }}
      className="glass-gold p-8 rounded-[2.5rem] w-full max-w-sm flex flex-col items-center text-center relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px] opacity-20 bg-current ${profile.color}`} />
      
      <div className={`w-20 h-20 rounded-full glass flex items-center justify-center mb-6 ${profile.color}`}>
        <Icon className="w-10 h-10" />
      </div>

      <h3 className="text-xs uppercase tracking-[0.3em] text-cosmic-gold/40 mb-2">
        Primary Element
      </h3>
      
      <h2 className={`text-4xl font-display font-light mb-2 tracking-tight ${profile.color}`}>
        {profile.element}
      </h2>

      <p className="text-cosmic-gold/60 text-sm leading-relaxed mb-6 px-4 font-light">
        {profile.description}
      </p>

      {/* Prediction Result */}
      <div className="flex flex-col gap-1 mb-8 bg-cosmic-gold/5 w-full py-4 rounded-3xl border border-cosmic-gold/10">
        <span className="text-[10px] uppercase tracking-[0.2em] text-cosmic-gold/30">Celestial Harmonic</span>
        <span className="text-3xl font-display text-cosmic-gold font-light tracking-[0.2em]">{prediction}</span>
      </div>

      <div className="flex flex-col gap-1 mb-10">
        <span className="text-[10px] uppercase tracking-[0.2em] text-cosmic-gold/30">Resonant Harmonics</span>
        <span className={`text-lg font-display ${profile.color}`}>{profile.weight}</span>
      </div>

      <button 
        onClick={onReset}
        className="text-cosmic-gold/20 hover:text-cosmic-gold/60 text-[10px] uppercase tracking-[0.3em] transition-colors py-2"
      >
        Return to Tides
      </button>
    </motion.div>
  );
};

export default ElementalCard;
