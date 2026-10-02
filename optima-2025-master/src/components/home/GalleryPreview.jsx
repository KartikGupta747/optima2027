import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Image as ImageIcon } from "lucide-react";

const GalleryPreview = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section ref={containerRef} className="py-32 bg-black border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24 flex flex-col md:flex-row items-end justify-between gap-8">
        <div>
          <div className="text-cyan-500 font-mono text-sm tracking-widest uppercase mb-6 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-cyan-500/50" />
            Visual Storytelling
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            GLIMPSES OF OPTIMA
          </h2>
        </div>
        <Link to="/gallery">
          <button className="text-sm font-medium tracking-widest uppercase text-white hover:text-cyan-400 transition-colors flex items-center gap-2 pb-2 border-b border-white/20 hover:border-cyan-400">
            View Full Gallery <ImageIcon className="w-4 h-4" />
          </button>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 h-[60vh] md:h-[80vh]">
          
          <motion.div style={{ y: y1 }} className="h-full rounded-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-indigo-900/40 z-0"></div>
            {/* Fallback image style, assuming background image or generic */}
            <div className="absolute inset-0 bg-[url('/src/assets/hero/hero-background.jpg')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700 mix-blend-luminosity"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-8 z-20">
              <h3 className="text-2xl font-bold text-white mb-2">Immersive Experiences</h3>
              <p className="text-slate-400">Where technology meets ambition.</p>
            </div>
          </motion.div>

          <motion.div style={{ y: y2 }} className="h-full rounded-2xl overflow-hidden relative group mt-12 md:mt-24">
            <div className="absolute inset-0 bg-cyan-900/40 z-0"></div>
            <div className="absolute inset-0 bg-[url('/src/assets/background.jpg')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700 mix-blend-luminosity"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-8 z-20">
              <h3 className="text-2xl font-bold text-white mb-2">Industry Interaction</h3>
              <p className="text-slate-400">Networking with global leaders.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
