"use client";

import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface Certification {
  id: string | number;
  name: string;
  organization: string;
  organizationLogo?: string;
  logo?: string;
  date?: string;
  dateEarned?: string;
  credentialId?: string;
  credentialUrl?: string;
  verificationUrl?: string;
  description?: string;
  badge?: string;
  skills?: string[];
}

interface CertificationCardProps {
  certification: Certification;
  index: number;
}

export function CertificationCard({ certification, index }: CertificationCardProps) {
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
        className="relative h-full glass-effect p-6 rounded-xl border border-border hover:border-secondary transition-all"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header with Badge/Logo */}
        <div className="flex items-start gap-4 mb-4">
          {/* Certificate Badge */}
          {(certification.badge || certification.logo || certification.organizationLogo) ? (
            <motion.div
              className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-border"
              whileHover={{ scale: 1.05, rotate: -5 }}
            >
              <Image
                src={certification.badge || certification.logo || certification.organizationLogo || ''}
                alt={certification.name}
                fill
                className="object-contain p-1"
              />
            </motion.div>
          ) : (
            <motion.div
              className="h-16 w-16 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0 border border-secondary/20"
              whileHover={{ scale: 1.05, rotate: -5 }}
            >
              <Award className="h-8 w-8 text-secondary" />
            </motion.div>
          )}

          {/* Certificate Info */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground group-hover:text-secondary transition-colors leading-tight">
              {certification.name}
            </h3>
            <p className="text-sm text-foreground-secondary mt-1 font-medium">
              {certification.organization}
            </p>
          </div>
        </div>

        {/* Date and Credential ID */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-foreground-secondary">
            <Calendar className="h-4 w-4 text-secondary" />
            <span>Earned: {certification.dateEarned || certification.date}</span>
          </div>
          {certification.credentialId && (
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle2 className="h-4 w-4 text-secondary" />
              <span className="text-foreground-secondary font-mono">
                ID: {certification.credentialId}
              </span>
            </div>
          )}
        </div>

        {/* Skills (if provided) */}
        {certification.skills && certification.skills.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-foreground-secondary mb-2">
              Skills Covered:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {certification.skills.map((skill, idx) => (
                <motion.span
                  key={idx}
                  className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + idx * 0.05 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* Action Links */}
        {(certification.credentialUrl || certification.verificationUrl) && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
            {certification.credentialUrl && (
              <motion.a
                href={certification.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>View Credential</span>
              </motion.a>
            )}
            {certification.verificationUrl && (
              <motion.a
                href={certification.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground-secondary border border-border transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Verify</span>
              </motion.a>
            )}
          </div>
        )}

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            boxShadow: "0 0 25px rgba(var(--secondary), 0.2)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}


