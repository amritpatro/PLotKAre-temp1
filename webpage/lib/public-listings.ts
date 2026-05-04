import type { Facing } from '@/lib/plotkare-storage'

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
}

export const STORAGE_PUBLIC_LISTINGS = 'plotkare_public_listings'

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
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
    status: 'Active',
    inquiriesCount: 2,
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
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    status: 'Active',
    inquiriesCount: 5,
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
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
    status: 'Active',
    inquiriesCount: 1,
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
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    status: 'Active',
    inquiriesCount: 0,
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
  return {
    id,
    plotNumber,
    location,
    sizeSqYards,
    sizeLabel: String(raw.sizeLabel ?? `${sizeSqYards} sq yards`),
    facing,
    cornerPlot,
    premium,
    priceLakhs,
    priceDisplay: String(raw.priceDisplay ?? `${priceLakhs} Lakhs`),
    imageUrl: String(raw.imageUrl ?? base?.imageUrl ?? ''),
    status,
    inquiriesCount: Number(raw.inquiriesCount ?? 0) || 0,
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

export function filterPublicListings(
  listings: PublicPlotListing[],
  filter: ListingFilter,
): PublicPlotListing[] {
  if (filter === 'All Plots') return listings.filter((p) => p.status === 'Active')
  if (filter === 'Under 50 Lakhs')
    return listings.filter((p) => p.status === 'Active' && p.priceLakhs < 50)
  if (filter === 'Above 50 Lakhs')
    return listings.filter((p) => p.status === 'Active' && p.priceLakhs >= 50)
  if (filter === 'Corner Plots')
    return listings.filter((p) => p.status === 'Active' && p.cornerPlot)
  return listings
}

/** First three active listings for the landing page row */
export function getLandingShowcaseListings(listings: PublicPlotListing[]): PublicPlotListing[] {
  return listings.filter((p) => p.status === 'Active').slice(0, 3)
}
