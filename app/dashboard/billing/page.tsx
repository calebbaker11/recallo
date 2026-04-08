import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import BillingClient from './BillingClient'
import { PLANS } from '@/lib/stripe'

export default async function BillingPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: practice } = await supabase
    .from('practices')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  if (!practice) redirect('/onboarding')

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('practice_id', practice.id)
    .single()

  const planName = subscription?.plan
    ? PLANS[subscription.plan as keyof typeof PLANS]?.name
    : null

  return (
    <div style={{ maxWidth: '640px' }}>
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
          Billing
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Manage your Recallo subscription
        </p>
      </div>

      <BillingClient
        subscription={subscription}
        planName={planName}
        practiceId={practice.id}
      />
    </div>
  )
}
