"use client";

import { motion } from "framer-motion";

interface AnimatedUnderlineProps {
  children: React.ReactNode;
  className?: string;
  underlineColor?: string;
}

export function AnimatedUnderline({
  children,
  className = "",
  underlineColor = "bg-primary",
}: AnimatedUnderlineProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      {children}
      <motion.div
        className={`absolute bottom-0 left-0 h-1 ${underlineColor} rounded-full`}
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}

// Gradient variant
export function AnimatedUnderlineGradient({
  children,
  className = "",
}: Omit<AnimatedUnderlineProps, "underlineColor">) {
  return (
    <div className={`relative inline-block ${className}`}>
      {children}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}



