"use client";

import React, { createContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  mounted: boolean;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount - Force dark mode only
  useEffect(() => {
    try {
      // Always use dark theme
      setThemeState("dark");
      applyTheme("dark");
    } catch (error) {
      console.error("Error loading theme:", error);
    } finally {
      setMounted(true);
    }
  }, [storageKey]);

  // Dark mode only - no system theme changes needed
  useEffect(() => {
    // Always maintain dark mode
    applyTheme("dark");
  }, []);

  const applyTheme = useCallback((newTheme: Theme) => {
    const root = document.documentElement;
    
    // Remove both classes first
    root.classList.remove("light", "dark");
    
    // Add the new theme class
    root.classList.add(newTheme);
    
    // Update color-scheme for native elements
    root.style.colorScheme = newTheme;
  }, []);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      try {
        setThemeState(newTheme);
        applyTheme(newTheme);
        localStorage.setItem(storageKey, newTheme);
      } catch (error) {
        console.error("Error setting theme:", error);
      }
    },
    [applyTheme, storageKey]
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  const value = {
    theme,
    setTheme,
    toggleTheme,
    mounted,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}



