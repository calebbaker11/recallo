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
    router.push('/')
    router.refresh()
  }

  const links = [
    { href: '/dashboard', label: 'Overview' },
    { href: '/dashboard/settings', label: 'Settings' },
    { href: '/dashboard/billing', label: 'Billing' },
  ]

  return (
    <header className="glass-nav sticky top-0 z-40 border-b border-border">
      <div className="max-w-[1100px] mx-auto px-6 h-[52px] flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-[16px] font-semibold tracking-tight text-text no-underline">
            Recallo
          </Link>
          <nav className="flex items-center gap-0.5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'nav-link-active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <button
          onClick={handleSignOut}
          className="text-[13px] text-text-muted hover:text-text-secondary transition-colors bg-transparent border-0 cursor-pointer"
        >
          Sign out
        </button>
      </div>
    </header>
  )
}
