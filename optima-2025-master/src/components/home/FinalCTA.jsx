import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="relative py-32 md:py-48 bg-black overflow-hidden border-b border-white/5">
      {/* Dynamic converging background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_100%,transparent_100%)]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 tracking-tighter mb-8">
            READY TO <br /> OPTIMIZE?
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-400 font-light mb-12 max-w-2xl mx-auto">
            Join the brightest minds at IIT Kharagpur and step into the future of industrial systems and optimization.
          </p>

          <Link to="/register">
            <button className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white text-black font-bold tracking-widest uppercase rounded-sm overflow-hidden transition-transform hover:scale-105 active:scale-95">
              <span className="relative z-10 text-lg">Register Now</span>
              <div className="relative z-10 w-10 h-10 bg-black rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default FinalCTA;
