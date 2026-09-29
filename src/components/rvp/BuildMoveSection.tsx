import { Building2, Truck } from "lucide-react";
import transportImage from "@/assets/rvp-transport.jpg";
import { SlideInLeft, SlideInRight } from "./Motion";

export function BuildMoveSection() {
  return (
    <section
      id="capabilities"
      className="grid lg:grid-cols-2 border-b border-border overflow-hidden scroll-mt-20"
    >
      {/* BUILD SIDE (Slide in from Left) */}
      <div className="flex min-h-[420px] flex-col justify-between bg-primary p-8 text-primary-foreground md:p-12 lg:min-h-[480px]">
        <SlideInLeft>
          <div className="flex items-center justify-between border-b border-background/15 pb-4">
            <div className="flex items-center gap-2">
              <span className="size-2 bg-highlight" />
              <span className="eyebrow text-highlight">Civil Construction</span>
            </div>
            <Building2 className="size-5 text-highlight" aria-hidden="true" />
          </div>

          <div className="my-auto py-8">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl text-primary-foreground">
              Build.
            </h2>
            <div className="mt-3 h-0.5 w-12 bg-highlight" />
            <p className="mt-5 max-w-md text-sm md:text-base leading-relaxed text-primary-foreground/80">
              From architectural drawings to reinforced concrete structures, brick masonry, and
              plastering — every phase is planned and executed with continuous civil engineering
              supervision.
            </p>
          </div>
        </SlideInLeft>
      </div>

      {/* MOVE SIDE (Slide in from Right) */}
      <div className="relative flex min-h-[420px] flex-col justify-between overflow-hidden p-8 text-primary-foreground md:p-12 lg:min-h-[480px]">
        <img
          src={transportImage}
          alt="Site logistics and material transport in Kanchipuram"
          width={1536}
          height={1024}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80 backdrop-blur-[1px]" />

        <SlideInRight className="relative z-10 flex size-full flex-col justify-between">
          <div className="flex items-center justify-between border-b border-background/15 pb-4">
            <div className="flex items-center gap-2">
              <span className="size-2 bg-highlight" />
              <span className="eyebrow text-highlight">Site Logistics</span>
            </div>
            <Truck className="size-5 text-highlight" aria-hidden="true" />
          </div>

          <div className="my-auto py-8">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl text-primary-foreground">
              Move.
            </h2>
            <div className="mt-3 h-0.5 w-12 bg-highlight" />
            <p className="mt-5 max-w-md text-sm md:text-base leading-relaxed text-primary-foreground/80">
              Transport is an essential part of keeping a construction site productive. Dedicated
              vehicle support ensures steel, cement, Jelly, and sand reach the site on schedule.
            </p>
          </div>
        </SlideInRight>
      </div>
    </section>
  );
}
