import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Terminal,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Globe,
  Layers,
  Sparkles,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { submitQuery } from "../utils/api";
import { playClickTick, playHoverChirp } from "../utils/cyberAudio";

const SOCIAL_FREQUENCIES = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/optima-iitkgp/",
    icon: Linkedin,
    color: "hover:text-[#0077b5] hover:border-[#0077b5]/50 hover:shadow-[0_0_15px_rgba(0,119,181,0.35)]",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/optima.iitkgp?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    icon: Instagram,
    color: "hover:text-[#e4405f] hover:border-[#e4405f]/50 hover:shadow-[0_0_15px_rgba(228,64,95,0.35)]",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/optima.iitkharagpur",
    icon: Facebook,
    color: "hover:text-[#1877f2] hover:border-[#1877f2]/50 hover:shadow-[0_0_15px_rgba(24,119,242,0.35)]",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@optima.iitkgp?si=awtEARkQ8C7UUDxi",
    icon: Youtube,
    color: "hover:text-[#ff0000] hover:border-[#ff0000]/50 hover:shadow-[0_0_15px_rgba(255,0,0,0.35)]",
  },
];

const ORGANIZER_CONTACTS = [
  {
    name: "Kshitij Nayan",
    role: "Core Executive Lead",
    phone: "+919835075835",
    phoneDisplay: "+91 98350 75835",
    email: "KSHITIJ.NAYAN.24@kgpian.iitkgp.ac.in",
  },
  {
    name: "Anora Ankur",
    role: "Outreach & Operations Lead",
    phone: "+918484050146",
    phoneDisplay: "+91 84840 50146",
    email: "ANORAANKUR.24@kgpian.iitkgp.ac.in",
  },
];

