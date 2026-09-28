import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "./BrandMark";
import { scrollToSection } from "@/lib/navigation";

interface HeaderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onEnquire: () => void;
}

const NAV_ITEMS = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#work" },
  { label: "Materials", href: "#materials" },
  { label: "Contact", href: "#contact" },
];

export function Header({ open, setOpen, onEnquire }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open, and cleanly restore on close or unmount
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Keyboard accessibility: Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpen]);

  const handleStartProject = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (open) {
      setOpen(false);
    }
    document.body.style.overflow = "";
    requestAnimationFrame(() => {
      setTimeout(() => {
        onEnquire();
      }, 50);
    });
  };

  const isLightNav = scrolled || open;

  return (
    <header
      className={`fixed z-50 transition-all duration-300 ${
        isLightNav
          ? "inset-x-0 top-0 rounded-none border-b border-border/80 bg-background/95 text-foreground shadow-sm backdrop-blur-md"
          : "inset-x-2 top-2 rounded-lg border border-background/15 bg-primary/40 text-primary-foreground shadow-sm backdrop-blur-md md:inset-x-4 md:top-3"
      }`}
    >
      <div className="container-page flex h-16 md:h-18 items-center justify-between gap-4">
        <BrandMark inverse={!isLightNav} />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isLightNav
                  ? "text-foreground/80 hover:text-highlight-strong"
                  : "text-primary-foreground/80 hover:text-highlight"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Right Action Area */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Start a project CTA */}
          <Button size="sm" variant={isLightNav ? "gold" : "primary"} onClick={handleStartProject}>
            Start a project
          </Button>
        </div>

        {/* Mobile Header Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border/80 bg-background/98 backdrop-blur-lg text-foreground lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="container-page grid py-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    document.body.style.overflow = "";
                    requestAnimationFrame(() => {
                      setTimeout(() => {
                        scrollToSection(item.href);
                      }, 50);
                    });
                  }}
                  className="border-b border-border/60 py-3.5 text-sm font-bold uppercase tracking-wider transition-colors hover:text-highlight-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </a>
              ))}

              {/* Direct Start a Project in Mobile Menu */}
              <div className="mt-4 flex flex-col gap-2.5 pt-2">
                <Button
                  variant="gold"
                  className="mt-2 w-full"
                  onClick={handleStartProject}
                >
                  Start a project
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
