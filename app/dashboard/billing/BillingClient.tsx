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
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-accent mt-[2px]">
      <path d="M2.5 7l3 3L11.5 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const features: Record<string, string[]> = {
  founding: ['Unlimited follow-up texts', 'Custom SMS message', 'Recovery analytics', 'Dedicated Recallo number', 'Priority support', 'Founding price locked forever'],
  standard: ['Unlimited follow-up texts', 'Custom SMS message', 'Recovery analytics', 'Dedicated Recallo number', 'Email support'],
  ortho: ['Unlimited follow-up texts', 'Custom SMS message', 'Recovery analytics', 'Dedicated Recallo number', 'Priority support', 'Multi-location ready'],
}

export default function BillingClient({ subscription, planName }: Props) {
  const [loadingPortal, setLoadingPortal] = useState(false)
  const [loadingPlan, setLoadingPlan]   = useState<string | null>(null)
  const [error, setError]               = useState('')

  async function handlePortal() {
    setLoadingPortal(true); setError('')
    const res  = await fetch('/api/stripe/portal', { method: 'POST' })
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
        /* ── Active subscription ──────────────────────────── */
        <div className="card relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-accent/70" />
          <div className="p-9">
            {/* Header */}
            <div className="flex items-start justify-between gap-6 flex-wrap mb-8">
              <div>
                <p className="overline text-mid mb-3">Current plan</p>
                <p className="text-[32px] font-black tracking-[-0.04em] text-hi leading-none mb-3">
                  {planName}
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-[7px] h-[7px] rounded-full bg-green" />
                  <span className="text-[13px] text-mid capitalize">{subscription?.status}</span>
                </div>
              </div>
              <button onClick={handlePortal} disabled={loadingPortal} className="btn btn-ghost shrink-0">
                {loadingPortal ? 'Opening…' : 'Manage billing'}
              </button>
            </div>

            {/* Feature list */}
            {subscription?.plan && features[subscription.plan] && (
              <>
                <div className="divider mb-8" />
                <p className="overline text-mid mb-5">What&apos;s included</p>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {features[subscription.plan].map(f => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check />
                      <span className="text-[14px] text-mid">{f}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

      ) : (
        /* ── No subscription — plan picker ────────────────── */
        <div>
          <div className="card-sm px-6 py-5 mb-6" style={{ borderColor: 'rgba(79,158,255,0.2)', background: 'rgba(79,158,255,0.04)' }}>
            <p className="text-[14px] font-semibold text-hi mb-0.5">No active subscription</p>
            <p className="text-[13px] text-low">Choose a plan below to start recovering missed patients.</p>
          </div>

          <div className="flex flex-col gap-3">
            {Object.entries(PLANS).map(([key, plan]) => {
              const isFounding = key === 'founding'
              return (
                <div
                  key={key}
                  className="card relative overflow-hidden"
                  style={isFounding ? { borderColor: 'rgba(79,158,255,0.3)' } : {}}
                >
                  {/* Accent stripe for founding */}
                  {isFounding && (
                    <div className="absolute inset-y-0 left-0 w-[3px] bg-accent" />
                  )}

                  <div className="flex items-center justify-between gap-6 flex-wrap px-8 py-7">
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="text-[15px] font-bold text-hi">{plan.name}</span>
                        {isFounding && (
                          <span className="tag-accent">First 10 only</span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[34px] font-black tracking-[-0.045em] text-hi leading-none">
                          ${(plan.price / 100).toFixed(0)}
                        </span>
                        <span className="text-[14px] text-low">/month</span>
                      </div>
                      {isFounding && (
                        <p className="text-[12px] text-low mt-1.5">Price locked forever · cancel anytime</p>
                      )}
                    </div>

                    <button
                      onClick={() => handleSubscribe(key)}
                      disabled={loadingPlan === key}
                      className={`shrink-0 btn ${isFounding ? 'btn-primary' : 'btn-ghost'}`}
                    >
                      {loadingPlan === key ? 'Loading…' : 'Choose plan'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
