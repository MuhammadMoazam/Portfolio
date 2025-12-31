# Quick Image Replacement Guide

## 🎯 Current Status

All images are currently using `/placeholder.svg` - a simple blue SVG with "Photo" text.

**No 404 errors!** Everything works, but shows placeholder.

---

## 📸 Add Your Real Images

### Step 1: Prepare Images

**Profile Photo:**
- File: `avatar.jpg` or `avatar.png`
- Size: 400x400px (square)
- Format: JPG or PNG

**Company Logos:**
- Hubble42 logo
- Web Media Voice logo
- Size: 200x200px
- Format: PNG (transparent background recommended)

**Project Screenshots:**
- 11 images total (4 projects)
- Size: 1200x800px (landscape) for full images
- Size: 600x400px for thumbnails
- Format: JPG

**Education Logos:**
- UET Lahore logo
- Punjab College logo
- Size: 200x200px
- Format: PNG

**Certification Badges:**
- Web Media Voice certificate
- Turing Platform certificate
- Size: 200x200px
- Format: PNG

---

### Step 2: Add Files

Copy your images to these locations:

```
public/
  ├── avatar.jpg                    # Your photo
  └── assets/
      ├── companies/
      │   ├── hubble42.png
      │   └── webmediavoice.png
      ├── projects/
      │   ├── ecommerce-1.jpg
      │   ├── ecommerce-2.jpg
      │   ├── ecommerce-3.jpg
      │   ├── agentic-1.jpg
      │   ├── agentic-2.jpg
      │   ├── video-1.jpg
      │   ├── video-2.jpg
      │   ├── travel-1.jpg
      │   ├── travel-2.jpg
      │   ├── travel-3.jpg
      │   └── thumbnails/      # Optional subfolder
      ├── education/
      │   ├── uet-logo.png
      │   └── punjab-college.png
      └── certifications/
          ├── webmediavoice-cert.png
          └── turing-cert.png
```

---

### Step 3: Update resume-data.ts

Open `lib/data/resume-data.ts` and replace placeholder paths:

#### Profile Photo

```typescript
// In AboutSection props (currently uses default)
// Just replace public/avatar.jpg with your photo
// No code changes needed!
```

#### Company Logos

```typescript
export const experience = [
  {
    // Change from:
    logo: "/placeholder.svg",
    // To:
    logo: "/assets/companies/hubble42.png",
  },
];
```

#### Project Images

```typescript
export const projects = [
  {
    // Change from:
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    thumbnail: "/placeholder.svg",
    
    // To:
    images: [
      "/assets/projects/ecommerce-1.jpg",
      "/assets/projects/ecommerce-2.jpg",
      "/assets/projects/ecommerce-3.jpg",
    ],
    thumbnail: "/assets/projects/ecommerce-1.jpg",
  },
];
```

#### Education Logos

```typescript
export const education = [
  {
    // Change from:
    logo: "/placeholder.svg",
    // To:
    logo: "/assets/education/uet-logo.png",
  },
];
```

#### Certification Logos

```typescript
export const certifications = [
  {
    // Change from:
    organizationLogo: "/placeholder.svg",
    // To:
    organizationLogo: "/assets/certifications/webmediavoice-cert.png",
  },
];
```

---

### Step 4: Verify

1. Save the file
2. Check your portfolio
3. All images should now display!

---

## 🎨 Image Optimization Tips

### Before Adding Images

**Compress:**
- Use TinyPNG, ImageOptim, or Squoosh
- Target: <500KB per image

**Resize:**
- Use exact sizes mentioned above
- Don't rely on browser resizing

**Format:**
- Photos: JPG (smaller size)
- Logos: PNG (supports transparency)
- Icons: SVG (best quality, scalable)

---

## 🔧 Tools

### Free Image Editors
- **Resize:** ILoveIMG.com
- **Compress:** TinyPNG.com
- **Edit:** Photopea.com (free Photoshop)
- **Remove BG:** Remove.bg

### Quick Command (if you have ImageMagick)

```bash
# Resize profile photo
magick avatar-original.jpg -resize 400x400^ -gravity center -extent 400x400 avatar.jpg

# Resize company logo
magick logo-original.png -resize 200x200 -background transparent -gravity center -extent 200x200 logo.png

# Resize project screenshot
magick project-original.jpg -resize 1200x800^ -gravity center -extent 1200x800 project-1.jpg
```

---

## ⚡ Quick Start

### Don't Have Images Yet?

**That's OK!** The placeholders work fine. You can:

1. **Use stock photos** temporarily:
   - Unsplash.com (free, high-quality)
   - Pexels.com (free)

2. **Generate avatars**:
   - UI-Avatars.com (text-based)
   - Boring Avatars (geometric patterns)

3. **Use later**: Just add images when ready!

---

## 📝 Checklist

When you have your images ready:

- [ ] Profile photo (400x400)
- [ ] Hubble42 logo (200x200)
- [ ] Web Media Voice logo (200x200)
- [ ] Project screenshots (1200x800 each)
- [ ] UET Lahore logo (200x200)
- [ ] Punjab College logo (200x200)
- [ ] Certification images (200x200)

Then:

- [ ] Copy files to public folder
- [ ] Update resume-data.ts paths
- [ ] Save and check portfolio
- [ ] Done! 🎉

---

## 🎯 Priority Order

If you can only add a few images now:

1. **Profile photo** (most important!)
2. **Project screenshots** (showcase your work)
3. **Company logos** (professional look)
4. **Education logos** (nice to have)
5. **Certification badges** (optional)

---

**Current:** All using `/placeholder.svg` ✅ Working, no errors

**Future:** Your real images 🎨 Even better!

**No Rush:** Add images when you're ready!


