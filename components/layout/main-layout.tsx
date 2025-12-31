"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { BackToTop } from "./back-to-top";
import { ScrollProgress } from "./scroll-progress";
import { SkipToContent } from "@/components/ui/skip-to-content";
import { usePathname } from "next/navigation";

interface MainLayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
  showBackToTop?: boolean;
  showScrollProgress?: boolean;
  enableTransitions?: boolean;
  className?: string;
}

export function MainLayout({
  children,
  showNavbar = true,
  showFooter = true,
  showBackToTop = true,
  showScrollProgress = true,
  enableTransitions = true,
  className = "",
}: MainLayoutProps) {
  const pathname = usePathname();

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Skip to Main Content Link */}
      <SkipToContent />

      {/* Scroll Progress Bar */}
      {showScrollProgress && <ScrollProgress />}

      {/* Navbar */}
      {showNavbar && <Navbar />}

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {enableTransitions ? (
          <motion.main
            id="main-content"
            key={pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`flex-1 ${className}`}
            tabIndex={-1}
          >
            {/* Add padding for navbar */}
            <div className="pt-16 lg:pt-20">
              {children}
            </div>
          </motion.main>
        ) : (
          <main id="main-content" className={`flex-1 pt-16 lg:pt-20 ${className}`} tabIndex={-1}>
            {children}
          </main>
        )}
      </AnimatePresence>

      {/* Footer */}
      {showFooter && <Footer />}

      {/* Back to Top Button */}
      {showBackToTop && <BackToTop />}
    </div>
  );
}

// Simplified layout without animations
export function SimpleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipToContent />
      <Navbar />
      <main id="main-content" className="flex-1 pt-16 lg:pt-20" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

// Full-width layout (no container padding)
export function FullWidthLayout({ children }: { children: ReactNode }) {
  return (
    <MainLayout className="px-0">
      {children}
    </MainLayout>
  );
}

// Centered content layout
export function CenteredLayout({ children }: { children: ReactNode }) {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </div>
    </MainLayout>
  );
}

