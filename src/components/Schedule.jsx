import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import {
  Clock,
  Calendar,
  Cpu,
  ArrowUpRight,
  Shield,
  Zap,
  Terminal,
  Layers,
  Sparkles,
} from "lucide-react";
import Magnetic from "./navbar/Magnetic";
import { playHoverChirp, playClickTick } from "../utils/cyberAudio";

const SYNAPTIC_SPRING = { mass: 1.2, stiffness: 100, damping: 15 };

const timelinePhases = [
  {
    day: "DAY 01",
    date: "7TH MARCH 2027",
    title: "Inauguration & Keynote Convergence",
    desc: "Opening ceremony at Netaji Auditorium, inaugural address by Chief Guest Shri S K Nayak (DRDO), Guest of Honor Shri Sanjoy Chatterjee (NASSCOM), and flagship research keynotes.",
    side: "left",
    venue: "NETAJI AUDITORIUM // MAIN STAGE",
    status: "PROTOCOL_ACTIVE // STAGED",
    threshold: 0.22,
  },
  {
    day: "DAY 02",
    date: "8TH MARCH 2027",
    title: "Flagship Hackathons & Operational Modeling",
    desc: "24-hour BizTech HackTank, Operheimer supply chain optimization, AI Odyssey generative pipelines, and industrial case evaluations with Philips & Tata Steel.",
    side: "right",
    venue: "CENTRAL COMPUTATION LABS",
    status: "PROTOCOL_ACTIVE // STAGED",
    threshold: 0.52,
  },
  {
    day: "DAY 03",
    date: "9TH MARCH 2027",
    title: "Executive Presentations & Valedictory",
    desc: "Grand finale jury defenses, executive panels on global optimization networks, podium prize distribution, and closing valedictory gala.",
    side: "left",
    venue: "KALIDAS AUDITORIUM & FOYER",
    status: "PROTOCOL_ACTIVE // STAGED",
    threshold: 0.82,
  },
];

/**
 * 3D Translucent Geometric Core Node
 * Ignites, scales up 1.5x, snap-rotates 45 deg, and emits SVG shockwave ripples
 * when the scroll-reactive neon beam intersects with it.
 */
const SynapticNode = ({ isIgnited, dayIndex }) => {
  return (
    <div className="relative flex items-center justify-center w-12 h-12 z-20 flex-shrink-0">
      {/* Animated SVG Shockwave / Ripple Effect upon ignition */}
      <AnimatePresence>
        {isIgnited && (
          <>
            <motion.span
              initial={{ scale: 0.8, opacity: 0.9 }}
              animate={{ scale: 2.4, opacity: 0 }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeOut",
              }}
              className="absolute inset-0 rounded-full border border-cyan-400 pointer-events-none"
            />
            <motion.span
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 3.2, opacity: 0 }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: 0.6,
                ease: "easeOut",
              }}
              className="absolute inset-0 rounded-full border border-[#ff4500] pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>

      {/* Floating 3D Geometric Wireframe Diamond / Core */}
      <motion.div
        animate={
          isIgnited
            ? {
                scale: 1.5,
                rotate: 45,
                boxShadow:
                  "0 0 25px 5px rgba(0, 240, 255, 0.7), 0 0 40px rgba(255, 69, 0, 0.5)",
              }
            : {
                scale: 1,
                rotate: 0,
                boxShadow: "0 0 0px rgba(0,0,0,0)",
              }
        }
        transition={{ type: "spring", ...SYNAPTIC_SPRING }}
        className={`w-7 h-7 flex items-center justify-center transition-colors duration-500 backdrop-blur-xl border ${
          isIgnited
            ? "bg-gradient-to-br from-cyan-400 via-[#050508] to-[#ff4500] border-cyan-300"
            : "bg-[#0a0a12]/90 border-white/20"
        }`}
      >
        {/* Core Inner Data Point */}
        <motion.div
          animate={isIgnited ? { scale: [1, 1.4, 1] } : { scale: 1 }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          className={`w-2 h-2 ${
            isIgnited ? "bg-white shadow-[0_0_8px_#fff]" : "bg-zinc-600"
          }`}
        />
      </motion.div>
    </div>
  );
};

/**
 * 3D Parallax Tilt Spatial Event Card
 * Flies in from Z-axis background on scroll entrance, tilts with cursor physics
 */
