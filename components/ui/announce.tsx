"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface AnnounceContextType {
  announce: (message: string, priority?: "polite" | "assertive") => void;
}

const AnnounceContext = createContext<AnnounceContextType | undefined>(undefined);

/**
 * Provider component for screen reader announcements
 * Uses aria-live regions to announce dynamic content changes
 */
export function AnnounceProvider({ children }: { children: ReactNode }) {
  const [politeMessage, setPoliteMessage] = useState("");
  const [assertiveMessage, setAssertiveMessage] = useState("");

  const announce = useCallback((message: string, priority: "polite" | "assertive" = "polite") => {
    if (priority === "assertive") {
      setAssertiveMessage(message);
      // Clear after announcement
      setTimeout(() => setAssertiveMessage(""), 100);
    } else {
      setPoliteMessage(message);
      // Clear after announcement
      setTimeout(() => setPoliteMessage(""), 100);
    }
  }, []);

  return (
    <AnnounceContext.Provider value={{ announce }}>
      {children}
      
      {/* Aria-live regions for screen reader announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {politeMessage}
      </div>
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      >
        {assertiveMessage}
      </div>
    </AnnounceContext.Provider>
  );
}

/**
 * Hook to announce messages to screen readers
 * @example
 * const { announce } = useAnnounce();
 * announce("Form submitted successfully");
 */
export function useAnnounce() {
  const context = useContext(AnnounceContext);
  if (context === undefined) {
    throw new Error("useAnnounce must be used within an AnnounceProvider");
  }
  return context;
}



