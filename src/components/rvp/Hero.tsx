import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "./WhatsAppIcon";
import heroImage from "@/assets/rvp-hero.jpg";
import { siteConfig } from "@/data/siteConfig";

interface HeroProps {
  onStartProject: () => void;
  shouldLoadVideo?: boolean;
}

export function Hero({ onStartProject, shouldLoadVideo = true }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    if (reduceMotion || !shouldLoadVideo) {
      if (reduceMotion) setVideoFailed(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setVideoReady(true);
        })
        .catch(() => {
          setVideoFailed(true);
        });
    }
  }, [reduceMotion, shouldLoadVideo]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-primary text-primary-foreground">
      {/* Background Poster Image (always rendered beneath for instant display & fallback) */}
      <img
        src={heroImage}
        alt="RVP Anna Construction site execution in Kanchipuram"
        width={1920}
        height={1152}
        fetchPriority="high"
        loading="eager"
        className="absolute inset-0 size-full object-cover"
      />

      {/* Construction Video Hero (only loaded after loader to protect mobile bandwidth) */}
      {!reduceMotion && !videoFailed && shouldLoadVideo && (
        <video
          ref={videoRef}
          src="/site-construction.mp4"
          poster={heroImage}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
      )}

      {/* Dark navy overlay for optimal contrast and WCAG AA readability */}
      <div className="absolute inset-0 bg-hero-overlay" />

      {/* Hero Content */}
      <div className="container-page relative flex min-h-[100svh] flex-col justify-end pb-16 pt-28 md:pb-20">
        <div className="max-w-4xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <span className="size-2 bg-highlight" />
            <p className="eyebrow text-highlight font-mono">
              RVP Anna Construction &amp; Transport · Walajabad &amp; Kanchipuram
            </p>
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-4 text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-primary-foreground"
          >
            Build with clarity.
            <br />
            <span className="text-highlight">Move</span> with confidence.
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/85 md:text-lg"
          >
            Civil engineering construction planning, structural execution, building materials, and
            site transport for residential and commercial projects in Walajabad, Kanchipuram, and
            surrounding areas.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3 pt-2"
          >
            <Button variant="gold" size="lg" onClick={onStartProject}>
              Start a project <ArrowRight className="size-4" />
            </Button>

            <Button asChild variant="outline" size="lg">
              <a href={`tel:${siteConfig.phoneRaw}`}>
                <Phone className="size-4" /> Call RVP Anna
              </a>
            </Button>
          </motion.div>
        </div>

        <a
          href="#services"
          className="absolute bottom-6 right-6 hidden items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-primary-foreground/75 transition-colors hover:text-highlight md:flex"
        >
          Explore Services <ArrowDown className="size-4" />
        </a>
      </div>
    </section>
  );
}
