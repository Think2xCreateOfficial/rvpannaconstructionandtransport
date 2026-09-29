import { ArrowRight } from "lucide-react";
import { REQUIREMENT_SELECTOR_OPTIONS } from "@/data/enquiryOptions";

interface RequirementSelectorProps {
  onSelectRequirement: (requirement: string) => void;
}

export function RequirementSelector({ onSelectRequirement }: RequirementSelectorProps) {
  return (
    <section id="planning" className="bg-background py-12 md:py-16 border-b border-border">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div>
            <div className="flex items-center gap-2">
              <span className="size-2 bg-highlight-strong" />
              <p className="eyebrow text-muted-foreground">Start with your need</p>
            </div>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              What are you planning?
            </h2>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Select what you need below to tell us about your project.
            </p>
          </div>

          <div className="border-t border-border">
            {REQUIREMENT_SELECTOR_OPTIONS.map((item) => (
              <button
                key={item.number}
                type="button"
                onClick={() => onSelectRequirement(item.requirementValue)}
                className="group grid min-h-16 w-full grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-border py-3 text-left transition-colors hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="font-mono text-xs font-bold text-highlight-strong">
                  {item.number}
                </span>
                <span className="text-base font-bold text-foreground transition-transform group-hover:translate-x-1.5 md:text-lg">
                  {item.label}
                </span>
                <ArrowRight className="size-4 text-highlight-strong transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
