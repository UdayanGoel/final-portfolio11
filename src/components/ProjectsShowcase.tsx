import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  X, 
  Activity, 
  Cpu, 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectItem } from '../types/portfolio';

// Interactive Crop Scanner Samples for the simulation demo
interface SampleLeaf {
  id: string;
  name: string;
  crop: string;
  healthStatus: 'Optimal Health' | 'Early Stage Infection' | 'Nutrient Deficiency';
  cellularScore: string;
  detectedPathogen: string;
  remedyProtocol: string;
}

const SAMPLE_LEAVES: SampleLeaf[] = [
  {
    id: 'sample-1',
    name: 'Sample A: Tomato Foliage',
    crop: 'Solanum lycopersicum',
    healthStatus: 'Early Stage Infection',
    cellularScore: '78.4%',
    detectedPathogen: 'Alternaria solani (Early Blight spot colonies)',
    remedyProtocol: 'Apply copper-based biological fungicide; prune lower canopy to reduce ground moisture retention.',
  },
  {
    id: 'sample-2',
    name: 'Sample B: Maize Leaf Blade',
    crop: 'Zea mays',
    healthStatus: 'Optimal Health',
    cellularScore: '96.2%',
    detectedPathogen: 'None Detected (Photosynthetic density normal)',
    remedyProtocol: 'Maintain standard drip irrigation cycle and weekly soil nitrogen monitoring.',
  },
  {
    id: 'sample-3',
    name: 'Sample C: Winter Wheat Specimen',
    crop: 'Triticum aestivum',
    healthStatus: 'Nutrient Deficiency',
    cellularScore: '71.0%',
    detectedPathogen: 'Chlorosis - Nitrogen Deficit in vein margins',
    remedyProtocol: 'Deliver organic compost tea spray; balance topsoil potassium and slow-release nitrogen.',
  },
];

