# Experience Data & Name Wrapping Fix

## Issues Found

### 1. Work Experience Showing Dummy Data
**Problem**: Experience section was displaying default dummy data (Tech Innovations Inc., Digital Solutions Corp, etc.) instead of your actual work experience from Hubble42 and Web Media Voice.

**Root Cause**: Prop name mismatch - the component expected `experiences` (plural) but was receiving `experience` (singular), causing it to fall back to default dummy data.

### 2. Name Breaking to Multiple Lines
**Problem**: "Muhammad Moazam" was wrapping, with the 'm' appearing on the next line.

**Root Cause**: No whitespace control on the h1 element, causing text to wrap at narrow viewport widths.

---

## Solutions Applied

### Fix 1: Experience Data Prop
**File**: `app/page.tsx`

```tsx
// BEFORE
<ExperienceSection experience={experience} />

// AFTER
<ExperienceSection experiences={experience} />
```

Now correctly passes your experience data:
- **Hubble42 (via Turing Platform)** - JavaScript Developer (July 2025 - Present)
  - Physics simulations with p5.js
  - Video annotation for Claude and o4-mini
  - Function-calling pipelines
  - Dockerization
  
- **Web Media Voice** - MERN Stack Developer Intern (June 2024 - September 2024)
  - Full-stack MERN development
  - RESTful APIs optimization
  - Database performance improvements

### Fix 2: Name Wrapping
**File**: `components/sections/hero.tsx`

```tsx
// Added whitespace-nowrap wrapper and adjusted font sizes
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground">
  <span className="inline-block whitespace-nowrap">
    {nameChars.map((char, index) => (
      // ... character animation
    ))}
  </span>
</h1>
```

**Changes**:
1. Wrapped name characters in `<span className="inline-block whitespace-nowrap">`
2. Adjusted responsive font sizes to prevent overflow:
   - Mobile: `text-4xl` (smaller to fit)
   - Small: `text-5xl`
   - Medium: `text-6xl`
   - Large: `text-7xl`
   - XL: `text-8xl`

---

## Expected Result

### Work Experience Section
Now displays YOUR actual experience:
```
┌─────────────────────────────────────────┐
│         Work Experience                 │
│                                         │
│  Current Position                       │
│  JavaScript Developer                   │
│  Hubble42 (via Turing Platform)        │
│  July 2025 - Present                    │
│  Lahore, Pakistan                       │
│                                         │
│  • Physics simulations with p5.js       │
│  • Video annotation for AI models       │
│  • Function-calling pipelines           │
│  • Dockerization of tools               │
│                                         │
│  MERN Stack Developer Intern            │
│  Web Media Voice                        │
│  June 2024 - September 2024             │
│  Punjab, Pakistan                       │
│                                         │
│  • Full-stack MERN development          │
│  • RESTful APIs optimization            │
│  • Database performance improvements    │
└─────────────────────────────────────────┘
```

### Hero Name Display
```
┌─────────────────────────────────────────┐
│                                         │
│        Muhammad Moazam                  │  ← Single line, no wrapping
│                                         │
│     MERN Stack Developer |              │
│                                         │
└─────────────────────────────────────────┘
```

---

## Verification Steps

1. **Hard refresh** your browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Check Hero section - name should be on one line
3. Scroll to Experience section - should show Hubble42 and Web Media Voice
4. No more dummy data (Tech Innovations Inc., etc.)

---

## Files Modified
- `app/page.tsx` - Fixed prop name from `experience` to `experiences`
- `components/sections/hero.tsx` - Added whitespace-nowrap and adjusted font sizes

**Status**: ✅ Both issues fixed!


