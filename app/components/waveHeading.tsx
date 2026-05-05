// app/components/waveHeading.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import type { ComponentType } from "react";

type Wave = {
  id: number;
  x: number;
  rotation: number;
  delay: number;
  duration: number;
};

export default function InteractiveHeading() {
  const [waves, setWaves] = useState<Wave[]>([]);
  const [waveData, setWaveData] = useState<object | null>(null);
  const [LottieComponent, setLottieComponent] = useState<ComponentType<{
    animationData: object;
    loop?: boolean;
  }> | null>(null);
  const [motionLib, setMotionLib] = useState<{
    AnimatePresence: ComponentType<{ children: React.ReactNode }>;
    motion: {
      div: ComponentType<
        Record<string, unknown> & { children?: React.ReactNode }
      >;
    };
  } | null>(null);
  const [isWaveAssetsLoading, setIsWaveAssetsLoading] = useState(false);

  const loadWaveAssets = async () => {
    if (LottieComponent && motionLib && waveData) return;
    if (isWaveAssetsLoading) return;

    setIsWaveAssetsLoading(true);
    try {
      const [{ default: lottieReact }, framerMotion, waveJson] =
        await Promise.all([
          import("lottie-react"),
          import("framer-motion"),
          import("../../assets/wave.json"),
        ]);

      setLottieComponent(() => lottieReact);
      setMotionLib({
        AnimatePresence: framerMotion.AnimatePresence,
        motion: framerMotion.motion as {
          div: ComponentType<
            Record<string, unknown> & { children?: React.ReactNode }
          >;
        },
      });
      setWaveData(waveJson.default);
    } finally {
      setIsWaveAssetsLoading(false);
    }
  };

  const handleClick = async () => {
    await loadWaveAssets();

    const timestamp = Date.now();
    const newWaves = Array.from({ length: 35 }).map((_, i) => ({
      id: timestamp + i + Math.random(),
      // Keep left spread the same, trim right spread by ~10vw.
      x: Math.random() * 90 - 50,
      rotation: Math.random() * 50 - 10,
      delay: Math.random() * 0.8,
      duration: 2 + Math.random(),
    }));

    setWaves((prev) => [...prev, ...newWaves]);

    setTimeout(() => {
      setWaves((prev) => prev.filter((w) => !newWaves.includes(w)));
    }, 4000);
  };

  return (
    <div className="hero-heading-stack relative inline-flex flex-col items-start">
      <h1 className="hero-heading">
        <span
          onClick={() => {
            void handleClick();
          }}
          className="cursor-pointer select-none active:scale-95 transition-all inline-block  hover:underline hover:decoration-black-400 hover:underline-offset-4"
        >
          Hey,
        </span>{" "}
        I&apos;m Alex.
      </h1>

      {/* V4: Bracket monospace — ACTIVE */}
      <div
        className="hero-affiliation v4"
        style={{
          paddingTop: "10px",
          paddingBottom: "20px",
        }}
        aria-label="Physics and computer science at University of Toronto"
      >
        <span className="v4-bracket" aria-hidden="true">
          [
        </span>
        <span className="v4-subject">Physics + CS</span>
        <span className="v4-sep" aria-hidden="true">
          /
        </span>
        <Image
          src="/images/Utoronto.png"
          alt=""
          width={18}
          height={18}
          className="v4-logo"
        />
        <span className="v4-school">UofToronto</span>
        <span className="v4-bracket" aria-hidden="true">
          ]
        </span>
      </div>

      {/* V4c: Bracket monospace, black slash (commented out)
      <div
        className="hero-affiliation v4"
        aria-label="Physics and computer science at University of Toronto"
      >
        <span className="v4-bracket" aria-hidden="true">[</span>
        <span className="v4-subject">Physics + CS</span>
        <span className="v4-sep v4-sep-dark" aria-hidden="true">/</span>
        <Image src="/images/Utoronto.png" alt="" width={18} height={18} className="v4-logo" />
        <span className="v4-school">UofToronto</span>
        <span className="v4-bracket" aria-hidden="true">]</span>
      </div>
      */}

      {/* V1: Inline chip + @ + school (commented out)
      <div
        className="hero-affiliation v1"
        aria-label="Physics and computer science at University of Toronto"
      >
        <span className="v1-highlight">Physics + CS</span>
        <span className="v1-at">@</span>
        <Image src="/images/Utoronto.png" alt="" width={18} height={18} className="v1-logo" />
        <span className="v1-school">UofToronto</span>
      </div>
      */}

      {/* V5: Stacked badge (commented out)
      <div
        className="hero-affiliation v5"
        aria-label="Physics and computer science at University of Toronto"
      >
        <span className="v5-badge">
          <Image src="/images/Utoronto.png" alt="" width={28} height={28} className="v5-logo" />
          <span className="v5-text">
            <span className="v5-subject">Physics + CS</span>
            <span className="v5-school">University of Toronto</span>
          </span>
        </span>
      </div>
      */}

      {motionLib && LottieComponent && waveData && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
          <motionLib.AnimatePresence>
            {waves.map((wave) => (
              <motionLib.motion.div
                key={wave.id}
                initial={{ y: -100, opacity: 0, x: `${wave.x}vw` }}
                animate={{
                  y: "110vh",
                  opacity: [0, 1, 1, 0],
                  rotate: wave.rotation,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: wave.duration,
                  ease: "easeIn",
                  delay: wave.delay,
                }}
                className="absolute left-1/2 top-0 w-24 h-24"
              >
                <LottieComponent animationData={waveData} loop={true} />
              </motionLib.motion.div>
            ))}
          </motionLib.AnimatePresence>
        </div>
      )}
    </div>
  );
}
