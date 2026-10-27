import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
} from "framer-motion";
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Sparkles,
  Layers,
  Activity,
  Scan,
  Download,
} from "lucide-react";
import { playClickTick, playHoverChirp } from "../utils/cyberAudio";

// ==========================================
// 1. DATASET: 25 GENUINE ASSETS WITH METADATA
// ==========================================
const GALLERY_ITEMS = [
  // GLIMPSES OF OPTIMA
  {
    id: "glimpse-01",
    category: "GLIMPSES",
    categoryLabel: "GLIMPSES // DAY_00",
    title: "INAUGURAL PROCESSION",
    subtitle: "Department of Industrial & Systems Engineering",
    code: "OPT_001",
    timestamp: "CYCLE_2025 // 09:00 IST",
    location: "ISE FOYER // IIT KGP",
    src: "/GalleryPhotos/day0-images/IMG_2518.webp",
    aspect: "aspect-[4/3]",
    resolution: "3840 x 2160",
    tags: ["DEPT_ISE", "INAUGURAL", "SYMPOSIUM"],
  },
  {
    id: "glimpse-02",
    category: "GLIMPSES",
    categoryLabel: "GLIMPSES // DAY_00",
    title: "SYMPOSIUM INITIATION",
    subtitle: "Ceremonial Assembly & Address",
    code: "OPT_002",
    timestamp: "CYCLE_2025 // 10:15 IST",
    location: "MAIN AUDITORIUM",
    src: "/GalleryPhotos/day0-images/4.webp",
    aspect: "aspect-[16/10]",
    resolution: "4096 x 2304",
    tags: ["PLENARY", "DELEGATES", "KEYNOTE"],
  },
  {
    id: "glimpse-03",
    category: "GLIMPSES",
    categoryLabel: "GLIMPSES // DAY_00",
    title: "COMPUTATIONAL ARENA",
    subtitle: "Student Delegates & Researchers",
    code: "OPT_003",
    timestamp: "CYCLE_2025 // 11:30 IST",
    location: "ANNEX LAB 03",
    src: "/GalleryPhotos/day0-images/6.webp",
    aspect: "aspect-[4/5]",
    resolution: "2160 x 2700",
    tags: ["STUDENT_BODY", "SYSTEMS", "COMPUTE"],
  },
  {
    id: "glimpse-04",
    category: "GLIMPSES",
    categoryLabel: "GLIMPSES // DAY_00",
    title: "RESEARCH DELEGATION",
    subtitle: "Academic Peer Review Panels",
    code: "OPT_004",
    timestamp: "CYCLE_2025 // 13:00 IST",
    location: "CONFERENCE HALL A",
    src: "/GalleryPhotos/day0-images/8.webp",
    aspect: "aspect-[16/10]",
    resolution: "3840 x 2160",
    tags: ["FACULTY", "SCHOLARS", "PANEL"],
  },
  {
    id: "glimpse-05",
    category: "GLIMPSES",
    categoryLabel: "GLIMPSES // DAY_00",
    title: "SYSTEM ARCHITECTS",
    subtitle: "Fest Coordination & Command Operations",
    code: "OPT_005",
    timestamp: "CYCLE_2025 // 15:00 IST",
    location: "COMMAND DESK // ISE",
    src: "/GalleryPhotos/day0-images/10.webp",
    aspect: "aspect-[4/3]",
    resolution: "3840 x 2160",
    tags: ["CORE_TEAM", "OPERATIONS", "DISPATCH"],
  },
  {
    id: "glimpse-06",
    category: "GLIMPSES",
    categoryLabel: "GLIMPSES // DAY_00",
    title: "OPTIMIZATION PLENARY",
    subtitle: "Valedictory & Key Highlights",
    code: "OPT_006",
    timestamp: "CYCLE_2025 // 17:30 IST",
    location: "CENTRAL AUDITORIUM",
    src: "/GalleryPhotos/day0-images/12.webp",
    aspect: "aspect-[16/10]",
    resolution: "4096 x 2304",
    tags: ["VALEDICTORY", "HONORS", "IITKGP"],
  },
  {
    id: "glimpse-07",
    category: "GLIMPSES",
    categoryLabel: "GLIMPSES // DAY_00",
    title: "COLLABORATION FORUM",
    subtitle: "Cross-Institutional Networking Hub",
    code: "OPT_007",
    timestamp: "CYCLE_2025 // 19:00 IST",
    location: "SEMINAR COMPLEX",
    src: "/GalleryPhotos/day0-images/14.webp",
    aspect: "aspect-[4/5]",
    resolution: "2160 x 2700",
    tags: ["NETWORKING", "ALUMNI", "SYNERGY"],
  },
  {
    id: "glimpse-08",
    category: "GLIMPSES",
    categoryLabel: "CAMPUS // ARCHIVE",
    title: "HISTORIC TOWER",
    subtitle: "IIT Kharagpur Heritage Campus",
    code: "OPT_008",
    timestamp: "CAMPUS_ARCHIVE",
    location: "MAIN BUILDING // IIT KGP",
    src: "/homepagePhotos/a.webp",
    aspect: "aspect-[16/10]",
    resolution: "3840 x 2160",
    tags: ["HERITAGE", "IIT_KGP", "LANDMARK"],
  },
  {
    id: "glimpse-09",
    category: "GLIMPSES",
    categoryLabel: "COMPUTE // CORE",
    title: "SYNAPTIC DATA STREAM",
    subtitle: "Algorithmic Performance Cluster",
    code: "OPT_009",
    timestamp: "ANALYTICS_CORE",
    location: "ISE SERVER CLUSTER",
    src: "/homepagePhotos/b.webp",
    aspect: "aspect-[4/3]",
    resolution: "3840 x 2160",
    tags: ["SUPERCOMPUTE", "HPC", "NEURAL"],
  },

  // GUEST LECTURES
  {
    id: "lecture-01",
    category: "GUEST_LECTURES",
    categoryLabel: "GUEST LECTURE // KEYNOTE",
    title: "GLOBAL SUPPLY CHAINS",
    subtitle: "Industrial Keynote by Industry Stalwarts",
    code: "LEC_001",
    timestamp: "CYCLE_2025 // 11:00 IST",
    location: "KALIDAS AUDITORIUM",
    src: "/GalleryPhotos/guest-lecture-images/g1.webp",
    aspect: "aspect-[16/10]",
    resolution: "3840 x 2160",
    tags: ["SUPPLY_CHAIN", "INDUSTRY_4.0", "LEADERSHIP"],
  },
  {
    id: "lecture-02",
    category: "GUEST_LECTURES",
    categoryLabel: "GUEST LECTURE // DIALOGUE",
    title: "EXECUTIVE PERSPECTIVES",
    subtitle: "Enterprise Systems Optimization",
    code: "LEC_002",
    timestamp: "CYCLE_2025 // 14:30 IST",
    location: "KALIDAS AUDITORIUM",
    src: "/GalleryPhotos/guest-lecture-images/g2.webp",
    aspect: "aspect-[4/5]",
    resolution: "2160 x 2700",
    tags: ["STRATEGY", "OPERATIONS", "DISCOURSE"],
  },
  {
    id: "lecture-03",
    category: "GUEST_LECTURES",
    categoryLabel: "GUEST LECTURE // FIRESIDE",
    title: "STRATEGIC OPERATIONS",
    subtitle: "Interactive Q&A Session with Delegates",
    code: "LEC_003",
    timestamp: "CYCLE_2025 // 16:45 IST",
    location: "EXECUTIVE SUITE",
    src: "/GalleryPhotos/guest-lecture-images/g3.webp",
    aspect: "aspect-[4/3]",
    resolution: "3840 x 2160",
    tags: ["ROUNDTABLE", "RESEARCH", "INSIGHTS"],
  },

  // WORKSHOPS
  {
    id: "workshop-01",
    category: "WORKSHOPS",
    categoryLabel: "WORKSHOP // HANDS_ON",
    title: "ADVANCED SIMULATION LAB",
    subtitle: "Stochastic Modeling & Discrete Events",
    code: "WRK_001",
    timestamp: "CYCLE_2025 // 09:30 IST",
    location: "SIMULATION SUITE 1",
    src: "/GalleryPhotos/workshops/w1.webp",
    aspect: "aspect-[4/3]",
    resolution: "3840 x 2160",
    tags: ["SIMULATION", "STOCHASTIC", "FLEXSIM"],
  },
  {
    id: "workshop-02",
    category: "WORKSHOPS",
    categoryLabel: "WORKSHOP // PRACTICUM",
    title: "MACHINE LEARNING IN OR",
    subtitle: "Optimization via Neural Heuristics",
    code: "WRK_002",
    timestamp: "CYCLE_2025 // 11:45 IST",
    location: "HPC TERMINAL ROOM",
    src: "/GalleryPhotos/workshops/w2.webp",
    aspect: "aspect-[16/10]",
    resolution: "4096 x 2304",
    tags: ["DEEP_LEARNING", "OR_METHODS", "PYTHON"],
  },
  {
    id: "workshop-03",
    category: "WORKSHOPS",
    categoryLabel: "WORKSHOP // LAB",
    title: "QUANTITATIVE PORTFOLIO LAB",
    subtitle: "Algorithmic Risk & Capital Allocation",
    code: "WRK_003",
    timestamp: "CYCLE_2025 // 14:15 IST",
    location: "FINANCIAL LAB B",
    src: "/GalleryPhotos/workshops/w3.webp",
    aspect: "aspect-[4/5]",
    resolution: "2160 x 2700",
    tags: ["QUANT_FINANCE", "RISK_ENGINEERING", "DATA"],
  },
  {
    id: "workshop-04",
    category: "WORKSHOPS",
    categoryLabel: "WORKSHOP // WAR_ROOM",
    title: "SUPPLY CHAIN WAR ROOM",
    subtitle: "Live Scenario Bottleneck Elimination",
    code: "WRK_004",
    timestamp: "CYCLE_2025 // 16:30 IST",
    location: "COLLAB SUITE 04",
    src: "/GalleryPhotos/workshops/w4.webp",
    aspect: "aspect-[4/3]",
    resolution: "3840 x 2160",
    tags: ["LOGISTICS", "DISRUPTION", "STRATEGY"],
  },
  {
    id: "workshop-05",
    category: "WORKSHOPS",
    categoryLabel: "WORKSHOP // SYNTHESIS",
    title: "DECISION SYSTEMS CAPSTONE",
    subtitle: "Dynamic Solution Prototyping",
    code: "WRK_005",
    timestamp: "CYCLE_2025 // 18:00 IST",
    location: "INNOVATION HUB",
    src: "/GalleryPhotos/workshops/w5.webp",
    aspect: "aspect-[16/10]",
    resolution: "3840 x 2160",
    tags: ["SYSTEMS_ENG", "CAPSTONE", "SHOWCASE"],
  },

  // COMPETITIONS
  {
    id: "comp-01",
    category: "COMPETITIONS",
    categoryLabel: "COMPETITION // ARENA",
    title: "STRATATHON // FINALS",
    subtitle: "Fast-Paced Optimization Hackathon",
    code: "CMP_001",
    timestamp: "CYCLE_2025 // 10:00 IST",
    location: "ARENA POD ALPHA",
    src: "/GalleryPhotos/competitions/c1.webp",
    aspect: "aspect-[16/10]",
    resolution: "4096 x 2304",
    tags: ["HACKATHON", "SPRINT", "STRATATHON"],
  },
  {
    id: "comp-02",
    category: "COMPETITIONS",
    categoryLabel: "COMPETITION // SHOWDOWN",
    title: "INNOVATE-X PITCH BATTLE",
    subtitle: "Industrial Problem Statement Defense",
    code: "CMP_002",
    timestamp: "CYCLE_2025 // 12:15 IST",
    location: "JURY BOARD ROOM",
    src: "/GalleryPhotos/competitions/c2.webp",
    aspect: "aspect-[4/3]",
    resolution: "3840 x 2160",
    tags: ["INNOVATE_X", "PITCH", "VENTURES"],
  },
  {
    id: "comp-03",
    category: "COMPETITIONS",
    categoryLabel: "COMPETITION // CODE_CORE",
    title: "CODELAND LIVE ARENA",
    subtitle: "Algorithmic Speed Combat",
    code: "CMP_003",
    timestamp: "CYCLE_2025 // 14:00 IST",
    location: "TERMINAL GRID 2",
    src: "/GalleryPhotos/competitions/c3.webp",
    aspect: "aspect-[4/5]",
    resolution: "2160 x 2700",
    tags: ["CODELAND", "COMPETITIVE_CODE", "SYNTAX"],
  },
  {
    id: "comp-04",
    category: "COMPETITIONS",
    categoryLabel: "COMPETITION // SIMULATION",
    title: "OPTISIM INDUSTRIAL DRILL",
    subtitle: "Discrete-Event Warehouse Simulation",
    code: "CMP_004",
    timestamp: "CYCLE_2025 // 15:30 IST",
    location: "SIMULATION ARENA",
    src: "/GalleryPhotos/competitions/c4.webp",
    aspect: "aspect-[16/10]",
    resolution: "3840 x 2160",
    tags: ["OPTISIM", "LOGISTICS", "WAREHOUSE"],
  },
  {
    id: "comp-05",
    category: "COMPETITIONS",
    categoryLabel: "COMPETITION // FINANCE",
    title: "FINANCE FANTASIA COMBAT",
    subtitle: "Live Market Arbitrage Modeling",
    code: "CMP_005",
    timestamp: "CYCLE_2025 // 16:45 IST",
    location: "QUANT TRADING DESK",
    src: "/GalleryPhotos/competitions/c5.webp",
    aspect: "aspect-[4/3]",
    resolution: "3840 x 2160",
    tags: ["FINANCE_FANTASIA", "ARBITRAGE", "DERIVATIVES"],
  },
  {
    id: "comp-06",
    category: "COMPETITIONS",
    categoryLabel: "COMPETITION // LOGISTICS",
    title: "NETWORKSIFY MATRIX",
    subtitle: "Global Network Routing Challenge",
    code: "CMP_006",
    timestamp: "CYCLE_2025 // 18:00 IST",
    location: "LOGISTICS LAB",
    src: "/GalleryPhotos/competitions/c6.webp",
    aspect: "aspect-[16/10]",
    resolution: "3840 x 2160",
    tags: ["NETWORKSIFY", "GRAPH_THEORY", "ROUTING"],
  },
  {
    id: "comp-07",
    category: "COMPETITIONS",
    categoryLabel: "COMPETITION // PODIUM",
    title: "PRIZE PODIUM CEREMONY",
    subtitle: "Victory & Citations Conferred",
    code: "CMP_007",
    timestamp: "CYCLE_2025 // 19:30 IST",
    location: "CENTRAL AMPHITHEATER",
    src: "/GalleryPhotos/competitions/c7.webp",
    aspect: "aspect-[4/5]",
    resolution: "2160 x 2700",
    tags: ["PODIUM", "AWARDS", "CHAMPIONS"],
  },
  {
    id: "comp-08",
    category: "COMPETITIONS",
    categoryLabel: "COMPETITION // CELEBRATION",
    title: "CHAMPIONS GATHERING",
    subtitle: "Celebrating Engineering Excellence",
    code: "CMP_008",
    timestamp: "CYCLE_2025 // 20:15 IST",
    location: "CEREMONY STAGE",
    src: "/GalleryPhotos/competitions/c8.webp",
    aspect: "aspect-[16/10]",
    resolution: "3840 x 2160",
    tags: ["EXCELLENCE", "OPT_2025", "TRIUMPH"],
  },
];

