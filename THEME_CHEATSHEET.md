# Theme System Cheatsheet

Quick reference for using the theme system in your Next.js 14 project.

## 🎯 Import What You Need

```typescript
// Hook
import { useTheme } from "@/lib/hooks";

// Components
import { ThemeToggle, ThemeToggleSimple } from "@/components/ui/theme-toggle";

// Provider (already in app/layout.tsx)
import { ThemeProvider } from "@/lib/contexts";
```

## 🪝 Using the Hook

```typescript
"use client";

import { useTheme } from "@/lib/hooks";

export function MyComponent() {
  const { theme, setTheme, toggleTheme, mounted } = useTheme();
  
  // Always check mounted first!
  if (!mounted) return null;
  
  return (
    <div>
      <p>Current: {theme}</p>
      <button onClick={toggleTheme}>Toggle</button>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
    </div>
  );
}
```

## 🎨 Theme Colors

### In JSX (Tailwind)
```typescript
<div className="bg-background text-foreground">
  <h1 className="text-primary">Heading</h1>
  <p className="text-foreground-secondary">Paragraph</p>
  <button className="bg-accent text-accent-foreground">Button</button>
</div>
```

### Available Colors
| Class | Description |
|-------|-------------|
| `bg-background` | Main background |
| `bg-background-secondary` | Secondary background |
| `text-foreground` | Main text color |
| `text-foreground-secondary` | Muted text |
| `bg-primary` / `text-primary` | Primary brand |
| `bg-secondary` / `text-secondary` | Secondary brand |
| `bg-accent` / `text-accent-foreground` | Accent |
| `bg-muted` / `text-muted-foreground` | Muted |
| `border-border` | Borders |
| `ring-ring` | Focus rings |

### In CSS
```css
.my-component {
  background: rgb(var(--background));
  color: rgb(var(--foreground));
  border-color: rgb(var(--border));
}
```

## 🔘 Toggle Buttons

### Animated Toggle
```typescript
import { ThemeToggle } from "@/components/ui/theme-toggle";

<ThemeToggle />
```

### Simple Toggle
```typescript
import { ThemeToggleSimple } from "@/components/ui/theme-toggle";

<ThemeToggleSimple />
```

## 🎭 Conditional Rendering

```typescript
const { theme, mounted } = useTheme();

if (!mounted) return null;

return (
  <div>
    {theme === "dark" ? (
      <DarkComponent />
    ) : (
      <LightComponent />
    )}
  </div>
);
```

## 🎨 Conditional Styling

```typescript
const { theme } = useTheme();

<div className={theme === "dark" ? "dark-styles" : "light-styles"}>
  Content
</div>

// Or with cn() utility
import { cn } from "@/lib/utils";

<div className={cn(
  "base-styles",
  theme === "dark" && "dark-specific",
  theme === "light" && "light-specific"
)}>
  Content
</div>
```

## 🎬 With Framer Motion

```typescript
import { motion } from "framer-motion";
import { useTheme } from "@/lib/hooks";

export function AnimatedTheme() {
  const { theme, mounted } = useTheme();
  
  if (!mounted) return null;

  return (
    <motion.div
      key={theme}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      Theme: {theme}
    </motion.div>
  );
}
```

## ⚠️ Common Mistakes

### ❌ DON'T: Skip mounted check
```typescript
const { theme } = useTheme();
return <div>{theme}</div>; // Hydration mismatch!
```

### ✅ DO: Always check mounted
```typescript
const { theme, mounted } = useTheme();
if (!mounted) return null;
return <div>{theme}</div>;
```

### ❌ DON'T: Use hook outside provider
```typescript
// In a file outside ThemeProvider tree
const { theme } = useTheme(); // Error!
```

### ✅ DO: Ensure component is inside provider
```typescript
// Provider is already in app/layout.tsx
// All page components are automatically inside it
```

### ❌ DON'T: Forget "use client"
```typescript
// Server component
import { useTheme } from "@/lib/hooks";
export function Component() {
  const theme = useTheme(); // Error!
}
```

### ✅ DO: Add "use client" directive
```typescript
"use client";

import { useTheme } from "@/lib/hooks";
export function Component() {
  const { theme } = useTheme(); // Works!
}
```

## 🎨 Custom Utilities

```typescript
// Gradient text
<h1 className="gradient-text">Gradient Heading</h1>

// Glass effect
<div className="glass-effect p-4">Glass card</div>

// Custom scrollbar
<div className="scrollbar-thin overflow-auto">Content</div>
```

## 📱 Responsive + Theme

```typescript
import { useMediaQuery, useTheme } from "@/lib/hooks";

export function ResponsiveTheme() {
  const { theme, mounted } = useTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  if (!mounted) return null;
  
  return (
    <div>
      {isMobile ? "Mobile" : "Desktop"} in {theme} mode
    </div>
  );
}
```

## 🔧 Configuration

### Change Default Theme
Edit `app/layout.tsx`:
```typescript
<ThemeProvider defaultTheme="dark" storageKey="theme">
```

### Change Storage Key
```typescript
<ThemeProvider defaultTheme="light" storageKey="my-app-theme">
```

### Disable System Preference
Users can override by manually selecting a theme. The system preference only applies on first visit.

## 📊 Theme Flow

```
Page Load
  ↓
Inline Script Runs (no flash)
  ↓
Check localStorage
  ↓
Found? → Apply theme
  ↓
Not Found? → Check system preference → Apply theme
  ↓
React Hydrates
  ↓
ThemeProvider Mounts
  ↓
Context Available
  ↓
Components Use useTheme()
```

## 🚀 Quick Commands

```bash
# Run dev server
npm run dev

# View demo
# Navigate to: http://localhost:3000/theme-demo

# Build
npm run build

# Start production
npm start
```

## 📚 More Info

- **Full Docs**: [THEME_SYSTEM.md](./THEME_SYSTEM.md)
- **Quick Start**: [QUICK_START.md](./QUICK_START.md)
- **Implementation**: [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
- **Main README**: [README.md](./README.md)

---

**Pro Tip**: Bookmark this cheatsheet for quick reference! 🔖



