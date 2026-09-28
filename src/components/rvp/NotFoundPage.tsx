import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "./BrandMark";
import { siteConfig } from "@/data/siteConfig";

export function NotFoundPage() {
  const [isClientMounted, setIsClientMounted] = useState(false);

  useEffect(() => {
    setIsClientMounted(true);
  }, []);

  return (
    <div className="flex min-h-[100svh] flex-col justify-between bg-primary text-primary-foreground">
      {/* Top Navigation Bar */}
      <header className="border-b border-background/15 py-4 sm:py-5">
        <div className="container-page flex items-center justify-between">
          <BrandMark inverse />
          <Button asChild variant="outline" size="sm" className="min-h-9">
            <a href={`tel:${siteConfig.phoneRaw}`}>
              <Phone className="size-3.5" />
              <span className="hidden sm:inline">Call</span> {siteConfig.phone}
            </a>
          </Button>
        </div>
      </header>

      {/* Main 404 Content */}
      <main className="container-page my-auto py-10 sm:py-14">
        <div className="mx-auto max-w-lg text-center">
          {/* Lottie Architectural Animation Frame */}
          <div className="mx-auto mb-4 h-36 sm:h-44 w-52 sm:w-60 flex items-center justify-center overflow-hidden">
            {isClientMounted && (
              <DotLottieReact
                src="/Under Maintenance.lottie"
                loop
                autoplay
                className="size-full object-contain"
              />
            )}
          </div>

          <div className="flex items-center justify-center gap-2">
            <p className="eyebrow text-highlight font-mono">404 · Unmapped Location</p>
          </div>

          <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl text-primary-foreground">
            Page Not Found
          </h1>

          <div className="mx-auto mt-3 h-0.5 w-12 bg-highlight" />

          {/* Action CTAs (Touch friendly, >=44px) */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild variant="gold" size="default" className="w-full sm:w-auto min-h-11">
              <Link to="/">
                <ArrowLeft className="size-4" /> Back Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="default" className="w-full sm:w-auto min-h-11">
              <a href="/#enquire">
                Start a Project <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </main>

      {/* Bottom Minimal Footer */}
      <footer className="border-t border-background/15 py-4 text-center text-xs text-primary-foreground/50">
        <p>
          © {new Date().getFullYear()} RVP Anna Construction &amp; Transport. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
