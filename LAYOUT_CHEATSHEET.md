# Layout Component Cheatsheet

Quick reference for using the main layout system.

## 🚀 Quick Start

```typescript
import { MainLayout } from "@/components/layout";

export default function Page() {
  return (
    <MainLayout>
      {/* Your content */}
    </MainLayout>
  );
}
```

## 📦 Components

### MainLayout

```typescript
<MainLayout
  showNavbar={true}
  showFooter={true}
  showBackToTop={true}
  showScrollProgress={true}
  enableTransitions={true}
  className="custom-class"
>
  {children}
</MainLayout>
```

### SimpleLayout

```typescript
<SimpleLayout>
  {/* Minimal layout */}
</SimpleLayout>
```

### CenteredLayout

```typescript
<CenteredLayout>
  {/* Centered content */}
</CenteredLayout>
```

### FullWidthLayout

```typescript
<FullWidthLayout>
  {/* Full-width content */}
</FullWidthLayout>
```

## 🎨 Individual Components

### ScrollProgress

```typescript
import { ScrollProgress, ScrollProgressGradient } from "@/components/layout";

// Standard
<ScrollProgress />

// Custom
<ScrollProgress
  color="bg-primary"
  height="h-2"
  position="top"
  showPercentage={true}
/>

// Gradient
<ScrollProgressGradient />
```

### BackToTop

```typescript
import { BackToTop, BackToTopCompact } from "@/components/layout";

// Animated
<BackToTop showAfter={300} scrollDuration={500} />

// Simple
<BackToTopCompact showAfter={200} />
```

### Footer

```typescript
import { Footer } from "@/components/layout";

<Footer />
```

## 🎯 Common Patterns

### Landing Page

```typescript
<MainLayout>
  <section id="home">Hero</section>
  <section id="features">Features</section>
  <section id="pricing">Pricing</section>
  <section id="contact">Contact</section>
</MainLayout>
```

### Blog Post

```typescript
<CenteredLayout>
  <article>
    <h1>Post Title</h1>
    <p>Content...</p>
  </article>
</CenteredLayout>
```

### Dashboard

```typescript
<SimpleLayout>
  <DashboardContent />
</SimpleLayout>
```

### Portfolio

```typescript
<FullWidthLayout>
  <Gallery />
</FullWidthLayout>
```

## 🔧 Customization

### Update Social Links

```typescript
// components/layout/footer.tsx
const socialLinks = [
  { name: "GitHub", href: "https://github.com/you", icon: Github },
  { name: "Twitter", href: "https://twitter.com/you", icon: Twitter },
];
```

### Change Brand Name

```typescript
// components/layout/footer.tsx
<h3 className="gradient-text">Your Brand</h3>
```

### Adjust Scroll Threshold

```typescript
<BackToTop showAfter={500} />
```

### Change Progress Color

```typescript
<ScrollProgress color="bg-gradient-to-r from-blue-500 to-purple-500" />
```

## 🎭 Features

| Feature | Component | Default |
|---------|-----------|---------|
| Navbar | `Navbar` | ✅ |
| Footer | `Footer` | ✅ |
| Scroll Progress | `ScrollProgress` | ✅ |
| Back to Top | `BackToTop` | ✅ |
| Page Transitions | AnimatePresence | ✅ |

## 📱 Responsive

All components are fully responsive:
- **Navbar**: Mobile menu < 1024px
- **Footer**: Grid adapts to screen size
- **BackToTop**: Always bottom-right
- **ScrollProgress**: Full width

## ⌨️ Keyboard Accessible

- ✅ Tab navigation
- ✅ Focus indicators
- ✅ ARIA labels
- ✅ Semantic HTML

## 🎨 Props Reference

### MainLayout

| Prop | Type | Default |
|------|------|---------|
| `showNavbar` | `boolean` | `true` |
| `showFooter` | `boolean` | `true` |
| `showBackToTop` | `boolean` | `true` |
| `showScrollProgress` | `boolean` | `true` |
| `enableTransitions` | `boolean` | `true` |
| `className` | `string` | `""` |

### ScrollProgress

| Prop | Type | Default |
|------|------|---------|
| `color` | `string` | `"bg-primary"` |
| `height` | `string` | `"h-1"` |
| `position` | `"top" \| "bottom"` | `"top"` |
| `showPercentage` | `boolean` | `false` |

### BackToTop

| Prop | Type | Default |
|------|------|---------|
| `showAfter` | `number` | `300` |
| `scrollDuration` | `number` | `500` |

## 🐛 Quick Fixes

### Button not showing
```typescript
<BackToTop showAfter={100} />  // Lower threshold
```

### Wrong padding
```typescript
<MainLayout className="pt-0 pb-12">
```

### Disable transitions
```typescript
<MainLayout enableTransitions={false}>
```

### Hide footer
```typescript
<MainLayout showFooter={false}>
```

## 📚 More Info

- **Full Docs**: [LAYOUT_DOCUMENTATION.md](./LAYOUT_DOCUMENTATION.md)
- **Navbar Docs**: [NAVBAR_DOCUMENTATION.md](./NAVBAR_DOCUMENTATION.md)
- **Demo Page**: `/layout-demo`

---

**Quick Tip**: Start with `MainLayout` and customize as needed! 🚀



