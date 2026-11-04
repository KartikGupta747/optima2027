import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";

export default function Redirect({ href, delay, place }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = href;
    }, delay || 1000);
    return () => clearTimeout(timer);
  }, [href, delay]);

  return (
    <main className="min-h-screen bg-bg-base text-text-primary pt-24 sm:pt-28 pb-16 px-4 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />
      <div className="pointer-events-none absolute top-1/3 -left-32 w-80 h-80 bg-accent-brand/10 rounded-full blur-[140px]" />

      <div className="max-w-md w-full mx-auto relative z-10 text-center">
        <div className="cad-card p-8 sm:p-10 shadow-2xl space-y-5">
          <div className="w-12 h-12 rounded-full bg-accent-brand/10 border border-accent-brand/30 flex items-center justify-center mx-auto text-accent-brand animate-pulse">
            <ExternalLink size={22} />
          </div>

          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
              Transferring Dispatch
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary font-sans leading-relaxed">
              Redirecting you to <span className="text-white font-semibold">{place}</span>...
            </p>
          </div>

          <div className="pt-3">
            <a
              href={href}
              className="btn-primary w-full py-2.5 text-xs tracking-wider justify-center gap-2"
            >
              <span>Click Here if not redirected</span>
              <ArrowRight size={14} />
            </a>
          </div>

          <div>
            <Link
              to="/"
              className="text-xs font-mono text-zinc-500 hover:text-white transition-colors"
            >
              Cancel &amp; Return to Optima Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