// Category Filter Definitions
const FILTERS = [
  { id: "ALL", label: "ALL ARCHIVES", count: 25 },
  { id: "GLIMPSES", label: "GLIMPSES OF OPTIMA", count: 9 },
  { id: "GUEST_LECTURES", label: "GUEST LECTURES", count: 3 },
  { id: "WORKSHOPS", label: "WORKSHOPS", count: 5 },
  { id: "COMPETITIONS", label: "COMPETITIONS", count: 8 },
];

// ==========================================
// 2. MAGNETIC HOLOGRAPHIC FILTER PILL
// ==========================================
const MagneticFilterPill = ({ filter, isActive, onClick }) => {
  const buttonRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 350, damping: 20 });
  const springY = useSpring(y, { stiffness: 350, damping: 20 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.35;
    const distanceY = (e.clientY - centerY) * 0.35;
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        playClickTick();
        onClick(filter.id);
      }}
      className={`relative px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 backdrop-blur-xl flex items-center gap-2 select-none group ${
        isActive
          ? "border border-[#ff4500] bg-[#ff4500]/15 text-white shadow-[0_0_25px_rgba(255,69,0,0.5),inset_0_0_12px_rgba(255,69,0,0.3)]"
          : "border border-white/10 bg-white/[0.03] text-white/60 hover:text-white hover:border-cyan-400/50 hover:bg-white/[0.06] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
      }`}
    >
      {/* Active Glowing Pulse Dot */}
      {isActive ? (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff4500] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff4500]"></span>
        </span>
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-white/20 group-hover:bg-cyan-400 transition-colors" />
      )}

      <span>{filter.label}</span>

      {/* Item Count Chip */}
      <span
        className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
          isActive
            ? "bg-[#ff4500]/30 text-orange-200 border border-[#ff4500]/50"
            : "bg-white/5 text-white/40 group-hover:text-white/80"
        }`}
      >
        {filter.count}
      </span>
    </motion.button>
  );
};

// ==========================================
// 3. MEDIA PLATE (3D TILT, SIBLING DIM, RGB GLITCH)
// ==========================================
const MediaPlate = ({
  item,
  isTarget,
  isDimmed,
  onHoverStart,
  onHoverEnd,
  onClick,
}) => {
  const cardRef = useRef(null);
  const [isGlitching, setIsGlitching] = useState(false);

  // 3D Tilt Motion Values
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { stiffness: 260, damping: 20 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 260, damping: 20 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xRel = (e.clientX - rect.left) / rect.width - 0.5;
    const yRel = (e.clientY - rect.top) / rect.height - 0.5;

    // Subtle 3D tilt tracking cursor (-10 to +10 degrees)
    tiltX.set(-yRel * 16);
    tiltY.set(xRel * 16);
  };

  const handleMouseEnter = () => {
    playHoverChirp();
    onHoverStart(item.id);
    // Trigger split-second RGB chromatic aberration glitch on hover start
    setIsGlitching(true);
    setTimeout(() => {
      setIsGlitching(false);
    }, 280);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    setIsGlitching(false);
    onHoverEnd();
  };

  return (
    <motion.div
      layout
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.88, filter: "blur(6px)" }}
      animate={{
        opacity: isDimmed ? 0.2 : 1,
        scale: isTarget ? 1.06 : isDimmed ? 0.96 : 1,
        filter: isDimmed ? "blur(3px)" : "blur(0px)",
      }}
      exit={{ opacity: 0, scale: 0.84, filter: "blur(8px)" }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        rotateX: smoothTiltX,
        rotateY: smoothTiltY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(item)}
      data-cursor="view-data"
      className={`group relative mb-6 rounded-xl overflow-hidden cursor-pointer select-none transition-shadow duration-300 ${
        isTarget
          ? "z-30 shadow-[0_25px_60px_rgba(255,69,0,0.4),0_0_35px_rgba(0,240,255,0.3)] ring-1 ring-[#ff4500]/70"
          : "z-10 shadow-[0_10px_30px_rgba(0,0,0,0.85)] border border-white/5"
      }`}
    >
      {/* Aspect Ratio Container */}
      <div className={`relative w-full ${item.aspect} overflow-hidden bg-[#07070a]`}>
        {/* Main Photograph: Grayscale default -> Vibrant on hover */}
        <motion.img
          src={item.src}
          alt={item.title}
          loading="lazy"
          className={`w-full h-full object-cover transition-all duration-500 ease-out ${
            isTarget
              ? "grayscale-0 contrast-105 brightness-105 scale-105"
              : "grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:scale-105"
          }`}
        />

        {/* CRT Scanline & Grain Texture Overlay (Default state) */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-35 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.7)_50%)] bg-[length:100%_4px] mix-blend-overlay" />

        {/* Split-Second Real-Time RGB Chromatic Aberration Glitch Layer */}
        {isGlitching && (
          <div className="absolute inset-0 pointer-events-none z-20 mix-blend-screen opacity-85 overflow-hidden animate-pulse">
            <img
              src={item.src}
              alt="glitch-red"
              className="absolute inset-0 w-full h-full object-cover translate-x-[4px] translate-y-[-1px] filter drop-shadow([-3px_0_#ff0055])"
            />
            <img
              src={item.src}
              alt="glitch-cyan"
              className="absolute inset-0 w-full h-full object-cover -translate-x-[4px] translate-y-[1px] filter drop-shadow([3px_0_#00ffff])"
            />
          </div>
        )}

        {/* Dark Vignette & Gradient Underlay */}
        <div className="absolute inset-0 z-15 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-300" />

        {/* Cybernetic Corner Reticle Markers */}
        <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-white/40 group-hover:border-cyan-400 transition-colors z-20" />
        <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-white/40 group-hover:border-orange-500 transition-colors z-20" />
        <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-white/40 group-hover:border-orange-500 transition-colors z-20" />
        <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-white/40 group-hover:border-cyan-400 transition-colors z-20" />

        {/* Top Floating Telemetry Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
          <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[9px] text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-cyan-400" />
            {item.categoryLabel}
          </span>
          <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[9px] text-orange-400 uppercase tracking-widest">
            {item.code}
          </span>
        </div>

        {/* Bottom Content Metadata Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 flex flex-col justify-end translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] text-white/50 tracking-wider">
              {item.timestamp}
            </span>
            <span className="text-white/20">/</span>
            <span className="font-mono text-[10px] text-orange-400/90 tracking-wider">
              {item.location}
            </span>
          </div>

          <h3 className="text-sm md:text-base font-bold font-sans tracking-tight text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
            <span>{item.title}</span>
            <Maximize2 className="w-3.5 h-3.5 text-white/30 group-hover:text-cyan-400 transition-colors ml-2 flex-shrink-0" />
          </h3>

          <p className="text-[11px] text-white/60 line-clamp-1 mt-0.5">
            {item.subtitle}
          </p>

          {/* Interactive Inspection Indicator on Hover */}
          <div className="overflow-hidden h-0 group-hover:h-5 transition-all duration-300 mt-1 flex items-center gap-2">
            <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1">
              <Scan className="w-2.5 h-2.5" /> [ CLICK TO DECRYPT FULLSTREAM ]
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// 4. LIGHTBOX INSPECTION MODAL (EXPANDED RECORD)
// ==========================================
const LightboxModal = ({ item, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.35 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full bg-[#050508] border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(255,69,0,0.3)] flex flex-col"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-xs text-cyan-300 font-bold tracking-widest uppercase">
              DECRYPTED RECORD: {item.code}
            </span>
            <span className="text-white/20">|</span>
            <span className="font-mono text-xs text-white/50">{item.timestamp}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-red-500/50 bg-white/5 hover:bg-red-500/10 text-white/70 hover:text-red-400 font-mono text-xs tracking-wider transition-colors flex items-center gap-1.5"
            >
              <X className="w-3.5 h-3.5" />
              <span>[ ESC // CLOSE ]</span>
            </button>
          </div>
        </div>

        {/* Center Media Viewport */}
        <div className="relative w-full max-h-[65vh] min-h-[40vh] bg-black flex items-center justify-center overflow-hidden">
          <img
            src={item.src}
            alt={item.title}
            className="max-h-[65vh] w-auto max-w-full object-contain"
          />

          {/* Nav Controls */}
          <button
            onClick={onPrev}
            className="absolute left-4 p-3 rounded-full bg-black/60 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400 text-white transition-all backdrop-blur-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 p-3 rounded-full bg-black/60 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400 text-white transition-all backdrop-blur-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Technical Telemetry Panel */}
        <div className="p-6 border-t border-white/10 bg-white/[0.01] grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase mb-1">
              RECORD TITLE // METADATA
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
              {item.title}
            </h2>
            <p className="text-sm text-white/70 mt-1">{item.subtitle}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-white/60 tracking-wider"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 flex flex-col justify-between">
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-white/50">
                <span>LOCATION:</span>
                <span className="text-white font-bold">{item.location}</span>
              </div>
              <div className="flex justify-between text-white/50">
                <span>COORDINATES:</span>
                <span className="text-orange-400">22.3149° N, 87.3105° E</span>
              </div>
              <div className="flex justify-between text-white/50">
                <span>RESOLUTION:</span>
                <span className="text-white font-bold">{item.resolution}</span>
              </div>
              <div className="flex justify-between text-white/50">
                <span>CIPHER STATUS:</span>
                <span className="text-green-400 font-bold">VERIFIED_AUTHENTIC</span>
              </div>
            </div>

            <a
              href={item.src}
              download={`${item.code}_OPTIMA2027.webp`}
              className="mt-4 px-4 py-2 rounded-lg bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500 text-white font-mono text-xs tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5 text-orange-400" />
              <span>DOWNLOAD HIGH-RES</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ==========================================
// 5. MAIN COMPONENT: THE VELOCITY PARALLAX MATRIX
// ==========================================
const Gallery = ({ standalone = false }) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "250px 0px 250px 0px" });

  const [activeFilter, setActiveFilter] = useState("ALL");
  const [hoveredId, setHoveredId] = useState(null);
  const [activeModalItem, setActiveModalItem] = useState(null);

  // Scroll Velocity Physics Setup
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    mass: 0.2,
  });

  // Parallax Matrix Translations:
  // Columns 1 & 3 move FASTER than baseline
  // Columns 2 & 4 move SLOWER than baseline
  const col1Y = useTransform(smoothProgress, [0, 1], ["50px", "-110px"]);
  const col2Y = useTransform(smoothProgress, [0, 1], ["-50px", "80px"]);
  const col3Y = useTransform(smoothProgress, [0, 1], ["80px", "-130px"]);
  const col4Y = useTransform(smoothProgress, [0, 1], ["-70px", "95px"]);

  // Filtered dataset
  const filteredItems = useMemo(() => {
    if (activeFilter === "ALL") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  // Distribute items across 4 asymmetric columns
  const columnData = useMemo(() => {
    const cols = [[], [], [], []];
    filteredItems.forEach((item, index) => {
      cols[index % 4].push(item);
    });
    return cols;
  }, [filteredItems]);

  const handleOpenModal = (item) => {
    playClickTick();
    setActiveModalItem(item);
  };

  const handlePrevItem = () => {
    if (!activeModalItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeModalItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveModalItem(filteredItems[prevIndex]);
  };

  const handleNextItem = () => {
    if (!activeModalItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeModalItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveModalItem(filteredItems[nextIndex]);
  };

  return (
    <section
      ref={sectionRef}
      id="gallery"
      onMouseLeave={() => setHoveredId(null)}
      className="relative py-28 md:py-36 bg-[#030305] text-white border-t border-b border-white/5 overflow-hidden"
    >
      {/* Background Ambient Glow Gradients */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#ff4500]/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" />

      {/* Cybernetic Grid Background Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ========================================== */}
      {/* SECTION HEADER: KINETIC TYPOGRAPHY STANDARD */}
      {/* ========================================== */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-14 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-8 border-b border-white/10">
          <div>
            {/* Cybernetic HUD Tag */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-cyan-400 mb-5 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>SEC_06 // PARALLAX_MATRIX</span>
              <span className="text-white/20">|</span>
              <span className="text-orange-400">ENCRYPTED_LOGS</span>
            </div>

            {/* Kinetic Typography Headline */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black font-sans tracking-tight text-white flex items-center gap-4 flex-wrap">
              <span className="text-[#ff4500]">■</span>
              <span>THE ARCHIVE</span>
              <span className="text-white/20 font-light">//</span>
              <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                OPTICAL RECORDS
              </span>
            </h2>

            <p className="text-sm md:text-base text-white/60 font-sans mt-3 max-w-2xl">
              High-velocity multi-spectral capture of computational rigor, industry dialogue,
              and symposium milestones across the Optima continuum.
            </p>
          </div>

          {/* Real-Time Telemetry Readout */}
          <div className="flex flex-col items-start lg:items-end gap-2 text-xs font-mono text-white/50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-bold">STREAM_LIVE</span>
              <span className="text-white/20">|</span>
              <span>ASSETS_LOADED: 25 RAW</span>
            </div>
            <div className="text-[11px] text-white/40">
              PHYSICS: 4-COL VELOCITY PARALLAX // 60FPS
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* HOLOGRAPHIC CATEGORY FILTERS               */}
        {/* ========================================== */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {FILTERS.map((f) => (
            <MagneticFilterPill
              key={f.id}
              filter={f}
              isActive={activeFilter === f.id}
              onClick={setActiveFilter}
            />
          ))}
        </div>
      </div>

      {/* ========================================== */}
      {/* VELOCITY-SYNCED MASONRY GRID               */}
      {/* ========================================== */}
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Grid Columns with Asymmetric Parallax */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {/* COLUMN 1 (Fast scroll speed) */}
          <motion.div style={{ y: col1Y }} className="flex flex-col">
            <AnimatePresence mode="popLayout">
              {columnData[0].map((item) => (
                <MediaPlate
                  key={item.id}
                  item={item}
                  isTarget={hoveredId === item.id}
                  isDimmed={hoveredId !== null && hoveredId !== item.id}
                  onHoverStart={(id) => setHoveredId(id)}
                  onHoverEnd={() => setHoveredId(null)}
                  onClick={handleOpenModal}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* COLUMN 2 (Slow scroll speed) */}
          <motion.div style={{ y: col2Y }} className="flex flex-col">
            <AnimatePresence mode="popLayout">
              {columnData[1].map((item) => (
                <MediaPlate
                  key={item.id}
                  item={item}
                  isTarget={hoveredId === item.id}
                  isDimmed={hoveredId !== null && hoveredId !== item.id}
                  onHoverStart={(id) => setHoveredId(id)}
                  onHoverEnd={() => setHoveredId(null)}
                  onClick={handleOpenModal}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* COLUMN 3 (Fast scroll speed) */}
          <motion.div style={{ y: col3Y }} className="flex flex-col">
            <AnimatePresence mode="popLayout">
              {columnData[2].map((item) => (
                <MediaPlate
                  key={item.id}
                  item={item}
                  isTarget={hoveredId === item.id}
                  isDimmed={hoveredId !== null && hoveredId !== item.id}
                  onHoverStart={(id) => setHoveredId(id)}
                  onHoverEnd={() => setHoveredId(null)}
                  onClick={handleOpenModal}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* COLUMN 4 (Slow scroll speed) */}
          <motion.div style={{ y: col4Y }} className="flex flex-col">
            <AnimatePresence mode="popLayout">
              {columnData[3].map((item) => (
                <MediaPlate
                  key={item.id}
                  item={item}
                  isTarget={hoveredId === item.id}
                  isDimmed={hoveredId !== null && hoveredId !== item.id}
                  onHoverStart={(id) => setHoveredId(id)}
                  onHoverEnd={() => setHoveredId(null)}
                  onClick={handleOpenModal}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ========================================== */}
      {/* EXPANDED LIGHTBOX INSPECTION MODAL         */}
      {/* ========================================== */}
      <AnimatePresence>
        {activeModalItem && (
          <LightboxModal
            item={activeModalItem}
            onClose={() => setActiveModalItem(null)}
            onPrev={handlePrevItem}
            onNext={handleNextItem}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
