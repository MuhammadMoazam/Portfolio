# Responsive Navbar Component Documentation

A production-ready, feature-rich navigation component built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🎯 Features

### ✅ All Requirements Met

1. **Logo/Name on Left** - Gradient text logo with focus states
2. **Navigation Links** - Home, About, Skills, Projects, Experience, Contact
3. **Theme Toggle Button** - Integrated with theme system
4. **Mobile Hamburger Menu** - Animated slide-in drawer from right
5. **Scroll-based Blur Effect** - Transparent → Blurred background
6. **Active Section Highlighting** - IntersectionObserver-based detection
7. **Smooth Scroll** - Custom smooth scrolling to sections
8. **Sticky Positioning** - Fixed at top with backdrop blur
9. **Keyboard Accessible** - Full tab navigation, ESC to close
10. **Framer Motion Animations** - Spring animations throughout

## 📁 File Structure

```
components/
├── layout/
│   ├── navbar.tsx           # Main navbar component
│   └── mobile-menu.tsx      # Mobile menu drawer

lib/
├── constants/
│   └── navigation.ts        # Navigation links data
└── hooks/
    └── use-active-section.ts # Active section detection hook
```

## 🚀 Quick Start

### Basic Usage

```typescript
import { Navbar } from "@/components/layout/navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
```

### Page Structure

Your page should have sections with IDs matching the navigation links:

```typescript
<main>
  <section id="home">Home Content</section>
  <section id="about">About Content</section>
  <section id="skills">Skills Content</section>
  <section id="projects">Projects Content</section>
  <section id="experience">Experience Content</section>
  <section id="contact">Contact Content</section>
</main>
```

## 🎨 Features in Detail

### 1. Logo/Name Component

```typescript
<a
  href="#home"
  className="text-2xl lg:text-3xl font-bold gradient-text"
>
  Portfolio
</a>
```

**Customization:**
- Change "Portfolio" to your name/brand
- Modify text size with Tailwind classes
- Update gradient in `globals.css` (`.gradient-text`)

### 2. Navigation Links

**Configuration:** `lib/constants/navigation.ts`

```typescript
export const navigationLinks: NavLink[] = [
  { name: "Home", href: "#home", label: "Go to home section" },
  // ... more links
];
```

**To customize:**
1. Edit the `navigationLinks` array
2. Add/remove sections as needed
3. Update href and accessibility labels

### 3. Scroll-based Blur Effect

Activates after scrolling 50px:

```typescript
const [isScrolled, setIsScrolled] = useState(false);

useMotionValueEvent(scrollY, "change", (latest) => {
  setIsScrolled(latest > 50);
});
```

**Styling:**
- Transparent: `bg-transparent`
- Blurred: `bg-background/80 backdrop-blur-lg shadow-lg border-b`

**Customize threshold:**
```typescript
setIsScrolled(latest > 100); // Change 50 to 100
```

### 4. Active Section Detection

Uses IntersectionObserver with optimized settings:

```typescript
const observer = new IntersectionObserver(entries => {
  // Detect when section is in viewport center
}, {
  rootMargin: "-50% 0px -50% 0px",
  threshold: 0,
});
```

**How it works:**
1. Observes all sections with IDs from navigation
2. Triggers when section crosses viewport center
3. Updates active state automatically
4. Highlights corresponding nav link

### 5. Smooth Scrolling

Custom implementation with offset for navbar height:

```typescript
const handleNavigation = (href: string) => {
  const element = document.getElementById(sectionId);
  const offset = 80; // Navbar height
  
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};
```

**Customize offset:**
```typescript
const offset = 100; // For taller navbars
```

### 6. Mobile Menu

**Features:**
- Slides in from right
- Animated backdrop
- Body scroll lock when open
- ESC key to close
- Touch-friendly
- Animated link items

**Animations:**
```typescript
// Menu slide-in
initial={{ x: "100%" }}
animate={{ x: 0 }}
exit={{ x: "100%" }}
transition={{
  type: "spring",
  damping: 25,
  stiffness: 200,
}}
```

### 7. Keyboard Accessibility

**Implemented features:**
- ✅ Tab navigation through all links
- ✅ Focus visible indicators (ring-2)
- ✅ ESC to close mobile menu
- ✅ Enter/Space to activate links
- ✅ ARIA labels and roles
- ✅ aria-current for active section
- ✅ aria-expanded for mobile menu

**Focus styling:**
```typescript
focus:outline-none 
focus:ring-2 
focus:ring-primary 
focus:ring-offset-2
```

### 8. Progress Bar

Visual indicator of scroll progress:

```typescript
<motion.div
  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
  style={{
    scaleX: scrollPosition / totalScrollHeight,
  }}
/>
```

## 🎨 Customization Guide

### Change Logo

**In `navbar.tsx`:**
```typescript
<a href="#home" className="...">
  YourName // or <Image src="..." />
</a>
```

### Add/Remove Navigation Links

**In `lib/constants/navigation.ts`:**
```typescript
export const navigationLinks: NavLink[] = [
  { name: "Home", href: "#home", label: "Go to home" },
  { name: "Services", href: "#services", label: "View services" },
  // Add your links here
];
```

### Customize Colors

**Navbar background (scrolled):**
```typescript
className="bg-background/80 backdrop-blur-lg"
// Change opacity: bg-background/90
```

**Active link indicator:**
```typescript
className="bg-primary/10" // Change color or opacity
```

**Progress bar:**
```typescript
className="h-[2px] bg-primary" // Change height or color
```

### Adjust Animations

