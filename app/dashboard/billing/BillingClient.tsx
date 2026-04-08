'use client'

import { useState } from 'react'
import { Subscription } from '@/lib/types'
import { PLANS } from '@/lib/stripe'

type Props = {
  subscription: Subscription | null
  planName: string | null
  practiceId: string
}

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '1px' }}>
    <path d="M2.5 7l3 3L11.5 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const planFeatures: Record<string, string[]> = {
  founding: [
    'Unlimited patient follow-up texts',
    'Custom SMS message',
    'Real-time recovery analytics',
    'Dedicated practice number',
    'Priority support',
  ],
  standard: [
    'Unlimited patient follow-up texts',
    'Custom SMS message',
    'Real-time recovery analytics',
    'Dedicated practice number',
    'Email support',
  ],
  ortho: [
    'Unlimited patient follow-up texts',
    'Custom SMS message',
    'Real-time recovery analytics',
    'Dedicated practice number',
    'Priority support',
    'Multi-location ready',
  ],
}

export default function BillingClient({ subscription, planName }: Props) {
  const [loadingPortal, setLoadingPortal] = useState(false)
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function handlePortal() {
    setLoadingPortal(true)
    setError('')
    const res = await fetch('/api/stripe/portal', { method: 'POST' })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      setError(data.error || 'Failed to open billing portal')
      setLoadingPortal(false)
    }
  }

  async function handleSubscribe(plan: string) {
    setLoadingPlan(plan)
    setError('')
    const res = await fetch('/api/stripe/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      setError(data.error || 'Failed to create checkout session')
      setLoadingPlan(null)
    }
  }

  const isActive = subscription?.status === 'active'

  return (
    <div>
      {error && (
        <div
          style={{
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.25)',
            color: '#FCA5A5',
            borderRadius: '8px',
            padding: '12px 14px',
            fontSize: '13px',
            marginBottom: '20px',
          }}
        >
          {error}
        </div>
      )}

      {isActive ? (
        /* ── Active subscription ─────────────────────── */
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '36px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <p style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
                Current plan
              </p>
              <p style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '6px' }}>
                {planName}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)' }} />
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
                  {subscription?.status}
                </span>
              </div>
            </div>
            <button
              onClick={handlePortal}
              disabled={loadingPortal}
              style={{
                background: 'var(--surface-raised)',
                border: '1px solid var(--border)',
                color: loadingPortal ? 'var(--text-muted)' : 'var(--text-secondary)',
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loadingPortal ? 'not-allowed' : 'pointer',
                transition: 'all 150ms',
                flexShrink: 0,
              }}
              onMouseEnter={e => !loadingPortal && (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = loadingPortal ? 'var(--text-muted)' : 'var(--text-secondary)')}
            >
              {loadingPortal ? 'Opening…' : 'Manage billing'}
            </button>
          </div>

          {/* Features list for current plan */}
          {subscription?.plan && planFeatures[subscription.plan] && (
            <div style={{ marginTop: '32px', paddingTop: '28px', borderTop: '1px solid var(--border)' }}>
              <p style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '14px' }}>
                Included
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {planFeatures[subscription.plan].map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        /* ── No subscription — plan picker ───────────── */
        <div>
          <div
            style={{
              background: 'rgba(96,165,250,0.06)',
              border: '1px solid rgba(96,165,250,0.2)',
              borderRadius: '10px',
              padding: '16px 20px',
              marginBottom: '28px',
            }}
          >
            <p style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '3px' }}>
              No active subscription
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
              Choose a plan to activate your account and start recovering missed patients.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(PLANS).map(([key, plan]) => (
              <div
                key={key}
                style={{
                  background: 'var(--surface)',
                  border: `1px solid ${key === 'founding' ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: '12px',
                  padding: '28px 28px 28px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '24px',
                  flexWrap: 'wrap',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Accent bar for founding */}
                {key === 'founding' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      width: '3px',
                      background: 'var(--accent)',
                    }}
                  />
                )}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <p style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                      {plan.name}
                    </p>
                    {key === 'founding' && (
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          color: 'var(--accent)',
                          background: 'rgba(96,165,250,0.1)',
                          border: '1px solid rgba(96,165,250,0.2)',
                          padding: '2px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        First 10 only
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                    <span style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
                      ${(plan.price / 100).toFixed(0)}
                    </span>
                    <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>/mo</span>
                  </div>
                </div>
                <button
                  onClick={() => handleSubscribe(key)}
                  disabled={loadingPlan === key}
                  style={{
                    background: key === 'founding' ? 'var(--accent)' : 'var(--surface-raised)',
                    color: key === 'founding' ? '#0B0F14' : 'var(--text-primary)',
                    border: key === 'founding' ? 'none' : '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '10px 22px',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: loadingPlan === key ? 'not-allowed' : 'pointer',
                    opacity: loadingPlan === key ? 0.6 : 1,
                    transition: 'opacity 150ms',
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {loadingPlan === key ? 'Loading…' : 'Choose plan'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
