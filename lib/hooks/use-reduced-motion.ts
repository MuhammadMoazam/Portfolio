import { useEffect, useState } from "react";

/**
 * Hook to detect if user prefers reduced motion
 * Returns true if user has enabled reduced motion preference
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Get animation duration based on reduced motion preference
 * Returns 0 if reduced motion is enabled, otherwise returns the provided duration
 */
export function getAnimationDuration(duration: number, reducedMotion: boolean): number {
  return reducedMotion ? 0 : duration;
}

/**
 * Get animation variant based on reduced motion preference
 */
export function getAnimationVariant<T>(
  normalVariant: T,
  reducedVariant: T,
  reducedMotion: boolean
): T {
  return reducedMotion ? reducedVariant : normalVariant;
}



