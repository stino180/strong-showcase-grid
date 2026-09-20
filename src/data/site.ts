export type PortfolioCategory = "Formal" | "Lifestyle" | "Street" | "Digitals";

export type PortfolioImage = {
  src: string;
  alt: string;
  category: PortfolioCategory;
  width: number;
  height: number;
};

const makeSeries = (category: PortfolioCategory, descriptions: string[]): PortfolioImage[] =>
  descriptions.map((alt, index) => ({
    src: `/images/${category.toLowerCase()}-${String(index + 1).padStart(2, "0")}.jpg`,
    alt,
    category,
    width: 800,
    height: 1200,
  }));

export const site = {
  name: "Justin Strong",
  wordmark: "JUSTIN STRONG",
  role: "Model",
  location: "Chicago, IL",
  availability: "Available for travel",
  tagline: "Model · Chicago · Commercial · Lifestyle · Editorial",
  bookingEmail: "bookings@justinstrongmodel.com",
  instagram: {
    handle: "@justinstrongmodel",
    url: "https://instagram.com/justinstrongmodel",
  },
  nav: ["Portfolio", "Stats", "About", "Contact"],
  hero: {
    src: "/images/hero.jpg",
    alt: "Justin Strong, editorial model portrait",
    width: 800,
    height: 1200,
  },
  headshot: {
    src: "/images/headshot.jpg",
    alt: "Headshot of Justin Strong",
    width: 800,
    height: 1200,
  },
  portfolioCategories: ["All", "Formal", "Lifestyle", "Street", "Digitals"] as const,
  portfolio: [
    ...makeSeries("Formal", [
      "Justin Strong in a black suit, studio portrait",
      "Justin Strong in tailored formalwear",
      "Justin Strong in an eveningwear portrait",
      "Justin Strong in a classic suit",
      "Justin Strong in formal editorial styling",
    ]),
    ...makeSeries("Lifestyle", [
      "Justin Strong in a relaxed lifestyle portrait",
      "Justin Strong in casual commercial styling",
      "Justin Strong in a natural light portrait",
      "Justin Strong in an everyday lifestyle scene",
      "Justin Strong in relaxed contemporary styling",
    ]),
    ...makeSeries("Street", [
      "Justin Strong in urban streetwear",
      "Justin Strong in a Chicago street portrait",
      "Justin Strong in contemporary city styling",
      "Justin Strong outdoors in editorial streetwear",
      "Justin Strong in a downtown fashion portrait",
    ]),
    ...makeSeries("Digitals", [
      "Justin Strong model digital, front view",
      "Justin Strong model digital, profile view",
      "Justin Strong model digital, three-quarter view",
      "Justin Strong model digital, full-length view",
      "Justin Strong natural model headshot",
    ]),
  ] satisfies PortfolioImage[],
  stats: [
    { label: "Height", value: `5'7"` },
    { label: "Suit", value: "38S" },
    { label: "Chest", value: "—" },
    { label: "Waist", value: `31"` },
    { label: "Inseam", value: `28"` },
    { label: "Shoe", value: "8.5" },
    { label: "Hair", value: "—" },
    { label: "Eyes", value: "—" },
  ],
  compCard: { label: "Download comp card (PDF)", url: "/comp-card.pdf" },
  about:
    "Justin Strong is a Chicago-based model working in commercial, lifestyle, and editorial. He comes from behind the camera — years directing and producing film and video — which means he arrives on set already fluent in how one runs. Comfortable taking direction, in stills and on camera.",
  contact: {
    heading: "For bookings and availability",
    locationLine: "Chicago, IL · Available for travel",
  },
  representation: "Represented by —",
} as const;
