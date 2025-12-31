"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Server, Database, Smartphone, Globe, ArrowRight } from "lucide-react";
import { ProjectCard, Project } from "./project-card";
import { ProjectDetailModal } from "./project-detail-modal";
import { AnimatedUnderlineGradient } from "@/components/ui/animated-underline";

// Default projects data
const defaultProjects: Project[] = [
  {
    id: "1",
    name: "E-Commerce Platform",
    tagline: "Next-generation shopping experience with AI-powered recommendations",
    description: "A full-stack e-commerce platform with real-time inventory management, payment processing, and admin dashboard.",
    longDescription: "A comprehensive e-commerce solution built with Next.js and Node.js. Features include real-time inventory tracking, secure payment integration with Stripe, order management, customer accounts, and a powerful admin dashboard with analytics. The platform handles thousands of daily transactions and includes features like cart persistence, wishlist, product recommendations, and email notifications.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    category: "react",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    problem: "Traditional e-commerce platforms struggle with real-time inventory management, leading to overselling and poor customer experience. Additionally, most platforms lack personalized shopping experiences and efficient admin tools.",
    solution: "Built a modern, scalable platform using Next.js for instant page loads and SEO, integrated real-time inventory tracking with WebSocket connections, and implemented AI-powered product recommendations. Created a comprehensive admin dashboard with real-time analytics and automated workflows.",
    technicalHighlights: [
      "Server-side rendering with Next.js 14 for optimal SEO and performance",
      "Real-time inventory updates using WebSocket connections and Redis pub/sub",
      "Secure payment processing with Stripe, including webhooks for order tracking",
      "Advanced caching strategies reducing API calls by 70%",
      "Responsive design with mobile-first approach using Tailwind CSS",
      "Automated email notifications using queue-based system with Bull"
    ],
    keyFeatures: [
      "Real-time inventory management",
      "AI-powered product recommendations",
      "One-click checkout with saved payment methods",
      "Order tracking with live updates",
      "Admin dashboard with analytics",
      "Multi-currency support",
      "Wishlist and cart persistence",
      "Product reviews and ratings"
    ],
    results: [
      { label: "Conversion Rate", value: "+45%", description: "Increase in sales" },
      { label: "Page Load Time", value: "0.8s", description: "Average load time" },
      { label: "Customer Satisfaction", value: "4.8/5", description: "Average rating" }
    ]
  },
  {
    id: "2",
    name: "AI Content Generator",
    tagline: "Transform your ideas into engaging content in seconds",
    description: "An AI-powered content generation tool using GPT-4 for creating blog posts, social media content, and marketing copy.",
    longDescription: "Leverages OpenAI's GPT-4 API to generate high-quality content for various purposes. Built with Python Flask backend and React frontend. Features include content templates, tone adjustment, SEO optimization suggestions, multi-language support, and content history with version control.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1696446702061-cbd88e2f0297?w=800&h=600&fit=crop",
    ],
    technologies: ["Python", "Flask", "React", "OpenAI API", "MongoDB"],
    category: "python",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    problem: "Content creators spend hours writing blog posts, social media content, and marketing copy. The process is time-consuming and often requires multiple revisions to match brand voice and SEO requirements.",
    solution: "Developed an AI-powered tool that generates high-quality content in seconds using GPT-4. The platform includes customizable templates, tone adjustment, SEO optimization, and supports multiple languages. Content history with version control allows users to track and manage all generated content.",
    technicalHighlights: [
      "Integration with OpenAI's GPT-4 API for advanced content generation",
      "Custom prompt engineering for consistent, high-quality outputs",
      "Real-time SEO analysis and keyword optimization suggestions",
      "Rate limiting and caching to optimize API costs by 60%",
      "MongoDB for efficient storage and retrieval of generated content",
      "Python Flask backend with asynchronous task processing"
    ],
    keyFeatures: [
      "Multiple content templates (blog, social, email, ads)",
      "Tone and style customization",
      "SEO keyword integration",
      "Multi-language support (20+ languages)",
      "Content history and version control",
      "Export to various formats",
      "Team collaboration features",
      "Plagiarism checker integration"
    ],
    results: [
      { label: "Time Saved", value: "80%", description: "Average reduction" },
      { label: "Content Quality", value: "95%", description: "User satisfaction" },
      { label: "Daily Users", value: "5,000+", description: "Active users" }
    ]
  },
  {
    id: "3",
    name: "Real-Time Chat Application",
    description: "A scalable real-time messaging platform with end-to-end encryption, group chats, and file sharing capabilities.",
    longDescription: "Built with Node.js and Socket.io for real-time bidirectional communication. Features include private and group messaging, end-to-end encryption, file and media sharing, typing indicators, read receipts, message reactions, and user presence status. Deployed on AWS with auto-scaling capabilities.",
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&h=600&fit=crop",
    technologies: ["Node.js", "Socket.io", "React", "MongoDB", "AWS", "Redis"],
    category: "node",
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    id: "4",
    name: "Task Management Dashboard",
    description: "A collaborative project management tool with kanban boards, gantt charts, and team collaboration features.",
    longDescription: "A comprehensive project management solution with drag-and-drop kanban boards, gantt chart visualization, time tracking, team collaboration, file attachments, comments, notifications, and detailed analytics. Supports multiple projects, custom workflows, and integrations with popular tools like Slack and GitHub.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "GraphQL"],
    category: "react",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false,
  },
  {
    id: "5",
    name: "Mobile Fitness Tracker",
    description: "A cross-platform mobile app for tracking workouts, nutrition, and health metrics with social features.",
    longDescription: "Built with React Native for iOS and Android. Features include workout logging, exercise library with videos, nutrition tracking with barcode scanning, progress photos, health metrics integration (Apple Health, Google Fit), social feed for sharing achievements, and personalized workout recommendations based on user goals.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop",
    technologies: ["React Native", "TypeScript", "Firebase", "Node.js"],
    category: "react",
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    id: "6",
    name: "Analytics Dashboard",
    description: "A powerful data visualization dashboard for tracking business metrics and generating insights.",
    longDescription: "An enterprise-grade analytics platform that aggregates data from multiple sources and provides interactive visualizations. Features include customizable dashboards, real-time data updates, advanced filtering, drill-down capabilities, scheduled reports, data export, and role-based access control. Optimized for handling large datasets with efficient querying.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    technologies: ["React", "D3.js", "Python", "FastAPI", "PostgreSQL", "Redis"],
    category: "python",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false,
  },
  {
    id: "7",
    name: "Weather Forecast App",
    description: "A beautiful weather application with detailed forecasts, weather maps, and location-based alerts.",
    longDescription: "Integrates multiple weather APIs to provide accurate forecasts. Features include current conditions, hourly and daily forecasts, interactive weather maps, severe weather alerts, location search with autocomplete, favorite locations, weather widgets, and historical weather data. Designed with a focus on user experience and accessibility.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop",
    technologies: ["React", "TypeScript", "Weather API", "Mapbox"],
    category: "react",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false,
  },
  {
    id: "8",
    name: "Blockchain Explorer",
    description: "A blockchain analytics tool for exploring transactions, addresses, and smart contracts on Ethereum.",
    longDescription: "A comprehensive blockchain explorer built with Node.js and React. Features include transaction search and analysis, address tracking, smart contract verification and interaction, network statistics, gas price tracker, block explorer, and wallet integration. Supports multiple EVM-compatible chains.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
    technologies: ["React", "Node.js", "Web3.js", "Ethereum", "MongoDB"],
    category: "node",
    githubUrl: "https://github.com",
    featured: false,
  },
];

