// app/components/waveHeading.tsx
"use client";

import { useState } from "react";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";
import waveData from "../../assets/wave.json";

type Wave = {
  id: number;
  x: number;
  rotation: number;
  delay: number; // Add delay property
  duration: number; // Randomize duration slightly too for more natural feel
};

export default function InteractiveHeading() {
  const [waves, setWaves] = useState<Wave[]>([]);

  const handleClick = () => {
    // INCREASED: Spawn 50 waves
    const timestamp = Date.now();
    const newWaves = Array.from({ length: 40 }).map((_, i) => ({
      id: timestamp + i + Math.random(), // Use index 'i' to guarantee difference
      x: Math.random() * 100 - 50,
      rotation: Math.random() * 30 - 10,
      delay: Math.random() * 0.6, // Random delay between 0s and 0.5s
      duration: 2 + Math.random(), // Random duration between 2s and 3s
    }));

    setWaves((prev) => [...prev, ...newWaves]);

    // Cleanup: Wait for max duration + max delay
    setTimeout(() => {
      setWaves((prev) => prev.filter((w) => !newWaves.includes(w)));
    }, 4000);
  };

  return (
    <div className="relative inline-block">
      <h1 className="hero-heading">
        {/* ONLY "Hey" is clickable now */}
        <span
          onClick={handleClick}
          className="cursor-pointer select-none active:scale-95 transition-all inline-block  hover:underline hover:decoration-black-400 hover:underline-offset-4"
        >
          Hey,
        </span>{" "}
        I&apos;m Alex.
      </h1>

      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        <AnimatePresence>
          {waves.map((wave) => (
            <motion.div
              key={wave.id}
              initial={{ y: -100, opacity: 0, x: `${wave.x}vw` }}
              animate={{
                y: "110vh",
                opacity: [0, 1, 1, 0],
                rotate: wave.rotation,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: wave.duration, // Use random duration
                ease: "easeIn",
                delay: wave.delay, // Use random delay
              }}
              className="absolute left-1/2 top-0 w-24 h-24"
            >
              <Lottie animationData={waveData} loop={true} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
