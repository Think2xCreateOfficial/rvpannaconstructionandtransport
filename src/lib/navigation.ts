/**
 * Safe navigation and scroll helper that respects reduced-motion preferences,
 * releases any body-scroll lock, offsets for fixed header, and handles
 * missing target elements gracefully without throwing.
 */
export function scrollToSection(
  targetId: string,
  options: { reduceMotion?: boolean; offset?: number } = {},
): void {
  if (typeof window === "undefined") return;

  // Release any lingering body scroll lock immediately
  document.body.style.overflow = "";

  const cleanId = targetId.startsWith("#") ? targetId.slice(1) : targetId;
  const element = document.getElementById(cleanId) || document.querySelector(targetId);

  if (!element) return;

  // Default header offset (76px) accounts for the fixed header height and air gap
  const offset = options.offset ?? 76;
  const elementTop = element.getBoundingClientRect().top + window.scrollY;
  const targetY = Math.max(0, elementTop - offset);

  window.scrollTo({
    top: targetY,
    behavior: options.reduceMotion ? "auto" : "smooth",
  });

  try {
    if (window.history?.pushState) {
      window.history.pushState(null, "", `#${cleanId}`);
    }
  } catch {
    // Ignore history pushState failures in sandbox
  }
}
