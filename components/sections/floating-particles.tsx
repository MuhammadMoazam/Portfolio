"use client";

import { motion } from "framer-motion";

interface Particle {
  id: number;
  size: number;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
}

export function FloatingParticles({ count = 20 }: { count?: number }) {
  const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary-500/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Alternative: Geometric shapes
export function FloatingShapes() {
  const shapes = [
    { type: "circle", x: 10, y: 20, size: 100, delay: 0 },
    { type: "square", x: 80, y: 60, size: 80, delay: 2 },
    { type: "triangle", x: 30, y: 70, size: 60, delay: 4 },
    { type: "circle", x: 70, y: 30, size: 70, delay: 1 },
    { type: "square", x: 20, y: 50, size: 50, delay: 3 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          animate={{
            y: [-30, 30, -30],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20 + index * 2,
            delay: shape.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {shape.type === "circle" && (
            <div
              className="rounded-full border-2 border-primary-500/30"
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          {shape.type === "square" && (
            <div
              className="border-2 border-secondary-500/30 rotate-45"
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          {shape.type === "triangle" && (
            <div
              className="border-t-2 border-l-2 border-primary-500/30"
              style={{
                width: 0,
                height: 0,
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid transparent`,
                borderTop: `${shape.size}px solid rgba(var(--primary), 0.3)`,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}



