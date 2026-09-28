import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";
import { NotFoundPage } from "@/components/rvp/NotFoundPage";
import { siteConfig } from "@/data/siteConfig";
import appCss from "../styles.css?url";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  image: "https://rvpannabuilder.com/rvp-anna-logo.png",
  description:
    "Civil engineering construction execution, architectural 2D/3D planning, elevation design, building material supply, skilled labour coordination, and dedicated site transport services in Walajabad and Kanchipuram.",
  telephone: siteConfig.phoneRaw,
  founder: {
    "@type": "Person",
    name: siteConfig.proprietor,
    jobTitle: siteConfig.professionalTitle,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ganapathipuram Avalur (Pt), Walajabad (Tk)",
    addressLocality: "Kanchipuram",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  areaServed: ["Walajabad", "Kanchipuram", "Tamil Nadu"],
  url: "https://rvpannabuilder.com",
};

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error("Application Error Boundary caught error:", error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          Application Loading Notice
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          A temporary network or rendering state occurred. You can retry loading or return to the
          homepage.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-border bg-background px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-secondary"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: "RVP Anna Construction & Transport | Construction Services in Kanchipuram",
      },
      {
        name: "description",
        content:
          "Civil engineering construction, architectural 2D/3D planning, elevation design, building material supply, labour coordination, and site transport in Walajabad and Kanchipuram.",
      },
      { name: "author", content: "P Arunachalam · RVP Anna Construction & Transport" },
      { name: "theme-color", content: "#071A2B" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: siteConfig.name },
      {
        property: "og:title",
        content: "RVP Anna Construction & Transport | Construction & Civil Engineering",
      },
      {
        property: "og:description",
        content:
          "Build with clarity. Move with confidence. Civil construction, architectural planning, material coordination, labour, and transport in Kanchipuram.",
      },
      { property: "og:image", content: "/rvp-anna-logo.png" },
      { property: "og:url", content: "https://rvpannabuilder.com/" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "RVP Anna Construction & Transport",
      },
      {
        name: "twitter:description",
        content:
          "Construction planning, materials, labour, and transport services in Walajabad, Kanchipuram.",
      },
      { name: "twitter:image", content: "/rvp-anna-logo.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { rel: "alternate icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "canonical", href: "https://rvpannabuilder.com/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(structuredData),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
