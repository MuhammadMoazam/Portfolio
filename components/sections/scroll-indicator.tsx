"use client";

import { motion } from "framer-motion";
import { ChevronDown, MousePointerClick } from "lucide-react";

interface ScrollIndicatorProps {
  onClick?: () => void;
  variant?: "arrow" | "mouse" | "text";
}

export function ScrollIndicator({ onClick, variant = "arrow" }: ScrollIndicatorProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  if (variant === "mouse") {
    return (
      <motion.button
        onClick={handleClick}
        className="flex flex-col items-center gap-3 text-foreground-secondary hover:text-primary transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        aria-label="Scroll down"
      >
        <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-2 bg-current rounded-full"
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <span className="text-xs font-medium">Scroll Down</span>
      </motion.button>
    );
  }

  if (variant === "text") {
    return (
      <motion.button
        onClick={handleClick}
        className="flex flex-col items-center gap-2 text-foreground-secondary hover:text-primary transition-colors cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        aria-label="Scroll to explore"
      >
        <span className="text-sm font-medium">Explore More</span>
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="h-5 w-5 group-hover:text-primary" />
        </motion.div>
      </motion.button>
    );
  }

  // Default arrow variant
  return (
    <motion.button
      onClick={handleClick}
      className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-foreground-secondary hover:border-primary text-foreground-secondary hover:text-primary transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Scroll down"
    >
      <motion.div
        animate={{
          y: [0, 4, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </motion.button>
  );
}

// Animated dots variant
export function ScrollIndicatorDots() {
  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-foreground-secondary"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}



