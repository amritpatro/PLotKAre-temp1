'use client'

import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardTopBar } from '@/components/dashboard-topbar'
import { getAmenityByName } from '@/lib/amenity-catalog'
import {
  getStoredPlan,
  loadActiveAmenityNames,
  setStoredPlan,
  type PlanTier,
} from '@/lib/plotkare-storage'

const GST_RATE = 0.18

const PLAN_PRICES: Record<PlanTier, number> = {
  basic: 999,
  standard: 1999,
  premium: 3999,
}

const PLAN_LABEL: Record<PlanTier, string> = {
  basic: 'Basic Plan',
  standard: 'Standard Plan',
  premium: 'Premium Plan',
}

const PLAN_AMENITY_BLURB: Record<PlanTier, string[]> = {
  basic: ['Monthly inspection PDF reports', 'Email support', 'Up to 2 amenity add-ons'],
  standard: [
    'Everything in Basic',
    'Legal encroachment monitoring',
    'Priority WhatsApp with field agent',
    'Recommended amenity bundle discounts',
  ],
  premium: [
    'Everything in Standard',
    'Weekly drone boundary snapshots',
    'Dedicated relationship manager',
    'Premium amenity concierge & faster installs',
  ],
}

type HistoryRow = {
  date: string
  description: string
  amount: number
  status: string
}

const DEMO_HISTORY: HistoryRow[] = [
  {
    date: 'Apr 2026',
    description: 'Standard Plan — monthly subscription',
    amount: 1999,
    status: 'Paid',
  },
  {
    date: 'Mar 2026',
    description: 'Solar Panel Hosting (amenity)',
    amount: 1500,
    status: 'Paid',
  },
  {
    date: 'Mar 2026',
    description: 'Standard Plan — monthly subscription',
    amount: 1999,
    status: 'Paid',
  },
  {
    date: 'Feb 2026',
    description: 'Container Farming Lease (amenity)',
    amount: 800,
    status: 'Paid',
  },
  {
    date: 'Feb 2026',
    description: 'Standard Plan — monthly subscription',
    amount: 1999,
    status: 'Paid',
  },
]

