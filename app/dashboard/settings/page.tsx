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
      if (data) {
        setPractice(data)
        setName(data.name)
        setForwardingNumber(data.forwarding_number)
        setBookingLink(data.booking_link)
        setSmsMessage(data.sms_message || '')
      }
    }
    load()
  }, [supabase])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError(''); setSuccess(false)
    const { error } = await supabase
      .from('practices')
      .update({ name, forwarding_number: forwardingNumber, booking_link: bookingLink, sms_message: smsMessage })
      .eq('id', practice!.id)
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
        <div className="spinner" />
      </div>
    )
  }

  return (
    <div className="max-w-[560px] anim-up space-y-5">

      {/* ── Page title ───────────────────────────────────── */}
      <div className="mb-10">
        <h1 className="text-[clamp(26px,4vw,34px)] font-black tracking-[-0.035em] text-hi">
          Settings
        </h1>
        <p className="text-[14px] text-low mt-1">Manage your practice configuration</p>
      </div>

      {/* ── Recallo number ───────────────────────────────── */}
      <div className="card relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-accent/70" />
        <div className="flex items-center justify-between gap-6 flex-wrap px-8 py-7">
          <div>
            <p className="overline text-mid mb-3">Your Recallo number</p>
            <p className="text-[26px] font-black tracking-[-0.02em] text-hi tabular-nums">
              {practice.twilio_phone_number || 'Provisioning…'}
            </p>
            <p className="text-[12px] text-low mt-1.5">
              Patients call this — we forward it to your office
            </p>
          </div>
          {practice.twilio_phone_number && (
            <button onClick={handleCopy} className="btn btn-ghost btn-sm shrink-0">
              {copied ? 'Copied!' : 'Copy number'}
            </button>
          )}
        </div>
      </div>

      {/* ── Settings form ──────────────────────────────── */}
      <div className="card p-8">
        <h2 className="text-[15px] font-bold text-hi mb-7">Practice details</h2>

        <form onSubmit={handleSave} className="space-y-6">
          {error   && <div className="alert-error">{error}</div>}
          {success && <div className="alert-success">Settings saved successfully.</div>}

          <div>
            <label className="label">Practice name</label>
            <input
              type="text" required value={name}
              onChange={e => setName(e.target.value)}
              className="field"
            />
          </div>

          <div>
            <label className="label">Forwarding number</label>
            <p className="hint mb-2">Your real office phone — patients are connected here</p>
            <input
              type="tel" required value={forwardingNumber}
              onChange={e => setForwardingNumber(e.target.value)}
              placeholder="+15555551234" className="field"
            />
          </div>

          <div>
            <label className="label">Booking link</label>
            <p className="hint mb-2">Appended to every follow-up text message</p>
            <input
              type="url" required value={bookingLink}
              onChange={e => setBookingLink(e.target.value)}
              placeholder="https://yourbooking.com/schedule" className="field"
            />
          </div>

          <div>
            <label className="label">Custom SMS message</label>
            <p className="hint mb-2">
              Leave blank to use the default. Your booking link is appended automatically.
            </p>
            <textarea
              rows={3} value={smsMessage}
              onChange={e => setSmsMessage(e.target.value)}
              placeholder={`Hi! You just called ${practice.name}. We're sorry we missed you — book here: `}
              className="field field-area"
            />
          </div>

          <div className="divider" />

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? 'Saving…' : 'Save settings'}
          </button>
        </form>
      </div>
    </div>
  )
}
