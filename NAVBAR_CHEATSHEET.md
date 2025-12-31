# Navbar Component Cheatsheet

Quick reference for using the responsive navbar component.

## 🚀 Quick Setup

### 1. Import & Use

```typescript
import { Navbar } from "@/components/layout/navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <section id="home">Content</section>
        <section id="about">Content</section>
        {/* More sections */}
      </main>
    </>
  );
}
```

### 2. Required Section IDs

Your page must have sections with these IDs:
- `home`
- `about`
- `skills`
- `projects`
- `experience`
- `contact`

## 📝 Customization

### Change Logo

**File:** `components/layout/navbar.tsx`

```typescript
<a href="#home" className="text-2xl font-bold gradient-text">
  YourName  {/* Change this */}
</a>
```

### Add/Remove Links

**File:** `lib/constants/navigation.ts`

```typescript
export const navigationLinks: NavLink[] = [
  { name: "Home", href: "#home", label: "Go to home" },
  { name: "Services", href: "#services", label: "View services" },
  // Add your links
];
```

### Adjust Scroll Threshold

```typescript
setIsScrolled(latest > 100); // Default: 50
```

### Change Navbar Height

```typescript
className="h-16 lg:h-24" // Desktop height
const offset = 96; // Update scroll offset to match
```

## 🎨 Styling

### Colors

```typescript
// Scrolled background
"bg-background/80 backdrop-blur-lg"

// Active link
"text-primary"

// Progress bar
"bg-primary"
```

### Animations

```typescript
// Entry animation
transition={{ type: "spring", stiffness: 200, damping: 20 }}

// Active indicator
transition={{ type: "spring", stiffness: 380, damping: 30 }}
```

## 🎯 Features

| Feature | Status |
|---------|--------|
| Responsive | ✅ |
| Mobile Menu | ✅ |
| Theme Toggle | ✅ |
| Scroll Blur | ✅ |
| Active Section | ✅ |
| Smooth Scroll | ✅ |
| Keyboard Nav | ✅ |
| Animations | ✅ |

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Navigate forward |
| `Shift + Tab` | Navigate backward |
| `Enter` | Activate link |
| `ESC` | Close mobile menu |

## 🎭 Components

### Main Navbar
- **File:** `components/layout/navbar.tsx`
- **Features:** Desktop nav, theme toggle, scroll detection

### Mobile Menu
- **File:** `components/layout/mobile-menu.tsx`
- **Features:** Slide-in drawer, backdrop, animations

### Navigation Data
- **File:** `lib/constants/navigation.ts`
- **Content:** Link definitions

### Active Section Hook
- **File:** `lib/hooks/use-active-section.ts`
- **Purpose:** IntersectionObserver-based detection

## 🔧 Common Modifications

### Add Search Bar

```typescript
import { Search } from "lucide-react";

<div className="flex items-center gap-2">
  <SearchBar />
  <ThemeToggle />
</div>
```

### Add CTA Button

```typescript
<Button className="hidden lg:flex">
  Get Started
</Button>
```

### Custom Mobile Menu Width

```typescript
className="w-full max-w-md" // Change max-w-sm to max-w-md
```

### Disable Progress Bar

Remove this from navbar.tsx:

```typescript
<motion.div
  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
  // ... remove entire progress bar div
/>
```

## 🐛 Quick Fixes

### Active section not working?
✅ Check section IDs match navigation hrefs (without #)

### Scroll offset wrong?
✅ Adjust `offset` constant to match navbar height

### Mobile menu won't close?
✅ Verify ESC key handler is enabled

### No blur effect?
✅ Check scroll threshold (default: 50px)

## 📱 Responsive Breakpoints

- **Mobile:** < 1024px (hamburger menu)
- **Desktop:** ≥ 1024px (full navigation)

## 🎨 Color Customization

**Active link background:**
```typescript
bg-primary/10  // 10% opacity
```

**Scrolled navbar:**
```typescript
bg-background/80  // 80% opacity
backdrop-blur-lg   // Blur amount
```

**Border:**
```typescript
border-border/50  // 50% opacity
```

## 📚 More Info

- **Full Docs:** [NAVBAR_DOCUMENTATION.md](./NAVBAR_DOCUMENTATION.md)
- **Demo Page:** `/navbar-demo`
- **Main README:** [README.md](./README.md)

---

**Quick Tip:** Start with the demo page to see all features, then customize! 🚀



