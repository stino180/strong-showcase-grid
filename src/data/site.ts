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
    width: 1200,
    height: 1800,
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
    alt: "Justin Strong in a black suit, jacket over one shoulder, studio portrait",
    width: 1200,
    height: 1800,
  },
  headshot: {
    src: "/images/headshot.jpg",
    alt: "Justin Strong in a white t-shirt, natural light headshot",
    width: 1200,
    height: 1800,
  },
  portfolioCategories: ["All", "Formal", "Lifestyle", "Street", "Digitals"] as const,
  portfolio: [
    ...makeSeries("Formal", [
      "Justin Strong in a black suit and grey tie, arms crossed",
      "Justin Strong in a black suit, adjusting his tie",
      "Justin Strong in a black suit, full-length studio portrait",
      "Justin Strong seated in a black suit, studio portrait",
      "Justin Strong in a black suit, leaning, studio portrait",
    ]),
    ...makeSeries("Lifestyle", [
      "Justin Strong smiling, seated on a stool in a polo shirt",
      "Justin Strong in a polo shirt, hand at his chin",
      "Justin Strong seated on a stool in casual summer styling",
      "Justin Strong leaning on a chair in a polo shirt and shorts",
      "Justin Strong standing in casual sportswear, hand on hip",
    ]),
    ...makeSeries("Street", [
      "Justin Strong walking on a Chicago street in a cream sweater",
      "Justin Strong against a painted storefront, arms crossed",
      "Justin Strong leaning on a brick wall in a Chicago alley",
      "Justin Strong against a red brick wall in streetwear",
      "Justin Strong outside a brick building in a cream sweater",
    ]),
    ...makeSeries("Digitals", [
      "Justin Strong model digital, front view in a white t-shirt and jeans",
      "Justin Strong model digital, smiling headshot",
      "Justin Strong model digital, full-length front view",
      "Justin Strong model digital, full-length profile view",
      "Justin Strong model digital, profile headshot",
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
