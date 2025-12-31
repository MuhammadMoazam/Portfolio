"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverRotate?: number;
  glowEffect?: boolean;
  liftEffect?: boolean;
}

/**
 * Animated card with hover effects
 * Features: scale, lift, glow, shadow
 */
export function AnimatedCard({
  children,
  className = "",
  hoverScale = 1.02,
  hoverRotate = 0,
  glowEffect = false,
  liftEffect = true,
}: AnimatedCardProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={cn("transition-shadow hover:shadow-lg", className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn("relative", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{
        scale: hoverScale,
        rotate: hoverRotate,
        y: liftEffect ? -8 : 0,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      style={{
        boxShadow: liftEffect
          ? "0 4px 6px -1px rgb(0 0 0 / 0.1)"
          : undefined,
      }}
    >
      {children}
      
      {/* Glow effect */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl rounded-lg opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}

/**
 * Card with tilt effect on hover
 */
export function TiltCard({
  children,
  className = "",
  maxTilt = 10,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("relative", className)}
      whileHover={{
        rotateX: maxTilt,
        rotateY: maxTilt,
        transition: { duration: 0.3 },
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Card with gradient border animation on hover
 */
export function GradientBorderCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("relative p-[2px] rounded-lg bg-gradient-to-r from-primary to-secondary", className)}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              scale: 1.02,
              boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
            }
      }
      transition={{ duration: 0.3 }}
    >
      <div className="bg-background rounded-lg h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}

/**
 * Card with shine effect on hover
 */
export function ShineCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
    >
      {children}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{
            x: "100%",
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
        />
      )}
    </motion.div>
  );
}



