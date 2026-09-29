import { useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { Loader } from "./Loader";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { RequirementSelector } from "./RequirementSelector";
import { BuildMoveSection } from "./BuildMoveSection";
import { ServicesExplorer } from "./ServicesExplorer";
import { WorkShowcase } from "./WorkShowcase";
import { MaterialsSection } from "./MaterialsSection";
import { EnquiryFlow } from "./EnquiryFlow";
import { LocationSection } from "./LocationSection";
import { FinalCTA } from "./FinalCTA";
import { Footer } from "./Footer";
import { scrollToSection } from "@/lib/navigation";

export function RvpPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState("");
  const reduceMotion = useReducedMotion();
  const [showLoader, setShowLoader] = useState(!reduceMotion);

  const handleStartEnquiry = (requirement = "") => {
    setMenuOpen(false);
    document.body.style.overflow = "";
    if (requirement) {
      setSelectedNeed(requirement);
    }
    scrollToSection("enquire", { reduceMotion: Boolean(reduceMotion) });
  };

  return (
    <>
      <AnimatePresence>
        {showLoader && <Loader onComplete={() => setShowLoader(false)} />}
      </AnimatePresence>

      <Header open={menuOpen} setOpen={setMenuOpen} onEnquire={() => handleStartEnquiry()} />

      <main id="top" className="min-w-0">
        <Hero onStartProject={() => handleStartEnquiry()} shouldLoadVideo={!showLoader} />
        <RequirementSelector onSelectRequirement={handleStartEnquiry} />
        <BuildMoveSection />
        <ServicesExplorer onSelectService={handleStartEnquiry} />
        <WorkShowcase onSelectProject={(title) => handleStartEnquiry(title)} />
        <MaterialsSection onSelectMaterials={() => handleStartEnquiry("Materials")} />
        {/* Enquiry Section */}
        <section
          id="enquire"
          className="bg-primary-soft py-14 md:py-20 lg:py-24 border-b border-background/15 scroll-mt-20"
        >
          <div className="container-page">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="size-2 bg-highlight" />
                  <p className="eyebrow text-highlight">Start an Enquiry</p>
                </div>
                <h2 className="mt-3 text-2xl font-extrabold text-primary-foreground sm:text-3xl md:text-4xl lg:text-5xl">
                  Tell us what you're planning.
                </h2>
              </div>
              <p className="max-w-md text-xs md:text-sm text-primary-foreground/75 leading-relaxed">
                Direct consultation with Civil Engineer P Arunachalam for projects in Walajabad and
                Kanchipuram.
              </p>
            </div>
            <EnquiryFlow initialNeed={selectedNeed} onNeedChange={setSelectedNeed} />
          </div>
        </section>

        <LocationSection />
        <FinalCTA onStartProject={() => handleStartEnquiry()} />
      </main>

      <Footer />
    </>
  );
}
