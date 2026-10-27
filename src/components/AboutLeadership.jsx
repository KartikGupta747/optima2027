import React, { useState, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import hodImg from "../assets/HodMessage/hod.png";
import chairImg from "../assets/HodMessage/chairman.webp";
import cochairImg from "../assets/HodMessage/cochairman.png";
import {
  Quote,
  ArrowUpRight,
  Sparkles,
  Layers,
  Award,
  Compass,
} from "lucide-react";
import { playHoverChirp, playClickTick } from "../utils/cyberAudio";

const domains = [
  "Operations Research & Mathematical Modeling",
  "Supply Chain Analytics & Smart Logistics",
  "Machine Learning & Systems Intelligence",
  "Human Factors Engineering & Safety Analytics",
  "Quality Engineering & Process Transformation",
];

const reviews = [
  {
    title: "Learning & Fun Curated",
    content:
      "Optima was a brilliant fest! The events were well-curated, with a perfect balance of deep analytical learning and engaging competition. The workshops provided actionable industrial insights.",
    author: "Rajesh Sharma",
    role: "Operational Lead",
  },
  {
    title: "Evident Professionalism",
    content:
      "The team's execution, systems rigor, and operational excellence were evident across every competition track. Exceptional coordination from the ISE Department.",
    author: "Priya Gupta",
    role: "Analytics Scholar",
  },
  {
    title: "Challenging Problem Statements",
    content:
      "Totally worth participating in the competitions. Competing against such top-tier mathematical minds on real industrial data was an incredible milestone.",
    author: "Himanshu Panda",
    role: "Optimization Researcher",
  },
  {
    title: "High-Caliber Organization",
    content:
      "The organizers ensured participants had full clarity on rubrics and computational tooling. Truly represents the standard of IIT Kharagpur.",
    author: "Sneha Kulkarni",
    role: "Supply Chain Analyst",
  },
];

// Standard high-end spring physics requested
const SPATIAL_SPRING = { mass: 1.2, stiffness: 100, damping: 20 };

/**
 * Reusable Bento Glass Card with dynamic Mouse Spotlight
 * Follows cursor under the frosted glass and illuminates borders
 */
const BentoSpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 107, 0, 0.16)",
  borderColor = "rgba(255, 107, 0, 0.45)",
}) => {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCoords({ x: -1000, y: -1000 });
      }}
      className={`relative rounded-3xl bg-white/[0.02] backdrop-blur-3xl border border-white/5 transition-all duration-500 overflow-hidden ${className}`}
    >
      {/* Dynamic Cursor Spotlight Underneath Glass */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500 rounded-3xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(550px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 45%)`,
        }}
      />

      {/* Dynamic Cursor Border Illumination */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500 rounded-3xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${borderColor}, transparent 40%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

/**
 * Kinetic Typography: Character-by-character upward reveal with blur drop-off
 */
const KineticHeadline = ({ text }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.035,
        delayChildren: 0.1,
      },
    },
  };

  const charVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
      rotateX: -45,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      rotateX: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.h2
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white flex flex-wrap gap-x-3 gap-y-1.5"
      style={{ perspective: "1000px" }}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-flex overflow-hidden py-0.5">
          {word.split("").map((char, cIdx) => (
            <motion.span
              key={cIdx}
              variants={charVariants}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h2>
  );
};

/**
 * Interactive Holographic Domain Pill
 * Levitates on Z-axis with internal data-stream particle scan
 */
const HolographicPill = ({ domain, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => {
        setIsHovered(true);
        playHoverChirp();
      }}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      transition={{ type: "spring", ...SPATIAL_SPRING }}
      className="relative group cursor-pointer overflow-hidden rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md px-4 py-3 flex items-center justify-between select-none"
    >
      {/* Internal Holographic Data-Stream Particle Shimmer on Hover */}
      <motion.div
        animate={
          isHovered
            ? { x: ["-100%", "200%"] }
            : { x: "-100%" }
        }
        transition={{
          repeat: Infinity,
          duration: 1.4,
          ease: "linear",
        }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent skew-x-12"
      />

      {/* Pill Content */}
      <div className="relative z-10 flex items-center gap-3">
        <span className="font-mono text-[10px] text-cyan-400 font-bold bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
          0{index + 1}
        </span>
        <span className="font-sans text-xs sm:text-sm text-zinc-300 group-hover:text-white transition-colors font-medium">
          {domain}
        </span>
      </div>

      <motion.div
        animate={isHovered ? { rotate: 45, scale: 1.15 } : { rotate: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUpRight
          size={14}
          className="text-zinc-500 group-hover:text-cyan-400 transition-colors"
        />
      </motion.div>
    </motion.div>
  );
};

/**
 * Secondary Leadership 3D Spatial Tilt Card (75% scale of Prof. Jha)
 * Equips Prof. Goutam Sen and Prof. Subhajit Sidhanta with full spatial prominence
 */
const SecondaryLeaderCard = ({ name, role, dept, image }) => {
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [10, -10]),
    SPATIAL_SPRING
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
    SPATIAL_SPRING
  );

  const glareX = useTransform(mouseX, [-0.5, 0.5], [85, 15]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [85, 15]);

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
    <div style={{ perspective: "1000px" }} className="w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", ...SPATIAL_SPRING }}
        className="relative rounded-2xl bg-gradient-to-br from-white/[0.04] to-black/70 p-5 sm:p-6 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.7)] cursor-pointer select-none overflow-hidden h-full flex flex-col justify-between"
      >
        {/* Volumetric Glare moving in opposition to mouse */}
        <motion.div
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.16) 0%, transparent 60%)`
            ),
          }}
          className="pointer-events-none absolute inset-0 rounded-2xl z-20"
        />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
          {/* Portrait Container - exactly 75% scale */}
          <div className="relative flex-shrink-0 w-32 h-44 sm:w-36 sm:h-48 rounded-xl overflow-hidden border border-white/15 bg-black">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover object-top filter grayscale contrast-115 hover:grayscale-0 transition-all duration-500"
            />
            <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-400/25 to-[#ff4500]/20 blur-md -z-10" />
          </div>

          {/* Spatial Typography */}
          <div
            style={{ transform: "translateZ(20px)" }}
            className="flex-1 text-center sm:text-left space-y-2 pt-1"
          >
            <div>
              <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest font-semibold block mb-1">
                ORGANIZING LEADERSHIP
              </span>
              <h4 className="font-display text-lg sm:text-xl font-bold uppercase text-white tracking-tight leading-snug">
                {name}
              </h4>
            </div>

            <p className="font-mono text-xs text-[#ff4500] font-medium">
              {role}
            </p>
            <p className="font-sans text-[11px] text-zinc-400 leading-normal">
              {dept}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/**
 * 3D Spatial Parallax Leadership Showcase
 * - Perfectly framed, non-cut portrait of Prof. J.K. Jha (h-64 sm:h-72)
 * - Commanding secondary leadership grid (Prof. Sen & Prof. Sidhanta) at 75% scale with 3D tilt
 */
const SpatialLeadershipCard = () => {
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [12, -12]),
    SPATIAL_SPRING
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-12, 12]),
    SPATIAL_SPRING
  );

  const glareX = useTransform(mouseX, [-0.5, 0.5], [85, 15]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [85, 15]);

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
    <BentoSpotlightCard
      spotlightColor="rgba(255, 107, 0, 0.18)"
      borderColor="rgba(255, 107, 0, 0.45)"
      className="p-6 sm:p-8"
    >
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#ff4500] font-semibold">
          <Award className="w-4 h-4" />
          <span>LEADERSHIP STATEMENT</span>
        </div>
        <span className="font-mono text-[10px] text-zinc-500">
          IIT KHARAGPUR // ISE
        </span>
      </div>

      {/* 
        Prof. Jitendra Kumar Jha (Head of Department)
        Perfect framing with h-64 sm:h-72 rounded-2xl spatial anchor
      */}
      <div
        style={{ perspective: "1200px" }}
        className="flex items-center justify-center py-2"
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full rounded-2xl bg-gradient-to-br from-white/[0.04] to-black/70 p-6 sm:p-7 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer select-none"
        >
          {/* Volumetric Glare moving in opposition to mouse */}
          <motion.div
            style={{
              background: useTransform(
                [glareX, glareY],
                ([gx, gy]) =>
                  `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.18) 0%, transparent 60%)`
              ),
            }}
            className="pointer-events-none absolute inset-0 rounded-2xl z-20"
          />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8">
            {/* Prof. Jha Portrait: Proper defined height (h-64 sm:h-72), uncropped, spatial anchor */}
            <div className="relative flex-shrink-0 w-full sm:w-60 md:w-64 h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/15 bg-black shadow-xl">
              <img
                src={hodImg}
                alt="Prof. Jitendra Kumar Jha"
                className="w-full h-full object-cover object-top sm:object-center filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
              />
              <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#ff4500]/30 to-cyan-400/30 blur-lg -z-10" />
            </div>

            {/* Floating Spatial Text (translateZ 30px) */}
            <div
              style={{ transform: "translateZ(30px)" }}
              className="space-y-3.5 flex-1 text-center sm:text-left pt-1"
            >
              <div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">
                  HEAD OF DEPARTMENT
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight">
                  Prof. Jitendra Kumar Jha
                </h3>
                <p className="font-mono text-xs sm:text-sm text-[#ff4500] font-semibold pt-0.5">
                  Department of Industrial &amp; Systems Engineering
                </p>
              </div>

              {/* Floating Quote */}
              <div className="relative pt-2">
                <Quote className="absolute -top-1 -left-2 w-5 h-5 text-white/10 -z-10" />
                <blockquote className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed">
                  &ldquo;As the Department of Industrial and Systems Engineering
                  marks its 54th anniversary, I am delighted to present Optima 2027.
                  Optima offers a distinctive platform for students to experience
                  world-class research, while providing brands with an opportunity
                  to engage with an astute and diverse audience.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 
        Elevated Secondary Leadership Grid (Prof. Goutam Sen & Prof. Subhajit Sidhanta)
        Occupies a commanding 2-column spatial grid at 75% scale of Prof. Jha
      */}
      <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-5">
        <SecondaryLeaderCard
          name="Prof. Goutam Sen"
          role="Chairman, Optima"
          dept="Department of Industrial &amp; Systems Engineering"
          image={chairImg}
        />
        <SecondaryLeaderCard
          name="Prof. Subhajit Sidhanta"
          role="Co-Chairman, Optima"
          dept="Department of Industrial &amp; Systems Engineering"
          image={cochairImg}
        />
      </div>
    </BentoSpotlightCard>
  );
};

