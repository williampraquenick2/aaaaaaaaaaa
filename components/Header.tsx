
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="relative bg-[#94b494]/90 pt-10 pb-14 px-4 overflow-hidden border-b border-emerald-900/10 backdrop-blur-sm">
      {/* Nature gradient top bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-800 via-purple-600 to-green-800"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-900/10 text-purple-900 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6 border border-purple-900/20 shadow-sm backdrop-blur-md">
          <span className="w-1.5 h-1.5 bg-emerald-700 rounded-full animate-pulse"></span>
          Colheita Artesanal
        </div>
        
        {/* Purple Headline on Green background */}
        <h1 className="text-5xl md:text-7xl font-serif font-black text-purple-900 tracking-tighter leading-none mb-3">
          ALHO <span className="text-purple-700">E</span> SÓ
        </h1>
        
        <p className="mt-4 text-emerald-950 font-bold text-sm md:text-base max-w-xs mx-auto leading-relaxed italic border-t border-purple-900/20 pt-4 opacity-70">
          Alhos e temperos artesanais, prontos para facilitar sua cozinha
        </p>
      </div>
      
      {/* Decorative Glows */}
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-purple-200/20 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-200/20 rounded-full blur-[80px] pointer-events-none"></div>
    </header>
  );
};

export default Header;
