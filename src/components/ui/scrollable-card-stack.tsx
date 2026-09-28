"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useReducedMotion, type PanInfo } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SCROLL_TIMEOUT_OFFSET = 80;
const MIN_SCROLL_INTERVAL = 250;
const SCROLL_THRESHOLD = 20;
const SCALE_FACTOR = 0.07;
const MIN_SCALE = 0.1;
const MAX_SCALE = 2;
const HOVER_SCALE_MULTIPLIER = 1.02;
const CARD_PADDING = 110;

const FRAME_OFFSET = -22;
const FRAMES_VISIBLE_LENGTH = 3;
const SNAP_DISTANCE = 50;

export interface CardItem {
  avatar: string;
  handle: string;
  href: string;
  id: string;
  image: string;
  name: string;
}

export interface ScrollableCardStackProps {
  cardHeight?: number;
  className?: string;
  items: CardItem[];
  perspective?: number;
  transitionDuration?: number;
  onSelectCard?: (item: CardItem) => void;
}

export const ScrollableCardStack: React.FC<ScrollableCardStackProps> = ({
  items,
  cardHeight = 320,
  perspective = 1000,
  transitionDuration = 200,
  className,
  onSelectCard,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollY = useMotionValue(0);
  const lastScrollTime = useRef(0);
  const shouldReduceMotion = useReducedMotion();

  const totalItems = items.length;
  const maxIndex = totalItems - 1;

  const clamp = useCallback(
    (val: number, [min, max]: [number, number]): number => Math.min(Math.max(val, min), max),
    [],
  );

  const scrollToCard = useCallback(
    (direction: 1 | -1) => {
      if (isScrolling) {
        return;
      }

      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime.current;

      if (timeSinceLastScroll < MIN_SCROLL_INTERVAL) {
        return;
      }

      const newIndex = clamp(currentIndex + direction, [0, maxIndex]);

      if (newIndex !== currentIndex) {
        lastScrollTime.current = now;
        setIsScrolling(true);
        setCurrentIndex(newIndex);
        scrollY.set(newIndex * SNAP_DISTANCE);

        setTimeout(() => {
          setIsScrolling(false);
        }, transitionDuration + SCROLL_TIMEOUT_OFFSET);
      }
    },
    [currentIndex, maxIndex, scrollY, isScrolling, transitionDuration, clamp],
  );

  const goToCard = useCallback(
    (index: number) => {
      if (isScrolling || index === currentIndex) {
        return;
      }
      const targetIndex = clamp(index, [0, maxIndex]);
      setIsScrolling(true);
      setCurrentIndex(targetIndex);
      scrollY.set(targetIndex * SNAP_DISTANCE);

      setTimeout(() => {
        setIsScrolling(false);
      }, transitionDuration + SCROLL_TIMEOUT_OFFSET);
    },
    [currentIndex, isScrolling, maxIndex, scrollY, transitionDuration, clamp],
  );

  // Wheel event for desktop / trackpads
  const handleScroll = useCallback(
    (deltaY: number) => {
      if (isDragging || isScrolling) {
        return;
      }

      if (Math.abs(deltaY) < SCROLL_THRESHOLD) {
        return;
      }

      const scrollDirection = deltaY > 0 ? 1 : -1;
      scrollToCard(scrollDirection);
    },
    [isDragging, isScrolling, scrollToCard],
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 15) {
        handleScroll(e.deltaY);
      }
    },
    [handleScroll],
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isScrolling) {
        return;
      }

      switch (e.key) {
        case "ArrowUp":
        case "ArrowLeft": {
          e.preventDefault();
          scrollToCard(-1);
          break;
        }
        case "ArrowDown":
        case "ArrowRight": {
          e.preventDefault();
          scrollToCard(1);
          break;
        }
        case "Home": {
          e.preventDefault();
          goToCard(0);
          break;
        }
        case "End": {
          e.preventDefault();
          goToCard(maxIndex);
          break;
        }
      }
    },
    [goToCard, isScrolling, maxIndex, scrollToCard],
  );

  // Framer motion drag gesture handler for mobile swipe
  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false);
      const swipeThreshold = 35;
      const velocityThreshold = 250;

      if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
        scrollToCard(1);
      } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
        scrollToCard(-1);
      }
    },
    [scrollToCard],
  );

  // Native touch gesture listeners for touchscreens
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchMoved = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? 0;
    touchStartY.current = e.touches[0]?.clientY ?? 0;
    touchMoved.current = false;
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || isScrolling) {
        return;
      }

      const currentX = e.touches[0]?.clientX ?? 0;
      const currentY = e.touches[0]?.clientY ?? 0;
      const deltaX = touchStartX.current - currentX;
      const deltaY = touchStartY.current - currentY;

      // Only trigger horizontal card advance if horizontal motion dominates
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40 && !touchMoved.current) {
        const direction = deltaX > 0 ? 1 : -1;
        scrollToCard(direction);
        touchMoved.current = true;
      }
    },
    [isDragging, isScrolling, scrollToCard],
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    touchMoved.current = false;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    container.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  useEffect(() => {
    if (!isDragging) {
      scrollY.set(currentIndex * SNAP_DISTANCE);
    }
  }, [currentIndex, isDragging, scrollY]);

  const getCardTransform = useCallback(
    (index: number) => {
      const offsetIndex = index - currentIndex;
      const isBehindCurrent = currentIndex > index;
      const blur = !shouldReduceMotion && isBehindCurrent ? 2 : 0;
      const opacity = currentIndex > index ? 0 : 1;

      const scale = shouldReduceMotion
        ? 1
        : clamp(1 - offsetIndex * SCALE_FACTOR, [MIN_SCALE, MAX_SCALE]);

      const y = shouldReduceMotion
        ? 0
        : clamp(offsetIndex * FRAME_OFFSET, [
            FRAME_OFFSET * FRAMES_VISIBLE_LENGTH,
            Number.POSITIVE_INFINITY,
          ]);

      const zIndex = items.length - index;

      return {
        blur,
        opacity,
        scale,
        y,
        zIndex,
      };
    },
    [currentIndex, items.length, clamp, shouldReduceMotion],
  );

  return (
    <section
      aria-atomic="true"
      aria-label="Scrollable construction card stack"
      aria-live="polite"
      className={cn("relative mx-auto w-full max-w-[340px] sm:max-w-sm select-none", className)}
    >
      {/* 3D Card Stack Container */}
      <div
        aria-label="Scrollable card container"
        className="relative h-full w-full touch-pan-y"
        onKeyDown={handleKeyDown}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        ref={containerRef}
        role="application"
        style={{
          minHeight: `${cardHeight + CARD_PADDING}px`,
          perspective: `${perspective}px`,
          perspectiveOrigin: "center 55%",
        }}
        tabIndex={0}
      >
        {items.map((item, i) => {
          const transform = getCardTransform(i);
          const isActive = i === currentIndex;
          const isHovered = hoveredIndex === i;

          return (
            <motion.div
              animate={
                shouldReduceMotion
                  ? { x: "-50%" }
                  : {
                      scale: transform.scale,
                      x: "-50%",
                      y: `calc(-50% + ${transform.y}px)`,
                    }
              }
              aria-hidden={!isActive}
              className="absolute top-1/2 left-1/2 w-full max-w-[320px] sm:max-w-[340px] overflow-hidden border border-background/25 bg-card shadow-xl transition-shadow cursor-grab active:cursor-grabbing"
              data-active={isActive}
              drag={isActive ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              dragSnapToOrigin={true}
              initial={false}
              key={`scrollable-card-${item.id}`}
              onBlur={() => setHoveredIndex(null)}
              onDragEnd={isActive ? handleDragEnd : () => {}}
              onDragStart={() => setIsDragging(true)}
              onFocus={() => isActive && setHoveredIndex(i)}
              onMouseEnter={() => isActive && setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                borderWidth: `${2 / transform.scale}px`,
                filter: `blur(${transform.blur}px)`,
                height: `${cardHeight}px`,
                opacity: transform.opacity,
                pointerEvents: isActive ? "auto" : "none",
                transformOrigin: "center center",
                transitionDuration: shouldReduceMotion ? "0ms" : "220ms",
                transitionProperty: shouldReduceMotion ? "none" : "opacity, filter",
                transitionTimingFunction: "cubic-bezier(0.645, 0.045, 0.355, 1)",
                willChange: shouldReduceMotion ? undefined : "opacity, filter, transform",
                zIndex: transform.zIndex,
              }}
              tabIndex={isActive ? 0 : -1}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      damping: 24,
                      duration: 0.25,
                      mass: 0.5,
                      stiffness: 280,
                      type: "spring" as const,
                    }
              }
              whileHover={
                shouldReduceMotion || !isActive
                  ? {}
                  : {
                      scale: transform.scale * HOVER_SCALE_MULTIPLIER,
                    }
              }
            >
              {/* Card Content */}
              <div
                className={cn(
                  "flex h-full w-full flex-col bg-primary-soft transition-all duration-200",
                  isHovered && "shadow-xl",
                  isScrolling && isActive && "ring-2 ring-highlight ring-opacity-60",
                )}
                style={{ height: `${cardHeight}px` }}
              >
                {/* Image Container */}
                <div
                  className="relative w-full flex-1 overflow-hidden bg-primary cursor-pointer"
                  onClick={() => onSelectCard?.(item)}
                >
                  <img
                    alt={item.name}
                    className="absolute inset-0 size-full object-cover pointer-events-none"
                    decoding="async"
                    draggable={false}
                    src={item.image}
                  />
                  <div className="absolute inset-0 bg-image-fade pointer-events-none" />

                  {/* Card Index Pill on Top Left */}
                  <div className="absolute top-2.5 left-2.5 border border-background/20 bg-primary/85 px-2 py-0.5 font-mono text-[10px] font-bold text-highlight backdrop-blur-sm">
                    {String(i + 1).padStart(2, "0")} / {String(totalItems).padStart(2, "0")}
                  </div>
                </div>

                {/* Info Bar at Bottom */}
                <div
                  onClick={() => onSelectCard?.(item)}
                  className="flex items-center justify-between border-t border-background/20 bg-primary/95 p-3 text-primary-foreground backdrop-blur-sm cursor-pointer"
                >
                  <div className="flex flex-col truncate pr-2 text-left">
                    <span className="font-bold text-xs leading-snug truncate text-primary-foreground">
                      {item.name}
                    </span>
                    <span className="font-mono text-[10px] text-highlight uppercase tracking-wider">
                      {item.handle}
                    </span>
                  </div>

                  <a
                    href={item.href}
                    className="inline-flex size-7 shrink-0 items-center justify-center border border-background/25 text-highlight bg-primary hover:bg-highlight hover:text-highlight-foreground transition-colors"
                    aria-label={`Select ${item.name}`}
                  >
                    <span className="text-xs font-mono font-bold">→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Navigation Controls: Left/Right Buttons & Dots */}
        <div className="absolute bottom-1 left-0 right-0 flex items-center justify-between px-2">
          {/* Previous Card Button */}
          <button
            type="button"
            onClick={() => scrollToCard(-1)}
            disabled={currentIndex === 0}
            className="flex size-11 items-center justify-center border border-background/20 bg-primary/80 text-highlight backdrop-blur-sm transition-all disabled:opacity-30 disabled:pointer-events-none hover:border-highlight hover:bg-primary"
            aria-label="Previous card"
          >
            <ChevronLeft className="size-4" />
          </button>

          {/* Dots Indicator */}
          <div
            aria-label="Card navigation"
            className="flex items-center justify-center gap-1.5"
            role="tablist"
          >
            {Array.from({ length: items.length }, (_, i) => (
              <button
                key={`scrollable-indicator-${items[i]?.id || i}`}
                type="button"
                role="tab"
                aria-label={`Go to card ${i + 1} of ${items.length}`}
                aria-selected={i === currentIndex}
                onClick={() => goToCard(i)}
                className="flex size-8 items-center justify-center p-0 cursor-pointer focus:outline-none"
              >
                <span
                  className={cn(
                    "block transition-all duration-200",
                    i === currentIndex
                      ? "h-2 w-5 bg-highlight"
                      : "size-1.5 bg-background/40 hover:bg-background/70",
                  )}
                />
              </button>
            ))}
          </div>

          {/* Next Card Button */}
          <button
            type="button"
            onClick={() => scrollToCard(1)}
            disabled={currentIndex === maxIndex}
            className="flex size-11 items-center justify-center border border-background/20 bg-primary/80 text-highlight backdrop-blur-sm transition-all disabled:opacity-30 disabled:pointer-events-none hover:border-highlight hover:bg-primary"
            aria-label="Next card"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div aria-live="polite" className="sr-only">
          {`Card ${currentIndex + 1} of ${items.length} selected. Swipe or use arrow keys to navigate.`}
        </div>
      </div>
    </section>
  );
};

export default ScrollableCardStack;
