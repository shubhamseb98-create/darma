"use client";

import { motion } from "framer-motion";

export default function SplitText({
  children,
  className = "",
  wordClassName = "",
  stagger = 0.04,
  delay = 0,
  tag = "h2",
}) {
  // If children is a string, split into words; if it's already elements, render cleanly
  const text = typeof children === "string" ? children : "";

  if (!text) {
    const Tag = tag;
    return <Tag className={className}>{children}</Tag>;
  }

  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: "110%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const MotionTag = motion[tag] || motion.div;

  return (
    <MotionTag
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top mr-[0.28em] last:mr-0">
          <motion.span variants={wordVariants} className={`inline-block ${wordClassName}`}>
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
