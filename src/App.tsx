import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import About from "./components/About.tsx";
import Skills from "./components/Skills.tsx";
import Projects from "./components/Projects.tsx";
import Experiences from "./components/Experiences.tsx";
import Contact from "./components/Contact.tsx";
import Footer from "./components/Footer.tsx";
import CustomCursor from "./components/CustomCursor.tsx";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // 1. Smooth Scroll Progress Bar at the top of the viewport
    gsap.fromTo(
      ".scroll-indicator",
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1,
        },
      }
    );

    // 2. Coordinated section line reveals & background glow animations on scroll
    const animSections = ["#about", "#skills", "#projects", "#experiences", "#contact"];

    animSections.forEach((secId) => {
      const section = document.querySelector(secId);
      if (!section) return;

      // Clean, lightweight opacity fade-in on the section container as it enters viewport
      gsap.fromTo(
        section,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );

      // Expand horizontal/vertical lines from zero to full length
      const line = section.querySelector(".h-\\[1px\\], .w-16, .w-12");
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0, opacity: 0, transformOrigin: "center" },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Ambient radial highlights pulsing reveal
      const glow = section.querySelector(".bg-\\[\\#DEDBC8\\]\\/5");
      if (glow) {
        gsap.fromTo(
          glow,
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1,
            scale: 1,
            duration: 2.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#E1E0CC] flex flex-col font-sans overflow-x-hidden selection:bg-[#DEDBC8]/20 selection:text-[#DEDBC8]">
      {/* Sleek dynamic scroll progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#DEDBC8] origin-left scale-x-0 z-[999] scroll-indicator shadow-[0_0_10px_#DEDBC8]" />

      {/* Dynamic Custom Interactive Cursor */}
      <CustomCursor />

      {/* Dynamic Header Floating Bar */}
      <Navbar />

      {/* Main Sections flow */}
      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experiences />
        <Contact />
      </main>

      {/* Custom Global Footer */}
      <Footer />
    </div>
  );
}
