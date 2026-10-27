import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Linkedin,
  ArrowUpRight,
  Mail,
  ShieldCheck,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Clock,
  Compass,
} from "lucide-react";
import { CoreHeads, Executives, PreviousYearHeads } from "../constants/Team.js";
import { playClickTick, playHoverChirp } from "../utils/cyberAudio";

// ========================================================
// 1. MAGNETIC TIME-TOGGLE HUD
// ========================================================
const TimeToggleHUD = ({ activeTab, onToggle }) => {
  const containerRef = useRef(null);

  const tabs = [
    {
      id: "2027",
      label: "2027 ACTIVE",
      subtext: "CURRENT CORE",
      count: CoreHeads.length,
      badgeColor: "bg-emerald-400",
      activeBorder: "border-cyan-400/80",
      glowColor: "shadow-[0_0_25px_rgba(0,240,255,0.4)]",
    },
    {
      id: "2025",
      label: "2025 ARCHIVE",
      subtext: "HISTORIC RECORDS",
      count: Executives.length + PreviousYearHeads.length,
      badgeColor: "bg-orange-400",
      activeBorder: "border-[#ff4500]/80",
      glowColor: "shadow-[0_0_25px_rgba(255,69,0,0.45)]",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative p-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-3xl inline-flex items-center gap-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.8)]"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => {
              playClickTick();
              onToggle(tab.id);
            }}
            data-cursor="pointer"
            className={`relative px-6 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-300 flex items-center gap-3 select-none z-10 ${
              isActive ? "text-white" : "text-white/50 hover:text-white/80"
            }`}
          >
            {/* Active Pill Kinetic Background */}
            {isActive && (
              <motion.div
                layoutId="activeTimePill"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
                className={`absolute inset-0 rounded-full border ${tab.activeBorder} bg-white/[0.08] backdrop-blur-xl ${tab.glowColor}`}
              />
            )}

            {/* Live Indicator LED */}
            <span className="relative flex h-2 w-2 z-10">
              {isActive && (
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full ${tab.badgeColor} opacity-75`}
                />
              )}
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isActive ? tab.badgeColor : "bg-white/20"
                }`}
              />
            </span>

            {/* Tab Title */}
            <span className="relative z-10 font-bold">{tab.label}</span>

            {/* Member Count Pill */}
            <span
              className={`relative z-10 px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                isActive
                  ? "bg-white/15 text-white border border-white/20"
                  : "bg-white/5 text-white/40"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

// ========================================================
// 2. SPATIAL PHOTO CARD (GLASSMORPHIC IDENTITY PLATE)
// ========================================================
const GlassIdentityPlate = ({ member, index, isArchived = false }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Parallax Motion Values
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { stiffness: 260, damping: 20 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 260, damping: 20 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xRel = (e.clientX - rect.left) / rect.width - 0.5;
    const yRel = (e.clientY - rect.top) / rect.height - 0.5;

    // Subtle 3D tilt tracking cursor (-14 to +14 degrees)
    tiltX.set(-yRel * 16);
    tiltY.set(xRel * 16);
  };

  const handleMouseEnter = () => {
    playHoverChirp();
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: smoothTiltX,
        rotateY: smoothTiltY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 35, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.45,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      data-cursor="pointer"
      className={`group relative rounded-2xl overflow-hidden backdrop-blur-3xl bg-white/[0.03] border transition-all duration-300 flex flex-col justify-between ${
        isHovered
          ? isArchived
            ? "border-orange-500/70 shadow-[0_20px_50px_rgba(255,69,0,0.35),0_0_25px_rgba(255,107,0,0.2)] ring-1 ring-orange-500/50"
            : "border-cyan-400/70 shadow-[0_20px_50px_rgba(0,240,255,0.35),0_0_25px_rgba(255,69,0,0.2)] ring-1 ring-cyan-400/50"
          : "border-white/10 shadow-[0_12px_35px_rgba(0,0,0,0.85)] hover:border-white/20"
      }`}
    >
      {/* ======================================================== */}
      {/* PHOTO VIEWPORT WITH VOLUMETRIC CYBER-SCANLINE EFFECT     */}
      {/* ======================================================== */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#07070a]">
        {/* High-Resolution Portrait */}
        <img
          src={member.imageUrl}
          alt={member.name}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Volumetric Holographic Light Sweep Scanline (Triggered on Hover) */}
        {isHovered && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "240%" }}
            transition={{ duration: 1.15, repeat: Infinity, ease: "linear" }}
            className={`absolute inset-x-0 h-24 bg-gradient-to-b from-transparent ${
              isArchived ? "via-orange-500/30" : "via-cyan-400/30"
            } to-transparent pointer-events-none z-20 mix-blend-screen`}
          />
        )}

        {/* Dark Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090e] via-[#09090e]/30 to-transparent z-15" />
      </div>

      {/* ======================================================== */}
      {/* IDENTITY METADATA & KINETIC TYPOGRAPHY                   */}
      {/* ======================================================== */}
      <div className="p-5 relative z-20 flex flex-col justify-between flex-1 bg-gradient-to-b from-[#09090e]/90 to-[#050508]">
        <div>
          {/* Glowing Dynamic Role Pill */}
          <div className="mb-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider uppercase border transition-all duration-300 ${
                isArchived
                  ? "border-orange-500/40 bg-orange-500/10 text-orange-300 shadow-[0_0_15px_rgba(255,107,0,0.25)]"
                  : "border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.25)]"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isArchived ? "bg-orange-400" : "bg-cyan-400"
                } animate-pulse`}
              />
              <span className="line-clamp-1">{member.positionName}</span>
            </span>
          </div>

          {/* Member Name (Bold & Crisp White) */}
          <h3 className="text-lg sm:text-xl font-bold font-sans tracking-tight text-white group-hover:text-cyan-300 transition-colors">
            {member.name}
          </h3>

          <p className="text-xs text-white/50 font-mono mt-1">
            Department of Industrial & Systems Engineering
          </p>
        </div>

        {/* Social / Direct Connect Bar */}
        <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-[10px] font-mono text-white/40 tracking-wider">
            ISE.IITKGP
          </span>

          <div className="flex items-center gap-2">
            {member.socialLinks?.mail && (
              <a
                href={member.socialLinks.mail}
                title="Send Transmission"
                data-cursor="pointer"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500 text-white/70 hover:text-orange-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            )}

            {member.socialLinks?.linkedin && (
              <a
                href={member.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="Connect on LinkedIn"
                data-cursor="pointer"
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400 text-white/70 hover:text-cyan-300 font-mono text-[10px] uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <Linkedin className="w-3 h-3" />
                <span>CONNECT</span>
                <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ========================================================
// 3. MAIN COMPONENT: THE CHRONO-ROSTER MATRIX V2
// ========================================================
const Team = () => {
  const [activeTab, setActiveTab] = useState("2027");

  return (
    <section
      id="team"
      className="relative w-full py-28 md:py-36 bg-[#030305] text-white border-b border-white/5 overflow-hidden"
    >
      {/* Ambient Lighting Spheres */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 rounded-full bg-[#ff4500]/10 blur-[150px] pointer-events-none" />

      {/* Cybernetic CAD Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* ======================================================== */}
        {/* SECTION HEADER: KINETIC TYPOGRAPHY STANDARD              */}
        {/* ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 mb-12 border-b border-white/10">
          <div>
            {/* HUD Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-cyan-400 mb-5 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>SEC_07 // CHRONO_ROSTER</span>
              <span className="text-white/20">|</span>
              <span className="text-orange-400">ORGANIZATION CORE</span>
            </div>

            {/* Kinetic Typography Headline */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black font-sans tracking-tight text-white flex items-center gap-4 flex-wrap">
              <span className="text-[#ff4500]">■</span>
              <span>THE ARCHITECTS</span>
              <span className="text-white/20 font-light">//</span>
              <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                CHRONO-ROSTER MATRIX
              </span>
            </h2>

            <p className="text-sm md:text-base text-white/60 font-sans mt-3 max-w-2xl">
              Student executive leadership and domain heads spearheading operations, sponsorship,
              technology, and industry outreach across the continuum of Optima.
            </p>
          </div>

          {/* Temporal Toggle HUD Switch */}
          <div className="flex flex-col items-start lg:items-end gap-3">
            <div className="text-[11px] font-mono text-white/40 uppercase tracking-widest">
              TEMPORAL REGISTRY TOGGLE
            </div>
            <TimeToggleHUD activeTab={activeTab} onToggle={setActiveTab} />
          </div>
        </div>

        {/* ======================================================== */}
        {/* SPATIAL GALLERY: HEAVY SPRING TRANSITIONS (Z-AXIS)       */}
        {/* mass: 1.2, stiffness: 100, damping: 15                   */}
        {/* ======================================================== */}
        <AnimatePresence mode="wait">
          {activeTab === "2027" ? (
            /* TAB 1: 2027 ACTIVE CORE (8 Members) */
            <motion.div
              key="team-2027"
              initial={{ opacity: 0, scale: 0.88, rotateX: 16, y: 35 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.85,
                filter: "blur(12px)",
                rotateX: -14,
                y: -30,
              }}
              transition={{
                mass: 1.2,
                stiffness: 100,
                damping: 15,
              }}
              className="w-full"
            >
              {/* Category Subhead */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 rotate-45" />
                  <span className="font-mono text-xs text-cyan-300 uppercase tracking-widest font-bold">
                    ACTIVE SQUAD // 2027 HEADSHIP DEPLOYMENT
                  </span>
                </div>
                <span className="font-mono text-xs text-white/40">
                  TOTAL NODES: {CoreHeads.length} OPERATORS
                </span>
              </div>

              {/* 4-Column Grid for 2027 Active Core */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {CoreHeads.map((member, idx) => (
                  <GlassIdentityPlate
                    key={member.id}
                    member={member}
                    index={idx}
                    isArchived={false}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            /* TAB 2: 2025 ARCHIVE RECORDS (Executives + Heads) */
            <motion.div
              key="team-2025"
              initial={{ opacity: 0, scale: 0.88, rotateX: 16, y: 35 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.85,
                filter: "blur(12px)",
                rotateX: -14,
                y: -30,
              }}
              transition={{
                mass: 1.2,
                stiffness: 100,
                damping: 15,
              }}
              className="w-full"
            >
              {/* Tier 1: Executive Advisors */}
              <div className="mb-14">
                <div className="flex items-center justify-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-mono text-orange-400 uppercase tracking-widest">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>LEADERSHIP ARCHIVE // EXECUTIVE ADVISORY BOARD</span>
                  </div>
                </div>

                {/* 2-Column Centered Layout for Executives */}
                <div className="grid grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto gap-6">
                  {Executives.map((exec, idx) => (
                    <GlassIdentityPlate
                      key={exec.id}
                      member={exec}
                      index={idx}
                      isArchived={true}
                    />
                  ))}
                </div>
              </div>

              {/* Subtle Cybernetic Divider Separating Executives from Heads */}
              <div className="my-14 flex items-center justify-center gap-4">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/15 to-orange-500/40" />
                <div className="px-4 py-1 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-xl font-mono text-[11px] text-white/60 uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(255,107,0,0.15)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  <span>DEPARTMENT HEAD ARCHIVES // BATCH 2025</span>
                </div>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-white/15 to-orange-500/40" />
              </div>

              {/* Tier 2: 2025 Department Heads (9 Members) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {PreviousYearHeads.map((head, idx) => (
                  <GlassIdentityPlate
                    key={head.id}
                    member={head}
                    index={idx + Executives.length}
                    isArchived={true}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ======================================================== */}
        {/* SECTION FOOTER TELEMETRY STATUS                          */}
        {/* ======================================================== */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/40 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/70">OPERATIONAL REGISTRY: ISE.IITKGP</span>
            <span className="text-white/20">|</span>
            <span>CHRONO_SYNC: 2025 - 2027</span>
          </div>

          <div className="text-orange-400/80">
            DEPARTMENT OF INDUSTRIAL &amp; SYSTEMS ENGINEERING // IIT KHARAGPUR
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