const categories = [
  { id: "all", label: "All Projects", icon: Globe },
  { id: "react", label: "React", icon: Code2 },
  { id: "node", label: "Node.js", icon: Server },
  { id: "python", label: "Python", icon: Database },
];

interface ProjectsSectionProps {
  projects?: Project[];
  showLimit?: number;
  enableFilters?: boolean;
  showViewAll?: boolean;
}

export function ProjectsSection({
  projects = defaultProjects,
  showLimit,
  enableFilters = true,
  showViewAll = true,
}: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(!showLimit);

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  // Apply show limit
  const displayedProjects = showAll || !showLimit
    ? filteredProjects
    : filteredProjects.slice(0, showLimit);

  const handleViewDetails = (project: Project) => {
    const index = filteredProjects.findIndex(p => p.id === project.id);
    setSelectedProject(project);
    setSelectedProjectIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
      setSelectedProjectIndex(-1);
    }, 300);
  };

  const handleNextProject = () => {
    if (selectedProjectIndex < filteredProjects.length - 1) {
      const nextIndex = selectedProjectIndex + 1;
      setSelectedProject(filteredProjects[nextIndex]);
      setSelectedProjectIndex(nextIndex);
    }
  };

  const handlePreviousProject = () => {
    if (selectedProjectIndex > 0) {
      const prevIndex = selectedProjectIndex - 1;
      setSelectedProject(filteredProjects[prevIndex]);
      setSelectedProjectIndex(prevIndex);
    }
  };

  return (
    <>
      <section id="projects" className="relative py-20 md:py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />
        
        {/* Decorative shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

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
                Featured Projects
              </h2>
            </AnimatedUnderlineGradient>
            <motion.p
              className="text-lg md:text-xl text-foreground-secondary mt-6 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Showcasing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} that demonstrate my expertise and creativity
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
                const count = category.id === "all" 
                  ? projects.length 
                  : projects.filter(p => p.category === category.id).length;

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
                        layoutId="activeProjectCategory"
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
                      <span className={`text-xs ${isActive ? 'opacity-80' : 'opacity-60'}`}>
                        ({count})
                      </span>
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {displayedProjects.map((project, index) => (
                <ProjectCard
                  key={`${activeCategory}-${project.id}`}
                  project={project}
                  index={index}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* View All Button */}
          {showViewAll && showLimit && filteredProjects.length > showLimit && !showAll && (
            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={() => setShowAll(true)}
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Projects ({filteredProjects.length})
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNext={handleNextProject}
        onPrevious={handlePreviousProject}
        hasNext={selectedProjectIndex < filteredProjects.length - 1}
        hasPrevious={selectedProjectIndex > 0}
      />
    </>
  );
}

