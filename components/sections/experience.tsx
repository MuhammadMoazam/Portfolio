"use client";

import { motion } from "framer-motion";
import { ExperienceCard, Experience } from "./experience-card";
import { AnimatedTimeline, TimelineDot } from "./timeline";
import { AnimatedUnderlineGradient } from "@/components/ui/animated-underline";

// Default experiences data
const defaultExperiences: Experience[] = [
  {
    id: "1",
    company: "Tech Innovations Inc.",
    companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=200&h=200&fit=crop",
    position: "Senior Full-Stack Developer",
    duration: "Jan 2023 - Present",
    location: "San Francisco, CA",
    current: true,
    achievements: [
      "Led development of microservices architecture serving 2M+ daily active users, improving system reliability by 99.9%",
      "Reduced API response time by 60% through implementation of Redis caching and database query optimization",
      "Mentored team of 5 junior developers, conducting code reviews and establishing best practices",
      "Architected and deployed CI/CD pipeline reducing deployment time from 2 hours to 15 minutes",
      "Implemented real-time features using WebSocket, increasing user engagement by 40%"
    ],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Redis", "AWS", "Docker"]
  },
  {
    id: "2",
    company: "Digital Solutions Corp",
    companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
    position: "Full-Stack Developer",
    duration: "Mar 2021 - Dec 2022",
    location: "New York, NY",
    achievements: [
      "Developed and launched 3 major client projects generating $500K+ in revenue",
      "Built RESTful APIs handling 100K+ requests per day with 99.5% uptime",
      "Improved application performance by 45% through code optimization and lazy loading",
      "Collaborated with design team to create responsive, accessible web applications",
      "Integrated third-party payment systems (Stripe, PayPal) processing $1M+ monthly"
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "GraphQL", "Stripe", "Jest"]
  },
  {
    id: "3",
    company: "StartupHub",
    companyLogo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=200&h=200&fit=crop",
    position: "Frontend Developer",
    duration: "Jun 2019 - Feb 2021",
    location: "Remote",
    achievements: [
      "Rebuilt company website from scratch using React and Next.js, increasing page speed score from 45 to 95",
      "Implemented responsive design system using Tailwind CSS, reducing CSS bundle size by 70%",
      "Developed reusable component library used across 5 company products",
      "Optimized SEO resulting in 150% increase in organic traffic within 6 months"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Figma", "Git"]
  },
  {
    id: "4",
    company: "WebDev Agency",
    position: "Junior Web Developer",
    duration: "Jan 2018 - May 2019",
    location: "Austin, TX",
    achievements: [
      "Contributed to 10+ client projects, maintaining 100% on-time delivery record",
      "Fixed 200+ bugs and implemented new features across various web applications",
      "Participated in daily standups and sprint planning using Agile methodology",
      "Gained proficiency in modern web technologies through hands-on project work"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "jQuery", "PHP", "MySQL", "WordPress"]
  }
];

interface ExperienceSectionProps {
  experiences?: Experience[];
}

export function ExperienceSection({ experiences = defaultExperiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />
      
      {/* Decorative shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedUnderlineGradient>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Work Experience
            </h2>
          </AnimatedUnderlineGradient>
          <motion.p
            className="text-lg md:text-xl text-foreground-secondary mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            My professional journey building impactful solutions
          </motion.p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Animated Timeline Line */}
          <AnimatedTimeline itemCount={experiences.length} className="absolute inset-0" />

          {/* Experience Items */}
          <div className="relative space-y-16 md:space-y-24">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="relative">
                {/* Timeline Dot */}
                <TimelineDot index={index} isActive={experience.current} />

                {/* Experience Card */}
                <div className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? 'md:grid-flow-col-dense' : ''
                }`}>
                  {/* Left side (or only side on mobile) */}
                  {index % 2 === 0 ? (
                    <>
                      <ExperienceCard
                        experience={experience}
                        index={index}
                        side="left"
                      />
                      <div className="hidden md:block" /> {/* Spacer for alternating layout */}
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block" /> {/* Spacer for alternating layout */}
                      <ExperienceCard
                        experience={experience}
                        index={index}
                        side="right"
                      />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper function to calculate total years of experience
function calculateYears(experiences: Experience[]): string {
  // Simple calculation - you can make this more sophisticated
  const currentYear = new Date().getFullYear();
  const startYear = experiences.length > 0 
    ? currentYear - (experiences.length * 1.5) // Rough estimate
    : currentYear;
  const years = Math.floor(currentYear - startYear);
  return `${years}+`;
}

// Stat Box Component
function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      className="glass-effect p-6 rounded-xl border border-border text-center group hover:border-primary transition-all"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className="text-4xl font-bold gradient-text mb-2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
      >
        {value}
      </motion.div>
      <div className="text-sm text-foreground-secondary group-hover:text-foreground transition-colors">
        {label}
      </div>
    </motion.div>
  );
}



