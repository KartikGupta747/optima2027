import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/**
 * THE ORBITAL HUD RETICLE (GLOBAL SYSTEM CURSOR)
 * Dual-tracking kinetic cursor:
 * 1. Instant zero-lag cyan crosshair center tracking exact clientX / clientY
 * 2. Trailing glowing orange energy ring with 4 orbital data nodes (mass: 0.5, stiffness: 400, damping: 28)
 * 3. Interactive state morphing (scale 1.5x, 2x rotation speed, center dot morph)
 * 4. Special "VIEW_DATA [//]" morph for gallery media plates
 */
const GlobalCursor = () => {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorMode, setCursorMode] = useState("default"); // "default" | "hover" | "view-data"
  const [isPressed, setIsPressed] = useState(false);

  // 1. Instant Zero-Lag Coordinates for Core Crosshair
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // 2. Trailing Physics for Outer Orbital Ring: mass: 0.5, stiffness: 400, damping: 28
  const springRingX = useSpring(rawX, {
    mass: 0.5,
    stiffness: 400,
    damping: 28,
  });
  const springRingY = useSpring(rawY, {
    mass: 0.5,
    stiffness: 400,
    damping: 28,
  });

  useEffect(() => {
    // Only enable on desktop / fine-pointer devices
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mediaQuery.matches);

    const handleMediaChange = (e) => {
      setIsFinePointer(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    if (!mediaQuery.matches) return;

    // Movement listener (high-frequency pointer tracking)
    const handlePointerMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setIsVisible(true);
    };

    // Interactive element detection across entire DOM
    const handlePointerOver = (e) => {
      const target = e.target;
      if (!target) return;

      const viewDataEl = target.closest('[data-cursor="view-data"]');
      if (viewDataEl) {
        setCursorMode("view-data");
        return;
      }

      const interactiveEl = target.closest(
        'a, button, [role="button"], input, textarea, select, label, .cursor-pointer, [data-cursor-interactive], [data-cursor="pointer"]'
      );
      if (interactiveEl) {
        setCursorMode("hover");
      } else {
        setCursorMode("default");
      }
    };

    // Mouse Press Dynamics
    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    // Window Visibility Handlers
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mouseover", handlePointerOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMediaChange);
      } else {
        mediaQuery.addListener(handleMediaChange);
      }
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mouseover", handlePointerOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [rawX, rawY]);

  // Disable on mobile/touch screens
  if (!isFinePointer) return null;

  const isHovered = cursorMode === "hover";
  const isViewData = cursorMode === "view-data";

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* ======================================================== */}
      {/* 1. TRAILING OUTER ENERGY RING WITH ORBITAL DATA NODES    */}
      {/* ======================================================== */}
      <motion.div
        style={{
          x: springRingX,
          y: springRingY,
          opacity: isVisible ? 1 : 0,
        }}
        className="fixed top-0 left-0 transition-opacity duration-200 pointer-events-none"
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
          <AnimatePresence mode="wait">
            {isViewData ? (
              /* VIEW_DATA [//] Holographic Morph Pill */
              <motion.div
                key="view-data-pill"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{
                  scale: isPressed ? 0.9 : 1,
                  opacity: 1,
                }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="px-4 py-1.5 rounded-full border border-cyan-400 bg-black/90 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,240,255,0.8),inset_0_0_12px_rgba(0,240,255,0.3)] flex items-center gap-2 whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
                  VIEW_DATA [//]
                </span>
              </motion.div>
            ) : (
              /* The Orbital Energy Ring */
              <motion.div
                key="orbital-ring"
                animate={{
                  scale: isPressed ? 0.82 : isHovered ? 1.5 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
                className="relative flex items-center justify-center w-12 h-12"
              >
                {/* Outer Circular Track with Deep-Orange Glowing Shadow */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: isHovered ? 3.5 : 8, // Rotation speed doubles on hover!
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className={`absolute inset-0 rounded-full border transition-colors duration-300 ${
                    isHovered
                      ? "border-cyan-400/90 shadow-[0_0_24px_rgba(0,240,255,0.7),inset_0_0_10px_rgba(0,240,255,0.3)]"
                      : "border-orange-500/80 shadow-[0_0_18px_rgba(255,69,0,0.65),inset_0_0_8px_rgba(255,69,0,0.2)]"
                  }`}
                >
                  {/* 4 Orbiting Data Nodes: 2 Cyan Nodes + 2 Orange Nodes */}
                  <span className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
                  <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
                  <span className="absolute -left-[3px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#ff4500] shadow-[0_0_8px_#ff4500]" />
                  <span className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#ff4500] shadow-[0_0_8px_#ff4500]" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ======================================================== */}
      {/* 2. INSTANT ZERO-LAG CENTRAL CYAN CORE CROSSHAIR / DOT   */}
      {/* ======================================================== */}
      <motion.div
        style={{
          x: rawX,
          y: rawY,
          opacity: isVisible && !isViewData ? 1 : 0,
        }}
        className="fixed top-0 left-0 pointer-events-none transition-opacity duration-150"
      >
        <div className="-translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <motion.div
            animate={{
              scale: isPressed ? 0.75 : 1,
            }}
            transition={{ duration: 0.1 }}
            className="relative flex items-center justify-center w-5 h-5"
          >
            {/* Default Mode: Crisp, bright cyan crosshair (+) tracking instantly with 0 delay */}
            <motion.span
              animate={{
                opacity: isHovered ? 0 : 1,
                scale: isHovered ? 0.3 : 1,
              }}
              transition={{ duration: 0.18 }}
              className="absolute text-[13px] font-mono font-bold text-cyan-300 drop-shadow-[0_0_8px_#00f0ff] select-none leading-none pointer-events-none"
            >
              +
            </motion.span>

            {/* Hover Mode: Morphs into a small, solid glowing cyan dot */}
            <motion.span
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.2,
              }}
              transition={{ duration: 0.18 }}
              className="absolute w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#00f0ff,0_0_4px_#ffffff] pointer-events-none"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default GlobalCursor;
