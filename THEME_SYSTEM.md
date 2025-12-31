# Complete Theme System Documentation

A production-ready dark/light theme system for Next.js 14 with TypeScript, React Context, and Framer Motion animations.

## 🎨 Features

- ✅ **React Context API** - Global theme state management
- ✅ **localStorage Persistence** - Theme preference saved across sessions
- ✅ **System Preference Detection** - Respects user's OS theme on first visit
- ✅ **No Theme Flash** - Inline script prevents FOUC (Flash of Unstyled Content)
- ✅ **Smooth Animations** - Beautiful transitions with Framer Motion
- ✅ **TypeScript** - Full type safety
- ✅ **SSR Compatible** - Proper server-side rendering handling
- ✅ **CSS Variables** - Easy customization for both themes

## 📁 File Structure

```
lib/
├── contexts/
│   ├── theme-context.tsx    # ThemeProvider and Context
│   └── index.ts             # Barrel export
├── hooks/
│   ├── use-theme.ts         # useTheme hook
│   └── index.ts
└── utils.ts

components/
└── ui/
    └── theme-toggle.tsx     # Theme toggle button components

app/
└── layout.tsx              # Root layout with ThemeProvider

styles/
└── globals.css             # CSS variables for theming
```

## 🚀 Quick Start

### 1. Use the Theme Provider

The `ThemeProvider` is already set up in `app/layout.tsx`:

```typescript
import { ThemeProvider } from "@/lib/contexts/theme-context";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline script prevents theme flash */}
        <script dangerouslySetInnerHTML={{ __html: `...` }} />
      </head>
      <body>
        <ThemeProvider defaultTheme="light" storageKey="theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 2. Use the Theme Hook

Access theme state and controls in any client component:

```typescript
"use client";

import { useTheme } from "@/lib/hooks";

export function MyComponent() {
  const { theme, setTheme, toggleTheme, mounted } = useTheme();

  // Wait for mount to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
    </div>
  );
}
```

### 3. Add Theme Toggle Button

Use one of the pre-built toggle components:

```typescript
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Animated toggle with icon transitions
<ThemeToggle />

// Or use the simpler version
import { ThemeToggleSimple } from "@/components/ui/theme-toggle";
<ThemeToggleSimple />
```

## 🎯 API Reference

### ThemeProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | Child components |
| `defaultTheme` | `"light" \| "dark"` | `"light"` | Default theme if no preference saved |
| `storageKey` | `string` | `"theme"` | localStorage key for persistence |

### useTheme Hook Returns

| Property | Type | Description |
|----------|------|-------------|
| `theme` | `"light" \| "dark"` | Current active theme |
| `setTheme` | `(theme: Theme) => void` | Set theme directly |
| `toggleTheme` | `() => void` | Toggle between light/dark |
| `mounted` | `boolean` | Whether component is mounted (prevents hydration issues) |

## 🎨 Customizing Colors

All theme colors are defined as CSS variables in `styles/globals.css`:

```css
:root {
  --background: 255 255 255;
  --foreground: 17 24 39;
  --primary: 59 130 246;
  /* ... more colors */
}

.dark {
  --background: 17 24 39;
  --foreground: 243 244 246;
  --primary: 96 165 250;
  /* ... more colors */
}
```

### Using Theme Colors in Components

```typescript
// In Tailwind classes
<div className="bg-background text-foreground">
  <p className="text-primary">Primary text</p>
  <p className="text-foreground-secondary">Secondary text</p>
</div>

// In custom CSS
.my-class {
  background: rgb(var(--background));
  color: rgb(var(--foreground));
}
```

## 🔧 Advanced Usage

### Listening to Theme Changes

```typescript
"use client";

import { useEffect } from "react";
import { useTheme } from "@/lib/hooks";

export function MyComponent() {
  const { theme } = useTheme();

  useEffect(() => {
    console.log("Theme changed to:", theme);
    // Perform side effects when theme changes
  }, [theme]);

  return <div>...</div>;
}
```

### Custom Theme Toggle

Create your own theme toggle with custom styling:

```typescript
"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/lib/hooks";

export function CustomToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) return null;

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      className="p-2 rounded-lg bg-muted"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </motion.button>
  );
}
```

### Conditional Rendering Based on Theme

```typescript
"use client";

import { useTheme } from "@/lib/hooks";

export function ThemedComponent() {
  const { theme, mounted } = useTheme();

  if (!mounted) return null;

  return (
    <>
      {theme === "dark" ? (
        <DarkModeComponent />
      ) : (
        <LightModeComponent />
      )}
    </>
  );
}
```

## 🐛 Troubleshooting

### Hydration Mismatch Errors

Always check `mounted` before rendering theme-dependent content:

```typescript
const { theme, mounted } = useTheme();

if (!mounted) {
  return <div className="h-10 w-10" />; // Placeholder
}

return <ThemedContent />;
```

### Theme Flash on Page Load

Ensure the inline script is in the `<head>` of your root layout:

```typescript
<head>
  <script
    dangerouslySetInnerHTML={{
      __html: `
        (function() {
          const theme = localStorage.getItem('theme');
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          const activeTheme = theme || systemTheme;
          document.documentElement.classList.add(activeTheme);
          document.documentElement.style.colorScheme = activeTheme;
        })();
      `,
    }}
  />
</head>
```

### Theme Not Persisting

Check that localStorage is available and not blocked:

```typescript
// In your browser console
localStorage.getItem('theme'); // Should return "light" or "dark"
```

## 🎭 Demo Page

Visit `/theme-demo` to see the complete theme system in action with:
- Interactive theme controls
- Color palette showcase
- Feature demonstrations
- Implementation checklist

## 📝 Best Practices

1. **Always use the `mounted` check** in client components that depend on theme
2. **Use CSS variables** for colors instead of hardcoded values
3. **Keep the inline script** in the root layout to prevent theme flash
4. **Test both themes** when building components
5. **Use semantic color names** (e.g., `text-foreground` instead of `text-gray-900`)

## 🔗 Related Files

- `lib/contexts/theme-context.tsx` - Theme provider and context
- `lib/hooks/use-theme.ts` - Custom hook
- `components/ui/theme-toggle.tsx` - Toggle components
- `app/layout.tsx` - Root layout with provider
- `styles/globals.css` - Theme CSS variables
- `app/theme-demo/page.tsx` - Demo page

## 📚 Additional Resources

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [React Context API](https://react.dev/reference/react/useContext)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Theming](https://tailwindcss.com/docs/dark-mode)

---

Built with ❤️ for Next.js 14