**Page load animation:**
```typescript
initial={{ y: -100 }}
animate={{ y: 0 }}
transition={{ 
  type: "spring", 
  stiffness: 200, // Higher = faster
  damping: 20      // Higher = less bounce
}}
```

**Active section transition:**
```typescript
transition={{
  type: "spring",
  stiffness: 380,  // Very snappy
  damping: 30,     // Minimal bounce
}}
```

### Change Navbar Height

**Desktop:**
```typescript
className="h-16 lg:h-20" // Change 20 to desired height
```

**Update offset:**
```typescript
const offset = 80; // Match your navbar height
```

## 🎭 Animation Details

### Navbar Entry

```typescript
motion.header
  initial={{ y: -100 }}     // Starts above viewport
  animate={{ y: 0 }}        // Slides down
  transition={{ type: "spring", stiffness: 200, damping: 20 }}
```

### Navigation Links Stagger

```typescript
links.map((link, index) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 + index * 0.05 }} // Staggered
  >
    {link.name}
  </motion.div>
))
```

### Active Section Indicator

```typescript
{isActive && (
  <motion.div
    layoutId="activeSection"  // Shared layout animation
    className="absolute inset-0 bg-primary/10"
    transition={{
      type: "spring",
      stiffness: 380,
      damping: 30,
    }}
  />
)}
```

### Mobile Menu Slide-in

```typescript
<motion.div
  initial={{ x: "100%" }}
  animate={{ x: 0 }}
  exit={{ x: "100%" }}
  transition={{
    type: "spring",
    damping: 25,
    stiffness: 200,
  }}
>
  {/* Menu content */}
</motion.div>
```

## 🔧 Advanced Customization

### Add Dropdown Menus

```typescript
interface NavLink {
  name: string;
  href: string;
  label: string;
  children?: NavLink[];  // Add this
}

// Then in navbar:
{link.children && (
  <Dropdown items={link.children} />
)}
```

### Add Search Bar

```typescript
<div className="flex items-center space-x-2">
  <SearchBar />
  <ThemeToggle />
  <MenuButton />
</div>
```

### Add CTA Button

```typescript
<Button variant="default" className="hidden lg:flex">
  Get Started
</Button>
```

### Add Social Links (Mobile Menu)

```typescript
<div className="p-6 border-t border-border">
  <div className="flex gap-4 justify-center">
    <a href="#"><Github /></a>
    <a href="#"><Twitter /></a>
    <a href="#"><Linkedin /></a>
  </div>
</div>
```

## 📱 Responsive Behavior

### Breakpoints

- **Mobile**: < 1024px → Hamburger menu
- **Desktop**: ≥ 1024px → Full navigation

### Mobile Menu

- Full-width on small screens
- Max width 384px on larger mobiles
- Slides from right
- Backdrop overlay
- Body scroll lock

### Desktop Navigation

- Horizontal link layout
- Hover effects
- Active section highlighting
- Smooth layout animations

## ♿ Accessibility Features

### ARIA Attributes

```typescript
// Navigation
<nav aria-label="Main navigation">

// Links
<button
  aria-label="Go to about section"
  aria-current={isActive ? "page" : undefined}
>

// Mobile menu
<div
  role="dialog"
  aria-modal="true"
  aria-label="Mobile navigation menu"
>
```

### Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Move to next focusable element |
| Shift+Tab | Move to previous element |
| Enter | Activate focused link |
| Escape | Close mobile menu |

### Focus Management

- Visible focus indicators (ring-2)
- Logical tab order
- No focus traps
- Skip to content available

## 🐛 Troubleshooting

### Active section not updating

**Problem:** Section highlighting doesn't work
**Solution:** Ensure section IDs match navigation hrefs (without #)

```typescript
// Navigation link
href: "#about"

// Section element
<section id="about"> // Not id="#about"
```

### Scroll jumps too far

**Problem:** Scrolling overshoots section
**Solution:** Adjust offset in `handleNavigation`

```typescript
const offset = 80; // Try 100 or adjust based on navbar height
```

### Mobile menu doesn't close

**Problem:** Menu stays open
**Solution:** Check ESC key handler is attached

```typescript
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };
  document.addEventListener("keydown", handleEscape);
  return () => document.removeEventListener("keydown", handleEscape);
}, [onClose]);
```

### Blur effect not working

**Problem:** Background stays transparent
**Solution:** Verify scroll detection threshold

```typescript
// Check isScrolled state updates
console.log("Scroll Y:", latest, "Is Scrolled:", latest > 50);
```

### Links not animating

**Problem:** No stagger animation on page load
**Solution:** Check Framer Motion is installed

```bash
npm install framer-motion
```

## 📊 Performance Tips

1. **Use `layoutId` for shared animations** - More performant than separate animations
2. **Throttle scroll events** - Already optimized in useScroll hook
3. **Lazy load mobile menu** - Menu only renders when needed
4. **Use CSS transforms** - Hardware accelerated animations
5. **Memoize callbacks** - Prevents unnecessary re-renders

## 🔗 Related Files

- `components/layout/navbar.tsx` - Main navbar
- `components/layout/mobile-menu.tsx` - Mobile drawer
- `lib/constants/navigation.ts` - Navigation data
- `lib/hooks/use-active-section.ts` - Section detection
- `app/navbar-demo/page.tsx` - Demo page

## 📚 Demo

Visit `/navbar-demo` to see all features in action:
- Scroll to see blur effect
- Watch active section highlighting
- Try mobile menu on small screens
- Test keyboard navigation
- Toggle theme

---

**Built with ❤️ for Next.js 14**



