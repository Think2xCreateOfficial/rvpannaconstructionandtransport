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
    title: "Civil Construction Execution",
    description:
      "Full civil building construction from foundation footing, RCC structural columns and beams, to brick masonry and roof slab casting under direct engineering oversight.",
    image: serviceWorkImage,
    scopeMeta: "Foundation to Roof · Structural RCC · Masonry & Slabs",
    ctaText: "Discuss construction",
    enquiryValue: "Construction",
  },
  {
    id: "2d-plan",
    number: "02",
    label: "2D Plan",
    title: "Architectural 2D Layout & Space Planning",
    description:
      "Practical floor layouts and accurate room dimensions planned for natural light, ventilation, easy circulation, and optimal site orientation.",
    image: service2DImage,
    scopeMeta: "Floor Plans · Dimensional Drawings · Space Planning",
    ctaText: "Plan layout",
    enquiryValue: "2D / 3D Plan",
  },
  {
    id: "3d-plan",
    number: "03",
    label: "3D Plan",
    title: "3D Elevation & Spatial Modeling",
    description:
      "Clear 3D visual models to help you understand room volumes, exterior shape, roof lines, and daylight flow before starting work on site.",
    image: service3DImage,
    scopeMeta: "3D Perspective · Visual Verification · Exterior Views",
    ctaText: "Explore 3D planning",
    enquiryValue: "2D / 3D Plan",
  },
  {
    id: "elevation",
    number: "04",
    label: "Elevation",
    title: "Exterior Elevation & Front Facade",
    description:
      "Modern residential and commercial front elevation designs balancing clean lines, durable exterior finishes, balcony styling, and weather protection.",
    image: serviceElevationImage,
    scopeMeta: "Front Elevation · Facade Finishes · Balcony Details",
    ctaText: "Design elevation",
    enquiryValue: "Elevation",
  },
  {
    id: "material-contract",
    number: "05",
    label: "Material Contract",
    title: "Building Material Supply & Coordination",
    description:
      "Direct site supply of essential civil construction materials including TMT steel, cement, M-sand, jelly gravel aggregate, and AAC blocks.",
    image: serviceMaterialImage,
    scopeMeta: "TMT Steel · Cement · M-Sand · Jelly · AAC Blocks",
    ctaText: "Discuss materials",
    enquiryValue: "Materials",
  },
  {
    id: "labour-contract",
    number: "06",
    label: "Labour Contract",
    title: "Skilled Civil Construction Labour",
    description:
      "Experienced masons, bar benders, centering carpenters, and helper teams working with regular on-site supervision for consistent build quality.",
    image: serviceLabourImage,
    scopeMeta: "Experienced Masons · Steel Fixers · Centering Teams",
    ctaText: "Coordinate labour",
    enquiryValue: "Labour",
  },
  {
    id: "transport",
    number: "07",
    label: "Transport",
    title: "Site Logistics & Material Transport",
    description:
      "Dedicated transport support for moving steel, cement, jelly, sand, and construction supplies directly to job sites in Walajabad and Kanchipuram.",
    image: serviceTransportImage,
    scopeMeta: "Material Movement · Site Delivery · Local Logistics",
    ctaText: "Arrange transport",
    enquiryValue: "Transport",
  },
];
