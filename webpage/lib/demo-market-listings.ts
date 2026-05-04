export type MarketListing = {
  id: string
  plotNumber: string
  location: string
  sizeSqYards: number
  facing: 'East' | 'West' | 'North' | 'South'
  cornerPlot?: boolean
  priceLakhs: number
  imageUrl: string
  premiumBadge?: boolean
}

const STORAGE_KEY = 'plotkare_market_listings'

export const DEFAULT_MARKET_LISTINGS: MarketListing[] = [
  {
    id: 'demo-bhp-021',
    plotNumber: 'PLT-BHP-021',
    location: 'Bheemunipatnam Phase 3',
    sizeSqYards: 200,
    facing: 'East',
    cornerPlot: true,
    priceLakhs: 72,
    imageUrl:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
  },
  {
    id: 'demo-kmd-008',
    plotNumber: 'PLT-KMD-008',
    location: 'Kommadi Extension',
    sizeSqYards: 300,
    facing: 'North',
    priceLakhs: 95,
    premiumBadge: true,
    imageUrl:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  },
  {
    id: 'demo-and-034',
    plotNumber: 'PLT-AND-034',
    location: 'Anakapalle New Town',
    sizeSqYards: 150,
    facing: 'West',
    priceLakhs: 48,
    imageUrl:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
  },
  {
    id: 'demo-pnd-017',
    plotNumber: 'PLT-PND-017',
    location: 'Pendurthi Layout',
    sizeSqYards: 240,
    facing: 'South',
    priceLakhs: 68,
    imageUrl:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
  },
]

function emit() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('plotkare-market-listings-changed'))
  }
}

export function loadMarketListings(): MarketListing[] {
  if (typeof window === 'undefined') return DEFAULT_MARKET_LISTINGS
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return [...DEFAULT_MARKET_LISTINGS]
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return [...DEFAULT_MARKET_LISTINGS]
    }
    return parsed as MarketListing[]
  } catch {
    return [...DEFAULT_MARKET_LISTINGS]
  }
}

export function saveMarketListings(list: MarketListing[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  emit()
}

export function formatLakhsPrice(lakhs: number): string {
  if (lakhs >= 100) {
    const cr = lakhs / 100
    return `${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`
  }
  return `${lakhs} Lakhs`
}

export type ListingFilter = 'All Plots' | 'Under 50 Lakhs' | 'Above 50 Lakhs' | 'Corner Plots'

export function filterMarketListings(
  list: MarketListing[],
  filter: ListingFilter,
): MarketListing[] {
  if (filter === 'Under 50 Lakhs') return list.filter((p) => p.priceLakhs < 50)
  if (filter === 'Above 50 Lakhs') return list.filter((p) => p.priceLakhs >= 50)
  if (filter === 'Corner Plots') return list.filter((p) => p.cornerPlot)
  return list
}
