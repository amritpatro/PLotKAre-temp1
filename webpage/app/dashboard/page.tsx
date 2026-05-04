'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { CheckCircle2, Home, Plus } from 'lucide-react'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardTopBar } from '@/components/dashboard-topbar'
import { Plot3DViewerModal } from '@/components/dashboard/plot-3d-viewer-modal'
import { AddPlotModal } from '@/components/dashboard/add-plot-modal'
import { loadPlots, type StoredPlot } from '@/lib/plotkare-storage'

type SparkPoint = { month: string; value: number }

type DisplayPlot = {
  id: string
  plotNumber: string
  location: string
  sizeLabel: string
  sqYards: number
  lastInspection: string
  valueLabel: string
  data: SparkPoint[]
}

const BASE_SQ_YARDS = 200

function sizeRatioFromSqYards(sq: number) {
  return sq / BASE_SQ_YARDS
}

function sparkFromSeed(seed: string): SparkPoint[] {
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h + seed.charCodeAt(i)) % 35
  return months.map((month, i) => ({
    month,
    value: 42 + ((h + i * 9) % 30),
  }))
}

function formatPlotCardValueLakhs(lakhs: number): string {
  if (lakhs >= 100) {
    return `${(lakhs / 100).toFixed(2)} Cr`
  }
  const rounded = Math.round(lakhs * 100) / 100
  return `${rounded % 1 === 0 ? rounded.toFixed(0) : rounded} Lakhs`
}

function formatPortfolioFromPlots(plots: StoredPlot[]): string {
  const sum = plots.reduce((acc, p) => acc + (p.currentValueLakhs || 0), 0)
  if (sum <= 0) return '0 Lakhs'
  if (sum < 100) {
    const r = Math.round(sum * 100) / 100
    return `${r % 1 === 0 ? r.toFixed(0) : r.toFixed(2)} Lakhs`
  }
  return `${(sum / 100).toFixed(2)} Cr`
}

