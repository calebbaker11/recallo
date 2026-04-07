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
  const supabase = createClient()

  useEffect(() => {
    async function loadPractice() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('practices')
        .select('*')
        .eq('owner_id', user.id)
        .single()

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
      .update({
        name,
        forwarding_number: forwardingNumber,
        booking_link: bookingLink,
        sms_message: smsMessage,
      })
      .eq('id', practice!.id)

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  if (!practice) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your practice configuration</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <form onSubmit={handleSave} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm">
              Settings saved successfully.
            </div>
          )}

          {/* Read-only Twilio number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Recallo phone number
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Give this number to patients — calls are automatically forwarded to your office
            </p>
            <div className="flex items-center gap-3">
              <input
                type="text"
                readOnly
                value={practice.twilio_phone_number || 'Provisioning...'}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
              />
              {practice.twilio_phone_number && (
                <button
                  type="button"
                  onClick={() =>
                    navigator.clipboard.writeText(practice.twilio_phone_number!)
                  }
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Copy
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Practice name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Forwarding phone number
            </label>
            <p className="text-xs text-gray-500 mb-2">Your real office phone number</p>
            <input
              type="tel"
              required
              value={forwardingNumber}
              onChange={(e) => setForwardingNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Booking link
            </label>
            <input
              type="url"
              required
              value={bookingLink}
              onChange={(e) => setBookingLink(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Custom SMS message
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Your booking link will be appended automatically. Leave blank for default.
            </p>
            <textarea
              rows={3}
              value={smsMessage}
              onChange={(e) => setSmsMessage(e.target.value)}
              placeholder={`Hi! You just called ${practice.name}. We're sorry we missed you — click here to book your appointment: `}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
          >
            {loading ? 'Saving...' : 'Save settings'}
          </button>
        </form>
      </div>
    </div>
  )
}
