import steelImage from "@/assets/material-steel.jpg";
import cementImage from "@/assets/material-cement.jpg";
import msandImage from "@/assets/material-msand.jpg";
import jellyImage from "@/assets/material-jelly.jpg";
import aacBlocksImage from "@/assets/material-aac-blocks.jpg";
import aacMortarImage from "@/assets/material-aac-mortar.jpg";

export interface MaterialDetailItem {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  usage: string;
  image: string;
}

export const materials: MaterialDetailItem[] = [
  {
    id: "steel",
    number: "01",
    name: "Steel",
    tagline: "Structural Reinforcement",
    description:
      "TMT steel rods give tensile strength to all structural parts of your building, reinforcing footings, pillars, beams, and roof slabs against load stress.",
    usage: "Foundations, Pillars, Beams & Roof Slabs",
    image: steelImage,
  },
  {
    id: "cement",
    number: "02",
    name: "Cement",
    tagline: "Binding & Durability",
    description:
      "Essential bonding agent for solid concrete casting, brickwork mortar, and wall plastering to ensure lasting strength and weather protection.",
    usage: "Concrete Casting, Brickwork & Plastering",
    image: cementImage,
  },
  {
    id: "m-sand",
    number: "03",
    name: "M-Sand",
    tagline: "Fine Aggregate Support",
    description:
      "Manufactured sand with uniform particle grading for strong concrete mixes, brickwork mortar, and foundation beds.",
    usage: "Structural Concrete & Brickwork Mortar",
    image: msandImage,
  },
  {
    id: "jelly",
    number: "04",
    name: "Jelly (Jalli)",
    tagline: "Coarse Blue Metal Aggregate",
    description:
      "Clean blue metal stone gravel used in concrete mixtures for foundation footings, pillars, beams, and roof slab casting.",
    usage: "Pillar Castings, Lintels, Footings & Roof Slabs",
    image: jellyImage,
  },
  {
    id: "aac-blocks",
    number: "05",
    name: "AAC Blocks",
    tagline: "Lightweight Wall Units",
    description:
      "Lightweight building blocks for fast wall construction, reducing structural load on pillars while offering good room insulation.",
    usage: "External Walls & Partition Walls",
    image: aacBlocksImage,
  },
  {
    id: "aac-mortar",
    number: "06",
    name: "AAC Jointing Mortar",
    tagline: "Thin-Bed Block Adhesive",
    description:
      "Adhesive mortar formulated specifically for AAC blocks, creating thin, strong joints without thick cement beds.",
    usage: "AAC Block Masonry & Jointing",
    image: aacMortarImage,
  },
];
