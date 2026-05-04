'use client'

import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardTopBar } from '@/components/dashboard-topbar'
import { CheckCircle2, Download, AlertCircle } from 'lucide-react'

const reports = [
  {
    month: 'March 2026',
    agent: 'Venkatesh Kumar',
    status: 'Completed',
    finding: 'Plot boundaries intact, no encroachment detected.',
  },
  {
    month: 'February 2026',
    agent: 'Rajesh Singh',
    status: 'Completed',
    finding: 'Water tank maintenance recommended.',
  },
  {
    month: 'January 2026',
    agent: 'Venkatesh Kumar',
    status: 'Completed',
    finding: 'All systems operational, no issues noted.',
  },
  {
    month: 'December 2025',
    agent: 'Rajesh Singh',
    status: 'Completed',
    finding: 'Boundary wall needs minor repairs.',
  },
  {
    month: 'November 2025',
    agent: 'Venkatesh Kumar',
    status: 'Completed',
    finding: 'Plot condition excellent, all legal documents verified.',
  },
  {
    month: 'October 2025',
    agent: 'Rajesh Singh',
    status: 'Completed',
    finding: 'Solar panels performing optimally.',
  },
]

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <DashboardSidebar />

      <div className="ml-64">
        <DashboardTopBar title="Inspection Reports" />

        <div className="px-8 pb-12 pt-24">
          <div className="space-y-4">
            {reports.map((report, index) => (
              <div
                key={index}
                className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-3 flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#16A34A]" />
                      <span className="font-mono text-xs font-bold text-[#1F2937]">{report.month}</span>
                    </div>
                    <p className="mb-2 font-sans font-medium text-[#1F2937]">By {report.agent}</p>
                    <p className="mb-4 font-sans text-sm text-[#6B7280]">{report.finding}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-lg bg-[#FFF1F2] px-3 py-2 font-sans text-xs font-medium text-[#C0392B] hover:bg-[#FFE4E6]">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2 font-sans text-xs font-medium text-[#6B7280] hover:bg-[#F3F4F6]">
                      View Photos
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
