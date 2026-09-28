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
      "TMT steel rebar provides the internal tensile strength for all concrete elements. It reinforces footings, columns, lintels, and roof slabs against cracking and load stress.",
    usage: "Foundations, Columns, Beams & Roof Slabs",
    image: steelImage,
  },
  {
    id: "cement",
    number: "02",
    name: "Cement",
    tagline: "Binding & Durability",
    description:
      "The core bonding agent for all RCC concrete mixtures, bricklaying mortar, and internal/external wall plastering. Proper curing ensures long-term weather resistance.",
    usage: "Concrete Casting, Brickwork & Plastering",
    image: cementImage,
  },
  {
    id: "m-sand",
    number: "03",
    name: "M-Sand",
    tagline: "Fine Aggregate Support",
    description:
      "Manufactured sand produced with clean particle sizing for solid concrete mixes, foundation beds, and mortar bonding in place of river sand.",
    usage: "RCC Structural Concrete & Masonry Mortar",
    image: msandImage,
  },
  {
    id: "jelly",
    number: "04",
    name: "Jelly",
    tagline: "Coarse Blue Metal Aggregate",
    description:
      "Hard blue metal crushed stone gravel used as the primary aggregate in concrete, providing compressive strength and load distribution for all structural members.",
    usage: "Pillar Castings, Lintels, Footings & Roof Slabs",
    image: jellyImage,
  },
  {
    id: "aac-blocks",
    number: "05",
    name: "AAC Blocks",
    tagline: "Lightweight Wall Units",
    description:
      "Autoclaved aerated concrete blocks offer faster wall construction, reduced dead weight on structural frames, and better thermal comfort inside rooms.",
    usage: "External Walls, Partition Walls & Multi-Storey Builds",
    image: aacBlocksImage,
  },
  {
    id: "aac-mortar",
    number: "06",
    name: "AAC Jointing Mortar",
    tagline: "Thin-Bed Block Adhesive",
    description:
      "Special thin-bed mortar designed for joining AAC blocks. It requires minimal joint thickness, eliminates thick sand-cement beds, and reduces joint shrinkage.",
    usage: "AAC Block Masonry & Precision Jointing",
    image: aacMortarImage,
  },
];
