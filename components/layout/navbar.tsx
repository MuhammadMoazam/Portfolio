"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu } from "lucide-react";
import { navigationLinks } from "@/lib/constants/navigation";
import { useActiveSection } from "@/lib/hooks/use-active-section";
import { useScroll as useScrollHook } from "@/lib/hooks/use-scroll";
import { MobileMenu } from "./mobile-menu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { scrollY: scrollPosition } = useScrollHook();

  // Get section IDs from navigation links
  const sectionIds = navigationLinks.map((link) => link.href.replace("#", ""));
  const activeSection = useActiveSection(sectionIds);

  // Track scroll for background blur effect
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Handle smooth scroll to section
  const handleNavigation = (href: string) => {
    if (typeof window === 'undefined') return;
    
    const sectionId = href.replace("#", "");
    const element = document.getElementById(sectionId);

    if (element) {
      const offset = 80; // Account for navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Close mobile menu when pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-background/80 backdrop-blur-lg shadow-lg border-b border-border/50"
            : "bg-transparent"
        )}
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo/Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation("#home");
                }}
                className="text-2xl lg:text-3xl font-bold gradient-text focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-2 -ml-2"
                aria-label="Go to home"
              >
                Portfolio
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:flex items-center space-x-1"
            >
              {navigationLinks.map((link, index) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <button
                      onClick={() => handleNavigation(link.href)}
                      className={cn(
                        "relative px-4 py-2 rounded-lg text-sm font-medium transition-all",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                        isActive
                          ? "text-primary"
                          : "text-foreground-secondary hover:text-foreground"
                      )}
                      aria-label={link.label}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="activeSection"
                          className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Right side: Theme Toggle + Mobile Menu Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-2"
            >
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Open mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <Menu className="h-6 w-6" />
              </button>
            </motion.div>
          </div>
        </nav>

        {/* Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left"
          style={{
            scaleX: typeof window !== 'undefined' 
              ? scrollPosition / (document.documentElement.scrollHeight - window.innerHeight)
              : 0,
          }}
          initial={{ scaleX: 0 }}
        />
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navigationLinks}
        activeSection={activeSection}
        onLinkClick={handleNavigation}
      />
    </>
  );
}