export const ProjectsShowcase: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'web'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Simulation state inside detail modal
  const [activeSample, setActiveSample] = useState<SampleLeaf>(SAMPLE_LEAVES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(true);

  // Lock scroll without jump when modal is open
  useEffect(() => {
    if (selectedProject) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedProject]);

  const displayedProjects = PROJECTS_DATA.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.categoryKey === activeFilter;
  });

  const handleSimulateScan = (sample: SampleLeaf) => {
    setActiveSample(sample);
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 700);
  };

  return (
    <section id="projects" className="relative py-32 px-6 sm:px-10 lg:px-16 border-t border-white/5 select-none">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-600/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>03. Featured Architecture</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Featured <em className="italic text-slate-400">Projects.</em>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-xs sm:text-sm font-light text-slate-400 max-w-xs leading-relaxed">
              Engineered at the intersection of neural networks, computer vision, and agricultural assistance.
            </p>

            {/* Filter Segmented Control */}
            <div className="flex items-center gap-1 p-1.5 rounded-2xl liquid-glass border border-white/10">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All (1)
              </button>
              <button
                onClick={() => setActiveFilter('ai')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activeFilter === 'ai'
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                AI (1)
              </button>
              <button
                onClick={() => setActiveFilter('web')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activeFilter === 'web'
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Web Dev (0)
              </button>
            </div>
          </div>
        </div>

        {/* Projects Render Area */}
        {displayedProjects.length > 0 ? (
          <div className="space-y-12">
            {displayedProjects.map((project) => (
              <motion.div
                key={project.id}
                data-cursor="project"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProject(project)}
                className="group relative rounded-3xl overflow-hidden liquid-glass border border-white/10 p-8 sm:p-12 hover:border-cyan-400/40 hover:shadow-[0_0_50px_rgba(6,182,212,0.15)] transition-all cursor-pointer"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  {/* Left Column: Visual Artwork */}
                  <div className="lg:col-span-7 relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-100 opacity-85 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04070e] via-transparent to-transparent opacity-80" />

                    {/* Telemetry overlay pill-free indicators */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-mono text-cyan-300 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                      <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      <span>{project.metrics}</span>
                    </div>

                    <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 group-hover:border-cyan-400/50 transition-colors">
                      <span>Click for Deep Dive & Live Diagnostic Simulator</span>
                      <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Right Column: Metadata & Narrative */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="text-cyan-400 font-semibold">{project.category}</span>
                      <span>PRODUCTION RESEARCH SPEC</span>
                    </div>

                    <div>
                      <h3
                        className="text-3xl sm:text-5xl font-normal text-white tracking-tight leading-tight"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-sm font-medium text-cyan-300 mt-1 font-mono">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base font-light text-slate-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      {project.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-start gap-2.5 text-xs text-slate-300 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Unboxed Tags metadata */}
                    <div className="pt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-slate-400">
                      {project.tags.map((tag, idx) => (
                        <React.Fragment key={tag}>
                          <span className="text-slate-300">{tag}</span>
                          {idx < project.tags.length - 1 && (
                            <span aria-hidden="true" className="text-slate-600">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2">
                      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl liquid-glass-glow text-white text-xs font-mono uppercase tracking-wider group-hover:bg-cyan-500/20 transition-all">
                        <span>Launch Project Detail</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty state for Web Dev filter */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-16 rounded-3xl liquid-glass border border-white/10 text-center space-y-4 max-w-2xl mx-auto"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
              <Cpu className="w-6 h-6" />
            </div>
            <h3
              className="text-3xl text-white font-normal"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              No Web Dev Projects Published Yet
            </h3>
            <p className="text-sm font-light text-slate-400 leading-relaxed">
              Modern web platforms and reactive single-page prototypes are actively being authored in the laboratory.
            </p>
            <button
              onClick={() => setActiveFilter('ai')}
              className="mt-4 px-6 py-2.5 rounded-xl liquid-glass text-cyan-300 border border-cyan-500/30 text-xs font-mono tracking-wider hover:bg-cyan-500/15 cursor-pointer transition-all"
            >
              View Flagship AI Project
            </button>
          </motion.div>
        )}
      </div>

      {/* Fullscreen Interactive Project Detail Modal & Simulator */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-2xl overflow-y-auto"
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedProject(null);
              }}
            >
              <motion.div
                initial={{ scale: 0.95, y: 16 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 16 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-5xl rounded-3xl liquid-glass border border-cyan-400/30 p-6 sm:p-10 my-8 shadow-2xl space-y-8 bg-[#04070e]"
                onClick={(e) => e.stopPropagation()}
              >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close project details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
                  <span>{selectedProject.category} · SPECIFICATION</span>
                </div>
                <h2
                  className="text-4xl sm:text-6xl text-white font-normal tracking-tight"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {selectedProject.title}
                </h2>
                <p className="text-base text-cyan-300 font-mono mt-1">
                  {selectedProject.subtitle}
                </p>
              </div>

              {/* Full Width Media Artwork */}
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04070e] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-xs font-mono text-cyan-300 bg-black/80 px-3 py-1 rounded-lg border border-cyan-500/20">
                  {selectedProject.metrics}
                </div>
              </div>

              {/* Deep Specification & Live Simulator Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-6 space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400">
                    System Architecture & Abstract
                  </h4>
                  <p className="text-sm font-light text-slate-300 leading-relaxed">
                    {selectedProject.description}
                  </p>
                  <div className="space-y-2 pt-2">
                    {selectedProject.highlights.map((h) => (
                      <div key={h} className="flex items-start gap-2 text-xs text-slate-300 font-mono">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center gap-3">
                    <a
                      href="mailto:goeludayan@gmail.com?subject=Inquiry%20regarding%20AI%20Crop%20Scanner"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl liquid-glass-glow text-white text-xs font-mono uppercase tracking-wider hover:scale-105 transition-all"
                    >
                      <span>Discuss Project Architecture</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                    </a>
                  </div>
                </div>

                {/* Right Column: Live Interactive Crop Diagnostics Simulation */}
                <div className="lg:col-span-6 p-6 rounded-2xl liquid-glass border border-cyan-500/30 space-y-5 bg-cyan-950/10">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      <span>Live Diagnostic Simulator</span>
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Inference Engine
                    </span>
                  </div>

                  {/* Sample Selector */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono uppercase text-slate-400 block">
                      Select Botanical Specimen:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {SAMPLE_LEAVES.map((sample) => (
                        <button
                          key={sample.id}
                          onClick={() => handleSimulateScan(sample)}
                          className={`p-2.5 rounded-xl text-left text-xs font-mono transition-all cursor-pointer border ${
                            activeSample.id === sample.id
                              ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-sm'
                              : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <div className="font-semibold truncate">{sample.name.split(':')[0]}</div>
                          <div className="text-[10px] text-cyan-300/80 truncate">{sample.crop}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Simulation Diagnostic Output Card */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-3 font-mono text-xs">
                    {isScanning ? (
                      <div className="py-6 flex flex-col items-center justify-center gap-2 text-cyan-300">
                        <Activity className="w-6 h-6 animate-spin" />
                        <span>Running convolutional tensor evaluation...</span>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between pb-2 border-b border-white/5">
                          <span className="text-slate-400">Specimen Status:</span>
                          <span className={`font-semibold ${
                            activeSample.healthStatus === 'Optimal Health' 
                              ? 'text-emerald-400' 
                              : activeSample.healthStatus === 'Early Stage Infection' 
                              ? 'text-amber-400' 
                              : 'text-sky-300'
                          }`}>
                            {activeSample.healthStatus}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Cellular Vitality Index:</span>
                          <span className="text-white font-bold">{activeSample.cellularScore}</span>
                        </div>

                        <div className="flex items-start justify-between gap-4">
                          <span className="text-slate-400 shrink-0">Pathogen / Anomaly:</span>
                          <span className="text-slate-200 text-right">{activeSample.detectedPathogen}</span>
                        </div>

                        <div className="pt-2 border-t border-white/5 text-slate-300">
                          <span className="text-cyan-400 font-bold block mb-1">Recommended Remedial Protocol:</span>
                          <span className="font-sans text-xs text-slate-300 leading-relaxed block">
                            {activeSample.remedyProtocol}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </section>
  );
};
