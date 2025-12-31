"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Download,
  Briefcase,
  FolderGit2,
  Code2,
  Users,
  Heart,
  Target,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedUnderlineGradient } from "@/components/ui/animated-underline";
import { StatCard } from "./stat-card";
import { FloatingShapes } from "./floating-particles";

interface StatItem {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

interface AboutSectionProps {
  name?: string;
  role?: string;
  imageSrc?: string;
  bio?: string[];
  bioParagraphs?: string[];
  stats?: StatItem[];
  philosophy?: string | {
    title?: string;
    points?: string[];
  };
  resumeUrl?: string;
  enableBackground?: boolean;
}

const defaultBioParagraphs = [
  "I'm a passionate full-stack developer with a love for creating elegant solutions to complex problems. My journey in tech started over 5 years ago, and I've been fortunate to work on diverse projects that have shaped my expertise.",
  "I specialize in building scalable web applications using modern technologies like React, Next.js, Node.js, and TypeScript. My approach combines technical excellence with user-centric design, ensuring every project delivers real value.",
  "When I'm not coding, you'll find me contributing to open-source projects, writing technical blog posts, or mentoring aspiring developers. I believe in giving back to the community that has given me so much.",
];

const defaultPhilosophyPoints = [
  "Clean, maintainable code is not just a preference—it's a responsibility to future developers and users.",
  "User experience should drive technical decisions, not the other way around.",
  "Continuous learning is essential in tech; staying curious keeps us innovative.",
  "Collaboration and communication are as important as technical skills.",
];

export function AboutSection({
  name = "Muhammad Moazam",
  role = "MERN Stack Developer",
  imageSrc = "https://ui-avatars.com/api/?name=Muhammad+Moazam&background=14B8A6&color=fff&bold=true&size=400&font-size=0.35",
  bio,
  bioParagraphs,
  stats,
  philosophy,
  resumeUrl = "/resume.pdf",
  enableBackground = true,
}: AboutSectionProps) {
  // Use bio if provided, otherwise use bioParagraphs
  const bioText = bio || bioParagraphs || defaultBioParagraphs;
  
  // Handle philosophy as string or object
  const philosophyData = typeof philosophy === "string" 
    ? { title: "My Philosophy", points: [philosophy] }
    : philosophy || { title: "What Drives Me", points: defaultPhilosophyPoints };

  // Default stats if none provided
  const defaultStats = [
    {
      value: 5,
      label: "Years Experience",
      icon: Briefcase,
      suffix: "+",
    },
    {
      value: 50,
      label: "Projects Completed",
      icon: FolderGit2,
      suffix: "+",
    },
    {
      value: 30,
      label: "Technologies Mastered",
      icon: Code2,
      suffix: "+",
    },
    {
      value: 20,
      label: "Happy Clients",
      icon: Users,
      suffix: "+",
    },
  ];

  // Map stats to include icons
  const statsData = stats 
    ? stats.map((stat, index) => ({
        ...stat,
        icon: [Briefcase, FolderGit2, Code2, Users][index] || Briefcase,
      }))
    : defaultStats;

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden">
      {/* Decorative Background */}
      {enableBackground && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />
          <FloatingShapes />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedUnderlineGradient>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              About Me
            </h2>
          </AnimatedUnderlineGradient>
          <motion.p
            className="text-lg md:text-xl text-foreground-secondary mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Get to know the person behind the code
          </motion.p>
        </motion.div>

        {/* Main Content - Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Left Column - Photo & Bio */}
          <div className="space-y-8">
            {/* Professional Photo */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Decorative border animation */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity" />
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  opacity: 0.3,
                }}
              />

              {/* Image container */}
              <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-2xl border-4 border-background">
                <Image
                  src={imageSrc}
                  alt={name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Fallback to a placeholder
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      name
                    )}&size=400&background=random`;
                  }}
                />
              </div>

              {/* Name & Role Badge */}
              <motion.div
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 glass-effect px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-border shadow-lg max-w-[90%] sm:max-w-none text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <p className="font-semibold text-foreground text-sm sm:text-base whitespace-nowrap">{name}</p>
                <p className="text-xs sm:text-sm text-primary font-medium">{role}</p>
              </motion.div>
            </motion.div>

            {/* Download Resume Button */}
            <motion.div
              className="flex justify-center pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  onClick={() => window.open(resumeUrl, "_blank")}
                  className="group"
                >
                  <Download className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                  Download Resume
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Bio Text */}
          <div className="space-y-6">
            {bioText.map((paragraph, index) => (
              <motion.p
                key={index}
                className="text-foreground-secondary text-lg leading-relaxed"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.6,
                }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-20">
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Key Highlights
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <StatCard
                key={stat.label}
                {...stat}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Philosophy Section */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-effect p-8 md:p-12 rounded-2xl border border-border">
            {/* Philosophy Icon & Title */}
            <div className="flex items-center gap-4 mb-8">
              <motion.div
                className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Heart className="h-7 w-7 text-primary" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-bold">
                {philosophyData.title}
              </h3>
            </div>

            {/* Philosophy Points */}
            <div className="space-y-6">
              {philosophyData.points?.map((point, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                  }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-foreground-secondary leading-relaxed">
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Decorative corner element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}