/**
 * The Review Matrix: Infinite Magnetic Marquee Carousel
 * Pure typography focus: bold title, frosted text, sleek neon author accent.
 * ALL star icons and numerical rating counters completely purged.
 */
const ReviewMatrix = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Triple review array for infinite seamless looping
  const infiniteReviews = [...reviews, ...reviews, ...reviews];

  return (
    <BentoSpotlightCard
      spotlightColor="rgba(0, 240, 255, 0.16)"
      borderColor="rgba(0, 240, 255, 0.45)"
      className="p-6 sm:p-8 flex flex-col justify-between"
    >
      {/* Header: Pure Minimalist Telemetry (No stars or rating numbers) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            THE REVIEW MATRIX // VERIFIED ENDORSEMENTS
          </h3>
        </div>

        {/* Sleek Minimalist Status Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
            EXECUTIVE &amp; ALUMNI VOICES
          </span>
        </div>
      </div>

      {/* 
        Infinite Magnetic Carousel Marquee
        Halts smoothly on hover, scales card 1.05x, ignites neon animated border
      */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredIndex(null);
        }}
        className="relative overflow-hidden py-4 -mx-6 sm:-mx-8 px-6 sm:px-8 cursor-grab active:cursor-grabbing"
      >
        {/* Soft edge blur masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#030305] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#030305] to-transparent z-10" />

        <motion.div
          animate={
            isPaused
              ? {}
              : {
                  x: ["0%", "-33.333%"],
                }
          }
          transition={{
            repeat: Infinity,
            duration: 22,
            ease: "linear",
          }}
          className="flex gap-5 w-max"
        >
          {infiniteReviews.map((rev, idx) => {
            const isHovered = hoveredIndex === idx;

            return (
              <motion.div
                key={idx}
                onMouseEnter={() => {
                  setHoveredIndex(idx);
                  playHoverChirp();
                }}
                whileHover={{
                  scale: 1.05,
                  y: -6,
                  zIndex: 40,
                }}
                transition={{ type: "spring", ...SPATIAL_SPRING }}
                className={`relative w-80 sm:w-96 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between ${
                  isHovered
                    ? "neon-animated-border shadow-2xl"
                    : "bg-white/[0.03] border border-white/5 backdrop-blur-xl"
                }`}
              >
                {/* Pure Kinetic Typography (No Star Icons) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                      ENDORSEMENT // 0{((idx % reviews.length) + 1)}
                    </span>
                    <Quote className="w-4 h-4 text-zinc-600" />
                  </div>

                  {/* Bold Review Title */}
                  <h4 className="font-display text-base font-bold uppercase text-white tracking-tight leading-snug">
                    {rev.title}
                  </h4>

                  {/* Frosted Glass Body */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans line-clamp-4">
                    &ldquo;{rev.content}&rdquo;
                  </p>
                </div>

                {/* Sleek Neon Author Accent */}
                <div className="pt-4 mt-5 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                  <span className="text-cyan-400 font-bold tracking-wider drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">
                    {rev.author}
                  </span>
                  <span className="text-zinc-500 text-[11px] font-sans">
                    {rev.role}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-4 pt-3 flex items-center justify-between text-zinc-500 font-mono text-[10px]">
        <span>HOVER TO INSPECT // DRAG TO NAVIGATE</span>
        <span className="text-cyan-400">VERIFIED ATTENDEES</span>
      </div>
    </BentoSpotlightCard>
  );
};

