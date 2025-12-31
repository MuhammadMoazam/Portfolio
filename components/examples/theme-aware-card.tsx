"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/lib/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Sun } from "lucide-react";

/**
 * Example component demonstrating theme-aware rendering
 * Shows how to create components that adapt to the current theme
 */
export function ThemeAwareCard() {
  const { theme, mounted } = useTheme();

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Card>
        <CardContent className="h-48" />
      </Card>
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <CardHeader
          className={`relative ${
            isDark
              ? "bg-gradient-to-br from-blue-900/50 to-purple-900/50"
              : "bg-gradient-to-br from-blue-50 to-purple-50"
          }`}
        >
          <motion.div
            className="absolute top-4 right-4"
            animate={{ rotate: isDark ? 180 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {isDark ? (
              <Moon className="h-8 w-8 text-blue-300" />
            ) : (
              <Sun className="h-8 w-8 text-yellow-500" />
            )}
          </motion.div>
          <CardTitle>Theme-Aware Component</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <span className="text-sm font-medium">Current Theme:</span>
              <motion.span
                key={theme}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-bold capitalize text-primary"
              >
                {theme}
              </motion.span>
            </div>

            <div className="p-4 rounded-lg border-2 border-border">
              <p className="text-sm text-foreground-secondary">
                This component adapts its appearance based on the active theme.
                The background gradient, icons, and colors all change dynamically.
              </p>
            </div>

            {/* Color demonstration */}
            <div className="grid grid-cols-3 gap-2">
              <div className="h-12 rounded bg-primary flex items-center justify-center text-xs text-white font-medium">
                Primary
              </div>
              <div className="h-12 rounded bg-secondary flex items-center justify-center text-xs text-white font-medium">
                Secondary
              </div>
              <div className="h-12 rounded bg-accent flex items-center justify-center text-xs text-accent-foreground font-medium">
                Accent
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/**
 * Simpler example showing conditional styling
 */
export function SimpleThemeCard() {
  const { theme, mounted } = useTheme();

  if (!mounted) return null;

  return (
    <div
      className={`p-6 rounded-lg ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-br from-white to-gray-50 text-gray-900"
      }`}
    >
      <h3 className="text-lg font-semibold mb-2">
        {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </h3>
      <p className="text-sm opacity-80">
        This card changes its gradient based on the theme!
      </p>
    </div>
  );
}



