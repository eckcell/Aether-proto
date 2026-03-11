import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ElementalProfile } from '../utils/elementalLogic';

interface PredictionEngineProps {
  profile: ElementalProfile;
  onComplete: (prediction: string) => void;
}

const BREATH_EASE = [0.4, 0, 0.2, 1] as const;

const PredictionEngine: React.FC<PredictionEngineProps> = ({ profile, onComplete }) => {
  const [stage, setStage] = useState<'constellation' | 'revealing' | 'complete'>('constellation');
  const [revealedChars, setRevealedChars] = useState<string[]>([]);
  
  // Deterministic 4D calculation
  const prediction = useMemo(() => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const rawNumber = (profile.numericWeight * hour + minute) % 10000;
    return rawNumber.toString().padStart(4, '0');
  }, [profile.numericWeight]);

  useEffect(() => {
    // Stage 1: Constellation Loading
    const loadingTimer = setTimeout(() => {
      setStage('revealing');
    }, 3000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (stage === 'revealing') {
      const revealInterval = setInterval(() => {
        setRevealedChars(prev => {
          if (prev.length < 4) {
            return [...prev, prediction[prev.length]];
          }
          clearInterval(revealInterval);
          setStage('complete');
          setTimeout(() => onComplete(prediction), 1500);
          return prev;
        });
      }, 600);
      return () => clearInterval(revealInterval);
    }
  }, [stage, prediction, onComplete]);

  return (
    <div className="relative w-full max-w-sm flex flex-col items-center justify-center min-h-[400px]">
      <AnimatePresence mode="wait">
        {stage === 'constellation' ? (
          <motion.div
            key="constellation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
            transition={{ duration: 1.5, ease: BREATH_EASE }}
            className="relative w-48 h-48"
          >
            {/* Pulsating Constellation Points */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cosmic-gold rounded-full blur-[1px]"
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1],
                  x: Math.cos(i * 60 * Math.PI / 180) * 80,
                  y: Math.sin(i * 60 * Math.PI / 180) * 80,
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: BREATH_EASE
                }}
              />
            ))}
            {/* Connecting lines (SVG) */}
            <svg className="absolute inset-[-40px] w-[calc(100%+80px)] h-[calc(100%+80px)] opacity-20">
              <motion.circle
                cx="50%"
                cy="50%"
                r="80"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-cosmic-gold"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, ease: BREATH_EASE }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] uppercase tracking-[0.5em] text-cosmic-gold animate-pulse text-center">
                Aligning<br/>Celestial Tides
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="prediction"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: BREATH_EASE }}
            className="flex flex-col items-center"
          >
            <div className="text-cosmic-gold/30 text-[9px] uppercase tracking-[0.4em] mb-12">
              Generated Harmonic
            </div>

            <div className="flex gap-4">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={revealedChars.length > i ? { 
                    opacity: 1, 
                    y: 0,
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{ ease: BREATH_EASE, duration: 0.8 }}
                  className={`relative w-14 h-20 glass rounded-2xl flex items-center justify-center text-4xl font-light text-cosmic-gold
                    ${revealedChars.length === i + 1 ? 'glow-aura shake-subtle' : ''}
                    ${revealedChars.length > i ? 'border-cosmic-gold/30' : 'border-transparent'}
                  `}
                >
                  {revealedChars[i] || ''}
                  <AnimatePresence>
                    {revealedChars.length === i + 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 rounded-2xl bg-cosmic-gold blur-lg -z-10"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .glow-aura {
          box-shadow: 0 0 25px rgba(255, 207, 125, 0.4);
        }
        .shake-subtle {
          animation: shake 0.3s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-2px, 0, 0); }
          40%, 60% { transform: translate3d(2px, 0, 0); }
        }
      `}} />
    </div>
  );
};

export default PredictionEngine;
