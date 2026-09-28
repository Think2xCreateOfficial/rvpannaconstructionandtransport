import { Phone, MapPin, ArrowUpRight } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { siteConfig } from "@/data/siteConfig";
import { getDirectWhatsAppUrl } from "@/lib/whatsapp";

const FOOTER_NAV = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Civil Gallery", href: "#work" },
  { label: "Materials", href: "#materials" },
  { label: "Approach", href: "#approach" },
  { label: "Location", href: "#contact" },
  { label: "Start an Enquiry", href: "#enquire" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = getDirectWhatsAppUrl();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="bg-primary text-primary-foreground border-t border-background/15 pt-14 pb-16 md:pb-12">
      <div className="container-page">
        {/* Main Columns Grid */}
        <div className="grid gap-10 border-b border-background/15 pb-12 lg:grid-cols-12">
          {/* Column 1: Brand & Identity (span 5) */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <BrandMark inverse />
              <p className="mt-5 max-w-sm text-xs md:text-sm leading-relaxed text-primary-foreground/75">
                Civil construction execution, architectural planning, building material supply,
                skilled labour coordination, and dedicated site transport in Walajabad and
                Kanchipuram.
              </p>
            </div>
          </div>

          {/* Column 2: Navigation Links (span 3) */}
          <div className="lg:col-span-3">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-highlight">
              Quick Navigation
            </p>
            <nav className="mt-4 flex flex-col space-y-2.5" aria-label="Footer main navigation">
              {FOOTER_NAV.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs text-primary-foreground/80 transition-colors hover:text-highlight focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Direct Contact (span 4) */}
          <div className="lg:col-span-4">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-highlight">
              Direct Contact
            </p>

            <div className="mt-4 space-y-3.5">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="group flex items-center gap-3 text-xs font-bold text-primary-foreground transition-colors hover:text-highlight focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <div className="flex size-8 items-center justify-center border border-background/20 bg-primary-soft text-highlight group-hover:border-highlight group-hover:bg-highlight group-hover:text-highlight-foreground transition-colors">
                  <Phone className="size-3.5" />
                </div>
                <div>
                  <span className="block text-[9px] font-mono uppercase text-primary-foreground/50">
                    Phone Consultation
                  </span>
                  <span className="font-mono text-xs">{siteConfig.phone}</span>
                </div>
              </a>

              <a
                href={siteConfig.whatsappUrl}
                onClick={handleWhatsAppClick}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-xs font-bold text-primary-foreground transition-colors hover:text-highlight focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
              >
                <div className="flex size-8 items-center justify-center border border-background/20 bg-primary-soft text-[#25D366] group-hover:border-highlight group-hover:bg-highlight group-hover:text-highlight-foreground transition-colors">
                  <WhatsAppIcon className="size-3.5" />
                </div>
                <div>
                  <span className="block text-[9px] font-mono uppercase text-primary-foreground/50">
                    WhatsApp Chat
                  </span>
                  <span className="font-mono text-xs">{siteConfig.phone}</span>
                </div>
              </a>

              <div className="flex items-start gap-3 text-xs leading-relaxed text-primary-foreground/75 pt-1">
                <MapPin className="size-4 shrink-0 text-highlight mt-0.5" />
                <address className="not-italic font-mono text-[11px]">
                  {siteConfig.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-xs text-primary-foreground/60 sm:flex-row">
          <p>© {currentYear} RVP Anna Construction &amp; Transport. All rights reserved.</p>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <a
              href="#top"
              className="flex items-center gap-1 text-highlight transition-colors hover:text-primary-foreground"
            >
              Back to top <ArrowUpRight className="size-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
