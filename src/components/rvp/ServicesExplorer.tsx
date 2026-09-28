import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";

/** Base z-index for the first card. Each successive card increments by 1. */
const BASE_Z_INDEX = 10;

interface ServicesExplorerProps {
  onSelectService: (serviceName: string) => void;
}

export function ServicesExplorer({ onSelectService }: ServicesExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const isScrollingByClick = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * IntersectionObserver tracks which card is currently active in the viewport
   * to highlight the corresponding step in the left navigation.
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        if (isScrollingByClick.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(
              entry.target as HTMLElement,
            );
            if (idx !== -1) {
              setActiveIndex(idx);
            }
          }
        });
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: 0,
      },
    );

    cardRefs.current.forEach((el) => {
      if (el) io.observe(el);
    });

    return () => {
      io.disconnect();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Click-based smooth navigation to a specific service card
  const handleNavClick = useCallback((index: number) => {
    setActiveIndex(index);
    isScrollingByClick.current = true;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    const target = cardRefs.current[index];
    if (target) {
      const topOffset =
        target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({
        top: Math.max(0, topOffset),
        behavior: "smooth",
      });
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingByClick.current = false;
    }, 750);
  }, []);

  return (
    <section
      id="services"
      className="services-section bg-background border-b border-border"
    >
      <div className="container-page">
        {/* Two-Column Responsive Layout (Convonite .features_content-wrap) */}
        <div className="services-layout">
          {/* ─── LEFT: Sticky Narrative Column (Desktop) ─── */}
          <div className="services-col-left">
            <div className="services-intro-inner">
              <div className="flex items-center gap-2">
                <span className="size-2 bg-highlight-strong" />
                <span className="eyebrow text-highlight-strong">
                  04 / Services
                </span>
                <span className="h-px w-8 bg-border" />
              </div>

              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
                What can RVP Anna help you build?
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base max-w-lg">
                From initial 2D &amp; 3D planning to material contracts, skilled
                civil labour, and dedicated site transport — each service is
                managed as a connected phase of your construction project.
              </p>

              {/* Service Navigation List (Desktop & Tablet) */}
              <nav
                className="mt-6 hidden space-y-2 border-l border-border pl-4 md:block"
                aria-label="Services index"
              >
                {services.map((service, index) => {
                  const isActive = activeIndex === index;
                  const isPassed = activeIndex > index;

                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleNavClick(index)}
                      className={`group relative flex w-full items-center gap-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring py-2 px-1 min-h-11 ${
                        isActive
                          ? "text-foreground font-bold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      aria-current={isActive ? "step" : undefined}
                    >
                      <span
                        className={`absolute -left-[21px] size-2 transition-all duration-300 ${
                          isActive
                            ? "bg-highlight-strong scale-125 ring-2 ring-highlight/40"
                            : isPassed
                              ? "bg-foreground/30"
                              : "bg-border"
                        }`}
                      />
                      <span className="font-mono text-xs font-bold text-highlight-strong">
                        {service.number}
                      </span>
                      <span className="text-xs uppercase tracking-wider transition-transform group-hover:translate-x-1">
                        {service.label}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* ─── RIGHT: Sticky Card Stack (Convonite .features_cards-stack) ─── */}
          <div className="services-col-right features_cards-stack" role="list">
            {services.map((service, index) => {
              const isActive = activeIndex === index;

              return (
                <article
                  key={service.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  id={`service-${service.id}`}
                  role="listitem"
                  className={`services-card features_card is-${index + 1} ${isActive ? "is-active" : ""}`}
                  style={{
                    position: "sticky",
                    top: "var(--services-sticky-top)",
                    zIndex: BASE_Z_INDEX + index,
                  }}
                >
                  {/* Card Header Bar */}
                  <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-2.5 sm:px-5 sm:py-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-highlight-strong bg-background px-2 py-0.5 border border-border">
                        {service.number}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                        {service.label}
                      </span>
                    </div>
                    {/* <span className="hidden sm:inline-block font-mono text-[11px] text-muted-foreground">
                      {service.scopeMeta.split("·")[0]}
                    </span> */}
                  </div>

                  {/* Construction Image */}
                  <div className="services-card-image-wrap">
                    <img
                      src={service.image}
                      alt={`RVP Anna Construction service: ${service.title}`}
                      width={1536}
                      height={864}
                      loading={index <= 1 ? "eager" : "lazy"}
                      className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-image-fade" />
                  </div>

                  {/* Card Content & Action */}
                  <div className="p-4 sm:p-5 md:p-6">
                    <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg md:text-xl">
                      {service.title}
                    </h3>

                    <div className="mt-2 h-0.5 w-10 bg-highlight" />

                    <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground md:text-sm">
                      {service.description}
                    </p>

                    <div className="mt-4 flex flex-col gap-3 border-t border-border/80 pt-3.5 sm:flex-row sm:items-center sm:justify-between">
                      <Button
                        variant={isActive ? "gold" : "primary"}
                        size="sm"
                        onClick={() => onSelectService(service.enquiryValue)}
                        className="w-full sm:w-auto shrink-0 min-h-11 sm:min-h-9"
                      >
                        <span>{service.ctaText}</span>
                        <ArrowRight className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
