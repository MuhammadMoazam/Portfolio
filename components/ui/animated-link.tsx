"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface AnimatedLinkProps extends ComponentPropsWithoutRef<"a"> {
  href: string;
  variant?: "underline" | "scale" | "glow" | "slide";
  children: React.ReactNode;
}

/**
 * Animated link with various hover effects
 */
export function AnimatedLink({
  href,
  variant = "underline",
  className,
  children,
  ...props
}: AnimatedLinkProps) {
  const prefersReducedMotion = useReducedMotion();
  const isExternal = href.startsWith("http");

  const Component = isExternal ? "a" : Link;
  const linkProps = isExternal
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  if (prefersReducedMotion) {
    return (
      <Component
        {...linkProps}
        {...props}
        className={cn(
          "transition-colors hover:text-primary",
          variant === "underline" && "underline underline-offset-4",
          className
        )}
      >
        {children}
      </Component>
    );
  }

  return (
    <motion.div className="inline-block" whileHover={variant === "scale" ? { scale: 1.05 } : undefined}>
      <Component
        {...linkProps}
        {...props}
        className={cn("relative inline-block", className)}
      >
        {children}
        
        {/* Underline animation */}
        {variant === "underline" && (
          <motion.span
            className="absolute left-0 bottom-0 h-[2px] bg-primary"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        )}

        {/* Slide animation */}
        {variant === "slide" && (
          <motion.span
            className="absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0, x: 0 }}
            whileHover={{ width: "100%", x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        )}

        {/* Glow animation */}
        {variant === "glow" && (
          <motion.span
            className="absolute inset-0 -z-10 bg-primary/20 blur-lg rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </Component>
    </motion.div>
  );
}

/**
 * Underline animation component for text
 */
export function UnderlineAnimation({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <span className={cn("relative inline-block group", className)}>
      {children}
      <motion.span
        className="absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-primary to-secondary"
        initial={{ width: 0 }}
        animate={prefersReducedMotion ? {} : undefined}
        whileHover={prefersReducedMotion ? {} : { width: "100%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </span>
  );
}



