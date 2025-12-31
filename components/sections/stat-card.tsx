"use client";

import { motion } from "framer-motion";
import { useCounterAnimation } from "@/lib/hooks/use-counter-animation";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  value: number;
  label: string;
  icon: LucideIcon;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  delay?: number;
}

export function StatCard({
  value,
  label,
  icon: Icon,
  suffix = "",
  prefix = "",
  decimals = 0,
  delay = 0,
}: StatCardProps) {
  const { value: displayValue, ref } = useCounterAnimation({
    end: value,
    duration: 2000,
    start: 0,
    decimals,
    suffix,
    prefix,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative group"
    >
      <div className="relative glass-effect p-6 rounded-xl border border-border hover:border-primary transition-colors overflow-hidden">
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Icon */}
        <motion.div
          className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 relative z-10"
          whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
        >
          <Icon className="h-6 w-6 text-primary" />
        </motion.div>

        {/* Value */}
        <div className="relative z-10">
          <motion.div
            className="text-4xl md:text-5xl font-bold gradient-text mb-2"
            initial={{ scale: 0.5 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
          >
            {displayValue}
          </motion.div>

          {/* Label */}
          <p className="text-foreground-secondary text-sm md:text-base font-medium">
            {label}
          </p>
        </div>

        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}



