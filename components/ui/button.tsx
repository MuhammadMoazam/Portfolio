import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  animated?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", animated = true, asChild = false, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const shouldAnimate = animated && !prefersReducedMotion;

    const buttonClasses = cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
      {
        "bg-primary text-white hover:bg-primary-600 hover:shadow-lg": variant === "default",
        "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground hover:border-primary":
          variant === "outline",
        "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
        "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg": variant === "destructive",
      },
      {
        "h-10 px-4 py-2": size === "default",
        "h-9 rounded-md px-3": size === "sm",
        "h-11 rounded-md px-8": size === "lg",
        "h-10 w-10": size === "icon",
      },
      className
    );

    if (!shouldAnimate || asChild) {
      return (
        <button
          className={buttonClasses}
          ref={ref}
          {...props}
        />
      );
    }

    // Separate conflicting HTML events from motion props
    const { 
      onDrag, 
      onDragStart, 
      onDragEnd, 
      onAnimationStart, 
      onAnimationEnd,
      onAnimationIteration,
      ...motionSafeProps 
    } = props;
    
    return (
      <motion.button
        className={buttonClasses}
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17,
        }}
        {...motionSafeProps}
      >
        {props.children}
        
        {/* Ripple effect overlay */}
        <motion.span
          className="absolute inset-0 bg-white/20"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };

