import { createFileRoute } from "@tanstack/react-router";
import { RvpPage } from "@/components/rvp/RvpPage";
import { siteConfig, businessStructuredData } from "@/data/siteConfig";

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
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: siteConfig.name },
      { property: "og:locale", content: "en_IN" },
      {
        property: "og:title",
        content: siteConfig.ogTitle,
      },
      {
        property: "og:description",
        content: siteConfig.ogDescription,
      },
      { property: "og:url", content: siteConfig.url },
      { property: "og:image", content: siteConfig.ogImage },
      { property: "og:image:width", content: siteConfig.ogImageWidth },
      { property: "og:image:height", content: siteConfig.ogImageHeight },
      { property: "og:image:alt", content: siteConfig.ogImageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: siteConfig.ogTitle,
      },
      {
        name: "twitter:description",
        content: siteConfig.ogDescription,
      },
      { name: "twitter:image", content: siteConfig.ogImage },
      { name: "twitter:image:alt", content: siteConfig.ogImageAlt },
    ],
    links: [
      {
        rel: "canonical",
        href: siteConfig.url,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(businessStructuredData),
      },
    ],
  }),
  component: RvpPage,
});
