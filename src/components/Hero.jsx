import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Terminal, Cpu, ChevronDown } from "lucide-react";

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  // Animation A1: Hero Heading Clip-path Reveal (1200ms, cubic-bezier(0.16, 1, 0.3, 1))
  const headingVariants = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        initial: { clipPath: "inset(100% 0 0 0)", y: 20 },
        animate: {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          transition: {
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      };

  // Animation A2: Hero Metadata Reveal (800ms, ease-out, triggers as A1 completes)
  const metadataVariants = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        initial: { opacity: 0, filter: "blur(4px)" },
        animate: {
          opacity: 1,
          filter: "blur(0px)",
          transition: {
            duration: 0.8,
            delay: 1.1,
            ease: "easeOut",
          },
        },
      };

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-bg-base flex flex-col justify-between border-b border-border-subtle"
    >
      {/* Background Layer: High-Contrast Desaturated Gate Image with Heavy Radial Mask */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.img
          src="/homepagePhotos/c.webp"
          alt="IIT Kharagpur Historic Gate"
          className="w-full h-full object-cover object-center grayscale contrast-[140%] brightness-[0.22]"
          initial={shouldReduceMotion ? {} : { scale: 1 }}
          animate={shouldReduceMotion ? {} : { scale: 1.05, x: -6 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Heavy Radial Gradient Mask fading to pure onyx black (--color-bg-base) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 15%, rgba(3, 3, 5, 0.75) 60%, #030305 92%)",
          }}
        />

        {/* CAD Technical Grid Overlay */}
        <div className="absolute inset-0 bg-cad-grid opacity-25" />

        {/* Bottom edge blending */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-base to-transparent" />
      </div>

      {/* Center 12-Column Grid: Dominant "OPTIMA 2027" */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto py-12 lg:py-16">
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4 items-center">
          
          <div className="col-span-4 md:col-span-6 lg:col-span-10 lg:col-start-2 text-center flex flex-col items-center">
            
            {/* Technical Eyebrow / Department Banner */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1 mb-6 border border-border-subtle bg-bg-surface/80 backdrop-blur-sm"
            >
              <Cpu className="w-3.5 h-3.5 text-accent-brand" />
              <span className="font-display text-[11px] sm:text-xs uppercase tracking-[0.15em] font-semibold text-zinc-300">
                Department of Industrial & Systems Engineering
              </span>
            </motion.div>

            {/* A1: Dominant "OPTIMA 2027" Heading */}
            <motion.div
              variants={headingVariants}
              initial="initial"
              animate="animate"
              className="w-full overflow-hidden"
            >
              <h1
                className="font-display font-extrabold uppercase text-text-primary leading-[0.88] select-none tracking-[-0.02em]"
                style={{
                  fontSize: "clamp(3.75rem, 10vw, 9rem)",
                }}
              >
                OPTIMA{" "}
                <span className="text-accent-brand inline-block hover:scale-[1.02] transition-transform duration-200">
                  2027
                </span>
              </h1>
            </motion.div>

            {/* Subtle Sub-Header Line */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-5 max-w-2xl text-base sm:text-lg text-zinc-200 font-sans leading-relaxed font-normal"
            >
              IIT Kharagpur's Renowned Techno-Optimization Fest. Convergence of computational systems, mathematical modeling, and operational excellence.
            </motion.p>
          </div>

        </div>
      </div>

      {/* Bottom HUD: 12-Column Grid Housing Metadata Readout & Action Controls */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <motion.div
          variants={metadataVariants}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-end pt-6 border-t border-border-subtle"
        >
          {/* Bottom-Left Metadata Terminal Readout (Spanning ~7 Columns) */}
          <div className="md:col-span-7 flex flex-col space-y-2">
            <div className="terminal-meta space-y-1">
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-accent-brand font-medium">
                <Terminal className="w-3.5 h-3.5" />
                <span>TERMINAL READOUT // FEST_DATES</span>
              </div>
              <div className="font-display text-lg sm:text-xl font-bold uppercase tracking-[0.05em] text-white">
                7TH &ndash; 9TH MARCH 2027
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-snug max-w-lg">
                IIT Kharagpur&apos;s renowned Techno-Optimization Fest, proudly organized by the Department of Industrial & Systems Engineering.
              </p>
            </div>
          </div>

          {/* Bottom-Right Interaction & Action Block (Spanning ~5 Columns) */}
          <div className="md:col-span-5 flex flex-col sm:flex-row md:justify-end items-start sm:items-center gap-3">
            <a
              href="https://unstop.com/college-fests/optima-2027-indian-institute-of-technology-iit-kharagpur-260905"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto text-xs py-3 px-6 gap-2"
            >
              <span>Register on Unstop</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                const elem = document.getElementById("about");
                if (elem) {
                  elem.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="btn-secondary w-full sm:w-auto text-xs py-3 px-5 gap-2 text-white"
            >
              <span>Explore Fest</span>
              <ChevronDown className="w-4 h-4 text-accent-brand" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative CAD Corner Markers */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-border-subtle pointer-events-none" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-border-subtle pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-border-subtle pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-border-subtle pointer-events-none" />
    </section>
  );
};

export default Hero;
