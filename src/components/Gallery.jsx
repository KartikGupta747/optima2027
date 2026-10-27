import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
} from "lucide-react";
import { playClickTick, playHoverChirp } from "../utils/cyberAudio";

// ==========================================
// 1. DATASET: 25 GENUINE ASSETS (CLEAN & SIMPLE)
// ==========================================
const GALLERY_ITEMS = [
  // GLIMPSES OF OPTIMA
  {
    id: "glimpse-01",
    category: "GLIMPSES",
    categoryLabel: "Glimpses",
    title: "Inaugural Procession",
    subtitle: "Department of Industrial & Systems Engineering",
    location: "ISE Department, IIT Kharagpur",
    src: "/GalleryPhotos/day0-images/IMG_2518.webp",
    aspect: "aspect-[4/3]",
    tags: ["Inaugural", "Symposium", "IIT Kharagpur"],
  },
  {
    id: "glimpse-02",
    category: "GLIMPSES",
    categoryLabel: "Glimpses",
    title: "Symposium Initiation",
    subtitle: "Ceremonial Assembly & Keynote Address",
    location: "Main Auditorium",
    src: "/GalleryPhotos/day0-images/4.webp",
    aspect: "aspect-[16/10]",
    tags: ["Plenary", "Delegates", "Keynote"],
  },
  {
    id: "glimpse-03",
    category: "GLIMPSES",
    categoryLabel: "Glimpses",
    title: "Computational Arena",
    subtitle: "Student Delegates & Researchers",
    location: "Annex Computing Lab",
    src: "/GalleryPhotos/day0-images/6.webp",
    aspect: "aspect-[4/5]",
    tags: ["Student Body", "Systems", "Compute"],
  },
  {
    id: "glimpse-04",
    category: "GLIMPSES",
    categoryLabel: "Glimpses",
    title: "Research Delegation",
    subtitle: "Academic Peer Review Panels",
    location: "Conference Hall A",
    src: "/GalleryPhotos/day0-images/8.webp",
    aspect: "aspect-[16/10]",
    tags: ["Faculty", "Scholars", "Panel"],
  },
  {
    id: "glimpse-05",
    category: "GLIMPSES",
    categoryLabel: "Glimpses",
    title: "Fest Architects",
    subtitle: "Fest Coordination & Command Operations",
    location: "ISE Command Desk",
    src: "/GalleryPhotos/day0-images/10.webp",
    aspect: "aspect-[4/3]",
    tags: ["Core Team", "Operations", "Organizers"],
  },
  {
    id: "glimpse-06",
    category: "GLIMPSES",
    categoryLabel: "Glimpses",
    title: "Optimization Plenary",
    subtitle: "Valedictory & Key Highlights",
    location: "Central Auditorium",
    src: "/GalleryPhotos/day0-images/12.webp",
    aspect: "aspect-[16/10]",
    tags: ["Valedictory", "Honors", "IIT KGP"],
  },
  {
    id: "glimpse-07",
    category: "GLIMPSES",
    categoryLabel: "Glimpses",
    title: "Collaboration Forum",
    subtitle: "Cross-Institutional Networking Hub",
    location: "Seminar Complex",
    src: "/GalleryPhotos/day0-images/14.webp",
    aspect: "aspect-[4/5]",
    tags: ["Networking", "Alumni", "Synergy"],
  },
  {
    id: "glimpse-08",
    category: "GLIMPSES",
    categoryLabel: "Glimpses",
    title: "Historic Tower",
    subtitle: "IIT Kharagpur Heritage Campus",
    location: "Main Building, IIT Kharagpur",
    src: "/homepagePhotos/a.webp",
    aspect: "aspect-[16/10]",
    tags: ["Heritage", "IIT Kharagpur", "Landmark"],
  },
  {
    id: "glimpse-09",
    category: "GLIMPSES",
    categoryLabel: "Glimpses",
    title: "Data & Systems Hub",
    subtitle: "Algorithmic Performance Cluster",
    location: "ISE Server Lab",
    src: "/homepagePhotos/b.webp",
    aspect: "aspect-[4/3]",
    tags: ["Computing", "HPC", "Analytics"],
  },

  // GUEST LECTURES
  {
    id: "lecture-01",
    category: "GUEST_LECTURES",
    categoryLabel: "Guest Lectures",
    title: "Global Supply Chains",
    subtitle: "Keynote Address by Industry Leaders",
    location: "Kalidas Auditorium",
    src: "/GalleryPhotos/guest-lecture-images/g1.webp",
    aspect: "aspect-[16/10]",
    tags: ["Supply Chain", "Industry 4.0", "Leadership"],
  },
  {
    id: "lecture-02",
    category: "GUEST_LECTURES",
    categoryLabel: "Guest Lectures",
    title: "Executive Perspectives",
    subtitle: "Enterprise Systems Optimization Dialogue",
    location: "Kalidas Auditorium",
    src: "/GalleryPhotos/guest-lecture-images/g2.webp",
    aspect: "aspect-[4/5]",
    tags: ["Strategy", "Operations", "Discourse"],
  },
  {
    id: "lecture-03",
    category: "GUEST_LECTURES",
    categoryLabel: "Guest Lectures",
    title: "Strategic Operations",
    subtitle: "Interactive Q&A Session with Delegates",
    location: "Executive Suite",
    src: "/GalleryPhotos/guest-lecture-images/g3.webp",
    aspect: "aspect-[4/3]",
    tags: ["Roundtable", "Research", "Insights"],
  },

  // WORKSHOPS
  {
    id: "workshop-01",
    category: "WORKSHOPS",
    categoryLabel: "Workshops",
    title: "Advanced Simulation Lab",
    subtitle: "Stochastic Modeling & Discrete Events",
    location: "Simulation Suite 1",
    src: "/GalleryPhotos/workshops/w1.webp",
    aspect: "aspect-[4/3]",
    tags: ["Simulation", "Stochastic", "FlexSim"],
  },
  {
    id: "workshop-02",
    category: "WORKSHOPS",
    categoryLabel: "Workshops",
    title: "Machine Learning in OR",
    subtitle: "Optimization via Neural Heuristics",
    location: "HPC Terminal Room",
    src: "/GalleryPhotos/workshops/w2.webp",
    aspect: "aspect-[16/10]",
    tags: ["Deep Learning", "OR Methods", "Python"],
  },
  {
    id: "workshop-03",
    category: "WORKSHOPS",
    categoryLabel: "Workshops",
    title: "Quantitative Portfolio Lab",
    subtitle: "Algorithmic Risk & Capital Allocation",
    location: "Financial Computing Lab",
    src: "/GalleryPhotos/workshops/w3.webp",
    aspect: "aspect-[4/5]",
    tags: ["Quant Finance", "Risk Engineering", "Data"],
  },
  {
    id: "workshop-04",
    category: "WORKSHOPS",
    categoryLabel: "Workshops",
    title: "Supply Chain War Room",
    subtitle: "Live Scenario Bottleneck Elimination",
    location: "Collab Suite 04",
    src: "/GalleryPhotos/workshops/w4.webp",
    aspect: "aspect-[4/3]",
    tags: ["Logistics", "Strategy", "Optimization"],
  },
  {
    id: "workshop-05",
    category: "WORKSHOPS",
    categoryLabel: "Workshops",
    title: "Decision Systems Capstone",
    subtitle: "Dynamic Solution Prototyping",
    location: "Innovation Hub",
    src: "/GalleryPhotos/workshops/w5.webp",
    aspect: "aspect-[16/10]",
    tags: ["Systems Engineering", "Capstone", "Showcase"],
  },

  // COMPETITIONS
  {
    id: "comp-01",
    category: "COMPETITIONS",
    categoryLabel: "Competitions",
    title: "Stratathon Finals",
    subtitle: "Fast-Paced Optimization Hackathon",
    location: "Arena Pod Alpha",
    src: "/GalleryPhotos/competitions/c1.webp",
    aspect: "aspect-[16/10]",
    tags: ["Hackathon", "Sprint", "Stratathon"],
  },
  {
    id: "comp-02",
    category: "COMPETITIONS",
    categoryLabel: "Competitions",
    title: "Innovate-X Pitch Battle",
    subtitle: "Industrial Problem Statement Defense",
    location: "Jury Board Room",
    src: "/GalleryPhotos/competitions/c2.webp",
    aspect: "aspect-[4/3]",
    tags: ["Innovate-X", "Pitch", "Ventures"],
  },
  {
    id: "comp-03",
    category: "COMPETITIONS",
    categoryLabel: "Competitions",
    title: "Codeland Live Arena",
    subtitle: "Algorithmic Speed Combat",
    location: "Terminal Grid 2",
    src: "/GalleryPhotos/competitions/c3.webp",
    aspect: "aspect-[4/5]",
    tags: ["Codeland", "Competitive Code", "Algorithms"],
  },
  {
    id: "comp-04",
    category: "COMPETITIONS",
    categoryLabel: "Competitions",
    title: "OptiSim Industrial Drill",
    subtitle: "Discrete-Event Warehouse Simulation",
    location: "Simulation Arena",
    src: "/GalleryPhotos/competitions/c4.webp",
    aspect: "aspect-[16/10]",
    tags: ["OptiSim", "Logistics", "Warehouse"],
  },
  {
    id: "comp-05",
    category: "COMPETITIONS",
    categoryLabel: "Competitions",
    title: "Finance Fantasia Combat",
    subtitle: "Live Market Arbitrage Modeling",
    location: "Quant Trading Desk",
    src: "/GalleryPhotos/competitions/c5.webp",
    aspect: "aspect-[4/3]",
    tags: ["Finance Fantasia", "Arbitrage", "Derivatives"],
  },
  {
    id: "comp-06",
    category: "COMPETITIONS",
    categoryLabel: "Competitions",
    title: "Networksify Challenge",
    subtitle: "Global Network Routing Challenge",
    location: "Logistics Lab",
    src: "/GalleryPhotos/competitions/c6.webp",
    aspect: "aspect-[16/10]",
    tags: ["Networksify", "Graph Theory", "Routing"],
  },
  {
    id: "comp-07",
    category: "COMPETITIONS",
    categoryLabel: "Competitions",
    title: "Prize Podium Ceremony",
    subtitle: "Victory & Citations Conferred",
    location: "Central Amphitheater",
    src: "/GalleryPhotos/competitions/c7.webp",
    aspect: "aspect-[4/5]",
    tags: ["Podium", "Awards", "Champions"],
  },
  {
    id: "comp-08",
    category: "COMPETITIONS",
    categoryLabel: "Competitions",
    title: "Champions Gathering",
    subtitle: "Celebrating Engineering Excellence",
    location: "Ceremony Stage",
    src: "/GalleryPhotos/competitions/c8.webp",
    aspect: "aspect-[16/10]",
    tags: ["Excellence", "Optima", "Triumph"],
  },
];

