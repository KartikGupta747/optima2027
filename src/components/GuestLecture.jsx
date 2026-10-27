import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";
import { guests, guestLectures } from "../constants/GuestLectures.js";
import {
  ArrowUpRight,
  Linkedin,
  Award,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { useTextScramble } from "../hooks/useTextScramble";
import { playHoverChirp, playClickTick } from "../utils/cyberAudio";

// Flagship 5 Headliners explicitly specified in the directive
const flagshipSpeakers = [
  {
    id: "flagship-nayak",
    name: "Shri S K Nayak",
    designation: "Director of PXE Lab, DRDO",
    company: "DRDO",
    badge: "CHIEF GUEST",
    topic: "Keynote Address: Strategic Defense & Operations Systems",
    linkedin:
      "https://www.drdo.gov.in/drdo/labs-and-establishments/proof-experimental-establishment-pxe",
    imgUrl: guests[0]?.img,
    isKeynote: true,
  },
  {
    id: "flagship-chatterjee",
    name: "Shri Sanjoy Chatterjee",
    designation: "Chair of NASSCOM, Regional Council-East",
    company: "NASSCOM",
    badge: "GUEST OF HONOR",
    topic: "Eastern Region Tech Ecosystem & Digital Optimization",
    linkedin: "https://www.linkedin.com/in/sanjoynet/",
    imgUrl: guests[1]?.img,
    isKeynote: true,
  },
  {
    id: "flagship-rajesh",
    name: "Dr. Rajesh Kumar",
    designation: "Director, Business Analytics",
    company: "Philips",
    badge: "EXECUTIVE LECTURE",
    topic: "Driving Supply Chain digital transformation through data Analytics",
    linkedin: "https://www.linkedin.com/in/dr-rajesh-kumar-0b86a38/",
    imgUrl: guestLectures.find((l) => l.name === "Dr. Rajesh Kumar")?.imgUrl,
    isKeynote: false,
  },
  {
    id: "flagship-arvind",
    name: "Dr. Arvind Kumar",
    designation: "Senior Advisor",
    company: "Optym",
    badge: "OPERATIONS ARCHITECT",
    topic: "Analytics for Electric Vehicles (EVs) and Related Domains",
    linkedin: "https://www.linkedin.com/in/arviphd/",
    imgUrl: guestLectures.find((l) => l.name === "Dr. Arvind Kumar")?.imgUrl,
    isKeynote: false,
  },
  {
    id: "flagship-nitish",
    name: "Nitish Kumar",
    designation: "Head Analyst, Manufacturing",
    company: "Tata Steel",
    badge: "SYSTEMS INTELLIGENCE",
    topic: "AI Journey & Plant Digital Twins at Tata Steel",
    linkedin:
      "https://www.linkedin.com/in/nitish-kumar-b384b3169",
    imgUrl: guestLectures.find((l) => l.name === "Nitish Kumar")?.imgUrl,
    isKeynote: false,
  },
];

// Additional faculty & researchers to preserve all dataset entries
const facultySpeakers = guestLectures
  .filter(
    (l) =>
      l.name !== "Dr. Rajesh Kumar" &&
      l.name !== "Dr. Arvind Kumar" &&
      l.name !== "Nitish Kumar"
  )
  .map((l) => ({
    id: `faculty-${l.id}`,
    name: l.name,
    designation: l.designation,
    company: l.company,
    badge: "RESEARCH SCHOLAR",
    topic: l.topic,
    linkedin: l.linkedin,
    imgUrl: l.imgUrl,
    isKeynote: false,
  }));

const ACCORDION_SPRING = { stiffness: 120, damping: 20 };

/**
 * Individual Accordion Speaker Slice
 * - Inactive: slender, vertical frosted-glass slice with brooding grayscale portrait
 * - Hover / Active: fluid layout expansion, volumetric light sweep, crossfade to vibrant color,
 *   subtle cyber mainframe particle overlay, holographic glass pill badge, and 200ms cryptographic name scramble.
 */
const AccordionSpeakerCard = ({
  speaker,
  index,
  isActive,
  onActivate,
}) => {
  const { text: scrambledName, trigger: triggerScramble } = useTextScramble(
    speaker.name,
    200
  );

  const handleMouseEnter = () => {
    onActivate();
    triggerScramble();
    playHoverChirp();
  };

  return (
    <motion.div
      layout
      transition={{
        layout: { type: "spring", ...ACCORDION_SPRING },
      }}
      onMouseEnter={handleMouseEnter}
      onClick={handleMouseEnter}
      className={`relative rounded-3xl overflow-hidden cursor-pointer select-none border transition-all duration-500 flex flex-col justify-between ${
        isActive
          ? "flex-[3.5] lg:flex-[4] border-cyan-400/50 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
          : "flex-1 border-white/10 hover:border-white/20 bg-white/[0.02]"
      }`}
      style={{
        minHeight: isActive ? "520px" : "140px",
      }}
    >
      {/* 
        Background Portrait with Color-Bleed Shader Effect
        Default: Grayscale, dark, brooding.
        Active: Smooth crossfade into high-contrast vibrant color.
      */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        <motion.img
          layout="position"
          src={speaker.imgUrl}
          alt={speaker.name}
          className={`w-full h-full object-cover object-top sm:object-center transition-all duration-700 ease-out ${
            isActive
              ? "grayscale-0 contrast-110 brightness-105 saturate-125 scale-100"
              : "grayscale contrast-125 brightness-50 opacity-50 scale-105"
          }`}
        />

        {/* Ambient Dark Vignette Mask */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isActive
              ? "bg-gradient-to-t from-[#030305] via-[#030305]/60 to-transparent"
              : "bg-black/60"
          }`}
        />

        {/* Cyber-Overlay: Digital Mainframe Particle/CAD Grid (Active State) */}
        {isActive && (
          <div className="absolute inset-0 bg-cad-grid opacity-30 pointer-events-none mix-blend-screen" />
        )}

        {/* Volumetric Light Sweep across the portrait on expansion */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "200%", opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent skew-x-12 pointer-events-none z-10"
            />
          )}
        </AnimatePresence>
      </div>

      {/* 
        INACTIVE STATE: Slender Vertical Slice Content
      */}
      {!isActive && (
        <div className="relative z-20 h-full w-full p-4 flex flex-row lg:flex-col justify-between items-center pointer-events-none">
          <span className="font-mono text-[11px] text-cyan-400 font-bold bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
            0{index + 1}
          </span>

          {/* Vertical Name Bar on Desktop */}
          <div className="hidden lg:flex items-center justify-center flex-1 my-6">
            <span
              style={{ writingMode: "vertical-rl" }}
              className="font-display text-sm font-bold uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors rotate-180 truncate max-h-72"
            >
              {speaker.name}
            </span>
          </div>

          {/* Horizontal fallback for mobile compact slice */}
          <div className="lg:hidden flex items-center gap-2">
            <span className="font-display text-sm font-bold uppercase text-zinc-300">
              {speaker.name}
            </span>
          </div>

          <div className="w-2 h-2 rounded-full bg-white/20" />
        </div>
      )}

      {/* 
        ACTIVE STATE: Full Spatial Layout with Kinetic Typography & Floating Holographic Badge
      */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="relative z-20 h-full p-6 sm:p-8 flex flex-col justify-between"
          style={{ perspective: "1000px" }}
        >
          {/* Top Row: Index + Floating Holographic Pill Badge */}
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-xs text-cyan-400 font-bold bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full">
              SYS.MINDS // 0{index + 1}
            </span>

            {/* Glowing Holographic Glass-Pill Badge (Levitates on Z-axis) */}
            <motion.div
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.8,
                ease: "easeInOut",
              }}
              style={{ transform: "translateZ(25px)" }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#ff4500]/25 via-cyan-400/20 to-[#ff4500]/25 border border-[#ff4500]/50 backdrop-blur-md shadow-[0_0_15px_rgba(255,69,0,0.4)]"
            >
              <Award className="w-3.5 h-3.5 text-[#ff4500]" />
              <span className="font-mono text-[10px] font-bold text-white tracking-widest uppercase">
                {speaker.badge}
              </span>
            </motion.div>
          </div>

          {/* Bottom Card Content: Scrambled Name, Designation, Topic, and LinkedIn CTA */}
          <div className="space-y-4 pt-12">
            <div className="space-y-1.5">
              {/* Cryptographic Scrambled Name */}
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-white tracking-tight leading-tight">
                {scrambledName}
              </h3>

              <p className="font-mono text-xs sm:text-sm text-[#ff4500] font-semibold">
                {speaker.designation}{" "}
                {speaker.company ? (
                  <span className="text-zinc-400 font-normal">
                    &middot; {speaker.company}
                  </span>
                ) : null}
              </p>
            </div>

            {/* Lecture Topic Banner */}
            {speaker.topic && (
              <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md max-w-xl">
                <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest block mb-1">
                  LECTURE DOMAIN // DISCOURSE
                </span>
                <p className="font-sans text-xs sm:text-sm text-zinc-200 italic leading-snug">
                  &ldquo;{speaker.topic}&rdquo;
                </p>
              </div>
            )}

            {/* Action CTA Row */}
            <div className="pt-2 flex items-center gap-3">
              {speaker.linkedin && (
                <a
                  href={speaker.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    playClickTick();
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-mono text-xs font-semibold tracking-wider transition-all duration-200 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>CONNECT ON LINKEDIN</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

/**
 * THE MINDS // GUEST LECTURES (The Holographic Accordion)
 */
const GuestLecture = () => {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState("flagship"); // "flagship" | "faculty"
  const [activeSpeakerId, setActiveSpeakerId] = useState(
    flagshipSpeakers[0].id
  );

  const activeRoster =
    activeTab === "flagship" ? flagshipSpeakers : facultySpeakers;

  // Scroll tracking for magnetic velocity indicator
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 180,
    damping: 24,
  });

  // Vertical data particle travel along track
  const particleY = useTransform(scrollYProgress, [0, 1], ["0%", "85%"]);

  // Fade out indicator during extreme high-speed scrolling
  const indicatorOpacity = useTransform(
    smoothVelocity,
    [-1800, -300, 0, 300, 1800],
    [0.2, 0.9, 1, 0.9, 0.2]
  );

  return (
    <section
      id="speakers"
      ref={containerRef}
      className="relative w-full py-24 lg:py-32 bg-[#030305] border-b border-white/5 overflow-hidden"
    >
      {/* Background Ambient Atmosphere */}
      <div className="pointer-events-none absolute top-1/4 -right-40 w-96 h-96 bg-cyan-400/10 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute bottom-10 -left-40 w-96 h-96 bg-[#ff4500]/10 rounded-full blur-[140px]" />
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />

      {/* 
        Sleek Vertical Magnetic Scroll-Indicator (Replaced the clunky box)
        Positioned seamlessly to the right side of the section, fading out on high scroll velocity
      */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="hidden xl:flex flex-col items-center gap-3 absolute right-6 lg:right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none"
      >
        <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest -rotate-90 origin-center mb-8 whitespace-nowrap">
          TIMELINE_AXIS
        </span>

        {/* Thin glowing track */}
        <div className="relative w-[2px] h-40 bg-white/10 rounded-full overflow-hidden">
          {/* Moving cyan data particle */}
          <motion.div
            style={{ top: particleY }}
            className="absolute left-1/2 -translate-x-1/2 w-1.5 h-4 rounded-full bg-cyan-400 shadow-[0_0_14px_3px_#00f0ff]"
          />
        </div>

        <span className="font-mono text-[8px] text-cyan-400/80 mt-2">
          SYS.NAV
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header & Roster Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                DISCOURSE // KEYNOTES &amp; PANELS
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-white tracking-tight">
              The Minds // Guest Lectures
            </h2>

            <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
              Global defense leaders, NASSCOM executives, and digital architects
              driving AI, operations research, and enterprise systems engineering.
            </p>
          </div>

          {/* Roster Category Toggle Pills */}
          <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 p-1 rounded-full">
            <button
              type="button"
              onClick={() => {
                playClickTick();
                setActiveTab("flagship");
                setActiveSpeakerId(flagshipSpeakers[0].id);
              }}
              className={`px-4 py-2 rounded-full font-mono text-xs font-semibold tracking-wider transition-all duration-300 ${
                activeTab === "flagship"
                  ? "bg-gradient-to-r from-[#ff4500] to-cyan-500 text-black shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              FLAGSHIP HEADLINERS ({flagshipSpeakers.length})
            </button>

            <button
              type="button"
              onClick={() => {
                playClickTick();
                setActiveTab("faculty");
                setActiveSpeakerId(facultySpeakers[0].id);
              }}
              className={`px-4 py-2 rounded-full font-mono text-xs font-semibold tracking-wider transition-all duration-300 ${
                activeTab === "faculty"
                  ? "bg-gradient-to-r from-[#ff4500] to-cyan-500 text-black shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              ALL RESEARCH MINDS ({facultySpeakers.length})
            </button>
          </div>
        </div>

        {/* 
          THE HOLOGRAPHIC ACCORDION (Fluid Spatial Physics)
          Interactive expanding card gallery driven by Framer Motion layout animations
        */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 h-auto lg:h-[620px] w-full items-stretch">
          {activeRoster.map((speaker, index) => (
            <AccordionSpeakerCard
              key={speaker.id}
              speaker={speaker}
              index={index}
              isActive={activeSpeakerId === speaker.id}
              onActivate={() => setActiveSpeakerId(speaker.id)}
            />
          ))}
        </div>

        {/* Bottom Telemetry Caption */}
        <div className="mt-8 flex items-center justify-between font-mono text-[10px] text-zinc-500">
          <span>HOVER ANY SPEAKER TO TRIGGER FULL HOLOGRAPHIC EXPANSION</span>
          <span className="text-cyan-400">
            OPTIMA 2027 // DEPT. OF INDUSTRIAL &amp; SYSTEMS ENGINEERING
          </span>
        </div>
      </div>
    </section>
  );
};

export default GuestLecture;
