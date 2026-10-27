import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Magnetic Cursor Proximity Wrapper
 * Spring physics: stiffness: 150, damping: 15
 * Computes proximity pull within 40px envelope and generates subtle glass warp/highlight.
 */
const Magnetic = ({
  children,
  pullFactor = 0.32,
  proximityRange = 40,
  showWarpHighlight = true,
  className = "",
}) => {
  const ref = useRef(null);
  const [isNear, setIsNear] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Exact spring physics specified: stiffness: 150, damping: 15
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = clientX - centerX;
    const distY = clientY - centerY;
    const distance = Math.hypot(distX, distY);
    const envelope = Math.max(rect.width, rect.height) / 2 + proximityRange;

    if (distance <= envelope) {
      setIsNear(true);
      const intensity = Math.max(0, 1 - distance / (envelope * 1.2));
      x.set(distX * pullFactor * intensity);
      y.set(distY * pullFactor * intensity);
    } else {
      setIsNear(false);
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    setIsNear(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block ${className}`}
    >
      {/* Surrounding glass background warp & highlight on proximity */}
      {showWarpHighlight && (
        <motion.div
          animate={{
            opacity: isNear ? 1 : 0,
            scale: isNear ? 1.12 : 0.88,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 -m-1 rounded-full bg-gradient-to-r from-cyan-500/15 via-white/5 to-cyan-500/10 backdrop-blur-md pointer-events-none -z-10"
        />
      )}
      <motion.div
        ref={ref}
        style={{ x: smoothX, y: smoothY }}
        className="relative"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Magnetic;
