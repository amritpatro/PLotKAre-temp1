'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { readAdminAuth } from '@/lib/admin-auth'

export default function AdminRootPage() {
  const router = useRouter()
  useEffect(() => {
    if (readAdminAuth()) router.replace('/admin/dashboard')
    else router.replace('/admin/login')
  }, [router])
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB] font-sans text-sm text-[#6B7280]">
      Redirecting…
    </div>
  )
}
