/**
 * Wedding package tiers from printed flyers — single source of truth for copy + pricing UI.
 * Replace placeholder image URLs (TODO) with your own assets under /public or a CDN.
 */

export type PackageTier = 'silver' | 'gold' | 'luxury';

/** Matches flyer treatments: Silver uses red price badge; Gold/Luxury use gold. */
export type PriceBadgeVariant = 'red' | 'gold';

export type WeddingPackage = {
  id: string;
  tier: PackageTier;
  /** Short label for nav / analytics, e.g. "Silver" */
  shortName: string;
  /** Full heading as on flyer, e.g. "THE SILVER DEAL" */
  title: string;
  /** Split title for stacked serif + sans layout (optional UI use) */
  titleLines: [string, string];
  features: string[];
  /** Exact string shown on pricing badge */
  priceLabel: string;
  /** Numeric amount in GHC for sorting, filters, or quote pre-fill */
  priceAmountGhc: number;
  priceBadgeVariant: PriceBadgeVariant;
  images: {
    /** Top banner: hero strip or single wide image */
    hero: string;
    /** Bottom-left accent / secondary (optional per layout) */
    accent?: string;
    /** Extra frames for collage layouts (e.g. Luxury dual top) */
    heroExtra?: string[];
  };
};

// TODO(assets): swap placeholder URLs for final photography; add domains to next.config `images.remotePatterns` if using `next/image`.
const PLACEHOLDER_HERO =
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80';
const PLACEHOLDER_PORTRAIT =
  'https://images.unsplash.com/photo-1522673606160-de49d0b1e9d4?w=800&q=80';

export const WEDDING_PACKAGES: WeddingPackage[] = [
  {
    id: 'silver',
    tier: 'silver',
    shortName: 'Silver',
    title: 'THE SILVER DEAL',
    titleLines: ['THE SILVER', 'DEAL'],
    features: [
      'Full-day photography coverage',
      'One professional lead photographer',
      'One professional lead videographer',
      '250–350 fully edited images',
      'A Video trailer and a full video coverage',
      '15 retouched portraits of the couple',
      'Medium wall portrait frame (12x16)',
      'Pendrive',
      'Online gallery for download + sharing',
    ],
    priceLabel: 'GHC 4800',
    priceAmountGhc: 4800,
    priceBadgeVariant: 'red',
    images: {
      hero: PLACEHOLDER_HERO,
      accent: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 'gold',
    tier: 'gold',
    shortName: 'Gold',
    title: 'GOLD DEAL',
    titleLines: ['GOLD', 'DEAL'],
    features: [
      'Full-day photography coverage',
      'Two photographers',
      'Two videographers',
      '400–550 edited images',
      'A video trailer and a full video coverage',
      '30 retouched signature portraits',
      'Engagement/pre-wedding session (2 looks)',
      'Premium photo album (80 Printed)',
      '3 Large wall portrait frame (16x20)',
      'Pendrive',
      'Online gallery for download + sharing',
    ],
    priceLabel: 'GHC 8000',
    priceAmountGhc: 8000,
    priceBadgeVariant: 'gold',
    images: {
      hero: PLACEHOLDER_HERO,
      accent: PLACEHOLDER_PORTRAIT,
    },
  },
  {
    id: 'luxury',
    tier: 'luxury',
    shortName: 'Luxury',
    title: 'LUXURY DEAL',
    titleLines: ['LUXURY', 'DEAL'],
    features: [
      'Full-day photography coverage',
      'Three photographers + assistant',
      'Dedicated family photographer',
      'Three videographers + assistant',
      '600+ edited images',
      '5 minute wedding story',
      'A video trailer and full coverage',
      '50 retouched high-end portraits',
      'Pre-wedding shoot (2 looks)',
      'Drone shot',
      'Customize wall clock',
      'Pendrive',
      'Deluxe wedding photo book',
      '2 Extra-large wall frame (20x24)',
      'Online gallery + 1-year cloud backup',
    ],
    // TODO(pricing): flyer copy you extracted reads GHC 1150 — confirm vs GHC 11,500 before go-live.
    priceLabel: 'GHC 1150',
    priceAmountGhc: 1150,
    priceBadgeVariant: 'gold',
    images: {
      hero: PLACEHOLDER_HERO,
      accent: PLACEHOLDER_PORTRAIT,
      heroExtra: [PLACEHOLDER_PORTRAIT],
    },
  },
];

export function getPackageByTier(tier: PackageTier): WeddingPackage | undefined {
  return WEDDING_PACKAGES.find((p) => p.tier === tier);
}