function storedToDisplay(s: StoredPlot): DisplayPlot {
  return {
    id: s.id,
    plotNumber: s.plotNumber,
    location: s.location,
    sizeLabel: `${s.sqYards} sq. yards`,
    sqYards: s.sqYards,
    lastInspection: s.lastInspection,
    valueLabel: formatPlotCardValueLakhs(s.currentValueLakhs),
    data: sparkFromSeed(s.id + s.plotNumber),
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const [storedPlots, setStoredPlots] = useState<StoredPlot[]>([])
  const [plot3dOpen, setPlot3dOpen] = useState(false)
  const [plot3dTarget, setPlot3dTarget] = useState<{ id: string; ratio: number } | null>(null)
  const [addPlotOpen, setAddPlotOpen] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('plotkare_auth')
    if (auth !== 'true') {
      router.replace('/login')
    }
  }, [router])

  const refreshPlots = () => setStoredPlots(loadPlots())

  useEffect(() => {
    refreshPlots()
    const onStorage = () => refreshPlots()
    window.addEventListener('plotkare-plots-changed', onStorage)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener('plotkare-plots-changed', onStorage)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const displayPlots = useMemo(() => storedPlots.map(storedToDisplay), [storedPlots])

  const plotsRegistered = storedPlots.length
  const portfolioLabel = useMemo(() => formatPortfolioFromPlots(storedPlots), [storedPlots])

  const open3d = (plot: DisplayPlot) => {
    setPlot3dTarget({
      id: plot.plotNumber,
      ratio: sizeRatioFromSqYards(plot.sqYards),
    })
    setPlot3dOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <DashboardSidebar />

      <div className="ml-64">
        <DashboardTopBar title="My Plots" />

        <div className="px-8 pb-12 pt-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 font-serif text-3xl font-bold text-[#1F2937]"
          >
            Good Morning, Ravi Kumar.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <div className="rounded-xl border border-[#E5E7EB] border-l-[3px] border-l-[#C0392B] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              <p className="font-mono text-xs text-[#6B7280]">Plots Registered</p>
              <p className="mt-3 font-mono text-2xl font-bold text-[#C0392B]">{plotsRegistered}</p>
            </div>
            <div className="rounded-xl border border-[#E5E7EB] border-l-[3px] border-l-[#F59E0B] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              <p className="font-mono text-xs text-[#6B7280]">Portfolio Value</p>
              <p className="mt-3 font-mono text-2xl font-bold text-[#F59E0B]">{portfolioLabel}</p>
            </div>
            <div className="rounded-xl border border-[#E5E7EB] border-l-[3px] border-l-[#16A34A] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              <p className="font-mono text-xs text-[#6B7280]">Encroachments</p>
              <p className="mt-3 font-mono text-2xl font-bold text-[#16A34A]">0</p>
            </div>
            <div className="rounded-xl border border-[#E5E7EB] border-l-[3px] border-l-[#F97316] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              <p className="font-mono text-xs text-[#6B7280]">Next Inspection</p>
              <p className="mt-3 font-mono text-2xl font-bold text-[#F97316]">3 days</p>
            </div>
          </motion.div>

          {displayPlots.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-8 py-16 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
            >
              <Home className="mb-6 h-14 w-14 text-[#9CA3AF]" strokeWidth={1.25} />
              <h3 className="font-serif text-2xl font-semibold text-[#1F2937] md:text-3xl">
                You have no plots registered yet
              </h3>
              <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-[#6B7280] md:text-base">
                Add your first plot to start monitoring and growing its value
              </p>
              <button
                type="button"
                onClick={() => setAddPlotOpen(true)}
                className="mt-10 rounded-xl bg-[#C0392B] px-10 py-4 font-sans text-base font-semibold text-white shadow-lg transition-opacity hover:opacity-95"
              >
                Add New Plot
              </button>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid gap-8 lg:grid-cols-2"
              >
                {displayPlots.map((plot) => (
                  <div
                    key={plot.id}
                    className="rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                  >
                    <div className="mb-6">
                      <p className="font-mono text-xs text-[#9CA3AF]">{plot.plotNumber}</p>
                      <h3 className="mt-2 font-sans text-lg font-semibold text-[#1F2937]">
                        {plot.location}
                      </h3>
                      <p className="mt-1 font-mono text-sm text-[#9CA3AF]">{plot.sizeLabel}</p>
                    </div>

                    <div className="mb-6 flex items-center justify-between border-b border-[#E5E7EB] pb-4">
                      <span className="font-mono text-xs text-[#9CA3AF]">Current Value</span>
                      <p className="font-mono text-2xl font-bold text-[#F59E0B]">{plot.valueLabel}</p>
                    </div>

                    <div className="mb-6 h-24 rounded-lg bg-[#F3F4F6] px-1 py-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={plot.data}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#fff',
                              border: '1px solid #E5E7EB',
                              borderRadius: '8px',
                            }}
                            labelStyle={{ color: '#1F2937' }}
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#F59E0B"
                            fill="rgba(245, 158, 11, 0.12)"
                            isAnimationActive={false}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="mb-6 flex items-center gap-2 font-mono text-xs text-[#6B7280]">
                      <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                      Last Inspection: {plot.lastInspection}
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        className="flex-1 rounded-lg border border-[#C0392B] bg-transparent px-4 py-2 font-sans text-sm font-medium text-[#C0392B] transition-colors hover:bg-[#FFF1F2]"
                      >
                        View Report
                      </button>
                      <Link
                        href="/dashboard/amenities"
                        className="flex flex-1 items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-2 font-sans text-sm font-medium text-[#1F2937] transition-colors hover:bg-[#F3F4F6]"
                      >
                        Manage Amenities
                      </Link>
                      <button
                        type="button"
                        onClick={() => open3d(plot)}
                        className="flex-1 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-2 font-sans text-sm font-medium text-[#1F2937] transition-colors hover:bg-[#F3F4F6]"
                      >
                        View 3D
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-8 flex justify-center lg:justify-start"
              >
                <button
                  type="button"
                  onClick={() => setAddPlotOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-[#C0392B] px-6 py-3 font-sans text-sm font-semibold text-[#C0392B] transition-colors hover:bg-[#FFF1F2]"
                >
                  <Plus className="h-5 w-5" />
                  Add New Plot
                </button>
              </motion.div>
            </>
          )}
        </div>
      </div>

      <Plot3DViewerModal
        open={plot3dOpen}
        onClose={() => {
          setPlot3dOpen(false)
          setPlot3dTarget(null)
        }}
        plotNumber={plot3dTarget?.id ?? ''}
        sizeRatio={plot3dTarget?.ratio ?? 1}
      />

      <AddPlotModal
        open={addPlotOpen}
        onClose={() => setAddPlotOpen(false)}
        onSaved={refreshPlots}
      />
    </div>
  )
}
