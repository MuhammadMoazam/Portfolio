"use client";

import { useEffect, useRef, useState } from "react";

interface NetworkParticlesProps {
  particleCount?: number;
  particleColor?: string;
  lineColor?: string;
  particleSize?: number;
  lineWidth?: number;
  maxDistance?: number;
  speed?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export function NetworkParticles({
  particleCount = 80,
  particleColor = "rgba(45, 212, 191, 0.8)", // Teal
  lineColor = "rgba(45, 212, 191, 0.15)", // Teal with low opacity
  particleSize = 2,
  lineWidth = 1,
  maxDistance = 150,
  speed = 0.5,
}: NetworkParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      checkMobile();
      // Reinitialize particles on resize to redistribute them
      initParticles();
    };
    
    // Initialize particles with responsive count
    const initParticles = () => {
      const isMobileView = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      
      // Reduce particle count on smaller screens for performance
      let responsiveCount = particleCount;
      let responsiveDistance = maxDistance;
      let responsiveSpeed = speed;
      
      if (isMobileView) {
        responsiveCount = Math.floor(particleCount * 0.3); // 30% particles on mobile
        responsiveDistance = maxDistance * 0.7; // Shorter connection distance
        responsiveSpeed = speed * 0.6; // Slower movement
      } else if (isTablet) {
        responsiveCount = Math.floor(particleCount * 0.6); // 60% particles on tablet
        responsiveDistance = maxDistance * 0.85;
        responsiveSpeed = speed * 0.8;
      }
      
      particlesRef.current = Array.from({ length: responsiveCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * responsiveSpeed,
        vy: (Math.random() - 0.5) * responsiveSpeed,
        size: isMobileView ? particleSize * 0.8 : particleSize,
      }));
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation loop with performance optimization
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isMobileView = window.innerWidth < 768;
      const responsiveDistance = isMobileView ? maxDistance * 0.7 : maxDistance;

      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        // Move particle
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Keep particles within bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Draw connections to nearby particles (optimized)
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const otherParticle = particlesRef.current[j];
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < responsiveDistance) {
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = lineWidth * (1 - distance / responsiveDistance);
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Add glow effect (reduced on mobile for performance)
        if (!isMobileView) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = particleColor;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, particleColor, lineColor, particleSize, lineWidth, maxDistance, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

