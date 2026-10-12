import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface NavigationProps {
  onReopenPortal?: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Endorsements', href: '#endorsements' },
  { label: 'Contact', href: '#contact' },
];

export const Navigation: React.FC<NavigationProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Track active section
      const sectionIds = ['hero', 'about', 'skills', 'projects', 'endorsements', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-auto ${
        isScrolled
          ? 'py-3.5 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-md'
          : 'py-5 bg-gradient-to-b from-white/90 via-white/40 to-transparent backdrop-blur-[2px]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="text-2xl sm:text-3xl text-slate-900 tracking-tight hover:opacity-80 transition-opacity whitespace-nowrap shrink-0"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {PORTFOLIO_INFO.name}
        </a>

        {/* Zone 2: Clean Text Navigation Links */}
        <nav className="flex items-center gap-3 sm:gap-6 md:gap-7 text-xs sm:text-sm font-medium overflow-x-auto no-scrollbar py-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                  isActive ? 'text-slate-950 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-600 rounded-full"
                    transition={{ type: 'spring', damping: 30, stiffness: 350 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Direct Action */}
        <div className="flex items-center shrink-0">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-medium tracking-wide uppercase text-white bg-slate-900 hover:bg-slate-800 transition-all cursor-pointer whitespace-nowrap shadow-sm"
          >
            <span className="hidden sm:inline">Initiate Contact</span>
            <span className="sm:hidden">Contact</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
          </a>
        </div>
      </div>
    </header>
  );
};
