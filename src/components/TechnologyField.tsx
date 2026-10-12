import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Cpu, Code2, Database, Terminal, Layers, CheckCircle2 } from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import { SkillItem } from '../types/portfolio';

const CATEGORIES = ['All', 'AI & Data', 'Frontend & Web', 'Core CS', 'Productivity & Tools'] as const;

export const TechnologyField: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkillId, setActiveSkillId] = useState<string>('ai-llm');

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === selectedCategory);

  const activeSkill = SKILLS_DATA.find((s) => s.id === activeSkillId) || SKILLS_DATA[0];

  const getCategoryIcon = (category: SkillItem['category']) => {
    switch (category) {
      case 'AI & Data':
        return Cpu;
      case 'Frontend & Web':
        return Code2;
      case 'Core CS':
        return Database;
      case 'Productivity & Tools':
        return Terminal;
      default:
        return Layers;
    }
  };

  return (
    <section id="skills" className="relative py-32 px-6 sm:px-10 lg:px-16 border-t border-slate-200/80 select-none overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-400/[0.03] blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-700 mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>02. Technological Environment</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-slate-950"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Interactive <em className="italic text-slate-500">technical ecosystem.</em>
            </h2>
          </div>

          {/* Category Filter Tabs (Functional segmented buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl liquid-glass border border-slate-200/90 shadow-sm">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Spatial Interactive Field Layout: Network Node Selector + Detailed Inspection View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Node Map */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="text-xs font-mono text-slate-600 uppercase tracking-wider mb-2 flex items-center justify-between font-semibold">
              <span>Select System Vector ({filteredSkills.length} Capabilities)</span>
              <span className="text-cyan-700">Interactive Hub</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {filteredSkills.map((skill) => {
                const Icon = getCategoryIcon(skill.category);
                const isActive = activeSkill.id === skill.id;

                return (
                  <motion.div
                    key={skill.id}
                    layout
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveSkillId(skill.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                      isActive
                        ? 'bg-white border-cyan-500/60 shadow-[0_4px_24px_rgba(14,165,233,0.15)] ring-1 ring-cyan-500/30'
                        : 'liquid-glass border-slate-200/80 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded-xl border ${
                        isActive 
                          ? 'bg-cyan-50 border-cyan-200 text-cyan-700' 
                          : 'bg-slate-100 border-slate-200 text-slate-600'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>

                      <span className="text-[11px] font-mono text-slate-500">
                        {skill.category}
                      </span>
                    </div>

                    <div>
                      <h3 className={`text-base font-semibold tracking-tight ${
                        isActive ? 'text-slate-950' : 'text-slate-800'
                      }`}>
                        {skill.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 font-mono truncate">
                        {skill.level}
                      </p>
                    </div>

                    {/* Active highlight indicator */}
                    {isActive && (
                      <div className="absolute top-0 right-0 w-12 h-12 bg-cyan-400/10 blur-xl pointer-events-none" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Deep-Dive Active Node Inspector */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkill.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl flex flex-col justify-between h-full space-y-6 relative overflow-hidden"
              >
                {/* Header info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-cyan-700 font-semibold">
                      Telemetry & Execution Spec
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {activeSkill.category}
                    </span>
                  </div>

                  <h3 
                    className="text-3xl text-slate-950 font-normal tracking-tight"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {activeSkill.name}
                  </h3>

                  <div className="p-3.5 rounded-xl bg-cyan-50 border border-cyan-200 text-xs font-mono text-cyan-800">
                    {activeSkill.experience}
                  </div>

                  <p className="text-sm font-light text-slate-700 leading-relaxed pt-2">
                    {activeSkill.highlight}
                  </p>
                </div>

                {/* Tags breakdown */}
                <div className="pt-6 border-t border-slate-200/80 space-y-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block font-medium">
                    Core Technologies & Frameworks
                  </span>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-700 font-mono">
                    {activeSkill.tags.map((tag, i) => (
                      <React.Fragment key={tag}>
                        <span className="flex items-center gap-1.5 text-cyan-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
                          {tag}
                        </span>
                        {i < activeSkill.tags.length - 1 && (
                          <span aria-hidden="true" className="text-slate-300">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Academic Alignment note */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-600 flex items-center justify-between">
                  <span>JECRC UNIVERSITY LABS</span>
                  <span className="text-slate-900 font-semibold">ACTIVE PRODUCTION COHORT</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
