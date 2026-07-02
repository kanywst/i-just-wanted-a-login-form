import { m, useScroll, useSpring } from 'framer-motion';
import type { ReactNode } from 'react';

const defaultContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export function Section({ children, className = '' }: SectionProps) {
  return (
    <m.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px 0px" }}
      variants={defaultContainer}
      className={`min-h-screen flex flex-col justify-center items-center py-32 px-4 ${className}`}
    >
      {children}
    </m.section>
  );
}

// Progress bar for the overall site
export function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <m.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 bg-(--color-terminal) origin-left z-50 mix-blend-difference"
    />
  );
}
