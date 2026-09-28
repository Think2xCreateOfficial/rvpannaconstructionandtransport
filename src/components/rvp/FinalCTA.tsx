import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/siteConfig";
import { SlideInLeft, SlideInRight } from "./Motion";

interface FinalCTAProps {
  onStartProject: () => void;
}

export function FinalCTA({ onStartProject }: FinalCTAProps) {
  return (
    <section className="bg-highlight py-14 text-highlight-foreground md:py-20 lg:py-24 overflow-hidden">
      <div className="container-page">
        <SlideInLeft>
          <div className="flex items-center gap-2">
            <span className="size-2 bg-highlight-foreground" />
            <p className="eyebrow text-highlight-foreground/80">Next Step</p>
          </div>

          <h2 className="mt-4 max-w-3xl text-2xl font-extrabold tracking-tight md:text-4xl lg:text-5xl text-highlight-foreground">
            Planning a construction project?
            <br />
            Let's discuss what needs to happen next.
          </h2>

          <p className="mt-4 max-w-xl text-sm md:text-base text-highlight-foreground/85 leading-relaxed">
            Reach out directly to review your drawings, estimate material loads, or schedule an
            on-site discussion in Walajabad or Kanchipuram.
          </p>
        </SlideInLeft>

        <SlideInRight delay={0.15}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={onStartProject} variant="primary" size="lg" className="min-h-11">
              Start a project <ArrowRight className="size-4" />
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-highlight-foreground/40 hover:bg-highlight-foreground/10 text-highlight-foreground min-h-11"
            >
              <a href={`tel:${siteConfig.phoneRaw}`}>
                <Phone className="size-4" /> Call RVP Anna
              </a>
            </Button>
          </div>
        </SlideInRight>
      </div>
    </section>
  );
}
