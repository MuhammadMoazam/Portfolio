# Next.js 14 Project

A modern Next.js 14 application with TypeScript, Tailwind CSS, and Framer Motion.

## 🎉 Portfolio Data - POPULATED!

**✅ Your portfolio is now fully populated with real data from `resume.md`!**

All sections display your actual information:
- ✅ **Personal Info:** Muhammad Moazam - MERN Stack Developer
- ✅ **Skills:** 20 technologies with proficiency levels
- ✅ **Experience:** 2 positions (Hubble42, Web Media Voice)
- ✅ **Projects:** 4 detailed projects with achievements
- ✅ **Education:** UET Lahore + Punjab College
- ✅ **Certifications:** 2 certifications
- ✅ **SEO:** Optimized with your information

**📁 All data in ONE file:** `lib/data/resume-data.ts`

**📖 Documentation:**
- [PORTFOLIO_DATA_POPULATED.md](./PORTFOLIO_DATA_POPULATED.md) - Complete overview
- [QUICK_UPDATE_GUIDE.md](./QUICK_UPDATE_GUIDE.md) - How to update data
- [RESUME_INTEGRATION_COMPLETE.md](./RESUME_INTEGRATION_COMPLETE.md) - Integration summary

---

## Features

- ⚡️ Next.js 14 with App Router
- 🎨 Tailwind CSS with custom theming
- 🌙 **Complete Dark/Light Mode System**
  - React Context API for global state
  - localStorage persistence
  - System preference detection
  - No theme flash on page load (SSR compatible)
  - Smooth animated transitions
- 🧭 **Responsive Navbar Component**
  - Scroll-based blur effect
  - Active section detection
  - Mobile hamburger menu with animations
  - Smooth scroll to sections
  - Keyboard accessible
  - Sticky positioning with backdrop blur
- 📐 **Complete Layout System**
  - Main layout with navbar & footer
  - Scroll progress indicator
  - Back-to-top floating button
  - Smooth page transitions
  - Multiple layout variants
  - Rich footer with social links
- 🎬 **Impressive Hero Section**
  - Character-by-character name animation
  - Typing effect cycling through roles
  - Snowfall effect (react-snowfall)
  - Animated gradient background
  - Floating particles
  - Social media links with animations
  - Scroll indicator
  - Full viewport, performance optimized
- 👤 **About Me Section**
  - Animated heading with gradient underline
  - Professional photo with rotating border
  - Scroll-reveal bio paragraphs
  - Counter-animated statistics
  - Philosophy/values subsection
  - Download resume button
  - Two-column responsive layout
- 🛠️ **Skills Section**
  - Category filters (All, Frontend, Backend, Database, Tools)
  - Animated progress bars fill on scroll
  - Radial/circular progress charts
  - Hover tooltips with years of experience
  - Stagger animations for cards
  - Smooth filter transition animations
  - Glow effects on hover
  - Responsive grid layout
- 💼 **Projects/Portfolio Section**
  - Project count in heading
  - Filter by technology (All, React, Node.js, Python)
  - Animated project cards with thumbnails
  - Image hover zoom effect
  - Tech stack badges
  - GitHub and live demo links
  - Hover overlay with quick actions
  - Full-featured detail modal
  - Stagger animations on scroll
  - Smooth filter transitions
  - "View All Projects" expandable button
- 💼 **Experience Section**
  - Vertical timeline with animated line
  - Alternating left/right card layout (desktop)
  - Company logos and information
  - Job title, duration, location
  - Quantified achievements (bullet points)
  - Tech stack badges
  - Scroll-triggered card animations
  - Timeline draws progressively on scroll
  - Current job highlighted with pulse effect
  - Responsive single-column layout (mobile)
- 🎓 **Education & Certifications Section**
  - Two-column layout (Education | Certifications)
  - Institution/organization logos
  - Degree, field, duration, GPA
  - Key achievements for education
  - Certification details with credential IDs
  - Verification and credential links
  - Skills badges for certifications
  - Hover effects with glow
  - Scroll-triggered animations
  - Responsive stacking on mobile
- 📬 **Contact Section**
  - Two-column layout (Contact info | Form)
  - Contact details with icons (email, location)
  - Social media links
  - Floating label form inputs
  - Real-time form validation
  - Email format validation
  - Submit button with loading state
  - Success/error toast notifications
  - Honeypot spam protection
  - Decorative floating particles
  - Full accessibility (ARIA labels)
  - Responsive design
