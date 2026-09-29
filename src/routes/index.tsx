import { createFileRoute } from "@tanstack/react-router";
import { RvpPage } from "@/components/rvp/RvpPage";
import { siteConfig } from "@/data/siteConfig";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: siteConfig.title,
      },
      {
        name: "description",
        content: siteConfig.description,
      },
      {
        property: "og:title",
        content: siteConfig.title,
      },
      {
        property: "og:description",
        content: siteConfig.description,
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: siteConfig.ogImage },
      { property: "og:url", content: siteConfig.url },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: siteConfig.title,
      },
      {
        name: "twitter:description",
        content: siteConfig.description,
      },
      { name: "twitter:image", content: siteConfig.ogImage },
    ],
  }),
  component: RvpPage,
});
