import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { ExternalLink, ArrowRight, X, CheckCircle, GraduationCap, ShoppingBag, Shield, Copy, Check, KeyRound } from "lucide-react";
import contentData from "../data/contentData.json";
import { FeaturedProjectsSection, ProjectItem } from "../types";
import { WordsPullUp } from "./AnimateText";

const data = (contentData as any).featuredProjects as FeaturedProjectsSection;

// Highly professional, detailed project case studies in Vietnamese
const projectDetails: Record<string, { challenge: string; solution: string; outcome: string; duration: string; role: string }> = {
    "truyen-cloud": {
    challenge: "Xây dựng hệ thống đọc truyện trực tuyến có khả năng tự động cào và đồng bộ dữ liệu chương mới từ MangaDex, kiểm soát tải truy cập chống spam API và quản lý phiên người dùng linh hoạt với cơ sở dữ liệu Document.",
    solution: "Sử dụng Spring Boot kết hợp Spring Data MongoDB để tối ưu hóa lưu trữ dữ liệu truyện, chương và lịch sử hoạt động[cite: 8]. Xây dựng MangadexImportService cùng StoryScheduler để tự động cào dữ liệu định kỳ[cite: 8]. Triển khai RateLimiterFilter và RedisTokenService trên Redis để giới hạn tần suất request và quản lý blacklist token[cite: 8]. Đóng gói toàn bộ hệ thống bằng Docker Compose[cite: 8].",
    outcome: "Hệ thống vận hành trơn tru với mô hình NoSQL linh hoạt, cào và đồng bộ dữ liệu truyện tự động định kỳ, bảo vệ an toàn các endpoint API và dễ dàng triển khai với một lệnh docker-compose duy nhất[cite: 8].",
    duration: "3 Tháng",
    role: "Backend Developer"
  },
  "vintage-project": {
    challenge: "Thiết kế luồng mua sắm mượt mà, quản lý tồn kho chính xác dưới tải cao, tối ưu hóa các luồng dữ liệu truy hồi bất đồng bộ từ client và tự động hóa quy trình phân phối sản phẩm.",
    solution: "Sử dụng Spring Boot xây dựng RESTful APIs hiệu năng cao. Phối hợp Angular & RxJS xử lý bất đồng bộ triệt tiêu giật lag UI và tích hợp MySQL. Thiết lập quy trình CI/CD tự động bằng Jenkins và Docker.",
    outcome: "Đơn hàng và giỏ hàng xử lý mượt mà, đồng hành cùng dashboard quản trị trực quan. Triển khai phân phối tự động chỉ trong vài phút, tối ưu hóa tối đa chi phí vận hành hạ tầng.",
    duration: "4 Tháng",
    role: "Full-stack Developer & DevOps Engineer"
  }
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Bind escape key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="py-24 bg-black px-4 sm:px-6 md:px-12 relative overflow-hidden border-t border-white/5"
    >
      {/* Fractal noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.06] pointer-events-none" />

      {/* Glow spots */}
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-[#DEDBC8]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Elegant Section line header */}
        <div className="flex flex-col items-start gap-2 mb-4">
          <span className="font-mono text-[10px] tracking-widest text-[#DEDBC8] uppercase">
            COLLECTION // 03
          </span>
          <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-semibold text-[#E1E0CC] tracking-tight">
            <WordsPullUp text={data.title} />
          </h2>
          <div className="h-[1px] bg-[#DEDBC8]/10 w-full mt-2" />
        </div>

        <p className="font-sans text-gray-400 text-sm sm:text-base leading-relaxed mb-16 max-w-2xl" style={{ color: "rgba(225, 224, 204, 0.7)" }}>
          {data.subtitle}
        </p>

        {/* Custom Layout Grid using style guidelines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data.projects.map((project, index) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#212121]/30 border border-white/5 rounded-[2rem] overflow-hidden flex flex-col liquid-glass"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden group aspect-video lg:aspect-[16/10] bg-zinc-900 border-b border-white/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                {/* Info Text Block */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Header line with decorative icon if appropriate */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-2.5">
                        {project.id === "sis-project" && (
                          <GraduationCap className="w-5 h-5 text-[#DEDBC8]" />
                        )}
                        {project.id === "vintage-project" && (
                          <ShoppingBag className="w-5 h-5 text-[#DEDBC8]" />
                        )}
                        {project.id === "websecai-project" && (
                          <Shield className="w-5 h-5 text-[#DEDBC8]" />
                        )}
                        <h3 className="font-sans text-lg sm:text-xl font-semibold text-white tracking-wide hover:text-[#DEDBC8] transition-colors cursor-pointer" onClick={() => setSelectedProject(project)}>
                          {project.title}
                        </h3>
                      </div>

                      {/* Pill Tags with warm styling */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] sm:text-xs font-semibold tracking-wide text-[#E1E0CC] bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="font-sans text-gray-400 text-xs sm:text-sm leading-relaxed mb-6" style={{ color: "rgba(225, 224, 204, 0.65)" }}>
                      {project.description}
                    </p>
                  </div>

                  {/* Standardized Detail Action Footer for all cards */}
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-semibold text-[#DEDBC8] hover:text-white transition-colors group cursor-pointer bg-transparent border-none p-0"
                    >
                      VIEW CASE STUDY // DETAIL
                      <ArrowRight size={14} className="rotate-[-45deg] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Case Study Details popup with smooth GSAP-consistent AnimatePresence reveals */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">

              {/* Dark blur backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
              />

              {/* Modal Body */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-3xl bg-[#101010] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl z-10 text-left flex flex-col max-h-[90vh]"
              >
                {/* Custom subtle background textures */}
                <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none" />

                {/* Close Button top-right corner */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-black/50 border border-white/10 text-[#DEDBC8] hover:text-white hover:bg-white/10 transition-all cursor-pointer z-20"
                >
                  <X size={16} />
                </button>

                {/* Scrollable region of modal */}
                <div className="overflow-y-auto w-full p-6 sm:p-10 space-y-8">

                  {/* Banner / Header Image inside the modal */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[21/9] bg-zinc-950 border border-white/5">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    {/* Dynamic absolute title overlay inside banner */}
                    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-6">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {selectedProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[9px] tracking-wider text-black bg-[#DEDBC8] px-2 py-0.5 rounded-md font-bold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-serif italic text-xl sm:text-3xl font-bold text-white drop-shadow-md">
                        {selectedProject.title}
                      </h3>
                    </div>
                  </div>

                  {/* Main Case Study Core columns */}
                  <div className="space-y-8">

                    {/* Key features display section if present */}
                    {selectedProject.features && selectedProject.features.length > 0 ? (
                      <div className="space-y-4">
                        <span className="font-mono text-[9px] tracking-widest text-[#DEDBC8] uppercase block font-bold">
                          KEY FEATURES // TÍNH NĂNG CHÍNH
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedProject.features.map((feature: any, fIdx: number) => (
                            <div key={fIdx} className="p-5 rounded-2xl bg-[#212121]/20 border border-white/5 space-y-2 hover:border-[#DEDBC8]/10 hover:bg-[#212121]/40 transition-all duration-300">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[9px] font-bold text-[#DEDBC8] bg-[#DEDBC8]/10 border border-[#DEDBC8]/20 px-2 py-0.5 rounded-md">
                                  0{fIdx + 1}
                                </span>
                                <h4 className="font-sans text-xs sm:text-sm font-bold text-white tracking-wide">
                                  {feature.title}
                                </h4>
                              </div>
                              <p className="font-sans text-xs text-gray-400 leading-relaxed" style={{ color: "rgba(225, 224, 204, 0.6)" }}>
                                {feature.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Row: Challenge */}
                        <div className="flex gap-4 items-start border-l-2 border-[#DEDBC8]/20 pl-4">
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] tracking-widest text-[#DEDBC8] uppercase block font-bold">
                              CHALLENGE // THÁCH THỨC KỸ THUẬT
                            </span>
                            <p className="font-sans text-sm text-gray-300 leading-relaxed">
                              {projectDetails[selectedProject.id]?.challenge || selectedProject.description}
                            </p>
                          </div>
                        </div>

                        {/* Row: Solution */}
                        <div className="flex gap-4 items-start border-l-2 border-[#DEDBC8]/40 pl-4">
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] tracking-widest text-[#DEDBC8] uppercase block font-bold">
                              SOLUTION // PHƯƠNG ÁN GIẢI QUYẾT
                            </span>
                            <p className="font-sans text-sm text-gray-300 leading-relaxed">
                              {projectDetails[selectedProject.id]?.solution || "Nghiên cứu sâu tài liệu, áp dụng các thiết kế mẫu tiêu chuẩn (design patterns) và phát triển các khối mã nguồn mở tương thích tối đa."}
                            </p>
                          </div>
                        </div>

                        {/* Row: Outcome */}
                        <div className="flex gap-4 items-start border-l-2 border-[#DEDBC8] pl-4">
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] tracking-widest text-[#DEDBC8] uppercase block font-bold">
                              OUTCOME // KẾT QUẢ ĐẠT ĐƯỢC
                            </span>
                            <p className="font-sans text-sm text-gray-300 leading-relaxed flex items-center gap-2">
                              <CheckCircle size={14} className="text-[#DEDBC8] shrink-0" />
                              {projectDetails[selectedProject.id]?.outcome || "Vận hành ổn định, cấu trúc mã sạch đạt chuẩn bảo mật và tích hợp mượt mà."}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tech Stack items in a wrap layout */}
                    {selectedProject.techStack && (
                      <div className="space-y-3">
                        <span className="font-mono text-[9px] tracking-widest text-[#DEDBC8] uppercase block font-bold">
                          TECHNOLOGIES // CÔNG NGHỆ SỬ DỤNG
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.techStack.map((tech: string) => (
                            <span
                              key={tech}
                              className="font-mono text-[10px] font-semibold tracking-wide text-[#E1E0CC] bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg hover:border-[#DEDBC8]/30 transition-all duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Demo Accounts section if present */}
                    {selectedProject.accounts && selectedProject.accounts.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] tracking-widest text-[#DEDBC8] uppercase block font-bold flex items-center gap-1.5">
                            <KeyRound size={12} className="text-[#DEDBC8]" />
                            DEMO ACCOUNTS // TÀI KHOẢN TRẢI NGHIỆM
                          </span>
                          <span className="font-mono text-[9px] text-[#DEDBC8]/60">
                            Click vào để sao chép
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {selectedProject.accounts.map((acc: any, aIdx: number) => (
                            <div
                              key={aIdx}
                              className="p-4 rounded-xl bg-[#212121]/30 border border-white/10 flex flex-col justify-between gap-3 hover:border-[#DEDBC8]/30 hover:bg-[#212121]/50 transition-all duration-300"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-[10px] font-bold text-black bg-[#DEDBC8] px-2.5 py-0.5 rounded-md uppercase tracking-wide">
                                  {acc.role}
                                </span>
                              </div>

                              <div className="space-y-2 text-xs font-mono">
                                {/* Username copy row */}
                                <button
                                  type="button"
                                  onClick={() => handleCopy(acc.username, `user-${aIdx}`)}
                                  className="w-full flex items-center justify-between p-2 rounded-lg bg-black/50 border border-white/5 hover:border-[#DEDBC8]/30 group transition-all text-left cursor-pointer"
                                  title="Click để sao chép tài khoản"
                                >
                                  <div className="truncate mr-1 min-w-0">
                                    <span className="text-gray-500 text-[9px] uppercase tracking-wider block">TK</span>
                                    <span className="text-[#E1E0CC] truncate block text-[11px] font-mono">{acc.username}</span>
                                  </div>
                                  {copiedKey === `user-${aIdx}` ? (
                                    <span className="flex items-center gap-1 text-green-400 text-[10px] shrink-0 font-sans">
                                      <Check size={12} /> Đã chép
                                    </span>
                                  ) : (
                                    <Copy size={12} className="text-gray-500 group-hover:text-[#DEDBC8] shrink-0 transition-colors" />
                                  )}
                                </button>

                                {/* Password copy row */}
                                <button
                                  type="button"
                                  onClick={() => handleCopy(acc.password, `pass-${aIdx}`)}
                                  className="w-full flex items-center justify-between p-2 rounded-lg bg-black/50 border border-white/5 hover:border-[#DEDBC8]/30 group transition-all text-left cursor-pointer"
                                  title="Click để sao chép mật khẩu"
                                >
                                  <div className="truncate mr-1 min-w-0">
                                    <span className="text-gray-500 text-[9px] uppercase tracking-wider block">MK</span>
                                    <span className="text-[#E1E0CC] block text-[11px] font-mono">{acc.password}</span>
                                  </div>
                                  {copiedKey === `pass-${aIdx}` ? (
                                    <span className="flex items-center gap-1 text-green-400 text-[10px] shrink-0 font-sans">
                                      <Check size={12} /> Đã chép
                                    </span>
                                  ) : (
                                    <Copy size={12} className="text-gray-500 group-hover:text-[#DEDBC8] shrink-0 transition-colors" />
                                  )}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Footer interactive actions inside modal with link demo / github */}
                  {(selectedProject.demoUrl || selectedProject.githubUrl) && (
                    <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-4">
                      {selectedProject.demoUrl && (
                        <a
                          href={selectedProject.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-6 py-3 rounded-full border border-[#DEDBC8]/30 hover:border-[#DEDBC8] bg-[#DEDBC8]/10 hover:bg-[#DEDBC8] text-[#DEDBC8] hover:text-black transition-all cursor-pointer inline-flex items-center justify-center gap-2 font-mono text-xs font-bold tracking-widest uppercase shadow-lg shadow-black/40 group"
                        >
                          <ExternalLink size={14} className="group-hover:scale-110 transition-transform" />
                          {selectedProject.demoButtonText || "TRẢI NGHIỆM HỆ THỐNG // LIVE DEMO"}
                        </a>
                      )}
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-6 py-3 rounded-full border border-white/20 hover:border-[#DEDBC8] bg-white/5 hover:bg-white/15 text-[#E1E0CC] hover:text-[#DEDBC8] transition-all cursor-pointer inline-flex items-center justify-center gap-2 font-mono text-xs font-bold tracking-widest uppercase shadow-lg shadow-black/40 group"
                        >
                          <ExternalLink size={14} className="group-hover:scale-110 transition-transform" />
                          SOURCE CODE GITHUB
                        </a>
                      )}
                    </div>
                  )}

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
