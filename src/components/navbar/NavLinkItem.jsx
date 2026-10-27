import React from "react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import { useTextScramble } from "../../hooks/useTextScramble";
import { playHoverChirp } from "../../utils/cyberAudio";

const NavLinkItem = ({ name, isActive, onClick }) => {
  const { text, trigger, reset, isScrambling } = useTextScramble(name, 300);

  const handleMouseEnter = () => {
    trigger();
    playHoverChirp();
  };

  const handleMouseLeave = () => {
    reset();
  };

  return (
    <Magnetic pullFactor={0.28} proximityRange={35}>
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative px-2.5 py-1.5 flex items-center justify-center font-mono text-[11px] font-medium tracking-wider transition-colors select-none group"
      >
        {/* Dynamic bracket markers appearing on hover */}
        <span
          className={`text-cyan-400 font-mono text-[10px] transition-all duration-200 ${
            isScrambling ? "opacity-100 -translate-x-0.5" : "opacity-0 -translate-x-1"
          }`}
        >
          [
        </span>

        {/* Scrambled & settled typography */}
        <span
          className={`px-1 transition-all duration-200 ${
            isActive
              ? "text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
              : isScrambling
              ? "text-cyan-300 font-semibold"
              : "text-zinc-400 group-hover:text-white"
          }`}
        >
          {text}
        </span>

        <span
          className={`text-cyan-400 font-mono text-[10px] transition-all duration-200 ${
            isScrambling ? "opacity-100 translate-x-0.5" : "opacity-0 translate-x-1"
          }`}
        >
          ]
        </span>

        {/* 
          Active Route Indicator: 
          Single glowing 3px by 3px intense cyan data particle that physically
          travels across the ribbon using layoutId="activeParticle"
        */}
        {isActive && (
          <motion.div
            layoutId="activeParticle"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none z-20"
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 28,
              mass: 0.4,
            }}
          >
            {/* Geometric SVG data bracket & 3x3 intense cyan point */}
            <div className="relative flex items-center justify-center">
              {/* Outer halo */}
              <span className="absolute w-3 h-3 rounded-full bg-cyan-400/40 blur-[2px] animate-pulse" />
              {/* Core 3x3px intense cyan dot */}
              <span className="w-[3px] h-[3px] rounded-full bg-[#00f0ff] shadow-[0_0_12px_3px_#00f0ff]" />
              {/* Micro telemetry hairline */}
              <span className="absolute -bottom-1 w-3 h-[1px] bg-cyan-400/50" />
            </div>
          </motion.div>
        )}
      </button>
    </Magnetic>
  );
};

export default NavLinkItem;
