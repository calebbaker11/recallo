'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function OnboardingPage() {
  const [name, setName] = useState('')
  const [forwardingNumber, setForwardingNumber] = useState('')
  const [bookingLink, setBookingLink] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/onboarding/provision', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, forwarding_number: forwardingNumber, booking_link: bookingLink }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error || 'Something went wrong'); setLoading(false); return }
    router.push('/dashboard/billing')
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-[460px] animate-in">
        <div className="text-center mb-10">
          <Link href="/" className="text-[18px] font-semibold tracking-tight text-text no-underline">
            Recallo
          </Link>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-accent text-white text-[11px] font-bold flex items-center justify-center">1</div>
            <span className="text-[13px] font-medium text-text">Practice details</span>
          </div>
          <div className="flex-1 h-px bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-surface-raised text-text-muted text-[11px] font-bold flex items-center justify-center border border-border">2</div>
            <span className="text-[13px] text-text-muted">Choose plan</span>
          </div>
        </div>

        <div className="card p-9">
          <h1 className="text-[22px] font-bold tracking-[-0.025em] text-text mb-1.5">
            Set up your practice
          </h1>
          <p className="text-[14px] text-text-secondary mb-8 leading-relaxed">
            We&apos;ll provision a dedicated Recallo number that forwards to your real office line.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {error && <div className="alert-error">{error}</div>}

            <div>
              <label className="label block">Practice name</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)}
                placeholder="Sunshine Dental" className="input" />
            </div>

            <div>
              <label className="label block">Office phone number</label>
              <p className="text-[12px] text-text-muted mb-2">Your real number — patients are forwarded here</p>
              <input type="tel" required value={forwardingNumber} onChange={e => setForwardingNumber(e.target.value)}
                placeholder="+15555551234" className="input" />
            </div>

            <div>
              <label className="label block">Online booking link</label>
              <p className="text-[12px] text-text-muted mb-2">Sent in every follow-up text</p>
              <input type="url" required value={bookingLink} onChange={e => setBookingLink(e.target.value)}
                placeholder="https://yourbooking.com/schedule" className="input" />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
              {loading ? 'Provisioning your number…' : 'Continue to billing'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
