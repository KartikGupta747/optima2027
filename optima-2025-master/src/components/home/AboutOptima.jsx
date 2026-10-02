import React from "react";
import { motion } from "framer-motion";
import { Database, TrendingUp, Link as LinkIcon, Cpu, LineChart, Brain } from "lucide-react";

const domains = [
  { id: "01", title: "Data Analytics", icon: Database, desc: "Transforming raw data into actionable intelligence." },
  { id: "02", title: "Operations", icon: TrendingUp, desc: "Streamlining systems for maximum efficiency." },
  { id: "03", title: "Supply Chain", icon: LinkIcon, desc: "Building resilient and adaptive global networks." },
  { id: "04", title: "Optimization", icon: LineChart, desc: "Mathematical modeling for complex decision making." },
  { id: "05", title: "Decision Science", icon: Brain, desc: "Cognitive frameworks for strategic advantages." },
  { id: "06", title: "AI / Technology", icon: Cpu, desc: "Harnessing machine learning for industrial applications." },
];

const AboutOptima = () => {
  return (
    <section className="relative py-32 bg-black overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="sticky top-32"
          >
            <div className="text-cyan-500 font-mono text-sm tracking-widest uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-cyan-500/50" />
              Festival Identity
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-8 tracking-tight">
              WHERE INDUSTRIAL <br className="hidden lg:block"/>
              ENGINEERING MEETS <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
                REAL-WORLD PROBLEM SOLVING.
              </span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed max-w-lg mb-10">
              Optima is not just a festival. It is an intellectual ecosystem where the brightest minds converge to untangle the complexities of modern industry through mathematical precision and technological innovation.
            </p>
            <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent" />
          </motion.div>

          <div className="flex flex-col gap-6">
            {domains.map((domain, index) => (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/0 group-hover:bg-cyan-500/100 transition-colors rounded-l-2xl" />
                <div className="flex items-start gap-6">
                  <div className="text-sm font-mono text-slate-500 mt-1">{domain.id}</div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <domain.icon className="w-5 h-5 text-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity" />
                      <h3 className="text-xl font-bold text-white tracking-wide">{domain.title}</h3>
                    </div>
                    <p className="text-slate-400">{domain.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutOptima;
