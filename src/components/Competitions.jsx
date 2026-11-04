import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { competitions } from "../constants";
import { ArrowUpRight, FileText, MessageSquare, Terminal } from "lucide-react";

const Competitions = () => {
  const shouldReduceMotion = useReducedMotion();

  // Animation A4: Scroll-triggered entry (translateY: 40px -> 0, 600ms ease-out, 100ms stagger)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const cardVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
          },
        },
      };

  return (
    <section
      id="events"
      className="relative w-full py-20 lg:py-28 bg-bg-base border-b border-border-subtle overflow-hidden"
    >
      {/* Background CAD Grid texture */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Deliverable 10: Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <div className="section-header mb-3">
              <span className="section-header-square" />
              <h2 className="section-header-text text-xl sm:text-2xl lg:text-3xl">
                Flagship Competitions
              </h2>
            </div>
            <p className="text-text-secondary text-sm max-w-2xl font-sans leading-relaxed">
              Eight exciting competitions designed to test your analytical, operational, and problem-solving skills on real-world industrial challenges.
            </p>
          </div>


        </div>

        {/* 4-Column Bento-Box Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {competitions.map((item, index) => {
            const hasSponsor = Boolean(item.subTitle);

            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                className="group relative bg-bg-surface border border-border-subtle p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:border-accent-brand hover:shadow-brand-glow"
              >
                {/* Top Row: Index Tag & Desaturated Vector Illustration */}
                <div className="flex items-start justify-between relative mb-6">
                  <div className="flex flex-col gap-1.5 z-10">
                    <span className="font-mono text-[11px] font-semibold text-accent-brand tracking-wider">
                      CHALLENGE.0{index + 1}
                    </span>
                    {hasSponsor && (
                      <span className="text-[10px] font-mono uppercase tracking-wider text-accent-muted bg-accent-muted/10 border border-accent-muted/30 px-2 py-0.5 max-w-[170px] truncate">
                        {item.subTitle}
                      </span>
                    )}
                  </div>

                  {/* Vector Illustration: Top Right, Scaled Down, Desaturated */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 overflow-hidden">
                    <img
                      src={item.photoUrl}
                      alt={item.title}
                      className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110 drop-shadow-[0_4px_16px_rgba(255,107,0,0.25)]"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Middle: Title & Description */}
                <div className="relative z-10 mb-8">
                  <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-text-primary group-hover:text-accent-brand transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-text-secondary line-clamp-3 leading-relaxed">
                    {item.text}
                  </p>
                </div>

                {/* Bottom Row: Permanent Problem Statement & Unstop Buttons */}
                <div className="relative z-10 pt-4 border-t border-border-subtle/60 mt-auto flex flex-col gap-2.5">
                  <div className="flex items-center gap-2">
                    {item.driveLink ? (
                      <a
                        href={item.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 hover:border-orange-500/60 text-orange-300 font-mono text-xs font-semibold tracking-wide transition-all shadow-sm"
                        title="View Problem Statement"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#ff4500]" />
                        <span>Problem Statement</span>
                      </a>
                    ) : (
                      <span className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-zinc-500 font-mono text-xs">
                        <span>PS Coming Soon</span>
                      </span>
                    )}

                    {item.whatsAppLink && (
                      <a
                        href={item.whatsAppLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-[#25D366]/20 border border-white/10 hover:border-[#25D366]/50 text-[#25D366] transition-colors"
                        title="WhatsApp Discussion Group"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {item.unstopLink && (
                    <a
                      href={item.unstopLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full py-2 px-3 text-xs tracking-wider justify-center gap-1.5 shadow-md"
                    >
                      <span>Register on Unstop</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Subtle CAD Corner Accent */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-border-subtle group-hover:border-accent-brand transition-colors duration-200" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Competitions;
