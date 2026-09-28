import { createFileRoute } from "@tanstack/react-router";
import { RvpPage } from "@/components/rvp/RvpPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "RVP Anna Construction & Transport | Construction Services in Kanchipuram",
      },
      {
        name: "description",
        content:
          "Civil engineering construction, architectural 2D & 3D planning, elevation design, building material supply, labour coordination, and site transport in Walajabad and Kanchipuram.",
      },
      {
        property: "og:title",
        content: "RVP Anna Construction & Transport | Build with Clarity. Move with Confidence.",
      },
      {
        property: "og:description",
        content:
          "Civil construction execution, architectural planning, material contracts, skilled labour, and site transport in Kanchipuram & Walajabad.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/rvp-anna-logo.png" },
      { property: "og:url", content: "https://rvpannabuilder.com/" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "RVP Anna Construction & Transport",
      },
      {
        name: "twitter:description",
        content:
          "Civil engineering construction execution and transport services in Kanchipuram and Walajabad.",
      },
      { name: "twitter:image", content: "/rvp-anna-logo.png" },
    ],
  }),
  component: RvpPage,
});
