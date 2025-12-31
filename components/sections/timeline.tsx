"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TimelineDotProps {
  index: number;
  isActive?: boolean;
}

export function TimelineDot({ index, isActive = false }: TimelineDotProps) {
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 z-10"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
    >
      {/* Outer Ring with Pulse */}
      <motion.div
        className={cn(
          "h-6 w-6 rounded-full border-4 flex items-center justify-center",
          isActive
            ? "border-primary bg-primary shadow-lg shadow-primary/50"
            : "border-primary bg-background"
        )}
        animate={
          isActive
            ? {
                boxShadow: [
                  "0 0 0 0 rgba(var(--primary), 0.7)",
                  "0 0 0 10px rgba(var(--primary), 0)",
                ],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Inner Dot */}
        <motion.div
          className={cn(
            "h-2 w-2 rounded-full",
            isActive ? "bg-white" : "bg-primary"
          )}
          animate={
            isActive
              ? {
                  scale: [1, 1.2, 1],
                }
              : {}
          }
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

interface AnimatedTimelineProps {
  itemCount: number;
  className?: string;
}

export function AnimatedTimeline({ itemCount, className }: AnimatedTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  // Transform scroll progress to line height
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Background Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-border" />

      {/* Animated Progress Line */}
      <motion.div
        className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-secondary to-primary origin-top"
        style={{ height: lineHeight }}
      >
        {/* Glowing Tip */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-primary shadow-lg shadow-primary/50"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}



