"use client";

import { Container } from "@/components/ui/container";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { ExperienceSection } from "@/components/sections/experience";
import { EducationSection } from "@/components/sections/education";
import { ContactSection } from "@/components/sections/contact";
import { OfflineDetector } from "@/components/ui/offline-detector";
import { ErrorBoundary } from "@/components/error/error-boundary";
import { Navbar } from "@/components/layout/navbar";

// Import resume data
import {
  personalInfo,
  socialLinks,
  stats,
  skills,
  experience,
  projects,
  education,
  certifications,
} from "@/lib/data/resume-data";

export default function PortfolioPage() {
  return (
    <>
      <OfflineDetector />
      
      {/* Navigation with Theme Toggle */}
      <Navbar />
      
      <ErrorBoundary>
        {/* Hero Section */}
        <section id="home">
          <HeroSection
            name={personalInfo.name}
            roles={personalInfo.roles}
            tagline={personalInfo.tagline}
            socialLinks={socialLinks}
          />
        </section>

        {/* About Section */}
        <section id="about">
          <AboutSection
            bio={personalInfo.bio}
            philosophy={personalInfo.philosophy}
            stats={stats}
            resumeUrl={personalInfo.resumeUrl}
          />
        </section>

        {/* Skills Section */}
        <section id="skills">
          <SkillsSection skills={skills} />
        </section>

        {/* Projects Section */}
        <section id="projects">
          <ProjectsSection projects={projects} />
        </section>

        {/* Experience Section */}
        <section id="experience">
          <ExperienceSection experiences={experience} />
        </section>

        {/* Education Section */}
        <section id="education">
          <EducationSection
            education={education}
            certifications={certifications}
          />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ContactSection
            email={personalInfo.email}
            phone={personalInfo.phone}
            location={personalInfo.location}
            socialLinks={socialLinks}
          />
        </section>
      </ErrorBoundary>
    </>
  );
}

