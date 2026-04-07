'use client'

import { useState } from 'react'
import { Subscription } from '@/lib/types'
import { PLANS } from '@/lib/stripe'

type Props = {
  subscription: Subscription | null
  planName: string | null
  practiceId: string
}

export default function BillingClient({ subscription, planName, practiceId }: Props) {
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
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {isActive ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Current plan</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{planName}</p>
              <p className="text-sm text-gray-500 mt-1 capitalize">
                Status:{' '}
                <span className="text-green-600 font-medium">{subscription?.status}</span>
              </p>
            </div>
            <button
              onClick={handlePortal}
              disabled={loadingPortal}
              className="bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
            >
              {loadingPortal ? 'Opening...' : 'Manage billing'}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3">
            <p className="text-sm text-yellow-800 font-medium">
              No active subscription
            </p>
            <p className="text-sm text-yellow-700 mt-0.5">
              Choose a plan below to activate your account and start recovering missed calls.
            </p>
          </div>

          <div className="grid gap-4">
            {Object.entries(PLANS).map(([key, plan]) => (
              <div
                key={key}
                className={`bg-white rounded-xl border p-6 flex items-center justify-between ${
                  key === 'founding'
                    ? 'border-blue-300 ring-1 ring-blue-200'
                    : 'border-gray-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900">{plan.name}</p>
                    {key === 'founding' && (
                      <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">
                        Limited — first 10 customers only
                      </span>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    ${(plan.price / 100).toFixed(0)}
                    <span className="text-sm font-normal text-gray-500">/mo</span>
                  </p>
                </div>
                <button
                  onClick={() => handleSubscribe(key)}
                  disabled={loadingPlan === key}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm whitespace-nowrap"
                >
                  {loadingPlan === key ? 'Loading...' : 'Choose plan'}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
