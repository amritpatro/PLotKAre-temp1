'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Facing } from '@/lib/plotkare-storage'
import {
  DEFAULT_PUBLIC_LISTINGS,
  loadPublicListings,
  savePublicListings,
  type PublicPlotListing,
} from '@/lib/public-listings'
import {
  PRICE_TILES,
  SIZE_TILES,
  VIZAG_LOCATIONS,
  type VizagLocation,
} from '@/lib/vizag-form-constants'

function parseSq(tile: (typeof SIZE_TILES)[number], custom: string): number | null {
  if (tile === 'Custom') {
    const n = parseInt(custom, 10)
    return Number.isFinite(n) && n > 0 ? n : null
  }
  const m = tile.match(/^(\d+)/)
  return m ? parseInt(m[1], 10) : null
}

export default function AdminListingsPage() {
  const [rows, setRows] = useState<PublicPlotListing[]>([])
  const [addOpen, setAddOpen] = useState(false)
  const [editRow, setEditRow] = useState<PublicPlotListing | null>(null)

  const [plotNumber, setPlotNumber] = useState('')
  const [location, setLocation] = useState<VizagLocation>(VIZAG_LOCATIONS[0])
  const [sizeTile, setSizeTile] = useState<(typeof SIZE_TILES)[number] | null>(null)
  const [customSq, setCustomSq] = useState('')
  const [priceLabel, setPriceLabel] = useState<(typeof PRICE_TILES)[number]['label'] | null>(null)
  const [facing, setFacing] = useState<Facing>('East')
  const [corner, setCorner] = useState(false)

  const refresh = () => {
    const r = loadPublicListings()
    setRows(r.length ? r : [...DEFAULT_PUBLIC_LISTINGS])
  }

  useEffect(() => refresh(), [])
  useEffect(() => {
    const h = () => refresh()
    window.addEventListener('plotkare-listings-changed', h)
    window.addEventListener('storage', h)
    return () => {
      window.removeEventListener('plotkare-listings-changed', h)
      window.removeEventListener('storage', h)
    }
  }, [])

  const persist = (next: PublicPlotListing[]) => {
    savePublicListings(next)
    setRows(next)
  }

  const addListing = (e: React.FormEvent) => {
    e.preventDefault()
    const sq = sizeTile ? parseSq(sizeTile, customSq) : null
    const lakhs = PRICE_TILES.find((p) => p.label === priceLabel)?.lakhs
    if (!plotNumber.trim() || sq == null || lakhs == null || !sizeTile) return
    const row: PublicPlotListing = {
      id: `new-${Date.now()}`,
      plotNumber: plotNumber.trim(),
      location,
      sizeSqYards: sq,
      sizeLabel: `${sq} sq yards`,
      facing,
      cornerPlot: corner,
      premium: false,
      priceLakhs: lakhs,
      priceDisplay: lakhs >= 100 ? `${lakhs / 100} Cr` : `${lakhs} Lakhs`,
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
      status: 'Active',
      inquiriesCount: 0,
    }
    persist([row, ...rows])
    setAddOpen(false)
    setPlotNumber('')
    setSizeTile(null)
    setCustomSq('')
    setPriceLabel(null)
    setFacing('East')
    setCorner(false)
  }

  const markSold = (id: string) => {
    persist(rows.map((r) => (r.id === id ? { ...r, status: 'Sold' as const } : r)))
  }

  const remove = (id: string) => {
    persist(rows.filter((r) => r.id !== id))
  }

  const saveEdit = () => {
    if (!editRow) return
    const lakhs = PRICE_TILES.find((p) => p.label === priceLabel)?.lakhs ?? editRow.priceLakhs
    persist(
      rows.map((r) =>
        r.id === editRow.id
          ? {
              ...r,
              priceLakhs: lakhs,
              priceDisplay: lakhs >= 100 ? `${lakhs / 100} Cr` : `${lakhs} Lakhs`,
            }
          : r,
      ),
    )
    setEditRow(null)
  }

  return (
    <div className="px-8 pb-12 pt-24">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1F2937]">Listings</h1>
          <p className="mt-1 font-sans text-sm text-[#9CA3AF]">Public showcase & marketplace rows</p>
        </div>
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="rounded-lg bg-[#C0392B] px-4 py-2 font-sans text-sm font-semibold text-white"
        >
          Add Listing
        </button>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#E5E7EB] font-mono text-xs uppercase text-[#9CA3AF]">
              <th className="px-3 py-3">Plot #</th>
              <th className="px-3 py-3">Location</th>
              <th className="px-3 py-3">Size</th>
              <th className="px-3 py-3">Price</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Inquiries</th>
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3F4F6]">
            {rows.map((r) => (
              <tr key={r.id} className="font-sans text-[#1F2937]">
                <td className="px-3 py-3 font-mono text-[#C0392B]">{r.plotNumber}</td>
                <td className="px-3 py-3 text-[#6B7280]">{r.location}</td>
                <td className="px-3 py-3">{r.sizeLabel}</td>
                <td className="px-3 py-3 font-mono text-[#F59E0B]">₹ {r.priceDisplay}</td>
                <td className="px-3 py-3">{r.status}</td>
                <td className="px-3 py-3">{r.inquiriesCount}</td>
                <td className="px-3 py-3 space-x-1">
                  <button
                    type="button"
                    onClick={() => {
                      setEditRow(r)
                      setPriceLabel(
                        PRICE_TILES.find((t) => t.lakhs === r.priceLakhs)?.label ??
                          PRICE_TILES[0].label,
                      )
                    }}
                    className="rounded border border-[#C0392B] px-2 py-1 text-xs text-[#C0392B]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    disabled={r.status === 'Sold'}
                    onClick={() => markSold(r.id)}
                    className="rounded border border-[#E5E7EB] px-2 py-1 text-xs text-[#6B7280] disabled:opacity-40"
                  >
                    Mark Sold
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(r.id)}
                    className="rounded border border-red-200 px-2 py-1 text-xs text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-[#E5E7EB] bg-white sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-[#1F2937]">Add listing</DialogTitle>
          </DialogHeader>
          <form onSubmit={addListing} className="space-y-4 pt-2">
            <div>
              <label className="font-mono text-xs text-[#6B7280]">Plot number</label>
              <input
                value={plotNumber}
                onChange={(e) => setPlotNumber(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[#D1D5DB] px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="font-mono text-xs text-[#6B7280]">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value as VizagLocation)}
                className="mt-1 w-full rounded-lg border border-[#D1D5DB] px-3 py-2"
              >
                {VIZAG_LOCATIONS.filter((l) => l !== 'Other').map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-mono text-xs text-[#6B7280]">Size</label>
              <div className="mt-2 grid max-h-36 grid-cols-3 gap-1 overflow-y-auto sm:grid-cols-4">
                {SIZE_TILES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSizeTile(t)}
                    className={`rounded border px-1 py-2 font-mono text-[10px] ${
                      sizeTile === t
                        ? 'border-[#C0392B] bg-[#FFF1F2] text-[#C0392B]'
                        : 'border-[#D1D5DB]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {sizeTile === 'Custom' && (
                <input
                  type="number"
                  value={customSq}
                  onChange={(e) => setCustomSq(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-[#D1D5DB] px-3 py-2"
                  placeholder="Sq yards"
                />
              )}
            </div>
            <div>
              <label className="font-mono text-xs text-[#6B7280]">Price</label>
              <div className="mt-2 grid max-h-36 grid-cols-3 gap-1 overflow-y-auto sm:grid-cols-4">
                {PRICE_TILES.map(({ label }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setPriceLabel(label)}
                    className={`rounded border px-1 py-2 font-mono text-[10px] ${
                      priceLabel === label
                        ? 'border-[#C0392B] bg-[#FFF1F2] text-[#C0392B]'
                        : 'border-[#D1D5DB]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="font-mono text-xs text-[#6B7280]">Facing</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {(['East', 'West', 'North', 'South'] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setFacing(d)}
                    className={`rounded-full border px-4 py-1.5 text-xs ${
                      facing === d
                        ? 'border-[#C0392B] bg-[#FFF1F2] text-[#C0392B]'
                        : 'border-[#D1D5DB] text-[#6B7280]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#6B7280]">Corner plot</span>
              <button
                type="button"
                onClick={() => setCorner(!corner)}
                className={`rounded-full border px-4 py-1.5 text-xs ${
                  corner ? 'border-[#C0392B] bg-[#FFF1F2] text-[#C0392B]' : 'border-[#D1D5DB]'
                }`}
              >
                {corner ? 'Yes' : 'No'}
              </button>
            </div>
            <button type="submit" className="w-full rounded-lg bg-[#C0392B] py-2.5 font-semibold text-white">
              Save
            </button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editRow} onOpenChange={(o) => !o && setEditRow(null)}>
        <DialogContent className="border-[#E5E7EB] bg-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-[#1F2937]">Edit price</DialogTitle>
          </DialogHeader>
          <div className="grid max-h-48 grid-cols-3 gap-2 overflow-y-auto pt-2">
            {PRICE_TILES.map(({ label }) => (
              <button
                key={label}
                type="button"
                onClick={() => setPriceLabel(label)}
                className={`rounded-lg border px-2 py-2 font-mono text-[10px] ${
                  priceLabel === label
                    ? 'border-[#C0392B] bg-[#FFF1F2] text-[#C0392B]'
                    : 'border-[#D1D5DB]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={saveEdit}
            className="mt-4 w-full rounded-lg bg-[#C0392B] py-2.5 font-semibold text-white"
          >
            Save
          </button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
