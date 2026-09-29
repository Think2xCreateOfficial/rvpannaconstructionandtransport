import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Layers, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { materials, type MaterialDetailItem } from "@/data/materials";

interface MaterialsSectionProps {
  onSelectMaterials: () => void;
}

const ROTATION_INTERVAL_MS = 4500;

export function MaterialsSection({ onSelectMaterials }: MaterialsSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();

  const mobileTabContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  const activeMaterial: MaterialDetailItem = materials[selectedIndex] ?? materials[0]!;

  const advanceNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % materials.length);
    setProgress(0);
  }, []);

  // Automatic calm rotation engine without play/pause buttons
  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const intervalStep = 50;
    const progressIncrement = (intervalStep / ROTATION_INTERVAL_MS) * 100;

    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          advanceNext();
          return 0;
        }
        return old + progressIncrement;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [selectedIndex, reduceMotion, advanceNext]);

  // Smoothly scroll active tab into view inside its horizontal container on mobile
  useEffect(() => {
    if (activeTabRef.current && mobileTabContainerRef.current) {
      const container = mobileTabContainerRef.current;
      const tab = activeTabRef.current;
      const tabLeft = tab.offsetLeft;
      const tabWidth = tab.offsetWidth;
      const containerWidth = container.offsetWidth;

      // Center the tab inside the horizontal container without affecting window scroll
      const targetScrollLeft = tabLeft - containerWidth / 2 + tabWidth / 2;
      container.scrollTo({
        left: targetScrollLeft,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }
  }, [selectedIndex, reduceMotion]);

  // Handle manual tab selection: immediately switches and resets progress
  const handleSelectTab = (index: number) => {
    setSelectedIndex(index);
    setProgress(0);
  };

  // Keyboard accessibility for tablist
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (index + 1) % materials.length;
      handleSelectTab(nextIndex);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (index - 1 + materials.length) % materials.length;
      handleSelectTab(prevIndex);
    }
  };

  return (
    <section
      id="materials"
      className="bg-secondary py-14 text-foreground md:py-20 lg:py-24 border-b border-border scroll-mt-20"
    >
      <div className="container-page">
        {/* Section Header */}
        <div className="flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="size-2 bg-highlight-strong" />
              <span className="eyebrow text-highlight-strong">Construction Materials</span>
            </div>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
              Civil building materials.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
              Direct site supply coordination for foundational materials across Walajabad and
              Kanchipuram, delivered directly to your construction site.
            </p>
          </div>
        </div>

        {/* MOBILE HORIZONTAL TABS (Screen width < 768px) */}
        <div className="mt-6 md:hidden">
          <p className="mb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
            Select material:
          </p>
          <div
            ref={mobileTabContainerRef}
            role="tablist"
            aria-label="Construction Materials Strip"
            className="flex gap-2 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-4 px-4 scroll-smooth"
          >
            {materials.map((item, index) => {
              const isActive = selectedIndex === index;
              return (
                <button
                  key={item.id}
                  ref={isActive ? activeTabRef : null}
                  role="tab"
                  id={`tab-mobile-${item.id}`}
                  aria-controls={`panel-${item.id}`}
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => handleSelectTab(index)}
                  className={`flex shrink-0 min-h-11 items-center gap-2 border px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? "border-highlight-strong bg-background text-foreground shadow-xs ring-1 ring-highlight-strong"
                      : "border-border bg-card/60 text-muted-foreground hover:bg-card hover:text-foreground"
                  }`}
                >
                  <span className="font-mono text-[10px] text-highlight-strong">{item.number}</span>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN DESKTOP / TABLET TWO-COLUMN LAYOUT */}
        <div className="mt-8 grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 lg:items-center">
          {/* LEFT: VERTICAL TAB SELECTOR (Tablet, Laptop, Desktop) */}
          <div className="hidden md:block">
            <div className="pb-3 flex items-center justify-between border-b border-border">
              <span className="eyebrow text-muted-foreground">Material Checklist</span>
            </div>

            <div
              role="tablist"
              aria-label="Construction Materials Explorer"
              className="divide-y divide-border border-b border-border"
            >
              {materials.map((item, index) => {
                const isActive = selectedIndex === index;

                return (
                  <button
                    key={item.id}
                    role="tab"
                    id={`tab-${item.id}`}
                    aria-controls={`panel-${item.id}`}
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => handleSelectTab(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`group relative flex w-full flex-col py-3.5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      isActive ? "bg-background/80 px-4" : "hover:bg-background/40 px-2"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono text-xs font-bold ${
                            isActive ? "text-highlight-strong" : "text-muted-foreground"
                          }`}
                        >
                          {item.number}
                        </span>
                        <div>
                          <p
                            className={`text-sm font-bold uppercase tracking-wide transition-colors ${
                              isActive
                                ? "text-foreground"
                                : "text-muted-foreground group-hover:text-foreground"
                            }`}
                          >
                            {item.name}
                          </p>
                          <p className="text-[11px] font-mono text-muted-foreground">
                            {item.tagline}
                          </p>
                        </div>
                      </div>
                      {/* 
                      <span
                        className={`text-[11px] font-mono ${
                          isActive ? "text-highlight-strong font-bold" : "text-muted-foreground/60"
                        }`}
                      >
                        {isActive ? "Viewing" : ""}
                      </span> */}
                    </div>

                    {/* Progress line under active tab */}
                    {isActive && !reduceMotion && (
                      <div className="mt-2.5 h-0.5 w-full bg-border overflow-hidden">
                        <div
                          className="h-full bg-highlight-strong transition-all duration-75 ease-linear"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6">
              <Button onClick={onSelectMaterials} variant="primary" size="default">
                <span>Discuss material supply</span>
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          {/* RIGHT: ACTIVE MATERIAL SHOWCASE CARD */}
          <div
            id={`panel-${activeMaterial.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeMaterial.id}`}
            className="relative overflow-hidden border border-border bg-card p-5 md:p-7 shadow-sm"
          >
            {/* Image Container with Smooth Crossfade */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-primary">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeMaterial.id}
                  src={activeMaterial.image}
                  alt={`Civil construction material: ${activeMaterial.name}`}
                  width={1536}
                  height={960}
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="size-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-image-fade" />
            </div>

            {/* Material Text Information */}
            <div className="mt-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMaterial.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-highlight-strong">
                    <span>{activeMaterial.tagline}</span>
                  </div>

                  <h3 className="mt-1 text-xl font-bold tracking-tight text-foreground md:text-2xl">
                    {activeMaterial.name}
                  </h3>

                  <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground md:text-sm">
                    {activeMaterial.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile Action Button */}
            <div className="mt-6 md:hidden">
              <Button onClick={onSelectMaterials} variant="primary" className="w-full">
                <span>Discuss material supply</span>
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