export default function PaymentsPage() {
  const [plan, setPlan] = useState<PlanTier>('standard')
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [amenityNames, setAmenityNames] = useState<string[]>([])

  const refresh = () => {
    setPlan(getStoredPlan())
    setAmenityNames(loadActiveAmenityNames())
  }

  useEffect(() => {
    refresh()
    const h = () => refresh()
    window.addEventListener('plotkare-amenities-changed', h)
    window.addEventListener('plotkare-plan-changed', h)
    window.addEventListener('storage', h)
    return () => {
      window.removeEventListener('plotkare-amenities-changed', h)
      window.removeEventListener('plotkare-plan-changed', h)
      window.removeEventListener('storage', h)
    }
  }, [])

  const planAmount = PLAN_PRICES[plan]

  const { displayRows, recurringSubtotal } = useMemo(() => {
    const rows: { label: string; detail: string; recurringAmount: number | null }[] = []
    rows.push({
      label: PLAN_LABEL[plan],
      detail: 'Monthly subscription',
      recurringAmount: planAmount,
    })

    let recurring = planAmount

    for (const name of amenityNames) {
      const a = getAmenityByName(name)
      if (!a) continue
      if (a.kind === 'monthly') {
        rows.push({
          label: a.name,
          detail: `Monthly — Rs ${a.amount.toLocaleString('en-IN')}`,
          recurringAmount: a.amount,
        })
        recurring += a.amount
      } else {
        rows.push({
          label: a.name,
          detail: 'One-time charge already processed',
          recurringAmount: null,
        })
      }
    }

    return { displayRows: rows, recurringSubtotal: recurring }
  }, [plan, planAmount, amenityNames])

  const gst = recurringSubtotal * GST_RATE
  const totalDue = recurringSubtotal + gst

  const selectPlan = (tier: PlanTier) => {
    setStoredPlan(tier)
    setPlan(tier)
    setUpgradeOpen(false)
    toast.success('Plan updated successfully')
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <DashboardSidebar />
      <div className="ml-64">
        <DashboardTopBar title="Payments" />
        <div className="px-8 pb-12 pt-24">
          <div className="mx-auto max-w-4xl space-y-10">
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-[#9CA3AF]">Active Plan</p>
                  <h2 className="mt-2 font-serif text-2xl font-bold text-[#1F2937]">{PLAN_LABEL[plan]}</h2>
                  <p className="mt-1 font-mono text-lg text-[#F59E0B]">
                    Rs {planAmount.toLocaleString('en-IN')} per month
                  </p>
                  <p className="mt-2 font-sans text-sm text-[#6B7280]">Renewing 1 June 2025</p>
                </div>
                <button
                  type="button"
                  onClick={() => setUpgradeOpen(true)}
                  className="rounded-lg bg-[#C0392B] px-5 py-2.5 font-sans text-sm font-semibold text-white hover:opacity-95"
                >
                  Upgrade to Premium
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              <h3 className="font-serif text-xl font-bold text-[#1F2937]">Current Month Billing</h3>
              <div className="mt-6 space-y-3 border-b border-[#E5E7EB] pb-4">
                {displayRows.map((row) => (
                  <div
                    key={row.label + row.detail}
                    className="flex flex-wrap items-baseline justify-between gap-2 font-sans text-sm"
                  >
                    <div>
                      <span className="text-[#1F2937]">{row.label}</span>
                      <span
                        className={`ml-2 ${row.recurringAmount == null ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}
                      >
                        {row.detail}
                      </span>
                    </div>
                    <span className="font-mono text-[#1F2937]">
                      {row.recurringAmount != null
                        ? `Rs ${row.recurringAmount.toLocaleString('en-IN')}`
                        : '—'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between font-mono text-sm text-[#6B7280]">
                <span>Subtotal (recurring)</span>
                <span>Rs {recurringSubtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="mt-2 flex justify-between font-mono text-sm text-[#6B7280]">
                <span>GST (18% on recurring)</span>
                <span>Rs {Math.round(gst).toLocaleString('en-IN')}</span>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#E5E7EB] pt-6">
                <div>
                  <p className="font-mono text-xs text-[#9CA3AF]">Total Due</p>
                  <p
                    className="font-mono text-3xl font-bold text-[#F59E0B]"
                    style={{ fontFamily: 'var(--font-dm-mono), monospace' }}
                  >
                    Rs {Math.round(totalDue).toLocaleString('en-IN')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toast.success('Payment gateway would open here')}
                  className="rounded-lg bg-[#C0392B] px-8 py-3 font-sans text-sm font-semibold text-white hover:opacity-95"
                >
                  Pay Now
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              <h3 className="font-serif text-xl font-bold text-[#1F2937]">Payment History</h3>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse text-left font-sans text-sm">
                  <thead>
                    <tr className="border-b border-[#E5E7EB] text-[#9CA3AF]">
                      <th className="pb-3 pr-4 font-mono text-xs uppercase">Date</th>
                      <th className="pb-3 pr-4 font-mono text-xs uppercase">Description</th>
                      <th className="pb-3 pr-4 text-right font-mono text-xs uppercase">Amount</th>
                      <th className="pb-3 text-right font-mono text-xs uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DEMO_HISTORY.map((row, i) => (
                      <tr key={i} className="border-b border-[#F3F4F6] text-[#1F2937]">
                        <td className="py-3 pr-4 font-mono text-[#6B7280]">{row.date}</td>
                        <td className="py-3 pr-4">{row.description}</td>
                        <td className="py-3 pr-4 text-right font-mono">
                          Rs {row.amount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 text-right font-mono text-[#16A34A]">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={upgradeOpen} onOpenChange={setUpgradeOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-[#E5E7EB] bg-white sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-[#1F2937]">Choose your plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-2">
            {(['basic', 'standard', 'premium'] as const).map((tier) => (
              <div key={tier} className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-5">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-serif text-lg font-semibold text-[#1F2937]">{PLAN_LABEL[tier]}</h4>
                  <span className="font-mono text-[#F59E0B]">
                    Rs {PLAN_PRICES[tier].toLocaleString('en-IN')}/mo
                  </span>
                </div>
                <ul className="mt-3 list-inside list-disc space-y-1 font-sans text-xs text-[#6B7280]">
                  {PLAN_AMENITY_BLURB[tier].map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => selectPlan(tier)}
                  className="mt-4 w-full rounded-lg bg-[#C0392B] py-2.5 font-sans text-sm font-semibold text-white hover:opacity-95"
                >
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
