/**
 * Web Audio API Mechanical & High-Tech HUD Sound Synthesizer
 * Zero-asset, zero-latency audio engine for the Optima HUD interface.
 */

let audioCtx = null;
let isAudioEnabled = true;

const getAudioContext = () => {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

export const toggleCyberAudio = () => {
  isAudioEnabled = !isAudioEnabled;
  return isAudioEnabled;
};

export const getCyberAudioStatus = () => isAudioEnabled;

/**
 * High-tech frequency chirp for hover events
 */
export const playHoverChirp = () => {
  if (!isAudioEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx || ctx.state !== "running") return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    const now = ctx.currentTime;

    // Fast frequency sweep from 1400Hz to 2200Hz
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(2200, now + 0.025);

    // Subtle gain envelope
    gain.gain.setValueAtTime(0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.026);
  } catch (e) {
    // Graceful fallback if audio is not permitted yet
  }
};

/**
 * Mechanical digital click for navigation triggers
 */
export const playClickTick = () => {
  if (!isAudioEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx || ctx.state !== "running") return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    const now = ctx.currentTime;

    // Rapid metallic transient from 850Hz to 120Hz
    osc.frequency.setValueAtTime(850, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.042);
  } catch (e) {
    // Graceful fallback
  }
};
