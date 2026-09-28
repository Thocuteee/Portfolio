import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import contentData from "../data/contentData.json";
import { ContentData } from "../types";

const data = contentData as unknown as ContentData;

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["home", "about", "skills", "projects", "experiences", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (target: string) => {
    setMobileMenuOpen(false);
    const sectionId = target.replace("#", "");
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="navbar-header"
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 pointer-events-none"
    >
      {/* Hanging header pill container */}
      <div
        className={`flex items-center justify-between w-full max-w-5xl px-4 py-3 md:px-10 md:py-4 transition-all duration-300 bg-black rounded-b-2xl md:rounded-b-[2rem] border-x border-b border-white/5 shadow-2xl pointer-events-auto ${
          scrolled ? "bg-black/95 scale-95" : "bg-black/90"
        }`}
      >
        {/* Brand Logo */}
        <motion.button
          onClick={() => handleNavClick("#home")}
          className="font-serif italic font-bold text-base md:text-lg tracking-wider text-[#E1E0CC] hover:text-white cursor-pointer transition-colors"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {data.logo}
        </motion.button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-10">
          {data.navigation.map((item) => {
            const isCurrent = activeSection === item.target.replace("#", "");
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.target)}
                className="font-sans text-xs md:text-sm font-medium tracking-wider relative py-1 cursor-pointer transition-all duration-200"
                style={{
                  color: isCurrent ? "#E1E0CC" : "rgba(225, 224, 204, 0.7)",
                }}
              >
                {item.label}
                {isCurrent && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#DEDBC8] rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-300 hover:text-white p-2 rounded-lg transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-4 right-4 mt-2 bg-[#101010] border border-white/5 rounded-2xl shadow-2xl p-6 pointer-events-auto flex flex-col space-y-3 z-50 overflow-hidden liquid-glass"
          >
            {data.navigation.map((item) => {
              const isCurrent = activeSection === item.target.replace("#", "");
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.target)}
                  className={`font-sans text-left text-sm font-medium py-2.5 px-4 rounded-xl transition-colors cursor-pointer ${
                    isCurrent
                      ? "text-black bg-[#DEDBC8]"
                      : "text-gray-300 hover:text-[#E1E0CC] hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
