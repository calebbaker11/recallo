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
    <header
      style={{
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg)',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      <div
        style={{
          maxWidth: '1120px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '56px',
        }}
      >
        {/* Left: logo + nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link
            href="/"
            style={{
              fontSize: '17px',
              fontWeight: '800',
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            Recallo
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: '14px',
                    fontWeight: isActive ? '600' : '400',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    background: isActive ? 'var(--surface)' : 'transparent',
                    transition: 'color 150ms, background 150ms',
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right: sign out */}
        <button
          onClick={handleSignOut}
          style={{
            fontSize: '13px',
            fontWeight: '500',
            color: 'var(--text-muted)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '5px 0',
            transition: 'color 150ms',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          Sign out
        </button>
      </div>
    </header>
  )
}
