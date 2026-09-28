import { useEffect, useRef } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { motion } from "motion/react";
import contentData from "../data/contentData.json";
import { ContentData } from "../types";
import { WordsPullUp } from "./AnimateText";

const data = contentData as unknown as ContentData;

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroVideoSrc = `${import.meta.env.BASE_URL}hero-background.mp4`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        // Some mobile browsers still block background autoplay; keep the element mounted.
      }
    };

    void tryPlay();

    return undefined;
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen bg-black p-4 sm:p-6 flex flex-col justify-center"
    >
      {/* Outer wrapper with card-style inset rounding */}
      <div className="relative w-full min-h-[calc(100vh-3rem)] rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden flex items-center justify-center bg-zinc-950 border border-white/5">
        {/* Shared background so the hero always has depth on both desktop and mobile */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(222,219,200,0.16),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),_transparent_26%),linear-gradient(180deg,#111111_0%,#000000_72%)]" />
        <div className="absolute inset-0 bg-noise opacity-[0.06] mix-blend-overlay pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(222,219,200,0.03),_transparent_55%)] pointer-events-none z-10" />
        
        {/* Cinematic Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="hero-video absolute inset-x-0 top-0 h-full w-full object-cover object-center pointer-events-none z-0"
          onError={() => {
            // Keep the visual background layers visible even if the video cannot play.
          }}
        >
          <source
            src={heroVideoSrc}
            type="video/mp4"
          />
        </video>

        {/* Ambient Noise overlay */}
        <div className="absolute inset-0 noise-overlay opacity-[0.55] mix-blend-overlay pointer-events-none z-10" />

        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/85 pointer-events-none z-10" />

        {/* Glowing visual backdrop */}
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#DEDBC8]/5 blur-[120px] rounded-full pointer-events-none z-10" />

        {/* Content Flow */}
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center relative z-20 px-6 sm:px-12 py-16">
          
          {/* Main title wrapped in a repeating gentle floating motion */}
          <motion.h1
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#E1E0CC] tracking-tight leading-[1.05] mb-6 drop-shadow-[0_10px_20px_rgba(222,219,200,0.15)]"
          >
            <WordsPullUp text={data.hero.name} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-sans text-base sm:text-lg text-gray-400 leading-relaxed mb-8 max-w-2xl"
            style={{ color: "rgba(225, 224, 204, 0.7)" }}
          >
            {data.hero.description}
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => handleScrollTo("projects")}
              className="font-sans text-sm font-medium tracking-wide bg-[#DEDBC8] hover:bg-white text-black px-6 py-3 rounded-full inline-flex items-center gap-2 cursor-pointer transition-all duration-300 active:scale-95 group shadow-lg shadow-black/30"
            >
              {data.hero.primaryBtnText}
              <div className="bg-black rounded-full w-7 h-7 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </button>
            
            <button
              onClick={() => handleScrollTo("contact")}
              className="font-sans text-sm font-medium tracking-wide bg-black/40 hover:bg-black/60 text-[#DEDBC8] hover:text-white border border-[#DEDBC8]/20 hover:border-[#DEDBC8]/40 px-6 py-3 rounded-full cursor-pointer transition-all duration-300 active:scale-95 backdrop-blur-sm"
            >
              {data.hero.secondaryBtnText}
            </button>
          </motion.div>

        </div>

        {/* Scroll down mouse */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-20 hidden sm:block">
          <motion.button
            onClick={() => handleScrollTo("about")}
            className="p-3 bg-black/60 border border-white/10 hover:border-[#DEDBC8]/30 rounded-full text-[#DEDBC8] hover:text-white transition-all cursor-pointer pointer-events-auto shadow-md backdrop-blur-sm"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown size={14} />
          </motion.button>
        </div>

      </div>
    </section>
  );
}
