import { Mail, Github } from "lucide-react";
import contentData from "../data/contentData.json";
import { ContactSection } from "../types";
import { WordsPullUp } from "./AnimateText";

const data = (contentData as any).contact as ContactSection;

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 bg-black px-4 sm:px-6 md:px-12 relative overflow-hidden text-center border-t border-white/5"
    >
      {/* Background fractal noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.06] pointer-events-none" />

      {/* Background radial spotlight grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#DEDBC8]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        <span className="font-mono text-[10px] tracking-widest text-[#DEDBC8] uppercase mb-3">
          INQUIRIES // 05
        </span>
        <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4 text-center">
          <WordsPullUp text={data.title} />
        </h2>
        <div className="w-12 h-[1.5px] bg-[#DEDBC8]/40 mb-6 rounded-full" />
        <p className="font-sans text-gray-400 text-sm sm:text-base leading-relaxed mb-12 max-w-xl mx-auto" style={{ color: "rgba(225, 224, 204, 0.7)" }}>
          {data.subtitle}
        </p>

        {/* List links with matching aesthetic - Grid of 2 columns for desktop, 1 for mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
          {/* Email channel */}
          <a
            href={`mailto:${data.email}`}
            className="group flex flex-col items-center text-center gap-4 bg-[#212121]/30 border border-white/5 p-6 rounded-2xl hover:bg-[#212121]/60 hover:border-[#DEDBC8]/20 hover:text-white transition-all duration-300 liquid-glass"
          >
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-[#DEDBC8] group-hover:bg-[#DEDBC8]/10 group-hover:scale-105 transition-all">
              <Mail size={22} />
            </div>
            <div className="font-sans">
              <p className="text-[10px] text-[#DEDBC8]/70 uppercase tracking-widest font-semibold mb-1">Email Channel</p>
              <p className="text-gray-300 text-xs sm:text-sm group-hover:text-white transition-colors font-medium break-all">{data.email}</p>
            </div>
          </a>

          {/* GitHub profile */}
          <a
            href={data.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col items-center text-center gap-4 bg-[#212121]/30 border border-white/5 p-6 rounded-2xl hover:bg-[#212121]/60 hover:border-[#DEDBC8]/20 hover:text-white transition-all duration-300 liquid-glass"
          >
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-[#DEDBC8] group-hover:bg-[#DEDBC8]/10 group-hover:scale-105 transition-all">
              <Github size={22} />
            </div>
            <div className="font-sans">
              <p className="text-[10px] text-[#DEDBC8]/70 uppercase tracking-widest font-semibold mb-1">GitHub Engine</p>
              <p className="text-gray-300 text-xs sm:text-sm group-hover:text-white transition-colors font-medium">{data.github}</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
