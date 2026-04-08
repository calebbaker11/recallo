'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Practice } from '@/lib/types'

const inputStyle: React.CSSProperties = {
  background: 'var(--bg)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  padding: '10px 14px',
  fontSize: '15px',
  color: 'var(--text-primary)',
  outline: 'none',
  width: '100%',
  transition: 'border-color 150ms',
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)' }}>
        {label}
      </label>
      {hint && (
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 2px' }}>
          {hint}
        </p>
      )}
      {children}
    </div>
  )
}

export default function SettingsPage() {
  const [practice, setPractice] = useState<Practice | null>(null)
  const [name, setName] = useState('')
  const [forwardingNumber, setForwardingNumber] = useState('')
  const [bookingLink, setBookingLink] = useState('')
  const [smsMessage, setSmsMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    async function loadPractice() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('practices').select('*').eq('owner_id', user.id).single()
      if (data) {
        setPractice(data)
        setName(data.name)
        setForwardingNumber(data.forwarding_number)
        setBookingLink(data.booking_link)
        setSmsMessage(data.sms_message || '')
      }
    }
    loadPractice()
  }, [supabase])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    const { error } = await supabase
      .from('practices')
      .update({ name, forwarding_number: forwardingNumber, booking_link: bookingLink, sms_message: smsMessage })
      .eq('id', practice!.id)

    if (error) setError(error.message)
    else setSuccess(true)
    setLoading(false)
  }

  async function handleCopy() {
    if (!practice?.twilio_phone_number) return
    await navigator.clipboard.writeText(practice.twilio_phone_number)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!practice) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
        <div
          style={{
            width: '28px',
            height: '28px',
            border: '2px solid var(--border)',
            borderTopColor: 'var(--accent)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '600px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1
          style={{
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: '700',
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            marginBottom: '6px',
          }}
        >
          Settings
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Manage your practice configuration and SMS settings
        </p>
      </div>

      {/* Recallo number — read-only highlight card */}
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '24px 28px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <p style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
            Your Recallo number
          </p>
          <p style={{ fontSize: '22px', fontWeight: '700', letterSpacing: '0.02em', color: 'var(--text-primary)', margin: 0, fontVariantNumeric: 'tabular-nums' }}>
            {practice.twilio_phone_number || 'Provisioning…'}
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Give this number to patients — calls forward to your office
          </p>
        </div>
        {practice.twilio_phone_number && (
          <button
            onClick={handleCopy}
            style={{
              background: copied ? 'rgba(96,165,250,0.12)' : 'var(--surface-raised)',
              border: `1px solid ${copied ? 'rgba(96,165,250,0.3)' : 'var(--border)'}`,
              color: copied ? 'var(--accent)' : 'var(--text-secondary)',
              borderRadius: '7px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 150ms',
              flexShrink: 0,
            }}
          >
            {copied ? 'Copied!' : 'Copy number'}
          </button>
        )}
      </div>

      {/* Settings form */}
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '36px',
        }}
      >
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
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
          {success && (
            <div
              style={{
                background: 'rgba(96,165,250,0.08)',
                border: '1px solid rgba(96,165,250,0.25)',
                color: 'var(--accent)',
                borderRadius: '8px',
                padding: '12px 14px',
                fontSize: '13px',
                lineHeight: '1.5',
              }}
            >
              Settings saved successfully.
            </div>
          )}

          <Field label="Practice name">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
          </Field>

          <Field label="Forwarding number" hint="Your real office phone — patients are connected here">
            <input
              type="tel"
              required
              value={forwardingNumber}
              onChange={(e) => setForwardingNumber(e.target.value)}
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
          </Field>

          <Field label="Booking link" hint="Appended to every patient follow-up text">
            <input
              type="url"
              required
              value={bookingLink}
              onChange={(e) => setBookingLink(e.target.value)}
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
          </Field>

          <Field label="Custom SMS message" hint="Leave blank to use the default. Booking link is appended automatically.">
            <textarea
              rows={3}
              value={smsMessage}
              onChange={(e) => setSmsMessage(e.target.value)}
              placeholder={`Hi! You just called ${practice.name}. We're sorry we missed you — click here to book: `}
              style={{
                ...inputStyle,
                resize: 'none',
                lineHeight: '1.6',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
          </Field>

          {/* Divider */}
          <div style={{ height: '1px', background: 'var(--border)', margin: '4px 0' }} />

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? 'var(--border)' : 'var(--accent)',
              color: loading ? 'var(--text-muted)' : '#0B0F14',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '15px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '-0.01em',
            }}
          >
            {loading ? 'Saving…' : 'Save settings'}
          </button>
        </form>
      </div>
    </div>
  )
}
