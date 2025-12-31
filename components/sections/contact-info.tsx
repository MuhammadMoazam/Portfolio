"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, Twitter, ExternalLink } from "lucide-react";

interface ContactInfoItem {
  icon: React.ComponentType<any>;
  label: string;
  value: string;
  href?: string;
}

interface SocialLink {
  name: string;
  icon: React.ComponentType<any>;
  href: string;
  color: string;
}

interface ContactInfoProps {
  email?: string;
  phone?: string;
  location?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export function ContactInfo({ 
  email = "muhammadmoazam711@gmail.com",
  phone = "+92 321 9341847",
  location = "Lahore, Punjab, Pakistan",
  socialLinks: socialLinksProps
}: ContactInfoProps = {}) {
  const contactInfo: ContactInfoItem[] = [
    {
      icon: Mail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: location,
    },
  ];

  const socialLinks: SocialLink[] = [
    {
      name: "GitHub",
      icon: Github,
      href: socialLinksProps?.github || "https://github.com/MuhammadMoazam",
      color: "hover:text-[#333] dark:hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: socialLinksProps?.linkedin || "https://linkedin.com/in/muhammadmoazam53",
      color: "hover:text-[#0077b5]",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: socialLinksProps?.twitter || "#",
      color: "hover:text-[#1DA1F2]",
    },
  ];
  return (
    <div className="space-y-8">
      {/* Encouraging Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h3 className="text-2xl font-bold text-foreground">Let's Work Together</h3>
        <p className="text-foreground-secondary leading-relaxed">
          Have a project in mind or just want to chat? I'm always open to discussing new opportunities, creative ideas, or ways to be part of your vision.
        </p>
      </motion.div>

      {/* Contact Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        {contactInfo.map((item, index) => (
          <ContactInfoCard key={item.label} item={item} index={index} />
        ))}
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <h4 className="text-sm font-semibold text-foreground-secondary uppercase tracking-wider">
          Connect With Me
        </h4>
        <div className="flex gap-3">
          {socialLinks.map((social, index) => (
            <SocialLinkButton key={social.name} social={social} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Decorative Element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
      >
        <p className="text-sm text-foreground-secondary italic">
          "The best way to predict the future is to create it together."
        </p>
        <p className="text-xs text-foreground-secondary mt-2">
          — Let's build something amazing
        </p>
      </motion.div>
    </div>
  );
}

function ContactInfoCard({ item, index }: { item: ContactInfoItem; index: number }) {
  const Icon = item.icon;
  const content = (
    <motion.div
      className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground-secondary mb-1">
          {item.label}
        </p>
        <p className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
          {item.value}
        </p>
      </div>
      {item.href && (
        <ExternalLink className="h-4 w-4 text-foreground-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </motion.div>
  );

  if (item.href) {
    return (
      <motion.a
        href={item.href}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        aria-label={`${item.label}: ${item.value}`}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      {content}
    </motion.div>
  );
}

function SocialLinkButton({ social, index }: { social: SocialLink; index: number }) {
  const Icon = social.icon;

  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`h-12 w-12 rounded-lg bg-muted flex items-center justify-center transition-colors ${social.color}`}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 200,
      }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Visit my ${social.name} profile`}
    >
      <Icon className="h-5 w-5" />
    </motion.a>
  );
}



