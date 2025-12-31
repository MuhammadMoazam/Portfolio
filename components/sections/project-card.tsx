"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Github, ExternalLink, Eye } from "lucide-react";
import { TechBadgeGroup } from "@/components/ui/tech-badge";
import { cn } from "@/lib/utils";

export interface Project {
  id: string | number;
  title?: string;
  name?: string;
  tagline?: string;
  description: string;
  longDescription?: string;
  thumbnail?: string;
  image?: string;
  images?: string[]; // Multiple images for carousel
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  
  // Enhanced project details
  problem?: string;
  solution?: string;
  technicalHighlights?: string[];
  keyFeatures?: string[];
  results?: any;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewDetails: (project: Project) => void;
}

export function ProjectCard({ project, index, onViewDetails }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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
      className="group relative h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="relative h-full glass-effect rounded-xl border border-border overflow-hidden cursor-pointer"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="px-3 py-1 bg-gradient-to-r from-primary to-secondary rounded-full text-xs font-semibold text-white shadow-lg"
            >
              Featured
            </motion.div>
          </div>
        )}

        {/* Project Image */}
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <Image
            src={project.image || project.thumbnail || '/placeholder.svg'}
            alt={project.name || project.title || 'Project'}
            fill
            className={cn(
              "object-cover transition-transform duration-500",
              isHovered && "scale-110"
            )}
          />
          
          {/* Overlay on Hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Quick Action Buttons */}
            <div className="absolute inset-0 flex items-center justify-center gap-3">
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-foreground text-background rounded-full hover:bg-primary transition-colors"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isHovered ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ delay: 0.1 }}
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github className="h-5 w-5" />
                </motion.a>
              )}
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-foreground text-background rounded-full hover:bg-primary transition-colors"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isHovered ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ delay: 0.15 }}
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ExternalLink className="h-5 w-5" />
                </motion.a>
              )}
              <motion.button
                onClick={() => onViewDetails(project)}
                className="p-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                initial={{ scale: 0, rotate: -180 }}
                animate={isHovered ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Eye className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-4">
          {/* Project Name */}
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {project.name || project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-foreground-secondary line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          <TechBadgeGroup technologies={project.technologies} limit={4} />
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={{
            boxShadow: "0 0 30px rgba(var(--primary), 0.3), 0 0 60px rgba(var(--primary), 0.1)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

