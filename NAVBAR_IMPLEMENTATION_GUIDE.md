# Navbar Implementation Guide

Step-by-step guide to add the responsive navbar to your project.

## ✅ Prerequisites

- Next.js 14 project
- TypeScript configured
- Tailwind CSS installed
- Framer Motion installed

## 📦 Installation

All dependencies are already included in `package.json`. If starting fresh:

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

## 🚀 Implementation Steps

### Step 1: Create Navigation Constants

Create `lib/constants/navigation.ts`:

```typescript
export interface NavLink {
  name: string;
  href: string;
  label: string;
}

export const navigationLinks: NavLink[] = [
  { name: "Home", href: "#home", label: "Go to home section" },
  { name: "About", href: "#about", label: "Go to about section" },
  { name: "Skills", href: "#skills", label: "Go to skills section" },
  { name: "Projects", href: "#projects", label: "Go to projects section" },
  { name: "Experience", href: "#experience", label: "Go to experience section" },
  { name: "Contact", href: "#contact", label: "Go to contact section" },
];
```

### Step 2: Create Active Section Hook

Create `lib/hooks/use-active-section.ts`:

```typescript
"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [sectionIds]);

  return activeSection;
}
```

### Step 3: Export Hook

Update `lib/hooks/index.ts`:

```typescript
export { useActiveSection } from "./use-active-section";
```

### Step 4: Create Mobile Menu Component

Create `components/layout/mobile-menu.tsx`:

```typescript
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { NavLink } from "@/lib/constants/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  activeSection: string;
  onLinkClick: (href: string) => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  links,
  activeSection,
  onLinkClick,
}: MobileMenuProps) {
  // ... (copy from components/layout/mobile-menu.tsx)
}
```

### Step 5: Create Main Navbar Component

Create `components/layout/navbar.tsx`:

```typescript
"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu } from "lucide-react";
// ... (copy from components/layout/navbar.tsx)
```

### Step 6: Add Navbar to Your Layout

Update your page or layout:

```typescript
import { Navbar } from "@/components/layout/navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        {/* Your content with section IDs */}
      </main>
    </>
  );
}
```

### Step 7: Create Page Sections

Ensure your page has sections with matching IDs:

```typescript
<main>
  <section id="home" className="min-h-screen">
    <h1>Home Section</h1>
  </section>

  <section id="about" className="min-h-screen">
    <h1>About Section</h1>
  </section>

  <section id="skills" className="min-h-screen">
    <h1>Skills Section</h1>
  </section>

  {/* More sections... */}
</main>
```

## 🎨 Customization

### Change Logo

In `navbar.tsx`:

```typescript
<a href="#home" className="text-2xl font-bold gradient-text">
  Your Brand Name
</a>
```

### Add/Remove Links

In `lib/constants/navigation.ts`:

```typescript
export const navigationLinks: NavLink[] = [
  { name: "Services", href: "#services", label: "View our services" },
  // Add your custom links
];
```

### Adjust Colors

The navbar uses your theme colors automatically:
- Background: `bg-background`
- Text: `text-foreground`
- Primary: `bg-primary`
- Border: `border-border`

### Modify Animations

In `navbar.tsx`, adjust Framer Motion props:

```typescript
transition={{
  type: "spring",
  stiffness: 200,  // Change animation speed
  damping: 20,     // Change bounce
}}
```

## ✅ Verification Checklist

After implementation, verify:

- [ ] Navbar appears at top of page
- [ ] Logo/brand name is visible
- [ ] All navigation links are displayed (desktop)
- [ ] Theme toggle works
- [ ] Mobile menu button appears on small screens
- [ ] Clicking links scrolls to sections smoothly
- [ ] Active section highlights correctly
- [ ] Background blur activates on scroll
- [ ] Mobile menu slides in/out smoothly
- [ ] ESC key closes mobile menu
- [ ] Tab navigation works
- [ ] Focus indicators are visible

## 🐛 Common Issues

### Issue: "useTheme must be used within a ThemeProvider"

**Solution:** Ensure ThemeProvider wraps your app in `app/layout.tsx`

### Issue: Active section not updating

**Solution:** Check that section IDs match navigation hrefs (without #)

```typescript
// Correct
href: "#about"
<section id="about">  ✅

// Incorrect
href: "#about"
<section id="#about"> ❌
```

### Issue: Navbar height causes content overlap

**Solution:** Add padding to your first section

```typescript
<section id="home" className="pt-20">
  {/* Content */}
</section>
```

### Issue: Mobile menu doesn't close

**Solution:** Verify ESC key handler is attached (already included)

### Issue: Scroll is jumpy

**Solution:** Adjust offset in `handleNavigation`:

```typescript
const offset = 80; // Match your navbar height
```

## 🎯 Testing

### Desktop

1. ✅ Scroll page - blur effect activates
2. ✅ Click each nav link - smooth scroll
3. ✅ Hover links - hover effects
4. ✅ Active section highlights
5. ✅ Theme toggle works
6. ✅ Tab navigation works

### Mobile (< 1024px)

1. ✅ Hamburger menu visible
2. ✅ Click menu - drawer slides in
3. ✅ Click backdrop - menu closes
4. ✅ Click link - scrolls and closes menu
5. ✅ Press ESC - menu closes
6. ✅ Body scroll locked when menu open

### Keyboard

1. ✅ Tab through all links
2. ✅ Focus indicators visible
3. ✅ Enter activates links
4. ✅ ESC closes mobile menu

## 📚 Next Steps

1. **Customize styling** - Match your brand colors
2. **Add animations** - Enhance with more Framer Motion
3. **Add features** - Search, dropdown menus, etc.
4. **Optimize** - Test performance on various devices

## 🔗 Resources

- [Full Documentation](./NAVBAR_DOCUMENTATION.md)
- [Cheatsheet](./NAVBAR_CHEATSHEET.md)
- [Demo Page](/navbar-demo)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev)

## 💡 Tips

1. **Keep it simple** - Start with default configuration
2. **Test on mobile** - Use Chrome DevTools device mode
3. **Check accessibility** - Use keyboard navigation
4. **Customize gradually** - Change one thing at a time
5. **Use demo page** - Reference `/navbar-demo` for examples

---

Need help? Check the [full documentation](./NAVBAR_DOCUMENTATION.md) or [cheatsheet](./NAVBAR_CHEATSHEET.md)! 🚀


