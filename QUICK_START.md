# Quick Start Guide

Get your Next.js 14 project up and running in minutes!

## 🚀 Installation

1. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Run the development server:**

```bash
npm run dev
```

3. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Using the Theme System

### In Any Component

```typescript
"use client";

import { useTheme } from "@/lib/hooks";

export function MyComponent() {
  const { theme, toggleTheme, mounted } = useTheme();
  
  if (!mounted) return null; // Prevent hydration mismatch
  
  return (
    <div className="bg-background text-foreground">
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### Add Theme Toggle to Navigation

```typescript
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navbar() {
  return (
    <nav>
      {/* Your nav items */}
      <ThemeToggle />
    </nav>
  );
}
```

## 🎯 Creating Components

### Using UI Components

```typescript
import { Button, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

### Using Framer Motion

```typescript
"use client";

import { motion } from "framer-motion";

export function AnimatedComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Animated content
    </motion.div>
  );
}
```

### Using Lucide Icons

```typescript
import { Heart, Star, User } from "lucide-react";

export function Icons() {
  return (
    <div>
      <Heart className="h-6 w-6 text-red-500" />
      <Star className="h-6 w-6 text-yellow-500" />
      <User className="h-6 w-6 text-blue-500" />
    </div>
  );
}
```

## 🎨 Styling with Tailwind

### Theme Colors

Use semantic color classes that automatically adapt to light/dark mode:

```typescript
<div className="bg-background text-foreground">
  <h1 className="text-primary">Primary colored heading</h1>
  <p className="text-foreground-secondary">Secondary text</p>
  <button className="bg-accent text-accent-foreground">Button</button>
</div>
```

### Available Theme Colors

- `bg-background` / `text-foreground` - Main background and text
- `bg-background-secondary` - Secondary background
- `text-foreground-secondary` - Muted text
- `bg-primary` / `text-primary` - Primary brand color
- `bg-secondary` / `text-secondary` - Secondary brand color
- `bg-accent` / `text-accent-foreground` - Accent colors
- `bg-muted` / `text-muted-foreground` - Muted colors
- `border-border` - Border color
- `ring-ring` - Focus ring color

### Custom Utilities

```typescript
// Gradient text
<h1 className="gradient-text">Gradient Text</h1>

// Glass effect
<div className="glass-effect">Glass morphism</div>

// Custom scrollbar
<div className="scrollbar-thin">Content</div>
```

## 📁 Project Structure

```
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout (has ThemeProvider)
│   ├── page.tsx           # Home page
│   └── theme-demo/        # Theme system demo
├── components/
│   ├── ui/                # Reusable UI components
│   ├── sections/          # Page sections
│   └── layout/            # Layout components
├── lib/
│   ├── contexts/          # React contexts (ThemeProvider)
│   ├── hooks/             # Custom hooks (useTheme, etc.)
│   └── utils.ts           # Utility functions
├── styles/
│   └── globals.css        # Global styles + theme CSS variables
└── public/                # Static assets
```

## 🔧 Utility Functions

### cn() - Merge Tailwind Classes

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base-class",
  condition && "conditional-class",
  "another-class"
)} />
```

### Other Utilities

```typescript
import { formatDate, debounce, truncate, sleep } from "@/lib/utils";

// Format dates
const formatted = formatDate(new Date()); // "December 30, 2025"

// Debounce functions
const debouncedSearch = debounce((query) => {
  console.log("Searching:", query);
}, 300);

// Truncate text
const short = truncate("Long text here", 10); // "Long text..."

// Async delays
await sleep(1000); // Wait 1 second
```

## 🎭 Example Pages

- **Home**: [http://localhost:3000](http://localhost:3000)
- **Theme Demo**: [http://localhost:3000/theme-demo](http://localhost:3000/theme-demo)

## 📚 Learn More

- [Complete Theme System Documentation](./THEME_SYSTEM.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 🆘 Common Issues

### "useTheme must be used within a ThemeProvider"

Make sure your component is inside the ThemeProvider (already set up in `app/layout.tsx`).

### Hydration Mismatch Warning

Always check `mounted` before rendering theme-dependent content:

```typescript
const { mounted } = useTheme();
if (!mounted) return null;
```

### Theme Not Changing

Make sure your component is a client component:

```typescript
"use client";
```

---

**Ready to build?** Start editing `app/page.tsx` and see your changes live! 🚀



