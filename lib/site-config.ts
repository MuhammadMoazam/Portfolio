// Site configuration for SEO and metadata

export const siteConfig = {
  name: "Muhammad Moazam",
  title: "MERN Stack Developer | Muhammad Moazam - Portfolio",
  description: "Experienced MERN Stack Developer and JavaScript Developer specializing in React, Node.js, Express, MongoDB, and modern web technologies. Building scalable applications with clean, maintainable code.",
  keywords: [
    "Muhammad Moazam",
    "MERN Stack Developer",
    "JavaScript Developer",
    "React Developer",
    "Node.js Developer",
    "Full-Stack Developer",
    "Express.js",
    "MongoDB",
    "Web Development",
    "Software Engineer",
    "Lahore Developer",
    "Pakistan Developer",
    "Portfolio",
    "AI Projects",
    "Microservices",
  ],
  url: process.env.NEXT_PUBLIC_APP_URL || "https://muhammadmoazam.com",
  ogImage: "/og-image.jpg",
  author: {
    name: "Muhammad Moazam",
    email: "muhammadmoazam711@gmail.com",
    linkedin: "https://linkedin.com/in/muhammadmoazam53",
    github: "https://github.com/MuhammadMoazam",
    twitter: "#",
  },
};

// JSON-LD Structured Data for Person schema
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.author.name,
  url: siteConfig.url,
  email: siteConfig.author.email,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  jobTitle: "MERN Stack Developer & JavaScript Developer",
  description: siteConfig.description,
  worksFor: {
    "@type": "Organization",
    name: "Hubble42 (via Turing Platform)",
  },
  sameAs: [
    siteConfig.author.linkedin,
    siteConfig.author.github,
  ],
  knowsAbout: [
    "Web Development",
    "MERN Stack",
    "JavaScript",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "RESTful APIs",
    "Full-Stack Development",
    "Software Engineering",
    "AI/ML Integration",
    "Microservices",
    "Docker",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "University of Engineering and Technology, Lahore",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "Pakistan",
  },
};


