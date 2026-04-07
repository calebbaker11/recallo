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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Recallo
          </Link>
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">
            Set up your practice
          </h1>
          <p className="mt-2 text-gray-600">
            We&apos;ll provision a dedicated phone number for your office in seconds.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                {error}
              </div>
            )}

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
                placeholder="Sunshine Dental"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Office phone number
              </label>
              <p className="text-xs text-gray-500 mb-2">
                The real number patients will be forwarded to
              </p>
              <input
                type="tel"
                required
                value={forwardingNumber}
                onChange={(e) => setForwardingNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+15555551234"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Online booking link
              </label>
              <p className="text-xs text-gray-500 mb-2">
                The URL we send to patients so they can book instantly
              </p>
              <input
                type="url"
                required
                value={bookingLink}
                onChange={(e) => setBookingLink(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://yourbooking.com/schedule"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              {loading ? 'Setting up your practice...' : 'Set up practice & continue'}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-gray-500">
          We&apos;ll automatically provision a Twilio phone number for your practice.
          You&apos;ll give patients this number to call — calls are forwarded to your real office line.
        </p>
      </div>
    </div>
  )
}
