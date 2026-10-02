import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const events = [
  { id: "comp", title: "Competitions", desc: "Test your optimization and analytical skills against top minds.", url: "/competitions", bg: "bg-indigo-900/20" },
  { id: "work", title: "Workshops", desc: "Hands-on sessions with industry-standard tools and methodologies.", url: "/workshops", bg: "bg-cyan-900/20" },
  { id: "guest", title: "Guest Lectures", desc: "Insights and experiences from global industry leaders.", url: "/guest-lectures", bg: "bg-purple-900/20" },
];

const EventsPreview = () => {
  return (
    <section className="py-32 bg-black border-b border-white/5 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <div className="text-cyan-500 font-mono text-sm tracking-widest uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-cyan-500/50" />
              Experiences
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              THE OPTIMA <br/> ECOSYSTEM
            </h2>
          </div>
          <Link to="/schedule">
            <button className="text-sm font-medium tracking-widest uppercase text-white hover:text-cyan-400 transition-colors flex items-center gap-2 pb-2 border-b border-white/20 hover:border-cyan-400">
              View Full Schedule <ArrowUpRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {events.map((evt, i) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`group relative h-[400px] lg:h-[500px] rounded-2xl p-8 flex flex-col justify-end overflow-hidden ${evt.bg} border border-white/5 hover:border-white/20 transition-all`}
            >
              {/* Abstract hover background effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
              <div className="absolute top-0 right-0 p-8 z-20 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>

              <div className="relative z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-bold text-white mb-4">{evt.title}</h3>
                <p className="text-slate-400 mb-6 max-w-sm">{evt.desc}</p>
                <Link to={evt.url} className="inline-block relative overflow-hidden">
                  <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Explore {evt.title}</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsPreview;
