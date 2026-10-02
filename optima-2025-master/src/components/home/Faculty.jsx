import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const Faculty = () => {
  return (
    <section className="py-32 bg-black border-b border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,10,60,0.5)_0%,rgba(0,0,0,1)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        <div className="text-cyan-500 font-mono text-sm tracking-widest uppercase mb-16 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-cyan-500/50" />
          Institutional Leadership
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden relative border border-white/10">
              {/* Replace with actual HOD image later if available */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-slate-800" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-slate-600 font-mono text-sm tracking-widest uppercase">Portrait Placeholder</span>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-cyan-500/30 rounded-full" />
            <div className="absolute -top-6 -left-6 w-24 h-24 border border-purple-500/30 rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <Quote className="w-12 h-12 text-white/10 mb-8" />
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-light text-white leading-relaxed mb-12 tracking-wide">
              &quot;As the Department of Industrial and Systems Engineering marks its 52nd anniversary, I am delighted to present to you Optima 2027. It offers a distinctive platform for students to delve into this domain and experience world-class research.&quot;
            </blockquote>

            <div className="flex items-center gap-6">
              <div className="w-12 h-[1px] bg-cyan-500" />
              <div>
                <h4 className="text-xl font-bold text-white mb-1">Prof. Jitendra Kumar Jha</h4>
                <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Head of Department</p>
                <p className="text-slate-500 text-sm mt-1">Industrial & Systems Engineering, IIT Kharagpur</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Faculty;
