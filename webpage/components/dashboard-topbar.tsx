'use client'

import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LogOut } from 'lucide-react'

interface DashboardTopBarProps {
  title: string
}

export function DashboardTopBar({ title }: DashboardTopBarProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('plotkare_auth')
    router.replace('/')
  }

  return (
    <div className="fixed right-0 top-0 left-64 border-b border-[#E5E7EB] bg-white px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-[#1F2937]">{title}</h1>
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10 bg-[#C0392B]">
            <AvatarFallback className="font-mono text-sm font-semibold text-white">RK</AvatarFallback>
          </Avatar>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-sm border border-[#E5E7EB] px-4 py-2 text-sm font-medium text-[#6B7280] transition-colors hover:bg-[#F9FAFB]"
          >
            <LogOut size={16} className="text-[#C0392B]" />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
