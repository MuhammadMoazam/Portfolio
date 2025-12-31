"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, PartyPopper, Trophy, Star } from "lucide-react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

/**
 * Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
 */
const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/**
 * Easter egg with Konami code trigger
 */
export function KonamiEasterEgg() {
  const [input, setInput] = useState<string[]>([]);
  const [isActivated, setIsActivated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const triggerConfetti = useCallback(() => {
    if (prefersReducedMotion) return;

    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [prefersReducedMotion]);

  const activateEasterEgg = useCallback(() => {
    setIsActivated(true);
    setShowModal(true);
    triggerConfetti();

    // Reset after 5 seconds
    setTimeout(() => {
      setIsActivated(false);
    }, 5000);
  }, [triggerConfetti]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setInput((prev) => {
        const newInput = [...prev, e.key].slice(-KONAMI_CODE.length);
        
        // Check if Konami code is complete
        if (
          newInput.length === KONAMI_CODE.length &&
          newInput.every((key, i) => key.toLowerCase() === KONAMI_CODE[i].toLowerCase())
        ) {
          activateEasterEgg();
          return [];
        }

        return newInput;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activateEasterEgg]);

  return (
    <>
      {/* Floating icons animation */}
      <AnimatePresence>
        {isActivated && !prefersReducedMotion && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="fixed pointer-events-none z-[9998]"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 50,
                  opacity: 1,
                  rotate: 0,
                }}
                animate={{
                  y: -100,
                  opacity: [1, 1, 0],
                  rotate: 360,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  ease: "easeOut",
                  delay: Math.random() * 0.5,
                }}
              >
                {i % 4 === 0 && <Sparkles className="w-8 h-8 text-yellow-500" />}
                {i % 4 === 1 && <Star className="w-8 h-8 text-blue-500" />}
                {i % 4 === 2 && <Trophy className="w-6 h-6 text-purple-500" />}
                {i % 4 === 3 && <PartyPopper className="w-7 h-7 text-pink-500" />}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Congratulations modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="bg-gradient-to-br from-primary to-secondary p-8 rounded-2xl shadow-2xl max-w-md mx-4 text-center text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1.1, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <PartyPopper className="w-20 h-20 mx-auto mb-4" />
              </motion.div>

              <h2 className="text-3xl font-bold mb-3">
                🎉 You Found It! 🎉
              </h2>
              
              <p className="text-lg mb-4 opacity-90">
                Congratulations! You've discovered the secret Konami code!
              </p>

              <div className="bg-white/20 rounded-lg p-4 mb-6 backdrop-blur">
                <p className="text-sm font-mono">
                  ↑ ↑ ↓ ↓ ← → ← → B A
                </p>
              </div>

              <p className="text-sm opacity-75 mb-6">
                You're a true explorer! 🚀
              </p>

              <motion.button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Awesome!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Simple click counter easter egg
 * Click a specific element 10 times to activate
 */
export function ClickCounterEasterEgg({
  targetSelector = "#logo",
  requiredClicks = 10,
}: {
  targetSelector?: string;
  requiredClicks?: number;
}) {
  const [clicks, setClicks] = useState(0);
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    const handleClick = () => {
      setClicks((prev) => {
        const newCount = prev + 1;
        if (newCount >= requiredClicks) {
          setIsActivated(true);
          setTimeout(() => {
            setIsActivated(false);
            return 0;
          }, 3000);
        }
        return newCount >= requiredClicks ? 0 : newCount;
      });
    };

    target.addEventListener("click", handleClick);
    return () => target.removeEventListener("click", handleClick);
  }, [targetSelector, requiredClicks]);

  return (
    <AnimatePresence>
      {isActivated && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed top-4 right-4 z-[9999] bg-primary text-white px-6 py-3 rounded-lg shadow-lg"
        >
          🎊 Secret achievement unlocked!
        </motion.div>
      )}
    </AnimatePresence>
  );
}



