'use client'

import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardTopBar } from '@/components/dashboard-topbar'

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <DashboardSidebar />
      <div className="ml-64">
        <DashboardTopBar title="Document Vault" />
        <div className="px-8 pb-12 pt-24">
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <p className="font-sans text-[#6B7280]">Document vault coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
