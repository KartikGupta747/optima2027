import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import { useAuth } from "../../context/AuthContext";
import { playHoverChirp, playClickTick } from "../../utils/cyberAudio";

const RegisterButton = () => {
  const btnRef = useRef(null);
  const { isAuthenticated } = useAuth();

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    btnRef.current.style.setProperty("--cursor-x", `${x}%`);
    btnRef.current.style.setProperty("--cursor-y", `${y}%`);
  };

  const targetPath = isAuthenticated ? "/profile" : "/register";
  const buttonLabel = isAuthenticated ? "PROFILE" : "REGISTER";

  return (
    <Magnetic pullFactor={0.28} proximityRange={35}>
      <motion.div
        ref={btnRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={playHoverChirp}
        onClick={playClickTick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
        className="group relative inline-flex items-center justify-center rounded-full overflow-hidden text-xs font-mono tracking-wider select-none"
      >
        <Link
          to={targetPath}
          className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-full overflow-hidden text-xs font-mono tracking-wider"
        >
          {/* SVG Perimeter Moving Light Beam (Cyan to Optima Orange) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none rounded-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="regBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f0ff" />
                <stop offset="50%" stopColor="#ff4500" />
                <stop offset="100%" stopColor="#00f0ff" />
              </linearGradient>
            </defs>

            {/* Base structural track */}
            <rect
              x="1.5"
              y="1.5"
              width="97"
              height="97"
              rx="48.5"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />

            {/* Infinitely traveling perimeter beam */}
            <motion.rect
              x="1.5"
              y="1.5"
              width="97"
              height="97"
              rx="48.5"
              fill="none"
              stroke="url(#regBeamGrad)"
              strokeWidth="2"
              pathLength={100}
              strokeDasharray="28 72"
              animate={{ strokeDashoffset: [0, -100] }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: "linear",
              }}
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Deep Obsidian Core Surface */}
          <div className="absolute inset-[1px] rounded-full bg-[#050505] transition-colors duration-300 group-hover:bg-[#08080c] -z-10" />

          {/* Liquid Metal / Shimmer on Hover */}
          <div className="absolute inset-[1px] rounded-full liquid-metal-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />

          {/* Internal Content: Pulse Dot + Text */}
          <div className="relative z-10 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 group-hover:bg-[#ff4500] transition-colors" />
            </span>

            <span className="font-bold tracking-widest text-[11px] text-white">
              {buttonLabel}
            </span>
          </div>
        </Link>
      </motion.div>
    </Magnetic>
  );
};

export default RegisterButton;
