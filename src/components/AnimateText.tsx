import { motion, type Variants } from "motion/react";

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}

export function WordsPullUp({ text, className = "", showAsterisk = false }: WordsPullUpProps) {
  const words = text.split(" ");
  
  const containerVars = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  } satisfies Variants;

  const wordVars = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.16, 1, 0.3, 1] as const,
        duration: 0.8,
      },
    },
  } satisfies Variants;

  return (
    <motion.span
      className={`inline-flex flex-wrap justify-center ${className}`}
      variants={containerVars}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {words.map((word, idx) => {
        const isLastWord = idx === words.length - 1;
        return (
          <motion.span
            key={idx}
            className={`inline-block relative ${!isLastWord ? "mr-[0.25em]" : ""}`}
            variants={wordVars}
          >
            {word}
            {isLastWord && showAsterisk && (
              <span className="absolute top-[0.1em] -right-[0.3em] text-[0.41em] text-[#DEDBC8] font-normal">
                *
              </span>
            )}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
}

export function WordsPullUpMultiStyle({ segments, className = "" }: WordsPullUpProps & { segments: Segment[] }) {
  const containerVars = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  } satisfies Variants;

  const wordVars = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.16, 1, 0.3, 1] as const,
        duration: 0.7,
      },
    },
  } satisfies Variants;

  return (
    <motion.div
      className={`inline-flex flex-wrap justify-center ${className}`}
      variants={containerVars}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {segments.map((segment, segIdx) => {
        const words = segment.text.split(" ");
        return words.map((word, wordIdx) => (
          <motion.span
            key={`${segIdx}-${wordIdx}`}
            variants={wordVars}
            className={`inline-block mr-[0.25em] ${segment.className || ""}`}
          >
            {word}
          </motion.span>
        ));
      })}
    </motion.div>
  );
}
