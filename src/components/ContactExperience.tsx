import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Mail, 
  Copy, 
  Check, 
  ArrowUpRight, 
  Send, 
  MapPin, 
  GraduationCap 
} from 'lucide-react';
import { PORTFOLIO_INFO, SOCIAL_LINKS } from '../data/portfolioData';

export const ContactExperience: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="relative py-32 px-6 sm:px-10 lg:px-16 border-t border-white/5 select-none">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-600/5 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>05. Initiate Conversation</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Let&apos;s build <em className="italic text-slate-400">something extraordinary.</em>
            </h2>
          </div>

          <p className="text-sm sm:text-base font-light text-slate-400 max-w-md leading-relaxed">
            Whether you&apos;re exploring research collaboration, AI implementations, or software engineering internships, my inbox is open.
          </p>
        </div>

        {/* Primary Contact Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Direct Email Focal Point */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl liquid-glass border border-cyan-400/30 flex flex-col justify-between space-y-8 bg-cyan-950/10 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 uppercase tracking-widest">
                  Direct Inbound Channel
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active Monitoring
                </span>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="p-3.5 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300">
                  <Mail className="w-7 h-7" />
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight truncate">
                    {PORTFOLIO_INFO.email}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Fastest turnaround for research & professional discussions
                  </p>
                </div>
              </div>
            </div>

            {/* Email Actions: Copy + Compose */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
              <button
                onClick={handleCopyEmail}
                className={`flex-1 min-w-[150px] py-3.5 px-6 rounded-xl border text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 ${
                  copied
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                    : 'bg-white/5 border-white/10 hover:border-white/20 text-slate-200 hover:text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Address Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>

              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PORTFOLIO_INFO.email)}&su=${encodeURIComponent('Inquiry / Opportunity for Udayan Goel')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[150px] py-3.5 px-6 rounded-xl liquid-glass-glow text-white text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-md group"
                title="Compose mail to goeludayan@gmail.com in Gmail"
              >
                <span>Compose Mail</span>
                <Send className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Social Channels Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className={`p-6 rounded-2xl liquid-glass border border-white/10 hover:border-white/30 flex flex-col justify-between h-36 group transition-all duration-300 ${link.accent}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    {link.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {link.name}
                  </h4>
                  <p className="text-xs font-mono text-slate-400 truncate mt-0.5">
                    {link.handle}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Institutional & Geographic Anchor Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{PORTFOLIO_INFO.location}</span>
            </span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              <span>{PORTFOLIO_INFO.university} ({PORTFOLIO_INFO.degree})</span>
            </span>
          </div>

          <div className="text-slate-500">
            Open for Academic Research & Software Engineering Roles
          </div>
        </div>
      </div>
    </section>
  );
};
