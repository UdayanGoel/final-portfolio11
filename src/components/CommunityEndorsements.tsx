import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, Plus, X, Check, MessageSquareQuote } from 'lucide-react';
import { EndorsementItem } from '../types/portfolio';

const STORAGE_KEY = 'portfolio-user-reviews-v2';

export const CommunityEndorsements: React.FC = () => {
  const [endorsements, setEndorsements] = useState<EndorsementItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fallback
    }
    return [];
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState<EndorsementItem['role']>('Academic Faculty');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [projectFocus, setProjectFocus] = useState('');
  const [message, setMessage] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(endorsements));
    } catch {
      // Ignore storage errors
    }
  }, [endorsements]);

  // Prevent scroll jump and maintain current viewport position
  useEffect(() => {
    if (modalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [modalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    const newEndorsement: EndorsementItem = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      organization: organization.trim() || 'Collaborator',
      role,
      rating,
      projectFocus: projectFocus.trim() || 'AI & Web Architecture',
      message: message.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };

    setEndorsements([newEndorsement, ...endorsements]);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setModalOpen(false);
      // Reset form
      setAuthor('');
      setOrganization('');
      setMessage('');
      setProjectFocus('');
    }, 1200);
  };

  return (
    <section id="endorsements" className="relative py-32 px-6 sm:px-10 lg:px-16 border-t border-white/5 select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>04. Academic & Peer Endorsements</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Collaborative <em className="italic text-slate-400">Feedback.</em>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-xs sm:text-sm font-light text-slate-400 max-w-xs leading-relaxed">
              Perspectives from faculty mentors, research partners, and student peers across academic projects.
            </p>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full liquid-glass-glow text-white text-xs font-mono uppercase tracking-wider hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap shadow-lg"
            >
              <Plus className="w-4 h-4 text-cyan-400" />
              <span>Add Your Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Content: Empty state inviting real reviews OR real user reviews grid */}
        {endorsements.length === 0 ? (
          <div className="p-12 sm:p-16 rounded-3xl liquid-glass border border-white/10 text-center max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto shadow-inner">
              <MessageSquareQuote className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3
                className="text-3xl sm:text-4xl text-white font-normal tracking-tight"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                No Reviews Published Yet
              </h3>
              <p className="text-sm font-light text-slate-300 max-w-lg mx-auto leading-relaxed">
                Have you collaborated on research, built a project, or studied with Udayan at JECRC University? Share your feedback to add the first endorsement.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setModalOpen(true);
                }}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full liquid-glass-glow text-white text-xs font-mono uppercase tracking-wider hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xl font-semibold"
              >
                <Plus className="w-4 h-4 text-cyan-400" />
                <span>Add Your Review</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {endorsements.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                className="p-8 rounded-3xl liquid-glass border border-white/10 flex flex-col justify-between space-y-6 hover:border-white/25 transition-all"
              >
                <div className="space-y-4">
                  {/* Top Row: Stars + Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    <span className="text-xs font-mono text-slate-500">
                      {item.date}
                    </span>
                  </div>

                  {/* Message */}
                  <p className="text-sm font-light text-slate-300 leading-relaxed italic">
                    &ldquo;{item.message}&rdquo;
                  </p>
                </div>

                {/* Author & Context Info */}
                <div className="pt-4 border-t border-white/10 space-y-1.5">
                  <div className="text-base font-semibold text-white">
                    {item.author}
                  </div>
                  <div className="text-xs font-mono text-slate-400 flex flex-wrap items-center gap-x-2">
                    <span className="text-cyan-300">{item.role}</span>
                    {item.organization && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{item.organization}</span>
                      </>
                    )}
                  </div>
                  {item.projectFocus && (
                    <div className="text-[11px] font-mono text-slate-500 truncate pt-1">
                      Focus: {item.projectFocus}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Adding Endorsement - rendered directly to document.body to avoid parent transform trapping */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto"
              onClick={(e) => {
                if (e.target === e.currentTarget) setModalOpen(false);
              }}
            >
              <motion.div
                initial={{ scale: 0.95, y: 16 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 16 }}
                className="relative w-full max-w-lg rounded-3xl liquid-glass border border-cyan-400/30 p-8 shadow-2xl bg-[#04070e] space-y-6 my-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-full border border-white/10 text-slate-400 hover:text-white cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-1">
                  Peer Review Submission
                </span>
                <h3
                  className="text-3xl text-white font-normal"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Add Your Review
                </h3>
                <p className="text-xs font-light text-slate-400 mt-1">
                  Share your authentic experience collaborating with Udayan on academic projects or technical workflows.
                </p>
              </div>

              {submittedSuccess ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Review Published</h4>
                  <p className="text-xs text-slate-300">
                    Thank you! Your feedback has been stored and added to the collaborative review showcase.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                  <div>
                    <label className="block text-slate-400 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Dr. Sharma or Rahul Verma"
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 uppercase tracking-wider mb-1.5">
                        Organization / University
                      </label>
                      <input
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="e.g. JECRC University"
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 uppercase tracking-wider mb-1.5">
                        Relationship
                      </label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as EndorsementItem['role'])}
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#070d18] text-white outline-none focus:border-cyan-400 transition-colors"
                      >
                        <option value="Academic Faculty">Academic Faculty</option>
                        <option value="Industry Mentor">Industry Mentor</option>
                        <option value="Project Partner">Project Partner</option>
                        <option value="Student Peer">Student Peer</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                    <div>
                      <label className="block text-slate-400 uppercase tracking-wider mb-1.5">
                        Project Focus (Optional)
                      </label>
                      <input
                        type="text"
                        value={projectFocus}
                        onChange={(e) => setProjectFocus(e.target.value)}
                        placeholder="e.g. AI Crop Scanner"
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 uppercase tracking-wider mb-1.5">
                        Rating (1-5 Stars)
                      </label>
                      <div className="flex items-center gap-1.5 h-[42px] px-3 rounded-xl border border-white/10 bg-white/5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                            className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Star
                              className={`w-4 h-4 ${
                                star <= (hoverRating || rating)
                                  ? 'fill-current'
                                  : 'opacity-30'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 uppercase tracking-wider mb-1.5">
                      Review / Endorsement Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share notes on technical execution, code quality, communication, or research collaboration..."
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 outline-none focus:border-cyan-400 transition-colors resize-none font-sans text-xs"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl liquid-glass-glow text-white font-semibold cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-md"
                    >
                      Publish Review
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </section>
  );
};
