"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface Education {
  id: string | number;
  institution: string;
  institutionShort?: string;
  institutionLogo?: string;
  logo?: string;
  degree: string;
  field?: string;
  duration?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  gpa?: string;
  maxGpa?: string;
  achievements?: string[];
  coursework?: string[];
}

interface EducationCardProps {
  education: Education;
  index: number;
}

export function EducationCard({ education, index }: EducationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      }}
      className="group"
    >
      <motion.div
        className="relative h-full glass-effect p-6 rounded-xl border border-border hover:border-primary transition-all"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header with Logo */}
        <div className="flex items-start gap-4 mb-4">
          {/* Institution Logo */}
          {education.logo ? (
            <motion.div
              className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-border"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Image
                src={education.logo}
                alt={education.institution}
                fill
                className="object-cover"
              />
            </motion.div>
          ) : (
            <motion.div
              className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <GraduationCap className="h-8 w-8 text-primary" />
            </motion.div>
          )}

          {/* Institution Info */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {education.institution}
            </h3>
            <p className="text-sm text-foreground-secondary mt-1">
              {education.degree}
              {education.field && (
                <span className="block text-xs mt-0.5">{education.field}</span>
              )}
            </p>
          </div>
        </div>

        {/* Duration and GPA */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-foreground-secondary">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{education.duration || `${education.startDate} - ${education.endDate}`}</span>
          </div>
          {education.gpa && (
            <div className="flex items-center gap-2 text-sm">
              <Award className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">
                GPA: {education.gpa}
              </span>
            </div>
          )}
        </div>

        {/* Achievements */}
        {education.achievements && education.achievements.length > 0 && (
          <div className="space-y-2 pt-4 border-t border-border">
            <p className="text-sm font-semibold text-foreground mb-2">
              Key Achievements:
            </p>
            <ul className="space-y-1.5">
              {education.achievements.map((achievement, idx) => (
                <motion.li
                  key={idx}
                  className="text-sm text-foreground-secondary flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + idx * 0.05 + index * 0.1 }}
                >
                  <span className="text-primary mt-1">•</span>
                  <span>{achievement}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            boxShadow: "0 0 25px rgba(var(--primary), 0.2)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}


