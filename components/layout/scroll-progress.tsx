"use client";

import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollProgressProps {
  color?: string;
  height?: string;
  position?: "top" | "bottom";
  showPercentage?: boolean;
}

export function ScrollProgress({
  color = "bg-primary",
  height = "h-1",
  position = "top",
  showPercentage = false,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  
  // Add spring physics for smooth animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className={`fixed ${position === "top" ? "top-0" : "bottom-0"} left-0 right-0 ${height} ${color} origin-left z-50`}
        style={{ scaleX }}
      />
      
      {showPercentage && (
        <motion.div
          className="fixed top-20 right-8 z-50 px-3 py-1 rounded-full bg-primary text-white text-xs font-medium shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            opacity: scrollYProgress,
          }}
        >
          <motion.span>
            {Math.round(scrollYProgress.get() * 100)}%
          </motion.span>
        </motion.div>
      )}
    </>
  );
}

// Alternative gradient version
export function ScrollProgressGradient({
  height = "h-1",
  position = "top",
}: Omit<ScrollProgressProps, "color">) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={`fixed ${position === "top" ? "top-0" : "bottom-0"} left-0 right-0 ${height} bg-gradient-to-r from-primary via-secondary to-primary origin-left z-50`}
      style={{ scaleX }}
    />
  );
}

// Circular progress indicator
export function ScrollProgressCircular() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed bottom-8 left-8 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        opacity: scrollYProgress,
      }}
    >
      <svg width="60" height="60" viewBox="0 0 60 60">
        {/* Background circle */}
        <circle
          cx="30"
          cy="30"
          r="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-muted"
        />
        {/* Progress circle */}
        <motion.circle
          cx="30"
          cy="30"
          r="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="text-primary"
          style={{
            pathLength: scrollYProgress,
            rotate: -90,
            transformOrigin: "center",
          }}
          strokeDasharray="0 1"
        />
        {/* Percentage text */}
        <motion.text
          x="30"
          y="30"
          textAnchor="middle"
          dy=".3em"
          className="text-xs font-medium fill-foreground"
        >
          {Math.round(scrollYProgress.get() * 100)}%
        </motion.text>
      </svg>
    </motion.div>
  );
}



