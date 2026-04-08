'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: `${window.location.origin}/onboarding` },
    })
    if (error) { setError(error.message); setLoading(false); return }
    router.push('/onboarding')
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="w-full max-w-[380px] animate-in">
        <div className="text-center mb-10">
          <Link href="/" className="text-[18px] font-semibold tracking-tight text-text no-underline">
            Recallo
          </Link>
          <h1 className="text-[24px] font-bold tracking-[-0.03em] text-text mt-8 mb-1.5">
            Create your account
          </h1>
          <p className="text-[15px] text-text-secondary">
            Start recovering missed patients today
          </p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSignup} className="flex flex-col gap-5">
            {error && <div className="alert-error">{error}</div>}

            <div>
              <label className="label block">Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@practice.com" className="input" />
            </div>

            <div>
              <label className="label block">Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Min. 8 characters" minLength={8} className="input" />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full mt-1">
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="mt-7 text-center text-[13px] text-text-muted">
            Have an account?{' '}
            <Link href="/login" className="text-accent no-underline hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
