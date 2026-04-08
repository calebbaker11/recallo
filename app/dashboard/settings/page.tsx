'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Practice } from '@/lib/types'

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
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('practices').select('*').eq('owner_id', user.id).single()
      if (data) { setPractice(data); setName(data.name); setForwardingNumber(data.forwarding_number); setBookingLink(data.booking_link); setSmsMessage(data.sms_message || '') }
    }
    load()
  }, [supabase])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError(''); setSuccess(false)
    const { error } = await supabase.from('practices').update({ name, forwarding_number: forwardingNumber, booking_link: bookingLink, sms_message: smsMessage }).eq('id', practice!.id)
    if (error) setError(error.message); else setSuccess(true)
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
      <div className="flex items-center justify-center h-[300px]">
        <div className="w-6 h-6 border-2 border-border border-t-accent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-[560px] animate-in">
      <div className="mb-10">
        <h1 className="text-[clamp(24px,4vw,32px)] font-bold tracking-[-0.035em] text-text mb-1">
          Settings
        </h1>
        <p className="text-[14px] text-text-muted">
          Manage your practice configuration
        </p>
      </div>

      {/* ── Recallo number card ────────────────────────── */}
      <div className="card px-7 py-6 mb-3 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="overline mb-1.5">Your Recallo number</p>
          <p className="text-[22px] font-bold tracking-[0.01em] text-text tabular-nums">
            {practice.twilio_phone_number || 'Provisioning…'}
          </p>
          <p className="text-[12px] text-text-muted mt-1">Patients call this — forwarded to your office</p>
        </div>
        {practice.twilio_phone_number && (
          <button onClick={handleCopy} className="btn-ghost !text-[13px] !py-2 !px-4 shrink-0">
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {/* ── Settings form ──────────────────────────────── */}
      <div className="card p-8">
        <form onSubmit={handleSave} className="flex flex-col gap-7">
          {error && <div className="alert-error">{error}</div>}
          {success && <div className="alert-success">Settings saved.</div>}

          <div>
            <label className="label block">Practice name</label>
            <input type="text" required value={name} onChange={e => setName(e.target.value)} className="input" />
          </div>

          <div>
            <label className="label block">Forwarding number</label>
            <p className="text-[12px] text-text-muted mb-2">Your real office phone</p>
            <input type="tel" required value={forwardingNumber} onChange={e => setForwardingNumber(e.target.value)} className="input" />
          </div>

          <div>
            <label className="label block">Booking link</label>
            <p className="text-[12px] text-text-muted mb-2">Appended to every follow-up text</p>
            <input type="url" required value={bookingLink} onChange={e => setBookingLink(e.target.value)} className="input" />
          </div>

          <div>
            <label className="label block">Custom SMS message</label>
            <p className="text-[12px] text-text-muted mb-2">Leave blank for default. Booking link appended automatically.</p>
            <textarea rows={3} value={smsMessage} onChange={e => setSmsMessage(e.target.value)}
              placeholder={`Hi! You just called ${practice.name}. We're sorry we missed you — click here to book: `}
              className="input !resize-none !leading-relaxed" />
          </div>

          <div className="h-px bg-border" />

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Saving…' : 'Save settings'}
          </button>
        </form>
      </div>
    </div>
  )
}
