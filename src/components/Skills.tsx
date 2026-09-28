import { ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { Code2, Layers, Wrench, Database, X, ChevronRight, Check } from "lucide-react";
import contentData from "../data/contentData.json";
import { TechnicalArsenalSection, ArsenalGroup } from "../types";
import { WordsPullUp } from "./AnimateText";

const data = (contentData as any).technicalArsenal as TechnicalArsenalSection;

// Deep Vietnamese expert explanations for each technical category
const categoryExplanations: Record<string, { intro: string; depth: string[]; expertiseLevel: string }> = {
  languages: {
    intro: "Nền tảng tư duy lập trình và cấu trúc dữ liệu cơ bản, định hướng xây dựng các dịch vụ backend ổn định và tin cậy.",
    depth: [
      "Java: Nắm vững các nguyên lý lập trình hướng đối tượng (OOP), Java Core (Collections, Exception Handling) và xử lý luồng nghiệp vụ phía máy chủ.",
      "JavaScript: Sử dụng ở mức cơ bản để gọi API, xử lý bất đồng bộ (async/await) và kết nối dữ liệu giữa giao diện với server.",
      "C++ & Python: Nắm vững cú pháp cơ bản và tư duy giải thuật thông qua các môn học nền tảng tại trường đại học."
    ],
    expertiseLevel: "Lõi Tư Duy & Thuật Toán Hệ Thống"
  },
  frameworks: {
    intro: "Tập trung xây dựng hệ thống RESTful API an toàn, hiệu quả với hệ sinh thái Spring Boot, kết hợp khả năng xây dựng giao diện cơ bản.",
    depth: [
      "Spring Boot: Xây dựng RESTful API chuẩn chuẩn mực, áp dụng Dependency Injection (DI/IoC) và xử lý luồng nghiệp vụ phân tầng (Controller - Service - Repository).",
      "Spring Security & JWT: Triển khai xác thực (Authentication) người dùng qua Token, mã hóa mật khẩu và phân quyền hạn (RBAC) cho endpoint.",
      "Spring Data JPA: Quản lý ánh xạ ORM với cơ sở dữ liệu quan hệ, tối ưu truy vấn cơ bản và làm việc với Hibernate.",
      "React (Vite) & Tailwind CSS: Xây dựng giao diện Single Page Application (SPA) cơ bản để kết nối và kiểm thử trực tiếp các API backend."
    ],
    expertiseLevel: "Phát Triển Đa Nền Tảng & RESTful API"
  },
  tools: {
    intro: "Sử dụng công cụ phát triển phần mềm chuẩn mực để quản lý mã nguồn, kiểm thử API và triển khai dịch vụ.",
    depth: [
      "Git / GitHub: Quản lý mã nguồn chặt chẽ, sử dụng thành thạo các thao tác nhánh (branching, pull request, merge) khi phát triển dự án.",
      "Docker: Đóng gói ứng dụng và cơ sở dữ liệu vào container, đảm bảo tính đồng nhất giữa môi trường phát triển và máy chủ chạy thật.",
      "Google Cloud Platform (GCP): Triển khai ứng dụng và cơ sở dữ liệu lên dịch vụ đám mây (Compute Engine / Cloud Run).",
      "Postman / Bruno: Thiết kế và kiểm thử các endpoint RESTful API, kiểm tra dữ liệu payload, status code và tự động hóa test API.",
      "VS Code: Sử dụng các IDE chuyên nghiệp để phát triển mã nguồn, gỡ lỗi (debugging) và tối ưu hóa hiệu suất làm việc."
    ],
    expertiseLevel: "Tự Động Hóa & DevOps Thực Nghiệm"
  },
  databases: {
    intro: "Mô hình hóa và quản lý dữ liệu an toàn, đảm bảo tính toàn vẹn và tối ưu thời gian phản hồi cho hệ thống.",
    depth: [
      "PostgreSQL: Hệ cơ sở dữ liệu quan hệ chính sử dụng trong dự án, thiết kế bảng dữ liệu chuẩn hóa, khóa ngoại và chỉ mục (Indexing).",
      "MySQL: Nắm vững cú pháp, thiết kế quan hệ dữ liệu liên kết và viết các câu lệnh truy vấn dữ liệu quan hệ.",
      "MongoDB: Hiểu nguyên lý cơ bản của NoSQL database dạng Document và cách lưu trữ dữ liệu phi cấu trúc."
    ],
    expertiseLevel: "Quản Trị Cơ Sở Dữ Liệu Quan Hệ & Cloud DB"
  }
};

// Map icon strings to Lucide components with primary cream aesthetic
const iconMap: Record<string, ReactNode> = {
  Code2: <Code2 size={20} className="text-[#DEDBC8]" />,
  Layers: <Layers size={20} className="text-[#DEDBC8]" />,
  Wrench: <Wrench size={20} className="text-[#DEDBC8]" />,
  Database: <Database size={20} className="text-[#DEDBC8]" />
};

export default function Skills() {
  const [selectedGroup, setSelectedGroup] = useState<ArsenalGroup | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto handle escape key to close modal nicely
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedGroup(null);
    };
    if (selectedGroup) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedGroup]);

  return (
    <section
      id="skills"
      className="py-24 bg-black px-4 sm:px-6 md:px-12 relative overflow-hidden border-t border-white/5"
    >
      {/* Subtle fractal noise background */}
      <div className="absolute inset-0 bg-noise opacity-[0.12] pointer-events-none" />

      {/* Background glow ambient highlights */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-[#DEDBC8]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Headers */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="font-mono text-[10px] tracking-widest text-[#DEDBC8] uppercase mb-3">
            TECHNICAL ARSENAL // 02
          </span>
          <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-semibold text-[#E1E0CC] tracking-tight mb-4">
            <WordsPullUp text={data.title} />
          </h2>
          <p className="font-sans text-sm sm:text-base text-gray-400 max-w-xl leading-relaxed" style={{ color: "rgba(225, 224, 204, 0.7)" }}>
            {data.subtitle}
          </p>
        </div>

        {/* 4-Column Card Grid with staggered entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.groups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-[#212121]/30 hover:bg-[#212121]/60 border border-white/5 hover:border-[#DEDBC8]/20 rounded-2xl p-6 transition-all duration-300 flex flex-col items-start text-left liquid-glass"
            >
              {/* Box Heading */}
              <div className="flex items-center gap-2 mb-4 text-slate-200">
                <div className="p-2.5 bg-white/5 rounded-lg border border-white/10 group-hover:bg-[#DEDBC8]/10 group-hover:border-[#DEDBC8]/30 transition-all">
                  {iconMap[group.icon] || <Code2 size={16} />}
                </div>
                <h3 className="font-sans font-semibold text-white text-base tracking-wide group-hover:text-[#DEDBC8] transition-colors">
                  {group.title}
                </h3>
              </div>

              {/* Tag Pills Container */}
              <div className="flex flex-wrap gap-2 w-full mb-6">
                {group.items.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.05, borderColor: "rgba(222, 219, 200, 0.4)", color: "#ffffff" }}
                    className="font-mono text-xs text-gray-300 bg-black/40 border border-white/5 hover:border-[#DEDBC8]/40 px-3 py-1.5 rounded-xl cursor-default transition-all duration-200"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              {/* Click to inspect detailed popup */}
              <button
                onClick={() => setSelectedGroup(group)}
                className="font-mono text-[10px] tracking-wider text-[#DEDBC8]/70 hover:text-white transition-colors duration-250 cursor-pointer mt-auto flex items-center gap-1 group/btn"
              >
                VIEW DETAIL // <ChevronRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Elegant AnimatePresence Popup Details Overlay */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedGroup && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
              
              {/* Backdrop Layer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedGroup(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
              />

              {/* Content Centered Container card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-2xl bg-[#101010] border border-white/10 rounded-3xl p-6 sm:p-10 overflow-hidden liquid-glass shadow-2xl z-10 text-left"
              >
                {/* Subtle noise in about card too */}
                <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />

                {/* Glowing decorative light source */}
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#DEDBC8]/5 blur-[70px] rounded-full pointer-events-none" />

                {/* Exit absolute handler button */}
                <button
                  onClick={() => setSelectedGroup(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-[#DEDBC8] hover:text-white hover:bg-white/15 transition-all duration-200 cursor-pointer"
                >
                  <X size={16} />
                </button>

                {/* Header Title with Custom Icon */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-[#DEDBC8]/10 rounded-2xl border border-[#DEDBC8]/20 flex items-center justify-center">
                    {iconMap[selectedGroup.icon]}
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#DEDBC8]/70 uppercase block mb-1">
                      {categoryExplanations[selectedGroup.id]?.expertiseLevel || "TECHNICAL COMPETENCY"}
                    </span>
                    <h3 className="font-sans font-bold text-white text-xl sm:text-2xl leading-tight">
                      {selectedGroup.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-6 pt-4 border-t border-white/5 relative z-10">
                  {/* Paragraph intro description */}
                  <p className="font-sans text-gray-300 text-sm leading-relaxed" style={{ color: "rgba(225, 224, 204, 0.85)" }}>
                    {categoryExplanations[selectedGroup.id]?.intro}
                  </p>

                  {/* Subskill bullet points */}
                  <div className="space-y-3.5">
                    <h4 className="font-mono text-[10px] tracking-widest text-[#DEDBC8] uppercase mb-2">
                      CORE SPECIALIZATION METRICS :
                    </h4>
                    {categoryExplanations[selectedGroup.id]?.depth.map((d, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="p-1 rounded bg-[#DEDBC8]/10 border border-[#DEDBC8]/30 text-[#DEDBC8] mt-0.5 shrink-0">
                          <Check size={12} />
                        </div>
                        <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
                          {d}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tags bottom badge footer list */}
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                    {selectedGroup.items.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] sm:text-xs text-[#E1E0CC] bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
