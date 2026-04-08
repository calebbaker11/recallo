'use client'

import { useState } from 'react'
import { Subscription } from '@/lib/types'
import { PLANS } from '@/lib/stripe'

type Props = {
  subscription: Subscription | null
  planName: string | null
  practiceId: string
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-accent mt-0.5">
      <path d="M2.5 7l3 3L11.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const features: Record<string, string[]> = {
  founding: ['Unlimited follow-ups', 'Custom SMS', 'Recovery analytics', 'Dedicated number', 'Priority support'],
  standard: ['Unlimited follow-ups', 'Custom SMS', 'Recovery analytics', 'Dedicated number', 'Email support'],
  ortho: ['Unlimited follow-ups', 'Custom SMS', 'Recovery analytics', 'Dedicated number', 'Priority support', 'Multi-location'],
}

export default function BillingClient({ subscription, planName }: Props) {
  const [loadingPortal, setLoadingPortal] = useState(false)
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function handlePortal() {
    setLoadingPortal(true); setError('')
    const res = await fetch('/api/stripe/portal', { method: 'POST' })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    else { setError(data.error || 'Failed to open billing portal'); setLoadingPortal(false) }
  }

  async function handleSubscribe(plan: string) {
    setLoadingPlan(plan); setError('')
    const res = await fetch('/api/stripe/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    else { setError(data.error || 'Failed to create checkout'); setLoadingPlan(null) }
  }

  const isActive = subscription?.status === 'active'

  return (
    <div>
      {error && <div className="alert-error mb-5">{error}</div>}

      {isActive ? (
        <div className="card p-9">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <p className="overline mb-2">Current plan</p>
              <p className="text-[28px] font-bold tracking-[-0.03em] text-text mb-1">{planName}</p>
              <div className="flex items-center gap-2">
                <span className="w-[7px] h-[7px] rounded-full bg-accent" />
                <span className="text-[13px] text-text-secondary capitalize">{subscription?.status}</span>
              </div>
            </div>
            <button onClick={handlePortal} disabled={loadingPortal} className="btn-ghost shrink-0">
              {loadingPortal ? 'Opening…' : 'Manage billing'}
            </button>
          </div>

          {subscription?.plan && features[subscription.plan] && (
            <div className="mt-8 pt-7 border-t border-border">
              <p className="overline mb-4">Included</p>
              <ul className="flex flex-col gap-2.5">
                {features[subscription.plan].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px] text-text-secondary">
                    <Check />{f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="bg-accent-muted border border-accent/20 rounded-xl px-5 py-4 mb-6">
            <p className="text-[14px] font-medium text-text mb-0.5">No active subscription</p>
            <p className="text-[13px] text-text-secondary">
              Choose a plan to start recovering missed patients.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {Object.entries(PLANS).map(([key, plan]) => (
              <div
                key={key}
                className={`card p-7 flex items-center justify-between gap-5 flex-wrap relative overflow-hidden ${
                  key === 'founding' ? '!border-accent/30' : ''
                }`}
              >
                {key === 'founding' && (
                  <div className="absolute inset-y-0 left-0 w-[3px] bg-accent" />
                )}
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className="text-[15px] font-semibold text-text">{plan.name}</span>
                    {key === 'founding' && (
                      <span className="text-[10px] font-bold tracking-[0.06em] uppercase text-accent bg-accent-muted border border-accent/20 px-1.5 py-px rounded">
                        First 10 only
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[28px] font-extrabold tracking-[-0.04em] text-text">
                      ${(plan.price / 100).toFixed(0)}
                    </span>
                    <span className="text-[14px] text-text-muted">/mo</span>
                  </div>
                </div>
                <button
                  onClick={() => handleSubscribe(key)}
                  disabled={loadingPlan === key}
                  className={key === 'founding' ? 'btn-primary shrink-0' : 'btn-ghost shrink-0'}
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
