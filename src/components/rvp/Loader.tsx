import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DotLottieReact, setWasmUrl } from "@lottiefiles/dotlottie-react";

// Configure local WASM URL immediately so it never fetches from external CDN (unpkg/jsdelivr)
if (typeof window !== "undefined") {
  setWasmUrl("/dotlottie-player.wasm");
}

interface LoaderProps {
  onComplete: () => void;
}

type LoaderPhase = "construction" | "logo";

export function Loader({ onComplete }: LoaderProps) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<LoaderPhase>("construction");
  const [isClientMounted, setIsClientMounted] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    setIsClientMounted(true);
    // Preload official business logo asset for zero-flicker transition
    if (typeof window !== "undefined") {
      const img = new Image();
      img.src = "/rvp-anna-logo.png";
    }
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

    // Sequential timing:
    // 0ms - 2000ms: Construction Lottie reaches completion (~2.0s)
    // 2000ms - 2750ms: RVP Anna business logo ending sequence (~750ms)
    // 2750ms: Reveal website (smooth exit fade)
    // Total loader duration: ~2.8 seconds (within 2-3s target, well under 3s hard max)
    const logoTimer = setTimeout(() => {
      setPhase("logo");
    }, 2000);

    const completeTimer = setTimeout(() => {
      finish();
    }, 2750);

    // Safety fallback timeout
    const safetyTimer = setTimeout(finish, 3500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(completeTimer);
      clearTimeout(safetyTimer);
    };
  }, [reduceMotion, onComplete]);

  if (reduceMotion) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F7F5F0] text-[#071A2B] select-none px-4"
      role="status"
      aria-label="Loading RVP Anna Construction & Transport"
    >
      <div className="relative flex min-h-[190px] w-full max-w-sm flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {phase === "construction" && (
            <motion.div
              key="construction"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="flex w-full flex-col items-center"
            >
              {/* Construction Lottie Animation Frame - integrated without raw player controls */}
              <div className="relative w-full max-w-[270px] sm:max-w-[300px] aspect-[600/402] flex items-center justify-center">
                {isClientMounted ? (
                  <DotLottieReact
                    src="/building-construction.lottie"
                    loop={false}
                    autoplay
                    speed={0.8}
                    className="size-full object-contain pointer-events-none"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <div className="size-10 animate-pulse rounded-full border-2 border-[#D7A62A]/40 border-t-[#D7A62A]" />
                  </div>
                )}
              </div>

              {/* Architectural Progress Indicator */}
              <div className="mt-4 h-1.5 w-44 sm:w-52 bg-[#071A2B]/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#D7A62A] rounded-full"
                  initial={{ width: "15%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.9, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>
          )}

          {phase === "logo" && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center py-2"
            >
              {/* Official RVP Anna Business Identity */}
              <img
                src="/rvp-anna-logo.png"
                alt="RVP Anna Construction & Transport"
                width={1522}
                height={984}
                className="h-24 sm:h-32 w-auto max-w-[210px] select-none object-contain"
              />

              {/* Architectural Precision Line Closure */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.75 }}
                transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
                className="mt-3.5 h-[1.5px] w-14 bg-[#D7A62A] origin-center"
              />

              {/* Restrained Architectural Sub-descriptor */}
              <motion.p
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 0.75, y: 0 }}
                transition={{ duration: 0.3, delay: 0.18 }}
                className="mt-2 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#071A2B]"
              >
                Civil Engineering &amp; Transport
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
