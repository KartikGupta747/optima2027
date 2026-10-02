import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Activity, Cpu, Network } from "lucide-react";
import { heroBackground } from "../../assets";

const ParticleNetwork = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M0,50 Q25,25 50,50 T100,50"
          fill="none"
          stroke="url(#grad1)"
          strokeWidth="0.2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M0,80 Q30,10 60,60 T100,20"
          fill="none"
          stroke="url(#grad2)"
          strokeWidth="0.15"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
        />
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0" />
            <stop offset="50%" stopColor="#4facfe" stopOpacity="1" />
            <stop offset="100%" stopColor="#00f2fe" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8e2de2" stopOpacity="0" />
            <stop offset="50%" stopColor="#4a00e0" stopOpacity="1" />
            <stop offset="100%" stopColor="#8e2de2" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const Hero2027 = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20 border-b border-white/5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,10,45,0.8)_0%,rgba(0,0,0,1)_100%)] z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] z-0" />
      
      <ParticleNetwork />

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
        >
          <Activity className="w-4 h-4 text-cyan-400" />
          <span className="text-xs md:text-sm font-medium tracking-widest text-slate-300 uppercase">
            Department of Industrial & Systems Engineering
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 mb-2"
          style={{ lineHeight: 1.1 }}
        >
          OPTIMA
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex items-center gap-6 mb-8"
        >
          <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-cyan-500/50" />
          <span className="text-2xl md:text-4xl font-light tracking-[0.3em] text-cyan-400 font-mono">
            2027
          </span>
          <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-cyan-500/50" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-2xl font-light tracking-wide text-slate-400 max-w-3xl mb-12 leading-relaxed"
        >
          The Techno-Optimization Fest of <span className="text-white font-medium">IIT Kharagpur</span>.<br className="hidden md:block"/> Where engineering intelligence meets real-world problem solving.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link to="/register">
            <button className="group relative px-8 py-4 bg-white text-black font-semibold tracking-wide uppercase overflow-hidden rounded-sm transition-transform hover:scale-105 active:scale-95 flex items-center gap-2">
              <span className="relative z-10">Register Now</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </Link>
          <Link to="/about">
            <button className="px-8 py-4 text-white font-medium tracking-wide uppercase border border-white/20 rounded-sm hover:bg-white/5 transition-colors flex items-center gap-2">
              Explore Optima
            </button>
          </Link>
        </motion.div>
      </motion.div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none z-0" />
      
    </section>
  );
};

export default Hero2027;
