"use client";

import { cn } from "@/lib/utils";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only focus:not-sr-only",
        "fixed top-4 left-4 z-[9999]",
        "px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow-lg",
        "focus:outline-none focus:ring-4 focus:ring-primary/50",
        "transition-transform"
      )}
    >
      Skip to main content
    </a>
  );
}

// Screen reader only utility class
// Add to globals.css:
// .sr-only {
//   position: absolute;
//   width: 1px;
//   height: 1px;
//   padding: 0;
//   margin: -1px;
//   overflow: hidden;
//   clip: rect(0, 0, 0, 0);
//   white-space: nowrap;
//   border-width: 0;
// }
//
// .focus:not-sr-only:focus {
//   position: static;
//   width: auto;
//   height: auto;
//   padding: inherit;
//   margin: inherit;
//   overflow: visible;
//   clip: auto;
//   white-space: normal;
// }



