import { siteConfig } from "@/data/siteConfig";

export interface EnquiryPayload {
  requirement: string;
  location: string;
  projectType: string;
  areaOrRequirement?: string;
  additionalMessage?: string;
}

/**
 * Returns a human-friendly formatted timestamp in the Asia/Kolkata timezone.
 * Example output: "28 Sep 2026, 11:30 AM IST"
 */
export function getFormattedKolkataTimestamp(date: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const formatted = formatter.format(date);
    // Ensure IST suffix is cleanly appended
    return `${formatted} IST`;
  } catch {
    // Fallback if Intl is unavailable or fails
    return `${date.toLocaleDateString("en-IN")} ${date.toLocaleTimeString("en-IN")}`;
  }
}

/**
 * Builds the direct WhatsApp message when a visitor clicks a direct WhatsApp button.
 * Contextually includes the requirement if one was selected.
 */
export function buildDirectWhatsAppMessage(contextRequirement?: string): string {
  const timestamp = getFormattedKolkataTimestamp();
  const parts: string[] = [
    `Hello ${siteConfig.shortName},`,
    "",
    "I would like to discuss a construction requirement.",
  ];

  if (contextRequirement && contextRequirement.trim()) {
    parts.push("");
    parts.push(`Requirement:\n${contextRequirement.trim()}`);
  }

  parts.push("");
  parts.push("I found RVP Anna Construction & Transport through your website.");
  parts.push("");
  parts.push("Please contact me regarding your services.");
  parts.push("");
  parts.push(`Sent on:\n${timestamp}`);
  parts.push("");
  parts.push("Thank you.");

  return parts.join("\n");
}

/**
 * Constructs the direct WhatsApp URL with dynamic timestamp.
 */
export function getDirectWhatsAppUrl(contextRequirement?: string): string {
  const message = buildDirectWhatsAppMessage(contextRequirement);
  return `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds a clean WhatsApp enquiry message string from the completed contact form.
 * Strictly omits empty optional fields and never prints "undefined" or "Not provided".
 */
export function buildWhatsAppMessage(payload: EnquiryPayload): string {
  const timestamp = getFormattedKolkataTimestamp();
  const parts: string[] = [
    `Hello ${siteConfig.shortName},`,
    "",
    "I would like to discuss a construction requirement.",
    "",
  ];

  if (payload.requirement?.trim()) {
    parts.push(`Requirement:\n${payload.requirement.trim()}`);
  }

  if (payload.location?.trim()) {
    parts.push(`Location:\n${payload.location.trim()}`);
  }

  if (payload.projectType?.trim()) {
    parts.push(`Project type:\n${payload.projectType.trim()}`);
  }

  if (payload.areaOrRequirement?.trim()) {
    parts.push(`Approximate area:\n${payload.areaOrRequirement.trim()}`);
  }

  if (payload.additionalMessage?.trim()) {
    parts.push(`Additional details:\n${payload.additionalMessage.trim()}`);
  }

  parts.push("");
  parts.push("Please contact me.");
  parts.push("");
  parts.push(`Phone:\n${siteConfig.phone}`);
  parts.push("");
  parts.push(`Enquiry sent:\n${timestamp}`);

  return parts.join("\n");
}

/**
 * Constructs the final https://wa.me URL for the submitted enquiry form with properly encoded parameters.
 */
export function buildWhatsAppUrl(payload: EnquiryPayload): string {
  const message = buildWhatsAppMessage(payload);
  return `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(message)}`;
}
