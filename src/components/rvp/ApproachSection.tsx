import { CheckCircle2 } from "lucide-react";
import { approachSteps } from "@/data/approach";
import { StaggerHorizontalContainer, StaggerHorizontalItem } from "./Motion";

export function ApproachSection() {
  return (
    <section
      id="approach"
      className="bg-background py-14 md:py-20 lg:py-24 border-b border-border overflow-hidden"
    >
      <div className="container-page">
        {/* Section Header */}
        <div className="flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="size-2 bg-highlight-strong" />
              <span className="eyebrow text-highlight-strong">Our Method</span>
            </div>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
              How the work happens.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
              A structured 5-step construction process designed to eliminate confusion, manage
              material staging, and keep you informed from soil check to key handover.
            </p>
          </div>
        </div>

        {/* Timeline Grid: Staggered horizontal entrance */}
        <StaggerHorizontalContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {approachSteps.map((step, index) => (
            <StaggerHorizontalItem key={step.number} direction="up" className="flex">
              <div className="relative flex w-full flex-col justify-between border border-border bg-card p-5 transition-all hover:border-highlight-strong/80 hover:shadow-xs">
                <div>
                  {/* Step Number & Connector */}
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="font-mono text-xs font-bold text-highlight-strong bg-secondary px-2 py-0.5 border border-border">
                      {step.number}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-muted-foreground">
                      Step {index + 1} of 5
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground">
                    {step.title}
                  </h3>

                  <p className="mt-0.5 text-xs font-mono font-medium text-highlight-strong">
                    {step.subtitle}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1 text-[11px] font-mono text-muted-foreground border-t border-border pt-3">
                  <CheckCircle2 className="size-3.5 text-highlight-strong" />
                  <span>Civil Verified</span>
                </div>
              </div>
            </StaggerHorizontalItem>
          ))}
        </StaggerHorizontalContainer>
      </div>
    </section>
  );
}
