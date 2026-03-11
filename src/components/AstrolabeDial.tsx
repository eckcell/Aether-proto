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
      <div className="text-cosmic-gold/40 text-[8px] sm:text-[9px] font-display uppercase tracking-[0.3em] mb-2 sm:mb-3">
        {label}
      </div>
      
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
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
            className="text-xl font-light text-cosmic-gold/90 tracking-tight text-center"
          >
            {value}
          </motion.div>
        </div>
      </div>

      {/* Interaction Controls */}
      <div className="flex gap-8 mt-4">
        <button 
          onClick={handlePrev}
          className="text-cosmic-gold/20 hover:text-cosmic-gold/60 transition-colors text-lg"
        >
          †
        </button>
        <button 
          onClick={handleNext}
          className="text-cosmic-gold/20 hover:text-cosmic-gold/60 transition-colors text-lg"
        >
          ‡
        </button>
      </div>
    </div>
  );
};

export default AstrolabeDial;
