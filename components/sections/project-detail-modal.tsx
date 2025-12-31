"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, ChevronLeft, ChevronRight, CheckCircle2, TrendingUp } from "lucide-react";
import { Project } from "./project-card";
import { TechBadgeGroup } from "@/components/ui/tech-badge";
import { ImageCarousel } from "./image-carousel";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false,
}: ProjectDetailModalProps) {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrevious && onPrevious) onPrevious();
      if (e.key === "ArrowRight" && hasNext && onNext) onNext();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, onNext, onPrevious, hasNext, hasPrevious]);

  if (!project) return null;

  const images = (project.images || [project.image || project.thumbnail || '/placeholder.svg']).filter((img): img is string => !!img);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                className="relative w-full max-w-6xl bg-background border border-border rounded-2xl shadow-2xl overflow-hidden my-8"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <motion.button
                  className="absolute top-4 right-4 z-20 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border hover:bg-muted transition-colors"
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </motion.button>

                {/* Previous/Next Navigation Buttons */}
                {hasPrevious && onPrevious && (
                  <motion.button
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-background/80 backdrop-blur-sm rounded-full border border-border hover:bg-muted transition-colors"
                    onClick={onPrevious}
                    whileHover={{ scale: 1.1, x: -4 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Previous project"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </motion.button>
                )}
                {hasNext && onNext && (
                  <motion.button
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-background/80 backdrop-blur-sm rounded-full border border-border hover:bg-muted transition-colors"
                    onClick={onNext}
                    whileHover={{ scale: 1.1, x: 4 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Next project"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </motion.button>
                )}

                {/* Hero Image Carousel */}
                <motion.div
                  className="relative h-96"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <ImageCarousel images={images} alt={project.name || project.title || 'Project'} className="h-full" />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-full text-sm font-semibold text-white shadow-lg"
                      >
                        ⭐ Featured Project
                      </motion.div>
                    </div>
                  )}
                </motion.div>

                {/* Content */}
                <div className="p-8 md:p-12 space-y-10">
                  {/* Header Section */}
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                      {project.name}
                    </h1>
                    {project.tagline && (
                      <p className="text-xl text-foreground-secondary italic">
                        "{project.tagline}"
                      </p>
                    )}
                    {project.longDescription && (
                      <p className="text-lg text-foreground-secondary leading-relaxed">
                        {project.longDescription}
                      </p>
                    )}
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="h-5 w-5" />
                        View Source Code
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="h-5 w-5" />
                        View Live Demo
                      </motion.a>
                    )}
                  </motion.div>

                  {/* Two Column Layout for Problem/Solution */}
                  {(project.problem || project.solution) && (
                    <motion.div
                      className="grid md:grid-cols-2 gap-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {project.problem && (
                        <SectionCard title="The Problem" icon="🎯">
                          <p className="text-foreground-secondary leading-relaxed">
                            {project.problem}
                          </p>
                        </SectionCard>
                      )}
                      {project.solution && (
                        <SectionCard title="My Solution" icon="💡">
                          <p className="text-foreground-secondary leading-relaxed">
                            {project.solution}
                          </p>
                        </SectionCard>
                      )}
                    </motion.div>
                  )}

                  {/* Technical Highlights */}
                  {project.technicalHighlights && project.technicalHighlights.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <SectionCard title="Technical Highlights" icon="⚡">
                        <ul className="space-y-3">
                          {project.technicalHighlights.map((highlight, index) => (
                            <motion.li
                              key={index}
                              className="flex items-start gap-3 text-foreground-secondary"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + index * 0.05 }}
                            >
                              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>{highlight}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </SectionCard>
                    </motion.div>
                  )}

                  {/* Key Features */}
                  {project.keyFeatures && project.keyFeatures.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <SectionCard title="Key Features" icon="✨">
                        <div className="grid sm:grid-cols-2 gap-4">
                          {project.keyFeatures.map((feature, index) => (
                            <motion.div
                              key={index}
                              className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.6 + index * 0.05 }}
                              whileHover={{ scale: 1.02 }}
                            >
                              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-foreground-secondary">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </SectionCard>
                    </motion.div>
                  )}

                  {/* Results/Impact Metrics */}
                  {project.results && project.results.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <SectionCard title="Results & Impact" icon="📊">
                        <div className="grid sm:grid-cols-3 gap-6">
                          {project.results?.map((result: any, index: number) => (
                            <motion.div
                              key={index}
                              className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.7 + index * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <TrendingUp className="h-8 w-8 mx-auto mb-3 text-primary" />
                              <div className="text-3xl font-bold gradient-text mb-2">
                                {result.value}
                              </div>
                              <div className="text-sm font-semibold text-foreground mb-1">
                                {result.label}
                              </div>
                              {result.description && (
                                <div className="text-xs text-foreground-secondary">
                                  {result.description}
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </SectionCard>
                    </motion.div>
                  )}

                  {/* Technologies Used */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <SectionCard title="Technologies Used" icon="🛠️">
                      <TechBadgeGroup
                        technologies={project.technologies}
                        variant="primary"
                        size="md"
                      />
                    </SectionCard>
                  </motion.div>

                  {/* Navigation Footer */}
                  {(hasPrevious || hasNext) && (
                    <motion.div
                      className="flex justify-between items-center pt-8 border-t border-border"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      {hasPrevious && onPrevious ? (
                        <motion.button
                          onClick={onPrevious}
                          className="flex items-center gap-2 text-foreground-secondary hover:text-foreground transition-colors"
                          whileHover={{ x: -4 }}
                        >
                          <ChevronLeft className="h-5 w-5" />
                          <span className="font-medium">Previous Project</span>
                        </motion.button>
                      ) : (
                        <div />
                      )}
                      {hasNext && onNext ? (
                        <motion.button
                          onClick={onNext}
                          className="flex items-center gap-2 text-foreground-secondary hover:text-foreground transition-colors"
                          whileHover={{ x: 4 }}
                        >
                          <span className="font-medium">Next Project</span>
                          <ChevronRight className="h-5 w-5" />
                        </motion.button>
                      ) : (
                        <div />
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// Helper Component for Section Cards
function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold flex items-center gap-2">
        <span>{icon}</span>
        {title}
      </h3>
      <div className="pl-8">{children}</div>
    </div>
  );
}



