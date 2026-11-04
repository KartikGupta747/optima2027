import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ArrowUpRight, Cpu, Layers } from "lucide-react";
import { workshops } from "../constants/Workshops";
import { playClickTick, playHoverChirp } from "../utils/cyberAudio";

const WorkshopDescription = ({ text }) => {
  const [showFull, setShowFull] = useState(false);
  const [isLongText, setIsLongText] = useState(false);
  const characterLimit = 240;

  useEffect(() => {
    setIsLongText(text && text.length > characterLimit);
  }, [text]);

  const toggleShowFull = () => {
    playClickTick();
    setShowFull(!showFull);
  };

  if (!text) return null;

  const displayText = showFull || !isLongText ? text : `${text.substring(0, characterLimit)}...`;

  return (
    <div className="mt-3">
      <p className="text-xs sm:text-sm text-text-secondary font-sans leading-relaxed">
        {displayText}
      </p>
      {isLongText && (
        <button
          type="button"
          onClick={toggleShowFull}
          className="mt-2 text-xs font-mono text-accent-brand hover:underline font-semibold"
        >
          {showFull ? "[Show Less]" : "[Read More]"}
        </button>
      )}
    </div>
  );
};

const Workshops = () => {
  document.title = "Workshops | Optima 2027";

  return (
    <main className="min-h-screen bg-bg-base text-text-primary pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background CAD grid & atmosphere */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />
      <div className="pointer-events-none absolute top-1/4 -left-40 w-96 h-96 bg-accent-brand/10 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/4 -right-40 w-96 h-96 bg-cyan-400/10 rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-10 pb-6 border-b border-white/10">
          <div className="section-header mb-3">
            <span className="section-header-square" />
            <h1 className="section-header-text text-2xl sm:text-3xl lg:text-4xl">
              Optima 2027 Workshops
            </h1>
          </div>
          <p className="text-text-secondary text-xs sm:text-sm max-w-2xl font-sans leading-relaxed">
            Hands-on technical workshops and industrial masterclasses conducted by leading practitioners in data systems, operations, and enterprise architecture.
          </p>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {workshops.map((workshop, idx) => (
            <div
              key={workshop.id || workshop.title || idx}
              onMouseEnter={playHoverChirp}
              className="cad-card p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-accent-brand hover:shadow-brand-glow"
            >
              <div>
                {/* Lottie Animation Header */}
                {workshop.animationlink && (
                  <div className="mb-6 rounded-xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center p-4">
                    <DotLottieReact
                      className="w-full max-w-[340px] mx-auto rounded-lg"
                      src={workshop.animationlink}
                      loop
                      autoplay
                    />
                  </div>
                )}

                {/* Index & Badge */}
                <div className="flex items-center justify-between gap-2 mb-3 font-mono text-xs">
                  <span className="text-accent-brand font-semibold">
                    // WORKSHOP.0{idx + 1}
                  </span>
                  {workshop.company && (
                    <span className="px-2.5 py-0.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 text-[10px] font-semibold">
                      IN PARTNERSHIP WITH {workshop.company.toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-text-primary">
                  {workshop.title}
                </h2>

                {/* Company Link */}
                {workshop.companyLink && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-text-secondary font-sans">Conducted by</span>
                    <Link
                      to={workshop.companyLink}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs font-mono text-accent-brand hover:underline font-semibold"
                    >
                      <span>{workshop.company}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}

                {/* Description */}
                {workshop.text && <WorkshopDescription text={workshop.text} />}
              </div>

              {/* Footer status / callout */}
              <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between text-[11px] font-mono text-text-secondary">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <Cpu className="w-3.5 h-3.5 text-accent-brand" />
                  <span>IIT KHARAGPUR</span>
                </span>
                <span className="text-accent-brand font-semibold">
                  MARCH 12–14, 2027
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Workshops;
