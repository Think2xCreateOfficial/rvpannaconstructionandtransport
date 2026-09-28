import { createFileRoute } from "@tanstack/react-router";
import { NotFoundPage } from "@/components/rvp/NotFoundPage";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "404 - Page Not Found | RVP Anna Construction & Transport" },
      {
        name: "description",
        content:
          "The requested page could not be found. Return to RVP Anna Construction & Transport homepage.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: NotFoundPage,
});
