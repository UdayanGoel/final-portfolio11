import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Compass, Zap } from 'lucide-react';
import { PORTFOLIO_INFO, spatialPortalImg } from '../data/portfolioData';
import { SolarSystemBackground } from './SolarSystemBackground';

interface EntryExperienceProps {
  onEnter: () => void;
}

export const EntryExperience: React.FC<EntryExperienceProps> = ({ onEnter }) => {
  const [isEntering, setIsEntering] = useState(false);
  const [portalHovered, setPortalHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        handleTriggerEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEntering) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleTriggerEnter = () => {
    if (isEntering) return;
    setIsEntering(true);
    // Smooth cinematic portal transition into first page of portfolio
    setTimeout(() => {
      onEnter();
    }, 650);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ 
        opacity: isEntering ? 0 : 1, 
        scale: isEntering ? 1.15 : 1,
      }}
      exit={{ 
        opacity: 0, 
        scale: 1.2,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
      }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-12 bg-[#03060c] text-white overflow-hidden select-none cursor-default"
      style={{ willChange: 'opacity, transform' }}
    >
      {/* Solar System Planetary Background in Portal */}
      <SolarSystemBackground mode="portal" />

      {/* Zero-lag hardware-accelerated warp flash */}
      {isEntering && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 bg-radial from-cyan-400/40 via-sky-300/20 to-transparent pointer-events-none z-30"
        />
      )}

      {/* Dynamic atmospheric background depth */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle radial light pool following mouse */}
        <div 
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{
            background: isEntering 
              ? 'radial-gradient(circle 1000px at 50% 50%, rgba(56, 189, 248, 0.25), rgba(6, 182, 212, 0.15) 30%, transparent 70%)'
              : `radial-gradient(circle 800px at ${50 + mousePos.x * 25}% ${50 + mousePos.y * 25}%, rgba(14, 165, 233, 0.12), rgba(6, 182, 212, 0.03) 40%, transparent 80%)`,
          }}
        />
        <div className={`absolute inset-0 tech-grid-pattern transition-opacity duration-500 ${
          isEntering ? 'opacity-60' : 'opacity-30'
        }`} />
        <div className="absolute inset-0 bg-radial from-transparent via-[#03060c]/60 to-[#03060c]" />

        {/* Hyperspace Radial Warp Streaks on Entering */}
        {isEntering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 3.5, rotate: 180 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-r from-cyan-500/30 via-transparent to-sky-400/30 blur-2xl animate-spin" />
            <div className="absolute w-[600px] h-[600px] rounded-full border-2 border-cyan-400/60 animate-ping" />
          </motion.div>
        )}
      </div>

      {/* Top Header kicker */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isEntering ? 0 : 1, y: isEntering ? -30 : 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between text-xs font-mono tracking-widest text-slate-400"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">SYSTEM ID · UG-PORTFOLIO // 2026</span>
        </div>
        
        <button
          onClick={handleTriggerEnter}
          className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 py-1 px-3 rounded-lg border border-white/5 hover:border-white/20 bg-white/[0.02]"
        >
          <span>Skip Entrance</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </motion.div>

      {/* Center Interactive Portal Environment */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl my-auto">
        {/* Spatial 3D Portal Visual Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ 
            opacity: 1, 
            scale: isEntering ? 2.8 : portalHovered ? 1.08 : 1,
            rotateX: isEntering ? 0 : mousePos.y * -15,
            rotateY: isEntering ? 0 : mousePos.x * 15,
          }}
          transition={{ duration: isEntering ? 1.1 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformPerspective: 1000 }}
          onMouseEnter={() => setPortalHovered(true)}
          onMouseLeave={() => setPortalHovered(false)}
          onClick={handleTriggerEnter}
          className="relative w-56 h-56 sm:w-72 sm:h-72 mb-8 group cursor-pointer"
        >
          {/* Shockwave Rings */}
          <motion.div
            animate={{
              rotate: isEntering ? 720 : 360,
              scale: isEntering ? 2.5 : 1,
              borderColor: isEntering ? 'rgba(56, 189, 248, 0.9)' : 'rgba(6, 182, 212, 0.25)',
            }}
            transition={{
              rotate: { repeat: isEntering ? 0 : Infinity, duration: isEntering ? 1.1 : 40, ease: isEntering ? [0.16, 1, 0.3, 1] : 'linear' },
              scale: { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
            }}
            className="absolute inset-0 rounded-full border border-cyan-500/20"
          />

          <motion.div
            animate={{
              rotate: isEntering ? -720 : -360,
              scale: isEntering ? 2.2 : 1,
              borderColor: isEntering ? 'rgba(255, 255, 255, 0.9)' : 'rgba(56, 189, 248, 0.3)',
            }}
            transition={{
              rotate: { repeat: isEntering ? 0 : Infinity, duration: isEntering ? 1.1 : 25, ease: isEntering ? [0.16, 1, 0.3, 1] : 'linear' },
              scale: { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
            }}
            className="absolute inset-4 rounded-full border border-sky-400/25"
          />

          <motion.div
            animate={{
              rotate: isEntering ? 1080 : 360,
              scale: isEntering ? 1.8 : 1,
            }}
            transition={{
              rotate: { repeat: isEntering ? 0 : Infinity, duration: isEntering ? 1.1 : 60, ease: isEntering ? [0.16, 1, 0.3, 1] : 'linear' },
              scale: { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
            }}
            className="absolute inset-8 rounded-full border border-dashed border-white/20"
          />

          {/* Central Portal Lens */}
          <motion.div 
            animate={{
              boxShadow: isEntering 
                ? '0 0 100px 30px rgba(56, 189, 248, 0.8), inset 0 0 60px rgba(255, 255, 255, 0.9)' 
                : '0 0 50px rgba(6, 182, 212, 0.25)',
              filter: isEntering ? 'brightness(2.2)' : 'brightness(1)',
            }}
            transition={{ duration: 1.1 }}
            className="absolute inset-10 rounded-full overflow-hidden liquid-glass border border-cyan-400/30 flex items-center justify-center"
          >
            <img 
              src={spatialPortalImg}
              alt="Digital Portal Entrance"
              className={`w-full h-full object-cover transition-all duration-700 ${
                isEntering 
                  ? 'scale-150 opacity-100 filter brightness-150 contrast-150' 
                  : 'opacity-80 group-hover:opacity-100 group-hover:scale-110'
              }`}
              referrerPolicy="no-referrer"
            />
            {/* Center Singularity Light Core */}
            <div className="absolute inset-0 bg-radial from-cyan-400/30 via-transparent to-black/60" />
            <motion.div 
              animate={{ 
                scale: isEntering ? [1, 4, 12] : [1, 1.25, 1], 
                opacity: isEntering ? [0.8, 1, 1] : [0.6, 1, 0.6] 
              }}
              transition={{ 
                repeat: isEntering ? 0 : Infinity, 
                duration: isEntering ? 1.1 : 3, 
                ease: isEntering ? [0.16, 1, 0.3, 1] : 'easeInOut' 
              }}
              className="absolute w-8 h-8 rounded-full bg-cyan-300 blur-sm shadow-[0_0_40px_rgba(56,189,248,1)]"
            />
          </motion.div>

          {/* Interactive "PORTAL ACTIVE" Clickable Badge */}
          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleTriggerEnter();
            }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            animate={{
              boxShadow: isEntering
                ? '0 0 35px rgba(56, 189, 248, 1)'
                : '0 0 15px rgba(6, 182, 212, 0.3)',
              scale: isEntering ? 1.25 : 1,
            }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-widest text-cyan-200 bg-slate-950/95 border border-cyan-400/50 whitespace-nowrap shadow-xl cursor-pointer transition-colors hover:border-cyan-300 hover:text-white flex items-center gap-1.5 z-20 group/badge"
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                isEntering ? 'bg-cyan-300 opacity-90' : 'bg-emerald-400 opacity-75'
              }`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                isEntering ? 'bg-cyan-200' : 'bg-emerald-500'
              }`} />
            </span>
            <span>{isEntering ? 'WARPING IN...' : 'PORTAL ACTIVE'}</span>
            <Zap className={`w-3 h-3 text-cyan-400 transition-transform ${
              isEntering ? 'scale-125 text-white' : 'group-hover/badge:rotate-12'
            }`} />
          </motion.button>
        </motion.div>

        {/* Gradual typography reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ 
            opacity: isEntering ? 0 : 1, 
            y: isEntering ? 20 : 0,
            scale: isEntering ? 0.95 : 1 
          }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.28em] text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI • TECHNOLOGY • CREATIVE ENGINEERING</span>
          </div>

          <h1 
            className="text-5xl sm:text-7xl md:text-8xl tracking-tight text-white font-normal"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {PORTFOLIO_INFO.name}
          </h1>

          <p className="text-sm sm:text-base font-light text-slate-300 max-w-lg mx-auto leading-relaxed">
            {PORTFOLIO_INFO.degree} at {PORTFOLIO_INFO.university}.
            <br />
            Explore an interactive dimension of computational intelligence & web architectures.
          </p>
        </motion.div>

        {/* Enter Interaction Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isEntering ? 0 : 1, 
            y: isEntering ? 20 : 0 
          }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8"
        >
          <button
            onClick={handleTriggerEnter}
            disabled={isEntering}
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full liquid-glass-glow text-white font-medium text-sm tracking-widest uppercase cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl"
          >
            <Compass className={`w-4 h-4 text-cyan-400 ${
              isEntering ? 'animate-spin' : 'group-hover:rotate-90 transition-transform duration-500'
            }`} />
            <span className="relative z-10 font-semibold tracking-wider">
              {isEntering ? 'WARPING INTO WORLD...' : 'ENTER EXPERIENCE'}
            </span>
            <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            
            {/* Ambient edge shine */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </motion.div>
      </div>

      {/* Footer Info & Shortcuts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isEntering ? 0 : 1, y: isEntering ? 20 : 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="relative z-10 w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-2 border-t border-white/5 pt-4"
      >
        <span>JECRC UNIVERSITY · JAIPUR, RAJASTHAN</span>
        <span>CLICK [PORTAL ACTIVE] OR [ENTER EXPERIENCE] TO DIVE IN</span>
        <span>INTERACTIVE PORTFOLIO 2026</span>
      </motion.div>
    </motion.div>
  );
};
