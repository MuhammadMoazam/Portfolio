"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface RetryButtonProps {
  onRetry: () => Promise<void> | void;
  maxRetries?: number;
  message?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Retry button with automatic retry logic
 */
export function RetryButton({
  onRetry,
  maxRetries = 3,
  message = "Retry",
  disabled = false,
  className,
}: RetryButtonProps) {
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    if (retryCount >= maxRetries) {
      return;
    }

    setIsRetrying(true);
    setRetryCount((prev) => prev + 1);

    try {
      await onRetry();
    } catch (error) {
      console.error("Retry failed:", error);
    } finally {
      setIsRetrying(false);
    }
  };

  const isMaxRetriesReached = retryCount >= maxRetries;

  return (
    <div className="space-y-2">
      <Button
        onClick={handleRetry}
        disabled={disabled || isRetrying || isMaxRetriesReached}
        variant="outline"
        className={cn("group", className)}
      >
        <RefreshCw
          className={cn(
            "w-4 h-4 mr-2 transition-transform",
            isRetrying && "animate-spin"
          )}
          aria-hidden="true"
        />
        {isRetrying ? "Retrying..." : message}
      </Button>

      {retryCount > 0 && !isMaxRetriesReached && (
        <p className="text-xs text-foreground-secondary">
          Retry attempt {retryCount} of {maxRetries}
        </p>
      )}

      {isMaxRetriesReached && (
        <p className="text-xs text-red-500">
          Maximum retry attempts reached. Please refresh the page or contact support.
        </p>
      )}
    </div>
  );
}

/**
 * Hook for retry logic
 */
export function useRetry<T>(
  fn: () => Promise<T>,
  options?: {
    maxRetries?: number;
    retryDelay?: number;
    onError?: (error: Error) => void;
  }
) {
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const maxRetries = options?.maxRetries ?? 3;
  const retryDelay = options?.retryDelay ?? 1000;

  const retry = async (): Promise<T | null> => {
    if (retryCount >= maxRetries) {
      return null;
    }

    setIsRetrying(true);
    setRetryCount((prev) => prev + 1);

    try {
      const result = await fn();
      setError(null);
      setRetryCount(0);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      options?.onError?.(error);

      // Auto retry with delay
      if (retryCount < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return retry();
      }

      return null;
    } finally {
      setIsRetrying(false);
    }
  };

  const reset = () => {
    setRetryCount(0);
    setError(null);
    setIsRetrying(false);
  };

  return {
    retry,
    retryCount,
    isRetrying,
    error,
    canRetry: retryCount < maxRetries,
    reset,
  };
}



