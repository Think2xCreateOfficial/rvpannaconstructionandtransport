import serviceWorkImage from "@/assets/rvp-work.jpg";
import service2DImage from "@/assets/service-2d-plan.jpg";
import service3DImage from "@/assets/service-3d-plan.jpg";
import serviceElevationImage from "@/assets/service-elevation.jpg";
import serviceMaterialImage from "@/assets/service-material-contract.jpg";
import serviceLabourImage from "@/assets/service-labour-contract.jpg";
import serviceTransportImage from "@/assets/rvp-transport.jpg";

export interface ServiceItem {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  image: string;
  scopeMeta: string;
  ctaText: string;
  enquiryValue: string;
}

export const services: ServiceItem[] = [
  {
    id: "construction",
    number: "01",
    label: "Construction",
    title: "Civil Construction Work",
    description:
      "Complete building construction from foundation footings, structural pillars and beams, to brickwork and roof slab casting under direct civil engineering supervision.",
    image: serviceWorkImage,
    scopeMeta: "Foundation to Roof · Structural RCC · Brickwork & Slabs",
    ctaText: "Discuss construction",
    enquiryValue: "Construction",
  },
  {
    id: "2d-plan",
    number: "02",
    label: "2D Plan",
    title: "2D House Plan & Floor Layout",
    description:
      "Clear architectural floor plans showing room dimensions, doorway placements, ventilation, and space arrangements planned for practical daily living.",
    image: service2DImage,
    scopeMeta: "Floor Plans · Room Dimensions · Space Planning",
    ctaText: "Plan layout",
    enquiryValue: "2D / 3D Plan",
  },
  {
    id: "3d-plan",
    number: "03",
    label: "3D Plan",
    title: "3D Elevation & Visual Modeling",
    description:
      "Clear 3D visual views that help you see how the rooms, exterior shape, roof lines, and daylight flow look before starting work on site.",
    image: service3DImage,
    scopeMeta: "3D Views · Visual Planning · Exterior Looks",
    ctaText: "Explore 3D planning",
    enquiryValue: "2D / 3D Plan",
  },
  {
    id: "elevation",
    number: "04",
    label: "Elevation",
    title: "Front Elevation & Exterior Design",
    description:
      "Modern residential and commercial front elevation designs that balance clean lines, durable wall finishes, balcony styling, and weather protection.",
    image: serviceElevationImage,
    scopeMeta: "Front Elevation · Facade Finishes · Balcony Details",
    ctaText: "Design elevation",
    enquiryValue: "Elevation",
  },
  {
    id: "material-contract",
    number: "05",
    label: "Material Contract",
    title: "Building Material Supply",
    description:
      "Direct site supply of essential construction materials including TMT steel, cement, M-sand, Jelly gravel aggregate, and AAC blocks.",
    image: serviceMaterialImage,
    scopeMeta: "TMT Steel · Cement · M-Sand · Jelly · AAC Blocks",
    ctaText: "Discuss materials",
    enquiryValue: "Materials",
  },
  {
    id: "labour-contract",
    number: "06",
    label: "Labour Contract",
    title: "Skilled Construction Labour",
    description:
      "Experienced masons, bar benders, centering carpenters, and helper teams working with regular on-site civil supervision for dependable build quality.",
    image: serviceLabourImage,
    scopeMeta: "Experienced Masons · Steel Fixers · Centering Teams",
    ctaText: "Coordinate labour",
    enquiryValue: "Labour",
  },
  {
    id: "transport",
    number: "07",
    label: "Transport",
    title: "Material Transport & Site Logistics",
    description:
      "Dedicated transport support for moving steel, cement, Jelly, sand, and construction supplies directly to job sites in Walajabad and Kanchipuram.",
    image: serviceTransportImage,
    scopeMeta: "Material Movement · Site Delivery · Local Transport",
    ctaText: "Arrange transport",
    enquiryValue: "Transport",
  },
];
