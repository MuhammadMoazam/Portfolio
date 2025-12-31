"use client";

import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface ImageRevealProps extends Omit<ImageProps, "onLoad"> {
  revealDirection?: "left" | "right" | "top" | "bottom" | "scale" | "blur";
  delay?: number;
}

/**
 * Image with reveal animation on load
 */
export function ImageReveal({
  revealDirection = "scale",
  delay = 0,
  className,
  alt,
  ...props
}: ImageRevealProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const getInitialState = () => {
    if (prefersReducedMotion) return {};

    switch (revealDirection) {
      case "left":
        return { x: -50, opacity: 0 };
      case "right":
        return { x: 50, opacity: 0 };
      case "top":
        return { y: -50, opacity: 0 };
      case "bottom":
        return { y: 50, opacity: 0 };
      case "blur":
        return { filter: "blur(20px)", opacity: 0 };
      case "scale":
      default:
        return { scale: 0.8, opacity: 0 };
    }
  };

  const getAnimateState = () => {
    if (prefersReducedMotion) return { opacity: 1 };

    switch (revealDirection) {
      case "left":
      case "right":
        return { x: 0, opacity: 1 };
      case "top":
      case "bottom":
        return { y: 0, opacity: 1 };
      case "blur":
        return { filter: "blur(0px)", opacity: 1 };
      case "scale":
      default:
        return { scale: 1, opacity: 1 };
    }
  };

  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={getInitialState()}
      animate={isLoaded ? getAnimateState() : {}}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
    >
      <Image
        {...props}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={cn(!isLoaded && "opacity-0")}
      />

      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
    </motion.div>
  );
}

/**
 * Image with progressive blur reveal
 */
export function ImageBlurReveal({
  className,
  alt,
  ...props
}: Omit<ImageProps, "onLoad">) {
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={prefersReducedMotion ? {} : { filter: "blur(20px)" }}
      animate={
        isLoaded
          ? { filter: prefersReducedMotion ? "blur(0px)" : "blur(0px)" }
          : {}
      }
      transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
    >
      <Image {...props} alt={alt} onLoad={() => setIsLoaded(true)} />
      
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
    </motion.div>
  );
}

/**
 * Image with curtain reveal effect
 */
export function ImageCurtainReveal({
  className,
  alt,
  direction = "right",
  ...props
}: Omit<ImageProps, "onLoad"> & { direction?: "left" | "right" }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image {...props} alt={alt} onLoad={() => setIsLoaded(true)} />
      
      {/* Curtain overlay */}
      {!isLoaded && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 bg-background z-10"
          initial={{ x: 0 }}
          animate={{ x: direction === "right" ? "100%" : "-100%" }}
          transition={{
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
        />
      )}
      
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
    </div>
  );
}

/**
 * Image grid with stagger reveal
 */
export function ImageGridReveal({
  images,
  columns = 3,
  gap = 4,
}: {
  images: Array<{ src: string; alt: string }>;
  columns?: number;
  gap?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`grid gap-${gap}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : 0.1,
          },
        },
      }}
    >
      {images.map((image, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: prefersReducedMotion ? 0 : 0.5 },
            },
          }}
        >
          <ImageReveal
            src={image.src}
            alt={image.alt}
            width={400}
            height={300}
            className="rounded-lg"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}



