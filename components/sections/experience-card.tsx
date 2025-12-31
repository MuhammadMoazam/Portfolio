"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, CheckCircle2, Briefcase } from "lucide-react";
import { TechBadgeGroup } from "@/components/ui/tech-badge";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface Experience {
  id: string | number;
  company: string;
  companyLogo?: string;
  companyUrl?: string;
  logo?: string;
  position: string;
  duration?: string;
  startDate?: string;
  endDate?: string;
  location: string;
  description?: string;
  achievements: string[];
  technologies: string[];
  current?: boolean;
}

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  side: "left" | "right";
}

export function ExperienceCard({ experience, index, side }: ExperienceCardProps) {
  return (
    <motion.div
      className={cn(
        "relative",
        side === "left" ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
      )}
      initial={{ 
        opacity: 0, 
        x: side === "left" ? -100 : 100,
        y: 50 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0,
        y: 0 
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
    >
      {/* Card Container */}
      <motion.div
        className={cn(
          "relative glass-effect p-6 rounded-xl border transition-all group",
          experience.current
            ? "border-primary bg-primary/5 shadow-lg shadow-primary/20"
            : "border-border hover:border-primary/50"
        )}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        {/* Current Job Badge */}
        {experience.current && (
          <motion.div
            className="absolute -top-3 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-6 px-3 py-1 bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold rounded-full shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            Current Position
          </motion.div>
        )}

        {/* Header Section */}
        <div className={cn(
          "flex items-start gap-4 mb-4",
          side === "left" ? "md:flex-row-reverse" : "flex-row"
        )}>
          {/* Company Logo */}
          {experience.companyLogo ? (
            <motion.div
              className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-border"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Image
                src={experience.companyLogo}
                alt={experience.company}
                fill
                className="object-cover"
              />
            </motion.div>
          ) : (
            <motion.div
              className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Briefcase className="h-8 w-8 text-primary" />
            </motion.div>
          )}

          {/* Company & Position Info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {experience.position}
            </h3>
            <p className="text-lg font-semibold text-foreground-secondary mt-1">
              {experience.company}
            </p>
          </div>
        </div>

        {/* Meta Information */}
        <div className={cn(
          "flex flex-wrap gap-4 text-sm text-foreground-secondary mb-4",
          side === "left" ? "md:justify-end" : "justify-start"
        )}>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{experience.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{experience.location}</span>
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-3 mb-4">
          {experience.achievements.map((achievement, idx) => (
            <motion.div
              key={idx}
              className={cn(
                "flex items-start gap-2",
                side === "left" ? "md:flex-row-reverse md:text-right" : "flex-row text-left"
              )}
              initial={{ opacity: 0, x: side === "left" ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + idx * 0.05 + index * 0.1 }}
            >
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-foreground-secondary leading-relaxed">
                {achievement}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Technologies */}
        <motion.div
          className={cn(
            "flex",
            side === "left" ? "md:justify-end" : "justify-start"
          )}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 + index * 0.1 }}
        >
          <TechBadgeGroup 
            technologies={experience.technologies} 
            variant="outline"
            size="sm"
            limit={6}
          />
        </motion.div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            boxShadow: experience.current 
              ? "0 0 30px rgba(var(--primary), 0.3)" 
              : "0 0 20px rgba(var(--primary), 0.15)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}


