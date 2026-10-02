import React from "react";
import { motion } from "framer-motion";

// Placeholders for sponsors
const sponsors = [
  { id: 1, name: "Unstop", tier: "Title Sponsor" },
  { id: 2, name: "Tech Mahindra", tier: "Gold Sponsor" },
  { id: 3, name: "TCS", tier: "Technology Partner" },
  { id: 4, name: "KPMG", tier: "Analytics Partner" },
  { id: 5, name: "Boeing", tier: "Innovation Partner" },
  { id: 6, name: "Accenture", tier: "Strategy Partner" },
];

const Sponsors = () => {
  return (
    <section className="py-32 bg-black border-b border-white/5 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
        
        <div className="text-cyan-500 font-mono text-sm tracking-widest uppercase mb-16 inline-flex items-center gap-4">
          <span className="w-8 h-[1px] bg-cyan-500/50" />
          Industry Partners
          <span className="w-8 h-[1px] bg-cyan-500/50" />
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-20">
          POWERED BY EXCELLENCE
        </h2>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-5xl mx-auto">
          {sponsors.map((sponsor, i) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group w-40 md:w-56 h-32 md:h-40 bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.05] rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-xl md:text-2xl font-bold text-slate-300 group-hover:text-white transition-colors mb-2">
                  {sponsor.name}
                </span>
                <span className="text-xs font-mono text-cyan-500/70 uppercase tracking-widest text-center px-4">
                  {sponsor.tier}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20"
        >
          <a href="mailto:sumanta@optima.org.in" className="text-slate-400 hover:text-cyan-400 font-mono text-sm tracking-widest uppercase transition-colors border-b border-white/20 pb-1 hover:border-cyan-400">
            Become a Partner
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Sponsors;
