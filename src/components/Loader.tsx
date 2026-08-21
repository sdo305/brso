import React from 'react';

const Loader: React.FC<{ text?: string }> = ({ text = 'Veuillez patienter...' }) => (
  <div className="fixed inset-0 z-[99999] flex items-center justify-center flex-col" style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #0d1b3e 50%, #1a0a2e 100%)' }}>
    <div className="h-[70px] w-[70px] border-[5px] border-solid border-bourso border-r-[rgba(255,255,255,0.2)] border-b-[rgba(255,255,255,0.2)] rounded-full animate-spin" />
    <p className="mt-5 text-sm text-white/70">{text}</p>
  </div>
);

export default Loader;