/**
 * THE DIMENSIONAL DATA-CORE (About & Leadership Bento Grid)
 */
const AboutLeadership = () => {
  return (
    <section
      id="about"
      className="relative w-full py-24 lg:py-32 bg-[#030305] border-b border-white/5 overflow-hidden"
    >
      {/* Background Ambient Glows & Spatial Atmosphere */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 bg-[#ff4500]/10 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-400/10 rounded-full blur-[140px]" />
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Telemetry Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md">
          <Layers className="w-3.5 h-3.5 text-[#ff4500]" />
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            THE ARCHITECTURE // ABOUT &amp; DOMAINS
          </span>
        </div>

        {/* 
          Asymmetrical Spatial Bento Grid
          Left (5 cols): The Context & Kinetic Manifesto
          Right (7 cols): Spatial 3D Leadership + Review Matrix
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* ==========================================================
              TILE 1: The Context & Kinetic Manifesto (5 Columns)
              ========================================================== */}
          <div className="lg:col-span-5 flex flex-col">
            <BentoSpotlightCard
              spotlightColor="rgba(255, 107, 0, 0.16)"
              borderColor="rgba(255, 107, 0, 0.4)"
              className="p-6 sm:p-8 flex flex-col justify-between h-full"
            >
              <div className="space-y-6">
                {/* Kinetic Headline */}
                <KineticHeadline text="Engineering Computational Optimization" />

                {/* Narrative Text */}
                <div className="space-y-3 font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  <p>
                    A premier symposium for industrial engineering, systems
                    thinking, and operational modeling. Orchestrated by the
                    Department of Industrial and Systems Engineering at IIT
                    Kharagpur, Optima 2027 converges student innovation with
                    global research and computational rigor.
                  </p>
                  <p className="text-zinc-400">
                    Founded in 1973, the ISE department has continuously defined
                    algorithmic workflows for complex supply chains, digital twins,
                    ergonomics, and predictive analytics.
                  </p>
                </div>

                {/* Staggered Interactive Holographic Pills */}
                <div className="pt-2 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-cyan-400 uppercase tracking-wider font-semibold">
                    <Compass className="w-3.5 h-3.5" />
                    <span>CORE_ISE_DOMAINS</span>
                  </div>

                  <div className="space-y-2.5">
                    {domains.map((domain, index) => (
                      <HolographicPill
                        key={domain}
                        domain={domain}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Institutional Portal CTA Button */}
              <div className="pt-6 mt-6 border-t border-white/5">
                <a
                  href="http://www.iem.iitkgp.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickTick}
                  className="group relative flex items-center justify-between px-5 py-3 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-cyan-400/50 transition-all font-mono text-xs text-white"
                >
                  <span className="font-semibold tracking-wider">
                    EXPLORE DEPARTMENT PORTAL
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>
              </div>
            </BentoSpotlightCard>
          </div>

          {/* ==========================================================
              RIGHT COLUMN (7 Columns):
              Tile 2: Spatial Leadership Card (Prof. Jha + Sen & Sidhanta at 75% scale)
              Tile 3: The Review Matrix Infinite Carousel (Pure Typography)
              ========================================================== */}
          <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-8">
            {/* Tile 2: Spatial Leadership Card */}
            <SpatialLeadershipCard />

            {/* Tile 3: The Review Matrix Carousel */}
            <ReviewMatrix />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutLeadership;
