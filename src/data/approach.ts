export interface ApproachStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export const approachSteps: ApproachStep[] = [
  {
    number: "01",
    title: "Understand",
    subtitle: "Site Review & Requirements",
    description:
      "We begin by understanding your plot dimensions, soil conditions, budget preferences, and what type of construction you are planning.",
  },
  {
    number: "02",
    title: "Plan",
    subtitle: "2D Layout & 3D Visual",
    description:
      "Accurate room dimensions, structural grid alignments, natural lighting plans, and front elevation visuals are confirmed before ground-breaking.",
  },
  {
    number: "03",
    title: "Prepare",
    subtitle: "Materials & Labour Setup",
    description:
      "Quality TMT steel, cement, M-sand, Jalli gravel, and skilled masonry teams are scheduled to ensure site work starts without delay.",
  },
  {
    number: "04",
    title: "Build",
    subtitle: "Civil Execution & Supervision",
    description:
      "Footings, RCC columns, beam-slab reinforcement, brick masonry, and plastering proceed under continuous civil engineering oversight.",
  },
  {
    number: "05",
    title: "Support",
    subtitle: "Finishing & Handover",
    description:
      "Final checks on curing, structural alignments, surface finishes, and site clearance ensure your building is handed over ready for occupancy.",
  },
];

export interface JourneyStage {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
}

export const journeyStages: JourneyStage[] = [
  {
    id: "plan",
    number: "01",
    name: "Plan",
    tagline: "Clear Dimensions",
    description:
      "Floor layout and 3D elevation drawings aligned with site orientation and family needs.",
  },
  {
    id: "material",
    number: "02",
    name: "Material",
    tagline: "Quality Supplies",
    description:
      "TMT steel, cement, graded sand, Jalli aggregate, and blocks sourced directly for your site.",
  },
  {
    id: "labour",
    number: "03",
    name: "Labour",
    tagline: "Skilled Teams",
    description:
      "Experienced masons, steel fixers, and carpenters working with daily civil supervision.",
  },
  {
    id: "build",
    number: "04",
    name: "Build",
    tagline: "Structural Execution",
    description:
      "Solid foundations, aligned columns, and timely concrete casting according to engineering standards.",
  },
  {
    id: "move",
    number: "05",
    name: "Move",
    tagline: "Site Logistics",
    description:
      "Dedicated transport to keep construction materials arriving continuously without site stoppage.",
  },
  {
    id: "site",
    number: "06",
    name: "Site",
    tagline: "Finished Structure",
    description:
      "Clean finishing, verified alignments, and completed handover ready for your next chapter.",
  },
];
