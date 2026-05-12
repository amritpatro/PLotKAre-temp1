'use client'

/**
 * India admin-1 state map (Natural Earth-derived GeoJSON in /public/geo/india-states.geojson).
 * Regenerate via: scripts/extract-india-states.mjs + Natural Earth ne_50m_admin_1_states_provinces.
 */
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { FeatureCollection } from 'geojson'
import { geoMercator, geoPath } from 'd3-geo'
import gsap from 'gsap'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { withBasePath } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const VIZAG = { lon: 83.2185, lat: 17.6868 }

/** Illustrative global anchor cities — not client offices or headcounts. */
const GLOBAL_ANCHORS = [
  { name: 'Houston', lon: -95.3698, lat: 29.7604 },
  { name: 'Dubai', lon: 55.2708, lat: 25.2048 },
  { name: 'London', lon: -0.1278, lat: 51.5074 },
  { name: 'Singapore', lon: 103.8198, lat: 1.3521 },
]

function isAndhraPradesh(name: string, iso: string) {
  return iso === 'IN-AP' || name.includes('Andhra Pradesh')
}

type PathRow = { key: string; name: string; iso: string; d: string; ap: boolean }

export function IndiaHeroMap() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [fc, setFc] = useState<FeatureCollection | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [selected, setSelected] = useState<PathRow | null>(null)
  const [reduceMotion, setReduceMotion] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduceMotion(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    fetch(withBasePath('/geo/india-states.geojson'))
      .then((r) => {
        if (!r.ok) throw new Error('map data')
        return r.json()
      })
      .then((data: FeatureCollection) => setFc(data))
      .catch(() => {
        setLoadError(true)
        setFc(null)
      })
  }, [])

  const layout = useMemo(() => {
    const w = 560
    const h = 440
    const pad = 12
    if (!fc?.features?.length) {
      return {
        w,
        h,
        paths: [] as PathRow[],
        vizag: null as [number, number] | null,
        lines: [] as { key: string; d: string }[],
      }
    }

    const projection = geoMercator().fitExtent(
      [
        [pad, pad],
        [w - pad, h - pad],
      ],
      fc,
    )
    const pathGen = geoPath(projection)

    const paths: PathRow[] = fc.features.map((feature, i) => {
      const name = String((feature.properties as { name?: string })?.name ?? 'State / UT')
      const iso = String((feature.properties as { iso_3166_2?: string })?.iso_3166_2 ?? '')
      const d = pathGen(feature as Parameters<typeof pathGen>[0]) ?? ''
      return {
        key: `${iso}-${i}`,
        name,
        iso,
        d,
        ap: isAndhraPradesh(name, iso),
      }
    })

    const v = projection([VIZAG.lon, VIZAG.lat])
    const vizag: [number, number] | null = v ? [v[0]!, v[1]!] : null

    const lines: { key: string; d: string }[] = []
    if (vizag) {
      for (const g of GLOBAL_ANCHORS) {
        const p = projection([g.lon, g.lat])
        if (!p) continue
        lines.push({
          key: g.name,
          d: `M ${p[0]} ${p[1]} L ${vizag[0]} ${vizag[1]}`,
        })
      }
    }

    return { w, h, paths, vizag, lines }
  }, [fc])

  useLayoutEffect(() => {
    if (reduceMotion || !rootRef.current || !fc) return
    const ctx = gsap.context(() => {
      gsap.fromTo(rootRef.current, { opacity: 0.001 }, { opacity: 1, duration: 0.55, ease: 'power2.out' })
    }, rootRef)
    return () => ctx.revert()
  }, [reduceMotion, fc])

  const openDialog = (row: PathRow) => setSelected(row)

  return (
    <div ref={rootRef} className="relative w-full max-w-[560px] justify-self-end lg:max-w-none">
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl border border-[#E5E5E5]/90 bg-white/75 shadow-xl backdrop-blur-md',
          'ring-1 ring-black/[0.04]',
        )}
      >
        <svg
          viewBox={`0 0 ${layout.w} ${layout.h}`}
          className="block h-auto w-full"
          role="img"
          aria-label="Interactive map of India: choose a state or union territory for PlotKare coverage and expansion details"
        >
          <defs>
            <linearGradient id="plotkareMapBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={0.96} />
              <stop offset="100%" stopColor="#F8F6F3" stopOpacity={0.94} />
            </linearGradient>
            <filter id="apGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width={layout.w} height={layout.h} rx={16} fill="url(#plotkareMapBg)" />

          {layout.vizag && layout.lines.length > 0 ? (
            <g className="pointer-events-none opacity-[0.2] lg:opacity-[0.26]" aria-hidden>
              {layout.lines.map((ln) => (
                <path
                  key={ln.key}
                  d={ln.d}
                  fill="none"
                  stroke="#C9A962"
                  strokeWidth={0.75}
                  strokeDasharray="5 7"
                  strokeLinecap="round"
                />
              ))}
            </g>
          ) : null}

          <g className="state-layer">
            {layout.paths
              .filter((p) => !p.ap)
              .map((p) => (
                <path
                  key={p.key}
                  d={p.d}
                  fill="rgba(139, 21, 56, 0.04)"
                  stroke="#C9A962"
                  strokeOpacity={0.55}
                  strokeWidth={0.65}
                  className="cursor-pointer transition-[fill,stroke-opacity] duration-200 hover:fill-[rgba(139,21,56,0.11)]"
                  tabIndex={0}
                  role="button"
                  aria-label={`${p.name}. Opens details about PlotKare in this region.`}
                  onClick={() => openDialog(p)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      openDialog(p)
                    }
                  }}
                />
              ))}
            {layout.paths
              .filter((p) => p.ap)
              .map((p) => (
                <g key={p.key}>
                  {!reduceMotion ? (
                    <path
                      d={p.d}
                      fill="none"
                      stroke="#8B1538"
                      strokeOpacity={0.28}
                      strokeWidth={3.5}
                      filter="url(#apGlow)"
                      className="pointer-events-none animate-plot-pulse"
                    />
                  ) : null}
                  <path
                    d={p.d}
                    fill="rgba(139, 21, 56, 0.13)"
                    stroke="#8B1538"
                    strokeWidth={1.85}
                    strokeLinejoin="round"
                    className="cursor-pointer transition-[fill] duration-200 hover:fill-[rgba(139,21,56,0.2)]"
                    tabIndex={0}
                    role="button"
                    aria-label={`${p.name}. Active coordination starting from Visakhapatnam and coastal Andhra Pradesh.`}
                    onClick={() => openDialog(p)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        openDialog(p)
                      }
                    }}
                  />
                </g>
              ))}
          </g>

          {layout.vizag ? (
            <g className="pointer-events-none">
              {!reduceMotion ? (
                <circle
                  cx={layout.vizag[0]}
                  cy={layout.vizag[1]}
                  r={16}
                  fill="none"
                  stroke="#8B1538"
                  strokeOpacity={0.3}
                  className="animate-ping-slow"
                />
              ) : null}
              <circle
                cx={layout.vizag[0]}
                cy={layout.vizag[1]}
                r={6.5}
                fill="#8B1538"
                stroke="#C9A962"
                strokeWidth={1.5}
              />
              <text
                x={layout.vizag[0]}
                y={layout.vizag[1] - 14}
                textAnchor="middle"
                className="fill-foreground font-mono"
                style={{ fontSize: 11 }}
              >
                Visakhapatnam
              </text>
            </g>
          ) : null}
        </svg>
      </div>

      <p className="mt-3 text-center font-mono text-[10px] leading-snug text-muted-foreground">
        Boundaries: Natural Earth admin-1 (India). Dashed arcs are example diaspora hubs — not offices or client
        counts.
      </p>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selected?.name}</DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-3 pt-1 font-sans text-sm text-muted-foreground">
                {selected && isAndhraPradesh(selected.name, selected.iso) ? (
                  <>
                    <p>
                      PlotKare visits and coordination are operating from{' '}
                      <strong className="text-foreground">Visakhapatnam</strong> across coastal Andhra Pradesh today —
                      this is where inspection rhythm, documentation hygiene, and evidence trails are proven first.
                    </p>
                    <p>
                      Other states follow a public expansion roadmap; we only scale where we can deliver the same
                      standard of field evidence. Register interest if you want rollout updates — we never imply coverage
                      we have not launched.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      PlotKare does not claim full on-ground service in <strong className="text-foreground">{selected?.name}</strong>{' '}
                      yet. Work is staged from <strong className="text-foreground">Visakhapatnam / Andhra Pradesh</strong>{' '}
                      outward as we harden playbooks.
                    </p>
                    <p>
                      Use Contact (or WhatsApp when published) to register interest — we will only reach out about
                      eligibility and expansion timing.
                    </p>
                  </>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {loadError ? (
        <p className="mt-2 text-center text-xs text-destructive">Could not load map data.</p>
      ) : null}
    </div>
  )
}
