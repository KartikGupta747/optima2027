import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { pastCompetitions } from "../constants";
import {
  ArrowUpRight,
  FileText,
  MessageSquare,
  Sparkles,
  History,
  Calendar,
  MapPin,
  Trophy,
  BellRing,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";

const Competitions = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [notified, setNotified] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleNotifyMe = () => {
    setNotified(true);
    setTimeout(() => {
      setNotified(false);
    }, 3500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const cardVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: "easeOut",
          },
        },
      };

  return (
    <section
      id="events"
      className="relative w-full pt-16 sm:pt-18 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 bg-bg-base border-b border-border-subtle overflow-hidden"
    >
      {/* Background CAD Grid texture */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header & Tab Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="section-header mb-3">
              <span className="section-header-square" />
              <h2 className="section-header-text text-xl sm:text-2xl lg:text-3xl">
                {activeTab === "upcoming" ? "Competitions" : "Past Year Competitions"}
              </h2>
            </div>
            <p className="text-text-secondary text-sm max-w-2xl font-sans leading-relaxed">
              {activeTab === "upcoming"
                ? "Flagship optimization and analytical challenges for Optima 2027 at IIT Kharagpur."
                : "Archive of flagship competitions from previous editions. Review problem statements and competition structures."}
            </p>
          </div>

          {/* Clean Tab Controls */}
          <div className="flex items-center gap-2 p-1.5 bg-bg-surface border border-border-subtle self-start md:self-end">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all duration-200 ${
                activeTab === "upcoming"
                  ? "bg-accent-brand text-black font-bold shadow-brand-glow"
                  : "text-text-secondary hover:text-white hover:bg-white/5"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Upcoming</span>
            </button>

            <button
              onClick={() => setActiveTab("past")}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all duration-200 ${
                activeTab === "past"
                  ? "bg-accent-brand text-black font-bold shadow-brand-glow"
                  : "text-text-secondary hover:text-white hover:bg-white/5"
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Past Year Competitions</span>
              <span
                className={`ml-1 text-[10px] px-1.5 py-0.2 rounded ${
                  activeTab === "past"
                    ? "bg-black/20 text-black font-semibold"
                    : "bg-white/10 text-text-secondary"
                }`}
              >
                {pastCompetitions.length}
              </span>
            </button>
          </div>
        </div>

        {/* Dynamic View: Upcoming (Animation) vs Past Year (Cards) */}
        <AnimatePresence mode="wait">
          {activeTab === "upcoming" ? (
            /* ========================================================
               UPCOMING COMPETITIONS ANIMATION CONTAINER
               ======================================================== */
            <motion.div
              key="upcoming-animation"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative max-w-3xl mx-auto my-4 p-6 sm:p-10 border border-border-subtle bg-bg-surface/90 backdrop-blur-md overflow-hidden text-center shadow-[0_15px_40px_rgba(0,0,0,0.7)]"
            >
              {/* Subtle background glow */}
              <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-brand/10 rounded-full blur-[90px]" />

              {/* Orbital Radar / Rings Animation - Compact */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-5 flex items-center justify-center">
                {/* Outermost pulsing ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.15, 0.4, 0.15],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full border border-dashed border-accent-brand/40"
                />

                {/* Rotating middle dashed ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-2 sm:inset-3 rounded-full border border-white/15 border-t-accent-brand/70"
                />

                {/* Counter-rotating inner ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-4 sm:inset-6 rounded-full border border-dashed border-cyan-400/30"
                />

                {/* Central glowing orb with trophy */}
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-accent-brand/20 to-black border border-accent-brand/60 flex items-center justify-center shadow-[0_0_20px_rgba(255,107,0,0.35)]">
                  <motion.div
                    animate={{
                      y: [-2, 2, -2],
                      rotate: [-2, 2, -2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-accent-brand drop-shadow-[0_0_10px_rgba(255,107,0,0.6)]" />
                  </motion.div>
                </div>
              </div>

              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-accent-brand/30 bg-accent-brand/10 text-xs font-mono font-semibold tracking-wider text-accent-brand">
                <span className="w-2 h-2 rounded-full bg-accent-brand animate-ping" />
                <span>Competitions Announcing Soon</span>
              </div>

              {/* Heading */}
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-white tracking-tight mb-3">
                Optima 2027 Challenges
              </h3>

              {/* Clean natural description */}
              <p className="font-sans text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed mb-6">
                We are currently finalizing problem statements, sponsor partnerships, and prize pools. Detailed challenges, rulebooks, and registration portals will go live soon.
              </p>

              {/* Key Highlights */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-mono text-zinc-400 mb-6">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10">
                  <Calendar className="w-3.5 h-3.5 text-accent-brand" />
                  <span>March 12–14, 2027</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>IIT Kharagpur</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Hackathons & Case Challenges</span>
                </div>
              </div>

              {/* Primary Call-to-Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setActiveTab("past")}
                  className="btn-primary w-full sm:w-auto px-6 py-3 text-xs tracking-wider gap-2 shadow-lg"
                >
                  <span>Explore Past Year Competitions</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleNotifyMe}
                  className={`w-full sm:w-auto px-6 py-3 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all border ${
                    notified
                      ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300"
                      : "bg-white/5 hover:bg-white/10 border-white/15 text-white"
                  }`}
                >
                  {notified ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Alert Saved!</span>
                    </>
                  ) : (
                    <>
                      <BellRing className="w-4 h-4 text-accent-brand" />
                      <span>Notify Me When Live</span>
                    </>
                  )}
                </button>
              </div>

              {/* CAD Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent-brand/40" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent-brand/40" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent-brand/40" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent-brand/40" />
            </motion.div>
          ) : (
            /* ========================================================
               PAST YEAR COMPETITIONS BENTO GRID
               ======================================================== */
            <motion.div
              key="past-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <div className="flex items-center justify-between text-xs text-text-secondary pb-2">
                <span>Previous edition problem statements &amp; challenge archives</span>
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className="text-accent-brand hover:underline font-mono"
                >
                  ← Back to Upcoming
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {pastCompetitions.map((item, index) => {
                  const hasSponsor = Boolean(item.subTitle);

                  return (
                    <motion.div
                      key={item.id}
                      variants={cardVariants}
                      className="group relative bg-bg-surface border border-border-subtle p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:border-accent-brand hover:shadow-brand-glow"
                    >
                      {/* Top Row: Index Tag & Desaturated Vector Illustration */}
                      <div className="flex items-start justify-between relative mb-4">
                        <div className="flex flex-col gap-1 z-10">
                          <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-accent-brand tracking-wider">
                            CHALLENGE.0{index + 1}
                          </span>
                          {hasSponsor && (
                            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-accent-muted bg-accent-muted/10 border border-accent-muted/30 px-2 py-0.5 max-w-[150px] truncate">
                              {item.subTitle}
                            </span>
                          )}
                        </div>

                        {/* Vector Illustration */}
                        <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 overflow-hidden">
                          <img
                            src={item.photoUrl}
                            alt={item.title}
                            className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110 drop-shadow-[0_4px_16px_rgba(255,107,0,0.25)]"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      {/* Middle: Title & Description */}
                      <div className="relative z-10 mb-4">
                        <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-text-primary group-hover:text-accent-brand transition-colors duration-200">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-xs text-text-secondary line-clamp-3 leading-relaxed">
                          {item.text}
                        </p>
                      </div>

                      {/* Bottom Row: Problem Statement & Unstop Buttons */}
                      <div className="relative z-10 pt-4 border-t border-border-subtle/60 mt-auto flex flex-col gap-2.5">
                        <div className="flex items-center gap-2">
                          {item.driveLink ? (
                            <a
                              href={item.driveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 hover:border-orange-500/60 text-orange-300 font-mono text-xs font-semibold tracking-wide transition-all shadow-sm"
                              title="View Problem Statement"
                            >
                              <FileText className="w-3.5 h-3.5 text-[#ff4500]" />
                              <span>Problem Statement</span>
                            </a>
                          ) : (
                            <span className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-zinc-500 font-mono text-xs">
                              <span>PS Unavailable</span>
                            </span>
                          )}

                          {item.whatsAppLink && (
                            <a
                              href={item.whatsAppLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg bg-white/5 hover:bg-[#25D366]/20 border border-white/10 hover:border-[#25D366]/50 text-[#25D366] transition-colors"
                              title="WhatsApp Discussion Group"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </a>
                          )}
                        </div>

                        {item.unstopLink && (
                          <a
                            href={item.unstopLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary w-full py-2 px-3 text-xs tracking-wider justify-center gap-1.5 shadow-md"
                          >
                            <span>View on Unstop</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      {/* Subtle CAD Corner Accent */}
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-border-subtle group-hover:border-accent-brand transition-colors duration-200" />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Competitions;
