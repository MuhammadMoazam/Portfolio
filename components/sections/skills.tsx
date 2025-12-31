"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Database,
  Wrench,
  Layers,
  Globe,
  Server,
  FileJson,
  Terminal,
  Package,
  Cloud,
} from "lucide-react";
import { SkillCard } from "./skill-card";
import { AnimatedUnderlineGradient } from "@/components/ui/animated-underline";

// Skill data type
interface Skill {
  name: string;
  icon: React.ComponentType<any> | string;
  proficiency: number;
  category: string;
  yearsOfExperience?: number;
}

// Default skills data
const defaultSkills: Skill[] = [
  // Frontend
  { name: "React", icon: Code2, proficiency: 95, category: "frontend", yearsOfExperience: 5 },
  { name: "Next.js", icon: Globe, proficiency: 90, category: "frontend", yearsOfExperience: 3 },
  { name: "TypeScript", icon: FileJson, proficiency: 90, category: "frontend", yearsOfExperience: 4 },
  { name: "Tailwind CSS", icon: Layers, proficiency: 95, category: "frontend", yearsOfExperience: 3 },
  { name: "Vue.js", icon: Code2, proficiency: 75, category: "frontend", yearsOfExperience: 2 },
  
  // Backend
  { name: "Node.js", icon: Server, proficiency: 90, category: "backend", yearsOfExperience: 5 },
  { name: "Python", icon: Terminal, proficiency: 85, category: "backend", yearsOfExperience: 4 },
  { name: "Express", icon: Server, proficiency: 85, category: "backend", yearsOfExperience: 4 },
  { name: "GraphQL", icon: Layers, proficiency: 80, category: "backend", yearsOfExperience: 3 },
  
  // Database
  { name: "PostgreSQL", icon: Database, proficiency: 85, category: "database", yearsOfExperience: 4 },
  { name: "MongoDB", icon: Database, proficiency: 90, category: "database", yearsOfExperience: 5 },
  { name: "Redis", icon: Database, proficiency: 75, category: "database", yearsOfExperience: 2 },
  
  // Tools
  { name: "Git", icon: Wrench, proficiency: 95, category: "tools", yearsOfExperience: 5 },
  { name: "Docker", icon: Package, proficiency: 80, category: "tools", yearsOfExperience: 3 },
  { name: "AWS", icon: Cloud, proficiency: 75, category: "tools", yearsOfExperience: 2 },
  { name: "CI/CD", icon: Wrench, proficiency: 80, category: "tools", yearsOfExperience: 3 },
];

const categories = [
  { id: "all", label: "All Skills", icon: Layers },
  { id: "frontend", label: "Frontend", icon: Code2 },
  { id: "backend", label: "Backend", icon: Server },
  { id: "database", label: "Database", icon: Database },
  { id: "tools", label: "Tools", icon: Wrench },
];

interface SkillsSectionProps {
  skills?: Skill[];
  showRadialVariant?: boolean;
  enableFilters?: boolean;
}

export function SkillsSection({
  skills = defaultSkills,
  showRadialVariant = false,
  enableFilters = true,
}: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  // Filter skills based on active category
  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);
  
  // Limit to 8 skills (2 rows on desktop, 3 rows on mobile) when not showing all
  const displayedSkills = showAll ? filteredSkills : filteredSkills.slice(0, 8);
  const hasMore = filteredSkills.length > 8;

  return (
    <section id="skills" className="relative py-12 sm:py-16 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />
      
      {/* Decorative shapes */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedUnderlineGradient>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Skills & Expertise
            </h2>
          </AnimatedUnderlineGradient>
          <motion.p
            className="text-lg md:text-xl text-foreground-secondary mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Technologies and tools I've mastered throughout my development journey
          </motion.p>
        </motion.div>

        {/* Category Filters */}
        {enableFilters && (
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;

              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative px-6 py-3 rounded-lg font-medium transition-all ${
                    isActive
                      ? "text-white"
                      : "text-foreground-secondary hover:text-foreground bg-muted hover:bg-muted/80"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  {/* Active background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Content */}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    {category.label}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        )}

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          >
            {displayedSkills.map((skill, index) => (
              <SkillCard
                key={`${activeCategory}-${skill.name}`}
                name={skill.name}
                icon={skill.icon}
                proficiency={skill.proficiency}
                category={skill.category}
                yearsOfExperience={skill.yearsOfExperience}
                delay={index * 0.05}
                variant={showRadialVariant && index < 4 ? "radial" : "progress"}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* See More/Less Button */}
        {hasMore && (
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="group relative px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-secondary to-primary"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Button content */}
              <span className="relative z-10 flex items-center gap-2">
                {showAll ? (
                  <>
                    Show Less
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      animate={{ y: [-2, 2, -2] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </motion.svg>
                  </>
                ) : (
                  <>
                    See More Skills ({filteredSkills.length - 8} more)
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      animate={{ y: [-2, 2, -2] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </motion.svg>
                  </>
                )}
              </span>
            </motion.button>
          </motion.div>
        )}

        {/* Skills Summary */}
        <motion.div
          className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <StatBox
            value={skills.filter((s) => s.category === "frontend").length}
            label="Frontend Technologies"
            icon={Code2}
          />
          <StatBox
            value={skills.filter((s) => s.category === "backend").length}
            label="Backend Technologies"
            icon={Server}
          />
          <StatBox
            value={skills.filter((s) => s.category === "database").length}
            label="Database Systems"
            icon={Database}
          />
          <StatBox
            value={skills.filter((s) => s.category === "tools").length}
            label="Development Tools"
            icon={Wrench}
          />
        </motion.div>
      </div>
    </section>
  );
}

// Stat Box Component
function StatBox({
  value,
  label,
  icon: Icon,
}: {
  value: number;
  label: string;
  icon: React.ComponentType<any>;
}) {
  return (
    <motion.div
      className="glass-effect p-4 sm:p-6 rounded-xl border border-border text-center"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Icon className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 text-primary" />
      <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">{value}</div>
      <div className="text-xs sm:text-sm text-foreground-secondary">{label}</div>
    </motion.div>
  );
}


