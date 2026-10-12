import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Brain, Cpu, Code2, GraduationCap, MapPin, Calendar } from 'lucide-react';
import { PORTFOLIO_INFO, CORE_PILLARS } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-32 px-6 sm:px-10 lg:px-16 border-t border-slate-200/80 select-none">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-sky-400/[0.04] blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-slate-300/[0.06] blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-700 mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>01. Philosophy & Foundations</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-slate-950"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Engineering with <em className="italic text-slate-500">computational precision.</em>
            </h2>
          </div>

          <p className="text-sm sm:text-base font-light text-slate-600 max-w-md leading-relaxed">
            Bridging theoretical computer science and neural networks with tactile, high-performance digital interfaces.
          </p>
        </div>

        {/* Narrative Split: Large Quote & Institutional Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Progressive Text Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <p className="text-2xl sm:text-3xl font-light text-slate-800 leading-snug">
              &ldquo;{PORTFOLIO_INFO.bio}&rdquo;
            </p>

            <div className="space-y-4 text-sm sm:text-base font-light text-slate-600 leading-relaxed">
              <p>
                My focus centers on taking raw computational logic—whether deep convolutional vision models or reactive state trees—and refining it until the interaction feels intuitive, swift, and reliable.
              </p>
              <p>
                As a Computer Science & Engineering student at JECRC University, I couple daily problem-solving in algorithmic complexity with practical deployment of machine learning pipelines for real-world scenarios like agricultural health diagnostics.
              </p>
            </div>
          </div>

          {/* Right Column: Academic Credential Card (Zero-Pill discipline) */}
          <div className="lg:col-span-5 p-8 rounded-3xl liquid-glass border border-slate-200/90 shadow-lg space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-700 uppercase font-semibold">
              <GraduationCap className="w-4 h-4" />
              <span>Institutional Foundation</span>
            </div>

            <div>
              <h3 
                className="text-3xl text-slate-950 font-normal tracking-tight"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {PORTFOLIO_INFO.university}
              </h3>
              <p className="text-sm font-medium text-slate-700 mt-1">
                {PORTFOLIO_INFO.degree}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-200/80 text-xs text-slate-600 font-mono">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Campus Location</span>
                </span>
                <span className="text-slate-900 font-semibold">{PORTFOLIO_INFO.location}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Academic Period</span>
                </span>
                <span className="text-slate-900 font-semibold">{PORTFOLIO_INFO.cohort}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Core Discipline</span>
                </span>
                <span className="text-slate-900 font-semibold">Artificial Intelligence & Systems</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="p-3.5 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-xs text-cyan-900 font-medium">
                  {PORTFOLIO_INFO.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars Showcase Cards */}
        <div className="space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-600 font-semibold">
            Core Technological Vectors
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CORE_PILLARS.map((pillar, index) => {
              const Icon = index === 0 ? Brain : index === 1 ? Code2 : Cpu;
              return (
                <motion.div
                  key={pillar.id}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="group relative rounded-3xl overflow-hidden liquid-glass border border-slate-200/90 shadow-md p-6 flex flex-col justify-between h-full space-y-6"
                >
                  {/* Subtle top image preview */}
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 p-2 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 text-cyan-700 shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="absolute bottom-3 right-3 text-[11px] font-mono text-cyan-200 bg-slate-950/80 px-2 py-0.5 rounded-md border border-cyan-400/30">
                      {pillar.metrics}
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono tracking-wider uppercase text-cyan-700 font-medium">
                      {pillar.tagline}
                    </div>
                    <h3 className="text-xl font-bold text-slate-950 tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-light text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
