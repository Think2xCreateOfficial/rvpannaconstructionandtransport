import { type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

interface MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export const EASING_ARCHITECTURAL = [0.22, 1, 0.36, 1] as const;

/**
 * Subtle slide-in from left with opacity transition.
 */
export function SlideInLeft({ children, className = "", delay = 0, duration = 0.5 }: MotionProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration, delay, ease: EASING_ARCHITECTURAL }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Subtle slide-in from right with opacity transition.
 */
export function SlideInRight({ children, className = "", delay = 0, duration = 0.5 }: MotionProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration, delay, ease: EASING_ARCHITECTURAL }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered horizontal container for grids/galleries.
 */
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerHorizontalContainer({
  children,
  className = "",
  staggerDelay = 0.12,
}: StaggerContainerProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger item child.
 */
export function StaggerHorizontalItem({
  children,
  className = "",
  direction = "left",
}: {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "up";
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = direction === "left" ? -20 : direction === "right" ? 20 : 0;
  const yOffset = direction === "up" ? 16 : 0;

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: offset, y: yOffset },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: EASING_ARCHITECTURAL,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
