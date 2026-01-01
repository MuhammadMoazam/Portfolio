"use client";

import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { ExperienceSection } from "@/components/sections/experience";
import { EducationSection } from "@/components/sections/education";
import { ContactSection } from "@/components/sections/contact";
import { NetworkParticles } from "@/components/sections/network-particles";
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

export default function Home() {
  return (
    <>
      <OfflineDetector />
      
      {/* Navigation with Theme Toggle */}
      <Navbar />
      
      {/* Network Particles Background - Covers Entire Portfolio */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <NetworkParticles
          particleCount={120}
          particleColor="rgba(45, 212, 191, 0.7)"
          lineColor="rgba(45, 212, 191, 0.2)"
          particleSize={3}
          lineWidth={1.5}
          maxDistance={200}
          speed={0.8}
        />
      </div>

      <ErrorBoundary>
        <main className="relative" style={{ zIndex: 1 }}>
          {/* Hero Section */}
          <section id="home">
            <HeroSection
              name={personalInfo.name}
              roles={personalInfo.roles}
              tagline={personalInfo.tagline}
              socialLinks={socialLinks}
              enableNetworkParticles={false}
            />
          </section>

          {/* About Section */}
          <section id="about">
            <AboutSection
              name={personalInfo.name}
              role={personalInfo.title}
              imageSrc="/profile-photo.png"
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
        </main>
      </ErrorBoundary>
    </>
  );
}
