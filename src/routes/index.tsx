import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage } from "@/components/portfolio-page";
import { site } from "@/data/site";

export const Route = createFileRoute("/")({
  component: PortfolioPage,
  head: () => ({
    meta: [
      { title: "Justin Strong — Model | Chicago" },
      { name: "description", content: "Portfolio of Justin Strong, a Chicago-based commercial, lifestyle, and editorial model available for bookings and travel." },
      { property: "og:title", content: "Justin Strong — Model | Chicago" },
      { property: "og:description", content: "Chicago-based commercial, lifestyle, and editorial model." },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "https://justinstrongmodel.com/images/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://justinstrongmodel.com/images/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://justinstrongmodel.com/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: site.name,
        jobTitle: site.role,
        address: { "@type": "PostalAddress", addressLocality: "Chicago", addressRegion: "IL" },
        email: `mailto:${site.bookingEmail}`,
        sameAs: [site.instagram.url],
      }),
    }],
  }),
});
