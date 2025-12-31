"use client";

import { motion, MotionProps } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { forwardRef, ComponentPropsWithoutRef, ElementType } from "react";

/**
 * Accessible motion wrapper that respects prefers-reduced-motion
 * Automatically disables animations when user prefers reduced motion
 */

type AccessibleMotionProps<T extends ElementType> = MotionProps & 
  ComponentPropsWithoutRef<T> & {
    as?: T;
  };

export const AccessibleMotion = forwardRef<HTMLElement, AccessibleMotionProps<"div">>(
  ({ as: Component = "div", animate, initial, exit, transition, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const MotionComponent = motion[Component as keyof typeof motion] as any;

    if (prefersReducedMotion) {
      // Disable animations
      return (
        <MotionComponent
          ref={ref}
          {...props}
          initial={false}
          animate={undefined}
          exit={undefined}
          transition={{ duration: 0 }}
        />
      );
    }

    // Normal animations
    return (
      <MotionComponent
        ref={ref}
        animate={animate}
        initial={initial}
        exit={exit}
        transition={transition}
        {...props}
      />
    );
  }
);

AccessibleMotion.displayName = "AccessibleMotion";

/**
 * Utility function to get animation variants based on reduced motion preference
 */
export function getAccessibleVariants<T extends Record<string, any>>(
  variants: T,
  reducedMotion: boolean
): T {
  if (!reducedMotion) return variants;

  // Create reduced motion variants
  const reducedVariants = {} as T;
  for (const key in variants) {
    reducedVariants[key] = {
      ...variants[key],
      transition: { duration: 0 },
      // Remove movement properties
      x: undefined,
      y: undefined,
      scale: 1,
      rotate: 0,
    };
  }
  return reducedVariants;
}

/**
 * Utility function to get transition based on reduced motion preference
 */
export function getAccessibleTransition(
  transition: any,
  reducedMotion: boolean
): any {
  if (!reducedMotion) return transition;
  return { duration: 0 };
}



