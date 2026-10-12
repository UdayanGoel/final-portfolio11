/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { ArrowUp, Compass } from 'lucide-react';
import { InteractiveCursor } from './components/InteractiveCursor';
import { EntryExperience } from './components/EntryExperience';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TechnologyField } from './components/TechnologyField';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { CommunityEndorsements } from './components/CommunityEndorsements';
import { ContactExperience } from './components/ContactExperience';
import { Footer } from './components/Footer';
import { SolarSystemBackground } from './components/SolarSystemBackground';

export default function App() {
  const [inPortalMode, setInPortalMode] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Dynamic viewport scroll progress with spring smoothing
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Reset to very top on initial load
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnterExperience = () => {
    // Guarantee landing directly at the first page / top of the website
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    setInPortalMode(false);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      const hero = document.getElementById('hero');
      if (hero) {
        hero.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' });
      }
    });
  };

  const handleReopenPortal = () => {
    setInPortalMode(true);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#04070e] text-slate-100 antialiased relative selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Custom Desktop Interactive Cursor */}
      <InteractiveCursor />

      {/* Thin Dynamic Scroll Progress Bar at the top of the viewport */}
      {!inPortalMode && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] origin-left bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 shadow-[0_0_10px_rgba(56,189,248,0.8)] pointer-events-none"
          style={{ scaleX }}
          role="progressbar"
          aria-label="Scroll reading progress"
        />
      )}

      {/* Atmospheric Solar System Background Animation across entire website */}
      <SolarSystemBackground mode={inPortalMode ? 'portal' : 'full'} />

      {/* Dramatic Cinematic Portal Entry Sequence */}
      <AnimatePresence>
        {inPortalMode && (
          <EntryExperience onEnter={handleEnterExperience} />
        )}
      </AnimatePresence>

      {/* Top Fixed Navigation Bar: Permanently pinned to viewport when scrolling */}
      {!inPortalMode && (
        <Navigation onReopenPortal={handleReopenPortal} />
      )}

      {/* Main Portfolio Architecture: 100% GPU Composited with Zero Lag */}
      <motion.main
        initial={{ opacity: 0, scale: 0.98, y: 16 }}
        animate={inPortalMode ? {
          opacity: 0,
          scale: 0.98,
          y: 16,
          pointerEvents: 'none',
        } : {
          opacity: 1,
          scale: 1,
          y: 0,
          pointerEvents: 'auto',
        }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="w-full relative overflow-x-hidden z-10"
        style={{ willChange: inPortalMode ? 'opacity, transform' : 'auto' }}
      >
        <HeroSection
          onExploreProjects={() => scrollToSection('projects')}
          onExploreSkills={() => scrollToSection('skills')}
        />

        <AboutSection />

        <TechnologyField />

        <ProjectsShowcase />

        <CommunityEndorsements />

        <ContactExperience />

        <Footer onReopenPortal={handleReopenPortal} />
      </motion.main>

      {/* Floating Bottom Navigation Controls: Entry Portal & Direct-to-Top */}
      <AnimatePresence>
        {!inPortalMode && (
          <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
            <motion.button
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 16 }}
              onClick={handleReopenPortal}
              title="Return to Entry Portal & Experience Entrance Again"
              aria-label="Return to Entry Portal"
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-full liquid-glass-glow border border-cyan-400/40 text-cyan-200 hover:text-white text-xs font-mono uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-xl group"
            >
              <Compass className="w-4 h-4 text-cyan-400 group-hover:rotate-90 transition-transform duration-500" />
              <span className="hidden sm:inline">Entry Portal</span>
            </motion.button>

            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.9 }}
                onClick={scrollToTop}
                title="Go directly to top"
                aria-label="Go directly to top"
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-full liquid-glass-glow border border-white/20 text-white hover:text-cyan-200 text-xs font-mono uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-xl"
              >
                <ArrowUp className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Top</span>
              </motion.button>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