const SpatialScheduleCard = ({ phase, isIgnited }) => {
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [12, -12]),
    SYNAPTIC_SPRING
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-12, 12]),
    SYNAPTIC_SPRING
  );

  const shadowX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const shadowY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div style={{ perspective: "1200px" }} className="w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={playHoverChirp}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, z: -100, scale: 0.85, rotateX: 20 }}
        whileInView={{ opacity: 1, z: 0, scale: 1, rotateX: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", ...SYNAPTIC_SPRING }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative rounded-3xl p-7 sm:p-8 backdrop-blur-2xl border transition-all duration-500 overflow-hidden cursor-pointer select-none group ${
          isIgnited
            ? "bg-[#06060c]/85 border-cyan-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            : "bg-white/[0.02] border-white/10 hover:border-white/20"
        }`}
      >
        {/* Internal CAD Mainframe Grid Pattern */}
        <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />

        {/* Dynamic Edge Illumination on Hover */}
        <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl bg-gradient-to-br from-cyan-400/20 via-transparent to-[#ff4500]/20" />

        {/* Card Content with Spatial Elevation */}
        <div style={{ transform: "translateZ(25px)" }} className="space-y-4">
          {/* Top Status & Date Row */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black text-white bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                {phase.day}
              </span>
              <span className="font-mono text-xs text-[#ff4500] font-semibold">
                {phase.date}
              </span>
            </div>

            {/* Live Pulsing System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="font-mono text-[9px] font-bold text-emerald-400 uppercase tracking-widest">
                LIVE_PROTOCOL
              </span>
            </div>
          </div>

          {/* Title & Narrative */}
          <div className="space-y-2">
            <h3 className="font-display text-xl sm:text-2xl font-extrabold uppercase text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors">
              {phase.title}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {phase.desc}
            </p>
          </div>

          {/* Venue & Location Telemetry Footer */}
          <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#ff4500] rounded-full" />
              {phase.venue}
            </span>
            <span className="text-zinc-500">IIT KHARAGPUR</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/**
 * High-Security "Ingestion Module" Cinematic Container
 * - Flowing clockwise marching-ants animated SVG perimeter
 * - Periodic chromatic aberration RGB glitch on "AWAITING DATA INGESTION"
 * - Fiercely glowing blinking cursor block
 * - Apex CTA with moving light beam & magnetic pull
 */
const IngestionModuleCinematic = () => {
  return (
    <div className="relative max-w-3xl mx-auto mt-16 p-8 sm:p-12 rounded-3xl bg-[#050508]/90 backdrop-blur-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
      {/* Animated SVG Perimeter (Clockwise Marching Ants) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.rect
          x="1"
          y="1"
          width="98"
          height="98"
          rx="6"
          fill="none"
          stroke="rgba(255, 69, 0, 0.45)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          animate={{ strokeDashoffset: [0, -100] }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "linear",
          }}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Background CAD Scanline Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />

      {/* Internal Content */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        {/* Terminal Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#ff4500]/40 bg-[#ff4500]/10 font-mono text-[10px] text-[#ff4500] uppercase tracking-widest font-semibold">
          <Terminal size={12} className="text-cyan-400" />
          <span>TIMELINE_INGESTION_MODULE // HIGH_SECURITY_LOCK</span>
        </div>

        {/* Glitch Typography Headline + Fiercely Glowing Blinking Cursor */}
        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-white tracking-tight flex items-center justify-center flex-wrap pt-2">
          <span className="rgb-split-text drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
            Awaiting Data Ingestion
          </span>
          <span className="inline-block w-3.5 h-7 sm:h-9 bg-[#ff4500] ml-2.5 shadow-[0_0_18px_4px_#ff4500] animate-pulse" />
        </h3>

        <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-lg leading-relaxed pt-1">
          Exact minute-by-minute session timings, auditorium allocations, and
          guest keynote stages are being compiled with the Department of
          Industrial &amp; Systems Engineering.
        </p>

        {/* Apex Pre-Register CTA Button with Magnetic Physics & Moving Light Beam */}
        <div className="pt-6 w-full flex flex-col sm:flex-row items-center justify-center gap-4">
          <Magnetic pullFactor={0.28} proximityRange={35}>
            <motion.a
              href="https://unstop.com/college-fests/optima-2027-indian-institute-of-technology-iit-kharagpur-260905"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickTick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="group relative inline-flex items-center justify-center px-7 py-3.5 rounded-full overflow-hidden text-xs font-mono tracking-widest select-none"
            >
              {/* Continuous Moving Perimeter Light Beam */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none rounded-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="schedCtaGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#00f0ff" />
                    <stop offset="50%" stopColor="#ff4500" />
                    <stop offset="100%" stopColor="#00f0ff" />
                  </linearGradient>
                </defs>
                <rect
                  x="1.5"
                  y="1.5"
                  width="97"
                  height="97"
                  rx="48.5"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                <motion.rect
                  x="1.5"
                  y="1.5"
                  width="97"
                  height="97"
                  rx="48.5"
                  fill="none"
                  stroke="url(#schedCtaGrad)"
                  strokeWidth="2"
                  pathLength={100}
                  strokeDasharray="25 75"
                  animate={{ strokeDashoffset: [0, -100] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.2,
                    ease: "linear",
                  }}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Core Body */}
              <div className="absolute inset-[1px] rounded-full bg-[#050505] transition-colors group-hover:bg-[#0a0a10] -z-10" />

              <span className="relative z-10 flex items-center gap-2 text-white font-bold uppercase tracking-wider">
                <Zap size={13} className="text-cyan-400" />
                <span>Pre-Register For Slots</span>
                <ArrowUpRight
                  size={13}
                  className="text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </span>
            </motion.a>
          </Magnetic>

          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
            STATUS // LIVE_CORE_SYNC
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * THE BLUEPRINT // EVENT SCHEDULE (The Synaptic Data-Stream)
 */
const Schedule = () => {
  const containerRef = useRef(null);
  const [activeDayLabel, setActiveDayLabel] = useState(
    "ACTIVE: DAY 01 // 07 MARCH"
  );
  const [ignitedDays, setIgnitedDays] = useState([false, false, false]);

  // Scroll tracking across the schedule timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 80%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 20,
  });

  // Track height of glowing liquid-neon beam
  const beamHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Update Dynamic Sticky HUD and Node Ignition states based on scroll percentage
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.35) {
        setActiveDayLabel("ACTIVE: DAY 01 // 07 MARCH");
      } else if (latest < 0.68) {
        setActiveDayLabel("ACTIVE: DAY 02 // 08 MARCH");
      } else {
        setActiveDayLabel("ACTIVE: DAY 03 // 09 MARCH");
      }

      setIgnitedDays([
        latest >= timelinePhases[0].threshold,
        latest >= timelinePhases[1].threshold,
        latest >= timelinePhases[2].threshold,
      ]);
    });
  }, [scrollYProgress]);

  return (
    <section
      id="schedule"
      ref={containerRef}
      className="relative w-full py-24 lg:py-32 bg-[#030305] border-b border-white/5 overflow-hidden"
    >
      {/* Background Synaptic Glows */}
      <div className="pointer-events-none absolute top-1/3 -left-40 w-96 h-96 bg-[#ff4500]/10 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/4 -right-40 w-96 h-96 bg-cyan-400/10 rounded-full blur-[140px]" />
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Row + Dynamic Sticky HUD Tracker */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 relative">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md">
              <Layers className="w-3.5 h-3.5 text-[#ff4500]" />
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                THE BLUEPRINT // EVENT SCHEDULE
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-white tracking-tight">
              Synaptic Timeline
            </h2>

            <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
              Three days of rigorous algorithmic execution, keynote lectures,
              industrial hackathons, and research symposiums at IIT Kharagpur.
            </p>
          </div>

          {/* 
            Dynamic Floating Sticky HUD Tracker
            Smoothly updates currently active day as the user traverses the timeline
          */}
          <div className="sticky top-20 sm:top-24 z-30 self-start md:self-auto">
            <motion.div
              layout
              className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.8)]"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f0ff]" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeDayLabel}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                  className="font-mono text-xs font-bold text-white tracking-wider"
                >
                  {activeDayLabel}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* 
          Central Synaptic Data-Stream Timeline
        */}
        <div className="relative max-w-5xl mx-auto py-10">
          {/* Deep Dark Structural Track */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] bg-[#14141e] rounded-full hidden sm:block">
            {/* Scroll-Reactive Glowing Liquid-Neon Beam (Deep Orange to Cyan) */}
            <motion.div
              style={{ height: beamHeight }}
              className="w-full bg-gradient-to-b from-[#ff4500] via-[#ff8c00] to-cyan-400 rounded-full shadow-[0_0_16px_2px_rgba(255,69,0,0.8),0_0_30px_rgba(0,240,255,0.6)]"
            />
          </div>

          {/* Timeline Milestones */}
          <div className="space-y-16 sm:space-y-24 mb-16">
            {timelinePhases.map((phase, idx) => {
              // Real-time reactive ignition triggered as the neon beam reaches this node
              const isIgnited = ignitedDays[idx];

              return (
                <div
                  key={phase.day}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    phase.side === "right" ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Spatial Card Container (Half Width) */}
                  <div className="w-full md:w-[calc(50%-2.5rem)]">
                    <SpatialScheduleCard
                      phase={phase}
                      isIgnited={isIgnited}
                    />
                  </div>

                  {/* Central Translucent 3D Geometric Core Node */}
                  <div className="hidden md:flex">
                    <SynapticNode
                      isIgnited={isIgnited}
                      dayIndex={idx}
                    />
                  </div>

                  {/* Empty Spacer on Opposite Side */}
                  <div className="hidden md:block w-full md:w-[calc(50%-2.5rem)]" />
                </div>
              );
            })}
          </div>

          {/* High-Security Timeline Ingestion Module Cinematic */}
          <IngestionModuleCinematic />
        </div>
      </div>
    </section>
  );
};

export default Schedule;
