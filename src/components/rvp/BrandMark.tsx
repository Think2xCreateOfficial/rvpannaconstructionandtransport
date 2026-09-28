import { useState } from "react";
import { siteConfig } from "@/data/siteConfig";

interface BrandMarkProps {
  inverse?: boolean;
}

export function BrandMark({ inverse = false }: BrandMarkProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <a
      href="#top"
      className="flex min-w-0 items-center gap-3 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`${siteConfig.name} - Back to top`}
    >
      {!imageError ? (
        <img
          src={inverse ? "/rvp-anna-logo-light.png" : "/rvp-anna-logo.png"}
          alt="RVP Anna Construction & Transport"
          width={1522}
          height={984}
          className="h-12 w-auto max-w-[170px] select-none object-contain md:h-16 md:max-w-[210px]"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex items-center gap-2.5">
          <img
            src="/rvp-anna-emblem.png"
            alt=""
            width={1510}
            height={669}
            className="h-8 w-auto object-contain md:h-9"
          />
          <div className="leading-none">
            <span
              className={`block text-base font-extrabold tracking-tight ${
                inverse ? "text-background" : "text-foreground"
              }`}
            >
              {siteConfig.shortName}
            </span>
            <span
              className={`mt-0.5 block truncate text-[9px] font-bold uppercase tracking-wider ${
                inverse ? "text-background/70" : "text-muted-foreground"
              }`}
            >
              Construction &amp; Transport
            </span>
          </div>
        </div>
      )}
    </a>
  );
}
