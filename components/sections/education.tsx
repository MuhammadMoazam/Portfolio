"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { EducationCard, Education } from "./education-card";
import { CertificationCard, Certification } from "./certification-card";
import { AnimatedUnderlineGradient } from "@/components/ui/animated-underline";

// Default education data
const defaultEducation: Education[] = [
  {
    id: "1",
    institution: "Stanford University",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop",
    degree: "Master of Science",
    field: "Computer Science",
    duration: "2018 - 2020",
    gpa: "3.9/4.0",
    achievements: [
      "Specialized in Machine Learning and Distributed Systems",
      "Teaching Assistant for Advanced Algorithms course",
      "Published research paper on neural network optimization",
      "Dean's List - All semesters"
    ]
  },
  {
    id: "2",
    institution: "University of California, Berkeley",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop",
    degree: "Bachelor of Science",
    field: "Software Engineering",
    duration: "2014 - 2018",
    gpa: "3.8/4.0",
    achievements: [
      "Graduated Summa Cum Laude",
      "President of Computer Science Club",
      "Won university hackathon (2017)",
      "Academic Excellence Scholarship recipient"
    ]
  }
];

// Default certifications data
const defaultCertifications: Certification[] = [
  {
    id: "1",
    name: "AWS Certified Solutions Architect - Professional",
    organization: "Amazon Web Services",
    logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=200&h=200&fit=crop",
    dateEarned: "March 2023",
    credentialId: "AWS-PSA-12345",
    credentialUrl: "https://aws.amazon.com/verification",
    verificationUrl: "https://aws.amazon.com/verify",
    skills: ["AWS", "Cloud Architecture", "Security", "Scalability"]
  },
  {
    id: "2",
    name: "Google Cloud Professional Developer",
    organization: "Google Cloud",
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200&h=200&fit=crop",
    dateEarned: "January 2023",
    credentialId: "GCP-PD-67890",
    credentialUrl: "https://cloud.google.com/certification",
    verificationUrl: "https://cloud.google.com/verify",
    skills: ["GCP", "Kubernetes", "Microservices", "CI/CD"]
  },
  {
    id: "3",
    name: "Certified Kubernetes Administrator (CKA)",
    organization: "Cloud Native Computing Foundation",
    logo: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=200&h=200&fit=crop",
    dateEarned: "September 2022",
    credentialId: "CNCF-CKA-24680",
    credentialUrl: "https://www.cncf.io/certification",
    verificationUrl: "https://www.cncf.io/verify",
    skills: ["Kubernetes", "Docker", "Container Orchestration"]
  },
  {
    id: "4",
    name: "Microsoft Azure Developer Associate",
    organization: "Microsoft",
    logo: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=200&h=200&fit=crop",
    dateEarned: "June 2022",
    credentialId: "MS-AZ-204-13579",
    credentialUrl: "https://learn.microsoft.com/certifications",
    skills: ["Azure", "DevOps", "Cloud Services"]
  },
  {
    id: "5",
    name: "MongoDB Certified Developer",
    organization: "MongoDB University",
    logo: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=200&h=200&fit=crop",
    dateEarned: "April 2022",
    credentialId: "MDB-DEV-11223",
    credentialUrl: "https://university.mongodb.com/certification",
    skills: ["MongoDB", "NoSQL", "Database Design"]
  }
];

interface EducationSectionProps {
  education?: Education[];
  certifications?: Certification[];
}

export function EducationSection({
  education = defaultEducation,
  certifications = defaultCertifications,
}: EducationSectionProps) {
  return (
    <section id="education" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />
      
      {/* Decorative shapes */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

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
              Education & Certifications
            </h2>
          </AnimatedUnderlineGradient>
          <motion.p
            className="text-lg md:text-xl text-foreground-secondary mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Academic background and professional certifications
          </motion.p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Column Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">Education</h3>
                <p className="text-sm text-foreground-secondary">
                  {education.length} {education.length === 1 ? "degree" : "degrees"}
                </p>
              </div>
            </div>

            {/* Education Cards */}
            <div className="space-y-6">
              {education.map((edu, index) => (
                <EducationCard key={edu.id} education={edu} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Certifications Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Column Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/20">
                <Award className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">Certifications</h3>
                <p className="text-sm text-foreground-secondary">
                  {certifications.length} professional {certifications.length === 1 ? "certification" : "certifications"}
                </p>
              </div>
            </div>

            {/* Certification Cards */}
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <CertificationCard key={cert.id} certification={cert} index={index} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Summary Stats */}
        <motion.div
          className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <StatBox
            value={education.length.toString()}
            label="Degrees Earned"
            icon={GraduationCap}
          />
          <StatBox
            value={certifications.length.toString()}
            label="Certifications"
            icon={Award}
          />
          <StatBox
            value="100+"
            label="Hours of Training"
            icon={GraduationCap}
          />
          <StatBox
            value="Top 5%"
            label="Global Ranking"
            icon={Award}
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
  value: string;
  label: string;
  icon: any;
}) {
  return (
    <motion.div
      className="glass-effect p-6 rounded-xl border border-border text-center group hover:border-primary transition-all"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Icon className="h-8 w-8 mx-auto mb-3 text-primary" />
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



