"use client"

import { usePathname, useRouter } from 'next/navigation'

export default function LinkButton({ href, children }: { href: string, children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const active = pathname.startsWith(href)
  
  return (
    <button
      onClick={() => router.push(href)}
      className={`px-4 py-2 rounded-md ${active ? 'bg-slate-200' : 'bg-slate-100'} text-slate-900`}
      disabled={active}
    >
      {children}
    </button>
  )
}
