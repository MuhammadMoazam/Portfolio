# Quick Update Guide

## 📝 How to Update Your Portfolio Data

All your portfolio data is centralized in **ONE FILE** for easy updates:

**File:** `lib/data/resume-data.ts`

---

## Common Updates

### 1. Add a New Skill

```typescript
// lib/data/resume-data.ts
export const skills = [
  // ... existing skills
  {
    name: "TypeScript",
    category: "Frontend",  // Frontend, Backend, Database, Tools
    proficiency: 85,       // 0-100
    yearsOfExperience: 1.5,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
];
```

**Skill Icon URLs:**
- Find icons at: https://devicon.dev/
- Format: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{name}/{name}-original.svg`

---

### 2. Add a New Project

```typescript
// lib/data/resume-data.ts
export const projects = [
  // ... existing projects
  {
    id: 5,
    title: "Your Project Name",
    tagline: "Short catchy description",
    category: "Full Stack",  // or "AI/ML", "Frontend", "Backend"
    description: "Brief overview of the project",
    images: [
      "/assets/projects/your-project-1.jpg",
      "/assets/projects/your-project-2.jpg",
    ],
    thumbnail: "/assets/projects/your-project-thumb.jpg",
    technologies: ["React", "Node.js", "MongoDB"],
    problem: "What problem does it solve?",
    solution: "How does it solve it?",
    technicalHighlights: [
      "Technical achievement 1",
      "Technical achievement 2",
    ],
    keyFeatures: [
      "Feature 1",
      "Feature 2",
    ],
    results: {
      metric1: { label: "Users", value: "1000+" },
      metric2: { label: "Performance", value: "50% faster" },
    },
    githubUrl: "https://github.com/MuhammadMoazam/project-name",
    liveUrl: "https://project-demo.com",
    featured: true,  // Shows on homepage
  },
];
```

---

### 3. Add Work Experience

```typescript
// lib/data/resume-data.ts
export const experience = [
  // Add at the beginning for most recent
  {
    id: 3,
    company: "Company Name",
    companyUrl: "https://company.com",
    logo: "/assets/companies/company-logo.png",
    position: "Your Position",
    location: "City, Country",
    startDate: "Month Year",
    endDate: "Present",  // or "Month Year"
    current: true,       // true if still working here
    description: "Brief company/role description",
    achievements: [
      "Achievement 1 with metrics",
      "Achievement 2 with results",
      "Achievement 3",
    ],
    technologies: ["Tech1", "Tech2", "Tech3"],
  },
  // ... existing experience
];
```

---

### 4. Add Education/Certification

```typescript
// Education
export const education = [
  {
    id: 3,
    institution: "University Name",
    institutionShort: "UN",
    logo: "/assets/education/university-logo.png",
    degree: "Your Degree",
    field: "Your Field",
    location: "City, Country",
    startDate: "Year",
    endDate: "Year",
    gpa: "3.5",
    maxGpa: "4.0",
    achievements: [
      "Achievement 1",
      "Achievement 2",
    ],
    coursework: ["Course 1", "Course 2"],
  },
];

// Certification
export const certifications = [
  {
    id: 3,
    name: "Certification Name",
    organization: "Issuing Organization",
    organizationLogo: "/assets/certifications/org-logo.png",
    dateEarned: "Month Year",
    credentialId: "ID-12345",
    credentialUrl: "https://credential-url.com",
    verificationUrl: "https://verify-url.com",
    description: "What the certification covers",
    skills: ["Skill1", "Skill2"],
  },
];
```

---

### 5. Update Personal Info

```typescript
// lib/data/resume-data.ts
export const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  roles: [
    "Role 1",
    "Role 2",
    "Role 3",
  ],
  tagline: "Your tagline",
  bio: [
    "First paragraph about you",
    "Second paragraph about your experience",
  ],
  philosophy: "Your work philosophy",
  location: "City, Country",
  email: "your.email@example.com",
  phone: "+XX XXX XXXXXXX",
  resumeUrl: "/resume.pdf",
};
```

---

### 6. Update Stats

```typescript
// lib/data/resume-data.ts
export const stats = [
  {
    value: 3,              // Number
    label: "Years Experience",
    suffix: "+",            // Optional: "+", "K", "M"
  },
  {
    value: 20,
    label: "Projects Completed",
    suffix: "+",
  },
  // ... more stats
];
```

---

### 7. Update Social Links

```typescript
// lib/data/resume-data.ts
export const socialLinks = {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourprofile",
  twitter: "https://twitter.com/yourhandle",
  email: "mailto:your.email@example.com",
};
```

---

## 🎨 Adding Images

### Project Images
```bash
public/assets/projects/
  ├── project-name-1.jpg      # Main screenshot
  ├── project-name-2.jpg      # Additional screenshots
  ├── project-name-3.jpg
  └── project-name-thumb.jpg  # Thumbnail (for grid)
```

**Image sizes:**
- Thumbnails: 600x400px
- Full images: 1200x800px
- Format: JPG or PNG

### Profile Photo
```bash
public/assets/
  └── avatar.jpg              # 400x400px square
```

### Company Logos
```bash
public/assets/companies/
  ├── company-name.png        # 200x200px
  └── another-company.png
```

### Education Logos
```bash
public/assets/education/
  ├── university-logo.png     # 200x200px
  └── college-logo.png
```

---

## 🔄 After Updates

1. **Save the file** (`lib/data/resume-data.ts`)
2. **Refresh browser** - Changes appear immediately in dev mode
3. **Test the section** - Verify data displays correctly
4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 💡 Tips

1. **Be consistent:** Use same date formats throughout
2. **Be specific:** Include metrics and results where possible
3. **Update regularly:** Keep skills and experience current
4. **Optimize images:** Compress before adding
5. **Test responsively:** Check on mobile after updates

---

## 🚀 Quick Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Check for errors
npm run lint

# Format code
npm run format
```

---

## 📋 Checklist for Updates

- [ ] Updated `resume-data.ts`
- [ ] Added any new images
- [ ] Tested in browser
- [ ] Checked mobile view
- [ ] Verified links work
- [ ] Ran `npm run build` successfully
- [ ] No linter errors

---

**Need Help?**
- Check `PORTFOLIO_DATA_POPULATED.md` for full documentation
- See demo pages for examples: `/skills-demo`, `/projects-demo`, etc.

**File to edit:** `lib/data/resume-data.ts`

**That's it! All portfolio data is in ONE place.** ✨


