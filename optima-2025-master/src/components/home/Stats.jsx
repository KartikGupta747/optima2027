import React from "react";
import { motion } from "framer-motion";

const statsData = [
  { value: "5000+", label: "Participants" },
  { value: "20+", label: "Events & Competitions" },
  { value: "10+", label: "Workshops & Lectures" },
  { value: "50+", label: "Industry Leaders" },
];

const Stats = () => {
  return (
    <section className="relative py-24 bg-black border-b border-white/5">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/10">
          {statsData.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`flex flex-col items-center text-center ${i === 0 ? "pl-0" : ""} ${i % 2 !== 0 ? "border-l-0 md:border-l" : ""}`}
            >
              <div className="text-4xl md:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 mb-4 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-medium tracking-[0.2em] text-cyan-400 uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
