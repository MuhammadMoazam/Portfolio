/**
 * Performance guards for slow devices
 * Detects device capabilities and adjusts accordingly
 */

/**
 * Check if device is slow/low-end
 */
export function isSlowDevice(): boolean {
  if (typeof window === "undefined") return false;

  // Check for reduced motion preference (often enabled on slower devices)
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Check for low memory (if available)
  const deviceMemory = (navigator as any).deviceMemory;
  const hasLowMemory = deviceMemory && deviceMemory < 4;

  // Check for slow connection
  const connection = (navigator as any).connection;
  const hasSlowConnection = connection && (
    connection.effectiveType === "slow-2g" ||
    connection.effectiveType === "2g" ||
    connection.saveData === true
  );

  // Check hardware concurrency (number of CPU cores)
  const lowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

  return prefersReducedMotion || hasLowMemory || hasSlowConnection || lowCPU;
}

/**
 * Get recommended animation settings based on device
 */
export function getAnimationSettings() {
  const isSlow = isSlowDevice();

  return {
    enableComplexAnimations: !isSlow,
    enableParticles: !isSlow,
    enableBlurEffects: !isSlow,
    enableHeavyTransforms: !isSlow,
    maxParticleCount: isSlow ? 10 : 50,
    animationDuration: isSlow ? 0.2 : 0.5,
    staggerDelay: isSlow ? 0.02 : 0.05,
  };
}

/**
 * Check if browser supports modern features
 */
export function checkBrowserSupport() {
  if (typeof window === "undefined") return {
    supportsWebP: false,
    supportsIntersectionObserver: false,
    supportsResizeObserver: false,
    supportsWebGL: false,
  };

  return {
    supportsWebP: document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp") === 0,
    supportsIntersectionObserver: "IntersectionObserver" in window,
    supportsResizeObserver: "ResizeObserver" in window,
    supportsWebGL: (() => {
      try {
        const canvas = document.createElement("canvas");
        return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
      } catch (e) {
        return false;
      }
    })(),
  };
}

/**
 * Throttle function for performance
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastRan: number = 0;

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();

    if (!lastRan) {
      func.apply(this, args);
      lastRan = now;
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        if (now - lastRan >= delay) {
          func.apply(this, args);
          lastRan = now;
        }
      }, delay - (now - lastRan));
    }
  };
}

/**
 * Debounce function for performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Request idle callback wrapper with fallback
 */
export function requestIdleCallback(callback: () => void, timeout: number = 2000) {
  if (typeof window === "undefined") {
    callback();
    return;
  }

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout });
  } else {
    setTimeout(callback, 1);
  }
}

/**
 * Check FPS and adjust animations
 */
export class FPSMonitor {
  private fps = 60;
  private lastTime = performance.now();
  private frames = 0;
  private monitoring = false;

  start() {
    if (this.monitoring) return;
    this.monitoring = true;
    this.measure();
  }

  stop() {
    this.monitoring = false;
  }

  getFPS(): number {
    return this.fps;
  }

  isLowFPS(): boolean {
    return this.fps < 30;
  }

  private measure = () => {
    if (!this.monitoring) return;

    this.frames++;
    const currentTime = performance.now();

    if (currentTime >= this.lastTime + 1000) {
      this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
      this.frames = 0;
      this.lastTime = currentTime;
    }

    requestAnimationFrame(this.measure);
  };
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources(urls: string[]) {
  if (typeof document === "undefined") return;

  urls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";

    // Determine resource type
    if (url.endsWith(".css")) {
      link.as = "style";
    } else if (url.match(/\.(jpg|jpeg|png|webp|gif|svg)$/)) {
      link.as = "image";
    } else if (url.match(/\.(woff|woff2|ttf|otf)$/)) {
      link.as = "font";
      link.crossOrigin = "anonymous";
    } else {
      link.as = "fetch";
    }

    link.href = url;
    document.head.appendChild(link);
  });
}

/**
 * Memory usage warning
 */
export function checkMemoryUsage(): { isHigh: boolean; usage?: number } {
  if (typeof window === "undefined" || !("memory" in performance)) {
    return { isHigh: false };
  }

  const memory = (performance as any).memory;
  const usedMemoryMB = memory.usedJSHeapSize / 1048576;
  const totalMemoryMB = memory.jsHeapSizeLimit / 1048576;
  const usagePercent = (usedMemoryMB / totalMemoryMB) * 100;

  return {
    isHigh: usagePercent > 80,
    usage: usagePercent,
  };
}



