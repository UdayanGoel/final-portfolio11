import React from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Sparkles, MapPin, GraduationCap, ChevronDown } from 'lucide-react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onExploreSkills: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
  onExploreSkills,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-16 px-6 sm:px-10 lg:px-16 overflow-hidden select-none"
    >
      {/* Background Cinematic Video Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-15"
          src={PORTFOLIO_INFO.heroVideoUrl}
        />
        {/* Soft atmospheric gradient overlays for perfect contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/85 to-[#f8fafc]/45" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#f8fafc]/55 to-[#f8fafc]" />
        <div className="absolute inset-0 tech-grid-pattern opacity-30" />
      </div>

      {/* Top Status & Context Row */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-600">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="tracking-widest uppercase text-slate-700 font-semibold">
            {PORTFOLIO_INFO.heroKicker}
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-600">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-cyan-600" />
            <span>{PORTFOLIO_INFO.location}</span>
          </span>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span className="flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
            <span>{PORTFOLIO_INFO.university}</span>
          </span>
        </div>
      </div>

      {/* Main Center Editorial Typography & Pitch */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12 flex flex-col items-start justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 max-w-5xl"
        >
          {/* Subtle Tagline Lead */}
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-700 uppercase font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Systems · Computer Vision · Modern Web Engineering</span>
          </div>

          {/* Master Heading */}
          <h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight text-slate-950 leading-[0.95]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Where <em className="italic text-slate-500 font-light">dreams</em> rise{' '}
            <span className="block sm:inline">through the silence.</span>
          </h1>

          {/* Authentic Bio Paragraph */}
          <p className="text-base sm:text-xl font-light text-slate-700 max-w-2xl leading-relaxed">
            {PORTFOLIO_INFO.bio}
          </p>

          {/* Interactive CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreProjects}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-slate-900 text-white font-medium text-sm tracking-wide cursor-pointer hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl"
            >
              <span>Explore Featured Work</span>
              <ArrowDownRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={onExploreSkills}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-slate-300 hover:border-slate-400 bg-white/80 hover:bg-white text-slate-700 hover:text-slate-950 font-medium text-sm tracking-wide cursor-pointer transition-all duration-300 shadow-sm"
            >
              <span>Technical Capabilities</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Editorial Meta Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-600">
        <div className="flex items-center gap-2">
          <span className="text-cyan-700 font-semibold">{PORTFOLIO_INFO.status}</span>
        </div>

        <div className="flex items-center gap-6 text-slate-600">
          <span>{PORTFOLIO_INFO.degree}</span>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span>Cohort 2026–Present</span>
        </div>

        <button
          onClick={onExploreProjects}
          className="flex items-center gap-1.5 text-slate-600 hover:text-cyan-700 transition-colors cursor-pointer"
        >
          <span>Scroll down</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
