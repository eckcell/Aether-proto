import React, { useState, useMemo } from 'react';
import { getBirthElement } from './utils/elementalLogic';
import NebulaBackground from './components/NebulaBackground';
import AstrolabeDial from './components/AstrolabeDial';
import SyncButton from './components/SyncButton';
import ElementalCard from './components/ElementalCard';
import PredictionEngine from './components/PredictionEngine';
import FortuneShare from './components/FortuneShare';
import { motion, AnimatePresence } from 'framer-motion';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const YEARS = Array.from({ length: 100 }, (_, i) => 2026 - i);

// Organic breathing ease
const BREATH_EASE = [0.4, 0, 0.2, 1] as const;

interface CosmicData {
  day: number;
  month: number;
  year: number;
  hour: number;
  city: string;
}

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'predicting' | 'synced'>('landing');
  const [prediction, setPrediction] = useState<string>('');
  const [data, setData] = useState<CosmicData>({
    day: 11,
    month: 2,
    year: 1995,
    hour: 12,
    city: 'Astraea'
  });

  const natalElement = useMemo(() => getBirthElement(data.year), [data.year]);

  const handleSync = () => {
    setView('predicting');
  };

  const handlePredictionComplete = (result: string) => {
    setPrediction(result);
    setView('synced');
  };

  const updateBirthData = (key: keyof Omit<CosmicData, 'city'>, delta: number, max: number, min = 0) => {
    setData(prev => {
      let val = (prev[key] as number) + delta;
      if (val > max) val = min;
      if (val < min) val = max;
      return { ...prev, [key]: val };
    });
  };

  const updateYear = (delta: number) => {
    setData(prev => {
      const currentIndex = YEARS.indexOf(prev.year);
      let nextIndex = currentIndex + delta;
      if (nextIndex >= YEARS.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = YEARS.length - 1;
      return { ...prev, year: YEARS[nextIndex] };
    });
  };

  return (
    <div className="relative h-[100svh] w-full flex flex-col items-center justify-start overflow-hidden font-display tracking-wider p-4 sm:p-6">
      <NebulaBackground />

      <main className="relative z-10 w-full max-w-lg flex flex-col items-center pt-8 sm:pt-12 pb-4 transition-all duration-1000 ease-out">
        <AnimatePresence mode="wait">
          {view === 'landing' ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(15px)' }}
              transition={{ duration: 1.2, ease: BREATH_EASE }}
              className="w-full flex flex-col items-center"
            >
              <div className="text-center mb-4 sm:mb-8">
                <h1 className="text-3xl sm:text-5xl font-medium text-cosmic-gold tracking-tight mb-1">
                  Aether
                </h1>
                <p className="text-cosmic-gold/60 text-[9px] sm:text-[12px] tracking-[0.5em] uppercase font-semibold">
                  Metaphysical Alignment
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:gap-y-10 mb-6 sm:mb-14 w-full place-items-center">
                <AstrolabeDial 
                  label="Month" 
                  value={MONTHS[data.month]} 
                  onNext={() => updateBirthData('month', 1, 11)}
                  onPrev={() => updateBirthData('month', -1, 11)}
                />
                <AstrolabeDial 
                  label="Day" 
                  value={data.day.toString().padStart(2, '0')} 
                  onNext={() => updateBirthData('day', 1, 31, 1)}
                  onPrev={() => updateBirthData('day', -1, 31, 1)}
                />
                <AstrolabeDial 
                  label="Year" 
                  value={data.year.toString()} 
                  onNext={() => updateYear(-1)}
                  onPrev={() => updateYear(1)}
                />
                <AstrolabeDial 
                  label="Chronos" 
                  value={`${data.hour.toString().padStart(2, '0')}:00`} 
                  onNext={() => updateBirthData('hour', 1, 23)}
                  onPrev={() => updateBirthData('hour', -1, 23)}
                />
              </div>
              
              <div className="glass px-5 py-3 sm:px-8 sm:py-5 rounded-[1.2rem] sm:rounded-[2rem] w-full text-center border-cosmic-gold/10 mb-6 sm:mb-10 group">
                <span className="text-cosmic-gold/60 text-[8px] sm:text-[9px] uppercase tracking-[0.3em] block mb-1 font-medium">Location</span>
                <input 
                  type="text"
                  value={data.city}
                  onChange={(e) => setData(d => ({ ...d, city: e.target.value }))}
                  className="bg-transparent border-none outline-none text-cosmic-gold text-lg sm:text-2xl font-normal tracking-wide w-full text-center placeholder:text-cosmic-gold/20"
                  placeholder="Enter City..."
                />
                <div className="h-[1px] w-0 group-focus-within:w-1/2 transition-all duration-1000 bg-cosmic-gold/30 mx-auto mt-1" />
              </div>

              <SyncButton onClick={handleSync} />
            </motion.div>
          ) : view === 'predicting' ? (
            <PredictionEngine 
              key="predicting"
              profile={natalElement} 
              onComplete={handlePredictionComplete} 
            />
          ) : (
            <motion.div 
              key="synced"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: BREATH_EASE }}
              className="flex flex-col items-center w-full max-h-[85vh] overflow-y-auto no-scrollbar pb-10"
            >
              <div className="w-full flex flex-col items-center scale-[0.85] sm:scale-100 origin-top">
                <ElementalCard 
                  profile={natalElement} 
                  prediction={prediction}
                  onReset={() => setView('landing')} 
                />
                <FortuneShare 
                  profile={natalElement} 
                  prediction={prediction} 
                  city={data.city} 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative elements */}
        <div className="fixed bottom-10 left-10 w-32 h-32 rounded-full glass opacity-5 animate-[orbit_60s_linear_infinite] -z-10" />
        <div className="fixed top-20 right-[-5%] w-64 h-64 rounded-full glass opacity-5 animate-[orbit_90s_linear_infinite_reverse] -z-10" />
      </main>

      {/* Decorative corners */}
      <div className="fixed top-0 left-0 w-24 h-24 border-t border-l border-cosmic-gold/5 m-4 rounded-tl-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-24 h-24 border-b border-r border-cosmic-gold/5 m-4 rounded-br-3xl pointer-events-none" />
    </div>
  );
};

export default App;