// Vibrant Category Themes
const THEMES = {
  ALL: {
    name: "All Archives",
    activeClass:
      "border-orange-500 bg-gradient-to-r from-orange-500/25 via-pink-500/20 to-cyan-500/20 text-white shadow-[0_0_25px_rgba(255,107,0,0.45)]",
    dotClass: "bg-gradient-to-r from-orange-400 to-cyan-400",
    badgeClass: "bg-gradient-to-r from-orange-500/20 to-cyan-500/20 text-orange-200 border-orange-500/30",
    tagClass: "bg-orange-500/10 text-orange-300 border-orange-500/25",
    hoverBorder: "hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(255,107,0,0.25)]",
    cardGlow: "group-hover:border-orange-500/60 group-hover:shadow-[0_20px_45px_rgba(255,107,0,0.3)]",
    pinColor: "text-orange-400",
    btnGrad: "from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700",
  },
  GLIMPSES: {
    name: "Glimpses",
    activeClass:
      "border-[#ff6b00] bg-[#ff6b00]/20 text-white shadow-[0_0_25px_rgba(255,107,0,0.45)]",
    dotClass: "bg-[#ff6b00]",
    badgeClass: "bg-[#ff6b00]/20 text-orange-300 border-[#ff6b00]/40",
    tagClass: "bg-[#ff6b00]/10 text-orange-300 border-[#ff6b00]/25",
    hoverBorder: "hover:border-[#ff6b00]/60 hover:shadow-[0_0_20px_rgba(255,107,0,0.25)]",
    cardGlow: "group-hover:border-[#ff6b00]/60 group-hover:shadow-[0_20px_45px_rgba(255,107,0,0.3)]",
    pinColor: "text-orange-400",
    btnGrad: "from-[#ff6b00] to-amber-500 hover:from-orange-600 hover:to-amber-600",
  },
  GUEST_LECTURES: {
    name: "Guest Lectures",
    activeClass:
      "border-emerald-500 bg-emerald-500/20 text-white shadow-[0_0_25px_rgba(16,185,129,0.45)]",
    dotClass: "bg-emerald-400",
    badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    tagClass: "bg-emerald-500/10 text-emerald-300 border-emerald-500/25",
    hoverBorder: "hover:border-emerald-400/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]",
    cardGlow: "group-hover:border-emerald-500/60 group-hover:shadow-[0_20px_45px_rgba(16,185,129,0.3)]",
    pinColor: "text-emerald-400",
    btnGrad: "from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600",
  },
  WORKSHOPS: {
    name: "Workshops",
    activeClass:
      "border-cyan-500 bg-cyan-500/20 text-white shadow-[0_0_25px_rgba(6,182,212,0.45)]",
    dotClass: "bg-cyan-400",
    badgeClass: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    tagClass: "bg-cyan-500/10 text-cyan-300 border-cyan-500/25",
    hoverBorder: "hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]",
    cardGlow: "group-hover:border-cyan-500/60 group-hover:shadow-[0_20px_45px_rgba(6,182,212,0.3)]",
    pinColor: "text-cyan-400",
    btnGrad: "from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600",
  },
  COMPETITIONS: {
    name: "Competitions",
    activeClass:
      "border-purple-500 bg-purple-500/20 text-white shadow-[0_0_25px_rgba(168,85,247,0.45)]",
    dotClass: "bg-purple-400",
    badgeClass: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    tagClass: "bg-purple-500/10 text-purple-300 border-purple-500/25",
    hoverBorder: "hover:border-purple-400/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]",
    cardGlow: "group-hover:border-purple-500/60 group-hover:shadow-[0_20px_45px_rgba(168,85,247,0.3)]",
    pinColor: "text-purple-400",
    btnGrad: "from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600",
  },
};

