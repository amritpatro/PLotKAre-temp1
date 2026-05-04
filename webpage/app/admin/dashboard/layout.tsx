'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { readAdminAuth } from '@/lib/admin-auth'
import { AdminSidebar } from '@/components/admin-sidebar'

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [ok, setOk] = useState(false)

  useEffect(() => {
    if (!readAdminAuth()) {
      router.replace('/admin/login')
      return
    }
    setOk(true)
  }, [router, pathname])

  if (!ok) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB] text-[#6B7280]">
        Loading…
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <AdminSidebar />
      <div className="ml-64 min-h-screen">{children}</div>
    </div>
  )
}