- ♿ **Full Accessibility (WCAG 2.1 AA)**
  - Skip-to-main-content link
  - 100% keyboard accessible
  - Visible focus indicators (4px ring)
  - Screen reader optimized (ARIA labels, live regions)
  - Color contrast 4.5:1+ (exceeds requirements)
  - Reduced motion support
  - Form error announcements
  - Semantic HTML structure
  - Tested with NVDA and VoiceOver
- ✨ **Micro-Interactions & Polish**
  - Page load animation sequence
  - Smooth scroll behavior with easing
  - Button hover/click animations (scale + ripple)
  - Link underline animations (4 variants)
  - Card hover lift effects with shadow
  - Loading skeleton components with shimmer
  - Smooth image reveal on load (5 variants)
  - Section transition animations on scroll
  - Custom cursor effects (optional)
  - Easter egg (Konami code) 🎮
  - All animations respect reduced motion
- 🛡️ **Error Handling & Edge Cases**
  - Error boundary components (global & section)
  - Image fallback UI (3 variants)
  - Offline state detection with banner
  - Loading states for all async operations
  - Custom error pages (404, 500, global)
  - Form error handling with retry logic
  - Empty states (7 variants)
  - Performance guards for slow devices
  - Automatic performance adjustments
  - Connection speed detection
- ✨ Framer Motion animations
- 🎯 TypeScript for type safety
- 🎄 React Snowfall for effects
- 📜 React Scroll for smooth scrolling
- 🎨 Lucide React icons
- 🎊 Canvas Confetti for celebrations
- 🔧 Custom hooks and utilities

## Folder Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── sections/         # Page sections
│   └── layout/           # Layout components (Header, Footer)
├── lib/                  # Utilities and hooks
│   ├── utils.ts         # Utility functions
│   └── hooks/           # Custom React hooks
├── styles/              # Global styles
│   └── globals.css      # Global CSS with theme variables
├── public/              # Static assets
│   ├── assets/          # General assets
│   └── images/          # Images
└── README.md
```

## Getting Started

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Dependencies

### Core
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **clsx** - Conditional class names
- **tailwind-merge** - Merge Tailwind classes

### UI & Animation
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Snowfall** - Snowfall effects

### Utilities
- **React Scroll** - Smooth scrolling
- **Canvas Confetti** - Confetti animations

## Theme System

This project includes a complete, production-ready dark/light theme system:

### Quick Usage

```typescript
import { useTheme } from "@/lib/hooks";

