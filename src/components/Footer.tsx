import contentData from "../data/contentData.json";
import { FooterSection } from "../types";

const data = (contentData as any).footer as FooterSection;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Left Side Brand Info */}
        <div className="text-center sm:text-left">
          <p className="font-serif italic font-bold text-lg text-[#E1E0CC] mb-2 tracking-wide">
            {data.brand}
          </p>
          <p className="font-sans text-xs text-gray-500 tracking-wide" style={{ color: "rgba(225, 224, 204, 0.5)" }}>
            © {currentYear} Chềnh Hưng Thọ. {data.tagline}
          </p>
        </div>

        {/* Right Side Link Connections */}
        <div className="flex items-center space-x-6">
          {data.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="font-sans text-xs hover:text-[#E1E0CC] tracking-wider transition-colors"
              style={{ color: "rgba(225, 224, 204, 0.7)" }}
            >
              {link.label}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
