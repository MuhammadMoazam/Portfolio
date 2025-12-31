# Next.js Image Configuration Guide

## 📸 Current Image Configuration

Your `next.config.js` is configured to allow images from the following sources:

### ✅ Configured Domains

1. **cdn.jsdelivr.net** - Devicon technology icons
   - Used for: Skill icons in Skills section
   - Example: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg`

2. **images.unsplash.com** - Unsplash placeholder images
   - Used for: Demo project images, placeholders
   - Example: `https://images.unsplash.com/photo-1549923746-c502d488b3ea`

3. **via.placeholder.com** - Placeholder images
   - Used for: Temporary placeholders
   - Example: `https://via.placeholder.com/600x400`

4. **avatars.githubusercontent.com** - GitHub user avatars
   - Used for: Profile pictures, contributor avatars
   - Example: `https://avatars.githubusercontent.com/u/12345`

5. **raw.githubusercontent.com** - GitHub repository assets
   - Used for: Project images hosted on GitHub
   - Example: `https://raw.githubusercontent.com/user/repo/main/image.png`

6. **res.cloudinary.com** - Cloudinary CDN
   - Used for: Optimized image hosting
   - Example: `https://res.cloudinary.com/account/image/upload/...`

---

## 🚨 Important: Restart Required

**After changing `next.config.js`, you MUST restart your dev server:**

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

Hot reload does NOT apply to Next.js config changes!

---

## ➕ Adding New Image Sources

If you need to add images from a new domain:

### Step 1: Update next.config.js

```javascript
// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      // ... existing patterns
      {
        protocol: 'https',
        hostname: 'your-cdn.com',
        pathname: '/optional/path/**', // Optional: restrict to specific paths
      },
    ],
  },
}
```

### Step 2: Restart Dev Server

```bash
# Stop and restart
npm run dev
```

---

## 📝 Common Image Sources

### For Portfolio Projects

**Good sources for project screenshots:**
- ✅ **Your own domain** - Add your website domain
- ✅ **GitHub** - Already configured
- ✅ **Cloudinary** - Already configured
- ✅ **Imgur** - Need to add: `i.imgur.com`
- ✅ **AWS S3** - Need to add: `your-bucket.s3.amazonaws.com`

**Example for your domain:**
```javascript
{
  protocol: 'https',
  hostname: 'muhammadmoazam.com', // Your domain
}
```

### For Company Logos

**Add if needed:**
```javascript
{
  protocol: 'https',
  hostname: 'logo.clearbit.com', // Company logos
}
```

---

## 🎯 Using Local Images

For images in your project, place them in the `public` folder:

```
public/
  ├── assets/
  │   ├── avatar.jpg
  │   ├── companies/
  │   │   ├── hubble42.png
  │   │   └── webmediavoice.png
  │   ├── projects/
  │   │   ├── project1.jpg
  │   │   └── project2.jpg
  │   └── education/
  │       └── uet-logo.png
```

**Use in components:**
```tsx
<Image
  src="/assets/avatar.jpg"  // No configuration needed!
  alt="Profile"
  width={200}
  height={200}
/>
```

---

## 🔒 Security Best Practices

### 1. Use Specific Paths When Possible

```javascript
// ✅ Better - Restricts to specific path
{
  protocol: 'https',
  hostname: 'cdn.example.com',
  pathname: '/images/**',
}

// ⚠️ Less secure - Allows all paths
{
  protocol: 'https',
  hostname: 'cdn.example.com',
}
```

### 2. Only Add Trusted Domains

Only add domains you control or well-known, trusted services.

### 3. Avoid Wildcards

Don't use wildcards in hostnames:
```javascript
// ❌ Don't do this
hostname: '*.example.com',
```

---

## 🐛 Troubleshooting

### Error: "hostname is not configured"

**Symptom:**
```
Error: Invalid src prop (...) on `next/image`, 
hostname "example.com" is not configured
```

**Solution:**
1. Add the hostname to `next.config.js`
2. **Restart** the dev server (not just refresh!)

### Error: Images still not loading after adding domain

**Checklist:**
- [ ] Did you restart the dev server?
- [ ] Is the protocol correct (http vs https)?
- [ ] Is the hostname spelled correctly?
- [ ] Does the pathname match (if specified)?
- [ ] Is the image URL accessible in browser?

### Error: Image optimization failed

**Possible causes:**
- Image is too large (>25MB)
- Image format not supported
- Remote server is blocking requests

**Solution:** Use local images or optimize before uploading.

---

## 📊 Image Optimization

Next.js automatically optimizes images:

- ✅ Resizes to appropriate sizes
- ✅ Converts to modern formats (WebP, AVIF)
- ✅ Lazy loads images
- ✅ Prevents Cumulative Layout Shift
- ✅ Caches optimized images

**Requirements:**
- Width and height must be specified (or `fill` prop)
- Images must be from configured domains
- Supported formats: JPEG, PNG, WebP, AVIF, GIF, SVG

---

## 🎨 Best Practices for Your Portfolio

### 1. Use Local Images for Important Assets

```bash
# Store locally for reliability
public/assets/
  ├── avatar.jpg           # Your photo
  ├── resume.pdf          # Your resume
  └── projects/           # Project screenshots
```

### 2. Optimize Images Before Upload

- Use tools like TinyPNG, ImageOptim
- Target sizes:
  - Thumbnails: 600x400px
  - Full images: 1200x800px
  - Avatars: 400x400px

### 3. Provide Fallbacks

```tsx
<ImageWithFallback
  src="/assets/project.jpg"
  fallbackSrc="/assets/placeholder.jpg"
  alt="Project"
/>
```

### 4. Use Appropriate Formats

- Photos: JPEG/WebP
- Graphics/logos: PNG/SVG
- Animations: GIF/video

---

## 🔄 Current Configuration

**File:** `next.config.js`

```javascript
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { 
        protocol: 'https', 
        hostname: 'cdn.jsdelivr.net',
        pathname: '/gh/devicons/devicon/**',
      },
      { 
        protocol: 'https', 
        hostname: 'images.unsplash.com' 
      },
      { 
        protocol: 'https', 
        hostname: 'via.placeholder.com' 
      },
      { 
        protocol: 'https', 
        hostname: 'avatars.githubusercontent.com' 
      },
      { 
        protocol: 'https', 
        hostname: 'raw.githubusercontent.com' 
      },
      { 
        protocol: 'https', 
        hostname: 'res.cloudinary.com' 
      },
    ],
  },
}
```

---

## ✅ Status

- ✅ Devicon icons configured
- ✅ Unsplash images configured  
- ✅ Common CDNs configured
- ✅ GitHub assets configured
- ⚠️ **Action needed:** Restart dev server!

---

## 📚 Resources

- [Next.js Image Documentation](https://nextjs.org/docs/api-reference/next/image)
- [Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Remote Patterns](https://nextjs.org/docs/api-reference/next/legacy/image#remote-patterns)

---

**Last Updated:** December 30, 2025

**Remember:** Always restart dev server after config changes! 🔄


