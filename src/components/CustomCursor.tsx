import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Direct mouse coordinates (zero lag for the arrow tip)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring for subtle ambient halo/aura behind cursor
  const auraX = useSpring(mouseX, { damping: 30, stiffness: 400, mass: 0.1 });
  const auraY = useSpring(mouseY, { damping: 30, stiffness: 400, mass: 0.1 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Track hover on interactive elements
    const updateHoverState = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, .cursor-pointer"
      );

      const onEnter = () => setHovered(true);
      const onLeave = () => setHovered(false);

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });

      return () => {
        interactiveElements.forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
      };
    };

    const cleanupHover = updateHoverState();
    const observer = new MutationObserver(updateHoverState);
    observer.observe(document.body, { childList: true, subtree: true });

    // Hide default OS cursor on desktop
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
      @media (min-width: 768px) {
        body, a, button, [role='button'], input, textarea, select, .cursor-pointer {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cleanupHover();
      observer.disconnect();
      document.head.removeChild(styleEl);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999] select-none">
      {/* Subtle glowing aura trailing the cursor */}
      <motion.div
        style={{
          x: auraX,
          y: auraY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hovered ? 1.6 : 1.0,
          opacity: hovered ? 0.35 : 0.15,
        }}
        transition={{ duration: 0.2 }}
        className="w-8 h-8 rounded-full bg-[#DEDBC8] blur-[10px] absolute pointer-events-none"
      />

      {/* Normal Arrow Cursor with sleek aesthetic */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          // Position the tip of the arrow exactly at the mouse point (offset to apex)
          translateX: "-1px",
          translateY: "-1px",
        }}
        animate={{
          scale: isClicking ? 0.9 : hovered ? 1.12 : 1.0,
          rotate: hovered ? -6 : 0,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="absolute pointer-events-none"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_8px_rgba(222,219,200,0.35)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
        >
          <defs>
            <linearGradient id="cursorGradient" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#E5E2D1" />
              <stop offset="100%" stopColor="#DEDBC8" />
            </linearGradient>
          </defs>

          {/* Precision arrow cursor body */}
          <path
            d="M2.5 2L9.5 20.5L13 13.5L20 10L2.5 2Z"
            fill="url(#cursorGradient)"
            stroke="#121212"
            strokeWidth="1.6"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Inner subtle high-tech accent line */}
          <path
            d="M5.5 5.5L11.5 12"
            stroke="#121212"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.3"
          />
        </svg>
      </motion.div>
    </div>
  );
}

