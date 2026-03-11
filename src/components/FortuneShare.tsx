import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import { Share2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { ElementalProfile } from '../utils/elementalLogic';

interface FortuneShareProps {
  profile: ElementalProfile;
  prediction: string;
  city: string;
}

const FortuneShare: React.FC<FortuneShareProps> = ({ profile, prediction, city }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (cardRef.current === null) return;
    
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = `Aether-Fortune-${prediction}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Could not generate image', err);
    }
  };

  const BREATH_EASE = [0.4, 0, 0.2, 1] as const;

  return (
    <div className="mt-8 flex flex-col items-center">
      {/* Hidden Star Chart for Capture */}
      <div className="fixed left-[-9999px]">
        <div 
          ref={cardRef}
          className="w-[800px] h-[800px] bg-[#0b0e14] p-20 flex flex-col items-center justify-center relative border-4 border-cosmic-gold/10 overflow-hidden"
        >
          {/* Cosmic Overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-nebula-glow)_0%,_transparent_70%)] opacity-30" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none" />
          
          {/* Star Chart SVG */}
          <svg className="absolute w-[600px] h-[600px] opacity-10 text-cosmic-gold rotate-45">
            <circle cx="300" cy="300" r="280" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="300" cy="300" r="200" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M 300 20 L 300 580 M 20 300 L 580 300" stroke="currentColor" strokeWidth="0.5" />
          </svg>

          <div className="z-10 text-center">
            <h1 className="text-cosmic-gold/20 text-3xl uppercase tracking-[1em] mb-12">Aether</h1>
            
            <div className={`w-32 h-32 rounded-full border border-cosmic-gold/20 glass flex items-center justify-center mb-8 mx-auto ${profile.color}`}>
              <profile.icon className="w-16 h-16" />
            </div>

            <h2 className={`text-7xl font-light mb-4 tracking-tighter ${profile.color}`}>
              {profile.element}
            </h2>

            <div className="flex flex-col items-center gap-2 mb-16">
              <span className="text-cosmic-gold/30 text-xl tracking-[0.5em] uppercase">Celestial Harmonic</span>
              <span className="text-8xl font-light text-cosmic-gold tracking-[0.3em]">{prediction}</span>
            </div>

            <div className="text-cosmic-gold/40 text-xl tracking-[0.4em] uppercase">
              Manifested in {city}
            </div>
          </div>
        </div>
      </div>

      <motion.button
        onClick={handleShare}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ ease: BREATH_EASE, duration: 0.8 }}
        className="glass-gold py-4 px-10 rounded-full flex items-center gap-3 group"
      >
        <Share2 className="w-4 h-4 text-cosmic-gold group-hover:rotate-12 transition-transform duration-700" />
        <span className="text-cosmic-gold text-xs uppercase tracking-[0.3em] font-medium">
          Share Your Fortune
        </span>
        <Sparkles className="w-4 h-4 text-cosmic-gold/40" />
      </motion.button>
    </div>
  );
};

export default FortuneShare;
