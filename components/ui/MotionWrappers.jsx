"use client";

import { motion } from "framer-motion";

export const agencyEase = [0.16, 1, 0.3, 1];

// Slide up and settle with spring / cubic-bezier
export function SlideUp({ children, delay = 0, yOffset = 35, duration = 0.7, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, ease: agencyEase, delay }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Slide down and settle
export function SlideDown({ children, delay = 0, yOffset = -30, duration = 0.7, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, ease: agencyEase, delay }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Slide in from left
export function SlideInLeft({ children, delay = 0, xOffset = -40, duration = 0.7, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, ease: agencyEase, delay }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Slide in from right
export function SlideInRight({ children, delay = 0, xOffset = 40, duration = 0.7, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, ease: agencyEase, delay }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Zoom in and settle
export function ZoomIn({ children, delay = 0, initialScale = 0.92, duration = 0.75, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: initialScale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, ease: agencyEase, delay }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Pure Fade In
export function FadeIn({ children, delay = 0, duration = 0.7, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger Container for parent grids/lists
export function StaggerContainer({ children, stagger = 0.1, delay = 0, className = "" }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger item that slides up
export function StaggerItemSlide({ children, yOffset = 35, duration = 0.65, className = "" }) {
  const itemVariants = {
    hidden: { opacity: 0, y: yOffset },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: agencyEase,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={`will-change-transform ${className}`}>
      {children}
    </motion.div>
  );
}

// Stagger item that zooms in
export function StaggerItemZoom({ children, initialScale = 0.92, duration = 0.65, className = "" }) {
  const itemVariants = {
    hidden: { opacity: 0, scale: initialScale },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration,
        ease: agencyEase,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={`will-change-transform ${className}`}>
      {children}
    </motion.div>
  );
}