function MyComponent() {
  const { theme, toggleTheme, setTheme, mounted } = useTheme();
  
  if (!mounted) return null;
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

### Features
- ✅ React Context for global state
- ✅ Persists to localStorage
- ✅ Respects system preference
- ✅ No flash on page load
- ✅ Smooth animations
- ✅ Full TypeScript support

📖 **[Read the complete Theme System Documentation →](./THEME_SYSTEM.md)**

🎭 **[View Theme Demo →](http://localhost:3000/theme-demo)** (after running `npm run dev`)

## Responsive Navbar

A production-ready navigation component with all modern features:

### Quick Usage

```typescript
import { Navbar } from "@/components/layout/navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <section id="home">Home</section>
        <section id="about">About</section>
        {/* More sections */}
      </main>
    </>
  );
}
```

### Features
- ✅ Scroll-based background blur
- ✅ Active section highlighting
- ✅ Mobile menu with animations
- ✅ Smooth scroll navigation
- ✅ Keyboard accessible (Tab, ESC)
- ✅ Sticky positioning
- ✅ Theme toggle integrated

📖 **[Complete Navbar Documentation →](./NAVBAR_DOCUMENTATION.md)**
📋 **[Quick Cheatsheet →](./NAVBAR_CHEATSHEET.md)**
🎯 **[View Navbar Demo →](http://localhost:3000/navbar-demo)** (after running `npm run dev`)

## Complete Layout System

A production-ready layout with all essential components integrated:

### Quick Usage

```typescript
import { MainLayout } from "@/components/layout";

export default function Page() {
  return (
    <MainLayout>
      <section id="home">Home</section>
      <section id="about">About</section>
    </MainLayout>
  );
}
```

### Features
- ✅ Responsive navbar at top
- ✅ Rich footer with social links
- ✅ Scroll progress indicator
- ✅ Back-to-top floating button
- ✅ Smooth page transitions
- ✅ Multiple layout variants

📖 **[Complete Layout Documentation →](./LAYOUT_DOCUMENTATION.md)**
📋 **[Layout Cheatsheet →](./LAYOUT_CHEATSHEET.md)**
🎯 **[View Layout Demo →](http://localhost:3000/layout-demo)** (after running `npm run dev`)

## Hero Section

An impressive hero section with 11 premium features:

### Quick Usage

```typescript
import { Hero } from "@/components/sections/hero";

export default function Page() {
  return (
    <Hero
      name="Your Name"
      tagline="Your amazing tagline..."
      enableSnowfall={true}
      enableParticles={true}
    />
  );
}
```

### Features
- ✅ Character-by-character name reveal
- ✅ Typing effect (4 roles)
- ✅ Snowfall with react-snowfall
- ✅ Animated gradient background
- ✅ Floating particles
- ✅ Social links with hover effects
- ✅ Scroll indicator
- ✅ Two CTA buttons
- ✅ Performance optimized (60fps)

📖 **[Complete Hero Documentation →](./HERO_DOCUMENTATION.md)**
🎯 **[View Hero Demo →](http://localhost:3000/hero-demo)** (after running `npm run dev`)

## About Me Section

A comprehensive about section with scroll-triggered animations:

### Quick Usage

```typescript
import { AboutSection } from "@/components/sections/about";

export default function Page() {
  return (
    <AboutSection
      name="Your Name"
      role="Your Role"
      stats={{
        experience: 5,
        projects: 50,
        technologies: 30,
        clients: 20
      }}
    />
  );
}
```

### Features
- ✅ Animated heading with underline
- ✅ Photo with rotating border effect
- ✅ Scroll-reveal bio paragraphs
- ✅ Counter-animated stats (4 cards)
- ✅ Philosophy subsection
- ✅ Download resume button
- ✅ Decorative backgrounds
- ✅ Two-column layout (responsive)
- ✅ Framer Motion animations

📖 **[Complete About Documentation →](./ABOUT_DOCUMENTATION.md)**
🎯 **[View About Demo →](http://localhost:3000/about-demo)** (after running `npm run dev`)

## Skills Section

A dynamic skills showcase with animated progress indicators:

### Quick Usage

```typescript
import { SkillsSection } from "@/components/sections/skills";

export default function Page() {
  return (
    <SkillsSection
      showRadialVariant={true}
      enableFilters={true}
    />
  );
}
```

### Features
- ✅ Category filters with smooth transitions
- ✅ Animated progress bars (fill on scroll)
- ✅ Radial progress charts option
- ✅ Hover tooltips (years of experience)
- ✅ Stagger animations for cards
- ✅ Glow/scale hover effects
- ✅ Responsive grid (1-4 columns)
- ✅ Filter transition animations

🎯 **[View Skills Demo →](http://localhost:3000/skills-demo)** (after running `npm run dev`)

## Projects/Portfolio Section

A comprehensive portfolio showcase with animated cards and **enhanced detail modals**:

### Quick Usage

```typescript
import { ProjectsSection } from "@/components/sections/projects";

export default function Page() {
  return (
    <ProjectsSection
      showLimit={6}
      enableFilters={true}
      showViewAll={true}
    />
  );
}
```

### Features
- ✅ Section heading with dynamic project count
- ✅ Category filters with smooth transitions
- ✅ Project cards with hover effects
- ✅ Image zoom on hover
- ✅ Tech stack badges
- ✅ GitHub & live demo quick actions
- ✅ **Enhanced detail modal with 13 sections**
- ✅ Stagger animations
- ✅ "View All" expandable button
- ✅ Keyboard accessible (ESC to close, arrows to navigate)

### Enhanced Project Detail Modal Includes:
1. **Large hero image carousel** with swipe navigation
2. **Project title and tagline**
3. **Full description**
4. **"The Problem" section** - Challenge overview
5. **"My Solution" section** - Your approach
6. **Technical Highlights** - Bullet points of achievements
7. **Tech stack with badges**
8. **Key features grid**
9. **Results/Impact metrics** - Data-driven outcomes
10. **GitHub and Live Demo buttons** - Prominent CTAs
11. **Next/Previous navigation** - Browse projects in modal
12. **Close button with animation**
13. **Backdrop blur** - Focus on content

🎯 **[View Projects Demo →](http://localhost:3000/projects-demo)** (after running `npm run dev`)

## Experience Section

A professional work history timeline with animated elements:

### Quick Usage

```typescript
import { ExperienceSection } from "@/components/sections/experience";

export default function Page() {
  return <ExperienceSection />;
}
```

### Features
- ✅ **Vertical timeline layout** - Animated connecting line
- ✅ **Alternating cards** - Left/right on desktop, single column on mobile
- ✅ **Animated dots** - Pulse effect for current position
- ✅ **Company information** - Logo, name, position, dates, location
- ✅ **Quantified achievements** - Bullet points with check icons
- ✅ **Tech stack badges** - Technologies used
- ✅ **Scroll animations** - Cards slide in from sides
- ✅ **Timeline drawing** - Line progressively draws as you scroll
- ✅ **Current job highlight** - Special badge and styling
- ✅ **Responsive design** - Perfect on all screen sizes

🎯 **[View Experience Demo →](http://localhost:3000/experience-demo)** (after running `npm run dev`)

## Education & Certifications Section

A professional showcase of academic and professional credentials:

### Quick Usage

```typescript
import { EducationSection } from "@/components/sections/education";

export default function Page() {
  return <EducationSection />;
}
```

### Features
- ✅ **Section heading** - Animated with gradient underline
- ✅ **Two-column layout** - Education | Certifications side by side
- ✅ **Education cards** - Institution logo, degree, GPA, achievements
- ✅ **Certification cards** - Name, organization, credential ID, verification links
- ✅ **Hover effects** - Cards lift and glow on interaction
- ✅ **Scroll animations** - Stagger reveal with spring animations
- ✅ **Responsive design** - Stacks beautifully on mobile devices
- ✅ **Credential links** - Direct links to view and verify certifications
- ✅ **Skills badges** - Technologies covered by certifications

🎯 **[View Education Demo →](http://localhost:3000/education-demo)** (after running `npm run dev`)

## Contact Section

A comprehensive contact solution with form validation and notifications:

### Quick Usage

```typescript
import { ContactSection } from "@/components/sections/contact";
import { ToastProvider } from "@/components/ui/toast";

export default function Page() {
  return (
    <ToastProvider>
      <ContactSection />
    </ToastProvider>
  );
}
```

### Features
- ✅ **Section heading** - Encouraging subtext to invite contact
- ✅ **Two-column layout** - Contact info (left) | Form (right)
- ✅ **Contact information** - Email, location, social links with icons
- ✅ **Floating label form** - Material Design-style animated labels
- ✅ **Form validation** - Real-time validation with error messages
- ✅ **Email validation** - Proper regex pattern matching
- ✅ **Submit button** - Loading state with spinner animation
- ✅ **Toast notifications** - Success/error toasts with auto-dismiss
- ✅ **Decorative elements** - Floating particles and gradient shapes
- ✅ **ARIA labels** - Full accessibility support (screen readers)
- ✅ **Honeypot protection** - Hidden field to prevent spam bots
- ✅ **Responsive design** - Stacks beautifully on mobile

🎯 **[View Contact Demo →](http://localhost:3000/contact-demo)** (after running `npm run dev`)

### Contact API

The contact form is backed by a secure API route with:
- ✅ Server-side validation (Zod)
- ✅ XSS protection (input sanitization)
- ✅ Rate limiting (5 requests/hour per IP)
- ✅ Honeypot spam protection
- ✅ Email notifications (Resend/Nodemailer)
- ✅ TypeScript types
- ✅ Graceful error handling

**API Endpoint:** `POST /api/contact`

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API documentation.

**Setup:**
1. Install dependencies: `npm install zod`
2. Copy `.env.example` to `.env.local`
3. Configure email service (Resend or Nodemailer)
4. Update `lib/email.ts` with your email provider

## SEO Optimization

The portfolio is fully optimized for search engines with:

### Features
- ✅ **Comprehensive metadata** - Title, description, keywords
- ✅ **Open Graph tags** - Facebook, LinkedIn sharing
- ✅ **Twitter Card** - Beautiful Twitter previews
- ✅ **Canonical URLs** - Prevent duplicate content
- ✅ **robots.txt** - Allow all crawlers
- ✅ **Dynamic sitemap** - Auto-generated XML sitemap
- ✅ **JSON-LD** - Person schema structured data
- ✅ **Image alt text** - All images have descriptive alt text
- ✅ **Heading hierarchy** - Proper H1, H2, H3 structure
- ✅ **Custom 404 page** - Branded error page
- ✅ **Favicons** - All sizes and formats
- ✅ **Web manifest** - PWA support

### Configuration

1. **Update site config** (`lib/site-config.ts`):
```typescript
export const siteConfig = {
  name: "Your Name",
  url: "https://yourwebsite.com",
  author: {
    name: "Your Name",
    email: "your@email.com",
    // ... update all fields
  },
};
```

2. **Set environment variable**:
```bash
NEXT_PUBLIC_APP_URL=https://yourwebsite.com
```

3. **Generate favicons**: Use [Favicon Generator](https://realfavicongenerator.net/)
4. **Create OG image**: 1200x630px at `/public/og-image.jpg`

See [SEO_GUIDE.md](./SEO_GUIDE.md) and [FAVICON_SETUP.md](./FAVICON_SETUP.md) for complete instructions.

## Accessibility

This portfolio is **fully accessible** and meets **WCAG 2.1 Level AA** standards.

### Features
- ✅ **Skip to main content** - Keyboard users can bypass navigation
- ✅ **100% keyboard accessible** - All features work without a mouse
- ✅ **Focus indicators** - Clear 4px ring on all interactive elements
- ✅ **Screen reader optimized** - ARIA labels, live regions, semantic HTML
- ✅ **Color contrast** - 4.5:1+ ratio (exceeds WCAG AA)
- ✅ **Reduced motion** - Respects `prefers-reduced-motion` preference
- ✅ **Form accessibility** - Error announcements, proper labels
- ✅ **Tested** - NVDA, VoiceOver, Lighthouse (98/100)

### Demo
Visit `/accessibility-demo` to test all accessibility features interactively.

### Documentation
- [ACCESSIBILITY.md](./ACCESSIBILITY.md) - Complete guide
- [WCAG_COMPLIANCE.md](./WCAG_COMPLIANCE.md) - Compliance report
- [ACCESSIBILITY_TESTING.md](./ACCESSIBILITY_TESTING.md) - Testing guide
- [ACCESSIBILITY_SUMMARY.md](./ACCESSIBILITY_SUMMARY.md) - Quick summary

### Usage Examples

**Screen Reader Announcements:**
```tsx
import { useAnnounce } from "@/components/ui/announce";

function MyComponent() {
  const { announce } = useAnnounce();
  
  const handleSuccess = () => {
    announce("Form submitted successfully", "polite");
  };
}
```

**Reduced Motion:**
```tsx
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

function MyComponent() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      animate={{ y: prefersReducedMotion ? 0 : -10 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
    >
      Content
    </motion.div>
  );
}
```

## Micro-Interactions & Polish

Beautiful animations and interactions throughout the portfolio.

### Features
- ✅ **Page load animations** - Coordinated sequence on load
- ✅ **Button animations** - Scale + ripple on hover/click
- ✅ **Link animations** - 4 variants (underline, slide, glow, scale)
- ✅ **Card effects** - Lift, glow, shine, gradient border
- ✅ **Loading skeletons** - Shimmer effect for dynamic content
- ✅ **Image reveals** - 5 animation variants
- ✅ **Section transitions** - Scroll-triggered animations
- ✅ **Smooth scroll** - Easing functions, custom duration
- ✅ **Custom cursor** - Optional smooth follower
- ✅ **Easter egg** - Konami code surprise 🎮

### Demo
Visit `/micro-interactions-demo` to see all animations in action!

### Documentation
- [MICRO_INTERACTIONS.md](./MICRO_INTERACTIONS.md) - Complete guide with examples

### Usage Examples

**Animated Button:**
```tsx
import { Button } from "@/components/ui/button";

<Button>Hover me!</Button>
```

**Animated Link:**
```tsx
import { AnimatedLink } from "@/components/ui/animated-link";

<AnimatedLink href="/about" variant="underline">
  About Me
</AnimatedLink>
```

**Card with Hover Effect:**
```tsx
import { AnimatedCard } from "@/components/ui/animated-card";

<AnimatedCard liftEffect glowEffect>
  <YourContent />
</AnimatedCard>
```

**Loading Skeleton:**
```tsx
import { ProjectCardSkeleton } from "@/components/ui/loading-skeleton";

<ProjectCardSkeleton />
```

**Section Reveal:**
```tsx
import { SectionReveal } from "@/components/ui/section-reveal";

<SectionReveal direction="up" delay={0.2}>
  <YourContent />
</SectionReveal>
```

**Easter Egg:**
```tsx
import { KonamiEasterEgg } from "@/components/ui/easter-egg";

<KonamiEasterEgg />
// Try: ↑ ↑ ↓ ↓ ← → ← → B A
```

## Custom Hooks

- `useTheme` - Complete theme management (light/dark mode)
- `useScroll` - Track scroll position and direction
- `useMediaQuery` - Responsive design helper
- `useActiveSection` - Detect active section based on scroll
- `useTypingEffect` - Typing animation with customizable speed
- `useCounterAnimation` - Number counting animation with easing
- `useReducedMotion` - Detect reduced motion preference
- `useAnnounce` - Screen reader announcements

## Theme Configuration

The project uses CSS variables for theming, supporting both light and dark modes. Colors are configured in:
- `tailwind.config.ts` - Tailwind theme extension
- `styles/globals.css` - CSS variable definitions

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

