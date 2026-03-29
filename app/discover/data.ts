export type PriceTier = "₹" | "₹₹" | "₹₹₹" | "₹₹₹₹";

export interface Listing {
  id: string;
  name: string;
  neighborhood: string;
  address: string;
  rating: number;
  priceTier: PriceTier;
  startingFrom: number;
  image: string;
  tags?: string[];
}

export interface CategoryDefinition {
  slug: string;
  title: string;
  tagline: string;
  total: number;
  listings: Listing[];
}

export const categories: CategoryDefinition[] = [
  {
    slug: "spa",
    title: "Downtown Spas",
    tagline: "Finding your moment of zen.",
    total: 24,
    listings: [
      {
        id: "verdant-oasis",
        name: "The Verdant Oasis",
        neighborhood: "Heritage Square",
        address: "Downtown",
        rating: 4.9,
        priceTier: "₹₹₹",
        startingFrom: 1800,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCFVIDSpmGYVZjjeir7KATaO1flcbb3gQJ38DGNoJ2NQXqpOjjqM7M9X36c8I4ZS0VRuneCazYcJkM89edLUApS2-HtG1nE7SYXbYyMtZYf5fHZ-KqlaSx9T9ihaWpRnp47_sfdCcZJHiI-yFfEO4UBfNLBqtlOkrdo0kQ0SRTLFne2LEcxMJ74T2VsCa5qqqDlbQSRPK0L4pfYb0AEE4MCQEI_SVcu6eVSYZVbqEPJujCLsgrQvQomp_RDocNu5DbQ-KJJDMZsssrh",
      },
      {
        id: "ethereal-body",
        name: "Ethereal Body & Mind",
        neighborhood: "Sky Terrace",
        address: "North District",
        rating: 4.7,
        priceTier: "₹₹₹",
        startingFrom: 1600,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDsXQAbWhbov6bhGLGzQxhLRtXdes47bYO_pflBw_RfnPz_gMRzPOkJJVqbFBomcnA3lVUAN3iTPwPgV69IeEwRMvra3Tx6MnLpQIcBMbY4eFmxM712-hMUEUKguCMhiYn7sUvHTHXjT968xWufOsR3XxsJfWhUR35HgM5q8BnsGbPzZLnZsWSVXLgcwI9EXoj71Ubpc2o4eIQhIpoGhAp0TskG4vL0hh-7TpF97MP6v_x0Y7-00AnKmf4f77QiaxAiZdTWYMj9ozyL",
      },
      {
        id: "luminary-skincare",
        name: "Luminary Skincare",
        neighborhood: "Boutique Way",
        address: "Downtown",
        rating: 5.0,
        priceTier: "₹₹₹₹",
        startingFrom: 2800,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBR4p40239EV0a6Nu0n-9C68MkIdeVWvGgoHnxa30PDz6SGu9zEgzdLDPWcsnZVRXrNYHLE9GL7t-dfxAofXpHmkPhAM4waMj8yRPXhjGu4ibKDLJHIb53XUebiGL35yHCcVuq88EL1ZVpMTkCJLMyzmwo49kTnI8nCl6DAjqqJM0xlIScbRPSCFnSKjYdkNVMtsflyOXBmWk65wPR5lj692C_AyK2vzRbsnB8zkG-QmqExGUs2u1DYGu9hBGfgWl6YqL4EWfII_7Nq",
      },
      {
        id: "zen-retreat",
        name: "Zen Retreat & Spa",
        neighborhood: "Tranquil Lane",
        address: "Eastside",
        rating: 4.8,
        priceTier: "₹₹",
        startingFrom: 1100,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBU9sDQ6Cq7yp28mrSqCoehJyUgeK4ZlbGN_two14A5J1D5BNfoBgLKUCi1efi3j6ZBG5vGUzDPiOfEzwYMrX0PSbQjTrX5G6FGzUyzOGuzYQ_1T4p1-ue990Vfn4p2w94CJ5Z0LbAPFfAXztQiuHzo1lgn9ewfIubJ1ZhAfTz30Rr_gzq5Tm-Bt1kgiU9y0R2H0ymO4Ank9OS1UytpnVhGQ4PO1sKU83N-k3pwAvmP6koIc3-Nr2zU4xZZ8W9zGTFaCPnFff4BgwSF",
      },
    ],
  },
  {
    slug: "hair-salon",
    title: "Downtown Hair Salons",
    tagline: "Cutting-edge looks, effortless booking.",
    total: 18,
    listings: [
      {
        id: "nordic-cut",
        name: "The Nordic Cut",
        neighborhood: "Heritage Row",
        address: "Downtown",
        rating: 4.8,
        priceTier: "₹₹₹",
        startingFrom: 1400,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCmNLhCAXXV8beY2qoGdd699NNEE2ZJuDPXuOo8jxYYIr-9lzlZTlV6LwA2sN-mmJqabohY4eNrmUrilNy6uvt2zqhQRolZwEndb4UTZ_DSo-5QApILWC0mZqYAyhtxU0rC9C4OdimyneEvp0THSmmbWgjNmMdunaNIF2z_NzCjKU8SqqSefDFDggjt4XPALzY7kGCgUA2f8pf0vCJmC_MJjCgIxiirhFd-wXXHHjoBPGMCGk6O1B8Mp4Sn3qyCA2Yc2y8Er2VZTvqk",
      },
      {
        id: "atelier-brush",
        name: "Atelier Brush & Glow",
        neighborhood: "Skyline Block",
        address: "Uptown",
        rating: 4.7,
        priceTier: "₹₹₹",
        startingFrom: 1300,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDDqVEEMHHmMLcpBSmo6oAAxZDEu2-vqoBAZ8hCbs3qt8tCa4RLEwVSrzBZ-3EPORIhwlDIO1J_i7FBhg8_r1gTIFgp03-C9nGBqx1ivuwqWaP6hcQHsejMLPR6p_ZgheVwLq1IfzwOtgWoG2CvDz2YQW8iaQ-C_j6zbmFr37QXkNOYUigC_g3lgVZDxh15tr1Ecz0Cvp5EOz4ZzHjpjR6PKkFwfGghQz9-mgi_DWc3AemOrTJLM9ieKqQmkcyHx8ni1x9Tg6rlZbLA",
      },
    ],
  },
  {
    slug: "auto-repair",
    title: "Auto Repair",
    tagline: "Precision tuning & concierge care.",
    total: 12,
    listings: [
      {
        id: "precision-garage",
        name: "Precision Garage",
        neighborhood: "Market District",
        address: "Downtown",
        rating: 5.0,
        priceTier: "₹₹₹",
        startingFrom: 2200,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDDqVEEMHHmMLcpBSmo6oAAxZDEu2-vqoBAZ8hCbs3qt8tCa4RLEwVSrzBZ-3EPORIhwlDIO1J_i7FBhg8_r1gTIFgp03-C9nGBqx1ivuwqWaP6hcQHsejMLPR6p_ZgheVwLq1IfzwOtgWoG2CvDz2YQW8iaQ-C_j6zbmFr37QXkNOYUigC_g3lgVZDxh15tr1Ecz0Cvp5EOz4ZzHjpjR6PKkFwfGghQz9-mgi_DWc3AemOrTJLM9ieKqQmkcyHx8ni1x9Tg6rlZbLA",
      },
    ],
  },
  {
    slug: "dentist",
    title: "Dentists",
    tagline: "Painless care & aesthetic dentistry.",
    total: 10,
    listings: [
      {
        id: "azure-dental",
        name: "Azure Dental Arts",
        neighborhood: "Tranquil Lane",
        address: "Eastside",
        rating: 4.9,
        priceTier: "₹₹",
        startingFrom: 900,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBnQxKmzIMZmSMDTCOwtK2jBwej8wYTR8NrEWPGjEX0LWweGvCxDSPA-Blx-7d328mQsomvQohQjvTuwkeGTYFq3DKb16qYrYjJZsl4nOxQQ6QEpi-NeCfDoujz9hj2EfS75g6USdkMKF6mo_YSAXdQFYxbSna3sJAltcqFtN90pZnPqMUu3Mc0Pt-WKeWzvC8qr5t-z3c4wa85NdJP7mTQgIH6H3t05Zr6mcHyAprnSPITTZaVWR206kb8WoVDiu--nDeAmzN2d--B",
      },
    ],
  },
];

export const categorySlugs = categories.map((c) => c.slug);

export const getCategoryBySlug = (slug: string): CategoryDefinition | undefined =>
  categories.find((c) => c.slug === slug);
