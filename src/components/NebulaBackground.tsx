import React from 'react';

const NebulaBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-nebula-deep">
      {/* Primary nebula mass */}
      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] opacity-40">
        <div className="absolute top-[20%] left-[30%] w-[60%] h-[60%] bg-nebula-glow rounded-full blur-[120px] animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute top-[40%] right-[20%] w-[50%] h-[50%] bg-nebula-accent rounded-full blur-[100px] animate-[pulse_12s_ease-in-out_infinite_1s]" />
        <div className="absolute bottom-[20%] left-[10%] w-[70%] h-[70%] bg-blue-900/20 rounded-full blur-[150px] animate-[pulse_15s_ease-in-out_infinite_2s]" />
      </div>

      {/* Subtle liquid surface ripples */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="liquid">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" seed="1" />
            <feDisplacementMap in="SourceGraphic" scale="30" />
          </filter>
          <rect width="100%" height="100%" filter="url(#liquid)" fill="none" />
        </svg>
      </div>

      {/* Grainy texture for metaphysical depth */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default NebulaBackground;
