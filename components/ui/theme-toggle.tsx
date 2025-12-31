"use client";

import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/hooks";
import { Button } from "./button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        disabled
      >
        <div className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      aria-live="polite"
      className="relative overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -30, opacity: 0, rotate: -90 }}
          animate={{ 
            y: 0, 
            opacity: 1, 
            rotate: 0,
            scale: isHovered ? 1.1 : 1,
          }}
          exit={{ y: 30, opacity: 0, rotate: 90 }}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-yellow-500" aria-hidden="true" />
          ) : (
            <Moon className="h-5 w-5 text-slate-700 dark:text-slate-300" aria-hidden="true" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Animated background effect */}
      <motion.div
        className="absolute inset-0 rounded-md"
        animate={{
          background: isHovered
            ? theme === "dark"
              ? "rgba(250, 204, 21, 0.1)"
              : "rgba(71, 85, 105, 0.1)"
            : "transparent",
        }}
        transition={{ duration: 0.2 }}
      />
    </Button>
  );
}

// Alternative simpler version with scale animation
export function ThemeToggleSimple() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <div className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <motion.div
        initial={false}
        animate={{
          scale: [1, 0.8, 1],
          rotate: theme === "dark" ? 180 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </motion.div>
    </Button>
  );
}

