import { ReactNode } from "react";
import { motion } from "motion/react";
import { Binary, Zap, Users, FileCode } from "lucide-react";
import contentData from "../data/contentData.json";
import { ContentData } from "../types";
import { WordsPullUp } from "./AnimateText";

const data = contentData as unknown as ContentData;

// Map icon strings to components with warm cream highlight
const iconMap: Record<string, ReactNode> = {
  Binary: <Binary className="w-6 h-6 text-[#DEDBC8] group-hover:scale-110 transition-transform duration-300" />,
  Zap: <Zap className="w-6 h-6 text-[#DEDBC8] group-hover:scale-110 transition-transform duration-300" />,
  Users: <Users className="w-6 h-6 text-[#DEDBC8] group-hover:scale-110 transition-transform duration-300" />,
  FileCode: <FileCode className="w-6 h-6 text-[#DEDBC8] group-hover:scale-110 transition-transform duration-300" />
};

export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-black px-4 sm:px-6 md:px-12 relative overflow-hidden"
    >
      {/* Background visual highlight matching misty glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-[#DEDBC8]/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto bg-[#101010] border border-white/5 rounded-[2rem] p-8 sm:p-12 md:p-16 relative overflow-hidden liquid-glass">
        {/* Subtle noise in about card too */}
        <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
          
          {/* Left Block: Narrative */}
          <div className="lg:col-span-6 text-left">
            <div className="flex flex-col items-start gap-2 mb-8">
              <span className="font-mono text-[10px] tracking-widest text-[#DEDBC8] uppercase">
                DISCOVERY // 01
              </span>
              <h2 className="font-serif italic text-4xl sm:text-5xl text-[#E1E0CC] tracking-tight">
                <WordsPullUp text={data.about.title} />
              </h2>
              <div className="h-[1px] bg-[#DEDBC8]/10 w-full mt-2" />
            </div>

            <div className="space-y-6">
              {data.about.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="font-sans text-gray-400 leading-relaxed text-sm sm:text-base"
                  style={{ color: "rgba(225, 224, 204, 0.75)" }}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Right Block: Core Strength Matrices */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.about.strengths.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-[#212121]/40 border border-white/5 rounded-2xl p-6 hover:bg-[#212121]/70 hover:border-[#DEDBC8]/20 transition-all duration-300 text-left flex flex-col items-start"
                >
                  <div className="w-full flex justify-between items-start mb-4">
                    {/* Icon Block with warm cream tint */}
                    <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 group-hover:bg-[#DEDBC8]/10 group-hover:border-[#DEDBC8]/30 transition-all">
                      {iconMap[item.icon] || <FileCode className="w-5.5 h-5.5 text-[#DEDBC8]" />}
                    </div>
                    {/* Capability Number Tag */}
                    {item.tag && (
                      <span className="font-mono text-[10px] tracking-wider text-[#DEDBC8]/50 group-hover:text-[#DEDBC8] transition-colors bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full font-bold">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  {/* Text Header */}
                  <h3 className="font-sans font-semibold text-white text-base mb-2 group-hover:text-[#DEDBC8] transition-colors">
                    {item.title}
                  </h3>

                  {/* Body Text */}
                  <p className="font-sans text-gray-400 text-xs sm:text-sm leading-relaxed" style={{ color: "rgba(225, 224, 204, 0.65)" }}>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
