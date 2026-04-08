'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/'); router.refresh()
  }

  const links = [
    { href: '/dashboard', label: 'Overview' },
    { href: '/dashboard/settings', label: 'Settings' },
    { href: '/dashboard/billing', label: 'Billing' },
  ]

  return (
    <header className="glass sticky top-0 z-40 border-b border-white/[0.06]">
      <div className="max-w-[1120px] mx-auto px-6 h-[52px] flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-[16px] font-bold tracking-tight text-hi no-underline">
            Recallo
          </Link>
          <nav className="flex items-center gap-0.5">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <button
          onClick={handleSignOut}
          className="text-[13px] text-low hover:text-mid transition-colors bg-transparent border-0 cursor-pointer font-medium"
        >
          Sign out
        </button>
      </div>
    </header>
  )
}
