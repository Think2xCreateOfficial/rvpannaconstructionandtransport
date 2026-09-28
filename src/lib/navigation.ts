/**
 * Safe navigation and scroll helper that respects reduced-motion preferences
 * and handles missing target elements gracefully without throwing.
 */
export function scrollToSection(
  targetId: string,
  options: { reduceMotion?: boolean; offset?: number } = {},
): void {
  if (typeof window === "undefined") return;

  const cleanId = targetId.startsWith("#") ? targetId.slice(1) : targetId;
  const element = document.getElementById(cleanId);

  if (!element) {
    // Fallback: try querySelector if element by ID is missing
    const queried = document.querySelector(targetId);
    if (queried) {
      queried.scrollIntoView({
        behavior: options.reduceMotion ? "auto" : "smooth",
      });
    }
    return;
  }

  element.scrollIntoView({
    behavior: options.reduceMotion ? "auto" : "smooth",
    block: "start",
  });
}
