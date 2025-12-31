"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  icon?: LucideIcon;
  variant?: "default" | "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function TechBadge({
  name,
  icon: Icon,
  variant = "default",
  size = "sm",
  className,
}: TechBadgeProps) {
  const variants = {
    default: "bg-muted text-foreground-secondary border-border",
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary/10 text-secondary border-secondary/20",
    outline: "bg-transparent text-foreground border-border",
  };

  const sizes = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  return (
    <motion.span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors",
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {Icon && <Icon className="h-3 w-3" />}
      {name}
    </motion.span>
  );
}

interface TechBadgeGroupProps {
  technologies: string[];
  limit?: number;
  variant?: "default" | "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function TechBadgeGroup({
  technologies,
  limit,
  variant = "default",
  size = "sm",
  className,
}: TechBadgeGroupProps) {
  const displayTechs = limit ? technologies.slice(0, limit) : technologies;
  const remaining = limit && technologies.length > limit ? technologies.length - limit : 0;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {displayTechs.map((tech, index) => (
        <motion.div
          key={tech}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <TechBadge name={tech} variant={variant} size={size} />
        </motion.div>
      ))}
      {remaining > 0 && (
        <TechBadge
          name={`+${remaining}`}
          variant={variant}
          size={size}
          className="opacity-60"
        />
      )}
    </div>
  );
}



