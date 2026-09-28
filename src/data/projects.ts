import workImage from "@/assets/rvp-work.jpg";
import elevationImage from "@/assets/service-elevation.jpg";
import plan3dImage from "@/assets/service-3d-plan.jpg";
import plan2dImage from "@/assets/service-2d-plan.jpg";
import steelImage from "@/assets/material-steel.jpg";
import cementImage from "@/assets/material-cement.jpg";
import transportImage from "@/assets/rvp-transport.jpg";

export interface GalleryItem {
  id: string;
  number: string;
  title: string;
  category: string;
  label: string;
  location: string;
  scope: string;
  description: string;
  image: string;
  aspectClass?: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "residential-construction",
    number: "01",
    title: "Residential Civil Construction",
    category: "Structure & Masonry",
    label: "Construction Work",
    location: "Walajabad & Kanchipuram",
    scope: "Foundation, RCC Columns, Brickwork & Slab",
    description:
      "On-site civil execution with continuous engineering supervision from foundation footings to roof slab casting.",
    image: workImage,
    aspectClass: "aspect-[3/4] sm:aspect-[4/5]",
  },
  {
    id: "architectural-3d-elevation",
    number: "02",
    title: "3D Elevation & Spatial Modeling",
    category: "Planning & Elevation",
    label: "Design Visual",
    location: "Kanchipuram District",
    scope: "Floor Plans, 3D Elevation & Exterior Views",
    description:
      "Visualizing structural volumes, modern front elevations, and natural daylight flow before site excavation.",
    image: plan3dImage,
    aspectClass: "aspect-square sm:aspect-[4/3]",
  },
  {
    id: "structural-reinforcement",
    number: "03",
    title: "TMT Steel Structural Reinforcement",
    category: "Reinforcement Staging",
    label: "Materials On Site",
    location: "Walajabad & Kanchipuram",
    scope: "Rebar Footings, Columns & Lintel Beams",
    description:
      "TMT steel rebar integration providing tensile strength and load distribution for all structural members.",
    image: steelImage,
    aspectClass: "aspect-square sm:aspect-[4/3]",
  },
  {
    id: "architectural-2d-layout",
    number: "04",
    title: "2D Architectural Layout Planning",
    category: "Space Planning",
    label: "Planning Work",
    location: "Kanchipuram District",
    scope: "Dimensional Drawings & Room Layouts",
    description:
      "Precise room dimensions and site orientations planned for optimal circulation, ventilation, and living comfort.",
    image: plan2dImage,
    aspectClass: "aspect-[16/10]",
  },
  {
    id: "concrete-mortar-staging",
    number: "05",
    title: "RCC Concrete & Mortar Bonding",
    category: "Material Quality",
    label: "Building Progress",
    location: "Walajabad & Kanchipuram",
    scope: "Concrete Mixtures, Bricklaying & Plastering",
    description:
      "Consistent mixture grading and proper water curing to ensure long-term structural integrity and weather resistance.",
    image: cementImage,
    aspectClass: "aspect-[16/10]",
  },
  {
    id: "site-logistics-transport",
    number: "06",
    title: "Site Logistics & Material Transport",
    category: "Transport & Logistics",
    label: "Transport Support",
    location: "Walajabad & Kanchipuram",
    scope: "Direct Site Supply & Vehicle Haulage",
    description:
      "Dedicated transport support delivering key structural materials directly to project sites without delays.",
    image: transportImage,
    aspectClass: "aspect-[16/10]",
  },
];

// Backward-compatible alias for existing imports
export type ProjectShowcaseItem = GalleryItem;
export const showcaseProjects = galleryItems;
