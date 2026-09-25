"use client";

import { motion } from "framer-motion";

export default function AnimatedCheckmark({
  size = 64,
  strokeWidth = 3.5,
  color = "#C74B4A",
  className = "",
}) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Animated Circle */}
        <motion.circle
          cx="26"
          cy="26"
          r="24"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
        />

        {/* Animated Checkmark Path */}
        <motion.path
          d="M15 27L22.5 34.5L37 19"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </div>
  );
}