// Category Filter Definitions
const FILTERS = [
  { id: "ALL", label: "All Photos", count: 25 },
  { id: "GLIMPSES", label: "Glimpses", count: 9 },
  { id: "GUEST_LECTURES", label: "Guest Lectures", count: 3 },
  { id: "WORKSHOPS", label: "Workshops", count: 5 },
  { id: "COMPETITIONS", label: "Competitions", count: 8 },
];

// ==========================================
// 2. MAGNETIC COLORFUL FILTER PILL
// ==========================================
const MagneticFilterPill = ({ filter, isActive, onClick }) => {
  const buttonRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 350, damping: 20 });
  const springY = useSpring(y, { stiffness: 350, damping: 20 });
  const theme = THEMES[filter.id] || THEMES.ALL;

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
      className={`relative px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 backdrop-blur-xl flex items-center gap-2 select-none group border ${
        isActive
          ? theme.activeClass
          : `border-white/10 bg-white/[0.04] text-white/70 hover:text-white ${theme.hoverBorder}`
      }`}
    >
      {/* Active Glowing Pulse Dot */}
      {isActive ? (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme.dotClass} opacity-75`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.dotClass}`}></span>
        </span>
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-white/30 group-hover:bg-white transition-colors" />
      )}

      <span>{filter.label}</span>

      {/* Item Count Chip */}
      <span
        className={`px-2 py-0.5 rounded-full text-[11px] font-mono transition-colors border ${
          isActive
            ? theme.badgeClass
            : "bg-white/5 border-white/10 text-white/50 group-hover:text-white/80"
        }`}
      >
        {filter.count}
      </span>
    </motion.button>
  );
};