const QueryUs = () => {
  document.title = "Contact & Dispatch | Optima 2027";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    playClickTick();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    playClickTick();
    setLoading(true);
    setMessage(null);

    const queryData = { name, email, phone, query };

    try {
      await submitQuery(queryData);
      setMessage({
        type: "success",
        text: "DISPATCH LOGGED // Message successfully ingested into the Optima registry.",
      });
      setName("");
      setEmail("");
      setPhone("");
      setQuery("");
    } catch (error) {
      setMessage({
        type: "error",
        text: "DISPATCH NOT TRANSMITTED // Backend relay unreachable. You can also contact organizers directly via phone or email below.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#030305] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Sci-Fi Atmospheric Lighting */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-[#ff4500]/12 rounded-full blur-[150px]" />
      <div className="pointer-events-none absolute top-1/2 -right-32 w-96 h-96 bg-cyan-400/12 rounded-full blur-[160px]" />
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ========================================================= */}
        {/* SECTION HEADER: KINETIC TYPOGRAPHY STANDARD               */}
        {/* ========================================================= */}
        <div className="mb-14 pb-8 border-b border-white/10">
          {/* Cyber HUD Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-cyan-400 mb-5 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>SEC_08 // INQUIRY_RELAY</span>
            <span className="text-white/20">|</span>
            <span className="text-[#ff4500]">IIT_KGP_ISE</span>
            <span className="text-white/20">|</span>
            <span className="text-emerald-400">DISPATCH_ONLINE</span>
          </div>

          {/* Kinetic Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-sans tracking-tight text-white flex items-center gap-3.5 flex-wrap">
            <span className="text-[#ff4500]">■</span>
            <span>TRANSMIT DISPATCH</span>
            <span className="text-white/20 font-light">//</span>
            <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
              INQUIRY CONSOLE
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 font-sans mt-3 max-w-2xl leading-relaxed">
            Connect directly with the Department of Industrial &amp; Systems Engineering
            and the Optima 2027 organizing committee. Transmit queries regarding
            sponsorships, hackathons, guest lectures, or academic delegations.
          </p>
        </div>

        {/* ========================================================= */}
        {/* BENTO ARCHITECTURE: 2-COLUMN DIMENSIONAL LAYOUT          */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ======================================================= */}
          {/* LEFT COLUMN: THE COMMUNICATIONS NODE (5 Columns)        */}
          {/* ======================================================= */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Tile 1: Department Headquarters & Physical Location */}
            <div className="relative rounded-3xl bg-white/[0.02] backdrop-blur-2xl border border-white/10 p-6 sm:p-7 overflow-hidden group transition-all duration-300 hover:border-white/20">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5" />
                  <span>LOCATION_NODE // 721302</span>
                </span>
                <span className="font-mono text-[10px] text-zinc-500 uppercase">
                  GEO_COORD
                </span>
              </div>

              <a
                href="https://maps.app.goo.gl/7t9fs2Z4KE2Dqjnb6"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverChirp}
                onClick={playClickTick}
                className="group/loc flex items-start justify-between gap-3 p-3.5 rounded-2xl bg-black/40 border border-white/10 hover:border-cyan-400/50 hover:bg-black/60 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#ff4500]" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-white group-hover/loc:text-cyan-300 transition-colors">
                      Department of Industrial &amp; Systems Engineering
                    </h3>
                    <p className="font-sans text-xs text-zinc-400 mt-1 leading-relaxed">
                      Indian Institute of Technology Kharagpur<br />
                      Paschim Medinipur, West Bengal &ndash; 721302
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover/loc:text-cyan-400 group-hover/loc:translate-x-0.5 group-hover/loc:-translate-y-0.5 transition-all flex-shrink-0 mt-1" />
              </a>
            </div>

            {/* Tile 2: Direct Leadership Communications Relay */}
            <div className="relative rounded-3xl bg-white/[0.02] backdrop-blur-2xl border border-white/10 p-6 sm:p-7 overflow-hidden flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#ff4500] flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>ORGANIZING_HEADS // DIRECT_DISPATCH</span>
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500">
                    2 CONTACTS
                  </span>
                </div>

                <div className="space-y-4">
                  {ORGANIZER_CONTACTS.map((org, idx) => (
                    <div
                      key={org.name}
                      className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2.5 transition-all hover:border-white/20"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-display font-bold text-sm text-white">
                            {org.name}
                          </div>
                          <div className="font-mono text-[10px] text-[#ff4500] font-medium">
                            {org.role}
                          </div>
                        </div>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                          0{idx + 1}
                        </span>
                      </div>

                      {/* Phone Link */}
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5 font-mono text-xs text-zinc-300">
                        <a
                          href={`tel:${org.phone}`}
                          onMouseEnter={playHoverChirp}
                          className="flex items-center gap-2 hover:text-cyan-300 transition-colors truncate"
                        >
                          <Phone className="w-3.5 h-3.5 text-zinc-500" />
                          <span>{org.phoneDisplay}</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopy(org.phone, `phone-${idx}`)}
                          className="p-1 text-zinc-500 hover:text-white transition-colors"
                          title="Copy phone number"
                        >
                          {copiedKey === `phone-${idx}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Email Link */}
                      <div className="flex items-center justify-between gap-2 font-mono text-xs text-zinc-300">
                        <a
                          href={`mailto:${org.email}`}
                          onMouseEnter={playHoverChirp}
                          className="flex items-center gap-2 hover:text-cyan-300 transition-colors truncate text-[11px]"
                        >
                          <Mail className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                          <span className="truncate">{org.email}</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopy(org.email, `email-${idx}`)}
                          className="p-1 text-zinc-500 hover:text-white transition-colors flex-shrink-0"
                          title="Copy email address"
                        >
                          {copiedKey === `email-${idx}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Channels Sub-Deck */}
              <div className="pt-6 mt-6 border-t border-white/5">
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-3">
                  PUBLIC_TRANSMISSION_CHANNELS
                </div>
                <div className="grid grid-cols-4 gap-2.5">
                  {SOCIAL_FREQUENCIES.map((soc) => {
                    const Icon = soc.icon;
                    return (
                      <a
                        key={soc.name}
                        href={soc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={playHoverChirp}
                        onClick={playClickTick}
                        className={`h-11 rounded-2xl border border-white/10 bg-black/40 flex items-center justify-center text-zinc-400 transition-all duration-300 ${soc.color}`}
                        title={soc.name}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* ======================================================= */}
          {/* RIGHT COLUMN: THE TRANSMISSION TERMINAL (7 Columns)     */}
          {/* ======================================================= */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative rounded-3xl bg-[#06060c]/85 backdrop-blur-3xl border border-white/10 p-6 sm:p-9 flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden h-full">
              
              {/* Internal Marching Ants Decorative Top Border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff4500]/60 to-cyan-400/60 pointer-events-none" />

              <div>
                {/* Form Header Readout */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-[#ff4500] animate-ping" />
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">
                      DISPATCH_BUFFER // TRANSMISSION_PORT
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase">
                    INPUT_MODE: ACTIVE
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Row 1: Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label className="block font-mono text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                        FULL_NAME <span className="text-[#ff4500]">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Swabhiman Nayak"
                        required
                        className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/10 text-white font-sans text-sm placeholder-zinc-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,240,255,0.25)] transition-all"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                      <label className="block font-mono text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                        ELECTRONIC_MAIL <span className="text-[#ff4500]">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="operator@domain.com"
                        required
                        className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/10 text-white font-sans text-sm placeholder-zinc-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,240,255,0.25)] transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone Input */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                      CONTACT_NUMBER / WHATSAPP <span className="text-[#ff4500]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/10 text-white font-sans text-sm placeholder-zinc-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,240,255,0.25)] transition-all"
                    />
                  </div>

                  {/* Row 3: Query Message Body */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block font-mono text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                        DISPATCH_PAYLOAD // QUERY DETAILS <span className="text-[#ff4500]">*</span>
                      </label>
                      <span className="font-mono text-[10px] text-zinc-500">
                        MAX 2000 CHARS
                      </span>
                    </div>
                    <textarea
                      rows={5}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Outline your inquiry regarding Optima 2027 events, sponsorship inquiries, or technical delegations..."
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/10 text-white font-sans text-sm placeholder-zinc-600 focus:outline-none focus:border-[#ff4500] focus:shadow-[0_0_20px_rgba(255,107,0,0.25)] transition-all resize-none"
                    />
                  </div>

                  {/* Kinetic Submit Button with Perimeter Glow Beam */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      onMouseEnter={playHoverChirp}
                      className="group relative w-full inline-flex items-center justify-center px-8 py-3.5 rounded-2xl overflow-hidden font-mono text-xs font-bold uppercase tracking-widest text-white transition-all select-none disabled:opacity-50 disabled:cursor-not-allowed border border-[#ff4500]/50 bg-gradient-to-r from-[#ff4500]/20 via-[#ff4500]/30 to-[#ff4500]/20 hover:from-[#ff4500] hover:to-[#ff8c00] hover:text-black shadow-[0_0_25px_rgba(255,107,0,0.3)] hover:shadow-[0_0_35px_rgba(255,107,0,0.6)]"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2.5">
                        {loading ? (
                          <>
                            <span className="w-3.5 h-3.5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                            <span>TRANSMITTING PAYLOAD TO SYSTEM...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-cyan-300 group-hover:text-black transition-colors" />
                            <span>TRANSMIT DISPATCH // SUBMIT QUERY</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </form>

                {/* Status Feedback Banners */}
                <AnimatePresence>
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className={`mt-6 p-4 rounded-2xl border font-mono text-xs flex items-start gap-3 ${
                        message.type === "success"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                          : "bg-orange-500/10 border-orange-500/30 text-orange-300 shadow-[0_0_20px_rgba(255,107,0,0.2)]"
                      }`}
                    >
                      {message.type === "success" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="leading-relaxed">{message.text}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Terminal Footer Telemetry */}
              <div className="pt-6 mt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-zinc-500 font-mono text-[10px]">
                <span>SECURITY: ENCRYPTED // TLS 1.3</span>
                <span className="text-cyan-400">OPTIMA 2027 // ISE DEPT</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default QueryUs;
