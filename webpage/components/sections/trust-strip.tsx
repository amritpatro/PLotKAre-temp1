'use client'

const trustItems = [
  'Registered under AP RERA',
  'ISO Process Standards',
  'Trusted by NRIs across USA, UK, UAE & Australia',
  '5-Year Track Record',
  'All Agents Background-Verified',
  '100% Digital Reports',
  'No Subcontracting',
]

export function TrustStrip() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-white py-5">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...trustItems, ...trustItems].map((item, index) => (
          <span key={index} className="flex items-center">
            <span className="px-8 font-sans text-sm font-medium text-foreground/80">
              {item}
            </span>
            <span className="text-primary/60">•</span>
          </span>
        ))}
      </div>
    </section>
  )
}
