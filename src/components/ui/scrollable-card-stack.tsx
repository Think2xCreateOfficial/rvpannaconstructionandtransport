"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CardItem {
  avatar?: string;
  description?: string;
  handle: string;
  href?: string;
  id: string;
  image: string;
  name: string;
  number?: string;
  scope?: string;
}

export interface ScrollableCardStackProps {
  cardHeight?: number;
  className?: string;
  items: CardItem[];
  perspective?: number;
  transitionDuration?: number;
  onSelectCard?: (item: CardItem) => void;
}

const SWIPE_THRESHOLD_PX = 36;
const SWIPE_VELOCITY_THRESHOLD = 0.3;
const ANIMATION_DURATION_MS = 320;

export const ScrollableCardStack: React.FC<ScrollableCardStackProps> = ({
  items,
  className,
  onSelectCard,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragDeltaX, setDragDeltaX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const totalItems = items.length;
  const maxIndex = Math.max(0, totalItems - 1);

  // Gesture tracking refs
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startTimeRef = useRef(0);
  const directionLockedRef = useRef<"horizontal" | "vertical" | null>(null);
  const activePointerIdRef = useRef<number | null>(null);
  const animTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Preload and decode cache to guarantee no blank/flash frames
  const decodedSetRef = useRef<Set<string>>(new Set());

  const preloadAndDecode = useCallback((src: string) => {
    if (!src || decodedSetRef.current.has(src) || typeof window === "undefined") {
      return;
    }
    const img = new Image();
    img.src = src;
    if (typeof img.decode === "function") {
      img
        .decode()
        .then(() => {
          decodedSetRef.current.add(src);
        })
        .catch(() => {
          decodedSetRef.current.add(src);
        });
    } else {
      (img as HTMLImageElement).onload = () => {
        decodedSetRef.current.add(src);
      };
    }
  }, []);

  // Preload current, next, and previous image ahead of time
  useEffect(() => {
    if (!items || items.length === 0) return;
    const curr = items[currentIndex];
    const next = items[Math.min(currentIndex + 1, maxIndex)];
    const prev = items[Math.max(currentIndex - 1, 0)];

    if (curr?.image) preloadAndDecode(curr.image);
    if (next?.image) preloadAndDecode(next.image);
    if (prev?.image) preloadAndDecode(prev.image);
  }, [currentIndex, items, maxIndex, preloadAndDecode]);

  // Clean up animation timeout on unmount
  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) {
        clearTimeout(animTimeoutRef.current);
      }
    };
  }, []);

  const goToCard = useCallback(
    (targetIndex: number) => {
      const clamped = Math.max(0, Math.min(targetIndex, maxIndex));
      if (clamped === currentIndex) {
        setDragDeltaX(0);
        setIsDragging(false);
        return;
      }

      if (shouldReduceMotion) {
        setCurrentIndex(clamped);
        setDragDeltaX(0);
        setIsDragging(false);
        setIsAnimating(false);
        return;
      }

      setIsAnimating(true);
      setCurrentIndex(clamped);
      setDragDeltaX(0);
      setIsDragging(false);

      if (animTimeoutRef.current) {
        clearTimeout(animTimeoutRef.current);
      }
      animTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, ANIMATION_DURATION_MS + 40);
    },
    [currentIndex, maxIndex, shouldReduceMotion],
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.isPrimary || e.button !== 0) return;
    if (isAnimating) return;

    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    startTimeRef.current = Date.now();
    directionLockedRef.current = null;
    activePointerIdRef.current = e.pointerId;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerIdRef.current !== e.pointerId) return;

    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;

    if (directionLockedRef.current === null) {
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      if (absDx > 6 || absDy > 6) {
        if (absDx > absDy) {
          directionLockedRef.current = "horizontal";
          setIsDragging(true);
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch {
            // Safe fallback for older WebKit
          }
        } else {
          directionLockedRef.current = "vertical";
          activePointerIdRef.current = null;
          return;
        }
      }
    }

    if (directionLockedRef.current === "horizontal") {
      // Gentle rubber-banding at boundary edges
      if ((currentIndex === 0 && dx > 0) || (currentIndex === maxIndex && dx < 0)) {
        setDragDeltaX(dx * 0.28);
      } else {
        setDragDeltaX(dx);
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerIdRef.current !== e.pointerId) return;

    if (directionLockedRef.current === "horizontal") {
      try {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        // Safe fallback
      }

      const dx = e.clientX - startXRef.current;
      const dt = Math.max(1, Date.now() - startTimeRef.current);
      const velocity = dx / dt;

      if (dx < -SWIPE_THRESHOLD_PX || velocity < -SWIPE_VELOCITY_THRESHOLD) {
        if (currentIndex < maxIndex) {
          goToCard(currentIndex + 1);
        } else {
          goToCard(currentIndex);
        }
      } else if (dx > SWIPE_THRESHOLD_PX || velocity > SWIPE_VELOCITY_THRESHOLD) {
        if (currentIndex > 0) {
          goToCard(currentIndex - 1);
        } else {
          goToCard(currentIndex);
        }
      } else {
        goToCard(currentIndex);
      }
    }

    activePointerIdRef.current = null;
    directionLockedRef.current = null;
    setIsDragging(false);
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerIdRef.current === e.pointerId) {
      activePointerIdRef.current = null;
      directionLockedRef.current = null;
      setIsDragging(false);
      setDragDeltaX(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isAnimating) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToCard(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goToCard(currentIndex + 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      goToCard(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goToCard(maxIndex);
    }
  };

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsAnimating(false);
    }
  };

  const activeItem = items[currentIndex];

  const trackTransform = isDragging
    ? `translate3d(calc(-${currentIndex * 100}% + ${dragDeltaX}px), 0, 0)`
    : `translate3d(-${currentIndex * 100}%, 0, 0)`;

  const trackTransition =
    isDragging || shouldReduceMotion
      ? "none"
      : isAnimating
        ? `transform ${ANIMATION_DURATION_MS}ms cubic-bezier(0.25, 1, 0.5, 1)`
        : "none";

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section
      aria-atomic="true"
      aria-label="Mobile construction project documentation gallery"
      aria-live="polite"
      className={cn("relative mx-auto w-full max-w-lg select-none", className)}
    >
      {/* 1. Header Meta Bar (Synchronous with active image) */}
      <div className="mb-3 flex flex-col gap-1 text-left px-0.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-highlight">
            {activeItem?.number || String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(totalItems).padStart(2, "0")} · {activeItem?.handle}
          </span>
          {activeItem?.scope && (
            <span className="font-mono text-[11px] text-primary-foreground/60 hidden xs:inline truncate max-w-[190px]">
              {activeItem.scope}
            </span>
          )}
        </div>
        <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-primary-foreground line-clamp-1">
          {activeItem?.name}
        </h3>
      </div>

      {/* 2. Stable Clipping Container & Viewport */}
      <div
        className="relative w-full aspect-[4/3] overflow-hidden border border-background/20 bg-primary-soft shadow-xl touch-pan-y focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-highlight"
        onKeyDown={handleKeyDown}
        onPointerCancel={handlePointerCancel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        role="region"
        aria-roledescription="carousel"
        aria-label="Construction photographs"
        tabIndex={0}
      >
        {/* Continuous Horizontal Hardware-Accelerated Track */}
        <div
          className="flex flex-row h-full w-full"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: trackTransform,
            transition: trackTransition,
            willChange: isDragging || isAnimating ? "transform" : "auto",
          }}
        >
          {items.map((item, index) => {
            const isCurrent = index === currentIndex;

            return (
              <div
                key={`mobile-gallery-slide-${item.id}`}
                className="relative h-full w-full min-w-full shrink-0 overflow-hidden bg-primary cursor-pointer"
                onClick={() => {
                  if (Math.abs(dragDeltaX) < 6) {
                    onSelectCard?.(item);
                  }
                }}
                aria-hidden={!isCurrent}
                aria-label={`${item.name} (${index + 1} of ${totalItems})`}
                role="group"
                aria-roledescription="slide"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="size-full object-cover select-none pointer-events-none"
                  draggable={false}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                />

                {/* Subtle gradient vignette at bottom for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent pointer-events-none" />

                {/* Bottom Overlay Pills */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 border border-background/25 bg-primary/90 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-highlight backdrop-blur-sm">
                    <span className="size-1.5 rounded-full bg-highlight" />
                    {item.handle}
                  </span>

                  <span className="inline-flex items-center gap-1 border border-background/25 bg-primary/90 px-2 py-0.5 font-mono text-[10px] font-semibold text-primary-foreground/90 backdrop-blur-sm">
                    Enquire →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Architectural Navigation Controls & Progress Indicator */}
      <div className="mt-3 flex items-center justify-between gap-3 px-0.5">
        {/* Previous Card Button (44x44px minimum touch target) */}
        <button
          type="button"
          onClick={() => goToCard(currentIndex - 1)}
          disabled={currentIndex === 0 || isAnimating}
          className="flex size-11 shrink-0 items-center justify-center border border-background/20 bg-primary/80 text-highlight backdrop-blur-sm transition-all disabled:opacity-25 disabled:pointer-events-none hover:border-highlight hover:bg-primary active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-highlight"
          aria-label="Previous photograph"
        >
          <ChevronLeft className="size-4" />
        </button>

        {/* Minimal Architectural Progress Bar */}
        <div className="flex flex-1 flex-col items-center gap-1.5 px-2">
          <div
            className="h-1 w-full bg-background/20 overflow-hidden relative"
            role="progressbar"
            aria-valuenow={currentIndex + 1}
            aria-valuemin={1}
            aria-valuemax={totalItems}
            aria-label={`Photograph ${currentIndex + 1} of ${totalItems}`}
          >
            <div
              className="h-full bg-highlight transition-all duration-300 ease-out"
              style={{
                width: `${((currentIndex + 1) / totalItems) * 100}%`,
              }}
            />
          </div>
          <span className="font-mono text-[10px] tracking-wider uppercase text-primary-foreground/60">
            Swipe or tap to view
          </span>
        </div>

        {/* Next Card Button (44x44px minimum touch target) */}
        <button
          type="button"
          onClick={() => goToCard(currentIndex + 1)}
          disabled={currentIndex === maxIndex || isAnimating}
          className="flex size-11 shrink-0 items-center justify-center border border-background/20 bg-primary/80 text-highlight backdrop-blur-sm transition-all disabled:opacity-25 disabled:pointer-events-none hover:border-highlight hover:bg-primary active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-highlight"
          aria-label="Next photograph"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Screen Reader Announcement */}
      <div aria-live="polite" className="sr-only">
        {`Photograph ${currentIndex + 1} of ${totalItems}: ${activeItem?.name}. Swipe or use arrow keys to navigate.`}
      </div>
    </section>
  );
};

export default ScrollableCardStack;
