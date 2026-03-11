import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCharWeight } from '../utils/gematria';

interface SacredNameInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SacredNameInput: React.FC<SacredNameInputProps> = ({ value, onChange, placeholder }) => {
  const [lastChar, setLastChar] = useState<{ char: string; weight: number; key: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const diff = newValue.length - value.length;

    if (diff === 1) {
      const char = newValue[newValue.length - 1];
      const weight = getCharWeight(char);
      if (weight > 0) {
        setLastChar({ char, weight, key: Date.now() });
      }
    }
    onChange(newValue);
  };

  return (
    <div className="relative glass px-5 py-2 sm:px-8 sm:py-5 rounded-[1rem] sm:rounded-[2rem] w-full max-w-[280px] sm:max-w-none text-center border-cosmic-gold/10 group h-[64px] sm:h-[100px] flex flex-col justify-center">
      <span className="text-cosmic-gold/60 text-[7px] sm:text-[9px] uppercase tracking-[0.3em] block mb-0.5 font-medium">Sacred Name</span>
      
      <div className="relative flex justify-center items-center h-8 sm:h-12 overflow-visible">
        <input 
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInput}
          className="absolute inset-0 bg-transparent border-none outline-none text-cosmic-gold text-base sm:text-2xl font-normal tracking-wide w-full text-center placeholder:text-cosmic-gold/20 z-10"
          placeholder={placeholder}
        />
        
        {/* Animation Overlay for Gematria Numbers */}
        <AnimatePresence>
          {lastChar && (
            <motion.div
              key={lastChar.key}
              initial={{ opacity: 0, y: 0, scale: 0.5, filter: 'blur(10px)' }}
              animate={{ 
                opacity: [0, 1, 0.8, 0],
                y: -40,
                scale: [0.5, 1.5, 2, 1],
                filter: ['blur(10px)', 'blur(0px)', 'blur(5px)']
              }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute pointer-events-none text-cosmic-gold font-display font-bold text-4xl pointer-events-none"
            >
              {lastChar.weight}
              <div className="absolute inset-0 bg-cosmic-gold/20 blur-xl rounded-full -z-10" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="h-[1px] w-0 group-focus-within:w-1/2 transition-all duration-1000 bg-cosmic-gold/30 mx-auto mt-0.5" />
    </div>
  );
};

export default SacredNameInput;
