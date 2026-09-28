import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Phone, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { ENQUIRY_REQUIREMENTS, PROJECT_TYPES } from "@/data/enquiryOptions";
import { siteConfig } from "@/data/siteConfig";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { isStepValid } from "@/lib/validation";

interface EnquiryFlowProps {
  initialNeed: string;
  onNeedChange: (need: string) => void;
}

export function EnquiryFlow({ initialNeed, onNeedChange }: EnquiryFlowProps) {
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [location, setLocation] = useState("");
  const [projectType, setProjectType] = useState("");
  const [area, setArea] = useState("");
  const [message, setMessage] = useState("");

  const state = {
    requirement: initialNeed,
    location,
    projectType,
    areaOrRequirement: area,
    additionalMessage: message,
  };

  const canContinue = isStepValid(step, state);

  const whatsappUrl = buildWhatsAppUrl({
    requirement: initialNeed,
    location,
    projectType,
    areaOrRequirement: area,
    additionalMessage: message,
  });

  const handleNext = () => {
    if (!canContinue) return;
    if (step < 4) {
      setStep((prev) => (prev + 1) as 0 | 1 | 2 | 3 | 4);
    }
  };

  const handleSkip = () => {
    if (step < 4) {
      setStep((prev) => (prev + 1) as 0 | 1 | 2 | 3 | 4);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => (prev - 1) as 0 | 1 | 2 | 3 | 4);
    }
  };

  return (
    <div className="grid overflow-hidden border border-background/20 lg:grid-cols-[0.65fr_1.35fr]">
      {/* Step progress sidebar */}
      <div className="flex flex-col justify-between border-b border-background/15 bg-highlight p-6 text-highlight-foreground lg:border-b-0 lg:border-r lg:p-8">
        <div>
          <p className="eyebrow">Direct Site Enquiry</p>
          <p className="mt-4 max-w-sm text-xl font-bold leading-tight md:text-2xl">
            A few details help us give a clear response.
          </p>
        </div>

        <div className="mt-8">
          <div className="h-1 bg-highlight-foreground/25 overflow-hidden">
            <div
              className="h-full bg-highlight-foreground transition-all duration-300"
              style={{ width: `${((step + 1) / 5) * 100}%` }}
            />
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider">
            <span>Step {step + 1} of 5</span>
            {initialNeed && (
              <span className="truncate max-w-[140px] opacity-80">{initialNeed}</span>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Step Container */}
      <div className="flex min-h-[440px] flex-col justify-between bg-primary p-6 text-primary-foreground md:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            {step === 0 && (
              <div>
                <p className="eyebrow text-highlight">Step 1 / 5</p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl text-primary-foreground">
                  What do you need?
                </h3>
                <p className="mt-2 text-xs text-primary-foreground/75 md:text-sm">
                  Select your primary requirement
                </p>
                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  {ENQUIRY_REQUIREMENTS.map((item) => {
                    const isSelected = initialNeed === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => onNeedChange(item)}
                        className={`min-h-14 border px-4 text-left text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight ${
                          isSelected
                            ? "border-highlight bg-highlight text-highlight-foreground"
                            : "border-background/25 bg-primary-soft text-background hover:bg-background/10"
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          {item}
                          {isSelected && <Check className="size-4" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 1 && (
              <Field
                label="Step 2 / 5"
                title="Where is the project site?"
                hint="Town, village, or nearby landmark in Kanchipuram district"
              >
                <input
                  type="text"
                  autoFocus
                  maxLength={120}
                  aria-label="Project location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && canContinue) handleNext();
                  }}
                  placeholder="For example: Walajabad, near bus stand"
                  className="field"
                />
              </Field>
            )}

            {step === 2 && (
              <Field
                label="Step 3 / 5"
                title="What are you building?"
                hint="Select the building category"
              >
                <div className="grid gap-2 sm:grid-cols-3">
                  {PROJECT_TYPES.map((item) => {
                    const isSelected = projectType === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setProjectType(item)}
                        className={`min-h-12 border px-4 text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight ${
                          isSelected
                            ? "border-highlight bg-highlight text-highlight-foreground"
                            : "border-background/30 text-background hover:bg-background/10"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </Field>
            )}

            {step === 3 && (
              <Field
                label="Step 4 / 5"
                title="Approximate area or load"
                hint="Optional: estimated square feet, number of floors, or material quantity"
              >
                <input
                  type="text"
                  maxLength={120}
                  aria-label="Approximate area or requirement"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleNext();
                  }}
                  placeholder="For example: Approx. 1,500 sq.ft / G+1 floor"
                  className="field"
                />
              </Field>
            )}

            {step === 4 && (
              <Field
                label="Step 5 / 5"
                title="Any specific notes for the engineer?"
                hint="Optional: notes regarding timeline, specific materials, or labour requirements"
              >
                <textarea
                  maxLength={800}
                  aria-label="Additional message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add any specific details here..."
                  rows={4}
                  className="field resize-none"
                />
              </Field>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Action button bar */}
        <div className="mt-8 flex flex-wrap items-center gap-2.5 border-t border-background/15 pt-5">
          {step > 0 && (
            <Button variant="outline" size="sm" onClick={handleBack}>
              <ArrowLeft className="size-3.5" /> Back
            </Button>
          )}

          {step < 4 ? (
            <>
              <Button variant="gold" size="sm" disabled={!canContinue} onClick={handleNext}>
                Continue <ArrowRight className="size-3.5" />
              </Button>
              {(step === 3 || step === 4) && (
                <Button variant="ghost" size="sm" onClick={handleSkip}>
                  Skip <SkipForward className="size-3.5" />
                </Button>
              )}
            </>
          ) : (
            <Button asChild variant="gold" size="sm">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-4" /> Send on WhatsApp
              </a>
            </Button>
          )}

          {step === 4 && (
            <Button asChild variant="outline" size="sm">
              <a href={`tel:${siteConfig.phoneRaw}`}>
                <Phone className="size-3.5" /> Call instead
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  title,
  hint,
  children,
}: {
  label: string;
  title: string;
  hint: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow text-highlight">{label}</p>
      <h3 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl text-primary-foreground">
        {title}
      </h3>
      <p className="mt-1.5 text-xs text-primary-foreground/75 md:text-sm">{hint}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}
