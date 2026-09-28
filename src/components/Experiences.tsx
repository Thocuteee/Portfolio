import { motion } from "motion/react";
import contentData from "../data/contentData.json";
import { JourneySection } from "../types";
import { WordsPullUp } from "./AnimateText";

const data = (contentData as any).experiences as JourneySection;

export default function Experiences() {
  return (
    <section
      id="experiences"
      className="py-24 bg-black px-4 sm:px-6 md:px-12 relative overflow-hidden border-t border-white/5"
    >
      {/* Fractal noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.06] pointer-events-none" />

      {/* Glow Effects */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-[#DEDBC8]/5 blur-[120px] rounded-full pointer-events-none animate-pulse" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Title Heading */}
        <div className="text-center mb-16 flex flex-col items-center justify-center">
          <span className="font-mono text-[10px] tracking-widest text-[#DEDBC8] uppercase mb-3 text-center">
            TIMELINE // 04
          </span>
          <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-semibold text-[#E1E0CC] tracking-tight text-center flex justify-center items-center w-full">
            <WordsPullUp text={data.title} className="justify-center" />
          </h2>
          <div className="w-16 h-[1.5px] bg-[#DEDBC8]/40 mx-auto mt-4 rounded-full" />
        </div>

        {/* Vertical Timeline Construction */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-8 sm:pl-12 space-y-12 py-4">
          {data.steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Timeline Circular Icon and Halo */}
              <div className="absolute -left-[45px] sm:-left-[61px] top-2 flex items-center justify-center">
                <div className="w-3.5 h-3.5 bg-[#DEDBC8] rounded-full border border-black relative z-10">
                  <div className="absolute inset-0 bg-[#DEDBC8] rounded-full animate-ping opacity-30 pointer-events-none scale-150" />
                </div>
                <div className="absolute w-8 h-8 bg-[#DEDBC8]/10 rounded-full -z-10" />
              </div>

              {/* Step Card */}
              <div className="bg-[#212121]/30 border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-[#DEDBC8]/30 hover:bg-[#212121]/50 transition-all text-left liquid-glass">
                {/* Period Badge & Category */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-xs font-semibold tracking-wider text-[#E1E0CC] bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
                    {step.period}
                  </span>
                  {step.id === "codegym" && (
                    <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#DEDBC8] bg-white/10 px-3 py-1 rounded-full">
                      INTERNSHIP
                    </span>
                  )}
                </div>

                {/* Core Title */}
                <h3 className="font-sans text-xl sm:text-2xl font-bold text-white mb-3 tracking-wide">
                  {step.title}
                </h3>

                {/* Subtitle Body Description */}
                <p className="font-sans text-gray-400 text-sm sm:text-base leading-relaxed mb-6" style={{ color: "rgba(225, 224, 204, 0.7)" }}>
                  {step.description}
                </p>

                {/* Conditional Stack Tag Badges with warm styles */}
                {step.tags && step.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 w-full">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] sm:text-xs text-[#E1E0CC] bg-black/40 border border-white/5 hover:border-[#DEDBC8]/40 px-3 py-1.5 rounded-lg transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
