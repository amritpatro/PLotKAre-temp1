export type BlogPost = {
  slug: string
  title: string
  description: string
  datePublished: string
  /** Plain-text paragraphs for SEO-friendly rendering */
  paragraphs: string[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'nri-plot-inspection-visakhapatnam-guide',
    title: 'NRI Plot Inspection in Visakhapatnam: What to Demand in Every Field Report',
    description:
      'A practical checklist for families abroad who need dated boundary evidence, access-path notes, and escalation language that lawyers can use.',
    datePublished: '2026-04-18',
    paragraphs: [
      'If you only visit Visakhapatnam once every few years, the weakest link is not the land itself — it is the gap between what relatives remember and what is actually on the ground. A useful inspection cadence closes that gap with repeatable evidence rather than ad-hoc WhatsApp photos.',
      'Ask for four-sided boundary coverage every cycle, not only the “front” facing the road. Encroachments often start from the rear or side where tree cover hides foot traffic. Geotagged images should be consistent enough that you can compare month to month without guessing angles.',
      'Access paths matter as much as survey stones. If a neighbour parks equipment across your entry easement, the sooner it is documented, the cheaper it is to unwind. Your report should call out vehicles, building materials, or informal sheds even when they look temporary.',
      'Finally, pair field reports with document hygiene: EC pulls, tax receipts, and mutation status belong in the same thread so you are not chasing PDFs the week before a sale or refinance.',
    ],
  },
  {
    slug: 'encroachment-prevention-vizag-boundaries',
    title: 'Encroachment Prevention on Vizag Plots: Boundaries, Trees, and Early Signals',
    description:
      'How low-drama boundary monitoring saves NRIs from high-drama court timelines — written for coastal Andhra layouts.',
    datePublished: '2026-04-02',
    paragraphs: [
      'Most encroachment stories do not begin with a bulldozer; they begin with a slightly wider cow path, a bamboo fence that “leans,” or a neighbour’s rainwater channel that quietly shifts the edge line. The goal of monitoring is to catch those moves while they are reversible.',
      'Tree lines are common hiding spots. A monthly or quarterly walk-through should include photos taken from consistent landmarks — a permanent pole, a corner pylon, or a painted tree — so perspective drift does not fake progress.',
      'When something changes, the write-up should separate facts from recommendations: what was seen, when, and what options exist (survey re-marking, panchayat notice, counsel letter). That separation keeps families from arguing about interpretation when stress is high.',
    ],
  },
  {
    slug: 'andhra-pradesh-land-documents-checklist',
    title: 'Andhra Pradesh Land Documents Checklist for Out-of-Town Owners',
    description:
      'Sale deed, patta, encumbrance certificate, tax receipts, and mutation — how to keep them current without flying home each quarter.',
    datePublished: '2026-03-20',
    paragraphs: [
      'Treat documents like infrastructure: if they are stale, every other decision becomes slower. EC validity windows, municipal tax cycles, and layout approvals each have different expiries — a single calendar view prevents last-minute panic.',
      'Link documents to the same plot file your inspections use. When a buyer or banker asks for proof, you should not be decrypting filenames at midnight in another timezone.',
      'If you co-own with siblings, write down who is authorised to instruct surveyors or counsel. Ambiguity there is more expensive than a few hours of lawyer time up front.',
    ],
  },
  {
    slug: 'apartment-due-diligence-visakhapatnam-seafront',
    title: 'Apartment Due Diligence in Visakhapatnam: Seafront Towers vs Inland Inventory',
    description:
      'How investors comparing RK Beach corridors to Madhurawada belts can read maintenance, corpus, and coastal exposure risk.',
    datePublished: '2026-03-05',
    paragraphs: [
      'Apartments trade on different risks than open plots: corpus health, sinking fund usage, fire stair pressurisation, and façade maintenance schedules. Ask for the last three AGM minutes before you price optimism into your offer.',
      'Sea-facing units carry corrosion and wind-load maintenance premiums. A lower ticket price can still be expensive if special assessments are coming for window packs or podium waterproofing.',
      'Parking allotment, stilt usage, and visitor policies affect resale liquidity. Capture them in writing early, not after you discover a pillar in your deeded slot.',
    ],
  },
  {
    slug: 'coastal-andhra-plot-pricing-signals-2026',
    title: 'Coastal Andhra Plot Pricing: Reading Registration Spikes Without Hype',
    description:
      'How to blend registration data, layout infra timing, and corridor narratives when you are not on the ground weekly.',
    datePublished: '2026-02-14',
    paragraphs: [
      'Registration bursts can be real demand or a single large land assembly — context matters. Pair headline averages with lane-level comps inside the same micro-market.',
      'Infrastructure timing (ROB completions, beach corridor widening, IT SEZ phases) moves liquidity before it moves headline rates. Track execution photos, not only ribbon-cutting press notes.',
      'If you cannot visit, insist on dated comparables attached to each valuation note so you can challenge or confirm jumps without emotional pricing.',
    ],
  },
]

export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug)
}
