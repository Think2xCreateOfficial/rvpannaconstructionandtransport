import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface LoaderProps {
  onComplete: () => void;
}

type ConstructionStage =
  "site" | "measure" | "plan" | "material" | "labour" | "build" | "move" | "complete";

interface StageInfo {
  number: string;
  label: string;
  descriptor: string;
}

const STAGES: Record<ConstructionStage, StageInfo> = {
  site: {
    number: "01",
    label: "Site Preparation",
    descriptor: "Setting boundary datum & site orientation",
  },
  measure: {
    number: "02",
    label: "Measure & Levels",
    descriptor: "Structural survey grid & baseline offsets",
  },
  plan: {
    number: "03",
    label: "Architectural Plan",
    descriptor: "2D spatial layout & 3D elevations",
  },
  material: {
    number: "04",
    label: "Material Staging",
    descriptor: "Certified steel, cement & aggregates",
  },
  labour: {
    number: "05",
    label: "Civil Labour",
    descriptor: "Experienced structural masonry teams",
  },
  build: {
    number: "06",
    label: "Structural Build",
    descriptor: "RCC columns, beams & slab casting",
  },
  move: {
    number: "07",
    label: "Site Logistics",
    descriptor: "Dedicated material transport & haulage",
  },
  complete: {
    number: "—",
    label: "RVP Anna",
    descriptor: "Construction & Transport · Walajabad",
  },
};

export function Loader({ onComplete }: LoaderProps) {
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<ConstructionStage>("site");
  const [isClientMounted, setIsClientMounted] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    setIsClientMounted(true);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      onComplete();
      return;
    }

    const finish = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      onComplete();
    };

    // Sequential architectural construction progression (measured total ~2.2s)
    const timers = [
      setTimeout(() => setStage("measure"), 280),
      setTimeout(() => setStage("plan"), 560),
      setTimeout(() => setStage("material"), 840),
      setTimeout(() => setStage("labour"), 1120),
      setTimeout(() => setStage("build"), 1400),
      setTimeout(() => setStage("move"), 1680),
      setTimeout(() => {
        setStage("complete");
        const tEnd = setTimeout(finish, 420);
        return () => clearTimeout(tEnd);
      }, 1960),
    ];

    // Hard ceiling safety timeout (2.6s max) guarantees the user is never blocked
    const safetyTimer = setTimeout(finish, 2600);

    return () => {
      timers.forEach((t) => clearTimeout(t));
      clearTimeout(safetyTimer);
    };
  }, [reduceMotion, onComplete]);

  if (reduceMotion) {
    return null;
  }

  const currentStageInfo = STAGES[stage];

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F7F5F0] text-[#071A2B] select-none"
      role="status"
      aria-label="Loading RVP Anna Construction & Transport"
    >
      <div className="relative flex w-full max-w-md flex-col items-center px-6 text-center">
        {/* Architectural Lottie Construction Animation Frame */}
        <div className="relative mb-5 h-36 sm:h-40 w-56 sm:w-64 flex items-center justify-center overflow-hidden">
          {isClientMounted && (
            <DotLottieReact
              src="/Building and Construction.lottie"
              loop
              autoplay
              className="size-full object-contain"
            />
          )}

          {/* Clean Brand Resolution overlay when complete */}
          {stage === "complete" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center bg-[#F7F5F0]/95 backdrop-blur-xs"
            >
              <img
                src="/rvp-anna-logo.png"
                alt="RVP Anna Construction & Transport"
                width={1522}
                height={984}
                className="h-32 w-auto object-contain"
              />
            </motion.div>
          )}
        </div>

        {/* Phase Indicator & Number */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <p className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-[#071A2B]">
              {currentStageInfo.label}
            </p>
          </div>

          <p className="mt-1.5 text-xs font-mono tracking-wider text-[#071A2B]/60">
            {currentStageInfo.descriptor}
          </p>
        </div>

        {/* Architectural Progress Indicator */}
        <div className="mt-6 h-1 w-44 bg-[#071A2B]/15 overflow-hidden">
          <motion.div
            className="h-full bg-[#D7A62A]"
            initial={{ width: "0%" }}
            animate={{
              width:
                stage === "site"
                  ? "14%"
                  : stage === "measure"
                    ? "28%"
                    : stage === "plan"
                      ? "42%"
                      : stage === "material"
                        ? "56%"
                        : stage === "labour"
                          ? "70%"
                          : stage === "build"
                            ? "84%"
                            : stage === "move"
                              ? "94%"
                              : "100%",
            }}
            transition={{ duration: 0.25, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
