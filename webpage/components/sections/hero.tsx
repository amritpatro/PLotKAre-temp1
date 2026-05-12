'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

/** Map + D3 + GSAP isolated: if this chunk fails, hero copy still renders. */
const IndiaHeroMapLazy = dynamic(() => import('./india-hero-map').then((m) => ({ default: m.IndiaHeroMap })), {
  ssr: false,
  loading: () => (
    <div
      className="h-[min(440px,52vh)] w-full max-w-[560px] animate-pulse rounded-2xl bg-[#F8F6F3] lg:max-w-none"
      aria-hidden
    />
  ),
})

const pillars = [
  { title: 'Field evidence', label: 'Geotagged photos each cycle' },
  { title: 'Legal hygiene', label: 'EC, tax, and deed reminders' },
  { title: 'Single dashboard', label: 'History you can search anytime' },
  { title: 'Vizag corridors', label: 'Coastal layouts & growth belts' },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-white pt-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex min-h-[calc(100vh-5rem)] min-w-0 flex-col justify-center py-12 lg:grid lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[1fr_minmax(320px,1fr)] lg:items-center lg:gap-14 lg:py-16">
          <div className="min-w-0 text-[#1a1a1a]">
            <p className="mb-6 font-mono text-sm font-medium uppercase tracking-widest text-[#8B1538]">
              Visakhapatnam land &amp; apartment oversight
            </p>

            <h1 className="max-w-4xl font-serif text-4xl font-bold leading-[1.12] tracking-tight text-[#1a1a1a] md:text-5xl lg:text-6xl xl:text-7xl">
              Professional Plot and Property Management in Visakhapatnam
            </h1>

            <p className="mt-6 max-w-2xl font-serif text-2xl font-semibold italic leading-snug text-[#8B1538] md:text-3xl">
              Your Land Has Value. We Make Sure It Stays That Way.
            </p>

            <p className="mt-8 max-w-2xl font-sans text-lg leading-relaxed text-[#6B6B6B] md:text-xl">
              <strong className="font-medium text-[#1a1a1a]">NRIs abroad</strong> who rarely fly in,{' '}
              <strong className="font-medium text-[#1a1a1a]">Indian metro owners</strong> with a second asset
              in AP, and <strong className="font-medium text-[#1a1a1a]">local investors</strong> who want
              income or resale optionality — all get the same inspection rhythm, boundary photos, and document
              trail so decisions are based on facts, not rumours.
            </p>

            <div className="mt-10 flex flex-wrap gap-6">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-sm bg-[#8B1538] px-10 py-5 font-sans text-base font-medium text-white transition-all hover:bg-[#8B1538]/90 md:px-12 md:py-6 md:text-lg"
              >
                Talk to the team
              </Link>
              <Link
                href="/demo/plot-3d/"
                className="inline-flex items-center justify-center rounded-sm border border-[#1a1a1a] bg-transparent px-10 py-5 font-sans text-base font-medium text-[#1a1a1a] transition-all hover:bg-[#1a1a1a] hover:text-white md:px-12 md:py-6 md:text-lg"
              >
                Open 3D plot demo
              </Link>
            </div>

            <div className="mt-16 grid gap-6 border-t border-[#E5E5E5] pt-12 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((p) => (
                <div key={p.title}>
                  <p className="font-serif text-lg font-semibold text-[#1a1a1a]">{p.title}</p>
                  <p className="mt-2 font-sans text-sm text-[#6B6B6B]">{p.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 min-w-0 lg:mt-0">
            <IndiaHeroMapLazy />
          </div>
        </div>
      </div>
    </section>
  )
}
