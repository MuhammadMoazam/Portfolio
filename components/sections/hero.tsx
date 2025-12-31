"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowRight, MessageCircle } from "lucide-react";
import { useTypingEffect } from "@/lib/hooks/use-typing-effect";
import { Button } from "@/components/ui/button";
import { AnimatedGradientBackground } from "./animated-background";
import { NetworkParticles } from "./network-particles";
import { ScrollIndicator } from "./scroll-indicator";

interface SocialLink {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

interface HeroProps {
  name?: string;
  roles?: string[];
  tagline?: string;
  socialLinks?: SocialLink;
  enableNetworkParticles?: boolean;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
}

export function HeroSection({
  name = "John Doe",
  roles = [
    "Full-Stack Developer",
    "Backend Engineer",
    "Frontend Specialist",
    "Problem Solver",
  ],
  tagline = "Crafting elegant solutions to complex problems. Passionate about building scalable applications that make a difference.",
  socialLinks = {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "mailto:hello@example.com",
  },
  enableNetworkParticles = true,
  primaryCTA = { text: "View Projects", href: "#projects" },
  secondaryCTA = { text: "Contact Me", href: "#contact" },
}: HeroProps) {
  const { text: currentRole } = useTypingEffect({
    words: roles,
    typingSpeed: 100,
    deletingSpeed: 50,
    delayBetweenWords: 2000,
  });

  const socialLinksArray = [
    {
      name: "GitHub",
      icon: Github,
      href: socialLinks.github || "#",
      color: "hover:text-[#333] dark:hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: socialLinks.linkedin || "#",
      color: "hover:text-[#0077B5]",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: socialLinks.twitter || "#",
      color: "hover:text-[#1DA1F2]",
    },
    {
      name: "Email",
      icon: Mail,
      href: socialLinks.email || "#",
      color: "hover:text-primary",
    },
  ];

  // Split name into characters for animation
  const nameChars = name.split("");

  const handleCTAClick = (href: string) => {
    const element = document.getElementById(href.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0"
    >
      {/* Animated Gradient Background */}
      <AnimatedGradientBackground />

      {/* Network Particles Effect */}
      {enableNetworkParticles && (
        <NetworkParticles
          particleCount={80}
          particleColor="rgba(45, 212, 191, 0.8)"
          lineColor="rgba(45, 212, 191, 0.15)"
          particleSize={2}
          lineWidth={1}
          maxDistance={150}
          speed={0.5}
        />
      )}

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated Name */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-2">
            <span className="inline-block whitespace-nowrap">
              {nameChars.map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block gradient-text"
                style={{ 
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundImage: 'linear-gradient(135deg, rgb(45, 212, 191) 0%, rgb(56, 189, 248) 50%, rgb(45, 212, 191) 100%)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 8s ease infinite',
                }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          </h1>
        </motion.div>

        {/* Typing Role */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary font-heading font-bold h-10 sm:h-12 flex items-center justify-center tracking-tight">
            <span className="mr-2">{currentRole}</span>
            <motion.span
              className="inline-block w-0.5 h-5 sm:h-6 md:h-8 bg-primary"
              animate={{ opacity: [1, 0, 1] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </h2>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground-secondary max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-12 font-light leading-relaxed px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <Button
              size="lg"
              onClick={() => handleCTAClick(primaryCTA.href)}
              className="group w-full sm:w-auto"
            >
              {primaryCTA.text}
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              </motion.div>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleCTAClick(secondaryCTA.href)}
              className="group w-full sm:w-auto"
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" aria-hidden="true" />
              {secondaryCTA.text}
            </Button>
          </motion.div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex gap-4 sm:gap-6 justify-center mb-12 sm:mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          {socialLinksArray.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-foreground-secondary ${social.color} transition-all duration-300`}
              aria-label={`Visit my ${social.name} profile (opens in new tab)`}
              title={social.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.1 + index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{
                scale: 1.2,
                rotate: [0, -10, 10, 0],
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              <social.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" aria-hidden="true" />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-2 sm:bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <ScrollIndicator variant="arrow" />
        </motion.div>
      </div>
    </section>
  );
}

// Minimal variant
export function HeroMinimal() {
  const defaultRoles = [
    "Full-Stack Developer",
    "Backend Engineer",
    "Frontend Specialist",
    "Problem Solver",
  ];
  
  const { text: currentRole } = useTypingEffect({
    words: defaultRoles,
    typingSpeed: 100,
    deletingSpeed: 50,
    delayBetweenWords: 2000,
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.h1
          className="text-6xl md:text-8xl font-bold gradient-text mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          John Doe
        </motion.h1>
        <motion.h2
          className="text-2xl md:text-3xl text-primary mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {currentRole}
          <motion.span
            className="inline-block w-0.5 h-6 bg-primary ml-1"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </motion.h2>
      </div>
    </section>
  );
}

// Alias for backward compatibility
export { HeroSection as Hero };
