import { ShieldCheck, UserCheck, HardHat, Phone, MapPin, Compass } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Button } from "@/components/ui/button";

interface TrustProprietorSectionProps {
  onStartProject: () => void;
}

export function TrustProprietorSection({ onStartProject }: TrustProprietorSectionProps) {
  return (
    <section
      id="proprietor"
      className="bg-primary py-14 text-primary-foreground md:py-20 lg:py-24 border-b border-background/15"
    >
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:items-center">
          {/* Left Column: Civil Engineering & Leadership */}
          <div>
            <div className="flex items-center gap-2">
              <span className="size-2 bg-highlight" />
              <span className="eyebrow text-highlight">Civil Engineering Leadership</span>
            </div>

            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-primary-foreground sm:text-3xl md:text-4xl lg:text-5xl">
              Direct engineering guidance on every project.
            </h2>

            <div className="mt-4 h-0.5 w-12 bg-highlight" />

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-primary-foreground/80 md:text-base">
              <p>
                RVP Anna Construction &amp; Transport is led by <strong>P Arunachalam</strong>, a
                qualified Civil Engineer and Proprietor based in Ganapathipuram Avalur, Walajabad.
              </p>
              <p>
                Unlike layered contracting setups where homeowners deal with intermediaries, you
                discuss your site directly with the engineer overseeing the planning, material
                procurement, labour deployment, and site logistics.
              </p>
            </div>

            {/* Factual Trust Pillars */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="border border-background/20 bg-primary-soft p-4">
                <div className="flex items-center gap-2 text-highlight font-mono text-xs font-bold uppercase">
                  <HardHat className="size-4" />
                  <span>Site-Led Engineering</span>
                </div>
                <p className="mt-2 text-xs text-primary-foreground/75 leading-relaxed">
                  Structural column alignment, steel layout, concrete mix proportions, and curing
                  reviewed on-site.
                </p>
              </div>

              <div className="border border-background/20 bg-primary-soft p-4">
                <div className="flex items-center gap-2 text-highlight font-mono text-xs font-bold uppercase">
                  <Compass className="size-4" />
                  <span>Integrated Build &amp; Move</span>
                </div>
                <p className="mt-2 text-xs text-primary-foreground/75 leading-relaxed">
                  Material supply and transport logistics managed directly so construction does not
                  face delivery bottlenecks.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Proprietor Profile Card */}
          <div className="border border-background/20 bg-primary-soft p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-background/15 pb-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-highlight">
                  Proprietor &amp; Lead Engineer
                </span>
                <h3 className="mt-1 text-2xl font-extrabold text-primary-foreground">
                  {siteConfig.proprietor}
                </h3>
                <p className="text-xs font-mono text-primary-foreground/70">
                  {siteConfig.professionalTitle}
                </p>
              </div>
              <div className="flex size-12 items-center justify-center border border-highlight/40 bg-highlight/15 text-highlight">
                <UserCheck className="size-6" />
              </div>
            </div>

            <div className="mt-6 space-y-3.5 text-xs text-primary-foreground/80">
              <div className="flex items-start gap-3">
                <MapPin className="size-4 shrink-0 text-highlight mt-0.5" />
                <span>
                  Ganapathipuram Avalur (Pt), Walajabad (Tk), Kanchipuram District, Tamil Nadu
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-highlight" />
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="font-mono font-bold text-highlight hover:underline"
                >
                  {siteConfig.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="size-4 shrink-0 text-highlight" />
                <span>Direct proprietor consultation &amp; on-site inspection</span>
              </div>
            </div>

            <div className="mt-8 border-t border-background/15 pt-5 flex flex-wrap gap-3">
              <Button
                onClick={onStartProject}
                variant="gold"
                size="sm"
                className="w-full sm:w-auto"
              >
                Discuss with Engineer
              </Button>
              <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
                <a href={`tel:${siteConfig.phoneRaw}`}>Call Directly</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
