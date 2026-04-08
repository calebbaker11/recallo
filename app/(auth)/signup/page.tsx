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
    setLoading(true); setError('')
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: `${window.location.origin}/onboarding` },
    })
    if (error) { setError(error.message); setLoading(false); return }
    router.push('/onboarding')
  }

  return (
    <div className="min-h-screen bg-base flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-[380px] anim-up">

        <div className="text-center mb-10">
          <Link href="/" className="text-[19px] font-bold tracking-tight text-hi no-underline">
            Recallo
          </Link>
          <h1 className="text-[26px] font-black tracking-[-0.03em] text-hi mt-9 mb-2">
            Create your account
          </h1>
          <p className="text-[15px] text-mid">
            Start recovering missed patients today
          </p>
        </div>

        <div className="card p-8 space-y-5">
          {error && <div className="alert-error">{error}</div>}

          <div>
            <label className="label">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@practice.com" className="field" />
          </div>

          <div>
            <label className="label">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Min. 8 characters" minLength={8} className="field" />
          </div>

          <button type="button" onClick={handleSignup} disabled={loading}
            className="btn btn-primary w-full mt-2">
            {loading ? 'Creating account…' : 'Create account'}
          </button>

          <p className="text-center text-[13px] text-low pt-1">
            Have an account?{' '}
            <Link href="/login" className="text-accent no-underline hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
