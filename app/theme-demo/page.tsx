"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { ThemeToggle, ThemeToggleSimple } from "@/components/ui/theme-toggle";
import { 
  Sun, 
  Moon, 
  Palette, 
  Zap, 
  Shield, 
  Layers,
  Check
} from "lucide-react";

export default function ThemeDemoPage() {
  const { theme, setTheme } = useTheme();

  return (
    <main className="min-h-screen py-20">
      <Container>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold mb-4">
            Theme System <span className="gradient-text">Demo</span>
          </h1>
          <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
            A complete dark/light theme system with React Context, localStorage persistence, 
            and smooth animations.
          </p>
        </motion.div>

        {/* Theme Controls */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Theme Controls</CardTitle>
              <CardDescription>
                Switch between light and dark modes with animated transitions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Manual Theme Selection */}
              <div>
                <h3 className="text-sm font-medium mb-3">Select Theme:</h3>
                <div className="flex gap-4">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    onClick={() => setTheme("light")}
                    className="flex-1"
                  >
                    <Sun className="mr-2 h-4 w-4" />
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    onClick={() => setTheme("dark")}
                    className="flex-1"
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    Dark
                  </Button>
                </div>
              </div>

              {/* Theme Toggle Buttons */}
              <div>
                <h3 className="text-sm font-medium mb-3">Toggle Buttons:</h3>
                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <span className="text-sm text-foreground-secondary">
                      Animated Toggle
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThemeToggleSimple />
                    <span className="text-sm text-foreground-secondary">
                      Simple Toggle
                    </span>
                  </div>
                </div>
              </div>

              {/* Current Theme Info */}
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm">
                  <strong>Current Theme:</strong>{" "}
                  <span className="capitalize">{theme}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-primary-500/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-foreground-secondary">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Color Palette Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
              <CardDescription>
                CSS variables that automatically adjust based on the theme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ColorSwatch
                  name="Background"
                  className="bg-background border-2 border-border"
                />
                <ColorSwatch
                  name="Foreground"
                  className="bg-foreground text-background"
                />
                <ColorSwatch
                  name="Primary"
                  className="bg-primary text-white"
                />
                <ColorSwatch
                  name="Secondary"
                  className="bg-secondary text-white"
                />
                <ColorSwatch
                  name="Accent"
                  className="bg-accent text-accent-foreground"
                />
                <ColorSwatch
                  name="Muted"
                  className="bg-muted text-muted-foreground"
                />
                <ColorSwatch
                  name="Border"
                  className="bg-background border-4 border-border"
                />
                <ColorSwatch
                  name="Ring"
                  className="bg-background ring-4 ring-ring"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Implementation Checklist */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Implementation Checklist</CardTitle>
              <CardDescription>
                Everything included in this theme system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {checklist.map((item, index) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Check className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground-secondary">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </main>
  );
}

function ColorSwatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="space-y-2">
      <div className={`h-20 rounded-lg ${className} flex items-center justify-center`}>
        <span className="text-sm font-medium mix-blend-difference">
          {name}
        </span>
      </div>
      <p className="text-xs text-center text-foreground-secondary">{name}</p>
    </div>
  );
}

const features = [
  {
    title: "React Context",
    description: "Global theme state management using React Context API",
    icon: Layers,
  },
  {
    title: "localStorage",
    description: "Persists user theme preference across sessions",
    icon: Shield,
  },
  {
    title: "System Preference",
    description: "Respects system dark/light mode preference on first visit",
    icon: Palette,
  },
  {
    title: "No Flash",
    description: "Inline script prevents flash of wrong theme on page load",
    icon: Zap,
  },
  {
    title: "Smooth Animations",
    description: "Beautiful transitions between themes using Framer Motion",
    icon: Sun,
  },
  {
    title: "TypeScript",
    description: "Full type safety for theme values and context",
    icon: Moon,
  },
];

const checklist = [
  "ThemeProvider component using React Context",
  "useTheme custom hook with full TypeScript support",
  "Theme toggle button with smooth icon transition animations",
  "localStorage persistence for user preferences",
  "System preference detection on first visit",
  "CSS variables in globals.css for both light and dark themes",
  "No flash of wrong theme on page load (SSR handled properly)",
  "suppressHydrationWarning to prevent React hydration warnings",
  "Mounted state to prevent hydration mismatches",
  "Color-scheme CSS property for native browser elements",
  "Multiple theme toggle variants (animated and simple)",
  "Hover effects and interactive feedback",
];



