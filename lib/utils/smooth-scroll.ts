/**
 * Smooth scroll utilities
 */

/**
 * Smooth scroll to element with offset
 */
export function smoothScrollTo(
  element: HTMLElement | string,
  options?: {
    offset?: number;
    duration?: number;
    behavior?: ScrollBehavior;
  }
) {
  const target =
    typeof element === "string" ? document.querySelector(element) : element;

  if (!target) {
    console.warn(`Element not found: ${element}`);
    return;
  }

  const { offset = 0, behavior = "smooth" } = options || {};

  const elementPosition = (target as HTMLElement).getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior,
  });
}

/**
 * Smooth scroll to top
 */
export function scrollToTop(behavior: ScrollBehavior = "smooth") {
  window.scrollTo({
    top: 0,
    behavior,
  });
}

/**
 * Smooth scroll to bottom
 */
export function scrollToBottom(behavior: ScrollBehavior = "smooth") {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior,
  });
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Get scroll progress (0-1)
 */
export function getScrollProgress(): number {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight - document.documentElement.clientHeight;
  return height > 0 ? winScroll / height : 0;
}

/**
 * Enable smooth scrolling globally
 */
export function enableSmoothScroll() {
  if (typeof window !== "undefined") {
    document.documentElement.style.scrollBehavior = "smooth";
  }
}

/**
 * Disable smooth scrolling globally
 */
export function disableSmoothScroll() {
  if (typeof window !== "undefined") {
    document.documentElement.style.scrollBehavior = "auto";
  }
}

/**
 * Scroll with easing animation
 */
export function animatedScrollTo(
  targetPosition: number,
  duration: number = 500
): Promise<void> {
  return new Promise((resolve) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Easing function (ease-in-out-cubic)
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(animation);
  });
}

/**
 * Horizontal smooth scroll for carousels
 */
export function smoothScrollHorizontal(
  container: HTMLElement,
  amount: number,
  duration: number = 300
) {
  const startPosition = container.scrollLeft;
  const targetPosition = startPosition + amount;
  let startTime: number | null = null;

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // Easing
    const ease =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    container.scrollLeft = startPosition + (targetPosition - startPosition) * ease;

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}



