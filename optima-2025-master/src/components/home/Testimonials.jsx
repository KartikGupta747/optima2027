import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    id: 1,
    quote: "Optima brings together the sharpest analytical minds. The quality of problem statements in the competitions is simply unparalleled.",
    name: "Aman Gupta",
    role: "Previous Winner, Data Analytics",
    year: "2024"
  },
  {
    id: 2,
    quote: "An incredibly well-organized festival that perfectly bridges the gap between academic theory and real-world industrial application.",
    name: "Dr. S. Banerjee",
    role: "Industry Expert",
    year: "2023"
  },
  {
    id: 3,
    quote: "The workshops provided actionable insights that I still use in my career today. A must-attend for any engineering student.",
    name: "Priya Sharma",
    role: "Operations Analyst",
    year: "2024"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section className="py-32 bg-black border-b border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
        
        <div className="text-cyan-500 font-mono text-sm tracking-widest uppercase mb-16 inline-flex items-center gap-4">
          <span className="w-8 h-[1px] bg-cyan-500/50" />
          Endorsements
          <span className="w-8 h-[1px] bg-cyan-500/50" />
        </div>

        <div className="max-w-4xl mx-auto min-h-[300px] flex flex-col justify-center relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-10 tracking-tight">
                &quot;{reviews[currentIndex].quote}&quot;
              </h3>
              
              <div className="flex flex-col items-center">
                <div className="font-bold text-white text-lg">{reviews[currentIndex].name}</div>
                <div className="text-cyan-400 font-mono text-sm uppercase tracking-widest mt-1">
                  {reviews[currentIndex].role} <span className="text-slate-500 mx-2">|</span> {reviews[currentIndex].year}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none -mx-4 md:-mx-16">
            <button 
              onClick={prev}
              className="pointer-events-auto p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={next}
              className="pointer-events-auto p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
