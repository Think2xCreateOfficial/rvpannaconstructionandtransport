import { z } from "zod";
import { ENQUIRY_REQUIREMENTS, PROJECT_TYPES } from "@/data/enquiryOptions";

export const enquirySchema = z.object({
  requirement: z
    .string()
    .min(1, "Please select what you need")
    .refine((val) => ENQUIRY_REQUIREMENTS.includes(val as (typeof ENQUIRY_REQUIREMENTS)[number]), {
      message: "Please choose a valid requirement",
    }),
  location: z
    .string()
    .trim()
    .min(1, "Please enter your project location")
    .max(120, "Location cannot exceed 120 characters"),
  projectType: z
    .string()
    .min(1, "Please select your project type")
    .refine((val) => PROJECT_TYPES.includes(val as (typeof PROJECT_TYPES)[number]), {
      message: "Please choose a valid project type",
    }),
  areaOrRequirement: z
    .string()
    .trim()
    .max(120, "Approximate requirement cannot exceed 120 characters")
    .optional()
    .default(""),
  additionalMessage: z
    .string()
    .trim()
    .max(800, "Additional details cannot exceed 800 characters")
    .optional()
    .default(""),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;

export function isStepValid(
  step: number,
  state: {
    requirement: string;
    location: string;
    projectType: string;
    areaOrRequirement: string;
    additionalMessage: string;
  },
): boolean {
  switch (step) {
    case 0:
      return Boolean(state.requirement.trim());
    case 1:
      return Boolean(state.location.trim()) && state.location.trim().length <= 120;
    case 2:
      return Boolean(state.projectType.trim());
    case 3:
      return state.areaOrRequirement.trim().length <= 120;
    case 4:
      return state.additionalMessage.trim().length <= 800;
    default:
      return false;
  }
}
