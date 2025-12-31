"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Loading skeleton component with shimmer effect
 */
interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  animated?: boolean;
}

export function Skeleton({
  className = "",
  variant = "rectangular",
  width,
  height,
  animated = true,
}: SkeletonProps) {
  const variantClasses = {
    text: "h-4 w-full rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  return (
    <div
      className={cn(
        "bg-muted relative overflow-hidden",
        variantClasses[variant],
        className
      )}
      style={{
        width: width || (variant === "circular" ? height : undefined),
        height,
      }}
    >
      {animated && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </div>
  );
}

/**
 * Project card skeleton
 */
export function ProjectCardSkeleton() {
  return (
    <div className="p-6 rounded-lg border border-border bg-background-secondary space-y-4">
      <Skeleton variant="rectangular" height="200px" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
      <div className="flex gap-2">
        <Skeleton variant="rectangular" width="60px" height="24px" />
        <Skeleton variant="rectangular" width="60px" height="24px" />
        <Skeleton variant="rectangular" width="60px" height="24px" />
      </div>
    </div>
  );
}

/**
 * Skill card skeleton
 */
export function SkillCardSkeleton() {
  return (
    <div className="p-4 rounded-lg border border-border bg-background-secondary space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width="40px" height="40px" />
        <Skeleton variant="text" width="100px" />
      </div>
      <Skeleton variant="rectangular" height="8px" />
    </div>
  );
}

/**
 * Experience card skeleton
 */
export function ExperienceCardSkeleton() {
  return (
    <div className="p-6 rounded-lg border border-border bg-background-secondary space-y-4">
      <div className="flex items-start gap-4">
        <Skeleton variant="circular" width="48px" height="48px" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="80%" />
      <div className="flex gap-2">
        <Skeleton variant="rectangular" width="60px" height="24px" />
        <Skeleton variant="rectangular" width="60px" height="24px" />
      </div>
    </div>
  );
}

/**
 * Text skeleton lines
 */
export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? "80%" : "100%"}
        />
      ))}
    </div>
  );
}

/**
 * Avatar skeleton
 */
export function AvatarSkeleton({ size = 48 }: { size?: number }) {
  return <Skeleton variant="circular" width={size} height={size} />;
}

/**
 * Grid skeleton
 */
export function GridSkeleton({
  count = 6,
  columns = 3,
  SkeletonComponent = ProjectCardSkeleton,
}: {
  count?: number;
  columns?: number;
  SkeletonComponent?: React.ComponentType;
}) {
  return (
    <div
      className={`grid gap-6`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
}



