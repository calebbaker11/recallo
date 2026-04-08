'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const steps = [
  { label: 'Practice details' },
  { label: 'Choose plan' },
]

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
      body: JSON.stringify({
        name,
        forwarding_number: forwardingNumber,
        booking_link: bookingLink,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Something went wrong')
      setLoading(false)
      return
    }

    router.push('/dashboard/billing')
  }

  const inputStyle: React.CSSProperties = {
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '15px',
    color: 'var(--text-primary)',
    outline: 'none',
    width: '100%',
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '480px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Link
            href="/"
            style={{
              fontSize: '22px',
              fontWeight: '800',
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              textDecoration: 'none',
            }}
          >
            Recallo
          </Link>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '36px' }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: i < steps.length - 1 ? 1 : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: i === 0 ? 'var(--accent)' : 'var(--border)',
                    color: i === 0 ? '#0B0F14' : 'var(--text-muted)',
                    fontSize: '12px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: i === 0 ? '600' : '400',
                    color: i === 0 ? 'var(--text-primary)' : 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '40px',
          }}
        >
          <h1
            style={{
              fontSize: '22px',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginBottom: '6px',
            }}
          >
            Set up your practice
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '36px', lineHeight: '1.55' }}>
            We&apos;ll provision a dedicated Recallo number for your office. Calls forward
            to your real line — automatically.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {error && (
              <div
                style={{
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.25)',
                  color: '#FCA5A5',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  fontSize: '13px',
                  lineHeight: '1.5',
                }}
              >
                {error}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)' }}>
                Practice name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sunshine Dental"
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)' }}>
                Office phone number
              </label>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 4px' }}>
                Your real number — patients are forwarded here
              </p>
              <input
                type="tel"
                required
                value={forwardingNumber}
                onChange={(e) => setForwardingNumber(e.target.value)}
                placeholder="+15555551234"
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)' }}>
                Online booking link
              </label>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 4px' }}>
                Sent in every follow-up text to the patient
              </p>
              <input
                type="url"
                required
                value={bookingLink}
                onChange={(e) => setBookingLink(e.target.value)}
                placeholder="https://yourbooking.com/schedule"
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? 'var(--border)' : 'var(--accent)',
                color: loading ? 'var(--text-muted)' : '#0B0F14',
                border: 'none',
                borderRadius: '8px',
                padding: '13px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '-0.01em',
                marginTop: '4px',
              }}
            >
              {loading ? 'Provisioning your number…' : 'Continue to billing'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
