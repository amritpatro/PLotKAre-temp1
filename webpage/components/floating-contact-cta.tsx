'use client'

import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

/** Replace href when a staffed WhatsApp Business number is published. */
const WA_PLACEHOLDER = 'https://wa.me/'
const MAIL_ENQUIRY = 'mailto:hello@plotkare.in?subject=PlotKare%20enquiry'

export function FloatingContactCta() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 print:hidden">
      <Link
        href={MAIL_ENQUIRY}
        className="rounded-full border border-border bg-background/95 px-4 py-2 text-xs font-medium text-foreground shadow-lg backdrop-blur-md transition-colors hover:bg-secondary"
      >
        Email us
      </Link>
      <Link
        href={WA_PLACEHOLDER}
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp — replace wa.me link when your business number is ready"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl ring-2 ring-white/80 transition-transform hover:scale-[1.03] active:scale-[0.98]"
        aria-label="WhatsApp chat placeholder — update link when number is published"
      >
        <MessageCircle className="h-7 w-7" aria-hidden />
      </Link>
    </div>
  )
}
