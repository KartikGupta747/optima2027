import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Terminal } from "lucide-react";
import { playClickTick } from "../utils/cyberAudio";

const NotFound = () => {
  document.title = "404 - Page Not Found | Optima 2027";

  return (
    <main className="min-h-screen bg-bg-base text-text-primary pt-24 sm:pt-28 pb-16 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Background CAD grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />
      <div className="pointer-events-none absolute top-1/3 -left-32 w-80 h-80 bg-accent-brand/10 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/3 -right-32 w-80 h-80 bg-cyan-400/10 rounded-full blur-[140px]" />

      <div className="max-w-md w-full mx-auto relative z-10 text-center">
        <div className="cad-card p-8 sm:p-10 shadow-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-brand/40 bg-accent-brand/10 font-mono text-xs text-accent-brand uppercase tracking-widest">
            <Terminal size={14} />
            <span>ERROR // 404_NOT_FOUND</span>
          </div>

          <h1 className="font-display text-6xl sm:text-7xl font-black text-white tracking-tight">
            404
          </h1>

          <div className="space-y-2">
            <h2 className="font-display text-xl font-bold uppercase text-white">
              Coordinates Unresolved
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary font-sans leading-relaxed">
              The requested node or page route does not exist within the Optima 2027 directory.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/"
              onClick={playClickTick}
              className="btn-primary w-full py-3 text-xs tracking-wider justify-center gap-2"
            >
              <ArrowLeft size={16} />
              <span>Return to Command Core</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
