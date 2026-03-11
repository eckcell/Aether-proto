import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AstrolabeDialProps {
  label: string;
  value: string;
  onNext: () => void;
  onPrev: () => void;
}

const BREATH_EASE = [0.4, 0, 0.2, 1] as const;

const AstrolabeDial: React.FC<AstrolabeDialProps> = ({ label, value, onNext, onPrev }) => {
  const [rotation, setRotation] = useState(0);

  const handleNext = () => {
    setRotation(prev => prev + 30);
    onNext();
  };

  const handlePrev = () => {
    setRotation(prev => prev - 30);
    onPrev();
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-1 sm:p-2">
      <div className="text-cosmic-gold/80 text-[10px] sm:text-[11px] font-display uppercase tracking-[0.4em] mb-1 sm:mb-4 font-semibold">
        {label}
      </div>
      
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
        {/* Outer Glow Ring */}
        <div className="absolute inset-0 rounded-full border border-cosmic-gold/10 glow-sm glass bg-white/[0.01]" />
        
        {/* Decorative Marks */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute h-full w-[1px] bg-cosmic-gold/10"
            style={{ transform: `rotate(${i * 30}deg)` }}
          >
            <div className={`w-[1px] h-1.5 bg-cosmic-gold/30 mt-0.5`} />
          </div>
        ))}

        {/* Inner Rotating Ring */}
        <motion.div 
          className="absolute inset-3 rounded-full border border-cosmic-gold/5"
          animate={{ rotate: rotation }}
          transition={{ duration: 1.2, ease: BREATH_EASE }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cosmic-gold/40 rounded-full blur-[2px]" />
        </motion.div>

        {/* Selected Value */}
        <div className="z-10 flex flex-col items-center px-4">
          <motion.div 
            key={value}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: BREATH_EASE }}
            className="text-2xl font-normal text-cosmic-gold tracking-tight text-center"
          >
            {value}
          </motion.div>
        </div>
      </div>

      {/* Interaction Controls */}
      <div className="flex gap-12 mt-1 sm:mt-5">
        <button 
          onClick={handlePrev}
          className="text-cosmic-gold/60 hover:text-cosmic-gold/90 transition-colors text-2xl p-1 flex items-center justify-center"
        >
          <span className="font-light">−</span>
        </button>
        <button 
          onClick={handleNext}
          className="text-cosmic-gold/60 hover:text-cosmic-gold/90 transition-colors text-2xl p-1 flex items-center justify-center"
        >
          <span className="font-light">+</span>
        </button>
      </div>
    </div>
  );
};

export default AstrolabeDial;
