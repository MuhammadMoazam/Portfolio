"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { LucideIcon, Code2 } from "lucide-react";
import Image from "next/image";

interface SkillCardProps {
  name: string;
  icon: any; // Can be a Lucide icon, ComponentType, or URL string
  proficiency: number; // 0-100
  category: string;
  yearsOfExperience?: number;
  delay?: number;
  variant?: "progress" | "radial";
}

export function SkillCard({
  name,
  icon,
  proficiency,
  category,
  yearsOfExperience,
  delay = 0,
  variant = "progress",
}: SkillCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [showTooltip, setShowTooltip] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Check if icon is a string (URL) or a component
  const isIconUrl = typeof icon === "string";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        delay,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      onHoverStart={() => setShowTooltip(true)}
      onHoverEnd={() => setShowTooltip(false)}
      className="relative group"
    >
      <div className="relative glass-effect p-4 sm:p-6 rounded-xl border border-border hover:border-primary transition-all overflow-hidden">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Animated glow ring */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          initial={{ opacity: 0 }}
          whileHover={{
            opacity: [0, 0.5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          style={{
            boxShadow: "0 0 20px rgba(var(--primary), 0.5)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 space-y-3 sm:space-y-4">
          {/* Icon & Name */}
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div
              className="p-2 sm:p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              {isIconUrl ? (
                imageError ? (
                  <Code2 className="h-6 w-6 text-primary" />
                ) : (
                  <Image
                    src={icon as string}
                    alt={`${name} icon`}
                    width={20}
                    height={20}
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    onError={() => setImageError(true)}
                  />
                )
              ) : (
                (() => {
                  const IconComponent = icon as LucideIcon;
                  return <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />;
                })()
              )}
            </motion.div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors truncate">
                {name}
              </h3>
              <p className="text-xs text-foreground-secondary capitalize">
                {category}
              </p>
            </div>
          </div>

          {/* Proficiency Display */}
          {variant === "progress" ? (
            <ProgressBar proficiency={proficiency} isInView={isInView} delay={delay} />
          ) : (
            <RadialProgress proficiency={proficiency} isInView={isInView} delay={delay} />
          )}
        </div>

        {/* Tooltip */}
        {yearsOfExperience && showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-foreground text-background text-sm font-medium rounded-lg shadow-lg whitespace-nowrap z-20"
          >
            {yearsOfExperience} {yearsOfExperience === 1 ? "year" : "years"} experience
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-foreground" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// Progress Bar Component
function ProgressBar({
  proficiency,
  isInView,
  delay,
}: {
  proficiency: number;
  isInView: boolean;
  delay: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-foreground-secondary">Proficiency</span>
        <motion.span
          className="font-semibold text-primary"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.3 }}
        >
          {proficiency}%
        </motion.span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${proficiency}%` } : {}}
          transition={{
            delay: delay + 0.2,
            duration: 1,
            ease: "easeOut",
          }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

// Radial Progress Component
function RadialProgress({
  proficiency,
  isInView,
  delay,
}: {
  proficiency: number;
  isInView: boolean;
  delay: number;
}) {
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (proficiency / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-muted"
          />
          {/* Progress circle */}
          <motion.circle
            cx="64"
            cy="64"
            r="45"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={
              isInView
                ? { strokeDashoffset }
                : { strokeDashoffset: circumference }
            }
            transition={{
              delay: delay + 0.2,
              duration: 1.5,
              ease: "easeOut",
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(var(--primary))" />
              <stop offset="100%" stopColor="rgb(var(--secondary))" />
            </linearGradient>
          </defs>
        </svg>
        {/* Percentage text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: delay + 0.5 }}
        >
          <span className="text-2xl font-bold gradient-text">{proficiency}%</span>
        </motion.div>
      </div>
    </div>
  );
}


