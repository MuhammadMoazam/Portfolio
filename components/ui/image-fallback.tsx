"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { ImageOff, User, FileImage } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
  fallbackType?: "icon" | "placeholder" | "avatar";
  fallbackClassName?: string;
}

/**
 * Image component with fallback UI
 * Handles failed image loads gracefully
 */
export function ImageWithFallback({
  src,
  alt,
  fallbackSrc,
  fallbackType = "placeholder",
  fallbackClassName,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  // If error and fallback source provided, use it
  if (error && fallbackSrc) {
    return (
      <Image
        {...props}
        src={fallbackSrc}
        alt={alt}
        className={className}
        onError={() => setError(true)}
      />
    );
  }

  // If error and no fallback, show fallback UI
  if (error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground",
          className,
          fallbackClassName
        )}
        role="img"
        aria-label={alt}
      >
        {fallbackType === "icon" && <ImageOff className="w-1/3 h-1/3" aria-hidden="true" />}
        {fallbackType === "avatar" && <User className="w-1/2 h-1/2" aria-hidden="true" />}
        {fallbackType === "placeholder" && (
          <div className="text-center p-4">
            <FileImage className="w-12 h-12 mx-auto mb-2 opacity-50" aria-hidden="true" />
            <p className="text-xs">Image not available</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <Image
        {...props}
        src={src}
        alt={alt}
        className={cn(
          loading && "opacity-0",
          !loading && "opacity-100 transition-opacity duration-300",
          className
        )}
        onError={handleError}
        onLoad={handleLoad}
      />
      {loading && (
        <div
          className={cn(
            "absolute inset-0 bg-muted animate-pulse",
            className
          )}
        />
      )}
    </>
  );
}

/**
 * Avatar with fallback
 */
export function AvatarWithFallback({
  src,
  alt,
  size = 48,
  fallbackText,
  className,
}: {
  src?: string;
  alt: string;
  size?: number;
  fallbackText?: string;
  className?: string;
}) {
  const [error, setError] = useState(!src);

  if (error || !src) {
    // Show initials if fallbackText provided
    const initials = fallbackText
      ? fallbackText
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "?";

    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-primary/10 text-primary font-semibold",
          className
        )}
        style={{ width: size, height: size }}
        role="img"
        aria-label={alt}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={cn("rounded-full object-cover", className)}
        onError={() => setError(true)}
      />
    </div>
  );
}

/**
 * Project thumbnail with fallback
 */
export function ProjectThumbnail({
  src,
  alt,
  fallbackIcon,
  className,
  ...props
}: ImageWithFallbackProps & { fallbackIcon?: React.ReactNode }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10",
          className
        )}
        role="img"
        aria-label={alt}
      >
        {fallbackIcon || <FileImage className="w-1/4 h-1/4 text-primary opacity-50" aria-hidden="true" />}
      </div>
    );
  }

  return (
    <div className="relative">
      <Image
        {...props}
        src={src}
        alt={alt}
        className={cn(
          loading && "opacity-0",
          !loading && "opacity-100 transition-opacity duration-300",
          className
        )}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
        onLoad={() => setLoading(false)}
      />
      {loading && (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br from-muted to-muted/50 animate-pulse",
            className
          )}
        />
      )}
    </div>
  );
}



