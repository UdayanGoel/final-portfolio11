import React from 'react';
import { ArrowUp, Sparkles, MapPin, Compass } from 'lucide-react';
import { PORTFOLIO_INFO, SOCIAL_LINKS } from '../data/portfolioData';

interface FooterProps {
  onReopenPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReopenPortal }) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-16 px-6 sm:px-10 lg:px-16 border-t border-white/10 bg-[#02050a] text-slate-400 text-xs font-mono select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 uppercase tracking-widest text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>UDAYAN GOEL · AI & TECHNOLOGY PORTFOLIO</span>
            </div>
            <div
              className="text-3xl sm:text-4xl text-white font-normal tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {PORTFOLIO_INFO.name}
            </div>
            <p className="text-slate-400 font-sans text-xs max-w-md font-light leading-relaxed">
              1st Year B.Tech Computer Science & Engineering student at JECRC University, exploring artificial intelligence, computer vision applications, and high-performance modern web engineering.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                {s.name}
              </a>
            ))}

            {onReopenPortal && (
              <button
                onClick={onReopenPortal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-cyan-500/40 bg-cyan-950/30 hover:bg-cyan-500/20 text-cyan-200 hover:text-white transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md"
                aria-label="Return to Entry Portal"
                title="Go back to entry portal and experience again"
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Return to Entry Portal</span>
              </button>
            )}

            <button
              onClick={handleScrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md"
              aria-label="Back to top"
              title="Return to top of experience"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>{PORTFOLIO_INFO.location}</span>
            <span aria-hidden="true">·</span>
            <span>© {new Date().getFullYear()} {PORTFOLIO_INFO.name}. All rights reserved.</span>
          </div>

          <div>
            Crafted with React 19, TypeScript, Tailwind CSS & Motion Physics
          </div>
        </div>
      </div>
    </footer>
  );
};
