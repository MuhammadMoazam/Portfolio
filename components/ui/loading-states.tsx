"use client";

import { Loader2, LoaderCircle, Hourglass } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

/**
 * Spinner component
 */
export function Spinner({
  size = "default",
  className,
}: {
  size?: "sm" | "default" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <Loader2
      className={cn("animate-spin", sizeClasses[size], className)}
      aria-hidden="true"
    />
  );
}

/**
 * Loading overlay
 */
export function LoadingOverlay({
  message = "Loading...",
  transparent = false,
}: {
  message?: string;
  transparent?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        transparent ? "bg-background/60 backdrop-blur-sm" : "bg-background"
      )}
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <Spinner size="lg" className="mx-auto mb-4" />
        <p className="text-lg font-medium">{message}</p>
      </div>
    </motion.div>
  );
}

/**
 * Inline loading indicator
 */
export function InlineLoading({
  message = "Loading...",
  size = "default",
}: {
  message?: string;
  size?: "sm" | "default" | "lg";
}) {
  return (
    <div className="flex items-center justify-center gap-3 py-8" role="status" aria-live="polite">
      <Spinner size={size} />
      <span className="text-foreground-secondary">{message}</span>
    </div>
  );
}

/**
 * Button loading state
 */
export function ButtonLoading({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <>
      <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
      <span>{message}</span>
    </>
  );
}

/**
 * Pulse loading dots
 */
export function PulseLoading({ message }: { message?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="flex items-center gap-2" role="status" aria-live="polite">
        <span className="text-foreground-secondary">{message || "Loading"}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2" role="status" aria-live="polite">
      {message && <span className="text-foreground-secondary mr-2">{message}</span>}
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Progress bar
 */
export function ProgressBar({
  progress,
  message,
  showPercentage = true,
}: {
  progress: number;
  message?: string;
  showPercentage?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
      {message && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-foreground-secondary">{message}</span>
          {showPercentage && (
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          )}
        </div>
      )}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
        />
      </div>
    </div>
  );
}

/**
 * Page loading skeleton
 */
export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header skeleton */}
        <div className="h-16 bg-muted animate-pulse rounded-lg" />

        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-8 w-1/3 bg-muted animate-pulse rounded" />
          <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
          <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Async content wrapper with loading state
 */
export function AsyncContent({
  isLoading,
  error,
  children,
  loadingMessage = "Loading...",
  errorMessage = "Failed to load content",
  onRetry,
}: {
  isLoading: boolean;
  error?: Error | null;
  children: React.ReactNode;
  loadingMessage?: string;
  errorMessage?: string;
  onRetry?: () => void;
}) {
  if (isLoading) {
    return <InlineLoading message={loadingMessage} />;
  }

  if (error) {
    return (
      <div className="p-6 rounded-lg border border-red-500/20 bg-red-500/5 text-center">
        <p className="text-red-500 mb-4">{errorMessage}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-sm text-primary hover:underline"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  return <>{children}</>;
}



