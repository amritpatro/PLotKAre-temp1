'use client'

import { Toaster } from 'sonner'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster theme="dark" richColors position="bottom-right" />
    </>
  )
}
