import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Terminal } from "lucide-react";
import TextGenerateEffect from "./ui/TextGenerateEffect";

// ─────────────────────────────────────────────────────────────────────────────
// Cryptographic decryption text scrambler hook
// ─────────────────────────────────────────────────────────────────────────────
const ASCII_CHARS = "!@#$%^&*()_+{}|:<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789░▒▓█▄▀■□";

function useScrambleText(finalText, duration = 1500) {
  const [displayText, setDisplayText] = useState(() =>
    finalText
      .split("")
      .map((ch) => (ch === " " ? " " : ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)]))
      .join("")
  );
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!finalText) return;
    const chars = finalText.split("");
    const total = chars.length;
    let lockedCount = 0;
    let startTime = null;
    let rafId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newLockedCount = Math.floor(progress * total);

      if (newLockedCount !== lockedCount) {
        lockedCount = newLockedCount;
      }

      setDisplayText(
        chars
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < lockedCount) return ch;
            return ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
          })
          .join("")
      );

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setDisplayText(finalText);
        setDone(true);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [finalText, duration]);

  return { displayText, done };
}

// ─────────────────────────────────────────────────────────────────────────────
// Countdown using requestAnimationFrame
// ─────────────────────────────────────────────────────────────────────────────
function useCountdown(targetDate) {
  const [time, setTime] = useState({ dd: "000", hh: "00", mm: "00", ss: "00", ms: "000" });
  const rafRef = useRef();

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const ms = diff % 1000;
      const totalSec = Math.floor(diff / 1000);
      const ss = totalSec % 60;
      const totalMin = Math.floor(totalSec / 60);
      const mm = totalMin % 60;
      const totalHr = Math.floor(totalMin / 60);
      const hh = totalHr % 24;
      const dd = Math.floor(totalHr / 24);

      setTime({
        dd: String(dd).padStart(3, "0"),
        hh: String(hh).padStart(2, "0"),
        mm: String(mm).padStart(2, "0"),
        ss: String(ss).padStart(2, "0"),
        ms: String(ms).padStart(3, "0"),
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [targetDate]);

  return time;
}

// ─────────────────────────────────────────────────────────────────────────────
// Hex scrolling canvas (background detail for terminal readout)
// ─────────────────────────────────────────────────────────────────────────────
function HexScrollCanvas() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const cols = 12;
    const fontSize = 10;
    const lineHeight = 14;

    const generateHexLine = () => {
      let line = "";
      for (let i = 0; i < cols; i++) {
        line += Math.floor(Math.random() * 0xffff)
          .toString(16)
          .toUpperCase()
          .padStart(4, "0") + " ";
      }
      return line;
    };

    let scrollY = 0;
    let lines = Array.from({ length: 30 }, generateHexLine);
    let rafId;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;

      ctx.clearRect(0, 0, w, h);
      ctx.font = `${fontSize}px "Courier New", monospace`;
      ctx.fillStyle = "rgba(255, 94, 0, 0.12)";

      scrollY = (scrollY + 0.4) % lineHeight;

      for (let i = 0; i < Math.ceil(h / lineHeight) + 1; i++) {
        const lineIdx = i % lines.length;
        const y = i * lineHeight - scrollY;
        ctx.fillText(lines[lineIdx], 4, y + fontSize);

        // Occasionally refresh a line for live data feel
        if (Math.random() < 0.002) {
          lines[lineIdx] = generateHexLine();
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-100"
      aria-hidden="true"
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Terminal UI — bottom left
// TextGenerateEffect from Aceternity UI applied to header + date lines
// ─────────────────────────────────────────────────────────────────────────────
function TerminalUI({ countdown }) {
  return (
    <div className="relative overflow-hidden border border-[rgba(255,94,0,0.15)] bg-black/60 backdrop-blur-sm p-4 min-w-[320px]">
      <HexScrollCanvas />
      <div className="relative z-10">

        {/* ── Header: Aceternity TextGenerateEffect ──────────────────────
            Words materialize one-by-one with blur-to-clear,
            staggered at 0.08s — mimics a terminal boot sequence        */}
        <div className="flex items-center gap-1.5 mb-3">
          <TextGenerateEffect
            words=">_ TERMINAL READOUT // FEST_DATES"
            className="font-mono text-[#FF5E00] text-[10px] uppercase tracking-[0.2em]"
            filter={true}
            duration={0.3}
            staggerDelay={0.08}
            initialDelay={0.2}
          />
          <span
            className="font-mono text-[#FF5E00] text-[10px] flex-shrink-0"
            style={{ animation: "termBlink 1s step-end infinite" }}
          >
            ▌
          </span>
        </div>

        {/* ── Date: Aceternity TextGenerateEffect ────────────────────────
            Heavier, slower stagger — each word hits like a key press.
            initialDelay=1.2s so it fires AFTER the header completes   */}
        <div className="mb-3">
          <TextGenerateEffect
            words="12TH – 14TH MARCH 2027"
            className="font-mono text-white text-xl font-bold tracking-[0.08em]"
            filter={true}
            duration={0.45}
            staggerDelay={0.18}
            initialDelay={1.2}
          />
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-0 font-mono">
          {[
            { label: "DD", value: countdown.dd },
            { label: "HH", value: countdown.hh },
            { label: "MM", value: countdown.mm },
            { label: "SS", value: countdown.ss },
            { label: "MS", value: countdown.ms },
          ].map((unit, idx) => (
            <React.Fragment key={unit.label}>
              <div className="flex flex-col items-center">
                <span className="text-white text-lg font-bold tabular-nums leading-none">
                  {unit.value}
                </span>
                <span className="text-[#888888] text-[8px] uppercase tracking-widest mt-0.5">
                  {unit.label}
                </span>
              </div>
              {idx < 4 && (
                <span className="text-[#FF5E00] text-lg font-bold mx-1.5 leading-none self-start mt-0.5">
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Action Interface — bottom right
// ─────────────────────────────────────────────────────────────────────────────
function ActionInterface() {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href="https://unstop.com/college-fests/optima-2027-indian-institute-of-technology-iit-kharagpur-260905"
        target="_blank"
        rel="noopener noreferrer"
        className="mechanical-btn group relative inline-flex items-center gap-2 border border-white/30 bg-transparent px-5 py-3 text-[11px] font-mono uppercase tracking-[0.2em] text-white transition-none overflow-hidden"
      >
        <span className="relative z-10 group-hover:text-black transition-none">
          REGISTER ON UNSTOP ↗
        </span>
        {/* Flood fill */}
        <span className="absolute inset-0 bg-[#FF5E00] scale-x-0 group-hover:scale-x-100 origin-left transition-none" />
        {/* Bracket left */}
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-full border-l-2 border-t border-b border-white/50 group-hover:-translate-x-1 group-hover:border-black transition-none" />
        {/* Bracket right */}
        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-full border-r-2 border-t border-b border-white/50 group-hover:translate-x-1 group-hover:border-black transition-none" />
      </a>

      <button
        onClick={() => {
          const el = document.getElementById("about");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        className="mechanical-btn group relative inline-flex items-center gap-2 border border-white/20 bg-transparent px-5 py-3 text-[11px] font-mono uppercase tracking-[0.2em] text-white transition-none overflow-hidden"
      >
        <span className="relative z-10 group-hover:text-black transition-none">
          EXPLORE FEST ↓
        </span>
        <span className="absolute inset-0 bg-[#FF5E00] scale-x-0 group-hover:scale-x-100 origin-left transition-none" />
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-full border-l-2 border-t border-b border-white/30 group-hover:-translate-x-1 group-hover:border-black transition-none" />
        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-full border-r-2 border-t border-b border-white/30 group-hover:translate-x-1 group-hover:border-black transition-none" />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Hero component
// ─────────────────────────────────────────────────────────────────────────────
const TAGLINE = "IIT Kharagpur's Renowned Techno-Optimization Fest. Convergence of computational systems, mathematical modeling, and operational excellence.";
const FEST_DATE = "2027-03-12T00:00:00+05:30";

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef();
  const titleRef = useRef();
  const glareRef = useRef({ x: 50 });

  // Scramble for main title
  const { displayText: heroText } = useScrambleText("OPTIMA 2027", 1600);
  // Scramble for tagline (slightly delayed)
  const { displayText: taglineText } = useScrambleText(TAGLINE, 2400);

  // Live countdown
  const countdown = useCountdown(FEST_DATE);

  // Mouse move → metallic glare on title
  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current || !titleRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    titleRef.current.style.setProperty("--glare-x", `${x}%`);
    titleRef.current.style.setProperty("--glare-y", `${y}%`);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* CAD grid overlay (subtle) */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,94,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,94,0,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* Corner fiducials */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[rgba(255,94,0,0.3)] pointer-events-none z-10" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[rgba(255,94,0,0.3)] pointer-events-none z-10" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[rgba(255,94,0,0.3)] pointer-events-none z-10" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[rgba(255,94,0,0.3)] pointer-events-none z-10" />

      {/* ── HERO CENTER ─────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-28 pb-8 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1 mb-8 border border-[rgba(255,94,0,0.2)] bg-black/50 backdrop-blur-sm"
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-[#00E5FF]"
            style={{ animation: "heartbeat 2s ease-in-out infinite" }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#888888]">
            IIT Kharagpur · Dept. of Industrial &amp; Systems Engineering
          </span>
        </motion.div>

        {/* ── MAIN TITLE with glare mask ─────────────────────────── */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 w-full overflow-hidden"
        >
          <h1
            ref={titleRef}
            className="font-['Impact','Arial_Black',sans-serif] font-black uppercase text-white leading-[0.9] select-none hero-glare-title"
            style={{
              fontSize: "clamp(4rem, 12vw, 10.5rem)",
              letterSpacing: "-0.02em",
              "--glare-x": "50%",
              "--glare-y": "50%",
              WebkitTextStroke: "1px rgba(255,94,0,0.15)",
            }}
          >
            {heroText}
          </h1>
        </motion.div>

        {/* ── TAGLINE with decryption ────────────────────────────── */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="max-w-2xl"
        >
          <p className="font-mono text-[#888888] text-[11px] sm:text-sm leading-relaxed tracking-[0.05em]">
            {taglineText}
          </p>
        </motion.div>
      </div>

      {/* ── BOTTOM HUD ──────────────────────────────────────────── */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
        className="relative z-10 w-full border-t border-[rgba(255,94,0,0.1)] px-6 sm:px-10 py-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          {/* Terminal Readout — bottom left */}
          <TerminalUI countdown={countdown} />

          {/* Action Buttons — bottom right */}
          <ActionInterface />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