// ==========================================
// 3. MEDIA PLATE (VIBRANT & NATURAL COLORS)
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
  const theme = THEMES[item.category] || THEMES.ALL;

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

    tiltX.set(-yRel * 12);
    tiltY.set(xRel * 12);
  };

  const handleMouseEnter = () => {
    playHoverChirp();
    onHoverStart(item.id);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    onHoverEnd();
  };

  return (
    <motion.div
      layout
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{
        opacity: isDimmed ? 0.35 : 1,
        scale: isTarget ? 1.04 : isDimmed ? 0.97 : 1,
        filter: isDimmed ? "blur(1.5px)" : "blur(0px)",
      }}
      exit={{ opacity: 0, scale: 0.88 }}
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
      className={`group relative mb-6 rounded-2xl overflow-hidden cursor-pointer select-none transition-all duration-300 border ${
        isTarget
          ? `z-30 ${theme.cardGlow} ring-1 ring-white/20`
          : "z-10 shadow-[0_10px_30px_rgba(0,0,0,0.6)] border-white/10 hover:border-white/30"
      }`}
    >
      {/* Aspect Ratio Container */}
      <div className={`relative w-full ${item.aspect} overflow-hidden bg-[#0d0d14]`}>
        {/* Main Photograph: Clean B&W default -> Colorful on hover */}
        <img
          src={item.src}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover grayscale contrast-115 brightness-95 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:contrast-105 group-hover:brightness-105 group-hover:scale-108"
        />

        {/* Soft Vignette Gradient for Clean Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-300" />

        {/* Top Floating Category Badge */}
        <div className="absolute top-3 left-3 z-20 pointer-events-none">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border text-[11px] font-semibold tracking-wide shadow-md ${theme.badgeClass}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${theme.dotClass}`} />
            {item.categoryLabel}
          </span>
        </div>

        {/* Bottom Metadata Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 flex flex-col justify-end">
          <h3 className="text-sm md:text-base font-bold text-white tracking-tight flex items-center justify-between">
            <span className="truncate group-hover:text-white transition-colors">
              {item.title}
            </span>
            <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 text-white/70 group-hover:text-white transition-all ml-2 flex-shrink-0">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </h3>

          <p className="text-[12px] text-white/70 line-clamp-1 mt-0.5">
            {item.subtitle}
          </p>

          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-white/60">
            <MapPin className={`w-3 h-3 ${theme.pinColor} flex-shrink-0`} />
            <span className="truncate">{item.location}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// 4. LIGHTBOX INSPECTION MODAL (CLEAN & ELEGANT)
// ==========================================
const LightboxModal = ({ item, onClose, onPrev, onNext }) => {
  const theme = THEMES[item.category] || THEMES.ALL;

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
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.35 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full bg-[#09090f] border border-white/15 rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.95)] flex flex-col"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-white/[0.03]">
          <div className="flex items-center gap-2.5">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-semibold ${theme.badgeClass}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${theme.dotClass}`} />
              {item.categoryLabel}
            </span>
            <span className="text-white/20">|</span>
            <span className="text-xs text-white/60 font-medium truncate max-w-[200px] sm:max-w-xs">
              {item.title}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>

        {/* Center Media Viewport */}
        <div className="relative w-full max-h-[68vh] min-h-[45vh] bg-black/60 flex items-center justify-center overflow-hidden p-2">
          <img
            src={item.src}
            alt={item.title}
            className="max-h-[66vh] w-auto max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300"
          />

          {/* Navigation Controls */}
          <button
            onClick={onPrev}
            aria-label="Previous image"
            className="absolute left-4 p-3 rounded-full bg-black/60 hover:bg-white/20 border border-white/15 text-white transition-all backdrop-blur-md hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNext}
            aria-label="Next image"
            className="absolute right-4 p-3 rounded-full bg-black/60 hover:bg-white/20 border border-white/15 text-white transition-all backdrop-blur-md hover:scale-105"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Details Panel */}
        <div className="p-6 border-t border-white/10 bg-white/[0.02]">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              {item.title}
            </h2>
            <p className="text-sm text-white/70 mt-1">{item.subtitle}</p>

            <div className="flex items-center gap-2 mt-2 text-xs text-white/60">
              <MapPin className={`w-3.5 h-3.5 ${theme.pinColor} flex-shrink-0`} />
              <span>{item.location}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${theme.tagClass}`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ==========================================
// 5. MAIN COMPONENT: GALLERY MATRIX
// ==========================================
const Gallery = ({ standalone = false }) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

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

  // Parallax Translations across 4 Columns
  const col1Y = useTransform(smoothProgress, [0, 1], ["40px", "-90px"]);
  const col2Y = useTransform(smoothProgress, [0, 1], ["-40px", "60px"]);
  const col3Y = useTransform(smoothProgress, [0, 1], ["60px", "-100px"]);
  const col4Y = useTransform(smoothProgress, [0, 1], ["-50px", "70px"]);

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
      className="relative py-24 md:py-32 bg-[#030305] text-white border-t border-b border-white/5 overflow-hidden"
    >
      {/* Background Ambient Glow Gradients */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-orange-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[160px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ========================================== */}
      {/* SECTION HEADER                             */}
      {/* ========================================== */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            {/* Category Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold text-white/80 mb-4 tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              <span>Festive Archives</span>
              <span className="text-white/20">•</span>
              <span className="text-orange-400">Moments of Optima</span>
            </div>

            {/* Colorful Typography Headline */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black font-sans tracking-tight text-white flex items-center gap-3 flex-wrap">
              <span>THE</span>
              <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                GALLERY
              </span>
            </h2>

            <p className="text-sm md:text-base text-white/70 font-sans mt-3 max-w-2xl leading-relaxed">
              Memories of computational rigor, industry dialogue, and engineering celebration
              across Optima editions at IIT Kharagpur.
            </p>
          </div>

          {/* Quick Counter Readout */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-white/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold">25 Photos</span>
            <span className="text-white/20">|</span>
            <span>4 Categories</span>
          </div>
        </div>

        {/* ========================================== */}
        {/* COLORFUL CATEGORY FILTERS                  */}
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
      {/* PARALLAX MASONRY GRID                      */}
      {/* ========================================== */}
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {/* COLUMN 1 */}
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

          {/* COLUMN 2 */}
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

          {/* COLUMN 3 */}
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

          {/* COLUMN 4 */}
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
      {/* LIGHTBOX MODAL                             */}
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