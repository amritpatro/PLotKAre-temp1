import type { Facing } from '@/lib/plotkare-storage'

export type PropertyKind = 'plot' | 'apartment'

export type PublicPlotListing = {
  id: string
  plotNumber: string
  location: string
  sizeSqYards: number
  sizeLabel: string
  facing: Facing
  cornerPlot: boolean
  premium: boolean
  priceLakhs: number
  priceDisplay: string
  imageUrl: string
  status: 'Active' | 'Sold'
  inquiriesCount: number
  propertyKind: PropertyKind
  bhk?: number
  floorLabel?: string
}

export const STORAGE_PUBLIC_LISTINGS = 'plotkare_public_listings'

/** Unsplash imagery — vacant land, layouts, and apartments (no stock watermarks). */
export const DEFAULT_PUBLIC_LISTINGS: PublicPlotListing[] = [
  {
    id: 'plt-bhp-021',
    plotNumber: 'PLT-BHP-021',
    location: 'Bheemunipatnam Phase 3',
    sizeSqYards: 200,
    sizeLabel: '200 sq yards',
    facing: 'East',
    cornerPlot: true,
    premium: false,
    priceLakhs: 72,
    priceDisplay: '72 Lakhs',
    imageUrl:
      'https://images.unsplash.com/photo-1628624747186-d9c6e7c79f8f?w=800&auto=format&fit=crop&q=80',
    status: 'Active',
    inquiriesCount: 2,
    propertyKind: 'plot',
  },
  {
    id: 'plt-kmd-008',
    plotNumber: 'PLT-KMD-008',
    location: 'Kommadi Extension',
    sizeSqYards: 300,
    sizeLabel: '300 sq yards',
    facing: 'North',
    cornerPlot: false,
    premium: true,
    priceLakhs: 95,
    priceDisplay: '95 Lakhs',
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    status: 'Active',
    inquiriesCount: 5,
    propertyKind: 'plot',
  },
  {
    id: 'apt-rk-204',
    plotNumber: 'APT-RK-204',
    location: 'RK Beach — gated tower',
    sizeSqYards: 0,
    sizeLabel: '1,650 sq ft',
    facing: 'East',
    cornerPlot: false,
    premium: true,
    priceLakhs: 135,
    priceDisplay: '1.35 Cr',
    imageUrl:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80',
    status: 'Active',
    inquiriesCount: 3,
    propertyKind: 'apartment',
    bhk: 3,
    floorLabel: '12th floor',
  },
  {
    id: 'plt-and-034',
    plotNumber: 'PLT-AND-034',
    location: 'Anakapalle New Town',
    sizeSqYards: 150,
    sizeLabel: '150 sq yards',
    facing: 'West',
    cornerPlot: false,
    premium: false,
    priceLakhs: 48,
    priceDisplay: '48 Lakhs',
    imageUrl:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80',
    status: 'Active',
    inquiriesCount: 1,
    propertyKind: 'plot',
  },
  {
    id: 'plt-pnd-017',
    plotNumber: 'PLT-PND-017',
    location: 'Pendurthi Layout',
    sizeSqYards: 240,
    sizeLabel: '240 sq yards',
    facing: 'South',
    cornerPlot: false,
    premium: false,
    priceLakhs: 68,
    priceDisplay: '68 Lakhs',
    imageUrl:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80',
    status: 'Active',
    inquiriesCount: 0,
    propertyKind: 'plot',
  },
]

function normalizeListing(raw: Record<string, unknown>): PublicPlotListing | null {
  const id = raw.id != null ? String(raw.id) : null
  if (!id) return null
  const base = DEFAULT_PUBLIC_LISTINGS.find((p) => p.id === id)
  const plotNumber = String(raw.plotNumber ?? base?.plotNumber ?? '')
  const location = String(raw.location ?? base?.location ?? '')
  const sizeSqYards = Number(raw.sizeSqYards ?? base?.sizeSqYards ?? 0) || 0
  const facing = (raw.facing as Facing) || base?.facing || 'East'
  const cornerPlot = Boolean(raw.cornerPlot ?? base?.cornerPlot ?? false)
  const premium = Boolean(raw.premium ?? base?.premium ?? false)
  const priceLakhs = Number(raw.priceLakhs ?? base?.priceLakhs ?? 0) || 0
  const status =
    raw.status === 'Sold' || raw.status === 'Active' ? raw.status : base?.status ?? 'Active'
  const propertyKind =
    raw.propertyKind === 'apartment' || raw.propertyKind === 'plot'
      ? raw.propertyKind
      : base?.propertyKind ?? 'plot'
  return {
    id,
    plotNumber,
    location,
    sizeSqYards,
    sizeLabel: String(raw.sizeLabel ?? base?.sizeLabel ?? `${sizeSqYards} sq yards`),
    facing,
    cornerPlot,
    premium,
    priceLakhs,
    priceDisplay: String(raw.priceDisplay ?? base?.priceDisplay ?? `${priceLakhs} Lakhs`),
    imageUrl: String(raw.imageUrl ?? base?.imageUrl ?? ''),
    status,
    inquiriesCount: Number(raw.inquiriesCount ?? 0) || 0,
    propertyKind,
    bhk: raw.bhk != null ? Number(raw.bhk) : base?.bhk,
    floorLabel: raw.floorLabel != null ? String(raw.floorLabel) : base?.floorLabel,
  }
}

export function loadPublicListings(): PublicPlotListing[] {
  if (typeof window === 'undefined') return DEFAULT_PUBLIC_LISTINGS
  try {
    const raw = localStorage.getItem(STORAGE_PUBLIC_LISTINGS)
    if (!raw) return [...DEFAULT_PUBLIC_LISTINGS]
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return [...DEFAULT_PUBLIC_LISTINGS]
    const rows = parsed
      .map((p) =>
        typeof p === 'object' && p !== null ? normalizeListing(p as Record<string, unknown>) : null,
      )
      .filter(Boolean) as PublicPlotListing[]
    return rows.length ? rows : [...DEFAULT_PUBLIC_LISTINGS]
  } catch {
    return [...DEFAULT_PUBLIC_LISTINGS]
  }
}

export function savePublicListings(listings: PublicPlotListing[]) {
  localStorage.setItem(STORAGE_PUBLIC_LISTINGS, JSON.stringify(listings))
  window.dispatchEvent(new Event('plotkare-listings-changed'))
}

export type ListingFilter =
  | 'All Plots'
  | 'Under 50 Lakhs'
  | 'Above 50 Lakhs'
  | 'Corner Plots'
  | 'Apartments'

export function filterPublicListings(
  listings: PublicPlotListing[],
  filter: ListingFilter,
): PublicPlotListing[] {
  const active = listings.filter((p) => p.status === 'Active')
  if (filter === 'Under 50 Lakhs') return active.filter((p) => p.priceLakhs < 50)
  if (filter === 'Above 50 Lakhs') return active.filter((p) => p.priceLakhs >= 50)
  if (filter === 'Corner Plots') return active.filter((p) => p.cornerPlot)
  if (filter === 'Apartments') return active.filter((p) => p.propertyKind === 'apartment')
  return active
}

/** First three active listings for the landing page row */
export function getLandingShowcaseListings(listings: PublicPlotListing[]): PublicPlotListing[] {
  return listings.filter((p) => p.status === 'Active').slice(0, 3)
}
