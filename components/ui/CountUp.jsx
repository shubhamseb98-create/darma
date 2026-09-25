"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

export default function CountUp({
  value,
  duration = 1.8,
  className = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Parse the value string (e.g. "14+", "20,000+", "100%", "4.9 / 5.0")
    const strVal = String(value);
    
    // Check if it's a decimal like "4.9" or "4.9 / 5.0"
    const decimalMatch = strVal.match(/^(\d+\.\d+)(.*)$/);
    if (decimalMatch) {
      const targetNum = parseFloat(decimalMatch[1]);
      const suffix = decimalMatch[2];
      
      const controls = animate(0, targetNum, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(current) {
          setDisplayValue(`${current.toFixed(1)}${suffix}`);
        },
      });
      return () => controls.stop();
    }

    // Integer match like "14+" or "20,000+"
    const intMatch = strVal.replace(/,/g, "").match(/^(\d+)(.*)$/);
    if (intMatch) {
      const targetNum = parseInt(intMatch[1], 10);
      const suffix = intMatch[2];
      const hasComma = strVal.includes(",");

      const controls = animate(0, targetNum, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(current) {
          const rounded = Math.floor(current);
          const formatted = hasComma ? rounded.toLocaleString("en-IN") : String(rounded);
          setDisplayValue(`${formatted}${suffix}`);
        },
      });
      return () => controls.stop();
    }

    // Fallback if no digits found
    setDisplayValue(strVal);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {isInView ? displayValue : "0"}
    </span>
  );
}
