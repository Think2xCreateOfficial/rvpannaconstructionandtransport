import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { siteConfig } from "@/data/siteConfig";
import { getDirectWhatsAppUrl } from "@/lib/whatsapp";

export function LocationSection() {
  const handleWhatsAppClick = () => {
    const url = getDirectWhatsAppUrl();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="bg-background py-14 md:py-20 lg:py-24 border-t border-border">
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-2 bg-highlight-strong" />
            <span className="eyebrow text-highlight-strong">Location &amp; Operations</span>
          </div>

          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Walajabad &amp; Kanchipuram District.
          </h2>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            Operating across Kanchipuram district with direct proprietor contact, on-site civil
            evaluations, and scheduled material transport to your site.
          </p>
        </div>

        <div className="border border-border bg-card p-6 md:p-8">
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold text-foreground">{siteConfig.shortName}</span>
          </div>
          <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-highlight-strong">
            Construction &amp; Transport
          </p>

          <div className="mt-6 flex items-start gap-3 text-muted-foreground text-sm">
            <MapPin className="size-5 shrink-0 text-highlight-strong mt-0.5" />
            <address className="not-italic leading-relaxed font-mono text-xs text-foreground">
              {siteConfig.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6">
            <Button asChild variant="primary" size="sm" className="min-h-11 sm:min-h-9">
              <a href={`tel:${siteConfig.phoneRaw}`}>
                <Phone className="size-3.5" /> Call {siteConfig.phone}
              </a>
            </Button>
            <Button
              type="button"
              variant="gold"
              size="sm"
              onClick={handleWhatsAppClick}
              className="min-h-11 sm:min-h-9"
            >
              <WhatsAppIcon className="size-4" /> WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
