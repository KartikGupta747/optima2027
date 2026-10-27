import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useTextScramble } from "../../hooks/useTextScramble";
import { playClickTick, playHoverChirp } from "../../utils/cyberAudio";
import RegisterButton from "./RegisterButton";
import logo from "../../assets/optima2027-logo.png";

const CommandGridItem = ({ item, index, isActive, onClick }) => {
  const { text, trigger } = useTextScramble(item.name, 280);

  return (
    <motion.li
      variants={{
        hidden: {
          opacity: 0,
          y: 35,
          z: -160,
          rotateX: 45,
          filter: "blur(12px)",
        },
        visible: {
          opacity: 1,
          y: 0,
          z: 0,
          rotateX: 0,
          filter: "blur(0px)",
          transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          },
        },
        exit: {
          opacity: 0,
          y: -25,
          z: 80,
          filter: "blur(6px)",
          transition: { duration: 0.25, ease: [0.76, 0, 0.24, 1] },
        },
      }}
      className="list-none"
    >
      <button
        type="button"
        onClick={() => {
          playClickTick();
          onClick(item);
        }}
        onMouseEnter={() => {
          trigger();
          playHoverChirp();
        }}
        className="w-full text-left py-2 px-3 flex items-center justify-between group rounded-md hover:bg-white/[0.04] transition-all select-none border-l-2 border-transparent hover:border-cyan-400"
      >
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[10px] text-zinc-600 group-hover:text-cyan-400 transition-colors">
            {index < 9 ? `0${index + 1}` : index + 1}
          </span>
          <span
            className={`font-mono text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
              isActive
                ? "text-cyan-400 drop-shadow-[0_0_12px_rgba(0,240,255,0.6)]"
                : "text-zinc-300 group-hover:text-white"
            }`}
          >
            {text}
          </span>
        </div>

        <ArrowUpRight
          size={16}
          className="text-zinc-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
        />
      </button>
    </motion.li>
  );
};

const CyberMenu = ({
  isOpen,
  onToggle,
  onClose,
  navItems,
  activeSection,
  onItemClick,
}) => {
  return (
    <>
      {/* 
        Mobile Geometric Hexagon Trigger
        Anchored bottom-center of viewport. Fixed z-[1001], visible on mobile/tablet (xl:hidden)
      */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1001] xl:hidden pointer-events-auto">
        <motion.button
          type="button"
          onClick={() => {
            playClickTick();
            onToggle();
          }}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
          aria-expanded={isOpen}
          className="relative w-14 h-14 flex items-center justify-center focus:outline-none group select-none"
        >
          {/* Ambient Glow */}
          <span
            className={`absolute inset-0 rounded-full blur-lg transition-opacity duration-300 ${
              isOpen
                ? "bg-red-500/40 opacity-100"
                : "bg-cyan-400/30 opacity-70 group-hover:opacity-100"
            }`}
          />

          {/* Hexagon SVG Frame */}
          <svg
            viewBox="0 0 64 64"
            className="w-full h-full drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
          >
            <polygon
              points="32,3 59,18 59,50 32,61 5,50 5,18"
              fill="#050505"
              stroke={isOpen ? "#ff0055" : "#00f0ff"}
              strokeWidth="2"
              className="transition-colors duration-300"
            />
          </svg>

          {/* Central Interactive Icon / Morph */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-5 h-5 flex flex-col items-center justify-center gap-1"
            >
              <motion.span
                animate={
                  isOpen
                    ? { rotate: 45, y: 5, backgroundColor: "#ff0055" }
                    : { rotate: 0, y: 0, backgroundColor: "#00f0ff" }
                }
                transition={{ duration: 0.3 }}
                className="w-4 h-[2px] rounded-full origin-center transition-colors"
              />
              <motion.span
                animate={
                  isOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1, backgroundColor: "#ffffff" }
                }
                transition={{ duration: 0.2 }}
                className="w-2.5 h-[2px] rounded-full origin-center"
              />
              <motion.span
                animate={
                  isOpen
                    ? { rotate: -45, y: -5, backgroundColor: "#ff0055" }
                    : { rotate: 0, y: 0, backgroundColor: "#00f0ff" }
                }
                transition={{ duration: 0.3 }}
                className="w-4 h-[2px] rounded-full origin-center transition-colors"
              />
            </motion.div>
          </div>
        </motion.button>
      </div>

      {/* 
        Full-Screen Minimalist Command Grid
        Circular clip-path expansion from the bottom-center hexagon trigger
      */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              clipPath: "circle(0px at 50% calc(100% - 52px))",
              opacity: 0,
            }}
            animate={{
              clipPath: "circle(160% at 50% calc(100% - 52px))",
              opacity: 1,
            }}
            exit={{
              clipPath: "circle(0px at 50% calc(100% - 52px))",
              opacity: 0,
            }}
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed inset-0 z-[1000] bg-[#030305]/98 backdrop-blur-3xl flex flex-col justify-between px-6 pt-10 pb-24 overflow-y-auto bg-cad-grid select-none"
          >
            {/* Minimalist Top Header: Prominent Brand Logo + Close */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
              <img
                src={logo}
                alt="Optima 2027"
                className="h-9 sm:h-10 w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => {
                  playClickTick();
                  onClose();
                }}
                className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* 3D Z-Axis Staggered Links */}
            <div
              className="relative z-10 my-auto py-6"
              style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
            >
              <motion.ul
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.045,
                      delayChildren: 0.1,
                    },
                  },
                  exit: {
                    opacity: 0,
                    transition: { staggerChildren: 0.03, staggerDirection: -1 },
                  },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col space-y-1.5"
              >
                {navItems.map((item, index) => (
                  <CommandGridItem
                    key={item.name}
                    item={item}
                    index={index}
                    isActive={activeSection === item.sectionId}
                    onClick={(it) => {
                      onItemClick(it);
                      onClose();
                    }}
                  />
                ))}
              </motion.ul>
            </div>

            {/* Bottom Actions & Metadata */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col items-center gap-4">
              <div className="w-full flex justify-center">
                <RegisterButton />
              </div>

              <div className="flex items-center justify-between w-full font-mono text-[10px] text-zinc-500 tracking-tight">
                <span>IIT KHARAGPUR</span>
                <span className="text-[#ff4500]">MARCH 7-9, 2027</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CyberMenu;
