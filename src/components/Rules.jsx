import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  CreditCard,
  Building,
  Gift,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import {
  payment,
  benefitsForParticipants,
  accomo,
} from "../constants/Rules";
import { playClickTick } from "../utils/cyberAudio";

const Rules = () => {
  document.title = "Rules & Guidelines | Optima 2027";
  const [activeTab, setActiveTab] = useState("accommodation");

  return (
    <main className="min-h-screen bg-bg-base text-text-primary pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background CAD grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />
      <div className="pointer-events-none absolute top-1/4 -left-40 w-96 h-96 bg-accent-brand/10 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/4 -right-40 w-96 h-96 bg-cyan-400/10 rounded-full blur-[140px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-white/10">
          <div className="section-header mb-3">
            <span className="section-header-square" />
            <h1 className="section-header-text text-2xl sm:text-3xl lg:text-4xl">
              Optima 2027 Rules &amp; Guidelines
            </h1>
          </div>
          <p className="text-text-secondary text-xs sm:text-sm max-w-2xl font-sans leading-relaxed">
            Essential protocols, accommodation guidelines, and participant regulations for attending Optima 2027 at the IIT Kharagpur campus.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 mb-8 bg-bg-surface border border-border-subtle w-fit">
          <button
            type="button"
            onClick={() => {
              playClickTick();
              setActiveTab("accommodation");
            }}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === "accommodation"
                ? "bg-accent-brand text-black font-bold shadow-brand-glow"
                : "text-text-secondary hover:text-white hover:bg-white/5"
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Accommodation Rules ({accomo.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClickTick();
              setActiveTab("payment");
            }}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === "payment"
                ? "bg-accent-brand text-black font-bold shadow-brand-glow"
                : "text-text-secondary hover:text-white hover:bg-white/5"
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Payment &amp; Fees</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClickTick();
              setActiveTab("benefits");
            }}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === "benefits"
                ? "bg-accent-brand text-black font-bold shadow-brand-glow"
                : "text-text-secondary hover:text-white hover:bg-white/5"
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Participant Benefits</span>
          </button>
        </div>

        {/* Tab 1: Accommodation Rules */}
        {activeTab === "accommodation" && (
          <div className="cad-card p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-border-subtle pb-4">
              <h2 className="font-display text-xl font-bold uppercase text-white tracking-wide">
                Campus Hostel &amp; Stay Protocol
              </h2>
              <span className="font-mono text-xs text-accent-brand">
                // IIT KHARAGPUR RESIDENCE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accomo.map((item, index) => (
                <div
                  key={`accomo-${index}`}
                  className="flex items-start gap-3.5 p-3.5 rounded-lg bg-white/[0.02] border border-white/5"
                >
                  <span className="font-mono text-xs text-cyan-400 font-bold bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded flex-shrink-0 mt-0.5">
                    {index < 9 ? `0${index + 1}` : index + 1}
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border-subtle flex items-center gap-3 text-xs font-mono text-amber-400/90 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>Strict compliance with Institute anti-narcotics and hostel curfew policies is mandatory for all delegates.</span>
            </div>
          </div>
        )}

        {/* Tab 2: Payment Guidelines */}
        {activeTab === "payment" && (
          <div className="cad-card p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-border-subtle pb-4">
              <h2 className="font-display text-xl font-bold uppercase text-white tracking-wide">
                Participation Fee &amp; Transaction Details
              </h2>
              <span className="font-mono text-xs text-accent-brand">
                // REGISTRATION TELEMETRY
              </span>
            </div>

            <div className="space-y-4">
              {payment.map((item, index) => (
                <div
                  key={`pay-${index}`}
                  className="flex items-start gap-3.5 p-4 rounded-lg bg-white/[0.02] border border-white/5"
                >
                  <CheckCircle2 className="w-4 h-4 text-accent-brand flex-shrink-0 mt-0.5" />
                  <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-text-secondary">
                Confirmation status updates within 48 hours in profile.
              </span>
              <Link
                to="/register"
                className="btn-primary py-2 px-5 text-xs tracking-wider"
              >
                <span>Proceed to Register</span>
              </Link>
            </div>
          </div>
        )}

        {/* Tab 3: Benefits */}
        {activeTab === "benefits" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefitsForParticipants.map((benefit, index) => (
              <div
                key={benefit.id || index}
                className="cad-card p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-accent-brand/10 border border-accent-brand/20 p-2.5 mb-4 flex items-center justify-center">
                    <img
                      src={benefit.img}
                      alt={benefit.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight mb-2">
                    {benefit.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-border-subtle flex items-center justify-between font-mono text-[10px] text-accent-brand">
                  <span>OPTIMA 2027</span>
                  <span>INCLUDED DELEGATE BENEFIT</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Rules;
