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
    setLoading(true); setError('')
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
    <div className="min-h-screen bg-base flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-[480px] anim-up">

        <div className="text-center mb-10">
          <Link href="/" className="text-[19px] font-bold tracking-tight text-hi no-underline">
            Recallo
          </Link>
        </div>

        {/* Step indicator */}
        <div className="flex items-center mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-accent text-white text-[11px] font-bold flex items-center justify-center shrink-0">
              1
            </div>
            <span className="text-[13px] font-semibold text-hi">Practice details</span>
          </div>
          <div className="flex-1 h-px bg-white/[0.07] mx-4" />
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-surface-2 border border-white/[0.08] text-low text-[11px] font-bold flex items-center justify-center shrink-0">
              2
            </div>
            <span className="text-[13px] text-low">Choose plan</span>
          </div>
        </div>

        <div className="card p-9">
          <h1 className="text-[24px] font-black tracking-[-0.03em] text-hi mb-2">
            Set up your practice
          </h1>
          <p className="text-[14px] text-mid leading-relaxed mb-8">
            We&apos;ll provision a dedicated Recallo number that automatically
            forwards to your real office line.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="alert-error">{error}</div>}

            <div>
              <label className="label">Practice name</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)}
                placeholder="Sunshine Dental" className="field" />
            </div>

            <div>
              <label className="label">Office phone number</label>
              <p className="hint mb-2">Your real number — patients are forwarded here</p>
              <input type="tel" required value={forwardingNumber} onChange={e => setForwardingNumber(e.target.value)}
                placeholder="+15555551234" className="field" />
            </div>

            <div>
              <label className="label">Online booking link</label>
              <p className="hint mb-2">Sent in every follow-up text to the patient</p>
              <input type="url" required value={bookingLink} onChange={e => setBookingLink(e.target.value)}
                placeholder="https://yourbooking.com/schedule" className="field" />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-full mt-2">
              {loading ? 'Provisioning your number…' : 'Continue to billing →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
