export const ENQUIRY_REQUIREMENTS = [
  "Construction",
  "2D / 3D Plan",
  "Elevation",
  "Materials",
  "Labour",
  "Transport",
] as const;

export type EnquiryRequirement = (typeof ENQUIRY_REQUIREMENTS)[number];

export const PROJECT_TYPES = ["House", "Commercial", "Other"] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export const REQUIREMENT_SELECTOR_OPTIONS = [
  {
    number: "01",
    label: "Build a home",
    requirementValue: "Construction",
  },
  {
    number: "02",
    label: "Plan a project",
    requirementValue: "2D / 3D Plan",
  },
  {
    number: "03",
    label: "Need material support",
    requirementValue: "Materials",
  },
  {
    number: "04",
    label: "Need transport",
    requirementValue: "Transport",
  },
] as const;
